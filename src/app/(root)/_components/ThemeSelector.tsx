'use client'

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon, CircleOff, Cloud, Github, Laptop, Moon, Palette, Sun } from "lucide-react";
import useMounted from "@/hooks/useMounted";

const THEME_ICONS: Record<string, React.ReactNode> = {
  "vs-dark": <Moon className="size-4" />,
  "vs-light": <Sun className="size-4" />,
  "github-dark": <Github className="size-4" />,
  monokai: <Laptop className="size-4" />,
  "solarized-dark": <Cloud className="size-4" />,
};

const ThemeSelector = () => {
  const [isOpen, setOpen] = useState(false);
  const { theme, setTheme } = useCodeEditorStore();
  const mounted = useMounted();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!mounted) return null;


  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((prev) => !prev)}
        className="group relative flex items-center gap-2 px-4 py-2 bg-[#171a37]  hover:bg-[#262637] rounded-lg transition-all duration-200 border border-neutral-700/50 hover:border-neutral-700 text-sm"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

        <Palette className=" size-6 text-neutral-400 group-hover:text-neutral-300 transition-opacity" />
        <span className="text-neutral-300 min-w-[80px] text-left group-hover:text-white transition-colors text-sm">
          {currentTheme?.label || "Select Theme"}
        </span>
        <ChevronDownIcon className={`size-4 transition-all text-neutral-200 group-hover:text-neutral-300 ${isOpen ? "rotate-180" : ""}`} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 left-0 min-w-[240px] bg-[#1e1e2e]/95 backdrop-blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            <div className="px-2 pb-2 mb-2 border-b border-neutral-800/50">
              <p className="text-sm font-medium text-neutral-400">Select Theme</p>
            </div>

            {THEMES.map((themes, idx) => (
              <motion.button
                key={themes.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#262637] transition-all duration-200 ${theme === themes.id ? "bg-transparent text-blue-400" : "text-neutral-300"
                  }`}
                onClick={() => {
                  setTheme(themes.id);
                  setOpen(false);
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div
                  className={`flex items-center justify-center size-8 rounded-lg ${theme === themes.id
                    ? "bg-blue-500/10 text-blue-400"
                    : "bg-neutral-800 text-neutral-400"
                    } group-hover:scale-110 transition-all duration-200`}
                >
                  {THEME_ICONS[themes.id] || <CircleOff className="w-4 h-4" />}
                </div>
                <span className="flex-1 text-sm text-left group-hover:text-white transition-colors">
                  {themes.label}
                </span>
                <div
                  className="relative size-4 rounded-full border border-neutral-600 group-hover:border-neutral-500 transition-colors"
                  style={{ background: themes.color }}
                >
                  {theme === themes.id && (
                    <motion.div
                      className="absolute inset-0 border-2 border-blue-500/30 rounded-lg"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSelector;
