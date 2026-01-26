import { Check, X } from "lucide-react";

const Benefits = () => {
  const withCollar = [
    "মাছি ও টিক মুক্ত সুস্থ বিড়াল",
    "চুলকানি ও ত্বকের সমস্যা থেকে মুক্তি",
    "শান্তিপূর্ণ ঘুম ও আরামদায়ক জীবন",
    "পরিবারে রোগ ছড়ানোর ঝুঁকি কম",
    "ভেটেরিনারি খরচ বাঁচায়",
  ];

  const withoutCollar = [
    "ক্রমাগত চুলকানি ও অস্বস্তি",
    "ত্বকে ক্ষত ও সংক্রমণ",
    "রক্তস্বল্পতা ও দুর্বলতা",
    "পরিবারের সদস্যদের রোগ সংক্রমণ",
    "বারবার ভেটে যাওয়ার খরচ",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            কলার <span className="text-gradient">ছাড়া vs সহ</span>
          </h2>
          <p className="text-muted-foreground text-lg">পার্থক্যটা দেখুন নিজেই</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Without Collar */}
          <div className="glass-card p-8 rounded-2xl border-2 border-destructive/30 bg-destructive/5">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
                <X className="w-6 h-6 text-destructive" />
              </div>
              <h3 className="text-2xl font-bold text-destructive">কলার ছাড়া 😿</h3>
            </div>
            <ul className="space-y-4">
              {withoutCollar.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* With Collar */}
          <div className="glass-card p-8 rounded-2xl border-2 border-primary/30 bg-primary/5 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
              ✨ সঠিক পছন্দ
            </div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Check className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary">কলার সহ 😸</h3>
            </div>
            <ul className="space-y-4">
              {withCollar.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
