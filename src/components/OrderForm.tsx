import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Phone, MapPin, User, Package, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import productImage1 from "@/assets/product-1.jpg";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: "1",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const unitPrice = 520;
  const deliveryCharge = 60;
  const quantity = parseInt(formData.quantity);
  const subtotal = unitPrice * quantity;
  const total = subtotal + deliveryCharge;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("অনুগ্রহ করে সব তথ্য পূরণ করুন");
      return;
    }

    setIsSubmitting(true);
    
    // Save order to database
    const { error } = await supabase.from("orders").insert({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      quantity: quantity,
      notes: formData.notes || null,
      unit_price: unitPrice,
      delivery_charge: deliveryCharge,
      total: total,
    });

    if (error) {
      console.error("Order error:", error);
      toast.error("অর্ডার সাবমিট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      setIsSubmitting(false);
      return;
    }

    // Create WhatsApp message
    const message = `🛒 *নতুন অর্ডার - Anti Flea Cat Collar*

👤 নাম: ${formData.name}
📞 ফোন: ${formData.phone}
📍 ঠিকানা: ${formData.address}
📦 পরিমাণ: ${formData.quantity}টি
${formData.notes ? `📝 নোট: ${formData.notes}` : ''}

💰 মূল্য: ৳${subtotal}
🚚 ডেলিভারি: ৳${deliveryCharge}
━━━━━━━━━━━
✅ সর্বমোট: ৳${total}`;

    const whatsappUrl = `https://wa.me/8801XXXXXXXXX?text=${encodeURIComponent(message)}`;
    
    toast.success("অর্ডার সফলভাবে সাবমিট হয়েছে! 🎉");
    
    // Reset form
    setFormData({
      name: "",
      phone: "",
      address: "",
      quantity: "1",
      notes: "",
    });
    
    setIsSubmitting(false);
    
    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="order" className="py-20 bg-gradient-to-b from-muted/20 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            এখনই <span className="text-gradient">অর্ডার করুন</span>
          </h2>
          <p className="text-muted-foreground text-lg">ক্যাশ অন ডেলিভারি - পণ্য হাতে পেয়ে পেমেন্ট করুন</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Order Summary */}
          <div className="glass-card p-8 rounded-2xl order-2 lg:order-1">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Package className="w-6 h-6 text-primary" />
              অর্ডার সামারি
            </h3>

            <div className="flex gap-4 mb-6 p-4 bg-muted/50 rounded-xl">
              <img 
                src={productImage1} 
                alt="Anti Flea Cat Collar"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h4 className="font-bold text-lg">Anti Flea Cat Collar</h4>
                <p className="text-muted-foreground text-sm">এসেনশিয়াল অয়েল কলার</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm line-through text-muted-foreground">৳৫৮০</span>
                  <span className="text-xl font-bold text-primary">৳৫২০</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 border-t border-border pt-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">সাবটোটাল ({quantity}টি)</span>
                <span className="font-medium">৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
                <span className="font-medium">৳{deliveryCharge}</span>
              </div>
              <div className="flex justify-between text-xl font-bold border-t border-border pt-3">
                <span>সর্বমোট</span>
                <span className="text-primary">৳{total}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
              <div className="flex items-center gap-2 text-primary">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">ক্যাশ অন ডেলিভারি</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">পণ্য হাতে পেয়ে পেমেন্ট করুন</p>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl order-1 lg:order-2">
            <h3 className="text-2xl font-bold mb-6">আপনার তথ্য দিন</h3>

            <div className="space-y-5">
              <div>
                <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                  <User className="w-4 h-4 text-primary" />
                  আপনার নাম *
                </Label>
                <Input 
                  id="name"
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                  <Phone className="w-4 h-4 text-primary" />
                  মোবাইল নম্বর *
                </Label>
                <Input 
                  id="phone"
                  type="tel"
                  placeholder="01XXXXXXXXX"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="h-12"
                />
              </div>

              <div>
                <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  সম্পূর্ণ ঠিকানা *
                </Label>
                <Textarea 
                  id="address"
                  placeholder="বাড়ি, রোড, এলাকা, শহর"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="quantity" className="flex items-center gap-2 mb-2">
                  <Package className="w-4 h-4 text-primary" />
                  পরিমাণ
                </Label>
                <Select 
                  value={formData.quantity} 
                  onValueChange={(value) => setFormData({...formData, quantity: value})}
                >
                  <SelectTrigger className="h-12">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">১টি - ৳৫২০</SelectItem>
                    <SelectItem value="2">২টি - ৳১,০৪০</SelectItem>
                    <SelectItem value="3">৩টি - ৳১,৫৬০</SelectItem>
                    <SelectItem value="5">৫টি - ৳২,৬০০</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="notes" className="mb-2 block">অতিরিক্ত নোট (ঐচ্ছিক)</Label>
                <Textarea 
                  id="notes"
                  placeholder="কোনো বিশেষ নির্দেশনা থাকলে লিখুন"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  rows={2}
                />
              </div>

              <Button 
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full btn-gradient text-primary-foreground text-xl py-7 rounded-xl shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
              >
                {isSubmitting ? "প্রসেসিং..." : "অর্ডার কনফার্ম করুন 🛒"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OrderForm;
