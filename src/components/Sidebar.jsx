import './Sidebar.css';

export default function Sidebar({ categories = [], onCategorySelect, selectedCategory = 'All' }) {
  return (
    <aside className="sidebar">
      <h3>Categories</h3>
      <ul className="category-list">
        <li>
          <a 
            href="#" 
            className={selectedCategory === 'All' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); onCategorySelect?.('All'); }}
          >
            All News
          </a>
        </li>
        {categories.map((cat, i) => (
          <li key={i}>
            <a 
              href="#"
              className={selectedCategory === cat ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); onCategorySelect?.(cat); }}
            >
              {cat}
            </a>
          </li>
        ))}
      </ul>
      
      <div className="sidebar-section">
        <h3>Market Status</h3>
        <div className="market-status open">
          <span className="status-dot"></span>
          <span>Open</span>
        </div>
        <p className="market-time">Closes in 4h 30m</p>
      </div>
      
      <div className="sidebar-section">
        <h3>Quick Stats</h3>
        <div className="stat-item">
          <span>Volume</span>
          <span className="stat-value">12.4B</span>
        </div>
        <div className="stat-item">
          <span>Gainers</span>
          <span className="stat-value positive">187</span>
        </div>
        <div className="stat-item">
          <span>Losers</span>
          <span className="stat-value negative">142</span>
        </div>
      </div>
    </aside>
  );
}
