import { Truck, ShieldCheck, MapPin, FileCheck, Radio, Weight } from 'lucide-react';

const TICKER_ITEMS = [
  { label: 'VẬN CHUYỂN SIÊU TRƯỜNG', icon: Truck },
  { label: 'SIÊU TRỌNG AN TOÀN', icon: Weight },
  { label: 'KHẢO SÁT TUYẾN ĐƯỜNG', icon: MapPin },
  { label: 'GIẤY PHÉP LƯU HÀNH', icon: FileCheck },
  { label: 'GIÁM SÁT GPS 24/7', icon: Radio },
  { label: 'CHẰNG BUỘC CHUẨN QUỐC TẾ', icon: ShieldCheck },
];

export function MarqueeBar() {
  const track = (keyPrefix: string) => (
    <div className="flex items-center shrink-0" aria-hidden={keyPrefix === 'dup'}>
      {TICKER_ITEMS.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={`${keyPrefix}-${idx}`} className="flex items-center gap-6 px-6 sm:px-8">
            <span className="flex items-center gap-2.5 text-xs sm:text-sm font-extrabold tracking-widest text-white whitespace-nowrap">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              {item.label}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#071433]/40 shrink-0" />
          </div>
        );
      })}
    </div>
  );

  return (
    <section
      id="marquee-bar"
      className="relative z-10 bg-[#1ba8e8] border-y border-[#1590c7] py-4 overflow-hidden"
    >
      <div className="flex w-max animate-marquee">
        {track('a')}
        {track('dup')}
      </div>
    </section>
  );
}
