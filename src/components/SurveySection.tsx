import { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, ShieldCheck, Ruler, Building2, Spline, Eye, FileText, AlertTriangle } from 'lucide-react';
import { SURVEY_PILLARS } from '../data/companyData';
import { Reveal } from './Reveal';

interface SurveySectionProps {
  onOpenSurveyModal: () => void;
}

export function SurveySection({ onOpenSurveyModal }: SurveySectionProps) {
  const [activeStep, setActiveStep] = useState(0);

  const evaluationChain = [
    { label: "Hàng hóa", desc: "Kích thước 3D & Trọng lượng tâm" },
    { label: "Phương tiện", desc: "Cấu hình đầu kéo & số trục mooc" },
    { label: "Tuyến đường", desc: "Cung đường liên tỉnh tối ưu" },
    { label: "Tải trọng", desc: "Khả năng chịu tải cầu cống" },
    { label: "Chiều cao", desc: "Tĩnh không cầu vượt, dây điện" },
    { label: "Bán kính quay", desc: "Mô phỏng góc cua ngã ba/tư" },
    { label: "Chướng ngại vật", desc: "Biển báo, dải phân cách" },
    { label: "Phương án an toàn", desc: "Bản vẽ kỹ thuật & Giấy phép" },
  ];

  const surveyChecklist = [
    "Kiểm tra kích thước (Dài x Rộng x Cao) và trọng lượng thực tế hàng hóa",
    "Đánh giá điểm lấy hàng, ram dốc và điểm giao hàng tại công trường",
    "Khảo sát khả năng tiếp cận, bán kính quay của phương tiện chuyên dụng",
    "Kiểm tra toàn bộ cầu, đường, tải trọng khai thác và các nút giao",
    "Đo đạc chính xác chiều cao tĩnh không (cầu vượt, cổng chào, đường điện)",
    "Kiểm tra hệ thống dây điện hạ thế/cao thế, biển báo giao thông trên tuyến",
    "Xác định các vị trí cần nâng hạ đường dây, tháo dỡ biển báo tạm thời",
    "Xây dựng phương án vận chuyển tổng thể, biểu đồ chạy xe và lashing plan"
  ];

  return (
    <section id="capabilities" className="relative py-20 bg-[#edeef2] border-b border-[#e0e3e8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono bg-[#e3e5eb] px-3.5 py-1.5 rounded-full border border-[#d6d9e2]">
              <Compass className="w-3.5 h-3.5 text-[#0b6fa8]" />
              <span>KỸ THUẬT & KHẢO SÁT CHUYÊN SÂU</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight">
              KHÔNG CHỈ LÀ CHỞ HÀNG – CHÚNG TÔI THIẾT KẾ CẢ HÀNH TRÌNH
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Đối với hàng hóa siêu trường, chỉ cần một điểm hạn chế trên tuyến đường cũng có thể ảnh hưởng đến toàn bộ phương án. DHG đánh giá đa chiều trước khi bánh xe lăn bánh.
            </p>
          </div>
        </Reveal>

        {/* Evaluation Flowchart Chain (From PDF) */}
        <Reveal delay={0.1}><div className="bg-[#e8eaef] rounded-none border border-[#d9dce3] p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-bold text-[#0b6fa8] uppercase tracking-wider">
              CHUỖI ĐÁNH GIÁ KỸ THUẬT TIỀN DỰ ÁN (PRE-ENGINEERING CHAIN)
            </h3>
            <span className="text-[11px] text-slate-500 font-mono">Chuẩn ISO 9001:2015</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {evaluationChain.map((node, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative p-3 rounded-none border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-[#dee1e8] border-[#1ba8e8] shadow-lg shadow-[#0b6fa8]/20 scale-105'
                    : 'bg-[#e5e7ed] border-[#dadde3] hover:border-[#c8ccd5]'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-500">
                    BƯỚC 0{idx + 1}
                  </div>
                  <div className="text-xs font-bold text-slate-900 uppercase mt-1 leading-tight">
                    {node.label}
                  </div>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 line-clamp-2">
                  {node.desc}
                </div>
                {idx < evaluationChain.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#0b6fa8] text-xs font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div></Reveal>

        {/* Survey Content Grid & 8 Critical Checkpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 4 Survey Pillars from PDF */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-slate-900 uppercase font-heading tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0b6fa8]" />
              <span>4 Trụ Cột Khảo Sát Tuyến Đường Trọng Điểm</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SURVEY_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-[#e8eaef] p-5 rounded-none border border-[#dadee4] hover:border-[#1ba8e8]/60 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#0b6fa8] uppercase font-sans">
                      {idx === 0 && <Ruler className="w-4 h-4 text-[#0b6fa8]" />}
                      {idx === 1 && <Building2 className="w-4 h-4 text-[#0b6fa8]" />}
                      {idx === 2 && <Spline className="w-4 h-4 text-[#0b6fa8]" />}
                      {idx === 3 && <Eye className="w-4 h-4 text-[#0b6fa8]" />}
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-xs text-slate-700 mt-2 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#dfe2e8] space-y-1">
                    {pillar.criticalPoints.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <span className="w-1 h-1 rounded-full bg-[#1ba8e8]"></span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Target Outcome banner from PDF */}
            <div className="p-4 rounded-none bg-gradient-to-r from-[#e2e4eb] to-[#e8eaee] border border-[#d3d7df] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#0b6fa8]">MỤC TIÊU CỐT LÕI</span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 mt-0.5">
                  Lựa chọn tuyến đường an toàn tuyệt đối, khả thi về mặt kỹ thuật và tối ưu chi phí cho chủ đầu tư.
                </p>
              </div>
              <button
                onClick={onOpenSurveyModal}
                className="shrink-0 px-4 py-2 bg-[#1ba8e8] text-white font-bold text-xs rounded-none hover:bg-[#3fc1ff] transition-colors"
              >
                Đăng ký khảo sát
              </button>
            </div>
          </div>

          {/* Right: 8 Checklist points directly from PDF */}
          <div className="lg:col-span-5 bg-[#e9eaef] rounded-none border border-[#d9dce3] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#dee1e7]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#0b6fa8]" />
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider font-heading">
                  Nội Dung Khảo Sát Hiện Trường (8 Điểm)
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-none bg-[#e0e2e9] text-[#0b6fa8] border border-[#d4d7e0]">
                PDF SEC.3
              </span>
            </div>

            <div className="space-y-2.5">
              {surveyChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-none bg-[#e5e7ed] border border-[#dde0e7] text-xs text-slate-800 hover:border-[#1ba8e8]/40 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#dfe1e9] text-[#0b6fa8] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#d4d7e0]">
                    0{idx + 1}
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSurveyModal}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-none bg-[#e1e3ea] hover:bg-[#dadce4] text-slate-900 font-bold text-xs uppercase tracking-wider border border-[#cfd3dc] transition-all hover:border-[#1ba8e8]"
              >
                <span>YÊU CẦU ĐỘI KỸ THUẬT KHẢO SÁT HIỆN TRƯỜNG</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0b6fa8]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
