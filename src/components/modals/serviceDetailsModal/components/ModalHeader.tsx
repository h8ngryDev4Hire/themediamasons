import { bangers } from '@ui/fonts'
import { X } from 'lucide-react'

export interface ModalHeaderProps {
    title: string;
    onClose: () => void;
}

export const ModalHeader = ({ title, onClose }: ModalHeaderProps) => {
    return (
        <div 
            id="modal-title-section"
            className="flex justify-between items-center w-full px-2 pb-4 mb-4 border-b border-zinc-800/70"
        >
            <h2 
                id="modal-title"
                className={`${bangers.className} text-3xl text-purple-200`}
            >
                {title}
            </h2>
            <button 
                id="exit-modal-btn" 
                className="rounded-full p-1.5 transition-all duration-200 hover:bg-zinc-700/50 flex items-center justify-center"
                onClick={onClose}
                aria-label="Close modal"
            >
                <X size={20} className="text-zinc-400 hover:text-white transition-colors duration-200" />
            </button>
        </div>
    );
}; 