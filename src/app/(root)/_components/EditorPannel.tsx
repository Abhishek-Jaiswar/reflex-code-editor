'use client';

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Editor } from "@monaco-editor/react";
import { useClerk } from "@clerk/nextjs";
import { EditorPannelSkeleton } from "./EditorPannelSkeleton";
import useMounted from "@/hooks/useMounted";


const EditorPannel = () => {
  const clerk = useClerk();
  const [setIsShareModalOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } = useCodeEditorStore();

  const mounted = useMounted();

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode || LANGUAGE_CONFIG[language].defaultCode;
    if (editor) {
      editor.setValue(newCode);
    }
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
    };
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language].defaultCode;
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  }

  const handleShare = () => {
    setIsShareModalOpen(true);
  }

  const handleFontSizeChange = (e: number) => {
    const size = Math.min(Math.max(e, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", e.toString());
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      localStorage.setItem(`editor-code-${language}`, value);
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl bg-gradient-to-r from-transparent via-blue-500/50 to-transparent p-6">
        {/* header */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image
                src={"/" + language + ".png"}
                alt="logo"
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-blue-200">Code Editor</h2>
              <p className="text-xs text-blue-300">Write and execute your code</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 px-3 py-2 bg-[#2121356b] rounded-lg ring-2 ring-white/5">
              <TypeIcon className="size-4 text-neutral-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={12}
                  max={24}
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(parseInt(e.target.value))}
                  className="text-sm font-medium text-gray-700 cursor-pointer bg-gradient-to-r from-blue-500/80 to-violet-500/50 w-24 h-[5px] rounded-full"
                />
                <span className="text-sm font-medium text-neutral-400 min-w-[2rem] text-center">
                  {fontSize}px
                </span>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleRefresh()}
              className="p-2.5 bg-[#2121356b] hover:bg-[#212135b2] rounded-lg ring-2 ring-white/5"
              area-label="Reset to default code">
              <RotateCcwIcon className="size-4 text-neutral-300" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleShare}
              className="px-4 py-1.5 flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-600 rounded-lg ring-1 ring-white/5"
            >
              <ShareIcon className="size-4 text-white" />
              <span>Share</span>
            </motion.button>
          </div>
          <div className="absolute top-[4.2rem] w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
        </div>
        {/* Editor container */}
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/5">
          {clerk.loaded &&
            <Editor
              height={"500px"}
              language={LANGUAGE_CONFIG[language].monacoLanguage}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={defineMonacoThemes}
              onMount={(editor) => setEditor(editor)}

              options={{
                minimap: { enabled: true },
                fontSize: fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextMenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,

                },
              }}
            />
          }
          {!clerk.loaded && <EditorPannelSkeleton />}
        </div>
      </div>
    </div>
  )
};

export default EditorPannel