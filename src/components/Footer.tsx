import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";

const CONTACT_NUMBER = "01741037905";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-gradient">Anti Flea Cat Collar</h3>
            <p className="text-background/70">
              আপনার প্রিয় বিড়ালের সুরক্ষায় বাংলাদেশের বিশ্বস্ত প্রোডাক্ট
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-4">যোগাযোগ</h4>
            <ul className="space-y-3">
              <li>
                <a href={`tel:+880${CONTACT_NUMBER}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  +880 {CONTACT_NUMBER.slice(0, 5)}-{CONTACT_NUMBER.slice(5)}
                </a>
              </li>
              <li>
                <a href={`https://wa.me/880${CONTACT_NUMBER}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:furryshack.shop@gmail.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  furryshack.shop@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Location */}
          <div>
            <h4 className="text-lg font-bold mb-4">ঠিকানা</h4>
            <p className="flex items-start gap-2 text-background/70">
              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
              ঢাকা, বাংলাদেশ
            </p>
            <div className="mt-4 flex gap-3">
              <span className="text-2xl">🚚</span>
              <span className="text-background/70">সারাদেশে হোম ডেলিভারি</span>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>© {new Date().getFullYear()} Anti Flea Cat Collar. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
