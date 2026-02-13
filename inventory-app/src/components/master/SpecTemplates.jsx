import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaClipboardList,
  FaBalanceScale,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import "./MasterData.css"; // Menggunakan CSS standar yang sudah kita buat

const SpecTemplates = () => {
  const [activeTab, setActiveTab] = useState("templates"); // 'templates' or 'units'
  const [searchTerm, setSearchTerm] = useState("");

  // --- MOCK DATA: MASTER SATUAN BAKU ---
  const units = [
    { code: "GB", name: "Gigabyte", category: "Storage/Memory" },
    { code: "TB", name: "Terabyte", category: "Storage" },
    { code: "MP", name: "Megapixel", category: "Camera" },
    { code: "PK", name: "Paardenkracht", category: "Power (AC)" },
    { code: "WATT", name: "Watt", category: "Electricity" },
    { code: "UNIT", name: "Unit (Pcs)", category: "General" },
  ];

  // --- MOCK DATA: TEMPLATE SPESIFIKASI ---
  const templates = [
    {
      id: 1,
      device: "Laptop (IT-EQ)",
      label: "Kapasitas RAM",
      inputType: "NUMBER",
      unit: "GB",
      required: true,
    },
    {
      id: 2,
      device: "Laptop (IT-EQ)",
      label: "Tipe Processor",
      inputType: "TEXT",
      unit: "-",
      required: true,
    },
    {
      id: 3,
      device: "Laptop (IT-EQ)",
      label: "Ukuran Layar",
      inputType: "NUMBER",
      unit: "INCH",
      required: false,
    },
    {
      id: 4,
      device: "CCTV (IT-EQ)",
      label: "Resolusi Kamera",
      inputType: "NUMBER",
      unit: "MP",
      required: true,
    },
    {
      id: 5,
      device: "CCTV (IT-EQ)",
      label: "Tipe Lensa",
      inputType: "DROPDOWN",
      unit: "-",
      options: "Fixed, Varifocal",
      required: true,
    },
    {
      id: 6,
      device: "AC Split (FURNITURE)",
      label: "Besaran PK",
      inputType: "NUMBER",
      unit: "PK",
      required: true,
    },
    {
      id: 7,
      device: "AC Split (FURNITURE)",
      label: "Konsumsi Daya",
      inputType: "NUMBER",
      unit: "WATT",
      required: false,
    },
  ];

  // Filter Data
  const filteredTemplates = templates.filter(
    (item) =>
      item.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredUnits = units.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="master-wrapper">
      {/* HEADER */}
      <div className="master-header">
        <div>
          <h1 className="master-title">Template Spesifikasi & Satuan</h1>
          <p className="master-breadcrumb">
            Dashboard / Master Data / Template Spesifikasi
          </p>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="master-card">
        {/* TABS */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "templates" ? "active" : ""}`}
            onClick={() => setActiveTab("templates")}
          >
            <FaClipboardList style={{ marginRight: "8px" }} /> Aturan Template
            (Per Jenis)
          </button>
          <button
            className={`tab-btn ${activeTab === "units" ? "active" : ""}`}
            onClick={() => setActiveTab("units")}
          >
            <FaBalanceScale style={{ marginRight: "8px" }} /> Master Satuan Baku
          </button>
        </div>

        {/* TOOLBAR */}
        <div className="table-toolbar">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder={
                activeTab === "templates"
                  ? "Cari Template..."
                  : "Cari Satuan..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-add">
            <FaPlus /> Tambah{" "}
            {activeTab === "templates" ? "Template Baru" : "Satuan Baru"}
          </button>
        </div>

        {/* CONTENT TABLE: TEMPLATES */}
        {activeTab === "templates" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Jenis Aset (Device)</th>
                  <th>Label Spesifikasi</th>
                  <th>Tipe Input</th>
                  <th>Satuan Baku</th>
                  <th style={{ textAlign: "center" }}>Wajib?</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTemplates.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.device}</strong>
                    </td>
                    <td>{item.label}</td>
                    <td>
                      <span
                        className={`status-badge ${
                          item.inputType === "NUMBER"
                            ? "status-active"
                            : item.inputType === "DROPDOWN"
                              ? "status-inactive"
                              : ""
                        }`}
                        style={{
                          color: "#555",
                          background: "#f0f2f5",
                          border: "1px solid #ddd",
                        }}
                      >
                        {item.inputType}
                      </span>
                      {item.inputType === "DROPDOWN" && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#7f8c8d",
                            marginTop: "4px",
                          }}
                        >
                          Opsi: {item.options}
                        </div>
                      )}
                    </td>
                    <td>
                      {item.unit !== "-" ? (
                        <strong style={{ color: "#004494" }}>
                          {item.unit}
                        </strong>
                      ) : (
                        <span style={{ color: "#ccc" }}>-</span>
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {item.required ? (
                        <FaCheck style={{ color: "#27ae60" }} />
                      ) : (
                        <FaTimes style={{ color: "#bdc3c7" }} />
                      )}
                    </td>
                    <td style={{ textAlign: "center" }}>
                      <button className="action-btn btn-edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn btn-delete" title="Hapus">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CONTENT TABLE: UNITS */}
        {activeTab === "units" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kode Satuan</th>
                  <th>Nama Satuan</th>
                  <th>Kategori Penggunaan</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUnits.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <span
                        style={{
                          background: "#e0f7fa",
                          color: "#006064",
                          padding: "4px 8px",
                          borderRadius: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        {item.code}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.category}</td>
                    <td style={{ textAlign: "center" }}>
                      <button className="action-btn btn-edit" title="Edit">
                        <FaEdit />
                      </button>
                      <button className="action-btn btn-delete" title="Hapus">
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecTemplates;
