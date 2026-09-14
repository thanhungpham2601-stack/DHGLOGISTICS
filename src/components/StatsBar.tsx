import { Award, Building2, Truck, MapPin, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { StaggerGroup, StaggerItem } from './Reveal';
import { AnimatedNumber } from './AnimatedNumber';

export function StatsBar() {
  const statIcons = [
    <Award key="award" className="w-8 h-8 text-[#0b6fa8]" />,
    <Building2 key="building" className="w-8 h-8 text-[#0b6fa8]" />,
    <Truck key="truck" className="w-8 h-8 text-[#0b6fa8]" />,
    <MapPin key="map" className="w-8 h-8 text-[#0b6fa8]" />,
    <ShieldCheck key="shield" className="w-8 h-8 text-[#0b6fa8]" />,
  ];

  return (
    <section id="stats-bar" className="relative z-20 bg-[#f0f2f5] border-y border-[#dfe2e8] py-8 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 lg:divide-x divide-[#dfe1e9]">
          {COMPANY_INFO.stats.map((stat, idx) => (
            <StaggerItem
              key={idx}
              className={`flex items-center gap-4 group ${
                idx > 0 ? 'pt-4 md:pt-0 lg:pl-6' : ''
              }`}
            >
              <div className="p-2.5 rounded-none bg-[#e8eaef] border border-[#d9dce4] group-hover:border-[#1ba8e8] group-hover:scale-105 transition-all duration-300 shrink-0">
                {statIcons[idx]}
              </div>
              <div className="flex flex-col">
                <AnimatedNumber
                  value={stat.value}
                  className="text-3xl md:text-4xl font-black text-slate-900 font-heading tracking-tight group-hover:text-[#0b6fa8] transition-colors"
                />
                <div className="text-xs font-bold text-slate-800 uppercase tracking-wider font-sans leading-snug">
                  {stat.label}
                </div>
                <div className="text-[11px] text-slate-500 font-normal leading-none mt-0.5 line-clamp-1">
                  {stat.sub}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
