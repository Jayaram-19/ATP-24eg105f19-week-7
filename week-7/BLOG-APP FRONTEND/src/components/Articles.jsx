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
} from "../Styles/common";

function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/user-api/articles");
        setArticles(res.data.payload || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const openArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  if (loading) return <p className={loadingClass}>Loading articles...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (articles.length === 0) return <div className={emptyStateClass}>No articles found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-[#1d1d1f]">Latest Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.filter(a => a.isArticleActive).map((article) => (
          <div key={article._id} className={`${articleCardClass} relative flex flex-col`}>
            <div className="flex flex-col gap-2">
              <p className={articleMeta}>{article.category}</p>
              <p className={articleTitle}>{article.title}</p>
              <p className={articleExcerpt}>{article.content.slice(0, 100)}...</p>
            </div>

            <button className={`${ghostBtn} mt-auto pt-4`} onClick={() => openArticle(article)}>
              Read More →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Articles;
