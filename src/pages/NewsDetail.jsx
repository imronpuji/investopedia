import { Link, useParams } from 'react-router-dom';
import newsData from '../data/news.json';
import './NewsDetail.css';

export default function NewsDetail() {
  const { id } = useParams();
  const article = newsData.articles.find(a => a.id === id);

  if (!article) {
    return (
      <div className="detail-not-found">
        <h1>Article Not Found</h1>
        <p>The article you're looking for doesn't exist.</p>
        <Link to="/" className="back-link">← Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        <nav className="detail-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/">{article.category}</Link>
          <span>/</span>
          <span>Detail</span>
        </nav>

        <article className="detail-article">
          <header className="detail-header">
            <div className="detail-meta-top">
              <span className="detail-category">{article.category}</span>
              {article.emiten && (
                <span className="detail-emiten">{article.emitenName} ({article.emiten})</span>
              )}
            </div>
            
            <h1 className="detail-title">{article.title}</h1>
            
            <div className="detail-meta">
              <span className="detail-source">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                {article.source}
              </span>
              <span className="detail-date">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/>
                </svg>
                {new Date(article.date).toLocaleDateString('id-ID', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
              <span className="detail-time">
                <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                </svg>
                {article.time}
              </span>
            </div>
          </header>

          <div className="detail-summary">
            <h3>Ringkasan</h3>
            <p>{article.summary}</p>
          </div>

          <div 
            className="detail-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <footer className="detail-footer">
            <div className="detail-tags">
              <span className="tag">Keterbukaan Informasi</span>
              {article.emiten && <span className="tag">{article.emiten}</span>}
              <span className="tag">IDX</span>
            </div>
            
            {article.url && (
              <a 
                href={article.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="detail-original-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                  <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                </svg>
                Buka Dokumen Original (PDF)
              </a>
            )}
          </footer>
        </article>

        <div className="detail-back">
          <Link to="/" className="back-button">
            ← Kembali ke Halaman Utama
          </Link>
        </div>
      </div>
    </div>
  );
}
