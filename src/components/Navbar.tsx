import { useState, useEffect } from 'react';
import { Phone, ArrowRight, Menu, X, ChevronDown, Shield, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';
import { supabase } from '../lib/supabaseClient';
import { Logo } from './Logo';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#f5f6f8]/97 backdrop-blur-md border-b border-[#dddfe5] ${
        scrolled ? 'py-3 shadow-xl' : 'py-5 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" id="brand-logo" className="group">
            <Logo markClassName="group-hover:scale-105 transition-transform duration-300" />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-xs font-bold tracking-widest text-slate-700 hover:text-[#0b6fa8] transition-colors relative py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#1ba8e8] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative flex items-center gap-1 text-xs font-medium text-slate-700 hover:text-slate-900 cursor-pointer px-2 py-1 rounded-none bg-[#e5e6ec] border border-[#d8dbe2]">
              <span className="text-xs">🌐</span>
              <span className="font-semibold text-xs text-slate-800">{lang}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
            </div>

            {/* Quick Hotline */}
            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              id="nav-hotline-btn"
              className="hidden xl:flex items-center gap-2 text-xs text-slate-700 hover:text-slate-900 bg-[#e8e8ee] px-3 py-2 rounded-none border border-[#d8dbe2]"
            >
              <Phone className="w-3.5 h-3.5 text-[#0b6fa8]" />
              <div className="flex flex-col text-left">
                <span className="text-[9px] text-slate-500 uppercase leading-none">Hotline 24/7</span>
                <span className="font-bold text-[#0b6fa8] font-mono leading-tight">{COMPANY_INFO.hotlineFormatted}</span>
              </div>
            </a>

            {/* Primary Action Button matching reference */}
            <button
              onClick={onOpenQuote}
              id="nav-quote-cta-btn"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-bold text-xs tracking-wider transition-all duration-200 shadow-lg shadow-[#0b6fa8]/25 hover:shadow-[#0b6fa8]/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>YÊU CẦU BÁO GIÁ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            id="mobile-menu-toggle-btn"
            className="lg:hidden p-2 rounded-none bg-[#e5e7ec] text-slate-800 border border-[#d8dbe2]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#edeef2] border-b border-[#dddfe5] px-6 py-6 space-y-4 animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold text-slate-800 hover:text-[#0b6fa8] py-2 border-b border-[#e2e4ea]"
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
              className="w-full flex items-center justify-center gap-2 py-3 rounded-none bg-[#1ba8e8] text-white font-bold text-sm shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>YÊU CẦU BÁO GIÁ DỰ ÁN</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenSurvey();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-none bg-[#e5e7ec] text-slate-800 font-semibold text-sm border border-[#d8dbe2]"
            >
              <Shield className="w-4 h-4 text-[#0b6fa8]" />
              <span>ĐĂNG KÝ KHẢO SÁT TUYẾN</span>
            </button>

            <a
              href={`tel:${COMPANY_INFO.hotline}`}
              className="flex items-center justify-center gap-2 py-2 text-center text-sm font-bold text-[#0b6fa8] bg-[#e8e8ee] rounded-none border border-[#d8dbe2]"
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
