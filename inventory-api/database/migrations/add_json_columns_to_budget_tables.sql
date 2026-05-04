-- ================================================================
-- Migration: Add JSON columns for projects & assets in budget tables
-- Run once on PostgreSQL database
-- ================================================================

-- 1. Tambah kolom `projects_json` ke budget_annual_opex
--    (untuk menyimpan daftar pekerjaan OPEX sebagai JSON)
ALTER TABLE budget_annual_opex
    ADD COLUMN IF NOT EXISTS projects_json  JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS nm_anggaran    VARCHAR(255),
    ADD COLUMN IF NOT EXISTS nilai_anggaran DECIMAL(15, 2);

-- 2. Tambah kolom `assets_json` ke budget_annual_capex
--    (untuk menyimpan daftar barang/aset CAPEX sebagai JSON)
ALTER TABLE budget_annual_capex
    ADD COLUMN IF NOT EXISTS assets_json    JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS nm_master      VARCHAR(255),
    ADD COLUMN IF NOT EXISTS anggaran_tahunan JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS history_anggaran JSONB DEFAULT '[]'::jsonb,
    ADD COLUMN IF NOT EXISTS pekerjaan      JSONB DEFAULT '[]'::jsonb;

-- Verifikasi
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name IN ('budget_annual_opex', 'budget_annual_capex')
ORDER BY table_name, ordinal_position;
