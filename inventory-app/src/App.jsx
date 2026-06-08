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
const BudgetManagement = lazy(() => import("./components/BudgetManagement"));
const Budgetinput = lazy(() => import("./components/Budgetinput"));
const Peminjaman = lazy(() => import("./components/Peminjaman"));
const UserManagement = lazy(() => import("./components/UserManagement"));

// === User pages (lazy) ===
const UserLayout = lazy(() => import("./components/User/Userlayout"));
const UserDashboard = lazy(() => import("./components/User/Dashboard"));
const Inventaris = lazy(() => import("./components/User/Inventaris"));
const UserPeminjaman = lazy(() => import("./components/User/Peminjaman"));
const ScanBarcode = lazy(() => import("./components/User/ScanBarcode"));
const Profil = lazy(() => import("./components/User/Profil"));

const Loader = () => <div style={{ padding: "2rem" }}>Loading...</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />

        {/* Admin */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Suspense fallback={<Loader />}><Dashboard /></Suspense>} />
          <Route path="/assets" element={<Suspense fallback={<Loader />}><ViewAsset /></Suspense>} />
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
            element={
              <Suspense fallback={<Loader />}>
                <UserDashboard />
              </Suspense>
            }
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
            path="/user/scan"
            element={
              <Suspense fallback={<Loader />}>
                <ScanBarcode />
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


