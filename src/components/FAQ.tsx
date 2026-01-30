import { Leaf, Shield } from "lucide-react";

const FAQ = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">জানুন</span> বিস্তারিত
          </h2>
          <p className="text-muted-foreground text-lg">কেন এই কলার আপনার বিড়ালের জন্য সেরা</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Why Different Section */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Leaf className="w-6 h-6 text-green-500" />
              কেন এই কলার আলাদা?
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>প্রাকৃতিক এসেনশিয়াল অয়েল – একদম নন-টক্সিক ও ক্যাট-ফ্রেন্ডলি</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>ফ্লি, উকুন, মশা, পিঁপড়া ও অন্যান্য ক্ষতিকর পোকামাকড় থেকে লং-লাস্টিং সুরক্ষা</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>হালকা, কমফোর্টেবল এবং দৈনন্দিন ব্যবহারের জন্য পারফেক্ট</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>শুধু সুরক্ষা নয়, একসাথে ফ্রেশনেস ও স্টাইলও দেয়</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-0.5">✅</span>
                <span>কোন কেমিক্যাল নেই – তাই তোমার ফারবেবির জন্য একদম সেফ</span>
              </li>
            </ul>
          </div>

          {/* Protection From Section */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Shield className="w-6 h-6 text-primary" />
              সুরক্ষা দেবে যেসব থেকে:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="text-xl">🦟</span>
                <span>মশা</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="text-xl">🕷️</span>
                <span>উকুন (Ticks)</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="text-xl">🐜</span>
                <span>পিঁপড়া</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="text-xl">🪳</span>
                <span>ফ্লি (Fleas)</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg col-span-2 sm:col-span-1">
                <span className="text-xl">🦗</span>
                <span>অন্যান্য পোকামাকড়</span>
              </div>
            </div>
          </div>

          {/* Highlight Box */}
          <div className="glass-card p-6 rounded-2xl mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30">
            <p className="text-center text-lg">
              ✨ এখন থেকে আর ইনসেক্ট স্প্রে বা ঝামেলাপূর্ণ ট্রিটমেন্ট দরকার নেই। একটাই কলার – আর আপনার ক্যাট থাকবে সব সময় <strong>রিল্যাক্সড ও হ্যাপি!</strong>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
