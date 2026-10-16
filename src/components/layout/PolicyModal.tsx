"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface Policy {
  id: string;
  label: string;
  url: string;
  content?: string;
}

export default function PolicyModal({ policies }: { policies: Policy[] }) {
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!selectedPolicy) return;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setSelectedPolicy(null);
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      if (triggerRef.current?.isConnected) triggerRef.current.focus();
      else if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [selectedPolicy]);

  return (
    <>
      <ul className="space-y-2">
        {policies.map((policy) => (
          <li key={policy.id}>
            <button
              type="button"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setSelectedPolicy(policy);
              }}
              className="cursor-pointer text-left text-white/90 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
            >
              {policy.label}
            </button>
          </li>
        ))}
      </ul>

      {selectedPolicy && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={(event) => {
            if (event.target === event.currentTarget) setSelectedPolicy(null);
          }}
        >
          <section
            aria-labelledby="policy-modal-title"
            aria-modal="true"
            className="max-h-[80vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            role="dialog"
            tabIndex={-1}
          >
            <div className="sticky top-0 flex items-center justify-between gap-4 border-b border-gray-100 bg-white px-6 py-4">
              <h2 id="policy-modal-title" className="text-lg font-bold text-[#404041]">
                {selectedPolicy.label}
              </h2>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedPolicy(null)}
                className="flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#5D8D4A]"
                aria-label="Đóng cửa sổ chính sách"
              >
                <X size={20} />
              </button>
            </div>
            <p className="whitespace-pre-line px-6 py-5 text-sm leading-7 text-gray-700">
              {selectedPolicy.content}
            </p>
          </section>
        </div>
      )}
    </>
  );
}
