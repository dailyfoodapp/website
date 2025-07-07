import { useState, useEffect, useRef } from 'react'
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
} from 'lucide-react'
import './TypewriterAnimation.css'

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false)
  const taglineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px', // No margin adjustments
      }
    )

    const currentRef = taglineRef.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  const howItWorks = [
    {
      icon: ShoppingCart,
      title: 'Choose Your Plan',
      description:
        'Pick a daily meal plan, grocery subscription, or join a thrift (Asusu) group.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: MapPin,
      title: 'Real-Time Delivery',
      description:
        'Track your orders live as they move from vendor to doorstep.',
      color: 'from-red-400 to-pink-500',
    },
    {
      icon: PiggyBank,
      title: 'Save with Asusu',
      description:
        'Automate contributions to a savings plan and redeem funds for food and essentials.',
      color: 'from-green-400 to-blue-500',
    },
  ]

  const coreFeatures = [
    {
      icon: Zap,
      title: 'Daily Food Subscription',
      description:
        "Save more with food and groceries. Get fresh ingredients and meals delivered to your doorstep.",
      color: "from-orange-400 to-red-500",
    },
    {
      icon: ShoppingCart,
      title: 'Grocery Delivery Plans',
      description:
        'Farm-fresh produce and essentials with scheduled recurring deliveries, ideal for homes and mini-marts.',
      color: 'from-blue-400 to-purple-500',
    },
    {
      icon: PiggyBank,
      title: 'Asusu (Savings) Plans',
      description:
        'Create or join a savings plan with weekly/monthly auto-contributions. Use funds for food subscriptions or withdraw.',
      color: 'from-green-400 to-teal-500',
    },
    {
      icon: MapPin,
      title: 'Real-Time Tracking',
      description:
        'GPS-based tracking for every delivery. Customers, vendors, and riders see live updates.',
      color: 'from-yellow-400 to-orange-500',
    },
    {
      icon: Settings,
      title: 'Vendor Control Panel',
      description:
        'Full order visibility with manual rider assignment and easy delivery status monitoring.',
      color: 'from-purple-400 to-pink-500',
    },
    {
      icon: Brain,
      title: 'AI Food Recommendations',
      description:
        'Get food recipes and meal plans based on your preferences and dietary restrictions.',
      color: 'from-green-400 to-teal-500',
    },
    {
      icon: PiggyBank,
      title: 'Food Financing',
      description:
        'Flexible payment plans and micro-loans for food purchases. Making quality nutrition accessible to everyone. (Coming in a future version)',
      color: 'from-purple-400 to-indigo-500',
    },
  ]

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Hero Tagline */}
        <div
          ref={taglineRef}
          className="relative mb-20 flex h-[60vh] items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-orange-50 text-center"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Orbs */}
            <div className="absolute left-1/4 top-1/4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-orange-200/20 to-red-200/20 blur-xl"></div>
            <div
              className="absolute right-1/4 top-3/4 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-blue-200/20 to-purple-200/20 blur-xl"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute bottom-1/3 left-1/3 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-green-200/20 to-teal-200/20 blur-xl"
              style={{ animationDelay: '2s' }}
            ></div>

            {/* Moving Gradient Lines */}
            <div className="absolute left-0 top-0 h-1 w-full animate-pulse bg-gradient-to-r from-transparent via-orange-300/30 to-transparent"></div>
            <div
              className="absolute bottom-0 right-0 h-1 w-full animate-pulse bg-gradient-to-l from-transparent via-blue-300/30 to-transparent"
              style={{ animationDelay: '1.5s' }}
            ></div>

            {/* Geometric Shapes */}
            <div
              className="absolute right-16 top-16 h-8 w-8 rotate-45 animate-spin border-2 border-orange-300/40"
              style={{ animationDuration: '8s' }}
            ></div>
            <div
              className="absolute bottom-16 left-16 h-6 w-6 rotate-45 animate-spin border-2 border-blue-300/40"
              style={{ animationDuration: '6s', animationDirection: 'reverse' }}
            ></div>
            <div
              className="absolute right-8 top-1/2 h-4 w-4 animate-bounce rounded-full bg-red-300/40"
              style={{ animationDelay: '0.5s' }}
            ></div>
            <div
              className="absolute left-8 top-1/3 h-3 w-3 animate-bounce rounded-full bg-green-300/40"
              style={{ animationDelay: '1.2s' }}
            ></div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-gray-900 lg:text-7xl">
              <span
                className={`typewriter-base ${
                  isVisible ? 'typewriter-line-1-active' : 'typewriter-line-1'
                }`}
              >
                Daily Food App
              </span>
              <span
                className={`typewriter-base bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 bg-clip-text text-transparent ${
                  isVisible ? 'typewriter-line-2-active' : 'typewriter-line-2'
                }`}
              >
                Offers more than
              </span>
              <span
                className={`typewriter-base mt-4 text-3xl font-semibold text-gray-600 lg:text-5xl ${
                  isVisible ? 'typewriter-line-3-active' : 'typewriter-line-3'
                }`}
              >
                just food services
              </span>
            </h1>
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="animate-fade-in mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
            How It
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {' '}
              Works
            </span>
          </h2>
        </div>

        {/* How It Works Grid */}
        <div className="mb-20 grid gap-8 md:grid-cols-3">
          {howItWorks.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in group transform cursor-default rounded-2xl bg-gray-50 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`h-16 w-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-full w-full text-white" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Core Features Section */}
        <div className="animate-fade-in mb-16 text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl">
            Core
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {' '}
              Features
            </span>
          </h2>
        </div>

        {/* Core Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {coreFeatures.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in group transform cursor-default rounded-2xl bg-gray-50 p-8 transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-xl"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div
                className={`h-16 w-16 rounded-xl bg-gradient-to-br ${feature.color} mb-6 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110`}
              >
                <feature.icon className="h-full w-full text-white" />
              </div>

              <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
                {feature.title}
              </h3>

              <p className="leading-relaxed text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Use Cases */}
        <div className="mt-20 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 p-12">
          <h2 className="mb-8 text-center text-3xl font-bold text-gray-900">
            Who Is This For?
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="animate-fade-in group transform cursor-default rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-orange-200 hover:shadow-2xl">
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Briefcase className="h-full w-full text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold transition-colors duration-300 group-hover:text-blue-600">
                Busy Professionals
              </h3>
              <p className="text-gray-600">Subscribe to hot meals</p>
            </div>
            <div
              className="animate-fade-in group transform cursor-default rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-green-200 hover:shadow-2xl"
              style={{ animationDelay: '100ms' }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Home className="h-full w-full text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold transition-colors duration-300 group-hover:text-green-600">
                Families
              </h3>
              <p className="text-gray-600">
                Manage food and groceries together
              </p>
            </div>
            <div
              className="animate-fade-in group transform cursor-default rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-orange-200 hover:shadow-2xl"
              style={{ animationDelay: '200ms' }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <Store className="h-full w-full text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold transition-colors duration-300 group-hover:text-orange-600">
                Small Vendors
              </h3>
              <p className="text-gray-600">
                Use the platform to handle logistics
              </p>
            </div>
            <div
              className="animate-fade-in group transform cursor-default rounded-xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-3 hover:border-purple-200 hover:shadow-2xl"
              style={{ animationDelay: '300ms' }}
            >
              <div className="mb-4 h-12 w-12 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 p-3 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <UsersRound className="h-full w-full text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold transition-colors duration-300 group-hover:text-purple-600">
                Community Savers
              </h3>
              <p className="text-gray-600">Save together via Asusu</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="animate-fade-in mt-20 text-center">
          <h2 className="mb-12 text-3xl font-bold text-gray-900">
            Real Stories from Real Users
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="animate-fade-in group transform cursor-default rounded-2xl border border-transparent bg-gray-50 p-8 text-left transition-all duration-500 hover:-translate-y-3 hover:border-orange-200 hover:bg-white hover:shadow-2xl">
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-orange-400/10 to-red-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <p className="relative z-10 mb-4 text-lg italic text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  "As a working mom with two kids, I was drowning in weekend
                  grocery runs and meal prep. I just wanted someone to handle
                  the logistics so I could focus on my family and career. I
                  wished there was a way to get fresh groceries and hot meals
                  without the constant planning and shopping stress. This
                  platform is exactly what I was praying for."
                </p>
                <p className="relative z-10 font-semibold transition-colors duration-300 group-hover:text-orange-600">
                  — Chinwe, Marketing Manager, Lagos
                </p>
              </div>
            </div>
            <div
              className="animate-fade-in group transform cursor-default rounded-2xl border border-transparent bg-gray-50 p-8 text-left transition-all duration-500 hover:-translate-y-3 hover:border-green-200 hover:bg-white hover:shadow-2xl"
              style={{ animationDelay: '200ms' }}
            >
              <div className="relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-green-400/10 to-blue-400/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                <p className="relative z-10 mb-4 text-lg italic text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  "I wanted to eat healthier but kept failing at saving money
                  for good food. I wished someone could just take money from my
                  salary before I could spend it on other things, and only let
                  me use it for nutritious meals. The Asusu feature is literally
                  what I dreamed of - forced savings that I can only spend on
                  food."
                </p>
                <p className="relative z-10 font-semibold transition-colors duration-300 group-hover:text-green-600">
                  — Ahmed, Software Developer, Abuja
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Who Are We Section */}
        <div className="animate-fade-in mt-24 rounded-3xl bg-gradient-to-br from-gray-50 to-orange-50 p-5 lg:p-12">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Who We Are */}
            <div className="animate-fade-in group transform rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-blue-200 hover:shadow-2xl lg:p-10">
              <div className="mb-6 flex items-center">
                <div className="mr-4 h-16 w-16 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Users className="h-full w-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600">
                  Who We Are
                </h3>
              </div>

              <div className="space-y-4">
                <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  We're a passionate team of food enthusiasts, tech innovators,
                  and community builders from across Nigeria. Born out of our
                  own struggles with spending more than 70% of our earnings on
                  food, meal planning.
                </p>
                <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  Our diverse backgrounds in technology, food service, and
                  financial inclusion drive us to create solutions that truly
                  understand the daily challenges of Nigerian families and
                  working professionals.
                </p>
              </div>

              <div className="mt-6 flex items-center space-x-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                <Heart className="h-5 w-5 text-red-500" />
                <span className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
                  Built with love for our community
                </span>
              </div>
            </div>

            {/* Our Mission */}
            <div
              className="animate-fade-in group transform rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-2xl lg:p-10"
              style={{ animationDelay: '200ms' }}
            >
              <div className="mb-6 flex items-center">
                <div className="mr-4 h-16 w-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 p-4 shadow-lg transition-transform duration-300 group-hover:scale-110">
                  <Target className="h-full w-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-orange-600">
                  Our Mission
                </h3>
              </div>

              <div className="space-y-4">
                <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  We're going to make food a fundamental right of every human in
                  Africa. By making food very and easily accessible to every one
                  while building a culture of smart saving on food and groceries
                  spending.
                </p>
                <p className="leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                  We believe everyone deserves stress-free access to quality
                  meals and the financial tools to maintain healthy eating
                  habits, regardless of their busy schedule or income level.
                </p>
              </div>

              <div className="mt-6 flex items-center space-x-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-gray-500 transition-colors duration-300 group-hover:text-gray-600">
                  Innovating for a better tomorrow
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
