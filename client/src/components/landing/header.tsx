import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-primary">HWeb</h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <button 
                onClick={() => scrollToSection('layanan')}
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="nav-layanan"
              >
                Layanan
              </button>
              <button 
                onClick={() => scrollToSection('portofolio')}
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="nav-portofolio"
              >
                Portofolio
              </button>
              <button 
                onClick={() => scrollToSection('testimoni')}
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="nav-testimoni"
              >
                Testimoni
              </button>
              <button 
                onClick={() => scrollToSection('faq')}
                className="text-muted-foreground hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
                data-testid="nav-faq"
              >
                FAQ
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button 
              type="button" 
              className="text-muted-foreground hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-card border-t border-border">
            <button 
              onClick={() => scrollToSection('layanan')}
              className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium w-full text-left"
              data-testid="mobile-nav-layanan"
            >
              Layanan
            </button>
            <button 
              onClick={() => scrollToSection('portofolio')}
              className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium w-full text-left"
              data-testid="mobile-nav-portofolio"
            >
              Portofolio
            </button>
            <button 
              onClick={() => scrollToSection('testimoni')}
              className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium w-full text-left"
              data-testid="mobile-nav-testimoni"
            >
              Testimoni
            </button>
            <button 
              onClick={() => scrollToSection('faq')}
              className="text-muted-foreground hover:text-primary block px-3 py-2 text-base font-medium w-full text-left"
              data-testid="mobile-nav-faq"
            >
              FAQ
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
