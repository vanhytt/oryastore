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
  const defaultValues: CoreValue[] = [
    {
      title: 'An Toàn Tuyệt Đối',
      description: 'Mọi thành phần thảo dược đều đạt độ tinh khiết cao nhất, không chứa độc tố hay chất cấm gây hại cho làn da mỏng manh.'
    },
    {
      title: 'Khoa Học Tiên Phong',
      description: 'Công nghệ chiết xuất nano và công nghệ sinh học hiện đại giúp phát huy tối đa dược tính của nguyên liệu tự nhiên.'
    },
    {
      title: 'Trách Nhiệm & Tâm Huyết',
      description: 'Đặt lợi ích sức khỏe lâu dài của trẻ em lên hàng đầu, cam kết đồng hành cùng các bậc cha mẹ trong hành trình khôn lớn.'
    }
  ];

  const displayValues = values && values.length > 0 ? values : defaultValues;

  return (
    <>
      {displayValues.map((value, index) => (
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
