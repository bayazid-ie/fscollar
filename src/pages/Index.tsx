import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import OrderForm from "@/components/OrderForm";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <Features />
        <Benefits />
        <Testimonials />
        <OrderForm />
      </main>
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
