import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Mail, MessageCircle, Bell } from "lucide-react";
import { toast } from "sonner";

const SignupSection = () => {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !whatsapp) {
      toast.error("Missing Information", {
        description: "Please fill in both email or WhatsApp number",
      });
      return;
    }

    // Simulate API call
    toast.success("Success! 🎉", {
      description: "You're on the waitlist! We'll notify you when we launch.",
    });

    setEmail("");
    setWhatsapp("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 relative overflow-hidden">
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/4 w-32 h-32 bg-orange-200 rounded-full animate-pulse opacity-30"></div>
        <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-red-200 rounded-full animate-bounce opacity-30"></div>
        <div className="absolute top-1/2 left-10 w-20 h-20 bg-yellow-200 rounded-full animate-pulse delay-300 opacity-30"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-full mb-6 animate-pulse">
            <Bell className="w-5 h-5" />
            <span className="font-semibold">Join the Waitlist</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Be Among the First to
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              {" "}
              Experience It
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Stay informed and secure early access, discounts, and launch
            updates.
          </p>
        </div>

        {/* Signup form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 transform hover:scale-105 transition-transform duration-300 animate-scale-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-lg font-semibold text-gray-700 flex items-center gap-2"
              >
                <Mail className="w-5 h-5 text-orange-500" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                className="h-14 text-lg border-2 border-gray-200 focus:border-orange-500 rounded-xl transition-colors duration-300"
              />
            </div>

            {/* WhatsApp input */}
            <div className="space-y-3">
              <Label
                htmlFor="whatsapp"
                className="text-lg font-semibold text-gray-700 flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-green-500" />
                WhatsApp Number
              </Label>
              <Input
                id="whatsapp"
                type="tel"
                placeholder="+234 XXX XXX XXXX"
                value={whatsapp}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setWhatsapp(e.target.value)
                }
                className="h-14 text-lg border-2 border-gray-200 focus:border-green-500 rounded-xl transition-colors duration-300"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              className="w-full h-14 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 text-white text-lg font-bold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Join the Waitlist 🚀
            </Button>
          </form>

          {/* Benefits list */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h4 className="font-semibold text-gray-800 mb-4 text-center">
              What you'll get:
            </h4>
            <div className="grid sm:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="text-center">
                <span className="block text-2xl mb-1">🎁</span>
                <span>Early access benefits</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl mb-1">💰</span>
                <span>Special launch discounts</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl mb-1">📱</span>
                <span>Launch day notification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;
