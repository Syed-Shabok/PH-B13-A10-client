"use client";

import React, { useState, useEffect } from "react";
import PublicTicketsCard from "../../../components/PublicTicketsCard";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import TicketFilters from "@/components/TicketFilters";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 14 },
  },
};

export default function AllTicketsClient({ tickets, filters }) {
  const router = useRouter();

  const [fromSearch, setFromSearch] = useState(filters.from || "");
  const [toSearch, setToSearch] = useState(filters.to || "");
  const [transportType, setTransportType] = useState(
    filters.transportType || "all",
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const sp = new URLSearchParams();

      if (fromSearch) sp.set("from", fromSearch);
      if (toSearch) sp.set("to", toSearch);

      if (transportType && transportType !== "all") {
        sp.set("transportType", transportType);
      }

      router.push(`?${sp.toString()}`);
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [fromSearch, toSearch, transportType, router]);

  return (
    <div className="relative z-10 max-w-7xl mx-auto w-full mt-8">
      {/* 1. Filter UI */}
      <TicketFilters
        fromSearch={fromSearch}
        setFromSearch={setFromSearch}
        toSearch={toSearch}
        setToSearch={setToSearch}
        transportType={transportType}
        setTransportType={setTransportType}
      />

      <div className="mb-6 text-sm font-semibold text-zinc-500 dark:text-zinc-400 pl-2">
        Showing {tickets.length} route{tickets.length !== 1 && "s"} found.
      </div>

      {/* 2. Data Grid */}
      {tickets.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full"
        >
          {tickets.map((ticket) => (
            <motion.div key={ticket._id} variants={itemVariants}>
              <PublicTicketsCard ticket={ticket} />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md mt-2 select-none h-[40vh]">
          <p className="text-xl font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            No Route Tickets Available
          </p>
          <p className="text-sm font-medium text-zinc-400 mt-2">
            Try adjusting your search filters.
          </p>
        </div>
      )}
    </div>
  );
}
