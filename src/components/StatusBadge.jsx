import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

export function StatusBadge({ status }) {
  // Base structural classes matching the reference example design system
  const baseBadgeStyles =
    "flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[11px] font-black uppercase tracking-widest shrink-0 transition-colors duration-300";

  if (status === "pending") {
    return (
      <span
        className={`${baseBadgeStyles} bg-amber-500/10 text-amber-700 border-amber-500/30 dark:text-amber-400`}
      >
        <FaClock className="text-amber-500 dark:text-amber-400" /> Pending
      </span>
    );
  }

  if (status === "accepted") {
    return (
      <span
        className={`${baseBadgeStyles} bg-[#67C090]/10 text-[#124170] border-[#67C090]/30 dark:text-[#AAFFC7]`}
      >
        <FaCheckCircle className="text-emerald-600 dark:text-[#AAFFC7]" />{" "}
        Accepted
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span
        className={`${baseBadgeStyles} bg-red-500/10 text-red-600 border-red-500/30 dark:text-red-400`}
      >
        <FaTimesCircle className="text-red-500 dark:text-red-400" /> Rejected
      </span>
    );
  }

  if (status === "paid") {
    return (
      <span
        className={`${baseBadgeStyles} bg-[#00ADB5]/10 text-[#124170] border-[#00ADB5]/30 dark:text-[#00ADB5]`}
      >
        <FaCheckCircle className="text-teal-600 dark:text-[#00ADB5]" /> Paid
      </span>
    );
  }

  return null;
}
