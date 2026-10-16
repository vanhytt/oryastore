import React from 'react';

interface Highlight {
  title: string;
  description: string;
}

interface FactoryProps {
  highlights?: Highlight[] | string[];
}

export default function FactoryHighlights({ highlights }: FactoryProps) {
  const defaultHighlights: Highlight[] = [
    { title: 'Công nghệ hiện đại', description: 'Áp dụng công nghệ tiên tiến trong sản xuất' }
  ];

  if (!highlights || highlights.length === 0) {
    highlights = defaultHighlights;
  }

  return (
    <ul className="space-y-4">
      {highlights.map((highlight, index) => {
        // Support both new object format and old string format
        const isObject = typeof highlight === 'object' && highlight !== null;
        const title = isObject ? (highlight as Highlight).title : '';
        const description = isObject ? (highlight as Highlight).description : (highlight as string);

        return (
          <li key={index} className="flex gap-3 items-start">
            <span className="w-5 h-5 rounded-full bg-[#5D8D4A]/10 text-[#5D8D4A] flex items-center justify-center flex-shrink-0 mt-0.5">
              ✓
            </span>
            <div>
              {title && (
                <strong className="text-stone-800 text-sm block">{title}</strong>
              )}
              <p className="text-stone-500 text-sm mt-1">{description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
