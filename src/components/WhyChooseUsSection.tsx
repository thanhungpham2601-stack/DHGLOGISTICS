import { Award, Truck, MapPin, ShieldCheck, Radio, FileText } from 'lucide-react';
import { WHY_CHOOSE_US } from '../data/companyData';

export function WhyChooseUsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#5cb83a]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#5cb83a]" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-[#5cb83a]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#5cb83a]" />;
      case 'Radio': return <Radio className="w-6 h-6 text-[#5cb83a]" />;
      case 'FileText':
      default: return <FileText className="w-6 h-6 text-[#5cb83a]" />;
    }
  };

  return (
    <section id="why-choose-us" className="relative py-20 bg-[#060c09] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono bg-[#112018] px-3.5 py-1.5 rounded-full border border-[#203a2c]">
            <span>GIÁ TRỊ KHÁC BIỆT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
            TẠI SAO CHỌN DHG HEAVY HAUL?
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Sự kết hợp hoàn hảo giữa năng lực kỹ thuật công trình, đội ngũ lái xe giàu kinh nghiệm và hệ thống trang thiết bị chuyên dụng hiện đại nhất Việt Nam.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0e1914] rounded-2xl border border-[#1f372a] p-6 hover:border-[#5cb83a] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5cb83a]/10 group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-[#152a1e] border border-[#274635] group-hover:border-[#5cb83a] transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-[#83e05e]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white uppercase mt-4 group-hover:text-[#83e05e] transition-colors font-heading">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#182f22] flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Tiêu chuẩn vận hành</span>
                <span className="text-[#83e05e]">CAM KẾT 100%</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
