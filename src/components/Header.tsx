import { Button } from "@/components/ui/button";
import { Phone, ShoppingCart } from "lucide-react";

const Header = () => {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-2xl">🐱</span>
            <span className="font-bold text-lg md:text-xl text-gradient">Cat Flea Collar</span>
          </div>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <a 
              href="tel:+8801XXXXXXXXX" 
              className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="text-sm">01XXX-XXXXXX</span>
            </a>
            <Button 
              onClick={scrollToOrder}
              size="sm" 
              className="btn-gradient text-primary-foreground gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span className="hidden sm:inline">অর্ডার করুন</span>
              <span className="sm:hidden">অর্ডার</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
