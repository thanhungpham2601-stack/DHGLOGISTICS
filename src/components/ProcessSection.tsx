import { useState } from 'react';
import { ClipboardList, Search, MapPin, FileSpreadsheet, Stamp, Navigation, ShieldAlert, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';

export function ProcessSection() {
  const [selectedStep, setSelectedStep] = useState(0);

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'ClipboardList': return <ClipboardList className="w-5 h-5" />;
      case 'Search': return <Search className="w-5 h-5" />;
      case 'MapPin': return <MapPin className="w-5 h-5" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5" />;
      case 'Stamp': return <Stamp className="w-5 h-5" />;
      case 'Navigation': return <Navigation className="w-5 h-5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5" />;
      case 'CheckCircle2':
      default: return <CheckCircle2 className="w-5 h-5" />;
    }
  };

  return (
    <section id="process" className="relative py-20 bg-[#060c09] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono bg-[#112018] px-3.5 py-1.5 rounded-full border border-[#203a2c]">
            <span>QUY TRÌNH VẬN CHUYỂN TRỌN GÓI</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
            MỘT ĐẦU MỐI – TOÀN BỘ GIẢI PHÁP
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Chúng tôi cung cấp giải pháp vận chuyển từ khâu chuẩn bị, cấp phép lưu hành đến khi thiết bị được bàn giao an toàn tại bệ móng điểm đến.
          </p>
        </div>

        {/* 8-Step Interactive Grid Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => setSelectedStep(idx)}
                className={`relative p-3.5 rounded-xl text-left transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#152a1e] border-[#5cb83a] text-white shadow-xl shadow-[#5cb83a]/20 scale-105 z-10'
                    : 'bg-[#0d1712] border-[#1b3024] text-slate-400 hover:text-slate-200 hover:border-[#2a4d3a]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#83e05e]">
                    {step.step}
                  </span>
                  <div className={`p-1 rounded-md ${isSelected ? 'text-[#83e05e]' : 'text-slate-500'}`}>
                    {getStepIcon(step.icon)}
                  </div>
                </div>

                <div className="mt-3">
                  <div className="text-xs font-bold uppercase leading-tight line-clamp-2">
                    {step.title}
                  </div>
                </div>

                {idx < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 z-0">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Step Detail Panel */}
        <div className="bg-[#0e1914] rounded-2xl border border-[#233f30] p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-[#1e3629] pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#172c20] border border-[#2b4d3a] flex items-center justify-center text-[#83e05e]">
                  {getStepIcon(PROCESS_STEPS[selectedStep].icon)}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#83e05e]">
                    BƯỚC {PROCESS_STEPS[selectedStep].step} TRÊN 08
                  </span>
                  <h3 className="text-2xl font-black text-white font-heading uppercase">
                    {PROCESS_STEPS[selectedStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {PROCESS_STEPS[selectedStep].desc}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  disabled={selectedStep === 0}
                  onClick={() => setSelectedStep(prev => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-[#14231b] hover:bg-[#1a2e23] disabled:opacity-30 text-xs font-semibold text-slate-300 border border-[#213a2d]"
                >
                  ← Bước trước
                </button>
                <button
                  disabled={selectedStep === PROCESS_STEPS.length - 1}
                  onClick={() => setSelectedStep(prev => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] disabled:opacity-30 text-xs font-bold text-[#09110e]"
                >
                  Bước tiếp theo →
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">
                Nhiệm vụ & Tiêu Chuẩn Thực Hiện Chi Tiết:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PROCESS_STEPS[selectedStep].details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#13221b] border border-[#1e372a] space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#1b3325] text-[#83e05e] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </div>
                      <span className="text-xs font-bold text-slate-200">Hạng mục {idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {detail}
                    </p>
                    <div className="text-[10px] text-[#83e05e] font-mono flex items-center gap-1 pt-1">
                      <Check className="w-3 h-3" />
                      <span>Đảm bảo 100% chuẩn</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
