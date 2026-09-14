import { useState } from 'react';
import { Truck, Shield, Gauge, Wrench, ChevronLeft, ChevronRight, Layers, ArrowRight } from 'lucide-react';
import { FLEET_SPECS } from '../data/companyData';
import { VehicleSpec } from '../types';
import { Reveal } from './Reveal';

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
    <section id="fleet" className="relative py-20 bg-[#f0f2f5] border-b border-[#e1e3e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <Reveal><div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono">
              <span className="w-4 h-0.5 bg-[#1ba8e8]"></span>
              <span>ĐỘI XE CHUYÊN DỤNG</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight mt-2">
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
              className="p-2.5 rounded-none bg-[#e7e9ed] hover:bg-[#dfe2e8] text-slate-700 hover:text-slate-900 border border-[#d8dbe2] transition-colors cursor-pointer"
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
              className="p-2.5 rounded-none bg-[#e7e9ed] hover:bg-[#dfe2e8] text-slate-700 hover:text-slate-900 border border-[#d8dbe2] transition-colors cursor-pointer"
              aria-label="Next fleet item"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div></Reveal>

        {/* Fleet Showcase Hero Box */}
        <Reveal delay={0.1}><div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-[#ebebf1] rounded-none border border-[#dbdfe5] p-6 sm:p-8 overflow-hidden shadow-2xl">
          
          {/* Left: Interactive Vehicle Specs */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              {/* Category tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-[#e1e3ea] border border-[#d3d7df] text-xs font-mono font-bold text-[#0b6fa8]">
                <Truck className="w-3.5 h-3.5" />
                <span>{selectedVehicle.category.toUpperCase()}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading uppercase tracking-tight mt-3">
                {selectedVehicle.name}
              </h3>

              <p className="text-sm text-slate-700 leading-relaxed mt-3">
                {selectedVehicle.description}
              </p>
            </div>

            {/* Technical Parameters Matrix */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-[#dde0e6]">
              <div className="bg-[#e7e8ee] p-3.5 rounded-none border border-[#d9dce4]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Gauge className="w-4 h-4 text-[#0b6fa8]" />
                  <span>TẢI TRỌNG THIẾT KẾ</span>
                </div>
                <div className="text-lg font-bold text-slate-900 font-heading mt-1 text-[#0b6fa8]">
                  {selectedVehicle.payload}
                </div>
              </div>

              <div className="bg-[#e7e8ee] p-3.5 rounded-none border border-[#d9dce4]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Layers className="w-4 h-4 text-[#0b6fa8]" />
                  <span>KÍCH THƯỚC SÀN XE</span>
                </div>
                <div className="text-sm font-bold text-slate-900 font-heading mt-1 truncate">
                  {selectedVehicle.dimensions}
                </div>
              </div>

              {selectedVehicle.axleCount && (
                <div className="bg-[#e7e8ee] p-3.5 rounded-none border border-[#d9dce4]">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Shield className="w-4 h-4 text-[#0b6fa8]" />
                    <span>CẤU HÌNH TRỤC</span>
                  </div>
                  <div className="text-base font-bold text-slate-900 font-heading mt-1">
                    {selectedVehicle.axleCount}
                  </div>
                </div>
              )}

              {selectedVehicle.enginePower && (
                <div className="bg-[#e7e8ee] p-3.5 rounded-none border border-[#d9dce4]">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <Wrench className="w-4 h-4 text-[#0b6fa8]" />
                    <span>CÔNG SUẤT ĐỘNG CƠ</span>
                  </div>
                  <div className="text-base font-bold text-slate-900 font-heading mt-1">
                    {selectedVehicle.enginePower}
                  </div>
                </div>
              )}
            </div>

            {/* Key Engineering Features */}
            <div>
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 font-mono">
                Đặc Điểm Kỹ Thuật Nổi Bật:
              </div>
              <ul className="space-y-2">
                {selectedVehicle.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1ba8e8]"></span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenQuote}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#0b6fa8]/25"
              >
                <span>YÊU CẦU ĐIỀU PHỐI ĐOÀN XE NÀY</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right: Vehicle Image & Selector Carousel */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {/* Main Visual */}
            <div className="relative h-72 sm:h-96 rounded-none overflow-hidden border border-[#d5d8e0] group">
              <img
                src={selectedVehicle.image}
                alt={selectedVehicle.name}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#edeef3] via-transparent to-black/20" />
              
              <div className="absolute bottom-4 left-4 right-4 bg-[#eaebf0]/90 backdrop-blur-md p-3.5 rounded-none border border-[#dbdde4] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase font-mono">Hệ thống xe chuyên dụng</span>
                  <p className="text-xs sm:text-sm font-bold text-slate-900">{selectedVehicle.name}</p>
                </div>
                <span className="text-xs font-mono font-bold text-[#0b6fa8] bg-[#e1e4ea] px-2.5 py-1 rounded-none border border-[#d4d7e0]">
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
                    className={`p-2.5 rounded-none text-left transition-all border ${
                      isSelected
                        ? 'bg-[#e3e5eb] border-[#1ba8e8] text-slate-900 shadow-md'
                        : 'bg-[#e9eaef] border-[#dde0e5] text-slate-500 hover:text-slate-900 hover:border-[#cbcfd9]'
                    }`}
                  >
                    <div className="text-[10px] font-mono font-bold uppercase truncate text-[#0b6fa8]">
                      {veh.category}
                    </div>
                    <div className="text-xs font-bold truncate mt-0.5">
                      {veh.name.split('(')[0]}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1 font-mono">
                      {veh.payload}
                    </div>
                  </button>
                );
              })}
            </div>

          </div>

        </div></Reveal>

      </div>
    </section>
  );
}
