// ============================================================
// index.js — Entry point
// ============================================================
import React from "react";
import ReactDOM from "react-dom/client";
import UserLayout from "./UserLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserLayout />
  </React.StrictMode>,
);
