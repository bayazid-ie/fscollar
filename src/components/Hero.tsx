import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Sparkles, Clock } from "lucide-react";
import productImage1 from "@/assets/product-1.jpg";

const Hero = () => {
  const scrollToOrder = () => {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-6">
            <Badge className="bg-accent text-accent-foreground px-4 py-2 text-sm font-semibold animate-bounce">
              🎉 সীমিত সময়ের অফার!
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">Anti Flea</span>
              <br />
              <span className="text-foreground">ক্যাট কলার</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
              আপনার প্রিয় বিড়ালকে মাছি, টিক ও পোকামাকড় থেকে রক্ষা করুন। 
              ১০০% নিরাপদ ও কার্যকর এসেনশিয়াল অয়েল ফর্মুলা।
            </p>

            {/* Features badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-md">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium">৮+ মাস সুরক্ষা</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-md">
                <Sparkles className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium">প্রাকৃতিক উপাদান</span>
              </div>
              <div className="flex items-center gap-2 bg-card px-4 py-2 rounded-full shadow-md">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">দ্রুত ডেলিভারি</span>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center gap-4 justify-center lg:justify-start">
              <div className="relative">
                <span className="text-2xl text-muted-foreground line-through">৳৬২০</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-bold text-primary">৳৪৬০</span>
                <span className="text-muted-foreground">মাত্র</span>
              </div>
              <Badge variant="destructive" className="animate-pulse">
                ফ্রি ডেলিভারি!
              </Badge>
            </div>

            <Button 
              onClick={scrollToOrder}
              size="lg" 
              className="btn-gradient text-primary-foreground text-xl px-10 py-7 rounded-full shadow-2xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
            >
              এখনই অর্ডার করুন 🛒
            </Button>
          </div>

          {/* Product Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-3xl blur-2xl transform rotate-6" />
              <img 
                src={productImage1} 
                alt="Anti Flea Cat Collar - এন্টি ফ্লি ক্যাট কলার"
                className="relative z-10 w-full max-w-md rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full font-bold text-lg shadow-lg animate-bounce">
                🔥 বেস্ট সেলার
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
