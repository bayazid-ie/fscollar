import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
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
  const [lastOrderId, setLastOrderId] = useState<string | null>(null);

  const unitPrice = 480;
  const regularPrice = 650;
  const deliveryCharge = 0; // Free delivery
  const quantity = formData.quantity;
  const subtotal = unitPrice * quantity;
  const bkashCashback = formData.paymentMethod === "bkash" ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal;

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Validation helper functions
  const validatePhone = (phone: string): boolean => {
    return /^01[3-9][0-9]{8}$/.test(phone);
  };

  const validateName = (name: string): string | null => {
    const trimmed = name.trim();
    if (trimmed.length < 2) return "নাম কমপক্ষে ২ অক্ষর হতে হবে";
    if (trimmed.length > 100) return "নাম ১০০ অক্ষরের বেশি হতে পারবে না";
    return null;
  };

  const validateAddress = (address: string): string | null => {
    const trimmed = address.trim();
    if (trimmed.length < 5) return "ঠিকানা কমপক্ষে ৫ অক্ষর হতে হবে";
    if (trimmed.length > 500) return "ঠিকানা ৫০০ অক্ষরের বেশি হতে পারবে না";
    return null;
  };

  const validateQuantity = (qty: number): string | null => {
    if (qty < 1) return "পরিমাণ কমপক্ষে ১ হতে হবে";
    if (qty > 100) return "পরিমাণ ১০০ এর বেশি হতে পারবে না";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors: Record<string, string> = {};
    
    // Validate all fields
    const nameError = validateName(formData.name);
    if (nameError) errors.name = nameError;
    
    if (!validatePhone(formData.phone)) {
      errors.phone = "সঠিক মোবাইল নম্বর দিন (যেমন: 01712345678)";
    }
    
    const addressError = validateAddress(formData.address);
    if (addressError) errors.address = addressError;
    
    const qtyError = validateQuantity(formData.quantity);
    if (qtyError) errors.quantity = qtyError;

    if (formData.paymentMethod !== "cod") {
      if (!formData.paymentPhone) {
        errors.paymentPhone = "পেমেন্ট নম্বর দিন";
      } else if (!validatePhone(formData.paymentPhone)) {
        errors.paymentPhone = "সঠিক মোবাইল নম্বর দিন";
      }
      if (!formData.paymentTrxId || formData.paymentTrxId.trim().length < 5) {
        errors.paymentTrxId = "সঠিক Transaction ID দিন";
      }
    }

    if (formData.notes && formData.notes.length > 1000) {
      errors.notes = "নোট ১০০০ অক্ষরের বেশি হতে পারবে না";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setIsSubmitting(true);
    
    const { data, error } = await supabase.from("orders").insert({
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      quantity: quantity,
      notes: formData.notes?.trim() || null,
      unit_price: unitPrice,
      delivery_charge: deliveryCharge,
      total: total,
      payment_method: formData.paymentMethod,
      payment_phone: formData.paymentMethod !== "cod" ? formData.paymentPhone?.trim() : null,
      payment_trxid: formData.paymentMethod !== "cod" ? formData.paymentTrxId?.trim() : null,
    }).select('order_id').single();

    if (error) {
      // Show user-friendly error message
      if (error.message.includes("Invalid phone")) {
        setValidationErrors({ phone: "সঠিক মোবাইল নম্বর দিন" });
      } else if (error.message.includes("Name")) {
        setValidationErrors({ name: "সঠিক নাম দিন" });
      } else if (error.message.includes("Address")) {
        setValidationErrors({ address: "সঠিক ঠিকানা দিন" });
      } else if (error.message.includes("Quantity")) {
        setValidationErrors({ quantity: "সঠিক পরিমাণ দিন (১-১০০)" });
      } else {
        setValidationErrors({ general: "অর্ডার প্রসেস করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।" });
      }
      setIsSubmitting(false);
      return;
    }

    setLastOrderId(data?.order_id || null);
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
                    <span className="text-sm line-through text-muted-foreground">৳৬৫০</span>
                    <span className="text-xl font-bold text-primary">৳৪৮০</span>
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
                {bkashCashback > 0 && (
                  <div className="flex justify-between text-pink-600">
                    <span>bKash ক্যাশব্যাক (৫%)</span>
                    <span className="font-medium">৳{bkashCashback} ফেরত!</span>
                  </div>
                )}
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
                {validationErrors.general && (
                  <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
                    {validationErrors.general}
                  </div>
                )}
                
                <div>
                  <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-primary" />
                    আপনার নাম *
                  </Label>
                  <Input 
                    id="name"
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({...formData, name: e.target.value});
                      if (validationErrors.name) setValidationErrors(prev => ({...prev, name: ''}));
                    }}
                    className={`h-12 ${validationErrors.name ? 'border-destructive' : ''}`}
                    required
                    maxLength={100}
                  />
                  {validationErrors.name && (
                    <p className="text-destructive text-sm mt-1">{validationErrors.name}</p>
                  )}
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
                    onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      if (validationErrors.phone) setValidationErrors(prev => ({...prev, phone: ''}));
                    }}
                    className={`h-12 ${validationErrors.phone ? 'border-destructive' : ''}`}
                    required
                    maxLength={11}
                  />
                  {validationErrors.phone && (
                    <p className="text-destructive text-sm mt-1">{validationErrors.phone}</p>
                  )}
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
                    onChange={(e) => {
                      setFormData({...formData, address: e.target.value});
                      if (validationErrors.address) setValidationErrors(prev => ({...prev, address: ''}));
                    }}
                    className={validationErrors.address ? 'border-destructive' : ''}
                    rows={3}
                    required
                    maxLength={500}
                  />
                  {validationErrors.address && (
                    <p className="text-destructive text-sm mt-1">{validationErrors.address}</p>
                  )}
                </div>


                <div>
                  <Label htmlFor="quantity" className="flex items-center gap-2 mb-2">
                    <Package className="w-4 h-4 text-primary" />
                    পরিমাণ
                  </Label>
                  <Input 
                    id="quantity"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="1"
                    value={formData.quantity === 0 ? "" : formData.quantity}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === "") {
                        setFormData({...formData, quantity: 0});
                      } else {
                        const num = parseInt(val);
                        if (!isNaN(num) && num >= 0 && num <= 100) {
                          setFormData({...formData, quantity: num});
                        }
                      }
                      if (validationErrors.quantity) setValidationErrors(prev => ({...prev, quantity: ''}));
                    }}
                    className={`h-12 ${validationErrors.quantity ? 'border-destructive' : ''}`}
                  />
                  {validationErrors.quantity && (
                    <p className="text-destructive text-sm mt-1">{validationErrors.quantity}</p>
                  )}
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
                        <img src={bkashLogo} alt="bKash" className="h-10 w-auto object-contain" />
                        <Badge className="bg-pink-100 text-pink-600 border-pink-300">৫% ক্যাশব্যাক!</Badge>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-3 border border-border rounded-lg hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="nagad" id="nagad" />
                      <Label htmlFor="nagad" className="cursor-pointer flex-1 flex items-center gap-2">
                        <img src={nagadLogo} alt="Nagad" className="h-10 w-auto object-contain" />
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
                        onChange={(e) => {
                          setFormData({...formData, paymentPhone: e.target.value});
                          if (validationErrors.paymentPhone) setValidationErrors(prev => ({...prev, paymentPhone: ''}));
                        }}
                        className={`h-12 ${validationErrors.paymentPhone ? 'border-destructive' : ''}`}
                        required
                        maxLength={11}
                      />
                      {validationErrors.paymentPhone && (
                        <p className="text-destructive text-sm mt-1">{validationErrors.paymentPhone}</p>
                      )}
                    </div>
                    
                    <div>
                      <Label htmlFor="paymentTrxId" className="mb-2 block">
                        Transaction ID (TrxID) *
                      </Label>
                      <Input 
                        id="paymentTrxId"
                        placeholder="যেমন: 8N7A2M5K1X"
                        value={formData.paymentTrxId}
                        onChange={(e) => {
                          setFormData({...formData, paymentTrxId: e.target.value});
                          if (validationErrors.paymentTrxId) setValidationErrors(prev => ({...prev, paymentTrxId: ''}));
                        }}
                        className={`h-12 ${validationErrors.paymentTrxId ? 'border-destructive' : ''}`}
                        required
                        maxLength={50}
                      />
                      {validationErrors.paymentTrxId && (
                        <p className="text-destructive text-sm mt-1">{validationErrors.paymentTrxId}</p>
                      )}
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
                        <span className="text-sm line-through text-muted-foreground">৳{regularPrice}</span>
                        <span className="text-lg font-bold text-primary">৳{unitPrice}</span>
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
                    {bkashCashback > 0 && (
                      <div className="flex justify-between text-pink-600">
                        <span>bKash ক্যাশব্যাক (৫%)</span>
                        <span className="font-medium">৳{bkashCashback} ফেরত!</span>
                      </div>
                    )}
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
              {lastOrderId && (
                <div className="p-3 bg-primary/10 border border-primary/30 rounded-xl">
                  <p className="text-sm text-muted-foreground">আপনার অর্ডার আইডি</p>
                  <p className="text-2xl font-bold text-primary">{lastOrderId}</p>
                </div>
              )}
              <div className="p-4 bg-muted rounded-xl">
                <h4 className="font-bold text-foreground mb-3 flex items-center gap-2">
                  🚚 ডেলিভারি টাইম
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ঢাকা সিটিতে:</span>
                    <span className="font-bold text-primary">২-৩ দিন</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">ঢাকার বাইরে:</span>
                    <span className="font-bold text-primary">৩-৫ দিন</span>
                  </div>
                </div>
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
