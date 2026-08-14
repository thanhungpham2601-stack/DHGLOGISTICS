import { ShieldCheck, FileCheck, Radio, Check, Anchor, AlertCircle, Wrench } from 'lucide-react';

export function SafetyLegalSection() {
  const legalSupportList = [
    "Tư vấn trọn gói hồ sơ kỹ thuật phương tiện và hàng hóa theo quy chuẩn",
    "Chuẩn bị bản vẽ phân bổ tải trọng và phương án chạy xe qua cầu yếu",
    "Thực hiện thủ tục xin cấp Giấy phép lưu hành đặc biệt của Cục Đường Bộ",
    "Phối hợp với Sở GTVT, Công an Giao thông các tỉnh dọc hành trình",
    "Lập kế hoạch thời gian và khung giờ lưu hành phù hợp từng địa phương",
    "Phối hợp phương án phân luồng, nâng hạ đường dây điện cao thế khi cần"
  ];

  const lashingProtocols = [
    "Xác định chính xác vị trí trọng tâm đặt hàng trên sàn mooc",
    "Tính toán phân bổ đều tải trọng lên từng trục bánh xe",
    "Sử dụng xích chịu lực tải nặng Grade 100 và tăng đơ khóa Ratchet",
    "Kiểm tra nghiêm ngặt tất cả điểm móc cẩu và liên kết khóa",
    "Kiểm tra thử nghiệm độ ổn định và góc nghiêng trước khi xuất bãi",
    "Dừng xe kiểm tra lại lực siết chằng buộc định kỳ sau mỗi 50km"
  ];

  const monitoringFeatures = [
    { title: "Định Vị GPS & Telematics 24/7", desc: "Theo dõi vị trí, vận tốc, góc nghiêng thời gian thực qua trung tâm điều hành." },
    { title: "Hệ Thống Bộ Đàm Vô Tuyến Riêng", desc: "Liên lạc liên tục giữa xe đầu kéo, xe hoa tiêu dẫn đoàn và xe hậu cần." },
    { title: "Chủ Động Xử Lý Sự Cố Hiện Trường", desc: "Đội ngũ kỹ sư cơ giới túc trực sẵn sàng giải tỏa điểm nghẽn 24/7." },
    { title: "Báo Cáo Tự Động Cho Chủ Hàng", desc: "Cập nhật định kỳ vị trí, hình ảnh và tiến độ hành trình trực tiếp qua Zalo/Email." },
  ];

  return (
    <section id="safety-legal" className="relative py-20 bg-[#0a1410] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono bg-[#12231b] px-3.5 py-1.5 rounded-full border border-[#203a2c]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#5cb83a]" />
            <span>CHUẨN MỰC AN TOÀN & PHÁP LÝ</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
            AN TOÀN HÀNG HÓA BẮT ĐẦU TỪ KHÂU CHUẨN BỊ
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Từ thủ tục pháp lý, giấy phép lưu hành đến phương án chằng buộc lashing và điều phối 24/7, DHG cam kết bảo vệ an toàn 100% tài sản của khách hàng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Legal & Permits (PDF Section 6) */}
          <div className="bg-[#0e1a14] rounded-2xl border border-[#213a2d] p-6 space-y-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-[#1a3124]">
                <div className="p-3 rounded-xl bg-[#172b20] border border-[#2a4d3a] text-[#83e05e]">
                  <FileCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#83e05e]">MỤC 06 • PDF</span>
                  <h3 className="text-lg font-bold text-white uppercase font-heading">
                    Thủ Tục Pháp Lý & Giấy Phép
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                Đối với hàng quá khổ, quá tải, tuân thủ đúng quy định giao thông là điều kiện tiên quyết. DHG hỗ trợ trọn gói hồ sơ cấp phép.
              </p>

              <div className="mt-4 space-y-2">
                {legalSupportList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-[#5cb83a] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#182f22]">
              <span className="text-[11px] font-mono text-[#83e05e] block">
                ✓ 100% chuyến hàng lưu hành đầy đủ giấy phép hợp lệ
              </span>
            </div>
          </div>

          {/* Card 2: Lashing & Securing Cargo (PDF Section 8) */}
          <div className="bg-[#0e1a14] rounded-2xl border border-[#213a2d] p-6 space-y-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-[#1a3124]">
                <div className="p-3 rounded-xl bg-[#172b20] border border-[#2a4d3a] text-[#83e05e]">
                  <Wrench className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#83e05e]">MỤC 08 • PDF</span>
                  <h3 className="text-lg font-bold text-white uppercase font-heading">
                    Bốc Xếp & Chằng Buộc Lashing
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                Phân bổ tải trọng và cố định hàng hóa đúng tiêu chuẩn kỹ thuật đóng vai trò sống còn trong suốt hành trình vận chuyển.
              </p>

              <div className="mt-4 space-y-2">
                {lashingProtocols.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-3.5 h-3.5 text-[#5cb83a] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#182f22]">
              <span className="text-[11px] font-mono text-[#83e05e] block">
                ✓ Thiết bị chằng buộc tiêu chuẩn EN 12195 / ISO
              </span>
            </div>
          </div>

          {/* Card 3: 24/7 Command & Dispatch (PDF Section 7) */}
          <div className="bg-[#0e1a14] rounded-2xl border border-[#213a2d] p-6 space-y-5 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center gap-3 pb-4 border-b border-[#1a3124]">
                <div className="p-3 rounded-xl bg-[#172b20] border border-[#2a4d3a] text-[#83e05e]">
                  <Radio className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-[#83e05e]">MỤC 07 • PDF</span>
                  <h3 className="text-lg font-bold text-white uppercase font-heading">
                    Giám Sát & Điều Phối 24/7
                  </h3>
                </div>
              </div>

              <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                Đội ngũ điều phối trung tâm theo dõi quá trình vận chuyển, phản ứng nhanh và phối hợp nhịp nhàng trên mọi cung đường.
              </p>

              <div className="mt-4 space-y-3">
                {monitoringFeatures.map((m, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#12221a] border border-[#1b3225]">
                    <span className="text-xs font-bold text-white block">{m.title}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 block">{m.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#182f22]">
              <span className="text-[11px] font-mono text-[#83e05e] block">
                ✓ Trung tâm trực ban 24/7/365
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
