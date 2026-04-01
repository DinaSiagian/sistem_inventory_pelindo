import React, { useState } from "react";
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
  Calendar,
  Eye,
  History,
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
    anggaran_tahunan: [
      {
        id: "OPX-YR-1",
        thn: 2026,
        anggaran_murni: 900000000,
        anggaran_bymhd: 100000000,
        history: [
          {
            id: "H1",
            tgl: "2026-01-01",
            tipe: "initial",
            nilai: 900000000,
            is_initial: true,
            keterangan: "Input awal murni",
          },
          {
            id: "H2",
            tgl: "2026-01-02",
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
const yearOpts = (() => {
  const max = new Date().getFullYear() + 3;
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
// MASTER DROP COMPONENT (DENGAN FITUR EDIT & HAPUS LIST)
// ═══════════════════════════════════════════════════════════════
function MasterDrop({ options, value, onChange, onEditDrop, onDeleteDrop }) {
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
          {sel ? sel.nm : "Cari & pilih anggaran master…"}
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
                    {o.nm}
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
// HISTORY POPUP COMPONENT (Penambahan masuk BYMHD)
// ═══════════════════════════════════════════════════════════════
function HistoryPopup({ row, title, onClose }) {
  const history = row.history || [];

  const TIPE_META = {
    initial: { label: "Input Awal", color: "#0284c7", bg: "#e0f2fe" },
    penambahan: { label: "Penambahan", color: "#16a34a", bg: "#dcfce7" },
    pengurangan: { label: "Pengurangan", color: "#dc2626", bg: "#fee2e2" },
    bymhd: { label: "BYMHD", color: "#d97706", bg: "#fef3c7" },
    transfer: { label: "Transfer Anggaran", color: "#7c3aed", bg: "#ede9fe" },
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
      real = null; // Penambahan masuk ke BYMHD
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
                Riwayat Perubahan Anggaran
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
                        fontFamily: "monospace",
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
                        fontFamily: "monospace",
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
                        fontFamily: "monospace",
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
                    TOTAL ANGGARAN SAAT INI
                  </td>
                  <td
                    style={{
                      ...TD,
                      textAlign: "right",
                      fontFamily: "monospace",
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
// EDIT ANGGARAN PAGE
// ═══════════════════════════════════════════════════════════════
function EditAnggaranPage({ row, title, onBack, onSave }) {
  const [tipePerubahan, setTipePerubahan] = useState("");
  const [nilaiPerubahan, setNilaiPerubahan] = useState("");
  const [keterangan, setKeterangan] = useState("");

  const TIPE_OPTIONS = [
    { value: "penambahan", label: "Penambahan Anggaran" },
    { value: "pengurangan", label: "Pengurangan Anggaran" },
    { value: "bymhd", label: "BYMHD (Biaya Yang Masih Harus Dibayar)" },
    { value: "transfer", label: "Transfer Anggaran" },
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
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: 24,
          color: "#d97706",
          fontWeight: 600,
          fontSize: "1.1rem",
        }}
      >
        <Edit size={20} /> Edit / Revisi Anggaran Tahunan
      </div>

      <div
        style={{
          background: "white",
          borderRadius: 10,
          border: "1px solid #e2e8f0",
          marginBottom: 24,
        }}
      >
        {[
          { label: "Nama Anggaran", value: title, mono: false },
          { label: "Tahun", value: String(row.thn), mono: false },
          {
            label: "Total Anggaran Berjalan",
            value: `Rp ${new Intl.NumberFormat("id-ID").format(currentTotal)}`,
            mono: true,
            highlight: true,
          },
        ].map((item, i, arr) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 20px",
              borderBottom: i < arr.length - 1 ? "1px solid #e2e8f0" : "none",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              {item.label}
            </span>
            <span
              style={{
                fontSize: item.highlight ? "1rem" : "0.9rem",
                fontWeight: item.highlight ? 600 : 500,
                color: item.highlight ? "#2563eb" : "#1e293b",
                fontFamily: item.mono ? "monospace" : "inherit",
              }}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 500,
        }}
      >
        <Fld label="Jenis Perubahan" required>
          <div style={{ position: "relative" }}>
            <select
              style={{ ...INP, paddingRight: 36, cursor: "pointer" }}
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
            <ChevronDown
              size={16}
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                color: "#94a3b8",
                pointerEvents: "none",
              }}
            />
          </div>
        </Fld>

        <Fld label="Nilai Perubahan (IDR)" required>
          <input
            type="number"
            style={INP}
            placeholder="Contoh: 50000000"
            value={nilaiPerubahan}
            onChange={(e) => setNilaiPerubahan(e.target.value)}
          />
          {parseFloat(nilaiPerubahan) > 0 && (
            <div style={{ marginTop: 4, fontSize: "0.8rem", color: "#64748b" }}>
              ≈ Rp {fmt(nilaiPerubahan)}
            </div>
          )}
        </Fld>

        <Fld label="Keterangan (Opsional)">
          <input
            style={INP}
            placeholder="Catatan perubahan..."
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
        </Fld>
      </div>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          background: "white",
          borderTop: "1px solid #e2e8f0",
          padding: "16px 32px",
          display: "flex",
          justifyContent: "flex-end",
          gap: 12,
          zIndex: 100,
        }}
      >
        <button style={BTNOUT} onClick={onBack}>
          Batal
        </button>
        <button
          style={{
            ...BTN,
            background: "#ea580c",
            opacity: !tipePerubahan || !nilaiPerubahan ? 0.5 : 1,
          }}
          disabled={!tipePerubahan || !nilaiPerubahan}
          onClick={handleSubmit}
        >
          <Save size={16} /> Submit Perubahan
        </button>
      </div>

      <div style={{ height: 80 }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// ANGGARAN TAHUNAN (BISA DIPAKAI UNTUK OPEX / CAPEX)
// ═══════════════════════════════════════════════════════════════
function AnggaranTahunanSection({ item, setList, title, toast_ }) {
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [historyRow, setHistoryRow] = useState(null);
  const [confirm, setConfirm] = useState(null);

  const emptyForm = {
    thn: new Date().getFullYear(),
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
          keterangan: "Input awal anggaran murni",
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
    toast_("Data anggaran tahunan ditambahkan.");
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
              newBymhd += nilai; // Penambahan kini masuk ke BYMHD
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
    toast_("Perubahan anggaran berhasil disimpan.");
    setEditRow(null);
  };

  const handleDelete = (rowId) => {
    setConfirm({
      msg: "Hapus data anggaran tahunan ini?",
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
        toast_("Data anggaran tahunan dihapus.");
      },
    });
  };

  const grandTotal = list.reduce(
    (a, r) => a + (r.anggaran_murni || 0) + (r.anggaran_bymhd || 0),
    0,
  );

  return (
    <div style={{ marginTop: "10px" }}>
      {editRow && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 8500,
            overflowY: "auto",
            background: "#f8fafc",
          }}
        >
          <EditAnggaranPage
            row={editRow}
            title={title}
            onBack={() => setEditRow(null)}
            onSave={handleSavePerubahan}
          />
        </div>
      )}
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
                  Input Anggaran Tahunan
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
              <Fld label="Tahun Anggaran" required>
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
                <Fld label="Anggaran Murni (Rp)" required>
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
                <Fld label="Anggaran BYMHD (Rp)">
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

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <span
          style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0f172a" }}
        >
          Daftar Anggaran Tahunan
        </span>
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
        <table style={TABLE}>
          <thead>
            <tr>
              <th style={{ ...TH, width: 40, textAlign: "center" }}>NO</th>
              <th style={{ ...TH, width: 80, textAlign: "center" }}>TAHUN</th>
              <th style={{ ...TH, textAlign: "right" }}>ANGGARAN MURNI</th>
              <th style={{ ...TH, textAlign: "right" }}>ANGGARAN BYMHD</th>
              <th style={{ ...TH, textAlign: "right" }}>TOTAL ANGGARAN</th>
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
                  Belum ada data anggaran tahunan.
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
                        fontFamily: "monospace",
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
                        fontFamily: "monospace",
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
                        fontFamily: "monospace",
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
                    fontFamily: "monospace",
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
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// OPEX MODULE (DIREVISI MIRIP CAPEX/SCREENSHOT & DROPDOWN CRUD)
// ═══════════════════════════════════════════════════════════════
function OpexModule({ opexList, setOpexList }) {
  const [step, setStep] = useState(0);
  const [toast, setToast] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [masterMode, setMasterMode] = useState("existing");
  const [selKd, setSelKd] = useState(null);
  const [newMaster, setNewMaster] = useState({ kd: "", nm: "" });

  const [activeOpexId, setActiveOpexId] = useState(null);
  const [editMasterModal, setEditMasterModal] = useState(false);
  const [editMasterForm, setEditMasterForm] = useState({ kd: "", nm: "" });

  // State untuk Dropdown Opsi Master (agar bisa di-edit/hapus dari list)
  const [opexMasters, setOpexMasters] = useState(
    MASTER_LIST.filter((m) => m.tipe === "OPEX"),
  );
  const [editDropItem, setEditDropItem] = useState(null);

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // Navigasi langsung ke Step 1 saat dipilih
  const proceedToStep1 = (kd, nm) => {
    let exists = opexList.find((o) => o.kd_master === kd);
    let targetId;
    if (!exists) {
      const newItem = {
        id: uid(),
        kd_master: kd,
        nm_master: nm,
        anggaran_tahunan: [],
      };
      setOpexList((p) => [...p, newItem]);
      targetId = newItem.id;
    } else {
      targetId = exists.id;
    }
    setActiveOpexId(targetId);
    setStep(1);
  };

  const handleSelectMaster = (kd) => {
    setSelKd(kd);
    const master = opexMasters.find((m) => m.kd === kd);
    proceedToStep1(kd, master?.nm || "");
  };

  const handleCreateNewMaster = () => {
    if (!newMaster.kd || !newMaster.nm) return;

    // Simpan juga ke daftar Dropdown agar tersimpan
    setOpexMasters((prev) => [
      ...prev,
      { kd: newMaster.kd, nm: newMaster.nm, tipe: "OPEX" },
    ]);

    proceedToStep1(newMaster.kd, newMaster.nm);
    setNewMaster({ kd: "", nm: "" });
  };

  const saveEditMaster = () => {
    // Sinkronisasi update ke opexList
    setOpexList((p) =>
      p.map((o) =>
        o.id === activeOpexId
          ? { ...o, kd_master: editMasterForm.kd, nm_master: editMasterForm.nm }
          : o,
      ),
    );
    // Sinkronisasi update ke Dropdown list
    setOpexMasters((p) =>
      p.map((m) =>
        m.kd === activeItem.kd_master
          ? { ...m, kd: editMasterForm.kd, nm: editMasterForm.nm }
          : m,
      ),
    );

    setEditMasterModal(false);
    toast_("Info master anggaran berhasil diperbarui.");
  };

  // Logika Update/Delete dari dalam Dropdown list
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

      {/* Modal Edit dari Dropdown */}
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
              <Fld label="Kode Master">
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

      {/* STEPPER */}
      <Stepper
        steps={["Anggaran Master", "Detail Anggaran", "Daftar Keseluruhan"]}
        current={step}
        color="#16a34a"
      />

      {/* STEP 0: Pilih Master */}
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
                ["existing", <Search size={14} />, "Pilih dari Daftar"],
                ["new", <Plus size={14} />, "Tambah Baru"],
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
                  onClick={() => setMasterMode(v)}
                >
                  {ic} {lbl}
                </button>
              ))}
            </div>
            {masterMode === "existing" && (
              <Fld label="Nama Anggaran" required>
                <MasterDrop
                  options={opexMasters}
                  value={selKd}
                  onChange={handleSelectMaster}
                  onEditDrop={(o) =>
                    setEditDropItem({ oldKd: o.kd, kd: o.kd, nm: o.nm })
                  }
                  onDeleteDrop={(o) => {
                    setConfirm({
                      msg: `Hapus opsi "${o.nm}" dari daftar pilihan?`,
                      onConfirm: () => {
                        setOpexMasters((p) => p.filter((m) => m.kd !== o.kd));
                        if (selKd === o.kd) setSelKd(null);
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
                <Fld label="Nama Anggaran" required>
                  <input
                    style={INP}
                    value={newMaster.nm}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, nm: e.target.value }))
                    }
                  />
                </Fld>
                <Fld label="Kode Akun" required>
                  <input
                    style={INP}
                    value={newMaster.kd}
                    onChange={(e) =>
                      setNewMaster((f) => ({ ...f, kd: e.target.value }))
                    }
                  />
                </Fld>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <button
                    style={{
                      ...BTN,
                      background: "#16a34a",
                      opacity: !newMaster.kd || !newMaster.nm ? 0.5 : 1,
                    }}
                    disabled={!newMaster.kd || !newMaster.nm}
                    onClick={handleCreateNewMaster}
                  >
                    Lanjut <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </Card>
        </>
      )}

      {/* STEP 1: Kelola Tahun untuk 1 Master */}
      {step === 1 && activeItem && (
        <>
          <div
            style={{
              display: "flex",
              gap: 20,
              background: "white",
              padding: "20px 24px",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={LBL}>TIPE ANGGARAN</div>
              <div
                style={{
                  background: "#dcfce7",
                  color: "#16a34a",
                  padding: "6px 16px",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginTop: 8,
                  display: "inline-block",
                }}
              >
                OPEX
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={LBL}>KODE MASTER</div>
              <div
                style={{
                  background: "#f1f5f9",
                  color: "#475569",
                  padding: "6px 16px",
                  borderRadius: 6,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  marginTop: 8,
                  display: "inline-block",
                  border: "1px solid #e2e8f0",
                  fontFamily: "monospace",
                }}
              >
                {activeItem.kd_master}
              </div>
            </div>
            <div style={{ flex: 2 }}>
              <div style={LBL}>NAMA ANGGARAN MASTER</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginTop: 8,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "1.05rem",
                    color: "#0f172a",
                  }}
                >
                  {activeItem.nm_master}
                </div>
                <button
                  style={ABTN}
                  title="Edit Info Master"
                  onClick={() => {
                    setEditMasterForm({
                      kd: activeItem.kd_master,
                      nm: activeItem.nm_master,
                    });
                    setEditMasterModal(true);
                  }}
                >
                  <Edit size={14} style={{ color: "#d97706" }} />
                </button>
              </div>
            </div>
          </div>

          <div
            style={{
              background: "white",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
              paddingBottom: "16px",
            }}
          >
            <AnggaranTahunanSection
              item={activeItem}
              setList={setOpexList}
              title={activeItem.nm_master}
              toast_={toast_}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "white",
              padding: "16px 24px",
              borderRadius: 12,
              border: "1px solid #e2e8f0",
            }}
          >
            <button style={BTNOUT} onClick={() => setStep(0)}>
              <ArrowLeft size={16} /> Kembali
            </button>
            <button
              style={{ ...BTN, background: "#16a34a" }}
              onClick={() => setStep(2)}
            >
              <Save size={16} /> Simpan Seluruh Data
            </button>
          </div>
        </>
      )}

      {/* Modal Edit Anggaran Master dari Step 1 */}
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
              Edit Anggaran Master
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <Fld label="Nama Anggaran Master">
                <input
                  style={INP}
                  value={editMasterForm.nm}
                  onChange={(e) =>
                    setEditMasterForm((t) => ({ ...t, nm: e.target.value }))
                  }
                />
              </Fld>
              <Fld label="Kode Master">
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

      {/* STEP 2: Daftar Keseluruhan */}
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
              onClick={() => setStep(0)}
            >
              <Plus size={16} /> Kelola Anggaran Lainnya
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
                    <th style={TH}>Nama Anggaran Master</th>
                    <th style={TH}>Kode Akun</th>
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
                        Belum ada data anggaran OPEX.
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
                            {row.nm_master}
                          </td>
                          <td
                            style={{
                              ...TD,
                              color: "#64748b",
                              fontFamily: "monospace",
                            }}
                          >
                            {row.kd_master}
                          </td>
                          <td
                            style={{
                              ...TD,
                              textAlign: "right",
                              fontFamily: "monospace",
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
                                title="Hapus Master"
                                onClick={() => {
                                  setConfirm({
                                    msg: "Hapus seluruh data Master Anggaran ini beserta rinciannya?",
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
  const [selKd, setSelKd] = useState(null);
  const [newMaster, setNewMaster] = useState({ kd: "", nm: "" });

  const [capexMasters, setCapexMasters] = useState(
    MASTER_LIST.filter((m) => m.tipe === "CAPEX"),
  );
  const [editDropItem, setEditDropItem] = useState(null);

  const [capexInputMode, setCapexInputMode] = useState("new");

  const emptyCapex = {
    id: "",
    nm: "",
    kd_capex: "",
    thn_rkap_awal: new Date().getFullYear(),
    thn_rkap_akhir: new Date().getFullYear(),
    thn_anggaran: new Date().getFullYear(),
    nilai_kad: "",
    nilai_rkap: "",
  };
  const [capexForm, setCapexForm] = useState(emptyCapex);
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

  const selMaster =
    masterMode === "existing"
      ? capexMasters.find((m) => m.kd === selKd)
      : newMaster;
  const canNext =
    masterMode === "existing" ? !!selKd : !!(newMaster.nm && newMaster.kd);
  const activeMasterKd = masterMode === "existing" ? selKd : newMaster.kd;
  const availableCapex = capexList.filter(
    (c) => c.kd_master === activeMasterKd,
  );

  const toast_ = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelectMaster = (kd) => {
    setSelKd(kd);
    const exList = capexList.filter((c) => c.kd_master === kd);
    if (exList.length > 0) {
      setCapexInputMode("existing");
      const first = exList[0];
      setCapexForm({
        id: first.id,
        nm: first.nm_anggaran,
        kd_capex: first.kd_capex,
        thn_rkap_awal: first.thn_rkap_awal,
        thn_rkap_akhir: first.thn_rkap_akhir,
        thn_anggaran: first.thn_anggaran,
        nilai_kad: first.nilai_kad || "",
        nilai_rkap: first.nilai_rkap || "",
      });
    } else {
      setCapexInputMode("new");
      setCapexForm(emptyCapex);
    }
  };

  const handleSelectExistingCapex = (e) => {
    const selectedId = e.target.value;
    if (!selectedId) {
      setCapexForm(emptyCapex);
      return;
    }
    const found = availableCapex.find((c) => c.id === selectedId);
    if (found) {
      setCapexForm({
        id: found.id,
        nm: found.nm_anggaran,
        kd_capex: found.kd_capex,
        thn_rkap_awal: found.thn_rkap_awal,
        thn_rkap_akhir: found.thn_rkap_akhir,
        thn_anggaran: found.thn_anggaran,
        nilai_kad: found.nilai_kad || "",
        nilai_rkap: found.nilai_rkap || "",
      });
    }
  };

  const handleSaveCapex = () => {
    if (!capexForm.nm) return;
    const nm = selMaster?.nm || newMaster.nm;

    // Jika master baru, tambahkan juga ke list dropdown Master
    if (masterMode === "new") {
      setCapexMasters((p) => [
        ...p,
        { kd: newMaster.kd, nm: newMaster.nm, tipe: "CAPEX" },
      ]);
    }

    if (capexInputMode === "existing" && capexForm.id) {
      setCapexList((p) =>
        p.map((c) =>
          c.id === capexForm.id
            ? {
                ...c,
                nm_anggaran: capexForm.nm,
                kd_capex: capexForm.kd_capex,
                thn_rkap_awal: parseInt(capexForm.thn_rkap_awal),
                thn_rkap_akhir: parseInt(capexForm.thn_rkap_akhir),
                thn_anggaran: parseInt(capexForm.thn_anggaran),
                nilai_kad: parseFloat(capexForm.nilai_kad) || 0,
                nilai_rkap: parseFloat(capexForm.nilai_rkap) || 0,
              }
            : c,
        ),
      );
      toast_("Data CAPEX diperbarui.");
    } else {
      setCapexList((p) => [
        ...p,
        {
          id: uid(),
          kd_master: activeMasterKd,
          nm_master: nm,
          nm_anggaran: capexForm.nm,
          kd_capex: capexForm.kd_capex,
          thn_rkap_awal: parseInt(capexForm.thn_rkap_awal),
          thn_rkap_akhir: parseInt(capexForm.thn_rkap_akhir),
          thn_anggaran: parseInt(capexForm.thn_anggaran),
          nilai_kad: parseFloat(capexForm.nilai_kad) || 0,
          nilai_rkap: parseFloat(capexForm.nilai_rkap) || 0,
          anggaran_tahunan: [],
          pekerjaan: [],
        },
      ]);
      toast_("Data CAPEX ditambahkan.");
    }
    setStep(2);
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

  // Simpan edit list Dropdown
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
    setSelKd(null);
    setNewMaster({ kd: "", nm: "" });
    setCapexForm(emptyCapex);
    setCapexInputMode("new");
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

      {/* Modal Edit dari Dropdown CAPEX */}
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
              <Fld label="Kode Master">
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
        steps={["Anggaran Master", "Detail CAPEX", "Daftar & Kelola"]}
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
                ["existing", <Search size={14} />, "Pilih dari Daftar"],
                ["new", <Plus size={14} />, "Tambah Baru"],
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
                    setCapexInputMode("new");
                    setCapexForm(emptyCapex);
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
                  onChange={handleSelectMaster}
                  onEditDrop={(o) =>
                    setEditDropItem({ oldKd: o.kd, kd: o.kd, nm: o.nm })
                  }
                  onDeleteDrop={(o) => {
                    setConfirm({
                      msg: `Hapus opsi "${o.nm}" dari daftar pilihan?`,
                      onConfirm: () => {
                        setCapexMasters((p) => p.filter((m) => m.kd !== o.kd));
                        if (selKd === o.kd) setSelKd(null);
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
                <Fld label="Kode Akun" required>
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
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{ ...BTN, opacity: canNext ? 1 : 0.5 }}
              disabled={!canNext}
              onClick={() => setStep(1)}
            >
              Lanjut <ChevronRight size={16} />
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <div>
                <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>
                  Detail Anggaran CAPEX
                </h2>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "#64748b",
                    marginTop: 4,
                  }}
                >
                  Master: {selMaster?.nm || newMaster.nm}
                </div>
              </div>
              <button
                style={{ ...BTNOUT, padding: "6px 12px", fontSize: "0.75rem" }}
                onClick={() => setStep(0)}
              >
                <RefreshCw size={12} /> Ganti
              </button>
            </div>

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
                  ...(capexInputMode === "existing"
                    ? {
                        background: "white",
                        color: "#2563eb",
                        boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                      }
                    : {}),
                }}
                onClick={() => {
                  setCapexInputMode("existing");
                  if (availableCapex.length > 0)
                    handleSelectExistingCapex({
                      target: { value: availableCapex[0].id },
                    });
                }}
              >
                Pilih CAPEX Tersimpan
              </button>
              <button
                style={{
                  ...TOGGLE,
                  flex: 1,
                  justifyContent: "center",
                  ...(capexInputMode === "new"
                    ? {
                        background: "white",
                        color: "#2563eb",
                        boxShadow: "0 1px 2px rgba(0,0,0,.05)",
                      }
                    : {}),
                }}
                onClick={() => {
                  setCapexInputMode("new");
                  setCapexForm(emptyCapex);
                }}
              >
                Buat Baru
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {capexInputMode === "existing" ? (
                <Fld label="Pilih Anggaran CAPEX" required>
                  {availableCapex.length > 0 ? (
                    <select
                      style={INP}
                      value={capexForm.id}
                      onChange={handleSelectExistingCapex}
                    >
                      {availableCapex.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.nm_anggaran}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "#ef4444",
                        background: "#fef2f2",
                        padding: 12,
                        borderRadius: 6,
                      }}
                    >
                      Belum ada data. Silakan buat baru.
                    </div>
                  )}
                </Fld>
              ) : (
                <Fld label="Nama Anggaran CAPEX" required>
                  <input
                    style={INP}
                    value={capexForm.nm}
                    onChange={(e) =>
                      setCapexForm((f) => ({ ...f, nm: e.target.value }))
                    }
                  />
                </Fld>
              )}

              <Fld label="Kode CAPEX">
                <input
                  style={INP}
                  value={capexForm.kd_capex}
                  onChange={(e) =>
                    setCapexForm((f) => ({ ...f, kd_capex: e.target.value }))
                  }
                />
              </Fld>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  gap: 16,
                }}
              >
                {["thn_rkap_awal", "thn_rkap_akhir", "thn_anggaran"].map(
                  (key) => (
                    <Fld
                      key={key}
                      label={key.replace(/_/g, " ").toUpperCase()}
                      required={key === "thn_anggaran"}
                    >
                      <select
                        style={INP}
                        value={capexForm[key]}
                        onChange={(e) =>
                          setCapexForm((f) => ({
                            ...f,
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
                  gap: 16,
                }}
              >
                <Fld label="Nilai KAD (Rp)">
                  <input
                    type="number"
                    style={INP}
                    value={capexForm.nilai_kad}
                    onChange={(e) =>
                      setCapexForm((f) => ({ ...f, nilai_kad: e.target.value }))
                    }
                  />
                </Fld>
                <Fld label="Nilai RKAP (Rp)">
                  <input
                    type="number"
                    style={INP}
                    value={capexForm.nilai_rkap}
                    onChange={(e) =>
                      setCapexForm((f) => ({
                        ...f,
                        nilai_rkap: e.target.value,
                      }))
                    }
                  />
                </Fld>
              </div>
            </div>
          </Card>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <button style={BTNOUT} onClick={() => setStep(0)}>
              Kembali
            </button>
            <button
              style={{
                ...BTN,
                opacity:
                  !capexForm.nm ||
                  (capexInputMode === "existing" && availableCapex.length === 0)
                    ? 0.5
                    : 1,
              }}
              disabled={
                !capexForm.nm ||
                (capexInputMode === "existing" && availableCapex.length === 0)
              }
              onClick={handleSaveCapex}
            >
              Simpan & Lanjut
            </button>
          </div>
        </>
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
              Kelola Anggaran CAPEX
            </h2>
            <button style={BTN} onClick={reset}>
              <Plus size={16} /> Tambah CAPEX Lain
            </button>
          </div>

          {capexList.length === 0 ? (
            <Card
              style={{ textAlign: "center", padding: "3rem", color: "#64748b" }}
            >
              Belum ada anggaran CAPEX.
            </Card>
          ) : (
            capexList.map((cap) => (
              <div
                key={cap.id}
                style={{
                  background: "white",
                  borderRadius: 12,
                  border: "1px solid #e2e8f0",
                  overflow: "hidden",
                  marginBottom: 24,
                  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                }}
              >
                <div
                  style={{
                    padding: "20px",
                    borderBottom: "1px solid #e2e8f0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "#1e293b",
                        marginBottom: 8,
                      }}
                    >
                      {cap.nm_anggaran}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        gap: 16,
                        fontSize: "0.85rem",
                        color: "#64748b",
                      }}
                    >
                      <span>Kode: {cap.kd_capex || "-"}</span>
                      <span>Tahun: {cap.thn_anggaran}</span>
                      <span>
                        RKAP: {cap.thn_rkap_awal} - {cap.thn_rkap_akhir}
                      </span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "#64748b",
                        fontWeight: 600,
                        marginBottom: 4,
                      }}
                    >
                      NILAI RKAP
                    </div>
                    <div
                      style={{
                        fontSize: "1.1rem",
                        fontFamily: "monospace",
                        fontWeight: 600,
                        color: "#2563eb",
                      }}
                    >
                      Rp {fmt(cap.nilai_rkap)}
                    </div>
                    <div
                      style={{
                        marginTop: 8,
                        display: "flex",
                        gap: 8,
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        style={{
                          ...BTNOUT,
                          padding: "4px 8px",
                          fontSize: "0.75rem",
                        }}
                        onClick={() => setEditTarget({ ...cap })}
                      >
                        <Edit size={12} /> Edit
                      </button>
                      <button
                        style={{
                          ...BTNOUT,
                          padding: "4px 8px",
                          fontSize: "0.75rem",
                          color: "#ef4444",
                        }}
                        onClick={() =>
                          setConfirm({
                            msg: "Hapus anggaran CAPEX ini?",
                            onConfirm: () => {
                              setCapexList((p) =>
                                p.filter((c) => c.id !== cap.id),
                              );
                              setConfirm(null);
                            },
                          })
                        }
                      >
                        <Trash2 size={12} /> Hapus
                      </button>
                    </div>
                  </div>
                </div>

                <AnggaranTahunanSection
                  item={cap}
                  setList={setCapexList}
                  title={cap.nm_anggaran}
                  toast_={toast_}
                />

                <div style={{ padding: "20px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 16,
                    }}
                  >
                    <span style={{ fontSize: "0.9rem", fontWeight: 600 }}>
                      Daftar Pekerjaan ({cap.pekerjaan?.length || 0})
                    </span>
                    <button
                      style={{
                        ...BTN,
                        padding: "6px 12px",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => openAddPkj(cap.id)}
                    >
                      <Plus size={14} /> Tambah Pekerjaan
                    </button>
                  </div>
                  <div style={{ overflowX: "auto" }}>
                    <table style={TABLE}>
                      <thead>
                        <tr>
                          <th style={{ ...TH, width: 40, textAlign: "center" }}>
                            No
                          </th>
                          <th style={TH}>Nama Pekerjaan</th>
                          <th style={{ ...TH, width: 120 }}>Tgl Kontrak</th>
                          <th style={{ ...TH, width: 100 }}>Durasi</th>
                          <th style={{ ...TH, textAlign: "right" }}>
                            Nilai Kontrak
                          </th>
                          <th
                            style={{ ...TH, textAlign: "center", width: 120 }}
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {!cap.pekerjaan || cap.pekerjaan.length === 0 ? (
                          <tr>
                            <td
                              colSpan={6}
                              style={{
                                ...TD,
                                textAlign: "center",
                                color: "#94a3b8",
                              }}
                            >
                              Belum ada pekerjaan.
                            </td>
                          </tr>
                        ) : (
                          cap.pekerjaan.map((pkj, idx) => (
                            <tr key={pkj.id}>
                              <td style={{ ...TD, textAlign: "center" }}>
                                {idx + 1}
                              </td>
                              <td style={TD}>{pkj.nm}</td>
                              <td style={TD}>
                                {fmtDate(pkj.tgl_kontrak) || "-"}
                              </td>
                              <td style={TD}>
                                {pkj.durasi_kontrak
                                  ? `${pkj.durasi_kontrak} hari`
                                  : "-"}
                              </td>
                              <td
                                style={{
                                  ...TD,
                                  textAlign: "right",
                                  fontFamily: "monospace",
                                  color: "#2563eb",
                                }}
                              >
                                Rp {fmt(pkj.nilai_kontrak)}
                              </td>
                              <td style={{ ...TD, textAlign: "center" }}>
                                <div
                                  style={{
                                    display: "flex",
                                    gap: 4,
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    style={ABTN}
                                    onClick={() => setViewDetail({ cap, pkj })}
                                  >
                                    <Eye
                                      size={14}
                                      style={{ color: "#2563eb" }}
                                    />
                                  </button>
                                  <button
                                    style={ABTN}
                                    onClick={() => openEditPkj(cap.id, pkj)}
                                  >
                                    <Edit
                                      size={14}
                                      style={{ color: "#d97706" }}
                                    />
                                  </button>
                                  <button
                                    style={ABTN}
                                    onClick={() =>
                                      setConfirm({
                                        msg: "Hapus pekerjaan ini?",
                                        onConfirm: () => {
                                          setCapexList((p) =>
                                            p.map((c) =>
                                              c.id === cap.id
                                                ? {
                                                    ...c,
                                                    pekerjaan:
                                                      c.pekerjaan.filter(
                                                        (pk) =>
                                                          pk.id !== pkj.id,
                                                      ),
                                                  }
                                                : c,
                                            ),
                                          );
                                          setConfirm(null);
                                        },
                                      })
                                    }
                                  >
                                    <Trash2
                                      size={14}
                                      style={{ color: "#ef4444" }}
                                    />
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
            ))
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
                  <Fld label="Nama Anggaran">
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
                  <Fld label="Kode CAPEX">
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
                    <Fld label="Nilai KAD (Rp)">
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
                    <Fld label="Nilai RKAP (Rp)">
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
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <style>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap");
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { -webkit-font-smoothing: antialiased; }
        input, select, textarea, button { font-family: inherit; }
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
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
};
const TH = {
  padding: "14px 16px",
  textAlign: "left",
  fontSize: "0.78rem",
  fontWeight: 700,
  color: "#475569",
  background: "#f8fafc",
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
