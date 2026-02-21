import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { newsCategories } from './data/stockData';
import newsData from './data/news.json';
import Header from './components/Header';
import NewsCard from './components/NewsCard';
import Sidebar from './components/Sidebar';
import Admin from './pages/Admin';
import NewsDetail from './pages/NewsDetail';
import './App.css';

// Helper to get date label
function getDateLabel(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const newsDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  
  const diffDays = Math.floor((today - newsDate) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Hari Ini';
  if (diffDays === 1) return 'Kemarin';
  if (diffDays === 2) return '2 Hari yang Lalu';
  if (diffDays < 7) return `${diffDays} Hari yang Lalu`;
  return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Group news by date
function groupNewsByDate(articles) {
  const groups = {};
  
  articles.forEach(article => {
    const label = getDateLabel(article.date);
    if (!groups[label]) {
      groups[label] = [];
    }
    groups[label].push(article);
  });
  
  return groups;
}

// Home Page Component
function HomePage({ selectedCategory, setSelectedCategory }) {
  const [news, setNews] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    setNews(newsData.articles || []);
    setLastUpdated(newsData.lastUpdated);
  }, []);

  const filteredNews = selectedCategory === 'All' 
    ? news 
    : news.filter(n => n.category === selectedCategory);
    
  const groupedNews = groupNewsByDate(filteredNews);

  return (
    <main className="main-content">
      <div className="news-section">
        <div className="section-header">
          <h2>
            {selectedCategory === 'All' ? 'Berita Terbaru' : selectedCategory}
            <span className="last-updated">
              • {new Date(lastUpdated).toLocaleString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </h2>
        </div>
        
        {filteredNews.length === 0 ? (
          <div className="loading">
            <p>📰 Tidak ada berita</p>
          </div>
        ) : (
          Object.entries(groupedNews).map(([dateLabel, articles]) => (
            <div key={dateLabel} className="news-group">
              <h3 className="date-header">{dateLabel}</h3>
              <div className="news-grid">
                {articles.map(article => (
                  <NewsCard key={article.id} news={article} />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}

// App Content with Routing
function AppContent() {
  const [news, setNews] = useState(newsData.articles || []);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSaveNews = (newArticles) => {
    setNews(newArticles);
  };

  return (
    <div className="app">
      <Header 
        menuOpen={menuOpen} 
        setMenuOpen={setMenuOpen} 
        categories={newsCategories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          <button 
            className="menu-close"
            onClick={() => setMenuOpen(false)}
          >
            ✕
          </button>
          <nav className="menu-nav">
            <button 
              className={`menu-item ${selectedCategory === 'All' ? 'active' : ''}`}
              onClick={() => { setSelectedCategory('All'); setMenuOpen(false); }}
            >
              Semua Berita
            </button>
            {newsCategories.map(cat => (
              <button 
                key={cat}
                className={`menu-item ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => { setSelectedCategory(cat); setMenuOpen(false); }}
              >
                {cat}
              </button>
            ))}
            <hr />
            <Link to="/admin" className="menu-item" onClick={() => setMenuOpen(false)}>
              ➕ Tambah Berita
            </Link>
          </nav>
        </div>
      )}
      
      <Routes>
        <Route 
          path="/" 
          element={<HomePage selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} 
        />
        <Route 
          path="/admin" 
          element={<Admin onSave={handleSaveNews} existingArticles={news} />} 
        />
        <Route path="/news/:id" element={<NewsDetail />} />
      </Routes>
      <footer className="footer">
        <p>© 2026 Investopedia • Portal Berita Saham Indonesia</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
