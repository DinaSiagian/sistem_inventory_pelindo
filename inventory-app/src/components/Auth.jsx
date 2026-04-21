import React, { useState, useEffect } from "react";
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
  FaSpinner,
} from "react-icons/fa";
import "./Auth.css";

// === IMPORT ASET ===
import logoPelindo from "../pictures/pelindo2.png";
import batikImg from "../pictures/batik.png";

// === IMPORT API SERVICE ===
import { authAPI } from "../services/api";

// ================================================================
// DATA CASCADING FALLBACK
// ================================================================
const DIVISI_FALLBACK = [
  { division_code: "OPS", name: "Operasional" },
  { division_code: "FIN", name: "Keuangan" },
  { division_code: "HRD", name: "SDM & Umum" },
  { division_code: "IT-SYS", name: "IT & Sistem" },
  { division_code: "HSE", name: "HSE" },
  { division_code: "COM", name: "Komersial" },
];

const ENTITAS_FALLBACK = {
  PTP: {
    label: "PT Pelabuhan Indonesia",
    cabang: {
      BTN: { label: "Banten", divisi: DIVISI_FALLBACK },
      TPN: { label: "Tanjung Pandan", divisi: DIVISI_FALLBACK },
      TJP: { label: "Tanjung Priok", divisi: DIVISI_FALLBACK },
    },
  },
  SPMT: {
    label: "Pelindo Multi Terminal",
    cabang: {
      BLW: { label: "Belawan", divisi: DIVISI_FALLBACK },
      DMI: { label: "Dumai", divisi: DIVISI_FALLBACK },
      GRK: { label: "Gresik", divisi: DIVISI_FALLBACK },
    },
  },
  IKT: {
    label: "Indonesia Kendaraan Terminal",
    cabang: { JKT: { label: "Jakarta", divisi: DIVISI_FALLBACK } },
  },
};

// ================================================================
// KOMPONEN AUTH
// ================================================================
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [masterData, setMasterData] = useState({
    entities: ENTITAS_FALLBACK,
    roles: [
      { role_code: "admin", name: "Administrator" },
      { role_code: "user", name: "User / Pegawai" },
    ],
  });

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

  // Load Master Data
  useEffect(() => {
    if (!isLogin) loadMasterData();
  }, [isLogin]);

  const loadMasterData = async () => {
    try {
      const res = await authAPI.getMasterData();
      if (res.data?.success) {
        const transformedEntities = {};
        res.data.data.entities?.forEach((ent) => {
          const cabangObj = {};
          ent.branches?.forEach((cab) => {
            cabangObj[cab.branch_code] = {
              label: cab.name,
              divisi:
                cab.divisions?.map((d) => ({
                  division_code: d.division_code,
                  name: d.name,
                })) || DIVISI_FALLBACK,
            };
          });
          transformedEntities[ent.entity_code] = {
            label: ent.name,
            cabang: cabangObj,
          };
        });
        setMasterData({
          entities:
            Object.keys(transformedEntities).length > 0
              ? transformedEntities
              : ENTITAS_FALLBACK,
          roles: res.data.data.roles?.map((r) => ({
            role_code: r.role_code,
            name: r.name,
          })) || [
            { role_code: "admin", name: "Administrator" },
            { role_code: "user", name: "User / Pegawai" },
          ],
        });
      }
    } catch (err) {
      console.warn("⚠️ Gagal load master data, menggunakan fallback:", err);
    }
  };

  // Cascading options
  const cabangOptions = registerData.entitas
    ? Object.entries(
        masterData.entities[registerData.entitas]?.cabang || {},
      ).map(([code, val]) => ({ code, label: val.label }))
    : [];

  const divisiOptions =
    registerData.entitas && registerData.cabang
      ? masterData.entities[registerData.entitas]?.cabang[registerData.cabang]
          ?.divisi || []
      : [];

  const handleEntitasChange = (e) =>
    setRegisterData({
      ...registerData,
      entitas: e.target.value,
      cabang: "",
      divisi: "",
    });
  const handleCabangChange = (e) =>
    setRegisterData({ ...registerData, cabang: e.target.value, divisi: "" });
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setIsForgotPassword(false);
    setLoginError("");
    setForgotSent(false);
  };

  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      setForgotSent(true);
    } catch {
      setLoginError("Gagal mengirim instruksi reset. Coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  const backToLogin = () => {
    setIsForgotPassword(false);
    setForgotEmail("");
    setForgotSent(false);
    setLoginError("");
  };

  // Extract error message helper
  const extractErrorMessage = (err) => {
    console.error("🔥 AUTH ERROR DEBUG:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });

    if (err.response) {
      const { status, data } = err.response;
      if (data?.errors && typeof data.errors === "object") {
        const firstField = Object.keys(data.errors)[0];
        const firstMsg = data.errors[firstField];
        return Array.isArray(firstMsg) ? firstMsg[0] : firstMsg;
      }
      if (data?.message) return data.message;
      if (typeof data === "string") return data;
      return `Error ${status}: ${data?.message || "Request gagal"}`;
    }
    if (err.request)
      return "Tidak dapat terhubung ke server. Pastikan backend berjalan.";
    return `Error: ${err.message || "Terjadi kesalahan"}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        // ── LOGIN ──
        const emailInput = e.target.email.value.trim();
        const passwordInput = e.target.password.value;

        const res = await authAPI.login({
          email: emailInput,
          password: passwordInput,
        });

        if (res.data?.success) {
          const { user, access_token } = res.data.data;
          localStorage.setItem("token", access_token);
          localStorage.setItem("user", JSON.stringify(user));

          // ✅ Redirect langsung ke dashboard berdasarkan role
          if (user.role_code === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        }
      } else {
        // ── REGISTER ──
        if (registerData.password !== registerData.konfirmasi) {
          setLoginError("Password dan konfirmasi password tidak cocok.");
          setIsLoading(false);
          return;
        }

        const res = await authAPI.register({
          name: registerData.nama,
          username: registerData.username,
          email: e.target.email.value,
          password: registerData.password,
          password_confirmation: registerData.konfirmasi,
          phone: registerData.telepon || null,
          nip: registerData.nip || null,
          role_code: registerData.role,
          entity_code: registerData.entitas,
          branches_code: registerData.cabang,
          division_code: registerData.divisi || null,
        });

        if (res.data?.success) {
          // ✅ TIDAK ADA ALERT - Langsung login & redirect
          const { user, access_token } = res.data.data;
          localStorage.setItem("token", access_token);
          localStorage.setItem("user", JSON.stringify(user));

          // ✅ Redirect langsung ke dashboard berdasarkan role
          if (user.role_code === "admin") {
            navigate("/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        }
      }
    } catch (err) {
      const errorMsg = extractErrorMessage(err);
      setLoginError(errorMsg);
    } finally {
      setIsLoading(false);
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
                            disabled={isLoading}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="auth-button fp-submit-btn"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <FaSpinner className="spin-icon" /> Memproses...
                          </>
                        ) : (
                          "Kirim Instruksi Reset"
                        )}
                      </button>
                    </form>
                    <button
                      className="fp-back-link"
                      onClick={backToLogin}
                      disabled={isLoading}
                    >
                      <FaArrowLeft size={11} /> Kembali ke halaman login
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
                      Cek folder <strong>Spam</strong> atau{" "}
                      <strong>Junk Mail</strong> Anda.
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
                            disabled={isLoading}
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
                              disabled={isLoading}
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
                              disabled={isLoading}
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
                            disabled={isLoading}
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
                            disabled={isLoading}
                          >
                            <option value="" disabled>
                              Pilih Role
                            </option>
                            {masterData.roles.map((role) => (
                              <option
                                key={role.role_code}
                                value={role.role_code}
                              >
                                {role.name}
                              </option>
                            ))}
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
                            disabled={isLoading}
                          >
                            <option value="" disabled>
                              Pilih Entitas
                            </option>
                            {Object.entries(masterData.entities).map(
                              ([code, val]) => (
                                <option key={code} value={code}>
                                  {val.label}
                                </option>
                              ),
                            )}
                          </select>
                        </div>
                      </div>

                      {/* Cabang */}
                      <div className="form-group">
                        <label>Cabang / Branch</label>
                        <div className="input-wrapper">
                          <FaMapMarkerAlt className="input-icon" />
                          <select
                            value={registerData.cabang}
                            onChange={handleCabangChange}
                            required
                            disabled={!registerData.entitas || isLoading}
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

                      {/* Divisi */}
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
                            disabled={!registerData.cabang || isLoading}
                          >
                            <option value="" disabled>
                              {registerData.cabang
                                ? "Pilih Divisi"
                                : "Pilih Cabang dahulu"}
                            </option>
                            {divisiOptions.map((div) => (
                              <option
                                key={div.division_code}
                                value={div.division_code}
                              >
                                {div.name}
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
                        disabled={isLoading}
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
                        disabled={isLoading}
                        value={registerData.password}
                        onChange={(e) =>
                          setRegisterData({
                            ...registerData,
                            password: e.target.value,
                          })
                        }
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
                          disabled={isLoading}
                        />
                      </div>
                    </div>
                  )}

                  {/* Ingat Saya & Lupa Password */}
                  {isLogin && (
                    <div className="form-actions">
                      <label className="remember-me">
                        <input type="checkbox" disabled={isLoading} />
                        <span>Ingat Saya</span>
                      </label>
                      <span
                        className="forgot-password"
                        onClick={() => !isLoading && setIsForgotPassword(true)}
                        style={{
                          cursor: isLoading ? "not-allowed" : "pointer",
                          opacity: isLoading ? 0.6 : 1,
                        }}
                      >
                        Lupa Password?
                      </span>
                    </div>
                  )}

                  {/* Error message */}
                  {loginError && (
                    <div className="error-alert">{loginError}</div>
                  )}

                  <button
                    type="submit"
                    className="auth-button"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <FaSpinner className="spin-icon" />{" "}
                        {isLogin ? "Memproses Login..." : "Mendaftar..."}
                      </>
                    ) : isLogin ? (
                      "Masuk Sekarang"
                    ) : (
                      "Daftar Sekarang"
                    )}
                  </button>
                </form>

                {/* Demo Credentials */}
                {isLogin && (
                  <div className="demo-credentials">
                    <strong>🔐 Demo Akun:</strong>
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
