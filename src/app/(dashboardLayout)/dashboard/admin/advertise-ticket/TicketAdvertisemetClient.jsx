"use client";

import { useState } from "react";
import { Button } from "@heroui/react";
import { updateTicketStatus } from "@/lib/api/admin";
import toast from "react-hot-toast";
import {
  FaCheck,
  FaTimes,
  FaClock,
  FaTag,
  FaCalendarAlt,
  FaCalendarPlus,
} from "react-icons/fa";

export default function TicketAdvertisementClient({ initialTickets }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [processingId, setProcessingId] = useState(null);

  const handleStatusChange = async (id, newStatus) => {
    try {
      setProcessingId(id);
      const res = await updateTicketStatus(id, newStatus);

      if (res.modifiedCount > 0 || res.matchedCount > 0) {
        toast.success(`Ticket marked as ${newStatus}`);
        setTickets((prev) =>
          prev.map((ticket) =>
            ticket._id === id ? { ...ticket, status: newStatus } : ticket,
          ),
        );
      } else {
        toast.error("Status update failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("A network error occurred.");
    } finally {
      setProcessingId(null);
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="mt-12 flex flex-col items-center justify-center p-16 border border-dashed border-[#1a3d61] rounded-3xl bg-[#124170]/5">
        <p className="text-zinc-400 font-bold uppercase tracking-widest">
          No tickets exist on the platform
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 w-full overflow-x-auto rounded-[2rem] border border-[#1a3d61] bg-[#102226]/40 backdrop-blur-xl shadow-2xl custom-scrollbar">
      <table className="w-full text-left text-sm text-zinc-300 min-w-[1000px]">
        <thead className="bg-[#0b1d30]/90 text-[10px] uppercase font-black text-[#00ADB5] tracking-widest border-b border-[#1a3d61]">
          <tr>
            <th className="px-6 py-5 rounded-tl-[2rem]">Vendor Info</th>
            <th className="px-6 py-5">Ticket Overview</th>
            <th className="px-6 py-5">Schedule & Amenities</th>
            <th className="px-6 py-5">Capacity & Fare</th>
            <th className="px-6 py-5">Status</th>
            <th className="px-6 py-5 text-right rounded-tr-[2rem]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1a3d61]/50">
          {tickets.map((ticket) => (
            <tr key={ticket._id} className="hover:bg-white/5 transition-colors">
              {/* 1. Vendor & Submission Data */}
              <td className="px-6 py-6 align-top">
                <p className="font-bold text-white tracking-wide">
                  {ticket.vendorName}
                </p>
                <p className="text-xs text-zinc-400 mt-0.5">
                  {ticket.vendorEmail}
                </p>
                <div className="flex items-center gap-1.5 mt-3 text-[10px] text-zinc-500 font-semibold uppercase tracking-wider">
                  <FaCalendarPlus size={10} className="text-zinc-600" />
                  Listed:{" "}
                  {ticket.createdAt
                    ? new Date(ticket.createdAt).toLocaleDateString()
                    : "N/A"}
                </div>
              </td>

              {/* 2. Ticket Image & Core Details */}
              <td className="px-6 py-6 align-top">
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 shrink-0 rounded-xl bg-[#0b1d30] overflow-hidden border border-white/5 shadow-md">
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest bg-[#124170]/40 border border-[#1a3d61] text-[#AAFFC7] px-2 py-0.5 rounded-md flex items-center gap-1 w-max mb-2">
                      <FaTag size={8} /> {ticket.transportType}
                    </span>
                    <p className="font-bold text-white text-base leading-tight mb-1 line-clamp-2 max-w-[250px]">
                      {ticket.title || ticket.ticketTitle}
                    </p>
                    <p className="text-xs text-zinc-400 font-medium mt-1.5">
                      {ticket.from}{" "}
                      <span className="text-[#00ADB5] px-1">→</span> {ticket.to}
                    </p>
                  </div>
                </div>
              </td>

              {/* 3. Schedule & Perks */}
              <td className="px-6 py-6 align-top">
                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-xs text-zinc-300 font-semibold">
                    <FaCalendarAlt className="text-[#00ADB5] shrink-0 mt-0.5" />
                    <span>
                      {new Date(ticket.departureDateTime).toLocaleString([], {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </span>
                  </div>

                  {ticket.perks && ticket.perks.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                      {ticket.perks.map((perk, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 bg-zinc-800/50 border border-zinc-700/50 text-zinc-400 rounded-md"
                        >
                          {perk}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </td>

              {/* 4. Capacity & Fare */}
              <td className="px-6 py-6 align-top">
                <div className="space-y-2 bg-[#0b1d30]/30 p-3 rounded-xl border border-white/5 w-max">
                  <p className="text-xs flex flex-col">
                    <span className="text-zinc-500 uppercase font-bold tracking-wider text-[9px] mb-0.5">
                      Available Seats
                    </span>
                    <span className="font-black text-white">
                      {ticket.quantity}
                    </span>
                  </p>
                  <div className="w-full h-px bg-white/5" />
                  <p className="text-xs flex flex-col">
                    <span className="text-zinc-500 uppercase font-bold tracking-wider text-[9px] mb-0.5">
                      Unit Fare
                    </span>
                    <span className="font-black text-[#AAFFC7] text-base">
                      ৳{ticket.price}
                    </span>
                  </p>
                </div>
              </td>

              {/* 5. Status */}
              <td className="px-6 py-6 align-top">
                <StatusBadge status={ticket.status} />
              </td>

              {/* 6. Actions */}
              <td className="px-6 py-6 align-top text-right">
                <div className="flex flex-col items-end gap-2">
                  <Button
                    size="sm"
                    isDisabled={
                      ticket.status === "approved" ||
                      processingId === ticket._id
                    }
                    isLoading={processingId === ticket._id}
                    onPress={() => handleStatusChange(ticket._id, "approved")}
                    className="w-24 bg-[#00ADB5]/10 text-[#00ADB5] border border-[#00ADB5]/30 hover:bg-[#00ADB5] hover:text-[#091624] font-bold uppercase tracking-widest text-[10px] transition-all rounded-lg justify-start"
                    startContent={
                      processingId !== ticket._id && <FaCheck size={10} />
                    }
                  >
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    isDisabled={
                      ticket.status === "rejected" ||
                      processingId === ticket._id
                    }
                    isLoading={processingId === ticket._id}
                    onPress={() => handleStatusChange(ticket._id, "rejected")}
                    className="w-24 bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white font-bold uppercase tracking-widest text-[10px] transition-all rounded-lg justify-start"
                    startContent={
                      processingId !== ticket._id && <FaTimes size={10} />
                    }
                  >
                    Reject
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Inline helper for standard status aesthetics
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    approved: "bg-[#AAFFC7]/10 text-[#AAFFC7] border-[#AAFFC7]/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  const icons = {
    pending: <FaClock size={10} />,
    approved: <FaCheck size={10} />,
    rejected: <FaTimes size={10} />,
  };

  const currentStyle = styles[status] || styles.pending;
  const currentIcon = icons[status] || icons.pending;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest border rounded-full shadow-sm ${currentStyle}`}
    >
      {currentIcon} {status}
    </span>
  );
}
