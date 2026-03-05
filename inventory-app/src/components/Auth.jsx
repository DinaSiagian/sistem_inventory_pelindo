import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaIdCard,
  FaPhone,
  FaBuilding,
  FaMapMarkerAlt,
  FaUserTag,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import "./Auth.css";

// === IMPORT ASET ===
import logoPelindo from "../pictures/pelindo2.png";
import batikImg from "../pictures/batik.png";

// ================================================================
// DUMMY USERS — nanti diganti koneksi ke backend MySQL
// role: "admin"  → redirect ke /dashboard
// role: "user"   → redirect ke /user/dashboard
// ================================================================
const DUMMY_USERS = [
  {
    id: 1,
    nama: "Joy Silalahi",
    username: "joy.silalahi",
    email: "joy@pelindo.co.id",
    password: "admin123",
    role: "admin",
    nip: "199001010001",
    telepon: "081234567890",
    entitas: "PT Pelindo Multi Terminal",
    cabang: "Kantor Pusat",
    avatar: "JS",
  },
  {
    id: 2,
    nama: "Budi Santoso",
    username: "budi.santoso",
    email: "budi@pelindo.co.id",
    password: "user123",
    role: "user",
    nip: "199205152002",
    telepon: "082345678901",
    entitas: "PT Pelindo Multi Terminal",
    cabang: "Belawan",
    avatar: "BS",
  },
  {
    id: 3,
    nama: "Siti Rahayu",
    username: "siti.rahayu",
    email: "siti@pelindo.co.id",
    password: "user456",
    role: "user",
    nip: "199308202003",
    telepon: "083456789012",
    entitas: "SPMT",
    cabang: "Dumai",
    avatar: "SR",
  },
];

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Form register state
  const [registerData, setRegisterData] = useState({
    nama: "",
    nip: "",
    username: "",
    telepon: "",
    role: "",
    entitas: "",
    cabang: "",
    email: "",
    password: "",
    konfirmasi: "",
  });

  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setLoginError("");
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setForgotSent(true);
  };

  const backToLogin = () => {
    setIsForgotPassword(false);
    setForgotEmail("");
    setForgotSent(false);
  };

  // ── LOGIN dengan cek dummy user ──────────────────────────────
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError("");

    if (isLogin) {
      const emailInput = e.target.email.value.trim();
      const passwordInput = e.target.password.value;

      const found = DUMMY_USERS.find(
        (u) => u.email === emailInput && u.password === passwordInput,
      );

      if (!found) {
        setLoginError("Email atau password salah. Silakan coba lagi.");
        return;
      }

      // Simpan info user ke sessionStorage (sementara, sebelum ada backend)
      sessionStorage.setItem("currentUser", JSON.stringify(found));

      // Redirect berdasarkan role
      if (found.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
      // Register — validasi konfirmasi password
      if (registerData.password !== registerData.konfirmasi) {
        setLoginError("Password dan konfirmasi password tidak cocok.");
        return;
      }
      // TODO: kirim ke backend MySQL
      alert(
        `Registrasi berhasil!\nAkun untuk ${registerData.nama} (${registerData.role}) telah dibuat.\nSilakan login.`,
      );
      setIsLogin(true);
      setLoginError("");
    }
  };

  return (
    <div className="auth-fullscreen-container">
      <div
        className="auth-batik-decoration"
        style={{ backgroundImage: `url(${batikImg})` }}
      ></div>
      <div className="auth-gradient-overlay"></div>

      <div className="auth-layout-wrapper">
        <div className="auth-card-section">
          <div className="auth-floating-card">
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

                    <form
                      onSubmit={handleForgotSubmit}
                      className="auth-form fp-form"
                    >
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

                      <button
                        type="submit"
                        className="auth-button fp-submit-btn"
                      >
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
                    <div className="fp-success-icon">
                      <FaCheckCircle />
                    </div>
                    <h2>Email Terkirim!</h2>
                    <p>Instruksi reset kata sandi telah dikirim ke</p>
                    <div className="fp-email-chip">{forgotEmail}</div>
                    <p className="fp-note">
                      Tidak menemukan emailnya? Cek folder <strong>Spam</strong>{" "}
                      atau <strong>Junk Mail</strong> Anda.
                    </p>
                    <button
                      className="auth-button fp-submit-btn"
                      onClick={backToLogin}
                    >
                      Kembali ke Login
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="auth-header">
                  <h2>{isLogin ? "Selamat Datang" : "Registrasi"}</h2>
                  <p>
                    {isLogin
                      ? "Sistem Inventory Pelindo"
                      : "Lengkapi data diri Anda"}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <>
                      <div className="form-group">
                        <label>Nama Lengkap</label>
                        <div className="input-wrapper">
                          <FaUser className="input-icon" />
                          <input
                            type="text"
                            placeholder="Nama Lengkap"
                            value={registerData.nama}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                nama: e.target.value,
                              })
                            }
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
                              type="text"
                              placeholder="NIP"
                              value={registerData.nip}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  nip: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                        </div>
                        <div className="form-group half">
                          <label>Username</label>
                          <div className="input-wrapper">
                            <FaUser className="input-icon" />
                            <input
                              type="text"
                              placeholder="Username"
                              value={registerData.username}
                              onChange={(e) =>
                                setRegisterData({
                                  ...registerData,
                                  username: e.target.value,
                                })
                              }
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
                            type="tel"
                            placeholder="08xxxxxxxxxx"
                            value={registerData.telepon}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                telepon: e.target.value,
                              })
                            }
                            required
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Role / Peran</label>
                        <div className="input-wrapper">
                          <FaUserTag className="input-icon" />
                          <select
                            value={registerData.role}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                role: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="" disabled>
                              Pilih Role
                            </option>
                            <option value="admin">Admin</option>
                            <option value="user">User / Pegawai</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Entitas</label>
                        <div className="input-wrapper">
                          <FaBuilding className="input-icon" />
                          <select
                            value={registerData.entitas}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                entitas: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="" disabled>
                              Pilih Entitas
                            </option>
                            <option value="pmt">
                              PT Pelindo Multi Terminal
                            </option>
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
                            value={registerData.cabang}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                cabang: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="" disabled>
                              Pilih Cabang
                            </option>
                            <option value="belawan">Belawan</option>
                            <option value="dumai">Dumai</option>
                            <option value="tanjung_intan">Tanjung Intan</option>
                            <option value="pusat">Kantor Pusat</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label>Email</label>
                    <div className="input-wrapper">
                      <FaEnvelope className="input-icon" />
                      <input
                        name="email"
                        type="email"
                        placeholder="email@pelindo.co.id"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input
                        name="password"
                        type="password"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="form-group">
                      <label>Konfirmasi Password</label>
                      <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input
                          type="password"
                          placeholder="Ulangi password"
                          value={registerData.konfirmasi}
                          onChange={(e) =>
                            setRegisterData({
                              ...registerData,
                              konfirmasi: e.target.value,
                            })
                          }
                          required
                        />
                      </div>
                    </div>
                  )}

                  {isLogin && (
                    <div className="form-actions">
                      <label className="remember-me">
                        <input type="checkbox" />
                        <span>Ingat Saya</span>
                      </label>
                      <span
                        className="forgot-password"
                        onClick={() => setIsForgotPassword(true)}
                      >
                        Lupa Password?
                      </span>
                    </div>
                  )}

                  {/* Error message */}
                  {loginError && (
                    <div
                      style={{
                        background: "#fff0f0",
                        border: "1px solid #ffcccc",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        color: "#cc0000",
                        fontSize: "0.85rem",
                        marginBottom: "8px",
                      }}
                    >
                      {loginError}
                    </div>
                  )}

                  <button type="submit" className="auth-button">
                    {isLogin ? "Masuk Sekarang" : "Daftar Sekarang"}
                  </button>
                </form>

                {/* Hint akun dummy — hapus saat sudah pakai backend */}
                {isLogin && (
                  <div
                    style={{
                      marginTop: "12px",
                      padding: "10px 14px",
                      background: "#f0f4ff",
                      borderRadius: "8px",
                      fontSize: "0.78rem",
                      color: "#555",
                      lineHeight: "1.6",
                    }}
                  >
                    <strong>Demo Akun:</strong>
                    <br />
                    🔴 Admin: joy@pelindo.co.id / admin123
                    <br />
                    🟢 User: budi@pelindo.co.id / user123
                  </div>
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

        <div className="auth-logo-section">
          <img
            src={logoPelindo}
            alt="Pelindo Logo"
            className="big-logo-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
