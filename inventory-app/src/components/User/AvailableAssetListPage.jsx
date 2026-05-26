import React, { useMemo } from "react";
import { assetsMock, fmtIDR, categoryConf } from "./Data";
import { Ico } from "./Peminjaman"; // Reuse icon component from Peminjaman

// Simple Asset List Page showing available assets
export default function AvailableAssetListPage() {
  const available = useMemo(() =>
    assetsMock.filter(a => a.status === "AVAILABLE"), []);

  if (available.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#64748b" }}>
        <p>Tidak ada aset yang tersedia.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "16px", color: "#0f172a" }}>Aset Tersedia</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" }}>
        {available.map(a => {
          const cat = categoryConf[a.category] || categoryConf.OTHER;
          return (
            <div key={a.id} style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px", background: "#fff" }}>
              <div style={{ marginBottom: "8px", fontWeight: 600, color: "#0f172a" }}>{a.name}</div>
              <div style={{ fontSize: "12px", color: "#475569" }}>{a.brand}</div>
              <div style={{ fontSize: "12px", color: "#475569" }}>{a.serial}</div>
              <div style={{ marginTop: "8px", fontWeight: 700, color: "#2563eb" }}>{fmtIDR(a.price)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
