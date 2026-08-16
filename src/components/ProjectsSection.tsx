import { useEffect, useState } from 'react';
import { ShieldCheck, MapPin, Gauge, Layers, ArrowUpRight, CheckCircle2, X, Weight, Loader2 } from 'lucide-react';
import { ProjectCase } from '../types';
import { supabase } from '../lib/supabaseClient';

interface ProjectsSectionProps {
  onOpenQuote: () => void;
}

export function ProjectsSection({ onOpenQuote }: ProjectsSectionProps) {
  const [projects, setProjects] = useState<ProjectCase[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCase, setActiveCase] = useState<ProjectCase | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    supabase
      .from('projects')
      .select('id, title, client_type, cargo, weight, dimension, route, highlight, image_url, image_position, gallery')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) {
          setProjects(
            data.map((row) => ({
              id: row.id,
              title: row.title,
              clientType: row.client_type,
              cargo: row.cargo,
              weight: row.weight,
              dimension: row.dimension,
              route: row.route,
              highlight: row.highlight,
              image: row.image_url,
              imagePosition: row.image_position ?? undefined,
              gallery: row.gallery?.length ? row.gallery : undefined,
            })),
          );
        }
        setLoading(false);
      });
  }, []);

  const openCase = (item: ProjectCase) => {
    setActiveCase(item);
    setActiveImage(item.image);
  };

  return (
    <section id="projects" className="relative py-20 bg-[#f0f5f2] border-b border-[#e1e9e5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#1f6b12] tracking-widest uppercase font-mono">
              <span className="w-4 h-0.5 bg-[#5cb83a]"></span>
              <span>DỰ ÁN TIÊU BIỂU ĐÃ THỰC HIỆN</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-slate-900 font-heading tracking-tight mt-2">
              HƠN 500+ DỰ ÁN CÔNG TRÌNH VỀ ĐÍCH AN TOÀN
            </h2>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            <span>Chứng thực năng lực thi công thực tế</span>
          </div>
        </div>

        {/* Project Cases Grid */}
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-slate-500 py-10">
            <Loader2 className="w-4 h-4 animate-spin" /> Đang tải dự án...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-sm text-slate-500 text-center py-10 border border-dashed border-[#dbe5df] rounded-2xl">
            Chưa có dự án nào được đăng.
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((item) => (
            <div
              key={item.id}
              onClick={() => openCase(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openCase(item)}
              className="bg-[#eaf0ed] rounded-2xl border border-[#dbe5df] hover:border-[#5cb83a] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#1f6b12]/10 group flex flex-col justify-between cursor-pointer"
            >
              {/* Project Image */}
              <div className="relative h-60 w-full overflow-hidden bg-[#eef3f1]">
                <img
                  src={item.image}
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  style={{ objectPosition: item.imagePosition ?? 'center', filter: item.imagePosition ? 'contrast(1.08) saturate(1.15) brightness(1.04)' : undefined }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#eaf0ed] via-transparent to-black/30" />
                
                {/* Client Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#ecf1ef]/90 backdrop-blur-md border border-[#d4dfda] text-xs font-bold text-[#1f6b12]">
                  {item.clientType}
                </div>

                {/* Weight Tag */}
                <div className="absolute top-4 right-4 px-3 py-1 rounded bg-[#5cb83a] text-[#09110e] text-xs font-black font-mono shadow-md">
                  {item.weight}
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 uppercase group-hover:text-[#1f6b12] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <div className="mt-3 space-y-2 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-[#1f6b12] shrink-0" />
                      <span className="font-semibold text-slate-800">Tuyến đường:</span>
                      <span>{item.route}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Layers className="w-3.5 h-3.5 text-[#1f6b12] shrink-0" />
                      <span className="font-semibold text-slate-800">Kích thước:</span>
                      <span className="font-mono">{item.dimension}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mt-3 p-3 rounded-lg bg-[#e5ede9] border border-[#dde7e1] leading-relaxed">
                    <span className="font-bold text-slate-800">Điểm then chốt: </span>
                    {item.highlight}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-[#dfe8e3] flex items-center justify-between">
                  <span className="text-xs font-mono text-[#1f6b12] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Nghiệm thu an toàn 100%</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenQuote();
                    }}
                    className="text-xs font-bold text-slate-900 hover:text-[#1f6b12] flex items-center gap-1"
                  >
                    <span>Tư vấn dự án tương tự</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        )}

      </div>

      {/* Project Detail Modal */}
      {activeCase && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setActiveCase(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-[#eaefed] border border-[#d4e0da] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
          >
            {/* Hero Image */}
            <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#eef3f1] rounded-t-2xl">
              <img
                src={activeImage ?? activeCase.image}
                alt={activeCase.title}
                referrerPolicy="no-referrer"
                style={{
                  objectPosition: activeCase.imagePosition ?? 'center',
                  filter: activeCase.imagePosition ? 'contrast(1.08) saturate(1.15) brightness(1.04)' : undefined,
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#eaefed] via-transparent to-black/20" />

              <button
                onClick={() => setActiveCase(null)}
                className="absolute top-4 right-4 p-2 rounded-lg bg-[#eaefed]/90 backdrop-blur-sm text-slate-700 hover:text-slate-900 border border-[#d9e2dd]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-4 left-4 px-3 py-1 rounded bg-[#ecf1ef]/90 backdrop-blur-md border border-[#d4dfda] text-xs font-bold text-[#1f6b12]">
                {activeCase.clientType}
              </div>
            </div>

            {/* Photo Gallery Thumbnails */}
            {activeCase.gallery && activeCase.gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto px-6 sm:px-8 pt-4">
                {activeCase.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      (activeImage ?? activeCase.image) === img
                        ? 'border-[#5cb83a]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${activeCase.title} - ảnh ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      style={{ filter: 'contrast(1.08) saturate(1.15) brightness(1.04)' }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 uppercase font-heading leading-snug">
                {activeCase.title}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-2.5 text-xs text-slate-800 bg-[#e6edea] p-3 rounded-lg border border-[#dde6e1]">
                  <Weight className="w-4 h-4 text-[#1f6b12] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-500 uppercase text-[10px] tracking-wide">Hàng hóa / Tải trọng</div>
                    <div className="mt-0.5">{activeCase.cargo} • {activeCase.weight}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-800 bg-[#e6edea] p-3 rounded-lg border border-[#dde6e1]">
                  <Layers className="w-4 h-4 text-[#1f6b12] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-500 uppercase text-[10px] tracking-wide">Kích thước / Cấu hình</div>
                    <div className="mt-0.5 font-mono">{activeCase.dimension}</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 text-xs text-slate-800 bg-[#e6edea] p-3 rounded-lg border border-[#dde6e1] sm:col-span-2">
                  <MapPin className="w-4 h-4 text-[#1f6b12] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-slate-500 uppercase text-[10px] tracking-wide">Tuyến đường</div>
                    <div className="mt-0.5">{activeCase.route}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-[#1f6b12] uppercase tracking-wider font-mono mb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Điểm then chốt</span>
                </h4>
                <p className="text-sm text-slate-800 leading-relaxed bg-[#e6edea] p-4 rounded-xl border border-[#dbe4e0]">
                  {activeCase.highlight}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#dfe8e3] pt-4">
                <span className="text-xs font-mono text-[#1f6b12] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Nghiệm thu an toàn 100%</span>
                </span>
                <button
                  onClick={() => {
                    setActiveCase(null);
                    onOpenQuote();
                  }}
                  className="px-5 py-2.5 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs tracking-wider uppercase shadow-lg shadow-[#1f6b12]/20"
                >
                  Yêu cầu tư vấn dự án tương tự →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
