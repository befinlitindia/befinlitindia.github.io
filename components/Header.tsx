import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { ROUTES } from './routes';
import { isDraftMode } from './data';

interface HeaderProps {
  onOpenConsultation: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenConsultation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const linkClass = (path: string) =>
    `hover:text-befinlit-gold transition-colors relative py-1 ${isActive(path) ? 'text-befinlit-gold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-befinlit-gold' : ''}`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out border-b ${isScrolled
        ? 'bg-befinlit-cream/95 backdrop-blur-sm py-3 border-befinlit-navy/10 shadow-sm'
        : 'bg-transparent py-6 border-transparent'
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-2 md:px-6 flex justify-between items-center">
        <Link
          to="/"
          className="flex flex-row items-center gap-2 md:gap-4 cursor-pointer group"
        >
          {/* Brand Logo - Image */}
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="BeFinLit India" className="h-14 md:h-28 w-auto object-contain" />

          {/* Divider */}
          <div className="h-6 md:h-8 w-px bg-befinlit-navy/20"></div>

          {/* Tagline - Beside logo */}
          <p className="text-xs md:text-sm font-medium text-befinlit-gold tracking-tight md:tracking-wide">
            #BecomeFinanciallyLiterate
          </p>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-befinlit-navy">
          <Link to="/" className={linkClass('/')}>Home</Link>
          <Link to="/about" className={linkClass('/about')}>About</Link>
          <Link to="/playbooks" className={linkClass('/playbooks')}>The Playbooks</Link>
          <Link to="/tools" className={linkClass('/tools')}>The Toolkits</Link>
          {isDraftMode && <Link to="/glossary" className={linkClass('/glossary')}>The Glossary</Link>}
          <button
            onClick={onOpenConsultation}
            className="bg-befinlit-navy text-befinlit-cream px-5 py-2.5 rounded-sm hover:bg-befinlit-lightNavy transition-colors text-xs font-bold tracking-tight shadow-sm"
          >
            Schedule a Consultation
          </button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-befinlit-navy p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-befinlit-cream border-b border-befinlit-navy/10 p-6 flex flex-col gap-4 shadow-lg animate-fade-in">
          <Link to="/" className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">Home</Link>
          <Link to="/about" className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">About</Link>
          <Link to="/playbooks" className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">The Playbooks</Link>
          <Link to="/tools" className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">The Toolkits</Link>
          {isDraftMode && <Link to="/glossary" className="text-left text-befinlit-navy font-bold hover:text-befinlit-gold py-3 border-b border-befinlit-navy/5">The Glossary</Link>}
          <button
            onClick={() => {
              onOpenConsultation();
              setIsMenuOpen(false);
            }}
            className="bg-befinlit-navy text-befinlit-cream text-center py-4 rounded-sm font-bold tracking-wider text-xs"
          >
            Schedule a Consultation
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;