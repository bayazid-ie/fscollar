import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Leaf, Shield, Bug, Info } from "lucide-react";

const FAQ = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">জানুন</span> বিস্তারিত
          </h2>
          <p className="text-muted-foreground text-lg">সচরাচর জিজ্ঞাসিত প্রশ্ন ও তথ্য</p>
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

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="glass-card p-6 rounded-2xl">
            <AccordionItem value="guarantee">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  এই কলার কি ১০০% গ্যারান্টি দেয়?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                কোনো কলার ১০০% গ্যারান্টি দিতে পারে না যে কখনো উকুন হবে না। তবে আমাদের এই anti-flea collar-এ থাকা natural repellent ingredient গুলো উকুন, পোকা আর টিক্সকে দূরে রাখে এবং বেশিরভাগ ক্ষেত্রে একদম কার্যকরভাবে কাজ করে।
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="goal">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary" />
                  আমাদের লক্ষ্য কী?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                আমাদের লক্ষ্য হলো আপনার পোষা প্রাণীকে আরামদায়ক ও নিরাপদ রাখা। প্রতিটি প্রোডাক্ট আমরা যত্ন সহকারে সিলেক্ট করি যাতে আপনার ফারবেবি সবসময় সুস্থ ও খুশি থাকে।
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
