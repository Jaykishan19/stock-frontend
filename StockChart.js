import React, { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

export default function StockChart({ symbol, points }) {
  const labels = useMemo(() => points.map(p => p.date), [points]);
  const values = useMemo(() => points.map(p => p.close), [points]);

  const data = {
    labels,
    datasets: [
      {
        label: `${symbol} - Close`,
        data: values,
        fill: false,
        borderColor: "rgba(59,130,246,1)",
        backgroundColor: "rgba(59,130,246,0.2)",
        pointRadius: 2,
        tension: 0.25
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: { mode: "index", intersect: false }
    },
    scales: {
      x: { ticks: { maxTicksLimit: 8 } },
      y: { beginAtZero: false }
    }
  };

  return (
    <div className="chart-card" style={{ height: 420 }}>
      <h3 className="chart-title">{symbol} • Last 30 Days</h3>
      <Line data={data} options={options} />
    </div>
  );
}
