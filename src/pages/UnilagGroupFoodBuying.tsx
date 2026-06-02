import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Check,
  LoaderCircle,
  MessageCircle,
  Sandwich,
  User,
  UserRound,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import PageHeader from '@/components/PageHeader'
import FooterSection from '@/components/FooterSection'

const GOOGLE_FORM_RESPONSE_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSe6SdeNxNPIZXxC7X-GIw_7UDv0IlYoh-CnIe5HcF0x7sEEwA/formResponse'

const GOOGLE_FORM_FBVX = '8372016474292141746'

const mealOptions = [
  'Party Jollof Rice & 2 Eggs',
  'Porridge Beans & Bread',
]

const genderOptions = ['Male', 'Female']

type ContributionFormData = {
  email: string
  fullName: string
  meals: string[]
  gender: string
  whatsapp: string
  agentCode: string
}

const initialFormData: ContributionFormData = {
  email: '',
  fullName: '',
  meals: [],
  gender: '',
  whatsapp: '',
  agentCode: '',
}

export default function UnilagGroupFoodBuying() {
  const [formData, setFormData] = useState(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const hiddenFormRef = useRef<HTMLFormElement | null>(null)
  const hasPostedRef = useRef(false)

  const handleInputChange =
    (field: keyof Omit<ContributionFormData, 'meals'>) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setFormData((current) => ({ ...current, [field]: value }))
    }

  const handleMealToggle = (meal: string) => {
    setFormData((current) => {
      const meals = current.meals.includes(meal)
        ? current.meals.filter((option) => option !== meal)
        : [...current.meals, meal]

      return { ...current, meals }
    })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.email.trim()) {
      toast.error('Email is required', {
        description: 'Add the student email before submitting the form.',
      })
      return
    }

    if (!formData.fullName.trim()) {
      toast.error('Full name is required', {
        description: 'Add the student full name before submitting.',
      })
      return
    }

    if (formData.meals.length === 0) {
      toast.error('Meal choice is required', {
        description: 'Select at least one meal option before submitting.',
      })
      return
    }

    if (!formData.gender) {
      toast.error('Gender is required', {
        description: 'Select the student gender before submitting.',
      })
      return
    }

    if (!formData.whatsapp.trim()) {
      toast.error('WhatsApp contact is required', {
        description: 'Add the WhatsApp contact before submitting.',
      })
      return
    }

    if (!formData.agentCode.trim()) {
      toast.error('Agent code is required', {
        description: 'Add the agent code before submitting.',
      })
      return
    }

    hasPostedRef.current = true
    setIsSubmitting(true)

    requestAnimationFrame(() => {
      hiddenFormRef.current?.submit()
    })
  }

  const handleSubmissionFrameLoad = () => {
    if (!hasPostedRef.current) {
      return
    }

    hasPostedRef.current = false
    setIsSubmitting(false)
    setIsSubmitted(true)

    toast.success('Response sent', {
      description: 'Your details have been submitted successfully.',
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    hasPostedRef.current = false
    setIsSubmitting(false)
    setIsSubmitted(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PageHeader />

      <iframe
        name="google-form-submit-frame"
        title="Google Form submission frame"
        className="hidden"
        onLoad={handleSubmissionFrameLoad}
      />

      <form
        ref={hiddenFormRef}
        action={GOOGLE_FORM_RESPONSE_URL}
        method="POST"
        target="google-form-submit-frame"
        className="hidden"
      >
        <input type="hidden" name="emailAddress" value={formData.email} readOnly />
        <input type="hidden" name="entry.1307790311" value={formData.fullName} readOnly />
        <input type="hidden" name="entry.1434761322" value={formData.whatsapp} readOnly />
        <input type="hidden" name="entry.205829036" value={formData.agentCode} readOnly />
        <input type="hidden" name="entry.1441669755_sentinel" value="" readOnly />
        {formData.meals.map((meal) => (
          <input
            key={meal}
            type="hidden"
            name="entry.1441669755"
            value={meal}
            readOnly
          />
        ))}
        <input type="hidden" name="entry.2083395468_sentinel" value="" readOnly />
        {formData.gender ? (
          <input type="hidden" name="entry.2083395468" value={formData.gender} readOnly />
        ) : null}
        <input type="hidden" name="fvv" value="1" readOnly />
        <input type="hidden" name="pageHistory" value="0" readOnly />
        <input type="hidden" name="fbzx" value={GOOGLE_FORM_FBVX} readOnly />
        <input type="hidden" name="submissionTimestamp" value="-1" readOnly />
      </form>

      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 py-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-10 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 right-10 h-40 w-40 rounded-full bg-yellow-200/20 blur-3xl" />
          <div className="absolute right-1/4 top-1/3 h-16 w-16 animate-pulse rounded-full bg-white/10" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-sm font-semibold backdrop-blur-sm">
              <Sandwich className="h-4 w-4" />
              <span>Unilag Students Signup Form for Dailyfoodapp Group Food Buying</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Students can send their group food buying details here directly
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl">
              Fill in your details to join the Unilag group food buying signup in a
              simple, student-friendly flow.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {isSubmitted ? (
          <section className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-8 py-8 text-white">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Check className="h-7 w-7" />
                </div>
                <h2 className="text-3xl font-bold">Submission request sent</h2>
                <p className="mt-3 max-w-2xl text-base text-white/90">
                  Your signup details have been received. You can submit another response
                  or head back to the homepage.
                </p>
              </div>

              <div className="space-y-6 px-8 py-8">
                <div className="rounded-2xl border border-orange-100 bg-orange-50 p-5 text-sm text-gray-700">
                  Thank you for completing the Unilag group food buying signup form.
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Email
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {formData.email}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Full Name
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {formData.fullName || 'Not provided'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Meal Choice
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {formData.meals.length > 0
                        ? formData.meals.join(', ')
                        : 'Not provided'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Gender
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {formData.gender || 'Not provided'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button
                    type="button"
                    onClick={handleReset}
                    className="h-14 w-full sm:w-1/2 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 px-8 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:from-orange-600 hover:via-red-600 hover:to-yellow-600"
                  >
                    Submit Another Response
                  </Button>

                  <Link
                    to="/"
                    className="inline-flex h-14 w-full sm:w-1/2 items-center justify-center gap-2 rounded-full border border-orange-200 bg-white px-8 text-base font-semibold !text-gray-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-orange-300 hover:!text-orange-600 hover:shadow-md"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back to home
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 px-8 py-8">
                <h2 className="text-3xl font-bold text-gray-900">Student contribution details</h2>
                <p className="mt-3 max-w-2xl text-gray-600">
                  Complete all the details below to join the Unilag group food buying
                  signup.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 px-8 py-8">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base font-semibold text-gray-800">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    placeholder="student@email.com"
                    className="h-13 rounded-2xl border-orange-100 focus-visible:ring-orange-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="fullName"
                    className="text-base font-semibold text-gray-800"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange('fullName')}
                    placeholder="Your full name"
                    className="h-13 rounded-2xl border-orange-100 focus-visible:ring-orange-400"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-800">
                    Choose Meal <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid gap-3">
                    {mealOptions.map((meal) => {
                      const selected = formData.meals.includes(meal)

                      return (
                        <button
                          key={meal}
                          type="button"
                          onClick={() => handleMealToggle(meal)}
                          className={`flex items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                            selected
                              ? 'border-orange-500 bg-orange-50 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/40'
                          }`}
                        >
                          <span className="font-medium text-gray-800">{meal}</span>
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                              selected
                                ? 'border-orange-500 bg-orange-500 text-white'
                                : 'border-gray-300 bg-white text-transparent'
                            }`}
                          >
                            <Check className="h-4 w-4" />
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold text-gray-800">
                    Gender <span className="text-red-500">*</span>
                  </Label>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {genderOptions.map((option) => {
                      const selected = formData.gender === option

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setFormData((current) => ({
                              ...current,
                              gender: current.gender === option ? '' : option,
                            }))
                          }
                          className={`rounded-2xl border px-5 py-4 text-left font-medium transition-all ${
                            selected
                              ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-sm'
                              : 'border-gray-200 bg-white text-gray-800 hover:border-orange-200 hover:bg-orange-50/40'
                          }`}
                        >
                          {option}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="whatsapp"
                    className="text-base font-semibold text-gray-800"
                  >
                    WhatsApp Contact <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    value={formData.whatsapp}
                    onChange={handleInputChange('whatsapp')}
                    placeholder="+234 XXX XXX XXXX"
                    className="h-13 rounded-2xl border-orange-100 focus-visible:ring-orange-400"
                  />
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="agentCode"
                    className="text-base font-semibold text-gray-800"
                  >
                    Agent Code <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="agentCode"
                    type="text"
                    required
                    value={formData.agentCode}
                    onChange={handleInputChange('agentCode')}
                    placeholder="Enter your referral code"
                    className="h-13 rounded-2xl border-orange-100 focus-visible:ring-orange-400"
                  />
                  <p className="text-sm leading-relaxed text-gray-500">
                    You must be referred by an agent. If you do not have a code yet,
                    contact <span className="font-semibold text-gray-700">08179873301</span> on
                    WhatsApp for an agent code near you.
                  </p>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-14 w-full rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:from-orange-600 hover:via-red-600 hover:to-yellow-600"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <LoaderCircle className="h-5 w-5 animate-spin" />
                      Sending Response...
                    </span>
                  ) : (
                    'Submit Student Response'
                  )}
                </Button>
              </form>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-gray-900 p-8 text-white shadow-2xl">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <UserRound className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold">Before you submit</h3>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-200">
                  <p>Provide your correct student details exactly as you want them recorded.</p>
                  <p>Choose your preferred meal option and confirm your WhatsApp contact is active.</p>
                  <p>Keep your agent code ready before submitting your signup.</p>
                </div>
              </div>

              <div className="rounded-3xl bg-white p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900">Information required</h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-orange-50 px-4 py-3">
                    <User className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-700">Student name and gender</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
                    <Sandwich className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-gray-700">Preferred meal selection</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-4 py-3">
                    <MessageCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-700">WhatsApp number and agent code</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-yellow-100 to-orange-100 p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-900">Need a referral code?</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  The form owner asks students without an agent code to request one on
                  WhatsApp via <span className="font-semibold">08179873301</span>.
                </p>
              </div>
            </aside>
          </section>
        )}
      </main>

      <FooterSection />
    </div>
  )
}
