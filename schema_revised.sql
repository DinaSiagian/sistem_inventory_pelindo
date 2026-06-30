-- ================================================================
-- SISFOR INVENTORY PELINDO - FULL DATABASE SCHEMA (23 TABLES)
-- Generated: 2026-05-12
-- ================================================================

-- ----------------------------------------------------------------
-- BAGIAN 1: MASTER DATA (IDENTITAS & LOKASI)
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS entities (
    entity_code VARCHAR(255) PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    slug        VARCHAR(255),
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS branches (
    branch_code VARCHAR(255) PRIMARY KEY,
    entity_code VARCHAR(255) NOT NULL REFERENCES entities(entity_code) ON UPDATE CASCADE ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    slug        VARCHAR(255),
    address     TEXT,
    phone       VARCHAR(20),
    longitude   DECIMAL(11, 8),
    latitude    DECIMAL(10, 8),
    is_active   BOOLEAN DEFAULT TRUE,
    created_at  TIMESTAMP DEFAULT NOW(),
    updated_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS divisions (
    division_code VARCHAR(255) PRIMARY KEY,
    branch_code   VARCHAR(255) NOT NULL REFERENCES branches(branch_code) ON UPDATE CASCADE ON DELETE CASCADE,
    name          VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS zonas (
    zona_code   VARCHAR(255) PRIMARY KEY,
    branch_code VARCHAR(255) NOT NULL REFERENCES branches(branch_code) ON UPDATE CASCADE ON DELETE CASCADE,
    name        VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS subzona (
    subzona_code VARCHAR(255) PRIMARY KEY,
    zona_code    VARCHAR(255) NOT NULL REFERENCES zonas(zona_code) ON UPDATE CASCADE ON DELETE CASCADE,
    name         VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS device (
    device_code VARCHAR(255) PRIMARY KEY,
    name        VARCHAR(255),
    description TEXT
);

CREATE TABLE IF NOT EXISTS protocol_types (
    protocol_code VARCHAR(50) PRIMARY KEY,
    name          VARCHAR(255)
);

-- ----------------------------------------------------------------
-- BAGIAN 2: USER & SECURITY
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS roles (
    role_code VARCHAR(50) PRIMARY KEY,
    name      VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS users (
    id            BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name          VARCHAR(255) NOT NULL,
    username      VARCHAR(255) UNIQUE NOT NULL,
    email         VARCHAR(255) UNIQUE NOT NULL,
    "password"    VARCHAR(255) NOT NULL,
    phone         VARCHAR(20) UNIQUE,
    nip           VARCHAR(50),
    role_code     VARCHAR(50) NOT NULL REFERENCES roles(role_code),
    entity_code   VARCHAR(255) NOT NULL REFERENCES entities(entity_code),
    branches_code VARCHAR(255) NOT NULL,
    division_code VARCHAR(255) REFERENCES divisions(division_code) ON UPDATE CASCADE ON DELETE SET NULL,
    is_active     BOOLEAN DEFAULT TRUE,
    created_at    TIMESTAMP DEFAULT NOW(),
    updated_at    TIMESTAMP DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- BAGIAN 3: SISTEM ANGGARAN (BUDGETING)
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS budget_masters (
    kd_anggaran_master   VARCHAR(20) PRIMARY KEY,
    nm_anggaran_master   VARCHAR(255) NOT NULL,
    tipe_anggaran_master VARCHAR(50) CHECK (tipe_anggaran_master IN ('CAPEX', 'OPEX')),
    nilai_anggaran       NUMERIC(18,2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS budget_annual_opex (
    id_anggaran_tahunan    SERIAL PRIMARY KEY,
    kd_anggaran_master     VARCHAR(20) REFERENCES budget_masters(kd_anggaran_master) ON DELETE CASCADE,
    thn_anggaran           SMALLINT NOT NULL,
    nilai_anggaran_tahunan NUMERIC(15, 2) DEFAULT 0,
    realisasi_bymhd        NUMERIC(15, 2) DEFAULT 0,
    history                JSONB DEFAULT '[]'::jsonb,
    nm_anggaran            VARCHAR(255),
    nilai_anggaran         NUMERIC(15,2) DEFAULT 0,
    realisasi_tahunan      JSON,
    projects_json          JSONB DEFAULT '[]'::jsonb,
    items_json             JSONB DEFAULT '[]'::jsonb,
    UNIQUE(kd_anggaran_master, thn_anggaran)
);

CREATE TABLE IF NOT EXISTS budget_annual_capex (
    kd_anggaran_capex   VARCHAR(50) PRIMARY KEY,
    kd_anggaran_master  VARCHAR(20) REFERENCES budget_masters(kd_anggaran_master) ON DELETE CASCADE,
    nm_anggaran_capex   TEXT NOT NULL,
    thn_rkap_awal       SMALLINT NOT NULL,
    thn_rkap_akhir      SMALLINT NOT NULL,
    thn_anggaran        SMALLINT NOT NULL,
    nilai_anggaran_kad  NUMERIC(18, 2) DEFAULT 0,
    nilai_anggaran_rkap NUMERIC(18, 2) DEFAULT 0,
    history_anggaran    JSONB DEFAULT '[]'::jsonb,
    nm_master           VARCHAR(255),
    anggaran_tahunan    JSON,
    pekerjaan           JSON,
    assets_json         JSONB DEFAULT '[]'::jsonb
);

CREATE TABLE IF NOT EXISTS budget_projects (
    id_pekerjaan      SERIAL PRIMARY KEY,
    nm_pekerjaan      TEXT NOT NULL,
    jenis_anggaran    VARCHAR(10) CHECK (jenis_anggaran IN ('CAPEX', 'OPEX')),
    id_anggaran_tahunan VARCHAR(50) REFERENCES budget_annual_capex(kd_anggaran_capex) ON DELETE CASCADE,
    id_opex           INTEGER REFERENCES budget_annual_opex(id_anggaran_tahunan) ON DELETE CASCADE,
    nilai_rab         NUMERIC(18, 2) DEFAULT 0,
    nilai_kontrak     NUMERIC(18, 2) DEFAULT 0,
    no_pr             VARCHAR(50),
    no_po             VARCHAR(50),
    no_kontrak        VARCHAR(100),
    tgl_kontrak       DATE,
    durasi_kontrak    INT,
    no_sp3            VARCHAR(100),
    tgl_sp3           DATE,
    tgl_bamk          DATE,
    keterangan        TEXT,
    create_user_id    BIGINT REFERENCES users(id),
    create_date       TIMESTAMP DEFAULT NOW(),
    CONSTRAINT chk_pekerjaan_budget CHECK (
        (jenis_anggaran = 'CAPEX' AND id_anggaran_tahunan IS NOT NULL AND id_opex IS NULL)
        OR
        (jenis_anggaran = 'OPEX'  AND id_opex IS NOT NULL AND id_anggaran_tahunan IS NULL)
    )
);

-- ----------------------------------------------------------------
-- BAGIAN 4: KATALOG & ITEM ASET
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS barang (
    kd_barang    SERIAL PRIMARY KEY,
    nm_barang    VARCHAR(255) NOT NULL,
    merk         VARCHAR(100),
    model        VARCHAR(255),
    kategori     VARCHAR(100),
    satuan       VARCHAR(50) DEFAULT 'Unit',
    keterangan   TEXT,
    created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS budget_items (
    id_item           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id_pekerjaan      INTEGER NOT NULL REFERENCES budget_projects(id_pekerjaan) ON DELETE CASCADE,
    nama_barang       VARCHAR(255) NOT NULL,
    model             VARCHAR(255),
    kategori          VARCHAR(100),
    jumlah            INTEGER DEFAULT 1,
    acquisition_value NUMERIC(18, 2) DEFAULT 0,
    procurement_date  DATE,
    asset_code        VARCHAR(100),
    units_json        JSONB DEFAULT '[]'::jsonb,
    keterangan        TEXT,
    created_at        TIMESTAMP DEFAULT NOW()
);

-- ----------------------------------------------------------------
-- BAGIAN 5: INTI ASET (CORE ASSETS)
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS assets (
    asset_code       VARCHAR(255) PRIMARY KEY,
    subzona_code     VARCHAR(255) NOT NULL REFERENCES subzona(subzona_code) ON UPDATE CASCADE,
    device_code      VARCHAR(255) REFERENCES device(device_code) ON UPDATE CASCADE,
    name             VARCHAR(255),
    procurement_year SMALLINT,
    procurement_date DATE,
    id_pekerjaan     INTEGER REFERENCES budget_projects(id_pekerjaan),
    budget_type      VARCHAR(10) CHECK (budget_type IN ('CAPEX', 'OPEX')),
    description      TEXT
);

CREATE TABLE IF NOT EXISTS specification_templates (
    template_id  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    device_code  VARCHAR(255) REFERENCES device(device_code) ON UPDATE CASCADE ON DELETE CASCADE,
    spec_label   VARCHAR(255),
    default_unit VARCHAR(255),
    is_active    BOOLEAN DEFAULT TRUE,
    input_type   VARCHAR(20) CHECK (input_type IN ('text', 'number', 'dropdown')),
    created_at   TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS asset_specifications (
    spec_id     BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    asset_code  VARCHAR(255) REFERENCES assets(asset_code) ON UPDATE CASCADE ON DELETE CASCADE,
    template_id BIGINT REFERENCES specification_templates(template_id),
    asset_label VARCHAR(255),
    asset_value VARCHAR(255),
    asset_unit  VARCHAR(255),
    asset_notes TEXT,
    created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS asset_connectivities (
    asset_code    VARCHAR(255) NOT NULL REFERENCES assets(asset_code) ON UPDATE CASCADE ON DELETE CASCADE,
    protocol_code VARCHAR(50) NOT NULL REFERENCES protocol_types(protocol_code),
    ip            VARCHAR(255),
    port          INT,
    "user"        VARCHAR(255),
    pass          VARCHAR(255)
);

-- ----------------------------------------------------------------
-- BAGIAN 6: TRANSAKSI & LOGS
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS asset_transactions (
    id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    asset_code          VARCHAR(255) REFERENCES assets(asset_code) ON UPDATE CASCADE,
    transaction_type    VARCHAR(20) CHECK (transaction_type IN ('ACQUIRE', 'TRANSFER', 'MAINTENANCE', 'DISPOSE')),
    transaction_date    TIMESTAMP DEFAULT NOW(),
    transaction_duedate TIMESTAMP,
    performed_by_id     BIGINT NOT NULL REFERENCES users(id),
    asset_condition     VARCHAR(20) CHECK (asset_condition IN ('GOOD', 'MINOR_DAMAGE', 'DAMAGED')),
    is_current          BOOLEAN DEFAULT TRUE,
    notes               TEXT,
    attachment          VARCHAR(255),
    created_at          TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activity_logs (
    log_id      SERIAL PRIMARY KEY,
    user_id     BIGINT REFERENCES users(id),
    action_type VARCHAR(255) NOT NULL,
    table_name  VARCHAR(100) NOT NULL,
    record_id   VARCHAR(255) NOT NULL,
    old_value   TEXT,
    new_value   TEXT,
    ip_address  VARCHAR(255),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS login_logs (
    id          SERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id),
    login_time  TIMESTAMP,
    logout_time TIMESTAMP,
    ip_address  VARCHAR(255), 
    device_info TEXT
);

-- ----------------------------------------------------------------
-- BAGIAN 7: HISTORI & RKAP TAHUNAN
-- ----------------------------------------------------------------

CREATE TABLE IF NOT EXISTS asset_annual_histories (
    id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    asset_code        VARCHAR(255) NOT NULL REFERENCES assets(asset_code) ON UPDATE CASCADE ON DELETE CASCADE,
    tahun             SMALLINT NOT NULL,
    keterangan        TEXT,
    nilai             NUMERIC(15, 2),
    id_anggaran_capex VARCHAR(50) REFERENCES budget_annual_capex(kd_anggaran_capex),
    id_anggaran_opex  INTEGER REFERENCES budget_annual_opex(id_anggaran_tahunan),
    created_at        TIMESTAMP DEFAULT NOW(),
    CONSTRAINT chk_min_one_budget CHECK (id_anggaran_capex IS NOT NULL OR id_anggaran_opex IS NOT NULL)
);

CREATE TABLE IF NOT EXISTS budget_capex_rkap_annual (
    id_rkap_annual     SERIAL PRIMARY KEY,
    kd_anggaran_capex  VARCHAR(50) NOT NULL REFERENCES budget_annual_capex(kd_anggaran_capex) ON DELETE CASCADE,
    tahun              INTEGER NOT NULL,
    nilai_anggaran     NUMERIC(18,2) DEFAULT 0,
    keterangan         TEXT,
    created_at         TIMESTAMP DEFAULT NOW(),
    UNIQUE(kd_anggaran_capex, tahun)
);
