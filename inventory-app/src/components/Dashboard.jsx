import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h1 style={{ marginBottom: "20px", color: "#333" }}>
        Dashboard Overview
      </h1>

      {/* Contoh Kartu Statistik */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h3>Total Barang</h3>
          <p style={numberStyle}>1,240</p>
        </div>
        <div style={cardStyle}>
          <h3>Barang Masuk</h3>
          <p style={numberStyle}>45</p>
        </div>
        <div style={cardStyle}>
          <h3>Barang Keluar</h3>
          <p style={numberStyle}>12</p>
        </div>
        <div style={cardStyle}>
          <h3>Stok Menipis</h3>
          <p style={{ ...numberStyle, color: "#e74c3c" }}>5</p>
        </div>
      </div>
    </div>
  );
};

// Styling sederhana dalam file (inline style) untuk contoh
const cardStyle = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
  boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
  borderLeft: "4px solid #004494",
};

const numberStyle = {
  fontSize: "2rem",
  fontWeight: "bold",
  color: "#004494",
  margin: "10px 0 0",
};

export default Dashboard;
