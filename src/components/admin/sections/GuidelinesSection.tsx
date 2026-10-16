"use client";

import React from "react";

interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

interface GuidelinesData {
  title: string;
  mission: { title: string; description: string };
  vision: { title: string; description: string };
  coreValues: CoreValue[];
}

export default function GuidelinesSection({ data, onChange }: { data: GuidelinesData; onChange: (d: GuidelinesData) => void }) {
  const update = (field: keyof GuidelinesData, value: any) => onChange({ ...data, [field]: value });

  const updateNested = (parent: keyof GuidelinesData, field: string, value: string) => {
    onChange({ ...data, [parent]: { ...(data[parent] as any), [field]: value } });
  };

  const updateCoreValue = (idx: number, field: keyof CoreValue, value: string) => {
    const newValues = [...data.coreValues];
    newValues[idx] = { ...newValues[idx], [field]: value };
    update("coreValues", newValues);
  };

  const addCoreValue = () => {
    update("coreValues", [...data.coreValues, { icon: "star", title: "", description: "" }]);
  };

  const removeCoreValue = (idx: number) => {
    update("coreValues", data.coreValues.filter((_, i) => i !== idx));
  };

  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-lg text-green-900">📌 Kim chỉ nam</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Tiêu đề Kim chỉ nam</label>
        <input type="text" value={data.title} onChange={(e) => update("title", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg" placeholder="Kim chỉ nam" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Sứ mệnh</label>
          <input type="text" value={data.mission.title} onChange={(e) => updateNested("mission", "title", e.target.value)}
            className="w-full px-2 py-1 border rounded text-sm" placeholder="Title" />
          <textarea value={data.mission.description} onChange={(e) => updateNested("mission", "description", e.target.value)}
            className="w-full px-2 py-1 border rounded mt-1 text-sm" rows={2} placeholder="Mô tả" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Tầm nhìn</label>
          <input type="text" value={data.vision.title} onChange={(e) => updateNested("vision", "title", e.target.value)}
            className="w-full px-2 py-1 border rounded text-sm" placeholder="Title" />
          <textarea value={data.vision.description} onChange={(e) => updateNested("vision", "description", e.target.value)}
            className="w-full px-2 py-1 border rounded mt-1 text-sm" rows={2} placeholder="Mô tả" />
        </div>
      </div>

      <div className="border-t pt-3">
        <div className="flex justify-between items-center mb-2">
          <label className="block font-medium">3 Giá trị cốt lõi</label>
          <button onClick={addCoreValue} className="px-2 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700">
            + Thêm
          </button>
        </div>

        {data.coreValues.map((val, idx) => (
          <div key={idx} className="bg-white border rounded p-2 mb-2 space-y-1">
            <div className="grid grid-cols-3 gap-2">
              <input type="text" value={val.icon} onChange={(e) => updateCoreValue(idx, "icon", e.target.value)}
                className="px-2 py-1 border rounded text-sm" placeholder="Icon" />
              <input type="text" value={val.title} onChange={(e) => updateCoreValue(idx, "title", e.target.value)}
                className="px-2 py-1 border rounded text-sm" placeholder="Title" />
              <button onClick={() => removeCoreValue(idx)} className="px-2 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                Xóa
              </button>
            </div>
            <textarea value={val.description} onChange={(e) => updateCoreValue(idx, "description", e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm" rows={1} placeholder="Mô tả" />
          </div>
        ))}
      </div>
    </div>
  );
}
