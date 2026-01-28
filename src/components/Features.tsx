import { Shield, Leaf, Clock, Heart, Droplets, CheckCircle } from "lucide-react";
import productImage2 from "@/assets/product-2.jpg";

const features = [
  {
    icon: Shield,
    title: "সম্পূর্ণ সুরক্ষা",
    description: "মাছি, টিক, উকুন ও মশা থেকে রক্ষা করে",
    color: "text-primary",
  },
  {
    icon: Leaf,
    title: "প্রাকৃতিক উপাদান",
    description: "এসেনশিয়াল অয়েল ভিত্তিক, কোনো ক্ষতিকর কেমিক্যাল নেই",
    color: "text-green-500",
  },
  {
    icon: Clock,
    title: "দীর্ঘস্থায়ী",
    description: "একবার পরালে ৮+ মাস পর্যন্ত কাজ করে",
    color: "text-secondary",
  },
  {
    icon: Heart,
    title: "বিড়ালের জন্য নিরাপদ",
    description: "ত্বকে জ্বালা বা এলার্জি করে না",
    color: "text-accent",
  },
  {
    icon: Droplets,
    title: "পানি প্রতিরোধী",
    description: "গোসলের পরেও কার্যকর থাকে",
    color: "text-blue-400",
  },
  {
    icon: CheckCircle,
    title: "সহজ ব্যবহার",
    description: "অ্যাডজাস্টেবল সাইজ, সব বিড়ালের জন্য উপযোগী",
    color: "text-purple-500",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            কেন <span className="text-gradient">এই কলার</span> বেছে নেবেন?
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            আপনার বিড়ালের সুরক্ষায় সবচেয়ে কার্যকর ও নিরাপদ সমাধান
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-2xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <feature.icon className={`w-10 h-10 ${feature.color} mb-4`} />
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-xl" />
              <img 
                src={productImage2} 
                alt="Anti Flea Protection Features"
                className="relative z-10 w-full max-w-lg rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
