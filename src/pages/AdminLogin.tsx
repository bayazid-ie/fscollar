import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Lock, Mail, ArrowLeft } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    if (isSignUp && !fullName) {
      toast.error("Please enter your full name");
      return;
    }

    setIsSubmitting(true);
    
    if (isSignUp) {
      const { error } = await signUp(email, password, fullName);
      
      if (error) {
        toast.error(error.message || "Sign up failed");
        setIsSubmitting(false);
        return;
      }

      toast.success("Account created! You can now sign in.");
      setIsSignUp(false);
      setIsSubmitting(false);
      return;
    }

    const { error } = await signIn(email, password);
    
    if (error) {
      toast.error(error.message || "Login failed");
      setIsSubmitting(false);
      return;
    }

    toast.success("Login successful!");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-4">
      <div className="w-full max-w-md">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Button>

        <div className="glass-card p-8 rounded-2xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">{isSignUp ? "Admin Sign Up" : "Admin Login"}</h1>
            <p className="text-muted-foreground mt-2">
              {isSignUp ? "Create an admin account" : "Sign in to manage orders"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignUp && (
              <div>
                <Label htmlFor="fullName" className="flex items-center gap-2 mb-2">
                  Full Name
                </Label>
                <Input 
                  id="fullName"
                  type="text"
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-12"
                  disabled={isSubmitting || isLoading}
                />
              </div>
            )}

            <div>
              <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-primary" />
                Email
              </Label>
              <Input 
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                disabled={isSubmitting || isLoading}
              />
            </div>

            <div>
              <Label htmlFor="password" className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-primary" />
                Password
              </Label>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
                disabled={isSubmitting || isLoading}
              />
            </div>

            <Button 
              type="submit"
              disabled={isSubmitting || isLoading}
              size="lg"
              className="w-full btn-gradient text-primary-foreground py-6"
            >
              {isSubmitting 
                ? (isSignUp ? "Creating account..." : "Signing in...") 
                : (isSignUp ? "Sign Up" : "Sign In")}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-primary hover:underline"
                disabled={isSubmitting}
              >
                {isSignUp 
                  ? "Already have an account? Sign In" 
                  : "Need an account? Sign Up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
