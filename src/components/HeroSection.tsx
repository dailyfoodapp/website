import { Button } from "@/components/ui/button";
import { Smartphone } from "lucide-react";
import Logo from "@/assets/logo-color.png";
import LogoText from "@/assets/logo.png";
import LogoIcon from "@/assets/logo-image.png";

const HeroSection = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById("signup-form");
    if (signupSection) {
      signupSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById("how-it-works");
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-orange-200 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-200 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-red-200 rounded-full animate-bounce delay-300 opacity-60"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-orange-300 rounded-full animate-pulse delay-500 opacity-60"></div>
      </div>

      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left content */}
        <div className="text-center lg:text-left animate-fade-in">
          <div className="flex gap-2 mb-6">
            <img src={Logo} alt="Daily Food Logo" className="w-auto h-10" />
            <img src={LogoText} alt="Daily Food Logo" className="w-auto h-10" />
            {/* <span className="text-orange-600 font-semibold text-lg">
              Daily Food
            </span> */}
          </div>

          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            No food for a lazy man is a pure{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 animate-pulse">
              bunkum
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Get ready for the ultimate savings on food and groceries. You don't
            have to spend your arms and legs to feed anymore. Save more than 60%
            on food and grocery shopping with our innovative food service.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button
              onClick={scrollToSignup}
              className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-8 py-6 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Notify Me
            </Button>
            <Button
              onClick={scrollToHowItWorks}
              variant="outline"
              className="border-2 border-orange-500 text-orange-600 hover:bg-orange-50 px-8 py-6 rounded-full text-lg font-semibold transform hover:scale-105 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right content - Phone mockup */}
        <div className="flex justify-center lg:justify-end animate-scale-in">
          <div className="relative">
            {/* Phone frame */}
            <div className="w-80 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl transform hover:rotate-2 transition-transform duration-500">
              <div className="w-full h-full bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400 rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* App preview content */}
                <div className="text-center text-white p-6">
                  <div className="flex items-center justify-center relative mb-10">
                    <Smartphone className="w-32 h-32 mx-auto animate-pulse" />
                    <img
                      src={LogoIcon}
                      alt="Daily Food Logo"
                      className="w-auto h-10 mx-auto animate-pulse absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Daily Food App</h3>
                  <p className="text-lg opacity-90">Order. Enjoy. Repeat.</p>
                </div>

                {/* Floating food icons */}
                <div className="absolute top-4 right-4 text-2xl animate-bounce">
                  🍕
                </div>
                <div className="absolute bottom-8 left-4 text-2xl animate-bounce delay-300">
                  🍔
                </div>
                <div className="absolute top-1/2 left-2 text-xl animate-pulse delay-500">
                  🍜
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold animate-pulse shadow-lg">
              !
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
