"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />;
  }

  const isDark = theme === "dark";

  return (
    <Button
      isIconOnly
      radius="full"
      variant="light"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`w-10 h-10 transition-all duration-300 ease-in-out border ${
        isDark
          ? "text-[#AAFFC7] border-gray-800 hover:bg-[#215B63]/40 hover:text-[#67C090]"
          : "text-[#215B63] border-gray-100 hover:bg-[#67C090]/10 hover:text-[#124170]"
      }`}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Moon className="size-5 transition-transform duration-500 rotate-0 scale-100 animate-appearance-in" />
        ) : (
          <Sun className="size-5 transition-transform duration-500 rotate-0 scale-100 animate-appearance-in" />
        )}
      </div>
    </Button>
  );
};

export default ThemeToggle;
