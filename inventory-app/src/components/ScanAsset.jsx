import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as Icon from "lucide-react";

const ScanAsset = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await fetch(`/api/public/barang/${id}`);
        const data = await response.json();
        
        if (data.success) {
          setAsset(data.data);
        } else {
          setError(data.message || "Aset tidak ditemukan");
        }
      } catch (err) {
        setError("Terjadi kesalahan saat mengambil data aset. Pastikan server aktif.");
      } finally {
        setLoading(false);
      }
    };

    fetchAsset();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "tersedia": return { bg: "#dcfce7", color: "#16a34a" };
      case "dipinjam": return { bg: "#fef9c3", color: "#ca8a04" };
      case "non-operasional": return { bg: "#fee2e2", color: "#dc2626" };
      default: return { bg: "#f1f5f9", color: "#475569" };
    }
  };

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", background: "#f8fafc" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid #e2e8f0", borderTop: "4px solid #2563eb", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
        <p style={{ marginTop: "16px", color: "#64748b", fontWeight: "600" }}>Memuat Informasi Aset...</p>
      </div>
    );
  }

  if (error || !asset) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100vh", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: "20px", textAlign: "center" }}>
        <div style={{ background: "#fee2e2", padding: "20px", borderRadius: "50%", marginBottom: "20px" }}>
          <Icon.XCircle size={48} color="#ef4444" />
        </div>
        <h2 style={{ color: "#0f172a", marginBottom: "8px" }}>Aset Tidak Ditemukan</h2>
        <p style={{ color: "#64748b" }}>{error}</p>
      </div>
    );
  }

  const sColor = getStatusColor(asset.status);
  const imgSrc = asset.photo ? asset.photo : null;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #f0fdf4 0%, #e0f2fe 100%)", padding: "20px", fontFamily: "'Inter', sans-serif", display: "flex", justifyContent: "center", alignItems: "flex-start" }}>
      <div style={{ width: "100%", maxWidth: "480px", background: "#ffffff", borderRadius: "20px", overflow: "hidden", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1), 0 10px 15px -3px rgba(0,0,0,0.05)" }}>
        
        {/* Header / Foto */}
        <div style={{ position: "relative", height: "260px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          {imgSrc ? (
            <img src={imgSrc} alt={asset.name} style={{ width: "100%", height: "100%", objectFit: "contain", padding: "20px", filter: "drop-shadow(0 10px 15px rgba(0,0,0,0.1))" }} />
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#94a3b8" }}>
              <Icon.Image size={72} strokeWidth={1} style={{ opacity: 0.5 }} />
              <span style={{ marginTop: "12px", fontSize: "14px", fontWeight: "500", letterSpacing: "0.5px" }}>TIDAK ADA FOTO</span>
            </div>
          )}
          
          <div style={{ position: "absolute", top: "16px", right: "16px", background: sColor.bg, color: sColor.color, padding: "8px 14px", borderRadius: "30px", fontSize: "12px", fontWeight: "bold", letterSpacing: "0.5px", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: sColor.color, animation: "pulse 2s infinite" }}></div>
            {asset.status || "Unknown"}
          </div>
          <style>{`@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.2); } 100% { opacity: 1; transform: scale(1); } }`}</style>
        </div>

        {/* Info Utama */}
        <div style={{ padding: "28px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
            <span style={{ background: "linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)", color: "#fff", padding: "6px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: "700", letterSpacing: "0.5px", boxShadow: "0 2px 4px rgba(37,99,235,0.2)" }}>
              {asset.category || "UMUM"}
            </span>
          </div>
          <h1 style={{ fontSize: "24px", color: "#0f172a", margin: "0 0 6px 0", lineHeight: "1.3", fontWeight: "800", letterSpacing: "-0.5px" }}>{asset.name}</h1>
          <div style={{ display: "inline-block", background: "#f1f5f9", padding: "4px 8px", borderRadius: "6px", color: "#475569", fontSize: "13px", fontFamily: "monospace", fontWeight: "600", letterSpacing: "0.5px" }}>
            {asset.unit_id}
          </div>

          <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
            {asset.nm_pekerjaan && (
              <div style={{ display: "flex", alignItems: "flex-start", gap: "14px", background: "linear-gradient(to right, #fffbeb, #fef3c7)", padding: "16px", borderRadius: "12px", border: "1px solid #fde68a" }}>
                <div style={{ background: "#fcd34d", padding: "10px", borderRadius: "12px", color: "#b45309", boxShadow: "0 2px 4px rgba(251,191,36,0.3)" }}>
                  <Icon.Briefcase size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "11px", color: "#b45309", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Alokasi Pekerjaan</div>
                  <div style={{ fontSize: "14px", color: "#92400e", fontWeight: "600", lineHeight: "1.4" }}>{asset.nm_pekerjaan}</div>
                </div>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ background: "#f0fdf4", padding: "12px", borderRadius: "12px", color: "#16a34a" }}>
                <Icon.User size={20} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "2px" }}>Pemilik / Peminjam</div>
                <div style={{ fontSize: "15px", color: "#0f172a", fontWeight: "600" }}>{asset.pemilik || "Admin IT"}</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "12px", color: "#3b82f6" }}>
                <Icon.MapPin size={20} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "2px" }}>Lokasi Saat Ini</div>
                <div style={{ fontSize: "15px", color: "#0f172a", fontWeight: "600" }}>{asset.location || "Belum dialokasikan / Gudang"}</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              <div style={{ background: "#f1f5f9", padding: "12px", borderRadius: "12px", color: "#8b5cf6" }}>
                <Icon.Tag size={20} />
              </div>
              <div>
                <div style={{ fontSize: "12px", color: "#64748b", fontWeight: "600", marginBottom: "2px" }}>Merek & Tipe</div>
                <div style={{ fontSize: "15px", color: "#0f172a", fontWeight: "600" }}>
                  {asset.merek ? `${asset.merek} ` : ""}{asset.tipe ? asset.tipe : ""}
                  {!asset.merek && !asset.tipe && "Tidak spesifik"}
                </div>
              </div>
            </div>
          </div>
          
          <hr style={{ border: "none", borderTop: "2px dashed #e2e8f0", margin: "28px 0" }} />

          {/* Spesifikasi */}
          <h3 style={{ fontSize: "15px", color: "#0f172a", marginBottom: "16px", display: "flex", alignItems: "center", gap: "10px", fontWeight: "700" }}>
            <span style={{ background: "#0f172a", color: "#fff", padding: "4px", borderRadius: "6px", display: "flex" }}>
              <Icon.Settings2 size={16} />
            </span>
            Spesifikasi Teknis
          </h3>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {asset.specs && asset.specs.length > 0 ? (
              asset.specs.map((s, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", border: "1px solid #f1f5f9", padding: "14px 16px", borderRadius: "10px", transition: "all 0.2s ease" }}>
                  <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>{s.name}</span>
                  <span style={{ color: "#0f172a", fontSize: "14px", fontWeight: "700" }}>{s.value}</span>
                </div>
              ))
            ) : (
              <div style={{ textAlign: "center", background: "#f8fafc", color: "#94a3b8", fontSize: "13px", padding: "16px", borderRadius: "10px", border: "1px dashed #cbd5e1" }}>Tidak ada spesifikasi khusus</div>
            )}
            
            {asset.custom_specs && asset.custom_specs.length > 0 && asset.custom_specs.map((s, idx) => (
              <div key={`custom-${idx}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#f8fafc", border: "1px solid #f1f5f9", padding: "14px 16px", borderRadius: "10px" }}>
                <span style={{ color: "#64748b", fontSize: "13px", fontWeight: "500" }}>{s.name}</span>
                <span style={{ color: "#0f172a", fontSize: "14px", fontWeight: "700" }}>{s.value}</span>
              </div>
            ))}
          </div>

        </div>
        
        {/* Footer */}
        <div style={{ background: "linear-gradient(90deg, #0f172a 0%, #1e293b 100%)", color: "#94a3b8", padding: "20px", textAlign: "center", fontSize: "12px", borderTop: "1px solid #334155" }}>
          <div style={{ color: "#fff", fontWeight: "bold", fontSize: "14px", marginBottom: "4px", letterSpacing: "1px" }}>PELINDO</div>
          Asset Management System &copy; {new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default ScanAsset;
