import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaLock, FaIdCard, FaPhone,
  FaBuilding, FaMapMarkerAlt, FaUserTag,
  FaArrowLeft, FaCheckCircle,
} from "react-icons/fa";
import "./Auth.css";

// === IMPORT ASET ===
// import logoPelindo from "../pictures/pelindo2.png";
// import batikImg from "../pictures/batik.png";
const logoPelindo = null; // ganti dengan import asli
const batikImg = null;    // ganti dengan import asli

/* ============================================================
   MOCK USERS — ganti dengan API call di production
   ============================================================ */
const MOCK_USERS = [
  { email: "admin@pelindo.co.id",    password: "admin123",    role: "superadmin", nama: "Joy Silalahi" },
  { email: "pegawai@pelindo.co.id",  password: "user123",     role: "user",       nama: "Budi Santoso" },
];

/* ============================================================
   AUTH COMPONENT
   ============================================================ */
const Auth = () => {
  const [isLogin, setIsLogin]               = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail]       = useState("");
  const [forgotSent, setForgotSent]         = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail]     = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError]     = useState("");
  const [isLoading, setIsLoading]       = useState(false);
  const [rememberMe, setRememberMe]     = useState(false);

  // Register form state
  const [regData, setRegData] = useState({
    namaLengkap: "", nip: "", username: "", telepon: "",
    role: "", entitas: "", cabang: "",
    email: "", password: "", konfirmasi: "",
  });

  const navigate = useNavigate();

  /* ── Toggle ── */
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginError("");
  };

  /* ── Forgot Password ── */
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSent(true);
  };

  const backToLogin = () => {
    setIsForgotPassword(false);
    setForgotEmail("");
    setForgotSent(false);
  };

  /* ── LOGIN dengan role-based redirect ── */
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    // Simulasi delay network (hapus di production, ganti dgn API call)
    setTimeout(() => {
      const user = MOCK_USERS.find(
        (u) => u.email === loginEmail && u.password === loginPassword
      );

      if (!user) {
        setLoginError("Email atau password salah. Coba lagi.");
        setIsLoading(false);
        return;
      }

      // Simpan info user ke sessionStorage (opsional)
      sessionStorage.setItem("user", JSON.stringify({ nama: user.nama, role: user.role, email: user.email }));
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify({ nama: user.nama, role: user.role, email: user.email }));
      }

      setIsLoading(false);

      // ══ ROLE-BASED REDIRECT ══
      if (user.role === "superadmin") {
        navigate("/dashboard");          // Super Admin → Dashboard utama
      } else {
        navigate("/user/dashboard");     // User/Pegawai → Dashboard user
      }
    }, 800);
  };

  /* ── REGISTER ── */
  const handleRegister = (e) => {
    e.preventDefault();
    if (regData.password !== regData.konfirmasi) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }
    alert("Registrasi berhasil! Silakan login setelah akun diaktivasi admin.");
    setIsLogin(true);
  };

  /* ── REGISTER field change ── */
  const handleRegChange = (field, val) => setRegData({ ...regData, [field]: val });

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <div className="auth-fullscreen-container">
      {/* Batik decoration */}
      {batikImg && (
        <div
          className="auth-batik-decoration"
          style={{ backgroundImage: `url(${batikImg})` }}
        />
      )}
      <div className="auth-gradient-overlay" />

      <div className="auth-layout-wrapper">
        {/* ══ CARD ══ */}
        <div className="auth-card-section">
          <div className="auth-floating-card">

            {/* ── FORGOT PASSWORD ── */}
            {isForgotPassword ? (
              <div className="fp-wrapper">
                {!forgotSent ? (
                  <>
                    <div className="fp-heading">
                      <h2>Lupa Kata Sandi?</h2>
                      <p>
                        Tenang, masukkan email terdaftar Anda dan kami akan
                        mengirimkan instruksi reset kata sandi.
                      </p>
                    </div>
                    <form onSubmit={handleForgotSubmit} className="auth-form fp-form">
                      <div className="form-group">
                        <label>Alamat Email</label>
                        <div className="input-wrapper">
                          <FaEnvelope className="input-icon" />
                          <input
                            type="email"
                            placeholder="email@pelindo.co.id"
                            value={forgotEmail}
                            onChange={(e) => setForgotEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <button type="submit" className="auth-button fp-submit-btn">
                        Kirim Instruksi Reset
                      </button>
                    </form>
                    <button className="fp-back-link" onClick={backToLogin}>
                      <FaArrowLeft size={11} />
                      Kembali ke halaman login
                    </button>
                  </>
                ) : (
                  <div className="fp-success">
                    <div className="fp-success-icon"><FaCheckCircle /></div>
                    <h2>Email Terkirim!</h2>
                    <p>Instruksi reset kata sandi telah dikirim ke</p>
                    <div className="fp-email-chip">{forgotEmail}</div>
                    <p className="fp-note">
                      Tidak menemukan emailnya? Cek folder{" "}
                      <strong>Spam</strong> atau <strong>Junk Mail</strong>.
                    </p>
                    <button className="auth-button" onClick={backToLogin}>
                      Kembali ke Login
                    </button>
                  </div>
                )}
              </div>

            ) : (
              <>
                {/* ── HEADER ── */}
                <div className="auth-header">
                  <h2>{isLogin ? "Selamat Datang" : "Registrasi"}</h2>
                  <p>
                    {isLogin
                      ? "Sistem Inventory Aset Pelindo"
                      : "Lengkapi data diri Anda"}
                  </p>
                </div>

                {/* ── LOGIN FORM ── */}
                {isLogin ? (
                  <form onSubmit={handleLogin} className="auth-form">
                    {loginError && (
                      <div className="auth-error-box">
                        ⚠ {loginError}
                      </div>
                    )}

                    <div className="form-group">
                      <label>Email</label>
                      <div className="input-wrapper">
                        <FaEnvelope className="input-icon" />
                        <input
                          type="email"
                          placeholder="email@pelindo.co.id"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-actions">
                      <label className="remember-me">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <span>Ingat Saya</span>
                      </label>
                      <span
                        className="forgot-password"
                        onClick={() => setIsForgotPassword(true)}
                      >
                        Lupa Password?
                      </span>
                    </div>

                    <button type="submit" className="auth-button" disabled={isLoading}>
                      {isLoading ? (
                        <span className="auth-loading">
                          <span className="auth-spinner" /> Memproses...
                        </span>
                      ) : "Masuk Sekarang"}
                    </button>

                    {/* DEMO HINT */}
                    <div className="auth-demo-hint">
                      <p>🔑 <strong>Demo:</strong></p>
                      <p>Super Admin: <code>admin@pelindo.co.id</code> / <code>admin123</code></p>
                      <p>Pegawai: <code>pegawai@pelindo.co.id</code> / <code>user123</code></p>
                    </div>
                  </form>

                ) : (
                  /* ── REGISTER FORM ── */
                  <form onSubmit={handleRegister} className="auth-form">
                    <div className="form-group">
                      <label>Nama Lengkap</label>
                      <div className="input-wrapper">
                        <FaUser className="input-icon" />
                        <input
                          type="text" placeholder="Nama Lengkap"
                          value={regData.namaLengkap}
                          onChange={(e) => handleRegChange("namaLengkap", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group half">
                        <label>NIP</label>
                        <div className="input-wrapper">
                          <FaIdCard className="input-icon" />
                          <input
                            type="text" placeholder="NIP"
                            value={regData.nip}
                            onChange={(e) => handleRegChange("nip", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="form-group half">
                        <label>Username</label>
                        <div className="input-wrapper">
                          <FaUser className="input-icon" />
                          <input
                            type="text" placeholder="Username"
                            value={regData.username}
                            onChange={(e) => handleRegChange("username", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>No. Telepon</label>
                      <div className="input-wrapper">
                        <FaPhone className="input-icon" />
                        <input
                          type="tel" placeholder="08xxxxxxxxxx"
                          value={regData.telepon}
                          onChange={(e) => handleRegChange("telepon", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Role / Peran</label>
                      <div className="input-wrapper">
                        <FaUserTag className="input-icon" />
                        <select
                          value={regData.role}
                          onChange={(e) => handleRegChange("role", e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih Role</option>
                          <option value="user">User / Pegawai</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Entitas</label>
                      <div className="input-wrapper">
                        <FaBuilding className="input-icon" />
                        <select
                          value={regData.entitas}
                          onChange={(e) => handleRegChange("entitas", e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih Entitas</option>
                          <option value="pmt">PT Pelindo Multi Terminal</option>
                          <option value="pelindo_pusat">Pelindo Pusat</option>
                          <option value="spmt">SPMT</option>
                          <option value="other">Lainnya</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Cabang / Branch</label>
                      <div className="input-wrapper">
                        <FaMapMarkerAlt className="input-icon" />
                        <select
                          value={regData.cabang}
                          onChange={(e) => handleRegChange("cabang", e.target.value)}
                          required
                        >
                          <option value="" disabled>Pilih Cabang</option>
                          <option value="belawan">Belawan</option>
                          <option value="dumai">Dumai</option>
                          <option value="tanjung_intan">Tanjung Intan</option>
                          <option value="pusat">Kantor Pusat</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Email</label>
                      <div className="input-wrapper">
                        <FaEnvelope className="input-icon" />
                        <input
                          type="email" placeholder="email@pelindo.co.id"
                          value={regData.email}
                          onChange={(e) => handleRegChange("email", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Password</label>
                      <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input
                          type="password" placeholder="Minimal 8 karakter"
                          value={regData.password}
                          onChange={(e) => handleRegChange("password", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Konfirmasi Password</label>
                      <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input
                          type="password" placeholder="Ulangi password"
                          value={regData.konfirmasi}
                          onChange={(e) => handleRegChange("konfirmasi", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <button type="submit" className="auth-button">Daftar Sekarang</button>
                  </form>
                )}

                <div className="auth-footer">
                  <p>
                    {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
                    <span onClick={toggleMode} className="toggle-link">
                      {isLogin ? "Daftar di sini" : "Login di sini"}
                    </span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* ══ LOGO ══ */}
        <div className="auth-logo-section">
          {logoPelindo ? (
            <img src={logoPelindo} alt="Pelindo Logo" className="big-logo-image" />
          ) : (
            /* Placeholder logo jika gambar belum ada */
            <div className="auth-logo-placeholder">
              <div className="auth-logo-text">PELINDO</div>
              <div className="auth-logo-sub">Sistem Inventory Aset</div>
            </div>
          )}
        </div>
      </div>

      {/* Extra styles untuk Auth baru */}
      <style>{`
        .auth-error-box {
          background: #fef2f2;
          border: 1.5px solid #fecaca;
          border-radius: 10px;
          padding: 10px 14px;
          color: #b91c1c;
          font-size: 0.82rem;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .auth-loading {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .auth-spinner {
          width: 16px; height: 16px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: authSpin .7s linear infinite;
          display: inline-block;
        }
        @keyframes authSpin { to { transform: rotate(360deg); } }
        .auth-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none !important;
        }
        .auth-demo-hint {
          margin-top: 10px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 10px 14px;
          font-size: 0.75rem;
          color: #64748b;
          line-height: 1.7;
        }
        .auth-demo-hint p { margin: 0; }
        .auth-demo-hint code {
          background: #e2e8f0;
          padding: 1px 5px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.72rem;
          color: #334155;
        }
        .auth-logo-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          animation: fadeInRight 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          opacity: 0;
        }
        .auth-logo-text {
          font-size: 5rem;
          font-weight: 900;
          color: white;
          letter-spacing: 8px;
          text-shadow: 0 4px 30px rgba(0,0,0,0.5);
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .auth-logo-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          letter-spacing: 2px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default Auth;