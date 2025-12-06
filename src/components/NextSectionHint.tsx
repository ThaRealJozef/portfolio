import { ChevronDown } from 'lucide-react';
import { memo } from 'react';

interface NextSectionHintProps {
    message: string;
    onClick: () => void;
    emoji?: string;
}

function NextSectionHint({ message, onClick, emoji = '👇' }: NextSectionHintProps) {
    return (
        <div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-4 pt-16 cursor-pointer md:hidden z-20"
            style={{
                background: 'linear-gradient(to top, rgba(15, 23, 42, 1) 0%, rgba(15, 23, 42, 0.9) 40%, transparent 100%)'
            }}
            onClick={onClick}
        >
            <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full animate-bounce">
                <span className="text-xs text-indigo-300 font-medium">{message}</span>
                <span className="text-sm">{emoji}</span>
            </div>
            <div className="flex flex-col items-center -space-y-1 opacity-60 mt-1">
                <ChevronDown className="w-4 h-4 text-indigo-400" />
                <ChevronDown className="w-4 h-4 text-indigo-400" />
            </div>
        </div>
    );
}

export default memo(NextSectionHint);
