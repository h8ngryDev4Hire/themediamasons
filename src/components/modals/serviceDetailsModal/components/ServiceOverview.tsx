import { ServiceIcon } from './ServiceIcon';
import { LucideIcon } from 'lucide-react';

export interface ServiceOverviewProps {
    name: string;
    description: string;
    iconType?: 'lucide' | 'custom';
    lucideIcon?: string;
    customIconUrl?: string;
    Icon?: LucideIcon;
}

export const ServiceOverview = ({ name, description, iconType, lucideIcon, customIconUrl, Icon }: ServiceOverviewProps) => {
    return (
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8 space-y-6 sm:space-y-0 sm:space-x-6 w-full">
            {/* Icon Container - Elegant styling with subtle backdrop */}
            <div className="flex-shrink-0 p-5 bg-gradient-to-br from-black/50 to-purple-900/10 backdrop-blur-sm border border-purple-500/10 rounded-xl shadow-lg shadow-purple-500/5 transition-all duration-300">
                <ServiceIcon 
                    name={name}
                    iconType={iconType}
                    lucideIcon={lucideIcon}
                    customIconUrl={customIconUrl}
                    Icon={Icon}
                />
            </div>
            
            {/* Content Container - Clean layout with better typography */}
            <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                <h3 className="text-lg font-medium text-purple-300 mb-3">Overview</h3>
                <p className="text-gray-300 leading-relaxed max-w-prose">{description}</p>
            </div>
        </div>
    );
}; 