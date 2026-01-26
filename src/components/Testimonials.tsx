import { Star, Quote } from "lucide-react";

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
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            গ্রাহকদের <span className="text-gradient">মতামত</span>
          </h2>
          <p className="text-muted-foreground text-lg">যারা ইতিমধ্যে ব্যবহার করেছেন</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-2xl hover:shadow-2xl transition-all duration-300 relative"
            >
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
          ))}
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
