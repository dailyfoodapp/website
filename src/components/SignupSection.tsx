import { useState, useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, MessageCircle, Bell } from 'lucide-react'
import { toast } from 'sonner'

const SignupSection = () => {
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !whatsapp) {
      toast.error("Missing Information", {
        description: "Please fill in both email and WhatsApp number",
      });
      return;
    }
  
    startTransition(async () => {
      try {
        const response = await fetch(
          "https://api.general.abincii.online/api/v1/waitlist/join",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: whatsapp,
              email,
              referralSource: "Waitlist Form",
            }),
          }
        );
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message || result.error || "Submission failed");
        }
  
  
        toast.success("Success! 🎉", {
          description: "You're on the waitlist! We'll notify you when we launch.",
        });
  
        setEmail("");
        setWhatsapp("");

      } catch (err: unknown) {
        toast.error("Something went wrong", {
          description: err instanceof Error ? err.message : "Could not join the waitlist.",
        });
      }
    });
  };
  
  return (
    <section
      id="signup-form"
      className="relative overflow-hidden bg-gradient-to-br from-orange-100 via-red-50 to-yellow-100 py-20"
    >
      {/* Background animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-10 h-32 w-32 animate-pulse rounded-full bg-orange-200 opacity-30"></div>
        <div className="absolute bottom-20 right-1/4 h-24 w-24 animate-bounce rounded-full bg-red-200 opacity-30"></div>
        <div className="absolute left-10 top-1/2 h-20 w-20 animate-pulse rounded-full bg-yellow-200 opacity-30 delay-300"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4">
        {/* Section header */}
        <div className="animate-fade-in mb-12 text-center">
          <div className="mb-6 inline-flex animate-pulse items-center gap-2 rounded-full bg-orange-500 px-6 py-2 text-white">
            <Bell className="h-5 w-5" />
            <span className="font-semibold">Join the Waitlist</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-gray-900 lg:text-4xl">
            Be Among the First to
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              {' '}
              Experience It
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
            Stay informed and secure early access, discounts, and launch
            updates.
          </p>
        </div>

        {/* Signup form */}
        <div className="animate-scale-in transform rounded-2xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:scale-105 lg:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email input */}
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="flex items-center gap-2 text-lg font-semibold text-gray-700"
              >
                <Mail className="h-5 w-5 text-orange-500" />
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
                disabled={isPending}
                className="h-14 rounded-xl border-2 border-gray-200 text-lg transition-colors duration-300 focus:border-orange-500"
              />
            </div>

            {/* WhatsApp input */}
            <div className="space-y-3">
              <Label
                htmlFor="whatsapp"
                className="flex items-center gap-2 text-lg font-semibold text-gray-700"
              >
                <MessageCircle className="h-5 w-5 text-green-500" />
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
                disabled={isPending}
                className="h-14 rounded-xl border-2 border-gray-200 text-lg transition-colors duration-300 focus:border-green-500"
              />
            </div>

            {/* Submit button */}
            <Button
              type="submit"
              disabled={isPending}
              className="h-14 w-full transform rounded-xl bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 hover:shadow-xl"
            >
              {isPending ? 'Submitting...' : 'Join the Waitlist 🚀'}
            </Button>
          </form>

          {/* Benefits list */}
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="mb-4 text-center font-semibold text-gray-800">
              What you'll get:
            </h4>
            <div className="grid gap-4 text-sm text-gray-600 sm:grid-cols-3">
              <div className="text-center">
                <span className="mb-1 block text-2xl">🎁</span>
                <span>Early access benefits</span>
              </div>
              <div className="text-center">
                <span className="mb-1 block text-2xl">💰</span>
                <span>Special launch discounts</span>
              </div>
              <div className="text-center">
                <span className="mb-1 block text-2xl">📱</span>
                <span>Launch day notification</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignupSection
