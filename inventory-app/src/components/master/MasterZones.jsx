import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaMap,
  FaMapPin,
} from "react-icons/fa";
import "./MasterData.css"; // Menggunakan CSS yang sama

const MasterZones = () => {
  const [activeTab, setActiveTab] = useState("zona"); // 'zona' or 'subzona'
  const [searchTerm, setSearchTerm] = useState("");

  // --- MOCK DATA ---
  const zonas = [
    {
      code: "GDG-A",
      name: "Gedung Utama (Head Office)",
      desc: "Pusat administrasi dan manajemen",
    },
    {
      code: "GDG-B",
      name: "Gedung Operasional",
      desc: "Area teknis dan lapangan",
    },
    {
      code: "WRH-1",
      name: "Warehouse Belawan",
      desc: "Gudang penyimpanan logistik utama",
    },
  ];

  const subzonas = [
    {
      code: "LT-1",
      zona: "GDG-A",
      name: "Lantai 1 - Lobby & Resepsionis",
      desc: "Area publik",
    },
    {
      code: "R-MEETING",
      zona: "GDG-A",
      name: "Ruang Meeting Utama",
      desc: "Kapasitas 50 orang",
    },
    {
      code: "R-SERVER",
      zona: "GDG-B",
      name: "Ruang Server IT",
      desc: "Akses terbatas (Fingerprint)",
    },
    {
      code: "RAK-A1",
      zona: "WRH-1",
      name: "Rak Penyimpanan A1",
      desc: "Sparepart Mesin",
    },
  ];

  // Filter Data
  const filteredZonas = zonas.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredSubzonas = subzonas.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="master-wrapper">
      {/* HEADER */}
      <div className="master-header">
        <div>
          <h1 className="master-title">Manajemen Lokasi (Zona)</h1>
          <p className="master-breadcrumb">
            Dashboard / Master Data / Zona & Sub-Zona
          </p>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="master-card">
        {/* TABS */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "zona" ? "active" : ""}`}
            onClick={() => setActiveTab("zona")}
          >
            <FaMap style={{ marginRight: "8px" }} /> Data Zona (Gedung/Area)
          </button>
          <button
            className={`tab-btn ${activeTab === "subzona" ? "active" : ""}`}
            onClick={() => setActiveTab("subzona")}
          >
            <FaMapPin style={{ marginRight: "8px" }} /> Data Sub-Zona (Ruangan)
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
                activeTab === "zona" ? "Cari Zona..." : "Cari Sub-Zona..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-add">
            <FaPlus /> Tambah {activeTab === "zona" ? "Zona" : "Sub-Zona"}
          </button>
        </div>

        {/* CONTENT TABLE: ZONA */}
        {activeTab === "zona" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kode Zona</th>
                  <th>Nama Zona / Gedung</th>
                  <th>Keterangan</th>
                  <th>Jumlah Sub-Zona</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredZonas.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.code}</strong>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.desc}</td>
                    <td>
                      {subzonas.filter((s) => s.zona === item.code).length}{" "}
                      Ruangan
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

        {/* CONTENT TABLE: SUB-ZONA */}
        {activeTab === "subzona" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kode Sub-Zona</th>
                  <th>Zona Induk</th>
                  <th>Nama Ruangan / Area</th>
                  <th>Keterangan</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubzonas.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{item.code}</strong>
                    </td>
                    <td>
                      <span style={{ color: "#004494", fontWeight: "bold" }}>
                        {item.zona}
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

export default MasterZones;
