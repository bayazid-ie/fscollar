import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Phone, MapPin, User, Package, CheckCircle, CreditCard, Wallet, PartyPopper } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import productImage1 from "@/assets/product-1.jpg";
import bkashLogo from "@/assets/bkash-logo.png";
import nagadLogo from "@/assets/nagad-logo.png";

const CONTACT_NUMBER = "01741037905";
const BKASH_NAGAD_NUMBER = "01741037905";

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    quantity: 1,
    notes: "",
    paymentMethod: "cod",
    paymentPhone: "",
    paymentTrxId: "",
    isDhakaCity: true,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [lastOrderIsDhaka, setLastOrderIsDhaka] = useState(true);

  const unitPrice = 460;
  const deliveryCharge = 0; // Free delivery
  const quantity = formData.quantity;
  const subtotal = unitPrice * quantity;
  const total = subtotal;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone || !formData.address) {
      return;
    }

    if (formData.quantity < 1) {
      return;
    }

    if (formData.paymentMethod !== "cod") {
      if (!formData.paymentPhone || !formData.paymentTrxId) {
        return;
      }
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from("orders").insert({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      quantity: quantity,
      notes: formData.notes || null,
      unit_price: unitPrice,
      delivery_charge: deliveryCharge,
      total: total,
      payment_method: formData.paymentMethod,
      payment_phone: formData.paymentMethod !== "cod" ? formData.paymentPhone : null,
      payment_trxid: formData.paymentMethod !== "cod" ? formData.paymentTrxId : null,
    });

    if (error) {
      console.error("Order error:", error);
      setIsSubmitting(false);
      return;
    }

    setLastOrderIsDhaka(formData.isDhakaCity);
    setShowSuccessDialog(true);
    
    setFormData({
      name: "",
      phone: "",
      address: "",
      quantity: 1,
      notes: "",
      paymentMethod: "cod",
      paymentPhone: "",
      paymentTrxId: "",
      isDhakaCity: true,
    });
    
    setIsSubmitting(false);
  };

  return (
    <>
      <section id="order" className="py-20 bg-gradient-to-b from-muted/20 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              এখনই <span className="text-gradient">অর্ডার করুন</span>
            </h2>
            <p className="text-muted-foreground text-lg">ক্যাশ অন ডেলিভারি অথবা অ্যাডভান্স পেমেন্ট</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Order Summary - shows second on mobile, first on desktop */}
            <div className="glass-card p-8 rounded-2xl order-2 lg:order-1 hidden lg:block">
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
                    <span className="text-sm line-through text-muted-foreground">৳৬২০</span>
                    <span className="text-xl font-bold text-primary">৳৪৬০</span>
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
                  <span className="font-medium text-green-600">ফ্রি! 🎉</span>
                </div>
                <div className="flex justify-between text-xl font-bold border-t border-border pt-3">
                  <span>সর্বমোট</span>
                  <span className="text-primary">৳{total}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 border border-primary/30 rounded-xl">
                <div className="flex items-center gap-2 text-primary">
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">নিরাপদ পেমেন্ট</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">ক্যাশ অন ডেলিভারি বা bKash/Nagad এ অ্যাডভান্স</p>
              </div>
            </div>

            {/* Order Form - shows first on mobile */}
            <form onSubmit={handleSubmit} className="glass-card p-8 rounded-2xl order-1 lg:order-2 flex flex-col">
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
                    required
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
                    required
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
                    required
                  />
                </div>


                <div>
                  <Label htmlFor="quantity" className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-primary" />
                    পরিমাণ
                  </Label>
                  <Input 
                    id="quantity"
                    type="number"
                    min="1"
                    placeholder="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: parseInt(e.target.value) || 1})}
                    className="h-12"
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <Label className="flex items-center gap-2 mb-3">
                    <Wallet className="w-4 h-4 text-primary" />
                    পেমেন্ট মেথড *
                  </Label>
                  <RadioGroup 
                    value={formData.paymentMethod} 
                    onValueChange={(value) => setFormData({...formData, paymentMethod: value})}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="cod" id="cod" />
                      <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer flex-1">
                        <CreditCard className="w-4 h-4" />
                        ক্যাশ অন ডেলিভারি
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="bkash" id="bkash" />
                      <Label htmlFor="bkash" className="cursor-pointer flex-1 flex items-center gap-3">
                        <img src={bkashLogo} alt="bKash" className="h-8 w-auto object-contain" />
                        <span className="font-medium text-pink-600">bKash</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="nagad" id="nagad" />
                      <Label htmlFor="nagad" className="cursor-pointer flex-1 flex items-center gap-3">
                        <img src={nagadLogo} alt="Nagad" className="h-8 w-auto object-contain" />
                        <span className="font-medium text-orange-600">Nagad</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* bKash/Nagad Payment Details */}
                {formData.paymentMethod !== "cod" && (
                  <div className="p-4 bg-muted/50 rounded-xl space-y-4 border border-primary/30">
                    <div className="text-center">
                      <p className="font-medium text-primary">
                        {formData.paymentMethod === "bkash" ? "bKash" : "Nagad"} নম্বর: 
                        <span className="font-bold ml-2">{BKASH_NAGAD_NUMBER}</span>
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        উপরের নম্বরে ৳{total} টাকা সেন্ড মানি করুন
                      </p>
                    </div>
                    
                    <div>
                      <Label htmlFor="paymentPhone" className="mb-2 block">
                        যে নম্বর থেকে পাঠিয়েছেন *
                      </Label>
                      <Input 
                        id="paymentPhone"
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={formData.paymentPhone}
                        onChange={(e) => setFormData({...formData, paymentPhone: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="paymentTrxId" className="mb-2 block">
                        Transaction ID (TrxID) *
                      </Label>
                      <Input 
                        id="paymentTrxId"
                        placeholder="যেমন: 8N7A2M5K1X"
                        value={formData.paymentTrxId}
                        onChange={(e) => setFormData({...formData, paymentTrxId: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                )}

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

                {/* Mobile Order Summary - shows after form on mobile only */}
                <div className="lg:hidden glass-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" />
                    অর্ডার সামারি
                  </h3>

                  <div className="flex gap-4 mb-4 p-3 bg-muted/50 rounded-xl">
                    <img 
                      src={productImage1} 
                      alt="Anti Flea Cat Collar"
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-bold">Anti Flea Cat Collar</h4>
                      <p className="text-muted-foreground text-sm">এসেনশিয়াল অয়েল কলার</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm line-through text-muted-foreground">৳৬২০</span>
                        <span className="text-lg font-bold text-primary">৳৪৬০</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-border pt-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">সাবটোটাল ({quantity}টি)</span>
                      <span className="font-medium">৳{subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ডেলিভারি চার্জ</span>
                      <span className="font-medium text-green-600">ফ্রি! 🎉</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t border-border pt-2">
                      <span>সর্বমোট</span>
                      <span className="text-primary">৳{total}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full btn-gradient text-primary-foreground text-xl py-7 rounded-xl shadow-xl hover:shadow-primary/30 hover:scale-[1.02] transition-all duration-300"
                >
                  {isSubmitting ? "প্রসেসিং..." : "অর্ডার কনফার্ম করুন ✓"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
                <PartyPopper className="w-10 h-10 text-green-600" />
              </div>
            </div>
            <DialogTitle className="text-2xl text-green-600">
              🎉 অর্ডার সফল হয়েছে!
            </DialogTitle>
            <DialogDescription className="text-lg mt-4 space-y-3">
              <p className="font-medium text-foreground">
                ধন্যবাদ! আপনার অর্ডার সফলভাবে গ্রহণ করা হয়েছে।
              </p>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-primary font-bold text-xl">
                  {lastOrderIsDhaka ? "২-৩ দিনের মধ্যে" : "৩-৪ দিনের মধ্যে"}
                </p>
                <p className="text-muted-foreground">
                  {lastOrderIsDhaka ? "ঢাকা সিটিতে ডেলিভারি পাবেন" : "ঢাকার বাইরে ডেলিভারি পাবেন"}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">
                আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। 📞
              </p>
            </DialogDescription>
          </DialogHeader>
          <Button 
            onClick={() => setShowSuccessDialog(false)}
            className="mt-4 btn-gradient text-primary-foreground"
          >
            ঠিক আছে
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default OrderForm;
