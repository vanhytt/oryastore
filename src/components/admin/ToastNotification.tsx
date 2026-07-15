"use client";

import React, { useEffect } from "react";
import { X, CheckCircle, AlertCircle } from "lucide-react";

interface ToastNotificationProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export default function ToastNotification({ message, type, onClose }: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-5 right-5 z-55 max-w-sm w-full animate-in slide-in-from-bottom-5 duration-200">
      <div
        className={`p-4 rounded-lg shadow-lg flex items-start gap-3 border ${
          type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : "bg-red-50 border-red-200 text-red-800"
        }`}
      >
        <div className="shrink-0 mt-0.5">
          {type === "success" ? (
            <CheckCircle size={20} className="text-green-600" />
          ) : (
            <AlertCircle size={20} className="text-red-600" />
          )}
        </div>
        <div className="flex-1 text-sm font-semibold leading-5">{message}</div>
        <button
          onClick={onClose}
          className={`shrink-0 hover:opacity-80 cursor-pointer ${
            type === "success" ? "text-green-550" : "text-red-550"
          }`}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}