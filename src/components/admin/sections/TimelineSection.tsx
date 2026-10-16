"use client";

import React from "react";
import { Trash2, Plus } from "lucide-react";

interface TimelineItem {
  period: string;
  title: string;
  description: string;
}

export default function TimelineSection({ data, onChange }: { data: TimelineItem[]; onChange: (d: TimelineItem[]) => void }) {
  const addItem = () => {
    onChange([...data, { period: "2024", title: "", description: "" }]);
  };

  const updateItem = (idx: number, field: keyof TimelineItem, value: string) => {
    const newData = [...data];
    newData[idx] = { ...newData[idx], [field]: value };
    onChange(newData);
  };

  const removeItem = (idx: number) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-lg text-purple-900">📌 Hành trình & Cột mốc</h3>
        <button onClick={addItem} className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-1">
          <Plus className="w-4 h-4" /> Thêm mốc
        </button>
      </div>

      <div className="space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="bg-white border rounded-lg p-3 space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="text-xs font-medium">Năm/Giai đoạn</label>
                <input
                  type="text"
                  value={item.period}
                  onChange={(e) => updateItem(idx, "period", e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder="2024"
                />
              </div>
              <div>
                <label className="text-xs font-medium">Tóm tắt mốc</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => updateItem(idx, "title", e.target.value)}
                  className="w-full px-2 py-1 border rounded text-sm"
                  placeholder="Tên sự kiện"
                />
              </div>
              <button
                onClick={() => removeItem(idx)}
                className="flex items-center justify-center mt-6 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div>
              <label className="text-xs font-medium">Nội dung mốc</label>
              <textarea
                value={item.description}
                onChange={(e) => updateItem(idx, "description", e.target.value)}
                className="w-full px-2 py-1 border rounded text-sm"
                rows={2}
                placeholder="Chi tiết sự kiện..."
              />
            </div>
          </div>
        ))}
      </div>

      {data.length === 0 && (
        <p className="text-center text-gray-500 text-sm py-4">Chưa có cột mốc. Bấm &quot;Thêm mốc&quot; để bắt đầu.</p>
      )}
    </div>
  );
}
