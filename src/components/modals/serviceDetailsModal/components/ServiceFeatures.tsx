import { useEffect, useState } from 'react';

export interface ServiceFeaturesProps {
    dataPoints?: string[];
}

export const ServiceFeatures = ({ dataPoints }: ServiceFeaturesProps) => {
    const [visibleDataPoints, setVisibleDataPoints] = useState<string[]>([]);
    const [dataPointIndex, setDataPointIndex] = useState(0);

    // Effect for rotating data points every 3 seconds
    useEffect(() => {
        if (!dataPoints?.length) return;
        
        const totalPoints = dataPoints.length;
        
        const rotateDataPoints = () => {
            if (totalPoints <= 3) {
                setVisibleDataPoints(dataPoints);
                return;
            }
            
            setDataPointIndex(prevIndex => {
                const newIndex = (prevIndex + 1) % (totalPoints - 2);
                setVisibleDataPoints(dataPoints.slice(newIndex, newIndex + 3));
                return newIndex;
            });
        };
        
        // Initial set
        if (totalPoints <= 3) {
            setVisibleDataPoints(dataPoints);
        } else {
            setVisibleDataPoints(dataPoints.slice(0, 3));
        }
        
        // Set up rotation interval
        const rotationInterval = setInterval(rotateDataPoints, 3000);
        
        return () => clearInterval(rotationInterval);
    }, [dataPoints]);

    if (!dataPoints || dataPoints.length === 0) return null;

    return (
        <div className="mb-10 flex flex-col items-center sm:items-start text-center sm:text-left w-full">
            <h3 className="text-lg font-medium text-purple-300 mb-5">Key Features</h3>
            <div className="space-y-4 w-full max-w-lg">
                {visibleDataPoints.map((point, index) => (
                    <div 
                        key={index} 
                        className="flex items-start transition-all duration-300"
                        style={{ transitionDelay: `${index * 100}ms` }}
                    >
                        <div className="flex-shrink-0 h-6 w-6 rounded-full bg-gradient-to-br from-purple-900/20 to-black/20 border border-purple-500/10 flex items-center justify-center mr-4 mt-0.5 shadow-sm">
                            <span className="h-2 w-2 rounded-full bg-purple-400"></span>
                        </div>
                        <span className="text-gray-300 leading-relaxed">{point}</span>
                    </div>
                ))}
            </div>
            
            {(dataPoints.length > 3) && (
                <div className="flex justify-center sm:justify-start mt-6 w-full">
                    <div className="flex space-x-3">
                        {Array.from({ length: Math.ceil(dataPoints.length / 3) }).map((_, idx) => (
                            <div 
                                key={idx} 
                                className={`h-1 w-10 rounded-full transition-all duration-300 ${idx === Math.floor(dataPointIndex / 3) ? 'bg-purple-400' : 'bg-zinc-800'}`}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}; 