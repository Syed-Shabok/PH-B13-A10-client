import { Card, Button } from "@heroui/react";
import { getUserSession } from "@/lib/core/session";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { getPassengerBookings } from "@/lib/api/bookings";
import BookingCard from "@/components/dashboard/BookingCard";

export default async function MyBookedTicketsPage() {
  const user = await getUserSession();
  const sessionEmail = user?.email;
  console.log("Email in passenger Dashboard: ", sessionEmail);

  const bookings = (await getPassengerBookings(sessionEmail)) || [];
  console.log("Bookings in passenger Dashboard: ", bookings);

  return (
    <div className="min-h-screen w-full bg-slate-50 dark:bg-[#091624] px-6 py-12 relative overflow-hidden transition-colors duration-300">
      {/* Structural Heading content area wrapper */}
      <div className="relative z-10 mx-auto w-full lg:px-10">
        <DashboardHeading
          title="My Booked Tickets"
          description="Track your pending requests and complete payments for approved travels."
        />

        {bookings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {bookings.map((booking) => (
              <BookingCard key={booking?._id} booking={booking} />
            ))}
          </div>
        ) : (
          <div className="mt-12 flex flex-col items-center justify-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md shadow-sm">
            <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm text-center">
              No bookings found
            </p>
          </div>
        )}
      </div>

      {/* Decorative Vector Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#124170]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#67C090]/10 dark:bg-[#AAFFC7]/5 rounded-full blur-3xl pointer-events-none" />
    </div>
  );
}
