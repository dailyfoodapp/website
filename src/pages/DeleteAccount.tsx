import { Mail, Trash2, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import FooterSection from "@/components/FooterSection";

export default function DeleteAccount() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PageHeader />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16 lg:py-20 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 lg:p-12">
          {/* Title */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-md">
                <Trash2 className="w-6 h-6 md:w-7 md:h-7 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                Delete Your Account
              </h1>
            </div>
            <p className="text-gray-600 text-sm md:text-base">
              For the <strong>DailyFood</strong> app by{" "}
              <strong>Macrade Digital Services Ltd</strong>.
            </p>
            <p className="text-gray-500 text-xs md:text-sm mt-2">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {/* Intro */}
          <section className="mb-8 md:mb-10">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              We're sorry to see you go. If you'd like to permanently delete
              your DailyFood account and the personal information associated
              with it, you can do so directly from within the mobile app by
              following the steps below.
            </p>
          </section>

          {/* Steps */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              How to Request Account Deletion
            </h2>

            <ol className="space-y-4">
              {[
                {
                  title: "Open the DailyFood app",
                  body: "Launch the DailyFood app on your Android device and make sure you are signed in to the account you'd like to delete.",
                },
                {
                  title: "Go to your Profile",
                  body: 'Tap the "Profile" icon on the bottom navigation bar to open your account screen.',
                },
                {
                  title: 'Tap "Delete Account"',
                  body: 'Scroll to the bottom of your profile screen and tap "Delete Account".',
                },
                {
                  title: "Tell us why you're leaving",
                  body: "You'll be asked to provide a short reason for deleting your account. This feedback helps us improve DailyFood for other users.",
                },
                {
                  title: "Confirm with your password",
                  body: "For your security, you will be asked to re-enter your account password to confirm the deletion request.",
                },
                {
                  title: "Submit the request",
                  body: 'Tap "Confirm Delete". Your account will be scheduled for deletion and you will be signed out of the app immediately.',
                },
              ].map((step, i) => (
                <li
                  key={i}
                  className="flex gap-4 p-4 md:p-5 rounded-xl bg-orange-50/50 border border-orange-100"
                >
                  <div className="flex-shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-white font-bold text-sm md:text-base flex items-center justify-center shadow-sm">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* Alternative: contact support */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Can't Access the App?
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              If you are unable to sign in or no longer have access to the
              DailyFood app, you can request account deletion by emailing our
              support team from the email address registered to your account.
              Please include the subject line{" "}
              <strong>"Account Deletion Request"</strong> along with the full
              name and phone number on your account so we can verify your
              identity.
            </p>
            <a
              href="mailto:support@dailyfood.app?subject=Account%20Deletion%20Request"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm md:text-base transition-colors"
            >
              <Mail className="w-5 h-5" />
              support@dailyfood.app
            </a>
          </section>

          {/* Data deleted */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Data Is Deleted
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              When your account deletion request is processed, the following
              personal data is permanently removed from our active systems:
            </p>
            <ul className="space-y-3">
              {[
                "Your name, email address, phone number, and profile photo",
                "Saved delivery and billing addresses",
                "Saved payment method references (card tokens)",
                "Your favourites, saved items, and shopping lists",
                "Your in-app preferences, notification settings, and feedback you've submitted",
                "Device identifiers and push-notification tokens linked to your account",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm md:text-base leading-relaxed">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </section>

          {/* Data kept */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              What Data Is Kept (and Why)
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-4">
              In order to comply with our legal, accounting, tax, and
              fraud-prevention obligations, a limited amount of information may
              be retained after your account is deleted:
            </p>
            <ul className="space-y-3">
              {[
                {
                  label: "Order and transaction records",
                  detail:
                    "Order history, receipts, and payment records are retained for up to 7 years to meet tax, accounting, and consumer-protection laws. These records are disassociated from your profile and stored in restricted-access systems.",
                },
                {
                  label: "Fraud and abuse signals",
                  detail:
                    "Limited information used to prevent fraud, chargebacks, or platform abuse (such as flagged device identifiers) may be retained for up to 2 years.",
                },
                {
                  label: "Anonymous, aggregated analytics",
                  detail:
                    "Aggregated, non-identifying usage statistics may be retained indefinitely. This data cannot be used to identify or contact you.",
                },
                {
                  label: "Encrypted backups",
                  detail:
                    "Residual copies of your data may remain in our encrypted backups for up to 90 days, after which they are overwritten in the normal backup rotation.",
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-100"
                >
                  <Clock className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-gray-900 text-sm md:text-base mb-1">
                      {item.label}
                    </p>
                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Timeline */}
          <section className="mb-8 md:mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How Long Does Deletion Take?
            </h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Once you confirm your request with your password, your account is
              immediately deactivated and you are signed out. Personal data in
              our active systems is permanently deleted within{" "}
              <strong>30 days</strong>. Residual copies in encrypted backups
              are overwritten within <strong>90 days</strong>. Records we are
              legally required to keep are retained for the periods described
              above.
            </p>
          </section>

          {/* Important note */}
          <section className="mb-8 md:mb-10">
            <div className="flex items-start gap-3 p-4 md:p-5 rounded-xl bg-red-50 border border-red-200">
              <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-red-900 text-sm md:text-base mb-1">
                  Account deletion is permanent
                </p>
                <p className="text-red-800 text-sm md:text-base leading-relaxed">
                  Once your account is deleted, it cannot be recovered. You
                  will lose access to your order history, saved addresses,
                  favourites, and any in-app credits or rewards. If you change
                  your mind later, you will need to create a new account.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="mt-12 pt-8 border-t border-gray-200">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Questions?
            </h2>
            <p className="text-gray-700 text-sm md:text-base mb-4">
              If you have any questions about deleting your account or how we
              handle your data, contact us at:
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
