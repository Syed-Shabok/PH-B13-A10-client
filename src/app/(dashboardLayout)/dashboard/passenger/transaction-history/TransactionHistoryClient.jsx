"use client";

import { FaCheckCircle, FaReceipt, FaCalendarAlt } from "react-icons/fa";

export default function TransactionHistoryClient({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center p-16 border border-dashed border-[#1a3d61] rounded-3xl bg-[#124170]/5">
        <p className="text-zinc-400 font-bold uppercase tracking-widest">
          No transactions found
        </p>
        <p className="text-sm text-zinc-500 font-medium mt-2">
          Your completed ticket purchases will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full overflow-x-auto rounded-[2rem] border border-[#1a3d61] bg-[#102226]/40 backdrop-blur-xl shadow-2xl custom-scrollbar">
      <table className="w-full text-left text-sm text-zinc-300 min-w-[800px]">
        <thead className="bg-[#0b1d30]/90 text-[10px] uppercase font-black text-[#00ADB5] tracking-widest border-b border-[#1a3d61]">
          <tr>
            <th className="px-6 py-5 rounded-tl-[2rem]">Transaction Details</th>
            <th className="px-6 py-5">Ticket Info</th>
            <th className="px-6 py-5">Payment Date</th>
            <th className="px-6 py-5 text-right rounded-tr-[2rem]">
              Amount Paid
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1a3d61]/50">
          {transactions.map((tx) => (
            <tr key={tx._id} className="hover:bg-white/5 transition-colors">
              {/* 1. Transaction Details */}
              <td className="px-6 py-5 align-middle">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#00ADB5]/10 flex items-center justify-center text-[#00ADB5] shrink-0 border border-[#00ADB5]/20">
                    <FaReceipt size={16} />
                  </div>
                  <div>
                    <p className="font-bold text-white tracking-wide text-xs">
                      {tx.transactionId}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-[#AAFFC7]/10 border border-[#AAFFC7]/20 text-[#AAFFC7] text-[9px] font-black uppercase tracking-widest rounded-md">
                      <FaCheckCircle size={8} /> Confirmed
                    </span>
                  </div>
                </div>
              </td>

              {/* 2. Ticket Title & Qty */}
              <td className="px-6 py-5 align-middle">
                <p className="font-bold text-white text-sm line-clamp-1 max-w-[250px]">
                  {tx.ticketTitle}
                </p>
                <p className="text-xs text-zinc-400 mt-1 font-semibold">
                  Qty: <span className="text-white">{tx.quantity} Seats</span>
                </p>
              </td>

              {/* 3. Payment Date */}
              <td className="px-6 py-5 align-middle">
                <div className="flex items-center gap-2 text-xs text-zinc-300 font-semibold">
                  <FaCalendarAlt className="text-[#00ADB5] shrink-0" />
                  <span>
                    {new Date(tx.paidAt).toLocaleString([], {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>
              </td>

              {/* 4. Amount */}
              <td className="px-6 py-5 align-middle text-right">
                <p className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 mb-0.5">
                  Total
                </p>
                <p className="text-lg font-black text-[#AAFFC7]">
                  ৳{parseFloat(tx.amount).toLocaleString()}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
