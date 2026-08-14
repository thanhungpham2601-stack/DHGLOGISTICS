import { useState } from 'react';
import { Compass, CheckCircle2, ArrowRight, ShieldCheck, Ruler, Building2, Spline, Eye, FileText, AlertTriangle } from 'lucide-react';
import { SURVEY_PILLARS } from '../data/companyData';

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
    <section id="capabilities" className="relative py-20 bg-[#0a120e] border-b border-[#1a2d22]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono bg-[#14261d] px-3.5 py-1.5 rounded-full border border-[#234233]">
            <Compass className="w-3.5 h-3.5 text-[#5cb83a]" />
            <span>KỸ THUẬT & KHẢO SÁT CHUYÊN SÂU</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
            KHÔNG CHỈ LÀ CHỞ HÀNG – CHÚNG TÔI THIẾT KẾ CẢ HÀNH TRÌNH
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Đối với hàng hóa siêu trường, chỉ cần một điểm hạn chế trên tuyến đường cũng có thể ảnh hưởng đến toàn bộ phương án. DHG đánh giá đa chiều trước khi bánh xe lăn bánh.
          </p>
        </div>

        {/* Evaluation Flowchart Chain (From PDF) */}
        <div className="bg-[#0f1d16] rounded-2xl border border-[#213a2d] p-6 sm:p-8 mb-12 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-mono font-bold text-[#83e05e] uppercase tracking-wider">
              CHUỖI ĐÁNH GIÁ KỸ THUẬT TIỀN DỰ ÁN (PRE-ENGINEERING CHAIN)
            </h3>
            <span className="text-[11px] text-slate-400 font-mono">Chuẩn ISO 9001:2015</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {evaluationChain.map((node, idx) => (
              <div
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`relative p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col justify-between ${
                  activeStep === idx
                    ? 'bg-[#183124] border-[#5cb83a] shadow-lg shadow-[#5cb83a]/20 scale-105'
                    : 'bg-[#12221a] border-[#22392c] hover:border-[#385c48]'
                }`}
              >
                <div>
                  <div className="text-[10px] font-mono font-bold text-slate-400">
                    BƯỚC 0{idx + 1}
                  </div>
                  <div className="text-xs font-bold text-white uppercase mt-1 leading-tight">
                    {node.label}
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 line-clamp-2">
                  {node.desc}
                </div>
                {idx < evaluationChain.length - 1 && (
                  <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 z-10 text-[#5cb83a] text-xs font-bold">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Survey Content Grid & 8 Critical Checkpoints */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: 4 Survey Pillars from PDF */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xl font-bold text-white uppercase font-heading tracking-wide flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#5cb83a]" />
              <span>4 Trụ Cột Khảo Sát Tuyến Đường Trọng Điểm</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SURVEY_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-[#0f1d16] p-5 rounded-xl border border-[#20392b] hover:border-[#5cb83a]/60 transition-all flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center gap-2 text-sm font-bold text-[#83e05e] uppercase font-sans">
                      {idx === 0 && <Ruler className="w-4 h-4 text-[#5cb83a]" />}
                      {idx === 1 && <Building2 className="w-4 h-4 text-[#5cb83a]" />}
                      {idx === 2 && <Spline className="w-4 h-4 text-[#5cb83a]" />}
                      {idx === 3 && <Eye className="w-4 h-4 text-[#5cb83a]" />}
                      <span>{pillar.title}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#1a2f23] space-y-1">
                    {pillar.criticalPoints.map((pt, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                        <span className="w-1 h-1 rounded-full bg-[#5cb83a]"></span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Target Outcome banner from PDF */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-[#14281f] to-[#101d17] border border-[#284837] flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-[#83e05e]">MỤC TIÊU CỐT LÕI</span>
                <p className="text-xs sm:text-sm font-bold text-white mt-0.5">
                  Lựa chọn tuyến đường an toàn tuyệt đối, khả thi về mặt kỹ thuật và tối ưu chi phí cho chủ đầu tư.
                </p>
              </div>
              <button
                onClick={onOpenSurveyModal}
                className="shrink-0 px-4 py-2 bg-[#5cb83a] text-[#09110e] font-bold text-xs rounded-lg hover:bg-[#6dd144] transition-colors"
              >
                Đăng ký khảo sát
              </button>
            </div>
          </div>

          {/* Right: 8 Checklist points directly from PDF */}
          <div className="lg:col-span-5 bg-[#0e1a14] rounded-2xl border border-[#213a2d] p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#1b3124]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#5cb83a]" />
                <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
                  Nội Dung Khảo Sát Hiện Trường (8 Điểm)
                </h4>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#172c21] text-[#83e05e] border border-[#264434]">
                PDF SEC.3
              </span>
            </div>

            <div className="space-y-2.5">
              {surveyChecklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-2.5 rounded-lg bg-[#12221a] border border-[#1a3225] text-xs text-slate-200 hover:border-[#5cb83a]/40 transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#182f23] text-[#83e05e] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#254534]">
                    0{idx + 1}
                  </div>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSurveyModal}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#162a20] hover:bg-[#1f3a2d] text-white font-bold text-xs uppercase tracking-wider border border-[#2c4e3b] transition-all hover:border-[#5cb83a]"
              >
                <span>YÊU CẦU ĐỘI KỸ THUẬT KHẢO SÁT HIỆN TRƯỜNG</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#5cb83a]" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
