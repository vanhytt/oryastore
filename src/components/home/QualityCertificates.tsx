"use client";

import React from "react";
import { CheckCircle2, Leaf, Factory, ShieldCheck } from "lucide-react";

// ─── Data ─────────────────────────────────────
interface Certificate {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  Icon: React.FC<{ className?: string; size?: number }>;
  iconBg: string;
  iconColor: string;
  cardBorder: string;
  cardGlow: string;
  accent: string;
}

const certificates: Certificate[] = [
  {
    id: 1,
    title: "Vegan Certified",
    subtitle: "Chứng nhận thuần chay",
    description:
      "Không thử nghiệm trên động vật, 100% thành phần từ thực vật và khoáng chất tự nhiên.",
    Icon: Leaf,
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    cardBorder: "border-[#BBF7D0]",
    cardGlow: "hover:shadow-[0_20px_48px_rgba(22,163,74,0.12)]",
    accent: "text-[#15803D]",
  },
  {
    id: 2,
    title: "CGMP-ASEAN",
    subtitle: "Tiêu chuẩn sản xuất",
    description:
      "Sản xuất tại nhà máy đạt chuẩn CGMP-ASEAN, đảm bảo chất lượng và vệ sinh nghiêm ngặt.",
    Icon: Factory,
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
    cardBorder: "border-[#BFDBFE]",
    cardGlow: "hover:shadow-[0_20px_48px_rgba(37,99,235,0.10)]",
    accent: "text-[#1D4ED8]",
  },
  {
    id: 3,
    title: "SLS Free",
    subtitle: "Không chất tẩy rửa mạnh",
    description:
      "Không chứa Sodium Lauryl Sulfate, an toàn cho da nhạy cảm của mẹ bầu và trẻ sơ sinh.",
    Icon: ShieldCheck,
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    cardBorder: "border-[#FDE68A]",
    cardGlow: "hover:shadow-[0_20px_48px_rgba(217,119,6,0.10)]",
    accent: "text-[#B45309]",
  },
];

const trustBadges = [
  "Kiểm nghiệm lâm sàng",
  "Được bác sĩ khuyên dùng",
  "Không Paraben",
  "Không cồn",
];

// ─── Sub-components ───────────────────────────
function CertCard({ cert }: { cert: Certificate }) {
  const { title, subtitle, description, Icon, iconBg, iconColor, cardBorder, cardGlow, accent } =
    cert;
  return (
    <div
      className={[
        "group relative flex flex-col items-center text-center",
        "rounded-3xl border",
        cardBorder,
        "bg-white/70 backdrop-blur-sm",
        "px-7 py-9",
        "shadow-[0_2px_12px_rgba(0,0,0,0.06)]",
        cardGlow,
        "hover:-translate-y-2",
        "transition-all duration-300 ease-in-out",
      ].join(" ")}
    >
      {/* Inner highlight ring */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/60"
      />

      {/* Icon disc */}
      <div
        className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${iconBg} shadow-sm ring-4 ring-white`}
      >
        <Icon size={34} className={iconColor} />
      </div>

      {/* Title EN */}
      <h3 className="mb-1 text-xl font-bold tracking-tight text-[#2D3748]">
        {title}
      </h3>

      {/* Subtitle VI */}
      <p className={`mb-3 text-[13px] font-semibold uppercase tracking-wider ${accent}`}>
        {subtitle}
      </p>

      {/* Divider */}
      <span aria-hidden className="mb-4 block h-px w-10 rounded-full bg-[#CBD5E1]" />

      {/* Description */}
      <p className="text-[14px] leading-relaxed text-[#64748B]">
        {description}
      </p>
    </div>
  );
}

function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-2 text-[13px] font-semibold text-[#15803D] shadow-sm">
      <CheckCircle2 size={14} className="shrink-0 text-[#22C55E]" strokeWidth={2.5} />
      {label}
    </span>
  );
}

// ─── Main Section ─────────────────────────────
export default function QualityCertificates() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Background gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #F6FBF4 0%, #FEFCE8 42%, #F0FDF4 68%, #F7FEF7 100%)",
        }}
      />
      {/* Dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-[0.35]"
        style={{
          backgroundImage: "radial-gradient(circle, #86EFAC 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Decorative blobs */}
      <svg
        aria-hidden
        viewBox="0 0 220 260"
        fill="none"
        className="pointer-events-none absolute left-0 top-0 h-[220px] w-auto opacity-[0.18] select-none"
      >
        <ellipse cx="60" cy="130" rx="60" ry="110" fill="#86EFAC" />
        <ellipse cx="140" cy="60" rx="50" ry="70" fill="#BBF7D0" />
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 220 260"
        fill="none"
        className="pointer-events-none absolute bottom-0 right-0 h-[200px] w-auto opacity-[0.14] select-none"
      >
        <ellipse cx="160" cy="130" rx="60" ry="110" fill="#FDE68A" />
        <ellipse cx="80" cy="200" rx="50" ry="70" fill="#BFDBFE" />
      </svg>

      <div className="relative mx-auto max-w-[1200px] px-5">
        {/* Section Header */}
        <div className="mb-14 text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#BBF7D0] bg-white/80 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wider text-[#16A34A] shadow-sm backdrop-blur-sm">
            <CheckCircle2 size={13} strokeWidth={2.5} />
            Cam kết chất lượng
          </span>

          <h2 className="mx-auto mb-4 max-w-xl text-3xl font-bold leading-tight text-[#2D3748] md:text-4xl">
            Chứng nhận chất lượng{" "}
            <span className="bg-gradient-to-r from-[#5D8D4A] to-[#22C55E] bg-clip-text text-transparent">
              quốc tế
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-7 text-[#64748B] md:text-lg">
            Orya tự hào đạt được các chứng nhận chất lượng hàng đầu thế giới,
            khẳng định cam kết an toàn và hiệu quả.
          </p>
        </div>

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {certificates.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {trustBadges.map((badge) => (
            <TrustBadge key={badge} label={badge} />
          ))}
        </div>
      </div>
    </section>
  );
}

