import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import { toast } from "react-hot-toast";
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
  const { register, handleSubmit, reset } = useForm();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if article is transferred via state, use it
    if (article) return;

    // otherwise, make api req to read that article by id
    const getArticle = async () => {
      setLoading(true);

      try {
        const res = await axios.get(`\${import.meta.env.VITE_API_URL}/user-api/article/${id}`, {
          withCredentials: true,
        });
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load article");
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
    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        import.meta.env.VITE_API_URL + "/author-api/articles",
        { articleId: article._id, isArticleActive: newStatus },
        { withCredentials: true },
      );
      setArticle(res.data.payload);
      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message || "Operation failed";
      toast.error(msg);
      setError(msg);
    }
  };

  // edit article
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  // post comment by user
  const addComment = async (commentObj) => {
    if (!commentObj.comment?.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    commentObj.articleId = article._id;
    try {
      let res = await axios.put(import.meta.env.VITE_API_URL + "/user-api/articles", commentObj, {
        withCredentials: true,
      });
      if (res.status === 200) {
        setArticle(res.data.payload);
        reset();
        toast.success("Comment added!");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
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
          <div className={authorInfo}>
            ✍️ {article.isArticleActive ? "Published" : "Deleted"}
          </div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

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

      {/* USER: add comment */}
      {user?.role === "USER" && (
        <div className="mt-10">
          <h3 className="text-sm font-semibold text-[#1d1d1f] mb-3">Leave a comment</h3>
          <form onSubmit={handleSubmit(addComment)} className="flex gap-3">
            <input
              type="text"
              {...register("comment")}
              className={inputClass}
              placeholder="Write your comment here..."
            />
            <button
              type="submit"
              className="bg-[#0066cc] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#004499] transition whitespace-nowrap"
            >
              Post
            </button>
          </form>
        </div>
      )}

      {/* Comments */}
      <div className={commentsWrapper}>
        <h3 className="text-sm font-semibold text-[#1d1d1f] mb-1">
          Comments ({article.comments?.length || 0})
        </h3>

        {article.comments?.length === 0 && (
          <p className="text-[#a1a1a6] text-sm text-center py-6">No comments yet. Be the first!</p>
        )}

        {article.comments?.map((commentObj, index) => {
          const name =
            commentObj.user?.firstName
              ? `${commentObj.user.firstName} ${commentObj.user.lastName || ""}`.trim()
              : commentObj.user?.email || "User";
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
              <p className={commentText}>{commentObj.comment}</p>
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