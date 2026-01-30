import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "ফারহানা আক্তার",
    location: "ঢাকা",
    rating: 5,
    text: "আমার বিড়াল মিনির অনেক মাছি সমস্যা ছিল। এই কলার পরানোর ২ সপ্তাহের মধ্যে সব ঠিক হয়ে গেছে!",
    avatar: "👩",
  },
  {
    name: "রাকিব হাসান",
    location: "চট্টগ্রাম",
    rating: 5,
    text: "প্রোডাক্ট কোয়ালিটি অনেক ভালো। আমার পার্সিয়ান ক্যাটের জন্য পারফেক্ট। দ্রুত ডেলিভারি পেয়েছি।",
    avatar: "👨",
  },
  {
    name: "তানিয়া ইসলাম",
    location: "সিলেট",
    rating: 5,
    text: "অনেক প্রোডাক্ট ট্রাই করেছি, কিন্তু এটাই সবচেয়ে ভালো কাজ করেছে। বিড়ালের কোনো সমস্যা হয়নি।",
    avatar: "👩",
  },
  {
    name: "Rafiq Ahmed",
    location: "Dhaka",
    rating: 5,
    text: "Amazing product! My cat had severe flea problem. After using this collar for 3 weeks, no more scratching. Highly recommended!",
    avatar: "👨",
  },
  {
    name: "Nadia Rahman",
    location: "Rajshahi",
    rating: 5,
    text: "Best collar I've used so far. Natural ingredients, no side effects. My Persian cat loves it!",
    avatar: "👩",
  },
  {
    name: "Sakib Mahmud",
    location: "Khulna",
    rating: 5,
    text: "Onek valo product! Amar beral er flea problem completely solve hoye gese. Delivery o fast chilo. Thanks FurryShack!",
    avatar: "👨",
  },
  {
    name: "Mitu Akter",
    location: "Gazipur",
    rating: 5,
    text: "Collar ta use korchi 1 month. Kono problem nai, smell o valo. Beral comfortable feel korche.",
    avatar: "👩",
  },
  {
    name: "হাসান মাহমুদ",
    location: "বরিশাল",
    rating: 5,
    text: "দ্রুত ডেলিভারি পেয়েছি। প্যাকেজিং অনেক সুন্দর ছিল। প্রোডাক্ট ও কাজ করছে ভালো।",
    avatar: "👨",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Show 3 items on desktop, 1 on mobile
  const itemsPerView = typeof window !== 'undefined' && window.innerWidth >= 768 ? 3 : 1;
  const maxIndex = testimonials.length - itemsPerView;

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            গ্রাহকদের <span className="text-gradient">মতামত</span>
          </h2>
          <p className="text-muted-foreground text-lg">যারা ইতিমধ্যে ব্যবহার করেছেন</p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-background shadow-lg hidden md:flex"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-background shadow-lg hidden md:flex"
            onClick={goToNext}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index}
                  className="w-full md:w-1/3 flex-shrink-0 px-2"
                >
                  <div className="glass-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 relative h-full">
                    <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/20" />
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                      ))}
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">"{testimonial.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button variant="outline" size="icon" onClick={goToPrev}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-primary w-6" 
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-lg">
            <span className="text-2xl">🚚</span>
            <span className="font-medium">সারাদেশে ডেলিভারি</span>
          </div>
          <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-lg">
            <span className="text-2xl">💯</span>
            <span className="font-medium">১০০% অরিজিনাল</span>
          </div>
          <div className="flex items-center gap-2 bg-card px-6 py-3 rounded-full shadow-lg">
            <span className="text-2xl">🔄</span>
            <span className="font-medium">সহজ রিটার্ন পলিসি</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
