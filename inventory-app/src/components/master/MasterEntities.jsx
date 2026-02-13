import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaMapMarkerAlt,
  FaBuilding,
} from "react-icons/fa";
import "./MasterData.css";

const MasterEntities = () => {
  const [activeTab, setActiveTab] = useState("entity"); // 'entity' or 'branch'
  const [searchTerm, setSearchTerm] = useState("");

  // --- MOCK DATA ---
  const entities = [
    { code: "SPMT", name: "PT Pelindo Multi Terminal", slug: "spmt" },
    { code: "PTP", name: "PT Pelabuhan Tanjung Priok", slug: "ptp" },
    { code: "IKT", name: "PT Indonesia Kendaraan Terminal", slug: "ikt" },
  ];

  const branches = [
    {
      code: "BLW",
      entity: "SPMT",
      name: "Branch Belawan",
      address: "Jl. Sumatera No.1, Belawan",
      lat: "3.7844",
      long: "98.6865",
      active: true,
    },
    {
      code: "DMI",
      entity: "SPMT",
      name: "Branch Dumai",
      address: "Jl. Sultan Syarif Kasim, Dumai",
      lat: "1.6657",
      long: "101.4460",
      active: true,
    },
    {
      code: "TJI",
      entity: "PTP",
      name: "Tanjung Intan",
      address: "Jl. Laut Jawa, Cilacap",
      lat: "-7.7302",
      long: "109.0205",
      active: true,
    },
  ];

  // Filter Data
  const filteredEntities = entities.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const filteredBranches = branches.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="master-wrapper">
      {/* HEADER */}
      <div className="master-header">
        <div>
          <h1 className="master-title">Master Data Management</h1>
          <p className="master-breadcrumb">
            Dashboard / Master Data / Entity & Branch
          </p>
        </div>
      </div>

      {/* CARD CONTENT */}
      <div className="master-card">
        {/* TABS */}
        <div className="tabs-container">
          <button
            className={`tab-btn ${activeTab === "entity" ? "active" : ""}`}
            onClick={() => setActiveTab("entity")}
          >
            <FaBuilding style={{ marginRight: "8px" }} /> Data Entitas
          </button>
          <button
            className={`tab-btn ${activeTab === "branch" ? "active" : ""}`}
            onClick={() => setActiveTab("branch")}
          >
            <FaMapMarkerAlt style={{ marginRight: "8px" }} /> Data Cabang
            (Branch)
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
                activeTab === "entity" ? "Cari Entitas..." : "Cari Cabang..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-add">
            <FaPlus /> Tambah {activeTab === "entity" ? "Entitas" : "Cabang"}
          </button>
        </div>

        {/* CONTENT TABLE: ENTITY */}
        {activeTab === "entity" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kode Entitas</th>
                  <th>Nama Perusahaan</th>
                  <th>Slug / Alias</th>
                  <th>Jumlah Cabang</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntities.map((ent, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{ent.code}</strong>
                    </td>
                    <td>{ent.name}</td>
                    <td>
                      <span
                        style={{
                          background: "#eee",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontSize: "0.8rem",
                        }}
                      >
                        {ent.slug}
                      </span>
                    </td>
                    <td>
                      {branches.filter((b) => b.entity === ent.code).length}{" "}
                      Cabang
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

        {/* CONTENT TABLE: BRANCH */}
        {activeTab === "branch" && (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Kode Cabang</th>
                  <th>Entitas Induk</th>
                  <th>Nama Cabang</th>
                  <th>Alamat & Koordinat</th>
                  <th>Status</th>
                  <th style={{ textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredBranches.map((br, index) => (
                  <tr key={index}>
                    <td>
                      <strong>{br.code}</strong>
                    </td>
                    <td>
                      <span style={{ color: "#004494", fontWeight: "bold" }}>
                        {br.entity}
                      </span>
                    </td>
                    <td>{br.name}</td>
                    <td>
                      <div>{br.address}</div>
                      <div
                        style={{
                          fontSize: "0.75rem",
                          color: "#7f8c8d",
                          marginTop: "4px",
                        }}
                      >
                        Lat: {br.lat}, Long: {br.long}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${br.active ? "status-active" : "status-inactive"}`}
                      >
                        {br.active ? "ACTIVE" : "INACTIVE"}
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
      </div>
    </div>
  );
};

export default MasterEntities;
