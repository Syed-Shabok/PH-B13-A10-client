import { varifyRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
  await varifyRole("admin");
  return children;
};

export default AdminDashboardLayout;
