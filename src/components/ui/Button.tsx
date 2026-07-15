"use client";

import React from "react";

type ButtonVariant = "primary" | "gold" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  href?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#5D8D4A] text-white hover:bg-[#6CA356] active:bg-[#4A7A38] font-normal",
  gold: "bg-[#ED9717] text-white hover:bg-[#d4880f] active:bg-[#c07a0e] font-bold",
  outline:
    "bg-transparent text-[#5D8D4A] border-2 border-[#5D8D4A] hover:bg-[#5D8D4A] hover:text-white font-bold",
  ghost:
    "bg-transparent text-[#5D8D4A] hover:bg-[#F8F8F8] font-bold rounded-[50px]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "text-sm px-4 py-2 leading-6",
  md: "text-base px-5 py-3 leading-6",
  lg: "text-lg px-6 py-4 leading-7",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
  fullWidth = false,
  icon,
  iconPosition = "left",
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        "inline-flex items-center justify-center gap-2 cursor-pointer transition-all duration-200",
        "min-h-[44px] min-w-[44px]",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {icon && iconPosition === "left" && <span>{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span>{icon}</span>}
    </button>
  );
}