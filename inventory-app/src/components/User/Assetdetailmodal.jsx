// ============================================================
// AssetDetailModal.jsx — grouped sections + colored icon rows
// ============================================================
import { useState } from "react";
import {
  categoryConf, statusConf, conditionConf,
  trxTypeConf, transactionsMock, fmt, isOverdue,
} from "./data";
import "./AssetDetailModal.css";

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    x:        (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>),
    laptop:   (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>),
    server:   (<><rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/></>),
    monitor:  (<><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 8h10M7 12h6"/></>),
    network:  (<><circle cx="12" cy="5" r="3"/><circle cx="19" cy="19" r="3"/><circle cx="5" cy="19" r="3"/><line x1="12" y1="8" x2="5.5" y2="16"/><line x1="12" y1="8" x2="18.5" y2="16"/></>),
    battery:  (<><rect x="1" y="6" width="18" height="12" rx="2"/><line x1="23" y1="11" x2="23" y2="13"/></>),
    cube:     (<><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></>),
    pin:      (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>),
    tag:      (<><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>),
    calendar: (<><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>),
    clock:    (<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
    info:     (<><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></>),
    cpu:      (<><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></>),
    borrow:   (<><path d="M16 3h5v5"/><path d="M4 20L21 3"/></>),
    warn:     (<><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></>),
    history:  (<><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>),
    tool:     (<><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></>),
    arrow:    (<><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></>),
    shield:   (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></>),
    layers:   (<><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></>),
    hash:     (<><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></>),
    barcode:  (<><path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14"/></>),
    type:     (<><polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/></>),
    globe:    (<><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>),
  };
  const catIcons = { LAPTOP:"laptop", SERVER:"server", DESKTOP:"monitor", NETWORK:"network", UPS:"battery", OTHER:"cube" };
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none"
      stroke={c||"currentColor"} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      {paths[catIcons[n]||n]}
    </svg>
  );
};

const ASSET_PHOTOS = {
  LAPTOP:  ["https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80","https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80","https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&q=80","https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=600&q=80"],
  SERVER:  ["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80","https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80"],
  DESKTOP: ["https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&q=80","https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600&q=80"],
  NETWORK: ["https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80","https://images.unsplash.com/photo-1606904825846-647eb07f5be2?w=600&q=80"],
  UPS:     ["https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=600&q=80"],
  OTHER:   ["https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80"],
};
function getPhoto(asset) {
  const pool = ASSET_PHOTOS[asset.category] || ASSET_PHOTOS.OTHER;
  return pool[parseInt(asset.id.replace(/\D/g,"")||"0",10) % pool.length];
}

function CondPill({ code }) {
  if (!code) return <span style={{fontSize:11,color:"#94a3b8"}}>—</span>;
  const c = conditionConf[code] || {label:code,color:"#64748b",bg:"#f1f5f9"};
  return <span style={{fontSize:11,fontWeight:700,padding:"2px 8px",borderRadius:99,background:c.bg,color:c.color}}>{c.label}</span>;
}
function CondArrow({ before, after }) {
  if (!before) return null;
  return (
    <div style={{display:"flex",alignItems:"center",gap:5}}>
      <CondPill code={before}/>
      {after && (<><Ico n="arrow" s={11} c="#94a3b8"/><CondPill code={after}/></>)}
      {!after && <span style={{fontSize:11,color:"#94a3b8"}}>→ belum kembali</span>}
    </div>
  );
}

// ── Row: icon atau text badge + label kiri, value kanan ──
function InfoRow({ icon, iconBg, iconColor, iconText, label, children, last }) {
  return (
    <div className={`adm-row${last?" adm-row--last":""}`}>
      <div className="adm-row-left">
        <div className="adm-row-icon" style={{background:iconBg}}>
          {iconText
            ? <span className="adm-row-icon-text" style={{color:iconColor}}>{iconText}</span>
            : <Ico n={icon} s={13} c={iconColor}/>
          }
        </div>
        <span className="adm-row-label">{label}</span>
      </div>
      <div className="adm-row-right">{children}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="adm-section">
      <p className="adm-section-title">{title}</p>
      <div className="adm-section-body">{children}</div>
    </div>
  );
}

export default function AssetDetailModal({ asset, loans=[], onClose, onBorrow }) {
  const [activeTab, setActiveTab] = useState("info");
  const [imgErr, setImgErr]       = useState(false);

  const cat  = categoryConf[asset.category]  || categoryConf.OTHER;
  const st   = statusConf[asset.status]      || {};
  const cond = conditionConf[asset.condition]|| {};

  const allLoans      = [...transactionsMock, ...loans.filter(l => !transactionsMock.find(t => t.id===l.id))];
  const assetLoans    = allLoans.filter(t => t.asset_id===asset.id);
  const activeLoans   = assetLoans.filter(t => t.status==="ACTIVE");
  const returnedLoans = assetLoans.filter(t => t.status==="RETURNED");
  const maintLoans    = assetLoans.filter(t => t.type==="MAINTENANCE");
  const photo = getPhoto(asset);

  return (
    <div className="adm-backdrop" onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}>
      <div className="adm-modal">

        {/* ── Hero ── */}
        <div className="adm-hero" style={{background:`linear-gradient(160deg, ${cat.bg} 0%, #f0f4ff 100%)`}}>
          <button className="adm-close" onClick={onClose}>
            <Ico n="x" s={16} c="var(--gray-600)"/>
          </button>
          <div className="adm-hero-inner">
            <div className="adm-hero-photo">
              {!imgErr
                ? <img src={photo} alt={asset.name} onError={()=>setImgErr(true)} className="adm-hero-img"/>
                : <div className="adm-hero-img-fallback" style={{color:cat.color}}><Ico n={asset.category} s={56}/></div>
              }
            </div>
            <div className="adm-hero-info">
              <div className="adm-hero-badges">
                <span className="adm-cat-badge" style={{background:cat.color}}>
                  <Ico n={asset.category} s={11} c="#fff"/> {cat.label}
                </span>
                <span className="adm-status-badge" style={{background:st.bg,color:st.color}}>
                  <span className="badge-dot" style={{background:st.dot}}/>{st.label}
                </span>
                <span className="adm-cond-badge" style={{background:cond.bg,color:cond.color}}>
                  {cond.label}
                </span>
                {asset.status==="DELETED" && (
                  <span style={{fontSize:11,fontWeight:700,padding:"4px 10px",borderRadius:99,background:"#f1f5f9",color:"#64748b",display:"flex",alignItems:"center",gap:4}}>
                    🗑 Dihapus dari inventaris
                  </span>
                )}
              </div>
              <h2 className="adm-hero-name">{asset.name}</h2>
              <p className="adm-hero-brand">{asset.brand} · {asset.model}</p>
              <div className="adm-hero-meta">
                <span><Ico n="pin" s={13} c="var(--gray-400)"/> {asset.location}</span>
                <span><Ico n="tag" s={13} c="var(--gray-400)"/> {asset.serial}</span>
                <span><Ico n="calendar" s={13} c="var(--gray-400)"/> {asset.year}</span>
              </div>
              <div className="adm-hero-budget">
                <span className={`adm-budget-tag ${asset.budget_type==="CAPEX"?"capex":"opex"}`}>{asset.budget_type}</span>
              </div>
              {asset.status==="AVAILABLE" && onBorrow && (
                <button className="btn btn-primary adm-borrow-btn" onClick={()=>onBorrow(asset)}>
                  <Ico n="borrow" s={15}/> Pinjam Aset Ini
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="adm-tabs">
          {[
            {key:"info",    label:"Informasi",                     icon:"info"   },
            {key:"spec",    label:"Spesifikasi",                    icon:"cpu"    },
            {key:"history", label:`Riwayat (${assetLoans.length})`, icon:"history"},
          ].map(t => (
            <button key={t.key} className={`adm-tab ${activeTab===t.key?"active":""}`} onClick={()=>setActiveTab(t.key)}>
              <Ico n={t.icon} s={14}/> {t.label}
            </button>
          ))}
        </div>

        {/* ── Body ── */}
        <div className="adm-body">

          {/* ══ INFO TAB ══ */}
          {activeTab==="info" && (
            <div className="adm-info-rows">

              <Section title="🪪 Identitas">
                <InfoRow iconText="#"   iconBg="#eff6ff" iconColor="#2563eb" label="ID Aset">
                  <span className="adm-row-mono">{asset.id}</span>
                </InfoRow>
                <InfoRow iconText="SN"  iconBg="#f5f3ff" iconColor="#7c3aed" label="Serial Number">
                  <span className="adm-row-mono">{asset.serial}</span>
                </InfoRow>
                <InfoRow icon="type"    iconBg="#ecfdf5" iconColor="#059669" label="Nama Aset" last>
                  <span className="adm-row-val">{asset.name}</span>
                </InfoRow>
              </Section>

              <Section title="🖥 Detail Perangkat">
                <InfoRow icon="globe"  iconBg="#fff7ed" iconColor="#ea580c" label="Brand">
                  <span className="adm-row-val">{asset.brand}</span>
                </InfoRow>
                <InfoRow icon="cpu"    iconBg="#fdf4ff" iconColor="#a21caf" label="Model">
                  <span className="adm-row-val">{asset.model}</span>
                </InfoRow>
                <InfoRow icon="layers" iconBg="#eff6ff" iconColor="#2563eb" label="Kategori" last>
                  <span className="adm-cat-inline" style={{background:cat.bg,color:cat.color}}>
                    <Ico n={asset.category} s={11} c={cat.color}/> {cat.label}
                  </span>
                </InfoRow>
              </Section>

              <Section title="📍 Lokasi & Waktu">
                <InfoRow icon="pin"      iconBg="#fef2f2" iconColor="#dc2626" label="Lokasi">
                  <span className="adm-row-val">{asset.location}</span>
                </InfoRow>
                <InfoRow icon="calendar" iconBg="#ecfdf5" iconColor="#16a34a" label="Tahun Perolehan" last>
                  <span className="adm-row-val">{asset.year}</span>
                </InfoRow>
              </Section>

              <Section title="📊 Status & Kondisi">
                <InfoRow icon="shield" iconBg="#eff6ff" iconColor="#1d4ed8" label="Budget Type">
                  <span className={`adm-budget-tag ${asset.budget_type==="CAPEX"?"capex":"opex"}`} style={{fontSize:12}}>
                    {asset.budget_type}
                  </span>
                </InfoRow>
                <InfoRow icon="info" iconBg={st.bg} iconColor={st.color} label="Status">
                  <span className="adm-row-badge" style={{background:st.bg,color:st.color}}>
                    <span className="badge-dot" style={{background:st.dot}}/>{st.label}
                  </span>
                </InfoRow>
                <InfoRow icon="shield" iconBg={cond.bg} iconColor={cond.color} label="Kondisi" last>
                  <span className="adm-row-badge" style={{background:cond.bg,color:cond.color}}>
                    {cond.label}
                  </span>
                </InfoRow>
              </Section>

            </div>
          )}

          {/* ══ SPESIFIKASI TAB ══ */}
          {activeTab==="spec" && (
            <div className="adm-spec-wrap">
              {asset.spec && Object.keys(asset.spec).length > 0 ? (
                <div className="adm-spec-bigrid">
                  {Object.entries(asset.spec).map(([k,v],i) => {
                    const palettes = [
                      {bg:"#eff6ff",border:"#bfdbfe",label:"#2563eb",val:"#1e3a8a"},
                      {bg:"#f0fdf4",border:"#bbf7d0",label:"#16a34a",val:"#14532d"},
                      {bg:"#fdf4ff",border:"#e9d5ff",label:"#9333ea",val:"#581c87"},
                      {bg:"#fff7ed",border:"#fed7aa",label:"#ea580c",val:"#7c2d12"},
                      {bg:"#fef2f2",border:"#fecaca",label:"#dc2626",val:"#7f1d1d"},
                      {bg:"#f0f9ff",border:"#bae6fd",label:"#0284c7",val:"#0c4a6e"},
                      {bg:"#fafaf9",border:"#d6d3d1",label:"#57534e",val:"#1c1917"},
                      {bg:"#ecfdf5",border:"#6ee7b7",label:"#059669",val:"#064e3b"},
                    ];
                    const p = palettes[i%palettes.length];
                    return (
                      <div key={k} className="adm-spec-big" style={{background:p.bg,border:`1.5px solid ${p.border}`}}>
                        <span className="adm-spec-big-label" style={{color:p.label}}>{k.toUpperCase()}</span>
                        <span className="adm-spec-big-val"   style={{color:p.val}}>{v}</span>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="adm-empty">
                  <Ico n="cpu" s={36} c="var(--gray-300)"/>
                  <p>Tidak ada data spesifikasi</p>
                </div>
              )}
            </div>
          )}

          {/* ══ RIWAYAT TAB ══ */}
          {activeTab==="history" && (
            <div className="adm-history-wrap">
              <div className="adm-history-summary">
                {[
                  {val:assetLoans.length,   label:"Total",       color:"#1d4ed8"},
                  {val:activeLoans.length,  label:"Aktif",       color:"#f59e0b"},
                  {val:returnedLoans.length,label:"Selesai",     color:"#22c55e"},
                  {val:maintLoans.length,   label:"Maintenance", color:"#dc2626"},
                ].map(s => (
                  <div key={s.label} className="adm-summary-stat">
                    <span className="adm-summary-val" style={{color:s.color}}>{s.val}</span>
                    <span className="adm-summary-label">{s.label}</span>
                  </div>
                ))}
              </div>

              {assetLoans.length===0 ? (
                <div className="adm-empty">
                  <Ico n="history" s={36} c="var(--gray-300)"/>
                  <p>Belum ada riwayat untuk aset ini</p>
                </div>
              ) : (
                <div className="adm-history-list">
                  {assetLoans.map(t => {
                    const overdue    = t.status==="ACTIVE" && isOverdue(t.return_date);
                    const isMaint    = t.type==="MAINTENANCE";
                    const trxConf    = trxTypeConf?.[t.type] || trxTypeConf?.BORROW;
                    const dotColor   = t.status==="RETURNED"?"#22c55e":overdue?"#ef4444":isMaint?"#dc2626":"#f59e0b";
                    const badgeBg    = t.status==="RETURNED"?"#dcfce7":overdue?"#fee2e2":isMaint?"#fee2e2":"#fef9c3";
                    const badgeColor = t.status==="RETURNED"?"#16a34a":overdue?"#dc2626":isMaint?"#dc2626":"#d97706";
                    const badgeLabel = t.status==="RETURNED"?"Selesai":overdue?"Terlambat":isMaint?"Maintenance":"Aktif";
                    return (
                      <div key={t.id} className={`adm-history-item ${overdue?"overdue":""} ${t.status==="RETURNED"?"returned":""}`}>
                        <div className="adm-history-dot" style={{background:dotColor}}/>
                        <div className="adm-history-content">
                          <div className="adm-history-top">
                            <div className="adm-history-user">
                              <div className="adm-history-avatar" style={{background:isMaint?"linear-gradient(135deg,#dc2626,#ef4444)":"linear-gradient(135deg,#2563eb,#7c3aed)"}}>
                                {isMaint?<Ico n="tool" s={14} c="#fff"/>:(t.user_name||"?")[0].toUpperCase()}
                              </div>
                              <div>
                                <p className="adm-history-name">
                                  {t.user_name||"—"}
                                  <span style={{marginLeft:8,fontSize:10,fontWeight:800,padding:"2px 7px",borderRadius:5,background:trxConf?.bg||"#dbeafe",color:trxConf?.color||"#2563eb",verticalAlign:"middle"}}>
                                    {trxConf?.label||t.type}
                                  </span>
                                  {t.asset_status_snapshot&&(()=>{
                                    const snap=statusConf[t.asset_status_snapshot];
                                    if(!snap) return null;
                                    return <span style={{marginLeft:5,fontSize:10,fontWeight:700,padding:"2px 7px",borderRadius:5,background:snap.bg,color:snap.color,verticalAlign:"middle"}}>{snap.label}</span>;
                                  })()}
                                </p>
                                <p className="adm-history-purpose">{t.purpose}</p>
                              </div>
                            </div>
                            <span className="adm-history-badge" style={{background:badgeBg,color:badgeColor}}>
                              <span className="badge-dot" style={{background:dotColor}}/>{badgeLabel}
                            </span>
                          </div>
                          <div className="adm-history-dates">
                            <span><Ico n="clock" s={11} c="var(--gray-400)"/> Mulai: <strong>{fmt(t.date)}</strong></span>
                            {t.status==="ACTIVE"?(
                              <span className={overdue?"overdue-text":""}>
                                <Ico n={overdue?"warn":"clock"} s={11} c={overdue?"#ef4444":"var(--gray-400)"}/>
                                Jatuh tempo: <strong>{fmt(t.return_date)}</strong>{overdue&&" ⚠"}
                              </span>
                            ):(
                              <span><Ico n="clock" s={11} c="#22c55e"/> Selesai: <strong>{fmt(t.returned_date)}</strong></span>
                            )}
                          </div>
                          <div style={{marginTop:10,display:"flex",alignItems:"center",gap:8,flexWrap:"wrap"}}>
                            <span style={{fontSize:11,color:"#94a3b8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.4px"}}>Kondisi:</span>
                            <CondArrow before={t.condition_before} after={t.condition_after}/>
                          </div>
                          {t.return_notes&&(
                            <div style={{marginTop:8,fontSize:12,color:"#475569",background:"#f8fafc",border:"1px solid #e2e8f0",borderRadius:8,padding:"7px 11px",fontStyle:"italic"}}>
                              💬 {t.return_notes}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}