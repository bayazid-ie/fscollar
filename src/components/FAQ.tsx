import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Leaf, Shield, HelpCircle } from "lucide-react";

const FAQ = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">FAQ</span> - সচরাচর জিজ্ঞাসা
          </h2>
          <p className="text-muted-foreground text-lg">সাধারণ প্রশ্ন ও উত্তর</p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Accordion */}
          <div className="glass-card p-6 rounded-2xl mb-8">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-primary" />
              সাধারণ প্রশ্নাবলী
            </h3>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="delivery-time">
                <AccordionTrigger className="text-left">
                  ডেলিভারি পেতে কতদিন লাগে?
                </AccordionTrigger>
                <AccordionContent>
                  ঢাকা সিটির ভেতরে ২-৩ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি পাবেন। অর্ডার কনফার্ম হওয়ার পর আমরা আপনার সাথে যোগাযোগ করব।
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="payment-method">
                <AccordionTrigger className="text-left">
                  কোন কোন পেমেন্ট মেথড সাপোর্ট করেন?
                </AccordionTrigger>
                <AccordionContent>
                  আমরা ক্যাশ অন ডেলিভারি (COD), bKash এবং Nagad সাপোর্ট করি। bKash পেমেন্টে ৫% ক্যাশব্যাক অফার আছে!
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="collar-size">
                <AccordionTrigger className="text-left">
                  কলারের সাইজ কত? সব বিড়ালে ফিট হবে?
                </AccordionTrigger>
                <AccordionContent>
                  কলারটি অ্যাডজাস্টেবল এবং বেশিরভাগ বিড়ালের জন্য উপযোগী (নেক সাইজ ২০-৩৮ সেমি)। ছোট বিড়ালছানা থেকে বড় বিড়াল সবার জন্যই কাজ করবে।
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="how-long-works">
                <AccordionTrigger className="text-left">
                  কলার কতদিন কাজ করবে?
                </AccordionTrigger>
                <AccordionContent>
                  এই কলার ৮+ মাস পর্যন্ত কার্যকর থাকে। তবে বিড়াল যদি ঘন ঘন গোসল করে বা পানিতে ভেজে, তাহলে কার্যকারিতা কিছুটা কমতে পারে।
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="safe-for-cats">
                <AccordionTrigger className="text-left">
                  এটা কি বিড়ালের জন্য ১০০% সেফ?
                </AccordionTrigger>
                <AccordionContent>
                  হ্যাঁ, এটি প্রাকৃতিক এসেনশিয়াল অয়েল দিয়ে তৈরি এবং কোনো ক্ষতিকর কেমিক্যাল নেই। তবে প্রথমবার ব্যবহারে ২-৩ ঘণ্টা পর চেক করুন যে বিড়ালের কোনো এলার্জি বা অস্বস্তি হচ্ছে কিনা।
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="return-policy">
                <AccordionTrigger className="text-left">
                  রিটার্ন বা এক্সচেঞ্জ পলিসি কী?
                </AccordionTrigger>
                <AccordionContent>
                  প্রোডাক্টে কোনো সমস্যা থাকলে ৭ দিনের মধ্যে আমাদের জানান। আমরা এক্সচেঞ্জ বা রিফান্ডের ব্যবস্থা করব।
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="track-order">
                <AccordionTrigger className="text-left">
                  অর্ডার ট্র্যাক করব কীভাবে?
                </AccordionTrigger>
                <AccordionContent>
                  অর্ডার শিপ হওয়ার পর আমরা আপনাকে ট্র্যাকিং নম্বর ও কুরিয়ারের তথ্য SMS বা WhatsApp এ পাঠাব।
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

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
