import { Mail } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import FooterSection from "@/components/FooterSection";

export default function Legal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PageHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 lg:p-12">
          {/* Title */}
          <div className="mb-8 md:mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              Legal Information
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>

          {/* Terms of Service */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Terms of Service
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                Welcome to DailyFood! By accessing or using our service, you agree to be bound by these Terms of Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Acceptance of Terms
              </h3>
              <p>
                By accessing and using DailyFood, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our service.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. Use of Service
              </h3>
              <p>
                DailyFood provides a platform for food discovery and delivery services. You agree to use the service only for lawful purposes and in accordance with these Terms.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. User Accounts
              </h3>
              <p>
                You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. Intellectual Property
              </h3>
              <p>
                All content, features, and functionality of DailyFood are owned by us and are protected by international copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. Limitation of Liability
              </h3>
              <p>
                DailyFood shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
              </p>
            </div>
          </section>

          {/* Privacy Policy */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Privacy Policy
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                At DailyFood, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                1. Information We Collect
              </h3>
              <p>
                We collect information you provide directly to us, such as your name, email address, phone number, and delivery address. We also collect information about your usage of our service and device information.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                2. How We Use Your Information
              </h3>
              <p>
                We use the information we collect to provide, maintain, and improve our services, to process your orders, to communicate with you, and to personalize your experience.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                3. Information Sharing
              </h3>
              <p>
                We do not share your personal information with third parties except as necessary to provide our services, comply with legal obligations, or with your consent.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                4. Data Security
              </h3>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                5. Your Rights
              </h3>
              <p>
                You have the right to access, update, or delete your personal information at any time. You may also opt out of marketing communications.
              </p>
            </div>
          </section>

          {/* Cookie Policy */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Cookie Policy
            </h2>
            <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
              <p>
                DailyFood uses cookies and similar technologies to enhance your experience on our platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                What Are Cookies?
              </h3>
              <p>
                Cookies are small text files stored on your device that help us improve our service by remembering your preferences and understanding how you use our platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Types of Cookies We Use
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Essential Cookies:</strong> Necessary for the website to function properly</li>
                <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our website</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences and personalize your experience</li>
                <li><strong>Marketing Cookies:</strong> Track your activity to deliver relevant advertisements</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">
                Managing Cookies
              </h3>
              <p>
                You can control and manage cookies through your browser settings. However, disabling cookies may affect your ability to use certain features of our service.
              </p>
            </div>
          </section>

          {/* Contact Information */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h2>
            <p className="text-gray-700 text-sm md:text-base mb-4">
              If you have any questions about these legal terms, please contact us:
            </p>
            <a
              href="mailto:support@dailyfood.app"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm md:text-base transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@dailyfood.app
            </a>
          </section>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
