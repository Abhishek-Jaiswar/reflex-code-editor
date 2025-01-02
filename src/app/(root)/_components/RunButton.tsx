'use client'

import { Loader, PlayIcon } from 'lucide-react'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { useCodeEditorStore } from '@/store/useCodeEditorStore'
import { motion } from 'framer-motion'

const RunButton = () => {
    const { user } = useUser();
    const { runCode, isRunning, executionResult } = useCodeEditorStore();

    const handleRun = async () => {
        await runCode();

        if (user && executionResult) {
            //todo
        }
    }

    return (
        <motion.button
            onClick={handleRun}
            disabled={isRunning}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className=" relative group px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 disabled:cursor-not-allowed">
            <div className='absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-md opacity-100 transition-opacity group-hover:opacity-90' />
            <div className='relative flex items-center gap-2'>
                {isRunning ? (
                    <div className='relative flex items-center justify-center gap-2'>
                        <Loader className=' size-4 animate-spin text-white/70' />
                        <div className='absolute inset-0 blur animate-pulse' />
                        <span className='text-sm font-medium text-white/90'>Executing</span>
                    </div>
                ) : (
                    <>
                        <div className='relative flex items-center justify-center size-4'>
                            <PlayIcon className=' size-4 text-white/90 transition-transform group-hover:scale-110 group-hover:text-white' />
                        </div>
                        <span className='text-sm font-medium text-white/90 group-hover:text-white'>Run Code</span>
                    </>
                )}
            </div>
        </motion.button>
    )
}

export default RunButton