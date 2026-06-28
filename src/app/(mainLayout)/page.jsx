import { getAdvertisedTickets, getLatestTickets } from "@/lib/api/tickets";
import HeroSlider from "@/components/home/HeroSlider";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Link from "next/link";
import { Button } from "@heroui/react";
import PublicTicketCard from "@/components/PublicTicketsCard";

export default async function HomePage() {
  const advertisedTicketsRes = await getAdvertisedTickets();
  const latestTicketsRes = await getLatestTickets();

  const advertisedTickets = Array.isArray(advertisedTicketsRes)
    ? advertisedTicketsRes
    : [];
  const latestTickets = Array.isArray(latestTicketsRes) ? latestTicketsRes : [];

  console.log("Latest Tickets: ", latestTickets);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#091624] relative overflow-hidden transition-colors duration-300">
      {/* Global Ambient Accents */}
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#00ADB5]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#AAFFC7]/5 rounded-full blur-[150px] pointer-events-none" />

      {/* 1. Hero Section */}
      <HeroSlider />

      <main className="container mx-auto px-6 pt-24 pb-16 space-y-32">
        {/* 2. Featured / Advertised Tickets Section */}
        {advertisedTickets.length > 0 && (
          <section className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-[#124170] dark:text-white">
                  Featured{" "}
                  <span className="text-[#67C090] dark:text-[#AAFFC7]">
                    Routes
                  </span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-semibold">
                  Hand-picked premium travel options.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {advertisedTickets.map((ticket) => (
                <div key={ticket._id}>
                  <PublicTicketCard ticket={ticket} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 3. Extra Section: Why Choose Us */}
        <WhyChooseUs />

        {/* 4. Latest Tickets Section */}
        <section className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-[#124170] dark:text-white">
                Recently <span className="text-[#00ADB5]">Added</span>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-semibold">
                The newest fleet additions to our network.
              </p>
            </div>
            <Link href="/all-tickets">
              <Button
                variant="bordered"
                className="border-[#00ADB5]/30 text-[#00ADB5] hover:bg-[#00ADB5]/10 font-bold uppercase tracking-widest rounded-xl transition-all"
              >
                View All Tickets
              </Button>
            </Link>
          </div>
          {latestTickets.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestTickets.map((ticket) => (
                <div key={ticket._id}>
                  <PublicTicketCard ticket={ticket} />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-40 border border-zinc-200/60 dark:border-[#1a3d61] bg-white/40 dark:bg-[#124170]/5 rounded-3xl backdrop-blur-xl shadow-lg">
              <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest">
                No recent tickets available.
              </p>
            </div>
          )}
        </section>

        {/* 5. Extra Section: Newsletter / CTA */}
        <section className="relative z-10 bg-white/70 dark:bg-gradient-to-br dark:from-[#124170]/40 dark:to-[#102226]/80 border border-zinc-200/60 dark:border-[#1a3d61] rounded-[3rem] p-12 text-center backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#00ADB5]/10 dark:bg-[#00ADB5]/20 rounded-full blur-[80px] pointer-events-none" />
          <h2 className="text-3xl font-black uppercase tracking-widest text-[#124170] dark:text-white mb-4 relative z-10">
            Ready for your next journey?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-8 max-w-xl mx-auto relative z-10 font-medium">
            Join thousands of passengers who trust Tikify for their daily
            transit and luxury travel needs.
          </p>
          <Link href="/all-tickets">
            <Button className="bg-[#124170] dark:bg-white text-white dark:text-[#091624] hover:bg-[#1a3d61] dark:hover:bg-zinc-200 font-black uppercase tracking-widest rounded-2xl h-14 px-10 shadow-lg relative z-10 transition-colors">
              Start Booking Now
            </Button>
          </Link>
        </section>
      </main>
    </div>
  );
}
