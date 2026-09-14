import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeBar } from './components/MarqueeBar';
import { StatsBar } from './components/StatsBar';
import { ServicesSection } from './components/ServicesSection';
import { FleetSection } from './components/FleetSection';
import { SurveySection } from './components/SurveySection';
import { ProcessSection } from './components/ProcessSection';
import { LogisticsChainSection } from './components/LogisticsChainSection';
import { SafetyLegalSection } from './components/SafetyLegalSection';
import { ProjectsSection } from './components/ProjectsSection';
import { WhyChooseUsSection } from './components/WhyChooseUsSection';
import { OfficeNetworkSection } from './components/OfficeNetworkSection';
import { QuoteSection } from './components/QuoteSection';
import { Footer } from './components/Footer';
import { SurveyModal } from './components/Modals';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { Phone, ArrowUp, FileText, MessageSquare } from 'lucide-react';
import { COMPANY_INFO } from './data/companyData';
import { ServiceItem } from './types';

export default function App() {
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  const scrollToQuote = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#eff0f4] text-slate-900 selection:bg-[#1ba8e8] selection:text-white">
      <ScrollProgressBar />

      {/* Top Fixed Navbar */}
      <Navbar
        onOpenQuote={scrollToQuote}
        onOpenSurvey={() => setIsSurveyModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Banner matching uploaded image */}
        <Hero
          onOpenQuote={scrollToQuote}
          onOpenSurvey={() => setIsSurveyModalOpen(true)}
        />

        {/* Auto-scrolling capability ticker */}
        <MarqueeBar />

        {/* Key Stats Ribbon (20+ Năm, 500+ Dự án, 100+ Thiết bị, 63 Tỉnh thành, 0 Tai nạn) */}
        <StatsBar />

        {/* 2. 6 Core Services from PDF */}
        <ServicesSection
          onSelectService={(service) => setSelectedService(service)}
          onOpenQuote={scrollToQuote}
        />

        {/* 4. Fleet & Heavy Equipment Specs */}
        <FleetSection
          onOpenQuote={scrollToQuote}
        />

        {/* 3. Survey & Engineering Route Planning (PDF Section 3) */}
        <SurveySection
          onOpenSurveyModal={() => setIsSurveyModalOpen(true)}
        />

        {/* 5. 8-Step Turnkey Transport Process (PDF Section 5) */}
        <ProcessSection />

        {/* 9 & 10. Multi-Modal Logistics Chain & Night Transport (PDF Section 9 & 10) */}
        <LogisticsChainSection
          onOpenQuote={scrollToQuote}
        />

        {/* 6, 7, 8. Safety, Lashing & Legal Permits (PDF Section 6, 7, 8) */}
        <SafetyLegalSection />

        {/* Projects / Case Studies */}
        <ProjectsSection
          onOpenQuote={scrollToQuote}
        />

        {/* 12. Why Choose Us (PDF Section 12) */}
        <WhyChooseUsSection />

        {/* Nationwide branch network */}
        <OfficeNetworkSection />

        {/* 13 & 14. Interactive Quotation Form & Cargo Spec Checker (PDF Section 13 & 14) */}
        <QuoteSection />
      </main>

      {/* Footer */}
      <Footer onOpenQuote={scrollToQuote} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        {/* Quick Quote Button */}
        <button
          onClick={scrollToQuote}
          id="floating-quote-btn"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#1ba8e8] hover:bg-[#3fc1ff] text-white font-extrabold text-xs shadow-2xl shadow-[#0b6fa8]/40 hover:scale-105 transition-all cursor-pointer border border-[#61e2de]"
          title="Yêu cầu báo giá nhanh"
        >
          <FileText className="w-4 h-4" />
          <span className="hidden sm:inline">BÁO GIÁ NHANH</span>
        </button>

        {/* Quick Call Button */}
        <a
          href={`tel:${COMPANY_INFO.hotline}`}
          id="floating-phone-btn"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e3e5eb] hover:bg-[#dde0e7] text-[#0b6fa8] border border-[#d0d4dd] shadow-xl hover:scale-110 transition-all"
          title={`Gọi ngay ${COMPANY_INFO.hotlineFormatted}`}
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Scroll To Top */}
        <button
          onClick={scrollToTop}
          id="floating-scroll-top-btn"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-[#ebebf1] hover:bg-[#e4e5eb] text-slate-500 hover:text-slate-900 border border-[#dbdfe5] shadow-lg transition-all"
          title="Lên đầu trang"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>

      {/* Modal for Route Survey Request */}
      <SurveyModal
        isOpen={isSurveyModalOpen}
        onClose={() => setIsSurveyModalOpen(false)}
      />
    </div>
  );
}
