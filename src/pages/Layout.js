import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
const Layout = () => {
  return (
    <>
      <Toaster />
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
