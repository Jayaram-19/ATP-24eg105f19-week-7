import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  loadingClass,
} from "../styles/common";
import { useAuth } from "../store/authStore";

function WriteArticles() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ✅ save article safely
  const submitArticle = async (articleObj) => {
    // 🔴 check user first
    if (!currentUser?._id) {
      alert("Please login first");
      return;
    }

    setLoading(true);

    // ✅ create FormData to send file and data
    const formData = new FormData();
    formData.append("title", articleObj.title);
    formData.append("category", articleObj.category);
    formData.append("content", articleObj.content);
    formData.append("author", currentUser._id);
    if (articleObj.articleImage && articleObj.articleImage[0]) {
      formData.append("articleImage", articleObj.articleImage[0]);
    }

    try {
      const res = await axios.post(
        "https://blogapp-x0mm.onrender.com/author-api/article",
        formData,
        { 
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      if (res.status === 200 || res.status === 201) {
        reset(); // ✅ clear form
        navigate("/author-profile/articles"); // ✅ correct route
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={formCard}>
      <h2 className={formTitle}>Write New Article</h2>

      {/* 🔴 Optional: show message if user not ready */}
      {!currentUser && (
        <p className={errorClass}>Please login to write an article</p>
      )}

      <form onSubmit={handleSubmit(submitArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input
            type="text"
            className={inputClass}
            placeholder="Enter article title"
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 5,
                message: "Title must be at least 5 characters",
              },
            })}
          />

          {errors.title && (
            <p className={errorClass}>{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div className={formGroup}>
          <label className={labelClass}>Category</label>

          <select
            className={inputClass}
            {...register("category", {
              required: "Category is required",
            })}
          >
            <option value="">Select category</option>
            <option value="technology">Technology</option>
            <option value="programming">Programming</option>
            <option value="ai">AI</option>
            <option value="web-development">Web Development</option>
          </select>

          {errors.category && (
            <p className={errorClass}>{errors.category.message}</p>
          )}
        </div>

        {/* Content */}
        <div className={formGroup}>
          <label className={labelClass}>Content</label>

          <textarea
            rows="8"
            className={inputClass}
            placeholder="Write your article content..."
            {...register("content", {
              required: "Content is required",
              minLength: {
                value: 50,
                message: "Content must be at least 50 characters",
              },
            })}
          />

          {errors.content && (
            <p className={errorClass}>{errors.content.message}</p>
          )}
        </div>

        {/* Article Image */}
        <div className={formGroup}>
          <label className={labelClass}>Article Image</label>
          <input
            type="file"
            className={inputClass}
            accept="image/png, image/jpeg, image/webp"
            {...register("articleImage")}
          />
        </div>

        {/* Submit */}
        <button
          className={submitBtn}
          type="submit"
          disabled={loading || !currentUser} // ✅ prevent click
        >
          {loading ? "Publishing..." : "Publish Article"}
        </button>

        {loading && (
          <p className={loadingClass}>Publishing article...</p>
        )}
      </form>
    </div>
  );
}

export default WriteArticles;