"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Unauthorized = () => {
  // Animation Orchestration Variants (Identical to your design system)
  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom cubic bezier curve
        when: "beforeChildren",
        staggerChildren: 0.08,
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

  return (
    <main className="min-h-screen w-full bg-white dark:bg-[#091624] flex flex-col items-center justify-center px-6 relative overflow-hidden transition-colors duration-300">
      {/* Dynamic Animated Background Ambient Orbs */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute -top-40 -left-40 w-96 h-96 bg-red-500/5 dark:bg-red-500/5 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#00ADB5]/10 dark:bg-[#00ADB5]/5 rounded-full blur-3xl pointer-events-none"
      />

      {/* Main Structural Content Glass Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center max-w-md text-center bg-zinc-50/50 dark:bg-black/10 backdrop-blur-md p-10 rounded-3xl border border-zinc-200/40 dark:border-white/5 shadow-xl"
      >
        {/* Large Geometric Access Denied Accent Badge */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="h-14 inline-flex items-center justify-center px-6 rounded-full bg-red-500/10 dark:bg-red-500/10 border border-red-500/20 text-sm font-black tracking-[0.25em] text-red-500 shadow-inner select-none mb-6 cursor-default"
        >
          ACCESS DENIED
        </motion.div>
        {/* Messaging Layout */}
        <motion.h1
          variants={itemVariants}
          className="text-2xl font-black uppercase tracking-wider text-[#124170] dark:text-white mb-3"
        >
          Unauthorized
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-sm font-semibold leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-xs mb-8"
        >
          You do not have the clearance tokens required to access this secure
          terminal space or view this schedule structure.
        </motion.p>
        {/* Navigation Action Buttons Group */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-3 w-full"
        >
          <motion.div
            className="w-full"
            whileHover={{ scale: 1.015 }}
            whileTap={{ scale: 0.985 }}
          >
            <Link
              href="/"
              className="w-full px-6 h-11 inline-flex items-center justify-center text-xs font-bold tracking-wider uppercase bg-[#124170] dark:bg-[#00ADB5] text-[#AAFFC7] dark:text-[#091624] rounded-full shadow-md dark:shadow-none transition-colors"
            >
              Go to Homepage
            </Link>
          </motion.div>
        </motion.div>
        {/* Footer Network Node Matcher */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-2 mt-8 select-none opacity-80"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1.5 h-1.5 rounded-full bg-red-500"
          />
          <span className="text-[10px] font-bold text-gray-400 dark:text-zinc-500 tracking-wide uppercase">
            Security Protocol Active
          </span>
        </motion.div>
      </motion.div>
    </main>
  );
};

export default Unauthorized;
