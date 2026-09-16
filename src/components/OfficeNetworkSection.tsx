import { Phone, Mail, ArrowRight, Building2, Briefcase, Navigation } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { Reveal } from './Reveal';
import { HO_CHI_MINH_POINT, VietnamMapDots } from './VietnamMapDots';

export function OfficeNetworkSection() {
  const office = COMPANY_INFO.offices[0];
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.address)}`;

  const infoRows = [
    { icon: Phone, label: 'Hotline 24/7', value: COMPANY_INFO.hotlineFormatted, href: `tel:${COMPANY_INFO.hotline}` },
    { icon: Mail, label: 'Email', value: COMPANY_INFO.email, href: `mailto:${COMPANY_INFO.email}` },
    { icon: Briefcase, label: 'Lĩnh vực chính', value: COMPANY_INFO.businessField },
  ];

  return (
    <section id="network" className="relative py-20 bg-[#eeeff3] border-b border-[#e1e3e9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono bg-[#e6e7ed] px-3.5 py-1.5 rounded-full border border-[#d9dce4]">
              <Building2 className="w-3.5 h-3.5 text-[#0b6fa8]" />
              <span>TRỤ SỞ CHÍNH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight">
              THÔNG TIN LIÊN HỆ TRỤ SỞ
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Trụ sở chính đặt tại {office.city}, sẵn sàng điều phối phương tiện phục vụ công trình trên toàn quốc.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="max-w-5xl mx-auto rounded-none border border-[#d9dce3] shadow-2xl shadow-[#0b6fa8]/10 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            {/* Left: dark brand panel with address */}
            <div className="relative lg:col-span-5 bg-gradient-to-br from-[#0a4e82] to-[#071433] text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden min-h-[340px]">
              <div className="absolute top-2 bottom-14 inset-x-2">
                <VietnamMapDots
                  className="w-full h-full text-white/15"
                  markerPoint={HO_CHI_MINH_POINT}
                  markerClassName="text-[#1ba8e8]"
                />
              </div>

              <div className="relative space-y-5">
                <div>
                  <div className="text-[11px] font-mono font-bold tracking-widest text-[#7fd4ff] uppercase mb-1.5">
                    {office.city}
                  </div>
                  <p className="text-lg sm:text-xl font-bold leading-snug">
                    {office.address}
                  </p>
                </div>
              </div>

              <a
                href={mapsHref}
                target="_blank"
                rel="noreferrer"
                className="relative inline-flex items-center gap-2 mt-8 text-xs font-bold text-white/90 hover:text-white uppercase tracking-wider group"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Xem trên Google Maps</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Right: contact detail grid */}
            <div className="lg:col-span-7 bg-white p-8 sm:p-10 flex flex-col justify-between gap-8">
              <div className="grid grid-cols-1 gap-y-6">
                {infoRows.map((row) => {
                  const Icon = row.icon;
                  const content = (
                    <>
                      <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#eaf6fd] border border-[#d3ebfa] shrink-0">
                        <Icon className="w-4 h-4 text-[#0b6fa8]" />
                      </span>
                      <div className="min-w-0">
                        <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">
                          {row.label}
                        </div>
                        <div className="text-sm font-bold text-slate-900 break-words">{row.value}</div>
                      </div>
                    </>
                  );
                  return row.href ? (
                    <a key={row.label} href={row.href} className="flex items-center gap-3 group">
                      <span className="contents group-hover:[&_div]:text-[#0b6fa8]">{content}</span>
                    </a>
                  ) : (
                    <div key={row.label} className="flex items-center gap-3">
                      {content}
                    </div>
                  );
                })}
              </div>

              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#0b6fa8]/20 w-full sm:w-auto sm:self-start"
              >
                <span>Gọi ngay cho trụ sở</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
