import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Heart,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { getHomeBrandStory } from "@/src/lib/getHomeBrandStory";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const featureIcons: Record<string, LucideIcon> = {
  heart: Heart,
  "shield-check": ShieldCheck,
  award: Award,
  "circle-check": CheckCircle2,
};

export default async function BrandStory() {
  const story = await getHomeBrandStory();

  return (
    <section className="bg-gradient-to-br from-emerald-50/30 via-white to-green-50/20 py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-gray-100/80 shadow-xl lg:aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={story.image_url}
                alt={story.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 grid grid-cols-2 gap-2 rounded-2xl border border-white/60 bg-white/95 p-4 text-center shadow-lg backdrop-blur-md sm:grid-cols-4">
                {story.stats.map((stat, index) => (
                  <div key={`${stat.label}-${index}`}>
                    <div className="text-lg font-bold text-[#2F5227] md:text-xl">
                      {stat.value}
                    </div>
                    <div className="text-[11px] font-medium text-gray-500 md:text-xs">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="mb-4 text-2xl font-bold leading-snug text-[#2F5227] md:text-3xl lg:text-4xl">
              {story.title}
            </h2>
            <p className="mb-6 whitespace-pre-line text-sm leading-relaxed text-gray-600 md:text-base">
              {story.description}
            </p>

            <div className="mb-8 space-y-4">
              {story.features.map((feature, index) => {
                const IconComponent =
                  featureIcons[feature.icon] ?? CheckCircle2;

                return (
                  <div
                    key={`${feature.title}-${index}`}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                      <IconComponent size={20} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-0.5 text-sm font-bold text-[#2F5227] md:text-base">
                        {feature.title}
                      </h3>
                      <p className="whitespace-pre-line text-xs leading-relaxed text-gray-500 md:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              href={story.cta_link}
              className="mt-2 inline-flex items-center gap-2 rounded-xl bg-[#5D8D4A] px-6 py-3 font-medium text-white shadow-md shadow-[#5D8D4A]/20 transition-all hover:-translate-y-0.5 hover:bg-[#4B733B]"
            >
              {story.cta_text}
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
