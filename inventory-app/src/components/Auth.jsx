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

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => setIsLogin(!isLogin);

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
    if (isLogin) navigate("/dashboard");
    else {
      alert("Registrasi berhasil! Silakan login.");
      setIsLogin(true);
    }
  };

  return (
    <div className="auth-fullscreen-container">
      <div className="auth-batik-decoration" style={{ backgroundImage: `url(${batikImg})` }}></div>
      <div className="auth-gradient-overlay"></div>

      <div className="auth-layout-wrapper">
        <div className="auth-card-section">
          <div className="auth-floating-card">

            {isForgotPassword ? (
              <div className="fp-wrapper">
                {!forgotSent ? (
                  <>
                    {/* Heading — tanpa ikon */}
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
                    <div className="fp-success-icon">
                      <FaCheckCircle />
                    </div>
                    <h2>Email Terkirim!</h2>
                    <p>Instruksi reset kata sandi telah dikirim ke</p>
                    <div className="fp-email-chip">{forgotEmail}</div>
                    <p className="fp-note">
                      Tidak menemukan emailnya? Cek folder{" "}
                      <strong>Spam</strong> atau <strong>Junk Mail</strong> Anda.
                    </p>
                    <button className="auth-button fp-submit-btn" onClick={backToLogin}>
                      Kembali ke Login
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="auth-header">
                  <h2>{isLogin ? "Selamat Datang" : "Registrasi"}</h2>
                  <p>{isLogin ? "Sistem Inventory Pelindo" : "Lengkapi data diri Anda"}</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                  {!isLogin && (
                    <>
                      <div className="form-group">
                        <label>Nama Lengkap</label>
                        <div className="input-wrapper">
                          <FaUser className="input-icon" />
                          <input type="text" placeholder="Nama Lengkap" required />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group half">
                          <label>NIP</label>
                          <div className="input-wrapper">
                            <FaIdCard className="input-icon" />
                            <input type="text" placeholder="NIP" required />
                          </div>
                        </div>
                        <div className="form-group half">
                          <label>Username</label>
                          <div className="input-wrapper">
                            <FaUser className="input-icon" />
                            <input type="text" placeholder="Username" required />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>No. Telepon</label>
                        <div className="input-wrapper">
                          <FaPhone className="input-icon" />
                          <input type="tel" placeholder="08xxxxxxxxxx" required />
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Role / Peran</label>
                        <div className="input-wrapper">
                          <FaUserTag className="input-icon" />
                          <select required defaultValue="">
                            <option value="" disabled>Pilih Role</option>
                            <option value="admin">Admin</option>
                            <option value="user">User / Pegawai</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label>Entitas</label>
                        <div className="input-wrapper">
                          <FaBuilding className="input-icon" />
                          <select required defaultValue="">
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
                          <select required defaultValue="">
                            <option value="" disabled>Pilih Cabang</option>
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
                      <input type="email" placeholder="email@pelindo.co.id" required />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <div className="input-wrapper">
                      <FaLock className="input-icon" />
                      <input type="password" placeholder="••••••••" required />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="form-group">
                      <label>Konfirmasi Password</label>
                      <div className="input-wrapper">
                        <FaLock className="input-icon" />
                        <input type="password" placeholder="Ulangi password" required />
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

                  <button type="submit" className="auth-button">
                    {isLogin ? "Masuk Sekarang" : "Daftar Sekarang"}
                  </button>
                </form>

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
          <img src={logoPelindo} alt="Pelindo Logo" className="big-logo-image" />
        </div>
      </div>
    </div>
  );
};

export default Auth;