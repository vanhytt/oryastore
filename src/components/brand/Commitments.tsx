import React from 'react';

interface Commitment {
  icon?: string;
  number: string;
  title: string;
  description: string;
}

interface CommitmentsProps {
  items?: Commitment[];
}

export default function Commitments({ items }: CommitmentsProps) {
  const defaultItems: Commitment[] = [
    { number: '01', title: 'An toàn', description: 'Không chứa hóa chất độc hại' }
  ];

  const displayItems = items && items.length > 0 ? items : defaultItems;

  return (
    <>
      {displayItems.map((item, index) => (
        <div key={index} className="group p-2 rounded-[2rem] bg-stone-50 border border-stone-200/40 hover:border-red-100 hover:bg-red-50/10 transition-all duration-300">
          <div className="bg-white group-hover:bg-red-50/5 rounded-[calc(2rem-0.5rem)] p-6 text-center border border-stone-100">
            <p className="text-4xl md:text-5xl font-black text-[#ED9717] mb-3">{item.number}</p>
            <h3 className="text-lg font-bold text-[#3A5B2C] mb-2">{item.title}</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-light">{item.description}</p>
          </div>
        </div>
      ))}
    </>
  );
}
