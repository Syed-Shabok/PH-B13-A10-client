"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Button } from "@heroui/react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

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
      "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?q=80&w=1920",
    title: "Seamless Flight Systems",
    subtitle:
      "Book domestic and regional flights instantly with guaranteed seat allocation.",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1920",
    title: "Luxury Cruise Lines",
    subtitle:
      "Navigate the waters in our top-tier launch cabins with elite amenities.",
  },
];

export default function HeroSlider() {
  return (
    <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden rounded-b-[3rem] border-b border-[#1a3d61] shadow-2xl">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Dark Glass Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#091624]/90 via-[#0b1d30]/60 to-transparent" />

              <div className="absolute inset-0 flex items-center px-6 md:px-20 max-w-7xl mx-auto">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-4 drop-shadow-lg">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl text-[#AAFFC7] font-semibold mb-8 max-w-lg drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <Link href="/all-tickets">
                    <Button
                      size="lg"
                      className="bg-[#00ADB5] hover:bg-[#009299] text-[#091624] font-black uppercase tracking-widest rounded-2xl h-14 px-8 shadow-[0_0_40px_-10px_rgba(0,173,181,0.5)] transition-all"
                      endContent={<FaArrowRight />}
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
