import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Info } from "lucide-react";

const BottomFAQ = () => {
  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
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

export default BottomFAQ;
