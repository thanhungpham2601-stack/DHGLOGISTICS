import { useState } from 'react';
import { Truck, HardHat, Compass, FileCheck, Activity, ShieldCheck, ArrowRight, Check, X, Box, ArrowUpRight } from 'lucide-react';
import { CORE_SERVICES } from '../data/companyData';
import { ServiceItem } from '../types';
import { Reveal, StaggerGroup, StaggerItem } from './Reveal';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onOpenQuote: () => void;
}

export function ServicesSection({ onSelectService, onOpenQuote }: ServicesSectionProps) {
  const [activeModal, setActiveModal] = useState<ServiceItem | null>(null);

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck':
        return <Truck className="w-5 h-5 text-[#0b6fa8]" />;
      case 'HardHat':
        return <HardHat className="w-5 h-5 text-[#0b6fa8]" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-[#0b6fa8]" />;
      case 'FileCheck':
        return <FileCheck className="w-5 h-5 text-[#0b6fa8]" />;
      case 'Activity':
        return <Activity className="w-5 h-5 text-[#0b6fa8]" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-[#0b6fa8]" />;
    }
  };

  const handleOpenDetail = (service: ServiceItem) => {
    setActiveModal(service);
    onSelectService(service);
  };

  return (
    <section id="services" className="relative py-20 bg-[#eeeff3] border-b border-[#e1e3e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching the screenshot */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono">
                <span className="w-4 h-0.5 bg-[#1ba8e8]"></span>
                <span>GIẢI PHÁP TOÀN DIỆN</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight mt-2">
                ĐƯA MỌI DỰ ÁN VỀ ĐÍCH AN TOÀN
              </h2>
            </div>

            <a
              href="#all-services"
              onClick={(e) => {
                e.preventDefault();
                handleOpenDetail(CORE_SERVICES[0]);
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0b6fa8] hover:text-[#0b6fa8] group transition-colors"
            >
              <span>Xem chi tiết giải pháp kỹ thuật</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>

        {/* 6 Services Grid matching screenshot layout */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CORE_SERVICES.map((service) => (
            <StaggerItem
              key={service.id}
              className="group relative bg-[#e9eaee] rounded-none border border-[#dbdde4] hover:border-[#1ba8e8] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#0b6fa8]/15 cursor-pointer flex flex-col justify-between"
            >
              <div onClick={() => handleOpenDetail(service)} className="contents">
              {/* Image Container with high quality visuals */}
              <div className="relative h-48 w-full overflow-hidden bg-[#edeef2]">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#e9eaee] via-transparent to-black/30" />
                
                {/* Number Badge */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-none bg-[#ecedf1]/80 backdrop-blur-sm border border-[#dadde3] text-xs font-mono font-bold text-slate-700">
                  {service.number}
                </div>

                {/* Floating Icon Box (Exact match to screenshot with green box & icon) */}
                <div className="absolute -bottom-4 left-4 p-2.5 rounded-none bg-[#e3e4ea] border border-[#d0d3dc] group-hover:border-[#1ba8e8] group-hover:bg-[#dee1e8] transition-all shadow-md">
                  {getServiceIcon(service.iconName)}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 pt-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 uppercase group-hover:text-[#0b6fa8] transition-colors leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 line-clamp-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#dee1e7] flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">
                    Tìm hiểu phương án & thiết bị
                  </span>
                  <div className="p-1.5 rounded-full bg-[#e2e3e9] group-hover:bg-[#1ba8e8] group-hover:text-white text-[#0b6fa8] transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Highlight Note below matching PDF */}
        <div className="mt-12 p-6 rounded-none bg-[#eaebf1] border border-[#d9dce3] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-base font-bold text-slate-900">
              Cần giải pháp vận chuyển cho các tải trọng phức tạp, kết hợp đa phương thức?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              DHG cung cấp trọn gói từ khảo sát tuyến, xin giấy phép lưu hành, phương tiện chuyên dụng đến bốc xếp bàn giao.
            </p>
          </div>
          <button
            onClick={onOpenQuote}
            className="shrink-0 px-6 py-3 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#0b6fa8]/20 transition-all hover:scale-105 cursor-pointer"
          >
            YÊU CẦU TƯ VẤN KỸ THUẬT
          </button>
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#eaebef] border border-[#d4d7e0] rounded-none max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#dcdfe5]">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-none bg-[#e3e4ea] border border-[#d0d3dc]">
                  {getServiceIcon(activeModal.iconName)}
                </div>
                <div>
                  <span className="text-xs font-mono text-[#0b6fa8] font-bold uppercase tracking-wider">
                    DỊCH VỤ {activeModal.number} • DHG TRANSPORT
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase font-heading">
                    {activeModal.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="p-2 rounded-none bg-[#e5e7ec] text-slate-500 hover:text-slate-900 border border-[#d9dce2]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content from PDF */}
            <div className="py-6 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-[#0b6fa8] uppercase tracking-wider font-mono mb-2">
                  Tổng quan giải pháp
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed bg-[#e6e7ed] p-4 rounded-none border border-[#dbdde4]">
                  {activeModal.fullDesc}
                </p>
              </div>

              {/* Suitable Cargo List from PDF */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono mb-3 flex items-center gap-2">
                  <Box className="w-4 h-4 text-[#0b6fa8]" />
                  <span>Chủng loại hàng hóa & Thiết bị phù hợp</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeModal.suitableFor.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-800 bg-[#e6e7ed] p-2.5 rounded-none border border-[#dde0e6]"
                    >
                      <Check className="w-4 h-4 text-[#0b6fa8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Equipment */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#e6e7ed] p-4 rounded-none border border-[#dde0e6]">
                  <h5 className="text-xs font-bold text-[#0b6fa8] uppercase tracking-wider mb-2">
                    Ưu thế vận hành
                  </h5>
                  <ul className="space-y-1.5">
                    {activeModal.features.map((f, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-[#0b6fa8]">•</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#e6e7ed] p-4 rounded-none border border-[#dde0e6]">
                  <h5 className="text-xs font-bold text-[#0b6fa8] uppercase tracking-wider mb-2">
                    Thiết bị khai thác chính
                  </h5>
                  <ul className="space-y-1.5">
                    {activeModal.equipmentUsed.map((eq, i) => (
                      <li key={i} className="text-xs text-slate-700 flex items-start gap-2">
                        <span className="text-[#0b6fa8] font-bold">✓</span>
                        <span>{eq}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-4 border-t border-[#dcdfe5] flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={() => setActiveModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-none bg-[#e5e7ec] hover:bg-[#e0e2e8] text-slate-700 font-semibold text-xs border border-[#d7dae0]"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  setActiveModal(null);
                  onOpenQuote();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#0b6fa8]/20"
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
