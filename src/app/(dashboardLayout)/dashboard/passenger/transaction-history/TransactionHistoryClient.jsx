"use client";

import { FaCheckCircle, FaReceipt, FaCalendarAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function TransactionHistoryClient({ transactions }) {
  // Fluid motion presets mapped directly from the example project
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
    },
  };

  if (transactions.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto w-full lg:px-10"
      >
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-col items-center justify-center p-16 border border-dashed border-zinc-200 dark:border-[#1a3d61] rounded-3xl bg-white/40 dark:bg-[#124170]/5 backdrop-blur-md shadow-sm"
        >
          <p className="text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-widest text-sm text-center">
            No transactions found
          </p>
          <p className="text-sm text-zinc-400 dark:text-zinc-500 font-medium mt-2 text-center">
            Your completed ticket purchases will appear here.
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-10 mx-auto w-full lg:px-10"
    >
      <motion.div
        variants={itemVariants}
        className="mt-8 overflow-hidden rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl shadow-2xl"
      >
        {/* Responsive Layout Grid Map: Block structures on mobile views, native table rows on desktop */}
        <table className="w-full text-left text-sm text-zinc-600 dark:text-zinc-400 block md:table">
          <thead className="hidden md:table-header-group bg-zinc-100/80 dark:bg-[#0b1d30]/80 text-xs uppercase font-black text-[#124170] dark:text-[#00ADB5] tracking-widest border-b border-zinc-200/60 dark:border-[#1a3d61]">
            <tr>
              <th className="px-6 py-4">Transaction Details</th>
              <th className="px-6 py-4">Ticket Info</th>
              <th className="px-6 py-4">Payment Date</th>
              <th className="px-6 py-4 text-right">Amount Paid</th>
            </tr>
          </thead>

          <tbody className="block md:table-row-group divide-y divide-zinc-200/60 dark:divide-[#1a3d61]/50">
            {transactions.map((tx) => (
              <tr
                key={tx._id}
                className="block md:table-row p-5 md:p-0 hover:bg-zinc-50/50 dark:hover:bg-white/5 transition-colors"
              >
                {/* 1. Transaction Identifier Token */}
                <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      Transaction Details
                    </span>
                    <div className="flex items-center gap-3 w-full">
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-[#00ADB5]/10 flex items-center justify-center text-[#124170] dark:text-[#00ADB5] shrink-0 border border-zinc-200 dark:border-[#00ADB5]/20">
                        <FaReceipt size={14} />
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 dark:text-white tracking-wide text-xs">
                          {tx.transactionId}
                        </p>
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-[#67C090]/10 border border-[#67C090]/30 text-emerald-700 dark:text-[#AAFFC7] text-[9px] font-black uppercase tracking-widest rounded-md">
                          <FaCheckCircle
                            size={8}
                            className="text-emerald-600 dark:text-[#AAFFC7]"
                          />{" "}
                          Confirmed
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* 2. Ticket Identification Core */}
                <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                  <div className="flex flex-col md:block mt-2 md:mt-0">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                      Ticket Info
                    </span>
                    <p className="font-bold text-zinc-900 dark:text-white text-sm line-clamp-1 max-w-[250px]">
                      {tx.ticketTitle}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 font-medium">
                      Qty:{" "}
                      <span className="font-bold text-zinc-700 dark:text-zinc-300">
                        {tx.quantity} Seats
                      </span>
                    </p>
                  </div>
                </td>

                {/* 3. Temporal Vector Element */}
                <td className="block md:table-cell px-2 md:px-6 py-2 md:py-4">
                  <div className="flex flex-col md:block mt-2 md:mt-0">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">
                      Payment Date
                    </span>
                    <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300 font-semibold">
                      <FaCalendarAlt className="text-[#124170] dark:text-[#00ADB5] shrink-0" />
                      <span>
                        {new Date(tx.paidAt).toLocaleString([], {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                  </div>
                </td>

                {/* 4. Ledger Allocation Amount Component */}
                <td className="block md:table-cell px-2 md:px-6 pt-3 pb-1 md:py-4 text-left md:text-right border-t border-dashed md:border-none border-zinc-200/60 dark:border-[#1a3d61]/50 mt-3 md:mt-0">
                  <div className="flex items-center justify-between md:block">
                    <span className="md:hidden text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                      Amount Paid
                    </span>
                    <div className="text-right">
                      <p className="hidden md:block text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500 mb-0.5">
                        Total
                      </p>
                      <p className="text-lg font-black text-[#124170] dark:text-[#AAFFC7]">
                        ৳{parseFloat(tx.amount).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
