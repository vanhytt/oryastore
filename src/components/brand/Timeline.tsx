import React from 'react';

interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

interface TimelineProps {
  items?: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <>
      {items?.map((item, index) => {
        const isEven = index % 2 === 0;
        
        return (
          <div key={index} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
            {/* Center Line Dot - Fixed at center */}
            <div className="absolute left-[10px] md:left-1/2 md:-translate-x-1/2 w-6 h-6 rounded-full border-4 border-[#FAF9F5] bg-[#ED9717] shadow-[0_0_10px_rgba(237,151,23,0.3)] z-10"></div>
            
            {/* Mobile: Always stack vertically */}
            {/* Desktop: Zig-zag layout based on index */}
            
            {isEven ? (
              <>
                {/* LEFT SIDE: Period Badge (text-right on desktop) */}
                <div className="md:order-1 pl-8 md:pl-0 md:pr-12 md:text-right md:flex md:flex-col md:items-end">
                  <span className="inline-block text-[11px] font-bold text-[#5D8D4A] uppercase tracking-widest bg-[#5D8D4A]/10 px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                </div>
                
                {/* RIGHT SIDE: Content (text-left on desktop) */}
                <div className="md:order-2 pl-8 md:pl-12">
                  <h3 className="text-xl md:text-2xl text-[#3A5B2C] font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </>
            ) : (
              <>
                {/* LEFT SIDE: Content (text-right on desktop) */}
                <div className="md:order-1 pl-8 md:pl-0 md:pr-12 md:text-right">
                  <h3 className="text-xl md:text-2xl text-[#3A5B2C] font-bold mb-3">
                    {item.title}
                  </h3>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
                
                {/* RIGHT SIDE: Period Badge (text-left on desktop) */}
                <div className="md:order-2 pl-8 md:pl-12 md:text-left">
                  <span className="inline-block text-[11px] font-bold text-[#5D8D4A] uppercase tracking-widest bg-[#5D8D4A]/10 px-3 py-1 rounded-full">
                    {item.period}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      })}
    </>
  );
}
