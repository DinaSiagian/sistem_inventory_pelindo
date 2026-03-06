// ============================================================
// Profil.jsx — full-screen layout
// ============================================================
import { useState } from "react";
import "./Profil.css";

const Ico = ({ n, s = 18, c }) => {
  const paths = {
    edit: (
      <>
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </>
    ),
    save: (
      <>
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </>
    ),
    x: (
      <>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </>
    ),
    check: <polyline points="20 6 9 17 4 12" />,
    lock: (
      <>
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </>
    ),
    eye: (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    eye_off: (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    mail: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
    phone: (
      <>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 10.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 7.91a16 16 0 0 0 6.08 6.08l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </>
    ),
    building: (
      <>
        <rect x="3" y="9" width="18" height="12" rx="2" />
        <path d="M8 9V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
        <line x1="12" y1="12" x2="12" y2="17" />
      </>
    ),
    id: (
      <>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 2H8a2 2 0 0 0-2 2v3h12V4a2 2 0 0 0-2-2z" />
        <line x1="8" y1="15" x2="16" y2="15" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </>
    ),
    key: (
      <>
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </>
    ),
    info: (
      <>
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="16" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12.01" y2="8" />
      </>
    ),
    // ── icon divisi (layers / grid)
    layers: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
    star: (
      <>
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </>
    ),
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
      {paths[n]}
    </svg>
  );
};

// Daftar pilihan divisi
const DIVISI_OPTIONS = [
  "Teknologi Informasi",
  "Keuangan & Akuntansi",
  "Sumber Daya Manusia",
  "Operasional Terminal",
  "Pemasaran & Bisnis",
  "Hukum & Kepatuhan",
  "Pengadaan & Logistik",
  "Manajemen Risiko",
  "Perencanaan & Strategi",
  "Keselamatan & Keamanan",
];

function Toast({ msg, type }) {
  if (!msg) return null;
  return (
    <div className={`p-toast p-toast--${type}`}>
      <Ico n="check" s={15} c={type === "success" ? "#6ee7b7" : "#fca5a5"} />
      {msg}
    </div>
  );
}

function PwField({ label, name, form, setForm, show, setShow, error }) {
  return (
    <div className="p-pw-field">
      <label className="p-label">{label}</label>
      <div className="p-pw-wrap">
        <input
          type={show ? "text" : "password"}
          className="p-input"
          placeholder={
            name === "old"
              ? "Masukkan password lama"
              : name === "new_"
                ? "Minimal 8 karakter"
                : "Ulangi password baru"
          }
          value={form[name]}
          onChange={(e) => setForm((p) => ({ ...p, [name]: e.target.value }))}
        />
        <button
          className="p-pw-toggle"
          type="button"
          onClick={() => setShow((v) => !v)}
        >
          <Ico n={show ? "eye_off" : "eye"} s={15} />
        </button>
      </div>
      {error && <p className="p-err">{error}</p>}
    </div>
  );
}

export default function Profil() {
  const sessionUser = JSON.parse(sessionStorage.getItem("currentUser") || "{}");

  const [activeTab, setActiveTab] = useState("info");
  const [form, setForm] = useState({
    nama: sessionUser.nama || "",
    email: sessionUser.email || "",
    telepon: sessionUser.telepon || "",
    // ── field baru divisi ──
    divisi: sessionUser.divisi || "",
  });
  const [editMode, setEditMode] = useState(false);
  const [pwForm, setPwForm] = useState({ old: "", new_: "", confirm: "" });
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCfm, setShowCfm] = useState(false);
  const [pwErrors, setPwErrors] = useState({});
  const [toast, setToast] = useState({ msg: "", type: "success" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  const handleSave = () => {
    sessionStorage.setItem(
      "currentUser",
      JSON.stringify({ ...sessionUser, ...form }),
    );
    setEditMode(false);
    showToast("Profil berhasil diperbarui!");
  };

  const handleCancel = () => {
    setForm({
      nama: sessionUser.nama || "",
      email: sessionUser.email || "",
      telepon: sessionUser.telepon || "",
      divisi: sessionUser.divisi || "",
    });
    setEditMode(false);
  };

  const handleSavePw = () => {
    const e = {};
    if (!pwForm.old) e.old = "Password lama wajib diisi";
    if (!pwForm.new_) e.new_ = "Password baru wajib diisi";
    else if (pwForm.new_.length < 8) e.new_ = "Minimal 8 karakter";
    if (pwForm.new_ !== pwForm.confirm) e.confirm = "Password tidak cocok";
    if (Object.keys(e).length) {
      setPwErrors(e);
      return;
    }
    setPwErrors({});
    setPwForm({ old: "", new_: "", confirm: "" });
    showToast("Password berhasil diubah!");
  };

  const initials = form.nama
    ? form.nama
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";
  const roleLabel = sessionUser.role === "admin" ? "Admin" : "User";

  // ── Info fields — divisi masuk di antara telepon & entitas ──
  const fields = [
    {
      icon: "user",
      label: "Nama Lengkap",
      key: "nama",
      val: form.nama,
      editable: true,
      type: "text",
    },
    {
      icon: "id",
      label: "NIP",
      key: "nip",
      val: sessionUser.nip || "—",
      editable: false,
      type: "text",
    },
    {
      icon: "user",
      label: "Username",
      key: "username",
      val: sessionUser.username || "—",
      editable: false,
      type: "text",
    },
    {
      icon: "mail",
      label: "Email",
      key: "email",
      val: form.email,
      editable: true,
      type: "text",
    },
    {
      icon: "phone",
      label: "Nomor Telepon",
      key: "telepon",
      val: form.telepon,
      editable: true,
      type: "text",
    },
    {
      icon: "layers",
      label: "Divisi",
      key: "divisi",
      val: form.divisi || "—",
      editable: true,
      type: "select",
    },
    {
      icon: "building",
      label: "Entitas",
      key: "entitas",
      val: sessionUser.entitas || "—",
      editable: false,
      type: "text",
    },
    {
      icon: "building",
      label: "Cabang",
      key: "cabang",
      val: sessionUser.cabang || "—",
      editable: false,
      type: "text",
    },
    {
      icon: "shield",
      label: "Role",
      key: "role",
      val: roleLabel,
      editable: false,
      type: "text",
    },
  ];

  return (
    <div className="profil">
      <Toast msg={toast.msg} type={toast.type} />

      <div className="p-layout">
        {/* ── Sidebar kiri ── */}
        <aside className="p-sidebar">
          {/* Card avatar */}
          <div className="p-avatar-card">
            <div className="p-avatar-bg">
              <div className="p-avatar-wave" />
            </div>
            <div className="p-avatar-body">
              <div className="p-avatar-ring">
                <div className="p-avatar">{initials}</div>
              </div>
              <h2 className="p-name">{form.nama || "—"}</h2>
              <p className="p-email">{form.email || "—"}</p>
              {/* Tampilkan divisi di bawah email kalau sudah diisi */}
              {form.divisi && <p className="p-divisi-label">{form.divisi}</p>}
              <span className="p-role-badge">{roleLabel}</span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="p-stats">
            <div className="p-stat">
              <span className="p-stat-val">8</span>
              <span className="p-stat-label">
                Total Aset
                <br />
                di Cabang
              </span>
            </div>
            <div className="p-stat-divider" />
            <div className="p-stat">
              <span className="p-stat-val" style={{ color: "#f59e0b" }}>
                1
              </span>
              <span className="p-stat-label">
                Sedang
                <br />
                Dipinjam
              </span>
            </div>
            <div className="p-stat-divider" />
            <div className="p-stat">
              <span className="p-stat-val" style={{ color: "#22c55e" }}>
                2
              </span>
              <span className="p-stat-label">
                Total
                <br />
                Dikembalikan
              </span>
            </div>
          </div>

          {/* Info singkat — tambah divisi */}
          <div className="p-sidebar-info">
            {[
              { icon: "layers", label: "Divisi", val: form.divisi || "—" },
              {
                icon: "building",
                label: "Entitas",
                val: sessionUser.entitas || "—",
              },
              {
                icon: "building",
                label: "Cabang",
                val: sessionUser.cabang || "—",
              },
              { icon: "id", label: "NIP", val: sessionUser.nip || "—" },
              { icon: "shield", label: "Role", val: roleLabel },
            ].map((r) => (
              <div key={r.label} className="p-sidebar-row">
                <div className="p-sidebar-row-icon">
                  <Ico n={r.icon} s={14} c="var(--primary-500)" />
                </div>
                <div>
                  <p className="p-sidebar-row-label">{r.label}</p>
                  <p className="p-sidebar-row-val">{r.val}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        {/* ── Konten kanan ── */}
        <main className="p-main">
          {/* Tab navigation */}
          <div className="p-tabs">
            <button
              className={`p-tab ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              <Ico n="user" s={15} />
              Informasi Akun
            </button>
            <button
              className={`p-tab ${activeTab === "password" ? "active" : ""}`}
              onClick={() => setActiveTab("password")}
            >
              <Ico n="lock" s={15} />
              Ganti Password
            </button>
          </div>

          {/* ── Tab: Info ── */}
          {activeTab === "info" && (
            <div className="p-card">
              <div className="p-card-head">
                <div>
                  <h3 className="p-card-title">Informasi Akun</h3>
                  <p className="p-card-sub">
                    Kelola data diri dan informasi organisasi Anda
                  </p>
                </div>
                {!editMode ? (
                  <button
                    className="p-btn-edit"
                    onClick={() => setEditMode(true)}
                  >
                    <Ico n="edit" s={14} /> Edit Profil
                  </button>
                ) : (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="p-btn-cancel" onClick={handleCancel}>
                      <Ico n="x" s={14} /> Batal
                    </button>
                    <button className="p-btn-save" onClick={handleSave}>
                      <Ico n="save" s={14} /> Simpan
                    </button>
                  </div>
                )}
              </div>

              <div className="p-fields-grid">
                {fields.map((f) => (
                  <div key={f.key} className="p-field">
                    <label className="p-label">
                      <Ico n={f.icon} s={12} c="var(--primary-500)" />
                      {f.label}
                    </label>

                    {editMode && f.editable ? (
                      f.type === "select" ? (
                        /* ── Dropdown untuk Divisi ── */
                        <select
                          className="p-input p-select"
                          value={form[f.key] || ""}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, [f.key]: e.target.value }))
                          }
                        >
                          <option value="">— Pilih Divisi —</option>
                          {DIVISI_OPTIONS.map((d) => (
                            <option key={d} value={d}>
                              {d}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          className="p-input"
                          value={form[f.key] || ""}
                          onChange={(e) =>
                            setForm((p) => ({ ...p, [f.key]: e.target.value }))
                          }
                        />
                      )
                    ) : (
                      <p
                        className={`p-val ${!f.editable && editMode ? "p-val--dim" : ""}`}
                      >
                        {/* Badge khusus untuk field Divisi saat view mode */}
                        {f.key === "divisi" && f.val && f.val !== "—" ? (
                          <span className="p-divisi-badge">{f.val}</span>
                        ) : (
                          f.val || "—"
                        )}
                      </p>
                    )}

                    {!f.editable && editMode && (
                      <span className="p-note">Tidak dapat diedit</span>
                    )}
                  </div>
                ))}
              </div>

              {editMode && (
                <div className="p-card-footer">
                  <p className="p-footer-hint">
                    <Ico n="info" s={13} c="var(--primary-400)" />
                    Beberapa field tidak dapat diedit karena diatur oleh sistem
                  </p>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button className="p-btn-cancel" onClick={handleCancel}>
                      <Ico n="x" s={14} /> Batal
                    </button>
                    <button className="p-btn-save" onClick={handleSave}>
                      <Ico n="save" s={14} /> Simpan Perubahan
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Tab: Password ── */}
          {activeTab === "password" && (
            <div className="p-card">
              <div className="p-card-head">
                <div>
                  <h3 className="p-card-title">Ganti Password</h3>
                  <p className="p-card-sub">
                    Perbarui keamanan akun Anda secara berkala
                  </p>
                </div>
                <div className="p-security-badge">
                  <Ico n="shield" s={14} c="#16a34a" />
                  Akun Aman
                </div>
              </div>

              <div className="p-pw-grid">
                <PwField
                  label="Password Lama"
                  name="old"
                  form={pwForm}
                  setForm={setPwForm}
                  show={showOld}
                  setShow={setShowOld}
                  error={pwErrors.old}
                />
                <PwField
                  label="Password Baru"
                  name="new_"
                  form={pwForm}
                  setForm={setPwForm}
                  show={showNew}
                  setShow={setShowNew}
                  error={pwErrors.new_}
                />
                <PwField
                  label="Konfirmasi Password Baru"
                  name="confirm"
                  form={pwForm}
                  setForm={setPwForm}
                  show={showCfm}
                  setShow={setShowCfm}
                  error={pwErrors.confirm}
                />
              </div>

              <div className="p-pw-tips">
                <p className="p-tips-title">
                  <Ico n="key" s={13} c="var(--primary-500)" /> Syarat Password
                  Kuat
                </p>
                <ul className="p-tips-list">
                  <li className={pwForm.new_.length >= 8 ? "met" : ""}>
                    <Ico
                      n="check"
                      s={11}
                      c={
                        pwForm.new_.length >= 8 ? "#16a34a" : "var(--gray-300)"
                      }
                    />
                    Minimal 8 karakter
                  </li>
                  <li className={/[A-Z]/.test(pwForm.new_) ? "met" : ""}>
                    <Ico
                      n="check"
                      s={11}
                      c={
                        /[A-Z]/.test(pwForm.new_)
                          ? "#16a34a"
                          : "var(--gray-300)"
                      }
                    />
                    Mengandung huruf kapital
                  </li>
                  <li className={/[0-9]/.test(pwForm.new_) ? "met" : ""}>
                    <Ico
                      n="check"
                      s={11}
                      c={
                        /[0-9]/.test(pwForm.new_)
                          ? "#16a34a"
                          : "var(--gray-300)"
                      }
                    />
                    Mengandung angka
                  </li>
                </ul>
              </div>

              <div className="p-card-footer">
                <p className="p-footer-hint">
                  <Ico n="shield" s={13} c="var(--primary-400)" />
                  Password berbeda dari password sebelumnya
                </p>
                <button className="p-btn-save" onClick={handleSavePw}>
                  <Ico n="lock" s={14} /> Ganti Password
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
