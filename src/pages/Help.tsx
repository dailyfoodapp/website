import { Link } from "react-router-dom";
import { ArrowLeft, Mail, MessageCircle, Search, ShoppingBag, CreditCard, MapPin, Clock, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import FooterSection from "@/components/FooterSection";

export default function Help() {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      title: "Getting Started",
      icon: HelpCircle,
      questions: [
        {
          q: "How do I create an account on DailyFood?",
          a: "Simply download the DailyFood app, click on 'Sign Up', and follow the registration process. You can sign up using your email or phone number."
        },
        {
          q: "Is DailyFood available in my area?",
          a: "We're constantly expanding our service areas. Enter your delivery address in the app to check if we deliver to your location."
        },
        {
          q: "How do I place my first order?",
          a: "Browse through our selection of meals, add items to your cart, select your delivery time, and proceed to checkout. It's that simple!"
        }
      ]
    },
    {
      title: "Orders & Delivery",
      icon: ShoppingBag,
      questions: [
        {
          q: "What are your delivery hours?",
          a: "DailyFood delivers daily from 7:00 AM to 10:00 PM. You can schedule orders in advance or order for immediate delivery during these hours."
        },
        {
          q: "How long does delivery take?",
          a: "Typical delivery time is 30-45 minutes depending on your location and restaurant preparation time. You can track your order in real-time through the app."
        },
        {
          q: "Can I modify my order after placing it?",
          a: "Orders can be modified within 5 minutes of placement. After that, please contact our support team for assistance."
        },
        {
          q: "What if my order is incorrect or missing items?",
          a: "Contact us immediately through the app or email us at support@dailyfood.app. We'll resolve the issue and ensure you get what you ordered."
        }
      ]
    },
    {
      title: "Payments",
      icon: CreditCard,
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept credit/debit cards, mobile money, and cash on delivery. All online payments are secure and encrypted."
        },
        {
          q: "Are there any delivery fees?",
          a: "Delivery fees vary based on your location and order value. Free delivery is available on orders above a certain amount."
        },
        {
          q: "How do refunds work?",
          a: "Refunds are processed within 5-7 business days to your original payment method. For cash orders, refunds are issued as credit to your DailyFood wallet."
        }
      ]
    },
    {
      title: "Account & Settings",
      icon: MapPin,
      questions: [
        {
          q: "How do I update my delivery address?",
          a: "Go to your account settings, select 'Addresses', and add or edit your delivery locations. You can save multiple addresses for convenience."
        },
        {
          q: "Can I save my favorite meals?",
          a: "Yes! Click the heart icon on any meal to add it to your favorites for quick reordering."
        },
        {
          q: "How do I delete my account?",
          a: "Contact our support team at support@dailyfood.app to request account deletion. We'll process your request within 24-48 hours."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      item =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PageHeader />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            How Can We Help You?
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Find answers to common questions or get in touch with our support team
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg text-gray-900 text-base md:text-lg bg-white border-2 border-white focus:outline-none focus:border-orange-300 focus:ring-0 placeholder:text-gray-500 transition-all shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Mail className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get help via email
            </p>
            <a
              href="mailto:support@dailyfood.app"
              className="text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors"
            >
              support@dailyfood.app
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
            <p className="text-gray-600 text-sm mb-4">
              Chat with our team
            </p>
            <button className="text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
            <p className="text-gray-600 text-sm mb-4">
              We typically respond within
            </p>
            <span className="text-purple-600 font-medium text-sm">
              24 hours
            </span>
          </div>
        </div>

        {/* FAQ Sections */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          {searchQuery && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No results found for "{searchQuery}"</p>
              <Button
                variant="outline"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </Button>
            </div>
          )}

          <div className="space-y-8">
            {(searchQuery ? filteredCategories : faqCategories).map((category, idx) => {
              const Icon = category.icon;
              return (
                <div key={idx} className="bg-white rounded-xl shadow-md p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {category.questions.map((item, qIdx) => (
                      <div key={qIdx} className="border-l-4 border-orange-500 pl-4">
                        <h4 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                          {item.q}
                        </h4>
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {item.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Still Need Help Section */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl shadow-xl p-8 md:p-12 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still Need Help?
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            Our support team is here to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:support@dailyfood.app">
              <Button
                size="lg"
                variant="secondary"
                className="gap-2 w-full sm:w-auto"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </Button>
            </a>
            <Link to="/">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-50"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
