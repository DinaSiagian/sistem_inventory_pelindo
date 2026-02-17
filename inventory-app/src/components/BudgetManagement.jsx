import React, { useState, useMemo } from "react";
import { mockOpex, mockCapex } from "../data/mockData";
import "./BudgetManagement.css";

import {
  TrendingUp,
  DollarSign,
  Wallet,
  Search,
  ChevronDown,
  ChevronUp,
  Package,
  FileText,
  Layers,
  Briefcase,
  Monitor,
  Calendar,
  Hash,
  AlertTriangle,
  CheckCircle,
  Info,
} from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────
const fmt = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num || 0);

const fmtDate = (d) => {
  if (!d) return "—";
  const dt = new Date(d);
  return dt.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusClass = (pct) => {
  if (pct >= 100) return "over";
  if (pct >= 80) return "warn";
  if (pct >= 40) return "mid";
  return "safe";
};

const statusLabel = (pct) => {
  if (pct >= 100) return "Melebihi";
  if (pct >= 80) return "Kritis";
  if (pct >= 40) return "Berjalan";
  return "Aman";
};

// ── component ────────────────────────────────────────────────────
export default function BudgetManagement() {
  const [activeTab, setActiveTab] = useState("capex");
  const [expandedBudget, setExpandedBudget] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [search, setSearch] = useState("");
  const year = 2026;

  const raw = activeTab === "capex" ? mockCapex : mockOpex;

  // ── process data ──────────────────────────────────────────────
  const data = useMemo(() => {
    return raw
      .map((item) => {
        let id,
          name,
          pagu,
          used,
          projects = [],
          assets = [];

        if (activeTab === "capex") {
          id = item.kd_anggaran_capex;
          name = item.nm_anggaran_capex;
          pagu = item.nilai_anggaran_rkap || 0;
          projects = item.projects || [];
          // realisasi = nilai_kontrak projects (null dihitung 0)
          used = projects.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
        } else {
          id = String(item.id_anggaran_tahunan);
          name = item.nm_anggaran_master;
          pagu = item.nilai_anggaran_tahunan || 0;
          assets = item.assets || [];
          used = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
        }

        const remaining = pagu - used;
        const percentage = pagu > 0 ? (used / pagu) * 100 : 0;
        return {
          id,
          name,
          pagu,
          used,
          remaining,
          percentage,
          projects,
          assets,
          raw: item,
        };
      })
      .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
  }, [raw, activeTab, search]);

  const totals = useMemo(() => {
    const pagu = data.reduce((s, d) => s + d.pagu, 0);
    const used = data.reduce((s, d) => s + d.used, 0);
    return {
      pagu,
      used,
      remaining: pagu - used,
      pct: pagu > 0 ? (used / pagu) * 100 : 0,
    };
  }, [data]);

  const toggleBudget = (id) => {
    setExpandedBudget(expandedBudget === id ? null : id);
    setExpandedProject(null);
  };
  const toggleProject = (id) =>
    setExpandedProject(expandedProject === id ? null : id);
  const switchTab = (t) => {
    setActiveTab(t);
    setExpandedBudget(null);
    setExpandedProject(null);
    setSearch("");
  };

  // ── opex drill-down ──────────────────────────────────────────
  const OpexDetail = ({ item }) => (
    <tr className="bm-drill-row">
      <td colSpan="6">
        <div className="bm-drill-wrap">
          <div className="bm-drill-header">
            <Package size={14} /> Aset Terealisasi
            <span className="bm-pill blue">{item.assets.length} aset</span>
          </div>

          {item.assets.length > 0 ? (
            <table className="bm-sub-table">
              <thead>
                <tr>
                  <th>Kode Aset</th>
                  <th>Nama Aset</th>
                  <th>Brand / Model</th>
                  <th>Tgl Pengadaan</th>
                  <th className="ta-r">Nilai Perolehan</th>
                </tr>
              </thead>
              <tbody>
                {item.assets.map((a) => (
                  <tr key={a.asset_code}>
                    <td>
                      <code className="bm-code">{a.asset_code}</code>
                    </td>
                    <td className="fw-med">{a.name}</td>
                    <td className="tc-muted">
                      {a.brand}
                      {a.model ? ` / ${a.model}` : ""}
                    </td>
                    <td>{fmtDate(a.procurement_date)}</td>
                    <td className="ta-r tc-red fw-bold">
                      − {fmt(a.acquisition_value)}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="bm-sub-total">
                  <td colSpan="4" className="ta-r fw-bold">
                    Total Realisasi
                  </td>
                  <td className="ta-r tc-red fw-bold">{fmt(item.used)}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="bm-empty">
              <Package size={28} strokeWidth={1.2} />
              <span>Belum ada aset yang terealisasi pada pos anggaran ini</span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  // ── capex drill-down ─────────────────────────────────────────
  const CapexDetail = ({ item }) => (
    <tr className="bm-drill-row">
      <td colSpan="6">
        <div className="bm-drill-wrap">
          <div className="bm-drill-header">
            <FileText size={14} /> Daftar Pekerjaan / Kontrak
            <span className="bm-pill blue">
              {item.projects.length} pekerjaan
            </span>
          </div>

          {item.projects.length > 0 ? (
            <div className="bm-projects">
              {item.projects.map((p) => {
                const open = expandedProject === p.id_pekerjaan;
                const assetCnt = p.assets ? p.assets.length : 0;
                return (
                  <div
                    key={p.id_pekerjaan}
                    className={`bm-proj-card ${open ? "open" : ""}`}
                  >
                    {/* project row */}
                    <div
                      className="bm-proj-row"
                      onClick={() => toggleProject(p.id_pekerjaan)}
                    >
                      <div className="bm-proj-left">
                        <div className="bm-proj-name">{p.nm_pekerjaan}</div>
                        <div className="bm-proj-meta">
                          {p.no_kontrak && (
                            <span className="bm-meta-item">
                              <FileText size={11} /> {p.no_kontrak}
                            </span>
                          )}
                          {p.tgl_kontrak && (
                            <span className="bm-meta-item">
                              <Calendar size={11} /> {fmtDate(p.tgl_kontrak)}
                            </span>
                          )}
                          {p.durasi_kontrak && (
                            <span className="bm-meta-item">
                              ⏱ {p.durasi_kontrak} hari
                            </span>
                          )}
                        </div>
                        <div className="bm-proj-refs">
                          {p.no_pr && (
                            <span className="bm-ref">PR: {p.no_pr}</span>
                          )}
                          {p.no_po && (
                            <span className="bm-ref">PO: {p.no_po}</span>
                          )}
                          {p.no_sp3 && (
                            <span className="bm-ref">SP3: {p.no_sp3}</span>
                          )}
                        </div>
                        {p.tgl_sp3 && (
                          <div className="bm-proj-dates">
                            <span>SP3: {fmtDate(p.tgl_sp3)}</span>
                            {p.tgl_bamk && (
                              <span>BA-MK: {fmtDate(p.tgl_bamk)}</span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="bm-proj-right">
                        <div className="bm-proj-vals">
                          <div className="bm-val-block">
                            <span className="bm-val-lbl">RAB</span>
                            <span className="bm-val-num rab">
                              {p.nilai_rab ? fmt(p.nilai_rab) : "—"}
                            </span>
                          </div>
                          <div className="bm-val-block">
                            <span className="bm-val-lbl">Kontrak</span>
                            <span className="bm-val-num kontrak">
                              {p.nilai_kontrak ? fmt(p.nilai_kontrak) : "—"}
                            </span>
                          </div>
                        </div>
                        <div className="bm-proj-actions">
                          <span className="bm-pill blue">{assetCnt} Aset</span>
                          {open ? (
                            <ChevronUp size={16} className="tc-accent" />
                          ) : (
                            <ChevronDown size={16} className="tc-muted2" />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* asset sub-table */}
                    {open && (
                      <div className="bm-asset-sub anim-in">
                        <div className="bm-asset-sub-title">
                          <Layers size={12} /> Aset Terdaftar dari Pekerjaan Ini
                        </div>
                        {assetCnt > 0 ? (
                          <table className="bm-sub-table bm-sub-table--sm">
                            <thead>
                              <tr>
                                <th>Kode Aset</th>
                                <th>Nama Aset</th>
                                <th>Brand / Model</th>
                                <th>Serial Number</th>
                                <th>Tgl Pengadaan</th>
                                <th>Tipe</th>
                              </tr>
                            </thead>
                            <tbody>
                              {p.assets.map((a) => (
                                <tr key={a.asset_code}>
                                  <td>
                                    <code className="bm-code">
                                      {a.asset_code}
                                    </code>
                                  </td>
                                  <td className="fw-med">{a.name}</td>
                                  <td className="tc-muted">
                                    {a.brand} / {a.model}
                                  </td>
                                  <td className="tc-muted">
                                    {a.serial_number || "—"}
                                  </td>
                                  <td>{fmtDate(a.procurement_date)}</td>
                                  <td>
                                    <span className="bm-type-badge capex">
                                      CAPEX
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        ) : (
                          <div className="bm-empty bm-empty--sm">
                            <Info size={16} />
                            <span>
                              Belum ada aset terdaftar untuk pekerjaan ini
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="bm-capex-total">
                <span>Total Nilai Kontrak Terserap</span>
                <span className="tc-red fw-bold">{fmt(item.used)}</span>
              </div>
            </div>
          ) : (
            <div className="bm-empty">
              <FileText size={28} strokeWidth={1.2} />
              <span>Belum ada pekerjaan / kontrak yang terdaftar</span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  // ── main render ───────────────────────────────────────────────
  return (
    <div className="bm-root">
      {/* ── HEADER ── */}
      <header className="bm-header">
        <div className="bm-header-text">
          <h1>Anggaran &amp; Realisasi</h1>
          <p>
            Monitoring{" "}
            {activeTab === "capex" ? "Investasi (CAPEX)" : "Operasional (OPEX)"}
            &ensp;·&ensp;Tahun {year}
          </p>
        </div>

        <div className="bm-tabs">
          <button
            className={`bm-tab ${activeTab === "capex" ? "active" : ""}`}
            onClick={() => switchTab("capex")}
          >
            <Briefcase size={15} /> CAPEX
          </button>
          <button
            className={`bm-tab ${activeTab === "opex" ? "active" : ""}`}
            onClick={() => switchTab("opex")}
          >
            <Monitor size={15} /> OPEX
          </button>
        </div>
      </header>

      {/* ── KPI CARDS ── */}
      <section className="bm-kpis">
        <div className="bm-kpi bm-kpi--blue">
          <div className="bm-kpi-icon">
            <DollarSign size={20} />
          </div>
          <div>
            <div className="bm-kpi-lbl">Total Pagu Anggaran</div>
            <div className="bm-kpi-val">{fmt(totals.pagu)}</div>
            <div className="bm-kpi-sub">{data.length} pos anggaran aktif</div>
          </div>
        </div>

        <div className="bm-kpi bm-kpi--amber">
          <div className="bm-kpi-icon">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="bm-kpi-lbl">Total Realisasi</div>
            <div className="bm-kpi-val">{fmt(totals.used)}</div>
            <div className="bm-kpi-sub">
              {totals.pct.toFixed(1)}% dari total pagu
            </div>
          </div>
        </div>

        <div className="bm-kpi bm-kpi--green">
          <div className="bm-kpi-icon">
            <Wallet size={20} />
          </div>
          <div>
            <div className="bm-kpi-lbl">Sisa Anggaran</div>
            <div className="bm-kpi-val">{fmt(totals.remaining)}</div>
            <div className="bm-kpi-sub bm-kpi-bar-wrap">
              <div className="bm-kpi-bar">
                <div
                  className={`bm-kpi-bar-fill sc-${statusClass(totals.pct)}`}
                  style={{ width: `${Math.min(totals.pct, 100)}%` }}
                />
              </div>
              <span>{totals.pct.toFixed(1)}% terserap</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTEXT BANNER ── */}
      <div className="bm-banner">
        {activeTab === "capex" ? (
          <>
            <Briefcase size={13} /> Realisasi CAPEX = total <b>nilai_kontrak</b>{" "}
            dari budget_projects. Drill ke bawah untuk melihat kontrak &amp;
            aset terdaftar.
          </>
        ) : (
          <>
            <Monitor size={13} /> Realisasi OPEX = total{" "}
            <b>acquisition_value</b> aset yang terhubung ke pos anggaran ini
            (assets.id_anggaran_opex).
          </>
        )}
      </div>

      {/* ── TABLE ── */}
      <section className="bm-table-wrap">
        <div className="bm-table-bar">
          <h2>Rincian Pos Anggaran</h2>
          <div className="bm-search">
            <Search size={15} />
            <input
              placeholder="Cari nama anggaran…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bm-table-scroll">
          <table className="bm-table">
            <thead>
              <tr>
                <th style={{ width: "34%" }}>
                  {activeTab === "capex"
                    ? "Nama Anggaran CAPEX"
                    : "Mata Anggaran OPEX"}
                </th>
                <th>Kode / ID</th>
                <th className="ta-r">Pagu (RKAP)</th>
                <th className="ta-r">Realisasi</th>
                <th className="ta-r">Sisa</th>
                <th className="ta-c">Serapan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="bm-empty-cell">
                    Tidak ada data yang cocok.
                  </td>
                </tr>
              )}

              {data.map((item) => {
                const open = expandedBudget === item.id;
                const sc = statusClass(item.percentage);
                return (
                  <React.Fragment key={item.id}>
                    <tr
                      className={`bm-row ${open ? "bm-row--open" : ""}`}
                      onClick={() => toggleBudget(item.id)}
                    >
                      <td>
                        <div className="fw-med lh-tight">{item.name}</div>
                        {activeTab === "capex" && item.raw.thn_rkap_awal && (
                          <div className="tc-muted fs-xs">
                            RKAP {item.raw.thn_rkap_awal}–
                            {item.raw.thn_rkap_akhir}
                            &ensp;·&ensp;Thn Anggaran {item.raw.thn_anggaran}
                          </div>
                        )}
                        <div className="tc-muted2 fs-xs mt2">
                          {activeTab === "capex"
                            ? `${item.projects.length} pekerjaan · ${item.projects.reduce((s, p) => s + (p.assets?.length || 0), 0)} aset`
                            : `${item.assets.length} aset terealisasi`}
                        </div>
                      </td>
                      <td>
                        <code className="bm-code">{item.id}</code>
                        <div className="tc-muted fs-xs mt2">
                          {item.raw.kd_anggaran_master}
                        </div>
                      </td>
                      <td className="ta-r fw-med">{fmt(item.pagu)}</td>
                      <td
                        className={`ta-r fw-bold ${item.used > 0 ? "tc-amber" : "tc-muted"}`}
                      >
                        {item.used > 0 ? fmt(item.used) : "—"}
                      </td>
                      <td
                        className={`ta-r fw-bold ${item.remaining < 0 ? "tc-red" : "tc-green"}`}
                      >
                        {fmt(item.remaining)}
                      </td>
                      <td className="ta-c">
                        <div className="bm-pct-wrap">
                          <div className="bm-pct-bar">
                            <div
                              className={`bm-pct-fill sc-${sc}`}
                              style={{
                                width: `${Math.min(item.percentage, 100)}%`,
                              }}
                            />
                          </div>
                          <span className={`bm-badge sc-${sc}`}>
                            {item.percentage.toFixed(1)}%
                          </span>
                        </div>
                        <div className={`bm-status-lbl sc-${sc}`}>
                          {statusLabel(item.percentage)}
                        </div>
                      </td>
                      <td>
                        {open ? (
                          <ChevronUp size={18} className="tc-accent" />
                        ) : (
                          <ChevronDown size={18} className="tc-muted2" />
                        )}
                      </td>
                    </tr>

                    {open &&
                      (activeTab === "opex" ? (
                        <OpexDetail item={item} />
                      ) : (
                        <CapexDetail item={item} />
                      ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
