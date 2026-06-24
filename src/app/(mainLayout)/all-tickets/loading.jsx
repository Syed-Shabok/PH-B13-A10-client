import DashboardHeading from "@/components/dashboard/DashboardHeading";

const AllTicketsLoadingPage = () => {
  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12">
      <DashboardHeading
        title="Explore Tickets"
        description="Fetching available transport routes..."
      />

      <div className="max-w-7xl mx-auto mt-8 animate-pulse">
        {/* Filter Bar Skeleton */}
        <div className="w-full h-24 bg-white/40 dark:bg-[#124170]/10 rounded-3xl mb-8 border border-zinc-200/60 dark:border-[#1a3d61]" />

        {/* Ticket Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] w-full rounded-3xl bg-white/70 dark:bg-[#124170]/20 border border-zinc-200/60 dark:border-[#1a3d61] shadow-lg"
            >
              <div className="h-44 w-full bg-zinc-200 dark:bg-[#0b1d30]/50 rounded-t-3xl" />
              <div className="p-5 space-y-4">
                <div className="h-6 bg-zinc-200 dark:bg-[#1a3d61]/50 rounded-lg w-3/4" />
                <div className="space-y-2">
                  <div className="h-4 bg-zinc-200 dark:bg-[#1a3d61]/30 rounded-full w-full" />
                  <div className="h-4 bg-zinc-200 dark:bg-[#1a3d61]/30 rounded-full w-2/3" />
                </div>
                <div className="pt-4 mt-auto border-t border-zinc-200/60 dark:border-[#1a3d61]/60">
                  <div className="h-10 w-full bg-zinc-200 dark:bg-[#1a3d61]/50 rounded-xl" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTicketsLoadingPage;
