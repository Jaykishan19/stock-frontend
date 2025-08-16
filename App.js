import React, { useEffect, useState } from "react";
import CompanyList from "./components/CompanyList";
import StockChart from "./components/StockChart";

export default function App() {
  const [companies, setCompanies] = useState([]);
  const [selected, setSelected] = useState(null);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    fetch("/api/companies").then(r => r.json()).then(setCompanies);
  }, []);

  const handleSelect = (symbol) => {
    setSelected(symbol);
    fetch(`/api/stocks/${symbol}`)
      .then(r => r.json())
      .then(setSeries);
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">📈 Stock Market Dashboard</div>
      </header>

      <div className="content">
        <aside className="sidebar">
          <CompanyList
            companies={companies}
            selected={selected}
            onSelect={handleSelect}
          />
        </aside>

        <main className="main">
          {selected ? (
            <StockChart symbol={selected} points={series} />
          ) : (
            <div className="empty">Select a company from the left to see its chart.</div>
          )}
        </main>
      </div>
    </div>
  );
}
