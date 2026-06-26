"use client";
import { FaShieldAlt, FaHeadset, FaTags } from "react-icons/fa";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <FaShieldAlt size={32} />,
      title: "Secure Transactions",
      desc: "All payments are processed through enterprise-grade Stripe encryption.",
    },
    {
      icon: <FaTags size={32} />,
      title: "Verified Vendors",
      desc: "Every ticket goes through strict admin approval to prevent fraud.",
    },
    {
      icon: <FaHeadset size={32} />,
      title: "24/7 Support",
      desc: "Our passenger support team is available round the clock.",
    },
  ];

  return (
    <section className="py-20 relative z-10 max-w-7xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-white">
          Why Choose <span className="text-[#00ADB5]">Tikify</span>
        </h2>
        <div className="w-24 h-1 bg-[#AAFFC7] mx-auto mt-4 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feat, idx) => (
          <div
            key={idx}
            className="bg-[#102226]/40 backdrop-blur-xl border border-[#1a3d61] p-8 rounded-3xl text-center hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="w-16 h-16 mx-auto bg-[#00ADB5]/10 text-[#00ADB5] rounded-2xl flex items-center justify-center mb-6 border border-[#00ADB5]/20 shadow-lg">
              {feat.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed">
              {feat.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
