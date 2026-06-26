import { varifyRole } from "@/lib/core/session";

const AdminDashboardLayout = async ({ children }) => {
  await varifyRole("vendor");
  return children;
};

export default AdminDashboardLayout;
