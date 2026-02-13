import React, { useState } from "react";
import Layout from "../Layout"; // Pastikan path ini sesuai dengan struktur folder Anda

const BudgetManagement = () => {
  const [activeTab, setActiveTab] = useState("opex"); // 'opex' | 'capex' | 'simulation'

  // ==========================================
  // 1. DATA DUMMY (Sesuai Excel & Database)
  // ==========================================

  // Dari: anggaran_master.csv
  const dummyMasters = [
    { kd: "5030905000", nm: "Beban Pemeliharaan Software", tipe: "Opex" },
    { kd: "5021300000", nm: "Beban Jaringan dan Koneksi Data", tipe: "Opex" },
    { kd: "5900100000", nm: "Beban Investasi", tipe: "Capex" },
  ];

  // Dari: anggaran_tahunan_opex.csv
  const dummyOpexAnnual = [
    { id: 1, kd_master: "5030905000", tahun: 2026, nilai: 500000000 },
    { id: 2, kd_master: "5021300000", tahun: 2026, nilai: 600000000 },
  ];

  // Dari: anggaran_tahunan_capex.csv
  const dummyCapexAnnual = [
    {
      kd_capex: "2440015",
      kd_master: "5900100000",
      nm: "Implementasi dan Standarisasi IT Infrastruktur",
      tahun: 2024,
    },
    {
      kd_capex: "2440014",
      kd_master: "5900100000",
      nm: "Penyediaan Network di Branch SPMT",
      tahun: 2024,
    },
  ];

  // Dari: list_pekerjaan.csv (Turunan Capex)
  const dummyProjects = [
    {
      id_pekerjaan: 101,
      kd_capex_ref: "2440015", // Link ke Annual Capex
      nm_pekerjaan:
        "Pekerjaan Implementasi dan Standarisasi IT Infrastruktur (CCTV dll)",
      no_kontrak: "SI.01/12/8/2/PPTI/TEKI/PLMT-24",
      nilai: 6440000026,
      vendor: "PT. Telkom Indonesia", // Contoh tambahan
    },
    {
      id_pekerjaan: 102,
      kd_capex_ref: "2440015",
      nm_pekerjaan: "Pekerjaan Implementasi Gate System Branch Malahayati",
      no_kontrak: "SI.01/12/8/3/PPTI/TEKI/PLMT-24",
      nilai: 3200000000,
      vendor: "PT. Vendor Lain",
    },
  ];

  // ==========================================
  // 2. HELPER FUNCTIONS
  // ==========================================
  const formatRupiah = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };

  // Gabungkan data Opex untuk tampilan tabel
  const opexView = dummyOpexAnnual.map((opex) => {
    const master = dummyMasters.find((m) => m.kd === opex.kd_master);
    return { ...opex, nm_master: master?.nm };
  });

  // Gabungkan data Capex (Nested: Master -> Annual -> Project)
  const capexView = dummyCapexAnnual.map((capex) => {
    const projects = dummyProjects.filter(
      (p) => p.kd_capex_ref === capex.kd_capex,
    );
    return { ...capex, projects };
  });

  // ==========================================
  // 3. STATE UNTUK SIMULASI INPUT ASET
  // ==========================================
  const [assetForm, setAssetForm] = useState({
    name: "",
    budgetType: "CAPEX", // Default
    selectedBudgetId: "",
  });

  return (
    <Layout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Manajemen Anggaran & Aset (Simulasi)
        </h1>

        {/* --- NAVIGASI TAB --- */}
        <div className="flex gap-4 mb-6 border-b border-gray-300 pb-2">
          <button
            onClick={() => setActiveTab("opex")}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${activeTab === "opex" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
          >
            Anggaran OPEX
          </button>
          <button
            onClick={() => setActiveTab("capex")}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${activeTab === "capex" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600 hover:bg-gray-300"}`}
          >
            Anggaran CAPEX & Proyek
          </button>
          <button
            onClick={() => setActiveTab("simulation")}
            className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${activeTab === "simulation" ? "bg-green-600 text-white" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
          >
            Simulasi Input Aset (Disini Dikelola)
          </button>
        </div>

        {/* --- KONTEN: TAB OPEX --- */}
        {activeTab === "opex" && (
          <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Daftar Anggaran Operasional (OPEX)
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left border">
                <thead className="bg-gray-100 text-gray-700 uppercase">
                  <tr>
                    <th className="px-4 py-3 border">Kode Master</th>
                    <th className="px-4 py-3 border">Nama Akun (GL Account)</th>
                    <th className="px-4 py-3 border">Tahun</th>
                    <th className="px-4 py-3 border text-right">
                      Pagu Anggaran
                    </th>
                    <th className="px-4 py-3 border text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {opexView.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 border font-mono text-blue-600">
                        {item.kd_master}
                      </td>
                      <td className="px-4 py-3 border font-medium">
                        {item.nm_master}
                      </td>
                      <td className="px-4 py-3 border text-center">
                        {item.tahun}
                      </td>
                      <td className="px-4 py-3 border text-right">
                        {formatRupiah(item.nilai)}
                      </td>
                      <td className="px-4 py-3 border text-center">
                        <button className="text-blue-500 hover:underline">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded border border-blue-200 text-sm">
              <p>
                <strong>Info:</strong> Anggaran OPEX biasanya bersifat tahunan
                dan langsung terikat pada Kode Akun Master (COA).
              </p>
            </div>
          </div>
        )}

        {/* --- KONTEN: TAB CAPEX --- */}
        {activeTab === "capex" && (
          <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              Daftar Anggaran Investasi (CAPEX) & Proyek
            </h2>
            <div className="space-y-6">
              {capexView.map((capex) => (
                <div
                  key={capex.kd_capex}
                  className="border rounded-lg overflow-hidden"
                >
                  {/* Header Capex Master */}
                  <div className="bg-gray-100 p-4 border-b flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {capex.nm}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Kode: {capex.kd_capex} | Tahun: {capex.tahun} | Master:{" "}
                        {capex.kd_master}
                      </p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Program Investasi
                    </span>
                  </div>

                  {/* List Pekerjaan (Projects) di dalam Capex ini */}
                  <div className="p-4 bg-white">
                    <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                      Daftar Pekerjaan / Kontrak dalam Program Ini:
                    </h4>
                    {capex.projects.length > 0 ? (
                      <table className="min-w-full text-sm border">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-3 py-2 border">Nama Pekerjaan</th>
                            <th className="px-3 py-2 border">No. Kontrak</th>
                            <th className="px-3 py-2 border text-right">
                              Nilai Kontrak
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {capex.projects.map((proj) => (
                            <tr key={proj.id_pekerjaan}>
                              <td className="px-3 py-2 border">
                                {proj.nm_pekerjaan}
                              </td>
                              <td className="px-3 py-2 border font-mono text-xs">
                                {proj.no_kontrak}
                              </td>
                              <td className="px-3 py-2 border text-right font-medium">
                                {formatRupiah(proj.nilai)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-400 italic text-sm">
                        Belum ada pekerjaan terdaftar.
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* --- KONTEN: TAB SIMULASI INPUT ASET --- */}
        {activeTab === "simulation" && (
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-green-500 animate-fade-in">
            <h2 className="text-xl font-bold mb-2 text-gray-800">
              Simulasi: Bagaimana Aset Dikelola?
            </h2>
            <p className="text-gray-600 mb-6">
              Disinilah relasi terjadi. Saat user menginput aset baru (Laptop,
              Server, Lisensi), mereka harus memilih sumber anggarannya.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Form Simulasi */}
              <div className="border p-4 rounded-lg bg-gray-50">
                <h3 className="font-bold text-gray-700 mb-4">
                  Form Input Aset Baru
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nama Aset
                    </label>
                    <input
                      type="text"
                      className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                      placeholder="Contoh: Laptop Dell Latitude 5420"
                      value={assetForm.name}
                      onChange={(e) =>
                        setAssetForm({ ...assetForm, name: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Jenis Anggaran (Budget Type)
                    </label>
                    <select
                      className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-200"
                      value={assetForm.budgetType}
                      onChange={(e) =>
                        setAssetForm({
                          ...assetForm,
                          budgetType: e.target.value,
                          selectedBudgetId: "",
                        })
                      }
                    >
                      <option value="CAPEX">CAPEX (Belanja Modal)</option>
                      <option value="OPEX">OPEX (Operasional)</option>
                    </select>
                  </div>

                  {/* LOGIKA DINAMIS: Dropdown berubah sesuai pilihan atas */}
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                    <label className="block text-sm font-bold text-yellow-800 mb-1">
                      {assetForm.budgetType === "CAPEX"
                        ? "Pilih Pekerjaan / Proyek Asal"
                        : "Pilih Mata Anggaran Opex"}
                    </label>

                    <select
                      className="w-full border rounded px-3 py-2 bg-white"
                      value={assetForm.selectedBudgetId}
                      onChange={(e) =>
                        setAssetForm({
                          ...assetForm,
                          selectedBudgetId: e.target.value,
                        })
                      }
                    >
                      <option value="">-- Pilih Sumber Anggaran --</option>

                      {assetForm.budgetType === "CAPEX"
                        ? // Loop semua project dari semua capex
                          dummyProjects.map((proj) => (
                            <option
                              key={proj.id_pekerjaan}
                              value={proj.id_pekerjaan}
                            >
                              {proj.nm_pekerjaan} (Kontrak: {proj.no_kontrak})
                            </option>
                          ))
                        : // Loop semua opex annual
                          opexView.map((opex) => (
                            <option key={opex.id} value={opex.id}>
                              {opex.nm_master} - Tahun {opex.tahun}
                            </option>
                          ))}
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                      *Data dropdown ini diambil dari database anggaran yang
                      kita kelola di tab sebelumnya.
                    </p>
                  </div>

                  <button className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition">
                    Simpan Aset
                  </button>
                </div>
              </div>

              {/* Penjelasan Visual */}
              <div className="flex flex-col justify-center text-sm text-gray-600 space-y-4">
                <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-bold text-blue-700">
                    Jika Memilih CAPEX:
                  </h4>
                  <p>
                    Aset akan terhubung ke <code>Tabel budget_projects</code>.
                    Ini penting untuk melacak aset ini dibeli dari kontrak
                    proyek yang mana (misal: Proyek Implementasi IT 2024).
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded border-l-4 border-green-500">
                  <h4 className="font-bold text-green-700">
                    Jika Memilih OPEX:
                  </h4>
                  <p>
                    Aset akan terhubung ke <code>Tabel budget_annual_opex</code>
                    . Ini biasanya untuk pembelian rutin (misal: Mouse,
                    Keyboard, Lisensi tahunan) yang masuk beban operasional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BudgetManagement;
