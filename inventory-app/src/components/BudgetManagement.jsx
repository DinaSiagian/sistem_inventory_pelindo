import React, { useState, useMemo } from "react";
import { mockOpex, mockCapex, mockRealisasiOpex } from "../data/mockData";
import "./BudgetManagement.css";

import {
<<<<<<< HEAD
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
  Plus,
  X,
  Save,
  Receipt,
  Link,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  MinusCircle,
=======
  TrendingUp, DollarSign, Wallet, Search, ChevronDown, ChevronUp,
  Package, FileText, Layers, Briefcase, Monitor, Calendar,
  Plus, X, Save, Receipt, Link, CheckCircle, AlertTriangle,
  AlertCircle, MinusCircle,
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
} from "lucide-react";

// ── helpers ──────────────────────────────────────────────────────
const fmt = (num) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);

const fmtShort = (num) => {
  if (!num) return "—";
  if (num >= 1_000_000_000) return `${(num / 1_000_000_000).toFixed(2).replace(".", ",")} M`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)} jt`;
  return new Intl.NumberFormat("id-ID").format(num);
};

const fmtShort = (num) => {
  if (!num) return "—";
  if (num >= 1_000_000_000)
    return `${(num / 1_000_000_000).toFixed(2).replace(".", ",")} M`;
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(0)} jt`;
  return new Intl.NumberFormat("id-ID").format(num);
};

const fmtDate = (d) => {
  if (!d) return "—";
<<<<<<< HEAD
  return new Date(d).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
=======
  return new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" });
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
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

// ── Balance helper: bandingkan SUM(acquisition_value) vs nilai_kontrak ──
// Mengembalikan: { status, selisih, pct, label, icon }
const getBalanceInfo = (assets, nilaiKontrak) => {
  if (!assets || assets.length === 0) {
<<<<<<< HEAD
    return {
      status: "empty",
      selisih: nilaiKontrak,
      label: "Belum Diisi",
      pct: 0,
    };
  }
  const sumAset = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
  if (sumAset === 0) {
    return {
      status: "empty",
      selisih: nilaiKontrak,
      label: "Nilai Kosong",
      pct: 0,
    };
  }
  const selisih = nilaiKontrak - sumAset;
  const pctSelisih =
    nilaiKontrak > 0 ? Math.abs(selisih / nilaiKontrak) * 100 : 0;

  if (selisih === 0)
    return {
      status: "balanced",
      selisih: 0,
      label: "Balanced",
      pct: pctSelisih,
      sumAset,
    };
  if (pctSelisih <= 5)
    return {
      status: "near",
      selisih,
      label: "Hampir Balance",
      pct: pctSelisih,
      sumAset,
    };
  return {
    status: "unbalanced",
    selisih,
    label: "Belum Balance",
    pct: pctSelisih,
    sumAset,
  };
=======
    return { status: "empty", selisih: nilaiKontrak, label: "Belum Diisi", pct: 0 };
  }
  const sumAset = assets.reduce((s, a) => s + (a.acquisition_value || 0), 0);
  if (sumAset === 0) {
    return { status: "empty", selisih: nilaiKontrak, label: "Nilai Kosong", pct: 0 };
  }
  const selisih = nilaiKontrak - sumAset;
  const pctSelisih = nilaiKontrak > 0 ? Math.abs(selisih / nilaiKontrak) * 100 : 0;

  if (selisih === 0) return { status: "balanced", selisih: 0, label: "Balanced", pct: pctSelisih, sumAset };
  if (pctSelisih <= 5) return { status: "near", selisih, label: "Hampir Balance", pct: pctSelisih, sumAset };
  return { status: "unbalanced", selisih, label: "Belum Balance", pct: pctSelisih, sumAset };
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
};

// ── Modal Input Realisasi OPEX ────────────────────────────────────
function ModalRealisasiOpex({ anggaran, onClose, onSave }) {
  const [form, setForm] = useState({
    tanggal_realisasi: new Date().toISOString().split("T")[0],
    jumlah: "",
    keterangan: "",
    no_invoice: "",
    id_aset: "",
  });

  const handleSave = () => {
    if (!form.jumlah || !form.keterangan || !form.tanggal_realisasi) {
      alert("Tanggal, jumlah, dan keterangan wajib diisi.");
      return;
    }
<<<<<<< HEAD
    onSave({
      ...form,
      jumlah: parseFloat(form.jumlah),
      id_aset: form.id_aset || null,
    });
=======
    onSave({ ...form, jumlah: parseFloat(form.jumlah), id_aset: form.id_aset || null });
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
    onClose();
  };

  return (
    <div className="bm-modal-overlay" onClick={onClose}>
      <div className="bm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="bm-modal-header">
          <div className="bm-modal-header-left">
<<<<<<< HEAD
            <div className="bm-modal-icon">
              <Receipt size={18} />
            </div>
=======
            <div className="bm-modal-icon"><Receipt size={18} /></div>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
            <div>
              <h3>Tambah Realisasi OPEX</h3>
              <p>{anggaran.nm_anggaran_master}</p>
            </div>
          </div>
<<<<<<< HEAD
          <button className="bm-modal-close" onClick={onClose}>
            <X size={16} />
          </button>
=======
          <button className="bm-modal-close" onClick={onClose}><X size={16} /></button>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
        </div>
        <div className="bm-modal-body">
          <div className="bm-modal-info-bar">
            <div className="bm-modal-info-item">
              <span>Pagu Anggaran</span>
              <strong>{fmt(anggaran.nilai_anggaran_tahunan)}</strong>
            </div>
            <div className="bm-modal-info-item">
              <span>Sudah Terpakai</span>
              <strong className="tc-amber">{fmt(anggaran.used)}</strong>
            </div>
            <div className="bm-modal-info-item">
              <span>Sisa</span>
<<<<<<< HEAD
              <strong
                className={anggaran.remaining < 0 ? "tc-red" : "tc-green"}
              >
                {fmt(anggaran.remaining)}
              </strong>
=======
              <strong className={anggaran.remaining < 0 ? "tc-red" : "tc-green"}>{fmt(anggaran.remaining)}</strong>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
            </div>
          </div>
          <div className="bm-form-grid">
            <div className="bm-form-group">
<<<<<<< HEAD
              <label>
                Tanggal Realisasi <span className="req">*</span>
              </label>
              <input
                type="date"
                value={form.tanggal_realisasi}
                onChange={(e) =>
                  setForm({ ...form, tanggal_realisasi: e.target.value })
                }
              />
            </div>
            <div className="bm-form-group">
              <label>No. Invoice / Referensi</label>
              <input
                type="text"
                placeholder="INV/2026/001/XX"
                value={form.no_invoice}
                onChange={(e) =>
                  setForm({ ...form, no_invoice: e.target.value })
                }
              />
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>
                Jumlah Realisasi (IDR) <span className="req">*</span>
              </label>
              <input
                type="number"
                placeholder="0"
                value={form.jumlah}
                onChange={(e) => setForm({ ...form, jumlah: e.target.value })}
              />
              {form.jumlah && (
                <span className="bm-form-hint">
                  ≈ Rp {new Intl.NumberFormat("id-ID").format(form.jumlah)}
                </span>
              )}
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>
                Keterangan <span className="req">*</span>
              </label>
              <textarea
                rows="2"
                placeholder="Contoh: Pembayaran tagihan jaringan MPLS bulan Maret 2026"
                value={form.keterangan}
                onChange={(e) =>
                  setForm({ ...form, keterangan: e.target.value })
                }
              />
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>
                <Link
                  size={11}
                  style={{ marginRight: 5, verticalAlign: "middle" }}
                />
                ID Aset Terhubung
                <span className="bm-optional-badge">Opsional</span>
              </label>
              <input
                type="text"
                placeholder="Kosongkan jika tidak ada aset — contoh: SPMT-BLW-DTC-PKR-01"
                value={form.id_aset}
                onChange={(e) => setForm({ ...form, id_aset: e.target.value })}
              />
              <span className="bm-form-hint bm-form-hint--muted">
                Isi jika transaksi ini berhubungan dengan aset di inventory
              </span>
=======
              <label>Tanggal Realisasi <span className="req">*</span></label>
              <input type="date" value={form.tanggal_realisasi} onChange={(e) => setForm({ ...form, tanggal_realisasi: e.target.value })} />
            </div>
            <div className="bm-form-group">
              <label>No. Invoice / Referensi</label>
              <input type="text" placeholder="INV/2026/001/XX" value={form.no_invoice} onChange={(e) => setForm({ ...form, no_invoice: e.target.value })} />
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>Jumlah Realisasi (IDR) <span className="req">*</span></label>
              <input type="number" placeholder="0" value={form.jumlah} onChange={(e) => setForm({ ...form, jumlah: e.target.value })} />
              {form.jumlah && <span className="bm-form-hint">≈ Rp {new Intl.NumberFormat("id-ID").format(form.jumlah)}</span>}
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>Keterangan <span className="req">*</span></label>
              <textarea rows="2" placeholder="Contoh: Pembayaran tagihan jaringan MPLS bulan Maret 2026" value={form.keterangan} onChange={(e) => setForm({ ...form, keterangan: e.target.value })} />
            </div>
            <div className="bm-form-group bm-form-group--full">
              <label>
                <Link size={11} style={{ marginRight: 5, verticalAlign: "middle" }} />
                ID Aset Terhubung
                <span className="bm-optional-badge">Opsional</span>
              </label>
              <input type="text" placeholder="Kosongkan jika tidak ada aset — contoh: SPMT-BLW-DTC-PKR-01" value={form.id_aset} onChange={(e) => setForm({ ...form, id_aset: e.target.value })} />
              <span className="bm-form-hint bm-form-hint--muted">Isi jika transaksi ini berhubungan dengan aset di inventory</span>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
            </div>
          </div>
        </div>
        <div className="bm-modal-footer">
<<<<<<< HEAD
          <button className="bm-btn-cancel" onClick={onClose}>
            <X size={14} /> Batal
          </button>
          <button className="bm-btn-save" onClick={handleSave}>
            <Save size={14} /> Simpan Realisasi
          </button>
=======
          <button className="bm-btn-cancel" onClick={onClose}><X size={14} /> Batal</button>
          <button className="bm-btn-save" onClick={handleSave}><Save size={14} /> Simpan Realisasi</button>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
        </div>
      </div>
    </div>
  );
}

// ── Balance Badge ─────────────────────────────────────────────────
function BalanceBadge({ assets, nilaiKontrak }) {
  const info = getBalanceInfo(assets, nilaiKontrak);
  return (
    <span className={`bm-balance-badge bm-balance-badge--${info.status}`}>
      {info.status === "balanced" && <CheckCircle size={10} />}
      {info.status === "near" && <AlertCircle size={10} />}
      {info.status === "unbalanced" && <AlertTriangle size={10} />}
      {info.status === "empty" && <MinusCircle size={10} />}
      {info.label}
    </span>
  );
}

// ── Balance Detail Bar (di dalam asset sub-table) ─────────────────
function BalanceBar({ assets, nilaiKontrak }) {
  const info = getBalanceInfo(assets, nilaiKontrak);
  if (info.status === "empty") return null;

  return (
    <div className={`bm-balance-bar bm-balance-bar--${info.status}`}>
      <div className="bm-balance-bar-left">
        <div className="bm-balance-row">
          <span>Nilai Kontrak</span>
          <strong>{fmt(nilaiKontrak)}</strong>
        </div>
        <div className="bm-balance-row">
          <span>Total Nilai Aset</span>
          <strong>{fmt(info.sumAset)}</strong>
        </div>
      </div>
      <div className="bm-balance-divider" />
      <div className="bm-balance-bar-right">
        <div className="bm-balance-selisih-label">Selisih</div>
<<<<<<< HEAD
        <div
          className={`bm-balance-selisih-val bm-balance-selisih-val--${info.status}`}
        >
          {info.selisih === 0
            ? "—"
            : info.selisih > 0
              ? `− ${fmt(info.selisih)}`
              : `+ ${fmt(Math.abs(info.selisih))}`}
        </div>
        {info.status !== "balanced" && (
          <div className="bm-balance-selisih-pct">
            {info.pct.toFixed(1)}% dari kontrak
          </div>
=======
        <div className={`bm-balance-selisih-val bm-balance-selisih-val--${info.status}`}>
          {info.selisih === 0 ? "—" : (info.selisih > 0 ? `− ${fmt(info.selisih)}` : `+ ${fmt(Math.abs(info.selisih))}`)}
        </div>
        {info.status !== "balanced" && (
          <div className="bm-balance-selisih-pct">{info.pct.toFixed(1)}% dari kontrak</div>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
        )}
      </div>
    </div>
  );
}

// ── component utama ───────────────────────────────────────────────
export default function BudgetManagement() {
  const [activeTab, setActiveTab] = useState("capex");
  const [expandedBudget, setExpandedBudget] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [search, setSearch] = useState("");
  const [realisasiOpex, setRealisasiOpex] = useState(mockRealisasiOpex);
  const [modalRealisasi, setModalRealisasi] = useState(null);
  const year = 2026;

  const data = useMemo(() => {
    const raw = activeTab === "capex" ? mockCapex : mockOpex;
    return raw
      .map((item) => {
<<<<<<< HEAD
        let id,
          name,
          pagu,
          used,
          projects = [],
          realisasiList = [];
=======
        let id, name, pagu, used, projects = [], realisasiList = [];
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
        if (activeTab === "capex") {
          id = item.kd_anggaran_capex;
          name = item.nm_anggaran_capex;
          pagu = item.nilai_anggaran_rkap || 0;
          projects = item.projects || [];
          used = projects.reduce((s, p) => s + (p.nilai_kontrak || 0), 0);
        } else {
          id = String(item.id_anggaran_tahunan);
          name = item.nm_anggaran_master;
          pagu = item.nilai_anggaran_tahunan || 0;
<<<<<<< HEAD
          realisasiList = realisasiOpex.filter(
            (r) => r.id_anggaran_tahunan === item.id_anggaran_tahunan,
          );
=======
          realisasiList = realisasiOpex.filter((r) => r.id_anggaran_tahunan === item.id_anggaran_tahunan);
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
          used = realisasiList.reduce((s, r) => s + (r.jumlah || 0), 0);
        }
        const remaining = pagu - used;
        const percentage = pagu > 0 ? (used / pagu) * 100 : 0;
<<<<<<< HEAD
        return {
          id,
          name,
          pagu,
          used,
          remaining,
          percentage,
          projects,
          realisasiList,
          raw: item,
        };
=======
        return { id, name, pagu, used, remaining, percentage, projects, realisasiList, raw: item };
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
      })
      .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()));
  }, [activeTab, search, realisasiOpex]);

  const totals = useMemo(() => {
    const pagu = data.reduce((s, d) => s + d.pagu, 0);
    const used = data.reduce((s, d) => s + d.used, 0);
    return { pagu, used, remaining: pagu - used, pct: pagu > 0 ? (used / pagu) * 100 : 0 };
  }, [data]);

  const toggleBudget = (id) => { setExpandedBudget(expandedBudget === id ? null : id); setExpandedProject(null); };
  const toggleProject = (id) => setExpandedProject(expandedProject === id ? null : id);
  const switchTab = (t) => { setActiveTab(t); setExpandedBudget(null); setExpandedProject(null); setSearch(""); };

  const handleSaveRealisasi = (anggaranItem, formData) => {
    setRealisasiOpex([...realisasiOpex, {
      id_realisasi: Date.now(),
      id_anggaran_tahunan: anggaranItem.id_anggaran_tahunan,
      ...formData,
      create_user: "current_user",
      create_date: new Date().toISOString(),
    }]);
  };

<<<<<<< HEAD
  const handleSaveRealisasi = (anggaranItem, formData) => {
    setRealisasiOpex([
      ...realisasiOpex,
      {
        id_realisasi: Date.now(),
        id_anggaran_tahunan: anggaranItem.id_anggaran_tahunan,
        ...formData,
        create_user: "current_user",
        create_date: new Date().toISOString(),
      },
    ]);
  };

=======
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
  // ── OPEX Drill-down ───────────────────────────────────────────
  const OpexDetail = ({ item }) => (
    <tr className="bm-drill-row">
      <td colSpan="7">
        <div className="bm-drill-wrap">
          <div className="bm-drill-header">
            <Receipt size={14} />
            Riwayat Realisasi
<<<<<<< HEAD
            <span className="bm-pill blue">
              {item.realisasiList.length} transaksi
            </span>
            <button
              className="bm-btn-add-realisasi"
              onClick={() => setModalRealisasi(item)}
            >
=======
            <span className="bm-pill blue">{item.realisasiList.length} transaksi</span>
            <button className="bm-btn-add-realisasi" onClick={() => setModalRealisasi(item)}>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
              <Plus size={13} /> Tambah Realisasi
            </button>
          </div>
          {item.realisasiList.length > 0 ? (
            <table className="bm-sub-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Keterangan</th>
                  <th>No. Invoice</th>
                  <th>Aset Terhubung</th>
                  <th className="ta-r">Jumlah</th>
                </tr>
              </thead>
              <tbody>
                {item.realisasiList
<<<<<<< HEAD
                  .sort(
                    (a, b) =>
                      new Date(b.tanggal_realisasi) -
                      new Date(a.tanggal_realisasi),
                  )
                  .map((r) => (
                    <tr key={r.id_realisasi}>
                      <td>
                        <div className="bm-date-cell">
                          <Calendar size={11} />
                          {fmtDate(r.tanggal_realisasi)}
                        </div>
                      </td>
                      <td className="fw-med">{r.keterangan}</td>
                      <td>
                        {r.no_invoice ? (
                          <code className="bm-code">{r.no_invoice}</code>
                        ) : (
                          <span className="tc-muted2">—</span>
                        )}
                      </td>
                      <td>
                        {r.id_aset ? (
                          <div className="bm-aset-link">
                            <Link size={11} />
                            <code className="bm-code bm-code--aset">
                              {r.id_aset}
                            </code>
                          </div>
                        ) : (
                          <span className="bm-no-aset">Tidak ada aset</span>
                        )}
=======
                  .sort((a, b) => new Date(b.tanggal_realisasi) - new Date(a.tanggal_realisasi))
                  .map((r) => (
                    <tr key={r.id_realisasi}>
                      <td><div className="bm-date-cell"><Calendar size={11} />{fmtDate(r.tanggal_realisasi)}</div></td>
                      <td className="fw-med">{r.keterangan}</td>
                      <td>{r.no_invoice ? <code className="bm-code">{r.no_invoice}</code> : <span className="tc-muted2">—</span>}</td>
                      <td>
                        {r.id_aset
                          ? <div className="bm-aset-link"><Link size={11} /><code className="bm-code bm-code--aset">{r.id_aset}</code></div>
                          : <span className="bm-no-aset">Tidak ada aset</span>}
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                      </td>
                      <td className="ta-r tc-red fw-bold">− {fmt(r.jumlah)}</td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr className="bm-sub-total">
                  <td colSpan="4" className="ta-r fw-bold">Total Realisasi</td>
                  <td className="ta-r tc-red fw-bold">{fmt(item.used)}</td>
                </tr>
              </tfoot>
            </table>
          ) : (
            <div className="bm-empty">
              <Receipt size={28} strokeWidth={1.2} />
<<<<<<< HEAD
              <span>
                Belum ada realisasi — klik "Tambah Realisasi" untuk mencatat
                transaksi
              </span>
=======
              <span>Belum ada realisasi — klik "Tambah Realisasi" untuk mencatat transaksi</span>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
            </div>
          )}
        </div>
      </td>
    </tr>
  );

  // ── CAPEX Drill-down ──────────────────────────────────────────
  const CapexDetail = ({ item }) => (
    <tr className="bm-drill-row">
      <td colSpan="7">
        <div className="bm-drill-wrap">
          <div className="bm-drill-header">
            <FileText size={14} /> Daftar Pekerjaan / Kontrak
            <span className="bm-pill blue">{item.projects.length} pekerjaan</span>
          </div>
          {item.projects.length > 0 ? (
            <div className="bm-projects">
              {item.projects.map((p) => {
                const open = expandedProject === p.id_pekerjaan;
                const assetCnt = p.assets ? p.assets.length : 0;
                const balanceInfo = getBalanceInfo(p.assets, p.nilai_kontrak);
                return (
<<<<<<< HEAD
                  <div
                    key={p.id_pekerjaan}
                    className={`bm-proj-card ${open ? "open" : ""}`}
                  >
                    <div
                      className="bm-proj-row"
                      onClick={() => toggleProject(p.id_pekerjaan)}
                    >
=======
                  <div key={p.id_pekerjaan} className={`bm-proj-card ${open ? "open" : ""}`}>
                    <div className="bm-proj-row" onClick={() => toggleProject(p.id_pekerjaan)}>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                      <div className="bm-proj-left">
                        <div className="bm-proj-name">{p.nm_pekerjaan}</div>
                        <div className="bm-proj-meta">
                          {p.no_kontrak && <span className="bm-meta-item"><FileText size={11} /> {p.no_kontrak}</span>}
                          {p.tgl_kontrak && <span className="bm-meta-item"><Calendar size={11} /> {fmtDate(p.tgl_kontrak)}</span>}
                          {p.durasi_kontrak && <span className="bm-meta-item">⏱ {p.durasi_kontrak} hari</span>}
                        </div>
                        <div className="bm-proj-refs">
                          {p.no_pr && <span className="bm-ref">PR: {p.no_pr}</span>}
                          {p.no_po && <span className="bm-ref">PO: {p.no_po}</span>}
                          {p.no_sp3 && <span className="bm-ref">SP3: {p.no_sp3}</span>}
                        </div>
                        {p.tgl_sp3 && (
                          <div className="bm-proj-dates">
                            <span>SP3: {fmtDate(p.tgl_sp3)}</span>
                            {p.tgl_bamk && <span>BA-MK: {fmtDate(p.tgl_bamk)}</span>}
                          </div>
                        )}
                      </div>

                      <div className="bm-proj-right">
                        <div className="bm-proj-vals">
                          <div className="bm-val-block">
                            <span className="bm-val-lbl">RAB</span>
                            <span className="bm-val-num rab">{p.nilai_rab ? fmt(p.nilai_rab) : "—"}</span>
                          </div>
                          <div className="bm-val-block">
                            <span className="bm-val-lbl">Kontrak</span>
                            <span className="bm-val-num kontrak">{p.nilai_kontrak ? fmt(p.nilai_kontrak) : "—"}</span>
                          </div>
                          {/* Nilai aset total */}
                          {balanceInfo.sumAset > 0 && (
                            <div className="bm-val-block">
                              <span className="bm-val-lbl">Nilai Aset</span>
<<<<<<< HEAD
                              <span className="bm-val-num aset">
                                {fmt(balanceInfo.sumAset)}
                              </span>
=======
                              <span className="bm-val-num aset">{fmt(balanceInfo.sumAset)}</span>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                            </div>
                          )}
                        </div>
                        <div className="bm-proj-actions">
                          {/* Badge balance */}
<<<<<<< HEAD
                          <BalanceBadge
                            assets={p.assets}
                            nilaiKontrak={p.nilai_kontrak}
                          />
=======
                          <BalanceBadge assets={p.assets} nilaiKontrak={p.nilai_kontrak} />
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                          <span className="bm-pill blue">{assetCnt} Aset</span>
                          {open ? <ChevronUp size={16} className="tc-accent" /> : <ChevronDown size={16} className="tc-muted2" />}
                        </div>
                      </div>
                    </div>

                    {open && (
                      <div className="bm-asset-sub anim-in">
                        <div className="bm-asset-sub-title">
                          <Layers size={12} /> Aset Terdaftar dari Pekerjaan Ini
                        </div>
                        {assetCnt > 0 ? (
                          <>
                            <table className="bm-sub-table bm-sub-table--sm">
                              <thead>
                                <tr>
                                  <th>Kode Aset</th>
                                  <th>Nama Aset</th>
                                  <th>Brand / Model</th>
                                  <th>Serial Number</th>
                                  <th>Tgl Pengadaan</th>
                                  <th className="ta-r">Nilai Perolehan</th>
                                  <th>Tipe</th>
                                </tr>
                              </thead>
                              <tbody>
                                {p.assets.map((a) => (
                                  <tr key={a.asset_code}>
<<<<<<< HEAD
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
                                    <td className="ta-r fw-bold tc-ink">
                                      {a.acquisition_value ? (
                                        fmt(a.acquisition_value)
                                      ) : (
                                        <span className="bm-no-aset">
                                          Belum diisi
                                        </span>
                                      )}
                                    </td>
                                    <td>
                                      <span className="bm-type-badge capex">
                                        CAPEX
                                      </span>
                                    </td>
=======
                                    <td><code className="bm-code">{a.asset_code}</code></td>
                                    <td className="fw-med">{a.name}</td>
                                    <td className="tc-muted">{a.brand} / {a.model}</td>
                                    <td className="tc-muted">{a.serial_number || "—"}</td>
                                    <td>{fmtDate(a.procurement_date)}</td>
                                    <td className="ta-r fw-bold tc-ink">
                                      {a.acquisition_value
                                        ? fmt(a.acquisition_value)
                                        : <span className="bm-no-aset">Belum diisi</span>
                                      }
                                    </td>
                                    <td><span className="bm-type-badge capex">CAPEX</span></td>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                                  </tr>
                                ))}
                              </tbody>
                              {/* Subtotal nilai aset */}
                              <tfoot>
                                <tr className="bm-sub-total">
<<<<<<< HEAD
                                  <td colSpan="5" className="ta-r fw-bold">
                                    Total Nilai Aset
                                  </td>
                                  <td className="ta-r fw-bold tc-ink">
                                    {fmt(
                                      p.assets.reduce(
                                        (s, a) =>
                                          s + (a.acquisition_value || 0),
                                        0,
                                      ),
                                    )}
=======
                                  <td colSpan="5" className="ta-r fw-bold">Total Nilai Aset</td>
                                  <td className="ta-r fw-bold tc-ink">
                                    {fmt(p.assets.reduce((s, a) => s + (a.acquisition_value || 0), 0))}
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                                  </td>
                                  <td></td>
                                </tr>
                              </tfoot>
                            </table>
                            {/* Balance bar */}
<<<<<<< HEAD
                            <BalanceBar
                              assets={p.assets}
                              nilaiKontrak={p.nilai_kontrak}
                            />
=======
                            <BalanceBar assets={p.assets} nilaiKontrak={p.nilai_kontrak} />
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                          </>
                        ) : (
                          <div className="bm-empty bm-empty--sm">
                            <Package size={16} />
<<<<<<< HEAD
                            <span>
                              Belum ada aset terdaftar untuk pekerjaan ini
                            </span>
=======
                            <span>Belum ada aset terdaftar untuk pekerjaan ini</span>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
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

  return (
    <div className="bm-root">
      {/* Header */}
      <header className="bm-header">
        <div className="bm-header-text">
          <h1>Anggaran &amp; Realisasi</h1>
          <p>Monitoring {activeTab === "capex" ? "Investasi (CAPEX)" : "Operasional (OPEX)"}&ensp;·&ensp;Tahun {year}</p>
        </div>
        <div className="bm-tabs">
          <button className={`bm-tab ${activeTab === "capex" ? "active" : ""}`} onClick={() => switchTab("capex")}><Briefcase size={15} /> CAPEX</button>
          <button className={`bm-tab ${activeTab === "opex" ? "active" : ""}`} onClick={() => switchTab("opex")}><Monitor size={15} /> OPEX</button>
        </div>
      </header>

      {/* KPI */}
      <section className="bm-kpis">
        <div className="bm-kpi bm-kpi--blue">
          <div className="bm-kpi-icon"><DollarSign size={20} /></div>
          <div>
            <div className="bm-kpi-lbl">Total Pagu Anggaran</div>
            <div className="bm-kpi-val">{fmt(totals.pagu)}</div>
            <div className="bm-kpi-sub">{data.length} pos anggaran aktif</div>
          </div>
        </div>
        <div className="bm-kpi bm-kpi--amber">
          <div className="bm-kpi-icon"><TrendingUp size={20} /></div>
          <div>
            <div className="bm-kpi-lbl">Total Realisasi</div>
            <div className="bm-kpi-val">{fmt(totals.used)}</div>
            <div className="bm-kpi-sub">{totals.pct.toFixed(1)}% dari total pagu</div>
          </div>
        </div>
        <div className="bm-kpi bm-kpi--green">
          <div className="bm-kpi-icon"><Wallet size={20} /></div>
          <div>
            <div className="bm-kpi-lbl">Sisa Anggaran</div>
            <div className="bm-kpi-val">{fmt(totals.remaining)}</div>
            <div className="bm-kpi-sub bm-kpi-bar-wrap">
              <div className="bm-kpi-bar">
                <div className={`bm-kpi-bar-fill sc-${statusClass(totals.pct)}`} style={{ width: `${Math.min(totals.pct, 100)}%` }} />
              </div>
              <span>{totals.pct.toFixed(1)}% terserap</span>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="bm-banner">
<<<<<<< HEAD
        {activeTab === "capex" ? (
          <>
            <Briefcase size={13} /> Realisasi CAPEX = total <b>nilai_kontrak</b>
            . Nilai aset per unit ditampilkan di drill-down dengan indikator{" "}
            <b>balance</b> terhadap nilai kontrak.
          </>
        ) : (
          <>
            <Monitor size={13} /> Realisasi OPEX = total transaksi yang diinput
            finance. Klik baris untuk melihat riwayat &amp; tambah transaksi
            baru.
          </>
        )}
=======
        {activeTab === "capex"
          ? <><Briefcase size={13} /> Realisasi CAPEX = total <b>nilai_kontrak</b>. Nilai aset per unit ditampilkan di drill-down dengan indikator <b>balance</b> terhadap nilai kontrak.</>
          : <><Monitor size={13} /> Realisasi OPEX = total transaksi yang diinput finance. Klik baris untuk melihat riwayat &amp; tambah transaksi baru.</>
        }
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
      </div>

      {/* Table */}
      <section className="bm-table-wrap">
        <div className="bm-table-bar">
          <h2>Rincian Pos Anggaran</h2>
          <div className="bm-search">
            <Search size={15} />
            <input placeholder="Cari nama anggaran…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>
        <div className="bm-table-scroll">
          <table className="bm-table">
            <thead>
              <tr>
                <th style={{ width: "34%" }}>{activeTab === "capex" ? "Nama Anggaran CAPEX" : "Mata Anggaran OPEX"}</th>
                <th>Kode / ID</th>
                <th className="ta-r">Pagu (RKAP)</th>
                <th className="ta-r">Realisasi</th>
                <th className="ta-r">Sisa</th>
                <th className="ta-c">Serapan</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
<<<<<<< HEAD
              {data.length === 0 && (
                <tr>
                  <td colSpan="7" className="bm-empty-cell">
                    Tidak ada data yang cocok.
                  </td>
                </tr>
              )}
=======
              {data.length === 0 && <tr><td colSpan="7" className="bm-empty-cell">Tidak ada data yang cocok.</td></tr>}
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
              {data.map((item) => {
                const open = expandedBudget === item.id;
                const sc = statusClass(item.percentage);
                return (
                  <React.Fragment key={item.id}>
                    <tr className={`bm-row ${open ? "bm-row--open" : ""}`} onClick={() => toggleBudget(item.id)}>
                      <td>
                        <div className="fw-med lh-tight">{item.name}</div>
                        {activeTab === "capex" && item.raw.thn_rkap_awal && (
<<<<<<< HEAD
                          <div className="tc-muted fs-xs">
                            RKAP {item.raw.thn_rkap_awal}–
                            {item.raw.thn_rkap_akhir}&ensp;·&ensp;Thn{" "}
                            {item.raw.thn_anggaran}
                          </div>
=======
                          <div className="tc-muted fs-xs">RKAP {item.raw.thn_rkap_awal}–{item.raw.thn_rkap_akhir}&ensp;·&ensp;Thn {item.raw.thn_anggaran}</div>
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                        )}
                        <div className="tc-muted2 fs-xs mt2">
                          {activeTab === "capex"
                            ? `${item.projects.length} pekerjaan · ${item.projects.reduce((s, p) => s + (p.assets?.length || 0), 0)} aset`
                            : `${item.realisasiList.length} transaksi realisasi`}
                        </div>
                      </td>
                      <td>
                        <code className="bm-code">{item.id}</code>
                        <div className="tc-muted fs-xs mt2">{item.raw.kd_anggaran_master}</div>
                      </td>
                      <td className="ta-r fw-med">{fmt(item.pagu)}</td>
                      <td className={`ta-r fw-bold ${item.used > 0 ? "tc-amber" : "tc-muted"}`}>{item.used > 0 ? fmt(item.used) : "—"}</td>
                      <td className={`ta-r fw-bold ${item.remaining < 0 ? "tc-red" : "tc-green"}`}>{fmt(item.remaining)}</td>
                      <td className="ta-c">
                        <div className="bm-pct-wrap">
                          <div className="bm-pct-bar"><div className={`bm-pct-fill sc-${sc}`} style={{ width: `${Math.min(item.percentage, 100)}%` }} /></div>
                          <span className={`bm-badge sc-${sc}`}>{item.percentage.toFixed(1)}%</span>
                        </div>
                        <div className={`bm-status-lbl sc-${sc}`}>{statusLabel(item.percentage)}</div>
                      </td>
                      <td>{open ? <ChevronUp size={18} className="tc-accent" /> : <ChevronDown size={18} className="tc-muted2" />}</td>
                    </tr>
<<<<<<< HEAD
                    {open &&
                      (activeTab === "opex" ? (
                        <OpexDetail item={item} />
                      ) : (
                        <CapexDetail item={item} />
                      ))}
=======
                    {open && (activeTab === "opex" ? <OpexDetail item={item} /> : <CapexDetail item={item} />)}
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal */}
      {modalRealisasi && (
        <ModalRealisasiOpex
          anggaran={modalRealisasi}
          onClose={() => setModalRealisasi(null)}
<<<<<<< HEAD
          onSave={(formData) =>
            handleSaveRealisasi(modalRealisasi.raw, formData)
          }
=======
          onSave={(formData) => handleSaveRealisasi(modalRealisasi.raw, formData)}
>>>>>>> e2d2ce46a377c7fa48b125825fd2f8d64256ced8
        />
      )}
    </div>
  );
}