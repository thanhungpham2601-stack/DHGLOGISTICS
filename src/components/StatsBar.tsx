import { Award, Building2, Truck, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

export function StatsBar() {
  const statIcons = [
    <Award key="award" className="w-8 h-8 text-[#5cb83a]" />,
    <Building2 key="building" className="w-8 h-8 text-[#5cb83a]" />,
    <Truck key="truck" className="w-8 h-8 text-[#5cb83a]" />,
    <MapPin key="map" className="w-8 h-8 text-[#5cb83a]" />,
    <ShieldCheck key="shield" className="w-8 h-8 text-[#5cb83a]" />,
  ];

  return (
    <section id="stats-bar" className="relative z-20 bg-[#060c09] border-y border-[#1a2f24] py-8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 lg:divide-x divide-[#182e23]">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 group ${
                idx > 0 ? 'pt-4 md:pt-0 lg:pl-6' : ''
              }`}
            >
              <div className="p-2.5 rounded-xl bg-[#0f1d16] border border-[#203a2c] group-hover:border-[#5cb83a] group-hover:scale-105 transition-all duration-300 shrink-0">
                {statIcons[idx]}
              </div>
              <div className="flex flex-col">
                <div className="text-3xl md:text-4xl font-black text-white font-heading tracking-tight group-hover:text-[#83e05e] transition-colors">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-slate-200 uppercase tracking-wider font-sans leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-400 font-normal leading-none mt-0.5 line-clamp-1">
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
