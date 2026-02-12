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
} from "react-icons/fa";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (isLogin) {
      navigate("/dashboard");
    } else {
      alert("Registrasi berhasil! Silakan login.");
      setIsLogin(true);
    }
  };

  return (
    // Container Utama Full Screen dengan Background Image
    <div className="auth-fullscreen-container">
      {/* Lapisan Gradasi (Overlay) */}
      <div className="auth-gradient-overlay"></div>

      {/* Wrapper Konten agar berada di tengah dan di atas overlay */}
      <div className="auth-content-center">
        {/* Kartu Formulir Mengambang */}
        <div className="auth-floating-card">
          <div className="auth-header">
            <h2>{isLogin ? "Selamat Datang" : "Registrasi Akun"}</h2>
            <p>
              {isLogin
                ? "Sistem Inventory Pelindo"
                : "Lengkapi data diri Anda dengan benar"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {/* === FORM KHUSUS REGISTRASI === */}
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
                    <select required defaultValue="">
                      <option value="" disabled>
                        Pilih Entitas
                      </option>
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
                      <option value="" disabled>
                        Pilih Cabang
                      </option>
                      <option value="belawan">Belawan</option>
                      <option value="dumai">Dumai</option>
                      <option value="tanjung_intan">Tanjung Intan</option>
                      <option value="bumiharjo">Bumiharjo</option>
                      <option value="trisakti">Trisakti</option>
                      <option value="pusat">Kantor Pusat</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* === FORM UMUM (Login & Register) === */}
            <div className="form-group">
              <label>Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
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
                <input type="password" placeholder="••••••••" required />
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
                <a href="#" className="forgot-password">
                  Lupa Password?
                </a>
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
        </div>
      </div>
    </div>
  );
};

export default Auth;
