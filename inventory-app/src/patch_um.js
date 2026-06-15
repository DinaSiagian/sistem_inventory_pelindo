const fs = require('fs');

const file = 'c:\\Users\\MSI\\Documents\\sistem_inventory_pelindo\\inventory-app\\src\\components\\UserManagement.jsx';
let content = fs.readFileSync(file, 'utf8');

// 1. State declarations
content = content.replace(
  'const [roleList, setRoleList] = useState([]);',
  `const [roleList, setRoleList] = useState([]);
  const [zonaList, setZonaList] = useState([]);
  const [subzonaList, setSubzonaList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);`
);

// 2. Cache defs
content = content.replace(
  'const cachedRoles = localStorage.getItem("um_cache_roles");',
  `const cachedRoles = localStorage.getItem("um_cache_roles");
    const cachedZonas = localStorage.getItem("um_cache_zonas");
    const cachedSubzonas = localStorage.getItem("um_cache_subzonas");
    const cachedDevices = localStorage.getItem("um_cache_devices");`
);

// 3. Cache restoration
content = content.replace(
  'if (cachedRoles) setRoleList(JSON.parse(cachedRoles));',
  `if (cachedRoles) setRoleList(JSON.parse(cachedRoles));
    if (cachedZonas) setZonaList(JSON.parse(cachedZonas));
    if (cachedSubzonas) setSubzonaList(JSON.parse(cachedSubzonas));
    if (cachedDevices) setDeviceList(JSON.parse(cachedDevices));`
);

// 4. Fetch logic
content = content.replace(
  'masterDataAPI.getRoles().then(res => {',
  `masterDataAPI.getZonas().then(res => {
          if (res.data?.success) {
            setZonaList(res.data.data);
            localStorage.setItem("um_cache_zonas", JSON.stringify(res.data.data));
          }
        });
        masterDataAPI.getSubzonas().then(res => {
          if (res.data?.success) {
            setSubzonaList(res.data.data);
            localStorage.setItem("um_cache_subzonas", JSON.stringify(res.data.data));
          }
        });
        masterDataAPI.getDevices().then(res => {
          if (res.data?.success) {
            setDeviceList(res.data.data);
            localStorage.setItem("um_cache_devices", JSON.stringify(res.data.data));
          }
        });
        masterDataAPI.getRoles().then(res => {`
);

// 5. Render
content = content.replace(
  '<DivisionSection\n            divisionList={divisionList}\n            setDivisionList={setDivisionList}\n            entityList={entityList}\n            branchList={branchList}\n          />\n        </div>',
  `<DivisionSection
            divisionList={divisionList}
            setDivisionList={setDivisionList}
            entityList={entityList}
            branchList={branchList}
          />
        </div>
        <div style={{ marginTop: ".6rem" }}>
          <ZonaSection
            zonaList={zonaList}
            setZonaList={setZonaList}
            branchList={branchList}
          />
        </div>
        <div style={{ marginTop: ".6rem" }}>
          <SubzonaSection
            subzonaList={subzonaList}
            setSubzonaList={setSubzonaList}
            zonaList={zonaList}
          />
        </div>
        <div style={{ marginTop: ".6rem" }}>
          <DeviceSection
            deviceList={deviceList}
            setDeviceList={setDeviceList}
          />
        </div>`
);

// 6. Append Components
const components = `
// ─── ZONA MANAGEMENT SECTION ─────────────────────────────
function ZonaSection({
  zonaList,
  setZonaList,
  branchList,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterBranch, setFilterBranch] = useState("semua");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const filtered = zonaList.filter((z) => {
    const q = search.toLowerCase();
    const matchQ =
      z.name.toLowerCase().includes(q) ||
      z.zona_code.toLowerCase().includes(q);
    const matchB = filterBranch === "semua" || z.branch_code === filterBranch;
    return matchQ && matchB;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / MD_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * MD_PER_PAGE,
    page * MD_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, filterBranch]);

  const getBranchName = (code) =>
    branchList.find((b) => b.branch_code === code)?.name || code;

  const handleAdd = async (form) => {
    try {
      const code = form.zona_code.trim().toUpperCase();
      const res = await masterDataAPI.addZona({
        zona_code: code,
        branch_code: form.branch_code,
        name: form.name.trim(),
      });
      if (res.data?.success) {
        setZonaList((prev) => [...prev, res.data.data]);
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menambahkan zona: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (form) => {
    try {
      const res = await masterDataAPI.updateZona(modal.item.zona_code, {
        name: form.name.trim(),
        branch_code: form.branch_code,
      });
      if (res.data?.success) {
        setZonaList((prev) =>
          prev.map((z) =>
            z.zona_code === modal.item.zona_code ? res.data.data : z,
          ),
        );
        setModal(null);
      }
    } catch (err) {
      alert("Gagal memperbarui zona: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await masterDataAPI.deleteZona(code);
      if (res.data?.success) {
        setZonaList((prev) => prev.filter((z) => z.zona_code !== code));
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menghapus zona: " + (err.response?.data?.message || err.message));
    }
  };

  const branchOptions = branchList.map((b) => ({
    value: b.branch_code,
    label: \`\${b.branch_code} — \${b.name}\`,
  }));

  return (
    <div className="md-section md-section--division">
      <div
        className="md-header md-header--division"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="md-header-left">
          <Ico n="mapPin" size={15} style={{ color: "#0ea5e9" }} />
          <span className="md-header-title--division" style={{ color: "#0284c7" }}>Manajemen Zona</span>
          <span className="md-header-count--division">
            {zonaList.length} zona
          </span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#0284c7" }}
        />
      </div>
      {open && (
        <div className="md-body">
          <div
            className={\`md-toolbar md-toolbar--division\`}
            style={{ flexWrap: "wrap", gap: ".4rem" }}
          >
            <div className="md-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari kode atau nama zona…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="md-filter-wrap">
              <Ico n="mapPin" size={11} style={{ color: "#94a3b8" }} />
              <select
                value={filterBranch}
                onChange={(e) => setFilterBranch(e.target.value)}
              >
                <option value="semua">Semua Cabang</option>
                {branchList.map((b) => (
                  <option key={b.branch_code} value={b.branch_code}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>
            <span style={{ fontSize: ".72rem", color: "#64748b" }}>
              {filtered.length} ditemukan
            </span>
            <button
              className="md-add-btn md-add-btn--division"
              style={{ background: "#0ea5e9", color: "#fff" }}
              onClick={() => setModal({ type: "add" })}
            >
              <Ico n="plus" size={12} /> Tambah Zona
            </button>
          </div>
          <div className="md-table-wrap">
            <table className="md-table md-table--division">
              <thead>
                <tr>
                  <th>Kode Zona</th>
                  <th>Nama Zona</th>
                  <th>Cabang</th>
                  <th style={{ width: 70, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="md-empty">
                      Tidak ada zona ditemukan
                    </td>
                  </tr>
                ) : (
                  paginated.map((z) => (
                    <tr key={z.zona_code}>
                      <td data-label="Kode Zona">
                        <span className="md-code-badge md-code-badge--division" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                          {z.zona_code}
                        </span>
                      </td>
                      <td data-label="Nama Zona">
                        <span className="md-name-text">{z.name}</span>
                      </td>
                      <td data-label="Cabang">
                        <span
                          style={{ fontSize: ".75rem", color: "#334155" }}
                        >
                          {z.branch_code} — {getBranchName(z.branch_code)}
                        </span>
                      </td>
                      <td data-label="Aksi">
                        <div
                          className="md-action-row"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            className="md-icon-btn md-icon-btn--edit"
                            title="Edit"
                            onClick={() => setModal({ type: "edit", item: z })}
                          >
                            <Ico n="edit" size={11} />
                          </button>
                          <button
                            className="md-icon-btn md-icon-btn--del"
                            title="Hapus"
                            onClick={() =>
                              setModal({ type: "delete", item: z })
                            }
                          >
                            <Ico n="trash" size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              page={page}
              totalPages={totalPages}
              total={filtered.length}
              perPage={MD_PER_PAGE}
              onPageChange={setPage}
              accentColor="#0ea5e9"
              accentBg="#e0f2fe"
              className="md-pagination"
            />
          </div>
        </div>
      )}

      {modal?.type === "add" && (
        <MdModal
          title="Tambah Zona Baru"
          iconName="mapPin"
          iconColor="#0ea5e9"
          fields={[
            {
              key: "branch_code",
              label: "Cabang",
              icon: "mapPin",
              type: "select",
              options: branchOptions,
              placeholder: "-- Pilih Cabang --",
              required: true,
            },
            {
              key: "zona_code",
              label: "Kode Zona",
              icon: "idCard",
              placeholder: "Contoh: BLW-GDG",
              required: true,
              hint: "Gunakan format KODECABANG-KODEZONA (akan diubah ke UPPERCASE)",
            },
            {
              key: "name",
              label: "Nama Zona",
              icon: "map",
              placeholder: "Contoh: Gedung A",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleAdd}
        />
      )}
      {modal?.type === "edit" && (
        <MdModal
          title={\`Edit Zona — \${modal.item.zona_code}\`}
          iconName="mapPin"
          iconColor="#0ea5e9"
          fields={[
            {
              key: "branch_code",
              label: "Cabang",
              icon: "mapPin",
              type: "select",
              options: branchOptions,
              defaultValue: modal.item.branch_code,
              required: true,
            },
            {
              key: "zona_code",
              label: "Kode Zona",
              icon: "idCard",
              defaultValue: modal.item.zona_code,
              required: false,
              disabled: true,
              hint: "Kode zona tidak dapat diubah",
            },
            {
              key: "name",
              label: "Nama Zona",
              icon: "map",
              defaultValue: modal.item.name,
              placeholder: "Nama zona",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <MdDeleteModal
          itemName={\`\${modal.item.zona_code} — \${modal.item.name}\`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.item.zona_code)}
        />
      )}
    </div>
  );
}

// ─── SUBZONA MANAGEMENT SECTION ─────────────────────────────
function SubzonaSection({
  subzonaList,
  setSubzonaList,
  zonaList,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [filterZona, setFilterZona] = useState("semua");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const filtered = subzonaList.filter((s) => {
    const q = search.toLowerCase();
    const matchQ =
      s.name.toLowerCase().includes(q) ||
      s.subzona_code.toLowerCase().includes(q);
    const matchZ = filterZona === "semua" || s.zona_code === filterZona;
    return matchQ && matchZ;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / MD_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * MD_PER_PAGE,
    page * MD_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search, filterZona]);

  const getZonaName = (code) =>
    zonaList.find((z) => z.zona_code === code)?.name || code;

  const handleAdd = async (form) => {
    try {
      const code = form.subzona_code.trim().toUpperCase();
      const res = await masterDataAPI.addSubzona({
        subzona_code: code,
        zona_code: form.zona_code,
        name: form.name.trim(),
      });
      if (res.data?.success) {
        setSubzonaList((prev) => [...prev, res.data.data]);
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menambahkan subzona: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (form) => {
    try {
      const res = await masterDataAPI.updateSubzona(modal.item.subzona_code, {
        name: form.name.trim(),
        zona_code: form.zona_code,
      });
      if (res.data?.success) {
        setSubzonaList((prev) =>
          prev.map((s) =>
            s.subzona_code === modal.item.subzona_code ? res.data.data : s,
          ),
        );
        setModal(null);
      }
    } catch (err) {
      alert("Gagal memperbarui subzona: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await masterDataAPI.deleteSubzona(code);
      if (res.data?.success) {
        setSubzonaList((prev) => prev.filter((s) => s.subzona_code !== code));
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menghapus subzona: " + (err.response?.data?.message || err.message));
    }
  };

  const zonaOptions = zonaList.map((z) => ({
    value: z.zona_code,
    label: \`\${z.zona_code} — \${z.name}\`,
  }));

  return (
    <div className="md-section md-section--division">
      <div
        className="md-header md-header--division"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="md-header-left">
          <Ico n="grid" size={15} style={{ color: "#d946ef" }} />
          <span className="md-header-title--division" style={{ color: "#c026d3" }}>Manajemen Subzona</span>
          <span className="md-header-count--division">
            {subzonaList.length} subzona
          </span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#c026d3" }}
        />
      </div>
      {open && (
        <div className="md-body">
          <div
            className={\`md-toolbar md-toolbar--division\`}
            style={{ flexWrap: "wrap", gap: ".4rem" }}
          >
            <div className="md-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari kode atau nama subzona…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </div>
            <div className="md-filter-wrap">
              <Ico n="map" size={11} style={{ color: "#94a3b8" }} />
              <select
                value={filterZona}
                onChange={(e) => setFilterZona(e.target.value)}
              >
                <option value="semua">Semua Zona</option>
                {zonaList.map((z) => (
                  <option key={z.zona_code} value={z.zona_code}>
                    {z.name}
                  </option>
                ))}
              </select>
            </div>
            <span style={{ fontSize: ".72rem", color: "#64748b" }}>
              {filtered.length} ditemukan
            </span>
            <button
              className="md-add-btn md-add-btn--division"
              style={{ background: "#d946ef", color: "#fff" }}
              onClick={() => setModal({ type: "add" })}
            >
              <Ico n="plus" size={12} /> Tambah Subzona
            </button>
          </div>
          <div className="md-table-wrap">
            <table className="md-table md-table--division">
              <thead>
                <tr>
                  <th>Kode Subzona</th>
                  <th>Nama Subzona</th>
                  <th>Zona</th>
                  <th style={{ width: 70, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="md-empty">
                      Tidak ada subzona ditemukan
                    </td>
                  </tr>
                ) : (
                  paginated.map((s) => (
                    <tr key={s.subzona_code}>
                      <td data-label="Kode Subzona">
                        <span className="md-code-badge md-code-badge--division" style={{ background: "#fae8ff", color: "#a21caf" }}>
                          {s.subzona_code}
                        </span>
                      </td>
                      <td data-label="Nama Subzona">
                        <span className="md-name-text">{s.name}</span>
                      </td>
                      <td data-label="Zona">
                        <span
                          style={{ fontSize: ".75rem", color: "#334155" }}
                        >
                          {s.zona_code} — {getZonaName(s.zona_code)}
                        </span>
                      </td>
                      <td data-label="Aksi">
                        <div
                          className="md-action-row"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            className="md-icon-btn md-icon-btn--edit"
                            title="Edit"
                            onClick={() => setModal({ type: "edit", item: s })}
                          >
                            <Ico n="edit" size={11} />
                          </button>
                          <button
                            className="md-icon-btn md-icon-btn--del"
                            title="Hapus"
                            onClick={() =>
                              setModal({ type: "delete", item: s })
                            }
                          >
                            <Ico n="trash" size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              page={page}
              totalPages={totalPages}
              total={filtered.length}
              perPage={MD_PER_PAGE}
              onPageChange={setPage}
              accentColor="#d946ef"
              accentBg="#fae8ff"
              className="md-pagination"
            />
          </div>
        </div>
      )}

      {modal?.type === "add" && (
        <MdModal
          title="Tambah Subzona Baru"
          iconName="grid"
          iconColor="#d946ef"
          fields={[
            {
              key: "zona_code",
              label: "Zona",
              icon: "map",
              type: "select",
              options: zonaOptions,
              placeholder: "-- Pilih Zona --",
              required: true,
            },
            {
              key: "subzona_code",
              label: "Kode Subzona",
              icon: "idCard",
              placeholder: "Contoh: BLW-GDG-LT1",
              required: true,
              hint: "Gunakan format KODEZONA-KODESUB (akan diubah ke UPPERCASE)",
            },
            {
              key: "name",
              label: "Nama Subzona",
              icon: "grid",
              placeholder: "Contoh: Lantai 1",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleAdd}
        />
      )}
      {modal?.type === "edit" && (
        <MdModal
          title={\`Edit Subzona — \${modal.item.subzona_code}\`}
          iconName="grid"
          iconColor="#d946ef"
          fields={[
            {
              key: "zona_code",
              label: "Zona",
              icon: "map",
              type: "select",
              options: zonaOptions,
              defaultValue: modal.item.zona_code,
              required: true,
            },
            {
              key: "subzona_code",
              label: "Kode Subzona",
              icon: "idCard",
              defaultValue: modal.item.subzona_code,
              required: false,
              disabled: true,
              hint: "Kode subzona tidak dapat diubah",
            },
            {
              key: "name",
              label: "Nama Subzona",
              icon: "grid",
              defaultValue: modal.item.name,
              placeholder: "Nama subzona",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <MdDeleteModal
          itemName={\`\${modal.item.subzona_code} — \${modal.item.name}\`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.item.subzona_code)}
        />
      )}
    </div>
  );
}

// ─── DEVICE MANAGEMENT SECTION ─────────────────────────────
function DeviceSection({
  deviceList,
  setDeviceList,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(null);

  const filtered = deviceList.filter((d) => {
    const q = search.toLowerCase();
    return d.name.toLowerCase().includes(q) ||
           d.device_code.toLowerCase().includes(q);
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / MD_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * MD_PER_PAGE,
    page * MD_PER_PAGE,
  );

  React.useEffect(() => {
    setPage(1);
  }, [search]);

  const handleAdd = async (form) => {
    try {
      const code = form.device_code.trim().toUpperCase();
      const res = await masterDataAPI.addDevice({
        device_code: code,
        name: form.name.trim().toUpperCase(),
      });
      if (res.data?.success) {
        setDeviceList((prev) => [...prev, res.data.data]);
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menambahkan kategori perangkat: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (form) => {
    try {
      const res = await masterDataAPI.updateDevice(modal.item.device_code, {
        name: form.name.trim().toUpperCase(),
      });
      if (res.data?.success) {
        setDeviceList((prev) =>
          prev.map((d) =>
            d.device_code === modal.item.device_code ? res.data.data : d,
          ),
        );
        setModal(null);
      }
    } catch (err) {
      alert("Gagal memperbarui kategori perangkat: " + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (code) => {
    try {
      const res = await masterDataAPI.deleteDevice(code);
      if (res.data?.success) {
        setDeviceList((prev) => prev.filter((d) => d.device_code !== code));
        setModal(null);
      }
    } catch (err) {
      alert("Gagal menghapus kategori perangkat: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="md-section md-section--division">
      <div
        className="md-header md-header--division"
        onClick={() => setOpen((o) => !o)}
      >
        <div className="md-header-left">
          <Ico n="monitor" size={15} style={{ color: "#f59e0b" }} />
          <span className="md-header-title--division" style={{ color: "#d97706" }}>Manajemen Kategori (Device)</span>
          <span className="md-header-count--division">
            {deviceList.length} kategori
          </span>
        </div>
        <Ico
          n={open ? "chevronUp" : "chevronDown"}
          size={14}
          style={{ color: "#d97706" }}
        />
      </div>
      {open && (
        <div className="md-body">
          <div
            className={\`md-toolbar md-toolbar--division\`}
            style={{ flexWrap: "wrap", gap: ".4rem" }}
          >
            <div className="md-search-wrap">
              <Ico n="search" size={12} style={{ color: "#94a3b8" }} />
              <input
                placeholder="Cari kode atau nama kategori…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                autoComplete="off"
              />
            </div>
            <span style={{ fontSize: ".72rem", color: "#64748b" }}>
              {filtered.length} ditemukan
            </span>
            <button
              className="md-add-btn md-add-btn--division"
              style={{ background: "#f59e0b", color: "#fff" }}
              onClick={() => setModal({ type: "add" })}
            >
              <Ico n="plus" size={12} /> Tambah Kategori
            </button>
          </div>
          <div className="md-table-wrap">
            <table className="md-table md-table--division">
              <thead>
                <tr>
                  <th>Kode Kategori</th>
                  <th>Nama Kategori</th>
                  <th style={{ width: 70, textAlign: "center" }}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="md-empty">
                      Tidak ada kategori ditemukan
                    </td>
                  </tr>
                ) : (
                  paginated.map((d) => (
                    <tr key={d.device_code}>
                      <td data-label="Kode Kategori">
                        <span className="md-code-badge md-code-badge--division" style={{ background: "#fef3c7", color: "#b45309" }}>
                          {d.device_code}
                        </span>
                      </td>
                      <td data-label="Nama Kategori">
                        <span className="md-name-text">{d.name}</span>
                      </td>
                      <td data-label="Aksi">
                        <div
                          className="md-action-row"
                          style={{ justifyContent: "center" }}
                        >
                          <button
                            className="md-icon-btn md-icon-btn--edit"
                            title="Edit"
                            onClick={() => setModal({ type: "edit", item: d })}
                          >
                            <Ico n="edit" size={11} />
                          </button>
                          <button
                            className="md-icon-btn md-icon-btn--del"
                            title="Hapus"
                            onClick={() =>
                              setModal({ type: "delete", item: d })
                            }
                          >
                            <Ico n="trash" size={11} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              page={page}
              totalPages={totalPages}
              total={filtered.length}
              perPage={MD_PER_PAGE}
              onPageChange={setPage}
              accentColor="#f59e0b"
              accentBg="#fef3c7"
              className="md-pagination"
            />
          </div>
        </div>
      )}

      {modal?.type === "add" && (
        <MdModal
          title="Tambah Kategori Baru"
          iconName="monitor"
          iconColor="#f59e0b"
          fields={[
            {
              key: "device_code",
              label: "Kode Kategori",
              icon: "idCard",
              placeholder: "Contoh: LPT",
              required: true,
              hint: "Singkatan jenis perangkat (akan diubah ke UPPERCASE)",
            },
            {
              key: "name",
              label: "Nama Kategori",
              icon: "monitor",
              placeholder: "Contoh: LAPTOP",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleAdd}
        />
      )}
      {modal?.type === "edit" && (
        <MdModal
          title={\`Edit Kategori — \${modal.item.device_code}\`}
          iconName="monitor"
          iconColor="#f59e0b"
          fields={[
            {
              key: "device_code",
              label: "Kode Kategori",
              icon: "idCard",
              defaultValue: modal.item.device_code,
              required: false,
              disabled: true,
              hint: "Kode kategori tidak dapat diubah",
            },
            {
              key: "name",
              label: "Nama Kategori",
              icon: "monitor",
              defaultValue: modal.item.name,
              placeholder: "Nama kategori",
              required: true,
            },
          ]}
          onClose={() => setModal(null)}
          onSave={handleEdit}
        />
      )}
      {modal?.type === "delete" && (
        <MdDeleteModal
          itemName={\`\${modal.item.device_code} — \${modal.item.name}\`}
          onClose={() => setModal(null)}
          onConfirm={() => handleDelete(modal.item.device_code)}
        />
      )}
    </div>
  );
}

// --- MAIN COMPONENT ---`;

content = content.replace('// --- MAIN COMPONENT ---', components);

fs.writeFileSync(file, content, 'utf8');
console.log('UserManagement.jsx patched successfully!');
