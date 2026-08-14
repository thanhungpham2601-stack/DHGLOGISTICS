import { Phone, Mail, MapPin, ShieldCheck, ArrowRight, ExternalLink } from 'lucide-react';
import { COMPANY_INFO, CORE_SERVICES } from '../data/companyData';

interface FooterProps {
  onOpenQuote: () => void;
}

export function Footer({ onOpenQuote }: FooterProps) {
  return (
    <footer id="contact" className="bg-[#f1f5f4] text-slate-500 border-t border-[#e2e9e5] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#e4ebe8]">
          
          {/* Col 1: Brand & Slogan */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#5cb83a] to-[#2e7418] rounded-lg border border-[#83e05e]/40 shadow-md">
                <span className="font-black text-xl text-[#09110e] font-mono">DHG</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-black text-2xl text-slate-900 font-heading tracking-wider">DHG</span>
                  <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#5cb83a]/20 text-[#1f6b12] border border-[#5cb83a]/40 tracking-widest">
                    HEAVY HAUL
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-wider block">
                  ENGINEERING • LOGISTICS • HEAVY HAUL
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {COMPANY_INFO.description}
            </p>

            {/* Safety Certification Badge */}
            <div className="p-3.5 rounded-xl bg-[#ecf1ef] border border-[#dde6e1] flex items-center gap-3">
              <ShieldCheck className="w-7 h-7 text-[#1f6b12] shrink-0" />
              <div className="text-xs">
                <span className="font-bold text-slate-900 block">CHỨNG NHẬN TIÊU CHUẨN</span>
                <span className="text-slate-500 text-[11px]">ISO 9001:2015 & Giấy phép lưu hành Bộ GTVT</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="w-full py-3 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-[#1f6b12]/20"
              >
                Gửi Yêu Cầu Báo Giá Nhanh →
              </button>
            </div>
          </div>

          {/* Col 2: 6 Main Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono text-[#1f6b12]">
              DỊCH VỤ VẬN CHUYỂN
            </h4>
            <ul className="space-y-2 text-xs">
              {CORE_SERVICES.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="hover:text-slate-900 hover:underline transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-[#1f6b12] text-[10px] font-mono">{s.number}.</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Offices Nationwide */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest font-mono text-[#1f6b12]">
              MẠNG LƯỚI VĂN PHÒNG & BÃI XE TOÀN QUỐC
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {COMPANY_INFO.offices.map((off, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-[#ebf1ef] border border-[#dee7e2] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <MapPin className="w-3.5 h-3.5 text-[#1f6b12]" />
                    <span>Chi Nhánh {off.city}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {off.address}
                  </p>
                  <p className="text-[11px] text-[#1f6b12] font-mono">
                    Tel: {off.phone}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Contact Hotline */}
            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs">
              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className="flex items-center gap-2 text-slate-900 font-mono font-bold hover:text-[#1f6b12]"
              >
                <Phone className="w-4 h-4 text-[#1f6b12]" />
                <span>Hotline 24/7: {COMPANY_INFO.hotlineFormatted}</span>
              </a>
              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-slate-700 hover:text-slate-900"
              >
                <Mail className="w-4 h-4 text-[#1f6b12]" />
                <span>{COMPANY_INFO.email}</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} DHG Heavy Haul Logistics Vietnam. Bản quyền thuộc về Công ty DHG.
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <a href="#hero" className="hover:text-slate-900 transition-colors">Trang chủ</a>
            <a href="#services" className="hover:text-slate-900 transition-colors">Dịch vụ</a>
            <a href="#fleet" className="hover:text-slate-900 transition-colors">Đội xe</a>
            <a href="#projects" className="hover:text-slate-900 transition-colors">Dự án</a>
            <a href="#process" className="hover:text-slate-900 transition-colors">Quy trình</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
