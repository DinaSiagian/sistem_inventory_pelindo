import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  FaSearch, FaFilter, FaPlus, FaEllipsisV, FaFileDownload,
  FaTimes, FaSave, FaTrash, FaDatabase, FaMapMarkerAlt,
  FaCogs, FaInfoCircle, FaMagic, FaBarcode, FaBoxOpen,
  FaTools, FaCheckCircle, FaExclamationTriangle, FaMoneyBillWave,
  FaEye, FaEdit, FaChevronLeft, FaChevronRight, FaChevronDown, FaCalendarAlt,
} from "react-icons/fa";
import "./ViewAsset.css";

const ITEMS_PER_PAGE = 8;

const ViewAsset = () => {
  // --- DATA ENTITAS ---
  const entitasList = [
    { name: "PT Pelindo Multi Terminal", code: "PMT" },
    { name: "SPMT (Stevedoring)", code: "SPMT" },
    { name: "Pelindo Pusat", code: "PLI" },
    { name: "PT Pelabuhan Indonesia", code: "PTPI" },
  ];

  // --- DATA BRANCH ---
  const branchList = [
    { name: "Pelindo Belawan", code: "BLW" },
    { name: "Pelindo Dumai", code: "DMI" },
    { name: "Pelindo Lhokseumawe", code: "LKS" },
    { name: "Pelindo Tanjung Balai Asahan", code: "TBA" },
    { name: "Pelindo Malahayati", code: "MLH" },
    { name: "Pelindo Gunung Sitoli", code: "GNS" },
    { name: "Pelindo Kuala Tanjung", code: "KTJ" },
    { name: "Pelindo Sibolga", code: "SBG" },
    { name: "Pelindo Pekanbaru", code: "PKB" },
  ];

  // --- MOCK DATA ASET ---
  const [assets, setAssets] = useState([
    { id: "SPMT-BLW-LPG-DMG-01", name: "CCTV Hikvision BL 01", category: "IT Equipment", status: "Tersedia", entitas: "SPMT (Stevedoring)", branch: "Pelindo Belawan", zona: "LPG", subzona: "DMG", value: 12000000, budgetType: "OPEX", procurementDate: "2026-01-28" },
    { id: "PMT-DMI-DMG-CRH-01", name: "Excavator CAT 336", category: "Alat Berat", status: "Maintenance", entitas: "PT Pelindo Multi Terminal", branch: "Pelindo Dumai", zona: "DMG", subzona: "CRH", value: 1200000000, budgetType: "CAPEX", procurementDate: "2025-06-15" },
    { id: "PMT-LKS-SVR-NTW-01", name: "Server Dell PowerEdge R740", category: "IT Equipment", status: "Tersedia", entitas: "PT Pelindo Multi Terminal", branch: "Pelindo Lhokseumawe", zona: "SVR", subzona: "NTW", value: 180000000, budgetType: "CAPEX", procurementDate: "2025-03-22" },
    { id: "SPMT-BLW-PLK-PL1-02", name: "Toyota Hilux Pickup", category: "Kendaraan", status: "Dipinjam", entitas: "SPMT (Stevedoring)", branch: "Pelindo Belawan", zona: "PLK", subzona: "PL1", value: 350000000, budgetType: "CAPEX", procurementDate: "2024-08-01" },
    { id: "PMT-PKB-KNT-R01-01", name: "Meja Kerja Direktori", category: "Furniture", status: "Tersedia", entitas: "PT Pelindo Multi Terminal", branch: "Pelindo Pekanbaru", zona: "KNT", subzona: "R01", value: 8500000, budgetType: "OPEX", procurementDate: "2026-02-14" },
    { id: "PMT-MLH-NTW-SVR-01", name: "Cisco Switch Catalyst 2960X", category: "IT Equipment", status: "Tersedia", entitas: "PT Pelindo Multi Terminal", branch: "Pelindo Malahayati", zona: "NTW", subzona: "SVR", value: 45000000, budgetType: "CAPEX", procurementDate: "2025-09-05" },
    { id: "SPMT-DMI-PLK-PL2-03", name: "Mitsubishi Fuso Truk", category: "Kendaraan", status: "Maintenance", entitas: "SPMT (Stevedoring)", branch: "Pelindo Dumai", zona: "PLK", subzona: "PL2", value: 620000000, budgetType: "CAPEX", procurementDate: "2024-11-20" },
    { id: "SPMT-BLW-TPC-RTG-01", name: "RTG Crane ZPMC", category: "Alat Berat", status: "Tersedia", entitas: "SPMT (Stevedoring)", branch: "Pelindo Belawan", zona: "TPC", subzona: "RTG", value: 8500000000, budgetType: "CAPEX", procurementDate: "2023-04-10" },
    { id: "PMT-SBG-KNT-R02-01", name: "Kursi Ergonomis Kantor", category: "Furniture", status: "Tersedia", entitas: "PT Pelindo Multi Terminal", branch: "Pelindo Sibolga", zona: "KNT", subzona: "R02", value: 3200000, budgetType: "OPEX", procurementDate: "2025-07-30" },
    { id: "SPMT-BLW-LPG-DMG-02", name: "CCTV Hikvision BL 02", category: "IT Equipment", status: "Tersedia", entitas: "SPMT (Stevedoring)", branch: "Pelindo Belawan", zona: "LPG", subzona: "DMG", value: 12000000, budgetType: "OPEX", procurementDate: "2026-01-28" },
  ]);

  // --- STATE UI ---
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // --- STATE FILTER ---
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterBranch, setFilterBranch] = useState("");
  const [filterBudget, setFilterBudget] = useState("");

  // --- STATE FORM ---
  const [formData, setFormData] = useState({
    assetId: "",
    name: "",
    entitas: "", entitasCode: "",
    branch: "", branchCode: "",
    zonaCode: "",    // kode zona — ketik user (LPG)
    subzonaCode: "", // kode subzona — ketik user (DMG)
    zonaLabel: "",
    subzonaLabel: "",
    nomorAset: "",   // ← nomor aset — ketik user (01, 02, A1, dst)
    category: "", status: "Tersedia", condition: "Baik",
    value: "", budgetType: "", procurementDate: "",
  });
  const [templateSpecs, setTemplateSpecs] = useState([]);
  const [customSpecs, setCustomSpecs] = useState([]);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setActiveDropdown(null); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // --- KPI ---
  const kpi = useMemo(() => {
    const total = assets.length;
    const tersedia = assets.filter(a => a.status === "Tersedia").length;
    const maintenance = assets.filter(a => a.status === "Maintenance").length;
    const dipinjam = assets.filter(a => a.status === "Dipinjam").length;
    const totalNilai = assets.reduce((s, a) => s + (a.value || 0), 0);
    return { total, tersedia, maintenance, dipinjam, totalNilai };
  }, [assets]);

  // --- FILTER + PAGINATION ---
  const filtered = useMemo(() => {
    return assets.filter(a => {
      const q = search.toLowerCase();
      const matchSearch = !q || a.id.toLowerCase().includes(q) || a.name.toLowerCase().includes(q) || a.branch.toLowerCase().includes(q);
      const matchStatus = !filterStatus || a.status === filterStatus;
      const matchCat = !filterCategory || a.category === filterCategory;
      const matchBranch = !filterBranch || a.branch === filterBranch;
      const matchBudget = !filterBudget || a.budgetType === filterBudget;
      return matchSearch && matchStatus && matchCat && matchBranch && matchBudget;
    });
  }, [assets, search, filterStatus, filterCategory, filterBranch, filterBudget]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);
  const activeFiltersCount = [filterStatus, filterCategory, filterBranch, filterBudget].filter(Boolean).length;
  const resetFilters = () => { setFilterStatus(""); setFilterCategory(""); setFilterBranch(""); setFilterBudget(""); setCurrentPage(1); };

  // --- FORMAT HELPERS ---
  const fmt = (num) => new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(num || 0);
  const fmtDate = (d) => d ? new Date(d).toLocaleDateString("id-ID", { day: "2-digit", month: "short", year: "numeric" }) : "—";
  const statusClass = (s) => s === "Tersedia" ? "tersedia" : s === "Dipinjam" ? "dipinjam" : "maintenance";

  // ══════════════════════════════════════════════════════════
  // GENERATE KODE: ENTITAS-BRANCH-ZONA-SUBZONA-NOMORASET
  // Semua komponen wajib diisi sebelum generate aktif
  // Nomor aset diketik user sendiri (bukan auto-increment)
  // ══════════════════════════════════════════════════════════
  const canGenerate =
    formData.entitasCode &&
    formData.branchCode &&
    formData.zonaCode &&
    formData.subzonaCode &&
    formData.nomorAset.trim() !== "";

  const handleGenerateCode = () => {
    if (!canGenerate) { alert("Lengkapi semua field: Entitas, Branch, Kode Zona, Kode Subzona, dan Nomor Aset!"); return; }
    const { entitasCode, branchCode, zonaCode, subzonaCode, nomorAset } = formData;
    const generated = `${entitasCode}-${branchCode}-${zonaCode}-${subzonaCode}-${nomorAset.trim()}`;

    // Cek duplikat kode
    const isDuplicate = assets.some(a => a.id === generated);
    if (isDuplicate) {
      alert(`Kode aset "${generated}" sudah terdaftar! Gunakan nomor aset yang berbeda.`);
      return;
    }
    setFormData({ ...formData, assetId: generated });
  };

  // Reset kode jika komponen manapun berubah setelah di-generate
  const resetCode = () => setFormData(prev => ({ ...prev, assetId: "" }));

  // --- HANDLERS ---
  const handleEntitasChange = (e) => {
    const found = entitasList.find(en => en.name === e.target.value);
    setFormData({ ...formData, entitas: e.target.value, entitasCode: found?.code || "", assetId: "" });
  };
  const handleBranchChange = (e) => {
    const found = branchList.find(b => b.name === e.target.value);
    setFormData({ ...formData, branch: e.target.value, branchCode: found?.code || "", assetId: "" });
  };
  const handleZonaCodeChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
    setFormData({ ...formData, zonaCode: val, assetId: "" });
  };
  const handleSubzonaCodeChange = (e) => {
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
    setFormData({ ...formData, subzonaCode: val, assetId: "" });
  };
  const handleNomorAsetChange = (e) => {
    // Boleh angka, huruf, atau kombinasi (01, A1, 001, dst) — maks 5 karakter
    const val = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 5);
    setFormData({ ...formData, nomorAset: val, assetId: "" });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({ ...formData, category });
    if (category === "IT Equipment") {
      setTemplateSpecs([
        { key: "processor", label: "Processor (CPU)", value: "" },
        { key: "ram", label: "RAM Capacity", value: "" },
        { key: "storage", label: "Storage (SSD/HDD)", value: "" },
        { key: "os", label: "Operating System", value: "" },
      ]);
    } else if (category === "Kendaraan" || category === "Alat Berat") {
      setTemplateSpecs([
        { key: "plat_nomor", label: "Plat Nomor / Lambung", value: "" },
        { key: "nomor_mesin", label: "Nomor Mesin", value: "" },
        { key: "tahun", label: "Tahun Pembuatan", value: "" },
        { key: "merk", label: "Merk / Brand", value: "" },
      ]);
    } else if (category === "Furniture") {
      setTemplateSpecs([
        { key: "material", label: "Bahan Material", value: "" },
        { key: "dimensi", label: "Dimensi (PxLxT)", value: "" },
        { key: "warna", label: "Warna Dominan", value: "" },
      ]);
    } else { setTemplateSpecs([]); }
  };

  const handleTemplateSpecChange = (i, val) => {
    const n = [...templateSpecs]; n[i] = { ...n[i], value: val }; setTemplateSpecs(n);
  };
  const addCustomSpec = () => setCustomSpecs([...customSpecs, { key: "", value: "" }]);
  const removeCustomSpec = (i) => { const n = [...customSpecs]; n.splice(i, 1); setCustomSpecs(n); };
  const handleCustomSpecChange = (i, field, val) => { const n = [...customSpecs]; n[i] = { ...n[i], [field]: val }; setCustomSpecs(n); };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formData.assetId) { alert("Mohon generate kode aset terlebih dahulu!"); return; }
    const newAsset = {
      id: formData.assetId, name: formData.name, category: formData.category,
      status: formData.status, entitas: formData.entitas, branch: formData.branch,
      zona: formData.zonaCode, subzona: formData.subzonaCode,
      value: parseFloat(formData.value) || 0, budgetType: formData.budgetType,
      procurementDate: formData.procurementDate,
    };
    setAssets([newAsset, ...assets]);
    alert("Data aset berhasil disimpan!");
    setShowModal(false);
    setFormData({ assetId: "", name: "", entitas: "", entitasCode: "", branch: "", branchCode: "", zonaCode: "", subzonaCode: "", zonaLabel: "", subzonaLabel: "", nomorAset: "", category: "", status: "Tersedia", condition: "Baik", value: "", budgetType: "", procurementDate: "" });
    setTemplateSpecs([]); setCustomSpecs([]);
  };

  const handleDelete = () => { setAssets(assets.filter(a => a.id !== selectedAsset.id)); setShowDeleteConfirm(false); setSelectedAsset(null); };

  const handleExport = () => {
    const headers = ["ID Aset", "Nama", "Kategori", "Entitas", "Branch", "Zona", "Subzona", "Status", "Budget Type", "Nilai", "Tgl Pengadaan"];
    const rows = filtered.map(a => [a.id, a.name, a.category, a.entitas, a.branch, a.zona, a.subzona, a.status, a.budgetType, a.value, a.procurementDate]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a"); link.href = url; link.download = "inventory-aset.csv"; link.click();
  };

  // Preview kode sebelum generate
  const codePreview = canGenerate
    ? `${formData.entitasCode}-${formData.branchCode}-${formData.zonaCode}-${formData.subzonaCode}-${formData.nomorAset}`
    : null;

  return (
    <div className="view-asset-wrapper">

      {/* ── HEADER ── */}
      <div className="view-header">
        <div>
          <h1 className="view-title">Inventory Aset</h1>
          <p className="view-subtitle">Super Admin Access · {assets.length} total aset terdaftar</p>
        </div>
        <button className="add-asset-btn" onClick={() => setShowModal(true)}><FaPlus /> Input Aset Baru</button>
      </div>

      {/* ── KPI CARDS ── */}
      <div className="kpi-grid">
        <div className="kpi-card kpi-total"><div className="kpi-icon"><FaDatabase /></div><div className="kpi-body"><div className="kpi-val">{kpi.total}</div><div className="kpi-lbl">Total Aset</div></div></div>
        <div className="kpi-card kpi-tersedia"><div className="kpi-icon"><FaCheckCircle /></div><div className="kpi-body"><div className="kpi-val">{kpi.tersedia}</div><div className="kpi-lbl">Tersedia</div></div></div>
        <div className="kpi-card kpi-dipinjam"><div className="kpi-icon"><FaBoxOpen /></div><div className="kpi-body"><div className="kpi-val">{kpi.dipinjam}</div><div className="kpi-lbl">Dipinjam</div></div></div>
        <div className="kpi-card kpi-maintenance"><div className="kpi-icon"><FaTools /></div><div className="kpi-body"><div className="kpi-val">{kpi.maintenance}</div><div className="kpi-lbl">Maintenance</div></div></div>
        <div className="kpi-card kpi-nilai"><div className="kpi-icon"><FaMoneyBillWave /></div><div className="kpi-body"><div className="kpi-val kpi-val--sm">{fmt(kpi.totalNilai)}</div><div className="kpi-lbl">Total Nilai Aset</div></div></div>
      </div>

      {/* ── SEARCH & FILTER ── */}
      <div className="table-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Cari ID aset, nama, atau branch..." value={search} onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }} />
        </div>
        <div className="filter-actions">
          <button className={`control-btn ${showFilterPanel ? "active" : ""}`} onClick={() => setShowFilterPanel(!showFilterPanel)}>
            <FaFilter /> Filter
            {activeFiltersCount > 0 && <span className="filter-badge">{activeFiltersCount}</span>}
            <FaChevronDown size={10} style={{ transition: "transform 0.2s", transform: showFilterPanel ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>
          <button className="control-btn" onClick={handleExport}><FaFileDownload /> Export CSV</button>
        </div>
      </div>

      {/* ── FILTER PANEL ── */}
      {showFilterPanel && (
        <div className="filter-panel">
          <div className="filter-panel-grid">
            <div className="filter-group"><label>Status</label>
              <select value={filterStatus} onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}>
                <option value="">Semua Status</option><option>Tersedia</option><option>Dipinjam</option><option>Maintenance</option>
              </select>
            </div>
            <div className="filter-group"><label>Kategori</label>
              <select value={filterCategory} onChange={(e) => { setFilterCategory(e.target.value); setCurrentPage(1); }}>
                <option value="">Semua Kategori</option><option>IT Equipment</option><option>Kendaraan</option><option>Alat Berat</option><option>Furniture</option>
              </select>
            </div>
            <div className="filter-group"><label>Branch</label>
              <select value={filterBranch} onChange={(e) => { setFilterBranch(e.target.value); setCurrentPage(1); }}>
                <option value="">Semua Branch</option>
                {branchList.map(b => <option key={b.code}>{b.name}</option>)}
              </select>
            </div>
            <div className="filter-group"><label>Budget Type</label>
              <select value={filterBudget} onChange={(e) => { setFilterBudget(e.target.value); setCurrentPage(1); }}>
                <option value="">Semua</option><option value="CAPEX">CAPEX</option><option value="OPEX">OPEX</option>
              </select>
            </div>
          </div>
          {activeFiltersCount > 0 && <button className="filter-reset-btn" onClick={resetFilters}><FaTimes size={11} /> Reset Filter</button>}
        </div>
      )}

      {/* ── TABLE ── */}
      <div className="table-container">
        <div className="table-info-bar">
          <span>Menampilkan <strong>{paginated.length}</strong> dari <strong>{filtered.length}</strong> aset</span>
          {activeFiltersCount > 0 && <span className="filter-active-note"><FaExclamationTriangle size={11} /> Filter aktif</span>}
        </div>
        <table className="asset-table">
          <thead>
            <tr>
              <th>ID ASET</th><th>NAMA ASET</th><th>LOKASI</th><th>KATEGORI</th>
              <th>TGL PENGADAAN</th><th>BUDGET</th><th>NILAI</th><th>STATUS</th><th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr><td colSpan="9">
                <div className="empty-state">
                  <div className="empty-state-icon"><FaBoxOpen /></div>
                  <div className="empty-state-title">Tidak ada aset ditemukan</div>
                  <div className="empty-state-sub">{activeFiltersCount > 0 || search ? "Coba ubah kata kunci atau reset filter." : "Belum ada aset. Klik \"Input Aset Baru\" untuk mulai."}</div>
                  {(activeFiltersCount > 0 || search) && <button className="empty-reset-btn" onClick={() => { resetFilters(); setSearch(""); }}>Reset Pencarian & Filter</button>}
                </div>
              </td></tr>
            ) : (
              paginated.map((asset) => (
                <tr key={asset.id} className="asset-row" onClick={() => { setSelectedAsset(asset); setShowDetailModal(true); }}>
                  <td><code className="asset-id-code">{asset.id}</code></td>
                  <td className="fw-bold">{asset.name}</td>
                  <td><div className="loc-text">{asset.branch}</div><div className="sub-loc-text">{asset.zona} · {asset.subzona}</div></td>
                  <td><span className="cat-badge">{asset.category}</span></td>
                  <td><div className="date-cell"><FaCalendarAlt size={11} />{fmtDate(asset.procurementDate)}</div></td>
                  <td><span className={`budget-badge ${asset.budgetType?.toLowerCase()}`}>{asset.budgetType || "—"}</span></td>
                  <td className="fw-bold">{fmt(asset.value)}</td>
                  <td><span className={`status-badge ${statusClass(asset.status)}`}>{asset.status}</span></td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <div className="action-wrap" ref={activeDropdown === asset.id ? dropdownRef : null}>
                      <button className="action-dot-btn" onClick={() => setActiveDropdown(activeDropdown === asset.id ? null : asset.id)}><FaEllipsisV /></button>
                      {activeDropdown === asset.id && (
                        <div className="action-dropdown">
                          <button onClick={() => { setSelectedAsset(asset); setShowDetailModal(true); setActiveDropdown(null); }}><FaEye /> Lihat Detail</button>
                          <button onClick={() => { setActiveDropdown(null); alert("Fitur Edit akan segera hadir."); }}><FaEdit /> Edit Aset</button>
                          <button className="action-delete" onClick={() => { setSelectedAsset(asset); setShowDeleteConfirm(true); setActiveDropdown(null); }}><FaTrash /> Hapus</button>
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
            <button className="pg-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)}><FaChevronLeft size={12} /></button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`pg-btn ${p === currentPage ? "pg-active" : ""}`} onClick={() => setCurrentPage(p)}>{p}</button>
            ))}
            <button className="pg-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)}><FaChevronRight size={12} /></button>
            <span className="pg-info">Halaman {currentPage} dari {totalPages}</span>
          </div>
        )}
      </div>

      {/* ── MODAL DETAIL ── */}
      {showDetailModal && selectedAsset && (
        <div className="modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="modal-content detail-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3><FaInfoCircle /> Detail Aset</h3>
              <button className="close-btn" onClick={() => setShowDetailModal(false)}><FaTimes /></button>
            </div>
            <div className="detail-body">
              <div className="detail-hero">
                <div className="detail-hero-name">{selectedAsset.name}</div>
                <span className={`status-badge ${statusClass(selectedAsset.status)}`}>{selectedAsset.status}</span>
              </div>
              <code className="detail-id">{selectedAsset.id}</code>
              <div className="detail-grid">
                <div className="detail-item"><span className="detail-lbl">Entitas</span><span className="detail-val">{selectedAsset.entitas || "—"}</span></div>
                <div className="detail-item"><span className="detail-lbl">Branch</span><span className="detail-val">{selectedAsset.branch}</span></div>
                <div className="detail-item"><span className="detail-lbl">Kode Zona</span><span className="detail-val">{selectedAsset.zona}</span></div>
                <div className="detail-item"><span className="detail-lbl">Kode Subzona</span><span className="detail-val">{selectedAsset.subzona}</span></div>
                <div className="detail-item"><span className="detail-lbl">Kategori</span><span className="detail-val">{selectedAsset.category}</span></div>
                <div className="detail-item"><span className="detail-lbl">Budget Type</span><span className="detail-val"><span className={`budget-badge ${selectedAsset.budgetType?.toLowerCase()}`}>{selectedAsset.budgetType || "—"}</span></span></div>
                <div className="detail-item"><span className="detail-lbl">Tgl Pengadaan</span><span className="detail-val">{fmtDate(selectedAsset.procurementDate)}</span></div>
                <div className="detail-item"><span className="detail-lbl">Nilai Aset</span><span className="detail-val detail-val--highlight">{fmt(selectedAsset.value)}</span></div>
              </div>
            </div>
            <div className="modal-footer sticky-footer">
              <button className="btn-cancel" onClick={() => setShowDetailModal(false)}>Tutup</button>
              <button className="btn-save" onClick={() => { setShowDetailModal(false); alert("Fitur Edit akan segera hadir."); }}><FaEdit /> Edit Aset</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL HAPUS ── */}
      {showDeleteConfirm && selectedAsset && (
        <div className="modal-overlay">
          <div className="modal-content confirm-modal">
            <div className="confirm-icon"><FaExclamationTriangle /></div>
            <h3>Hapus Aset?</h3>
            <p>Aset <strong>{selectedAsset.name}</strong> dengan ID <code>{selectedAsset.id}</code> akan dihapus permanen.</p>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setShowDeleteConfirm(false)}>Batal</button>
              <button className="btn-delete-confirm" onClick={handleDelete}><FaTrash /> Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL INPUT ASET ── */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h3><FaDatabase /> Input Data Aset Lengkap</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>

            <form className="asset-form-scroll" onSubmit={(e) => e.preventDefault()}>

              {/* SECTION 1: LOKASI & KODE ASET */}
              <div className="form-section">
                <h4 className="section-label"><FaMapMarkerAlt /> 1. Lokasi Aset & Kode Identifikasi</h4>
                <p className="section-desc">
                  Isi semua komponen lokasi dan nomor aset, lalu klik <strong>Generate Kode</strong>.
                  Format: <code className="inline-code">ENTITAS · BRANCH · ZONA · SUBZONA · NO. ASET</code>
                </p>

                {/* Entitas + Branch */}
                <div className="form-row" style={{ marginBottom: 16 }}>
                  <div className="form-group">
                    <label>Entitas <span className="req">*</span></label>
                    <select value={formData.entitas} onChange={handleEntitasChange}
                      style={{ borderColor: formData.entitas ? "#cbd5e1" : "#00b5e2", background: formData.entitas ? "white" : "#f0f9ff" }}>
                      <option value="">-- Pilih Entitas --</option>
                      {entitasList.map((en, i) => <option key={i} value={en.name}>{en.code} — {en.name}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Branch <span className="req">*</span></label>
                    <select value={formData.branch} onChange={handleBranchChange}
                      style={{ borderColor: formData.branch ? "#cbd5e1" : "#00b5e2", background: formData.branch ? "white" : "#f0f9ff" }}>
                      <option value="">-- Pilih Branch --</option>
                      {branchList.map((b, i) => <option key={i} value={b.name}>{b.code} — {b.name}</option>)}
                    </select>
                  </div>
                </div>

                {/* Zona + Subzona + Nomor Aset */}
                <div className="form-row-5" style={{ marginBottom: 20 }}>
                  <div className="form-group">
                    <label>Kode Zona <span className="req">*</span></label>
                    <input type="text" placeholder="Cth: LPG" value={formData.zonaCode} onChange={handleZonaCodeChange} maxLength={5}
                      className="input-code-sm"
                      style={{ borderColor: formData.zonaCode ? "#cbd5e1" : "#00b5e2", background: formData.zonaCode ? "white" : "#f0f9ff" }} />
                    <span className="field-hint">Maks. 5 karakter</span>
                  </div>
                  <div className="form-group">
                    <label>Nama Zona</label>
                    <input type="text" placeholder="Lapangan Penumpukan Gas" value={formData.zonaLabel}
                      onChange={(e) => setFormData({ ...formData, zonaLabel: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Kode Subzona <span className="req">*</span></label>
                    <input type="text" placeholder="Cth: DMG" value={formData.subzonaCode} onChange={handleSubzonaCodeChange} maxLength={5}
                      className="input-code-sm"
                      style={{ borderColor: formData.subzonaCode ? "#cbd5e1" : "#00b5e2", background: formData.subzonaCode ? "white" : "#f0f9ff" }} />
                    <span className="field-hint">Maks. 5 karakter</span>
                  </div>
                  <div className="form-group">
                    <label>Nama Subzona</label>
                    <input type="text" placeholder="Dermaga Gas" value={formData.subzonaLabel}
                      onChange={(e) => setFormData({ ...formData, subzonaLabel: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Nomor Aset <span className="req">*</span></label>
                    <input type="text" placeholder="Cth: 01" value={formData.nomorAset} onChange={handleNomorAsetChange} maxLength={5}
                      className="input-code-sm"
                      style={{ borderColor: formData.nomorAset ? "#cbd5e1" : "#00b5e2", background: formData.nomorAset ? "white" : "#f0f9ff" }} />
                    <span className="field-hint">Nomor fisik aset</span>
                  </div>
                </div>

                {/* Generate Kode Block */}
                <div className="generate-code-block">
                  <label className="generate-label">Kode Aset <span className="req">*</span></label>

                  {/* Preview real-time */}
                  {codePreview && (
                    <div className="code-preview">
                      <span>Preview:</span>
                      <code>{codePreview}</code>
                      {formData.assetId
                        ? <span className="preview-ok">✓ Kode berhasil digenerate</span>
                        : <span className="preview-note">— klik Generate untuk konfirmasi</span>
                      }
                    </div>
                  )}

                  <div className="input-group-generate">
                    <input type="text"
                      placeholder="Isi semua komponen di atas lalu klik Generate"
                      value={formData.assetId}
                      readOnly
                      className="input-code" />
                    <button type="button"
                      className={`btn-generate ${!canGenerate ? "btn-generate--disabled" : ""}`}
                      onClick={handleGenerateCode}
                      disabled={!canGenerate}
                      title={!canGenerate ? "Lengkapi semua komponen kode terlebih dahulu" : "Generate kode aset"}>
                      <FaMagic /> Generate
                    </button>
                  </div>

                  {!canGenerate && (
                    <span className="generate-warning">
                      ⚠ Wajib isi: {[
                        !formData.entitasCode && "Entitas",
                        !formData.branchCode && "Branch",
                        !formData.zonaCode && "Kode Zona",
                        !formData.subzonaCode && "Kode Subzona",
                        !formData.nomorAset && "Nomor Aset",
                      ].filter(Boolean).join(", ")}
                    </span>
                  )}
                </div>
              </div>

              {/* SECTION 2: INFORMASI ASET */}
              <div className="form-section">
                <h4 className="section-label"><FaBarcode /> 2. Informasi Aset</h4>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label>Nama Aset <span className="req">*</span></label>
                  <input type="text" placeholder="Contoh: CCTV Hikvision BL 01" value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="form-row" style={{ marginBottom: 16 }}>
                  <div className="form-group">
                    <label>Kategori <span className="req">*</span></label>
                    <select onChange={handleCategoryChange} value={formData.category}>
                      <option value="">-- Pilih Kategori --</option>
                      <option value="IT Equipment">IT Equipment</option>
                      <option value="Kendaraan">Kendaraan Operasional</option>
                      <option value="Alat Berat">Alat Berat (HMC/RTG)</option>
                      <option value="Furniture">Furniture</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Tanggal Pengadaan</label>
                    <input type="date" value={formData.procurementDate}
                      onChange={(e) => setFormData({ ...formData, procurementDate: e.target.value })} />
                  </div>
                </div>
                <div className="form-row-3">
                  <div className="form-group">
                    <label>Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                      <option>Tersedia</option><option>Dipinjam</option><option>Maintenance</option><option>Rusak (Write-off)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Nilai Aset (IDR)</label>
                    <input type="number" placeholder="Rp 0" value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Budget Type <span className="req">*</span></label>
                    <select value={formData.budgetType} onChange={(e) => setFormData({ ...formData, budgetType: e.target.value })}>
                      <option value="">Pilih...</option>
                      <option value="CAPEX">CAPEX (Investasi)</option>
                      <option value="OPEX">OPEX (Operasional)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 3: SPESIFIKASI */}
              <div className="form-section bg-blue">
                <h4 className="section-label"><FaCogs /> 3. Spesifikasi Teknis</h4>
                {!formData.category ? (
                  <div className="empty-state-spec"><FaInfoCircle /> Pilih <b>Kategori</b> di atas untuk menampilkan kolom spesifikasi.</div>
                ) : (
                  <div className="form-grid-2">
                    {templateSpecs.map((spec, i) => (
                      <div className="form-group" key={i}>
                        <label>{spec.label}</label>
                        <input type="text" placeholder={`Isi ${spec.label}...`} value={spec.value}
                          onChange={(e) => handleTemplateSpecChange(i, e.target.value)} />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 4: CUSTOM SPEC */}
              <div className="form-section">
                <div className="flex-between">
                  <h4 className="section-label">4. Spesifikasi Tambahan (Opsional)</h4>
                  <button type="button" className="btn-small-add" onClick={addCustomSpec}><FaPlus /> Tambah</button>
                </div>
                {customSpecs.length === 0 && <p className="empty-text">Tambahkan spesifikasi unik jika tidak ada di template.</p>}
                {customSpecs.map((spec, i) => (
                  <div className="custom-spec-row" key={i}>
                    <input type="text" placeholder="Nama Spec" value={spec.key} onChange={(e) => handleCustomSpecChange(i, "key", e.target.value)} />
                    <input type="text" placeholder="Nilai" value={spec.value} onChange={(e) => handleCustomSpecChange(i, "value", e.target.value)} />
                    <button type="button" className="btn-trash" onClick={() => removeCustomSpec(i)}><FaTrash /></button>
                  </div>
                ))}
              </div>
            </form>

            <div className="modal-footer sticky-footer">
              <button type="button" className="btn-cancel" onClick={() => setShowModal(false)}>Batal</button>
              <button type="button" className="btn-save" onClick={handleSave}><FaSave /> Simpan Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAsset;