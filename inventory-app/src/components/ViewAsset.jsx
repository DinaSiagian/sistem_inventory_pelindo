import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaSearch,
  FaFilter,
  FaPlus,
  FaEllipsisV,
  FaFileDownload,
  FaTimes,
  FaSave,
  FaTrash,
  FaDatabase,
  FaMapMarkerAlt,
  FaCogs,
  FaInfoCircle,
  FaMagic,
  FaBarcode,
  FaBoxOpen,
  FaTools,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMoneyBillWave,
  FaEye,
  FaEdit,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaCalendarAlt,
  FaPrint,
  FaQrcode,
  FaAnchor,
  FaLayerGroup,
  FaShieldAlt,
  FaTag,
} from "react-icons/fa";
import "./ViewAsset.css";

const ITEMS_PER_PAGE = 8;

// ── MASTER DATA ──────────────────────────────────────────────────────────────
const ENTITAS_LIST = [
  { name: "Pelindo Multi Terminal", code: "SPMT" },
  { name: "PT Pelabuhan Indonesia", code: "PTP" },
  { name: "Indonesia Kendaraan Terminal", code: "IKT" },
];

const BRANCH_BY_ENTITY = {
  SPMT: [
    { name: "Belawan", code: "BLW" },
    { name: "Gresik", code: "GRK" },
    { name: "Lembar Badas", code: "LBR" },
    { name: "Tanjung Intan", code: "TJI" },
    { name: "Dumai", code: "DMI" },
    { name: "Sibolga", code: "SBG" },
    { name: "Janirah", code: "JNR" },
    { name: "Bagendang", code: "BGD" },
    { name: "Malahayati", code: "MLH" },
    { name: "Lhokseumawe", code: "LHK" },
    { name: "Tanjung Emas", code: "TJE" },
    { name: "Balikpapan", code: "BLP" },
    { name: "Bima Badas", code: "BDS" },
    { name: "Garongkong", code: "GRG" },
    { name: "Bumihajo", code: "BMH" },
    { name: "Meulaboh", code: "MLB" },
    { name: "Tanjung Wangi", code: "TJW" },
    { name: "Makassar", code: "MKS" },
    { name: "Trisakti", code: "BJM" },
    { name: "Parepare", code: "PRP" },
    { name: "Kuala Langsa", code: "KLS" },
  ],
  PTP: [
    { name: "Banten", code: "BTN" },
    { name: "Tanjung Pandan", code: "TPN" },
    { name: "Teluk Bayur", code: "TBR" },
    { name: "Bengkulu", code: "BKL" },
    { name: "Pontianak", code: "PTK" },
    { name: "Tanjung Priok", code: "TJP" },
    { name: "Cirebon", code: "CRB" },
    { name: "Panjang", code: "PJG" },
    { name: "Palembang", code: "PLB" },
    { name: "Jambi", code: "JMB" },
  ],
  IKT: [{ name: "Jakarta", code: "JKT" }],
};

const ZONA_LIST = [
  { name: "Gedung", code: "GDG" },
  { name: "Lapangan", code: "LPG" },
  { name: "Data Center", code: "DTC" },
  { name: "Gudang", code: "GDN" },
];

const SUBZONA_LIST = [
  { name: "Dermaga", code: "DMG" },
  { name: "Parkir", code: "PKR" },
  { name: "Jalan", code: "JLN" },
  { name: "Taman/Parkir", code: "TPK" },
];

// ── CODE128B BARCODE GENERATOR (pure canvas) ─────────────────────────────────
const C128 = {
  S_B: 104,
  STOP: 106,
  CH: " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~",
  P: [
    "11011001100",
    "11001101100",
    "11001100110",
    "10010011000",
    "10010001100",
    "10001001100",
    "10011001000",
    "10011000100",
    "10001100100",
    "11001001000",
    "11001000100",
    "11000100100",
    "10110011100",
    "10011011100",
    "10011001110",
    "10111001100",
    "10011101100",
    "10011100110",
    "11001110010",
    "11001011100",
    "11001001110",
    "11011100100",
    "11001110100",
    "11101101110",
    "11101001100",
    "11100101100",
    "11100100110",
    "11101100100",
    "11100110100",
    "11100110010",
    "11011011000",
    "11011000110",
    "11000110110",
    "10100011000",
    "10001011000",
    "10001000110",
    "10110001000",
    "10001101000",
    "10001100010",
    "11010001000",
    "11000101000",
    "11000100010",
    "10110111000",
    "10110001110",
    "10001101110",
    "10111011000",
    "10111000110",
    "10001110110",
    "11101110110",
    "11010001110",
    "11000101110",
    "11011101000",
    "11011100010",
    "11011101110",
    "11101011000",
    "11101000110",
    "11100010110",
    "11101101000",
    "11101100010",
    "11100011010",
    "11101111010",
    "11001000010",
    "11110001010",
    "10100110000",
    "10100001100",
    "10010110000",
    "10010000110",
    "10000101100",
    "10000100110",
    "10110010000",
    "10110000100",
    "10011010000",
    "10011000010",
    "10000110100",
    "10000110010",
    "11000010010",
    "11001010000",
    "11110111010",
    "11000010100",
    "10001111010",
    "10100111100",
    "10010111100",
    "10010011110",
    "10111100100",
    "10011110100",
    "10011110010",
    "11110100100",
    "11110010100",
    "11110010010",
    "11110110110",
    "11011110110",
    "11110110110",
    "10101111000",
    "10100011110",
    "10001011110",
    "10111101000",
    "10111100010",
    "11110101000",
    "11110100010",
    "10111011110",
    "10111101110",
    "11101011110",
    "11110101110",
    "11010000100",
    "11010010000",
    "11010011100",
    "1100011101011",
  ],
  encode(text) {
    let codes = [this.S_B],
      cs = this.S_B;
    for (let i = 0; i < text.length; i++) {
      const idx = this.CH.indexOf(text[i]);
      if (idx < 0) continue;
      codes.push(idx);
      cs += idx * (i + 1);
    }
    codes.push(cs % 103);
    codes.push(this.STOP);
    return codes.map((c) => this.P[c]).join("") + "11";
  },
};

function BarcodeCanvas({ value, width = 340, height = 64 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !value) return;
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const bars = C128.encode(value);
    const bw = Math.max(1, Math.floor(width / bars.length));
    canvas.width = bw * bars.length;
    canvas.height = height;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000";
    for (let i = 0; i < bars.length; i++)
      if (bars[i] === "1") ctx.fillRect(i * bw, 0, bw, height);
  }, [value, width, height]);
  return (
    <canvas
      ref={ref}
      style={{
        display: "block",
        maxWidth: "100%",
        imageRendering: "pixelated",
      }}
    />
  );
}

// ── BARCODE LABEL MODAL ───────────────────────────────────────────────────────
function BarcodeLabelModal({ asset, onClose, fmt, fmtDate }) {
  const handlePrint = () => {
    const w = window.open("", "_blank", "width=620,height=520");
    w.document
      .write(`<!DOCTYPE html><html><head><title>Label — ${asset.id}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Courier New',monospace;background:#f0f0f0;display:flex;justify-content:center;padding:30px}
.label{width:360px;background:#fff;border:2.5px solid #111;border-radius:10px;padding:18px 20px;box-shadow:0 4px 20px rgba(0,0,0,.15)}
.lh{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1.5px solid #111;padding-bottom:10px;margin-bottom:10px}
.lbrand{font-size:16px;font-weight:900;letter-spacing:3px;color:#000}
.lsub{font-size:8px;font-weight:700;color:#555;letter-spacing:1.5px;margin-top:2px}
.lstatus{border:1.5px solid #000;border-radius:4px;padding:3px 8px;font-size:8px;font-weight:900;letter-spacing:1px;text-transform:uppercase}
.lname{font-size:14px;font-weight:800;margin:8px 0 3px;color:#000;font-family:sans-serif}
.lid{font-size:10px;font-weight:700;color:#444;letter-spacing:.5px;margin-bottom:10px}
.lbar{text-align:center;border-top:1px dashed #ddd;border-bottom:1px dashed #ddd;padding:6px 0;margin:8px 0}
.lmeta{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:10px;border-top:1px solid #eee;padding-top:8px}
.mi label{display:block;font-size:7.5px;color:#888;text-transform:uppercase;letter-spacing:.4px;margin-bottom:1px}
.mi span{font-size:9.5px;font-weight:700;color:#111}
.lfoot{text-align:center;margin-top:10px;font-size:7px;color:#aaa;letter-spacing:.5px;border-top:1px dashed #ddd;padding-top:7px}
@media print{body{background:#fff;padding:0}.label{box-shadow:none}}
</style></head><body>
<div class="label">
  <div class="lh">
    <div><div class="lbrand">PELINDO</div><div class="lsub">ASSET MANAGEMENT SYSTEM</div></div>
    <span class="lstatus">${asset.status}</span>
  </div>
  <div class="lname">${asset.name}</div>
  <div class="lid">${asset.id}</div>
  <div class="lbar" id="bw"></div>
  <div class="lmeta">
    <div class="mi"><label>Entitas</label><span>${asset.entitas || "—"}</span></div>
    <div class="mi"><label>Cabang</label><span>${asset.branch}</span></div>
    <div class="mi"><label>Zona · Subzona</label><span>${asset.zona} · ${asset.subzona}</span></div>
    <div class="mi"><label>Kategori</label><span>${asset.category}</span></div>
    <div class="mi"><label>Budget</label><span>${asset.budgetType || "—"}</span></div>
    <div class="mi"><label>Tgl Pengadaan</label><span>${fmtDate(asset.procurementDate)}</span></div>
  </div>
  <div class="lfoot">SCAN BARCODE UNTUK VERIFIKASI ASET · ${new Date().getFullYear()}</div>
</div>
<script>
(function(){
const CH=' !"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\\]^_\`abcdefghijklmnopqrstuvwxyz{|}~';
const P=['11011001100','11001101100','11001100110','10010011000','10010001100','10001001100','10011001000','10011000100','10001100100','11001001000','11001000100','11000100100','10110011100','10011011100','10011001110','10111001100','10011101100','10011100110','11001110010','11001011100','11001001110','11011100100','11001110100','11101101110','11101001100','11100101100','11100100110','11101100100','11100110100','11100110010','11011011000','11011000110','11000110110','10100011000','10001011000','10001000110','10110001000','10001101000','10001100010','11010001000','11000101000','11000100010','10110111000','10110001110','10001101110','10111011000','10111000110','10001110110','11101110110','11010001110','11000101110','11011101000','11011100010','11011101110','11101011000','11101000110','11100010110','11101101000','11101100010','11100011010','11101111010','11001000010','11110001010','10100110000','10100001100','10010110000','10010000110','10000101100','10000100110','10110010000','10110000100','10011010000','10011000010','10000110100','10000110010','11000010010','11001010000','11110111010','11000010100','10001111010','10100111100','10010111100','10010011110','10111100100','10011110100','10011110010','11110100100','11110010100','11110010010','11110110110','11011110110','11110110110','10101111000','10100011110','10001011110','10111101000','10111100010','11110101000','11110100010','10111011110','10111101110','11101011110','11110101110','11010000100','11010010000','11010011100','1100011101011'];
const t="${asset.id}";
let c=[104],cs=104;
for(let i=0;i<t.length;i++){const x=CH.indexOf(t[i]);if(x<0)continue;c.push(x);cs+=x*(i+1);}
c.push(cs%103);c.push(106);
const bars=c.map(x=>P[x]).join('')+'11';
const cv=document.createElement('canvas');
const bw=Math.max(1,Math.floor(320/bars.length));
cv.width=bw*bars.length;cv.height=60;cv.style.width='100%';cv.style.height='auto';
const ctx=cv.getContext('2d');
ctx.fillStyle='#fff';ctx.fillRect(0,0,cv.width,cv.height);
ctx.fillStyle='#000';
for(let i=0;i<bars.length;i++){if(bars[i]==='1')ctx.fillRect(i*bw,0,bw,60);}
document.getElementById('bw').appendChild(cv);
setTimeout(()=>{window.print();},400);
})();
</script></body></html>`);
    w.document.close();
  };

  const sc = (s) =>
    s === "Tersedia"
      ? "tersedia"
      : s === "Dipinjam"
        ? "dipinjam"
        : "maintenance";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content barcode-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3>
            <FaBarcode /> Label Barcode Aset
          </h3>
          <button className="close-btn" onClick={onClose}>
            <FaTimes />
          </button>
        </div>
        <div className="barcode-modal-body">
          <div className="barcode-label-wrap">
            <div className="barcode-label-card">
              <div className="blc-header">
                <div>
                  <div className="blc-brand">PELINDO</div>
                  <div className="blc-sub">ASSET MANAGEMENT SYSTEM</div>
                </div>
                <span className={`status-badge ${sc(asset.status)}`}>
                  {asset.status}
                </span>
              </div>
              <div className="blc-name">{asset.name}</div>
              <div className="blc-id">{asset.id}</div>
              <div className="blc-barcode">
                <BarcodeCanvas value={asset.id} width={310} height={58} />
              </div>
              <div className="blc-meta">
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Entitas</span>
                  <span className="blc-meta-val">{asset.entitas || "—"}</span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Cabang</span>
                  <span className="blc-meta-val">{asset.branch}</span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Zona · Subzona</span>
                  <span className="blc-meta-val">
                    {asset.zona} · {asset.subzona}
                  </span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Kategori</span>
                  <span className="blc-meta-val">{asset.category}</span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Budget</span>
                  <span className="blc-meta-val">
                    {asset.budgetType || "—"}
                  </span>
                </div>
                <div className="blc-meta-item">
                  <span className="blc-meta-lbl">Tgl Pengadaan</span>
                  <span className="blc-meta-val">
                    {fmtDate(asset.procurementDate)}
                  </span>
                </div>
              </div>
              <div className="blc-footer">
                SCAN BARCODE UNTUK VERIFIKASI ASET
              </div>
            </div>
          </div>
          <div className="barcode-hint-row">
            <FaQrcode className="barcode-hint-icon" />
            <span>
              Barcode Code128 — kompatibel dengan semua scanner industri standar
            </span>
          </div>
          <button className="btn-print" onClick={handlePrint}>
            <FaPrint /> Cetak Label
          </button>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

const ViewAsset = () => {
  const [assets, setAssets] = useState([
    {
      id: "SPMT-BLW-LPG-DMG-01",
      name: "CCTV Hikvision BL 01",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "DMG",
      value: 12000000,
      budgetType: "OPEX",
      procurementDate: "2026-01-28",
    },
    {
      id: "SPMT-DMI-GDG-DMG-01",
      name: "Excavator CAT 336",
      category: "Alat Berat",
      status: "Maintenance",
      entitas: "Pelindo Multi Terminal",
      branch: "Dumai",
      zona: "GDG",
      subzona: "DMG",
      value: 1200000000,
      budgetType: "CAPEX",
      procurementDate: "2025-06-15",
    },
    {
      id: "SPMT-LHK-DTC-PKR-01",
      name: "Server Dell PowerEdge R740",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Lhokseumawe",
      zona: "DTC",
      subzona: "PKR",
      value: 180000000,
      budgetType: "CAPEX",
      procurementDate: "2025-03-22",
    },
    {
      id: "SPMT-BLW-LPG-PKR-01",
      name: "Toyota Hilux Pickup",
      category: "Kendaraan",
      status: "Dipinjam",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "PKR",
      value: 350000000,
      budgetType: "CAPEX",
      procurementDate: "2024-08-01",
    },
    {
      id: "PTP-TJP-GDG-DMG-01",
      name: "Meja Kerja Direktori",
      category: "Furniture",
      status: "Tersedia",
      entitas: "PT Pelabuhan Indonesia",
      branch: "Tanjung Priok",
      zona: "GDG",
      subzona: "DMG",
      value: 8500000,
      budgetType: "OPEX",
      procurementDate: "2026-02-14",
    },
    {
      id: "SPMT-MLH-DTC-PKR-01",
      name: "Cisco Switch Catalyst 2960X",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Malahayati",
      zona: "DTC",
      subzona: "PKR",
      value: 45000000,
      budgetType: "CAPEX",
      procurementDate: "2025-09-05",
    },
    {
      id: "SPMT-DMI-LPG-JLN-01",
      name: "Mitsubishi Fuso Truk",
      category: "Kendaraan",
      status: "Maintenance",
      entitas: "Pelindo Multi Terminal",
      branch: "Dumai",
      zona: "LPG",
      subzona: "JLN",
      value: 620000000,
      budgetType: "CAPEX",
      procurementDate: "2024-11-20",
    },
    {
      id: "SPMT-BLW-LPG-DMG-02",
      name: "RTG Crane ZPMC",
      category: "Alat Berat",
      status: "Tersedia",
      entitas: "Pelindo Multi Terminal",
      branch: "Belawan",
      zona: "LPG",
      subzona: "DMG",
      value: 8500000000,
      budgetType: "CAPEX",
      procurementDate: "2023-04-10",
    },
    {
      id: "PTP-JMB-GDG-DMG-01",
      name: "Kursi Ergonomis Kantor",
      category: "Furniture",
      status: "Tersedia",
      entitas: "PT Pelabuhan Indonesia",
      branch: "Jambi",
      zona: "GDG",
      subzona: "DMG",
      value: 3200000,
      budgetType: "OPEX",
      procurementDate: "2025-07-30",
    },
    {
      id: "IKT-JKT-GDG-PKR-01",
      name: "CCTV Dahua JKT 01",
      category: "IT Equipment",
      status: "Tersedia",
      entitas: "Indonesia Kendaraan Terminal",
      branch: "Jakarta",
      zona: "GDG",
      subzona: "PKR",
      value: 12000000,
      budgetType: "OPEX",
      procurementDate: "2026-01-28",
    },
  ]);

  // UI state
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showBarcodeModal, setShowBarcodeModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter state
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterBudget, setFilterBudget] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    assetId: "",
    name: "",
    entitas: "",
    entitasCode: "",
    branch: "",
    branchCode: "",
    zona: "",
    zonaCode: "",
    subzona: "",
    subzonaCode: "",
    nomorAset: "",
    category: "",
    status: "Tersedia",
    condition: "Baik",
    value: "",
    budgetType: "",
    procurementDate: "",
  });
  const [templateSpecs, setTemplateSpecs] = useState([]);
  const [customSpecs, setCustomSpecs] = useState([]);

  const availableBranches = formData.entitasCode
    ? BRANCH_BY_ENTITY[formData.entitasCode] || []
    : [];

  const dropdownRef = useRef(null);
  useEffect(() => {
    const h = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setActiveDropdown(null);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  // KPI
  const kpi = useMemo(
    () => ({
      total: assets.length,
      tersedia: assets.filter((a) => a.status === "Tersedia").length,
      maintenance: assets.filter((a) => a.status === "Maintenance").length,
      dipinjam: assets.filter((a) => a.status === "Dipinjam").length,
      totalNilai: assets.reduce((s, a) => s + (a.value || 0), 0),
    }),
    [assets],
  );

  // Filter + pagination
  const filtered = useMemo(
    () =>
      assets.filter((a) => {
        const q = search.toLowerCase();
        return (
          (!q ||
            a.id.toLowerCase().includes(q) ||
            a.name.toLowerCase().includes(q) ||
            a.branch.toLowerCase().includes(q)) &&
          (!filterStatus || a.status === filterStatus) &&
          (!filterCategory || a.category === filterCategory) &&
          (!filterBranch || a.branch === filterBranch) &&
          (!filterBudget || a.budgetType === filterBudget)
        );
      }),
    [assets, search, filterStatus, filterCategory, filterBranch, filterBudget],
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );
  const activeFiltersCount = [
    filterStatus,
    filterCategory,
    filterBranch,
    filterBudget,
  ].filter(Boolean).length;
  const resetFilters = () => {
    setFilterStatus("");
    setFilterCategory("");
    setFilterBranch("");
    setFilterBudget("");
    setCurrentPage(1);
  };

  // Helpers
  const fmt = (n) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(n || 0);
  const fmtDate = (d) =>
    d
      ? new Date(d).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "—";
  const statusClass = (s) =>
    s === "Tersedia"
      ? "tersedia"
      : s === "Dipinjam"
        ? "dipinjam"
        : "maintenance";

  // ── AUTO NOMOR ASET (dummy — simulasi baca DB) ───────────────────────────
  // Produksi: diganti API → SELECT MAX(nomor) FROM assets WHERE prefix = X
  // Sekarang: scan state lokal, cari nomor tertinggi pada kombinasi lokasi,
  //           kemudian return next = max + 1, format 2-digit ("01","02",…)
  const getNextNomorAset = (eCode, bCode, zCode, szCode) => {
    const prefix = `${eCode}-${bCode}-${zCode}-${szCode}-`;
    const nums = assets
      .filter((a) => a.id.startsWith(prefix))
      .map((a) => {
        const suffix = a.id.slice(prefix.length);
        const n = parseInt(suffix, 10);
        return isNaN(n) ? 0 : n;
      });
    const maxNum = nums.length > 0 ? Math.max(...nums) : 0;
    return String(maxNum + 1).padStart(2, "0");
  };

  // canGenerate: hanya butuh 4 field lokasi — nomor aset dihitung otomatis
  const canGenerate = !!(
    formData.entitasCode &&
    formData.branchCode &&
    formData.zonaCode &&
    formData.subzonaCode
  );

  const handleGenerateCode = () => {
    if (!canGenerate) {
      alert("Lengkapi semua field lokasi!");
      return;
    }
    const { entitasCode, branchCode, zonaCode, subzonaCode } = formData;
    const nomorAuto = getNextNomorAset(
      entitasCode,
      branchCode,
      zonaCode,
      subzonaCode,
    );
    const generated = `${entitasCode}-${branchCode}-${zonaCode}-${subzonaCode}-${nomorAuto}`;
    setFormData((prev) => ({
      ...prev,
      nomorAset: nomorAuto,
      assetId: generated,
    }));
  };

  // Form handlers — reset nomorAset & assetId saat lokasi berubah
  const handleEntitasChange = (e) => {
    const f = ENTITAS_LIST.find((en) => en.code === e.target.value);
    setFormData((p) => ({
      ...p,
      entitas: f?.name || "",
      entitasCode: f?.code || "",
      branch: "",
      branchCode: "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleBranchChange = (e) => {
    const f = availableBranches.find((b) => b.code === e.target.value);
    setFormData((p) => ({
      ...p,
      branch: f?.name || "",
      branchCode: f?.code || "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleZonaChange = (e) => {
    const f = ZONA_LIST.find((z) => z.code === e.target.value);
    setFormData((p) => ({
      ...p,
      zona: f?.name || "",
      zonaCode: f?.code || "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleSubzonaChange = (e) => {
    const f = SUBZONA_LIST.find((s) => s.code === e.target.value);
    setFormData((p) => ({
      ...p,
      subzona: f?.name || "",
      subzonaCode: f?.code || "",
      nomorAset: "",
      assetId: "",
    }));
  };
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData((p) => ({ ...p, category }));
    if (category === "IT Equipment")
      setTemplateSpecs([
        { key: "processor", label: "Processor (CPU)", value: "" },
        { key: "ram", label: "RAM Capacity", value: "" },
        { key: "storage", label: "Storage (SSD/HDD)", value: "" },
        { key: "os", label: "Operating System", value: "" },
      ]);
    else if (["Kendaraan", "Alat Berat"].includes(category))
      setTemplateSpecs([
        { key: "plat", label: "Plat Nomor / Lambung", value: "" },
        { key: "mesin", label: "Nomor Mesin", value: "" },
        { key: "tahun", label: "Tahun Pembuatan", value: "" },
        { key: "merk", label: "Merk / Brand", value: "" },
      ]);
    else if (category === "Furniture")
      setTemplateSpecs([
        { key: "material", label: "Bahan Material", value: "" },
        { key: "dimensi", label: "Dimensi (PxLxT)", value: "" },
        { key: "warna", label: "Warna Dominan", value: "" },
      ]);
    else setTemplateSpecs([]);
  };

  const handleTemplateSpecChange = (i, v) => {
    const n = [...templateSpecs];
    n[i] = { ...n[i], value: v };
    setTemplateSpecs(n);
  };
  const addCustomSpec = () =>
    setCustomSpecs([...customSpecs, { key: "", value: "" }]);
  const removeCustomSpec = (i) => {
    const n = [...customSpecs];
    n.splice(i, 1);
    setCustomSpecs(n);
  };
  const handleCustomSpecChange = (i, f, v) => {
    const n = [...customSpecs];
    n[i] = { ...n[i], [f]: v };
    setCustomSpecs(n);
  };

  const resetForm = () => {
    setFormData({
      assetId: "",
      name: "",
      entitas: "",
      entitasCode: "",
      branch: "",
      branchCode: "",
      zona: "",
      zonaCode: "",
      subzona: "",
      subzonaCode: "",
      nomorAset: "",
      category: "",
      status: "Tersedia",
      condition: "Baik",
      value: "",
      budgetType: "",
      procurementDate: "",
    });
    setTemplateSpecs([]);
    setCustomSpecs([]);
  };

  const handleSave = () => {
    if (!formData.assetId) {
      alert("Mohon generate kode aset terlebih dahulu!");
      return;
    }
    const newAsset = {
      id: formData.assetId,
      name: formData.name,
      category: formData.category,
      status: formData.status,
      entitas: formData.entitas,
      branch: formData.branch,
      zona: formData.zonaCode,
      subzona: formData.subzonaCode,
      value: parseFloat(formData.value) || 0,
      budgetType: formData.budgetType,
      procurementDate: formData.procurementDate,
    };
    setAssets([newAsset, ...assets]);
    alert("Data aset berhasil disimpan!");
    setShowModal(false);
    resetForm();
  };

  const handleDelete = () => {
    setAssets(assets.filter((a) => a.id !== selectedAsset.id));
    setShowDeleteConfirm(false);
    setSelectedAsset(null);
  };

  const handleExport = () => {
    const headers = [
      "ID Aset",
      "Nama",
      "Kategori",
      "Entitas",
      "Branch",
      "Zona",
      "Subzona",
      "Status",
      "Budget Type",
      "Nilai",
      "Tgl Pengadaan",
    ];
    const rows = filtered.map((a) => [
      a.id,
      a.name,
      a.category,
      a.entitas,
      a.branch,
      a.zona,
      a.subzona,
      a.status,
      a.budgetType,
      a.value,
      a.procurementDate,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "inventory-aset.csv";
    link.click();
  };

  // Preview kode sebelum generate — nomor aset dihitung saat Generate ditekan
  const autoNomor = canGenerate
    ? getNextNomorAset(
        formData.entitasCode,
        formData.branchCode,
        formData.zonaCode,
        formData.subzonaCode,
      )
    : null;
  const codePreview = canGenerate
    ? `${formData.entitasCode}-${formData.branchCode}-${formData.zonaCode}-${formData.subzonaCode}-${autoNomor}`
    : null;
  const missingFields = [
    !formData.entitasCode && "Entitas",
    !formData.branchCode && "Cabang",
    !formData.zonaCode && "Zona",
    !formData.subzonaCode && "Sub Zona",
  ].filter(Boolean);

  return (
    <div className="view-asset-wrapper">
      {/* ── HEADER ── */}
      <div className="view-header">
        <div className="view-header-left">
          <div className="view-header-icon">
            <FaAnchor />
          </div>
          <div>
            <h1 className="view-title">Inventory Aset</h1>
            <p className="view-subtitle">
              <FaShieldAlt
                style={{ marginRight: 5, opacity: 0.6, fontSize: 11 }}
              />{" "}
              Super Admin Access · {assets.length} total aset terdaftar
            </p>
          </div>
        </div>
        <button className="add-asset-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Input Aset Baru
        </button>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="kpi-grid">
        {[
          {
            cls: "kpi-total",
            icon: <FaDatabase />,
            val: kpi.total,
            lbl: "Total Aset",
            glow: "blue",
          },
          {
            cls: "kpi-tersedia",
            icon: <FaCheckCircle />,
            val: kpi.tersedia,
            lbl: "Tersedia",
            glow: "green",
          },
          {
            cls: "kpi-dipinjam",
            icon: <FaBoxOpen />,
            val: kpi.dipinjam,
            lbl: "Dipinjam",
            glow: "yellow",
          },
          {
            cls: "kpi-maintenance",
            icon: <FaTools />,
            val: kpi.maintenance,
            lbl: "Maintenance",
            glow: "red",
          },
          {
            cls: "kpi-nilai",
            icon: <FaMoneyBillWave />,
            val: fmt(kpi.totalNilai),
            lbl: "Total Nilai Aset",
            glow: "cyan",
            sm: true,
          },
        ].map(({ cls, icon, val, lbl, glow, sm }) => (
          <div key={lbl} className={`kpi-card ${cls}`}>
            <div className="kpi-icon">{icon}</div>
            <div className="kpi-body">
              <div className={`kpi-val${sm ? " kpi-val--sm" : ""}`}>{val}</div>
              <div className="kpi-lbl">{lbl}</div>
            </div>
            <div className={`kpi-glow kpi-glow--${glow}`} />
          </div>
        ))}
      </div>

      {/* ── SEARCH & FILTER ── */}
      <div className="table-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Cari ID aset, nama, atau branch..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="filter-actions">
          <button
            className={`control-btn ${showFilterPanel ? "active" : ""}`}
            onClick={() => setShowFilterPanel(!showFilterPanel)}
          >
            <FaFilter /> Filter
            {activeFiltersCount > 0 && (
              <span className="filter-badge">{activeFiltersCount}</span>
            )}
            <FaChevronDown
              size={10}
              style={{
                transition: "transform 0.2s",
                transform: showFilterPanel ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </button>
          <button className="control-btn" onClick={handleExport}>
            <FaFileDownload /> Export CSV
          </button>
        </div>
      </div>

      {showFilterPanel && (
        <div className="filter-panel">
          <div className="filter-panel-grid">
            <div className="filter-group">
              <label>Status</label>
              <select
                value={filterStatus}
                onChange={(e) => {
                  setFilterStatus(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Semua Status</option>
                <option>Tersedia</option>
                <option>Dipinjam</option>
                <option>Maintenance</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Kategori</label>
              <select
                value={filterCategory}
                onChange={(e) => {
                  setFilterCategory(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Semua Kategori</option>
                <option>IT Equipment</option>
                <option>Kendaraan</option>
                <option>Alat Berat</option>
                <option>Furniture</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Branch</label>
              <select
                value={filterBranch}
                onChange={(e) => {
                  setFilterBranch(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Semua Branch</option>
                {Object.values(BRANCH_BY_ENTITY)
                  .flat()
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((b) => (
                    <option key={b.code} value={b.name}>
                      {b.name}
                    </option>
                  ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Budget Type</label>
              <select
                value={filterBudget}
                onChange={(e) => {
                  setFilterBudget(e.target.value);
                  setCurrentPage(1);
                }}
              >
                <option value="">Semua</option>
                <option value="CAPEX">CAPEX</option>
                <option value="OPEX">OPEX</option>
              </select>
            </div>
          </div>
          {activeFiltersCount > 0 && (
            <button className="filter-reset-btn" onClick={resetFilters}>
              <FaTimes size={11} /> Reset Filter
            </button>
          )}
        </div>
      )}

      {/* ── TABLE ── */}
      <div className="table-container">
        <div className="table-info-bar">
          <span>
            Menampilkan <strong>{paginated.length}</strong> dari{" "}
            <strong>{filtered.length}</strong> aset
          </span>
          {activeFiltersCount > 0 && (
            <span className="filter-active-note">
              <FaExclamationTriangle size={11} /> Filter aktif
            </span>
          )}
        </div>
        <table className="asset-table">
          <thead>
            <tr>
              <th>ID ASET</th>
              <th>NAMA ASET</th>
              <th>LOKASI</th>
              <th>KATEGORI</th>
              <th>TGL PENGADAAN</th>
              <th>BUDGET</th>
              <th>NILAI</th>
              <th>STATUS</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan="9">
                  <div className="empty-state">
                    <div className="empty-state-icon">
                      <FaBoxOpen />
                    </div>
                    <div className="empty-state-title">
                      Tidak ada aset ditemukan
                    </div>
                    <div className="empty-state-sub">
                      {activeFiltersCount > 0 || search
                        ? "Coba ubah kata kunci atau reset filter."
                        : 'Belum ada aset. Klik "Input Aset Baru" untuk mulai.'}
                    </div>
                    {(activeFiltersCount > 0 || search) && (
                      <button
                        className="empty-reset-btn"
                        onClick={() => {
                          resetFilters();
                          setSearch("");
                        }}
                      >
                        Reset Pencarian & Filter
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((asset) => (
                <tr
                  key={asset.id}
                  className="asset-row"
                  onClick={() => {
                    setSelectedAsset(asset);
                    setShowDetailModal(true);
                  }}
                >
                  <td>
                    <code className="asset-id-code">{asset.id}</code>
                  </td>
                  <td className="fw-bold">{asset.name}</td>
                  <td>
                    <div className="loc-text">{asset.branch}</div>
                    <div className="sub-loc-text">
                      {asset.zona} · {asset.subzona}
                    </div>
                  </td>
                  <td>
                    <span className="cat-badge">{asset.category}</span>
                  </td>
                  <td>
                    <div className="date-cell">
                      <FaCalendarAlt size={11} />
                      {fmtDate(asset.procurementDate)}
                    </div>
                  </td>
                  <td>
                    <span
                      className={`budget-badge ${asset.budgetType?.toLowerCase()}`}
                    >
                      {asset.budgetType || "—"}
                    </span>
                  </td>
                  <td className="fw-bold">{fmt(asset.value)}</td>
                  <td>
                    <span
                      className={`status-badge ${statusClass(asset.status)}`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div
                      className="action-wrap"
                      ref={activeDropdown === asset.id ? dropdownRef : null}
                    >
                      <button
                        className="action-dot-btn"
                        onClick={() =>
                          setActiveDropdown(
                            activeDropdown === asset.id ? null : asset.id,
                          )
                        }
                      >
                        <FaEllipsisV />
                      </button>
                      {activeDropdown === asset.id && (
                        <div className="action-dropdown">
                          <button
                            onClick={() => {
                              setSelectedAsset(asset);
                              setShowDetailModal(true);
                              setActiveDropdown(null);
                            }}
                          >
                            <FaEye /> Lihat Detail
                          </button>
                          <button
                            onClick={() => {
                              setSelectedAsset(asset);
                              setShowBarcodeModal(true);
                              setActiveDropdown(null);
                            }}
                          >
                            <FaBarcode /> Cetak Barcode
                          </button>
                          <button
                            onClick={() => {
                              setActiveDropdown(null);
                              alert("Fitur Edit akan segera hadir.");
                            }}
                          >
                            <FaEdit /> Edit Aset
                          </button>
                          <button
                            className="action-delete"
                            onClick={() => {
                              setSelectedAsset(asset);
                              setShowDeleteConfirm(true);
                              setActiveDropdown(null);
                            }}
                          >
                            <FaTrash /> Hapus
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="pg-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              <FaChevronLeft size={12} />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`pg-btn ${p === currentPage ? "pg-active" : ""}`}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="pg-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              <FaChevronRight size={12} />
            </button>
            <span className="pg-info">
              Halaman {currentPage} dari {totalPages}
            </span>
          </div>
        )}
      </div>

      {/* ── MODAL DETAIL ── */}
      {showDetailModal && selectedAsset && (
        <div
          className="modal-overlay"
          onClick={() => setShowDetailModal(false)}
        >
          <div
            className="modal-content detail-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h3>
                <FaInfoCircle /> Detail Aset
              </h3>
              <button
                className="close-btn"
                onClick={() => setShowDetailModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            <div className="detail-body">
              <div className="detail-hero">
                <div className="detail-hero-name">{selectedAsset.name}</div>
                <span
                  className={`status-badge ${statusClass(selectedAsset.status)}`}
                >
                  {selectedAsset.status}
                </span>
              </div>
              <code className="detail-id">{selectedAsset.id}</code>
              <div className="detail-barcode-strip">
                <BarcodeCanvas
                  value={selectedAsset.id}
                  width={440}
                  height={46}
                />
              </div>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-lbl">Entitas</span>
                  <span className="detail-val">
                    {selectedAsset.entitas || "—"}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Branch</span>
                  <span className="detail-val">{selectedAsset.branch}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Kode Zona</span>
                  <span className="detail-val">{selectedAsset.zona}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Kode Subzona</span>
                  <span className="detail-val">{selectedAsset.subzona}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Kategori</span>
                  <span className="detail-val">{selectedAsset.category}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Budget Type</span>
                  <span className="detail-val">
                    <span
                      className={`budget-badge ${selectedAsset.budgetType?.toLowerCase()}`}
                    >
                      {selectedAsset.budgetType || "—"}
                    </span>
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Tgl Pengadaan</span>
                  <span className="detail-val">
                    {fmtDate(selectedAsset.procurementDate)}
                  </span>
                </div>
                <div className="detail-item">
                  <span className="detail-lbl">Nilai Aset</span>
                  <span className="detail-val detail-val--highlight">
                    {fmt(selectedAsset.value)}
                  </span>
                </div>
              </div>
            </div>
            <div className="modal-footer sticky-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowDetailModal(false)}
              >
                Tutup
              </button>
              <button
                className="btn-barcode"
                onClick={() => {
                  setShowDetailModal(false);
                  setShowBarcodeModal(true);
                }}
              >
                <FaBarcode /> Cetak Barcode
              </button>
              <button
                className="btn-save"
                onClick={() => {
                  setShowDetailModal(false);
                  alert("Fitur Edit akan segera hadir.");
                }}
              >
                <FaEdit /> Edit Aset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL HAPUS ── */}
      {showDeleteConfirm && selectedAsset && (
        <div className="modal-overlay">
          <div className="modal-content confirm-modal">
            <div className="confirm-icon">
              <FaExclamationTriangle />
            </div>
            <h3>Hapus Aset?</h3>
            <p>
              Aset <strong>{selectedAsset.name}</strong> dengan ID{" "}
              <code>{selectedAsset.id}</code> akan dihapus permanen.
            </p>
            <div className="confirm-actions">
              <button
                className="btn-cancel"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Batal
              </button>
              <button className="btn-delete-confirm" onClick={handleDelete}>
                <FaTrash /> Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL BARCODE ── */}
      {showBarcodeModal && selectedAsset && (
        <BarcodeLabelModal
          asset={selectedAsset}
          onClose={() => setShowBarcodeModal(false)}
          fmt={fmt}
          fmtDate={fmtDate}
        />
      )}

      {/* ══════════════════════════════════════════════════════════
          ── MODAL INPUT ASET ──
          Urutan section:
            01 · Informasi Aset
            02 · Spesifikasi Teknis
            03 · Spesifikasi Tambahan
            04 · Lokasi & Generate Kode Aset  ← TERAKHIR
          ══════════════════════════════════════════════════════════ */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            {/* Header */}
            <div className="modal-header modal-header--fancy">
              <div className="modal-header-left">
                <div className="modal-header-icon">
                  <FaDatabase />
                </div>
                <div>
                  <h3 className="modal-title">Input Data Aset</h3>
                  <p className="modal-subtitle">
                    Isi informasi aset lengkap — kode unik digenerate di akhir
                  </p>
                </div>
              </div>
              <button
                className="close-btn"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                <FaTimes />
              </button>
            </div>

            <div className="form-step-bar">
              {["Informasi", "Spesifikasi", "Tambahan", "Kode Aset"].map(
                (s, i) => (
                  <div key={s} className="form-step-item">
                    <div className="form-step-num">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className="form-step-lbl">{s}</div>
                    {i < 3 && <div className="form-step-line" />}
                  </div>
                ),
              )}
            </div>

            <form
              className="asset-form-scroll"
              onSubmit={(e) => e.preventDefault()}
            >
              {/* ── SECTION 01: INFORMASI ASET ── */}
              <div className="form-section-card">
                <div className="fsc-header">
                  <div className="fsc-step">01</div>
                  <div className="fsc-titles">
                    <h4 className="fsc-title">
                      <FaTag /> Informasi Aset
                    </h4>
                    <p className="fsc-desc">
                      Nama, kategori, tanggal pengadaan, status, nilai, dan tipe
                      anggaran
                    </p>
                  </div>
                </div>

                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label>
                    Nama Aset <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: CCTV Hikvision BL 01"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData((p) => ({ ...p, name: e.target.value }))
                    }
                  />
                </div>

                <div className="form-row" style={{ marginBottom: 16 }}>
                  <div className="form-group">
                    <label>
                      Kategori <span className="req">*</span>
                    </label>
                    <select
                      onChange={handleCategoryChange}
                      value={formData.category}
                    >
                      <option value="">— Pilih Kategori —</option>
                      <option value="IT Equipment">IT Equipment</option>
                      <option value="Kendaraan">Kendaraan Operasional</option>
                      <option value="Alat Berat">Alat Berat (HMC/RTG)</option>
                      <option value="Furniture">Furniture</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tanggal Pengadaan</label>
                    <input
                      type="date"
                      value={formData.procurementDate}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          procurementDate: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="form-row-3">
                  <div className="form-group">
                    <label>Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, status: e.target.value }))
                      }
                    >
                      <option>Tersedia</option>
                      <option>Dipinjam</option>
                      <option>Maintenance</option>
                      <option>Rusak (Write-off)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Nilai Aset (IDR)</label>
                    <input
                      type="number"
                      placeholder="0"
                      value={formData.value}
                      onChange={(e) =>
                        setFormData((p) => ({ ...p, value: e.target.value }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Budget Type <span className="req">*</span>
                    </label>
                    <select
                      value={formData.budgetType}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          budgetType: e.target.value,
                        }))
                      }
                    >
                      <option value="">Pilih...</option>
                      <option value="CAPEX">CAPEX — Investasi</option>
                      <option value="OPEX">OPEX — Operasional</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ── SECTION 02: SPESIFIKASI TEKNIS ── */}
              <div className="form-section-card form-section-card--spec">
                <div className="fsc-header">
                  <div className="fsc-step fsc-step--teal">02</div>
                  <div className="fsc-titles">
                    <h4 className="fsc-title">
                      <FaCogs /> Spesifikasi Teknis
                    </h4>
                    <p className="fsc-desc">
                      Field muncul otomatis sesuai kategori yang dipilih di atas
                    </p>
                  </div>
                </div>
                {!formData.category ? (
                  <div className="spec-empty-state">
                    <FaLayerGroup size={22} />
                    <span>
                      Pilih <strong>Kategori</strong> di section 01 untuk memuat
                      form spesifikasi
                    </span>
                  </div>
                ) : (
                  <div className="form-grid-2">
                    {templateSpecs.map((spec, i) => (
                      <div className="form-group" key={i}>
                        <label>{spec.label}</label>
                        <input
                          type="text"
                          placeholder={`Isi ${spec.label}...`}
                          value={spec.value}
                          onChange={(e) =>
                            handleTemplateSpecChange(i, e.target.value)
                          }
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── SECTION 03: SPESIFIKASI TAMBAHAN ── */}
              <div className="form-section-card">
                <div
                  className="fsc-header"
                  style={{ marginBottom: customSpecs.length > 0 ? 16 : 0 }}
                >
                  <div className="fsc-step fsc-step--gray">03</div>
                  <div className="fsc-titles">
                    <h4 className="fsc-title">
                      Spesifikasi Tambahan{" "}
                      <span className="optional-badge">Opsional</span>
                    </h4>
                    <p className="fsc-desc">
                      Tambahkan atribut unik yang tidak tersedia di template di
                      atas
                    </p>
                  </div>
                  <button
                    type="button"
                    className="btn-small-add"
                    onClick={addCustomSpec}
                    style={{ marginLeft: "auto", flexShrink: 0 }}
                  >
                    <FaPlus /> Tambah
                  </button>
                </div>
                {customSpecs.length === 0 && (
                  <p className="empty-text">Belum ada spesifikasi tambahan.</p>
                )}
                {customSpecs.map((spec, i) => (
                  <div className="custom-spec-row" key={i}>
                    <input
                      type="text"
                      placeholder="Nama Spesifikasi"
                      value={spec.key}
                      onChange={(e) =>
                        handleCustomSpecChange(i, "key", e.target.value)
                      }
                    />
                    <input
                      type="text"
                      placeholder="Nilai"
                      value={spec.value}
                      onChange={(e) =>
                        handleCustomSpecChange(i, "value", e.target.value)
                      }
                    />
                    <button
                      type="button"
                      className="btn-trash"
                      onClick={() => removeCustomSpec(i)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

              {/* ── SECTION 04: LOKASI & GENERATE KODE ── */}
              <div
                className={`form-section-card form-section-card--generate ${formData.assetId ? "form-section-card--done" : ""}`}
              >
                <div className="fsc-header">
                  <div className="fsc-step fsc-step--indigo">04</div>
                  <div className="fsc-titles">
                    <h4 className="fsc-title">
                      <FaMapMarkerAlt /> Lokasi &amp; Kode Aset
                    </h4>
                    <p className="fsc-desc">
                      Pilih lokasi aset — kode unik akan digenerate dari
                      kombinasi data ini
                    </p>
                  </div>
                </div>

                {/* Entitas + Cabang */}
                <div className="form-row" style={{ marginBottom: 14 }}>
                  <div className="form-group">
                    <label>
                      Entitas <span className="req">*</span>
                    </label>
                    <select
                      value={formData.entitasCode}
                      onChange={handleEntitasChange}
                      className={!formData.entitasCode ? "inp--pending" : ""}
                    >
                      <option value="">— Pilih Entitas —</option>
                      {ENTITAS_LIST.map((en) => (
                        <option key={en.code} value={en.code}>
                          {en.code} – {en.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      Cabang <span className="req">*</span>
                    </label>
                    <select
                      value={formData.branchCode}
                      onChange={handleBranchChange}
                      disabled={!formData.entitasCode}
                      className={
                        !formData.entitasCode
                          ? "inp--disabled"
                          : !formData.branchCode
                            ? "inp--pending"
                            : ""
                      }
                    >
                      <option value="">— Pilih Cabang —</option>
                      {availableBranches.map((b) => (
                        <option key={b.code} value={b.code}>
                          {b.code} – {b.name}
                        </option>
                      ))}
                    </select>
                    {!formData.entitasCode && (
                      <span className="field-hint fh--warn">
                        Pilih entitas terlebih dahulu
                      </span>
                    )}
                  </div>
                </div>

                {/* Zona + Subzona */}
                <div className="form-row" style={{ marginBottom: 14 }}>
                  <div className="form-group">
                    <label>
                      Zona <span className="req">*</span>
                    </label>
                    <select
                      value={formData.zonaCode}
                      onChange={handleZonaChange}
                      className={!formData.zonaCode ? "inp--pending" : ""}
                    >
                      <option value="">— Pilih Zona —</option>
                      {ZONA_LIST.map((z) => (
                        <option key={z.code} value={z.code}>
                          {z.code} – {z.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      Sub Zona <span className="req">*</span>
                    </label>
                    <select
                      value={formData.subzonaCode}
                      onChange={handleSubzonaChange}
                      className={!formData.subzonaCode ? "inp--pending" : ""}
                    >
                      <option value="">— Pilih Sub Zona —</option>
                      {SUBZONA_LIST.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.code} – {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Nomor Aset — auto dari DB (dummy: hitung dari state lokal) */}
                {canGenerate && (
                  <div className="nomor-auto-box">
                    <div className="nomor-auto-left">
                      <div className="nomor-auto-label">
                        <FaDatabase
                          style={{ fontSize: 11, marginRight: 6, opacity: 0.6 }}
                        />
                        Nomor Aset (Auto)
                      </div>
                      <div className="nomor-auto-value">{autoNomor}</div>
                      <div className="nomor-auto-hint">
                        Dihitung otomatis berdasarkan jumlah aset terdaftar di
                        lokasi ini. Di produksi, angka ini dibaca langsung dari
                        database.
                      </div>
                    </div>
                    <div className="nomor-auto-badge">
                      <FaCheckCircle
                        style={{
                          color: "#16a34a",
                          fontSize: 13,
                          marginBottom: 4,
                        }}
                      />
                      <span>Auto</span>
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="generate-divider">
                  <span>Generate Kode Aset</span>
                </div>

                {/* Segment preview */}
                {codePreview && (
                  <div className="code-segments">
                    {codePreview.split("-").map((seg, i, arr) => (
                      <React.Fragment key={i}>
                        <span className="code-seg">{seg}</span>
                        {i < arr.length - 1 && (
                          <span className="code-sep">·</span>
                        )}
                      </React.Fragment>
                    ))}
                    {!formData.assetId && (
                      <span className="code-seg-note">← preview</span>
                    )}
                  </div>
                )}

                {/* Input + button */}
                <div className="input-group-generate">
                  <input
                    type="text"
                    readOnly
                    value={formData.assetId}
                    placeholder="Lengkapi semua field di atas, lalu klik Generate"
                    className="input-code"
                  />
                  <button
                    type="button"
                    className={`btn-generate ${!canGenerate ? "btn-generate--off" : ""}`}
                    onClick={handleGenerateCode}
                    disabled={!canGenerate}
                  >
                    <FaMagic /> Generate Kode
                  </button>
                </div>

                {/* Missing fields warning */}
                {!canGenerate && missingFields.length > 0 && (
                  <div className="missing-row">
                    <span className="missing-label">Belum diisi:</span>
                    {missingFields.map((f) => (
                      <span key={f} className="missing-pill">
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Barcode preview after generate */}
                {formData.assetId && (
                  <div className="barcode-result">
                    <div className="barcode-result-header">
                      <FaCheckCircle className="barcode-result-icon" />
                      <span>
                        Kode berhasil digenerate — barcode Code128 siap untuk
                        dicetak
                      </span>
                    </div>
                    <div className="barcode-result-canvas">
                      <BarcodeCanvas
                        value={formData.assetId}
                        width={560}
                        height={60}
                      />
                      <div className="barcode-result-id">
                        {formData.assetId}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </form>

            <div className="modal-footer sticky-footer">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                Batal
              </button>
              <button type="button" className="btn-save" onClick={handleSave}>
                <FaSave /> Simpan Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAsset;
