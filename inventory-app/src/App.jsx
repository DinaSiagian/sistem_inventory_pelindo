import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
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

// ── Wrapper universal: reset state komponen setiap klik navigasi ──
function PageWrapper({ Component }) {
  const { key } = useLocation();
  return <Component key={key} />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/login" element={<Auth />} />

        {/* Admin */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={<PageWrapper Component={Dashboard} />}
          />
          <Route
            path="/assets"
            element={<PageWrapper Component={ViewAsset} />}
          />
          <Route
            path="/peminjaman"
            element={<PageWrapper Component={Peminjaman} />}
          />
          <Route
            path="/budget/input"
            element={<PageWrapper Component={Budgetinput} />}
          />
          <Route
            path="/budget"
            element={<PageWrapper Component={BudgetManagement} />}
          />
          <Route
            path="/projects"
            element={
              <div style={{ padding: "2rem" }}>
                Halaman Daftar Pekerjaan (Coming Soon)
              </div>
            }
          />
          <Route
            path="/users"
            element={<PageWrapper Component={UserManagement} />}
          />
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
                <PageWrapper Component={UserDashboard} />
              </Suspense>
            }
          />
          <Route
            path="/user/inventaris"
            element={
              <Suspense fallback={<Loader />}>
                <PageWrapper Component={Inventaris} />
              </Suspense>
            }
          />
          <Route
            path="/user/peminjaman"
            element={
              <Suspense fallback={<Loader />}>
                <PageWrapper Component={UserPeminjaman} />
              </Suspense>
            }
          />
          <Route
            path="/user/scan"
            element={
              <Suspense fallback={<Loader />}>
                <PageWrapper Component={ScanBarcode} />
              </Suspense>
            }
          />
          <Route
            path="/user/profil"
            element={
              <Suspense fallback={<Loader />}>
                <PageWrapper Component={Profil} />
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
