"use client";

import PublicTicketsCard from "@/components/PublicTicketsCard";
import { motion } from "framer-motion";

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

const AllTicketsClient = ({ tickets }) => {
  if (!tickets || tickets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md mt-8 select-none h-[50vh]">
        <p className="text-xl font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
          No Route Tickets Available
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 relative z-10 max-w-7xl mx-auto w-full"
    >
      {tickets.map((ticket) => (
        <motion.div key={ticket._id} variants={itemVariants}>
          <PublicTicketsCard ticket={ticket} />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default AllTicketsClient;
