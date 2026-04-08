import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import ViewAsset from "./components/ViewAsset";
import Auth from "./components/Auth";
import BudgetManagement from "./components/BudgetManagement";
import Budgetinput from "./components/Budgetinput";
import Peminjaman from "./components/Peminjaman";
import UserManagement from "./components/UserManagement";

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/assets" element={<ViewAsset />} />
          <Route path="/peminjaman" element={<Peminjaman />} />
          <Route path="/budget/input" element={<Navigate to="/budget/input/opex" />} />
          <Route path="/budget/input/:type" element={<Budgetinput />} />
          <Route path="/budget" element={<BudgetManagement />} />
          <Route
            path="/projects"
            element={
              <div style={{ padding: "2rem" }}>
                Halaman Daftar Pekerjaan (Coming Soon)
              </div>
            }
          />
          <Route path="/users" element={<UserManagement />} />
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
