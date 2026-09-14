import { useState } from 'react';
import { motion } from 'motion/react';
import { ClipboardList, Search, MapPin, FileSpreadsheet, Stamp, Navigation, ShieldAlert, CheckCircle2, ChevronRight, Check } from 'lucide-react';
import { PROCESS_STEPS } from '../data/companyData';
import { Reveal } from './Reveal';

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
    <section id="process" className="relative py-20 bg-[#f0f2f5] border-b border-[#e1e3e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono bg-[#e6e7ed] px-3.5 py-1.5 rounded-full border border-[#d9dce4]">
              <span>QUY TRÌNH VẬN CHUYỂN TRỌN GÓI</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight">
              MỘT ĐẦU MỐI – TOÀN BỘ GIẢI PHÁP
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Chúng tôi cung cấp giải pháp vận chuyển từ khâu chuẩn bị, cấp phép lưu hành đến khi thiết bị được bàn giao an toàn tại bệ móng điểm đến.
            </p>
          </div>
        </Reveal>

        {/* 8-Step Interactive Grid Timeline */}
        <div className="relative mb-10">
          <div className="hidden lg:block absolute left-0 right-0 top-[2.35rem] h-0.5 bg-[#dee1e7] overflow-hidden rounded-full">
            <motion.div
              className="h-full bg-[#1ba8e8]"
              initial={{ width: '0%' }}
              animate={{ width: `${(selectedStep / (PROCESS_STEPS.length - 1)) * 100}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {PROCESS_STEPS.map((step, idx) => {
            const isSelected = selectedStep === idx;
            return (
              <button
                key={step.step}
                onClick={() => setSelectedStep(idx)}
                className={`relative p-3.5 rounded-none text-left transition-all duration-200 border flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-[#e1e4eb] border-[#1ba8e8] text-slate-900 shadow-xl shadow-[#0b6fa8]/20 scale-105 z-10'
                    : 'bg-[#ebedf0] border-[#dee1e7] text-slate-500 hover:text-slate-800 hover:border-[#d0d4dd]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#0b6fa8]">
                    {step.step}
                  </span>
                  <div className={`p-1 rounded-none ${isSelected ? 'text-[#0b6fa8]' : 'text-slate-500'}`}>
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
        </div>

        {/* Selected Step Detail Panel */}
        <div className="bg-[#eaebef] rounded-none border border-[#d7dae2] p-6 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-4 space-y-4 border-b lg:border-b-0 lg:border-r border-[#dbdde5] pb-6 lg:pb-0 lg:pr-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-none bg-[#e0e3e9] border border-[#d0d4dd] flex items-center justify-center text-[#0b6fa8]">
                  {getStepIcon(PROCESS_STEPS[selectedStep].icon)}
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#0b6fa8]">
                    BƯỚC {PROCESS_STEPS[selectedStep].step} TRÊN 08
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 font-heading uppercase">
                    {PROCESS_STEPS[selectedStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-700 leading-relaxed">
                {PROCESS_STEPS[selectedStep].desc}
              </p>

              <div className="flex items-center gap-2 pt-2">
                <button
                  disabled={selectedStep === 0}
                  onClick={() => setSelectedStep(prev => Math.max(0, prev - 1))}
                  className="px-3.5 py-1.5 rounded-none bg-[#e5e7ec] hover:bg-[#dfe2e8] disabled:opacity-30 text-xs font-semibold text-slate-700 border border-[#d9dce3]"
                >
                  ← Bước trước
                </button>
                <button
                  disabled={selectedStep === PROCESS_STEPS.length - 1}
                  onClick={() => setSelectedStep(prev => Math.min(PROCESS_STEPS.length - 1, prev + 1))}
                  className="px-3.5 py-1.5 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] disabled:opacity-30 text-xs font-bold text-white"
                >
                  Bước tiếp theo →
                </button>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                Nhiệm vụ & Tiêu Chuẩn Thực Hiện Chi Tiết:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {PROCESS_STEPS[selectedStep].details.map((detail, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-none bg-[#e5e6ec] border border-[#dbdde5] space-y-2 flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#dde1e7] text-[#0b6fa8] font-mono text-[10px] font-bold flex items-center justify-center shrink-0">
                        0{idx + 1}
                      </div>
                      <span className="text-xs font-bold text-slate-800">Hạng mục {idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed">
                      {detail}
                    </p>
                    <div className="text-[10px] text-[#0b6fa8] font-mono flex items-center gap-1 pt-1">
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
