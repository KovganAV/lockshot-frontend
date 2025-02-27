import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import axios from "axios";

const ContentPage = () => {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const [articlesRes, videosRes] = await Promise.all([
          axios.get("http://localhost:5000/api/articles"),
          axios.get("http://localhost:5000/api/videos"),
        ]);
        setArticles(articlesRes.data);
        setVideos(videosRes.data);
      } catch (error) {
        console.error("Error fetching content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArticleClick = (id) => navigate(`/articles/${id}`);
  const handleVideoClick = (id) => navigate(`/videos/${id}`);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <AuthHeader />
      <main style={{ padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Поиск статей..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "8px",
            }}
          />
        </div>

        <section style={{ marginBottom: "40px" }}>
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article.id)}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "15px",
                    backgroundColor: "#f9f9f9",
                    cursor: "pointer",
                  }}
                >
                  <p style={{ color: "#007BFF", fontSize: "18px", fontWeight: "bold" }}>
                    {article.title}
                  </p>
                  <p>{article.description}</p>
                </div>
              ))
            ) : (
              <p>Ничего не найдено.</p>
            )}
          </div>
        </section>

        <section>
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => handleVideoClick(video.id)}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#f9f9f9",
                  cursor: "pointer",
                }}
              >
                <h3>{video.title}</h3>
                <iframe
                  width="100%"
                  height="200"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title={video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default ContentPage;
