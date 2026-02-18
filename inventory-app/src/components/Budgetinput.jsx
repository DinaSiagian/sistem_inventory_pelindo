import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Save,
  X,
  Plus,
  Trash2,
  Upload,
  FileText,
  DollarSign,
  Calendar,
  Hash,
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Package,
  Layers,
} from "lucide-react";
import "./BudgetInput.css";

// ═══════════════════════════════════════════════════════════════
// KOMPONEN: BudgetInput - Halaman Khusus untuk Input Anggaran
// ═══════════════════════════════════════════════════════════════

const BudgetInput = () => {
  const navigate = useNavigate();
  const [budgetType, setBudgetType] = useState("opex"); // opex | capex
  const [step, setStep] = useState(1); // 1: pilih tipe, 2: isi form

  // ── State untuk OPEX ──────────────────────────────────────────
  const [opexForm, setOpexForm] = useState({
    kd_anggaran_master: "",
    nm_anggaran_master: "",
    thn_anggaran: new Date().getFullYear(),
    nilai_anggaran_tahunan: "",
  });

  const [opexAssets, setOpexAssets] = useState([
    {
      id: Date.now(),
      asset_code: "",
      name: "",
      brand: "",
      model: "",
      acquisition_value: "",
      procurement_date: new Date().toISOString().split("T")[0],
    },
  ]);

  // ── State untuk CAPEX ─────────────────────────────────────────
  const [capexForm, setCapexForm] = useState({
    kd_anggaran_master: "5900100000",
    kd_anggaran_capex: "",
    nm_anggaran_capex: "",
    thn_rkap_awal: new Date().getFullYear(),
    thn_rkap_akhir: new Date().getFullYear() + 1,
    thn_anggaran: new Date().getFullYear(),
    nilai_anggaran_rkap: "",
  });

  const [capexProjects, setCapexProjects] = useState([
    {
      id: Date.now(),
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
      // ── BARU: setiap pekerjaan punya daftar aset sendiri ──
      assets: [],
    },
  ]);

  // ── Master Data Options ───────────────────────────────────────
  const opexMasters = [
    { code: "5030905000", name: "Beban Pemeliharaan Software" },
    { code: "5021300000", name: "Beban Jaringan dan Koneksi Data" },
    { code: "5021200000", name: "Beban Perlengkapan Kantor" },
    { code: "5081500000", name: "Beban Jasa Konsultan" },
    { code: "5060700000", name: "Beban Sumber Daya Pihak Ketiga Peralatan" },
  ];

  // ── Handlers OPEX ─────────────────────────────────────────────
  const addOpexAsset = () => {
    setOpexAssets([
      ...opexAssets,
      {
        id: Date.now(),
        asset_code: "",
        name: "",
        brand: "",
        model: "",
        acquisition_value: "",
        procurement_date: new Date().toISOString().split("T")[0],
      },
    ]);
  };

  const removeOpexAsset = (id) => {
    if (opexAssets.length > 1) {
      setOpexAssets(opexAssets.filter((a) => a.id !== id));
    }
  };

  const updateOpexAsset = (id, field, value) => {
    setOpexAssets(
      opexAssets.map((a) => (a.id === id ? { ...a, [field]: value } : a)),
    );
  };

  // ── Handlers CAPEX Projects ───────────────────────────────────
  const addCapexProject = () => {
    setCapexProjects([
      ...capexProjects,
      {
        id: Date.now(),
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
      },
    ]);
  };

  const removeCapexProject = (id) => {
    if (capexProjects.length > 1) {
      setCapexProjects(capexProjects.filter((p) => p.id !== id));
    }
  };

  const updateCapexProject = (id, field, value) => {
    setCapexProjects(
      capexProjects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  // ── Handlers CAPEX Assets (per project) ──────────────────────
  const addCapexAsset = (projectId) => {
    setCapexProjects(
      capexProjects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              assets: [
                ...p.assets,
                {
                  id: Date.now(),
                  asset_code: "",
                  name: "",
                  brand: "",
                  model: "",
                  serial_number: "",
                  procurement_date: new Date().toISOString().split("T")[0],
                },
              ],
            }
          : p,
      ),
    );
  };

  const removeCapexAsset = (projectId, assetId) => {
    setCapexProjects(
      capexProjects.map((p) =>
        p.id === projectId
          ? { ...p, assets: p.assets.filter((a) => a.id !== assetId) }
          : p,
      ),
    );
  };

  const updateCapexAsset = (projectId, assetId, field, value) => {
    setCapexProjects(
      capexProjects.map((p) =>
        p.id === projectId
          ? {
              ...p,
              assets: p.assets.map((a) =>
                a.id === assetId ? { ...a, [field]: value } : a,
              ),
            }
          : p,
      ),
    );
  };

  // ── Submit ────────────────────────────────────────────────────
  const handleSubmit = () => {
    if (budgetType === "opex") {
      console.log("Submit OPEX:", { budget: opexForm, assets: opexAssets });
      // POST ke API: /api/budget-annual-opex + /api/assets
    } else {
      console.log("Submit CAPEX:", {
        budget: capexForm,
        projects: capexProjects,
      });
      // POST ke API: /api/budget-annual-capex + /api/budget-projects + /api/assets
    }

    alert(`Data ${budgetType.toUpperCase()} berhasil disimpan!`);
    navigate("/budget");
  };

  const fmt = (num) => new Intl.NumberFormat("id-ID").format(num || 0);

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="bi-root">
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
        <div className="bi-header-right">
          <span className="bi-year-badge">
            Tahun:{" "}
            {budgetType === "opex"
              ? opexForm.thn_anggaran
              : capexForm.thn_anggaran}
          </span>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="bi-steps">
        <div
          className={`bi-step ${step >= 1 ? "active" : ""} ${step > 1 ? "done" : ""}`}
        >
          <div className="bi-step-num">
            {step > 1 ? <CheckCircle size={18} /> : "1"}
          </div>
          <span>Pilih Tipe Anggaran</span>
        </div>
        <div className="bi-step-line"></div>
        <div className={`bi-step ${step >= 2 ? "active" : ""}`}>
          <div className="bi-step-num">2</div>
          <span>Isi Data Anggaran</span>
        </div>
      </div>

      {/* Step 1: Pilih Tipe */}
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

      {/* Step 2: Form OPEX */}
      {step === 2 && budgetType === "opex" && (
        <div className="bi-content">
          <div className="bi-form-card">
            <div className="bi-form-header">
              <FileText size={20} />
              <h2>Data Pos Anggaran OPEX</h2>
            </div>

            <div className="bi-form-grid">
              <div className="bi-form-group">
                <label>Mata Anggaran *</label>
                <select
                  value={opexForm.kd_anggaran_master}
                  onChange={(e) => {
                    const master = opexMasters.find(
                      (m) => m.code === e.target.value,
                    );
                    setOpexForm({
                      ...opexForm,
                      kd_anggaran_master: e.target.value,
                      nm_anggaran_master: master?.name || "",
                    });
                  }}
                >
                  <option value="">-- Pilih Mata Anggaran --</option>
                  {opexMasters.map((m) => (
                    <option key={m.code} value={m.code}>
                      {m.code} - {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="bi-form-group">
                <label>Tahun Anggaran *</label>
                <input
                  type="number"
                  value={opexForm.thn_anggaran}
                  onChange={(e) =>
                    setOpexForm({
                      ...opexForm,
                      thn_anggaran: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="bi-form-group full">
                <label>Total Pagu Anggaran (IDR) *</label>
                <input
                  type="number"
                  value={opexForm.nilai_anggaran_tahunan}
                  onChange={(e) =>
                    setOpexForm({
                      ...opexForm,
                      nilai_anggaran_tahunan: e.target.value,
                    })
                  }
                  placeholder="500000000"
                />
                {opexForm.nilai_anggaran_tahunan && (
                  <span className="bi-helper">
                    ≈ Rp {fmt(opexForm.nilai_anggaran_tahunan)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Daftar Aset OPEX */}
          <div className="bi-form-card">
            <div className="bi-form-header">
              <Package size={20} />
              <h2>Daftar Aset Terealisasi ({opexAssets.length})</h2>
              <button className="bi-btn-add" onClick={addOpexAsset}>
                <Plus size={16} /> Tambah Aset
              </button>
            </div>

            {opexAssets.map((asset, idx) => (
              <div key={asset.id} className="bi-asset-item">
                <div className="bi-asset-header">
                  <span className="bi-asset-num">Aset #{idx + 1}</span>
                  {opexAssets.length > 1 && (
                    <button
                      className="bi-btn-remove"
                      onClick={() => removeOpexAsset(asset.id)}
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  )}
                </div>

                <div className="bi-form-grid">
                  <div className="bi-form-group">
                    <label>Kode Aset *</label>
                    <input
                      value={asset.asset_code}
                      onChange={(e) =>
                        updateOpexAsset(asset.id, "asset_code", e.target.value)
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
                      onChange={(e) =>
                        updateOpexAsset(asset.id, "model", e.target.value)
                      }
                      placeholder="Office 365"
                    />
                  </div>

                  <div className="bi-form-group full">
                    <label>Nilai Perolehan (IDR) *</label>
                    <input
                      type="number"
                      value={asset.acquisition_value}
                      onChange={(e) =>
                        updateOpexAsset(
                          asset.id,
                          "acquisition_value",
                          e.target.value,
                        )
                      }
                      placeholder="15000000"
                    />
                    {asset.acquisition_value && (
                      <span className="bi-helper">
                        ≈ Rp {fmt(asset.acquisition_value)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div className="bi-summary">
              <div className="bi-summary-item">
                <span>Total Pagu</span>
                <strong>Rp {fmt(opexForm.nilai_anggaran_tahunan)}</strong>
              </div>
              <div className="bi-summary-item">
                <span>Total Realisasi</span>
                <strong className="text-red">
                  Rp{" "}
                  {fmt(
                    opexAssets.reduce(
                      (s, a) => s + parseFloat(a.acquisition_value || 0),
                      0,
                    ),
                  )}
                </strong>
              </div>
              <div className="bi-summary-item">
                <span>Sisa Anggaran</span>
                <strong className="text-green">
                  Rp{" "}
                  {fmt(
                    parseFloat(opexForm.nilai_anggaran_tahunan || 0) -
                      opexAssets.reduce(
                        (s, a) => s + parseFloat(a.acquisition_value || 0),
                        0,
                      ),
                  )}
                </strong>
              </div>
            </div>
          </div>

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

      {/* Step 2: Form CAPEX */}
      {step === 2 && budgetType === "capex" && (
        <div className="bi-content">
          <div className="bi-form-card">
            <div className="bi-form-header">
              <FileText size={20} />
              <h2>Data Pos Anggaran CAPEX</h2>
            </div>

            <div className="bi-form-grid">
              <div className="bi-form-group">
                <label>Kode Anggaran CAPEX *</label>
                <input
                  value={capexForm.kd_anggaran_capex}
                  onChange={(e) =>
                    setCapexForm({
                      ...capexForm,
                      kd_anggaran_capex: e.target.value,
                    })
                  }
                  placeholder="2540011"
                />
              </div>

              <div className="bi-form-group">
                <label>Tahun Anggaran *</label>
                <input
                  type="number"
                  value={capexForm.thn_anggaran}
                  onChange={(e) =>
                    setCapexForm({
                      ...capexForm,
                      thn_anggaran: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="bi-form-group full">
                <label>Nama Anggaran CAPEX *</label>
                <input
                  value={capexForm.nm_anggaran_capex}
                  onChange={(e) =>
                    setCapexForm({
                      ...capexForm,
                      nm_anggaran_capex: e.target.value,
                    })
                  }
                  placeholder="Transformasi dan Digitalisasi..."
                />
              </div>

              <div className="bi-form-group">
                <label>Tahun RKAP Awal</label>
                <input
                  type="number"
                  value={capexForm.thn_rkap_awal}
                  onChange={(e) =>
                    setCapexForm({
                      ...capexForm,
                      thn_rkap_awal: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="bi-form-group">
                <label>Tahun RKAP Akhir</label>
                <input
                  type="number"
                  value={capexForm.thn_rkap_akhir}
                  onChange={(e) =>
                    setCapexForm({
                      ...capexForm,
                      thn_rkap_akhir: parseInt(e.target.value),
                    })
                  }
                />
              </div>

              <div className="bi-form-group full">
                <label>Nilai Anggaran RKAP (IDR) *</label>
                <input
                  type="number"
                  value={capexForm.nilai_anggaran_rkap}
                  onChange={(e) =>
                    setCapexForm({
                      ...capexForm,
                      nilai_anggaran_rkap: e.target.value,
                    })
                  }
                  placeholder="3000000000"
                />
                {capexForm.nilai_anggaran_rkap && (
                  <span className="bi-helper">
                    ≈ Rp {fmt(capexForm.nilai_anggaran_rkap)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Daftar Pekerjaan CAPEX */}
          <div className="bi-form-card">
            <div className="bi-form-header">
              <FileText size={20} />
              <h2>Daftar Pekerjaan / Kontrak ({capexProjects.length})</h2>
              <button className="bi-btn-add" onClick={addCapexProject}>
                <Plus size={16} /> Tambah Pekerjaan
              </button>
            </div>

            {capexProjects.map((proj, idx) => (
              <div key={proj.id} className="bi-project-item">
                <div className="bi-asset-header">
                  <span className="bi-asset-num">Pekerjaan #{idx + 1}</span>
                  {capexProjects.length > 1 && (
                    <button
                      className="bi-btn-remove"
                      onClick={() => removeCapexProject(proj.id)}
                    >
                      <Trash2 size={14} /> Hapus
                    </button>
                  )}
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
                        updateCapexProject(proj.id, "nilai_rab", e.target.value)
                      }
                      placeholder="850000000"
                    />
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
                        updateCapexProject(proj.id, "tgl_bamk", e.target.value)
                      }
                    />
                  </div>
                </div>

                {/* ── BARU: Daftar Aset per Pekerjaan CAPEX ── */}
                <div className="bi-capex-assets">
                  <div className="bi-capex-assets-header">
                    <div className="bi-capex-assets-title">
                      <Layers size={15} />
                      <span>
                        Daftar Aset Pekerjaan #{idx + 1}
                      </span>
                      <span className="bi-asset-count-badge">
                        {proj.assets.length} aset
                      </span>
                    </div>
                    <button
                      className="bi-btn-add bi-btn-add--sm"
                      onClick={() => addCapexAsset(proj.id)}
                    >
                      <Plus size={14} /> Tambah Aset
                    </button>
                  </div>

                  {proj.assets.length === 0 ? (
                    <div className="bi-capex-assets-empty">
                      <Package size={20} strokeWidth={1.4} />
                      <span>Belum ada aset — klik "Tambah Aset" untuk menambahkan</span>
                    </div>
                  ) : (
                    proj.assets.map((asset, aIdx) => (
                      <div key={asset.id} className="bi-asset-item bi-asset-item--capex">
                        <div className="bi-asset-header">
                          <span className="bi-asset-num bi-asset-num--capex">
                            Aset #{aIdx + 1}
                          </span>
                          <button
                            className="bi-btn-remove"
                            onClick={() => removeCapexAsset(proj.id, asset.id)}
                          >
                            <Trash2 size={14} /> Hapus
                          </button>
                        </div>

                        <div className="bi-form-grid">
                          <div className="bi-form-group">
                            <label>Kode Aset *</label>
                            <input
                              value={asset.asset_code}
                              onChange={(e) =>
                                updateCapexAsset(proj.id, asset.id, "asset_code", e.target.value)
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
                                updateCapexAsset(proj.id, asset.id, "procurement_date", e.target.value)
                              }
                            />
                          </div>

                          <div className="bi-form-group full">
                            <label>Nama Aset *</label>
                            <input
                              value={asset.name}
                              onChange={(e) =>
                                updateCapexAsset(proj.id, asset.id, "name", e.target.value)
                              }
                              placeholder="Server / Switch / CCTV..."
                            />
                          </div>

                          <div className="bi-form-group">
                            <label>Brand</label>
                            <input
                              value={asset.brand}
                              onChange={(e) =>
                                updateCapexAsset(proj.id, asset.id, "brand", e.target.value)
                              }
                              placeholder="Cisco"
                            />
                          </div>

                          <div className="bi-form-group">
                            <label>Model</label>
                            <input
                              value={asset.model}
                              onChange={(e) =>
                                updateCapexAsset(proj.id, asset.id, "model", e.target.value)
                              }
                              placeholder="Catalyst 2960-X"
                            />
                          </div>

                          <div className="bi-form-group full">
                            <label>Serial Number</label>
                            <input
                              value={asset.serial_number}
                              onChange={(e) =>
                                updateCapexAsset(proj.id, asset.id, "serial_number", e.target.value)
                              }
                              placeholder="SN-XXXX-XXXX"
                            />
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {/* ── END: Daftar Aset per Pekerjaan ── */}
              </div>
            ))}

            <div className="bi-summary">
              <div className="bi-summary-item">
                <span>Total Pagu RKAP</span>
                <strong>Rp {fmt(capexForm.nilai_anggaran_rkap)}</strong>
              </div>
              <div className="bi-summary-item">
                <span>Total Nilai Kontrak</span>
                <strong className="text-red">
                  Rp{" "}
                  {fmt(
                    capexProjects.reduce(
                      (s, p) => s + parseFloat(p.nilai_kontrak || 0),
                      0,
                    ),
                  )}
                </strong>
              </div>
              <div className="bi-summary-item">
                <span>Sisa Anggaran</span>
                <strong className="text-green">
                  Rp{" "}
                  {fmt(
                    parseFloat(capexForm.nilai_anggaran_rkap || 0) -
                      capexProjects.reduce(
                        (s, p) => s + parseFloat(p.nilai_kontrak || 0),
                        0,
                      ),
                  )}
                </strong>
              </div>
              <div className="bi-summary-item">
                <span>Total Aset Terdaftar</span>
                <strong className="text-blue">
                  {capexProjects.reduce((s, p) => s + p.assets.length, 0)} aset
                </strong>
              </div>
            </div>
          </div>

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