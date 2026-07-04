import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Auth from "./components/Auth";

// === Admin pages (lazy) ===
const Dashboard = lazy(() => import("./components/Dashboard"));
const ViewAsset = lazy(() => import("./components/ViewAsset"));
const MasterAset = lazy(() => import("./components/MasterAset"));
const BudgetManagement = lazy(() => import("./components/BudgetManagement"));
const Budgetinput = lazy(() => import("./components/Budgetinput"));
const Peminjaman = lazy(() => import("./components/Peminjaman"));
const UserManagement = lazy(() => import("./components/UserManagement"));

// === User pages (lazy) ===
const UserLayout = lazy(() => import("./components/User/Userlayout"));

const Inventaris = lazy(() => import("./components/User/Inventaris"));
const UserPeminjaman = lazy(() => import("./components/User/Peminjaman"));

const Profil = lazy(() => import("./components/User/Profil"));
const ScanAsset = lazy(() => import("./components/ScanAsset"));

const Loader = () => <div style={{ padding: "2rem" }}>Loading...</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />
        
        {/* Public Scan Route */}
        <Route path="/scan/:id" element={<Suspense fallback={<Loader />}><ScanAsset /></Suspense>} />

        {/* Admin */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Suspense fallback={<Loader />}><Dashboard /></Suspense>} />
          
          {/* Inventory Management Routes */}
          <Route path="/assets" element={<Navigate to="/assets/list" replace />} />
          <Route path="/assets/list" element={<Suspense fallback={<Loader />}><ViewAsset /></Suspense>} />
          <Route path="/assets/master" element={<Suspense fallback={<Loader />}><MasterAset /></Suspense>} />

          {/* BAST Aset routes */}
          <Route
            path="/peminjaman"
            element={<Navigate to="/peminjaman/serah-terima" replace />}
          />
          <Route
            path="/peminjaman/serah-terima"
            element={<Suspense fallback={<Loader />}><Peminjaman forcedTab="borrow" /></Suspense>}
          />
          <Route
            path="/peminjaman/riwayat"
            element={<Suspense fallback={<Loader />}><Peminjaman forcedTab="return" /></Suspense>}
          />

          {/* Input Anggaran routes */}
          <Route
            path="/budget/input"
            element={<Navigate to="/budget/input/opex" replace />}
          />
          <Route path="/budget/input/:type" element={<Suspense fallback={<Loader />}><Budgetinput /></Suspense>} />

          {/* Input Pekerjaan routes — BudgetManagement dengan prop forcedType */}
          <Route
            path="/budget/pekerjaan"
            element={<Navigate to="/budget/pekerjaan/capex" replace />}
          />
          <Route
            path="/budget/pekerjaan/capex"
            element={<Suspense fallback={<Loader />}><BudgetManagement forcedType="capex" /></Suspense>}
          />
          <Route
            path="/budget/pekerjaan/opex"
            element={<Suspense fallback={<Loader />}><BudgetManagement forcedType="opex" /></Suspense>}
          />

          {/* Route lama /budget tetap berfungsi sebagai fallback (tampil semua) */}
          <Route path="/budget" element={<Suspense fallback={<Loader />}><BudgetManagement /></Suspense>} />

          <Route
            path="/projects"
            element={
              <div style={{ padding: "2rem" }}>
                Halaman Daftar Pekerjaan (Coming Soon)
              </div>
            }
          />
          <Route path="/users" element={<Suspense fallback={<Loader />}><UserManagement /></Suspense>} />
          <Route
            path="/reports"
            element={
              <div style={{ padding: "2rem" }}>
                Halaman Laporan Eksekutif (Coming Soon)
              </div>
            }
          />
        </Route>

        {/* User */}
        <Route
          element={
            <Suspense fallback={<Loader />}>
              <UserLayout />
            </Suspense>
          }
        >
          <Route
            path="/user/dashboard"
            element={<Navigate to="/user/inventaris" replace />}
          />
          <Route
            path="/user/inventaris"
            element={
              <Suspense fallback={<Loader />}>
                <Inventaris />
              </Suspense>
            }
          />
          <Route
            path="/user/peminjaman"
            element={
              <Suspense fallback={<Loader />}>
                <UserPeminjaman />
              </Suspense>
            }
          />

          <Route
            path="/user/profil"
            element={
              <Suspense fallback={<Loader />}>
                <Profil />
              </Suspense>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;


