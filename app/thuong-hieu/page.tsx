import React from "react";
import {
  Heart,
  Sparkles,
  Award,
  Leaf,
  ArrowRight,
  CheckCircle2,
  Factory
} from "lucide-react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";
import { getBrandStory } from "@/src/lib/getBrandStory";
import CoreValues from "@/src/components/brand/CoreValues";
import Timeline from "@/src/components/brand/Timeline";
import Commitments from "@/src/components/brand/Commitments";
import FactoryHighlights from "@/src/components/brand/FactoryHighlights";
import { isRecord } from "@/src/lib/footerSettings";

// Force dynamic rendering - disable cache for real-time data
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: "Câu chuyện thương hiệu Orya | Mỹ phẩm thiên nhiên cho mẹ và bé",
  description: "Khám phá câu chuyện thương hiệu Orya - Giải pháp chăm sóc da thảo dược an toàn",
};

export default async function BrandStoryPage() {
  const brandStory = await getBrandStory();

  // Extract main hero image URL
  const mainImage: unknown = brandStory.hero?.mainImage;
  const mainHeroUrl = typeof mainImage === 'string'
    ? mainImage
    : isRecord(mainImage) && typeof mainImage.url === 'string'
      ? mainImage.url
      : '/placeholder.jpg';

  // Extract badge image URL - handle both string and object formats
  const badgeImage: unknown = brandStory.hero?.badgeImage;
  const badgeImageUrl = isRecord(badgeImage)
    ? (typeof badgeImage.image === 'string' ? badgeImage.image : typeof badgeImage.url === 'string' ? badgeImage.url : '/placeholder.jpg')
    : typeof badgeImage === 'string'
      ? badgeImage
      : '/placeholder.jpg';

  return (
    <>
      <Header />
      <main className="bg-[#FAF9F5] text-[#2c3527] overflow-x-hidden min-h-screen selection:bg-[#5D8D4A]/10 selection:text-[#5D8D4A]">
        {/* Background grain noise effect */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.015] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] z-40"></div>

        {/* HERO SECTION - Editorial Split */}
        <section className="relative py-24 md:py-36 overflow-hidden">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

              {/* Left Narrative Column */}
              <div className="lg:col-span-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 opacity-100">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#5D8D4A]/10 text-[#5D8D4A] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
                  <Sparkles size={10} className="animate-pulse" />
                  {brandStory?.hero?.badge || 'CÂU CHUYỆN'}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#3A5B2C] font-bold leading-[1.15] tracking-tight mb-8">
                  {brandStory?.hero?.mainHeading || 'Khởi nguồn từ tình mẫu tử'}
                </h1>

                <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-6 font-light">
                  {brandStory?.hero?.description1 || ''}
                </p>

                <p className="text-stone-500 text-base md:text-md leading-relaxed mb-8">
                  {brandStory?.hero?.description2 || ''}
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href={brandStory?.hero?.ctaButton1?.link || '/san-pham'}
                    className="group inline-flex items-center gap-3 bg-[#5D8D4A] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#4d753d] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(93,141,74,0.15)] min-h-[48px]"
                  >
                    {brandStory?.hero?.ctaButton1?.label || 'Khám phá sản phẩm'}
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </span>
                  </a>

                  <a
                    href={brandStory?.hero?.ctaButton2?.link || '#contact'}
                    className="inline-flex items-center text-sm font-bold text-[#5D8D4A] hover:text-[#4d753d] px-4 py-2 transition-colors duration-300"
                  >
                    {brandStory?.hero?.ctaButton2?.label || 'Liên hệ tư vấn'}
                  </a>
                </div>
              </div>

              {/* Right Photo Cascade (Z-Axis Cascade Archetype) */}
              <div className="lg:col-span-6 relative mt-10 lg:mt-0">
                <div className="relative w-full max-w-[500px] mx-auto aspect-[4/5]">

                  {/* Decorative glowing orb */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#5D8D4A]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>

                  {/* Back Image (Botanical/Natural) */}
                  <div className="absolute top-0 right-0 w-[65%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-200/50 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 translate-x-0 opacity-80">
                    <img
                      src={mainHeroUrl}
                      alt="Thảo dược thiên nhiên"
                      className="w-full h-full object-cover filter sepia-[10%] hover:scale-105 transition-transform duration-700"
                    />
                  </div>

                  {/* Front Image (Mother & Baby) - Double Bezel Architecture */}
                  <div className="absolute bottom-0 left-0 w-[75%] p-2 rounded-[2.5rem] bg-stone-50 border border-stone-200/50 shadow-[0_12px_40px_rgba(36,85,143,0.1)] transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] translate-y-0 translate-x-0 opacity-100">
                    <div className="rounded-[calc(2.5rem-0.5rem)] overflow-hidden aspect-[4/5] bg-stone-100">
                      <img
                        src={badgeImageUrl}
                        alt="Tình mẫu tử Orya"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </div>

                  {/* Small floating badge */}
                  <div className="absolute top-[40%] left-[-5%] bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/60 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] scale-100 opacity-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#ED9717]/10 flex items-center justify-center text-[#ED9717]">
                        <Heart size={18} fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">Cam kết từ tâm</p>
                        <p className="text-sm text-[#3A5B2C] font-extrabold">100% Thuần Chay</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CORE PHILOSOPHY - Asymmetrical Bento Grid */}
        <section className="py-24 bg-white relative">
          <div className="max-w-[1200px] mx-auto px-5">

            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5D8D4A] font-bold">Triết lý hoạt động</span>
              <h2 className="text-3xl md:text-4xl text-[#3A5B2C] font-bold mt-3">{brandStory?.guidelines?.title || 'Kim chỉ nam cho mọi bước đi'}</h2>
              <p className="text-stone-500 text-sm md:text-base mt-4 font-light">
                Tại Orya, chất lượng sản phẩm không chỉ được định nghĩa bằng khoa học kiểm nghiệm, mà còn bằng chữ Tâm trọn vẹn dành cho gia đình Việt.
              </p>
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

              {/* Box 1: Sứ mệnh - Medium (col-span-6) */}
              <div className="md:col-span-6 group p-2 rounded-[2.5rem] bg-stone-50 border border-stone-200/40 hover:border-[#5D8D4A]/30 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(93,141,74,0.05)]">
                <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 md:p-10 h-full flex flex-col justify-between border border-stone-100">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#5D8D4A]/10 text-[#5D8D4A] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Leaf size={22} />
                    </div>
                    <h3 className="text-2xl text-[#3A5B2C] font-bold mb-4">{brandStory?.guidelines?.mission?.title || 'Sứ Mệnh Dịu Lành'}</h3>
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                      {brandStory?.guidelines?.mission?.description || 'Mang đến những giải pháp chăm sóc làn da tối ưu bằng thảo dược thuần khiết.'}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-bold text-[#5D8D4A]">
                    <span>Nâng niu từng tế bào da</span>
                    <CheckCircle2 size={14} className="text-[#5D8D4A]" />
                  </div>
                </div>
              </div>

              {/* Box 2: Tầm nhìn - Medium (col-span-6) */}
              <div className="md:col-span-6 group p-2 rounded-[2.5rem] bg-stone-50 border border-stone-200/40 hover:border-[#5D8D4A]/30 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(93,141,74,0.05)]">
                <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 md:p-10 h-full flex flex-col justify-between border border-stone-100">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#ED9717]/10 text-[#ED9717] flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Award size={22} />
                    </div>
                    <h3 className="text-2xl text-[#3A5B2C] font-bold mb-4">{brandStory?.guidelines?.vision?.title || 'Tầm Nhìn Vươn Xa'}</h3>
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                      {brandStory?.guidelines?.vision?.description || 'Trở thành biểu tượng thương hiệu mỹ phẩm thiên nhiên cho mẹ và bé uy tín hàng đầu Việt Nam.'}
                    </p>
                  </div>
                  <div className="mt-8 pt-6 border-t border-stone-100 flex items-center gap-2 text-xs font-bold text-[#ED9717]">
                    <span>Tự hào thảo dược Việt Nam</span>
                    <CheckCircle2 size={14} className="text-[#ED9717]" />
                  </div>
                </div>
              </div>

              {/* Box 3: Giá trị cốt lõi - Large (col-span-12) */}
              <div className="md:col-span-12 group p-2 rounded-[2.5rem] bg-stone-50 border border-stone-200/40 hover:border-[#5D8D4A]/30 transition-all duration-500 hover:shadow-[0_12px_32px_rgba(93,141,74,0.05)]">
                <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 md:p-10 border border-stone-100">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                    <div className="lg:col-span-1">
                      <div className="w-12 h-12 rounded-2xl bg-[#5D8D4A]/10 text-[#5D8D4A] flex items-center justify-center mb-6">
                        <Sparkles size={22} />
                      </div>
                      <h3 className="text-2xl text-[#3A5B2C] font-bold mb-4">Giá Trị Cốt Lõi</h3>
                      <p className="text-stone-500 text-sm leading-relaxed font-light">
                        Nền tảng giá trị cấu thành nên từng giọt tinh chất Orya, được cam kết thực thi bởi mọi kỹ sư dược và nhà khoa học tại CVI Pharma.
                      </p>
                    </div>

                     <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                       <CoreValues values={brandStory?.guidelines?.coreValues} />
                     </div>

                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {/* Val 1 */}


                      {/* Val 2 */}


                      {/* Val 3 */}

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ORIGIN STORY & NARRATIVE */}
        <section id="hanh-trinh" className="py-24 bg-[#FAF9F5] relative overflow-hidden">
          <div className="max-w-[1000px] mx-auto px-5">

            <div className="relative">
             <Timeline items={brandStory?.timeline} />

              {/* Background decoration lines */}
              <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[1px] bg-stone-200 -z-10"></div>

              {/* Paragraph 1 */}


              {/* Paragraph 2 */}


              {/* Paragraph 3 */}


              {/* Paragraph 4 */}

            </div>

            {/* Inspirational Quote - Double Bezel Card */}
            <div className="mt-24 p-2 rounded-[2.5rem] bg-stone-50 border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 md:p-12 text-center border border-stone-100 relative">
                {/* Background natural leaf silhouette design icon */}
                <div className="absolute top-6 left-6 text-stone-100 opacity-60">
                  <Sparkles size={40} />
                </div>
                <p className="text-xl md:text-2xl text-[#3A5B2C] italic leading-relaxed mb-6 font-light max-w-2xl mx-auto">
                  &quot;{brandStory?.quote?.text || 'Không có tình yêu thương nào lớn hơn tình yêu của người mẹ dành cho con.'}&quot;
                </p>
                <div className="w-10 h-[1px] bg-[#ED9717] mx-auto mb-4"></div>
                <p className="text-xs uppercase tracking-widest font-bold text-stone-400">{brandStory?.quote?.author || 'Dược sĩ Minh Thư'}</p>
                <p className="text-xs text-stone-500 mt-1">{brandStory?.quote?.position || 'Đồng sáng lập & Trưởng phòng Nghiên cứu Công thức Orya'}</p>
              </div>
            </div>

          </div>
        </section>

        {/* THE 5-FREE PROMISE (Cam kết 5 Không) */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-5">

            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5D8D4A] font-bold">{brandStory?.commitmentsHeader?.badge || 'CAM KẾT VÀNG TỪ ORYA'}</span>
              <h2 className="text-3xl md:text-4xl text-[#3A5B2C] font-bold mt-3">{brandStory?.commitmentsHeader?.title || 'Cam kết "5 KHÔNG" tuyệt đối'}</h2>
              <p className="text-stone-500 text-sm md:text-base mt-4 font-light">
                {brandStory?.commitmentsHeader?.description || 'Làn da của trẻ sơ sinh mỏng hơn da người lớn đến 30% và nhạy cảm gấp nhiều lần. Orya kiên quyết loại bỏ hoàn toàn các chất gây hại để bảo vệ con tốt nhất.'}
              </p>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <Commitments items={brandStory?.commitments} />




          </div>

          </div>
        </section>

        {/* MANUFACTURING EXCELLENCE */}
        <section className="py-24 bg-[#FAF9F5] border-t border-stone-200/50">
          <div className="max-w-[1200px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

              {/* Image Box */}
              <div className="order-2 lg:order-1 p-2 rounded-[2.5rem] bg-white border border-stone-200/50 shadow-[0_12px_36px_rgba(0,0,0,0.04)]">
                <div className="rounded-[calc(2.5rem-0.5rem)] overflow-hidden aspect-[4/3] bg-stone-100">
                  <img
                    src={brandStory?.factory?.image || '/placeholder.jpg'}
                    alt="Nhà máy CVI Pharma đạt chuẩn CGMP-ASEAN"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content Box */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#ED9717]/10 text-[#ED9717] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
                  <Factory size={10} />
                  Công nghệ sản xuất
                </div>
                <h2 className="text-3xl md:text-4xl text-[#3A5B2C] font-bold mb-6 leading-snug">
                  {brandStory?.factory?.title || 'Sản xuất tại nhà máy Dược phẩm công nghệ cao CVI Pharma'}
                </h2>
                <p className="text-stone-600 text-base leading-relaxed mb-6 font-light">
                  {brandStory?.factory?.description || 'Toàn bộ sản phẩm của Orya được sản xuất tại tổ hợp nhà máy Công nghệ cao CVI Pharma.'}
                </p>

                <FactoryHighlights highlights={brandStory?.factory?.highlights} />
              </div>

            </div>
          </div>
        </section>

        {/* FINAL CALL TO ACTION */}
        <section className="py-24 bg-gradient-to-br from-[#3A5B2C] to-[#253D1B] text-white relative overflow-hidden">

          {/* Glow decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

          <div className="max-w-[800px] mx-auto px-5 text-center relative z-10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#ED9717] font-bold">Hãy để Orya đồng hành cùng bạn</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 leading-tight">
              {brandStory?.ctaBanner?.title || 'Nâng niu từng giây phút ngọt ngào bên con'}
            </h2>
            <p className="text-stone-300 text-sm md:text-base mb-8 max-w-xl mx-auto font-light leading-relaxed">
              {brandStory?.ctaBanner?.subtitle || 'Chọn sự an tâm tuyệt đối cho con yêu ngay hôm nay. Hãy trải nghiệm giải pháp chăm sóc da thảo dược thuần chay đột phá cùng Orya.'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={brandStory?.ctaBanner?.buttonLink || '/san-pham'}
                className="group inline-flex items-center gap-3 bg-[#ED9717] text-white font-bold px-8 py-4 rounded-full hover:bg-yellow-600 transition-all duration-300 shadow-[0_4px_20px_rgba(237,151,23,0.3)] min-h-[48px] w-full sm:w-auto justify-center"
              >
                {brandStory?.ctaBanner?.buttonLabel || 'Xem dòng sản phẩm'}
                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight size={14} />
                </span>
              </a>
              <a
                href="tel:18001800"
                className="inline-flex items-center justify-center font-bold px-8 py-4 rounded-full border border-white/30 hover:bg-white/10 transition-colors duration-300 w-full sm:w-auto min-h-[48px]"
              >
                Nhận tư vấn miễn phí
              </a>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}