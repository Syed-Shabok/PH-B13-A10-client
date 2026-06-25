import DashboardHeading from "@/components/dashboard/DashboardHeading";
import ManageUsersClient from "./ManageUsersClient";
import { getAllUsers } from "@/lib/api/admin";

export default async function ManageUsersPage() {
  let users = await getAllUsers();

  if (!Array.isArray(users)) {
    console.error("Failed to load users in admin dashboard");
    users = [];
  }

  return (
    <div className="p-6 relative overflow-hidden min-h-screen">
      {/* Background Accent Orbs */}
      <div className="absolute top-10 right-20 w-[400px] h-[400px] bg-[#00ADB5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeading
          title="Manage Users"
          description="Control access levels, promote vendors, and monitor platform security."
        />

        <ManageUsersClient initialUsers={users} />
      </div>
    </div>
  );
}
