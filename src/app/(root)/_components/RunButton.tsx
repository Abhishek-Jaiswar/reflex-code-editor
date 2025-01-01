import { PlayIcon } from 'lucide-react'
import React from 'react'

const RunButton = () => {
    return (
        <button className="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-sm font-medium flex items-center gap-2">
            <PlayIcon className="size-4" />
            Run Code
        </button>
    )
}

export default RunButton