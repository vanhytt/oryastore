"use client";

import React from "react";

interface QuoteData {
  text: string;
  author: string;
  position: string;
  signature: string;
}

export default function QuoteSection({ data, onChange }: { data: QuoteData; onChange: (d: QuoteData) => void }) {
  const update = (field: keyof QuoteData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 space-y-4">
      <h3 className="font-semibold text-lg text-yellow-900">📌 Lời hứa & Trích dẫn</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Câu trích dẫn</label>
        <textarea
          value={data.text}
          onChange={(e) => update("text", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          rows={3}
          placeholder="Mỗi mẹ xứng đáng..."
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium mb-1">Người phát ngôn</label>
          <input
            type="text"
            value={data.author}
            onChange={(e) => update("author", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="Founder"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Chức danh</label>
          <input
            type="text"
            value={data.position}
            onChange={(e) => update("position", e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            placeholder="CEO"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Chữ ký</label>
        <input
          type="text"
          value={data.signature}
          onChange={(e) => update("signature", e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Founder"
        />
      </div>
    </div>
  );
}
