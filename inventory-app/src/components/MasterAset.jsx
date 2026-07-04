import React, { useState, useEffect, useMemo } from "react";
import { masterDataAPI, katalogAPI } from "../services/api";
import { Plus, Search, Edit, Trash2, X, Save, Package, Tag, Layers, CheckCircle2 } from "lucide-react";
import batikBg from "../pictures/batik.png";

const getCss = (bgImg) => `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.mb-wrap {
  padding: 32px 28px;
  max-width: 1280px;
  margin: 0 auto;
  font-family: 'Inter', 'Plus Jakarta Sans', sans-serif;
  position: relative;
  z-index: 1;
}

.mb-wrap::before {
  content: "";
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #f8fafc;
  background-image: 
    radial-gradient(circle at 0% 0%, rgba(37, 99, 235, 0.18) 0%, transparent 45%),
    radial-gradient(circle at 100% 100%, rgba(79, 70, 229, 0.18) 0%, transparent 45%),
    radial-gradient(circle at 50% 50%, rgba(14, 165, 233, 0.1) 0%, transparent 60%),
    url("\${bgImg}");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  filter: blur(1.5px);
  z-index: -1;
  opacity: 0.15;
}

/* ── Page Header ── */
.mb-page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 28px;
  gap: 16px;
  flex-wrap: wrap;
}

.mb-page-title-group { display: flex; flex-direction: column; gap: 4px; }

.mb-page-eyebrow {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #6366f1;
  display: flex;
  align-items: center;
  gap: 6px;
}

.mb-page-h1 {
  font-size: 2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.6px;
  line-height: 1.2;
}

.mb-page-desc {
  font-size: 0.88rem;
  color: #64748b;
  margin: 2px 0 0;
  font-weight: 400;
}

/* ── Stats Row ── */
.mb-stats-row {
  display: flex;
  gap: 14px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.mb-stat-card {
  flex: 1;
  min-width: 140px;
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  display: flex;
  align-items: center;
  gap: 14px;
  transition: box-shadow 0.2s;
}

.mb-stat-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08); }

.mb-stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mb-stat-icon.blue  { background: #eff6ff; color: #2563eb; }
.mb-stat-icon.green { background: #f0fdf4; color: #16a34a; }
.mb-stat-icon.violet{ background: #f5f3ff; color: #7c3aed; }

.mb-stat-val {
  font-size: 1.6rem;
  font-weight: 800;
  color: #0f172a;
  line-height: 1;
}

.mb-stat-lbl {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
  margin-top: 2px;
}

/* ── Primary Button ── */
.mb-btn-add {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 22px;
  border-radius: 12px;
  font-weight: 700;
  font-size: 0.88rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #fff;
  box-shadow: 0 4px 14px rgba(99,102,241,0.35);
  white-space: nowrap;
}

.mb-btn-add:hover {
  background: linear-gradient(135deg, #4338ca, #4f46e5);
  box-shadow: 0 6px 20px rgba(99,102,241,0.45);
  transform: translateY(-1px);
}

/* ── Card ── */
.mb-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  box-shadow: 0 10px 40px -10px rgba(0,0,0,0.08), 0 0 0 1px rgba(255,255,255,0.5) inset;
  border: 1px solid rgba(226, 232, 240, 0.8);
  overflow: hidden;
}

/* ── Toolbar ── */
.mb-toolbar {
  padding: 16px 20px;
  border-bottom: 1px solid #f8fafc;
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: center;
  background: #fafafa;
}

.mb-search-box {
  display: flex;
  align-items: center;
  gap: 9px;
  background: #fff;
  border: 1.5px solid #e8edf2;
  padding: 9px 14px;
  border-radius: 10px;
  flex: 1;
  max-width: 360px;
  transition: all 0.2s;
}

.mb-search-box:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}

.mb-search-box input {
  border: none;
  outline: none;
  width: 100%;
  font-size: 0.875rem;
  font-family: inherit;
  color: #0f172a;
  background: transparent;
}

.mb-search-box input::placeholder { color: #94a3b8; }

.mb-result-count {
  font-size: 0.8rem;
  color: #64748b;
  font-weight: 600;
  padding: 5px 12px;
  background: #f1f5f9;
  border-radius: 20px;
  white-space: nowrap;
}

/* ── Table ── */
.mb-table {
  width: 100%;
  border-collapse: collapse;
}

.mb-table th {
  text-align: left;
  padding: 12px 18px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #94a3b8;
  letter-spacing: 0.8px;
  background: #fafafa;
  border-bottom: 1px solid #f1f5f9;
}

.mb-table td {
  padding: 14px 18px;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #f9fafb;
  vertical-align: middle;
}

.mb-table tbody tr { transition: background 0.12s; }
.mb-table tbody tr:hover { background: #f8f9ff; }
.mb-table tbody tr:last-child td { border-bottom: none; }

/* ── Badges ── */
.mb-code-tag {
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  font-size: 0.72rem;
  font-weight: 600;
  background: #f1f5f9;
  color: #475569;
  padding: 3px 8px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  letter-spacing: 0.2px;
}

.mb-cat-tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 10px;
  border-radius: 99px;
  font-size: 0.71rem;
  font-weight: 700;
  background: #eef2ff;
  color: #4f46e5;
  border: 1px solid #e0e7ff;
  white-space: nowrap;
}

.mb-unit-count {
  font-weight: 700;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

/* ── Action Buttons ── */
.mb-act {
  width: 34px;
  height: 34px;
  border-radius: 9px;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease;
  flex-shrink: 0;
}

.mb-act svg {
  width: 15px;
  height: 15px;
  stroke: currentColor;
  fill: none;
  flex-shrink: 0;
}

.mb-act.edit {
  background: #eff6ff;
  color: #3b82f6;
}

.mb-act.edit:hover {
  background: #3b82f6;
  color: #fff;
  box-shadow: 0 3px 10px rgba(59,130,246,0.4);
  transform: translateY(-1px);
}

.mb-act.del {
  background: #fef2f2;
  color: #ef4444;
}

.mb-act.del:hover {
  background: #ef4444;
  color: #fff;
  box-shadow: 0 3px 10px rgba(239,68,68,0.4);
  transform: translateY(-1px);
}

/* ── Empty State ── */
.mb-empty {
  padding: 64px 24px;
  text-align: center;
  color: #94a3b8;
}

.mb-empty-icon {
  width: 64px;
  height: 64px;
  background: #f1f5f9;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}

.mb-empty h3 { margin: 0 0 6px; font-size: 1rem; font-weight: 700; color: #475569; }
.mb-empty p  { margin: 0; font-size: 0.85rem; }

/* ── Modal ── */
.mb-overlay {
  position: fixed;
  inset: 0;
  background: rgba(15,23,42,0.5);
  backdrop-filter: blur(6px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: mbFadeIn 0.2s ease;
}

.mb-modal {
  background: #fff;
  border-radius: 24px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 32px 64px rgba(0,0,0,0.15);
  overflow: hidden;
  animation: mbSlideUp 0.3s cubic-bezier(.16,1,.3,1);
}

.mb-modal-head {
  padding: 22px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.mb-modal-head h2 {
  font-size: 1.05rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mb-modal-head h2 svg { color: #6366f1; }

.mb-close-btn {
  width: 32px; height: 32px;
  border-radius: 8px;
  background: #f1f5f9;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  transition: 0.15s;
}

.mb-close-btn:hover { background: #fee2e2; color: #ef4444; }
.mb-close-btn svg { width: 16px; height: 16px; stroke: currentColor; fill: none; }

.mb-modal-body { padding: 22px 24px; display: flex; flex-direction: column; gap: 14px; }

.mb-field { display: flex; flex-direction: column; gap: 5px; }

.mb-field label {
  font-size: 0.76rem;
  font-weight: 700;
  color: #374151;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.mb-field input,
.mb-field select {
  padding: 10px 13px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  font-size: 0.875rem;
  font-family: inherit;
  color: #111827;
  background: #fff;
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
  width: 100%;
  box-sizing: border-box;
}

.mb-field input:focus,
.mb-field select:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}

.mb-field input:disabled,
.mb-field select:disabled {
  background: #f9fafb;
  color: #9ca3af;
  cursor: not-allowed;
}

.mb-modal-foot {
  padding: 16px 24px;
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  background: #fafafa;
}

.mb-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 10px 18px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.18s;
  font-family: inherit;
}

.mb-btn svg { width: 15px; height: 15px; stroke: currentColor; fill: none; }

.mb-btn-ghost {
  background: #fff;
  border: 1.5px solid #e5e7eb;
  color: #6b7280;
}

.mb-btn-ghost:hover { background: #f9fafb; color: #111827; border-color: #d1d5db; }

.mb-btn-save {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  border: none;
  color: #fff;
  box-shadow: 0 4px 12px rgba(99,102,241,0.3);
}

.mb-btn-save:hover { box-shadow: 0 6px 18px rgba(99,102,241,0.45); transform: translateY(-1px); }

/* visually-hidden (screen reader only) */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}

@keyframes mbFadeIn  { from { opacity: 0 } to { opacity: 1 } }
@keyframes mbSlideUp { from { opacity: 0; transform: translateY(16px) } to { opacity: 1; transform: translateY(0) } }
`;

const MasterAset = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({ asset_code: "", category: "", name: "", merek: "", tipe: "" });
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 5;

  useEffect(() => { fetchData(); fetchCategories(); }, []);

  const fetchCategories = async () => {
    try {
      const res = await masterDataAPI.getDevices();
      setCategories(res.data?.data || []);
    } catch (err) { console.error("Failed to load categories:", err); }
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await katalogAPI.getAll();
      setItems(res.data?.data || []);
    } catch (err) { console.error("Failed to load master katalog:", err); }
    finally { setLoading(false); }
  };

  const filteredItems = useMemo(() => {
    if (!search.trim()) return items;
    const q = search.toLowerCase();
    return items.filter(i =>
      [i.name, i.merek, i.tipe, i.asset_code].some(v => v && v.toLowerCase().includes(q))
    );
  }, [items, search]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const pagedItems = filteredItems.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // Reset to page 1 when search changes
  const handleSearch = (val) => { setSearch(val); setPage(1); };

  const openAdd = () => { setForm({ asset_code: "", category: "", name: "", merek: "", tipe: "" }); setModal("add"); };
  const openEdit = (item) => { setForm({ asset_code: item.asset_code, category: item.device_code, name: item.name, merek: item.merek || "", tipe: item.tipe || "" }); setModal("edit"); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.name) return alert("Kategori dan Nama Barang wajib diisi!");
    try {
      modal === "add" ? await katalogAPI.create(form) : await katalogAPI.update(form.asset_code, form);
      setModal(null); fetchData();
    } catch (err) { alert("Gagal menyimpan: " + (err.response?.data?.message || err.message)); }
  };

  const handleDelete = async (code, name) => {
    if (!window.confirm(`Hapus "${name}" beserta seluruh unit fisiknya secara permanen?`)) return;
    try { await katalogAPI.delete(code); fetchData(); }
    catch (err) { alert("Gagal menghapus: " + (err.response?.data?.message || err.message)); }
  };

  const totalUnits = items.reduce((s, i) => s + (i.total_units || 0), 0);
  const catCount = new Set(items.map(i => i.device_code)).size;

  return (
    <>
      <style>{getCss(batikBg)}</style>
      <main className="mb-wrap">

        {/* ── Page Header ── */}
        <div className="mb-page-header">
          <div className="mb-page-title-group">
            <h1 className="mb-page-h1">Master Aset</h1>
            <p className="mb-page-desc">Kelola katalog spesifikasi perangkat — kategori, merek &amp; tipe</p>
          </div>
          <button className="mb-btn-add" onClick={openAdd} aria-label="Tambah aset baru ke katalog">
            <Plus size={17} aria-hidden="true" /> Tambah Aset Baru
          </button>
        </div>

        {/* ── Table Card ── */}
        <section className="mb-card" aria-label="Daftar katalog master barang">
          <div className="mb-toolbar">
            <div className="mb-search-box" role="search">
              <Search size={15} style={{ color: '#9ca3af', flexShrink: 0 }} aria-hidden="true" />
              <label htmlFor="mb-q" className="sr-only">Cari aset</label>
              <input
                id="mb-q"
                type="search"
                placeholder="Cari nama, merek, tipe, atau kode..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                aria-label="Cari aset"
                autoComplete="off"
              />
            </div>
            <span className="mb-result-count" aria-live="polite">
              {filteredItems.length} dari {items.length} aset
            </span>
          </div>

          <div role="region" aria-label="Tabel master barang" tabIndex={0}>
            <table className="mb-table">
              <caption className="sr-only">Daftar katalog master barang inventory Pelindo</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: '13%' }}>Kode Aset</th>
                  <th scope="col" style={{ width: '15%' }}>Kategori</th>
                  <th scope="col">Nama Aset</th>
                  <th scope="col" style={{ width: '12%' }}>Merek</th>
                  <th scope="col" style={{ width: '13%' }}>Tipe / Model</th>
                  <th scope="col" style={{ width: '10%', textAlign: 'center' }}>Unit</th>
                  <th scope="col" style={{ width: '96px', textAlign: 'right' }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={7}>
                    <div className="mb-empty" role="status" aria-live="polite">
                      <div className="mb-empty-icon"><Package size={28} color="#94a3b8" /></div>
                      <p>Memuat data katalog...</p>
                    </div>
                  </td></tr>
                ) : filteredItems.length === 0 ? (
                  <tr><td colSpan={7}>
                    <div className="mb-empty" role="status">
                      <div className="mb-empty-icon"><Search size={28} color="#94a3b8" /></div>
                      <h3>{search ? "Tidak ditemukan" : "Belum ada data"}</h3>
                      <p>{search ? `Tidak ada aset cocok dengan "${search}"` : "Klik \"Tambah Aset Baru\" untuk mulai mengisi katalog."}</p>
                    </div>
                  </td></tr>
                ) : pagedItems.map(item => (
                  <tr key={item.asset_code}>
                    <td><span className="mb-code-tag">{item.asset_code}</span></td>
                    <td><span className="mb-cat-tag">{item.category_name || item.device_code}</span></td>
                    <td style={{ fontWeight: 600, color: '#111827' }}>{item.name}</td>
                    <td style={{ color: item.merek ? '#374151' : '#d1d5db' }}>{item.merek || '—'}</td>
                    <td style={{ color: item.tipe ? '#374151' : '#d1d5db' }}>{item.tipe || '—'}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span className="mb-unit-count" style={{ color: item.total_units > 0 ? '#10b981' : '#9ca3af' }}
                        aria-label={`${item.total_units} unit fisik`}>
                        {item.total_units > 0 ? <CheckCircle2 size={16} color="#10b981" fill="#ecfdf5" /> : '○'} {item.total_units}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                        <button className="mb-act edit" onClick={() => openEdit(item)}
                          title={`Edit ${item.name}`} aria-label={`Edit ${item.name}`}>
                          <Edit size={15} aria-hidden="true" />
                        </button>
                        <button className="mb-act del" onClick={() => handleDelete(item.asset_code, item.name)}
                          title={`Hapus ${item.name}`} aria-label={`Hapus ${item.name}`}>
                          <Trash2 size={15} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 20px', borderTop: '1px solid #f1f5f9', background: '#fafafa'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>
                Halaman {page} dari {totalPages} &nbsp;·&nbsp; {filteredItems.length} item
              </span>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: '6px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb',
                    background: page === 1 ? '#f9fafb' : '#fff', color: page === 1 ? '#d1d5db' : '#374151',
                    fontWeight: 600, fontSize: '0.82rem', cursor: page === 1 ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.15s'
                  }}
                >
                  ← Sebelumnya
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pg => (
                  <button
                    key={pg}
                    onClick={() => setPage(pg)}
                    style={{
                      width: 34, height: 34, borderRadius: '8px',
                      border: pg === page ? 'none' : '1.5px solid #e5e7eb',
                      background: pg === page ? 'linear-gradient(135deg, #4f46e5, #6366f1)' : '#fff',
                      color: pg === page ? '#fff' : '#374151',
                      fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                      fontFamily: 'inherit', transition: 'all 0.15s',
                      boxShadow: pg === page ? '0 2px 8px rgba(99,102,241,0.35)' : 'none'
                    }}
                  >
                    {pg}
                  </button>
                ))}
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    padding: '6px 14px', borderRadius: '8px', border: '1.5px solid #e5e7eb',
                    background: page === totalPages ? '#f9fafb' : '#fff',
                    color: page === totalPages ? '#d1d5db' : '#374151',
                    fontWeight: 600, fontSize: '0.82rem',
                    cursor: page === totalPages ? 'not-allowed' : 'pointer',
                    fontFamily: 'inherit', transition: 'all 0.15s'
                  }}
                >
                  Selanjutnya →
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {/* ── Modal ── */}
      {modal && (
        <div className="mb-overlay" role="dialog" aria-modal="true" aria-labelledby="mb-dlg-title"
          onClick={() => setModal(null)}>
          <div className="mb-modal" onClick={e => e.stopPropagation()}>
            <div className="mb-modal-head">
              <h2 id="mb-dlg-title">
                <Tag size={17} aria-hidden="true" />
                {modal === 'add' ? 'Tambah Aset Baru' : 'Edit Data Aset'}
              </h2>
              <button className="mb-close-btn" onClick={() => setModal(null)} aria-label="Tutup dialog">
                <X size={16} aria-hidden="true" />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-modal-body">
                <div className="mb-field">
                  <label htmlFor="mb-cat">Kategori Perangkat <span style={{ color: '#ef4444' }} aria-hidden="true">*</span></label>
                  <select id="mb-cat" value={form.category}
                    onChange={e => setForm({ ...form, category: e.target.value })}
                    disabled={modal === 'edit'} required aria-required="true">
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map(c => <option key={c.device_code} value={c.device_code}>{c.name}</option>)}
                  </select>
                </div>
                <div className="mb-field">
                  <label htmlFor="mb-merek">Merek</label>
                  <input id="mb-merek" type="text" placeholder="Contoh: Lenovo, Hikvision, TP-Link"
                    value={form.merek} onChange={e => setForm({ ...form, merek: e.target.value })} autoComplete="off" />
                </div>
                <div className="mb-field">
                  <label htmlFor="mb-tipe">Tipe / Model</label>
                  <input id="mb-tipe" type="text" placeholder="Contoh: ThinkPad T14, DS-2CE16D0T"
                    value={form.tipe} onChange={e => setForm({ ...form, tipe: e.target.value })} autoComplete="off" />
                </div>
                <div className="mb-field">
                  <label htmlFor="mb-name">Nama Barang <span style={{ color: '#ef4444' }} aria-hidden="true">*</span></label>
                  <input id="mb-name" type="text" placeholder="Contoh: Lenovo ThinkPad T14 Gen 3"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    required aria-required="true" autoComplete="off" />
                </div>
              </div>
              <div className="mb-modal-foot">
                <button type="button" className="mb-btn mb-btn-ghost" onClick={() => setModal(null)}>Batal</button>
                <button type="submit" className="mb-btn mb-btn-save">
                  <Save size={15} aria-hidden="true" /> Simpan Aset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default MasterAset;
