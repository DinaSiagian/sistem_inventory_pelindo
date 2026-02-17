import React, { useState, useMemo } from "react";
import { mockOpex, mockCapex } from "../data/mockData"; // Pastikan path ini benar
import "./BudgetManagement.css"; // Import CSS yang baru dibuat

// Import Ikon
import {
  PieChart,
  TrendingUp,
  DollarSign,
  Search,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Briefcase,
  Monitor,
} from "lucide-react";

const BudgetManagement = () => {
  const [activeTab, setActiveTab] = useState("capex");
  const [expandedRow, setExpandedRow] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [year, setYear] = useState(2026);

  // --- LOGIC (Sama seperti sebelumnya) ---
  const rawData = activeTab === "capex" ? mockCapex : mockOpex;

  const processedData = useMemo(() => {
    return rawData
      .map((item) => {
        let usedAmount = 0;
        let transactions = [];
        let pagu = 0;
        let itemName = "";
        let itemId = "";

        if (activeTab === "capex") {
          pagu = item.nilai_anggaran_rkap;
          itemName = item.nm_anggaran_capex;
          itemId = item.kd_anggaran_capex;
          transactions = item.projects || [];
          usedAmount = transactions.reduce(
            (acc, curr) => acc + curr.nilai_kontrak,
            0,
          );
        } else {
          pagu = item.nilai_anggaran_tahunan;
          itemName = item.nm_anggaran_master;
          itemId = item.id_anggaran_tahunan;
          transactions = item.assets || [];
          usedAmount = transactions.reduce(
            (acc, curr) => acc + curr.acquisition_value,
            0,
          );
        }

        const remaining = pagu - usedAmount;
        const percentage = pagu > 0 ? (usedAmount / pagu) * 100 : 0;

        return {
          id: itemId,
          name: itemName,
          pagu,
          usedAmount,
          remaining,
          percentage,
          transactions,
        };
      })
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
  }, [rawData, activeTab, searchTerm]);

  const summary = useMemo(() => {
    const totalPagu = processedData.reduce((acc, curr) => acc + curr.pagu, 0);
    const totalUsed = processedData.reduce(
      (acc, curr) => acc + curr.usedAmount,
      0,
    );
    const totalRemaining = totalPagu - totalUsed;
    const totalPersen = totalPagu > 0 ? (totalUsed / totalPagu) * 100 : 0;
    return { totalPagu, totalUsed, totalRemaining, totalPersen };
  }, [processedData]);

  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  // --- RENDER ---
  return (
    <div className="budget-container">
      {/* Header */}
      <div className="budget-header">
        <div className="title-section">
          <h1>Dashboard Anggaran & Realisasi</h1>
          <p>
            Monitoring Anggaran{" "}
            {activeTab === "capex" ? "Investasi (CAPEX)" : "Operasional (OPEX)"}{" "}
            Tahun {year}
          </p>
        </div>

        <div className="tab-controls">
          <button
            className={`tab-btn ${activeTab === "capex" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("capex");
              setExpandedRow(null);
            }}
          >
            <Briefcase size={18} /> CAPEX
          </button>
          <button
            className={`tab-btn ${activeTab === "opex" ? "active" : ""}`}
            onClick={() => {
              setActiveTab("opex");
              setExpandedRow(null);
            }}
          >
            <Monitor size={18} /> OPEX
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card card-blue">
          <div className="card-label">Total Pagu Anggaran</div>
          <div className="card-value">{formatRupiah(summary.totalPagu)}</div>
          <DollarSign className="card-icon" size={32} />
        </div>

        <div className="card card-orange">
          <div className="card-label">Total Realisasi</div>
          <div className="card-value text-orange">
            {formatRupiah(summary.totalUsed)}
          </div>
          <TrendingUp className="card-icon" size={32} />
        </div>

        <div className="card card-green">
          <div className="card-label">Sisa Anggaran</div>
          <div className="card-value text-green">
            {formatRupiah(summary.totalRemaining)}
          </div>
          <PieChart className="card-icon" size={32} />

          <div className="progress-bar-container">
            <div
              className={`progress-bar-fill ${summary.totalPersen > 90 ? "bg-red" : "bg-green"}`}
              style={{ width: `${Math.min(summary.totalPersen, 100)}%` }}
            ></div>
          </div>
          <div
            style={{ fontSize: "0.8rem", marginTop: "5px", textAlign: "right" }}
          >
            {summary.totalPersen.toFixed(1)}% Terserap
          </div>
        </div>
      </div>

      {/* Tabel Data */}
      <div className="table-container">
        <div className="table-header-row">
          <h3>Rincian Pos Anggaran</h3>
          <div className="search-wrapper">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              placeholder="Cari nama anggaran..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <table className="budget-table">
          <thead>
            <tr>
              <th style={{ width: "35%" }}>Nama Anggaran</th>
              <th className="text-right">Pagu</th>
              <th className="text-right">Terpakai</th>
              <th className="text-right">Sisa</th>
              <th className="text-center">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {processedData.map((item) => (
              <React.Fragment key={item.id}>
                <tr
                  className={`row-main ${expandedRow === item.id ? "row-active" : ""}`}
                  onClick={() => toggleRow(item.id)}
                >
                  <td>
                    <div style={{ fontWeight: "bold" }}>{item.name}</div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                      ID: {item.id}
                    </div>
                  </td>
                  <td className="text-right">{formatRupiah(item.pagu)}</td>
                  <td
                    className="text-right text-orange"
                    style={{ fontWeight: "bold" }}
                  >
                    {formatRupiah(item.usedAmount)}
                  </td>
                  <td
                    className="text-right text-green"
                    style={{ fontWeight: "bold" }}
                  >
                    {formatRupiah(item.remaining)}
                  </td>
                  <td className="text-center">
                    <span
                      className={`badge ${item.percentage > 90 ? "danger" : "safe"}`}
                    >
                      {item.percentage.toFixed(1)}%
                    </span>
                  </td>
                  <td>
                    {expandedRow === item.id ? (
                      <ChevronUp size={20} color="#888" />
                    ) : (
                      <ChevronDown size={20} color="#888" />
                    )}
                  </td>
                </tr>

                {/* Detail Drill Down */}
                {expandedRow === item.id && (
                  <tr className="row-detail animate-fade-in">
                    <td colSpan="6" className="detail-content">
                      <div className="detail-box">
                        <div className="detail-title">
                          <AlertCircle size={16} color="#0d6efd" />
                          {activeTab === "capex"
                            ? "Detail Proyek (Projects)"
                            : "Detail Aset (Assets)"}
                        </div>

                        {item.transactions.length > 0 ? (
                          <table className="transaction-table">
                            <thead>
                              <tr>
                                <th>Nama Item / Pekerjaan</th>
                                <th>Referensi (Kontrak/Kode)</th>
                                <th>Tanggal</th>
                                <th className="text-right">Nilai</th>
                              </tr>
                            </thead>
                            <tbody>
                              {item.transactions.map((trans, idx) => (
                                <tr key={idx}>
                                  <td>
                                    {activeTab === "capex"
                                      ? trans.nm_pekerjaan
                                      : trans.name}
                                  </td>
                                  <td>
                                    {activeTab === "capex"
                                      ? trans.no_kontrak
                                      : trans.asset_code}
                                  </td>
                                  <td>
                                    {activeTab === "capex"
                                      ? trans.tgl_kontrak
                                      : trans.procurement_date}
                                  </td>
                                  <td
                                    className="text-right"
                                    style={{ color: "#dc3545" }}
                                  >
                                    -{" "}
                                    {formatRupiah(
                                      activeTab === "capex"
                                        ? trans.nilai_kontrak
                                        : trans.acquisition_value,
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div
                            style={{
                              textAlign: "center",
                              color: "#999",
                              padding: "10px",
                            }}
                          >
                            Belum ada penggunaan anggaran.
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BudgetManagement;
