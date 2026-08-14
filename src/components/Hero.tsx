import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, MapPin, ChevronLeft, ChevronRight, CheckCircle, ExternalLink, Sparkles, Truck, Eye } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

import bannerWindBlade from '../assets/images/dhg_heavy_haul_wind_blade_1786671304592.jpg';
import bannerTransformer from '../assets/images/dhg_heavy_haul_transformer_1786671321288.jpg';
import bannerRefinerySilo from '../assets/images/dhg_heavy_haul_refinery_silo_1786671334428.jpg';
import bannerExcavatorLowbed from '../assets/images/dhg_heavy_haul_excavator_lowbed_1786671346913.jpg';

interface HeroProps {
  onOpenQuote: () => void;
  onOpenSurvey: () => void;
}

export const HERO_SLIDES = [
  {
    id: 1,
    tag: "BANNER 01 • DỰ ÁN NĂNG LƯỢNG TÁI TẠO",
    titleLine1: "VẬN CHUYỂN",
    titleLine2: "CÁNH QUẠT ĐIỆN GIÓ",
    titleLine3: "KHẨU ĐỘ 85M",
    desc: "Đoàn xe DHG Heavy Haul đầu kéo công suất 800HP kết hợp rơ-moóc rút chuyên dụng 55m bẻ lái tự động, vượt hơn 240km đường đèo dốc Tây Nguyên an toàn tuyệt đối.",
    highlights: ["Rơ-moóc rút dài 55m", "Bẻ lái thủy lực trục sau", "Xe hoa tiêu dẫn đường 24/7", "Logo DHG độc quyền"],
    bgImage: bannerWindBlade,
    truckModel: "Đầu kéo DHG Heavy Haul 8x4 800HP + Mooc rút 55m",
    cargoBadge: "85M CHIỀU DÀI NGOẠI CỠ",
    cargoSub: "Hơn 120 cánh quạt điện gió vận chuyển an toàn",
  },
  {
    id: 2,
    tag: "BANNER 02 • TRUYỀN TẢI ĐIỆN QUỐC GIA",
    titleLine1: "VẬN CHUYỂN",
    titleLine2: "MÁY BIẾN ÁP 500KV",
    titleLine3: "200+ TẤN",
    desc: "Tổ hợp đầu kéo DHG 8x4 phối hợp dàn rơ-moóc thủy lực đa trục Goldhofer/Scheuerle phân bổ tải trọng hoàn hảo qua các cây cầu trọng điểm quốc gia.",
    highlights: ["Mooc thủy lực 24 trục", "Nâng hạ gầm cân bằng 3D", "Gia cường tạm cầu yếu", "Áp tải cảnh sát giao thông"],
    bgImage: bannerTransformer,
    truckModel: "Đoàn xe DHG Mooc Thủy Lực Đa Trục 200T",
    cargoBadge: "200 TẤN TẢI TRỌNG TRỤC",
    cargoSub: "Phục vụ các trạm biến áp 500kV trọng điểm",
  },
  {
    id: 3,
    tag: "BANNER 03 • LỌC HÓA DẦU & ÁP LỰC CAO",
    titleLine1: "VẬN CHUYỂN",
    titleLine2: "THÁP LỌC DẦU & SILO",
    titleLine3: "150+ TẤN",
    desc: "Hành trình vận chuyển ban đêm (22:00 - 05:00) từ cầu cảng nước sâu về bệ móng nhà máy lọc hóa dầu bằng 2 đầu kéo DHG đẩy - kéo đồng bộ.",
    highlights: ["Đầu kéo DHG đẩy & kéo", "Nâng hạ tĩnh không đường điện", "Giám sát GPS Telematics 24/7", "Bảo hiểm 100% tài sản"],
    bgImage: bannerRefinerySilo,
    truckModel: "Cụm 2 đầu kéo DHG 800HP + Mooc thủy lực ghép đôi",
    cargoBadge: "150 TẤN NGUYÊN KHỐI",
    cargoSub: "Vận chuyển ban đêm chuyên biệt từ cảng biển",
  },
  {
    id: 4,
    tag: "BANNER 04 • CƠ GIỚI & MÁY CÔNG TRÌNH",
    titleLine1: "VẬN CHUYỂN",
    titleLine2: "MÁY ĐÀO MỎ LIEBHERR",
    titleLine3: "90+ TẤN",
    desc: "Sơ-mi rơ-moóc sàn thấp (Lowbed) hạ sàn 40cm tháo rời cổ ngỗng tự hành, điều chuyển máy công trình hạng nặng giữa các đại công trường Bắc - Nam.",
    highlights: ["Sàn lùn hạ đáy 40cm", "Cổ ngỗng thủy lực tháo rời", "Lên xuống xe máy xúc 15 phút", "Chứng nhận lưu hành 63 tỉnh"],
    bgImage: bannerExcavatorLowbed,
    truckModel: "Đầu kéo DHG Heavy Haul + Mooc lùn 6 trục",
    cargoBadge: "90 TẤN MÁY ĐÀO BÁNH XÍCH",
    cargoSub: "Điều chuyển máy móc công trình liên tỉnh",
  },
];

export function Hero({ onOpenQuote, onOpenSurvey }: HeroProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center pt-24 pb-12 overflow-hidden bg-[#070e0b]">
      {/* Background Graphic & Texture */}
      <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />
      
      {/* Dynamic Background Image with sophisticated cinematic gradient masks */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {HERO_SLIDES.map((s, idx) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === currentSlide ? 'opacity-40 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
            style={{
              backgroundImage: `url('${s.bgImage}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
              transition: 'opacity 1s ease-in-out, transform 8s ease-out'
            }}
          />
        ))}
        {/* Gradients to match the exact dark green-black styling */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070e0b] via-[#070e0b]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070e0b] via-transparent to-[#070e0b]/60" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Main Typography & CTAs (Exact match to screenshot) */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-6">
            
            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#13241b]/90 border border-[#234232] text-xs font-semibold text-[#8de068] tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#5cb83a] animate-pulse" />
              <span>{slide.tag}</span>
            </div>

            {/* Giant Heading matching screenshot */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-white font-heading leading-[0.95]">
                <div>{slide.titleLine1}</div>
                <div className="text-[#5cb83a] drop-shadow-sm">{slide.titleLine2}</div>
                <div className="text-[#5cb83a] drop-shadow-sm">{slide.titleLine3}</div>
              </h1>
            </div>

            {/* Subtitle tag from screenshot: ENGINEERING • LOGISTICS • HEAVY HAUL */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-300 tracking-widest font-mono">
              <span>ENGINEERING</span>
              <span className="text-[#5cb83a]">•</span>
              <span>LOGISTICS</span>
              <span className="text-[#5cb83a]">•</span>
              <span>HEAVY HAUL</span>
            </div>

            {/* Short Paragraph description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              {slide.desc}
            </p>

            {/* Feature Pills from PDF */}
            <div className="grid grid-cols-2 gap-2 w-full max-w-lg pt-1">
              {slide.highlights.map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300 bg-[#0f1d16]/70 px-2.5 py-1.5 rounded border border-[#1d3528]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#5cb83a] shrink-0" />
                  <span className="truncate">{item}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons matching screenshot */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={onOpenSurvey}
                id="hero-survey-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#070e0b] font-extrabold text-sm tracking-wider uppercase transition-all duration-200 shadow-xl shadow-[#5cb83a]/30 hover:shadow-[#5cb83a]/50 hover:-translate-y-0.5 cursor-pointer"
              >
                <span>KHẢO SÁT DỰ ÁN</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#projects"
                id="hero-view-projects-btn"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#122018]/90 hover:bg-[#1a2d22] text-white font-bold text-sm tracking-wider uppercase border border-[#274435] hover:border-[#5cb83a]/60 transition-all duration-200 cursor-pointer"
              >
                <span>XEM DỰ ÁN</span>
              </a>

              <button
                onClick={onOpenQuote}
                id="hero-quote-btn"
                className="text-xs font-semibold text-slate-300 hover:text-[#83e05e] underline underline-offset-4 ml-2"
              >
                Nhận báo giá nhanh trong 15 phút →
              </button>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Floating Metrics */}
          <div className="lg:col-span-5 relative flex flex-col justify-between items-end h-full">
            
            {/* Top Floating Badge (Exact match to "2M+ KM AN TOÀN TRÊN MỌI CUNG ĐƯỜNG" in screenshot) */}
            <div className="w-full sm:w-auto self-end bg-[#13221b]/95 backdrop-blur-md border border-[#284938] rounded-xl p-5 shadow-2xl mb-8 relative group hover:border-[#5cb83a] transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#5cb83a]/15 rounded-lg border border-[#5cb83a]/30 text-[#83e05e]">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-black text-white font-heading tracking-tight flex items-baseline gap-1">
                    <span>{slide.cargoBadge.split(' ')[0]}</span>
                    <span className="text-xs font-bold text-[#83e05e] uppercase tracking-wider font-mono">
                      CHỨNG NHẬN
                    </span>
                  </div>
                  <div className="text-xs font-extrabold text-slate-200 uppercase tracking-wide mt-0.5">
                    {slide.cargoBadge.substring(slide.cargoBadge.indexOf(' ') + 1)}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    {slide.cargoSub}
                  </div>
                </div>
              </div>
            </div>

            {/* Truck Preview Card */}
            <div className="w-full bg-gradient-to-t from-[#0d1813] to-[#122019] border border-[#223d2f] rounded-xl p-4 shadow-xl">
              <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-[#1c3226]">
                <span className="flex items-center gap-1.5 font-mono text-[#83e05e]">
                  <span className="w-2 h-2 rounded-full bg-[#5cb83a] animate-ping"></span>
                  PHƯƠNG TIỆN DHG HEAVY HAUL
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-[#16291f] px-2 py-0.5 rounded border border-[#254232]">
                  BANNER 0{currentSlide + 1} / 04
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-[11px] text-slate-400 font-mono uppercase">Cấu hình đoàn xe DHG</p>
                  <p className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#5cb83a] shrink-0" />
                    <span className="truncate">{slide.truckModel}</span>
                  </p>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="text-xs font-bold px-3 py-2 rounded-lg bg-[#5cb83a] text-[#09110e] hover:bg-[#6dd144] transition-all shadow-md shrink-0"
                >
                  Báo Giá Xe Này
                </button>
              </div>
            </div>

            {/* Slide Pagination & Navigation 01 / 04 */}
            <div className="flex items-center justify-between w-full mt-6 pt-4 border-t border-[#1a2f24]">
              {/* Slide Counter */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {HERO_SLIDES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentSlide(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        i === currentSlide ? 'w-8 bg-[#5cb83a]' : 'w-2 bg-[#253f31] hover:bg-[#345844]'
                      }`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold font-mono text-slate-300">
                  <span className="text-[#83e05e]">0{currentSlide + 1}</span>
                  <span className="text-slate-500"> / 0{HERO_SLIDES.length}</span>
                </span>
              </div>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
                  className="p-2 rounded-lg bg-[#111f18] hover:bg-[#1a2f24] text-slate-300 hover:text-white border border-[#243d31] transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="p-2 rounded-lg bg-[#111f18] hover:bg-[#1a2f24] text-slate-300 hover:text-white border border-[#243d31] transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* 4 Interactive Banner Thumbnails Bar */}
        <div className="mt-12 pt-8 border-t border-[#182a20]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#5cb83a]" />
              <span className="text-xs font-mono font-bold text-white tracking-widest uppercase">
                4 HÌNH ẢNH BANNER ĐỘI XE SIÊU TRƯỜNG SIÊU TRỌNG DHG
              </span>
            </div>
            <span className="text-[11px] text-slate-400 hidden sm:inline font-mono">
              Nhấn vào từng banner để chuyển góc nhìn & xem cấu hình
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {HERO_SLIDES.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentSlide(idx)}
                className={`relative group text-left rounded-xl overflow-hidden border transition-all duration-300 p-2 sm:p-2.5 flex flex-col justify-between ${
                  currentSlide === idx
                    ? 'bg-[#152a1e] border-[#5cb83a] shadow-lg shadow-[#5cb83a]/20 scale-[1.02]'
                    : 'bg-[#0d1712]/90 border-[#1d3326] hover:border-[#38634c] hover:bg-[#111f18]'
                }`}
              >
                {/* Thumbnail Image */}
                <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-2 bg-[#09110e]">
                  <img
                    src={item.bgImage}
                    alt={item.titleLine2}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* DHG Logo Badge */}
                  <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-[#09110e]/80 border border-[#5cb83a]/60 text-[9px] font-mono font-black text-[#83e05e]">
                    DHG HEAVY HAUL
                  </div>

                  <div className="absolute bottom-1 right-1.5 text-[10px] font-mono font-bold text-white bg-black/60 px-1 rounded">
                    0{idx + 1}
                  </div>
                </div>

                {/* Banner Caption */}
                <div>
                  <p className={`text-[11px] font-bold uppercase truncate transition-colors ${
                    currentSlide === idx ? 'text-[#83e05e]' : 'text-slate-200 group-hover:text-white'
                  }`}>
                    {item.titleLine2}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {item.titleLine3} • {item.cargoBadge.split(' ')[0]}
                  </p>
                </div>

                {/* Active Indicator Bar */}
                <div className={`mt-2 h-1 rounded-full w-full transition-all duration-300 ${
                  currentSlide === idx ? 'bg-[#5cb83a]' : 'bg-[#1a3024]'
                }`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
