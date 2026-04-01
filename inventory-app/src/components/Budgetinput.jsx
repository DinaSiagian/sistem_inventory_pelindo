import React, { useState, useEffect } from "react";
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
  Layers,
  ChevronRight,
  Edit,
  Clock,
  RefreshCw,
  Eye,
  History,
  Calendar,
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// DATA MASTER & INIT DATA
// ═══════════════════════════════════════════════════════════════
const MASTER_LIST = [
  { kd: "5030905000", nm: "Beban Pemeliharaan Software", tipe: "OPEX" },
  { kd: "5021300000", nm: "Beban Jaringan dan Koneksi Data", tipe: "OPEX" },
  { kd: "5021200000", nm: "Beban Perlengkapan Kantor", tipe: "OPEX" },
  { kd: "5081500000", nm: "Beban Jasa Konsultan", tipe: "OPEX" },
  {
    kd: "5060700000",
    nm: "Beban Sumber Daya Pihak Ketiga Peralatan",
    tipe: "OPEX",
  },
  { kd: "5900100000", nm: "Beban Investasi", tipe: "CAPEX" },
];

const INIT_OPEX = [
  {
    id: "OPX-1",
    kd_master: "5030905000",
    nm_master: "Beban Pemeliharaan Software",
    nm_anggaran: "Lisensi Software Antivirus",
    kd_anggaran: "5030905001",
    anggaran_tahunan: [
      {
        id: "OPX-YR-1",
        thn: 2024,
        anggaran_murni: 900000000,
        anggaran_bymhd: 100000000,
        history: [
          {
            id: "H1",
            tgl: "2024-01-01",
            tipe: "initial",
            nilai: 900000000,
            is_initial: true,
            keterangan: "Input awal murni",
          },
          {
            id: "H2",
            tgl: "2024-01-02",
            tipe: "bymhd",
            nilai: 100000000,
            is_initial: false,
            keterangan: "Input awal BYMHD",
          },
        ],
      },
    ],
  },
];

const INIT_CAPEX = [
  {
    id: "CAP-1",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Implementasi dan Standarisasi IT Infrastruktur",
    kd_capex: "2440015",
    thn_rkap_awal: 2024,
    thn_rkap_akhir: 2024,
    thn_anggaran: 2024,
    nilai_kad: 0,
    nilai_rkap: 0,
    anggaran_tahunan: [],
    pekerjaan: [
      {
        id: "PKJ-001",
        nm: "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur PT Pelindo Multi Terminal",
        nilai_rab: 0,
        nilai_kontrak: 0,
        no_pr: "",
        no_po: "6440000026",
        no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
        tgl_kontrak: "2024-08-12",
        durasi_kontrak: 90,
        no_sp3: "",
        tgl_sp3: "",
        tgl_bamk: "2024-08-02",
        keterangan: "",
      },
    ],
  },
  {
    id: "CAP-2",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Penyediaan Network di Branch SPMT",
    kd_capex: "2440014",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: []
  },
  {
    id: "CAP-3",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Penyiapan Infrastruktur IT (Kantor Pusat, Pelindo Place, Pelindo Tower, Malahayati, Lhokseumawe, Bima, Badas, Parepare, Gresik, Tanjung Emas, Mekar Putih, Meulaboh, Kuala Langsa dan Bumiharjo) PT Pelindo Multi Terminal",
    kd_capex: "2440013",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: []
  },
  {
    id: "CAP-4",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Revisi Capex (Pemenuhan Kebutuhan Gate dan PNC Transformasi pada Branch SPMT)",
    kd_capex: "2440020",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: []
  },
  {
    id: "CAP-5",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Transformasi dan Digitalisasi PT Pelindo Multi Terminal",
    kd_capex: "2540011",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: []
  },
  {
    id: "CAP-6",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Standarisasi Perangkat Jaringan di Lingkungan PT Pelindo Multi Terminal",
    kd_capex: "2540012",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: []
  },
  {
    id: "CAP-7",
    kd_master: "5900100000",
    nm_master: "Beban Investasi",
    nm_anggaran: "Penyiapan Infrastruktur IT pada Kegiatan Roro",
    kd_capex: "2540010",
    thn_rkap_awal: 2024, thn_rkap_akhir: 2024, thn_anggaran: 2024,
    nilai_kad: 0, nilai_rkap: 0, anggaran_tahunan: [], pekerjaan: []
  }
];

const fmt = (n) => (n ? new Intl.NumberFormat("id-ID").format(n) : "0");
const fmtDate = (d) => {
  if (!d) return "";
  const date = new Date(d);
  return isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};
const uid = () => `ID-${Date.now().toString().slice(-6)}`;

// LIST TAHUN (2000 sampai P-1)
const yearOpts = (() => {
  const max = new Date().getFullYear() - 1; // P-1
  const a = [];
  for (let y = max; y >= 2000; y--) a.push(y);
  return a;
})();

// ═══════════════════════════════════════════════════════════════
// SHARED UI COMPONENTS
// ═══════════════════════════════════════════════════════════════
function Toast({ msg, color = "#16a34a" }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: color,
        color: "white",
        padding: "12px 20px",
        borderRadius: 8,
        fontSize: "0.85rem",
        fontWeight: 500,
        boxShadow: "0 4px 12px rgba(0,0,0,.1)",
        display: "flex",
        alignItems: "center",
        gap: 8,
        zIndex: 9999,
      }}
    >
      <CheckCircle size={16} /> {msg}
    </div>
  );
}

function ConfirmDlg({ msg, onConfirm, onCancel }) {
  return (
    <div style={OVS} onClick={onCancel}>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          padding: "24px",
          maxWidth: 320,
          width: "100%",
          boxShadow: "0 10px 25px rgba(0,0,0,.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16,
          textAlign: "center",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            background: "#fef2f2",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#dc2626",
          }}
        >
          <AlertTriangle size={24} />
        </div>
        <p style={{ fontSize: "0.9rem", color: "#334155", fontWeight: 500 }}>
          {msg}
        </p>
        <div style={{ display: "flex", gap: 10, width: "100%" }}>
          <button style={{ ...BTNOUT, flex: 1 }} onClick={onCancel}>
            Batal
          </button>
          <button
            style={{
              ...BTN,
              background: "#dc2626",
              flex: 1,
              justifyContent: "center",
            }}
            onClick={onConfirm}
          >
            <Trash2 size={14} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

function Stepper({ steps, current, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "white",
        padding: "1rem 1.4rem",
        borderRadius: 10,
        border: "1px solid #e2e8f0",
        marginBottom: "1rem",
        boxShadow: "0 1px 2px rgba(0,0,0,.02)",
      }}
    >
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 26,
                height: 26,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 600,
                fontSize: "0.75rem",
                background:
                  current > i ? "#16a34a" : current === i ? color : "#f1f5f9",
                color: current >= i ? "white" : "#94a3b8",
                flexShrink: 0,
              }}
            >
              {current > i ? <CheckCircle size={14} /> : i + 1}
            </div>
            <span
              style={{
                fontSize: "0.8rem",
                fontWeight: current === i ? 600 : 500,
                color: current >= i ? "#1e293b" : "#94a3b8",
                whiteSpace: "nowrap",
              }}
            >
              {s}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              style={{
                flex: 1,
                height: 2,
                background: current > i ? "#16a34a" : "#f1f5f9",
                borderRadius: 99,
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function Card({ children, style }) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: 10,
        border: "1px solid #e2e8f0",
        padding: "1.4rem",
        boxShadow: "0 1px 2px rgba(0,0,0,.02)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function CardHdr({ icon, title, color }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        marginBottom: 16,
        paddingBottom: 12,
        borderBottom: "1px solid #f1f5f9",
      }}
    >
      {React.cloneElement(icon, { size: 18, style: { color } })}
      <h2 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1e293b" }}>
        {title}
      </h2>
    </div>
  );
}

function Fld({ label, required, children, helper }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={LBL}>
        {label}
        {required && <span style={{ color: "#ef4444" }}> *</span>}
      </label>
      {children}
      {helper && (
        <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>{helper}</span>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MASTER DROP COMPONENT
// ═══════════════════════════════════════════════════════════════
function MasterDrop({ options, value, onChange, onEditDrop, onDeleteDrop, placeholder="Cari & pilih master…" }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const filtered = options.filter(
    (o) => !q || o.nm.toLowerCase().includes(q.toLowerCase()),
  );
  const sel = options.find((o) => o.kd === value);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "9px 12px",
          border: `1px solid ${open ? "#3b82f6" : "#e2e8f0"}`,
          borderRadius: 6,
          cursor: "pointer",
          background: "white",
        }}
        onClick={() => setOpen(!open)}
      >
        <Search size={14} style={{ color: "#94a3b8", flexShrink: 0 }} />
        <span
          style={{
            color: sel ? "#1e293b" : "#94a3b8",
            fontSize: "0.85rem",
            flex: 1,
            fontWeight: sel ? 500 : 400,
          }}
        >
          {sel ? `${sel.nm} (${sel.kd})` : placeholder}
        </span>
        <ChevronDown
          size={16}
          style={{
            color: "#94a3b8",
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .2s",
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
          <div
            style={{
              position: "absolute",
              top: "calc(100% + 4px)",
              left: 0,
              right: 0,
              background: "white",
              border: "1px solid #e2e8f0",
              borderRadius: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,.08)",
              zIndex: 50,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                borderBottom: "1px solid #f1f5f9",
                background: "#f8fafc",
              }}
            >
              <Search size={14} style={{ color: "#64748b" }} />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Ketik untuk mencari…"
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  fontSize: "0.85rem",
                  background: "transparent",
                }}
              />
            </div>
            <div style={{ maxHeight: 240, overflowY: "auto" }}>
              {filtered.length === 0 && (
                <div
                  style={{
                    padding: 14,
                    textAlign: "center",
                    color: "#94a3b8",
                    fontSize: "0.85rem",
                  }}
                >
                  Tidak ada hasil
                </div>
              )}
              {filtered.map((o) => (
                <div
                  key={o.kd}
                  style={{
                    padding: "8px 14px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1px solid #f1f5f9",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#f8fafc")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                  onClick={() => {
                    onChange(o.kd);
                    setOpen(false);
                    setQ("");
                  }}
                >
                  <div
                    style={{
                      fontWeight: 500,
                      fontSize: "0.85rem",
                      color: "#1e293b",
                      flex: 1,
                    }}
                  >
                    {o.nm} <span style={{color:"#94a3b8", fontSize: "0.75rem"}}>({o.kd})</span>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 4,
                        cursor: "pointer",
                      }}
                      title="Edit Master List"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                        onEditDrop(o);
                      }}
                    >
                      <Edit size={14} color="#d97706" />
                    </button>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        padding: 4,
                        cursor: "pointer",
                      }}
                      title="Hapus Master List"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpen(false);
                        onDeleteDrop(o);
                      }}
                    >
                      <Trash2 size={14} color="#ef4444" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// HISTORY POPUP COMPONENT
// ═══════════════════════════════════════════════════════════════
function HistoryPopup({ row, title, onClose, lbl="Anggaran" }) {
  const history = row.history || [];

  const TIPE_META = {
    initial: { label: "Input Awal", color: "#0284c7", bg: "#e0f2fe" },
    penambahan: { label: "Penambahan", color: "#16a34a", bg: "#dcfce7" },
    pengurangan: { label: "Pengurangan", color: "#dc2626", bg: "#fee2e2" },
    bymhd: { label: "BYMHD", color: "#d97706", bg: "#fef3c7" },
    transfer: { label: `Transfer ${lbl}`, color: "#7c3aed", bg: "#ede9fe" },
  };

  const rows = history.map((h) => {
    const isBymhd = h.tipe === "bymhd" || h.tipe === "transfer";
    const isInitial = h.is_initial || h.tipe === "initial";

    let real = null;
    let bymhd = null;
    let jumlah = 0;

    if (isInitial) {
      real = h.nilai;
      bymhd = null;
      jumlah = h.nilai;
    } else if (h.tipe === "penambahan") {
      real = null; 
      bymhd = h.nilai;
      jumlah = h.nilai;
    } else if (h.tipe === "pengurangan") {
      real = -h.nilai;
      bymhd = null;
      jumlah = -h.nilai;
    } else if (isBymhd) {
      real = null;
      bymhd = h.nilai;
      jumlah = h.nilai;
    }

    const meta = isInitial
      ? TIPE_META.initial
      : TIPE_META[h.tipe] || { label: h.tipe, color: "#475569", bg: "#f1f5f9" };

    return { ...h, real, bymhd, jumlah, meta };
  });

  const grandTotal = rows.reduce((acc, r) => acc + (r.jumlah || 0), 0);

  return (
    <div style={OVS} onClick={onClose}>
      <div
        style={{
          background: "white",
          borderRadius: 12,
          width: "100%",
          maxWidth: 720,
          maxHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 10px 25px rgba(0,0,0,.1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "16px 20px",
            borderBottom: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <History size={18} style={{ color: "#2563eb" }} />
              <h3
                style={{ fontWeight: 600, fontSize: "1rem", color: "#1e293b" }}
              >
                Riwayat Perubahan {lbl}
              </h3>
            </div>
            <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
              <b>{title}</b> — Tahun {row.thn}
            </div>
          </div>
          <button
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: "#64748b",
            }}
            onClick={onClose}
          >
            <X size={20} />
          </button>
        </div>

        <div style={{ overflowY: "auto", padding: "16px", flex: 1 }}>
          {history.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "32px 0",
                color: "#94a3b8",
                fontSize: "0.85rem",
              }}
            >
              Belum ada riwayat perubahan.
            </div>
          ) : (
            <table style={TABLE}>
              <thead>
                <tr>
                  <th style={{ ...TH, width: 40, textAlign: "center" }}>NO</th>
                  <th style={{ ...TH, width: 120 }}>TANGGAL</th>
                  <th style={{ ...TH, width: 160 }}>TIPE</th>
                  <th style={{ ...TH, textAlign: "right" }}>REAL (Rp)</th>
                  <th style={{ ...TH, textAlign: "right" }}>BYMHD (Rp)</th>
                  <th style={{ ...TH, textAlign: "right" }}>JUMLAH (Rp)</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((h, i) => (
                  <tr key={h.id}>
                    <td style={{ ...TD, textAlign: "center" }}>{i + 1}</td>
                    <td style={{ ...TD, color: "#64748b" }}>
                      {fmtDate(h.tgl)}
                    </td>
                    <td style={TD}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "4px 8px",
                          borderRadius: 4,
                          fontSize: "0.75rem",
                          fontWeight: 600,
                          background: h.meta.bg,
                          color: h.meta.color,
                        }}
                      >
                        {h.meta.label}
                      </span>
                      {h.keterangan && (
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "#94a3b8",
                            marginTop: 4,
                          }}
                        >
                          {h.keterangan}
                        </div>
                      )}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                        color:
                          h.real === null
                            ? "#cbd5e1"
                            : h.real < 0
                              ? "#ef4444"
                              : "#16a34a",
                      }}
                    >
                      {h.real !== null ? (
                        <>
                          {h.real < 0 ? "−" : ""}
                          {fmt(Math.abs(h.real))}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                        color: "#d97706",
                      }}
                    >
                      {h.bymhd !== null ? (
                        fmt(h.bymhd)
                      ) : (
                        <span style={{ color: "#cbd5e1" }}>—</span>
                      )}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 600,
                        color: (h.jumlah || 0) < 0 ? "#ef4444" : "#1e293b",
                      }}
                    >
                      {h.jumlah < 0 ? "−" : ""}
                      {fmt(Math.abs(h.jumlah || 0))}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ background: "#f8fafc" }}>
                  <td
                    colSpan={5}
                    style={{
                      ...TD,
                      textAlign: "right",
                      fontWeight: 600,
                      color: "#475569",
                    }}
                  >
                    TOTAL {lbl.toUpperCase()} SAAT INI
                  </td>
                  <td
                    style={{
                      ...TD,
                      textAlign: "right",
                      fontVariantNumeric: "tabular-nums",
                      fontWeight: 700,
                      color: grandTotal < 0 ? "#ef4444" : "#2563eb",
                      fontSize: "0.9rem",
                    }}
                  >
                    {grandTotal < 0 ? "−" : ""}Rp {fmt(Math.abs(grandTotal))}
                  </td>
                </tr>
              </tfoot>
            </table>
          )}
        </div>

        <div
          style={{
            padding: "16px",
            borderTop: "1px solid #e2e8f0",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <button style={BTNOUT} onClick={onClose}>
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// EDIT ANGGARAN COMPONENT (INLINE CARD)
// ═══════════════════════════════════════════════════════════════
function EditAnggaranPage({ row, title, onBack, onSave, lbl = "Anggaran" }) {
  const [tipePerubahan, setTipePerubahan] = useState("");
  const [nilaiPerubahan, setNilaiPerubahan] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const LBL = lbl.toUpperCase();

  const TIPE_OPTIONS = [
    { value: "penambahan", label: `Penambahan ${lbl}` },
    { value: "pengurangan", label: `Pengurangan ${lbl}` },
    { value: "bymhd", label: "BYMHD (Biaya Yang Masih Harus Dibayar)" },
    { value: "transfer", label: `Transfer ${lbl}` },
  ];

  const handleSubmit = () => {
    if (!tipePerubahan || !nilaiPerubahan) return;
    const today = new Date().toISOString().split("T")[0];
    const newEntry = {
      id: uid(),
      tgl: today,
      tipe: tipePerubahan,
      nilai: parseFloat(nilaiPerubahan) || 0,
      keterangan,
      is_initial: false,
    };
    onSave(row.id, newEntry, tipePerubahan, parseFloat(nilaiPerubahan) || 0);
  };

  const currentTotal = (row.history || []).reduce((acc, h) => {
    if (h.is_initial || h.tipe === "initial") return acc + h.nilai;
    if (h.tipe === "penambahan") return acc + h.nilai;
    if (h.tipe === "pengurangan") return acc - h.nilai;
    if (h.tipe === "bymhd" || h.tipe === "transfer") return acc + h.nilai;
    return acc;
  }, 0);

  return (
    <div style={{ marginTop: "24px", paddingBottom: "24px" }}>
      <div
        style={{
          background: "white",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          boxShadow: "0 4px 6px -1px rgba(0,0,0,0.05)",
          padding: "24px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
          <Edit size={20} style={{ color: "#d97706" }} />
          <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a" }}>
            Edit / Revisi {lbl}
          </h2>
        </div>

        <div
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "8px",
            marginBottom: "24px",
            background: "#fdfdfd",
          }}
        >
          {[
            { label: `NAMA ${LBL}`, value: title },
            { label: "TAHUN", value: String(row.thn) },
            {
              label: `TOTAL ${LBL} BERJALAN`,
              value: `Rp ${new Intl.NumberFormat("id-ID").format(currentTotal)}`,
              highlight: true,
            },
          ].map((item, i, arr) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "16px 20px",
                borderBottom: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
              }}
            >
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#64748b", letterSpacing: "0.5px" }}>
                {item.label}
              </span>
              <span
                style={{
                  fontSize: item.highlight ? "1rem" : "0.95rem",
                  fontWeight: 700,
                  color: item.highlight ? "#2563eb" : "#1e293b",
                  fontVariantNumeric: item.highlight ? "tabular-nums" : "normal"
                }}
              >
                {item.value}
              </span>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ maxWidth: "500px" }}>
            <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", letterSpacing: "0.5px", marginBottom: "8px" }}>
              JENIS PERUBAHAN <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <select
                style={{ ...INP, cursor: "pointer", appearance: "none", paddingRight: "36px" }}
                value={tipePerubahan}
                onChange={(e) => setTipePerubahan(e.target.value)}
              >
                <option value="">-- Pilih Jenis Perubahan --</option>
                {TIPE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown size={16} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", color: "#64748b", pointerEvents: "none" }} />
            </div>
          </div>

          {tipePerubahan && (
            <>
              <div style={{ maxWidth: "500px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", letterSpacing: "0.5px", marginBottom: "8px" }}>
                  NILAI PERUBAHAN (IDR) <span style={{ color: "#ef4444" }}>*</span>
                </label>
                <input
                  type="number"
                  style={INP}
                  placeholder="Contoh: 50000000"
                  value={nilaiPerubahan}
                  onChange={(e) => setNilaiPerubahan(e.target.value)}
                />
                {parseFloat(nilaiPerubahan) > 0 && (
                  <div style={{ marginTop: 6, fontSize: "0.8rem", color: "#64748b" }}>
                    ≈ Rp {new Intl.NumberFormat("id-ID").format(nilaiPerubahan)}
                  </div>
                )}
              </div>
              <div style={{ maxWidth: "500px" }}>
                <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "#475569", letterSpacing: "0.5px", marginBottom: "8px" }}>
                  KETERANGAN (OPSIONAL)
                </label>
                <input
                  style={INP}
                  placeholder="Catatan perubahan..."
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                />
              </div>
            </>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "32px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" }}>
          <button
            style={{ background: "transparent", border: "none", color: "#64748b", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", padding: "8px 16px" }}
            onClick={onBack}
          >
            Batal
          </button>
          <button
            style={{
              ...BTN,
              background: "#ea580c",
              opacity: !tipePerubahan || !nilaiPerubahan ? 0.5 : 1,
              padding: "10px 20px",
              borderRadius: "8px"
            }}
            disabled={!tipePerubahan || !nilaiPerubahan}
            onClick={handleSubmit}
          >
            <Save size={16} /> Submit Perubahan
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANGGARAN TAHUNAN SECTION (NOW A CARD)
// ═══════════════════════════════════════════════════════════════
function AnggaranTahunanSection({ item, setList, title, toast_, lbl = "Anggaran" }) {
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [historyRow, setHistoryRow] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const LBL = lbl.toUpperCase();

  const emptyForm = {
    thn: new Date().getFullYear() - 1, // Default ke P-1
    anggaran_murni: "",
    anggaran_bymhd: "",
  };
  const [form, setForm] = useState(emptyForm);

  const list = item?.anggaran_tahunan || [];

  const openAdd = () => {
    setForm(emptyForm);
    setShowForm(true);
  };

  const handleSaveNew = () => {
    const today = new Date().toISOString().split("T")[0];
    const payload = {
      id: uid(),
      thn: parseInt(form.thn),
      anggaran_murni: parseFloat(form.anggaran_murni) || 0,
      anggaran_bymhd: parseFloat(form.anggaran_bymhd) || 0,
      history: [
        {
          id: uid(),
          tgl: today,
          tipe: "initial",
          nilai: parseFloat(form.anggaran_murni) || 0,
          keterangan: "Input awal murni",
          is_initial: true,
        },
        ...(parseFloat(form.anggaran_bymhd) > 0
          ? [
              {
                id: uid(),
                tgl: today,
                tipe: "bymhd",
                nilai: parseFloat(form.anggaran_bymhd) || 0,
                keterangan: "Input awal BYMHD",
                is_initial: false,
              },
            ]
          : []),
      ],
    };
    setList((prev) =>
      prev.map((c) =>
        c.id === item.id
          ? { ...c, anggaran_tahunan: [...(c.anggaran_tahunan || []), payload] }
          : c,
      ),
    );
    toast_(`Data ${lbl.toLowerCase()} tahunan ditambahkan.`);
    setShowForm(false);
    setForm(emptyForm);
  };

  const handleSavePerubahan = (rowId, newHistoryEntry, tipe, nilai) => {
    setList((prev) =>
      prev.map((c) => {
        if (c.id !== item.id) return c;
        return {
          ...c,
          anggaran_tahunan: (c.anggaran_tahunan || []).map((r) => {
            if (r.id !== rowId) return r;
            let newMurni = r.anggaran_murni;
            let newBymhd = r.anggaran_bymhd || 0;

            if (tipe === "pengurangan") {
              newMurni -= nilai;
            } else if (
              tipe === "penambahan" ||
              tipe === "bymhd" ||
              tipe === "transfer"
            ) {
              newBymhd += nilai; 
            }

            return {
              ...r,
              anggaran_murni: newMurni,
              anggaran_bymhd: newBymhd,
              history: [...(r.history || []), newHistoryEntry],
            };
          }),
        };
      }),
    );
    toast_(`Perubahan ${lbl.toLowerCase()} berhasil disimpan.`);
    setEditRow(null);
  };

  const handleDelete = (rowId) => {
    setConfirm({
      msg: `Hapus data ${lbl.toLowerCase()} tahunan ini?`,
      onConfirm: () => {
        setList((prev) =>
          prev.map((c) =>
            c.id === item.id
              ? {
                  ...c,
                  anggaran_tahunan: (c.anggaran_tahunan || []).filter(
                    (r) => r.id !== rowId,
                  ),
                }
              : c,
          ),
        );
        setConfirm(null);
        toast_(`Data ${lbl.toLowerCase()} tahunan dihapus.`);
      },
    });
  };

  const grandTotal = list.reduce(
    (a, r) => a + (r.anggaran_murni || 0) + (r.anggaran_bymhd || 0),
    0,
  );

  return (
    <div style={{ marginTop: "24px", background: "white", borderRadius: "12px", border: "1px solid #e2e8f0", overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
      {confirm && (
        <ConfirmDlg
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}
      {historyRow && (
        <HistoryPopup
          row={historyRow}
          title={title}
          onClose={() => setHistoryRow(null)}
          lbl={lbl}
        />
      )}

      {showForm && (
        <div style={OVS} onClick={() => setShowForm(false)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: "24px",
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <div>
                <h3 style={{ fontWeight: 600, fontSize: "1rem" }}>
                  Input {lbl} Tahunan
                </h3>
                <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  {title}
                </div>
              </div>
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "#64748b",
                }}
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label={`Tahun ${lbl}`} required>
                <select
                  style={INP}
                  value={form.thn}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, thn: e.target.value }))
                  }
                >
                  {yearOpts.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </Fld>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 12,
                }}
              >
                <Fld label={`${lbl} Murni (Rp)`} required>
                  <input
                    type="number"
                    style={INP}
                    placeholder="0"
                    value={form.anggaran_murni}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        anggaran_murni: e.target.value,
                      }))
                    }
                  />
                </Fld>
                <Fld label={`${lbl} BYMHD (Rp)`}>
                  <input
                    type="number"
                    style={INP}
                    placeholder="0"
                    value={form.anggaran_bymhd}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        anggaran_bymhd: e.target.value,
                      }))
                    }
                  />
                </Fld>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                gap: 10,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setShowForm(false)}>
                Batal
              </button>
              <button
                style={{
                  ...BTN,
                  background: "#16a34a",
                  opacity: form.anggaran_murni ? 1 : 0.5,
                }}
                disabled={!form.anggaran_murni}
                onClick={handleSaveNew}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER CARD DAFTAR ANGGARAN TAHUNAN */}
      <div
        style={{
          background: "#f8fafc",
          borderBottom: "1px solid #e2e8f0",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Calendar size={18} style={{ color: "#16a34a" }} />
          <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
            Daftar {lbl} Tahunan
          </span>
        </div>
        <button
          style={{
            ...BTN,
            background: "#16a34a",
            padding: "8px 14px",
            fontSize: "0.8rem",
          }}
          onClick={openAdd}
        >
          <Plus size={14} /> Input Data Baru
        </button>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ ...TABLE, border: "none", borderRadius: 0 }}>
          <thead>
            <tr>
              <th style={{ ...TH, width: 40, textAlign: "center" }}>NO</th>
              <th style={{ ...TH, width: 80, textAlign: "center" }}>TAHUN</th>
              <th style={{ ...TH, textAlign: "right" }}>{LBL} MURNI</th>
              <th style={{ ...TH, textAlign: "right" }}>{LBL} BYMHD</th>
              <th style={{ ...TH, textAlign: "right" }}>TOTAL {LBL}</th>
              <th style={{ ...TH, textAlign: "center", width: 100 }}>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {list.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    ...TD,
                    textAlign: "center",
                    color: "#94a3b8",
                    padding: "24px",
                  }}
                >
                  Belum ada data {lbl.toLowerCase()} tahunan.
                </td>
              </tr>
            ) : (
              list.map((row, idx) => {
                const total =
                  (row.anggaran_murni || 0) + (row.anggaran_bymhd || 0);
                return (
                  <tr key={row.id}>
                    <td style={{ ...TD, textAlign: "center" }}>{idx + 1}</td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "center",
                        fontWeight: 700,
                        color: "#0f172a",
                      }}
                    >
                      {row.thn}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                        color: "#475569",
                        fontWeight: 600,
                      }}
                    >
                      {fmt(row.anggaran_murni)}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                        color: "#d97706",
                        fontWeight: 600,
                      }}
                    >
                      {fmt(row.anggaran_bymhd)}
                    </td>
                    <td
                      style={{
                        ...TD,
                        textAlign: "right",
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 700,
                        color: "#16a34a",
                      }}
                    >
                      {fmt(total)}
                    </td>
                    <td style={{ ...TD, textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          gap: 6,
                          justifyContent: "center",
                        }}
                      >
                        <button
                          style={ABTN}
                          title="Edit"
                          onClick={() => setEditRow({ ...row })}
                        >
                          <Edit size={14} style={{ color: "#d97706" }} />
                        </button>
                        <button
                          style={ABTN}
                          title="Riwayat"
                          onClick={() => setHistoryRow({ ...row })}
                        >
                          <History size={14} style={{ color: "#2563eb" }} />
                        </button>
                        <button
                          style={ABTN}
                          title="Hapus"
                          onClick={() => handleDelete(row.id)}
                        >
                          <Trash2 size={14} style={{ color: "#ef4444" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
          {list.length > 0 && (
            <tfoot>
              <tr style={{ background: "#f0fdf4" }}>
                <td
                  colSpan={4}
                  style={{
                    ...TD,
                    textAlign: "right",
                    fontWeight: 700,
                    color: "#16a34a",
                  }}
                >
                  GRAND TOTAL SELURUH TAHUN
                </td>
                <td
                  style={{
                    ...TD,
                    textAlign: "right",
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 700,
                    color: "#16a34a",
                    fontSize: "0.95rem",
                  }}
                >
                  {fmt(grandTotal)}
                </td>
                <td style={TD} />
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      <div style={{padding: "0 24px"}}>
        {editRow && (
          <EditAnggaranPage
            row={editRow}
            title={title}
            onBack={() => setEditRow(null)}
            onSave={handleSavePerubahan}
            lbl={lbl}
          />
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// OPEX MODULE
// ═══════════════════════════════════════════════════════════════
function OpexModule({ opexList, setOpexList }) {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  
  // States untuk pemilihan Master
  const [masterMode, setMasterMode] = useState("existing");
  const [selKd, setSelKd] = useState("");
  const [newMaster, setNewMaster] = useState({ kd: "", nm: "" });

  // States untuk pemilihan Sub-Anggaran / Realisasi
  const [anggaranMode, setAnggaranMode] = useState("existing");
  const [selAnggaranId, setSelAnggaranId] = useState("");
  
  // STATE BARU: Disesuaikan dengan kebutuhan Invoice
  const [newAnggaran, setNewAnggaran] = useState({ 
    no_invoice: "", 
    nm: "", 
    tanggal: "", 
    lampiran: null, 
    nilai: "" 
  });

  const [activeOpexId, setActiveOpexId] = useState(null);
  const [editMasterModal, setEditMasterModal] = useState(false);
  const [editMasterForm, setEditMasterForm] = useState({ kd: "", nm: "" });

  const [opexMasters, setOpexMasters] = useState(
    MASTER_LIST.filter((m) => m.tipe === "OPEX"),
  );
  const [editDropItem, setEditDropItem] = useState(null);

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const isMasterResolved = masterMode === "existing" ? !!selKd : !!(newMaster.kd && newMaster.nm);
  const activeMasterKd = masterMode === "existing" ? selKd : newMaster.kd;
  const availableOpex = opexList.filter((c) => c.kd_master === activeMasterKd);
  
  // Validasi tombol "Lanjut" diperbarui untuk field yang baru
  const isAnggaranResolved = anggaranMode === "existing" 
    ? !!selAnggaranId 
    : !!(newAnggaran.nm && newAnggaran.no_invoice && newAnggaran.tanggal && newAnggaran.nilai);
    
  const canNextToStep1 = isMasterResolved && isAnggaranResolved;

  useEffect(() => {
    if (isMasterResolved && masterMode === 'existing' && availableOpex.length === 0) {
        setAnggaranMode('new');
    }
  }, [isMasterResolved, masterMode, activeMasterKd, availableOpex.length]);

  const handleLanjutToStep1 = () => {
    const nmMaster = masterMode === "existing" ? opexMasters.find((m) => m.kd === selKd)?.nm : newMaster.nm;
    const kdMaster = activeMasterKd;

    if (masterMode === "new") {
      if (!opexMasters.find(m => m.kd === newMaster.kd)) {
        setOpexMasters((p) => [...p, { kd: newMaster.kd, nm: newMaster.nm, tipe: "OPEX" }]);
      }
    }

    if (anggaranMode === "new") {
      const targetId = uid();
      const nilaiAwal = parseFloat(newAnggaran.nilai) || 0;
      
      const initialHistory = nilaiAwal > 0 ? [{
        id: uid(),
        tgl: newAnggaran.tanggal || new Date().toISOString().split("T")[0],
        tipe: "initial",
        nilai: nilaiAwal,
        keterangan: `Realisasi Invoice: ${newAnggaran.no_invoice}`,
        is_initial: true,
      }] : [];

      // Ekstrak tahun dari input tanggal
      const thnRealisasi = newAnggaran.tanggal ? parseInt(newAnggaran.tanggal.split("-")[0]) : new Date().getFullYear();

      const newItem = {
        id: targetId,
        kd_master: kdMaster,
        nm_master: nmMaster,
        nm_anggaran: newAnggaran.nm,
        kd_anggaran: newAnggaran.no_invoice, // Gunakan no_invoice sebagai kode identifikasi
        no_invoice: newAnggaran.no_invoice,
        tanggal: newAnggaran.tanggal,
        lampiran: newAnggaran.lampiran ? newAnggaran.lampiran.name : null,
        anggaran_tahunan: [
          {
            id: uid(),
            thn: thnRealisasi,
            anggaran_murni: nilaiAwal,
            anggaran_bymhd: 0,
            history: initialHistory
          }
        ],
      };
      setOpexList((p) => [...p, newItem]);
      setActiveOpexId(targetId);
      setSelAnggaranId(targetId);
      
      // Reset form
      setNewAnggaran({ no_invoice: "", nm: "", tanggal: "", lampiran: null, nilai: "" });
    } else {
      setActiveOpexId(selAnggaranId);
    }
    setStep(1);
  };

  const saveEditMaster = () => {
    setOpexList((p) =>
      p.map((o) =>
        o.id === activeOpexId
          ? { ...o, kd_master: editMasterForm.kd, nm_master: editMasterForm.nm }
          : o,
      ),
    );
    setOpexMasters((p) =>
      p.map((m) =>
        m.kd === activeItem.kd_master
          ? { ...m, kd: editMasterForm.kd, nm: editMasterForm.nm }
          : m,
      ),
    );
    setEditMasterModal(false);
    toast_("Info master berhasil diperbarui.");
  };

  const saveEditDrop = () => {
    setOpexMasters((p) =>
      p.map((m) =>
        m.kd === editDropItem.oldKd
          ? { ...m, kd: editDropItem.kd, nm: editDropItem.nm }
          : m,
      ),
    );
    setOpexList((p) =>
      p.map((x) =>
        x.kd_master === editDropItem.oldKd
          ? { ...x, kd_master: editDropItem.kd, nm_master: editDropItem.nm }
          : x,
      ),
    );
    if (selKd === editDropItem.oldKd) setSelKd(editDropItem.kd);
    setEditDropItem(null);
    toast_("Pilihan master berhasil diperbarui.");
  };

  const reset = () => {
    setStep(0);
    setMasterMode("existing");
    setSelKd("");
    setNewMaster({ kd: "", nm: "" });
    setAnggaranMode("existing");
    setSelAnggaranId("");
    setNewAnggaran({ no_invoice: "", nm: "", tanggal: "", lampiran: null, nilai: "" });
  };

  const activeItem = opexList.find((o) => o.id === activeOpexId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <Toast msg={toast} color="#16a34a" />}
      {confirm && (
        <ConfirmDlg
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {editDropItem && (
        <div style={OVS} onClick={() => setEditDropItem(null)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: "24px",
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 600, marginBottom: 20 }}>
              Edit Pilihan Master Dropdown
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Realisasi Master">
                <input
                  style={INP}
                  value={editDropItem.nm}
                  onChange={(e) =>
                    setEditDropItem((t) => ({ ...t, nm: e.target.value }))
                  }
                />
              </Fld>
              <Fld label="Kode Realisasi Master">
                <input
                  style={INP}
                  value={editDropItem.kd}
                  onChange={(e) =>
                    setEditDropItem((t) => ({ ...t, kd: e.target.value }))
                  }
                />
              </Fld>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setEditDropItem(null)}>
                Batal
              </button>
              <button
                style={{ ...BTN, background: "#16a34a" }}
                onClick={saveEditDrop}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <Stepper
        steps={["Pilih Master & Realisasi", "Detail Realisasi", "Daftar Keseluruhan"]}
        current={step}
        color="#16a34a"
      />

      {step === 0 && (
        <>
          <Card>
            <CardHdr
              icon={<Database />}
              title="Anggaran Master OPEX"
              color="#16a34a"
            />
            <div
              style={{
                display: "flex",
                background: "#f1f5f9",
                borderRadius: 8,
                padding: 4,
                gap: 4,
                marginBottom: 20,
              }}
            >
              {[
                ["existing", <Search size={14} />, "Pilih Master Tersimpan"],
                ["new", <Plus size={14} />, "Tambah Master Baru"],
              ].map(([v, ic, lbl]) => (
                <button
                  key={v}
                  style={{
                    ...TOGGLE,
                    flex: 1,
                    justifyContent: "center",
                    ...(masterMode === v
                      ? {
                          background: "white",
                          color: "#16a34a",
                          boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                        }
                      : {}),
                  }}
                  onClick={() => {
                    setMasterMode(v);
                    setSelKd("");
                  }}
                >
                  {ic} {lbl}
                </button>
              ))}
            </div>
            {masterMode === "existing" && (
              <Fld label="Nama Anggaran Master" required>
                <MasterDrop
                  options={opexMasters}
                  value={selKd}
                  onChange={(kd) => setSelKd(kd)}
                  placeholder="Cari & pilih anggaran master…"
                  onEditDrop={(o) =>
                    setEditDropItem({ oldKd: o.kd, kd: o.kd, nm: o.nm })
                  }
                  onDeleteDrop={(o) => {
                    setConfirm({
                      msg: `Hapus opsi "${o.nm}" dari daftar pilihan?`,
                      onConfirm: () => {
                        setOpexMasters((p) => p.filter((m) => m.kd !== o.kd));
                        if (selKd === o.kd) setSelKd("");
                        setConfirm(null);
                        toast_("Opsi berhasil dihapus.");
                      },
                    });
                  }}
                />
              </Fld>
            )}
            {masterMode === "new" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Fld label="Nama Realisasi Master" required>
                  <input
                    style={INP}
                    value={newMaster.nm}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, nm: e.target.value }))
                    }
                  />
                </Fld>
                <Fld label="Kode Realisasi Master" required>
                  <input
                    style={INP}
                    value={newMaster.kd}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, kd: e.target.value }))
                    }
                  />
                </Fld>
              </div>
            )}
          </Card>

          {isMasterResolved && (
            <Card style={{ marginTop: 16 }}>
              <CardHdr icon={<Layers />} title="Pilih / Input Realisasi OPEX" color="#16a34a" />
              <div
                style={{
                  display: "flex",
                  background: "#f1f5f9",
                  borderRadius: 8,
                  padding: 4,
                  gap: 4,
                  marginBottom: 20,
                }}
              >
                <button
                  style={{
                    ...TOGGLE,
                    flex: 1,
                    justifyContent: "center",
                    ...(anggaranMode === "existing"
                      ? { background: "white", color: "#16a34a", boxShadow: "0 1px 2px rgba(0,0,0,.05)" }
                      : {}),
                  }}
                  onClick={() => setAnggaranMode("existing")}
                >
                  Pilih Realisasi Tersimpan
                </button>
                <button
                  style={{
                    ...TOGGLE,
                    flex: 1,
                    justifyContent: "center",
                    ...(anggaranMode === "new"
                      ? { background: "white", color: "#16a34a", boxShadow: "0 1px 2px rgba(0,0,0,.05)" }
                      : {}),
                  }}
                  onClick={() => setAnggaranMode("new")}
                >
                  Tambah Realisasi Baru
                </button>
              </div>

              {anggaranMode === "existing" && (
                <Fld label="PILIH REALISASI" required>
                  {availableOpex.length > 0 ? (
                    <select
                      style={INP}
                      value={selAnggaranId}
                      onChange={(e) => setSelAnggaranId(e.target.value)}
                    >
                      <option value="">-- Pilih Realisasi --</option>
                      {availableOpex.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nm_anggaran || c.nm_master} {c.no_invoice ? `(Inv: ${c.no_invoice})` : ''}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div style={{ fontSize: "0.8rem", color: "#ef4444", background: "#fef2f2", padding: 12, borderRadius: 6 }}>
                      Belum ada realisasi untuk master ini. Silakan pilih "Tambah Realisasi Baru".
                    </div>
                  )}
                </Fld>
              )}

              {/* FORM TAMBAH REALISASI BARU */}
              {anggaranMode === "new" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Fld label="Nomor Invoice" required>
                    <input
                      style={INP}
                      placeholder="Contoh: INV/2024/001"
                      value={newAnggaran.no_invoice}
                      onChange={(e) => setNewAnggaran((f) => ({ ...f, no_invoice: e.target.value }))}
                    />
                  </Fld>
                  <Fld label="Keterangan Realisasi" required>
                    <input
                      style={INP}
                      placeholder="Contoh: Pembayaran Langganan Software"
                      value={newAnggaran.nm}
                      onChange={(e) => setNewAnggaran((f) => ({ ...f, nm: e.target.value }))}
                    />
                  </Fld>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Fld label="Tanggal Realisasi" required>
                      <input
                        type="date"
                        style={INP}
                        value={newAnggaran.tanggal}
                        onChange={(e) => setNewAnggaran((f) => ({ ...f, tanggal: e.target.value }))}
                      />
                    </Fld>
                    <Fld label="Lampiran Dokumen">
                      <input
                        type="file"
                        style={{ ...INP, padding: "7px 14px" }}
                        onChange={(e) => setNewAnggaran((f) => ({ ...f, lampiran: e.target.files ? e.target.files[0] : null }))}
                      />
                    </Fld>
                  </div>

                  <Fld label="Jumlah / Harga (Rp)" required>
                    <input
                      type="number"
                      style={INP}
                      placeholder="0"
                      value={newAnggaran.nilai}
                      onChange={(e) => setNewAnggaran((f) => ({ ...f, nilai: e.target.value }))}
                    />
                    {parseFloat(newAnggaran.nilai) > 0 && (
                      <div style={{ marginTop: 4, fontSize: "0.8rem", color: "#64748b" }}>
                        ≈ Rp {fmt(newAnggaran.nilai)}
                      </div>
                    )}
                  </Fld>
                </div>
              )}
            </Card>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button
              style={{ ...BTN, background: "#16a34a", opacity: canNextToStep1 ? 1 : 0.5 }}
              disabled={!canNextToStep1}
              onClick={handleLanjutToStep1}
            >
              Lanjut ke Detail <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}

      {step === 1 && activeItem && (
        <>
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              padding: "20px 24px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 600, color: "#1e293b", marginBottom: 8 }}>
                  {activeItem.nm_anggaran || activeItem.nm_master}
                </h3>
                <div style={{ display: "flex", gap: 16, fontSize: "0.85rem", color: "#64748b" }}>
                  <span>Master: {activeItem.nm_master}</span>
                  {activeItem.no_invoice && <span>Invoice: {activeItem.no_invoice}</span>}
                  {activeItem.tanggal && <span>Tanggal: {fmtDate(activeItem.tanggal)}</span>}
                  {activeItem.lampiran && <span>Lampiran: {activeItem.lampiran}</span>}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <button
                  style={{ ...BTNOUT, padding: "6px 12px", fontSize: "0.75rem" }}
                  onClick={() => {
                    setEditMasterForm({
                      kd: activeItem.kd_master,
                      nm: activeItem.nm_master,
                    });
                    setEditMasterModal(true);
                  }}
                >
                  <Edit size={12} style={{ color: "#d97706" }} /> Edit Info Master
                </button>
              </div>
            </div>
          </div>

          <AnggaranTahunanSection
            item={activeItem}
            setList={setOpexList}
            title={activeItem.nm_anggaran || activeItem.nm_master}
            toast_={toast_}
            lbl="Realisasi"
          />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "24px"
            }}
          >
            <button style={BTNOUT} onClick={() => setStep(0)}>
              <ArrowLeft size={16} /> Kembali
            </button>
            <button
              style={{ ...BTN, background: "#16a34a" }}
              onClick={() => setStep(2)}
            >
              <Save size={16} /> Selesai & Lihat Daftar
            </button>
          </div>
        </>
      )}

      {editMasterModal && (
        <div style={OVS} onClick={() => setEditMasterModal(false)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: "24px",
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 600, marginBottom: 20 }}>
              Edit Realisasi Master
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Realisasi Master">
                <input
                  style={INP}
                  value={editMasterForm.nm}
                  onChange={(e) =>
                    setEditMasterForm((t) => ({ ...t, nm: e.target.value }))
                  }
                />
              </Fld>
              <Fld label="Kode Realisasi Master">
                <input
                  style={INP}
                  value={editMasterForm.kd}
                  onChange={(e) =>
                    setEditMasterForm((t) => ({ ...t, kd: e.target.value }))
                  }
                />
              </Fld>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setEditMasterModal(false)}>
                Batal
              </button>
              <button
                style={{ ...BTN, background: "#16a34a" }}
                onClick={saveEditMaster}
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <h2 style={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Daftar Keseluruhan OPEX
            </h2>
            <button
              style={{ ...BTN, background: "#16a34a" }}
              onClick={reset}
            >
              <Plus size={16} /> Kelola Realisasi Lainnya
            </button>
          </div>

          <Card style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ ...TABLE, border: "none" }}>
                <thead>
                  <tr>
                    <th style={{ ...TH, width: 40, textAlign: "center" }}>
                      No
                    </th>
                    <th style={TH}>Realisasi & Invoice</th>
                    <th style={TH}>Kode Master</th>
                    <th style={{ ...TH, textAlign: "right" }}>
                      Total Akumulasi
                    </th>
                    <th style={{ ...TH, textAlign: "center", width: 100 }}>
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {opexList.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        style={{ ...TD, textAlign: "center", color: "#94a3b8" }}
                      >
                        Belum ada data realisasi OPEX.
                      </td>
                    </tr>
                  ) : (
                    opexList.map((row, i) => {
                      const totalOpex =
                        row.anggaran_tahunan?.reduce(
                          (acc, r) =>
                            acc +
                            (r.anggaran_murni || 0) +
                            (r.anggaran_bymhd || 0),
                          0,
                        ) || 0;
                      return (
                        <tr key={row.id}>
                          <td style={{ ...TD, textAlign: "center" }}>
                            {i + 1}
                          </td>
                          <td style={{ ...TD, fontWeight: 500 }}>
                            <div style={{color: "#1e293b", marginBottom: 4}}>{row.nm_anggaran || row.nm_master}</div>
                            <div style={{fontSize: "0.75rem", color: "#64748b", fontWeight: 400}}>
                              {row.no_invoice ? `Inv: ${row.no_invoice}` : "-"}
                            </div>
                          </td>
                          <td
                            style={{
                              ...TD,
                              color: "#64748b",
                              fontVariantNumeric: "tabular-nums",
                            }}
                          >
                            <div style={{marginBottom: 4}}>{row.kd_master}</div>
                          </td>
                          <td
                            style={{
                              ...TD,
                              textAlign: "right",
                              fontVariantNumeric: "tabular-nums",
                              color: "#16a34a",
                              fontWeight: 600,
                            }}
                          >
                            Rp {fmt(totalOpex)}
                          </td>
                          <td style={{ ...TD, textAlign: "center" }}>
                            <div
                              style={{
                                display: "flex",
                                gap: 6,
                                justifyContent: "center",
                              }}
                            >
                              <button
                                style={ABTN}
                                title="Lihat/Edit Detail"
                                onClick={() => {
                                  setActiveOpexId(row.id);
                                  setStep(1);
                                }}
                              >
                                <Edit size={14} style={{ color: "#d97706" }} />
                              </button>
                              <button
                                style={ABTN}
                                title="Hapus Realisasi"
                                onClick={() => {
                                  setConfirm({
                                    msg: "Hapus seluruh data Realisasi ini beserta rinciannya?",
                                    onConfirm: () => {
                                      setOpexList((p) =>
                                        p.filter((o) => o.id !== row.id),
                                      );
                                      setConfirm(null);
                                    },
                                  });
                                }}
                              >
                                <Trash2
                                  size={14}
                                  style={{ color: "#ef4444" }}
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// CAPEX MODULE
// ═══════════════════════════════════════════════════════════════
function CapexModule({ capexList, setCapexList }) {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const [masterMode, setMasterMode] = useState("existing");
  const [selKd, setSelKd] = useState("");
  const [newMaster, setNewMaster] = useState({ kd: "", nm: "" });

  const [anggaranMode, setAnggaranMode] = useState("existing");
  const [selAnggaranId, setSelAnggaranId] = useState("");

  const [capexMasters, setCapexMasters] = useState(
    MASTER_LIST.filter((m) => m.tipe === "CAPEX"),
  );
  const [editDropItem, setEditDropItem] = useState(null);

  const emptyNewAnggaran = {
    nm: "",
    kd_capex: "",
    thn_rkap_awal: new Date().getFullYear() - 1, // P-1
    thn_rkap_akhir: new Date().getFullYear() - 1, // P-1
    thn_anggaran: new Date().getFullYear() - 1, // P-1
    nilai_kad: "",
    nilai_rkap: "",
  };
  const [newAnggaran, setNewAnggaran] = useState(emptyNewAnggaran);
  const [editTarget, setEditTarget] = useState(null);

  const [showPkj, setShowPkj] = useState(false);
  const [pkjCapexId, setPkjCapexId] = useState(null);
  const [pkjEditId, setPkjEditId] = useState(null);
  const emptyPkj = {
    nm: "",
    nilai_rab: "",
    nilai_kontrak: "",
    no_pr: "",
    no_po: "",
    no_kontrak: "",
    tgl_kontrak: "",
    durasi_kontrak: "",
    no_sp3: "",
    tgl_sp3: "",
    tgl_bamk: "",
    keterangan: "",
  };
  const [pkjForm, setPkjForm] = useState(emptyPkj);
  const [viewDetail, setViewDetail] = useState(null);

  const isMasterResolved = masterMode === "existing" ? !!selKd : !!(newMaster.kd && newMaster.nm);
  const activeMasterKd = masterMode === "existing" ? selKd : newMaster.kd;
  const availableCapex = capexList.filter((c) => c.kd_master === activeMasterKd);
  
  const isAnggaranResolved = anggaranMode === "existing" ? !!selAnggaranId : !!(newAnggaran.nm && newAnggaran.kd_capex && newAnggaran.thn_anggaran);
  const canNextToStep1 = isMasterResolved && isAnggaranResolved;

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    if (isMasterResolved && masterMode === 'existing' && availableCapex.length === 0) {
        setAnggaranMode('new');
    }
  }, [isMasterResolved, masterMode, activeMasterKd, availableCapex.length]);

  const handleLanjutToStep1 = () => {
    if (masterMode === "new") {
      if (!capexMasters.find(m => m.kd === newMaster.kd)) {
        setCapexMasters((p) => [...p, { kd: newMaster.kd, nm: newMaster.nm, tipe: "CAPEX" }]);
      }
    }

    if (anggaranMode === "new") {
      const nmMaster = masterMode === "existing" ? capexMasters.find((m) => m.kd === selKd)?.nm : newMaster.nm;
      const kdMaster = activeMasterKd;
      
      const targetId = uid();
      const newItem = {
        id: targetId,
        kd_master: kdMaster,
        nm_master: nmMaster,
        nm_anggaran: newAnggaran.nm,
        kd_capex: newAnggaran.kd_capex,
        thn_rkap_awal: parseInt(newAnggaran.thn_rkap_awal),
        thn_rkap_akhir: parseInt(newAnggaran.thn_rkap_akhir),
        thn_anggaran: parseInt(newAnggaran.thn_anggaran),
        nilai_kad: parseFloat(newAnggaran.nilai_kad) || 0,
        nilai_rkap: parseFloat(newAnggaran.nilai_rkap) || 0,
        anggaran_tahunan: [],
        pekerjaan: [],
      };
      setCapexList((p) => [...p, newItem]);
      setSelAnggaranId(targetId);
      setNewAnggaran(emptyNewAnggaran);
      setAnggaranMode("existing");
      toast_("Data CAPEX ditambahkan.");
    } 
    setStep(1);
  };

  const saveEditCapex = () => {
    if (!editTarget) return;
    setCapexList((p) =>
      p.map((c) =>
        c.id === editTarget.id
          ? {
              ...c,
              nm_anggaran: editTarget.nm_anggaran,
              kd_capex: editTarget.kd_capex,
              thn_rkap_awal: parseInt(editTarget.thn_rkap_awal),
              thn_rkap_akhir: parseInt(editTarget.thn_rkap_akhir),
              thn_anggaran: parseInt(editTarget.thn_anggaran),
              nilai_kad: parseFloat(editTarget.nilai_kad) || 0,
              nilai_rkap: parseFloat(editTarget.nilai_rkap) || 0,
            }
          : c,
      ),
    );
    setEditTarget(null);
    toast_("Perubahan disimpan.");
  };

  const saveEditDrop = () => {
    setCapexMasters((p) =>
      p.map((m) =>
        m.kd === editDropItem.oldKd
          ? { ...m, kd: editDropItem.kd, nm: editDropItem.nm }
          : m,
      ),
    );
    setCapexList((p) =>
      p.map((x) =>
        x.kd_master === editDropItem.oldKd
          ? { ...x, kd_master: editDropItem.kd, nm_master: editDropItem.nm }
          : x,
      ),
    );
    if (selKd === editDropItem.oldKd) setSelKd(editDropItem.kd);
    setEditDropItem(null);
    toast_("Pilihan master berhasil diperbarui.");
  };

  const openAddPkj = (capexId) => {
    setPkjCapexId(capexId);
    setPkjForm(emptyPkj);
    setPkjEditId(null);
    setShowPkj(true);
  };
  const openEditPkj = (capexId, pkj) => {
    setPkjCapexId(capexId);
    setPkjForm({ ...pkj });
    setPkjEditId(pkj.id);
    setShowPkj(true);
  };

  const handleSavePkj = () => {
    const payload = {
      ...pkjForm,
      nilai_rab: parseFloat(pkjForm.nilai_rab) || 0,
      nilai_kontrak: parseFloat(pkjForm.nilai_kontrak) || 0,
      durasi_kontrak: parseInt(pkjForm.durasi_kontrak) || 0,
    };
    if (pkjEditId) {
      setCapexList((p) =>
        p.map((c) =>
          c.id === pkjCapexId
            ? {
                ...c,
                pekerjaan: c.pekerjaan.map((pk) =>
                  pk.id === pkjEditId ? { ...pk, ...payload } : pk,
                ),
              }
            : c,
        ),
      );
      toast_("Pekerjaan diperbarui.");
    } else {
      setCapexList((p) =>
        p.map((c) =>
          c.id === pkjCapexId
            ? {
                ...c,
                pekerjaan: [...(c.pekerjaan || []), { id: uid(), ...payload }],
              }
            : c,
        ),
      );
      toast_("Pekerjaan ditambahkan.");
    }
    setShowPkj(false);
  };

  const reset = () => {
    setStep(0);
    setMasterMode("existing");
    setSelKd("");
    setNewMaster({ kd: "", nm: "" });
    setAnggaranMode("existing");
    setSelAnggaranId("");
    setNewAnggaran(emptyNewAnggaran);
  };

  if (viewDetail) {
    const { cap, pkj } = viewDetail;
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button style={BTNOUT} onClick={() => setViewDetail(null)}>
            <ArrowLeft size={16} /> Kembali
          </button>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 600 }}>
            Detail Pekerjaan
          </h2>
        </div>
        <Card>
          <div
            style={{
              marginBottom: 24,
              paddingBottom: 16,
              borderBottom: "1px dashed #e2e8f0",
            }}
          >
            <h3
              style={{
                fontSize: "1.2rem",
                fontWeight: 600,
                color: "#1e293b",
                marginBottom: 8,
              }}
            >
              {pkj.nm}
            </h3>
            <p style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Anggaran: {cap.nm_anggaran}
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}
          >
            {[
              {
                title: "Finansial",
                icon: <Database size={16} />,
                items: [
                  ["RAB", `Rp ${fmt(pkj.nilai_rab)}`],
                  ["Kontrak", `Rp ${fmt(pkj.nilai_kontrak)}`],
                ],
              },
              {
                title: "Dokumen",
                icon: <FileText size={16} />,
                items: [
                  ["PR", pkj.no_pr || "-"],
                  ["PO", pkj.no_po || "-"],
                  ["Kontrak", pkj.no_kontrak || "-"],
                  ["SP3", pkj.no_sp3 || "-"],
                ],
              },
              {
                title: "Waktu",
                icon: <Clock size={16} />,
                items: [
                  ["Tgl. Kontrak", fmtDate(pkj.tgl_kontrak) || "-"],
                  [
                    "Durasi",
                    pkj.durasi_kontrak ? `${pkj.durasi_kontrak} hari` : "-",
                  ],
                  ["Tgl. SP3", fmtDate(pkj.tgl_sp3) || "-"],
                  ["Tgl. BAMK", fmtDate(pkj.tgl_bamk) || "-"],
                ],
              },
            ].map((sec) => (
              <div
                key={sec.title}
                style={{ background: "#f8fafc", padding: 16, borderRadius: 8 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 16,
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  {sec.icon} {sec.title}
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 12 }}
                >
                  {sec.items.map(([lbl, val]) => (
                    <div
                      key={lbl}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #e2e8f0",
                        paddingBottom: 4,
                      }}
                    >
                      <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
                        {lbl}
                      </span>
                      <span
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          color: "#1e293b",
                        }}
                      >
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  }

  const activeCapex = capexList.find((c) => c.id === selAnggaranId);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {toast && <Toast msg={toast} color="#2563eb" />}
      {confirm && (
        <ConfirmDlg
          msg={confirm.msg}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {editDropItem && (
        <div style={OVS} onClick={() => setEditDropItem(null)}>
          <div
            style={{
              background: "white",
              borderRadius: 12,
              padding: "24px",
              maxWidth: 420,
              width: "100%",
              boxShadow: "0 10px 25px rgba(0,0,0,.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ fontWeight: 600, marginBottom: 20 }}>
              Edit Pilihan Master Dropdown
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Anggaran Master">
                <input
                  style={INP}
                  value={editDropItem.nm}
                  onChange={(e) =>
                    setEditDropItem((t) => ({ ...t, nm: e.target.value }))
                  }
                />
              </Fld>
              <Fld label="Kode Anggaran Master">
                <input
                  style={INP}
                  value={editDropItem.kd}
                  onChange={(e) =>
                    setEditDropItem((t) => ({ ...t, kd: e.target.value }))
                  }
                />
              </Fld>
            </div>
            <div
              style={{
                display: "flex",
                gap: 12,
                marginTop: 24,
                justifyContent: "flex-end",
              }}
            >
              <button style={BTNOUT} onClick={() => setEditDropItem(null)}>
                Batal
              </button>
              <button
                style={{ ...BTN, background: "#2563eb" }}
                onClick={saveEditDrop}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      <Stepper
        steps={["Pilih Master & Anggaran", "Daftar & Kelola CAPEX"]}
        current={step}
        color="#2563eb"
      />

      {step === 0 && (
        <>
          <Card>
            <CardHdr
              icon={<Database />}
              title="Anggaran Master CAPEX"
              color="#2563eb"
            />
            <div
              style={{
                display: "flex",
                background: "#f1f5f9",
                borderRadius: 8,
                padding: 4,
                gap: 4,
                marginBottom: 20,
              }}
            >
              {[
                ["existing", <Search size={14} />, "Pilih Master Tersimpan"],
                ["new", <Plus size={14} />, "Tambah Master Baru"],
              ].map(([v, ic, lbl]) => (
                <button
                  key={v}
                  style={{
                    ...TOGGLE,
                    flex: 1,
                    justifyContent: "center",
                    ...(masterMode === v
                      ? {
                          background: "white",
                          color: "#2563eb",
                          boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                        }
                      : {}),
                  }}
                  onClick={() => {
                    setMasterMode(v);
                    setSelKd("");
                  }}
                >
                  {ic} {lbl}
                </button>
              ))}
            </div>
            {masterMode === "existing" && (
              <Fld label="Nama Anggaran Master" required>
                <MasterDrop
                  options={capexMasters}
                  value={selKd}
                  onChange={(kd) => setSelKd(kd)}
                  onEditDrop={(o) =>
                    setEditDropItem({ oldKd: o.kd, kd: o.kd, nm: o.nm })
                  }
                  onDeleteDrop={(o) => {
                    setConfirm({
                      msg: `Hapus opsi "${o.nm}" dari daftar pilihan?`,
                      onConfirm: () => {
                        setCapexMasters((p) => p.filter((m) => m.kd !== o.kd));
                        if (selKd === o.kd) setSelKd("");
                        setConfirm(null);
                        toast_("Opsi berhasil dihapus.");
                      },
                    });
                  }}
                />
              </Fld>
            )}
            {masterMode === "new" && (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <Fld label="Nama Anggaran Master" required>
                  <input
                    style={INP}
                    value={newMaster.nm}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, nm: e.target.value }))
                    }
                  />
                </Fld>
                <Fld label="Kode Anggaran Master" required>
                  <input
                    style={INP}
                    value={newMaster.kd}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, kd: e.target.value }))
                    }
                  />
                </Fld>
              </div>
            )}
          </Card>

          {isMasterResolved && (
            <Card style={{ marginTop: 16 }}>
              <CardHdr icon={<Layers />} title="Pilih / Buat Anggaran CAPEX" color="#2563eb" />
              <div
                style={{
                  display: "flex",
                  background: "#f1f5f9",
                  borderRadius: 8,
                  padding: 4,
                  gap: 4,
                  marginBottom: 20,
                }}
              >
                <button
                  style={{
                    ...TOGGLE,
                    flex: 1,
                    justifyContent: "center",
                    ...(anggaranMode === "existing"
                      ? { background: "white", color: "#2563eb", boxShadow: "0 1px 2px rgba(0,0,0,.05)" }
                      : {}),
                  }}
                  onClick={() => setAnggaranMode("existing")}
                >
                  Pilih Anggaran Tersimpan
                </button>
                <button
                  style={{
                    ...TOGGLE,
                    flex: 1,
                    justifyContent: "center",
                    ...(anggaranMode === "new"
                      ? { background: "white", color: "#2563eb", boxShadow: "0 1px 2px rgba(0,0,0,.05)" }
                      : {}),
                  }}
                  onClick={() => setAnggaranMode("new")}
                >
                  Tambah Anggaran Baru
                </button>
              </div>

              {anggaranMode === "existing" && (
                <>
                  <Fld label="Pilih Anggaran" required>
                    {availableCapex.length > 0 ? (
                      <select
                        style={INP}
                        value={selAnggaranId}
                        onChange={(e) => setSelAnggaranId(e.target.value)}
                      >
                        <option value="">-- Pilih Anggaran --</option>
                        {availableCapex.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.nm_anggaran} {c.kd_capex ? `(${c.kd_capex})` : ''}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <div style={{ fontSize: "0.8rem", color: "#ef4444", background: "#fef2f2", padding: 12, borderRadius: 6 }}>
                        Belum ada anggaran untuk master ini. Silakan pilih "Tambah Anggaran Baru".
                      </div>
                    )}
                  </Fld>
                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
                    <button
                      style={{ ...BTN, background: "#2563eb", opacity: selAnggaranId ? 1 : 0.5 }}
                      disabled={!selAnggaranId}
                      onClick={() => {
                        if (masterMode === "new") {
                          if (!capexMasters.find((m) => m.kd === newMaster.kd)) {
                            setCapexMasters((p) => [...p, { kd: newMaster.kd, nm: newMaster.nm, tipe: "CAPEX" }]);
                          }
                        }
                        setStep(1);
                      }}
                    >
                      Lanjut Kelola Daftar <ChevronRight size={16} />
                    </button>
                  </div>
                </>
              )}

              {anggaranMode === "new" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <Fld label="NAMA ANGGARAN CAPEX" required>
                    <input
                      style={INP}
                      value={newAnggaran.nm}
                      onChange={(e) => setNewAnggaran((f) => ({ ...f, nm: e.target.value }))}
                    />
                  </Fld>
                  <Fld label="KODE CAPEX">
                    <input
                      style={INP}
                      value={newAnggaran.kd_capex}
                      onChange={(e) => setNewAnggaran((f) => ({ ...f, kd_capex: e.target.value }))}
                    />
                  </Fld>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                    <Fld label="THN RKAP AWAL">
                      <select
                        style={INP}
                        value={newAnggaran.thn_rkap_awal}
                        onChange={(e) => setNewAnggaran((f) => ({ ...f, thn_rkap_awal: e.target.value }))}
                      >
                        {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </Fld>
                    <Fld label="THN RKAP AKHIR">
                      <select
                        style={INP}
                        value={newAnggaran.thn_rkap_akhir}
                        onChange={(e) => setNewAnggaran((f) => ({ ...f, thn_rkap_akhir: e.target.value }))}
                      >
                        {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </Fld>
                    <Fld label="THN ANGGARAN" required>
                      <select
                        style={INP}
                        value={newAnggaran.thn_anggaran}
                        onChange={(e) => setNewAnggaran((f) => ({ ...f, thn_anggaran: e.target.value }))}
                      >
                        {yearOpts.map((y) => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </Fld>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <Fld label="NILAI KAD (RP)">
                      <input
                        type="number"
                        style={INP}
                        value={newAnggaran.nilai_kad}
                        onChange={(e) => setNewAnggaran((f) => ({ ...f, nilai_kad: e.target.value }))}
                      />
                    </Fld>
                    <Fld label="NILAI RKAP (RP)">
                      <input
                        type="number"
                        style={INP}
                        value={newAnggaran.nilai_rkap}
                        onChange={(e) => setNewAnggaran((f) => ({ ...f, nilai_rkap: e.target.value }))}
                      />
                    </Fld>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginTop: 24 }}>
                    <button style={BTNOUT} onClick={() => setAnggaranMode("existing")}>
                      Kembali
                    </button>
                    <button
                      style={{ ...BTN, background: "#2563eb", opacity: newAnggaran.nm ? 1 : 0.5 }}
                      disabled={!newAnggaran.nm}
                      onClick={handleLanjutToStep1}
                    >
                      Simpan & Lanjut ke Daftar <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              )}
            </Card>
          )}
        </>
      )}

      {step === 1 && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <h2 style={{ fontWeight: 600, fontSize: "1.1rem" }}>
              Kelola Anggaran CAPEX
            </h2>
            <button style={{...BTN, background: "#2563eb"}} onClick={reset}>
              <Plus size={16} /> Pilih / Tambah CAPEX Lain
            </button>
          </div>

          {!activeCapex ? (
            <Card
              style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}
            >
              Data tidak ditemukan atau belum dipilih.
            </Card>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              
              {/* HEADER CARD KHUSUS CAPEX */}
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  padding: "20px 24px",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: "#1e293b",
                        marginBottom: 12,
                      }}
                    >
                      {activeCapex.nm_anggaran}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: 20,
                        fontSize: "0.9rem",
                        color: "#64748b",
                      }}
                    >
                      <span>Kode: <b>{activeCapex.kd_capex || "-"}</b></span>
                      <span>Tahun: <b>{activeCapex.thn_anggaran}</b></span>
                      <span>
                        RKAP: <b>{activeCapex.thn_rkap_awal} - {activeCapex.thn_rkap_akhir}</b>
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 700,
                        marginBottom: 6,
                        letterSpacing: "0.5px"
                      }}
                    >
                      NILAI RKAP
                    </div>
                    <div
                      style={{
                        fontSize: "1.3rem",
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 700,
                        color: "#2563eb",
                      }}
                    >
                      Rp {fmt(activeCapex.nilai_rkap)}
                    </div>
                    <div
                      style={{
                        marginTop: 12,
                        display: "flex",
                        gap: 8,
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        style={{
                          ...BTNOUT,
                          padding: "6px 12px",
                          fontSize: "0.8rem",
                        }}
                        onClick={() => setEditTarget({ ...activeCapex })}
                      >
                        <Edit size={14} /> Edit Detail
                      </button>
                      <button
                        style={{
                          ...BTNOUT,
                          padding: "6px 12px",
                          fontSize: "0.8rem",
                          color: "#ef4444",
                          borderColor: "#fecaca"
                        }}
                        onClick={() =>
                          setConfirm({
                            msg: "Hapus anggaran CAPEX ini beserta rinciannya?",
                            onConfirm: () => {
                              setCapexList((p) =>
                                p.filter((c) => c.id !== activeCapex.id),
                              );
                              setConfirm(null);
                              reset();
                            },
                          })
                        }
                      >
                        <Trash2 size={14} /> Hapus
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <AnggaranTahunanSection
                item={activeCapex}
                setList={setCapexList}
                title={activeCapex.nm_anggaran}
                toast_={toast_}
              />

              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0", 
                  overflow: "hidden",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    background: "#f8fafc", 
                    borderBottom: "1px solid #e2e8f0",
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Layers size={18} style={{ color: "#2563eb" }} />
                    <span style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}>
                      Daftar Pekerjaan ({activeCapex.pekerjaan?.length || 0})
                    </span>
                  </div>
                  <button
                    style={{
                      ...BTN,
                      background: "#2563eb",
                      padding: "8px 14px",
                      fontSize: "0.8rem",
                    }}
                    onClick={() => openAddPkj(activeCapex.id)}
                  >
                    <Plus size={14} /> Tambah Pekerjaan
                  </button>
                </div>
                
                <div style={{ overflowX: "auto" }}>
                  <table style={{...TABLE, border: "none", borderRadius: 0}}>
                    <thead>
                      <tr>
                        <th style={{ ...TH, width: 40, textAlign: "center" }}>No</th>
                        <th style={TH}>Nama Pekerjaan</th>
                        <th style={{ ...TH, width: 120 }}>Tgl Kontrak</th>
                        <th style={{ ...TH, width: 100 }}>Durasi</th>
                        <th style={{ ...TH, textAlign: "right" }}>Nilai Kontrak</th>
                        <th style={{ ...TH, textAlign: "center", width: 120 }}>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!activeCapex.pekerjaan || activeCapex.pekerjaan.length === 0 ? (
                        <tr>
                          <td
                            colSpan={6}
                            style={{
                              ...TD,
                              textAlign: "center",
                              color: "#94a3b8",
                              padding: "24px"
                            }}
                          >
                            Belum ada pekerjaan.
                          </td>
                        </tr>
                      ) : (
                        activeCapex.pekerjaan.map((pkj, idx) => (
                          <tr key={pkj.id}>
                            <td style={{ ...TD, textAlign: "center" }}>{idx + 1}</td>
                            <td style={{...TD, fontWeight: 500, color: "#1e293b"}}>{pkj.nm}</td>
                            <td style={{...TD, color: "#64748b"}}>
                              {fmtDate(pkj.tgl_kontrak) || "-"}
                            </td>
                            <td style={{...TD, color: "#64748b"}}>
                              {pkj.durasi_kontrak ? `${pkj.durasi_kontrak} hari` : "-"}
                            </td>
                            <td
                              style={{
                                ...TD,
                                textAlign: "right",
                                fontVariantNumeric: "tabular-nums",
                                color: "#2563eb",
                                fontWeight: 600
                              }}
                            >
                              Rp {fmt(pkj.nilai_kontrak)}
                            </td>
                            <td style={{ ...TD, textAlign: "center" }}>
                              <div style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                                <button
                                  style={ABTN}
                                  onClick={() => setViewDetail({ cap: activeCapex, pkj })}
                                  title="Lihat Detail"
                                >
                                  <Eye size={14} style={{ color: "#2563eb" }} />
                                </button>
                                <button
                                  style={ABTN}
                                  onClick={() => openEditPkj(activeCapex.id, pkj)}
                                  title="Edit"
                                >
                                  <Edit size={14} style={{ color: "#d97706" }} />
                                </button>
                                <button
                                  style={ABTN}
                                  title="Hapus"
                                  onClick={() =>
                                    setConfirm({
                                      msg: "Hapus pekerjaan ini?",
                                      onConfirm: () => {
                                        setCapexList((p) =>
                                          p.map((c) =>
                                            c.id === activeCapex.id
                                              ? {
                                                  ...c,
                                                  pekerjaan: c.pekerjaan.filter((pk) => pk.id !== pkj.id),
                                                }
                                              : c,
                                          ),
                                        );
                                        setConfirm(null);
                                      },
                                    })
                                  }
                                >
                                  <Trash2 size={14} style={{ color: "#ef4444" }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {showPkj && (
            <div style={OVS} onClick={() => setShowPkj(false)}>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  width: "100%",
                  maxWidth: 650,
                  maxHeight: "90vh",
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h3 style={{ fontWeight: 600 }}>
                    {pkjEditId ? "Edit Pekerjaan" : "Tambah Pekerjaan"}
                  </h3>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => setShowPkj(false)}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div
                  style={{
                    overflowY: "auto",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                  }}
                >
                  <Fld label="Nama Pekerjaan" required>
                    <textarea
                      rows={2}
                      style={INP}
                      value={pkjForm.nm}
                      onChange={(e) =>
                        setPkjForm((f) => ({ ...f, nm: e.target.value }))
                      }
                    />
                  </Fld>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Nilai RAB (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={pkjForm.nilai_rab}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            nilai_rab: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Nilai Kontrak (Rp)">
                      <input
                        type="number"
                        style={INP}
                        value={pkjForm.nilai_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            nilai_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Nomor PR">
                      <input
                        style={INP}
                        value={pkjForm.no_pr}
                        onChange={(e) =>
                          setPkjForm((f) => ({ ...f, no_pr: e.target.value }))
                        }
                      />
                    </Fld>
                    <Fld label="Nomor PO">
                      <input
                        style={INP}
                        value={pkjForm.no_po}
                        onChange={(e) =>
                          setPkjForm((f) => ({ ...f, no_po: e.target.value }))
                        }
                      />
                    </Fld>
                    <Fld label="Nomor Kontrak">
                      <input
                        style={INP}
                        value={pkjForm.no_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            no_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Tanggal Kontrak">
                      <input
                        type="date"
                        style={INP}
                        value={pkjForm.tgl_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            tgl_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Durasi (Hari)">
                      <input
                        type="number"
                        style={INP}
                        value={pkjForm.durasi_kontrak}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            durasi_kontrak: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="Tanggal BAMK">
                      <input
                        type="date"
                        style={INP}
                        value={pkjForm.tgl_bamk}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            tgl_bamk: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                    }}
                  >
                    <Fld label="Nomor SP3">
                      <input
                        style={INP}
                        value={pkjForm.no_sp3}
                        onChange={(e) =>
                          setPkjForm((f) => ({ ...f, no_sp3: e.target.value }))
                        }
                      />
                    </Fld>
                    <Fld label="Tanggal SP3">
                      <input
                        type="date"
                        style={INP}
                        value={pkjForm.tgl_sp3}
                        onChange={(e) =>
                          setPkjForm((f) => ({
                            ...f,
                            tgl_sp3: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                  <Fld label="Keterangan Tambahan">
                    <textarea
                      rows={2}
                      style={INP}
                      value={pkjForm.keterangan}
                      onChange={(e) =>
                        setPkjForm((f) => ({
                          ...f,
                          keterangan: e.target.value,
                        }))
                      }
                    />
                  </Fld>
                </div>
                <div
                  style={{
                    padding: "16px 20px",
                    borderTop: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: 12,
                  }}
                >
                  <button style={BTNOUT} onClick={() => setShowPkj(false)}>
                    Batal
                  </button>
                  <button
                    style={{ ...BTN, opacity: pkjForm.nm ? 1 : 0.5 }}
                    disabled={!pkjForm.nm}
                    onClick={handleSavePkj}
                  >
                    Simpan Pekerjaan
                  </button>
                </div>
              </div>
            </div>
          )}

          {editTarget && (
            <div style={OVS} onClick={() => setEditTarget(null)}>
              <div
                style={{
                  background: "white",
                  borderRadius: 12,
                  padding: "24px",
                  maxWidth: 500,
                  width: "100%",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <h3 style={{ fontWeight: 600, marginBottom: 20 }}>
                  Edit Info CAPEX
                </h3>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <Fld label="NAMA ANGGARAN CAPEX">
                    <input
                      style={INP}
                      value={editTarget.nm_anggaran}
                      onChange={(e) =>
                        setEditTarget((t) => ({
                          ...t,
                          nm_anggaran: e.target.value,
                        }))
                      }
                    />
                  </Fld>
                  <Fld label="KODE CAPEX">
                    <input
                      style={INP}
                      value={editTarget.kd_capex}
                      onChange={(e) =>
                        setEditTarget((t) => ({
                          ...t,
                          kd_capex: e.target.value,
                        }))
                      }
                    />
                  </Fld>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr 1fr",
                      gap: 12,
                    }}
                  >
                    {["thn_rkap_awal", "thn_rkap_akhir", "thn_anggaran"].map(
                      (key) => (
                        <Fld
                          key={key}
                          label={key.replace(/_/g, " ").toUpperCase()}
                        >
                          <select
                            style={INP}
                            value={editTarget[key]}
                            onChange={(e) =>
                              setEditTarget((t) => ({
                                ...t,
                                [key]: e.target.value,
                              }))
                            }
                          >
                            {yearOpts.map((y) => (
                              <option key={y} value={y}>
                                {y}
                              </option>
                            ))}
                          </select>
                        </Fld>
                      ),
                    )}
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                    }}
                  >
                    <Fld label="NILAI KAD (RP)">
                      <input
                        type="number"
                        style={INP}
                        value={editTarget.nilai_kad}
                        onChange={(e) =>
                          setEditTarget((t) => ({
                            ...t,
                            nilai_kad: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                    <Fld label="NILAI RKAP (RP)">
                      <input
                        type="number"
                        style={INP}
                        value={editTarget.nilai_rkap}
                        onChange={(e) =>
                          setEditTarget((t) => ({
                            ...t,
                            nilai_rkap: e.target.value,
                          }))
                        }
                      />
                    </Fld>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 12,
                    marginTop: 24,
                    justifyContent: "flex-end",
                  }}
                >
                  <button style={BTNOUT} onClick={() => setEditTarget(null)}>
                    Batal
                  </button>
                  <button style={BTN} onClick={saveEditCapex}>
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MENU UTAMA
// ═══════════════════════════════════════════════════════════════
export default function MenuAnggaranTerpadu() {
  const [tipe, setTipe] = useState(null);
  const [opexList, setOpexList] = useState(INIT_OPEX);
  const [capexList, setCapexList] = useState(INIT_CAPEX);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        
        *, *::before, *::after { 
          box-sizing: border-box; 
          margin: 0; 
          padding: 0; 
          font-family: 'Inter', system-ui, sans-serif !important;
        }
        body { -webkit-font-smoothing: antialiased; }
        textarea { resize: vertical; }
        input[type=number]::-webkit-inner-spin-button, input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
      `}</style>

      {tipe === "OPEX" && (
        <div style={{ padding: "2rem" }}>
          <button
            style={{ ...BTNOUT, marginBottom: 20 }}
            onClick={() => setTipe(null)}
          >
            <ArrowLeft size={16} /> Pilih Menu Utama
          </button>
          <OpexModule opexList={opexList} setOpexList={setOpexList} />
        </div>
      )}

      {tipe === "CAPEX" && (
        <div style={{ padding: "2rem" }}>
          <button
            style={{ ...BTNOUT, marginBottom: 20 }}
            onClick={() => setTipe(null)}
          >
            <ArrowLeft size={16} /> Pilih Menu Utama
          </button>
          <CapexModule capexList={capexList} setCapexList={setCapexList} />
        </div>
      )}

      {!tipe && (
        <div
          style={{
            padding: "4rem 2rem",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: 700, width: "100%" }}>
            <div
              style={{
                background: "white",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                padding: "24px",
                marginBottom: 24,
                display: "flex",
                alignItems: "center",
                gap: 16,
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
              }}
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  background: "#f1f5f9",
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Database size={24} style={{ color: "#475569" }} />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "#1e293b",
                  }}
                >
                  Sistem Pembuatan Anggaran
                </h1>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    marginTop: 4,
                  }}
                >
                  Pilih modul anggaran yang akan dikelola.
                </p>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
              }}
            >
              {[
                {
                  tipe: "OPEX",
                  icon: <Package size={24} style={{ color: "#16a34a" }} />,
                  bg: "#dcfce7",
                  color: "#16a34a",
                  sub: "Anggaran Operasional",
                  count: `${opexList.length} pos anggaran master`,
                },
                {
                  tipe: "CAPEX",
                  icon: <FileText size={24} style={{ color: "#2563eb" }} />,
                  bg: "#dbeafe",
                  color: "#2563eb",
                  sub: "Anggaran Investasi & Pekerjaan",
                  count: `${capexList.length} pos anggaran master`,
                },
              ].map((item) => (
                <div
                  key={item.tipe}
                  style={{
                    background: "white",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "24px",
                    cursor: "pointer",
                    transition: "all .2s ease",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                  }}
                  onClick={() => setTipe(item.tipe)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = item.color;
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow =
                      "0 1px 3px rgba(0,0,0,0.02)";
                  }}
                >
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 10,
                      background: item.bg,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    {item.icon}
                  </div>
                  <h3
                    style={{
                      fontWeight: 600,
                      fontSize: "1.1rem",
                      color: "#1e293b",
                      marginBottom: 6,
                    }}
                  >
                    {item.tipe}
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "#64748b",
                      marginBottom: 12,
                    }}
                  >
                    {item.sub}
                  </p>
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "#94a3b8",
                      fontWeight: 500,
                    }}
                  >
                    {item.count}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// SHARED STYLES
// ═══════════════════════════════════════════════════════════════
const OVS = {
  position: "fixed",
  inset: 0,
  background: "rgba(15,23,42,.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9000,
  padding: 20,
};
const BTN = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: "0.85rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "opacity 0.2s",
};
const BTNOUT = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  borderRadius: 6,
  border: "1px solid #cbd5e1",
  background: "white",
  color: "#334155",
  fontSize: "0.85rem",
  fontWeight: 500,
  cursor: "pointer",
  transition: "background 0.2s",
};
const INP = {
  padding: "10px 14px",
  border: "1px solid #cbd5e1",
  borderRadius: 6,
  fontSize: "0.85rem",
  color: "#1e293b",
  outline: "none",
  width: "100%",
  background: "white",
  transition: "border-color .2s",
};
const LBL = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: ".5px",
  color: "#475569",
  textTransform: "uppercase",
};
const TOGGLE = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 16px",
  borderRadius: 6,
  border: "none",
  background: "transparent",
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "#64748b",
  cursor: "pointer",
  transition: "all .2s",
};
const TABLE = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.85rem",
};
const TH = {
  padding: "14px 16px",
  textAlign: "left",
  fontSize: "0.78rem",
  fontWeight: 700,
  color: "#475569",
  borderBottom: "1px solid #e2e8f0",
  verticalAlign: "middle",
};
const TD = {
  padding: "14px 16px",
  verticalAlign: "middle",
  borderBottom: "1px solid #e2e8f0",
  color: "#334155",
};
const ABTN = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 6,
  borderRadius: 4,
  border: "1px solid #e2e8f0",
  background: "white",
  cursor: "pointer",
  transition: "background .15s",
};