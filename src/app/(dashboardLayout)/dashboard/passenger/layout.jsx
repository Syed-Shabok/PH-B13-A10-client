import { varifyRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
  await varifyRole("passenger");
  return children;
};

export default AdminDashboardLayout;
