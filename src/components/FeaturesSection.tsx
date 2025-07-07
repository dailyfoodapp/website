import { useState, useEffect, useRef } from "react";
import {
  Zap,
  ShoppingCart,
  PiggyBank,
  MapPin,
  Settings,
  Brain,
  Briefcase,
  Home,
  Store,
  UsersRound,
  Users,
  Target,
  Heart,
  Lightbulb,
} from "lucide-react";
import "./TypewriterAnimation.css";

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const taglineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: "0px", // No margin adjustments
      }
    );

    const currentRef = taglineRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const howItWorks = [
    {
      icon: ShoppingCart,
      title: "Choose Your Plan",
      description:
        "Pick a daily meal plan, grocery subscription, or join a thrift (Asusu) group.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: MapPin,
      title: "Real-Time Delivery",
      description:
        "Track your orders live as they move from vendor to doorstep.",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: PiggyBank,
      title: "Save with Asusu",
      description:
        "Automate contributions to a savings plan and redeem funds for food and essentials.",
      color: "from-green-400 to-blue-500",
    },
  ];

  const coreFeatures = [
    {
      icon: Zap,
      title: "Daily Food Subscription",
      description:
        "Save more with food and groceries. Get fresh ingredients and meals delivered to your doorstep.",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: ShoppingCart,
      title: "Grocery Delivery Plans",
      description:
        "Farm-fresh produce and essentials with scheduled recurring deliveries, ideal for homes and mini-marts.",
      color: "from-blue-400 to-purple-500",
    },
    {
      icon: PiggyBank,
      title: "Asusu (Savings) Plans",
      description:
        "Create or join a savings plan with weekly/monthly auto-contributions. Use funds for food subscriptions or withdraw.",
      color: "from-green-400 to-teal-500",
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description:
        "GPS-based tracking for every delivery. Customers, vendors, and riders see live updates.",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Settings,
      title: "Vendor Control Panel",
      description:
        "Full order visibility with manual rider assignment and easy delivery status monitoring.",
      color: "from-purple-400 to-pink-500",
    },
    {
      icon: Brain,
      title: "AI Food Recommendations",
      description:
        "Get food recipes and meal plans based on your preferences and dietary restrictions.",
      color: "from-green-400 to-teal-500",
    },
    {
      icon: PiggyBank,
      title: "Food Financing",
      description:
        "Flexible payment plans and micro-loans for food purchases. Making quality nutrition accessible to everyone. (Coming in a future version)",
      color: "from-purple-400 to-indigo-500",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Hero Tagline */}
        <div
          ref={taglineRef}
          className="relative text-center mb-20 h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-r from-orange-200/20 to-red-200/20 rounded-full blur-xl animate-pulse"></div>
            <div
              className="absolute top-3/4 right-1/4 w-40 h-40 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-r from-green-200/20 to-teal-200/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>

            {/* Moving Gradient Lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-300/30 to-transparent animate-pulse"></div>
            <div
              className="absolute bottom-0 right-0 w-full h-1 bg-gradient-to-l from-transparent via-blue-300/30 to-transparent animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>

            {/* Geometric Shapes */}
            <div
              className="absolute top-16 right-16 w-8 h-8 border-2 border-orange-300/40 rotate-45 animate-spin"
              style={{ animationDuration: "8s" }}
            ></div>
            <div
              className="absolute bottom-16 left-16 w-6 h-6 border-2 border-blue-300/40 rotate-45 animate-spin"
              style={{ animationDuration: "6s", animationDirection: "reverse" }}
            ></div>
            <div
              className="absolute top-1/2 right-8 w-4 h-4 bg-red-300/40 rounded-full animate-bounce"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-1/3 left-8 w-3 h-3 bg-green-300/40 rounded-full animate-bounce"
              style={{ animationDelay: "1.2s" }}
            ></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <h1 className="text-4xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              <span
                className={`typewriter-base ${
                  isVisible ? "typewriter-line-1-active" : "typewriter-line-1"
                }`}
              >
                Daily Food App
              </span>
              <span
                className={`typewriter-base text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 ${
                  isVisible ? "typewriter-line-2-active" : "typewriter-line-2"
                }`}
              >
                Offers more than
              </span>
              <span
                className={`typewriter-base text-3xl lg:text-5xl font-semibold text-gray-600 mt-4 ${
                  isVisible ? "typewriter-line-3-active" : "typewriter-line-3"
                }`}
              >
                just food services
              </span>
            </h1>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How It
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              {" "}
              Works
            </span>
          </h2>
        </div>

        {/* How It Works Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {howItWorks.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-default"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <feature.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Features Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Core
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
              {" "}
              Features
            </span>
          </h2>
        </div>

        {/* Core Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-default"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`w-16 h-16 rounded-xl bg-gradient-to-br ${feature.color} p-4 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <feature.icon className="w-full h-full text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mt-20 bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Who Is This For?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in cursor-default border border-gray-100 hover:border-orange-200">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Briefcase className="w-full h-full text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors duration-300">
                Busy Professionals
              </h3>
              <p className="text-gray-600">Subscribe to hot meals</p>
            </div>
            <div
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in cursor-default border border-gray-100 hover:border-green-200"
              style={{ animationDelay: "100ms" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Home className="w-full h-full text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-green-600 transition-colors duration-300">
                Families
              </h3>
              <p className="text-gray-600">
                Manage food and groceries together
              </p>
            </div>
            <div
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in cursor-default border border-gray-100 hover:border-orange-200"
              style={{ animationDelay: "200ms" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <Store className="w-full h-full text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors duration-300">
                Small Vendors
              </h3>
              <p className="text-gray-600">
                Use the platform to handle logistics
              </p>
            </div>
            <div
              className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in cursor-default border border-gray-100 hover:border-purple-200"
              style={{ animationDelay: "300ms" }}
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 p-3 mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                <UsersRound className="w-full h-full text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2 group-hover:text-purple-600 transition-colors duration-300">
                Community Savers
              </h3>
              <p className="text-gray-600">Save together via Asusu</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 text-center animate-fade-in">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Real Stories from Real Users
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group bg-gray-50 p-8 rounded-2xl text-left hover:bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in cursor-default border border-transparent hover:border-orange-200">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400/10 to-red-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <p className="text-lg text-gray-600 italic mb-4 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  "As a working mom with two kids, I was drowning in weekend
                  grocery runs and meal prep. I just wanted someone to handle
                  the logistics so I could focus on my family and career. I
                  wished there was a way to get fresh groceries and hot meals
                  without the constant planning and shopping stress. This
                  platform is exactly what I was praying for."
                </p>
                <p className="font-semibold relative z-10 group-hover:text-orange-600 transition-colors duration-300">
                  — Chinwe, Marketing Manager, Lagos
                </p>
              </div>
            </div>
            <div
              className="group bg-gray-50 p-8 rounded-2xl text-left hover:bg-white hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in cursor-default border border-transparent hover:border-green-200"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                <p className="text-lg text-gray-600 italic mb-4 relative z-10 group-hover:text-gray-700 transition-colors duration-300">
                  "I wanted to eat healthier but kept failing at saving money
                  for good food. I wished someone could just take money from my
                  salary before I could spend it on other things, and only let
                  me use it for nutritious meals. The Asusu feature is literally
                  what I dreamed of - forced savings that I can only spend on
                  food."
                </p>
                <p className="font-semibold relative z-10 group-hover:text-green-600 transition-colors duration-300">
                  — Ahmed, Software Developer, Abuja
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Are We Section */}
        <div className="mt-24 bg-gradient-to-br from-gray-50 to-orange-50 rounded-3xl p-5 lg:p-12 animate-fade-in">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Who We Are */}
            <div className="group bg-white p-5 lg:p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in border border-gray-100 hover:border-blue-200">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg mr-4">
                  <Users className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  Who We Are
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  We're a passionate team of food enthusiasts, tech innovators,
                  and community builders from across Nigeria. Born out of our
                  own struggles with spending more than 70% of our earnings on
                  food, meal planning.
                </p>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  Our diverse backgrounds in technology, food service, and
                  financial inclusion drive us to create solutions that truly
                  understand the daily challenges of Nigerian families and
                  working professionals.
                </p>
              </div>

              <div className="mt-6 flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Heart className="w-5 h-5 text-red-500" />
                <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  Built with love for our community
                </span>
              </div>
            </div>

            {/* Our Mission */}
            <div
              className="group bg-white p-5 lg:p-10 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in border border-gray-100 hover:border-orange-200"
              style={{ animationDelay: "200ms" }}
            >
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 p-4 group-hover:scale-110 transition-transform duration-300 shadow-lg mr-4">
                  <Target className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                  Our Mission
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  We're going to make food a fundamental right of every human in
                  Africa. By making food very and easily accessible to every one
                  while building a culture of smart saving on food and groceries
                  spending.
                </p>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  We believe everyone deserves stress-free access to quality
                  meals and the financial tools to maintain healthy eating
                  habits, regardless of their busy schedule or income level.
                </p>
              </div>

              <div className="mt-6 flex items-center space-x-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Lightbulb className="w-5 h-5 text-yellow-500" />
                <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  Innovating for a better tomorrow
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
