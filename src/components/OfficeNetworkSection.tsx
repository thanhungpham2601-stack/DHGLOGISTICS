import { useState } from 'react';
import { MapPin, Phone, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Reveal } from './Reveal';

const OFFICE_ORDER = ['Hà Nội', 'Hải Phòng', 'Đà Nẵng', 'TP. Hồ Chí Minh'];

export function OfficeNetworkSection() {
  const offices = [...COMPANY_INFO.offices].sort(
    (a, b) => OFFICE_ORDER.indexOf(a.city) - OFFICE_ORDER.indexOf(b.city),
  );
  const [active, setActive] = useState(0);

  return (
    <section id="network" className="relative py-20 bg-[#eeeff3] border-b border-[#e1e3e9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono bg-[#e6e7ed] px-3.5 py-1.5 rounded-full border border-[#d9dce4]">
              <MapPin className="w-3.5 h-3.5 text-[#0b6fa8]" />
              <span>MẠNG LƯỚI TOÀN QUỐC</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight">
              KẾT NỐI XUYÊN SUỐT BẮC – TRUNG – NAM
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              4 chi nhánh và bãi xe chiến lược trải dọc chiều dài đất nước, sẵn sàng điều phối phương tiện đến bất kỳ công trường nào.
            </p>
          </div>
        </Reveal>

        {/* Route line with office nodes */}
        <Reveal delay={0.1}>
          <div className="bg-[#e8eaef] rounded-none border border-[#d9dce3] p-6 sm:p-10 shadow-xl">
            <div className="flex flex-col lg:flex-row items-stretch gap-0 lg:gap-0 relative">
              {/* Connecting line */}
              <div className="hidden lg:block absolute left-0 right-0 top-[22px] h-0.5 bg-gradient-to-r from-[#1ba8e8]/20 via-[#1ba8e8] to-[#1ba8e8]/20 z-0" />
              <div className="lg:hidden absolute top-0 bottom-0 left-[22px] w-0.5 bg-gradient-to-b from-[#1ba8e8]/20 via-[#1ba8e8] to-[#1ba8e8]/20 z-0" />

              {offices.map((office, idx) => {
                const isActive = idx === active;
                return (
                  <button
                    key={office.city}
                    onClick={() => setActive(idx)}
                    className="relative z-10 flex lg:flex-col items-center gap-3 lg:gap-3 flex-1 py-3 lg:py-0 text-left lg:text-center group cursor-pointer"
                  >
                    <span className="relative flex items-center justify-center w-11 h-11 shrink-0">
                      {isActive && (
                        <span className="absolute inset-0 rounded-full bg-[#1ba8e8]/40 animate-ping" />
                      )}
                      <span
                        className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? 'bg-[#1ba8e8] border-[#0a4e82] scale-110'
                            : 'bg-white border-[#c3cad6] group-hover:border-[#1ba8e8]'
                        }`}
                      >
                        <MapPin className={`w-3 h-3 ${isActive ? 'text-white' : 'text-[#0b6fa8]'}`} />
                      </span>
                    </span>
                    <span
                      className={`text-xs sm:text-sm font-bold uppercase tracking-wide transition-colors ${
                        isActive ? 'text-[#0b6fa8]' : 'text-slate-700 group-hover:text-slate-900'
                      }`}
                    >
                      {office.city}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active office detail card */}
            <div className="mt-8 pt-6 border-t border-[#dde0e6] grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              <div className="p-4 rounded-none bg-[#e5e7ed] border border-[#dde1e7] space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <MapPin className="w-4 h-4 text-[#0b6fa8] shrink-0" />
                  <span>Chi Nhánh {offices[active].city}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{offices[active].address}</p>
                <p className="text-xs text-[#0b6fa8] font-mono flex items-center gap-1.5 pt-1">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{offices[active].phone}</span>
                </p>
              </div>

              <a
                href={`tel:${offices[active].phone.replace(/\s/g, '')}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#0b6fa8]/20 sm:justify-self-end w-full sm:w-auto"
              >
                <span>Liên hệ chi nhánh này</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
