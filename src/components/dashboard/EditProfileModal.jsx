"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { uploadImage } from "@/utils/uploadImage";
import { updateUser } from "@/lib/actions/users";
import toast from "react-hot-toast";
import { FaImage, FaUser } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const EditProfileModal = ({ isOpen, onOpenChange, profileData, onSuccess }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Simplified: No need for reset or useEffect when relying on defaultValue in a conditional render
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const payload = {
        name: data.name,
      };

      // Handle image upload if a new file was selected
      if (data.image && data.image[0]) {
        const uploadToast = toast.loading("Uploading new profile image...");
        const imageUrl = await uploadImage(data.image[0]);
        toast.dismiss(uploadToast);

        if (imageUrl) {
          payload.image = imageUrl;
        } else {
          toast.error("Failed to upload image. Try again.");
          return;
        }
      }

      const result = await updateUser(payload, profileData?.email);

      if (result?.modifiedCount > 0) {
        toast.success("Profile updated successfully!");
        if (onSuccess) onSuccess({ ...profileData, ...payload });
        onOpenChange(false);
        router.refresh();
      } else {
        toast.error("No changes were detected.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full h-11 px-3.5 rounded-xl bg-zinc-100/80 dark:bg-[#0b1d30]/80 border border-zinc-200/80 dark:border-[#1a3d61] text-sm font-medium text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:border-[#00ADB5] focus:ring-1 focus:ring-[#00ADB5] hover:border-zinc-300 dark:hover:border-[#235384] transition-all";

  const labelClass =
    "text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 mb-1.5 block";

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => onOpenChange(false)}
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", duration: 0.35, bounce: 0.15 }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-[#00ADB5]/20 bg-white dark:bg-[#102226] p-6 shadow-[0_0_40px_-10px_rgba(0,173,181,0.2)] max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="mb-6 pb-4 border-b border-zinc-100 dark:border-white/5">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                Edit Profile
              </h2>
              <p className="text-xs font-normal text-zinc-500 dark:text-zinc-400 mt-1">
                Update your personal information and profile avatar.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label className={labelClass}>Full Name</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                    <FaUser className="text-sm" />
                  </span>
                  <input
                    defaultValue={profileData?.name}
                    placeholder="Enter your full name"
                    className={`${inputClass} pl-9`}
                    {...register("name", { required: "Name is required" })}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5 font-medium pl-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className={labelClass}>Profile Image</label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
                    <FaImage className="text-sm" />
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className={`${inputClass} pt-2.5 pl-9 cursor-pointer file:hidden`}
                    {...register("image")}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Email Address (Readonly)</label>
                <input
                  defaultValue={profileData?.email}
                  disabled
                  className="w-full h-11 px-3.5 rounded-xl bg-zinc-200/50 dark:bg-[#091624]/60 border border-zinc-200/50 dark:border-[#1a3d61]/50 text-sm font-medium text-zinc-500 dark:text-zinc-500 cursor-not-allowed"
                />
              </div>

              <div className="flex gap-3 justify-end pt-5 border-t border-zinc-100 dark:border-white/5 mt-2">
                <Button
                  size="sm"
                  type="button"
                  onPress={() => onOpenChange(false)}
                  className="bg-zinc-200/50 dark:bg-white/5 hover:bg-zinc-200 dark:hover:bg-white/10 text-zinc-700 dark:text-zinc-300 font-semibold px-5 h-10 rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  type="submit"
                  isLoading={loading}
                  className="bg-[#00ADB5] hover:bg-[#009299] text-white font-bold px-5 h-10 rounded-xl shadow-md transition-all"
                >
                  Save Profile
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditProfileModal;
