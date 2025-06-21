import { Button } from '@/components/ui/button'
import { Instagram, Music2, Facebook, Smartphone } from 'lucide-react'
import Logo from '@/assets/logo-footer.png'

const FooterSection = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-form')
    if (signupSection) {
      signupSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const socialLinks = [
    {
      icon: Instagram,
      href: 'https://www.instagram.com/dailyfoodapp',
      color: 'hover:text-pink-500',
    },
    {
      icon: Music2,
      href: 'https://www.tiktok.com/@dailyfoodapp',
      color: 'hover:text-black',
    },
    {
      icon: Facebook,
      href: 'https://www.facebook.com/dailyfoodapp',
      color: 'hover:text-blue-600',
    },
  ]

  return (
    <footer className="relative overflow-hidden bg-gray-900 py-16 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute left-10 top-10 text-8xl">🍕</div>
        <div className="absolute right-20 top-20 text-6xl">🍔</div>
        <div className="absolute bottom-20 left-1/4 text-7xl">🍜</div>
        <div className="absolute bottom-10 right-10 text-5xl">🍰</div>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        <div className="grid items-center gap-12 lg:grid-cols-3">
          {/* Brand section */}
          <div className="animate-fade-in text-center lg:text-left">
            <div className="mb-6 flex items-center justify-center gap-2 lg:justify-start">
              <img src={Logo} alt="Daily Foods Logo" className="h-10 w-auto" />
              {/* <span className="text-2xl font-bold">Daily Foods</span> */}
            </div>

            <p className="mb-6 leading-relaxed text-gray-300">
              Helping you to spend less on foods and groceries, and making you
              to save more on your food expenses.
            </p>

            {/* Social links */}
            <div className="flex justify-center gap-4 lg:justify-start">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  onClick={() => window.open(social.href, '_blank')}
                  className={`h-12 w-12 rounded-full bg-gray-800 hover:bg-gray-700 ${social.color} transform transition-all duration-300 hover:scale-110`}
                >
                  <social.icon className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>

          {/* App download section */}
          <div className="animate-scale-in text-center delay-300">
            <h3 className="mb-6 text-2xl font-bold">Download Soon</h3>

            <div className="space-y-4">
              {/* App Store button */}
              <div className="transform cursor-pointer rounded-xl bg-gray-800 p-4 transition-all duration-300 hover:scale-105 hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8 text-gray-400" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Coming to</div>
                    <div className="font-semibold">App Store</div>
                  </div>
                </div>
              </div>

              {/* Google Play button */}
              <div className="transform cursor-pointer rounded-xl bg-gray-800 p-4 transition-all duration-300 hover:scale-105 hover:bg-gray-700">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-8 w-8 text-gray-400" />
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Coming to</div>
                    <div className="font-semibold">Google Play</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div className="animate-fade-in text-center delay-500 lg:text-right">
            <h3 className="mb-6 text-2xl font-bold">Stay Connected</h3>

            <div className="space-y-4 text-gray-300">
              <p>
                <span className="text-orange-500">📧</span> hello@dailyfood.app
              </p>
              <p>
                <span className="text-orange-500">📱</span> Coming Soon
              </p>
              <p>
                <span className="text-orange-500">🌍</span> Launching Globally
              </p>
            </div>

            <div className="mt-8">
              <Button
                onClick={scrollToSignup}
                className="transform rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 font-semibold text-white transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600"
              >
                Get Notified
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 Daily Foods. All rights reserved. Made with ❤️ for food
            lovers.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
