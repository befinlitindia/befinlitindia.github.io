import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Playbooks from './components/Playbooks';
import ArticleContent from './components/ArticleContent';
import Tools from './components/Tools';
import SalaryTaxCalculator from './components/SalaryTaxCalculator';
import SideHustleSurchargeEstimator from './components/SideHustleSurchargeEstimator';
import FinancialGuide from './components/FinancialGuide';
import TopicView from './components/TopicView';
import ConsultationModal from './components/ConsultationModal';
import Glossary from './components/Glossary';
import GlossaryOfChanges from './components/GlossaryOfChanges';
import SEO from './components/SEO';

const App: React.FC = () => {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const location = useLocation();

  const openConsultation = () => setIsConsultationOpen(true);
  const closeConsultation = () => setIsConsultationOpen(false);

  // Extract highlight param for glossary-changes
  const searchParams = new URLSearchParams(location.search);
  const highlightId = searchParams.get('highlight') || undefined;

  return (
    <div className="min-h-screen flex flex-col font-serif selection:bg-befinlit-navy selection:text-befinlit-gold bg-befinlit-cream">
      <Header onOpenConsultation={openConsultation} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <SEO title="Home" description="Empowering Indian professionals with financial literacy. Master taxation, wealth creation, and compliance with BeFinLit India." path="/" />
              <Home onOpenConsultation={openConsultation} />
            </>
          } />
          <Route path="/about" element={
            <>
              <SEO title="About Us" description="Learn about BeFinLit India's mission to empower Indian professionals with financial intelligence for navigating a high-growth economy." path="/about" />
              <AboutUs onOpenConsultation={openConsultation} />
            </>
          } />
          <Route path="/playbooks" element={
            <>
              <SEO title="The Playbooks" description="In-depth technical guides and strategic blueprints for the modern Indian professional covering taxes, compliance, and wealth creation." path="/playbooks" />
              <Playbooks />
            </>
          } />
          <Route path="/playbook/moonlighters-playbook" element={
            <>
              <SEO title="The Moonlighter's Playbook" description="How to side-hustle without getting into trouble. A comprehensive guide for Indian professionals managing freelance income alongside their salary." path="/playbook/moonlighters-playbook" type="article" />
              <ArticleContent onOpenConsultation={openConsultation} />
            </>
          } />
          <Route path="/playbook/freelancers-professionals-playbook" element={
            <>
              <SEO title="The Freelancer's & Professional's Playbook" description="Navigate Income Tax, GST, FEMA and RBI guidelines. The ultimate compliance playbook for Indian freelancers and professionals." path="/playbook/freelancers-professionals-playbook" type="article" />
              <FinancialGuide onOpenConsultation={openConsultation} />
            </>
          } />
          <Route path="/tools" element={
            <>
              <SEO title="The Toolkits" description="Witty calculators and compliance-checkers designed to keep the taxman happy and your bank balance healthy." path="/tools" />
              <Tools />
            </>
          } />
          <Route path="/tools/salary-calculator" element={
            <>
              <SEO title="Income Tax Calculator for Salaried Individuals" description="Compare Old vs New Tax Regime for AY 2026-27. Optimize your salary tax with deductions under Section 80C, 80D, HRA and more." path="/tools/salary-calculator" />
              <SalaryTaxCalculator />
            </>
          } />
          <Route path="/tools/side-hustle-estimator" element={
            <>
              <SEO title="Side-Hustle Tax Realizer" description="Calculate the exact tax impact of adding freelance revenue to your salary income. Understand the 'success penalty' of side-hustling in India." path="/tools/side-hustle-estimator" />
              <SideHustleSurchargeEstimator />
            </>
          } />
          <Route path="/glossary" element={
            <>
              <SEO title="The Glossary" description="Comprehensive index of Indian financial terms, regulatory updates, and compliance changes. Your reference guide to the financial landscape." path="/glossary" />
              <Glossary />
            </>
          } />
          <Route path="/glossary/changes" element={
            <>
              <SEO title="Glossary of Changes 2025" description="Mapping of essential sections from the Income Tax Act 1961 to the new Income Tax Act 2025. Essential reference for the transition." path="/glossary/changes" />
              <GlossaryOfChanges onOpenConsultation={openConsultation} highlightId={highlightId} />
            </>
          } />
          <Route path="/topic/:topicSlug" element={
            <>
              <TopicView />
            </>
          } />
          {/* Fallback: redirect unknown routes to Home */}
          <Route path="*" element={
            <>
              <SEO title="Home" description="Empowering Indian professionals with financial literacy." path="/" />
              <Home onOpenConsultation={openConsultation} />
            </>
          } />
        </Routes>
      </main>
      <Footer onOpenConsultation={openConsultation} />

      <ConsultationModal isOpen={isConsultationOpen} onClose={closeConsultation} />

      {/* Floating Action Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 bg-befinlit-navy text-befinlit-cream w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-befinlit-gold hover:text-befinlit-navy transition-all duration-300 z-40 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-1 transition-transform">
          <path d="m18 15-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
};

export default App;