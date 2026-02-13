import React, { useState, useEffect } from "react";
import { 
  FaSearch, FaFilter, FaPlus, FaEllipsisV, FaFileDownload, 
  FaTimes, FaSave, FaTrash, FaDatabase, FaMapMarkerAlt, FaCogs, 
  FaInfoCircle, FaMagic, FaBarcode 
} from "react-icons/fa";
import "./ViewAsset.css";

const ViewAsset = () => {
  // --- 1. DATA BRANCH (Simulasi Database) ---
  // Nanti ini bisa diganti dengan axios.get('/api/branches')
  const branchList = [
    { name: "Pelindo Belawan", code: "BLW" },
    { name: "Pelindo Dumai", code: "DMI" },
    { name: "Pelindo Lhokseumawe", code: "LKS" },
    { name: "Pelindo Tanjung Balai Asahan", code: "TBA" },
    { name: "Pelindo Malahayati", code: "MLH" },
    { name: "Pelindo Gunung Sitoli", code: "GNS" },
    { name: "Pelindo Kuala Tanjung", code: "KTJ" },
    { name: "Pelindo Sibolga", code: "SBG" },
    { name: "Pelindo Pekanbaru", code: "PKB" }
  ];

  // --- MOCK DATA ASET (Tabel Utama) ---
  const [assets] = useState([
    { id: "PLD-BLW-IT-2026-001", name: "MacBook Pro M2", category: "IT Equipment", status: "Tersedia", branch: "Pelindo Belawan", zona: "Zona Kantor", value: "Rp 25.000.000" },
    { id: "PLD-DMI-AB-2025-042", name: "Excavator CAT", category: "Alat Berat", status: "Maintenance", branch: "Pelindo Dumai", zona: "Dermaga Curah", value: "Rp 1.200.000.000" },
  ]);

  const [showModal, setShowModal] = useState(false);
  
  // State Form Input
  const [formData, setFormData] = useState({
    assetId: "",      
    name: "",
    branch: "",       
    branchCode: "",   
    zona: "",
    subzona: "",
    category: "",
    status: "Tersedia",
    condition: "Baik",
    value: "",
    budgetType: "",   // CAPEX / OPEX
  });

  const [templateSpecs, setTemplateSpecs] = useState([]); 
  const [customSpecs, setCustomSpecs] = useState([]); 

  // --- LOGIKA GENERATE KODE OTOMATIS ---
  const handleGenerateCode = () => {
    // Validasi: Harus pilih Branch dan Kategori dulu
    if (!formData.category || !formData.branch) {
      alert("Mohon pilih Branch dan Kategori terlebih dahulu!");
      return;
    }

    const prefix = "PLD";
    const brCode = formData.branchCode || "HO"; // Default jika kosong
    const year = new Date().getFullYear();
    
    // Kode Kategori Singkat
    let catCode = "GEN"; 
    if (formData.category === "IT Equipment") catCode = "IT";
    if (formData.category === "Kendaraan") catCode = "VH"; 
    if (formData.category === "Alat Berat") catCode = "AB"; 
    if (formData.category === "Furniture") catCode = "FUR";

    // Random Sequence (Simulasi Auto Increment)
    const randomSeq = Math.floor(1000 + Math.random() * 9000);

    // Format: PLD - CABANG - KATEGORI - TAHUN - URUTAN
    const generated = `${prefix}-${brCode}-${catCode}-${year}-${randomSeq}`;
    setFormData({ ...formData, assetId: generated });
  };

  // --- HANDLE PERUBAHAN INPUT ---
  const handleBranchChange = (e) => {
    const selectedName = e.target.value;
    const selectedData = branchList.find(b => b.name === selectedName);
    
    setFormData({
      ...formData,
      branch: selectedName,
      branchCode: selectedData ? selectedData.code : "" 
    });
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setFormData({ ...formData, category: category });

    // Reset Template Spesifikasi saat kategori berubah
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
    } else {
      setTemplateSpecs([]);
    }
  };

  const handleTemplateSpecChange = (index, val) => {
    const newSpecs = [...templateSpecs];
    newSpecs[index].value = val;
    setTemplateSpecs(newSpecs);
  };

  // --- LOGIKA CUSTOM SPECS ---
  const addCustomSpec = () => {
    setCustomSpecs([...customSpecs, { key: "", value: "" }]);
  };

  const removeCustomSpec = (index) => {
    const newSpecs = [...customSpecs];
    newSpecs.splice(index, 1);
    setCustomSpecs(newSpecs);
  };

  const handleCustomSpecChange = (index, field, val) => {
    const newSpecs = [...customSpecs];
    newSpecs[index][field] = val;
    setCustomSpecs(newSpecs);
  };

  return (
    <div className="view-asset-wrapper">
      {/* HEADER */}
      <div className="view-header">
        <div>
          <h1 className="view-title">Inventory Aset</h1>
          <p className="view-subtitle">Super Admin Access</p>
        </div>
        <button className="add-asset-btn" onClick={() => setShowModal(true)}>
          <FaPlus /> Input Aset Baru
        </button>
      </div>

      {/* SEARCH & FILTER */}
      <div className="table-controls">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Cari ID, nama aset, atau branch..." />
        </div>
        <div className="filter-actions">
          <button className="control-btn"><FaFilter /> Filter</button>
          <button className="control-btn"><FaFileDownload /> Export</button>
        </div>
      </div>

      {/* TABLE DATA */}
      <div className="table-container">
        <table className="asset-table">
          <thead>
            <tr>
              <th>ID ASET</th>
              <th>NAMA ASET</th>
              <th>LOKASI</th>
              <th>KATEGORI</th>
              <th>STATUS</th>
              <th>NILAI</th>
              <th>AKSI</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset.id}>
                <td className="fw-bold">{asset.id}</td>
                <td>{asset.name}</td>
                <td>
                  <div className="loc-text">{asset.branch}</div>
                  <div className="sub-loc-text">{asset.zona}</div>
                </td>
                <td><span className="cat-badge">{asset.category}</span></td>
                <td><span className={`status-badge ${asset.status.toLowerCase().replace(" ", "-")}`}>{asset.status}</span></td>
                <td>{asset.value}</td>
                <td><button className="action-dot-btn"><FaEllipsisV /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM INPUT */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content large-modal">
            <div className="modal-header">
              <h3><FaDatabase /> Input Data Aset Lengkap</h3>
              <button className="close-btn" onClick={() => setShowModal(false)}><FaTimes /></button>
            </div>
            
            <form className="asset-form-scroll">
              
              {/* SECTION 1: LOKASI & HIERARKI */}
              <div className="form-section">
                <h4 className="section-label"><FaMapMarkerAlt /> 1. Lokasi & Hierarki</h4>
                <div className="form-row-3">
                  <div className="form-group">
                    <label>Branch (Cabang)</label>
                    <select 
                      onChange={handleBranchChange} 
                      value={formData.branch}
                      style={{
                        borderColor: formData.branch ? '#cbd5e1' : '#00b5e2', 
                        background: formData.branch ? 'white' : '#f0f9ff'
                      }}
                    >
                      <option value="">-- Pilih Branch --</option>
                      {branchList.map((branch, index) => (
                        <option key={index} value={branch.name}>{branch.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Zona</label>
                    <select value={formData.zona} onChange={(e) => setFormData({...formData, zona: e.target.value})}>
                      <option value="">Pilih Zona...</option>
                      <option>Zona 1 (Terminal Peti Kemas)</option>
                      <option>Zona 2 (Perkantoran)</option>
                      <option>Zona 3 (Dermaga Curah)</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Sub Zona / Ruangan</label>
                    <input type="text" placeholder="Cth: Ruang Server Lt.2" />
                  </div>
                </div>
              </div>

              {/* SECTION 2: INFORMASI UTAMA & GENERATE CODE */}
              <div className="form-section">
                <h4 className="section-label"><FaBarcode /> 2. Identitas & Informasi Aset</h4>
                
                {/* Baris Kategori & Auto Generate */}
                <div className="form-row">
                   <div className="form-group">
                    <label>Kategori (Wajib Pilih Dulu)</label>
                    <select 
                      onChange={handleCategoryChange} 
                      value={formData.category} 
                      style={{
                        borderColor: formData.category ? '#cbd5e1' : '#00b5e2', 
                        background: formData.category ? 'white' : '#f0f9ff'
                      }}
                    >
                      <option value="">-- PILIH KATEGORI --</option>
                      <option value="IT Equipment">IT Equipment</option>
                      <option value="Kendaraan">Kendaraan Operasional</option>
                      <option value="Alat Berat">Alat Berat (HMC/RTG)</option>
                      <option value="Furniture">Furniture</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Kode Aset (Auto Generate)</label>
                    <div className="input-group-generate">
                      <input 
                        type="text" 
                        placeholder="PLD-XXX-KAT-YYYY-..." 
                        value={formData.assetId}
                        readOnly 
                        className="input-code"
                      />
                      <button type="button" className="btn-generate" onClick={handleGenerateCode}>
                        <FaMagic /> Generate
                      </button>
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Nama Aset</label>
                  <input type="text" placeholder="Contoh: Laptop Thinkpad X1 Carbon Gen 10" />
                </div>

                {/* Baris Status, Nilai, Budget Type */}
                <div className="form-row-3">
                    <div className="form-group">
                        <label>Status</label>
                        <select>
                            <option>Tersedia</option>
                            <option>Dipinjam</option>
                            <option>Maintenance</option>
                            <option>Rusak (Write-off)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Nilai Aset (IDR)</label>
                        <input type="number" placeholder="Rp 0" />
                    </div>
                    <div className="form-group">
                        <label>Budget Type <span style={{color:'#ef4444'}}>*</span></label>
                        <select 
                          value={formData.budgetType} 
                          onChange={(e) => setFormData({...formData, budgetType: e.target.value})}
                        >
                            <option value="">Pilih...</option>
                            <option value="CAPEX">CAPEX (Investasi)</option>
                            <option value="OPEX">OPEX (Operasional)</option>
                        </select>
                    </div>
                </div>
              </div>

              {/* SECTION 3: SPESIFIKASI TEMPLATE */}
              <div className="form-section bg-blue">
                <h4 className="section-label"><FaCogs /> 3. Spesifikasi Teknis</h4>
                
                {!formData.category ? (
                   <div className="empty-state-spec">
                     <FaInfoCircle /> Silakan pilih <b>Kategori</b> di atas untuk menampilkan kolom spesifikasi.
                   </div>
                ) : (
                  <div className="form-grid-2">
                    {templateSpecs.map((spec, index) => (
                      <div className="form-group" key={index}>
                        <label>{spec.label}</label>
                        <input 
                          type="text" 
                          placeholder={`Isi ${spec.label}...`}
                          value={spec.value}
                          onChange={(e) => handleTemplateSpecChange(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* SECTION 4: CUSTOM SPEC (FLEXBOX FIX) */}
              <div className="form-section">
                <div className="flex-between">
                  <h4 className="section-label">4. Spesifikasi Tambahan (Opsional)</h4>
                  <button type="button" className="btn-small-add" onClick={addCustomSpec}>
                    <FaPlus /> Tambah
                  </button>
                </div>
                {customSpecs.length === 0 && <p className="empty-text">Tambahkan spesifikasi unik jika tidak ada di template.</p>}
                
                {customSpecs.map((spec, index) => (
                  <div className="custom-spec-row" key={index}>
                    <input 
                      type="text" 
                      placeholder="Nama Spec (Cth: Warna)" 
                      value={spec.key}
                      onChange={(e) => handleCustomSpecChange(index, "key", e.target.value)}
                    />
                    <input 
                      type="text" 
                      placeholder="Nilai (Cth: Hitam Glossy)" 
                      value={spec.value}
                      onChange={(e) => handleCustomSpecChange(index, "value", e.target.value)}
                    />
                    <button type="button" className="btn-trash" onClick={() => removeCustomSpec(index)}>
                      <FaTrash />
                    </button>
                  </div>
                ))}
              </div>

            </form>

            <div className="modal-footer sticky-footer">
              <button className="btn-cancel" onClick={() => setShowModal(false)}>Batal</button>
              <button className="btn-save"><FaSave /> Simpan Data</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAsset;