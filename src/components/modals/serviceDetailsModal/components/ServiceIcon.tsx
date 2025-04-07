import { LucideIcon } from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import Image from 'next/image'

export interface ServiceIconProps {
    name: string;
    iconType?: 'lucide' | 'custom';
    lucideIcon?: string;
    customIconUrl?: string;
    Icon?: LucideIcon; // Added for backward compatibility
}

export const ServiceIcon = ({ name, iconType, lucideIcon, customIconUrl, Icon }: ServiceIconProps) => {
    // Get the appropriate Lucide icon component
    const getLucideIcon = (): LucideIcon | null => {
        if (Icon) {
            return Icon; // Use provided Icon (backward compatibility)
        }
        if (iconType === 'lucide' && lucideIcon && lucideIcon in LucideIcons) {
            return LucideIcons[lucideIcon as keyof typeof LucideIcons] as LucideIcon;
        }
        return null;
    }

    const LucideIconComponent = getLucideIcon();

    if (LucideIconComponent) {
        return (
            <div className="flex items-center justify-center transition-all duration-300">
                <LucideIconComponent className="w-12 h-12 text-purple-400 transition-all duration-300 hover:text-purple-300" />
            </div>
        );
    } else if (iconType === 'custom' && customIconUrl) {
        return (
            <div className="flex items-center justify-center transition-all duration-300">
                <Image 
                    src={customIconUrl} 
                    alt={name}
                    width={48} 
                    height={48}
                    className="w-12 h-12 transition-all duration-300 filter hover:brightness-110"
                />
            </div>
        );
    }
    
    // Fallback icon - using the default service icon instead of a character
    return (
        <div className="flex items-center justify-center transition-all duration-300">
            <Image 
                src={'/icons/default-service.svg'} 
                alt={name}
                width={48}
                height={48}
                className="w-12 h-12 transition-all duration-300 filter hover:brightness-110"
            />
        </div>
    );
}; 