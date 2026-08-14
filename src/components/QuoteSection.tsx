import { useState, FormEvent, ChangeEvent } from 'react';
import { Send, CheckCircle2, Phone, Mail, Upload, AlertCircle, Calculator, FileText, Truck, ArrowRight } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { QuoteFormData } from '../types';

export function QuoteSection() {
  const [formData, setFormData] = useState<QuoteFormData>({
    cargoName: '',
    length: '',
    width: '',
    height: '',
    weight: '',
    quantity: '1',
    pickupLocation: '',
    deliveryLocation: '',
    estimatedDate: '',
    specialRequirements: '',
    customerName: '',
    phoneNumber: '',
    email: '',
    companyName: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [fileAttached, setFileAttached] = useState<string | null>(null);

  // Dynamic categorization based on inputs
  const l = parseFloat(String(formData.length)) || 0;
  const w = parseFloat(String(formData.width)) || 0;
  const h = parseFloat(String(formData.height)) || 0;
  const wt = parseFloat(String(formData.weight)) || 0;

  const isOversized = l > 12 || w > 2.5 || h > 4.2;
  const isOverweight = wt > 32;
  const isSuperHeavy = wt >= 70 || l >= 25 || w >= 3.5 || h >= 4.5;

  const getCategoryTag = () => {
    if (!l && !w && !h && !wt) return null;
    if (isSuperHeavy) return { text: "HÀNG SIÊU TRƯỜNG SIÊU TRỌNG ĐẶC BIỆT", color: "bg-red-500/20 text-red-400 border-red-500/40", vehicle: "Mooc Thủy Lực Đa Trục (Hydraulic Modular) + Đầu Kéo 800HP" };
    if (isOversized && isOverweight) return { text: "HÀNG QUÁ KHỔ & QUÁ TẢI", color: "bg-amber-500/20 text-amber-400 border-amber-500/40", vehicle: "Sơ-mi Rơ-moóc Sàn Thấp (Lowbed) hoặc Mooc Rút Dài" };
    if (isOversized) return { text: "HÀNG QUÁ KHỔ (SIÊU TRƯỜNG)", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40", vehicle: "Rơ-moóc Rút Dài Extendable Trailer" };
    if (isOverweight) return { text: "HÀNG QUÁ TẢI (SIÊU TRỌNG)", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40", vehicle: "Mooc Lùn Nhiều Trục Chịu Lực Cao" };
    return { text: "HÀNG HÓA THÔNG THƯỜNG / THIẾT BỊ TIÊU CHUẨN", color: "bg-slate-500/20 text-slate-300 border-slate-500/40", vehicle: "Đoàn xe vận chuyển tiêu chuẩn DHG" };
  };

  const categoryResult = getCategoryTag();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const generatedCode = 'DHG-' + Math.floor(100000 + Math.random() * 900000);
    setRefCode(generatedCode);
    setSubmitted(true);
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileAttached(e.target.files[0].name);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-[#08100d] border-b border-[#182a20]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (PDF Section 13 CTA) */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#83e05e] tracking-widest uppercase font-mono bg-[#112018] px-3.5 py-1.5 rounded-full border border-[#203a2c]">
            <FileText className="w-3.5 h-3.5 text-[#5cb83a]" />
            <span>MỤC 13 & 14 • YÊU CẦU BÁO GIÁ & KHẢO SÁT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white font-heading tracking-tight">
            BẠN ĐANG CÓ MỘT LÔ HÀNG KHÔNG THỂ VẬN CHUYỂN BẰNG PHƯƠNG TIỆN THÔNG THƯỜNG?
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Hãy gửi cho chúng tôi kích thước, trọng lượng, hình ảnh hàng hóa và địa điểm nhận – giao. Đội ngũ kỹ thuật sẽ đánh giá và đề xuất phương án vận chuyển tối ưu chi phí trong vòng 15 phút.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Support Channels */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#0e1914] rounded-2xl border border-[#213a2d] p-6 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-white uppercase font-heading text-[#83e05e]">
                Kênh Tiếp Nhận Trực Tiếp 24/7
              </h3>

              <div className="space-y-4">
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-[#13221b] border border-[#233f30] hover:border-[#5cb83a] transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[#192f23] text-[#5cb83a] group-hover:bg-[#5cb83a] group-hover:text-[#09110e] transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Hotline Kỹ Thuật Dự Án</span>
                    <p className="text-base font-bold text-white font-mono group-hover:text-[#83e05e]">
                      {COMPANY_INFO.hotlineFormatted}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-xl bg-[#13221b] border border-[#233f30] hover:border-[#5cb83a] transition-all group"
                >
                  <div className="p-2.5 rounded-lg bg-[#192f23] text-[#5cb83a] group-hover:bg-[#5cb83a] group-hover:text-[#09110e] transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Email Tiếp Nhận Hồ Sơ</span>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-[#83e05e]">
                      {COMPANY_INFO.quoteEmail}
                    </p>
                  </div>
                </a>
              </div>

              {/* Instant Spec Checker Box */}
              {categoryResult && (
                <div className="p-4 rounded-xl bg-[#12221a] border border-[#264434] space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-400">PHÂN LOẠI TẢI TRỌNG</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${categoryResult.color}`}>
                      {categoryResult.text}
                    </span>
                  </div>
                  <div className="text-xs text-slate-200">
                    <span className="text-slate-400">Gợi ý phương tiện: </span>
                    <span className="font-bold text-[#83e05e]">{categoryResult.vehicle}</span>
                  </div>
                </div>
              )}

              {/* Promise list from PDF */}
              <div className="pt-2 border-t border-[#1a3124] space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-[#5cb83a] font-bold">✓</span>
                  <span>Phản hồi báo giá trong 15 phút</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#5cb83a] font-bold">✓</span>
                  <span>Khảo sát hiện trường miễn phí</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#5cb83a] font-bold">✓</span>
                  <span>Tư vấn phương án tối ưu cung đường</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Main Form (PDF Section 14) */}
          <div className="lg:col-span-8 bg-[#0c1712] rounded-2xl border border-[#213b2e] p-6 sm:p-8 shadow-2xl">
            
            {submitted ? (
              /* Success confirmation message directly matching PDF */
              <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#183324] border border-[#5cb83a] text-[#5cb83a] flex items-center justify-center mx-auto shadow-xl shadow-[#5cb83a]/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="text-xs font-mono font-bold text-[#83e05e] bg-[#14261d] px-3 py-1 rounded-full border border-[#264836]">
                    MÃ TIẾP NHẬN: #{refCode}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white font-heading uppercase">
                    ĐÃ TIẾP NHẬN YÊU CẦU THÀNH CÔNG!
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed bg-[#101e18] p-4 rounded-xl border border-[#1f372a]">
                    Thông tin của bạn đã được gửi đến bộ phận vận hành. Chúng tôi sẽ liên hệ lại trong vòng 15 phút để trao đổi thêm về hàng hóa, tuyến đường và phương án vận chuyển tối ưu.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <a
                    href={`tel:${COMPANY_INFO.hotline}`}
                    className="px-6 py-3 rounded-lg bg-[#5cb83a] text-[#09110e] font-bold text-xs uppercase tracking-wider hover:bg-[#6dd144] transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Gọi trao đổi ngay ({COMPANY_INFO.hotlineFormatted})</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFileAttached(null);
                    }}
                    className="px-5 py-3 rounded-lg bg-[#14231c] text-slate-300 font-semibold text-xs border border-[#253e30] hover:text-white"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#1c3327]">
                  <div>
                    <h3 className="text-lg font-bold text-white uppercase font-heading">
                      GỬI THÔNG TIN HÀNG HÓA CẦN VẬN CHUYỂN
                    </h3>
                    <p className="text-xs text-slate-400">
                      Điền thông số để nhận báo giá & phương án kỹ thuật chính xác nhất
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#83e05e] font-bold">MẪU SỐ 14</span>
                </div>

                {/* Section 1: Thông số hàng hóa */}
                <div>
                  <h4 className="text-xs font-bold text-[#83e05e] uppercase tracking-wider font-mono mb-3">
                    1. Thông Số Hàng Hóa & Thiết Bị (Bắt buộc)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tên hàng hóa / thiết bị *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cargoName}
                        onChange={(e) => setFormData({ ...formData, cargoName: e.target.value })}
                        placeholder="VD: Máy xúc bánh xích Liebherr, Bồn Silo 120T, Máy biến áp..."
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#111e18] border border-[#213b2e] text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Số lượng kiện *
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#111e18] border border-[#213b2e] text-sm text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>
                  </div>

                  {/* 4 Dimension Inputs (Dài x Rộng x Cao x Tấn) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Chiều dài (m)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="VD: 14.5"
                        value={formData.length}
                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs font-mono text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Chiều rộng (m)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="VD: 3.8"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs font-mono text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Chiều cao (m)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="VD: 4.2"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs font-mono text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Trọng lượng (tấn) *
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        placeholder="VD: 65"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs font-mono text-[#83e05e] font-bold focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Tuyến đường giao nhận */}
                <div>
                  <h4 className="text-xs font-bold text-[#83e05e] uppercase tracking-wider font-mono mb-3">
                    2. Hành Trình & Thời Gian Vận Chuyển
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Địa điểm nhận hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        placeholder="VD: Cảng Hải Phòng / KCN Đình Vũ"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#111e18] border border-[#213b2e] text-sm text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Địa điểm giao hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        placeholder="VD: Công trường Nhà máy Điện Gió Đắk Lắk"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#111e18] border border-[#213b2e] text-sm text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Thời gian dự kiến *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.estimatedDate}
                        onChange={(e) => setFormData({ ...formData, estimatedDate: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-sm text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Tải ảnh hàng hóa & Ghi chú */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Hình ảnh hàng hóa / Bản vẽ kỹ thuật
                    </label>
                    <label className="flex flex-col items-center justify-center p-3 rounded-lg border-2 border-dashed border-[#233f30] hover:border-[#5cb83a] bg-[#111e18] cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-slate-400 mb-1" />
                      <span className="text-xs text-slate-300">
                        {fileAttached ? fileAttached : "Kéo thả hoặc nhấn để chọn file ảnh/PDF"}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">JPG, PNG, PDF tối đa 25MB</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Yêu cầu đặc biệt khác
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                      placeholder="Ghi chú về cẩu bốc dỡ, đường vào chật hẹp, cần chạy đêm, bảo hiểm..."
                      className="w-full px-3.5 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#5cb83a]"
                    />
                  </div>
                </div>

                {/* Section 4: Thông tin liên hệ */}
                <div>
                  <h4 className="text-xs font-bold text-[#83e05e] uppercase tracking-wider font-mono mb-3">
                    3. Thông Tin Người Đại Diện Nhận Báo Giá
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="0988xxxxxx"
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@company.com"
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Tên công ty / Dự án
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Công ty CP Xây dựng..."
                        className="w-full px-3 py-2 rounded-lg bg-[#111e18] border border-[#213b2e] text-xs text-white focus:outline-none focus:border-[#5cb83a]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    id="submit-quote-btn"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#5cb83a]/25 hover:shadow-[#5cb83a]/40 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>GỬI YÊU CẦU BÁO GIÁ & PHƯƠNG ÁN KỸ THUẬT</span>
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
