import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import {
  articleCardClass,
  articleTitle,
  articleExcerpt,
  articleMeta,
  ghostBtn,
  loadingClass,
  errorClass,
  emptyStateClass,
  pageWrapper
} from "../styles/common";

function Articles() {
  const navigate = useNavigate();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getArticles = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          "https://blogapp-x0mm.onrender.com/user-api/articles",
          { withCredentials: true }
        );

        if (res.status === 200) {
          setArticles(res.data.payload);
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.error || "Failed to fetch articles. Please log in.");
      } finally {
        setLoading(false);
      }
    };

    getArticles();
  }, []);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, {
      state: article,
    });
  };

  if (loading) {
    return <p className={loadingClass}>Loading articles...</p>;
  }

  if (error) {
    return <p className={errorClass}>{error}</p>;
  }

  if (articles.length === 0) {
    return (
      <div className={emptyStateClass}>
        No articles published yet.
      </div>
    );
  }

  return (
    <div className={pageWrapper}>
     <h1 className="text-3xl font-bold text-[#1d1d1f] mb-10 tracking-tight">Explore Articles</h1>
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {articles.map((article) => (
        <div
          key={article._id}
          className={`${articleCardClass} flex flex-col`}
        >
          <div className="flex flex-col gap-2">
            {article.articleImageUrl && (
               <div className="w-full h-32 overflow-hidden rounded-md mb-2 bg-[#f5f5f7]">
                 <img src={article.articleImageUrl} alt="thumbnail" className="w-full h-full object-cover" />
               </div>
            )}
            <p className={articleMeta}>{article.category}</p>

            <p className={articleTitle}>{article.title}</p>

            <p className={articleExcerpt}>
              {article.content?.slice(0, 100)}...
            </p>
          </div>

          <button
            className={`${ghostBtn} mt-auto pt-4 flex gap-1`}
            onClick={() => openArticle(article)}
          >
            Read Article <span>&rarr;</span>
          </button>
        </div>
      ))}
      </div>
    </div>
  );
}

export default Articles;