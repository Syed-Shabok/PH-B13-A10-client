import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export function StatusBadge({ status }) {
  if (status === "pending")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-black uppercase tracking-wider shrink-0">
        <FaClock /> Pending
      </span>
    );
  if (status === "accepted")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#AAFFC7]/10 text-[#AAFFC7] border border-[#AAFFC7]/20 text-[10px] font-black uppercase tracking-wider shrink-0">
        <FaCheckCircle /> Accepted
      </span>
    );
  if (status === "rejected")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 text-[10px] font-black uppercase tracking-wider shrink-0">
        <FaTimesCircle /> Rejected
      </span>
    );
  if (status === "paid")
    return (
      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00ADB5]/10 text-[#00ADB5] border border-[#00ADB5]/20 text-[10px] font-black uppercase tracking-wider shrink-0">
        <FaCheckCircle /> Paid
      </span>
    );
  return null;
}
