import React from "react";
import MainLayout from "../layouts/MainLayout";

const DashboardLayout = ({ title, children }) => {
  return (
    <MainLayout
      title={title}
      activeLink="elevate"
      c
    >
      {children}
    </MainLayout>
  );
};

export default DashboardLayout;
