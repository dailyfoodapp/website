import { Button } from "@/components/ui/button";
import { Instagram, Music2, Facebook, Smartphone } from "lucide-react";
import Logo from "@/assets/logo-footer.png";

const FooterSection = () => {
  const socialLinks = [
    {
      icon: Instagram,
      href: "https://www.instagram.com/dailyfoodapp",
      color: "hover:text-pink-500",
    },
    {
      icon: Music2,
      href: "https://www.tiktok.com/@dailyfoodapp",
      color: "hover:text-black",
    },
    {
      icon: Facebook,
      href: "https://www.facebook.com/dailyfoodapp",
      color: "hover:text-blue-600",
    },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 text-8xl">🍕</div>
        <div className="absolute top-20 right-20 text-6xl">🍔</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🍜</div>
        <div className="absolute bottom-10 right-10 text-5xl">🍰</div>
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Brand section */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
              <img src={Logo} alt="Daily Foods Logo" className="w-auto h-10" />
              {/* <span className="text-2xl font-bold">Daily Foods</span> */}
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              Revolutionizing food delivery with fresh ingredients,
              lightning-fast service, and an experience that puts taste first.
            </p>

            {/* Social links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(social.href, "_blank")}
                  className={`w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 ${social.color} transition-all duration-300 transform hover:scale-110`}
                >
                  <social.icon className="w-5 h-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* App download section */}
          <div className="text-center animate-scale-in delay-300">
            <h3 className="text-2xl font-bold mb-6">Download Soon</h3>

            <div className="space-y-4">
              {/* App Store button */}
              <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-8 h-8 text-gray-400" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Coming to</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </div>

              {/* Google Play button */}
              <div className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-all duration-300 cursor-pointer transform hover:scale-105">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-8 h-8 text-gray-400" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Coming to</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="text-center lg:text-right animate-fade-in delay-500">
            <h3 className="text-2xl font-bold mb-6">Stay Connected</h3>

            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-orange-500">📧</span> hello@dailyfoods.app
              </p>
              <p>
                <span className="text-orange-500">📱</span> Coming Soon
              </p>
              <p>
                <span className="text-orange-500">🌍</span> Launching Globally
              </p>
            </div>

            <div className="mt-8">
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 rounded-full font-semibold transform hover:scale-105 transition-all duration-300">
                Get Notified
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>
            &copy; 2025 Daily Foods. All rights reserved. Made with ❤️ for food
            lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
