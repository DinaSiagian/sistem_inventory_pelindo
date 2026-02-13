import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaTags,
  FaTag,
} from "react-icons/fa";
import "./MasterData.css"; // Menggunakan CSS yang sama

const MasterCategories = () => {
  const [activeTab, setActiveTab] = useState("kategori"); // 'kategori' or 'jenis'
  const [searchTerm, setSearchTerm] = useState("");

  // --- MOCK DATA ---
  const categories = [
    { code: "IT-EQ", name: "IT Equipment", desc: "Perangkat Keras & Komputer" },
    {
      code: "VEHICLE",
      name: "Kendaraan Operasional",
      desc: "Mobil, Motor, Truk",
    },
    {
      code: "FURNITURE",
      name: "Furniture Kantor",
      desc: "Meja, Kursi, Lemari",
    },
    { code: "MCH", name: "Mesin & Alat Berat", desc: "Crane, Forklift" },
  ];

  const types = [
    {
      code: "LPT",
      category: "IT-EQ",
      name: "Laptop",
      desc: "Laptop kerja karyawan",
    },
    {
      code: "SRV",
      category: "IT-EQ",
      name: "Server",
      desc: "Server Rackmount",
    },
    {
      code: "CCTV",
      category: "IT-EQ",
      name: "Kamera CCTV",
      desc: "Kamera pengawas indoor/outdoor",
    },
    {
      code: "MBL-OPR",
      category: "VEHICLE",
      name: "Mobil Operasional",
      desc: "Avanza, Innova",
    },
    {
      code: "FORKLIFT",
      category: "MCH",
      name: "Forklift 5 Ton",
      desc: "Alat angkut gudang",
    },
  ];

  // Filter Data
  const filteredCategories = categories.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredTypes = types.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="master-wrapper">
      {/* HEADER */}
      <div className="master-header">
        <div>
          <h1 className="master-title">Kategori & Jenis Aset</h1>
          <p className="master-breadcrumb">
            Dashboard / Master Data / Kategori
          </p>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="master-card">
        {/* TABS */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "kategori" ? "active" : ""}`}
            onClick={() => setActiveTab("kategori")}
          >
            <FaTags style={{ marginRight: "8px" }} /> Kategori Aset (Level 1)
          </button>
          <button
            className={`tab-btn ${activeTab === "jenis" ? "active" : ""}`}
            onClick={() => setActiveTab("jenis")}
          >
            <FaTag style={{ marginRight: "8px" }} /> Jenis Aset (Level 2)
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
                activeTab === "kategori" ? "Cari Kategori..." : "Cari Jenis..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-add">
            <FaPlus /> Tambah {activeTab === "kategori" ? "Kategori" : "Jenis"}
          </button>
        </div>

        {/* CONTENT TABLE: KATEGORI */}
        {activeTab === "kategori" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kode Kategori</th>
                  <th>Nama Kategori</th>
                  <th>Deskripsi</th>
                  <th>Total Jenis</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.code}</strong>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>
                      <span
                        className="status-badge status-active"
                        style={{ color: "#004494", background: "#e0f7fa" }}
                      >
                        {types.filter((t) => t.category === item.code).length}{" "}
                        Jenis
                      </span>
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

        {/* CONTENT TABLE: JENIS */}
        {activeTab === "jenis" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kode Jenis</th>
                  <th>Kategori Induk</th>
                  <th>Nama Jenis Aset</th>
                  <th>Keterangan</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredTypes.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.code}</strong>
                    </td>
                    <td>
                      <span style={{ color: "#004494", fontWeight: "bold" }}>
                        {item.category}
                      </span>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
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

export default MasterCategories;
