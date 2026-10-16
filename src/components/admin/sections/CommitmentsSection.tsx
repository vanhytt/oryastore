"use client";

import React from "react";

interface CommitmentsHeader {
  badge: string;
  title: string;
  description: string;
}

interface Commitment {
  icon: string;
  number: string;
  title: string;
  description: string;
}

export default function CommitmentsSection({
  header,
  data,
  onChange,
}: {
  header?: CommitmentsHeader;
  data: Commitment[];
  onChange: (header: CommitmentsHeader, data: Commitment[]) => void;
}) {
  const defaultHeader: CommitmentsHeader = {
    badge: 'CAM KẾT VÀNG TỪ ORYA',
    title: 'Cam kết "5 KHÔNG" tuyệt đối',
    description: 'Làn da của trẻ sơ sinh mỏng hơn da người lớn 5 lần...',
  };

  const currentHeader = header || defaultHeader;

  const updateHeader = (field: keyof CommitmentsHeader, value: string) => {
    onChange({ ...currentHeader, [field]: value }, data);
  };

  const update = (idx: number, field: keyof Commitment, value: string) => {
    const newData = [...data];
    newData[idx] = { ...newData[idx], [field]: value };
    onChange(currentHeader, newData);
  };

  const add = () => {
    onChange(currentHeader, [...data, { icon: "check", number: `0${data.length + 1}`, title: "", description: "" }]);
  };

  const remove = (idx: number) => {
    onChange(currentHeader, data.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 space-y-4">
      {/* Header Section */}
      <div className="bg-white border rounded p-3 space-y-2">
        <h4 className="font-semibold text-sm text-red-900">📌 Tiêu đề & Mô tả Section</h4>
        
        <input
          type="text"
          value={currentHeader.badge}
          onChange={(e) => updateHeader("badge", e.target.value)}
          className="w-full px-2 py-1 border rounded text-sm"
          placeholder='Thẻ Badge (VD: CAM KẾT VÀNG TỪ ORYA)'
        />
        
        <input
          type="text"
          value={currentHeader.title}
          onChange={(e) => updateHeader("title", e.target.value)}
          className="w-full px-2 py-1 border rounded text-sm"
          placeholder='Tiêu đề chính (VD: Cam kết "5 KHÔNG" tuyệt đối)'
        />
        
        <textarea
          value={currentHeader.description}
          onChange={(e) => updateHeader("description", e.target.value)}
          className="w-full px-2 py-1 border rounded text-sm"
          rows={3}
          placeholder="Mô tả chung của section..."
        />
      </div>

      {/* Commitments List */}
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-red-900">📌 Danh sách Cam kết</h3>
        <button onClick={add} className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700">
          + Thêm cam kết
        </button>
      </div>

      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="bg-white border rounded p-3 space-y-2">
            <div className="grid grid-cols-4 gap-2">
              <input
                type="text"
                value={item.icon}
                onChange={(e) => update(idx, "icon", e.target.value)}
                className="px-2 py-1 border rounded text-sm"
                placeholder="Icon"
              />
              <input
                type="text"
                value={item.number}
                onChange={(e) => update(idx, "number", e.target.value)}
                className="px-2 py-1 border rounded text-sm"
                placeholder="01"
              />
              <input
                type="text"
                value={item.title}
                onChange={(e) => update(idx, "title", e.target.value)}
                className="px-2 py-1 border rounded text-sm"
                placeholder="Tiêu đề"
              />
              <button onClick={() => remove(idx)} className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                Xóa
              </button>
            </div>
            <textarea
              value={item.description}
              onChange={(e) => update(idx, "description", e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
              rows={2}
              placeholder="Mô tả cam kết..."
            />
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-500 text-sm py-4">Chưa có cam kết. Bấm &quot;Thêm cam kết&quot; để bắt đầu.</p>
      )}
    </div>
  );
}
