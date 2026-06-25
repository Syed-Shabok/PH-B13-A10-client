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

  // Live Countdown Logic (Now including seconds)
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

      // Pad seconds with a leading zero if less than 10 for a cleaner look
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${formattedSeconds}s`);
    };

    calculateTimeLeft(); // Initial calculation
    const timer = setInterval(calculateTimeLeft, 1000); // Update every second now
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

  // Check if paid either through standard status or the specific paymentStatus field
  const isPaid =
    booking?.paymentStatus === "paid" || booking?.status === "paid";

  return (
    <Card
      key={booking._id}
      className="bg-[#102226]/40 backdrop-blur-xl border border-[#1a3d61] p-5 flex flex-col justify-between h-full rounded-3xl shadow-xl"
    >
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-white text-lg line-clamp-1 pr-2">
            {booking.ticketTitle}
          </h3>
          <StatusBadge status={booking.status} />
        </div>

        <div className="space-y-2.5 text-sm text-zinc-400 mb-6 border-l-2 border-[#00ADB5]/30 pl-3">
          <p>
            <span className="text-zinc-500 font-semibold">Route:</span>{" "}
            {booking.from} → {booking.to}
          </p>
          <p>
            <span className="text-zinc-500 font-semibold">Departure:</span>{" "}
            {new Date(booking.departureDateTime).toLocaleString([], {
              dateStyle: "short",
              timeStyle: "short",
            })}
          </p>
          <p>
            <span className="text-zinc-500 font-semibold">Seats:</span>{" "}
            {booking.bookingQuantity}
          </p>

          {/* Countdown Display */}
          <div className="flex items-center gap-2 pt-1">
            <span className="text-zinc-500 font-semibold flex items-center gap-1.5">
              <FaHourglassHalf className="text-[#00ADB5] text-xs" /> Time Left:
            </span>
            <span
              className={`font-bold tabular-nums tracking-wide ${isExpired ? "text-red-400" : "text-[#AAFFC7]"}`}
            >
              {timeLeft}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5 flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            Total
          </p>
          <p className="text-xl font-black text-[#AAFFC7]">
            ৳{booking.totalPrice}
          </p>
        </div>

        {/* Action Area: Paid Badge vs Pay Now Button */}
        {isPaid ? (
          <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#00ADB5]/10 text-[#00ADB5] border border-[#00ADB5]/20 text-xs font-black uppercase tracking-wider shadow-sm">
            <FaCheckCircle size={14} /> Payment Clear
          </span>
        ) : booking.status === "accepted" && !isExpired ? (
          <Button
            onPress={handleMakePayment}
            className="bg-[#00ADB5] hover:bg-[#009299] text-[#091624] font-black uppercase text-xs px-6 rounded-xl shadow-md transition-transform active:scale-95"
          >
            Pay Now
          </Button>
        ) : booking.status === "accepted" && isExpired ? (
          <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
            Expired
          </span>
        ) : null}
      </div>
    </Card>
  );
};

export default BookingCard;
