import { Award, Truck, MapPin, ShieldCheck, Radio, FileText, ArrowRight } from 'lucide-react';
import { WHY_CHOOSE_US, COMPANY_INFO } from '../data/companyData';
import { Reveal, StaggerGroup, StaggerItem } from './Reveal';
import { GeometricShowcase } from './GeometricShowcase';

export function WhyChooseUsSection() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Award': return <Award className="w-6 h-6 text-[#0b6fa8]" />;
      case 'Truck': return <Truck className="w-6 h-6 text-[#0b6fa8]" />;
      case 'MapPin': return <MapPin className="w-6 h-6 text-[#0b6fa8]" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-[#0b6fa8]" />;
      case 'Radio': return <Radio className="w-6 h-6 text-[#0b6fa8]" />;
      case 'FileText':
      default: return <FileText className="w-6 h-6 text-[#0b6fa8]" />;
    }
  };

  return (
    <section id="why-choose-us" className="relative py-20 bg-[#f0f2f5] border-b border-[#e1e3e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono bg-[#e6e7ed] px-3.5 py-1.5 rounded-full border border-[#d9dce4]">
              <span>GIÁ TRỊ KHÁC BIỆT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight">
              TẠI SAO CHỌN DHG TRANSPORT?
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Sự kết hợp hoàn hảo giữa năng lực kỹ thuật công trình, đội ngũ lái xe giàu kinh nghiệm và hệ thống trang thiết bị chuyên dụng hiện đại nhất Việt Nam.
            </p>
          </div>
        </Reveal>

        {/* Intro split: capability copy + angular photo showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16">
          <Reveal className="lg:col-span-6">
            <div className="space-y-6">
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                Hơn hai thập kỷ vận chuyển hàng siêu trường, siêu trọng cho các công trình năng lượng, công nghiệp nặng và hạ tầng trọng điểm quốc gia. DHG kết hợp đội xe chuyên dụng, quy trình khảo sát kỹ thuật chặt chẽ và mạng lưới chi nhánh xuyên suốt Bắc – Trung – Nam để đưa mọi lô hàng về đích an toàn.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {COMPANY_INFO.stats.slice(0, 4).map((stat, idx) => (
                  <div key={idx} className="p-4 rounded-none bg-[#eaebef] border border-[#dbdfe5]">
                    <div className="text-2xl font-black text-[#0b6fa8] font-heading">{stat.value}</div>
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wide mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs tracking-wider uppercase transition-all shadow-lg shadow-[#0b6fa8]/20 hover:-translate-y-0.5"
              >
                <span>Trao đổi cùng đội kỹ thuật</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-6">
            <GeometricShowcase />
          </Reveal>
        </div>

        {/* 6 Reasons Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CHOOSE_US.map((item, idx) => (
            <StaggerItem
              key={idx}
              className="bg-[#eaebef] rounded-none border border-[#dbdfe5] p-6 hover:border-[#1ba8e8] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b6fa8]/10 group flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-none bg-[#e1e4eb] border border-[#d3d6df] group-hover:border-[#1ba8e8] transition-colors">
                    {getIcon(item.icon)}
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500 group-hover:text-[#0b6fa8]">
                    0{idx + 1}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 uppercase mt-4 group-hover:text-[#0b6fa8] transition-colors font-heading">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-[#dfe2e9] flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Tiêu chuẩn vận hành</span>
                <span className="text-[#0b6fa8]">CAM KẾT 100%</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </div>
    </section>
  );
}
