import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Playbooks from './components/Playbooks';
import ArticleContent from './components/ArticleContent';
import Tools from './components/Tools';
import SalaryTaxCalculator from './components/SalaryTaxCalculator';
import SideHustleSurchargeEstimator from './components/SideHustleSurchargeEstimator';

type Page = 'home' | 'about' | 'playbooks' | 'playbook' | 'tools' | 'salary-calculator' | 'side-hustle-estimator';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigateTo} />;
      case 'about':
        return <AboutUs onNavigate={navigateTo} />;
      case 'playbooks':
        return <Playbooks onNavigate={navigateTo} />;
      case 'playbook':
        return <ArticleContent onNavigate={navigateTo} />;
      case 'tools':
        return <Tools onNavigate={navigateTo} />;
      case 'salary-calculator':
        return <SalaryTaxCalculator onNavigate={navigateTo} />;
      case 'side-hustle-estimator':
        return <SideHustleSurchargeEstimator onNavigate={navigateTo} />;
      default:
        return <Home onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-serif selection:bg-befinlit-navy selection:text-befinlit-gold bg-befinlit-cream">
      <Header onNavigate={navigateTo} currentPage={currentPage} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer onNavigate={navigateTo} />

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