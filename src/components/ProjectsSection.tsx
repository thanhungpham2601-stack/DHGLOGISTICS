import { useState } from 'react';
import { ShieldCheck, MapPin, Gauge, Layers, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PROJECT_CASES } from '../data/companyData';
import { ProjectCase } from '../types';

interface ProjectsSectionProps {
  onOpenQuote: () => void;
}

export function ProjectsSection({ onOpenQuote }: ProjectsSectionProps) {
  const [selectedCase, setSelectedCase] = useState<ProjectCase>(PROJECT_CASES[0]);

  return (
    <section id="projects" className="relative py-20 bg-[#060c09] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono">
              <span className="w-4 h-0.5 bg-[#5cb83a]"></span>
              <span>DỰ ÁN TIÊU BIỂU ĐÃ THỰC HIỆN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight mt-2">
              HƠN 500+ DỰ ÁN CÔNG TRÌNH VỀ ĐÍCH AN TOÀN
            </h2>
          </div>

          <div className="text-xs text-slate-400 font-mono">
            <span>Chứng thực năng lực thi công thực tế</span>
          </div>
        </div>

        {/* Project Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PROJECT_CASES.map((item) => (
            <div
              key={item.id}
              className="bg-[#0e1813] rounded-2xl border border-[#1f372a] hover:border-[#5cb83a] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#5cb83a]/10 group flex flex-col justify-between"
            >
              {/* Project Image */}
              <div className="relative h-60 w-full overflow-hidden bg-[#09110e]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1813] via-transparent to-black/30" />
                
                {/* Client Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#0b1410]/90 backdrop-blur-md border border-[#274435] text-xs font-bold text-[#83e05e]">
                  {item.clientType}
                </div>

                {/* Weight Tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#5cb83a] text-[#09110e] text-xs font-black font-mono shadow-md">
                  {item.weight}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white uppercase group-hover:text-[#83e05e] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs text-slate-300">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#5cb83a] shrink-0" />
                      <span className="font-semibold text-slate-200">Tuyến đường:</span>
                      <span>{item.route}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#5cb83a] shrink-0" />
                      <span className="font-semibold text-slate-200">Kích thước:</span>
                      <span className="font-mono">{item.dimension}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 p-3 rounded-lg bg-[#12221a] border border-[#1b3426] leading-relaxed">
                    <span className="font-bold text-slate-200">Điểm then chốt: </span>
                    {item.highlight}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#1a2f23] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#83e05e] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Nghiệm thu an toàn 100%</span>
                  </span>

                  <button
                    onClick={onOpenQuote}
                    className="text-xs font-bold text-white hover:text-[#83e05e] flex items-center gap-1"
                  >
                    <span>Tư vấn dự án tương tự</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
