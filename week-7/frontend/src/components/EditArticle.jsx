import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router";

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

function EditArticle() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);

  // ✅ get article from previous page
  const article = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // ✅ set existing values (same as your image)
  useEffect(() => {
    if (!article) return;

    setValue("title", article.title);
    setValue("category", article.category);
    setValue("content", article.content);
  }, [article, setValue]);

  // ✅ update article (fixed version)
  const updateArticle = async (modifiedArticle) => {
    try {
      setLoading(true);

      // ✅ add articleId
      modifiedArticle.articleId = article._id;

      console.log("Sending:", modifiedArticle);

      let res = await axios.put(
        "https://blogapp-x0mm.onrender.com/author-api/article",
        modifiedArticle,
        { withCredentials: true }
      );

      if (res.status === 200) {
        navigate(`/article/${article._id}`, {
          state: res.data.payload,
        });
      }
    } catch (err) {
      console.log("ERROR:", err.response);
    } finally {
      setLoading(false);
    }
  };

  // ❌ no article
  if (!article) {
    return <p className={errorClass}>No article data found</p>;
  }

  return (
    <div className={`${formCard} mt-10`}>
      <h2 className={formTitle}>Edit Article</h2>

      <form onSubmit={handleSubmit(updateArticle)}>
        {/* Title */}
        <div className={formGroup}>
          <label className={labelClass}>Title</label>

          <input
            type="text"
            className={inputClass}
            {...register("title", {
              required: "Title is required",
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
            {...register("content", {
              required: "Content is required",
            })}
          />

          {errors.content && (
            <p className={errorClass}>{errors.content.message}</p>
          )}
        </div>

        {/* Submit */}
        <button className={submitBtn} type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Article"}
        </button>

        {loading && (
          <p className={loadingClass}>Updating article...</p>
        )}
      </form>
    </div>
  );
}

export default EditArticle;