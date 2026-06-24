"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button, Card } from "@heroui/react";
import { FaEdit, FaEnvelope, FaCalendarAlt, FaUserTag } from "react-icons/fa";
import EditProfileModal from "@/components/dashboard/EditProfileModal";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const ProfileClient = ({ initialProfile }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileUpdated = (updatedData) => {
    setProfile(updatedData);
  };

  const joinDate = profile?.createdAt?.["$date"] || profile?.createdAt;
  const formattedDate = joinDate
    ? new Date(joinDate).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="mt-8 relative z-10 max-w-3xl mx-auto w-full">
      <motion.div variants={containerVariants} initial="hidden" animate="show">
        <Card className="w-full overflow-hidden bg-white/70 dark:bg-[#124170]/20 backdrop-blur-xl rounded-3xl border border-zinc-200/60 dark:border-[#1a3d61] shadow-2xl transition-all duration-300">
          {/* Custom Aesthetic Header Banner */}
          <div className="relative h-44 w-full bg-gradient-to-r from-[#102226] via-[#00ADB5]/40 to-[#452C20] overflow-hidden border-b border-zinc-200/60 dark:border-[#1a3d61]/60">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
          </div>

          <div className="px-6 sm:px-8 pb-10 relative">
            {/* Avatar Section - Fixed Responsiveness */}
            <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-end -mt-16 mb-8 gap-4 sm:gap-0">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-[6px] border-white dark:border-[#091624] overflow-hidden bg-zinc-100 dark:bg-[#0b1d30] shadow-xl ring-4 ring-[#00ADB5]/20">
                  <img
                    src={
                      profile?.image || "https://i.ibb.co/67J8dkMD/sdfdsf.jpg"
                    }
                    alt={profile?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute bottom-2 right-2 w-5 h-5 bg-[#00ADB5] rounded-full border-2 border-white dark:border-[#091624]"
                  title="Active Status"
                />
              </div>

              {/* Button standardized to project aesthetics */}
              <Button
                onPress={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center text-xs font-bold tracking-wider uppercase bg-[#124170] dark:bg-[#67C090] text-white dark:text-[#124170] rounded-full shadow-md dark:shadow-none px-6 h-11 transition-all duration-300 hover:opacity-90 active:scale-[0.985] select-none w-full sm:w-auto"
              >
                <FaEdit className="mr-1.5" /> Edit Profile
              </Button>
            </div>

            {/* Profile Information Grid */}
            <div className="space-y-1 mb-10 text-center sm:text-left mt-2 sm:mt-0">
              <h1 className="text-2xl lg:text-3xl font-black uppercase tracking-wider text-[#124170] dark:text-zinc-100">
                {profile?.name}
              </h1>
              <p className="text-xs font-bold text-[#00ADB5] uppercase tracking-widest flex items-center justify-center sm:justify-start gap-1.5 mt-1">
                <FaUserTag /> {profile?.role || "User"}
              </p>
            </div>

            {/* Project Standard 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-[#124170]/10 border border-zinc-200/60 dark:border-[#1a3d61]/60 select-none">
                <div className="w-12 h-12 rounded-full bg-[#124170]/10 dark:bg-[#00ADB5]/10 flex items-center justify-center text-[#124170] dark:text-[#00ADB5] shrink-0">
                  <FaEnvelope size={18} />
                </div>
                <div className="overflow-hidden">
                  <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase block mb-1">
                    Email Address
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                    {profile?.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-50 dark:bg-[#124170]/10 border border-zinc-200/60 dark:border-[#1a3d61]/60 select-none">
                <div className="w-12 h-12 rounded-full bg-[#124170]/10 dark:bg-[#00ADB5]/10 flex items-center justify-center text-[#124170] dark:text-[#00ADB5] shrink-0">
                  <FaCalendarAlt size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 tracking-wide uppercase block mb-1">
                    Member Since
                  </p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {formattedDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <EditProfileModal
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
        profileData={profile}
        onSuccess={handleProfileUpdated}
      />
    </div>
  );
};

export default ProfileClient;
