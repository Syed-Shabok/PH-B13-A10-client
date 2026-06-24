"use client";

import React from "react";
import { Select, ListBox } from "@heroui/react";
import {
  FaMapMarkerAlt,
  FaMapSigns,
  FaFilter,
  FaChevronDown,
  FaRedoAlt,
} from "react-icons/fa";

const TRANSPORT_TYPES = ["Bus", "Train", "Flight", "Launch"];

export default function TicketFilters({
  fromSearch,
  setFromSearch,
  toSearch,
  setToSearch,
  transportType,
  setTransportType,
}) {
  const inputClass =
    "w-full h-11 pl-10 pr-3 rounded-xl bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-[#00ADB5] focus:ring-1 focus:ring-[#00ADB5] transition-all shadow-sm";

  const handleReset = () => {
    setFromSearch("");
    setToSearch("");
    setTransportType("all");
  };

  return (
    <div className="flex flex-col gap-4 bg-white/40 dark:bg-[#124170]/10 backdrop-blur-xl p-5 md:p-6 rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] shadow-lg mb-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 text-[#124170] dark:text-zinc-200">
          <FaFilter className="text-sm" />
          <h3 className="text-sm font-bold uppercase tracking-wider">
            Search & Filter Routes
          </h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-[#00ADB5] transition-colors"
        >
          <FaRedoAlt /> Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* 1. FROM Location Input */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <FaMapMarkerAlt />
          </span>
          <input
            type="text"
            value={fromSearch}
            onChange={(e) => setFromSearch(e.target.value)}
            placeholder="From (e.g. Dhaka)"
            className={inputClass}
          />
        </div>

        {/* 2. TO Location Input */}
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <FaMapSigns />
          </span>
          <input
            type="text"
            value={toSearch}
            onChange={(e) => setToSearch(e.target.value)}
            placeholder="To (e.g. Cox's Bazar)"
            className={inputClass}
          />
        </div>

        {/* 3. Transport Type Select */}
        <div>
          <div>
            <select
              value={transportType}
              onChange={(e) => setTransportType(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] text-sm font-semibold text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-[#00ADB5] transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="all">All Transports</option>
              {TRANSPORT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
