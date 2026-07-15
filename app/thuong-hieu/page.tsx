"use client";

import React, { useEffect, useState } from "react";
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  Award, 
  Leaf, 
  ArrowRight,
  CheckCircle2,
  FileText,
  FlameKindling,
  Factory
} from "lucide-react";
import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

export default function BrandStoryPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
              <div className={`lg:col-span-6 transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 bg-[#5D8D4A]/10 text-[#5D8D4A] text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
                  <Sparkles size={10} className="animate-pulse" />
                  Câu Chương Thương Hiệu
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-[#3A5B2C] font-bold leading-[1.15] tracking-tight mb-8">
                  Khởi nguồn từ <br />
                  <span className="italic text-[#ED9717] font-normal">tình mẫu tử</span> & <br />
                  khoa học thảo dược
                </h1>
                
                <p className="text-stone-600 text-lg md:text-xl leading-relaxed mb-6 font-light">
                  Orya không chỉ là một thương hiệu mỹ phẩm. Orya là lời hứa thiêng liêng của những người mẹ làm khoa học, mong muốn mang lại sự vỗ về dịu lành nhất cho làn da non nớt của con trẻ và vẻ đẹp rạng rỡ của mẹ.
                </p>
                
                <p className="text-stone-500 text-base md:text-md leading-relaxed mb-8">
                  Xuất phát từ các nghiên cứu chuyên sâu về dược học thiên nhiên tại CVI Pharma, chúng tôi thấu hiểu từng tế bào da nhạy cảm cần gì để phát triển khỏe mạnh, tự nhiên mà không cần đến hóa chất nhân tạo độc hại.
                </p>
                
                <div className="flex flex-wrap gap-4 items-center">
                  <a
                    href="/san-pham"
                    className="group inline-flex items-center gap-3 bg-[#5D8D4A] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#4d753d] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_20px_rgba(93,141,74,0.15)] min-h-[48px]"
                  >
                    Khám phá sản phẩm
                    <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-1">
                      <ArrowRight size={14} />
                    </span>
                  </a>
                  
                  <a 
                    href="#hanh-trinh"
                    className="inline-flex items-center text-sm font-bold text-[#5D8D4A] hover:text-[#4d753d] px-4 py-2 transition-colors duration-300"
                  >
                    Đọc tiếp hành trình ↓
                  </a>
                </div>
              </div>
              
              {/* Right Photo Cascade (Z-Axis Cascade Archetype) */}
              <div className="lg:col-span-6 relative mt-10 lg:mt-0">
                <div className="relative w-full max-w-[500px] mx-auto aspect-[4/5]">
                  
                  {/* Decorative glowing orb */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#5D8D4A]/10 rounded-full blur-[80px] pointer-events-none -z-10"></div>
                  
                  {/* Back Image (Botanical/Natural) */}
                  <div className={`absolute top-0 right-0 w-[65%] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-stone-200/50 transition-all duration-1000 delay-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'translate-y-0 translate-x-0 opacity-80' : 'translate-y-8 translate-x-8 opacity-0'}`}>
                    <img 
                      src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" 
                      alt="Thảo dược thiên nhiên"
                      className="w-full h-full object-cover filter sepia-[10%] hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  {/* Front Image (Mother & Baby) - Double Bezel Architecture */}
                  <div className={`absolute bottom-0 left-0 w-[75%] p-2 rounded-[2.5rem] bg-stone-50 border border-stone-200/50 shadow-[0_12px_40px_rgba(36,85,143,0.1)] transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'translate-y-0 translate-x-0 opacity-100' : 'translate-y-12 -translate-x-8 opacity-0'}`}>
                    <div className="rounded-[calc(2.5rem-0.5rem)] overflow-hidden aspect-[4/5] bg-stone-100">
                      <img 
                        src="/about.jpg" 
                        alt="Tình mẫu tử Orya"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          // fallback if local file doesn't exist
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=600&q=80";
                        }}
                      />
                    </div>
                  </div>

                  {/* Small floating badge */}
                  <div className={`absolute top-[40%] left-[-5%] bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200/60 p-4 shadow-[0_8px_30px_rgba(0,0,0,0.05)] transition-all duration-1000 delay-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${mounted ? 'scale-100 opacity-100' : 'scale-75 opacity-0'}`}>
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
              <h2 className="text-3xl md:text-4xl text-[#3A5B2C] font-bold mt-3">Kim chỉ nam cho mọi bước đi</h2>
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
                    <h3 className="text-2xl text-[#3A5B2C] font-bold mb-4">Sứ Mệnh Dịu Lành</h3>
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                      Mang đến những giải pháp chăm sóc làn da tối ưu bằng thảo dược thuần khiết. Orya mong muốn bảo vệ sức khỏe làn da mẹ và bé khỏi các hóa chất độc hại ngay từ những năm tháng đầu đời, tạo dựng nền tảng vững vàng cho một cuộc sống xanh, an lành và hạnh phúc.
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
                    <h3 className="text-2xl text-[#3A5B2C] font-bold mb-4">Tầm Nhìn Vươn Xa</h3>
                    <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                      Trở thành biểu tượng thương hiệu mỹ phẩm thiên nhiên cho mẹ và bé uy tín hàng đầu Việt Nam và vươn tầm Đông Nam Á. Chúng tôi tiên phong trong ứng dụng công nghệ sinh học hiện đại để nâng tầm giá trị dược liệu truyền thống của dân tộc, mang niềm tự hào Việt đi khắp muôn phương.
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
                      {/* Val 1 */}
                      <div className="p-5 rounded-2xl bg-stone-50 hover:bg-[#5D8D4A]/5 transition-colors duration-300">
                        <h4 className="font-bold text-[#3A5B2C] text-md mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#5D8D4A]"></span>
                          An Toàn Tuyệt Đối
                        </h4>
                        <p className="text-stone-500 text-xs leading-relaxed font-light">
                          Mọi thành phần thảo dược đều đạt độ tinh khiết cao nhất, không chứa độc tố hay chất cấm gây hại cho làn da mỏng manh.
                        </p>
                      </div>

                      {/* Val 2 */}
                      <div className="p-5 rounded-2xl bg-stone-50 hover:bg-[#5D8D4A]/5 transition-colors duration-300">
                        <h4 className="font-bold text-[#3A5B2C] text-md mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#ED9717]"></span>
                          Khoa Học Tiên Phong
                        </h4>
                        <p className="text-stone-500 text-xs leading-relaxed font-light">
                          Công nghệ chiết xuất nano và công nghệ sinh học hiện đại giúp phát huy tối đa dược tính của nguyên liệu tự nhiên.
                        </p>
                      </div>

                      {/* Val 3 */}
                      <div className="p-5 rounded-2xl bg-stone-50 hover:bg-[#5D8D4A]/5 transition-colors duration-300">
                        <h4 className="font-bold text-[#3A5B2C] text-md mb-2 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#5D8D4A]"></span>
                          Trách Nhiệm & Tâm Huyết
                        </h4>
                        <p className="text-stone-500 text-xs leading-relaxed font-light">
                          Đặt lợi ích sức khỏe lâu dài của trẻ em lên hàng đầu, cam kết đồng hành cùng các bậc cha mẹ trong hành trình khôn lớn.
                        </p>
                      </div>
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
              {/* Background decoration lines */}
              <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-[1px] bg-stone-200 -z-10"></div>
              
              {/* Paragraph 1 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
                <div className="md:text-right md:pr-12 md:pt-4">
                  <span className="text-[11px] font-bold text-[#ED9717] uppercase tracking-widest bg-[#ED9717]/10 px-3 py-1 rounded-full">
                    Năm 2018
                  </span>
                </div>
                <div className="absolute left-[10px] md:left-1/2 -translate-x-[11px] w-6 h-6 rounded-full border-4 border-[#FAF9F5] bg-[#5D8D4A] shadow-[0_0_10px_rgba(93,141,74,0.3)] z-10"></div>
                <div className="pl-8 md:pl-12">
                  <h3 className="text-xl md:text-2xl text-[#3A5B2C] font-bold mb-3">
                    Nỗi trăn trở của người mẹ Dược sĩ
                  </h3>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                    Khởi đầu của Orya là câu chuyện rất riêng tư của Dược sĩ Minh Thư - Trưởng phòng Nghiên cứu Công thức tại CVI Pharma. Khi sinh bé gái đầu lòng với làn da cực kỳ nhạy cảm, dễ bị mẩn ngứa, chàm sữa, chị đã lục tung thị trường để tìm kiếm các dòng tắm gội dịu nhẹ. Tuy nhiên, phần lớn các sản phẩm nhập khẩu đắt đỏ hay nội địa bình dân lúc đó đều chứa hương liệu nhân tạo và chất bảo quan sulfate, paraben.
                  </p>
                </div>
              </div>

              {/* Paragraph 2 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
                <div className="md:order-2 md:pl-12 md:pt-4">
                  <span className="text-[11px] font-bold text-[#5D8D4A] uppercase tracking-widest bg-[#5D8D4A]/10 px-3 py-1 rounded-full">
                    Năm 2020
                  </span>
                </div>
                <div className="absolute left-[10px] md:left-1/2 -translate-x-[11px] w-6 h-6 rounded-full border-4 border-[#FAF9F5] bg-[#ED9717] shadow-[0_0_10px_rgba(237,151,23,0.3)] z-10"></div>
                <div className="pl-8 md:pl-12 md:text-right md:order-1 md:pr-12">
                  <h3 className="text-xl md:text-2xl text-[#3A5B2C] font-bold mb-3">
                    Cái bắt tay của các nhà khoa học CVI
                  </h3>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                    Hiểu được khó khăn của hàng triệu người mẹ khác, chị Minh Thư đã cùng các đồng nghiệp tại phòng Lab CVI Pharma bắt đầu hành trình dài 2 năm nghiên cứu. Họ tìm kiếm các loại thảo dược bản địa có đặc tính kháng viêm, cấp ẩm tự nhiên tốt nhất như Mướp đắng, Cúc La Mã, Trà xanh và Kim ngân hoa. Bằng kỹ thuật chiết tách công nghệ cao, họ đã loại bỏ hoàn toàn các tạp chất, giữ lại phần tinh túy nhất cho làn da non nớt.
                  </p>
                </div>
              </div>

              {/* Paragraph 3 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-start">
                <div className="md:text-right md:pr-12 md:pt-4">
                  <span className="text-[11px] font-bold text-[#ED9717] uppercase tracking-widest bg-[#ED9717]/10 px-3 py-1 rounded-full">
                    Năm 2022
                  </span>
                </div>
                <div className="absolute left-[10px] md:left-1/2 -translate-x-[11px] w-6 h-6 rounded-full border-4 border-[#FAF9F5] bg-[#5D8D4A] shadow-[0_0_10px_rgba(93,141,74,0.3)] z-10"></div>
                <div className="pl-8 md:pl-12">
                  <h3 className="text-xl md:text-2xl text-[#3A5B2C] font-bold mb-3">
                    Hiện thực hóa giấc mơ Orya
                  </h3>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                    Năm 2022, dòng tắm gội thảo dược trẻ em Orya đầu tiên ra mắt thị trường, nhanh chóng nhận được phản hồi tích cực từ các mẹ bỉm sữa nhờ hương thơm thảo mộc dịu nhẹ đặc trưng, khả năng ngừa rôm sảy vượt trội mà không làm khô da bé. Sự tin yêu của cộng đồng trở thành động lực to lớn để Orya tiếp tục nghiên cứu và mở rộng các dòng sản phẩm dành riêng cho mẹ bầu và mẹ sau sinh.
                  </p>
                </div>
              </div>

              {/* Paragraph 4 */}
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="md:order-2 md:pl-12 md:pt-4">
                  <span className="text-[11px] font-bold text-[#5D8D4A] uppercase tracking-widest bg-[#5D8D4A]/10 px-3 py-1 rounded-full">
                    Hiện Tại
                  </span>
                </div>
                <div className="absolute left-[10px] md:left-1/2 -translate-x-[11px] w-6 h-6 rounded-full border-4 border-[#FAF9F5] bg-[#ED9717] shadow-[0_0_10px_rgba(237,151,23,0.3)] z-10"></div>
                <div className="pl-8 md:pl-12 md:text-right md:order-1 md:pr-12">
                  <h3 className="text-xl md:text-2xl text-[#3A5B2C] font-bold mb-3">
                    Đồng hành cùng hàng triệu gia đình Việt
                  </h3>
                  <p className="text-stone-500 text-sm md:text-base leading-relaxed font-light">
                    Giờ đây, Orya tự hào có mặt tại hơn 500 cửa hàng mẹ & bé, các nhà thuốc và bệnh viện phụ sản trên cả nước. Trở thành một phần không thể thiếu trong hành trình nuôi con khôn lớn của hàng triệu ông bố bà mẹ Việt Nam.
                  </p>
                </div>
              </div>

            </div>

            {/* Inspirational Quote - Double Bezel Card */}
            <div className="mt-24 p-2 rounded-[2.5rem] bg-stone-50 border border-stone-200/50 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
              <div className="bg-white rounded-[calc(2.5rem-0.5rem)] p-8 md:p-12 text-center border border-stone-100 relative">
                {/* Background natural leaf silhouette design icon */}
                <div className="absolute top-6 left-6 text-stone-100 opacity-60">
                  <Sparkles size={40} />
                </div>
                <p className="text-xl md:text-2xl text-[#3A5B2C] italic leading-relaxed mb-6 font-light max-w-2xl mx-auto">
                  "Không có tình yêu thương nào lớn hơn tình yêu của người mẹ dành cho con. Và tại Orya, chúng tôi biến tình yêu thương đó thành những sản phẩm tinh khiết, khoa học và dịu lành nhất."
                </p>
                <div className="w-10 h-[1px] bg-[#ED9717] mx-auto mb-4"></div>
                <p className="text-xs uppercase tracking-widest font-bold text-stone-400">Dược sĩ Minh Thư</p>
                <p className="text-xs text-stone-500 mt-1">Đồng sáng lập & Trưởng phòng Nghiên cứu Công thức Orya</p>
              </div>
            </div>

          </div>
        </section>

        {/* THE 5-FREE PROMISE (Cam kết 5 Không) */}
        <section className="py-24 bg-white">
          <div className="max-w-[1200px] mx-auto px-5">
            
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#5D8D4A] font-bold">Cam kết vàng từ Orya</span>
              <h2 className="text-3xl md:text-4xl text-[#3A5B2C] font-bold mt-3">Cam kết "5 KHÔNG" tuyệt đối</h2>
              <p className="text-stone-500 text-sm md:text-base mt-4 font-light">
                Làn da của trẻ sơ sinh mỏng hơn da người lớn đến 30% và nhạy cảm gấp nhiều lần. Orya kiên quyết loại bỏ hoàn toàn các chất gây hại để bảo vệ con tốt nhất.
              </p>
            </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            
            {/* Item 1 */}
            <div className="group p-2 rounded-[2rem] bg-stone-50 border border-stone-200/40 hover:border-red-100 hover:bg-red-50/10 transition-all duration-300">
              <div className="bg-white group-hover:bg-red-50/5 rounded-[calc(2rem-0.5rem)] p-6 text-center border border-stone-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-red-100">
                    01
                  </div>
                  <h3 className="font-bold text-[#3A5B2C] text-base mb-2">Không Paraben</h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">
                    Chất bảo quản hóa học có nguy cơ gây mất cân bằng nội tiết tố và kích ứng mạnh cho làn da mẫn cảm.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="group p-2 rounded-[2rem] bg-stone-50 border border-stone-200/40 hover:border-red-100 hover:bg-red-50/10 transition-all duration-300">
              <div className="bg-white group-hover:bg-red-50/5 rounded-[calc(2rem-0.5rem)] p-6 text-center border border-stone-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-red-100">
                    02
                  </div>
                  <h3 className="font-bold text-[#3A5B2C] text-base mb-2">Không SLS/SLES</h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">
                    Chất tạo bọt công nghiệp làm mất đi lớp màng lipid bảo vệ tự nhiên của da, gây khô ráp và nứt nẻ.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="group p-2 rounded-[2rem] bg-stone-50 border border-stone-200/40 hover:border-red-100 hover:bg-red-50/10 transition-all duration-300">
              <div className="bg-white group-hover:bg-red-50/5 rounded-[calc(2rem-0.5rem)] p-6 text-center border border-stone-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-red-100">
                    03
                  </div>
                  <h3 className="font-bold text-[#3A5B2C] text-base mb-2">Không Dầu Khoáng</h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">
                    Mineral Oil có nguy cơ bít tắc lỗ chân lông da trẻ, cản trở quá trình bài tiết tự nhiên dễ sinh rôm sảy.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="group p-2 rounded-[2rem] bg-stone-50 border border-stone-200/40 hover:border-red-100 hover:bg-red-50/10 transition-all duration-300">
              <div className="bg-white group-hover:bg-red-50/5 rounded-[calc(2rem-0.5rem)] p-6 text-center border border-stone-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-red-100">
                    04
                  </div>
                  <h3 className="font-bold text-[#3A5B2C] text-base mb-2">Không Hương Liệu</h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">
                    Hương liệu tổng hợp (Fragrance) là tác nhân hàng đầu gây viêm da dị ứng và hắt hơi ở trẻ sơ sinh.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 5 */}
            <div className="group p-2 rounded-[2rem] bg-stone-50 border border-stone-200/40 hover:border-red-100 hover:bg-red-50/10 transition-all duration-300">
              <div className="bg-white group-hover:bg-red-50/5 rounded-[calc(2rem-0.5rem)] p-6 text-center border border-stone-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-6 text-xl font-bold border border-red-100">
                    05
                  </div>
                  <h3 className="font-bold text-[#3A5B2C] text-base mb-2">Không Thử Nghiệm</h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">
                    Orya cam kết nhân đạo, không thử nghiệm trên động vật và sử dụng nguyên liệu có nguồn gốc bền vững.
                  </p>
                </div>
              </div>
            </div>

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
                    src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80" 
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
                  Sản xuất tại nhà máy Dược phẩm công nghệ cao CVI Pharma
                </h2>
                <p className="text-stone-600 text-base leading-relaxed mb-6 font-light">
                  Toàn bộ sản phẩm của Orya được sản xuất tại tổ hợp nhà máy Công nghệ cao CVI Pharma tại Khu công nghệ cao Hòa Lạc. Đây là một trong số ít nhà máy đạt tiêu chuẩn <strong>CGMP-ASEAN</strong> (Thực hành tốt sản xuất mỹ phẩm của Hiệp hội các quốc gia Đông Nam Á).
                </p>
                
                <ul className="space-y-4">
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-[#5D8D4A]/10 text-[#5D8D4A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-stone-800 text-sm">Hệ thống phòng sạch chuẩn ISO:</strong>
                      <p className="text-stone-500 text-xs mt-1">Đảm bảo môi trường vô trùng tuyệt đối trong quá trình pha chế và đóng gói sản phẩm.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-[#5D8D4A]/10 text-[#5D8D4A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-stone-800 text-sm">Công nghệ chiết xuất siêu âm & Nano:</strong>
                      <p className="text-stone-500 text-xs mt-1">Giúp chia nhỏ kích thước các hoạt chất tự nhiên để da bé hấp thụ sâu mà không để lại lượng cặn dính bí.</p>
                    </div>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-[#5D8D4A]/10 text-[#5D8D4A] flex items-center justify-center flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <strong className="text-stone-800 text-sm">Kiểm định chất lượng 3 cấp độ:</strong>
                      <p className="text-stone-500 text-xs mt-1">Từ kiểm nghiệm nguyên liệu đầu vào đến kiểm tra bán thành phẩm và kiểm định lâm sàng độc lập trước khi xuất xưởng.</p>
                    </div>
                  </li>
                </ul>
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
              Nâng niu từng giây phút ngọt ngào bên con
            </h2>
            <p className="text-stone-300 text-sm md:text-base mb-8 max-w-xl mx-auto font-light leading-relaxed">
              Chọn sự an tâm tuyệt đối cho con yêu ngay hôm nay. Hãy trải nghiệm giải pháp chăm sóc da thảo dược thuần chay đột phá cùng Orya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/san-pham"
                className="group inline-flex items-center gap-3 bg-[#ED9717] text-white font-bold px-8 py-4 rounded-full hover:bg-yellow-600 transition-all duration-300 shadow-[0_4px_20px_rgba(237,151,23,0.3)] min-h-[48px] w-full sm:w-auto justify-center"
              >
                Xem dòng sản phẩm
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