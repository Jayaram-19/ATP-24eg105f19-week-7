import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'
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
  const [imagePreview, setImagePreview] = useState(null);
  const currentUser = useAuth((state) => state.currentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //save article
  const submitArticle = async (articleObj) => {
    setLoading(true);

    //add authorId to articleObj (handle both DB object and JWT token object)
    const authorId = currentUser._id || currentUser.id;
    console.log("Author ID:", authorId);
    console.log("Current user:", currentUser);

    try {
      setLoading(true);

      // Build multipart/form-data so the image file can be uploaded
      const formData = new FormData();
      formData.append("author", authorId);
      formData.append("title", articleObj.title);
      formData.append("category", articleObj.category);
      formData.append("content", articleObj.content);
      if (articleObj.imageUrl?.[0]) {
        formData.append("imageUrl", articleObj.imageUrl[0]);
      }

      console.log("Form data prepared:", { 
        author: authorId,
        title: articleObj.title,
        category: articleObj.category,
        contentLength: articleObj.content?.length,
        hasImage: !!articleObj.imageUrl?.[0]
      });

      let res = await axios.post(
        import.meta.env.VITE_API_URL + "/author-api/article",
        formData,
        { withCredentials: true }
      );

      if (res.status === 201) {
        toast.success("Article published successfully");
        reset();
        setImagePreview(null);
        navigate("../articles");
      }
    } catch (err) {
       console.error("Error publishing article:", err.response?.data || err);
       toast.error(err.response?.data?.error || err.response?.data?.message || "Failed to publish article");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={formCard}>
      <h2 className={formTitle}>Write New Article</h2>

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

          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
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

          {errors.category && <p className={errorClass}>{errors.category.message}</p>}
        </div>

        {/* Cover Image (optional) */}
        <div className={formGroup}>
          <label className={labelClass}>Cover Image (optional)</label>

          <input
            type="file"
            accept="image/png, image/jpeg"
            className={inputClass}
            {...register("imageUrl", {
              validate: (files) => {
                if (!files?.[0]) return true; // optional
                return (
                  ["image/png", "image/jpeg"].includes(files[0].type) ||
                  "Only JPG/PNG allowed"
                );
              },
              onChange: (e) => {
                const file = e.target.files?.[0];
                if (file) setImagePreview(URL.createObjectURL(file));
                else setImagePreview(null);
              },
            })}
          />

          {errors.imageUrl && <p className={errorClass}>{errors.imageUrl.message}</p>}

          {/* Preview */}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Cover preview"
              style={{
                marginTop: 10,
                width: "100%",
                maxHeight: 220,
                objectFit: "cover",
                borderRadius: 10,
                border: "1px solid #e8e8ed",
              }}
            />
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

          {errors.content && <p className={errorClass}>{errors.content.message}</p>}
        </div>

        {/* Submit */}
        <button className={submitBtn} type="submit" disabled={loading}>
          {loading ? "Publishing..." : "Publish Article"}
        </button>

        {loading && <p className={loadingClass}>Publishing article...</p>}
      </form>
    </div>
  );
}

export default WriteArticles;