"use client";

import { Button, Card } from "@heroui/react";
import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { StatusBadge } from "../StatusBadge";

const BookingCard = ({ booking }) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  // Live Countdown Logic (Preserved intact)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const departureTime = new Date(booking?.departureDateTime).getTime();
      const now = new Date().getTime();
      const difference = departureTime - now;

      if (difference <= 0) {
        setTimeLeft("Departed");
        setIsExpired(true);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
      setTimeLeft(`${days}d ${hours}h ${minutes}m ${formattedSeconds}s`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [booking?.departureDateTime]);

  const handleMakePayment = async () => {
    const paymentData = {
      paymentAmount: booking?.totalPrice,
      ticketId: booking?.ticketId,
      ticketTitle: booking?.ticketTitle,
      vendorName: booking?.vendorName,
      vendorEmail: booking?.vendorEmail,
      bookingId: booking?._id,
      unitPrice: booking?.unitPrice,
      quantity: booking?.bookingQuantity,
      bookingQuantity: booking?.bookingQuantity,
      passengerName: booking?.passengerName,
      passengerEmail: booking?.passengerEmail,
    };

    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentData),
    });

    const data = await res.json();
    console.log("handleMakePayment triggered");
    if (data?.url) {
      window.location.href = data.url;
    }
  };

  const isPaid =
    booking?.paymentStatus === "paid" || booking?.status === "paid";

  return (
    <Card
      key={booking._id}
      className="bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl border border-zinc-200/60 dark:border-[#1a3d61] p-5 flex flex-col justify-between h-full rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300"
    >
      <div>
        {/* Card Header Core */}
        <div className="flex justify-between items-start mb-4 gap-2">
          <h3 className="font-bold text-zinc-900 dark:text-white text-lg line-clamp-1 pr-2">
            {booking.ticketTitle}
          </h3>
          <StatusBadge status={booking.status} />
        </div>

        {/* Content Vector Timeline Field Elements */}
        <div className="space-y-2.5 text-sm mb-6 border-l-2 border-zinc-200 dark:border-[#00ADB5]/30 pl-3">
          <p className="text-zinc-600 dark:text-zinc-300 font-medium">
            <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-[11px] mr-1">
              Route:
            </span>{" "}
            {booking.from} → {booking.to}
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 font-medium">
            <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-[11px] mr-1">
              Departure:
            </span>{" "}
            {new Date(booking.departureDateTime).toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <p className="text-zinc-600 dark:text-zinc-300 font-medium">
            <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-[11px] mr-1">
              Seats:
            </span>{" "}
            {booking.bookingQuantity} Class Slots
          </p>

          {/* Countdown Display Vector Layout */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-zinc-400 dark:text-zinc-500 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <FaHourglassHalf className="text-[#124170] dark:text-[#00ADB5] text-xs" />{" "}
              Time Left:
            </span>
            <span
              className={`font-bold tabular-nums tracking-wide ${
                isExpired
                  ? "text-red-500 dark:text-red-400"
                  : "text-[#124170] dark:text-[#AAFFC7]"
              }`}
            >
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      {/* Structural Card Footer Action Zone */}
      <div className="pt-4 border-t border-zinc-200/60 dark:border-[#1a3d61]/50 flex items-center justify-between mt-auto">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-bold">
            Total Price
          </p>
          <p className="text-xl font-black text-[#124170] dark:text-[#AAFFC7]">
            ৳{booking.totalPrice}
          </p>
        </div>

        {/* Action Triggers Grid mapping perfectly to dark/light modes */}
        {isPaid ? (
          <span className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#67C090]/10 text-[#124170] dark:text-[#AAFFC7] border border-[#67C090]/30 text-[11px] font-black uppercase tracking-widest shadow-sm">
            <FaCheckCircle size={12} className="text-[#67C090]" /> Paid Clear
          </span>
        ) : booking.status === "accepted" && !isExpired ? (
          <Button
            onPress={handleMakePayment}
            className="bg-[#124170] text-white hover:bg-[#0f355c] dark:bg-[#00ADB5] dark:text-[#091624] dark:hover:bg-[#009299] font-black uppercase text-xs px-5 h-9 rounded-xl shadow-md transition-all active:scale-95"
          >
            Pay Now
          </Button>
        ) : booking.status === "accepted" && isExpired ? (
          <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl bg-red-500/10 text-red-600 border border-red-500/30 dark:text-red-400">
            Expired
          </span>
        ) : null}
      </div>
    </Card>
  );
};

export default BookingCard;
