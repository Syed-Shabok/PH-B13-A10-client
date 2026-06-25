import { getAllTicketsForAdmin } from "@/lib/api/admin";
import ManageTicketsClient from "./ManageTicketsClient";
import DashboardHeading from "@/components/dashboard/DashboardHeading";

export default async function ManageTicketsPage() {
  let tickets = await getAllTicketsForAdmin();

  if (!Array.isArray(tickets)) {
    console.error("Failed to load tickets in admin dashboard");
    tickets = [];
  }

  return (
    <div className="p-6 relative overflow-hidden min-h-screen">
      {/* Background Accent Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00ADB5]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#AAFFC7]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeading
          title="Manage Tickets"
          description="Review, approve, and reject transport vectors submitted by vendors across the network."
        />

        <ManageTicketsClient initialTickets={tickets} />
      </div>
    </div>
  );
}
