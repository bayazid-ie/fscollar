import { MessageCircle, Phone } from "lucide-react";

const CONTACT_NUMBER = "01741037905";

const FloatingCTA = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Phone */}
      <a 
        href={`tel:+880${CONTACT_NUMBER}`}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
        aria-label="Call us"
      >
        <Phone className="w-6 h-6" />
      </a>
      
      {/* WhatsApp */}
      <a 
        href={`https://wa.me/880${CONTACT_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-green-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 animate-bounce"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
};

export default FloatingCTA;
