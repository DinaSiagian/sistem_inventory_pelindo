import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  X,
  Plus,
  Trash2,
  FileText,
  CheckCircle,
  ArrowLeft,
  Package,
  Layers,
  Search,
  ChevronDown,
  AlertTriangle,
} from "lucide-react";
import "./BudgetInput.css";

// ═══════════════════════════════════════════════════════════════
// MOCK DATA
// ═══════════════════════════════════════════════════════════════
const inventoryAset = [
  {
    kode: "AST-OPX-0001",
    nama: "Lisensi Microsoft Office 365",
    brand: "Microsoft",
    model: "Office 365 E3",
    nilai_aset: 15000000,
  },
  {
    kode: "AST-OPX-0002",
    nama: "Sewa Bandwidth MPLS",
    brand: "Telkom",
    model: "MPLS 10Mbps",
    nilai_aset: 24000000,
  },
  {
    kode: "AST-OPX-0003",
    nama: "Lisensi Antivirus Kaspersky",
    brand: "Kaspersky",
    model: "Business Select",
    nilai_aset: 8500000,
  },
  {
    kode: "AST-NET-0001",
    nama: "Router Core Cisco",
    brand: "Cisco",
    model: "ASR 1001-X",
    nilai_aset: 185000000,
  },
  {
    kode: "AST-NET-0002",
    nama: "Switch Distribution Cisco",
    brand: "Cisco",
    model: "Catalyst 9300",
    nilai_aset: 45000000,
  },
  {
    kode: "AST-SRV-0001",
    nama: "Server Rack Dell PowerEdge",
    brand: "Dell",
    model: "PowerEdge R750",
    nilai_aset: 320000000,
  },
  {
    kode: "AST-SRV-0002",
    nama: "UPS Server Room",
    brand: "APC",
    model: "Smart-UPS 3000",
    nilai_aset: 28000000,
  },
  {
    kode: "AST-CCTV-001",
    nama: "Kamera CCTV Dome",
    brand: "Hikvision",
    model: "DS-2CD2143G2-I",
    nilai_aset: 3200000,
  },
  {
    kode: "AST-PCU-0001",
    nama: "PC Unit Workstation",
    brand: "HP",
    model: "EliteDesk 800 G6",
    nilai_aset: 18500000,
  },
  {
    kode: "AST-PRN-0001",
    nama: "Printer Laser A4",
    brand: "Brother",
    model: "HL-L8360CDW",
    nilai_aset: 7200000,
  },
];

// OPEX masters — setiap master sudah punya aset terdaftar
const defaultOpexMasters = [
  {
    id: "5030905000",
    kode: "5030905000",
    nama: "Beban Pemeliharaan Software",
    nilai_kontrak: 350000000,
    aset: [
      {
        id: "OA1",
        asset_code: "AST-OPX-0001",
        name: "Lisensi Microsoft Office 365",
        brand: "Microsoft",
        model: "Office 365 E3",
        nilai_aset: 15000000,
        procurement_date: "2026-01-01",
        fromInventory: true,
      },
      {
        id: "OA2",
        asset_code: "AST-OPX-0003",
        name: "Lisensi Antivirus Kaspersky",
        brand: "Kaspersky",
        model: "Business Select",
        nilai_aset: 8500000,
        procurement_date: "2026-01-01",
        fromInventory: true,
      },
    ],
  },
  {
    id: "5021300000",
    kode: "5021300000",
    nama: "Beban Jaringan dan Koneksi Data",
    nilai_kontrak: 288000000,
    aset: [
      {
        id: "OA3",
        asset_code: "AST-OPX-0002",
        name: "Sewa Bandwidth MPLS",
        brand: "Telkom",
        model: "MPLS 10Mbps",
        nilai_aset: 24000000,
        procurement_date: "2026-01-01",
        fromInventory: true,
      },
    ],
  },
  {
    id: "5021200000",
    kode: "5021200000",
    nama: "Beban Perlengkapan Kantor",
    nilai_kontrak: 0,
    aset: [],
  },
  {
    id: "5081500000",
    kode: "5081500000",
    nama: "Beban Jasa Konsultan",
    nilai_kontrak: 0,
    aset: [],
  },
  {
    id: "5060700000",
    kode: "5060700000",
    nama: "Beban Sumber Daya Pihak Ketiga Peralatan",
    nilai_kontrak: 0,
    aset: [],
  },
];

// CAPEX masters — setiap master sudah punya daftar pekerjaan
const defaultCapexMasters = [
  {
    id: "CAP-2540011",
    kode: "2540011",
    nama: "Transformasi dan Digitalisasi Operasional",
    thn_rkap_awal: 2026,
    thn_rkap_akhir: 2027,
    nilai_rkap: 3000000000,
    pekerjaan: [
      {
        id: "PKJ-001",
        nm_pekerjaan: "Pengadaan Server & Storage Data Center",
        nilai_rab: 850000000,
        nilai_kontrak: 820000000,
        no_pr: "PR/2026/001",
        no_po: "PO/2026/001",
        no_kontrak: "KTR/IT/2026/001",
        tgl_kontrak: "2026-01-15",
        durasi_kontrak: 90,
        no_sp3: "SP3/2026/001",
        tgl_sp3: "",
        tgl_bamk: "",
        assets: [
          {
            id: "A1",
            asset_code: "AST-SRV-0001",
            name: "Server Rack Dell PowerEdge",
            brand: "Dell",
            model: "PowerEdge R750",
            serial_number: "",
            nilai_aset: 320000000,
            procurement_date: "2026-02-01",
            fromInventory: true,
          },
          {
            id: "A2",
            asset_code: "AST-SRV-0002",
            name: "UPS Server Room",
            brand: "APC",
            model: "Smart-UPS 3000",
            serial_number: "",
            nilai_aset: 28000000,
            procurement_date: "2026-02-01",
            fromInventory: true,
          },
        ],
      },
      {
        id: "PKJ-002",
        nm_pekerjaan: "Upgrade Jaringan LAN Gedung Utama",
        nilai_rab: 250000000,
        nilai_kontrak: 238000000,
        no_pr: "PR/2026/005",
        no_po: "PO/2026/005",
        no_kontrak: "KTR/NET/2026/003",
        tgl_kontrak: "2026-02-01",
        durasi_kontrak: 60,
        no_sp3: "",
        tgl_sp3: "",
        tgl_bamk: "",
        assets: [
          {
            id: "A3",
            asset_code: "AST-NET-0002",
            name: "Switch Distribution Cisco",
            brand: "Cisco",
            model: "Catalyst 9300",
            serial_number: "",
            nilai_aset: 45000000,
            procurement_date: "2026-03-01",
            fromInventory: true,
          },
        ],
      },
    ],
  },
  {
    id: "CAP-2540012",
    kode: "2540012",
    nama: "Pengembangan Infrastruktur Jaringan",
    thn_rkap_awal: 2026,
    thn_rkap_akhir: 2028,
    nilai_rkap: 5500000000,
    pekerjaan: [
      {
        id: "PKJ-003",
        nm_pekerjaan: "Pemasangan Fiber Optik Antar Gedung",
        nilai_rab: 1200000000,
        nilai_kontrak: 1150000000,
        no_pr: "PR/2026/010",
        no_po: "PO/2026/010",
        no_kontrak: "KTR/NET/2026/010",
        tgl_kontrak: "2026-01-20",
        durasi_kontrak: 120,
        no_sp3: "",
        tgl_sp3: "",
        tgl_bamk: "",
        assets: [
          {
            id: "A4",
            asset_code: "AST-NET-0001",
            name: "Router Core Cisco",
            brand: "Cisco",
            model: "ASR 1001-X",
            serial_number: "",
            nilai_aset: 185000000,
            procurement_date: "2026-03-15",
            fromInventory: true,
          },
        ],
      },
    ],
  },
  {
    id: "CAP-2540015",
    kode: "2540015",
    nama: "Pengadaan Peralatan Bongkar Muat",
    thn_rkap_awal: 2026,
    thn_rkap_akhir: 2026,
    nilai_rkap: 12000000000,
    pekerjaan: [],
  },
  {
    id: "CAP-2540020",
    kode: "2540020",
    nama: "Standarisasi Perangkat IT Kantor",
    thn_rkap_awal: 2026,
    thn_rkap_akhir: 2027,
    nilai_rkap: 2500000000,
    pekerjaan: [
      {
        id: "PKJ-004",
        nm_pekerjaan: "Pengadaan PC & Laptop Karyawan",
        nilai_rab: 500000000,
        nilai_kontrak: 480000000,
        no_pr: "PR/2026/020",
        no_po: "PO/2026/020",
        no_kontrak: "KTR/IT/2026/020",
        tgl_kontrak: "2026-02-10",
        durasi_kontrak: 45,
        no_sp3: "",
        tgl_sp3: "",
        tgl_bamk: "",
        assets: [
          {
            id: "A5",
            asset_code: "AST-PCU-0001",
            name: "PC Unit Workstation",
            brand: "HP",
            model: "EliteDesk 800 G6",
            serial_number: "",
            nilai_aset: 18500000,
            procurement_date: "2026-03-01",
            fromInventory: true,
          },
        ],
      },
    ],
  },
  {
    id: "CAP-2540025",
    kode: "2540025",
    nama: "Pembangunan Sistem CCTV & Keamanan",
    thn_rkap_awal: 2026,
    thn_rkap_akhir: 2026,
    nilai_rkap: 1800000000,
    pekerjaan: [],
  },
];

const fmt = (n) => new Intl.NumberFormat("id-ID").format(n || 0);
const emptyProject = () => ({
  id: `p-${Date.now()}-${Math.random()}`,
  nm_pekerjaan: "",
  nilai_rab: "",
  nilai_kontrak: "",
  no_pr: "",
  no_po: "",
  no_kontrak: "",
  tgl_kontrak: new Date().toISOString().split("T")[0],
  durasi_kontrak: "",
  no_sp3: "",
  tgl_sp3: "",
  tgl_bamk: "",
  assets: [],
});

// ═══════════════════════════════════════════════════════════════
// Dialog konfirmasi hapus
// ═══════════════════════════════════════════════════════════════
function ConfirmDialog({ message, onConfirm, onCancel }) {
  return (
    <div className="bi-confirm-overlay" onClick={onCancel}>
      <div className="bi-confirm-box" onClick={(e) => e.stopPropagation()}>
        <div className="bi-confirm-icon">
          <AlertTriangle size={26} />
        </div>
        <p className="bi-confirm-msg">{message}</p>
        <div className="bi-confirm-actions">
          <button className="bi-btn bi-btn-secondary" onClick={onCancel}>
            Batal
          </button>
          <button className="bi-btn bi-btn-danger" onClick={onConfirm}>
            <Trash2 size={14} /> Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Dropdown pencarian aset dari inventory
// ═══════════════════════════════════════════════════════════════
function AsetSearchDropdown({
  onSelect,
  existingCodes = [],
  label = "Pilih dari inventory aset…",
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const filtered = inventoryAset.filter(
    (a) =>
      !existingCodes.includes(a.kode) &&
      (a.nama.toLowerCase().includes(q.toLowerCase()) ||
        a.kode.toLowerCase().includes(q.toLowerCase()) ||
        a.brand.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="bi-aset-search-wrap">
      <div
        className={`bi-aset-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <Search size={14} />
        <span>{label}</span>
        <ChevronDown
          size={14}
          className={`bi-chevron ${open ? "flipped" : ""}`}
        />
      </div>
      {open && (
        <>
          <div
            className="bi-aset-overlay"
            onClick={() => {
              setOpen(false);
              setQ("");
            }}
          />
          <div className="bi-aset-dropdown">
            <div className="bi-aset-search-input">
              <Search size={13} />
              <input
                autoFocus
                placeholder="Cari kode, nama, atau brand…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <div className="bi-aset-list-scroll">
              {filtered.length === 0 ? (
                <div className="bi-aset-empty">Tidak ada aset yang cocok</div>
              ) : (
                filtered.map((a) => (
                  <div
                    key={a.kode}
                    className="bi-aset-option"
                    onClick={() => {
                      onSelect(a);
                      setOpen(false);
                      setQ("");
                    }}
                  >
                    <div className="bi-aset-option-top">
                      <code className="bi-aset-code">{a.kode}</code>
                      <span className="bi-aset-option-name">{a.nama}</span>
                    </div>
                    <div className="bi-aset-option-sub">
                      <span>
                        {a.brand} / {a.model}
                      </span>
                      <span className="bi-aset-nilai">
                        Rp {fmt(a.nilai_aset)}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Dropdown Mata Anggaran OPEX
// ═══════════════════════════════════════════════════════════════
function MataAnggaranDropdown({
  selectedId,
  onSelect,
  customMasters,
  onAddCustom,
  deletedIds,
  onDeleteMaster,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [form, setForm] = useState({ kode: "", nama: "", nilai_kontrak: "" });

  const allMasters = [...defaultOpexMasters, ...customMasters].filter(
    (m) => !deletedIds.includes(m.id),
  );
  const selected = allMasters.find((m) => m.id === selectedId);
  const filtered = allMasters.filter(
    (m) =>
      m.nama.toLowerCase().includes(q.toLowerCase()) ||
      m.kode.toLowerCase().includes(q.toLowerCase()),
  );

  const handleAdd = () => {
    if (!form.nama) return;
    const id = form.kode || `CST-${Date.now()}`;
    onAddCustom({
      id,
      kode: form.kode || `OPX-CST-${String(Date.now()).slice(-4)}`,
      nama: form.nama,
      nilai_kontrak: parseFloat(form.nilai_kontrak) || 0,
      aset: [],
      isCustom: true,
    });
    onSelect(id);
    setOpen(false);
    setShowForm(false);
    setForm({ kode: "", nama: "", nilai_kontrak: "" });
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    if (pendingDeleteId === selectedId) onSelect(null);
    onDeleteMaster(pendingDeleteId);
    setPendingDeleteId(null);
  };

  const pendingItem = pendingDeleteId
    ? [...defaultOpexMasters, ...customMasters].find(
        (m) => m.id === pendingDeleteId,
      )
    : null;

  return (
    <div className="bi-aset-search-wrap">
      {pendingDeleteId && (
        <div
          className="bi-confirm-overlay"
          onClick={() => setPendingDeleteId(null)}
        >
          <div className="bi-confirm-box" onClick={(e) => e.stopPropagation()}>
            <div className="bi-confirm-icon">
              <AlertTriangle size={26} />
            </div>
            <p className="bi-confirm-msg">
              Hapus mata anggaran{" "}
              <strong>
                "{pendingItem?.kode} — {pendingItem?.nama}"
              </strong>{" "}
              dari daftar?
              {pendingItem?.aset?.length > 0 && (
                <span
                  style={{
                    display: "block",
                    marginTop: 6,
                    color: "#ef4444",
                    fontSize: "0.82rem",
                  }}
                >
                  ⚠ Mata anggaran ini memiliki {pendingItem.aset.length} aset
                  terdaftar.
                </span>
              )}
            </p>
            <div className="bi-confirm-actions">
              <button
                className="bi-btn bi-btn-secondary"
                onClick={() => setPendingDeleteId(null)}
              >
                Batal
              </button>
              <button
                className="bi-btn bi-btn-danger"
                onClick={handleConfirmDelete}
              >
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {selected ? (
        <div className="bi-mata-selected">
          <div className="bi-mata-selected-info">
            <div className="bi-mata-selected-top">
              <code className="bi-aset-code">{selected.kode}</code>
              <span className="bi-mata-selected-nama">{selected.nama}</span>
              {selected.isCustom && (
                <span className="bi-custom-badge">Custom</span>
              )}
              {selected.aset?.length > 0 && (
                <span className="bi-loaded-mini">
                  {selected.aset.length} aset
                </span>
              )}
            </div>
            {selected.nilai_kontrak > 0 && (
              <div className="bi-mata-selected-meta">
                Nilai Kontrak:{" "}
                <strong style={{ color: "#dc2626" }}>
                  Rp {fmt(selected.nilai_kontrak)}
                </strong>
              </div>
            )}
          </div>
          <button className="bi-btn-change" onClick={() => onSelect(null)}>
            Ganti
          </button>
        </div>
      ) : (
        <>
          <div
            className={`bi-aset-trigger ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <Search size={14} />
            <span>-- Pilih Mata Anggaran --</span>
            <ChevronDown
              size={14}
              className={`bi-chevron ${open ? "flipped" : ""}`}
            />
          </div>
          {open && (
            <>
              <div
                className="bi-aset-overlay"
                onClick={() => {
                  setOpen(false);
                  setShowForm(false);
                }}
              />
              <div className="bi-aset-dropdown">
                <div className="bi-aset-search-input">
                  <Search size={13} />
                  <input
                    autoFocus
                    placeholder="Cari kode atau nama mata anggaran…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
                <div className="bi-aset-list-scroll">
                  {filtered.map((m) => (
                    <div
                      key={m.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 10px 10px 14px",
                        borderBottom: "1px solid #f1f5f9",
                        cursor: "pointer",
                        transition: "background 0.15s",
                        gap: 8,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#eff6ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "transparent")
                      }
                      onClick={() => {
                        onSelect(m.id);
                        setOpen(false);
                      }}
                    >
                      <div
                        style={{
                          flex: 1,
                          minWidth: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: 3,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            flexWrap: "wrap",
                          }}
                        >
                          <code className="bi-aset-code">{m.kode}</code>
                          <span
                            style={{
                              fontWeight: 600,
                              fontSize: "0.84rem",
                              color: "#0f172a",
                            }}
                          >
                            {m.nama}
                          </span>
                          {m.isCustom && (
                            <span className="bi-custom-badge">Custom</span>
                          )}
                          {m.aset?.length > 0 && (
                            <span className="bi-loaded-mini">
                              {m.aset.length} aset terdaftar
                            </span>
                          )}
                        </div>
                        {m.nilai_kontrak > 0 && (
                          <div
                            style={{ fontSize: "0.75rem", color: "#64748b" }}
                          >
                            Nilai Kontrak:{" "}
                            <span style={{ color: "#dc2626", fontWeight: 700 }}>
                              Rp {fmt(m.nilai_kontrak)}
                            </span>
                          </div>
                        )}
                      </div>
                      <button
                        title="Hapus dari daftar"
                        style={{
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 34,
                          height: 34,
                          borderRadius: 8,
                          border: "1px solid #fca5a5",
                          background: "#fee2e2",
                          color: "#dc2626",
                          cursor: "pointer",
                          transition: "all 0.15s",
                          fontSize: "16px",
                          lineHeight: 1,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#dc2626";
                          e.currentTarget.style.color = "#ffffff";
                          e.currentTarget.style.borderColor = "#dc2626";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#fee2e2";
                          e.currentTarget.style.color = "#dc2626";
                          e.currentTarget.style.borderColor = "#fca5a5";
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          setPendingDeleteId(m.id);
                        }}
                      >
                        🗑
                      </button>
                    </div>
                  ))}
                </div>
                {!showForm ? (
                  <div
                    className="bi-add-custom-row"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus size={13} /> Tambah mata anggaran baru (tidak ada di
                    daftar)
                  </div>
                ) : (
                  <div className="bi-custom-form">
                    <div className="bi-custom-form-title">
                      Tambah Mata Anggaran Custom
                    </div>
                    <div className="bi-custom-field">
                      <label className="bi-custom-label">Kode</label>
                      <input
                        placeholder="OPX-CST-001 (opsional)"
                        value={form.kode}
                        onChange={(e) =>
                          setForm({ ...form, kode: e.target.value })
                        }
                      />
                    </div>
                    <div className="bi-custom-field">
                      <label className="bi-custom-label">
                        Nama Mata Anggaran <span className="bi-req">*</span>
                      </label>
                      <input
                        placeholder="Nama mata anggaran"
                        value={form.nama}
                        onChange={(e) =>
                          setForm({ ...form, nama: e.target.value })
                        }
                      />
                    </div>
                    <div className="bi-custom-field">
                      <label className="bi-custom-label">
                        Nilai Kontrak (IDR)
                      </label>
                      <input
                        type="number"
                        placeholder="0"
                        value={form.nilai_kontrak}
                        onChange={(e) =>
                          setForm({ ...form, nilai_kontrak: e.target.value })
                        }
                      />
                    </div>
                    <div className="bi-custom-form-actions">
                      <button
                        className="bi-btn-add"
                        onClick={handleAdd}
                        style={{ padding: "6px 14px", fontSize: ".75rem" }}
                      >
                        <Plus size={13} /> Tambah
                      </button>
                      <button
                        className="bi-btn bi-btn-secondary"
                        onClick={() => setShowForm(false)}
                        style={{ padding: "6px 12px", fontSize: ".75rem" }}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Dropdown Pos Anggaran CAPEX
// ═══════════════════════════════════════════════════════════════
function AnggaranCapexDropdown({
  selectedId,
  onSelect,
  customCapexMasters,
  onAddCustom,
  deletedIds,
  onDeleteMaster,
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);
  const [form, setForm] = useState({
    kode: "",
    nama: "",
    thn_rkap_awal: new Date().getFullYear(),
    thn_rkap_akhir: new Date().getFullYear() + 1,
    nilai_rkap: "",
  });

  const allCapex = [...defaultCapexMasters, ...customCapexMasters].filter(
    (c) => !deletedIds.includes(c.id),
  );
  const selected = allCapex.find((c) => c.id === selectedId);
  const filtered = allCapex.filter(
    (c) =>
      c.nama.toLowerCase().includes(q.toLowerCase()) ||
      c.kode.toLowerCase().includes(q.toLowerCase()),
  );

  const handleAdd = () => {
    if (!form.nama || !form.kode) return;
    const id = `CAP-CST-${Date.now()}`;
    onAddCustom({
      id,
      kode: form.kode,
      nama: form.nama,
      thn_rkap_awal: parseInt(form.thn_rkap_awal),
      thn_rkap_akhir: parseInt(form.thn_rkap_akhir),
      nilai_rkap: parseFloat(form.nilai_rkap) || 0,
      pekerjaan: [],
      isCustom: true,
    });
    onSelect(id);
    setOpen(false);
    setShowForm(false);
    setForm({
      kode: "",
      nama: "",
      thn_rkap_awal: new Date().getFullYear(),
      thn_rkap_akhir: new Date().getFullYear() + 1,
      nilai_rkap: "",
    });
  };

  const handleConfirmDelete = () => {
    if (!pendingDeleteId) return;
    // Jika yang dihapus sedang terpilih, reset pilihan
    if (pendingDeleteId === selectedId) onSelect(null);
    onDeleteMaster(pendingDeleteId);
    setPendingDeleteId(null);
  };

  // Item yang mau dihapus (untuk tampil nama di konfirmasi)
  const pendingItem = pendingDeleteId
    ? [...defaultCapexMasters, ...customCapexMasters].find(
        (c) => c.id === pendingDeleteId,
      )
    : null;

  return (
    <div className="bi-aset-search-wrap">
      {/* Mini confirm inline di dalam dropdown */}
      {pendingDeleteId && (
        <div
          className="bi-confirm-overlay"
          onClick={() => setPendingDeleteId(null)}
        >
          <div className="bi-confirm-box" onClick={(e) => e.stopPropagation()}>
            <div className="bi-confirm-icon">
              <AlertTriangle size={26} />
            </div>
            <p className="bi-confirm-msg">
              Hapus pos anggaran{" "}
              <strong>
                "{pendingItem?.kode} — {pendingItem?.nama}"
              </strong>{" "}
              dari daftar?
              {pendingItem?.pekerjaan?.length > 0 && (
                <span
                  style={{
                    display: "block",
                    marginTop: 6,
                    color: "#ef4444",
                    fontSize: "0.82rem",
                  }}
                >
                  ⚠ Pos ini memiliki {pendingItem.pekerjaan.length} pekerjaan
                  terdaftar.
                </span>
              )}
            </p>
            <div className="bi-confirm-actions">
              <button
                className="bi-btn bi-btn-secondary"
                onClick={() => setPendingDeleteId(null)}
              >
                Batal
              </button>
              <button
                className="bi-btn bi-btn-danger"
                onClick={handleConfirmDelete}
              >
                <Trash2 size={14} /> Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {selected ? (
        <div className="bi-mata-selected bi-mata-selected--capex">
          <div className="bi-mata-selected-info">
            <div className="bi-mata-selected-top">
              <code className="bi-aset-code bi-aset-code--capex">
                {selected.kode}
              </code>
              <span className="bi-mata-selected-nama">{selected.nama}</span>
              {selected.isCustom && (
                <span className="bi-custom-badge bi-custom-badge--capex">
                  Custom
                </span>
              )}
              {selected.pekerjaan?.length > 0 && (
                <span className="bi-loaded-mini bi-loaded-mini--capex">
                  {selected.pekerjaan.length} pekerjaan
                </span>
              )}
            </div>
            <div className="bi-mata-selected-meta">
              <span>
                RKAP {selected.thn_rkap_awal}–{selected.thn_rkap_akhir}
              </span>
              <span className="bi-mata-selected-nilai">
                Rp {fmt(selected.nilai_rkap)}
              </span>
            </div>
          </div>
          <button className="bi-btn-change" onClick={() => onSelect(null)}>
            Ganti
          </button>
        </div>
      ) : (
        <>
          <div
            className={`bi-aset-trigger bi-aset-trigger--capex ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
          >
            <Search size={14} />
            <span>-- Pilih Pos Anggaran CAPEX --</span>
            <ChevronDown
              size={14}
              className={`bi-chevron ${open ? "flipped" : ""}`}
            />
          </div>
          {open && (
            <>
              <div
                className="bi-aset-overlay"
                onClick={() => {
                  setOpen(false);
                  setShowForm(false);
                }}
              />
              <div className="bi-aset-dropdown">
                <div className="bi-aset-search-input">
                  <Search size={13} />
                  <input
                    autoFocus
                    placeholder="Cari kode atau nama anggaran CAPEX…"
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                  />
                </div>
                <div className="bi-aset-list-scroll">
                  {filtered.length === 0 ? (
                    <div className="bi-aset-empty">Tidak ada yang cocok</div>
                  ) : (
                    filtered.map((c) => (
                      <div
                        key={c.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          padding: "10px 10px 10px 14px",
                          borderBottom: "1px solid #f1f5f9",
                          cursor: "pointer",
                          transition: "background 0.15s",
                          gap: 8,
                        }}
                        className="bi-aset-option-row"
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#eff6ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "transparent")
                        }
                        onClick={() => {
                          onSelect(c.id);
                          setOpen(false);
                        }}
                      >
                        {/* Konten utama */}
                        <div
                          style={{
                            flex: 1,
                            minWidth: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 6,
                              flexWrap: "wrap",
                            }}
                          >
                            <code className="bi-aset-code bi-aset-code--capex">
                              {c.kode}
                            </code>
                            <span
                              style={{
                                fontWeight: 600,
                                fontSize: "0.84rem",
                                color: "#0f172a",
                              }}
                            >
                              {c.nama}
                            </span>
                            {c.isCustom && (
                              <span className="bi-custom-badge bi-custom-badge--capex">
                                Custom
                              </span>
                            )}
                            {c.pekerjaan?.length > 0 && (
                              <span className="bi-loaded-mini bi-loaded-mini--capex">
                                {c.pekerjaan.length} pekerjaan
                              </span>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              gap: 14,
                              fontSize: "0.75rem",
                              color: "#64748b",
                            }}
                          >
                            <span>
                              RKAP {c.thn_rkap_awal}–{c.thn_rkap_akhir}
                            </span>
                            <span style={{ color: "#dc2626", fontWeight: 700 }}>
                              Rp {fmt(c.nilai_rkap)}
                            </span>
                          </div>
                        </div>
                        {/* Tombol hapus */}
                        <button
                          title="Hapus dari daftar"
                          style={{
                            flexShrink: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 34,
                            height: 34,
                            borderRadius: 8,
                            border: "1px solid #fca5a5",
                            background: "#fee2e2",
                            color: "#dc2626",
                            cursor: "pointer",
                            transition: "all 0.15s",
                            fontSize: "16px",
                            lineHeight: 1,
                            fontFamily: "sans-serif",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = "#dc2626";
                            e.currentTarget.style.color = "#ffffff";
                            e.currentTarget.style.borderColor = "#dc2626";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = "#fee2e2";
                            e.currentTarget.style.color = "#dc2626";
                            e.currentTarget.style.borderColor = "#fca5a5";
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPendingDeleteId(c.id);
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    ))
                  )}
                </div>
                {!showForm ? (
                  <div
                    className="bi-add-custom-row bi-add-custom-row--capex"
                    onClick={() => setShowForm(true)}
                  >
                    <Plus size={13} /> Tambah pos anggaran CAPEX baru (tidak ada
                    di daftar)
                  </div>
                ) : (
                  <div className="bi-custom-form bi-custom-form--capex">
                    <div className="bi-custom-form-title">
                      Tambah Pos Anggaran CAPEX Baru
                    </div>
                    <div className="bi-custom-form-grid">
                      <div className="bi-custom-field">
                        <label className="bi-custom-label">
                          Kode Anggaran CAPEX <span className="bi-req">*</span>
                        </label>
                        <input
                          placeholder="Contoh: 2540011"
                          value={form.kode}
                          onChange={(e) =>
                            setForm({ ...form, kode: e.target.value })
                          }
                        />
                      </div>
                      <div
                        className="bi-custom-field"
                        style={{ gridColumn: "1/-1" }}
                      >
                        <label className="bi-custom-label">
                          Nama Anggaran CAPEX <span className="bi-req">*</span>
                        </label>
                        <input
                          placeholder="Contoh: Transformasi dan Digitalisasi..."
                          value={form.nama}
                          onChange={(e) =>
                            setForm({ ...form, nama: e.target.value })
                          }
                        />
                      </div>
                      <div className="bi-custom-field">
                        <label className="bi-custom-label">
                          Tahun RKAP Awal
                        </label>
                        <input
                          type="number"
                          value={form.thn_rkap_awal}
                          onChange={(e) =>
                            setForm({ ...form, thn_rkap_awal: e.target.value })
                          }
                        />
                      </div>
                      <div className="bi-custom-field">
                        <label className="bi-custom-label">
                          Tahun RKAP Akhir
                        </label>
                        <input
                          type="number"
                          value={form.thn_rkap_akhir}
                          onChange={(e) =>
                            setForm({ ...form, thn_rkap_akhir: e.target.value })
                          }
                        />
                      </div>
                      <div
                        className="bi-custom-field"
                        style={{ gridColumn: "1/-1" }}
                      >
                        <label className="bi-custom-label">
                          Nilai Anggaran RKAP (IDR)
                        </label>
                        <input
                          type="number"
                          placeholder="Contoh: 3000000000"
                          value={form.nilai_rkap}
                          onChange={(e) =>
                            setForm({ ...form, nilai_rkap: e.target.value })
                          }
                        />
                        {form.nilai_rkap && (
                          <span className="bi-custom-form-hint">
                            ≈ Rp {fmt(form.nilai_rkap)}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="bi-custom-form-actions">
                      <button
                        className="bi-btn-add"
                        onClick={handleAdd}
                        style={{ padding: "6px 14px", fontSize: ".75rem" }}
                      >
                        <Plus size={13} /> Tambah
                      </button>
                      <button
                        className="bi-btn bi-btn-secondary"
                        onClick={() => setShowForm(false)}
                        style={{ padding: "6px 12px", fontSize: ".75rem" }}
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// KOMPONEN UTAMA
// ═══════════════════════════════════════════════════════════════
const BudgetInput = () => {
  const navigate = useNavigate();
  const [budgetType, setBudgetType] = useState("opex");
  const [step, setStep] = useState(1);
  const [confirm, setConfirm] = useState(null); // { message, onConfirm }

  const [customMasters, setCustomMasters] = useState([]);
  const [deletedOpexIds, setDeletedOpexIds] = useState([]);
  const handleDeleteOpexMaster = (id) =>
    setDeletedOpexIds((prev) => [...prev, id]);
  const [customCapexMasters, setCustomCapexMasters] = useState([]);
  const [deletedCapexIds, setDeletedCapexIds] = useState([]);

  const handleDeleteCapexMaster = (id) => {
    setDeletedCapexIds((prev) => [...prev, id]);
  };

  // ── OPEX ─────────────────────────────────────────────────────
  const [selectedOpexId, setSelectedOpexId] = useState(null);
  const [opexTahun, setOpexTahun] = useState(new Date().getFullYear());
  const [opexNilaiKontrak, setOpexNilaiKontrak] = useState("");
  const [opexAssets, setOpexAssets] = useState([]);

  // ── CAPEX ─────────────────────────────────────────────────────
  const [selectedCapexId, setSelectedCapexId] = useState(null);
  const [capexTahun, setCapexTahun] = useState(new Date().getFullYear());
  const [capexProjects, setCapexProjects] = useState([]);

  // ── Derived ───────────────────────────────────────────────────
  const allMasters = [...defaultOpexMasters, ...customMasters].filter(
    (m) => !deletedOpexIds.includes(m.id),
  );
  const selectedOpexMaster = allMasters.find((m) => m.id === selectedOpexId);

  const allCapexMasters = [
    ...defaultCapexMasters,
    ...customCapexMasters,
  ].filter((c) => !deletedCapexIds.includes(c.id));
  const selectedCapexMaster = allCapexMasters.find(
    (c) => c.id === selectedCapexId,
  );

  const isExistingOpex = selectedOpexMaster && !selectedOpexMaster.isCustom;
  const isExistingCapex =
    selectedCapexMaster &&
    !selectedCapexMaster.isCustom &&
    selectedCapexMaster.pekerjaan?.length > 0;

  // ── Select OPEX → auto-fill nilai kontrak & aset ─────────────
  const handleSelectOpex = (id) => {
    setSelectedOpexId(id);
    if (!id) {
      setOpexNilaiKontrak("");
      setOpexAssets([]);
      return;
    }
    const master = allMasters.find((m) => m.id === id);
    setOpexNilaiKontrak(
      master?.nilai_kontrak > 0 ? String(master.nilai_kontrak) : "",
    );
    setOpexAssets(
      master?.aset?.length > 0 ? master.aset.map((a) => ({ ...a })) : [],
    );
  };

  // ── Select CAPEX → auto-fill pekerjaan ───────────────────────
  const handleSelectCapex = (id) => {
    setSelectedCapexId(id);
    if (!id) {
      setCapexProjects([]);
      return;
    }
    const master = allCapexMasters.find((c) => c.id === id);
    setCapexProjects(
      master?.pekerjaan?.length > 0
        ? master.pekerjaan.map((p) => ({
            ...p,
            assets: p.assets.map((a) => ({ ...a })),
          }))
        : [emptyProject()],
    );
  };

  // ── OPEX aset handlers ────────────────────────────────────────
  const addOpexFromInventory = (aset) => {
    if (opexAssets.find((a) => a.asset_code === aset.kode)) return;
    setOpexAssets([
      ...opexAssets,
      {
        id: `oa-${Date.now()}`,
        asset_code: aset.kode,
        name: aset.nama,
        brand: aset.brand,
        model: aset.model,
        nilai_aset: aset.nilai_aset,
        procurement_date: new Date().toISOString().split("T")[0],
        fromInventory: true,
      },
    ]);
  };
  const addOpexManual = () =>
    setOpexAssets([
      ...opexAssets,
      {
        id: `oa-${Date.now()}`,
        asset_code: "",
        name: "",
        brand: "",
        model: "",
        nilai_aset: "",
        procurement_date: new Date().toISOString().split("T")[0],
        fromInventory: false,
      },
    ]);
  const updateOpexAsset = (id, field, val) =>
    setOpexAssets(
      opexAssets.map((a) => (a.id === id ? { ...a, [field]: val } : a)),
    );
  const doRemoveOpexAsset = (id) =>
    setOpexAssets(opexAssets.filter((a) => a.id !== id));
  const askRemoveOpexAsset = (a) =>
    setConfirm({
      message: `Hapus aset "${a.name || a.asset_code || "ini"}" dari daftar?`,
      onConfirm: () => {
        doRemoveOpexAsset(a.id);
        setConfirm(null);
      },
    });

  // ── CAPEX project handlers ────────────────────────────────────
  const addCapexProject = () =>
    setCapexProjects([...capexProjects, emptyProject()]);
  const updateCapexProject = (id, field, val) =>
    setCapexProjects(
      capexProjects.map((p) => (p.id === id ? { ...p, [field]: val } : p)),
    );
  const doRemoveProject = (id) =>
    setCapexProjects(capexProjects.filter((p) => p.id !== id));
  const askRemoveProject = (p) =>
    setConfirm({
      message: `Hapus pekerjaan "${p.nm_pekerjaan || "ini"}" beserta semua asetnya?`,
      onConfirm: () => {
        doRemoveProject(p.id);
        setConfirm(null);
      },
    });

  // ── CAPEX aset handlers ───────────────────────────────────────
  const addCapexFromInventory = (projId, aset) => {
    setCapexProjects(
      capexProjects.map((p) =>
        p.id === projId && !p.assets.find((a) => a.asset_code === aset.kode)
          ? {
              ...p,
              assets: [
                ...p.assets,
                {
                  id: `ca-${Date.now()}`,
                  asset_code: aset.kode,
                  name: aset.nama,
                  brand: aset.brand,
                  model: aset.model,
                  serial_number: "",
                  nilai_aset: aset.nilai_aset,
                  procurement_date: new Date().toISOString().split("T")[0],
                  fromInventory: true,
                },
              ],
            }
          : p,
      ),
    );
  };
  const addCapexManual = (projId) => {
    setCapexProjects(
      capexProjects.map((p) =>
        p.id === projId
          ? {
              ...p,
              assets: [
                ...p.assets,
                {
                  id: `ca-${Date.now()}`,
                  asset_code: "",
                  name: "",
                  brand: "",
                  model: "",
                  serial_number: "",
                  nilai_aset: "",
                  procurement_date: new Date().toISOString().split("T")[0],
                  fromInventory: false,
                },
              ],
            }
          : p,
      ),
    );
  };
  const updateCapexAsset = (projId, assetId, field, val) => {
    setCapexProjects(
      capexProjects.map((p) =>
        p.id === projId
          ? {
              ...p,
              assets: p.assets.map((a) =>
                a.id === assetId ? { ...a, [field]: val } : a,
              ),
            }
          : p,
      ),
    );
  };
  const doRemoveCapexAsset = (projId, assetId) => {
    setCapexProjects(
      capexProjects.map((p) =>
        p.id === projId
          ? { ...p, assets: p.assets.filter((a) => a.id !== assetId) }
          : p,
      ),
    );
  };
  const askRemoveCapexAsset = (projId, asset) =>
    setConfirm({
      message: `Hapus aset "${asset.name || asset.asset_code || "ini"}" dari pekerjaan ini?`,
      onConfirm: () => {
        doRemoveCapexAsset(projId, asset.id);
        setConfirm(null);
      },
    });

  // ── Summary ───────────────────────────────────────────────────
  const totalNilaiAsetOpex = opexAssets.reduce(
    (s, a) => s + parseFloat(a.nilai_aset || 0),
    0,
  );
  const nilaiKontrakOpex = parseFloat(opexNilaiKontrak || 0);
  const sisaOpex = nilaiKontrakOpex - totalNilaiAsetOpex;

  const totalKontrakCapex = capexProjects.reduce(
    (s, p) => s + parseFloat(p.nilai_kontrak || 0),
    0,
  );
  const nilaiRkapCapex = selectedCapexMaster?.nilai_rkap || 0;
  const sisaCapex = nilaiRkapCapex - totalKontrakCapex;

  const handleSubmit = () => {
    alert(`Data ${budgetType.toUpperCase()} berhasil disimpan!`);
    navigate("/budget");
  };

  // ─────────────────────────────────────────────────────────────
  return (
    <div className="bi-root">
      {confirm && (
        <ConfirmDialog
          message={confirm.message}
          onConfirm={confirm.onConfirm}
          onCancel={() => setConfirm(null)}
        />
      )}

      {/* Header */}
      <div className="bi-header">
        <div className="bi-header-left">
          <button className="bi-btn-back" onClick={() => navigate("/budget")}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1>Input Data Anggaran Baru</h1>
            <p>
              Tambah pos anggaran {budgetType === "opex" ? "OPEX" : "CAPEX"} dan
              realisasinya
            </p>
          </div>
        </div>
        <span className="bi-year-badge">
          Tahun: {budgetType === "opex" ? opexTahun : capexTahun}
        </span>
      </div>

      {/* Steps */}
      <div className="bi-steps">
        <div
          className={`bi-step ${step >= 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}
        >
          <div className="bi-step-num">
            {step > 1 ? <CheckCircle size={18} /> : "1"}
          </div>
          <span>Pilih Tipe Anggaran</span>
        </div>
        <div className="bi-step-line" />
        <div className={`bi-step ${step >= 2 ? "active" : ""}`}>
          <div className="bi-step-num">2</div>
          <span>Isi Data Anggaran</span>
        </div>
      </div>

      {/* ── STEP 1: Pilih Tipe ── */}
      {step === 1 && (
        <div className="bi-content">
          <div className="bi-type-cards">
            <div
              className={`bi-type-card ${budgetType === "opex" ? "selected" : ""}`}
              onClick={() => setBudgetType("opex")}
            >
              <div className="bi-type-icon opex">
                <Package size={32} />
              </div>
              <h3>OPEX</h3>
              <p>Anggaran Operasional</p>
              <ul>
                <li>Pemeliharaan &amp; Lisensi Software</li>
                <li>Jaringan &amp; Koneksi Data</li>
                <li>Sewa Peralatan &amp; Jasa</li>
              </ul>
            </div>
            <div
              className={`bi-type-card ${budgetType === "capex" ? "selected" : ""}`}
              onClick={() => setBudgetType("capex")}
            >
              <div className="bi-type-icon capex">
                <FileText size={32} />
              </div>
              <h3>CAPEX</h3>
              <p>Anggaran Investasi</p>
              <ul>
                <li>Pengadaan Infrastruktur IT</li>
                <li>Proyek Pembangunan</li>
                <li>Standarisasi Perangkat</li>
              </ul>
            </div>
          </div>
          <button className="bi-btn bi-btn-primary" onClick={() => setStep(2)}>
            Lanjut ke Isi Data{" "}
            <ArrowLeft size={16} style={{ transform: "rotate(180deg)" }} />
          </button>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          STEP 2 — OPEX
      ══════════════════════════════════════════════════════════ */}
      {step === 2 && budgetType === "opex" && (
        <div className="bi-content">
          {/* Form Pos Anggaran */}
          <div className="bi-form-card">
            <div className="bi-form-header">
              <FileText size={20} />
              <h2>Data Pos Anggaran OPEX</h2>
            </div>
            <div className="bi-form-group" style={{ marginBottom: 14 }}>
              <label>Mata Anggaran *</label>
              <MataAnggaranDropdown
                selectedId={selectedOpexId}
                onSelect={handleSelectOpex}
                customMasters={customMasters}
                onAddCustom={(o) => setCustomMasters([...customMasters, o])}
                deletedIds={deletedOpexIds}
                onDeleteMaster={handleDeleteOpexMaster}
              />
            </div>

            {selectedOpexMaster && (
              <>
                {/* Banner: data existing dimuat otomatis */}
                {isExistingOpex && selectedOpexMaster.aset?.length > 0 && (
                  <div className="bi-autofill-banner">
                    <CheckCircle size={15} />
                    <span>
                      Data existing dimuat otomatis — informasi di bawah terisi
                      dari sistem. Anda dapat mengedit nilai kontrak dan
                      menambah/menghapus aset.
                    </span>
                  </div>
                )}
                <div className="bi-form-grid">
                  <div className="bi-form-group">
                    <label>Tahun Anggaran *</label>
                    <input
                      type="number"
                      value={opexTahun}
                      onChange={(e) => setOpexTahun(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="bi-form-group">
                    <label>Nilai Kontrak (IDR) *</label>
                    <input
                      type="number"
                      value={opexNilaiKontrak}
                      onChange={(e) => setOpexNilaiKontrak(e.target.value)}
                      placeholder="500000000"
                    />
                    {opexNilaiKontrak && (
                      <span className="bi-helper">
                        ≈ Rp {fmt(opexNilaiKontrak)}
                      </span>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Daftar Aset */}
          {!selectedOpexId ? (
            <div className="bi-form-card">
              <div className="bi-no-anggaran-hint">
                <Package size={28} strokeWidth={1.2} />
                <span>
                  Pilih mata anggaran OPEX terlebih dahulu untuk melihat atau
                  menambah daftar aset
                </span>
              </div>
            </div>
          ) : (
            <div className="bi-form-card">
              <div className="bi-form-header">
                <Package size={20} />
                <h2>Daftar Aset Terealisasi ({opexAssets.length})</h2>
                <button
                  className="bi-btn-add bi-btn-add--sm"
                  onClick={addOpexManual}
                >
                  <Plus size={14} /> Input Manual
                </button>
              </div>

              <AsetSearchDropdown
                onSelect={addOpexFromInventory}
                existingCodes={opexAssets.map((a) => a.asset_code)}
              />

              {opexAssets.length === 0 && (
                <div
                  className="bi-capex-assets-empty"
                  style={{ marginTop: 12 }}
                >
                  <Package size={20} strokeWidth={1.4} />
                  <span>
                    Pilih dari inventory atau klik "Input Manual" untuk menambah
                    aset
                  </span>
                </div>
              )}

              {opexAssets.map((asset, idx) => (
                <div
                  key={asset.id}
                  className="bi-asset-item"
                  style={{ marginTop: 12 }}
                >
                  <div className="bi-asset-header">
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 10 }}
                    >
                      <span className="bi-asset-num">Aset #{idx + 1}</span>
                      {asset.fromInventory && (
                        <span className="bi-inventory-badge">
                          Dari Inventory
                        </span>
                      )}
                      {!asset.fromInventory && (
                        <span className="bi-manual-badge">Manual</span>
                      )}
                    </div>
                    <button
                      className="bi-btn-remove"
                      onClick={() => askRemoveOpexAsset(asset)}
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  </div>
                  <div className="bi-form-grid">
                    <div className="bi-form-group">
                      <label>Kode Aset *</label>
                      <input
                        value={asset.asset_code}
                        readOnly={asset.fromInventory}
                        className={asset.fromInventory ? "bi-readonly" : ""}
                        onChange={(e) =>
                          updateOpexAsset(
                            asset.id,
                            "asset_code",
                            e.target.value,
                          )
                        }
                        placeholder="AST-OPX-XXXX"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Tgl Pengadaan *</label>
                      <input
                        type="date"
                        value={asset.procurement_date}
                        onChange={(e) =>
                          updateOpexAsset(
                            asset.id,
                            "procurement_date",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="bi-form-group full">
                      <label>Nama Aset *</label>
                      <input
                        value={asset.name}
                        readOnly={asset.fromInventory}
                        className={asset.fromInventory ? "bi-readonly" : ""}
                        onChange={(e) =>
                          updateOpexAsset(asset.id, "name", e.target.value)
                        }
                        placeholder="Lisensi Software / Sewa Peralatan"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Brand</label>
                      <input
                        value={asset.brand}
                        readOnly={asset.fromInventory}
                        className={asset.fromInventory ? "bi-readonly" : ""}
                        onChange={(e) =>
                          updateOpexAsset(asset.id, "brand", e.target.value)
                        }
                        placeholder="Microsoft"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Model</label>
                      <input
                        value={asset.model}
                        readOnly={asset.fromInventory}
                        className={asset.fromInventory ? "bi-readonly" : ""}
                        onChange={(e) =>
                          updateOpexAsset(asset.id, "model", e.target.value)
                        }
                        placeholder="Office 365"
                      />
                    </div>
                    <div className="bi-form-group full">
                      <label>Nilai Aset (IDR) *</label>
                      <input
                        type="number"
                        value={asset.nilai_aset}
                        onChange={(e) =>
                          updateOpexAsset(
                            asset.id,
                            "nilai_aset",
                            e.target.value,
                          )
                        }
                        placeholder="15000000"
                        className={asset.fromInventory ? "bi-readonly" : ""}
                        readOnly={asset.fromInventory}
                      />
                      {asset.nilai_aset && (
                        <span className="bi-helper">
                          ≈ Rp {fmt(asset.nilai_aset)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="bi-summary">
                <div className="bi-summary-item">
                  <span>Nilai Kontrak</span>
                  <strong>Rp {fmt(nilaiKontrakOpex)}</strong>
                </div>
                <div className="bi-summary-item">
                  <span>Total Nilai Aset</span>
                  <strong className="text-red">
                    Rp {fmt(totalNilaiAsetOpex)}
                  </strong>
                </div>
                <div className="bi-summary-item">
                  <span>Sisa Anggaran</span>
                  <strong className={sisaOpex < 0 ? "text-red" : "text-green"}>
                    Rp {fmt(sisaOpex)}
                  </strong>
                </div>
              </div>
            </div>
          )}

          <div className="bi-actions">
            <button
              className="bi-btn bi-btn-secondary"
              onClick={() => setStep(1)}
            >
              <X size={16} /> Batal
            </button>
            <button className="bi-btn bi-btn-primary" onClick={handleSubmit}>
              <Save size={16} /> Simpan Data OPEX
            </button>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════
          STEP 2 — CAPEX
      ══════════════════════════════════════════════════════════ */}
      {step === 2 && budgetType === "capex" && (
        <div className="bi-content">
          {/* Pos Anggaran */}
          <div className="bi-form-card">
            <div className="bi-form-header">
              <FileText size={20} />
              <h2>Data Pos Anggaran CAPEX</h2>
            </div>
            <div className="bi-form-group" style={{ marginBottom: 14 }}>
              <label>Pos Anggaran CAPEX *</label>
              <AnggaranCapexDropdown
                selectedId={selectedCapexId}
                onSelect={handleSelectCapex}
                customCapexMasters={customCapexMasters}
                onAddCustom={(o) =>
                  setCustomCapexMasters([...customCapexMasters, o])
                }
                deletedIds={deletedCapexIds}
                onDeleteMaster={handleDeleteCapexMaster}
              />
            </div>

            {selectedCapexMaster && (
              <>
                {isExistingCapex && (
                  <div className="bi-autofill-banner bi-autofill-banner--capex">
                    <CheckCircle size={15} />
                    <span>
                      Data existing dimuat otomatis — informasi di bawah terisi
                      dari sistem. Anda dapat menambah/menghapus pekerjaan dan
                      aset.
                    </span>
                  </div>
                )}
                <div className="bi-form-grid">
                  <div className="bi-form-group">
                    <label>Kode Anggaran CAPEX</label>
                    <input
                      value={selectedCapexMaster.kode}
                      readOnly
                      className="bi-readonly"
                    />
                  </div>
                  <div className="bi-form-group">
                    <label>Tahun Anggaran *</label>
                    <input
                      type="number"
                      value={capexTahun}
                      onChange={(e) => setCapexTahun(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="bi-form-group full">
                    <label>Nama Anggaran CAPEX</label>
                    <input
                      value={selectedCapexMaster.nama}
                      readOnly
                      className="bi-readonly"
                    />
                  </div>
                  <div className="bi-form-group">
                    <label>Tahun RKAP Awal</label>
                    <input
                      value={selectedCapexMaster.thn_rkap_awal}
                      readOnly
                      className="bi-readonly"
                    />
                  </div>
                  <div className="bi-form-group">
                    <label>Tahun RKAP Akhir</label>
                    <input
                      value={selectedCapexMaster.thn_rkap_akhir}
                      readOnly
                      className="bi-readonly"
                    />
                  </div>
                  <div className="bi-form-group full">
                    <label>Nilai Anggaran RKAP (IDR)</label>
                    <input
                      value={fmt(selectedCapexMaster.nilai_rkap)}
                      readOnly
                      className="bi-readonly"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Daftar Pekerjaan */}
          {!selectedCapexId ? (
            <div className="bi-form-card">
              <div className="bi-no-anggaran-hint">
                <FileText size={28} strokeWidth={1.2} />
                <span>
                  Pilih pos anggaran CAPEX terlebih dahulu untuk melihat atau
                  menambah daftar pekerjaan
                </span>
              </div>
            </div>
          ) : (
            <div className="bi-form-card">
              <div className="bi-form-header">
                <FileText size={20} />
                <h2>Daftar Pekerjaan / Kontrak ({capexProjects.length})</h2>
                {isExistingCapex && (
                  <span className="bi-loaded-badge">
                    <CheckCircle size={12} /> Data existing dimuat otomatis
                  </span>
                )}
                <button className="bi-btn-add" onClick={addCapexProject}>
                  <Plus size={16} /> Tambah Pekerjaan
                </button>
              </div>

              {capexProjects.map((proj, idx) => (
                <div key={proj.id} className="bi-project-item">
                  <div className="bi-asset-header">
                    <span className="bi-asset-num">Pekerjaan #{idx + 1}</span>
                    <button
                      className="bi-btn-remove bi-btn-remove--danger"
                      onClick={() => askRemoveProject(proj)}
                    >
                      <Trash2 size={14} /> Hapus Pekerjaan
                    </button>
                  </div>

                  <div className="bi-form-grid">
                    <div className="bi-form-group full">
                      <label>Nama Pekerjaan *</label>
                      <textarea
                        rows="2"
                        value={proj.nm_pekerjaan}
                        onChange={(e) =>
                          updateCapexProject(
                            proj.id,
                            "nm_pekerjaan",
                            e.target.value,
                          )
                        }
                        placeholder="Pengadaan Server / Instalasi Network..."
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Nilai RAB (IDR)</label>
                      <input
                        type="number"
                        value={proj.nilai_rab}
                        onChange={(e) =>
                          updateCapexProject(
                            proj.id,
                            "nilai_rab",
                            e.target.value,
                          )
                        }
                        placeholder="850000000"
                      />
                      {proj.nilai_rab && (
                        <span className="bi-helper">
                          ≈ Rp {fmt(proj.nilai_rab)}
                        </span>
                      )}
                    </div>
                    <div className="bi-form-group">
                      <label>Nilai Kontrak (IDR) *</label>
                      <input
                        type="number"
                        value={proj.nilai_kontrak}
                        onChange={(e) =>
                          updateCapexProject(
                            proj.id,
                            "nilai_kontrak",
                            e.target.value,
                          )
                        }
                        placeholder="800000000"
                      />
                      {proj.nilai_kontrak && (
                        <span className="bi-helper">
                          ≈ Rp {fmt(proj.nilai_kontrak)}
                        </span>
                      )}
                    </div>
                    <div className="bi-form-group">
                      <label>No. PR</label>
                      <input
                        value={proj.no_pr}
                        onChange={(e) =>
                          updateCapexProject(proj.id, "no_pr", e.target.value)
                        }
                        placeholder="PR-IT-001-2026"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>No. PO</label>
                      <input
                        value={proj.no_po}
                        onChange={(e) =>
                          updateCapexProject(proj.id, "no_po", e.target.value)
                        }
                        placeholder="PO-IT-001-2026"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>No. Kontrak *</label>
                      <input
                        value={proj.no_kontrak}
                        onChange={(e) =>
                          updateCapexProject(
                            proj.id,
                            "no_kontrak",
                            e.target.value,
                          )
                        }
                        placeholder="SPK/IT/001/2026"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Tgl Kontrak *</label>
                      <input
                        type="date"
                        value={proj.tgl_kontrak}
                        onChange={(e) =>
                          updateCapexProject(
                            proj.id,
                            "tgl_kontrak",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Durasi (Hari)</label>
                      <input
                        type="number"
                        value={proj.durasi_kontrak}
                        onChange={(e) =>
                          updateCapexProject(
                            proj.id,
                            "durasi_kontrak",
                            e.target.value,
                          )
                        }
                        placeholder="90"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>No. SP3</label>
                      <input
                        value={proj.no_sp3}
                        onChange={(e) =>
                          updateCapexProject(proj.id, "no_sp3", e.target.value)
                        }
                        placeholder="KP.20.01/XX/X/X"
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Tgl SP3</label>
                      <input
                        type="date"
                        value={proj.tgl_sp3}
                        onChange={(e) =>
                          updateCapexProject(proj.id, "tgl_sp3", e.target.value)
                        }
                      />
                    </div>
                    <div className="bi-form-group">
                      <label>Tgl BA-MK</label>
                      <input
                        type="date"
                        value={proj.tgl_bamk}
                        onChange={(e) =>
                          updateCapexProject(
                            proj.id,
                            "tgl_bamk",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  </div>

                  {/* Daftar Aset per Pekerjaan */}
                  <div className="bi-capex-assets">
                    <div className="bi-capex-assets-header">
                      <div className="bi-capex-assets-title">
                        <Layers size={15} />
                        <span>Daftar Aset Pekerjaan #{idx + 1}</span>
                        <span className="bi-asset-count-badge">
                          {proj.assets.length} aset
                        </span>
                      </div>
                      <button
                        className="bi-btn-add bi-btn-add--sm"
                        onClick={() => addCapexManual(proj.id)}
                      >
                        <Plus size={14} /> Input Manual
                      </button>
                    </div>

                    <AsetSearchDropdown
                      onSelect={(aset) => addCapexFromInventory(proj.id, aset)}
                      existingCodes={proj.assets.map((a) => a.asset_code)}
                    />

                    {proj.assets.length === 0 ? (
                      <div
                        className="bi-capex-assets-empty"
                        style={{ marginTop: 10 }}
                      >
                        <Package size={20} strokeWidth={1.4} />
                        <span>
                          Pilih dari inventory atau klik "Input Manual" untuk
                          menambahkan aset
                        </span>
                      </div>
                    ) : (
                      proj.assets.map((asset, aIdx) => (
                        <div
                          key={asset.id}
                          className="bi-asset-item bi-asset-item--capex"
                          style={{ marginTop: 10 }}
                        >
                          <div className="bi-asset-header">
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                              }}
                            >
                              <span className="bi-asset-num bi-asset-num--capex">
                                Aset #{aIdx + 1}
                              </span>
                              {asset.fromInventory && (
                                <span className="bi-inventory-badge bi-inventory-badge--capex">
                                  Dari Inventory
                                </span>
                              )}
                              {!asset.fromInventory && (
                                <span className="bi-manual-badge">Manual</span>
                              )}
                            </div>
                            <button
                              className="bi-btn-remove"
                              onClick={() =>
                                askRemoveCapexAsset(proj.id, asset)
                              }
                            >
                              <Trash2 size={14} /> Hapus
                            </button>
                          </div>
                          <div className="bi-form-grid">
                            <div className="bi-form-group">
                              <label>Kode Aset *</label>
                              <input
                                value={asset.asset_code}
                                readOnly={asset.fromInventory}
                                className={
                                  asset.fromInventory ? "bi-readonly" : ""
                                }
                                onChange={(e) =>
                                  updateCapexAsset(
                                    proj.id,
                                    asset.id,
                                    "asset_code",
                                    e.target.value,
                                  )
                                }
                                placeholder="AST-CPX-XXXX"
                              />
                            </div>
                            <div className="bi-form-group">
                              <label>Tgl Pengadaan *</label>
                              <input
                                type="date"
                                value={asset.procurement_date}
                                onChange={(e) =>
                                  updateCapexAsset(
                                    proj.id,
                                    asset.id,
                                    "procurement_date",
                                    e.target.value,
                                  )
                                }
                              />
                            </div>
                            <div className="bi-form-group full">
                              <label>Nama Aset *</label>
                              <input
                                value={asset.name}
                                readOnly={asset.fromInventory}
                                className={
                                  asset.fromInventory ? "bi-readonly" : ""
                                }
                                onChange={(e) =>
                                  updateCapexAsset(
                                    proj.id,
                                    asset.id,
                                    "name",
                                    e.target.value,
                                  )
                                }
                                placeholder="Server / Switch / CCTV..."
                              />
                            </div>
                            <div className="bi-form-group">
                              <label>Brand</label>
                              <input
                                value={asset.brand}
                                readOnly={asset.fromInventory}
                                className={
                                  asset.fromInventory ? "bi-readonly" : ""
                                }
                                onChange={(e) =>
                                  updateCapexAsset(
                                    proj.id,
                                    asset.id,
                                    "brand",
                                    e.target.value,
                                  )
                                }
                                placeholder="Cisco"
                              />
                            </div>
                            <div className="bi-form-group">
                              <label>Model</label>
                              <input
                                value={asset.model}
                                readOnly={asset.fromInventory}
                                className={
                                  asset.fromInventory ? "bi-readonly" : ""
                                }
                                onChange={(e) =>
                                  updateCapexAsset(
                                    proj.id,
                                    asset.id,
                                    "model",
                                    e.target.value,
                                  )
                                }
                                placeholder="Catalyst 2960-X"
                              />
                            </div>
                            <div className="bi-form-group">
                              <label>Serial Number</label>
                              <input
                                value={asset.serial_number}
                                onChange={(e) =>
                                  updateCapexAsset(
                                    proj.id,
                                    asset.id,
                                    "serial_number",
                                    e.target.value,
                                  )
                                }
                                placeholder="SN-XXXX-XXXX"
                              />
                            </div>
                            <div className="bi-form-group">
                              <label>Nilai Aset (IDR)</label>
                              <input
                                type="number"
                                value={asset.nilai_aset}
                                readOnly={asset.fromInventory}
                                className={
                                  asset.fromInventory ? "bi-readonly" : ""
                                }
                                onChange={(e) =>
                                  updateCapexAsset(
                                    proj.id,
                                    asset.id,
                                    "nilai_aset",
                                    e.target.value,
                                  )
                                }
                                placeholder="0"
                              />
                              {asset.nilai_aset && (
                                <span className="bi-helper">
                                  ≈ Rp {fmt(asset.nilai_aset)}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}

                    {proj.assets.length > 0 && (
                      <div className="bi-project-asset-summary">
                        <span>Total Nilai Aset Pekerjaan #{idx + 1}:</span>
                        <strong className="text-blue">
                          Rp{" "}
                          {fmt(
                            proj.assets.reduce(
                              (s, a) => s + parseFloat(a.nilai_aset || 0),
                              0,
                            ),
                          )}
                        </strong>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="bi-summary">
                <div className="bi-summary-item">
                  <span>Total Pagu RKAP</span>
                  <strong>Rp {fmt(nilaiRkapCapex)}</strong>
                </div>
                <div className="bi-summary-item">
                  <span>Total Nilai Kontrak</span>
                  <strong className="text-red">
                    Rp {fmt(totalKontrakCapex)}
                  </strong>
                </div>
                <div className="bi-summary-item">
                  <span>Sisa Anggaran</span>
                  <strong className={sisaCapex < 0 ? "text-red" : "text-green"}>
                    Rp {fmt(sisaCapex)}
                  </strong>
                </div>
                <div className="bi-summary-item">
                  <span>Total Aset Terdaftar</span>
                  <strong className="text-blue">
                    {capexProjects.reduce((s, p) => s + p.assets.length, 0)}{" "}
                    aset
                  </strong>
                </div>
              </div>
            </div>
          )}

          <div className="bi-actions">
            <button
              className="bi-btn bi-btn-secondary"
              onClick={() => setStep(1)}
            >
              <X size={16} /> Batal
            </button>
            <button className="bi-btn bi-btn-primary" onClick={handleSubmit}>
              <Save size={16} /> Simpan Data CAPEX
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetInput;
