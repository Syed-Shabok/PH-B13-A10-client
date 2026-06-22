import { getUserMadeTickets } from "@/lib/api/tickets";
import { getUserSession } from "@/lib/core/session";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { VendorTicketCard } from "@/components/dashboard/VendorTicketCard";

const AddedTicketsPage = async () => {
  const user = await getUserSession();
  const tickets = (await getUserMadeTickets(user?.email)) || [];

  return (
    <div className="min-h-[85vh] w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Structural Dashboard Banner Info segment */}
      <DashboardHeading
        title="My Added Tickets"
        description={`Managing system inventory catalog logs for profile: ${user?.email || "Unknown Vendor"}`}
      />

      <div className="mt-8 relative z-10 max-w-7xl mx-auto">
        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket) => (
              <VendorTicketCard key={ticket._id} ticket={ticket} />
            ))}
          </div>
        ) : (
          /* Clean Empty fallback presentation state box */
          <div className="flex flex-col items-center justify-center text-center p-16 border-2 border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md mt-6 select-none">
            <p className="text-sm font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              No System Node Data Present
            </p>
            <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 mt-1">
              You haven't listed any transport assets or ticket items yet.
            </p>
          </div>
        )}
      </div>

      {/* Matching Ambient UI Accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#AAFFC7]/10 dark:bg-[#67C090]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
};

export default AddedTicketsPage;
