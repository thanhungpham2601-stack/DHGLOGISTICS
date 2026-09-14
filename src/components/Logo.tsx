interface LogoMarkProps {
  className?: string;
}

/**
 * Abstract mark: three isometric blocks stepping up left-to-right —
 * one block per initial (D · H · G), read together as stacked freight.
 */
export function LogoMark({ className = '' }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Block 1 — D */}
      <path d="M13 46 L20 48 L13 50 L6 48 Z" fill="#bfeaff" />
      <path d="M6 48 L13 50 L13 58 L6 56 Z" fill="#7fd4ff" />
      <path d="M13 50 L20 48 L20 56 L13 58 Z" fill="#4fc0f0" />

      {/* Block 2 — H */}
      <path d="M29 39 L38 41.5 L29 44 L20 41.5 Z" fill="#5ecbf5" />
      <path d="M20 41.5 L29 44 L29 58 L20 55.5 Z" fill="#1ba8e8" />
      <path d="M29 44 L38 41.5 L38 55.5 L29 58 Z" fill="#0f86c2" />

      {/* Block 3 — G */}
      <path d="M48 31 L60 34.5 L48 38 L36 34.5 Z" fill="#1c8fd1" />
      <path d="M36 34.5 L48 38 L48 58 L36 54.5 Z" fill="#0a4e82" />
      <path d="M48 38 L60 34.5 L60 54.5 L48 58 Z" fill="#063a63" />
    </svg>
  );
}

interface LogoProps {
  /** 'dark' = dark text for light backgrounds, 'light' = white text for dark backgrounds */
  variant?: 'dark' | 'light';
  className?: string;
  markClassName?: string;
}

export function Logo({ variant = 'dark', className = '', markClassName = '' }: LogoProps) {
  const isDark = variant === 'dark';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 ${markClassName}`} />
      <div className="flex flex-col leading-none gap-1">
        <span
          className={`font-extrabold text-2xl sm:text-[26px] tracking-wide font-heading ${
            isDark ? 'text-slate-900' : 'text-white'
          }`}
        >
          DHG
        </span>
        <span
          className={`text-[10px] font-medium tracking-[0.18em] uppercase ${
            isDark ? 'text-slate-500' : 'text-white/60'
          }`}
        >
          Transport &amp; Logistics
        </span>
      </div>
    </div>
  );
}
