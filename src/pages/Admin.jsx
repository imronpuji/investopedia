import { useState } from 'react';
import './Admin.css';

export default function Admin({ onSave, existingArticles = [] }) {
  const [form, setForm] = useState({
    title: '',
    summary: '',
    category: 'Keterbukaan Informasi',
    source: 'IDX',
    url: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [message, setMessage] = useState('');

  const categories = [
    'Keterbukaan Informasi',
    'Market Summary',
    'Stock Analysis',
    'Corporate Action',
    'Economy',
    'Global Markets'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate unique ID
    const slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      .substring(0, 30);
    const uniqueId = `${slug}-${Date.now().toString(36)}`;
    
    const timeAgo = 'Just now';
    const dateISO = new Date(form.date).toISOString();
    
    const newArticle = {
      id: uniqueId,
      ...form,
      time: timeAgo,
      date: dateISO
    };
    
    onSave([newArticle, ...existingArticles]);
    setMessage('✅ Article saved successfully!');
    setForm({
      title: '',
      summary: '',
      category: 'Keterbukaan Informasi',
      source: 'IDX',
      url: '',
      date: new Date().toISOString().split('T')[0]
    });
    
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>📝 Add New Article</h1>
        <p>Add news manually to Investopedia</p>
      </div>
      
      {message && <div className="success-message">{message}</div>}
      
      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({...form, title: e.target.value})}
            placeholder="Enter article title..."
            required
          />
        </div>
        
        <div className="form-group">
          <label>Summary</label>
          <textarea
            value={form.summary}
            onChange={(e) => setForm({...form, summary: e.target.value})}
            placeholder="Enter article summary..."
            rows="4"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({...form, category: e.target.value})}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Source</label>
            <input
              type="text"
              value={form.source}
              onChange={(e) => setForm({...form, source: e.target.value})}
              placeholder="e.g., IDX, Investopedia"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>URL (optional)</label>
          <input
            type="url"
            value={form.url}
            onChange={(e) => setForm({...form, url: e.target.value})}
            placeholder="https://..."
          />
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({...form, date: e.target.value})}
          />
        </div>
        
        <button type="submit" className="submit-btn">
          💾 Save Article
        </button>
      </form>
      
      <div className="existing-articles">
        <h3>Existing Articles ({existingArticles.length})</h3>
        <div className="articles-list">
          {existingArticles.map(article => (
            <div key={article.id} className="article-item">
              <span className="article-category">{article.category}</span>
              <span className="article-title">{article.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
