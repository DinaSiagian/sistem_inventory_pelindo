import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Save,
  X,
  Plus,
  Trash2,
  FileText,
  CheckCircle,
  ArrowLeft,
  Package,
  Search,
  ChevronDown,
  AlertTriangle,
  Database,
  Calendar,
  Layers,
  ChevronRight,
  Edit,
  Clock,
  Check
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// MOCK DATA — disesuaikan dengan struktur DB
// ═══════════════════════════════════════════════════════════════

const existingBudgetMasters = [
  {
    kd_anggaran_master: "5030905000",
    nm_anggaran_master: "Beban Pemeliharaan Software",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5021300000",
    nm_anggaran_master: "Beban Jaringan dan Koneksi Data",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5021200000",
    nm_anggaran_master: "Beban Perlengkapan Kantor",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5081500000",
    nm_anggaran_master: "Beban Jasa Konsultan",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "5060700000",
    nm_anggaran_master: "Beban Sumber Daya Pihak Ketiga Peralatan",
    tipe_anggaran_master: "OPEX",
  },
  {
    kd_anggaran_master: "2540011",
    nm_anggaran_master: "Transformasi dan Digitalisasi Operasional",
    tipe_anggaran_master: "CAPEX",
  },
  {
    kd_anggaran_master: "2540012",
    nm_anggaran_master: "Pengembangan Infrastruktur Jaringan",
    tipe_anggaran_master: "CAPEX",
  },
  {
    kd_anggaran_master: "2540015",
    nm_anggaran_master: "Pengadaan Peralatan Bongkar Muat",
    tipe_anggaran_master: "CAPEX",
  },
  {
    kd_anggaran_master: "2540020",
    nm_anggaran_master: "Standarisasi Perangkat IT Kantor",
    tipe_anggaran_master: "CAPEX",
  },
];

const fmt = (n) => {
  if (n === 0 || !n) return "—";
  return new Intl.NumberFormat("id-ID").format(n);
};

// ═══════════════════════════════════════════════════════════════
// ConfirmDialog
// ═══════════════════════════════════════════════════════════════
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div style={overlayStyle} onClick={onCancel}>
      <div style={confirmBoxStyle} onClick={(e) => e.stopPropagation()}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            background: "#fff7ed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f97316",
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <p
          style={{
            fontSize: "0.9rem",
            color: "#0f172a",
            fontWeight: 500,
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={btnSecondaryStyle} onClick={onCancel}>
            Batal
          </button>
          <button style={btnDangerStyle} onClick={onConfirm}>
            <Trash2 size={13} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SearchableSelect
// ═══════════════════════════════════════════════════════════════
function SearchableSelect({
  options,
  value,
  onChange,
  placeholder,
  renderOption,
  renderSelected,
  filterFn,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter((o) => (filterFn ? filterFn(o, q) : true));
  const selected = options.find((o) => o.value === value);
  return (
    <div style={{ position: "relative" }}>
      {selected ? (
        <div style={selectedBoxStyle}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {renderSelected ? renderSelected(selected) : selected.label}
          </div>
          <button
            style={{
              ...btnSmallStyle,
              background: "#f1f5f9",
              color: "#64748b",
              border: "1px solid #e2e8f0",
            }}
            onClick={() => onChange(null)}
          >
            Ganti
          </button>
        </div>
      ) : (
        <>
          <div
            style={{
              ...triggerStyle,
              ...(open
                ? {
                    borderColor: "#1d4ed8",
                    boxShadow: "0 0 0 3px rgba(29,78,216,.1)",
                  }
                : {}),
            }}
            onClick={() => setOpen(!open)}
          >
            <Search size={14} style={{ color: "#94a3b8", flexShrink: 0 }} />
            <span style={{ color: "#94a3b8", fontSize: "0.84rem" }}>
              {placeholder}
            </span>
            <ChevronDown
              size={14}
              style={{
                color: "#94a3b8",
                marginLeft: "auto",
                transition: "transform 0.2s",
                transform: open ? "rotate(180deg)" : "rotate(0)",
              }}
            />
          </div>
          {open && (
            <>
              <div
                style={{ position: "fixed", inset: 0, zIndex: 40 }}
                onClick={() => {
                  setOpen(false);
                  setQ("");
                }}
              />
              <div style={dropdownStyle}>
                <div style={searchInputWrapStyle}>
                  <Search size={13} style={{ color: "#94a3b8" }} />
                  <input
                    autoFocus
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Cari…"
                    style={searchInputStyle}
                  />
                </div>
                <div style={{ maxHeight: 260, overflowY: "auto" }}>
                  {filtered.length === 0 && (
                    <div
                      style={{
                        padding: "16px",
                        textAlign: "center",
                        color: "#94a3b8",
                        fontSize: "0.8rem",
                      }}
                    >
                      Tidak ada hasil
                    </div>
                  )}
                  {filtered.map((o) => (
                    <div
                      key={o.value}
                      style={optionStyle}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#eff6ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                      onClick={() => {
                        onChange(o.value);
                        setOpen(false);
                        setQ("");
                      }}
                    >
                      {renderOption ? renderOption(o) : <span>{o.label}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KOMPONEN UTAMA — BudgetInput
// ═══════════════════════════════════════════════════════════════
const BudgetInput = () => {
  const [step, setStep] = useState(1);
  const [tipeAnggaran, setTipeAnggaran] = useState(null); // "OPEX" | "CAPEX"
  const [confirm, setConfirm] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  // ── Step 2: Budget Master ──────────────────────────────────
  const [masterMode, setMasterMode] = useState("existing"); // "existing" | "new"
  const [selectedMasterId, setSelectedMasterId] = useState(null);
  const [newMaster, setNewMaster] = useState({
    kd_anggaran_master: "",
    nm_anggaran_master: "",
    tipe_anggaran_master: "",
  });

  // ── Pilihan Tahun Dropdown (2000 sampai P+1) ───────────────
  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const maxYear = currentYear + 1; // P + 1
    const minYear = 2000;
    const years = [];
    for (let y = maxYear; y >= minYear; y--) {
      years.push(y);
    }
    return years;
  }, []);

  // ── Step 3: Modal Input State ─────────────────────────────
  const [showAddModal, setShowAddModal] = useState(false);

  const [opexForm, setOpexForm] = useState({
    nama_anggaran: "",
    thn_anggaran: new Date().getFullYear(),
    nilai_anggaran_tahunan: "",
  });

  const [capexForm, setCapexForm] = useState({
    nm_anggaran_capex: "",
    thn_rkap_awal: new Date().getFullYear(),
    thn_rkap_akhir: new Date().getFullYear() + 1,
    thn_anggaran: new Date().getFullYear(),
    nilai_anggaran_kad: "",
    nilai_anggaran_rkap: "",
  });

  // ── MOCK DATA TABEL ANGGARAN TAHUNAN ──────────────────────
  const [yearlyBudgets, setYearlyBudgets] = useState([
    { 
      id: 1, 
      nama_anggaran: "Beban Pemeliharaan Software",
      tahun: 2026, 
      anggaran: 900000000, 
      bymhd: 100000000, 
      total: 1000000000,
      history: [
        { id: "h1", tanggal: "2026-01-01", real: 1000000000, bymhd: 0, jumlah: 1000000000, ket: "Input Awal" },
        { id: "h2", tanggal: "2026-02-01", real: 0, bymhd: 100000000, jumlah: 100000000, ket: "BYMHD" },
        { id: "h3", tanggal: "2026-03-03", real: -100000000, bymhd: 0, jumlah: -100000000, ket: "Pengurangan" }
      ]
    },
  ]);

  // ── STATE UNTUK HALAMAN EDIT & HISTORY (Step 3) ─────────────
  const [editingRow, setEditingRow] = useState(null);
  const [historyModal, setHistoryModal] = useState(null);
  const [editForm, setEditForm] = useState({
    perubahan: "",
    nilai_perubahan: ""
  });

  // ── Derived ───────────────────────────────────────────────
  const masterOptions = existingBudgetMasters
    .filter((m) => !tipeAnggaran || m.tipe_anggaran_master === tipeAnggaran)
    .map((m) => ({
      value: m.kd_anggaran_master,
      label: m.nm_anggaran_master,
      ...m,
    }));

  const selectedMaster =
    masterOptions.find((m) => m.value === selectedMasterId) ||
    (masterMode === "new" && newMaster.kd_anggaran_master
      ? {
          ...newMaster,
          value: newMaster.kd_anggaran_master,
          label: newMaster.nm_anggaran_master,
        }
      : { label: "Nama Anggaran Master" }); 

  const canProceedStep1 = !!tipeAnggaran;
  const canProceedStep2 = masterMode === "existing" ? !!selectedMasterId : !!newMaster.nm_anggaran_master;

  const canSaveModal = tipeAnggaran === "OPEX" 
    ? !!(opexForm.nama_anggaran && opexForm.thn_anggaran && opexForm.nilai_anggaran_tahunan)
    : !!(capexForm.nm_anggaran_capex && capexForm.thn_anggaran && capexForm.nilai_anggaran_rkap);

  const handleSubmitAll = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setStep(1);
    setTipeAnggaran(null);
    setSelectedMasterId(null);
    setMasterMode("existing");
    setNewMaster({ kd_anggaran_master: "", nm_anggaran_master: "", tipe_anggaran_master: "" });
    setOpexForm({ nama_anggaran: "", thn_anggaran: new Date().getFullYear(), nilai_anggaran_tahunan: "" });
    setCapexForm({ kd_anggaran_capex: "", nm_anggaran_capex: "", thn_rkap_awal: new Date().getFullYear(), thn_rkap_akhir: new Date().getFullYear() + 1, thn_anggaran: new Date().getFullYear(), nilai_anggaran_kad: "", nilai_anggaran_rkap: "" });
    setEditingRow(null);
  };

  const handleOpenAddModal = () => {
    if (tipeAnggaran === "OPEX") {
      setOpexForm(f => ({ ...f, nama_anggaran: selectedMaster.label }));
    } else {
      setCapexForm(f => ({ ...f, nm_anggaran_capex: selectedMaster.label }));
    }
    setShowAddModal(true);
  };

  const handleAddYearlyBudget = () => {
    const isOpex = tipeAnggaran === "OPEX";
    const tahun = isOpex ? parseInt(opexForm.thn_anggaran) : parseInt(capexForm.thn_anggaran);
    const anggaran = isOpex ? parseFloat(opexForm.nilai_anggaran_tahunan) : parseFloat(capexForm.nilai_anggaran_rkap);
    const nama = isOpex ? opexForm.nama_anggaran : capexForm.nm_anggaran_capex;
    
    if(!tahun || !anggaran || !nama) return;

    const newEntry = {
      id: Date.now(),
      nama_anggaran: nama,
      tahun: tahun,
      anggaran: anggaran,
      bymhd: 0,
      total: anggaran,
      history: [
        {
          id: Date.now(),
          tanggal: new Date().toISOString().split('T')[0],
          real: anggaran,
          bymhd: 0,
          jumlah: anggaran,
          ket: "Input Awal"
        }
      ]
    };

    setYearlyBudgets([...yearlyBudgets, newEntry]);
    
    if(isOpex) setOpexForm({ nama_anggaran: "", thn_anggaran: new Date().getFullYear(), nilai_anggaran_tahunan: "" });
    else setCapexForm({ nm_anggaran_capex: "", kd_anggaran_capex: "", thn_rkap_awal: new Date().getFullYear(), thn_rkap_akhir: new Date().getFullYear() + 1, thn_anggaran: new Date().getFullYear(), nilai_anggaran_kad: "", nilai_anggaran_rkap: "" });
    
    setShowAddModal(false);
    showLocalToast("Anggaran berhasil ditambahkan ke daftar.");
  };

  const handleSaveEdit = () => {
    const val = parseFloat(editForm.nilai_perubahan) || 0;
    if (val === 0) return;

    let dReal = 0;
    let dBymhd = 0;

    if (editForm.perubahan === "penambahan") dReal = val;
    if (editForm.perubahan === "pengurangan") dReal = -val;
    if (editForm.perubahan === "bymhd") dBymhd = val;
    if (editForm.perubahan === "transfer") dReal = -val; 

    const dTotal = dReal + dBymhd;

    const newHistory = {
      id: Date.now(),
      tanggal: new Date().toISOString().split('T')[0],
      real: dReal,
      bymhd: dBymhd,
      jumlah: dTotal,
      ket: editForm.perubahan.charAt(0).toUpperCase() + editForm.perubahan.slice(1)
    };

    const updatedBudgets = yearlyBudgets.map(b => {
      if (b.id === editingRow.id) {
        return {
          ...b,
          anggaran: b.anggaran + dReal,
          bymhd: b.bymhd + dBymhd,
          total: b.total + dTotal,
          history: [...(b.history || []), newHistory]
        };
      }
      return b;
    });

    setYearlyBudgets(updatedBudgets);
    showLocalToast("Perubahan anggaran berhasil disimpan.");
    setEditingRow(null);
    setEditForm({ perubahan: "", nilai_perubahan: "" });
  };

  const [localToast, setLocalToast] = useState(null);
  const showLocalToast = (msg) => {
    setLocalToast(msg);
    setTimeout(() => setLocalToast(null), 3000);
  };

  const upOpex = (k, v) => setOpexForm((f) => ({ ...f, [k]: v }));
  const upCapex = (k, v) => setCapexForm((f) => ({ ...f, [k]: v }));

  const steps = [
    { num: 1, label: "Tipe Anggaran" },
    { num: 2, label: "Anggaran Master" },
    { num: 3, label: "Detail Anggaran" },
  ];

  return (
    <div style={rootStyle}>
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {submitted && (
        <div style={toastStyle}>
          <CheckCircle size={16} /> Data anggaran berhasil disimpan!
        </div>
      )}
      
      {localToast && (
        <div style={toastStyle}>
          <Check size={16} /> {localToast}
        </div>
      )}

      {/* ── MODAL POP-UP HISTORY ── */}
      {historyModal && (
        <div style={overlayStyle} onClick={() => setHistoryModal(null)}>
          <div style={{...confirmBoxStyle, maxWidth: 680, alignItems: 'stretch', padding: 0, overflow: 'hidden'}} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '20px 24px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <Clock size={16} style={{ color: '#3b82f6' }}/> Riwayat Perubahan Anggaran
                </h3>
                <p style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: 500 }}>{historyModal.nama_anggaran} · Tahun {historyModal.tahun}</p>
              </div>
              <button style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: 8, padding: 6, cursor: 'pointer', color: '#64748b', transition: 'all 0.2s' }} onClick={() => setHistoryModal(null)}>
                <X size={16}/>
              </button>
            </div>
            
            <div style={{ overflowX: 'auto', padding: '0' }}>
              <table style={{...tableStyle, borderTop: 'none'}}>
                <thead>
                  <tr>
                    <th style={{...thStyle, width: 40, textAlign: "center"}}>No</th>
                    <th style={{...thStyle, width: 100}}>Tanggal</th>
                    <th style={thStyle}>Keterangan</th>
                    <th style={{...thStyle, textAlign: "right"}}>Real</th>
                    <th style={{...thStyle, textAlign: "right"}}>BYMHD</th>
                    <th style={{...thStyle, textAlign: "right"}}>Jumlah</th>
                  </tr>
                </thead>
                <tbody>
                  {!historyModal.history || historyModal.history.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#94a3b8', fontSize: '0.85rem' }}>Tidak ada riwayat perubahan.</td>
                    </tr>
                  ) : (
                    historyModal.history.map((h, i) => (
                      <tr key={h.id} style={trStyle}>
                        <td style={{...tdStyle, textAlign: "center", fontWeight: 700, color: "#64748b"}}>{i + 1}</td>
                        <td style={{...tdStyle, color: "#475569"}}>{h.tanggal}</td>
                        <td style={{...tdStyle, fontWeight: 600, color: "#0f172a"}}>{h.ket}</td>
                        <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: h.real < 0 ? "#dc2626" : "#0f172a"}}>{fmt(h.real)}</td>
                        <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: h.bymhd < 0 ? "#dc2626" : "#0f172a"}}>{fmt(h.bymhd)}</td>
                        <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, color: h.jumlah < 0 ? "#dc2626" : "#1d4ed8"}}>{fmt(h.jumlah)}</td>
                      </tr>
                    ))
                  )}
                </tbody>
                <tfoot>
                  <tr style={{ background: '#f1f5f9' }}>
                    <td colSpan={3} style={{...tdStyle, textAlign: "right", fontWeight: 800, fontSize: "0.75rem", color: "#334155"}}>TOTAL AKHIR</td>
                    <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: "#0f172a"}}>{fmt(historyModal.history?.reduce((acc, curr) => acc + curr.real, 0) || 0)}</td>
                    <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: "#0f172a"}}>{fmt(historyModal.history?.reduce((acc, curr) => acc + curr.bymhd, 0) || 0)}</td>
                    <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: "#1d4ed8", fontSize: "0.95rem"}}>{fmt(historyModal.history?.reduce((acc, curr) => acc + curr.jumlah, 0) || 0)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            
            <div style={{ padding: '16px 24px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button style={btnCancelStyle} onClick={() => setHistoryModal(null)}>Tutup Riwayat</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL POP-UP INPUT ANGGARAN BARU (Desain 1 Kolom Tersusun Bawah) ── */}
      {showAddModal && (
        <div style={overlayStyle} onClick={() => setShowAddModal(false)}>
          <div style={{...confirmBoxStyle, maxWidth: 420, alignItems: "stretch", padding: "24px", textAlign: "left"}} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", display: "flex", alignItems: "center", gap: 8 }}>
                <Plus size={18} style={{ color: tipeAnggaran === "CAPEX" ? "#1d4ed8" : "#15803d" }}/> Input Anggaran Baru
              </h3>
              <button style={{ background: "transparent", border: "none", cursor: "pointer", color: "#64748b" }} onClick={() => setShowAddModal(false)}>
                <X size={18} />
              </button>
            </div>
            
            {/* Layout 1 Kolom Menurun agar mata fokus membaca ke bawah */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* NAMA ANGGARAN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Nama Anggaran <span style={{ color: "#dc2626" }}>*</span></label>
                <input
                  style={inputStyle}
                  value={tipeAnggaran === "OPEX" ? opexForm.nama_anggaran : capexForm.nm_anggaran_capex}
                  onChange={(e) => tipeAnggaran === "OPEX" ? upOpex("nama_anggaran", e.target.value) : upCapex("nm_anggaran_capex", e.target.value)}
                  placeholder="Contoh: Beban Pemeliharaan Software"
                />
              </div>

              {/* TAHUN ANGGARAN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Tahun Anggaran <span style={{ color: "#dc2626" }}>*</span></label>
                <select
                  style={inputStyle}
                  value={tipeAnggaran === "OPEX" ? opexForm.thn_anggaran : capexForm.thn_anggaran}
                  onChange={(e) => tipeAnggaran === "OPEX" ? upOpex("thn_anggaran", e.target.value) : upCapex("thn_anggaran", e.target.value)}
                >
                  <option value="">-- Pilih Tahun --</option>
                  {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>

              {/* NILAI ANGGARAN */}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={labelStyle}>Nilai Anggaran (IDR) <span style={{ color: "#dc2626" }}>*</span></label>
                <input
                  type="number"
                  style={inputStyle}
                  value={tipeAnggaran === "OPEX" ? opexForm.nilai_anggaran_tahunan : capexForm.nilai_anggaran_rkap}
                  onChange={(e) => tipeAnggaran === "OPEX" ? upOpex("nilai_anggaran_tahunan", e.target.value) : upCapex("nilai_anggaran_rkap", e.target.value)}
                  placeholder="0"
                />
              </div>

              {/* FIELD TAMBAHAN KHUSUS CAPEX */}
              {tipeAnggaran === "CAPEX" && (
                <>
                  <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                      <label style={labelStyle}>Thn RKAP Awal</label>
                      <select style={inputStyle} value={capexForm.thn_rkap_awal} onChange={e => upCapex("thn_rkap_awal", e.target.value)}>
                        {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
                      <label style={labelStyle}>Thn RKAP Akhir</label>
                      <select style={inputStyle} value={capexForm.thn_rkap_akhir} onChange={e => upCapex("thn_rkap_akhir", e.target.value)}>
                        {yearOptions.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    <label style={labelStyle}>Nilai Anggaran KAD</label>
                    <input type="number" style={inputStyle} value={capexForm.nilai_anggaran_kad} onChange={(e) => upCapex("nilai_anggaran_kad", e.target.value)} placeholder="0" />
                  </div>
                </>
              )}
            </div>
            
            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 28, borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
              <button style={btnCancelStyle} onClick={() => setShowAddModal(false)}>Batal</button>
              <button 
                style={{...btnPrimaryStyle, ...(tipeAnggaran === "OPEX" ? btnGreenStyle : {})}} 
                onClick={handleAddYearlyBudget}
                disabled={!canSaveModal}
              >
                <Save size={14} /> Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div style={headerStyle}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button style={backBtnStyle}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1
              style={{
                fontSize: "1.35rem",
                fontWeight: 800,
                letterSpacing: "-0.4px",
                color: "#0f172a",
              }}
            >
              Input Anggaran Baru
            </h1>
            <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 3 }}>
              Tambah data anggaran master, anggaran tahunan
              {tipeAnggaran === "CAPEX" ? ", dan detail CAPEX" : ""}
            </p>
          </div>
        </div>
        {tipeAnggaran && (
          <span
            style={{
              ...typeBadgeStyle,
              ...(tipeAnggaran === "CAPEX" ? capexBadgeStyle : opexBadgeStyle),
            }}
          >
            {tipeAnggaran}
          </span>
        )}
      </div>

      {/* ── Stepper ── */}
      <div style={stepperStyle}>
        {steps.map((s, i) => (
          <React.Fragment key={s.num}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  transition: "all 0.2s",
                  background:
                    step > s.num
                      ? "#15803d"
                      : step === s.num
                        ? tipeAnggaran === "CAPEX"
                          ? "#1d4ed8"
                          : "#15803d"
                        : "#e2e8f0",
                  color: step >= s.num ? "white" : "#94a3b8",
                  boxShadow:
                    step === s.num ? "0 0 0 4px rgba(29,78,216,.15)" : "none",
                }}
              >
                {step > s.num ? <CheckCircle size={16} /> : s.num}
              </div>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: step === s.num ? 700 : 500,
                  color: step >= s.num ? "#0f172a" : "#94a3b8",
                }}
              >
                {s.label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: 2,
                  background: step > s.num ? "#15803d" : "#e2e8f0",
                  transition: "background 0.3s",
                  borderRadius: 99,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* STEP 1 — Pilih Tipe Anggaran */}
      {/* ═══════════════════════════════════════════════════ */}
      {step === 1 && (
        <div style={contentStyle}>
          <div style={formCardStyle}>
            <div style={formCardHeaderStyle}>
              <Layers size={18} style={{ color: "#1d4ed8" }} />
              <h2 style={cardTitleStyle}>Pilih Tipe Anggaran</h2>
            </div>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#64748b",
                marginBottom: 20,
              }}
            >
              Pilih tipe anggaran yang akan ditambahkan. Tipe ini menentukan
              alur input selanjutnya.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {/* OPEX Card */}
              <div
                style={{
                  ...typeCardStyle,
                  ...(tipeAnggaran === "OPEX" ? typeCardActiveOpex : {}),
                }}
                onClick={() => {
                  setTipeAnggaran("OPEX");
                  setNewMaster((f) => ({ ...f, tipe_anggaran_master: "OPEX" }));
                }}
              >
                <div
                  style={{
                    ...typeIconStyle,
                    background: tipeAnggaran === "OPEX" ? "#dcfce7" : "#f1f5f9",
                    color: tipeAnggaran === "OPEX" ? "#15803d" : "#64748b",
                  }}
                >
                  <Package size={28} />
                </div>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: tipeAnggaran === "OPEX" ? "#15803d" : "#0f172a",
                  }}
                >
                  OPEX
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#64748b",
                    marginTop: 4,
                  }}
                >
                  Anggaran Operasional
                </p>
                <ul
                  style={{
                    marginTop: 12,
                    paddingLeft: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  {[
                    "Pemeliharaan & Lisensi Software",
                    "Jaringan & Koneksi Data",
                    "Sewa Peralatan & Jasa",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.75rem",
                        color: "#64748b",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#15803d",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {tipeAnggaran === "OPEX" && (
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <CheckCircle size={20} style={{ color: "#15803d" }} />
                  </div>
                )}
              </div>

              {/* CAPEX Card */}
              <div
                style={{
                  ...typeCardStyle,
                  ...(tipeAnggaran === "CAPEX" ? typeCardActiveCapex : {}),
                }}
                onClick={() => {
                  setTipeAnggaran("CAPEX");
                  setNewMaster((f) => ({
                    ...f,
                    tipe_anggaran_master: "CAPEX",
                  }));
                }}
              >
                <div
                  style={{
                    ...typeIconStyle,
                    background:
                      tipeAnggaran === "CAPEX" ? "#dbeafe" : "#f1f5f9",
                    color: tipeAnggaran === "CAPEX" ? "#1d4ed8" : "#64748b",
                  }}
                >
                  <FileText size={28} />
                </div>
                <h3
                  style={{
                    fontWeight: 800,
                    fontSize: "1.1rem",
                    color: tipeAnggaran === "CAPEX" ? "#1d4ed8" : "#0f172a",
                  }}
                >
                  CAPEX
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#64748b",
                    marginTop: 4,
                  }}
                >
                  Anggaran Investasi
                </p>
                <ul
                  style={{
                    marginTop: 12,
                    paddingLeft: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                  }}
                >
                  {[
                    "Pengadaan Infrastruktur IT",
                    "Proyek Pembangunan",
                    "Standarisasi Perangkat",
                  ].map((item) => (
                    <li
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: "0.75rem",
                        color: "#64748b",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: "50%",
                          background: "#1d4ed8",
                          flexShrink: 0,
                        }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                {tipeAnggaran === "CAPEX" && (
                  <div style={{ position: "absolute", top: 12, right: 12 }}>
                    <CheckCircle size={20} style={{ color: "#1d4ed8" }} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div style={actionsStyle}>
            <button
              style={{
                ...btnPrimaryStyle,
                ...(tipeAnggaran === "OPEX" ? btnGreenStyle : {}),
                opacity: canProceedStep1 ? 1 : 0.4,
                cursor: canProceedStep1 ? "pointer" : "not-allowed",
              }}
              disabled={!canProceedStep1}
              onClick={() => setStep(2)}
            >
              Lanjut — Anggaran Master <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* STEP 2 — Budget Master */}
      {/* ═══════════════════════════════════════════════════ */}
      {step === 2 && (
        <div style={contentStyle}>
          <div style={formCardStyle}>
            <div style={formCardHeaderStyle}>
              <Database
                size={18}
                style={{
                  color: tipeAnggaran === "CAPEX" ? "#1d4ed8" : "#15803d",
                }}
              />
              <h2 style={cardTitleStyle}>Data Anggaran Master</h2>
            </div>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#64748b",
                marginBottom: 16,
              }}
            >
              Anggaran master adalah referensi utama klasifikasi anggaran. Pilih
              yang sudah ada atau buat baru jika belum terdaftar.
            </p>

            {/* Toggle: Existing vs New */}
            <div style={toggleWrapStyle}>
              <button
                style={{
                  ...toggleBtnStyle,
                  ...(masterMode === "existing"
                    ? tipeAnggaran === "CAPEX"
                      ? toggleActiveCapex
                      : toggleActiveOpex
                    : {}),
                }}
                onClick={() => setMasterMode("existing")}
              >
                <Search size={13} /> Pilih dari Daftar
              </button>
              <button
                style={{
                  ...toggleBtnStyle,
                  ...(masterMode === "new"
                    ? tipeAnggaran === "CAPEX"
                      ? toggleActiveCapex
                      : toggleActiveOpex
                    : {}),
                }}
                onClick={() => setMasterMode("new")}
              >
                <Plus size={13} /> Tambah Baru
              </button>
            </div>

            {/* Existing Mode */}
            {masterMode === "existing" && (
              <div style={{ marginTop: 16 }}>
                <label style={labelStyle}>
                  Anggaran Master <span style={{ color: "#dc2626" }}>*</span>
                </label>
                <SearchableSelect
                  options={masterOptions}
                  value={selectedMasterId}
                  onChange={setSelectedMasterId}
                  placeholder="-- Cari & pilih anggaran master --"
                  filterFn={(o, q) =>
                    !q ||
                    o.label.toLowerCase().includes(q.toLowerCase()) ||
                    o.kd_anggaran_master.toLowerCase().includes(q.toLowerCase())
                  }
                  renderOption={(o) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 3,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                        }}
                      >
                        <code style={codeStyle}>{o.kd_anggaran_master}</code>
                        <span
                          style={{
                            fontWeight: 600,
                            fontSize: "0.84rem",
                            color: "#0f172a",
                          }}
                        >
                          {o.nm_anggaran_master}
                        </span>
                        <span
                          style={{
                            ...typeBadgeSmall,
                            ...(o.tipe_anggaran_master === "CAPEX"
                              ? capexBadgeSmall
                              : opexBadgeSmall),
                          }}
                        >
                          {o.tipe_anggaran_master}
                        </span>
                      </div>
                    </div>
                  )}
                  renderSelected={(o) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 4,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 7,
                          flexWrap: "wrap",
                        }}
                      >
                        <code style={codeStyle}>{o.kd_anggaran_master}</code>
                        <span
                          style={{
                            fontWeight: 700,
                            fontSize: "0.85rem",
                            color: "#0f172a",
                          }}
                        >
                          {o.nm_anggaran_master}
                        </span>
                        <span
                          style={{
                            ...typeBadgeSmall,
                            ...(o.tipe_anggaran_master === "CAPEX"
                              ? capexBadgeSmall
                              : opexBadgeSmall),
                          }}
                        >
                          {o.tipe_anggaran_master}
                        </span>
                      </div>
                    </div>
                  )}
                />
                {selectedMasterId && (
                  <div style={autofillBannerStyle}>
                    <CheckCircle size={14} />
                    Data anggaran master dimuat dari sistem — kode dan tipe
                    tidak dapat diubah.
                  </div>
                )}
              </div>
            )}

            {/* New Mode */}
            {masterMode === "new" && (
              <div
                style={{
                  marginTop: 16,
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div style={infoBoxStyle}>
                  <AlertTriangle size={14} />
                  <span>
                    Isi nama anggaran master — kode unik akan dibuat otomatis
                    oleh sistem saat disimpan.
                  </span>
                </div>
                <div style={formGridStyle}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 5,
                      gridColumn: "1/-1",
                    }}
                  >
                    <label style={labelStyle}>
                      Nama Anggaran Master{" "}
                      <span style={{ color: "#dc2626" }}>*</span>
                    </label>
                    <input
                      style={inputStyle}
                      value={newMaster.nm_anggaran_master}
                      onChange={(e) => {
                        const nama = e.target.value;
                        const autoKode = `MST-${Date.now().toString().slice(-6)}`;
                        setNewMaster((f) => ({
                          ...f,
                          nm_anggaran_master: nama,
                          kd_anggaran_master: autoKode,
                        }));
                      }}
                      placeholder="Contoh: Beban Pemeliharaan Software"
                    />
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label style={labelStyle}>Kode Anggaran Master</label>
                    <div style={autoKodeBoxStyle}>
                      <span style={autoKodePrefixStyle}>AUTO</span>
                      <span style={autoKodeValueStyle}>
                        {newMaster.nm_anggaran_master ? (
                          newMaster.kd_anggaran_master
                        ) : (
                          <span
                            style={{ color: "#94a3b8", fontStyle: "italic" }}
                          >
                            Akan dibuat otomatis
                          </span>
                        )}
                      </span>
                    </div>
                    <span style={helperStyle}>
                      Kode unik dibuat otomatis oleh sistem saat data disimpan
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 5 }}
                  >
                    <label style={labelStyle}>Tipe Anggaran</label>
                    <div
                      style={{
                        ...inputStyle,
                        background: "#f8fafc",
                        color: "#475569",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          ...typeBadgeSmall,
                          ...(tipeAnggaran === "CAPEX"
                            ? capexBadgeSmall
                            : opexBadgeSmall),
                        }}
                      >
                        {tipeAnggaran}
                      </span>
                      <span style={{ fontSize: "0.8rem" }}>
                        {tipeAnggaran === "OPEX"
                          ? "Anggaran Operasional"
                          : "Anggaran Investasi"}
                      </span>
                    </div>
                    <span style={helperStyle}>
                      Terisi otomatis sesuai tipe yang dipilih di langkah 1
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div style={actionsStyle}>
            <button style={btnCancelStyle} onClick={() => setStep(1)}>
              <ArrowLeft size={15} /> Kembali
            </button>
            <button
              style={{
                ...btnPrimaryStyle,
                ...(tipeAnggaran === "OPEX" ? btnGreenStyle : {}),
                opacity: canProceedStep2 ? 1 : 0.4,
                cursor: canProceedStep2 ? "pointer" : "not-allowed",
              }}
              disabled={!canProceedStep2}
              onClick={() => setStep(3)}
            >
              Lanjut — Detail Anggaran Tahunan <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════ */}
      {/* STEP 3 — Detail Anggaran Tahunan (Tabel & Input Baru/Edit) */}
      {/* ═══════════════════════════════════════════════════ */}
      {step === 3 && (
        <div style={contentStyle}>
          {/* ── Context bar: info master terpilih ── */}
          <div style={contextBarStyle}>
            <div style={contextItemStyle}>
              <span style={contextLabelStyle}>Tipe Anggaran</span>
              <strong
                style={{
                  ...typeBadgeSmall,
                  ...(tipeAnggaran === "CAPEX" ? capexBadgeSmall : opexBadgeSmall),
                  fontSize: "0.78rem",
                  padding: "3px 10px",
                }}
              >
                {tipeAnggaran}
              </strong>
            </div>
            <div style={contextItemStyle}>
              <span style={contextLabelStyle}>Kode Anggaran Master</span>
              <strong>
                <code style={codeStyle}>
                  {masterMode === "existing" ? selectedMasterId : newMaster.kd_anggaran_master}
                </code>
              </strong>
            </div>
            <div style={contextItemStyle}>
              <span style={contextLabelStyle}>Nama Anggaran Master</span>
              <strong style={{ fontSize: "0.82rem", color: "#0f172a" }}>
                {selectedMaster.label}
              </strong>
            </div>
          </div>

          {/* ── TAMPILAN HALAMAN EDIT (Jika ada baris yang diklik Edit) ── */}
          {editingRow ? (
            <div style={{ ...formCardStyle, animation: "fadeUp 0.2s ease" }}>
              <div style={formCardHeaderStyle}>
                <Edit size={18} style={{ color: "#d97706" }} />
                <h2 style={cardTitleStyle}>Edit / Revisi Anggaran</h2>
              </div>
              
              {/* Info read-only */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 24, padding: "16px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={labelStyle}>Nama Anggaran</span>
                    <strong style={{ color: "#0f172a", fontSize: "0.85rem" }}>{editingRow.nama_anggaran}</strong>
                 </div>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={labelStyle}>Tahun</span>
                    <strong style={{ color: "#0f172a", fontSize: "0.85rem" }}>{editingRow.tahun}</strong>
                 </div>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={labelStyle}>Total Anggaran Berjalan</span>
                    <strong style={{ color: "#1d4ed8", fontSize: "1rem" }}>Rp {fmt(editingRow.total)}</strong>
                 </div>
              </div>

              {/* Form Input Revisi - Satu kolom menurun */}
              <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 500 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Jenis Perubahan <span style={{ color: "#dc2626" }}>*</span></label>
                  <select 
                    style={inputStyle} 
                    value={editForm.perubahan} 
                    onChange={(e) => setEditForm({...editForm, perubahan: e.target.value})}
                  >
                    <option value="">-- Pilih Jenis Perubahan --</option>
                    <option value="penambahan">Penambahan Anggaran</option>
                    <option value="pengurangan">Pengurangan Anggaran</option>
                    <option value="bymhd">BYMHD (Biaya Yang Masih Harus Dibayar)</option>
                    <option value="transfer">Transfer Anggaran</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={labelStyle}>Nilai Perubahan (IDR) <span style={{ color: "#dc2626" }}>*</span></label>
                  <input 
                    type="number" 
                    style={inputStyle} 
                    placeholder="Contoh: 50000000"
                    value={editForm.nilai_perubahan}
                    onChange={(e) => setEditForm({...editForm, nilai_perubahan: e.target.value})}
                  />
                  {editForm.nilai_perubahan && (
                    <span style={{ ...helperStyle, color: "#d97706", fontWeight: 600 }}>
                      ≈ Rp {fmt(editForm.nilai_perubahan)}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 32, justifyContent: "flex-end", borderTop: "1px solid #f1f5f9", paddingTop: 16 }}>
                 <button style={btnCancelStyle} onClick={() => { setEditingRow(null); setEditForm({ perubahan: "", nilai_perubahan: ""}); }}>
                    Batal
                 </button>
                 <button 
                    style={{ ...btnPrimaryStyle, background: "linear-gradient(135deg,#d97706,#f59e0b)", boxShadow: "0 2px 8px rgba(217,119,6,.25)" }} 
                    onClick={handleSaveEdit}
                    disabled={!editForm.perubahan || !editForm.nilai_perubahan}
                 >
                    <Save size={14} /> Submit Perubahan
                 </button>
              </div>
            </div>
          ) : (
            /* ── TAMPILAN NORMAL (Tabel) ── */
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <h2 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a" }}>Daftar Anggaran Tahunan</h2>
                <button 
                  style={{ ...btnPrimaryStyle, ...(tipeAnggaran === "OPEX" ? btnGreenStyle : {}) }} 
                  onClick={handleOpenAddModal}
                >
                  <Plus size={14} /> Input Data Baru
                </button>
              </div>

              <div style={{ ...formCardStyle, padding: 0, overflow: "hidden" }}>
                <div style={{ overflowX: "auto" }}>
                  <table style={tableStyle}>
                    <thead>
                      <tr>
                        <th style={{...thStyle, width: 50, textAlign: "center"}}>No</th>
                        <th style={thStyle}>Tahun</th>
                        <th style={{...thStyle, textAlign: "right"}}>Anggaran Murni</th>
                        <th style={{...thStyle, textAlign: "right"}}>Anggaran BYMHD</th>
                        <th style={{...thStyle, textAlign: "right"}}>Total Anggaran</th>
                        <th style={{...thStyle, textAlign: "center", width: 100}}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {yearlyBudgets.length === 0 ? (
                        <tr>
                          <td colSpan={6} style={{ textAlign: "center", padding: "32px 16px", color: "#94a3b8", fontSize: "0.8rem" }}>
                            Belum ada anggaran tahunan yang ditambahkan.
                          </td>
                        </tr>
                      ) : (
                        yearlyBudgets.map((item, index) => (
                          <tr key={item.id} style={trStyle}>
                            <td style={{...tdStyle, textAlign: "center", fontWeight: 700, color: "#64748b"}}>{index + 1}</td>
                            <td style={{...tdStyle, fontWeight: 700}}>{item.tahun}</td>
                            <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: "#334155"}}>{fmt(item.anggaran)}</td>
                            <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", color: "#d97706"}}>{fmt(item.bymhd)}</td>
                            <td style={{...tdStyle, textAlign: "right", fontFamily: "'JetBrains Mono', monospace", fontWeight: 800, color: tipeAnggaran === "CAPEX" ? "#1d4ed8" : "#15803d"}}>{fmt(item.total)}</td>
                            <td style={{...tdStyle, textAlign: "center"}}>
                              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                                <button title="Revisi / Edit" style={actionBtnStyle} onClick={() => setEditingRow(item)}>
                                  <Edit size={13} style={{ color: "#d97706" }}/>
                                </button>
                                <button title="Lihat History Perubahan" style={actionBtnStyle} onClick={() => setHistoryModal(item)}>
                                  <Clock size={13} style={{ color: "#3b82f6" }}/>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                    {yearlyBudgets.length > 0 && (
                      <tfoot>
                        <tr style={{ background: tipeAnggaran === "CAPEX" ? "#eff6ff" : "#f0fdf4" }}>
                          <td colSpan={4} style={{...tdStyle, textAlign: "right", fontWeight: 800, fontSize: "0.75rem", color: tipeAnggaran === "CAPEX" ? "#1e40af" : "#14532d"}}>
                            GRAND TOTAL SELURUH TAHUN
                          </td>
                          <td style={{...tdStyle, textAlign: "right", fontWeight: 800, fontSize: "0.95rem", color: tipeAnggaran === "CAPEX" ? "#1d4ed8" : "#15803d"}}>
                            {fmt(yearlyBudgets.reduce((acc, curr) => acc + curr.total, 0))}
                          </td>
                          <td style={tdStyle}></td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
              </div>

              {/* 3. Action Buttons */}
              <div style={actionsStyle}>
                <button style={btnCancelStyle} onClick={() => setStep(2)}>
                  <ArrowLeft size={15} /> Kembali
                </button>
                <button
                  style={{
                    ...btnPrimaryStyle,
                    ...(tipeAnggaran === "OPEX" ? btnGreenStyle : {}),
                    opacity: yearlyBudgets.length > 0 ? 1 : 0.4,
                    cursor: yearlyBudgets.length > 0 ? "pointer" : "not-allowed",
                  }}
                  disabled={yearlyBudgets.length === 0}
                  onClick={handleSubmitAll}
                >
                  <Save size={16} /> Simpan Seluruh Data {tipeAnggaran}
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BudgetInput;

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const rootStyle = {
  fontFamily: "'Plus Jakarta Sans', 'Segoe UI', sans-serif",
  maxWidth: 860,
  margin: "0 auto",
  padding: "2rem 1.5rem",
  minHeight: "100vh",
  background: "#f1f5f9",
  color: "#0f172a",
  position: "relative",
};
const headerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: "1.5rem",
  background: "white",
  padding: "1.1rem 1.4rem",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  boxShadow: "0 1px 3px rgba(0,0,0,.05)",
};
const backBtnStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 36,
  height: 36,
  borderRadius: 10,
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
  color: "#475569",
  cursor: "pointer",
};
const stepperStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: "1.5rem",
  background: "white",
  padding: "1rem 1.4rem",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
};
const contentStyle = { display: "flex", flexDirection: "column", gap: 16 };
const formCardStyle = {
  background: "white",
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  padding: "1.4rem 1.5rem",
  boxShadow: "0 1px 3px rgba(0,0,0,.04)",
};
const formCardHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  marginBottom: 14,
  paddingBottom: 12,
  borderBottom: "1px solid #f1f5f9",
};
const cardTitleStyle = {
  fontSize: "0.95rem",
  fontWeight: 800,
  color: "#0f172a",
  flex: 1,
};
const actionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  gap: 10,
  background: "white",
  padding: "1rem 1.4rem",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
};
const btnPrimaryStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "9px 20px",
  borderRadius: 9,
  border: "none",
  background: "linear-gradient(135deg,#1d4ed8,#3b82f6)",
  color: "white",
  fontFamily: "inherit",
  fontSize: "0.82rem",
  fontWeight: 700,
  cursor: "pointer",
  boxShadow: "0 2px 8px rgba(29,78,216,.25)",
};
const btnGreenStyle = {
  background: "linear-gradient(135deg,#15803d,#16a34a)",
  boxShadow: "0 2px 8px rgba(21,128,61,.25)",
};
const btnCancelStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 7,
  padding: "9px 16px",
  borderRadius: 9,
  border: "1px solid #e2e8f0",
  background: "white",
  color: "#64748b",
  fontFamily: "inherit",
  fontSize: "0.82rem",
  fontWeight: 600,
  cursor: "pointer",
};
const btnSecondaryStyle = { ...btnCancelStyle };
const btnDangerStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 16px",
  borderRadius: 9,
  border: "none",
  background: "#dc2626",
  color: "white",
  fontFamily: "inherit",
  fontSize: "0.82rem",
  fontWeight: 700,
  cursor: "pointer",
};
const btnSmallStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 5,
  padding: "5px 12px",
  borderRadius: 7,
  border: "none",
  fontSize: "0.72rem",
  fontWeight: 700,
  cursor: "pointer",
  fontFamily: "inherit",
};

const typeCardStyle = {
  position: "relative",
  background: "#f8fafc",
  border: "2px solid #e2e8f0",
  borderRadius: 14,
  padding: "1.2rem 1.1rem",
  cursor: "pointer",
  transition: "all 0.2s",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};
const typeCardActiveOpex = {
  background: "#f0fdf4",
  borderColor: "#86efac",
  boxShadow: "0 0 0 4px rgba(21,128,61,.08)",
};
const typeCardActiveCapex = {
  background: "#eff6ff",
  borderColor: "#93c5fd",
  boxShadow: "0 0 0 4px rgba(29,78,216,.08)",
};
const typeIconStyle = {
  width: 52,
  height: 52,
  borderRadius: 13,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 12,
  transition: "all 0.2s",
};

const typeBadgeStyle = {
  display: "inline-flex",
  alignItems: "center",
  padding: "3px 10px",
  borderRadius: 6,
  fontSize: "0.72rem",
  fontWeight: 800,
  letterSpacing: "0.4px",
};
const typeBadgeSmall = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 7px",
  borderRadius: 4,
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.3px",
};
const opexBadgeStyle = { background: "#dcfce7", color: "#15803d" };
const capexBadgeStyle = { background: "#dbeafe", color: "#1e40af" };
const opexBadgeSmall = { background: "#dcfce7", color: "#15803d" };
const capexBadgeSmall = { background: "#dbeafe", color: "#1e40af" };

const toggleWrapStyle = {
  display: "flex",
  background: "#f1f5f9",
  borderRadius: 10,
  padding: 3,
  gap: 3,
  marginBottom: 4,
};
const toggleBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "7px 16px",
  borderRadius: 8,
  border: "none",
  background: "transparent",
  fontFamily: "inherit",
  fontSize: "0.8rem",
  fontWeight: 600,
  color: "#64748b",
  cursor: "pointer",
  transition: "all 0.2s",
};
const toggleActiveOpex = {
  background: "white",
  color: "#15803d",
  boxShadow: "0 1px 4px rgba(0,0,0,.08)",
};
const toggleActiveCapex = {
  background: "white",
  color: "#1d4ed8",
  boxShadow: "0 1px 4px rgba(0,0,0,.08)",
};

const labelStyle = {
  fontSize: "0.72rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#475569",
};
const inputStyle = {
  padding: "9px 11px",
  border: "1px solid #e2e8f0",
  borderRadius: 8,
  fontFamily: "inherit",
  fontSize: "0.84rem",
  color: "#0f172a",
  outline: "none",
  width: "100%",
  transition: "all 0.2s",
  boxSizing: "border-box",
  background: "white",
};
const helperStyle = { fontSize: "0.7rem", color: "#94a3b8", marginTop: 2 };
const formGridStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "12px 16px",
};
const codeStyle = {
  fontFamily: "'JetBrains Mono', 'Courier New', monospace",
  fontSize: "0.73rem",
  background: "#f1f5f9",
  color: "#475569",
  padding: "2px 7px",
  borderRadius: 4,
  border: "1px solid #e2e8f0",
};

const triggerStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 12px",
  border: "1px solid #e2e8f0",
  borderRadius: 9,
  cursor: "pointer",
  background: "white",
  transition: "all 0.2s",
};
const selectedBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 14px",
  border: "1px solid #e2e8f0",
  borderRadius: 9,
  background: "#f8fafc",
};
const dropdownStyle = {
  position: "absolute",
  top: "calc(100% + 5px)",
  left: 0,
  right: 0,
  background: "white",
  border: "1px solid #e2e8f0",
  borderRadius: 10,
  boxShadow: "0 8px 30px rgba(0,0,0,.12)",
  zIndex: 50,
  overflow: "hidden",
};
const searchInputWrapStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 12px",
  borderBottom: "1px solid #f1f5f9",
};
const searchInputStyle = {
  flex: 1,
  border: "none",
  outline: "none",
  fontFamily: "inherit",
  fontSize: "0.82rem",
  color: "#0f172a",
  background: "transparent",
};
const optionStyle = {
  padding: "10px 14px",
  cursor: "pointer",
  transition: "background 0.15s",
  borderBottom: "1px solid #f8fafc",
};

const autofillBannerStyle = {
  display: "flex",
  alignItems: "center",
  gap: 7,
  background: "#f0fdf4",
  border: "1px solid #86efac",
  borderRadius: 8,
  padding: "8px 12px",
  fontSize: "0.75rem",
  color: "#15803d",
  fontWeight: 600,
  marginTop: 10,
};
const infoBoxStyle = {
  display: "flex",
  alignItems: "flex-start",
  gap: 8,
  background: "#fef9c3",
  border: "1px solid #fde047",
  borderRadius: 8,
  padding: "9px 12px",
  fontSize: "0.75rem",
  color: "#92400e",
  fontWeight: 500,
};

const contextBarStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: 12,
  background: "white",
  padding: "1rem 1.4rem",
  borderRadius: 12,
  border: "1px solid #e2e8f0",
  marginBottom: 20
};
const contextItemStyle = { display: "flex", flexDirection: "column", gap: 5 };
const contextLabelStyle = {
  fontSize: "0.65rem",
  fontWeight: 700,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#94a3b8",
};

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,.5)",
  backdropFilter: "blur(3px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9000,
  padding: 20,
};
const confirmBoxStyle = {
  background: "white",
  borderRadius: 16,
  padding: "28px 24px",
  maxWidth: 360,
  width: "100%",
  boxShadow: "0 12px 40px rgba(0,0,0,.14)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 14,
  textAlign: "center",
};
const toastStyle = {
  position: "fixed",
  bottom: 24,
  right: 24,
  background: "#15803d",
  color: "white",
  padding: "12px 20px",
  borderRadius: 12,
  fontSize: "0.82rem",
  fontWeight: 600,
  boxShadow: "0 4px 20px rgba(0,0,0,.15)",
  display: "flex",
  alignItems: "center",
  gap: 8,
  zIndex: 9999,
};

const autoKodeBoxStyle = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "9px 12px",
  border: "1px dashed #bfdbfe",
  borderRadius: 8,
  background: "#eff6ff",
};
const autoKodePrefixStyle = {
  fontSize: "0.65rem",
  fontWeight: 800,
  background: "#1d4ed8",
  color: "white",
  padding: "2px 7px",
  borderRadius: 4,
  letterSpacing: "0.5px",
  flexShrink: 0,
};
const autoKodeValueStyle = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: "0.78rem",
  color: "#1d4ed8",
  fontWeight: 600,
};

/* ── STYLES TAMBAHAN UNTUK TABEL ANGGARAN TAHUNAN ── */
const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.8rem",
  color: "#0f172a"
};
const thStyle = {
  padding: "10px 16px",
  borderBottom: "1px solid #e2e8f0",
  background: "#f8fafc",
  fontSize: "0.7rem",
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  color: "#64748b",
  textAlign: "left"
};
const tdStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid #f1f5f9",
  verticalAlign: "middle"
};
const trStyle = {
  transition: "background 0.15s",
};
const actionBtnStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "6px",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  background: "white",
  cursor: "pointer",
  transition: "all 0.15s"
};