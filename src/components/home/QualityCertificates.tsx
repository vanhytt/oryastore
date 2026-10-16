import { CheckCircle2 } from "lucide-react";
import { getCertificates, getCertificatesHeader } from "@/src/lib/adminDbService";

// ─── Sub-component: Certificate Card ──────────────
interface CertData {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
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

      {image_url && (
        <div className="mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-4 ring-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image_url}
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>
      )}

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
  const [dbCertificates, headerConfig] = await Promise.all([
    getCertificates(),
    getCertificatesHeader(),
  ]);

  if (dbCertificates.length === 0) return null;
  const certificates = dbCertificates.map((cert) => ({
    ...cert,
    cardBorder: "border-[#BBF7D0]",
    cardGlow: "hover:shadow-[0_20px_48px_rgba(22,163,74,0.12)]",
    accent: "text-[#15803D]",
  }));
  const trustBadges = headerConfig?.bottomTags ?? [];

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
        {(headerConfig?.badge || headerConfig?.title || headerConfig?.description) && (
          <div className="mb-14 text-center">
            {headerConfig.badge && (
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#BBF7D0] bg-white/80 px-4 py-1.5 text-[13px] font-bold uppercase tracking-wider text-[#16A34A] shadow-sm backdrop-blur-sm">
                <CheckCircle2 size={13} strokeWidth={2.5} />
                {headerConfig.badge}
              </span>
            )}
            {headerConfig.title && (
              <h2 className="mx-auto mb-4 max-w-xl text-3xl font-bold leading-tight text-[#2D3748] md:text-4xl">
                {headerConfig.title}
              </h2>
            )}
            {headerConfig.description && (
              <p className="mx-auto max-w-2xl text-base leading-7 text-[#64748B] md:text-lg">
                {headerConfig.description}
              </p>
            )}
          </div>
        )}

        {/* Certificate Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-7">
          {certificates.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </div>

        {/* Trust Badges */}
        {trustBadges.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            {trustBadges.map((badge) => (
              <TrustBadge key={badge} label={badge} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
