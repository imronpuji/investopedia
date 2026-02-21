import { Link } from 'react-router-dom';
import './Header.css';

export default function Header({ menuOpen, setMenuOpen, categories, selectedCategory, setSelectedCategory }) {
  return (
    <header className="header">
      <div className="header-left">
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <Link to="/" className="header-logo">
          <span className="logo-icon">📈</span>
          <span className="logo-text">Investopedia</span>
        </Link>
      </div>
      
      <Link to="/admin" className="admin-btn">
        ➕ Tambah
      </Link>
    </header>
  );
}
