import { useState } from 'react';
import { Truck, Shield, Gauge, Wrench, ChevronLeft, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { FLEET_SPECS } from '../data/companyData';
import { VehicleSpec } from '../types';

interface FleetSectionProps {
  onOpenQuote: () => void;
}

export function FleetSection({ onOpenQuote }: FleetSectionProps) {
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleSpec>(FLEET_SPECS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredFleet = activeCategory === 'all' 
    ? FLEET_SPECS 
    : FLEET_SPECS.filter(v => v.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="fleet" className="relative py-20 bg-[#060c09] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono">
              <span className="w-4 h-0.5 bg-[#5cb83a]"></span>
              <span>ĐỘI XE CHUYÊN DỤNG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight mt-2">
              SỨC MẠNH TỪ THIẾT BỊ HIỆN ĐẠI
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const currentIndex = FLEET_SPECS.findIndex(v => v.id === selectedVehicle.id);
                const prevIndex = (currentIndex - 1 + FLEET_SPECS.length) % FLEET_SPECS.length;
                setSelectedVehicle(FLEET_SPECS[prevIndex]);
              }}
              className="p-2.5 rounded-lg bg-[#111f18] hover:bg-[#1a2f24] text-slate-300 hover:text-white border border-[#243d31] transition-colors cursor-pointer"
              aria-label="Previous fleet item"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                const currentIndex = FLEET_SPECS.findIndex(v => v.id === selectedVehicle.id);
                const nextIndex = (currentIndex + 1) % FLEET_SPECS.length;
                setSelectedVehicle(FLEET_SPECS[nextIndex]);
              }}
              className="p-2.5 rounded-lg bg-[#111f18] hover:bg-[#1a2f24] text-slate-300 hover:text-white border border-[#243d31] transition-colors cursor-pointer"
              aria-label="Next fleet item"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Fleet Showcase Hero Box */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#0c1612] rounded-2xl border border-[#1f372a] p-6 sm:p-8 overflow-hidden shadow-2xl">
          
          {/* Left: Interactive Vehicle Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#162a20] border border-[#284837] text-xs font-mono font-bold text-[#83e05e]">
                <Truck className="w-3.5 h-3.5" />
                <span>{selectedVehicle.category.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase tracking-tight mt-3">
                {selectedVehicle.name}
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mt-3">
                {selectedVehicle.description}
              </p>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#1c3226]">
              <div className="bg-[#101e17] p-3.5 rounded-xl border border-[#203a2c]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Gauge className="w-4 h-4 text-[#5cb83a]" />
                  <span>TẢI TRỌNG THIẾT KẾ</span>
                </div>
                <div className="text-lg font-bold text-white font-heading mt-1 text-[#83e05e]">
                  {selectedVehicle.payload}
                </div>
              </div>

              <div className="bg-[#101e17] p-3.5 rounded-xl border border-[#203a2c]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <Layers className="w-4 h-4 text-[#5cb83a]" />
                  <span>KÍCH THƯỚC SÀN XE</span>
                </div>
                <div className="text-sm font-bold text-white font-heading mt-1 truncate">
                  {selectedVehicle.dimensions}
                </div>
              </div>

              {selectedVehicle.axleCount && (
                <div className="bg-[#101e17] p-3.5 rounded-xl border border-[#203a2c]">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Shield className="w-4 h-4 text-[#5cb83a]" />
                    <span>CẤU HÌNH TRỤC</span>
                  </div>
                  <div className="text-base font-bold text-white font-heading mt-1">
                    {selectedVehicle.axleCount}
                  </div>
                </div>
              )}

              {selectedVehicle.enginePower && (
                <div className="bg-[#101e17] p-3.5 rounded-xl border border-[#203a2c]">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Wrench className="w-4 h-4 text-[#5cb83a]" />
                    <span>CÔNG SUẤT ĐỘNG CƠ</span>
                  </div>
                  <div className="text-base font-bold text-white font-heading mt-1">
                    {selectedVehicle.enginePower}
                  </div>
                </div>
              )}
            </div>

            {/* Key Engineering Features */}
            <div>
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 font-mono">
                Đặc Điểm Kỹ Thuật Nổi Bật:
              </div>
              <ul className="space-y-2">
                {selectedVehicle.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5cb83a]"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#5cb83a]/25"
              >
                <span>YÊU CẦU ĐIỀU PHỐI ĐOÀN XE NÀY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right: Vehicle Image & Selector Carousel */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* Main Visual */}
            <div className="relative h-72 sm:h-96 rounded-xl overflow-hidden border border-[#264333] group">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09120e] via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#0d1813]/90 backdrop-blur-md p-3.5 rounded-lg border border-[#20362b] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-mono">Hệ thống xe chuyên dụng</span>
                  <p className="text-xs sm:text-sm font-bold text-white">{selectedVehicle.name}</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#83e05e] bg-[#172b20] px-2.5 py-1 rounded border border-[#254534]">
                  {selectedVehicle.payload}
                </span>
              </div>
            </div>

            {/* Mini Selector Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {FLEET_SPECS.map((veh) => {
                const isSelected = veh.id === selectedVehicle.id;
                return (
                  <button
                    key={veh.id}
                    onClick={() => setSelectedVehicle(veh)}
                    className={`p-2.5 rounded-lg text-left transition-all border ${
                      isSelected
                        ? 'bg-[#15271e] border-[#5cb83a] text-white shadow-md'
                        : 'bg-[#0f1b15] border-[#1f3327] text-slate-400 hover:text-white hover:border-[#325642]'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold uppercase truncate text-[#83e05e]">
                      {veh.category}
                    </div>
                    <div className="text-xs font-bold truncate mt-0.5">
                      {veh.name.split('(')[0]}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 font-mono">
                      {veh.payload}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
