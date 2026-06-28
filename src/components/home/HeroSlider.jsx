"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRight, FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1920",
    title: "Premium Fleet Travel",
    subtitle:
      "Experience luxury and comfort across our network of verified transport vectors.",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1483450388369-9ed95738483c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Seamless Flight Systems",
    subtitle:
      "Book domestic and regional flights instantly with guaranteed seat allocation.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1644770633699-5129770e0404?q=80&w=1604&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Luxury Cruise Lines",
    subtitle:
      "Navigate the waters in our top-tier launch cabins with elite amenities.",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[75vh] min-h-[550px] overflow-hidden border-b border-zinc-200/60 dark:border-[#1a3d61] shadow-2xl">
      {/* Custom CSS for Swiper enhancements: 
        1. Pill-shaped active pagination dot
        2. Slow Ken Burns zoom effect on the image
        3. Slide-up fade-in animation for the text content 
      */}
      <style>{`
        .hero-swiper .swiper-pagination-bullet {
          background-color: #ffffff;
          opacity: 0.4;
          width: 8px;
          height: 8px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-swiper .swiper-pagination-bullet-active {
          background-color: #00ADB5;
          opacity: 1;
          width: 32px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 173, 181, 0.5);
        }
        .hero-swiper .swiper-slide img {
          transform: scale(1);
          transition: transform 8s ease-out;
        }
        .hero-swiper .swiper-slide-active img {
          transform: scale(1.08);
        }
        .hero-swiper .swiper-slide .hero-content {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
        }
        .hero-swiper .swiper-slide-active .hero-content {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full hero-swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full bg-[#091624]">
              {/* Background Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover opacity-90"
              />

              {/* Rich Multi-layered Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 dark:from-[#091624]/95 dark:via-[#091624]/70 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 dark:from-[#091624]/80 via-transparent to-transparent" />

              {/* Content Container */}
              <div className="absolute inset-0 flex items-center px-6 md:px-20 container mx-auto">
                <div className="max-w-2xl hero-content">
                  {/* Premium Badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 dark:bg-[#124170]/30 backdrop-blur-md border border-white/20 dark:border-[#00ADB5]/30 text-white dark:text-[#AAFFC7] text-xs font-bold uppercase tracking-widest mb-6 shadow-lg">
                    <FaStar
                      className="text-[#00ADB5] dark:text-[#AAFFC7]"
                      size={10}
                    />
                    <span>Tikify Exclusive</span>
                  </div>

                  {/* Text Details */}
                  <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-2xl leading-[1.1]">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-zinc-200 dark:text-zinc-300 font-medium mb-10 max-w-lg drop-shadow-md leading-relaxed border-l-2 border-[#00ADB5] pl-4 ml-1">
                    {slide.subtitle}
                  </p>

                  {/* Action Button */}
                  <Link href="/all-tickets">
                    <Button
                      size="lg"
                      className="bg-[#00ADB5] hover:bg-[#009299] text-white dark:text-[#091624] font-black uppercase tracking-widest rounded-full h-14 px-8 shadow-[0_0_40px_-10px_rgba(0,173,181,0.6)] transition-transform hover:scale-105"
                      endContent={<FaArrowRight className="ml-2" />}
                    >
                      Explore Tickets
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
