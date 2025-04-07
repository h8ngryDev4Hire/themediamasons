export interface ContactCTAProps {
    onClick: () => void;
    isVisible: boolean;
}

export const ContactCTA = ({ onClick, isVisible }: ContactCTAProps) => {
    return (
        <div className={`
            flex justify-center mt-6
            transition-all duration-300 ease-in-out
            ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
            w-full
        `}
        style={{ transitionDelay: "150ms" }}
        >
            <button 
                onClick={onClick}
                className={`
                    transition-all duration-300 ease-in-out
                    h-12 w-full sm:w-auto sm:px-8
                    rounded-xl 
                    text-base font-medium
                    text-white
                    bg-gradient-to-r from-purple-600/90 to-indigo-700/90
                    hover:from-purple-500 hover:to-indigo-600
                    shadow-md hover:shadow-lg hover:shadow-purple-500/10
                    border border-purple-500/10
                    flex items-center justify-center
                    hover:scale-[0.98]
                    max-w-xs
                `}
            >
                Get in Touch
            </button>
        </div>
    );
}; 