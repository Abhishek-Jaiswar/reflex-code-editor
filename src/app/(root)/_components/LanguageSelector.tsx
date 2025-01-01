'use client'

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useRef, useState } from "react";
import { LANGUAGE_CONFIG } from "../_constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { ChevronDownIcon, Lock, Sparkles } from "lucide-react";
import useMounted from "@/hooks/useMounted";


const LanguageSelector = ({ hasAccess }: { hasAccess: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useCodeEditorStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLanguageObj = LANGUAGE_CONFIG[language];
  const mounted = useMounted();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (languageId: string) => {
    if (!hasAccess && languageId !== "javascript") return;
    setLanguage(languageId);
    setIsOpen(false);
  }

  if (!mounted) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`group relative flex items-center gap-3 px-4 py-2 bg-[#171a37] rounded-lg transition-all duration-200 border border-neutral-700/50 hover:border-gray-700 ${!hasAccess && language !== "javascript" ? 'opacity-50 cursor-not-allowed' : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/50 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />

        <div className="size-6 rounded-md bg-neutral-800/50 group-hover:scale-110 transition-transform ">
          <Image
            src={currentLanguageObj.logoPath}
            alt="programming language logo"
            width={24}
            height={24}
            className="rounded-md w-full h-full object-contain z-10"
          />
        </div>
        <span className="text-neutral-200 font-medium min-w-[80px] text-left group-hover:text-white transition-colors">
          {currentLanguageObj.label}
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
            <div className="px-3 pb-2 mb-2 border-b border-[#313244]">
              <p className="text-sm text-neutral-400 font-medium">Select Language</p>
            </div>
            <div className="max-h-[280px] overflow-y-auto overflow-x-hidden pl-2 pr-5">
              {Object.values(LANGUAGE_CONFIG).map((lang, index) => {
                const isLocked = !hasAccess && lang.id !== "javascript";
                return (
                  <motion.button
                    key={lang.id}
                    transition={{ delay: index * 0.1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`relative flex w-full items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200
                      ${language === lang.id ? "bg-blue-500/5 border border-blue-500/50 text-blue-400" : "text-neutral-500"}
                      ${isLocked ? "opacity-50 " : "hover:bg-[#22223ec4]"}`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className={` relative size-8 rounded-lg p-1.5 group-hover:scale-110 transition-transform ${language === lang.id ? " bg-blue500/10" : "bg-neutral-800/50"}`}>
                      <Image
                        src={lang.logoPath}
                        alt="programming language logo"
                        width={24}
                        height={24}
                        className="rounded-md w-full h-full object-contain z-10"
                      />
                    </div>
                    <span className="flex-1 text-left group-hover:text-white transition-colors">
                      {lang.label}
                    </span>

                    {language === lang.id && (
                      <motion.div
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6
                        }}
                      />
                    )}

                    {isLocked ? (
                      <Lock className="size-4 text-neutral-500" />
                    ) : (
                      language === lang.id && (
                        <Sparkles className="size-4 text-blue-400 animate-pulse" />
                      )
                    )}
                  </motion.button>
                )
              })}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LanguageSelector