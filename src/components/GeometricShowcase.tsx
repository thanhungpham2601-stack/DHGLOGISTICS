import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import reachStacker01 from '../assets/images/dhg_reach_stacker_port_transport.jpg';
import reachStacker04 from '../assets/images/dhg_reach_stacker_port_transport_04.jpg';
import bannerExcavatorLowbed from '../assets/images/dhg_heavy_haul_excavator_lowbed_1786671346913.jpg';
import { WorldMapDots } from './WorldMapDots';

const PANEL_A_CLIP = 'polygon(55% 7.7%, 100% 7.7%, 71.7% 42.3%, 26.7% 42.3%)';
const PANEL_B_CLIP = 'polygon(41.7% 57.7%, 86.7% 57.7%, 58.3% 92.3%, 13.3% 92.3%)';

const OUTLINE_A = '53.7,6.2 100,6.2 72.7,43.8 25.5,43.8';
const OUTLINE_B = '39.7,56.2 88,56.2 59.5,93.8 12.2,93.8';

/** Angular diagonal-cut photo collage with a truck that drives in/out as the user scrolls past it. */
export function GeometricShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Tie the truck's position directly to scroll progress through this element,
  // so it drives in while entering the viewport and drives back out while leaving —
  // reversible in both scroll directions, not a one-shot entrance animation.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const truckX = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], ['130%', '0%', '0%', '-130%']);
  const truckOpacity = useTransform(scrollYProgress, [0, 0.12, 0.35, 0.65, 0.88, 1], [0, 1, 1, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative aspect-[6/5.2] w-full">
      {/* Dotted world-map backdrop */}
      <WorldMapDots className="absolute inset-0 w-full h-full text-[#0b6fa8]/15" />

      {/* Photo panel A */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: PANEL_A_CLIP }}
      >
        <img
          src={reachStacker01}
          alt="Đầu kéo DHG vận chuyển reach stacker"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Photo panel B */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: PANEL_B_CLIP }}
      >
        <img
          src={reachStacker04}
          alt="Đội xe DHG vận chuyển thiết bị cảng"
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thin outline tracing both panels */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon points={OUTLINE_A} fill="none" stroke="#1ba8e8" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
        <polygon points={OUTLINE_B} fill="none" stroke="#1ba8e8" strokeWidth="0.4" vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Truck: drives in/out as the section scrolls through the viewport */}
      <motion.div
        className="absolute w-[52%] aspect-video bg-white p-1.5 shadow-2xl"
        style={{ right: '4%', bottom: '10%', x: truckX, opacity: truckOpacity }}
      >
        <div className="w-full h-full overflow-hidden">
          <img
            src={bannerExcavatorLowbed}
            alt="Đầu kéo DHG Transport đang vào vị trí"
            referrerPolicy="no-referrer"
            loading="lazy"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Pulsing badge */}
      <span className="absolute flex items-center justify-center w-11 h-11" style={{ left: '18%', top: '16%' }}>
        <span className="absolute inset-0 rounded-full border border-[#1ba8e8]/50" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#1ba8e8] animate-ping" />
        <span className="absolute w-1.5 h-1.5 rounded-full bg-[#1ba8e8]" />
      </span>
    </div>
  );
}
