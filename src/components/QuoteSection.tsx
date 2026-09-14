import { useState, FormEvent, ChangeEvent } from 'react';
import { Send, CheckCircle2, Phone, Mail, Upload, AlertCircle, Calculator, FileText, Truck, ArrowRight, Loader2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { QuoteFormData } from '../types';
import { supabase } from '../lib/supabaseClient';
import { Reveal } from './Reveal';

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
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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
    if (isSuperHeavy) return { text: "HÀNG SIÊU TRƯỜNG SIÊU TRỌNG ĐẶC BIỆT", color: "bg-red-50 text-red-600 border-red-300", vehicle: "Mooc Thủy Lực Đa Trục (Hydraulic Modular) + Đầu Kéo 800HP" };
    if (isOversized && isOverweight) return { text: "HÀNG QUÁ KHỔ & QUÁ TẢI", color: "bg-amber-50 text-amber-600 border-amber-300", vehicle: "Sơ-mi Rơ-moóc Sàn Thấp (Lowbed) hoặc Mooc Rút Dài" };
    if (isOversized) return { text: "HÀNG QUÁ KHỔ (SIÊU TRƯỜNG)", color: "bg-emerald-50 text-emerald-600 border-emerald-300", vehicle: "Rơ-moóc Rút Dài Extendable Trailer" };
    if (isOverweight) return { text: "HÀNG QUÁ TẢI (SIÊU TRỌNG)", color: "bg-cyan-50 text-cyan-600 border-cyan-300", vehicle: "Mooc Lùn Nhiều Trục Chịu Lực Cao" };
    return { text: "HÀNG HÓA THÔNG THƯỜNG / THIẾT BỊ TIÊU CHUẨN", color: "bg-slate-500/20 text-slate-700 border-slate-500/40", vehicle: "Đoàn xe vận chuyển tiêu chuẩn DHG" };
  };

  const categoryResult = getCategoryTag();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      let attachmentUrl: string | null = null;
      let attachmentName: string | null = null;

      if (attachedFile) {
        const ext = attachedFile.name.split('.').pop() || 'bin';
        const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from('quote-attachments')
          .upload(path, attachedFile);
        if (uploadError) throw uploadError;
        attachmentUrl = supabase.storage.from('quote-attachments').getPublicUrl(path).data.publicUrl;
        attachmentName = attachedFile.name;
      }

      const generatedCode = 'DHG-' + Math.floor(100000 + Math.random() * 900000);

      const { error: insertError } = await supabase.from('quote_requests').insert({
        ref_code: generatedCode,
        cargo_name: formData.cargoName,
        length: l || null,
        width: w || null,
        height: h || null,
        weight: wt || null,
        quantity: parseInt(String(formData.quantity), 10) || 1,
        pickup_location: formData.pickupLocation,
        delivery_location: formData.deliveryLocation,
        estimated_date: formData.estimatedDate || null,
        special_requirements: formData.specialRequirements,
        customer_name: formData.customerName,
        phone_number: formData.phoneNumber,
        email: formData.email,
        company_name: formData.companyName,
        attachment_url: attachmentUrl,
        attachment_name: attachmentName,
      });
      if (insertError) throw insertError;

      setRefCode(generatedCode);
      setSubmitted(true);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Gửi yêu cầu thất bại, vui lòng thử lại.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileAttached(e.target.files[0].name);
      setAttachedFile(e.target.files[0]);
    }
  };

  return (
    <section id="contact" className="relative py-20 bg-[#eeeff3] border-b border-[#e1e3e9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (PDF Section 13 CTA) */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#0b6fa8] tracking-widest uppercase font-mono bg-[#e6e7ed] px-3.5 py-1.5 rounded-full border border-[#d9dce4]">
              <FileText className="w-3.5 h-3.5 text-[#0b6fa8]" />
              <span>MỤC 13 & 14 • YÊU CẦU BÁO GIÁ & KHẢO SÁT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight">
              BẠN ĐANG CÓ MỘT LÔ HÀNG KHÔNG THỂ VẬN CHUYỂN BẰNG PHƯƠNG TIỆN THÔNG THƯỜNG?
            </h2>
            <p className="text-sm sm:text-base text-slate-700">
              Hãy gửi cho chúng tôi kích thước, trọng lượng, hình ảnh hàng hóa và địa điểm nhận – giao. Đội ngũ kỹ thuật sẽ đánh giá và đề xuất phương án vận chuyển tối ưu chi phí trong vòng 15 phút.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Info & Support Channels */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#eaebef] rounded-none border border-[#d9dce3] p-6 space-y-5 shadow-xl">
              <h3 className="text-xl font-bold text-slate-900 uppercase font-heading text-[#0b6fa8]">
                Kênh Tiếp Nhận Trực Tiếp 24/7
              </h3>

              <div className="space-y-4">
                <a
                  href={`tel:${COMPANY_INFO.hotline}`}
                  className="flex items-center gap-4 p-3.5 rounded-none bg-[#e5e6ec] border border-[#d7dae2] hover:border-[#1ba8e8] transition-all group"
                >
                  <div className="p-2.5 rounded-none bg-[#dfe2e8] text-[#0b6fa8] group-hover:bg-[#1ba8e8] group-hover:text-white transition-colors">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono">Hotline Kỹ Thuật Dự Án</span>
                    <p className="text-base font-bold text-slate-900 font-mono group-hover:text-[#0b6fa8]">
                      {COMPANY_INFO.hotlineFormatted}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-4 p-3.5 rounded-none bg-[#e5e6ec] border border-[#d7dae2] hover:border-[#1ba8e8] transition-all group"
                >
                  <div className="p-2.5 rounded-none bg-[#dfe2e8] text-[#0b6fa8] group-hover:bg-[#1ba8e8] group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase font-mono">Email Tiếp Nhận Hồ Sơ</span>
                    <p className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-[#0b6fa8]">
                      {COMPANY_INFO.quoteEmail}
                    </p>
                  </div>
                </a>
              </div>

              {/* Instant Spec Checker Box */}
              {categoryResult && (
                <div className="p-4 rounded-none bg-[#e5e7ed] border border-[#d4d7e0] space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold text-slate-500">PHÂN LOẠI TẢI TRỌNG</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-none border ${categoryResult.color}`}>
                      {categoryResult.text}
                    </span>
                  </div>
                  <div className="text-xs text-slate-800">
                    <span className="text-slate-500">Gợi ý phương tiện: </span>
                    <span className="font-bold text-[#0b6fa8]">{categoryResult.vehicle}</span>
                  </div>
                </div>
              )}

              {/* Promise list from PDF */}
              <div className="pt-2 border-t border-[#dee1e7] space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="text-[#0b6fa8] font-bold">✓</span>
                  <span>Phản hồi báo giá trong 15 phút</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0b6fa8] font-bold">✓</span>
                  <span>Khảo sát hiện trường miễn phí</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#0b6fa8] font-bold">✓</span>
                  <span>Tư vấn phương án tối ưu cung đường</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Main Form (PDF Section 14) */}
          <div className="lg:col-span-8 bg-[#ebecf1] rounded-none border border-[#d9dce3] p-6 sm:p-8 shadow-2xl">
            
            {submitted ? (
              /* Success confirmation message directly matching PDF */
              <div className="py-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-[#dde0e8] border border-[#1ba8e8] text-[#0b6fa8] flex items-center justify-center mx-auto shadow-xl shadow-[#0b6fa8]/20">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="text-xs font-mono font-bold text-[#0b6fa8] bg-[#e3e5eb] px-3 py-1 rounded-full border border-[#d3d7e0]">
                    MÃ TIẾP NHẬN: #{refCode}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading uppercase">
                    ĐÃ TIẾP NHẬN YÊU CẦU THÀNH CÔNG!
                  </h3>
                  <p className="text-sm text-slate-700 leading-relaxed bg-[#e7e8ee] p-4 rounded-none border border-[#dbdfe5]">
                    Thông tin của bạn đã được gửi đến bộ phận vận hành. Chúng tôi sẽ liên hệ lại trong vòng 15 phút để trao đổi thêm về hàng hóa, tuyến đường và phương án vận chuyển tối ưu.
                  </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <a
                    href={`tel:${COMPANY_INFO.hotline}`}
                    className="px-6 py-3 rounded-none bg-[#1ba8e8] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3fc1ff] transition-all flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Gọi trao đổi ngay ({COMPANY_INFO.hotlineFormatted})</span>
                  </a>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFileAttached(null);
                      setAttachedFile(null);
                      setSubmitError(null);
                      setFormData({
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
                    }}
                    className="px-5 py-3 rounded-none bg-[#e5e7ec] text-slate-700 font-semibold text-xs border border-[#d7dae1] hover:text-slate-900"
                  >
                    Gửi thêm yêu cầu khác
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-[#dde0e6]">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 uppercase font-heading">
                      GỬI THÔNG TIN HÀNG HÓA CẦN VẬN CHUYỂN
                    </h3>
                    <p className="text-xs text-slate-500">
                      Điền thông số để nhận báo giá & phương án kỹ thuật chính xác nhất
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#0b6fa8] font-bold">MẪU SỐ 14</span>
                </div>

                {/* Section 1: Thông số hàng hóa */}
                <div>
                  <h4 className="text-xs font-bold text-[#0b6fa8] uppercase tracking-wider font-mono mb-3">
                    1. Thông Số Hàng Hóa & Thiết Bị (Bắt buộc)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Tên hàng hóa / thiết bị *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cargoName}
                        onChange={(e) => setFormData({ ...formData, cargoName: e.target.value })}
                        placeholder="VD: Máy xúc bánh xích Liebherr, Bồn Silo 120T, Máy biến áp..."
                        className="w-full px-3.5 py-2.5 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Số lượng kiện *
                      </label>
                      <input
                        type="number"
                        min="1"
                        required
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-sm text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>
                  </div>

                  {/* 4 Dimension Inputs (Dài x Rộng x Cao x Tấn) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Chiều dài (m)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="VD: 14.5"
                        value={formData.length}
                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs font-mono text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Chiều rộng (m)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="VD: 3.8"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs font-mono text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Chiều cao (m)
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        placeholder="VD: 4.2"
                        value={formData.height}
                        onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs font-mono text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Trọng lượng (tấn) *
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        required
                        placeholder="VD: 65"
                        value={formData.weight}
                        onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs font-mono text-[#0b6fa8] font-bold focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Tuyến đường giao nhận */}
                <div>
                  <h4 className="text-xs font-bold text-[#0b6fa8] uppercase tracking-wider font-mono mb-3">
                    2. Hành Trình & Thời Gian Vận Chuyển
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Địa điểm nhận hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.pickupLocation}
                        onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })}
                        placeholder="VD: Cảng Hải Phòng / KCN Đình Vũ"
                        className="w-full px-3.5 py-2.5 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-sm text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Địa điểm giao hàng *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.deliveryLocation}
                        onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })}
                        placeholder="VD: Công trường Nhà máy Điện Gió Đắk Lắk"
                        className="w-full px-3.5 py-2.5 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-sm text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Thời gian dự kiến *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.estimatedDate}
                        onChange={(e) => setFormData({ ...formData, estimatedDate: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-sm text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Tải ảnh hàng hóa & Ghi chú */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Hình ảnh hàng hóa / Bản vẽ kỹ thuật
                    </label>
                    <label className="flex flex-col items-center justify-center p-3 rounded-none border-2 border-dashed border-[#d7dae2] hover:border-[#1ba8e8] bg-[#e7e8ee] cursor-pointer transition-colors">
                      <Upload className="w-5 h-5 text-slate-500 mb-1" />
                      <span className="text-xs text-slate-700">
                        {fileAttached ? fileAttached : "Kéo thả hoặc nhấn để chọn file ảnh/PDF"}
                      </span>
                      <span className="text-[10px] text-slate-500 mt-0.5">JPG, PNG, PDF tối đa 25MB</span>
                      <input type="file" onChange={handleFileUpload} className="hidden" />
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Yêu cầu đặc biệt khác
                    </label>
                    <textarea
                      rows={3}
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                      placeholder="Ghi chú về cẩu bốc dỡ, đường vào chật hẹp, cần chạy đêm, bảo hiểm..."
                      className="w-full px-3.5 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#1ba8e8]"
                    />
                  </div>
                </div>

                {/* Section 4: Thông tin liên hệ */}
                <div>
                  <h4 className="text-xs font-bold text-[#0b6fa8] uppercase tracking-wider font-mono mb-3">
                    3. Thông Tin Người Đại Diện Nhận Báo Giá
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Họ và tên *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Số điện thoại *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phoneNumber}
                        onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                        placeholder="0988xxxxxx"
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="contact@company.com"
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        Tên công ty / Dự án
                      </label>
                      <input
                        type="text"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="Công ty CP Xây dựng..."
                        className="w-full px-3 py-2 rounded-none bg-[#e7e8ee] border border-[#d9dce3] text-xs text-slate-900 focus:outline-none focus:border-[#1ba8e8]"
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Action Button */}
                <div className="pt-3 space-y-3">
                  {submitError && (
                    <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-none px-3 py-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    id="submit-quote-btn"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-extrabold text-sm uppercase tracking-wider transition-all shadow-xl shadow-[#0b6fa8]/25 hover:shadow-[#0b6fa8]/40 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                    <span>{submitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU BÁO GIÁ & PHƯƠNG ÁN KỸ THUẬT'}</span>
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
