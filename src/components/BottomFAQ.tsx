import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Info } from "lucide-react";

const BottomFAQ = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            <span className="text-gradient">সাধারণ প্রশ্নাবলী</span>
          </h2>
          <p className="text-muted-foreground">আপনার সাধারণ প্রশ্নের উত্তর</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="glass-card p-6 rounded-2xl space-y-2">
            <AccordionItem value="delivery-time">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  ডেলিভারি পেতে কতদিন লাগে?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                ঢাকা সিটির ভেতরে ২-৩ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি পাবেন। অর্ডার কনফার্ম হওয়ার পর আমরা আপনার সাথে যোগাযোগ করব।
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="payment-method">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  কোন কোন পেমেন্ট মেথড সাপোর্ট করেন?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                আমরা ক্যাশ অন ডেলিভারি (COD), bKash এবং Nagad সাপোর্ট করি। bKash পেমেন্টে ৫% ক্যাশব্যাক অফার আছে!
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="collar-size">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  কলারের সাইজ কত? সব বিড়ালে ফিট হবে?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                কলারটি অ্যাডজাস্টেবল এবং বেশিরভাগ বিড়ালের জন্য উপযোগী (নেক সাইজ ২০-৩৮ সেমি)। ছোট বিড়ালছানা থেকে বড় বিড়াল সবার জন্যই কাজ করবে।
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="how-long-works">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  কলার কতদিন কাজ করবে?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                এই কলার ৮+ মাস পর্যন্ত কার্যকর থাকে। তবে বিড়াল যদি ঘন ঘন গোসল করে বা পানিতে ভেজে, তাহলে কার্যকারিতা কিছুটা কমতে পারে।
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="safe-for-cats">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  এটা কি বিড়ালের জন্য ১০০% সেফ?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                হ্যাঁ, এটি প্রাকৃতিক এসেনশিয়াল অয়েল দিয়ে তৈরি এবং কোনো ক্ষতিকর কেমিক্যাল নেই। তবে প্রথমবার ব্যবহারে ২-৩ ঘণ্টা পর চেক করুন যে বিড়ালের কোনো এলার্জি বা অস্বস্তি হচ্ছে কিনা।
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="return-policy">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  রিটার্ন বা এক্সচেঞ্জ পলিসি কী?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                প্রোডাক্টে কোনো সমস্যা থাকলে ৭ দিনের মধ্যে আমাদের জানান। আমরা এক্সচেঞ্জ বা রিফান্ডের ব্যবস্থা করব।
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="track-order">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  অর্ডার ট্র্যাক করব কীভাবে?
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                অর্ডার শিপ হওয়ার পর আমরা আপনাকে ট্র্যাকিং নম্বর ও কুরিয়ারের তথ্য SMS বা WhatsApp এ পাঠাব।
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="guarantee">
              <AccordionTrigger className="text-left">
                <span className="flex items-center gap-2">
                  <Info className="w-5 h-5 text-primary flex-shrink-0" />
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
                  <Info className="w-5 h-5 text-primary flex-shrink-0" />
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

export default BottomFAQ;
