// ============================================================
// ScanBarcode.jsx — Fixed: kamera BENAR-BENAR mati saat tutup
// ============================================================
import { useState, useEffect, useRef, useCallback } from "react";
import {
  assetsMock,
  transactionsMock,
  categoryConf,
  statusConf,
  conditionConf,
  fmtIDR,
  fmt,
} from "./data";
import BorrowModal from "./BorrowModal";
import "./ScanBarcode.css";

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    scan: (
      <>
        <path d="M3 7V5a2 2 0 0 1 2-2h2" />
        <path d="M17 3h2a2 2 0 0 1 2 2v2" />
        <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
        <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
        <line x1="7" y1="8" x2="17" y2="8" />
        <line x1="7" y1="12" x2="17" y2="12" />
        <line x1="7" y1="16" x2="17" y2="16" />
      </>
    ),
    camera: (
      <>
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </>
    ),
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    alert: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    laptop: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </>
    ),
    server: (
      <>
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
      </>
    ),
    monitor: (
      <>
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M7 8h10M7 12h6" />
      </>
    ),
    network: (
      <>
        <circle cx="12" cy="5" r="3" />
        <circle cx="19" cy="19" r="3" />
        <circle cx="5" cy="19" r="3" />
        <line x1="12" y1="8" x2="5.5" y2="16" />
        <line x1="12" y1="8" x2="18.5" y2="16" />
      </>
    ),
    battery: (
      <>
        <rect x="1" y="6" width="18" height="12" rx="2" />
        <line x1="23" y1="11" x2="23" y2="13" />
      </>
    ),
    cube: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      </>
    ),
    tag: (
      <>
        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
        <line x1="7" y1="7" x2="7.01" y2="7" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    borrow: (
      <>
        <path d="M16 3h5v5" />
        <path d="M4 20L21 3" />
      </>
    ),
  };
  const catIcons = {
    LAPTOP: "laptop",
    SERVER: "server",
    DESKTOP: "monitor",
    NETWORK: "network",
    UPS: "battery",
    OTHER: "cube",
  };
  return (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[catIcons[n] || n]}
    </svg>
  );
};

function loadHtml5QrCode() {
  return new Promise((resolve, reject) => {
    if (window.Html5Qrcode) {
      resolve();
      return;
    }
    const s = document.createElement("script");
    s.src = "https://unpkg.com/html5-qrcode@2.3.8/html5-qrcode.min.js";
    s.onload = resolve;
    s.onerror = () => reject(new Error("load_failed"));
    document.head.appendChild(s);
  });
}

// ─────────────────────────────────────────────────────────────
// FIXED: Matikan semua stream kamera secara agresif & menyeluruh
// ─────────────────────────────────────────────────────────────
async function hardStopAllCameraStreams() {
  // 1. Stop semua <video> srcObject tracks
  document.querySelectorAll("video").forEach((v) => {
    if (v.srcObject) {
      v.srcObject.getTracks().forEach((t) => {
        try {
          t.stop();
        } catch (_) {}
      });
      v.srcObject = null;
    }
    v.pause?.();
  });

  // 2. Minta getUserMedia untuk mendapatkan referensi stream terbaru, lalu stop
  // Ini menangani kasus di mana track masih aktif tapi tidak ter-reference di DOM
  try {
    // Coba enumerate semua device, jika ada kamera aktif
    if (navigator.mediaDevices?.enumerateDevices) {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const hasCamera = devices.some((d) => d.kind === "videoinput");
      if (hasCamera) {
        // Dapatkan stream baru hanya untuk langsung di-stop — ini men-trigger browser
        // untuk benar-benar melepas semua kamera yang mungkin tertahan
        try {
          const tempStream = await navigator.mediaDevices.getUserMedia({
            video: true,
          });
          tempStream.getTracks().forEach((t) => t.stop());
        } catch (_) {
          // Diabaikan — mungkin sudah tidak ada kamera aktif
        }
      }
    }
  } catch (_) {}
}

const SCANNER_ID = "html5qr-reader-cam";

function CameraScanner({ onDetected, onClose }) {
  const [status, setStatus] = useState("loading");
  const [errMsg, setErrMsg] = useState("");
  const scannerRef = useRef(null);
  const stoppedRef = useRef(false);

  // ── Fungsi stop kamera yang benar-benar menyeluruh ──
  const stopScanner = useCallback(async () => {
    if (stoppedRef.current) return;
    stoppedRef.current = true;

    const sc = scannerRef.current;
    if (sc) {
      try {
        // Cek state sebelum stop (2=SCANNING, 3=PAUSED)
        const state = sc.getState?.();
        if (state === 2 || state === 3) {
          await sc.stop();
        }
      } catch (_) {}
      try {
        sc.clear?.();
      } catch (_) {}
      scannerRef.current = null;
    }

    // Pastikan semua stream benar-benar mati
    await hardStopAllCameraStreams();
  }, []);

  const handleClose = useCallback(async () => {
    await stopScanner();
    onClose();
  }, [stopScanner, onClose]);

  useEffect(() => {
    let mounted = true;
    stoppedRef.current = false;

    const init = async () => {
      try {
        await loadHtml5QrCode();
        if (!mounted) return;
        setStatus("scanning");

        const scanner = new window.Html5Qrcode(SCANNER_ID);
        scannerRef.current = scanner;

        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 220, height: 220 } },
          async (decodedText) => {
            await stopScanner();
            if (mounted) onDetected(decodedText);
          },
          () => {},
        );
      } catch (err) {
        if (!mounted) return;
        setStatus("error");
        setErrMsg(
          err?.message === "load_failed"
            ? "Gagal memuat library scanner. Periksa koneksi internet."
            : "Tidak dapat mengakses kamera. Pastikan izin kamera diaktifkan di browser Anda.",
        );
      }
    };

    init();

    // ← KUNCI: cleanup saat unmount pasti dipanggil
    return () => {
      mounted = false;
      stopScanner();
    };
  }, [stopScanner]);

  return (
    <div
      className="cam-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="cam-modal">
        <div className="cam-header">
          <div className="cam-header-left">
            <Ico n="camera" s={18} c="#fff" />
            <span>Scan Barcode / QR Code</span>
          </div>
          <button className="cam-btn-close" onClick={handleClose} type="button">
            <Ico n="x" s={18} c="#fff" />
          </button>
        </div>

        <div className="cam-body">
          {status === "loading" && (
            <div className="cam-loading">
              <div className="cam-spinner" />
              <p>Memuat scanner kamera...</p>
            </div>
          )}
          {status === "error" && (
            <div className="cam-error">
              <Ico n="alert" s={36} c="#ef4444" />
              <p>{errMsg}</p>
              <button
                className="btn btn-secondary btn-sm"
                onClick={handleClose}
              >
                Tutup
              </button>
            </div>
          )}
          <div
            id={SCANNER_ID}
            style={{
              width: "100%",
              display: status === "error" ? "none" : "block",
            }}
          />
        </div>

        <p className="cam-hint">
          Arahkan kamera ke barcode atau QR code pada label aset
        </p>
      </div>
    </div>
  );
}

// ── Main Page ────────────────────────────────────────────────
export default function ScanBarcode() {
  const [loans, setLoans] = useState(transactionsMock);
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [borrowAsset, setBorrow] = useState(null);
  const [searched, setSearched] = useState(false);
  const [showCam, setShowCam] = useState(false);
  const [scanSuccess, setScanSuccess] = useState("");

  const examples = ["ast001", "SN-DL-001234", "ast003", "SN-NW-002345"];

  const doSearch = (q) => {
    const qLow = q.trim().toLowerCase();
    if (!qLow) return;
    setSearched(true);
    const found = assetsMock.find(
      (a) =>
        a.id.toLowerCase() === qLow ||
        a.serial.toLowerCase() === qLow ||
        a.name.toLowerCase().includes(qLow),
    );
    setResult(found || false);
  };

  const handleSearch = () => doSearch(query);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  const handleClear = () => {
    setQuery("");
    setResult(null);
    setSearched(false);
    setScanSuccess("");
  };

  const handleCameraDetect = (code) => {
    // CameraScanner sudah unmount & stop sebelum callback ini dipanggil
    setShowCam(false);
    setQuery(code);
    setScanSuccess(`✓ Barcode terdeteksi: ${code}`);
    doSearch(code);
  };

  // Saat tutup kamera: set false → komponen unmount → useEffect cleanup → stop kamera
  const handleCameraClose = () => setShowCam(false);

  const assetLoans = result
    ? loans.filter((t) => t.asset_id === result.id)
    : [];

  return (
    <div className="scan-page">
      {/* Mount/unmount CameraScanner — cleanup terjadi otomatis via useEffect return */}
      {showCam && (
        <CameraScanner
          onDetected={handleCameraDetect}
          onClose={handleCameraClose}
        />
      )}

      <div className="scan-header">
        <h1 className="scan-title">Scan Barcode Aset</h1>
        <p className="scan-sub">
          Gunakan kamera atau masukkan ID aset / nomor serial secara manual
        </p>
      </div>

      <div className="card scan-box">
        <div className="scan-cam-row">
          <button
            className="btn btn-primary scan-cam-btn"
            onClick={() => setShowCam(true)}
          >
            <Ico n="camera" s={18} /> Buka Kamera untuk Scan
          </button>
          <span className="scan-or-divider">atau masukkan manual</span>
        </div>

        {scanSuccess && (
          <div className="scan-success-chip">
            <Ico n="check" s={14} c="#16a34a" /> {scanSuccess}
          </div>
        )}

        <div className="scan-input-row">
          <div className="scan-input-wrap">
            <Ico n="tag" s={16} c="var(--gray-400)" />
            <input
              className="scan-input"
              placeholder="ID Aset atau Nomor Serial (contoh: ast001)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {query && (
              <button className="scan-clear" onClick={handleClear}>
                <Ico n="x" s={14} />
              </button>
            )}
          </div>
          <button
            className="btn btn-primary scan-btn"
            onClick={handleSearch}
            disabled={!query.trim()}
          >
            <Ico n="search" s={16} /> Cari Aset
          </button>
        </div>

        <div className="scan-examples">
          <span className="scan-examples-label">Contoh kode:</span>
          {examples.map((ex) => (
            <button
              key={ex}
              className="scan-example-chip"
              onClick={() => {
                setQuery(ex);
                setResult(null);
                setSearched(false);
                setScanSuccess("");
              }}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {searched && result === false && (
        <div className="card scan-notfound">
          <Ico n="alert" s={40} c="#ef4444" />
          <h3>Aset Tidak Ditemukan</h3>
          <p>
            Tidak ada aset dengan ID atau serial "<strong>{query}</strong>".
          </p>
          <button className="btn btn-secondary btn-sm" onClick={handleClear}>
            Cari Lagi
          </button>
        </div>
      )}

      {result &&
        (() => {
          const cat = categoryConf[result.category] || categoryConf.OTHER;
          const st = statusConf[result.status];
          const cond = conditionConf[result.condition];
          return (
            <div className="scan-result-wrap">
              <div className="scan-result-label">
                <Ico n="search" s={14} c="var(--primary-600)" />
                Hasil untuk "<strong>{query}</strong>"
              </div>
              <div className="card scan-result-card">
                <div
                  className="scan-result-hero"
                  style={{
                    background: `linear-gradient(135deg, ${cat.bg}, #f8fafc)`,
                  }}
                >
                  <div
                    className="scan-result-hero-icon"
                    style={{ color: cat.color }}
                  >
                    <Ico n={result.category} s={52} />
                  </div>
                  <div className="scan-result-hero-info">
                    <p className="scan-result-name">{result.name}</p>
                    <p className="scan-result-sub">
                      {result.brand} · {result.model}
                    </p>
                    <div className="scan-result-badges">
                      <span
                        className="badge"
                        style={{ background: st.bg, color: st.color }}
                      >
                        <span
                          className="badge-dot"
                          style={{ background: st.dot }}
                        />
                        {st.label}
                      </span>
                      <span
                        className="badge"
                        style={{ background: cond.bg, color: cond.color }}
                      >
                        {cond.label}
                      </span>
                      <span
                        className="badge"
                        style={{
                          background:
                            result.budget_type === "CAPEX"
                              ? "#eff6ff"
                              : "#f5f3ff",
                          color:
                            result.budget_type === "CAPEX"
                              ? "#2563eb"
                              : "#7c3aed",
                        }}
                      >
                        {result.budget_type}
                      </span>
                    </div>
                  </div>
                  {result.status === "AVAILABLE" && (
                    <button
                      className="btn btn-primary"
                      onClick={() => setBorrow(result)}
                    >
                      <Ico n="borrow" s={15} /> Pinjam Aset
                    </button>
                  )}
                </div>

                <div className="scan-info-section">
                  <p className="section-title-sm">Informasi Aset</p>
                  <div className="scan-info-grid">
                    {[
                      ["ID Aset", result.id],
                      ["Serial Number", result.serial],
                      ["Lokasi", result.location],
                      ["Tahun", result.year],
                      ["Harga", fmtIDR(result.price)],
                      ["Kategori", cat.label],
                    ].map(([k, v]) => (
                      <div key={k} className="scan-info-item">
                        <p className="scan-info-key">{k}</p>
                        <p className="scan-info-val">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="scan-info-section">
                  <p className="section-title-sm">Spesifikasi Teknis</p>
                  <div className="scan-spec-grid">
                    {Object.entries(result.spec).map(([k, v]) => (
                      <div key={k} className="scan-spec-item">
                        <p className="scan-spec-key">{k.toUpperCase()}</p>
                        <p className="scan-spec-val">{v}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="scan-info-section">
                  <p className="section-title-sm">
                    Riwayat Transaksi ({assetLoans.length})
                  </p>
                  {assetLoans.length === 0 ? (
                    <p style={{ fontSize: "12.5px", color: "var(--gray-400)" }}>
                      Belum ada riwayat transaksi.
                    </p>
                  ) : (
                    <div className="scan-history">
                      {assetLoans.map((t) => (
                        <div key={t.id} className="scan-history-item">
                          <div
                            className="scan-history-dot"
                            style={{
                              background:
                                t.status === "ACTIVE" ? "#f59e0b" : "#22c55e",
                            }}
                          />
                          <div className="scan-history-info">
                            <p className="scan-history-user">{t.user_name}</p>
                            <p className="scan-history-meta">
                              <Ico n="clock" s={11} c="var(--gray-400)" />
                              {fmt(t.date)} →{" "}
                              {t.returned_date
                                ? fmt(t.returned_date)
                                : "Belum dikembalikan"}
                            </p>
                            <p className="scan-history-purpose">{t.purpose}</p>
                          </div>
                          <span
                            className="badge"
                            style={{
                              fontSize: "11px",
                              background:
                                t.status === "ACTIVE" ? "#fef9c3" : "#dcfce7",
                              color:
                                t.status === "ACTIVE" ? "#d97706" : "#16a34a",
                            }}
                          >
                            {t.status === "ACTIVE" ? "Aktif" : "Selesai"}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

      {borrowAsset && (
        <BorrowModal
          asset={borrowAsset}
          onClose={() => setBorrow(null)}
          onConfirm={(newTrx) => {
            setLoans((prev) => [...prev, newTrx]);
            setBorrow(null);
            setResult((prev) =>
              prev ? { ...prev, status: "BORROWED" } : prev,
            );
          }}
        />
      )}
    </div>
  );
}
