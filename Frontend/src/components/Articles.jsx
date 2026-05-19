import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../store/authStore";

function Articles() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth((s) => s);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/auth/articles");
        if (res.status === 200) setArticles(res.data.payload);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const categories = ["all", ...new Set(articles.map((a) => a.category))];

  const filtered = articles.filter(
    (a) => selectedCategory === "all" || a.category === selectedCategory
  );

  const formatDate = (d) =>
    new Date(d).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  const handleReadArticle = (article) => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    navigate(`/article/${article._id}`, { state: article });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#f5f5f7", minHeight: "100vh" }}>
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "4rem 2rem" }}>

        {/* Page heading */}
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <h1
            style={{
              fontSize: "2.4rem",
              fontWeight: 700,
              color: "#1d1d1f",
              letterSpacing: "-0.02em",
              marginBottom: 8,
            }}
          >
            Articles
          </h1>
          <p style={{ color: "#6e6e73", fontSize: 15 }}>
            Discover fresh ideas from our community
          </p>
        </div>

        {/* Category filter */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 36,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 18px",
                borderRadius: 999,
                border: "1px solid",
                borderColor: selectedCategory === cat ? "#0066cc" : "#d2d2d7",
                background: selectedCategory === cat ? "#0066cc" : "#fff",
                color: selectedCategory === cat ? "#fff" : "#6e6e73",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
                textTransform: "capitalize",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        {loading ? (
          <div style={{ textAlign: "center", color: "#a1a1a6", padding: "5rem 0" }}>
            Loading articles…
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", color: "#a1a1a6", padding: "5rem 0" }}>
            No articles found.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {filtered.map((article) => (
              <div
                key={article._id}
                onClick={() => handleReadArticle(article)}
                style={{
                  background: "#fff",
                  borderRadius: 18,
                  padding: "28px 24px",
                  cursor: "pointer",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  border: "1px solid #e8e8ed",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.08)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Cover image */}
                {article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    style={{
                      width: "100%",
                      height: 160,
                      objectFit: "cover",
                      borderRadius: 12,
                      marginBottom: 4,
                    }}
                  />
                )}

                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#0066cc",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {article.category}
                </span>

                <h2
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 600,
                    color: "#1d1d1f",
                    lineHeight: 1.4,
                    margin: 0,
                  }}
                >
                  {article.title}
                </h2>

                <p
                  style={{
                    fontSize: 14,
                    color: "#6e6e73",
                    lineHeight: 1.65,
                    margin: 0,
                    flexGrow: 1,
                  }}
                >
                  {article.content.slice(0, 100)}…
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "auto",
                    paddingTop: 12,
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <span style={{ fontSize: 12, color: "#a1a1a6" }}>
                    {formatDate(article.createdAt)}
                  </span>
                  <span style={{ fontSize: 13, color: "#0066cc", fontWeight: 500 }}>
                    Read →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Articles;