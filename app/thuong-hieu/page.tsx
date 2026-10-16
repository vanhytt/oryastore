import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { getBrandStory } from "@/src/lib/getBrandStory";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Câu chuyện thương hiệu Orya | Mỹ phẩm thiên nhiên cho mẹ và bé",
  description: "Khám phá câu chuyện thương hiệu Orya.",
};

function resolveImage(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value;
  if (typeof value === "object" && value !== null && "url" in value) {
    const url = value.url;
    return typeof url === "string" && url.trim() ? url : null;
  }
  return null;
}

export default async function BrandStoryPage() {
  const story = await getBrandStory();
  const hero = story?.hero;
  const mainImage = resolveImage(hero?.mainImage);
  const badgeImage = resolveImage(hero?.badgeImage?.image);
  const guidelines = story?.guidelines;
  const coreValues = Array.isArray(guidelines?.coreValues) ? guidelines.coreValues : [];
  const timeline = Array.isArray(story?.timeline) ? story.timeline : [];
  const commitments = Array.isArray(story?.commitments) ? story.commitments : [];
  const factory = story?.factory;
  const cta = story?.ctaBanner;
  const hasHero = Boolean(
    hero?.badge ||
    hero?.mainHeading ||
    hero?.description1 ||
    hero?.description2 ||
    hero?.ctaButton1?.label ||
    hero?.ctaButton2?.label ||
    mainImage ||
    badgeImage,
  );
  const hasGuidelines = Boolean(
    guidelines?.title ||
    guidelines?.mission?.title ||
    guidelines?.mission?.description ||
    guidelines?.vision?.title ||
    guidelines?.vision?.description ||
    coreValues.some((value) => value.title || value.description),
  );
  const visibleTimeline = timeline.filter((item) => item.period || item.title || item.description);
  const visibleCommitments = commitments.filter((item) => item.number || item.title || item.description);
  const visibleHighlights = Array.isArray(factory?.highlights)
    ? factory.highlights.filter((highlight) => highlight.title || highlight.description)
    : [];

  return (
    <>
      <Header />
      <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#F0F7EC] via-white to-amber-50/30 text-[#2c3527]">
        {/* HERO SECTION - Premium Layered Design */}
        {hero && hasHero && (
          <section className="relative overflow-hidden bg-gradient-to-br from-[#F0F7EC]/60 via-white to-amber-50/40 py-20 md:py-28">
            {/* Ambient glow background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#5D8D4A]/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-amber-200/8 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-12 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
              <div className="max-w-xl">
                {hero.badge && (
                  <p className="mb-5 inline-flex rounded-full bg-[#5D8D4A]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#5D8D4A] shadow-sm border border-[#5D8D4A]/20 backdrop-blur-sm">
                    {hero.badge}
                  </p>
                )}
                {hero.mainHeading && (
                  <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-[#35552B] md:text-5xl lg:text-6xl">
                    {hero.mainHeading}
                  </h1>
                )}
                {hero.description1 && (
                  <p className="mb-4 max-w-[58ch] text-lg leading-8 text-stone-600">
                    {hero.description1}
                  </p>
                )}
                {hero.description2 && (
                  <p className="mb-8 max-w-[58ch] text-base leading-7 text-stone-500">
                    {hero.description2}
                  </p>
                )}
                <div className="flex flex-wrap items-center gap-4">
                  {hero.ctaButton1?.label && hero.ctaButton1.link && (
                    <a
                      href={hero.ctaButton1.link}
                      className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#5D8D4A] px-8 py-3 font-bold text-white shadow-lg shadow-[#5D8D4A]/20 transition-all duration-300 hover:bg-[#4B733B] hover:shadow-xl hover:shadow-[#5D8D4A]/30 active:translate-y-px"
                    >
                      {hero.ctaButton1.label}
                    </a>
                  )}
                  {hero.ctaButton2?.label && hero.ctaButton2.link && (
                    <a
                      href={hero.ctaButton2.link}
                      className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 py-3 text-sm font-bold text-[#5D8D4A] transition-all duration-300 hover:text-[#E88A23] border border-[#5D8D4A]/40 hover:border-[#E88A23]/60 hover:shadow-md"
                    >
                      {hero.ctaButton2.label}
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>

              {(mainImage || badgeImage) && (
                <div className="relative mx-auto h-[340px] w-full max-w-[560px] sm:h-[430px]">
                  {mainImage && (
                    <div className={`absolute overflow-hidden rounded-3xl border border-white/80 bg-white p-3 shadow-2xl shadow-[#5D8D4A]/10 backdrop-blur-sm transition-transform duration-500 hover:scale-105 ${badgeImage ? "right-0 top-0 h-[78%] w-[72%] rotate-1" : "inset-0"}`}>
                      <div className="h-full w-full overflow-hidden rounded-2xl bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={mainImage} alt={hero.mainHeading || ""} className="h-full w-full object-cover" />
                      </div>
                    </div>
                  )}
                  {badgeImage && (
                    <div className={`absolute overflow-hidden rounded-3xl border border-white/80 bg-white/90 p-3 shadow-2xl shadow-[#5D8D4A]/15 backdrop-blur-sm transition-all duration-500 ${mainImage ? "bottom-0 left-0 h-[66%] w-[52%] -rotate-3 scale-95 hover:scale-100 hover:rotate-0" : "inset-0"}`}>
                      <div className="h-full w-full overflow-hidden rounded-2xl bg-stone-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={badgeImage}
                          alt={hero.badgeImage?.title || hero.mainHeading || ""}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      {(hero.badgeImage?.title || hero.badgeImage?.subtitle) && (
                        <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
                          {hero.badgeImage.title && (
                            <p className="text-sm font-bold text-[#35552B]">{hero.badgeImage.title}</p>
                          )}
                          {hero.badgeImage.subtitle && (
                            <p className="mt-1 text-xs leading-5 text-stone-500">{hero.badgeImage.subtitle}</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* GUIDELINES SECTION - Premium Cards with Hover Effects */}
        {guidelines && hasGuidelines && (
          <section className="border-t border-[#5D8D4A]/20 bg-white/80 px-5 py-16 md:py-24 backdrop-blur-sm">
            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
              {guidelines.title && (
                <h2 className="mb-16 text-center text-4xl font-bold tracking-tight text-[#2F5227] md:text-5xl">
                  {guidelines.title}
                </h2>
              )}
              <div className="mb-16 grid gap-8 md:grid-cols-2">
                {[guidelines.mission, guidelines.vision].map((item, index) => (
                  (item?.title || item?.description) && (
                    <article key={index} className="group relative overflow-hidden rounded-3xl border border-[#5D8D4A]/20 bg-gradient-to-br from-[#F0F7EC]/80 via-white to-[#F0F7EC]/40 p-8 md:p-10 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-[#5D8D4A]/10">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#5D8D4A]/0 via-white/0 to-[#5D8D4A]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-40"></div>
                      <div className="relative">
                        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5D8D4A]/10 text-[#5D8D4A] font-bold text-lg">✓</div>
                        {item.title && <h3 className="mb-4 text-2xl font-bold text-[#2F5227]">{item.title}</h3>}
                        {item.description && <p className="leading-7 text-stone-600">{item.description}</p>}
                      </div>
                    </article>
                  )
                ))}
              </div>
              {coreValues.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {coreValues.map((value, index) => (
                    (value.title || value.description) && (
                      <article
                        key={`${value.title}-${index}`}
                        className="group relative overflow-hidden rounded-2xl border border-white/60 bg-white/80 px-6 py-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#5D8D4A]/40 hover:shadow-md hover:shadow-[#5D8D4A]/5"
                      >
                        <div className="absolute top-0 right-0 h-24 w-24 bg-[#5D8D4A]/5 rounded-full blur-2xl -mr-12 -mt-12 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <div className="relative">
                          {value.icon && (
                            <p className="mb-3 text-2xl font-bold text-[#5D8D4A]">{value.icon}</p>
                          )}
                          {value.title && (
                            <h3 className="mb-2 font-bold text-[#2F5227] text-lg">{value.title}</h3>
                          )}
                          {value.description && (
                            <p className="leading-6 text-stone-600 text-sm">{value.description}</p>
                          )}
                        </div>
                      </article>
                    )
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* TIMELINE SECTION - Glassmorphic with Gradient Line */}
        {visibleTimeline.length > 0 && (
          <section id="hanh-trinh" className="bg-gradient-to-b from-white/80 to-[#F0F7EC]/40 px-5 py-16 md:py-24 backdrop-blur-sm">
            <div className="mx-auto max-w-4xl">
              <div className="relative space-y-8">
                <div className="absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#5D8D4A]/50 via-[#5D8D4A] to-[#5D8D4A]/50"></div>
                {visibleTimeline.map((item, index) => (
                  <div key={`${item.period}-${index}`} className="relative pl-20">
                    {/* Timeline Node */}
                    <div className="absolute -left-3 top-2 flex h-5 w-5 items-center justify-center">
                      <div className="ring-4 ring-[#5D8D4A]/20 bg-[#5D8D4A] w-4 h-4 rounded-full shadow-lg shadow-[#5D8D4A]/40"></div>
                    </div>

                    {/* Timeline Card */}
                    <article className="group rounded-2xl border border-[#5D8D4A]/20 bg-white/80 backdrop-blur-sm p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#5D8D4A]/40">
                      {item.period && (
                        <p className="text-sm font-bold uppercase tracking-wider text-[#5D8D4A] mb-2">{item.period}</p>
                      )}
                      {item.title && (
                        <h3 className="mb-2 text-xl font-bold text-[#2F5227]">{item.title}</h3>
                      )}
                      {item.description && (
                        <p className="leading-7 text-stone-600">{item.description}</p>
                      )}
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* QUOTE SECTION - Premium Floating Design */}
        {(story?.quote?.text || story?.quote?.author || story?.quote?.position || story?.quote?.signature) && (
          <section className="bg-gradient-to-b from-white via-amber-50/30 to-[#F0F7EC]/30 px-5 py-16 md:py-20">
            <figure className="mx-auto max-w-4xl relative rounded-3xl border border-amber-200/40 bg-gradient-to-br from-amber-50/80 via-white to-[#F0F7EC]/50 px-8 py-12 text-center shadow-lg shadow-amber-900/5 md:px-16 md:py-16 overflow-hidden">
              {/* Decorative quotation marks */}
              <div className="text-amber-200/30 text-9xl font-serif absolute -top-8 -left-4 pointer-events-none">"</div>
              
              <div className="relative z-10">
                {story.quote.text && (
                  <blockquote className="text-xl leading-relaxed text-[#2F5227] md:text-2xl font-medium">
                    {story.quote.text}
                  </blockquote>
                )}
                {(story.quote.author || story.quote.position) && (
                  <figcaption className="mt-8 text-sm text-stone-600">
                    {story.quote.author && <span className="font-bold text-[#2F5227]">{story.quote.author}</span>}
                    {story.quote.author && story.quote.position && <span className="mx-2 text-stone-300">/</span>}
                    {story.quote.position && <span>{story.quote.position}</span>}
                  </figcaption>
                )}
                {story.quote.signature && (
                  <p className="mt-4 text-sm italic text-[#5D8D4A]">{story.quote.signature}</p>
                )}
              </div>
            </figure>
          </section>
        )}

        {/* COMMITMENTS SECTION - Premium Typography Numbers */}
        {visibleCommitments.length > 0 && (
          <section className="bg-gradient-to-b from-white to-[#F0F7EC]/30 py-16 md:py-24">
            <div className="mx-auto max-w-[1200px] px-5 md:px-8">
              {(story?.commitmentsHeader?.badge || story?.commitmentsHeader?.title || story?.commitmentsHeader?.description) && (
                <header className="mx-auto mb-16 max-w-2xl text-center">
                  {story.commitmentsHeader.badge && (
                    <p className="font-bold uppercase tracking-wider text-[#5D8D4A]">{story.commitmentsHeader.badge}</p>
                  )}
                  {story.commitmentsHeader.title && (
                    <h2 className="mt-4 text-4xl font-bold text-[#2F5227] md:text-5xl">{story.commitmentsHeader.title}</h2>
                  )}
                  {story.commitmentsHeader.description && (
                    <p className="mt-6 leading-relaxed text-stone-600">{story.commitmentsHeader.description}</p>
                  )}
                </header>
              )}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
                {visibleCommitments.map((item, index) => (
                  <article key={`${item.number}-${index}`} className="relative group overflow-hidden rounded-2xl border border-[#5D8D4A]/20 bg-white/80 px-6 py-8 text-center shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#5D8D4A]/40 hover:shadow-md hover:shadow-[#5D8D4A]/5">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-[#E88A23]/60 text-[#E88A23] font-bold text-2xl shadow-md ring-4 ring-white">
                      {item.number || String(index + 1).padStart(2, "0")}
                    </div>
                    <div className="pt-6">
                      {item.icon && <p className="mb-3 text-2xl">{item.icon}</p>}
                      {item.title && <h3 className="mb-2 font-bold text-[#2F5227] text-base">{item.title}</h3>}
                      {item.description && <p className="text-sm leading-6 text-stone-600">{item.description}</p>}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {factory && (factory.title || factory.description || factory.image || visibleHighlights.length > 0) && (
          <section className="border-t border-[#5D8D4A]/20 bg-white/80 px-5 py-16 md:py-24 backdrop-blur-sm">
            <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
              {resolveImage(factory.image) && (
                <div className="group relative overflow-hidden rounded-3xl shadow-2xl shadow-[#5D8D4A]/15 hover:shadow-2xl hover:shadow-[#5D8D4A]/25 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#5D8D4A]/20 via-transparent to-transparent z-10 pointer-events-none"></div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={resolveImage(factory.image)!} alt={factory.title || ""} className="h-full w-full object-cover" />
                </div>
              )}
              <div>
                {factory.title && <h2 className="mb-6 text-3xl font-bold leading-snug text-[#2F5227] md:text-4xl">{factory.title}</h2>}
                {factory.description && <p className="mb-8 leading-7 text-stone-600">{factory.description}</p>}
                {visibleHighlights.length > 0 && (
                  <ul className="space-y-4">
                    {visibleHighlights.map((highlight, index) => (
                      <li key={`${highlight.title}-${index}`} className="flex gap-4 items-start">
                        <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#5D8D4A]/10 font-bold text-[#5D8D4A] text-sm">✓</span>
                        <div>
                          {highlight.title && <h3 className="font-bold text-stone-800">{highlight.title}</h3>}
                          {highlight.description && <p className="mt-1 text-sm leading-6 text-stone-600">{highlight.description}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </section>
        )}

        {/* CTA BANNER - Premium Gradient with Scale Animation */}
        {cta && (cta.title || cta.subtitle || (cta.buttonLabel && cta.buttonLink)) && (
          <section className="relative overflow-hidden bg-gradient-to-r from-[#5D8D4A] via-[#4B733B] to-[#5D8D4A] py-16 text-white md:py-20">
            {/* Ambient glow effects */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-[#5D8D4A]/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#E88A23]/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative mx-auto max-w-[860px] px-5 text-center md:px-8">
              {cta.title && <h2 className="text-3xl font-bold leading-tight text-white md:text-5xl">{cta.title}</h2>}
              {cta.subtitle && <p className="mx-auto mt-6 max-w-2xl leading-7 text-white/90">{cta.subtitle}</p>}
              {cta.buttonLabel && cta.buttonLink && (
                <a href={cta.buttonLink} className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-[#E88A23] px-8 py-4 font-bold text-white shadow-lg shadow-[#E88A23]/30 transition-all duration-300 hover:bg-[#d47a1a] hover:scale-105 hover:shadow-xl hover:shadow-[#E88A23]/40 active:translate-y-px">
                  {cta.buttonLabel}
                </a>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
