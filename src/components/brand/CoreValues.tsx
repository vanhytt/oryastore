import React from 'react';

interface CoreValue {
  icon?: string;
  title: string;
  description: string;
}

interface CoreValuesProps {
  values?: CoreValue[];
}

export default function CoreValues({ values }: CoreValuesProps) {
  return (
    <>
      {values?.map((value, index) => (
        <div key={index} className="p-5 rounded-2xl bg-stone-50 hover:bg-[#5D8D4A]/5 transition-colors duration-300">
          <h4 className="font-bold text-[#3A5B2C] text-md mb-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#5D8D4A]"></span>
            {value.title}
          </h4>
          <p className="text-stone-500 text-xs leading-relaxed font-light">
            {value.description}
          </p>
        </div>
      ))}
    </>
  );
}
