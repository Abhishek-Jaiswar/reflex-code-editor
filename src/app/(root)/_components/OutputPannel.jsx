"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Copy,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import RunningCodeSkeleton from "./RunningCodeSkeleton";

const OutputPannel = () => {
  const { output, error, isRunning } = useCodeEditorStore();
  const [copied, setCopied] = useState(false);

  const hasContent = output || error;

  const handleCopy = async () => {
    if (!hasContent) return;
    await navigator.clipboard.writeText(error || output || "");
    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative bg-[#181825] rounded-xl p-4 ring-1 ring-gray-800/50">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-7 h-7 rounded-md bg-[#141425] ring-1 ring-gray-800/50">
            <Terminal className="size-4 text-blue-500" />
          </div>
          <span className="text-sm font-medium text-neutral-400">Output</span>
        </div>

        {hasContent && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-4 py-2 text-xs font-medium text-blue-400 bg-[#121225] rounded-lg ring-1 ring-gray-800/50 transition-all duration-200 hover:bg-[#171730]"
          >
            {copied ? (
              <>
                <CheckCircle className="size-4 text-green-500" />
                Copied
              </>
            ) : (
              <>
                <Copy className="size-4" />
                Copy
              </>
            )}
          </button>
        )}
      </div>

      {/* Output */}
      <div className="relative">
        <div className="relative bg-[#1d1d2b] backdrop-blur-sm border border-[#313244] rounded-xl p-4 h-[500px] overflow-y-auto font-mono text-sm">
          {isRunning ? (
            <RunningCodeSkeleton />
          ) : (
            <>
              {error && (
                <div className="flex items-start gap-3 text-red-400">
                  <AlertTriangle className="size-6 flex-shrink-0 mt-1 text-red-500" />
                  <div>
                    <div className="font-medium">Execution Error</div>
                    <pre className="whitespace-pre-wrap text-red-400/80">
                      {error}
                    </pre>
                  </div>
                </div>
              )}
              {output ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-green-400">
                    <CheckCircle className="size-6 flex-shrink-0 mt-1 text-green-500" />
                    <span>Execution Successful</span>
                  </div>
                  <pre className="whitespace-pre-wrap text-neutral-400">
                    {output}
                  </pre>
                </div>
              ) : (
                !error && (
                  <div className=" h-full flex flex-col items-center justify-center gap-2 text-neutral-400">
                    <Clock className="size-6 text-neutral-400" />
                    <p className="text-center">
                      Run your code to see the output...
                    </p>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputPannel;
