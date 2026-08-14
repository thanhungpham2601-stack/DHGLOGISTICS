import { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, ChevronDown, Shield, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { supabase } from '../lib/supabaseClient';

interface NavbarProps {
  onOpenQuote: () => void;
  onOpenSurvey: () => void;
}

const DEFAULT_NAV_LINKS = [
  { label: 'TRANG CHỦ', href: '#hero' },
  { label: 'DỊCH VỤ', href: '#services' },
  { label: 'ĐỘI XE', href: '#fleet' },
  { label: 'DỰ ÁN', href: '#projects' },
  { label: 'NĂNG LỰC', href: '#capabilities' },
  { label: 'QUY TRÌNH', href: '#process' },
  { label: 'LIÊN HỆ', href: '#contact' },
];

export function Navbar({ onOpenQuote, onOpenSurvey }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<'VI' | 'EN'>('VI');
  const [navLinks, setNavLinks] = useState(DEFAULT_NAV_LINKS);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase
      .from('menu_items')
      .select('label, href')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setNavLinks(data);
        }
      });
  }, []);

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#f5f8f6]/97 backdrop-blur-md border-b border-[#dde5e1] ${
        scrolled ? 'py-3 shadow-xl' : 'py-5 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo matching the reference image */}
          <a href="#hero" id="brand-logo" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-11 h-11 bg-gradient-to-br from-[#5cb83a] to-[#2e7418] rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300 border border-[#83e05e]/30">
              <span className="font-black text-xl tracking-tighter text-[#09110e] font-mono">DHG</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="font-extrabold text-2xl tracking-wider text-slate-900 font-heading">DHG</span>
                <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-[#5cb83a]/20 text-[#1f6b12] border border-[#5cb83a]/40 tracking-widest">
                  HEAVY HAUL
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider">
                ENGINEERING & LOGISTICS
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold tracking-widest text-slate-700 hover:text-[#1f6b12] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#5cb83a] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer px-2 py-1 rounded bg-[#e5ece9] border border-[#d8e2dd]">
              <span className="text-xs">🌐</span>
              <span className="font-semibold text-xs text-slate-800">{lang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {/* Quick Hotline */}
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              id="nav-hotline-btn"
              className="hidden xl:flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 bg-[#e8eeec] px-3 py-2 rounded-lg border border-[#d8e2dd]"
            >
              <Phone className="w-3.5 h-3.5 text-[#1f6b12]" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-slate-500 uppercase leading-none">Hotline 24/7</span>
                <span className="font-bold text-[#1f6b12] font-mono leading-tight">{COMPANY_INFO.hotlineFormatted}</span>
              </div>
            </a>

            {/* Primary Action Button matching reference */}
            <button
              onClick={onOpenQuote}
              id="nav-quote-cta-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#5cb83a] hover:bg-[#6dd144] text-[#09110e] font-bold text-xs tracking-wider transition-all duration-200 shadow-lg shadow-[#1f6b12]/25 hover:shadow-[#1f6b12]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>YÊU CẦU BÁO GIÁ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="lg:hidden p-2 rounded-lg bg-[#e5ece8] text-slate-800 border border-[#d8e2dd]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#edf2f0] border-b border-[#dde5e1] px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-slate-800 hover:text-[#1f6b12] py-2 border-b border-[#e2eae6]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-[#5cb83a] text-[#09110e] font-bold text-sm shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>YÊU CẦU BÁO GIÁ DỰ ÁN</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSurvey();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#e5ece8] text-slate-800 font-semibold text-sm border border-[#d8e2dd]"
            >
              <Shield className="w-4 h-4 text-[#1f6b12]" />
              <span>ĐĂNG KÝ KHẢO SÁT TUYẾN</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="flex items-center justify-center gap-2 py-2 text-center text-sm font-bold text-[#1f6b12] bg-[#e8eeec] rounded-lg border border-[#d8e2dd]"
            >
              <Phone className="w-4 h-4" />
              <span>Hotline: {COMPANY_INFO.hotlineFormatted}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
