import React from "react";

export default function CompanyList({ companies, selected, onSelect }) {
  return (
    <div>
      <div className="list-title">Companies</div>
      {companies.map((c) => (
        <div
          key={c.symbol}
          className={`item ${selected === c.symbol ? "active" : ""}`}
          onClick={() => onSelect(c.symbol)}
        >
          {c.name} <span style={{ color:"#6b7280" }}>({c.symbol})</span>
        </div>
      ))}
    </div>
  );
}
