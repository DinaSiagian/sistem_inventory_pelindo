import React, { useState } from "react";
import {
  FaClipboardList, FaSearch, FaLaptop, FaCamera, FaCar, FaTv,
  FaTools, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaCheckCircle,
  FaArrowRight, FaArrowLeft, FaBox, FaTimes,
} from "react-icons/fa";

/* ============================================================
   DATA
   ============================================================ */
const availableAssets = [
  { id: "LT-0019", nama: "Laptop Dell Latitude 5540", kategori: "Laptop", lokasi: "Gudang Pusat", spek: "Intel i5-13th, 16GB RAM, 512GB SSD" },
  { id: "LT-0022", nama: "Laptop HP ProBook 450",     kategori: "Laptop", lokasi: "Gudang Pusat", spek: "Intel i5-12th, 8GB RAM, 256GB SSD" },
  { id: "LT-0028", nama: "Laptop Asus Vivobook 16",   kategori: "Laptop", lokasi: "Kantor Belawan", spek: "AMD Ryzen 5, 16GB RAM" },
  { id: "PRJ-0007", nama: "Proyektor Epson EB-FH52",  kategori: "Proyektor", lokasi: "Ruang Rapat A", spek: "1080p, 4000 Lumens" },
  { id: "PRJ-0012", nama: "Proyektor BenQ MH733",     kategori: "Proyektor", lokasi: "Ruang Rapat B", spek: "1080p, 4000 Lumens, HDMI" },
  { id: "KM-0003", nama: "Kamera Sony Alpha A7 III",  kategori: "Kamera", lokasi: "Gudang Pusat", spek: "24.2MP, 4K Video" },
  { id: "KM-0008", nama: "Kamera Canon EOS 850D",     kategori: "Kamera", lokasi: "Gudang Pusat", spek: "24.1MP, Full HD" },
  { id: "KND-0003", nama: "Toyota Fortuner B 1234 XX", kategori: "Kendaraan", lokasi: "Pool Kendaraan", spek: "2.4L Diesel, 7-seater" },
];

const iconMap  = { Laptop:<FaLaptop/>, Proyektor:<FaTv/>, Kamera:<FaCamera/>, Kendaraan:<FaCar/> };
const colorMap = { Laptop:"#004494", Proyektor:"#7c3aed", Kamera:"#0891b2", Kendaraan:"#059669" };

const today = () => new Date().toISOString().split("T")[0];
const addDays = (d, n) => { const dt = new Date(d); dt.setDate(dt.getDate()+n); return dt.toISOString().split("T")[0]; };

/* ============================================================
   STEP INDICATOR
   ============================================================ */
const StepBar = ({ step }) => {
  const steps = ["Pilih Aset", "Detail Peminjaman", "Konfirmasi"];
  return (
    <div className="ub-stepbar">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className={`ub-step ${step > i ? "ub-step--done" : ""} ${step === i ? "ub-step--active" : ""}`}>
            <div className="ub-step-num">
              {step > i ? <FaCheckCircle size={13} /> : i + 1}
            </div>
            <span className="ub-step-lbl">{s}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`ub-step-line ${step > i ? "ub-step-line--done" : ""}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

/* ============================================================
   MAIN
   ============================================================ */
const UserBorrow = () => {
  const [step, setStep]         = useState(0);
  const [search, setSearch]     = useState("");
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState({
    tglPinjam: today(),
    tglKembali: addDays(today(), 3),
    keperluan: "",
    lokTujuan: "",
    catatan: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [refNo, setRefNo]         = useState("");

  const filtered = availableAssets.filter((a) =>
    a.nama.toLowerCase().includes(search.toLowerCase()) ||
    a.kategori.toLowerCase().includes(search.toLowerCase())
  );

  const handleSubmit = () => {
    const ref = "PJM-" + String(Math.floor(Math.random() * 9000) + 1000);
    setRefNo(ref);
    setSubmitted(true);
  };

  const resetAll = () => {
    setStep(0); setSelected(null); setSearch("");
    setForm({ tglPinjam: today(), tglKembali: addDays(today(), 3), keperluan: "", lokTujuan: "", catatan: "" });
    setSubmitted(false); setRefNo("");
  };

  /* === SUKSES === */
  if (submitted) {
    return (
      <div className="ub-wrapper">
        <div className="ub-success-card">
          <div className="ub-success-icon"><FaCheckCircle /></div>
          <h2 className="ub-success-title">Pengajuan Terkirim!</h2>
          <p className="ub-success-sub">Pengajuan peminjaman aset Anda telah dikirimkan dan sedang menunggu persetujuan admin.</p>
          <div className="ub-success-ref">
            <span className="ub-ref-lbl">Nomor Referensi</span>
            <span className="ub-ref-val">{refNo}</span>
          </div>
          <div className="ub-success-detail">
            <div className="ub-sd-item"><span>Aset</span><strong>{selected?.nama}</strong></div>
            <div className="ub-sd-item"><span>Tanggal Pinjam</span><strong>{form.tglPinjam}</strong></div>
            <div className="ub-sd-item"><span>Batas Kembali</span><strong>{form.tglKembali}</strong></div>
            <div className="ub-sd-item"><span>Keperluan</span><strong>{form.keperluan}</strong></div>
          </div>
          <button className="ub-btn-primary" onClick={resetAll}>Ajukan Peminjaman Baru</button>
          <p className="ub-success-note">💡 Cek status pengajuan di halaman <strong>Riwayat Peminjaman</strong></p>
        </div>
        <style>{ubStyles}</style>
      </div>
    );
  }

  return (
    <div className="ub-wrapper">
      {/* HEADER */}
      <div className="ub-header">
        <div className="ub-header-icon"><FaClipboardList /></div>
        <div>
          <h1 className="ub-title">Ajukan Peminjaman</h1>
          <p className="ub-subtitle">Pilih aset dan isi detail peminjaman</p>
        </div>
      </div>

      <StepBar step={step} />

      {/* ══ STEP 0: PILIH ASET ══ */}
      {step === 0 && (
        <div className="ub-card">
          <div className="ub-section-head">
            <h3 className="ub-section-title">Pilih Aset yang Ingin Dipinjam</h3>
            <p className="ub-section-sub">Hanya aset berstatus "Tersedia" yang dapat dipilih</p>
          </div>
          <div className="ub-search">
            <FaSearch className="ub-search-icon" size={13}/>
            <input
              className="ub-search-input"
              placeholder="Cari nama atau kategori aset..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="ub-asset-list">
            {filtered.map((aset) => {
              const ic = colorMap[aset.kategori] || "#64748b";
              const isSelected = selected?.id === aset.id;
              return (
                <div
                  key={aset.id}
                  className={`ub-asset-item ${isSelected ? "ub-asset-item--selected" : ""}`}
                  onClick={() => setSelected(aset)}
                >
                  <div className="ub-asset-icon" style={{ background:`${ic}15`, color:ic }}>
                    {iconMap[aset.kategori] || <FaBox />}
                  </div>
                  <div className="ub-asset-info">
                    <span className="ub-asset-nama">{aset.nama}</span>
                    <span className="ub-asset-meta">
                      <FaMapMarkerAlt size={10}/> {aset.lokasi} · {aset.id}
                    </span>
                    <span className="ub-asset-spek">{aset.spek}</span>
                  </div>
                  <div className={`ub-radio ${isSelected ? "ub-radio--active" : ""}`}>
                    {isSelected && <div className="ub-radio-dot" />}
                  </div>
                </div>
              );
            })}
            {filtered.length === 0 && (
              <div className="ub-empty">
                <FaBox size={28} style={{color:"#cbd5e1",marginBottom:10}}/>
                <p>Tidak ada aset yang cocok.</p>
              </div>
            )}
          </div>
          <div className="ub-step-actions">
            <div />
            <button
              className="ub-btn-primary"
              disabled={!selected}
              onClick={() => setStep(1)}
            >
              Lanjut <FaArrowRight size={12}/>
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 1: DETAIL ══ */}
      {step === 1 && (
        <div className="ub-card">
          {/* Selected Asset Preview */}
          <div className="ub-selected-preview">
            <div className="ub-asset-icon" style={{
              background:`${colorMap[selected.kategori]}15`,
              color:colorMap[selected.kategori], width:44, height:44, borderRadius:11
            }}>
              {iconMap[selected.kategori]}
            </div>
            <div>
              <p className="ub-asset-nama" style={{margin:0}}>{selected.nama}</p>
              <p className="ub-asset-meta" style={{margin:"3px 0 0"}}>{selected.id} · {selected.lokasi}</p>
            </div>
            <button className="ub-change-btn" onClick={() => setStep(0)}>Ganti</button>
          </div>

          <div className="ub-section-head" style={{marginTop:20}}>
            <h3 className="ub-section-title">Detail Peminjaman</h3>
          </div>

          <div className="ub-form-grid">
            <div className="ub-form-group">
              <label>Tanggal Pinjam <span className="ub-req">*</span></label>
              <div className="ub-input-wrap">
                <FaCalendarAlt className="ub-input-icon" size={13}/>
                <input
                  type="date" className="ub-input"
                  value={form.tglPinjam}
                  min={today()}
                  onChange={(e) => setForm({...form, tglPinjam: e.target.value})}
                />
              </div>
            </div>
            <div className="ub-form-group">
              <label>Tanggal Kembali <span className="ub-req">*</span></label>
              <div className="ub-input-wrap">
                <FaCalendarAlt className="ub-input-icon" size={13}/>
                <input
                  type="date" className="ub-input"
                  value={form.tglKembali}
                  min={form.tglPinjam || today()}
                  onChange={(e) => setForm({...form, tglKembali: e.target.value})}
                />
              </div>
            </div>
            <div className="ub-form-group">
              <label>Keperluan <span className="ub-req">*</span></label>
              <div className="ub-input-wrap">
                <FaClipboardList className="ub-input-icon" size={13}/>
                <input
                  type="text" className="ub-input"
                  placeholder="Contoh: Presentasi klien, survei lapangan..."
                  value={form.keperluan}
                  onChange={(e) => setForm({...form, keperluan: e.target.value})}
                />
              </div>
            </div>
            <div className="ub-form-group">
              <label>Lokasi Penggunaan <span className="ub-req">*</span></label>
              <div className="ub-input-wrap">
                <FaMapMarkerAlt className="ub-input-icon" size={13}/>
                <input
                  type="text" className="ub-input"
                  placeholder="Contoh: Ruang Rapat A, Kantor Belawan..."
                  value={form.lokTujuan}
                  onChange={(e) => setForm({...form, lokTujuan: e.target.value})}
                />
              </div>
            </div>
            <div className="ub-form-group" style={{gridColumn:"1/-1"}}>
              <label>Catatan Tambahan</label>
              <textarea
                className="ub-textarea"
                placeholder="Informasi tambahan yang perlu diketahui admin (opsional)..."
                value={form.catatan}
                onChange={(e) => setForm({...form, catatan: e.target.value})}
                rows={3}
              />
            </div>
          </div>

          <div className="ub-step-actions">
            <button className="ub-btn-back" onClick={() => setStep(0)}>
              <FaArrowLeft size={12}/> Kembali
            </button>
            <button
              className="ub-btn-primary"
              disabled={!form.tglPinjam || !form.tglKembali || !form.keperluan || !form.lokTujuan}
              onClick={() => setStep(2)}
            >
              Review <FaArrowRight size={12}/>
            </button>
          </div>
        </div>
      )}

      {/* ══ STEP 2: KONFIRMASI ══ */}
      {step === 2 && (
        <div className="ub-card">
          <div className="ub-section-head">
            <h3 className="ub-section-title">Konfirmasi Pengajuan</h3>
            <p className="ub-section-sub">Periksa kembali detail peminjaman sebelum mengirim</p>
          </div>

          <div className="ub-review-card">
            <div className="ub-review-header">
              <div className="ub-asset-icon" style={{
                background:`${colorMap[selected.kategori]}15`,
                color:colorMap[selected.kategori], width:42, height:42, borderRadius:10
              }}>
                {iconMap[selected.kategori]}
              </div>
              <div>
                <p className="ub-asset-nama" style={{margin:0}}>{selected.nama}</p>
                <p className="ub-asset-meta" style={{margin:"3px 0 0"}}>{selected.id}</p>
              </div>
            </div>

            <div className="ub-review-grid">
              {[
                ["Tanggal Pinjam", form.tglPinjam, <FaCalendarAlt size={11}/>],
                ["Batas Kembali",  form.tglKembali, <FaCalendarAlt size={11}/>],
                ["Keperluan",      form.keperluan,  <FaClipboardList size={11}/>],
                ["Lokasi Tujuan",  form.lokTujuan,  <FaMapMarkerAlt size={11}/>],
                ["Pemohon",        "Joy Silalahi",  <FaUser size={11}/>],
              ].map(([lbl, val, ic]) => (
                <div key={lbl} className="ub-review-item">
                  <span className="ub-review-lbl">{ic} {lbl}</span>
                  <span className="ub-review-val">{val}</span>
                </div>
              ))}
              {form.catatan && (
                <div className="ub-review-item" style={{gridColumn:"1/-1"}}>
                  <span className="ub-review-lbl">Catatan</span>
                  <span className="ub-review-val">{form.catatan}</span>
                </div>
              )}
            </div>
          </div>

          <div className="ub-notice">
            ℹ️ Pengajuan akan diproses oleh admin dalam <strong>1×24 jam</strong>. Anda akan mendapat notifikasi setelah disetujui.
          </div>

          <div className="ub-step-actions">
            <button className="ub-btn-back" onClick={() => setStep(1)}>
              <FaArrowLeft size={12}/> Kembali
            </button>
            <button className="ub-btn-submit" onClick={handleSubmit}>
              <FaCheckCircle size={13}/> Kirim Pengajuan
            </button>
          </div>
        </div>
      )}

      <style>{ubStyles}</style>
    </div>
  );
};

const ubStyles = `
  .ub-wrapper { font-family:'Plus Jakarta Sans','Inter',sans-serif;display:flex;flex-direction:column;gap:20px;animation:ubIn .4s ease-out;max-width:720px; }
  @keyframes ubIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  .ub-header { display:flex;align-items:center;gap:14px; }
  .ub-header-icon {
    width:48px;height:48px;border-radius:13px;
    background:linear-gradient(135deg,#dbeafe,#bfdbfe);
    color:#2563eb;display:flex;align-items:center;justify-content:center;font-size:1.1rem;
  }
  .ub-title { margin:0;font-size:1.5rem;font-weight:800;color:#0f172a;letter-spacing:-.4px; }
  .ub-subtitle { margin:4px 0 0;font-size:.82rem;color:#94a3b8; }

  /* Step bar */
  .ub-stepbar { display:flex;align-items:center;background:white;border-radius:14px;padding:16px 22px;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,.04); }
  .ub-step { display:flex;align-items:center;gap:9px; }
  .ub-step-num {
    width:28px;height:28px;border-radius:8px;
    background:#e2e8f0;color:#94a3b8;
    display:flex;align-items:center;justify-content:center;
    font-size:.78rem;font-weight:800;flex-shrink:0;transition:all .3s;
  }
  .ub-step--active .ub-step-num { background:#004494;color:white; }
  .ub-step--done .ub-step-num { background:#16a34a;color:white; }
  .ub-step-lbl { font-size:.8rem;font-weight:600;color:#94a3b8;white-space:nowrap;transition:color .3s; }
  .ub-step--active .ub-step-lbl { color:#004494;font-weight:700; }
  .ub-step--done .ub-step-lbl { color:#16a34a; }
  .ub-step-line { flex:1;height:2px;background:#e2e8f0;margin:0 12px;transition:background .3s; }
  .ub-step-line--done { background:#16a34a; }

  /* Card */
  .ub-card { background:white;border-radius:16px;padding:24px;border:1px solid #f1f5f9;box-shadow:0 2px 8px rgba(0,0,0,.04);display:flex;flex-direction:column;gap:16px; }
  .ub-section-head { display:flex;flex-direction:column;gap:4px; }
  .ub-section-title { margin:0;font-size:.95rem;font-weight:800;color:#0f172a; }
  .ub-section-sub { margin:0;font-size:.78rem;color:#94a3b8; }

  /* Search */
  .ub-search { position:relative;display:flex;align-items:center; }
  .ub-search-icon { position:absolute;left:14px;color:#94a3b8; }
  .ub-search-input {
    width:100%;padding:11px 14px 11px 40px;
    border:1.5px solid #e2e8f0;border-radius:11px;
    font-size:.85rem;color:#334155;background:#f8fafc;
    outline:none;font-family:inherit;transition:all .2s;
  }
  .ub-search-input:focus { border-color:#00b5e2;background:white;box-shadow:0 0 0 3px rgba(0,181,226,.1); }

  /* Asset List */
  .ub-asset-list { display:flex;flex-direction:column;gap:8px;max-height:380px;overflow-y:auto; }
  .ub-asset-list::-webkit-scrollbar { width:5px; }
  .ub-asset-list::-webkit-scrollbar-thumb { background:#e2e8f0;border-radius:10px; }
  .ub-asset-item {
    display:flex;align-items:center;gap:13px;
    padding:13px 16px;border-radius:12px;
    border:1.5px solid #f1f5f9;background:#fafbfc;
    cursor:pointer;transition:all .2s;
  }
  .ub-asset-item:hover { border-color:#bfdbfe;background:#f0f9ff; }
  .ub-asset-item--selected { border-color:#004494;background:#eff6ff; }
  .ub-asset-icon { width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:.95rem;flex-shrink:0; }
  .ub-asset-info { flex:1;display:flex;flex-direction:column;gap:3px; }
  .ub-asset-nama { font-size:.88rem;font-weight:700;color:#0f172a; }
  .ub-asset-meta { font-size:.72rem;color:#94a3b8;display:flex;align-items:center;gap:4px; }
  .ub-asset-spek { font-size:.72rem;color:#64748b; }
  .ub-radio {
    width:20px;height:20px;border-radius:50%;border:2px solid #cbd5e1;
    flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s;
  }
  .ub-radio--active { border-color:#004494; }
  .ub-radio-dot { width:10px;height:10px;border-radius:50%;background:#004494; }

  .ub-empty { display:flex;flex-direction:column;align-items:center;padding:30px;color:#94a3b8;font-size:.85rem;text-align:center; }

  /* Form */
  .ub-selected-preview {
    display:flex;align-items:center;gap:13px;
    padding:13px 16px;background:#eff6ff;border:1.5px solid #bfdbfe;border-radius:12px;
  }
  .ub-change-btn {
    margin-left:auto;padding:6px 14px;border:1.5px solid #004494;border-radius:8px;
    background:white;color:#004494;font-size:.75rem;font-weight:700;cursor:pointer;font-family:inherit;
    transition:all .2s;
  }
  .ub-change-btn:hover { background:#004494;color:white; }
  .ub-form-grid { display:grid;grid-template-columns:1fr 1fr;gap:14px; }
  .ub-form-group { display:flex;flex-direction:column;gap:7px; }
  .ub-form-group label { font-size:.78rem;font-weight:700;color:#334155; }
  .ub-req { color:#dc2626;margin-left:2px; }
  .ub-input-wrap { position:relative;display:flex;align-items:center; }
  .ub-input-icon { position:absolute;left:13px;color:#94a3b8; }
  .ub-input {
    width:100%;padding:10px 13px 10px 36px;
    border:1.5px solid #e2e8f0;border-radius:10px;
    font-size:.85rem;color:#334155;background:#f8fafc;
    outline:none;font-family:inherit;transition:all .2s;box-sizing:border-box;
  }
  .ub-input:focus { border-color:#00b5e2;background:white;box-shadow:0 0 0 3px rgba(0,181,226,.1); }
  .ub-textarea {
    width:100%;padding:10px 13px;border:1.5px solid #e2e8f0;border-radius:10px;
    font-size:.85rem;color:#334155;background:#f8fafc;
    outline:none;font-family:inherit;transition:all .2s;resize:vertical;box-sizing:border-box;
  }
  .ub-textarea:focus { border-color:#00b5e2;background:white;box-shadow:0 0 0 3px rgba(0,181,226,.1); }

  /* Review */
  .ub-review-card { background:#f8fafc;border-radius:13px;border:1.5px solid #e2e8f0;overflow:hidden; }
  .ub-review-header { display:flex;align-items:center;gap:13px;padding:14px 16px;background:white;border-bottom:1px solid #f1f5f9; }
  .ub-review-grid { display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#e2e8f0; }
  .ub-review-item { display:flex;flex-direction:column;gap:4px;padding:12px 16px;background:#f8fafc; }
  .ub-review-lbl { font-size:.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;display:flex;align-items:center;gap:5px; }
  .ub-review-val { font-size:.85rem;font-weight:700;color:#1e293b; }

  .ub-notice {
    background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;
    padding:12px 16px;font-size:.8rem;color:#92400e;line-height:1.5;
  }

  /* Buttons */
  .ub-step-actions { display:flex;justify-content:space-between;align-items:center;padding-top:4px; }
  .ub-btn-primary {
    display:flex;align-items:center;gap:8px;
    padding:11px 22px;background:linear-gradient(135deg,#004494,#00b5e2);
    color:white;border:none;border-radius:11px;font-size:.88rem;font-weight:700;
    cursor:pointer;font-family:inherit;transition:all .25s;
    box-shadow:0 4px 14px rgba(0,68,148,.3);
  }
  .ub-btn-primary:disabled { opacity:.4;cursor:not-allowed;transform:none!important;box-shadow:none!important; }
  .ub-btn-primary:not(:disabled):hover { transform:translateY(-1px);box-shadow:0 8px 20px rgba(0,68,148,.4); }
  .ub-btn-back {
    display:flex;align-items:center;gap:7px;
    padding:11px 18px;border:1.5px solid #e2e8f0;border-radius:11px;
    background:white;color:#64748b;font-size:.85rem;font-weight:700;
    cursor:pointer;font-family:inherit;transition:all .2s;
  }
  .ub-btn-back:hover { border-color:#94a3b8;color:#334155; }
  .ub-btn-submit {
    display:flex;align-items:center;gap:8px;
    padding:11px 24px;background:linear-gradient(135deg,#16a34a,#15803d);
    color:white;border:none;border-radius:11px;font-size:.88rem;font-weight:700;
    cursor:pointer;font-family:inherit;transition:all .25s;
    box-shadow:0 4px 14px rgba(22,163,74,.3);
  }
  .ub-btn-submit:hover { transform:translateY(-1px);box-shadow:0 8px 20px rgba(22,163,74,.4); }

  /* Success */
  .ub-success-card {
    background:white;border-radius:20px;padding:40px 36px;
    border:1px solid #f1f5f9;box-shadow:0 8px 32px rgba(0,0,0,.08);
    display:flex;flex-direction:column;align-items:center;text-align:center;gap:16px;
    animation:ubIn .4s ease-out;max-width:520px;
  }
  .ub-success-icon { font-size:3.5rem;color:#16a34a;animation:ubPop .5s cubic-bezier(.16,1,.3,1); }
  @keyframes ubPop { from{transform:scale(.6);opacity:0} 70%{transform:scale(1.1)} to{transform:scale(1);opacity:1} }
  .ub-success-title { margin:0;font-size:1.4rem;font-weight:800;color:#0f172a; }
  .ub-success-sub { margin:0;font-size:.85rem;color:#64748b;line-height:1.6;max-width:380px; }
  .ub-success-ref {
    background:#f0fdf4;border:1.5px solid #bbf7d0;border-radius:12px;
    padding:14px 24px;display:flex;flex-direction:column;align-items:center;gap:5px;
  }
  .ub-ref-lbl { font-size:.68rem;font-weight:700;color:#16a34a;text-transform:uppercase;letter-spacing:.5px; }
  .ub-ref-val { font-family:monospace;font-size:1.2rem;font-weight:800;color:#14532d; }
  .ub-success-detail { width:100%;background:#f8fafc;border-radius:12px;border:1px solid #f1f5f9;overflow:hidden; }
  .ub-sd-item {
    display:flex;justify-content:space-between;align-items:center;
    padding:10px 16px;border-bottom:1px solid #f1f5f9;font-size:.83rem;
  }
  .ub-sd-item:last-child { border-bottom:none; }
  .ub-sd-item span { color:#94a3b8; }
  .ub-sd-item strong { color:#334155; }
  .ub-success-note { font-size:.78rem;color:#94a3b8;margin:0; }
`;

export default UserBorrow;