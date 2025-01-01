'use client'

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react"
import { THEMES } from "../_constants";
import { AnimatePresence, motion } from 'framer-motion'
import { Palette } from "lucide-react";


const ThemeSelector = () => {
  const [isOpen, setOpen] = useState(false);
  const [theme, setTheme] = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentTheme = THEMES.find((t) => t.id === theme);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [])
  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen(prev => !prev)}
        className="w-48 group relative flex items-center gap-2 px-4 py-2.5 bg-[#1e1e2e]/80 hover:bg-[#262637] rounded-lg transition-all duration-200 border border-neutral-800/50 hover:border-neutral-700"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
          <Palette className="w-4 h-4 text-neutral-400 group-hover:text-neutral-300 transition-opacity" />

          <span className="text-neutral-300 min-w-[80px] text-left group-hover:text-white transition-colors">
            {currentTheme?.label}
          </span>
        </div>

      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 border-neutral-800/50 min-[240px] bg-[#1e1e2e]/95 backdrop:blur-xl rounded-xl border border-[#313244] shadow-2xl py-2 z-50"
          >
            <div className="px-2 pb-2 mb-2 border-b border-neutral-800/50">
              <p className="text-xs font-medium text-neutral-400 px2">Select Theme</p>
            </div>

            {THEMES.map((themes, idx) => (
              <motion.button
                key={themes.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: idx * 0.1 }}
                className={`
              relative group w-full flex items-center gap-3 px-3 py-2.5 hover:bg-[#262637] transition-all duration-200
              ${theme === themes.id ? "bg-blue-500/50 text-blue-400" : "text-neutral-300"}
              `}
                onClick={() => setTheme(themes.id)}
              >
                <div className=" absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/50 opacity-0 group-hover:opacity-100 transition-opacity">

                </div>
              </motion.button>
            ))}

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSelector