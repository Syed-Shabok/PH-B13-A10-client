import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import React from "react";

const Dashboardlayout = ({ children }) => {
  return (
    <div>
      <DashboardSidebar />
      {children}
    </div>
  );
};

export default Dashboardlayout;
