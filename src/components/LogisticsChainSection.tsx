import { useState } from 'react';
import { Moon, Sun, ArrowRight, ShieldCheck, Factory, HardHat, Zap, Flame, Cog, Boxes, Anchor, Ship, Truck } from 'lucide-react';
import { LOGISTICS_ROUTES, INDUSTRIES_SERVED } from '../data/companyData';
import { Reveal } from './Reveal';

interface LogisticsChainProps {
  onOpenQuote: () => void;
}

export function LogisticsChainSection({ onOpenQuote }: LogisticsChainProps) {
  const [activeTab, setActiveTab] = useState<'routes' | 'night' | 'industries'>('routes');

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'HardHat': return <HardHat className="w-5 h-5 text-[#0b6fa8]" />;
      case 'Zap': return <Zap className="w-5 h-5 text-[#0b6fa8]" />;
      case 'Flame': return <Flame className="w-5 h-5 text-[#0b6fa8]" />;
      case 'Cog': return <Cog className="w-5 h-5 text-[#0b6fa8]" />;
      case 'Boxes': return <Boxes className="w-5 h-5 text-[#0b6fa8]" />;
      case 'Anchor':
      default: return <Anchor className="w-5 h-5 text-[#0b6fa8]" />;
    }
  };

  return (
    <section id="logistics-chain" className="relative py-20 bg-[#eeeff3] border-b border-[#e1e3e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal><div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono">
              <span className="w-4 h-0.5 bg-[#1ba8e8]"></span>
              <span>KẾT NỐI TOÀN BỘ CHUỖI VẬN CHUYỂN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight mt-2">
              TỪ MỘT CHUYẾN HÀNG ĐẾN TOÀN BỘ DỰ ÁN
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 p-1.5 rounded-none bg-[#e8eaef] border border-[#d9dce3]">
            <button
              onClick={() => setActiveTab('routes')}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'routes'
                  ? 'bg-[#1ba8e8] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Hành Trình Vận Chuyển
            </button>
            <button
              onClick={() => setActiveTab('night')}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'night'
                  ? 'bg-[#1ba8e8] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Vận Chuyển Ban Đêm</span>
            </button>
            <button
              onClick={() => setActiveTab('industries')}
              className={`px-4 py-2 rounded-none text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'industries'
                  ? 'bg-[#1ba8e8] text-white shadow-md'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Các Ngành Phục Vụ
            </button>
          </div>
        </div></Reveal>

        {/* Tab 1: Logistics Multi-Modal Routes */}
        {activeTab === 'routes' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {LOGISTICS_ROUTES.map((route, idx) => (
                <div
                  key={idx}
                  className="bg-[#eaebef] rounded-none border border-[#dadee4] p-5 hover:border-[#1ba8e8] transition-all hover:-translate-y-1 shadow-lg group"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#dee1e7]">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-none bg-[#e1e3ea] text-[#0b6fa8] font-mono text-xs font-bold border border-[#d4d7e0]">
                        {route.from}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#0b6fa8]" />
                      <span className="px-2.5 py-1 rounded-none bg-[#dde1e7] text-slate-900 font-mono text-xs font-bold border border-[#ced2db]">
                        {route.to}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">CHẶNG 0{idx + 1}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed">
                    {route.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#e0e3e9] flex items-center justify-between text-xs text-slate-500 group-hover:text-[#0b6fa8]">
                    <span>Giải pháp xe chuyên dụng</span>
                    <span>→</span>
                  </div>
                </div>
              ))}

              {/* Custom Project Package Box */}
              <div className="bg-gradient-to-br from-[#e5e7ed] to-[#eaebf1] rounded-none border border-[#d3d7e0] p-5 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-[#0b6fa8]">TRỌN GÓI CHO DỰ ÁN</span>
                  <h4 className="text-base font-bold text-slate-900 uppercase mt-1">
                    Lập phương án vận chuyển cho toàn bộ dự án
                  </h4>
                  <p className="text-xs text-slate-700 mt-2">
                    Đáp ứng kế hoạch vận chuyển định kỳ, điều động nhiều đoàn xe cùng lúc cho các đại dự án FDI và công trình trọng điểm quốc gia.
                  </p>
                </div>
                <button
                  onClick={onOpenQuote}
                  className="mt-4 w-full py-2.5 rounded-none bg-[#1ba8e8] text-white font-bold text-xs uppercase hover:bg-[#3fc1ff] transition-colors"
                >
                  Tư Vấn Hợp Đồng Dự Án
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Night Transport (Section 10 PDF) */}
        {activeTab === 'night' && (
          <div className="bg-[#ebebf1] rounded-none border border-[#d8dae3] p-6 sm:p-10 shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-none bg-[#e3e5eb] text-xs font-mono text-[#0b6fa8] border border-[#d6d9e2]">
                  <Moon className="w-4 h-4 text-[#0b6fa8]" />
                  <span>LINH HOẠT THEO ĐẶC THÙ TỪNG DỰ ÁN</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-black uppercase text-slate-900 font-heading">
                  VẬN CHUYỂN BAN ĐÊM (22:00 – 05:00)
                </h3>

                <p className="text-sm text-slate-700 leading-relaxed">
                  Đối với một số loại hàng hóa siêu trường, siêu trọng và các cung đường đô thị hoặc quốc lộ huyết mạch, vận chuyển vào ban đêm giúp tối ưu thời gian, hạn chế tối đa ảnh hưởng đến hoạt động giao thông công cộng và tuân thủ tuyệt đối khung giờ cấp phép của Cục Đường Bộ.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-none bg-[#e6e7ed] border border-[#dadce5] text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-[#0b6fa8] block">Xe hoa tiêu cảnh báo</span>
                    <span>Đèn chớp vàng, còi ưu tiên và biển báo siêu trường phát quang dẫn đường cách 200m.</span>
                  </div>
                  <div className="p-3.5 rounded-none bg-[#e6e7ed] border border-[#dadce5] text-xs text-slate-800 space-y-1">
                    <span className="font-bold text-[#0b6fa8] block">Bộ đàm vô tuyến cự ly xa</span>
                    <span>Đội ngũ lái xe, phụ xe và kỹ thuật phối hợp xuyên suốt qua sóng vô tuyến riêng.</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 bg-[#e8eaef] p-6 rounded-none border border-[#d8dbe2] space-y-4">
                <h4 className="text-sm font-bold text-slate-900 uppercase font-heading text-[#0b6fa8]">
                  Cam kết vận hành ban đêm
                </h4>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b6fa8] font-bold">✓</span>
                    <span>100% tài xế có trên 10 năm thâm niên lái xe quá khổ ban đêm</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b6fa8] font-bold">✓</span>
                    <span>Đầy đủ giấy phép lưu hành đêm do Cục CSGT và Sở GTVT cấp</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#0b6fa8] font-bold">✓</span>
                    <span>Đội ngũ cứu hộ cơ giới túc trực sẵn sàng hỗ trợ kỹ thuật trên tuyến</span>
                  </li>
                </ul>

                <button
                  onClick={onOpenQuote}
                  className="w-full py-3 rounded-none bg-[#1ba8e8] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3fc1ff] transition-all"
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
                className="bg-[#eaebef] rounded-none border border-[#dbdfe5] p-5 hover:border-[#1ba8e8] transition-all group"
              >
                <div className="p-3 rounded-none bg-[#e3e5eb] w-fit border border-[#d4d7e0] group-hover:border-[#1ba8e8] mb-4">
                  {getIndustryIcon(ind.icon)}
                </div>
                <h4 className="text-base font-bold text-slate-900 uppercase group-hover:text-[#0b6fa8] transition-colors">
                  {ind.name}
                </h4>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed">
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
