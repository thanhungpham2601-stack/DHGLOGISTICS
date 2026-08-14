import { useState, FormEvent } from 'react';
import { X, Send, CheckCircle2, Phone, Calendar, MapPin, Ruler, FileText, Check } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface SurveyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SurveyModal({ isOpen, onClose }: SurveyModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [surveyData, setSurveyData] = useState({
    projectName: '',
    cargoType: '',
    origin: '',
    destination: '',
    estimatedDate: '',
    contactName: '',
    phone: '',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#e9efec] border border-[#d4e0da] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#e5ece8] text-slate-500 hover:text-slate-900 border border-[#d9e2dd]"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#dde8e2] border border-[#5cb83a] text-[#1f6b12] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 uppercase font-heading">
              ĐÃ ĐĂNG KÝ KHẢO SÁT HIỆN TRƯỜNG!
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 max-w-md mx-auto">
              Đội ngũ kỹ sư khảo sát tuyến của DHG sẽ liên hệ với bạn trong vòng 30 phút để xác nhận lịch trình và mang thiết bị đo đạc 3D đến hiện trường.
            </p>
            <div className="pt-4 flex justify-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.hotline}`}
                className="px-5 py-2.5 rounded-lg bg-[#5cb83a] text-[#09110e] font-bold text-xs"
              >
                Hotline: {COMPANY_INFO.hotlineFormatted}
              </a>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2.5 rounded-lg bg-[#e5ece8] text-slate-700 text-xs border border-[#d7e1dc]"
              >
                Đóng
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-mono text-[#1f6b12] font-bold uppercase">
                ĐỘI NGŨ KỸ SƯ CẦU ĐƯỜNG DHG
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 uppercase font-heading">
                ĐĂNG KÝ KHẢO SÁT TUYẾN ĐƯỜNG & HIỆN TRƯỜNG DỰ ÁN
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Khảo sát tĩnh không cầu vượt, tải trọng cầu đường, đo bán kính quay xe miễn phí.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">
                  Tên dự án / Công trình *
                </label>
                <input
                  type="text"
                  required
                  value={surveyData.projectName}
                  onChange={(e) => setSurveyData({ ...surveyData, projectName: e.target.value })}
                  placeholder="Dự án Nhà máy Điện Gió, Cầu cạn..."
                  className="w-full px-3 py-2 rounded-lg bg-[#e7eeeb] border border-[#d9e3de] text-xs text-slate-900 focus:outline-none focus:border-[#5cb83a]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">
                  Loại hàng hóa dự kiến *
                </label>
                <input
                  type="text"
                  required
                  value={surveyData.cargoType}
                  onChange={(e) => setSurveyData({ ...surveyData, cargoType: e.target.value })}
                  placeholder="Cánh quạt, Bồn áp lực, Cẩu xích..."
                  className="w-full px-3 py-2 rounded-lg bg-[#e7eeeb] border border-[#d9e3de] text-xs text-slate-900 focus:outline-none focus:border-[#5cb83a]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">
                  Điểm xuất phát (Cảng / Bãi lấy hàng) *
                </label>
                <input
                  type="text"
                  required
                  value={surveyData.origin}
                  onChange={(e) => setSurveyData({ ...surveyData, origin: e.target.value })}
                  placeholder="Cảng Hải Phòng / Đình Vũ"
                  className="w-full px-3 py-2 rounded-lg bg-[#e7eeeb] border border-[#d9e3de] text-xs text-slate-900 focus:outline-none focus:border-[#5cb83a]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">
                  Điểm giao hàng (Vị trí công trường) *
                </label>
                <input
                  type="text"
                  required
                  value={surveyData.destination}
                  onChange={(e) => setSurveyData({ ...surveyData, destination: e.target.value })}
                  placeholder="Công trường dự án"
                  className="w-full px-3 py-2 rounded-lg bg-[#e7eeeb] border border-[#d9e3de] text-xs text-slate-900 focus:outline-none focus:border-[#5cb83a]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">
                  Người liên hệ *
                </label>
                <input
                  type="text"
                  required
                  value={surveyData.contactName}
                  onChange={(e) => setSurveyData({ ...surveyData, contactName: e.target.value })}
                  placeholder="Nguyễn Văn A"
                  className="w-full px-3 py-2 rounded-lg bg-[#e7eeeb] border border-[#d9e3de] text-xs text-slate-900 focus:outline-none focus:border-[#5cb83a]"
                />
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1">
                  Số điện thoại *
                </label>
                <input
                  type="tel"
                  required
                  value={surveyData.phone}
                  onChange={(e) => setSurveyData({ ...surveyData, phone: e.target.value })}
                  placeholder="0988xxxxxx"
                  className="w-full px-3 py-2 rounded-lg bg-[#e7eeeb] border border-[#d9e3de] text-xs text-slate-900 focus:outline-none focus:border-[#5cb83a]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-700 font-semibold mb-1">
                Ghi chú thêm về tuyến đường
              </label>
              <textarea
                rows={2}
                value={surveyData.notes}
                onChange={(e) => setSurveyData({ ...surveyData, notes: e.target.value })}
                placeholder="Có đoạn đèo dốc, cầu yếu, đường dây điện thấp..."
                className="w-full px-3 py-2 rounded-lg bg-[#e7eeeb] border border-[#d9e3de] text-xs text-slate-900 focus:outline-none focus:border-[#5cb83a]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-extrabold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                ĐĂNG KÝ KHẢO SÁT HIỆN TRƯỜNG NGAY
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
