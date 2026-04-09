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
  FaSitemap,
} from "react-icons/fa";
import "./Auth.css";

// === IMPORT ASET ===
import logoPelindo from "../pictures/pelindo2.png";
import batikImg from "../pictures/batik.png";

// ================================================================
// DATA CASCADING: Entitas → Cabang → Divisi
// Divisi masih placeholder — edit sesuai kebutuhan nyata
// ================================================================
const DIVISI_PLACEHOLDER = [
  "Operasional",
  "Keuangan",
  "SDM & Umum",
  "IT & Sistem",
  "HSE",
  "Komersial",
];

const ENTITAS_DATA = {
  PTP: {
    label: "PT Pelabuhan Indonesia",
    cabang: {
      BTN: { label: "Banten", divisi: DIVISI_PLACEHOLDER },
      TPN: { label: "Tanjung Pandan", divisi: DIVISI_PLACEHOLDER },
      TBR: { label: "Teluk Bayur", divisi: DIVISI_PLACEHOLDER },
      BKL: { label: "Bengkulu", divisi: DIVISI_PLACEHOLDER },
      PTK: { label: "Pontianak", divisi: DIVISI_PLACEHOLDER },
      TJP: { label: "Tanjung Priok", divisi: DIVISI_PLACEHOLDER },
      CRB: { label: "Cirebon", divisi: DIVISI_PLACEHOLDER },
      PJG: { label: "Panjang", divisi: DIVISI_PLACEHOLDER },
      PLB: { label: "Palembang", divisi: DIVISI_PLACEHOLDER },
      JMB: { label: "Jambi", divisi: DIVISI_PLACEHOLDER },
    },
  },
  SPMT: {
    label: "Pelindo Multi Terminal",
    cabang: {
      BLW: { label: "Belawan", divisi: DIVISI_PLACEHOLDER },
      GRK: { label: "Gresik", divisi: DIVISI_PLACEHOLDER },
      LBR: { label: "Lembar Badas", divisi: DIVISI_PLACEHOLDER },
      TJI: { label: "Tanjung Intan", divisi: DIVISI_PLACEHOLDER },
      DMI: { label: "Dumai", divisi: DIVISI_PLACEHOLDER },
      SBG: { label: "Sibolga", divisi: DIVISI_PLACEHOLDER },
      JNR: { label: "Janirah", divisi: DIVISI_PLACEHOLDER },
      BGD: { label: "Bagendang", divisi: DIVISI_PLACEHOLDER },
      MLH: { label: "Malahayati", divisi: DIVISI_PLACEHOLDER },
      LHK: { label: "Lhokseumawe", divisi: DIVISI_PLACEHOLDER },
      TJE: { label: "Tanjung Emas", divisi: DIVISI_PLACEHOLDER },
      BLP: { label: "Balikpapan", divisi: DIVISI_PLACEHOLDER },
      BDS: { label: "Bima Badas", divisi: DIVISI_PLACEHOLDER },
      GRG: { label: "Garongkong", divisi: DIVISI_PLACEHOLDER },
      BMH: { label: "Bumihajo", divisi: DIVISI_PLACEHOLDER },
      MLB: { label: "Meulaboh", divisi: DIVISI_PLACEHOLDER },
      TJW: { label: "Tanjung Wangi", divisi: DIVISI_PLACEHOLDER },
      MKS: { label: "Makassar", divisi: DIVISI_PLACEHOLDER },
      BJM: { label: "Trisaki", divisi: DIVISI_PLACEHOLDER },
      PRP: { label: "Parepare", divisi: DIVISI_PLACEHOLDER },
      KLS: { label: "Kuala Langsa", divisi: DIVISI_PLACEHOLDER },
    },
  },
  IKT: {
    label: "Indonesia Kendaraan Terminal",
    cabang: {
      JKT: { label: "Jakarta", divisi: DIVISI_PLACEHOLDER },
    },
  },
};

// ================================================================
// DUMMY USERS — nanti diganti koneksi ke backend MySQL
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
    entitas: "SPMT",
    cabang: "BLW",
    divisi: "IT & Sistem",
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
    entitas: "SPMT",
    cabang: "BLW",
    divisi: "Operasional",
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
    cabang: "DMI",
    divisi: "Keuangan",
    avatar: "SR",
  },
];

// ================================================================
// KOMPONEN AUTH
// ================================================================
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [registerData, setRegisterData] = useState({
    nama: "",
    nip: "",
    username: "",
    telepon: "",
    role: "",
    entitas: "",
    cabang: "",
    divisi: "",
    email: "",
    password: "",
    konfirmasi: "",
  });

  const navigate = useNavigate();

  // ── Cascading options ─────────────────────────────────────────
  const cabangOptions = registerData.entitas
    ? Object.entries(ENTITAS_DATA[registerData.entitas].cabang).map(
        ([code, val]) => ({ code, label: val.label }),
      )
    : [];

  const divisiOptions =
    registerData.entitas && registerData.cabang
      ? ENTITAS_DATA[registerData.entitas].cabang[registerData.cabang].divisi
      : [];

  const handleEntitasChange = (e) => {
    setRegisterData({
      ...registerData,
      entitas: e.target.value,
      cabang: "",
      divisi: "",
    });
  };

  const handleCabangChange = (e) => {
    setRegisterData({
      ...registerData,
      cabang: e.target.value,
      divisi: "",
    });
  };

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

      sessionStorage.setItem("currentUser", JSON.stringify(found));

      if (found.role === "admin") {
        navigate("/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } else {
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
                      {/* Nama Lengkap */}
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

                      {/* NIP & Username */}
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

                      {/* No. Telepon */}
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

                      {/* Role */}
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

                      {/* Entitas */}
                      <div className="form-group">
                        <label>Entitas</label>
                        <div className="input-wrapper">
                          <FaBuilding className="input-icon" />
                          <select
                            value={registerData.entitas}
                            onChange={handleEntitasChange}
                            required
                          >
                            <option value="" disabled>
                              Pilih Entitas
                            </option>
                            {Object.entries(ENTITAS_DATA).map(([code, val]) => (
                              <option key={code} value={code}>
                                {val.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Cabang — disabled sampai entitas dipilih */}
                      <div className="form-group">
                        <label>Cabang / Branch</label>
                        <div className="input-wrapper">
                          <FaMapMarkerAlt className="input-icon" />
                          <select
                            value={registerData.cabang}
                            onChange={handleCabangChange}
                            required
                            disabled={!registerData.entitas}
                          >
                            <option value="" disabled>
                              {registerData.entitas
                                ? "Pilih Cabang"
                                : "Pilih Entitas dahulu"}
                            </option>
                            {cabangOptions.map(({ code, label }) => (
                              <option key={code} value={code}>
                                {label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Divisi — disabled sampai cabang dipilih */}
                      <div className="form-group">
                        <label>Divisi</label>
                        <div className="input-wrapper">
                          <FaSitemap className="input-icon" />
                          <select
                            value={registerData.divisi}
                            onChange={(e) =>
                              setRegisterData({
                                ...registerData,
                                divisi: e.target.value,
                              })
                            }
                            required
                            disabled={!registerData.cabang}
                          >
                            <option value="" disabled>
                              {registerData.cabang
                                ? "Pilih Divisi"
                                : "Pilih Cabang dahulu"}
                            </option>
                            {divisiOptions.map((div) => (
                              <option key={div} value={div}>
                                {div}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {/* Email */}
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

                  {/* Password */}
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

                  {/* Konfirmasi Password */}
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

                  {/* Ingat Saya & Lupa Password */}
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
