import {
  Zap,
  ShoppingCart,
  PiggyBank,
  MapPin,
  Users,
  Settings,
} from "lucide-react";

const FeaturesSection = () => {
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
        "Automate contributions to a savings group and redeem funds for food and essentials.",
      color: "from-green-400 to-blue-500",
    },
  ];

  const coreFeatures = [
    {
      icon: Zap,
      title: "Daily Food Subscription",
      description:
        "Breakfast, lunch, and dinner options delivered hot from trusted restaurants or kitchens with flexible weekly or monthly plans.",
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
      title: "Asusu (Savings) Groups",
      description:
        "Create or join a savings group with weekly/monthly auto-contributions. Use funds for food subscriptions or withdraw.",
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
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* How It Works Section */}
        <div className="text-center mb-16 animate-fade-in">
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
            <div className="bg-white p-6 rounded-xl shadow-sm hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-default">
              <h3 className="font-bold text-lg mb-2">Busy Professionals</h3>
              <p className="text-gray-600">Subscribe to hot meals</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-default">
              <h3 className="font-bold text-lg mb-2">Families</h3>
              <p className="text-gray-600">
                Manage food and groceries together
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-default">
              <h3 className="font-bold text-lg mb-2">Small Vendors</h3>
              <p className="text-gray-600">
                Use the platform to handle logistics
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm hover:bg-white hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in cursor-default">
              <h3 className="font-bold text-lg mb-2">Community Groups</h3>
              <p className="text-gray-600">Save together via Asusu</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            What People Are Saying
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl">
              <p className="text-lg text-gray-600 italic mb-4">
                "I get my groceries every Friday and my lunch delivered daily —
                no stress!"
              </p>
              <p className="font-semibold">— Chinwe, Lagos</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-2xl">
              <p className="text-lg text-gray-600 italic mb-4">
                "The Asusu feature is a game-changer. I save and eat well."
              </p>
              <p className="font-semibold">— Ahmed, Abuja</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
