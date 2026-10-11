
import { useEffect, useState } from "react";
import api from "./api";
import AuthModal from "./AuthModal";
import "./App.css";
import TemplateDetails from "./TemplateDetails";

function App() {
  const [templates, setTemplates] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [authOpen, setAuthOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const handleLogin = ({ token, user }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    setCurrentUser(user);

    setShowFavorites(false);
    loadFavorites();
  };

  const loadFavorites = async () => {
    try {
      const response = await api.get("/favorites");

      const favorites = response.data.favorites || [];

      setFavoriteIds(
        favorites
          .map((favorite) => favorite.template?._id)
          .filter(Boolean)
      );
    } catch (error) {
      console.error("Could not load favorites:", error);
    }
  };


  const toggleFavorite = async (templateId) => {
    if (!currentUser) {
      setAuthOpen(true);
      return;
    }

    const isFavorite = favoriteIds.includes(templateId);

    try {
      if (isFavorite) {
        await api.delete(`/favorites/${templateId}`);

        setFavoriteIds((previous) =>
          previous.filter((id) => id !== templateId)
        );
      } else {
        await api.post(`/favorites/${templateId}`);

        setFavoriteIds((previous) => [...previous, templateId]);
      }
    } catch (error) {
      console.error("Could not update favorite:", error);
      alert(
        error.response?.data?.message ||
        "Could not update favorite. Please try again."
      );
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadFavorites();
    } else {
      setFavoriteIds([]);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("/templates", {
          params: {
            search: search.trim(),
            category: category === "All" ? "" : category,
          },
        });

        setTemplates(response.data.templates || []);
      } catch (err) {
        setError(
          "Could not load templates. Make sure your backend is running on port 5000."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [search, category]);

  const categories = [
    "All",
    "Landing Page",
    "Dashboard",
    "Portfolio",
    "E-commerce",
    "Authentication",
  ];

  return (
    <div className="app">
      <header className="navbar">
        <a className="brand" href="/">
          <span className="brand-icon">S</span>
          <span>StackStore</span>
        </a>

        <span className="nav-label">TEMPLATE MARKETPLACE</span>

        <div className="nav-actions">
          <a className="nav-link" href="#templates">
            Explore Templates
          </a>

          {currentUser ? (
            <>
              <span className="user-greeting">
                Hi, {currentUser.name}
              </span>

              <button
                className="auth-nav-button"
                onClick={() => {
                  localStorage.removeItem("token");
                  localStorage.removeItem("user");
                  delete api.defaults.headers.common.Authorization;
                  setCurrentUser(null);
                }}
              >
                Log out
              </button>
            </>
          ) : (
            <button
              className="auth-nav-button"
              onClick={() => setAuthOpen(true)}
            >
              Log in / Sign up
            </button>
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <span className="eyebrow">YOUR NEXT PROJECT STARTS HERE</span>

          <h1>
            Build faster.
            <br />
            <span>Launch smarter.</span>
          </h1>

          <p>
            Discover ready-to-use website templates and UI designs
            to kick-start your next great idea.
          </p>

          <a className="hero-button" href="#templates">
            Explore templates <span>↘</span>
          </a>

          <div className="hero-stats">
            <div>
              <strong>06</strong>
              <span>Starter templates</span>
            </div>
            <div>
              <strong>05</strong>
              <span>Categories</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Ready to explore</span>
            </div>
          </div>
        </section>

        <section className="templates-section" id="templates">
          <div className="section-heading">
            <div>
              <span className="eyebrow">THE COLLECTION</span>
              <h2>Find your starting point.</h2>
              <p>Explore the collection and find a design that fits your idea.</p>
            </div>

            <span className="template-count">
              {templates.length} templates
            </span>
          </div>

          <div className="toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                placeholder="Search templates..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
              {search && (
                <button
                  className="clear-search"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>


            <div className="category-list">
              {categories.map((item) => (
                <button
                  key={item}
                  className={`category-button ${category === item && !showFavorites ? "active" : ""
                    }`}
                  onClick={() => {
                    setCategory(item);
                    setShowFavorites(false);
                  }}
                >
                  {item}
                </button>
              ))}

              <button
                className={`category-button ${showFavorites ? "active" : ""
                  }`}
                onClick={() => setShowFavorites(true)}
              >
                ♥ Favorites
              </button>
            </div>

            <div className="sort-control">
              <label htmlFor="template-sort">Sort by</label>
              <select
                id="template-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                <option value="default">Default</option>
                <option value="name-asc">Name: A–Z</option>
                <option value="name-desc">Name: Z–A</option>
              </select>
            </div>

          </div>

          {loading ? (
            <div className="status-message">Loading templates...</div>
          ) : error ? (
            <div className="status-message error">{error}</div>
          ) : templates.length === 0 ? (
            <div className="status-message">
              No templates found. Try another search or category.
            </div>
          ) : (
            <div className="template-grid">
              {templates
                .filter(
                  (template) =>
                    !showFavorites || favoriteIds.includes(template._id)
                )
                .sort((a, b) => {
                  if (sortBy === "name-asc") {
                    return a.name.localeCompare(b.name);
                  }

                  if (sortBy === "name-desc") {
                    return b.name.localeCompare(a.name);
                  }

                  return 0;
                })
                .map((template, index) => (<article className="template-card" key={template._id}>
                  <div className={`template-preview preview-${index % 6}`}>
                    <span className="preview-label">
                      {template.category}
                    </span>
                    <button
                      type="button"
                      className={`favorite-button ${favoriteIds.includes(template._id) ? "is-favorite" : ""
                        }`}
                      onClick={() => toggleFavorite(template._id)}
                      aria-label={
                        favoriteIds.includes(template._id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                      title={
                        favoriteIds.includes(template._id)
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {favoriteIds.includes(template._id) ? "♥" : "♡"}
                    </button>
                    <div className="preview-art">
                      <div className="preview-window">
                        <div className="window-top">
                          <i />
                          <i />
                          <i />
                        </div>
                        <div className="window-content">
                          <div className="mock-sidebar" />
                          <div className="mock-main">
                            <div className="mock-heading" />
                            <div className="mock-line" />
                            <div className="mock-line short" />
                            <div className="mock-blocks">
                              <i />
                              <i />
                              <i />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="preview-number">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="template-info">
                    <span className="template-category">
                      {template.category}
                    </span>
                    <h3>{template.name}</h3>
                    <p>{template.description}</p>

                    <button
                      className="view-button"
                      onClick={() => setSelectedTemplate(template)}
                    >
                      View details <span>↗</span>
                    </button>
                  </div>
                </article>
                ))}
              {selectedTemplate && (
                <TemplateDetails
                  template={selectedTemplate}
                  isFavorite={favoriteIds.includes(selectedTemplate._id)}
                  onToggleFavorite={toggleFavorite}
                  onClose={() => setSelectedTemplate(null)}
                />
              )}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <a className="brand" href="/">
          <span className="brand-icon">S</span>
          <span>StackStore</span>
        </a>
        <p>Thoughtfully designed. Ready to build.</p>
        <span>© 2026 StackStore</span>
      </footer>
      {authOpen && (
        <AuthModal
          onClose={() => setAuthOpen(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}

export default App;
