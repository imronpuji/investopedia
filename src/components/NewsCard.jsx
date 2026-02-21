import { Link } from 'react-router-dom';
import './NewsCard.css';

export default function NewsCard({ news }) {
  return (
    <article className="news-card">
      <div className="news-meta">
        <span className="news-category">{news.category}</span>
        <span className="news-time">{news.time}</span>
      </div>
      <h3 className="news-title">{news.title}</h3>
      <p className="news-summary">{news.summary}</p>
      <div className="news-footer">
        <span className="news-source">{news.source || 'Investopedia'}</span>
        <Link to={`/news/${news.id}`} className="read-more">
          Read More →
        </Link>
      </div>
    </article>
  );
}
