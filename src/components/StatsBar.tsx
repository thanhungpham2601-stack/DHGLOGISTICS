import { Award, Building2, Truck, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export function StatsBar() {
  const statIcons = [
    <Award key="award" className="w-8 h-8 text-[#1f6b12]" />,
    <Building2 key="building" className="w-8 h-8 text-[#1f6b12]" />,
    <Truck key="truck" className="w-8 h-8 text-[#1f6b12]" />,
    <MapPin key="map" className="w-8 h-8 text-[#1f6b12]" />,
    <ShieldCheck key="shield" className="w-8 h-8 text-[#1f6b12]" />,
  ];

  return (
    <section id="stats-bar" className="relative z-20 bg-[#f0f5f2] border-y border-[#dfe8e3] py-8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 lg:divide-x divide-[#dfe9e4]">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 group ${
                idx > 0 ? 'pt-4 md:pt-0 lg:pl-6' : ''
              }`}
            >
              <div className="p-2.5 rounded-xl bg-[#e8efeb] border border-[#d9e4de] group-hover:border-[#5cb83a] group-hover:scale-105 transition-all duration-300 shrink-0">
                {statIcons[idx]}
              </div>
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl font-black text-slate-900 font-heading tracking-tight group-hover:text-[#1f6b12] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 font-normal leading-none mt-0.5 line-clamp-1">
                  {stat.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
