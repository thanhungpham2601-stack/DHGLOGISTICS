import { useState } from 'react';
import { Moon, Sun, ArrowRight, ShieldCheck, Factory, HardHat, Zap, Flame, Cog, Boxes, Anchor, Ship, Truck } from 'lucide-react';
import { LOGISTICS_ROUTES, INDUSTRIES_SERVED } from '../data/companyData';

interface LogisticsChainProps {
  onOpenQuote: () => void;
}

export function LogisticsChainSection({ onOpenQuote }: LogisticsChainProps) {
  const [activeTab, setActiveTab] = useState<'routes' | 'night' | 'industries'>('routes');

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat': return <HardHat className="w-5 h-5 text-[#5cb83a]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#5cb83a]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#5cb83a]" />;
      case 'Cog': return <Cog className="w-5 h-5 text-[#5cb83a]" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-[#5cb83a]" />;
      case 'Anchor':
      default: return <Anchor className="w-5 h-5 text-[#5cb83a]" />;
    }
  };

  return (
    <section id="logistics-chain" className="relative py-20 bg-[#08100d] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono">
              <span className="w-4 h-0.5 bg-[#5cb83a]"></span>
              <span>KẾT NỐI TOÀN BỘ CHUỖI VẬN CHUYỂN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight mt-2">
              TỪ MỘT CHUYẾN HÀNG ĐẾN TOÀN BỘ DỰ ÁN
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#0f1d16] border border-[#213b2e]">
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'routes'
                  ? 'bg-[#5cb83a] text-[#09110e] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Hành Trình Vận Chuyển
            </button>
            <button
              onClick={() => setActiveTab('night')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'night'
                  ? 'bg-[#5cb83a] text-[#09110e] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Vận Chuyển Ban Đêm</span>
            </button>
            <button
              onClick={() => setActiveTab('industries')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'industries'
                  ? 'bg-[#5cb83a] text-[#09110e] shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Các Ngành Phục Vụ
            </button>
          </div>
        </div>

        {/* Tab 1: Logistics Multi-Modal Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOGISTICS_ROUTES.map((route, idx) => (
                <div
                  key={idx}
                  className="bg-[#0e1914] rounded-xl border border-[#20392b] p-5 hover:border-[#5cb83a] transition-all hover:-translate-y-1 shadow-lg group"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#1b3124]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#162a20] text-[#83e05e] font-mono text-xs font-bold border border-[#264434]">
                        {route.from}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#5cb83a]" />
                      <span className="px-2.5 py-1 rounded bg-[#1b3326] text-white font-mono text-xs font-bold border border-[#2d523e]">
                        {route.to}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">CHẶNG 0{idx + 1}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-300 mt-4 leading-relaxed">
                    {route.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#182c20] flex items-center justify-between text-xs text-slate-400 group-hover:text-[#83e05e]">
                    <span>Giải pháp xe chuyên dụng</span>
                    <span>→</span>
                  </div>
                </div>
              ))}

              {/* Custom Project Package Box */}
              <div className="bg-gradient-to-br from-[#12231b] to-[#0c1813] rounded-xl border border-[#264736] p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#83e05e]">TRỌN GÓI CHO DỰ ÁN</span>
                  <h4 className="text-base font-bold text-white uppercase mt-1">
                    Lập phương án vận chuyển cho toàn bộ dự án
                  </h4>
                  <p className="text-xs text-slate-300 mt-2">
                    Đáp ứng kế hoạch vận chuyển định kỳ, điều động nhiều đoàn xe cùng lúc cho các đại dự án FDI và công trình trọng điểm quốc gia.
                  </p>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="mt-4 w-full py-2.5 rounded-lg bg-[#5cb83a] text-[#09110e] font-bold text-xs uppercase hover:bg-[#6dd144] transition-colors"
                >
                  Tư Vấn Hợp Đồng Dự Án
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Night Transport (Section 10 PDF) */}
        {activeTab === 'night' && (
          <div className="bg-[#0b1612] rounded-2xl border border-[#213c2e] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#14261d] text-xs font-mono text-[#83e05e] border border-[#234233]">
                  <Moon className="w-4 h-4 text-[#5cb83a]" />
                  <span>LINH HOẠT THEO ĐẶC THÙ TỪNG DỰ ÁN</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black uppercase text-white font-heading">
                  VẬN CHUYỂN BAN ĐÊM (22:00 – 05:00)
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed">
                  Đối với một số loại hàng hóa siêu trường, siêu trọng và các cung đường đô thị hoặc quốc lộ huyết mạch, vận chuyển vào ban đêm giúp tối ưu thời gian, hạn chế tối đa ảnh hưởng đến hoạt động giao thông công cộng và tuân thủ tuyệt đối khung giờ cấp phép của Cục Đường Bộ.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#112018] border border-[#1e382b] text-xs text-slate-200 space-y-1">
                    <span className="font-bold text-[#83e05e] block">Xe hoa tiêu cảnh báo</span>
                    <span>Đèn chớp vàng, còi ưu tiên và biển báo siêu trường phát quang dẫn đường cách 200m.</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#112018] border border-[#1e382b] text-xs text-slate-200 space-y-1">
                    <span className="font-bold text-[#83e05e] block">Bộ đàm vô tuyến cự ly xa</span>
                    <span>Đội ngũ lái xe, phụ xe và kỹ thuật phối hợp xuyên suốt qua sóng vô tuyến riêng.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#0f1d16] p-6 rounded-xl border border-[#233d2f] space-y-4">
                <h4 className="text-sm font-bold text-white uppercase font-heading text-[#83e05e]">
                  Cam kết vận hành ban đêm
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#5cb83a] font-bold">✓</span>
                    <span>100% tài xế có trên 10 năm thâm niên lái xe quá khổ ban đêm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5cb83a] font-bold">✓</span>
                    <span>Đầy đủ giấy phép lưu hành đêm do Cục CSGT và Sở GTVT cấp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#5cb83a] font-bold">✓</span>
                    <span>Đội ngũ cứu hộ cơ giới túc trực sẵn sàng hỗ trợ kỹ thuật trên tuyến</span>
                  </li>
                </ul>

                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 rounded-lg bg-[#5cb83a] text-[#09110e] font-bold text-xs uppercase tracking-wider hover:bg-[#6dd144] transition-all"
                >
                  Lên Kế Hoạch Chạy Đêm Cho Lô Hàng
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Industries Served */}
        {activeTab === 'industries' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES_SERVED.map((ind, idx) => (
              <div
                key={idx}
                className="bg-[#0e1914] rounded-xl border border-[#1f372a] p-5 hover:border-[#5cb83a] transition-all group"
              >
                <div className="p-3 rounded-lg bg-[#14261d] w-fit border border-[#264434] group-hover:border-[#5cb83a] mb-4">
                  {getIndustryIcon(ind.icon)}
                </div>
                <h4 className="text-base font-bold text-white uppercase group-hover:text-[#83e05e] transition-colors">
                  {ind.name}
                </h4>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {ind.desc}
                </p>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
