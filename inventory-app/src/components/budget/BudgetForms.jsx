/* src/components/budget/BudgetForms.jsx */
import React, { useState } from "react";
import { FaTimes, FaSave } from "react-icons/fa";

// PERBAIKAN DI SINI: Ganti import ke file lokal
import "./Budget.css";

// --- FORM 1: INPUT ANGGARAN TAHUNAN (RKAP / PAGU OPEX) ---
export const FormBudget = ({ type, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    kode_akun: "",
    nama_anggaran: "",
    tahun: new Date().getFullYear(),
    pagu: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" style={modalStyle.overlay}>
      <div className="master-card" style={modalStyle.card}>
        <div style={modalStyle.header}>
          <h3 style={{ margin: 0, color: "#002b5c" }}>
            Tambah Anggaran {type}
          </h3>
          <button onClick={onClose} style={modalStyle.closeBtn}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={modalStyle.label}>Kode Anggaran / No. RKAP</label>
            <input
              type="text"
              className="search-input"
              required
              value={formData.kode_akun}
              onChange={(e) =>
                setFormData({ ...formData, kode_akun: e.target.value })
              }
              placeholder={
                type.includes("CAPEX")
                  ? "Contoh: 2440015"
                  : "Contoh: 5030905000"
              }
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={modalStyle.label}>Nama Program / Mata Anggaran</label>
            <textarea
              className="search-input"
              rows="2"
              required
              value={formData.nama_anggaran}
              onChange={(e) =>
                setFormData({ ...formData, nama_anggaran: e.target.value })
              }
              placeholder="Contoh: Implementasi dan Standarisasi IT Infrastruktur..."
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label style={modalStyle.label}>Tahun Anggaran</label>
              <input
                type="number"
                className="search-input"
                required
                value={formData.tahun}
                onChange={(e) =>
                  setFormData({ ...formData, tahun: e.target.value })
                }
              />
            </div>
            <div>
              <label style={modalStyle.label}>Nilai Pagu (Rp)</label>
              <input
                type="number"
                className="search-input"
                required
                value={formData.pagu}
                onChange={(e) =>
                  setFormData({ ...formData, pagu: e.target.value })
                }
                placeholder="0"
              />
            </div>
          </div>

          <div style={{ textAlign: "right", marginTop: "20px" }}>
            <button
              type="button"
              onClick={onClose}
              style={modalStyle.cancelBtn}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-add"
              style={{ display: "inline-flex", padding: "10px 20px" }}
            >
              <FaSave style={{ marginRight: "8px" }} /> Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- FORM 2: INPUT PEKERJAAN / KONTRAK (REALISASI CAPEX) ---
export const FormProject = ({ rkapParent, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    nama_pekerjaan: "",
    no_kontrak: "",
    vendor: "",
    nilai_kontrak: "",
    tgl_kontrak: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="modal-overlay" style={modalStyle.overlay}>
      <div className="master-card" style={modalStyle.card}>
        <div style={modalStyle.header}>
          <div>
            <h3 style={{ margin: 0, color: "#002b5c" }}>
              Tambah Realisasi Pekerjaan
            </h3>
            <p style={{ margin: "5px 0 0", fontSize: "0.8rem", color: "#666" }}>
              Induk RKAP: <strong>{rkapParent.kode}</strong>
            </p>
          </div>
          <button onClick={onClose} style={modalStyle.closeBtn}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={modalStyle.label}>Nama Pekerjaan</label>
            <textarea
              className="search-input"
              rows="3"
              required
              value={formData.nama_pekerjaan}
              onChange={(e) =>
                setFormData({ ...formData, nama_pekerjaan: e.target.value })
              }
              placeholder="Contoh: Pekerjaan CCTV Branch Belawan..."
            />
          </div>

          <div className="form-group" style={{ marginBottom: "15px" }}>
            <label style={modalStyle.label}>Nama Vendor / Pelaksana</label>
            <input
              type="text"
              className="search-input"
              value={formData.vendor}
              onChange={(e) =>
                setFormData({ ...formData, vendor: e.target.value })
              }
              placeholder="Contoh: PT. Telkom Indonesia"
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "15px",
              marginBottom: "15px",
            }}
          >
            <div>
              <label style={modalStyle.label}>No. Kontrak / SP</label>
              <input
                type="text"
                className="search-input"
                value={formData.no_kontrak}
                onChange={(e) =>
                  setFormData({ ...formData, no_kontrak: e.target.value })
                }
              />
            </div>
            <div>
              <label style={modalStyle.label}>Tanggal Kontrak</label>
              <input
                type="date"
                className="search-input"
                value={formData.tgl_kontrak}
                onChange={(e) =>
                  setFormData({ ...formData, tgl_kontrak: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={modalStyle.label}>Nilai Kontrak (Realisasi)</label>
            <input
              type="number"
              className="search-input"
              required
              value={formData.nilai_kontrak}
              onChange={(e) =>
                setFormData({ ...formData, nilai_kontrak: e.target.value })
              }
              placeholder="Rp 0"
              style={{ fontWeight: "bold", color: "#004494" }}
            />
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="button"
              onClick={onClose}
              style={modalStyle.cancelBtn}
            >
              Batal
            </button>
            <button
              type="submit"
              className="btn-add"
              style={{ display: "inline-flex", padding: "10px 20px" }}
            >
              <FaSave style={{ marginRight: "8px" }} /> Simpan Realisasi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Styling Internal Modal
const modalStyle = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: 1000,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backdropFilter: "blur(3px)",
  },
  card: {
    width: "550px",
    maxWidth: "90%",
    maxHeight: "90vh",
    overflowY: "auto",
    borderRadius: "16px",
    border: "1px solid #fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    marginBottom: "20px",
    borderBottom: "1px solid #eee",
    paddingBottom: "15px",
  },
  closeBtn: {
    background: "none",
    border: "none",
    fontSize: "1.2rem",
    cursor: "pointer",
    color: "#999",
    padding: "5px",
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    fontSize: "0.85rem",
    color: "#34495e",
  },
  cancelBtn: {
    background: "white",
    border: "1px solid #ddd",
    padding: "10px 20px",
    borderRadius: "8px",
    marginRight: "10px",
    cursor: "pointer",
    fontWeight: "600",
    color: "#555",
  },
};
