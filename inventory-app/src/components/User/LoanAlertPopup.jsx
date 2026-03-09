// ============================================================
// LoanAlertPopup.jsx
// Pop alert otomatis — muncul tiap user buka website
// ============================================================
import { useState, useCallback } from "react";
import { assetsMock, fmt } from "./Data";   // ← sesuai nama file kamu: Data.js

export default function LoanAlertPopup({ urgentLoans, onDismiss, onNavigate }) {
  const [closing, setClosing] = useState(false);

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => onDismiss?.(), 280);
  }, [onDismiss]);

  const handleGoToPeminjaman = () => {
    close();
    setTimeout(() => onNavigate?.("/user/peminjaman"), 280);
  };

  if (!urgentLoans || urgentLoans.length === 0) return null;

  const overdueLoans = urgentLoans.filter((l) => l.urgency.level === "overdue");
  const hasOverdue   = overdueLoans.length > 0;

  return (
    <>
      <style>{`
        @keyframes pal-bd-in  { from{opacity:0} to{opacity:1} }
        @keyframes pal-bd-out { from{opacity:1} to{opacity:0} }
        @keyframes pal-in  { from{opacity:0;transform:translate(-50%,-50%) scale(0.88)} to{opacity:1;transform:translate(-50%,-50%) scale(1)} }
        @keyframes pal-out { from{opacity:1;transform:translate(-50%,-50%) scale(1)} to{opacity:0;transform:translate(-50%,-50%) scale(0.92)} }
        @keyframes pal-shake {
          0%,100%{transform:rotate(0)} 20%{transform:rotate(-14deg)}
          40%{transform:rotate(14deg)} 60%{transform:rotate(-8deg)} 80%{transform:rotate(8deg)}
        }
        @keyframes pal-pulse {
          0%,100%{box-shadow:0 0 0 0 rgba(239,68,68,.55)}
          50%{box-shadow:0 0 0 6px rgba(239,68,68,0)}
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={close}
        style={{
          position:"fixed", inset:0,
          background:"rgba(15,23,42,0.55)",
          backdropFilter:"blur(4px)",
          zIndex:9998,
          animation: closing ? "pal-bd-out .28s forwards" : "pal-bd-in .28s forwards",
        }}
      />

      {/* Modal */}
      <div style={{
        position:"fixed", top:"50%", left:"50%",
        zIndex:9999,
        width:"min(500px, calc(100vw - 32px))",
        fontFamily:"'Plus Jakarta Sans', sans-serif",
        animation: closing ? "pal-out .28s cubic-bezier(.4,0,1,1) forwards"
                           : "pal-in  .34s cubic-bezier(.34,1.56,.64,1) forwards",
      }}>
        <div style={{
          background:"#fff", borderRadius:22, overflow:"hidden",
          boxShadow:"0 32px 80px rgba(0,0,0,.22),0 0 0 1px rgba(0,0,0,.05)",
        }}>

          {/* Header */}
          <div style={{
            background: hasOverdue
              ? "linear-gradient(135deg,#fef2f2,#fff5f5)"
              : "linear-gradient(135deg,#fffbeb,#fefce8)",
            borderBottom: hasOverdue ? "1px solid #fecaca" : "1px solid #fde68a",
            padding:"18px 22px",
            display:"flex", alignItems:"center", gap:14,
          }}>
            <div style={{
              width:50, height:50, borderRadius:15, flexShrink:0,
              background: hasOverdue ? "#fee2e2" : "#fef3c7",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:26,
              animation: hasOverdue ? "pal-shake .5s ease .3s" : "none",
            }}>
              {hasOverdue ? "🚨" : "⚠️"}
            </div>

            <div style={{flex:1}}>
              <div style={{
                fontSize:16, fontWeight:800, letterSpacing:-0.3, lineHeight:1.25,
                color: hasOverdue ? "#991b1b" : "#92400e",
              }}>
                {hasOverdue
                  ? `${overdueLoans.length} Aset Melewati Jatuh Tempo!`
                  : `${urgentLoans.length} Aset Segera Jatuh Tempo`}
              </div>
              <div style={{fontSize:12.5, marginTop:4, fontWeight:500,
                color: hasOverdue ? "#dc2626" : "#d97706"}}>
                {hasOverdue
                  ? "Segera kembalikan untuk menghindari sanksi"
                  : "Harap rencanakan pengembalian sebelum tenggat"}
              </div>
            </div>

            <button onClick={close} style={{
              width:30, height:30, borderRadius:9, border:"none", flexShrink:0,
              background:"rgba(0,0,0,.07)", cursor:"pointer",
              fontSize:14, color:"#64748b",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>✕</button>
          </div>

          {/* Body */}
          <div style={{maxHeight:300, overflowY:"auto", padding:"10px 14px"}}>
            {urgentLoans.map((loan) => {
              const isOv  = loan.urgency.level === "overdue";
              const asset = assetsMock.find((a) => a.id === loan.asset_id);
              const days  = loan.urgency.days;

              return (
                <div key={loan.id} style={{
                  display:"flex", alignItems:"center", gap:13,
                  padding:"11px 13px", borderRadius:13, marginBottom:8,
                  background: isOv
                    ? "linear-gradient(to right,#fff5f5,#fff)"
                    : "linear-gradient(to right,#fffbeb,#fff)",
                  border: isOv ? "1px solid #fecaca" : "1px solid #fde68a",
                }}>
                  {/* Icon */}
                  <div style={{
                    width:40, height:40, borderRadius:11, flexShrink:0,
                    background: isOv ? "#fee2e2" : "#fef3c7",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:20,
                  }}>
                    {isOv ? "⏰" : "📅"}
                  </div>

                  {/* Info */}
                  <div style={{flex:1, minWidth:0}}>
                    <div style={{
                      fontSize:13.5, fontWeight:800, color:"#0f172a",
                      whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis",
                    }}>
                      {asset?.name ?? "Aset"}
                    </div>
                    <div style={{fontSize:11, color:"#94a3b8", fontFamily:"monospace", marginTop:1}}>
                      {asset?.serial}
                    </div>
                    <div style={{fontSize:12, fontWeight:700, marginTop:4,
                      color: isOv ? "#dc2626" : "#d97706"}}>
                      {isOv
                        ? `Terlambat ${loan.urgency.daysOverdue} hari — jatuh tempo ${fmt(loan.return_date)}`
                        : days === 0
                          ? `Jatuh tempo HARI INI — ${fmt(loan.return_date)}`
                          : `Jatuh tempo ${days} hari lagi — ${fmt(loan.return_date)}`}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{
            padding:"13px 18px", borderTop:"1px solid #f1f5f9", background:"#fafbfc",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            gap:10, flexWrap:"wrap",
          }}>
            <span style={{fontSize:11.5, color:"#94a3b8", fontWeight:500}}>
              💡 Alert ini muncul selama aset belum dikembalikan
            </span>
            <div style={{display:"flex", gap:8}}>
              <button onClick={close} style={{
                padding:"7px 16px", borderRadius:9,
                border:"1.5px solid #e2e8f0", background:"#fff",
                color:"#64748b", fontSize:12.5, fontWeight:600,
                cursor:"pointer", fontFamily:"'Plus Jakarta Sans', sans-serif",
              }}>Nanti</button>

              <button onClick={handleGoToPeminjaman} style={{
                padding:"7px 18px", borderRadius:9, border:"none",
                background: hasOverdue
                  ? "linear-gradient(135deg,#ef4444,#dc2626)"
                  : "linear-gradient(135deg,#f59e0b,#d97706)",
                color:"#fff", fontSize:12.5, fontWeight:700,
                cursor:"pointer", fontFamily:"'Plus Jakarta Sans', sans-serif",
                boxShadow: hasOverdue
                  ? "0 4px 12px rgba(239,68,68,.35)"
                  : "0 4px 12px rgba(245,158,11,.35)",
              }}>
                Lihat Peminjaman →
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}