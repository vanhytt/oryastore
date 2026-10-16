import { CheckCircle2, Leaf, Factory, ShieldCheck } from "lucide-react";
import { getCertificates, getCertificatesHeader } from "@/src/lib/adminDbService";

// ─── Default Certificates (Fallback) ───────────────
const DEFAULT_CERTIFICATES = [
  {
    id: "default_1",
    title: "Vegan Certified",
    description:
      "Không thử nghiệm trên động vật, 100% thành phần từ thực vật và khoáng chất tự nhiên.",
    image_url: null,
    icon: "leaf",
    iconBg: "bg-[#DCFCE7]",
    iconColor: "text-[#16A34A]",
    cardBorder: "border-[#BBF7D0]",
    cardGlow: "hover:shadow-[0_20px_48px_rgba(22,163,74,0.12)]",
    accent: "text-[#15803D]",
    sort_order: 0,
  },
  {
    id: "default_2",
    title: "CGMP-ASEAN",
    description:
      "Sản xuất tại nhà máy đạt chuẩn CGMP-ASEAN, đảm bảo chất lượng và vệ sinh nghiêm ngặt.",
    image_url: null,
    icon: "factory",
    iconBg: "bg-[#DBEAFE]",
    iconColor: "text-[#2563EB]",
    cardBorder: "border-[#BFDBFE]",
    cardGlow: "hover:shadow-[0_20px_48px_rgba(37,99,235,0.10)]",
    accent: "text-[#1D4ED8]",
    sort_order: 1,
  },
  {
    id: "default_3",
    title: "SLS Free",
    description:
      "Không chứa Sodium Lauryl Sulfate, an toàn cho da nhạy cảm của mẹ bầu và trẻ sơ sinh.",
    image_url: null,
    icon: "shield",
    iconBg: "bg-[#FEF3C7]",
    iconColor: "text-[#D97706]",
    cardBorder: "border-[#FDE68A]",
    cardGlow: "hover:shadow-[0_20px_48px_rgba(217,119,6,0.10)]",
    accent: "text-[#B45309]",
    sort_order: 2,
  },
];

// ─── Default Trust Badges (será substituído por dinâmico) ───
const DEFAULT_TRUST_BADGES = [
  "Kiểm nghiệm lâm sàng",
  "Được bác sĩ khuyên dùng",
  "Không Paraben",
  "Không cồn",
];

// ─── Map icon name to Lucide icon ──────────────────
function renderIcon(iconName: string | null, className: string) {
  switch (iconName?.toLowerCase()) {
    case "factory":
      return <Factory size={34} className={className} />;
    case "shield":
      return <ShieldCheck size={34} className={className} />;
    case "check":
      return <CheckCircle2 size={34} className={className} />;
    default:
      return <Leaf size={34} className={className} />;
  }
}

// ─── Sub-component: Certificate Card ──────────────
interface CertData {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  icon?: string;
  iconBg: string;
  iconColor: string;
  cardBorder: string;
  cardGlow: string;
  accent: string;
  sort_order: number;
}

function CertCard({ cert }: { cert: CertData }) {
  const {
    title,
    description,
    image_url,
    icon,
    iconBg,
    iconColor,
    cardBorder,
    cardGlow,
  } = cert;

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

      {/* Icon or Image disc */}
      <div
        className={`mb-6 flex h-20 w-20 items-center justify-center rounded-full ${iconBg} shadow-sm ring-4 ring-white`}
      >
        {image_url ? (
          <img
            src={image_url}
            alt={title}
            className="h-full w-full object-contain"
          />
        ) : (
          renderIcon(icon || "leaf", iconColor)
        )}
      </div>

      {/* Title */}
      <h3 className="mb-1 text-xl font-bold tracking-tight text-[#2D3748]">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="text-[14px] leading-relaxed text-[#64748B]">
          {description}
        </p>
      )}
    </div>
  );
}

// ─── Sub-component: Trust Badge ────────────────────
function TrustBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#BBF7D0] bg-[#F0FDF4] px-4 py-2 text-[13px] font-semibold text-[#15803D] shadow-sm">
      <CheckCircle2 size={14} className="shrink-0 text-[#22C55E]" strokeWidth={2.5} />
      {label}
    </span>
  );
}

// ─── Main Server Component ─────────────────────────
export default async function QualityCertificates() {
  // Fetch certificates and header config from database
  const [dbCertificates, headerConfig] = await Promise.all([
    getCertificates(),
    getCertificatesHeader(),
  ]);

  // Use DB data if available, otherwise fallback to defaults
  const certificates =
    dbCertificates && dbCertificates.length > 0
      ? dbCertificates.map((cert) => ({
          ...cert,
          icon: "leaf", // default icon
          iconBg: "bg-[#DCFCE7]",
          iconColor: "text-[#16A34A]",
          cardBorder: "border-[#BBF7D0]",
          cardGlow: "hover:shadow-[0_20px_48px_rgba(22,163,74,0.12)]",
          accent: "text-[#15803D]",
        }))
      : DEFAULT_CERTIFICATES;

  // Get dynamic tags from header config or use defaults
  const trustBadges = headerConfig.bottomTags || DEFAULT_TRUST_BADGES;

  return (
    <section id="certificates" className="relative overflow-hidden py-20 md:py-28">
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
            {headerConfig.badge}
          </span>

          <h2 className="mx-auto mb-4 max-w-xl text-3xl font-bold leading-tight text-[#2D3748] md:text-4xl">
            {headerConfig.title.split(" ").slice(0, -1).join(" ")}{" "}
            <span className="bg-gradient-to-r from-[#5D8D4A] to-[#22C55E] bg-clip-text text-transparent">
              {headerConfig.title.split(" ").slice(-1)}
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-7 text-[#64748B] md:text-lg">
            {headerConfig.description}
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
