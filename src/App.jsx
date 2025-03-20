import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout";
import LayoutAdmin from "./layout";
import Boards from "./pages/Boards";
import Dashboard from "./components/Dashboard";
// import Summary from "./components/Summary";
import Contact from "./components/Contact/ContactCard";
import SummaryCRM from "./components/Laporan/report";
import Laporan from "./components/SalesReport";
import Segmentasi from "./components/StrategiSegmentasi";
import Login from "./components/Login";
import Bobot from "./components/Bobot/KelolaBobot";
import DAdmin from "./components/Admin/Dashboard";
import KelolaUser from "./components/Admin/KelolaUser";
import Profil from "./components/Profil/profil";
import Chart from "./components/Chart";
import ProtectedRoute from "./PrivateRoute";
import { StyleSheetManager } from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const userType = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <StyleSheetManager shouldForwardProp={(prop) => prop !== "shake"}>
        <Suspense fallback={<div>Loading...</div>}>
          <ToastContainer />
          <div className="App">
            <Routes>
              {!isLoggedIn ? (
                <>
                  {/* Jika belum login, arahkan ke Login */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/" element={<Login />} />
                </>
              ) : (
                <Route element={<ProtectedRoute />}>
                  {/* Setelah login, arahkan sesuai role */}
                  <Route path="/login" element={<Navigate to="/login" />} />
                  {userType === "Sales" ? (
                    <Route element={<Layout isLoggedIn={isLoggedIn} userType={userType} />}>
                      <Route path="/" element={<Navigate to="/dashboard" />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      {/* <Route path="/leads" element={<Summary />} /> */}
                      <Route path="/manageleads" element={<Boards />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/summary-crm" element={<SummaryCRM />} />
                      <Route path="/Laporan" element={<Laporan />} />
                      <Route path="/profil" element={<Profil />} />
                      <Route path="/bobot" element={<Bobot />} />
                      <Route path="/chart" element={<Chart />} />
                      <Route path="/manage-leads/:contactId" element={<Boards />} />
                      <Route path="/segmentasi" element={<Segmentasi />} />
                    </Route>
                  ) : (
                    <Route element={<LayoutAdmin isLoggedIn={isLoggedIn} />}>
                      <Route path="/" element={<Navigate to="/dashboardAdmin" />} />
                      <Route path="/dashboardAdmin" element={<DAdmin />} />
                      <Route path="/KelolaUser" element={<KelolaUser />} />
                    </Route>
                  )}
                </Route>
              )}
              {/* Fallback untuk rute tidak ditemukan */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Suspense>
      </StyleSheetManager>
    </BrowserRouter>
  );
}

export default App;
