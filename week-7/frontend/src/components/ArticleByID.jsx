import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
} from "../styles/common.js";
import { useForm } from "react-hook-form";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    if (article) return;

    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`https://blogapp-x0mm.onrender.com/user-api/article/${id}`, { withCredentials: true });

        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error);
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete & restore article
  const toggleArticleStatus = async () => {
  const newStatus = !article.isArticleActive;

  const confirmMsg = newStatus
    ? "Restore this article?"
    : "Delete this article?";
  if (!window.confirm(confirmMsg)) return;

  try {
    const res = await axios.patch(
      "https://blogapp-x0mm.onrender.com/author-api/article",
      {
        articleId: article._id, // ✅ REQUIRED FIX
        isArticleActive: newStatus,
      },
      { withCredentials: true }
    );

    console.log("SUCCESS:", res.data);

    setArticle(res.data.payload);

    toast.success(res.data.message);
  } catch (err) {
    console.log("ERROR:", err.response);

    const msg = err.response?.data?.message;

    if (err.response?.status === 400) {
      toast(msg || "Invalid request");
    } else {
      setError(msg || "Operation failed");
    }
  }
};

  //edit article
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  //post comment by user
  const addComment = async (commentObj) => {
    //add artcileId
    commentObj.articleId = article._id;
    console.log(commentObj);
    let res = await axios.put("https://blogapp-x0mm.onrender.com/user-api/article", commentObj, { withCredentials: true });
    if (res.status === 200) {
      toast.success(res.data.message);
      setArticle(res.data.payload);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      const res = await axios.delete(
        `https://blogapp-x0mm.onrender.com/user-api/comment/${article._id}/${commentId}`,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Comment deleted");
        setArticle(res.data.payload);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete comment");
    }
  };

  const handleUpdateComment = async (commentId) => {
    if (!editingText.trim()) return;
    try {
      const res = await axios.put(
        `https://blogapp-x0mm.onrender.com/user-api/comment/${article._id}/${commentId}`,
        { comment: editingText },
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Comment updated");
        setArticle(res.data.payload);
        setEditingCommentId(null);
        setEditingText("");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update comment");
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* Header */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>✍️ {article.author?.firstName || "Author"}</div>

          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* Article Image (if exists) */}
      {article.articleImageUrl && (
        <div className="mb-8 w-full max-h-[500px] overflow-hidden rounded-2xl flex justify-center bg-[#f5f5f7]">
          <img 
            src={article.articleImageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover shadow-sm"
          />
        </div>
      )}

      {/* Content */}
      <div className={articleContent}>{article.content}</div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}
      {/* form to add comment if role is USER */}
      {/* USER actions */}
      {user?.role === "USER" && (
        <div className={articleActions}>
          <form onSubmit={handleSubmit(addComment)}>
            <input
              type="text"
              {...register("comment")}
              className={inputClass}
              placeholder="Write your comment here..."
            />
            <button type="submit" className="bg-amber-600 text-white px-5 py-2 rounded-2xl mt-5">
              Add comment
            </button>
          </form>
        </div>
      )}

      {/* comments */}
      {/* Comments */}
      <div className={commentsWrapper}>
        {article.comments?.length === 0 && <p className="text-[#a1a1a6] text-sm text-center">No comments yet</p>}

        {article.comments?.map((commentObj, index) => {
          const name = commentObj.user?.email || "User";
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={commentCard}>
              {/* Header */}
              <div className={commentHeader}>
                <div className={commentUserRow}>
                  <div className={avatar}>{firstLetter}</div>

                  <div>
                    <p className={commentUser}>{name}</p>
                    <p className={commentTime}>{formatDate(commentObj.createdAt || new Date())}</p>
                  </div>
                </div>
              </div>

              {/* Comment */}
              {editingCommentId === commentObj._id ? (
                <div className="mt-3 flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    className={inputClass + " flex-1"}
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleUpdateComment(commentObj._id)}
                      className="bg-[#0066cc] text-white text-sm px-4 py-2 rounded-xl hover:bg-[#004499] transition"
                    >
                      Save
                    </button>
                    <button 
                      onClick={() => {
                          setEditingCommentId(null);
                          setEditingText("");
                      }}
                      className="bg-[#e8e8ed] text-[#1d1d1f] text-sm px-4 py-2 rounded-xl hover:bg-[#d2d2d7] transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <p className={commentText}>{commentObj.comment}</p>
              )}

              {/* Edit/Delete Actions */}
              {user?._id === commentObj.user && editingCommentId !== commentObj._id && (
                <div className="flex gap-3 mt-3 justify-end border-t border-[#e8e8ed] pt-3">
                   <button 
                     onClick={() => {
                       setEditingCommentId(commentObj._id);
                       setEditingText(commentObj.comment);
                     }}
                     className="text-[#0066cc] text-xs font-semibold hover:underline"
                   >
                     Edit
                   </button>
                   <button 
                     onClick={() => handleDeleteComment(commentObj._id)}
                     className="text-[#ff3b30] text-xs font-semibold hover:underline"
                   >
                     Delete
                   </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;

// {
//   "user":"6989799b7013502767d3f82b",
//   "articleId":"6989750220ce5bf826ec4f7e",
//   "comment":"good article"

// }