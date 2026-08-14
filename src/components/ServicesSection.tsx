import { useState } from 'react';
import { Truck, HardHat, Compass, FileCheck, Activity, ShieldCheck, ArrowRight, Check, X, Box, ArrowUpRight } from 'lucide-react';
import { CORE_SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuote: () => void;
}

export function ServicesSection({ onSelectService, onOpenQuote }: ServicesSectionProps) {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5 text-[#5cb83a]" />;
      case 'HardHat':
        return <HardHat className="w-5 h-5 text-[#5cb83a]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#5cb83a]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#5cb83a]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#5cb83a]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-[#5cb83a]" />;
    }
  };

  const handleOpenDetail = (service: ServiceItem) => {
    setActiveModal(service);
    onSelectService(service);
  };

  return (
    <section id="services" className="relative py-20 bg-[#08100d] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching the screenshot */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono">
              <span className="w-4 h-0.5 bg-[#5cb83a]"></span>
              <span>GIẢI PHÁP TOÀN DIỆN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight mt-2">
              ĐƯA MỌI DỰ ÁN VỀ ĐÍCH AN TOÀN
            </h2>
          </div>

          <a
            href="#all-services"
            onClick={(e) => {
              e.preventDefault();
              handleOpenDetail(CORE_SERVICES[0]);
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#83e05e] hover:text-[#a5f483] group transition-colors"
          >
            <span>Xem chi tiết giải pháp kỹ thuật</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6 Services Grid matching screenshot layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service) => (
            <div
              key={service.id}
              onClick={() => handleOpenDetail(service)}
              className="group relative bg-[#101b16] rounded-xl border border-[#20362b] hover:border-[#5cb83a] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5cb83a]/15 cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container with high quality visuals */}
              <div className="relative h-48 w-full overflow-hidden bg-[#0a120e]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101b16] via-transparent to-black/30" />
                
                {/* Number Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded bg-[#0b1410]/80 backdrop-blur-sm border border-[#22392c] text-xs font-mono font-bold text-slate-300">
                  {service.number}
                </div>

                {/* Floating Icon Box (Exact match to screenshot with green box & icon) */}
                <div className="absolute -bottom-4 left-4 p-2.5 rounded-lg bg-[#16271f] border border-[#2c4d3d] group-hover:border-[#5cb83a] group-hover:bg-[#1a3026] transition-all shadow-md">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 pt-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase group-hover:text-[#83e05e] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#1c3024] flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 group-hover:text-slate-200 transition-colors">
                    Tìm hiểu phương án & thiết bị
                  </span>
                  <div className="p-1.5 rounded-full bg-[#182921] group-hover:bg-[#5cb83a] group-hover:text-[#09110e] text-[#83e05e] transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Highlight Note below matching PDF */}
        <div className="mt-12 p-6 rounded-2xl bg-[#0c1813] border border-[#213a2d] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-white">
              Cần giải pháp vận chuyển cho các tải trọng phức tạp, kết hợp đa phương thức?
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              DHG cung cấp trọn gói từ khảo sát tuyến, xin giấy phép lưu hành, phương tiện chuyên dụng đến bốc xếp bàn giao.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="shrink-0 px-6 py-3 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#5cb83a]/20 transition-all hover:scale-105 cursor-pointer"
          >
            YÊU CẦU TƯ VẤN KỸ THUẬT
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#0e1914] border border-[#264434] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#1e3427]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-[#16271f] border border-[#2c4d3d]">
                  {getServiceIcon(activeModal.iconName)}
                </div>
                <div>
                  <span className="text-xs font-mono text-[#83e05e] font-bold uppercase tracking-wider">
                    DỊCH VỤ {activeModal.number} • DHG HEAVY HAUL
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white uppercase font-heading">
                    {activeModal.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-lg bg-[#14231b] text-slate-400 hover:text-white border border-[#233b2e]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content from PDF */}
            <div className="py-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#83e05e] uppercase tracking-wider font-mono mb-2">
                  Tổng quan giải pháp
                </h4>
                <p className="text-sm text-slate-200 leading-relaxed bg-[#122019] p-4 rounded-xl border border-[#20362b]">
                  {activeModal.fullDesc}
                </p>
              </div>

              {/* Suitable Cargo List from PDF */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                  <Box className="w-4 h-4 text-[#5cb83a]" />
                  <span>Chủng loại hàng hóa & Thiết bị phù hợp</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModal.suitableFor.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-200 bg-[#122019] p-2.5 rounded-lg border border-[#1d3327]"
                    >
                      <Check className="w-4 h-4 text-[#5cb83a] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#122019] p-4 rounded-xl border border-[#1d3327]">
                  <h5 className="text-xs font-bold text-[#83e05e] uppercase tracking-wider mb-2">
                    Ưu thế vận hành
                  </h5>
                  <ul className="space-y-1.5">
                    {activeModal.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-[#5cb83a]">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#122019] p-4 rounded-xl border border-[#1d3327]">
                  <h5 className="text-xs font-bold text-[#83e05e] uppercase tracking-wider mb-2">
                    Thiết bị khai thác chính
                  </h5>
                  <ul className="space-y-1.5">
                    {activeModal.equipmentUsed.map((eq, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                        <span className="text-[#5cb83a] font-bold">✓</span>
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#1e3427] flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#14231b] hover:bg-[#1a2d23] text-slate-300 font-semibold text-xs border border-[#263e30]"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  onOpenQuote();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#5cb83a]/20"
              >
                Yêu cầu báo giá dịch vụ này →
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
