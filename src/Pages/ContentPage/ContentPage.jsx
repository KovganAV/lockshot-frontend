import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/AuthHeader/AuthHeader";

const ContentPage = () => {
  const navigate = useNavigate();

  const articles = [
    { id: 1, title: "Советы по улучшению меткости", description: "Узнайте, как улучшить свою меткость с помощью простых упражнений." },
    { id: 2, title: "Техника дыхания для стрельбы", description: "Контроль дыхания может существенно улучшить вашу точность." },
    { id: 3, title: "Лучшие аксессуары для стрельбы", description: "Обзор самых полезных аксессуаров для тренировок." },
  ];

  const videos = [
    { id: 1, title: "Основы стрельбы", videoId: "dQw4w9WgXcQ" },
    { id: 2, title: "Секреты точности", videoId: "oHg5SJYRHA0" },
    { id: 3, title: "Разбор ошибок начинающих", videoId: "9bZkp7q19f0" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArticleClick = (id) => {
    navigate(`/articles/${id}`);
  };

  const handleVideoClick = (id) => {
    navigate(`/videos/${id}`);
  };

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
