import { stockData } from '../data/stockData';
import './StockTicker.css';

export default function StockTicker() {
  return (
    <div className="stock-ticker">
      <div className="ticker-section">
        <h3>Indices</h3>
        <div className="indices-grid">
          {stockData.indices.map((index, i) => (
            <div key={i} className="index-card">
              <span className="index-name">{index.name}</span>
              <span className="index-value">{index.value}</span>
              <span className={`index-change ${index.positive ? 'positive' : 'negative'}`}>
                {index.change}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="ticker-section">
        <h3>Top Movers</h3>
        <div className="movers-grid">
          {stockData.movers.map((stock, i) => (
            <div key={i} className="mover-card">
              <span className="stock-code">{stock.code}</span>
              <span className="stock-price">{stock.price}</span>
              <span className={`stock-change ${stock.positive ? 'positive' : 'negative'}`}>
                {stock.change}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
