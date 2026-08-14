import { Award, Truck, MapPin, ShieldCheck, Radio, FileText } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/companyData';

export function WhyChooseUsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#1f6b12]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#1f6b12]" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-[#1f6b12]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#1f6b12]" />;
      case 'Radio': return <Radio className="w-6 h-6 text-[#1f6b12]" />;
      case 'FileText':
      default: return <FileText className="w-6 h-6 text-[#1f6b12]" />;
    }
  };

  return (
    <section id="why-choose-us" className="relative py-20 bg-[#f0f5f2] border-b border-[#e1e9e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#1f6b12] tracking-widest uppercase font-mono bg-[#e6edea] px-3.5 py-1.5 rounded-full border border-[#d9e4de]">
            <span>GIÁ TRỊ KHÁC BIỆT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight">
            TẠI SAO CHỌN DHG HEAVY HAUL?
          </h2>
          <p className="text-sm sm:text-base text-slate-700">
            Sự kết hợp hoàn hảo giữa năng lực kỹ thuật công trình, đội ngũ lái xe giàu kinh nghiệm và hệ thống trang thiết bị chuyên dụng hiện đại nhất Việt Nam.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#eaefed] rounded-2xl border border-[#dbe5df] p-6 hover:border-[#5cb83a] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1f6b12]/10 group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#e1ebe5] border border-[#d3dfd9] group-hover:border-[#5cb83a] transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-[#1f6b12]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 uppercase mt-4 group-hover:text-[#1f6b12] transition-colors font-heading">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#dfe9e3] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Tiêu chuẩn vận hành</span>
                <span className="text-[#1f6b12]">CAM KẾT 100%</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
