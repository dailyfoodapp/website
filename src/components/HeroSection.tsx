import { Button } from '@/components/ui/button'
import { Smartphone } from 'lucide-react'
import Logo from '@/assets/logo-color.png'
import LogoText from '@/assets/logo.png'
import LogoIcon from '@/assets/logo-image.png'

const HeroSection = () => {
  const scrollToSignup = () => {
    const signupSection = document.getElementById('signup-form')
    if (signupSection) {
      signupSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works')
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 px-4 py-12">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-10 top-20 h-20 w-20 animate-bounce rounded-full bg-orange-200 opacity-60"></div>
        <div className="absolute right-20 top-40 h-16 w-16 animate-pulse rounded-full bg-yellow-200 opacity-60"></div>
        <div className="absolute bottom-20 left-20 h-24 w-24 animate-bounce rounded-full bg-red-200 opacity-60 delay-300"></div>
        <div className="absolute bottom-40 right-10 h-12 w-12 animate-pulse rounded-full bg-orange-300 opacity-60 delay-500"></div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        {/* Left content */}
        <div className="animate-fade-in text-center lg:text-left">
          <div className="mb-6 flex gap-2">
            <img src={Logo} alt="Daily Foods Logo" className="h-10 w-auto" />
            <img
              src={LogoText}
              alt="Daily Foods Logo"
              className="h-10 w-auto"
            />
            {/* <span className="text-orange-600 font-semibold text-lg">
              Daily Foods
            </span> */}
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight text-gray-900 lg:text-6xl">
            No food for a lazy man is a pure{' '}
            <span className="animate-pulse bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 bg-clip-text text-transparent">
              bunkum
            </span>
          </h1>

          <p className="mb-8 text-xl leading-relaxed text-gray-600">
            Get ready for the ultimate savings on foods and groceries. You don't
            have to spend your arms and legs to feed anymore. Save more than 60%
            on food and grocery shopping with our innovative food service.
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <Button
              onClick={scrollToSignup}
              className="transform rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-8 py-6 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-red-600"
            >
              Notify Me
            </Button>
            <Button
              onClick={scrollToHowItWorks}
              variant="outline"
              className="transform rounded-full border-2 border-orange-500 px-8 py-6 text-lg font-semibold text-orange-600 transition-all duration-300 hover:scale-105 hover:bg-orange-50"
            >
              Learn More
            </Button>
          </div>
        </div>

        {/* Right content - Phone mockup */}
        <div className="animate-scale-in flex justify-center lg:justify-end">
          <div className="relative">
            {/* Phone frame */}
            <div className="h-96 w-80 transform rounded-3xl bg-gray-900 p-2 shadow-2xl transition-transform duration-500 hover:rotate-2">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-orange-400 via-red-400 to-yellow-400">
                {/* App preview content */}
                <div className="p-6 text-center text-white">
                  <div className="relative mb-10 flex items-center justify-center">
                    <Smartphone className="mx-auto h-32 w-32 animate-pulse" />
                    <img
                      src={LogoIcon}
                      alt="Daily Foods Logo"
                      className="absolute left-1/2 top-[40%] mx-auto h-10 w-auto -translate-x-1/2 -translate-y-1/2 animate-pulse"
                    />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold">Daily Foods App</h3>
                  <p className="text-lg opacity-90">Order. Enjoy. Repeat.</p>
                </div>

                {/* Floating food icons */}
                <div className="absolute right-4 top-4 animate-bounce text-2xl">
                  🍕
                </div>
                <div className="absolute bottom-8 left-4 animate-bounce text-2xl delay-300">
                  🍔
                </div>
                <div className="absolute left-2 top-1/2 animate-pulse text-xl delay-500">
                  🍜
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -right-4 -top-4 flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-red-500 font-bold text-white shadow-lg">
              !
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
