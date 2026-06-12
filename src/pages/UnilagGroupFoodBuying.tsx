import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  CalendarDays,
  Check,
  Clock,
  Copy,
  Info,
  LoaderCircle,
  MessageCircle,
  Sandwich,
  Upload,
  User,
  UserRound,
  Utensils,
  X,
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

const DRAFT_KEY = 'unilag-gfb-draft-v1'
const PROFILE_KEY = 'unilag-gfb-profile-v1'

const WHATSAPP_NUMBER = '08179873301'
const WHATSAPP_LINK = `https://wa.me/2348179873301?text=${encodeURIComponent(
  "Hi, here is my payment receipt for the Dailyfoodapp Unilag group food buying. (Please attach your receipt screenshot to this chat.)",
)}`

const PAYMENT_DETAILS = {
  accountNumber: '2007571250',
  bank: 'FCMB',
  accountName: 'Macrade Digital Services LTD',
}

const ORDER_CUTOFF_NOTE =
  'Place your order before 1:00 PM daily to receive your food the next day morning.'

type Weekday =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

type MealCategory = 'rice' | 'beans' | 'swallow'

type DailyMealAvailability = {
  foods: string
  categories: MealCategory[]
}

const dailyMealAvailability: Partial<Record<Weekday, DailyMealAvailability>> = {
  Monday: { foods: 'Rice and swallow', categories: ['rice', 'swallow'] },
  Tuesday: { foods: 'Rice and swallow', categories: ['rice', 'swallow'] },
  Wednesday: { foods: 'Rice and beans', categories: ['rice', 'beans'] },
  Thursday: { foods: 'Rice and beans', categories: ['rice', 'beans'] },
  Friday: { foods: 'Swallow and beans', categories: ['swallow', 'beans'] },
}

const noMealAvailability: DailyMealAvailability = {
  foods: 'No meals scheduled for today',
  categories: [],
}

const getLagosWeekday = (): Weekday =>
  new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    timeZone: 'Africa/Lagos',
  }).format(new Date()) as Weekday

type MenuItem = {
  id: string
  name: string
  price: number
  category: MealCategory
  hasExtras?: boolean
}

const menu: MenuItem[] = [
  { id: 'jollof', name: 'Party Jollof Rice & Egg', price: 1600, category: 'rice' },
  { id: 'beans-potato', name: 'Beans & Potato', price: 1200, category: 'beans' },
  { id: 'beans-bread', name: 'Beans & Bread', price: 1400, category: 'beans' },
  { id: 'egusi', name: 'Egusi', price: 1700, category: 'swallow', hasExtras: true },
]

const swallowOptions = ['Eba', 'Fufu']
const proteinOptions = ['Beef', 'Chicken', 'Fish']
const genderOptions = ['Male', 'Female']

const steps = [
  { id: 1, label: 'Choose Meal' },
  { id: 2, label: 'Make Payment' },
  { id: 3, label: 'Your Details' },
]

type ContributionFormData = {
  email: string
  fullName: string
  meals: string[]
  egusiSwallow: string
  egusiProtein: string
  gender: string
  whatsapp: string
  agentCode: string
}

const initialFormData: ContributionFormData = {
  email: '',
  fullName: '',
  meals: [],
  egusiSwallow: '',
  egusiProtein: '',
  gender: '',
  whatsapp: '',
  agentCode: '',
}

const naira = (amount: number) => `₦${amount.toLocaleString('en-NG')}`

const safeParse = <T,>(key: string): T | null => {
  try {
    const value = localStorage.getItem(key)
    return value ? (JSON.parse(value) as T) : null
  } catch {
    return null
  }
}

const buildInitialFormData = (): ContributionFormData => {
  const draft = safeParse<{ formData?: Partial<ContributionFormData> }>(DRAFT_KEY)
  if (draft?.formData) {
    return { ...initialFormData, ...draft.formData }
  }

  const profile = safeParse<Partial<ContributionFormData>>(PROFILE_KEY)
  if (profile) {
    return { ...initialFormData, ...profile }
  }

  return initialFormData
}

const profileFromFormData = (data: ContributionFormData) => ({
  email: data.email,
  fullName: data.fullName,
  gender: data.gender,
  whatsapp: data.whatsapp,
  agentCode: data.agentCode,
})

export default function UnilagGroupFoodBuying() {
  const [searchParams, setSearchParams] = useSearchParams()
  const stepParam = Number(searchParams.get('step'))
  const step = [1, 2, 3].includes(stepParam) ? stepParam : 1

  const [formData, setFormData] = useState<ContributionFormData>(buildInitialFormData)
  const [proofImage, setProofImage] = useState<string>(
    () => safeParse<{ proofImage?: string }>(DRAFT_KEY)?.proofImage ?? '',
  )
  const [showProfilePrompt, setShowProfilePrompt] = useState<boolean>(() => {
    const draft = safeParse<unknown>(DRAFT_KEY)
    return !draft && !!safeParse<unknown>(PROFILE_KEY)
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [currentWeekday, setCurrentWeekday] = useState<Weekday>(getLagosWeekday)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const hiddenFormRef = useRef<HTMLFormElement | null>(null)
  const hasPostedRef = useRef(false)

  const todayMealAvailability =
    dailyMealAvailability[currentWeekday] ?? noMealAvailability
  const availableMenu = useMemo(
    () =>
      menu.filter((item) =>
        todayMealAvailability.categories.includes(item.category),
      ),
    [todayMealAvailability.categories],
  )
  const availableMealIds = useMemo(
    () => new Set(availableMenu.map((item) => item.id)),
    [availableMenu],
  )

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentWeekday(getLagosWeekday())
    }, 60 * 1000)

    return () => window.clearInterval(interval)
  }, [])

  useEffect(() => {
    setFormData((current) => {
      const meals = current.meals.filter((id) => availableMealIds.has(id))

      if (meals.length === current.meals.length) {
        return current
      }

      return {
        ...current,
        meals,
        egusiSwallow: meals.includes('egusi') ? current.egusiSwallow : '',
        egusiProtein: meals.includes('egusi') ? current.egusiProtein : '',
      }
    })
  }, [availableMealIds])

  // Autosave the whole flow (step + answers + receipt) so a clumsy refresh or
  // reload never loses progress and everything can be retrieved.
  useEffect(() => {
    const payload = { step, formData, proofImage }
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(payload))
    } catch {
      // The receipt image can push us past the storage quota — keep the text
      // answers at least and drop the image from the persisted draft.
      try {
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ ...payload, proofImage: '' }),
        )
      } catch {
        // Storage unavailable (private mode); nothing else we can do safely.
      }
    }
  }, [step, formData, proofImage])

  const goToStep = (next: number) => {
    setSearchParams({ step: String(next) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const total = formData.meals.reduce(
    (sum, id) => sum + (menu.find((item) => item.id === id)?.price ?? 0),
    0,
  )

  const handleInputChange =
    (field: keyof ContributionFormData) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target
      setFormData((current) => ({ ...current, [field]: value }))
    }

  const handleMealToggle = (id: string) => {
    if (!availableMealIds.has(id)) {
      return
    }

    setFormData((current) => {
      const selected = current.meals.includes(id)
      const meals = selected
        ? current.meals.filter((meal) => meal !== id)
        : [...current.meals, id]

      // Clear the Egusi extras when Egusi is deselected.
      if (id === 'egusi' && selected) {
        return { ...current, meals, egusiSwallow: '', egusiProtein: '' }
      }

      return { ...current, meals }
    })
  }

  const handleProofUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image', {
        description: 'A screenshot or photo of your payment receipt works best.',
      })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const img = new Image()
      img.onload = () => {
        // Downscale + compress so the receipt comfortably fits in localStorage.
        const maxDim = 1200
        let { width, height } = img
        if (width > height && width > maxDim) {
          height = Math.round((height * maxDim) / width)
          width = maxDim
        } else if (height >= width && height > maxDim) {
          width = Math.round((width * maxDim) / height)
          height = maxDim
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx?.drawImage(img, 0, 0, width, height)

        setProofImage(canvas.toDataURL('image/jpeg', 0.7))
        toast.success('Receipt added', {
          description: 'Remember to also forward it on WhatsApp.',
        })
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  const copyAccountNumber = async () => {
    try {
      await navigator.clipboard.writeText(PAYMENT_DETAILS.accountNumber)
      toast.success('Account number copied')
    } catch {
      toast.error('Could not copy', {
        description: `Please copy it manually: ${PAYMENT_DETAILS.accountNumber}`,
      })
    }
  }

  const validateStep1 = () => {
    if (availableMenu.length === 0) {
      toast.error('No meals available today', {
        description: 'Please check back on the next ordering day.',
      })
      return false
    }

    if (formData.meals.length === 0) {
      toast.error('Select a meal', {
        description: "Pick at least one of today's meals to continue.",
      })
      return false
    }

    if (formData.meals.includes('egusi')) {
      if (!formData.egusiSwallow) {
        toast.error('Choose your swallow', {
          description: 'Select either Eba or Fufu for your Egusi.',
        })
        return false
      }
      if (!formData.egusiProtein) {
        toast.error('Choose your protein', {
          description: 'Select a protein to go with your Egusi.',
        })
        return false
      }
    }

    return true
  }

  const validateStep2 = () => {
    if (!proofImage) {
      toast.error('Upload proof of payment', {
        description: 'Add a screenshot or photo of your transfer receipt.',
      })
      return false
    }
    return true
  }

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return
    if (step === 2 && !validateStep2()) return
    goToStep(step + 1)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!formData.email.trim()) {
      toast.error('Email is required', {
        description: 'Add your email before submitting the form.',
      })
      return
    }

    if (!formData.fullName.trim()) {
      toast.error('Full name is required', {
        description: 'Add your full name before submitting.',
      })
      return
    }

    if (!formData.gender) {
      toast.error('Gender is required', {
        description: 'Select your gender before submitting.',
      })
      return
    }

    if (!formData.whatsapp.trim()) {
      toast.error('WhatsApp contact is required', {
        description: 'Add your WhatsApp contact before submitting.',
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

    // Remember the student's details for next time and clear the working draft.
    try {
      localStorage.setItem(PROFILE_KEY, JSON.stringify(profileFromFormData(formData)))
      localStorage.removeItem(DRAFT_KEY)
    } catch {
      // Ignore storage errors — submission already succeeded.
    }

    toast.success('Response sent', {
      description: 'Your details have been submitted successfully.',
    })

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleReset = () => {
    hasPostedRef.current = false
    setIsSubmitting(false)
    setIsSubmitted(false)

    // Start a fresh order, but keep the saved personal details as defaults.
    const profile = safeParse<Partial<ContributionFormData>>(PROFILE_KEY)
    setFormData({ ...initialFormData, ...(profile ?? {}) })
    setProofImage('')
    setShowProfilePrompt(!!profile)
    goToStep(1)
  }

  // The exact strings sent to the Google Form, with Egusi extras inlined.
  const mealSubmissionValues = formData.meals.map((id) => {
    const item = menu.find((meal) => meal.id === id)
    if (id === 'egusi') {
      return `Egusi (${formData.egusiSwallow || '—'}, ${formData.egusiProtein || '—'})`
    }
    return item?.name ?? id
  })

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
        <input
          type="hidden"
          name="entry.1441669755"
          value={mealSubmissionValues.join(', ')}
          readOnly
        />
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
              <span>Ordering is now open for Unilag students</span>
            </div>

            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
              Join the group food buying in 3 simple steps
            </h1>
            <p className="mx-auto max-w-3xl text-lg text-white/90 md:text-xl">
              Choose your meal, pay and upload your receipt, then complete your
              details. Your progress is saved automatically as you go.
            </p>
            <div className="mx-auto mt-6 inline-flex max-w-3xl items-center gap-3 rounded-2xl bg-white/15 px-5 py-4 text-left text-sm font-semibold text-white shadow-lg backdrop-blur-sm sm:text-base">
              <Clock className="h-5 w-5 shrink-0" />
              <span>{ORDER_CUTOFF_NOTE}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 md:py-16">
        {isSubmitted ? (
          <section className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 px-6 py-8 text-white sm:px-8">
                <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                  <Check className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-bold sm:text-3xl">Submission request sent</h2>
                <p className="mt-3 max-w-2xl text-base text-white/90">
                  Your signup details have been received. Make sure you have also
                  forwarded your payment receipt on WhatsApp.
                </p>
              </div>

              <div className="space-y-6 px-6 py-8 sm:px-8">
                <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                  <p className="font-bold text-green-900">
                    One last step — send your receipt on WhatsApp
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-green-800">
                    Your payment is only confirmed once you send your receipt to{' '}
                    <span className="font-semibold">{WHATSAPP_NUMBER}</span>. Tap below
                    and attach your receipt in the chat.
                  </p>
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 text-base font-bold !text-white shadow-md transition-colors hover:bg-green-700 sm:w-auto sm:px-8"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Send receipt on WhatsApp
                  </a>
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
                      {mealSubmissionValues.length > 0
                        ? mealSubmissionValues.join(', ')
                        : 'Not provided'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                    <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                      Amount Paid
                    </p>
                    <p className="mt-2 text-lg font-semibold text-gray-900">
                      {naira(total)}
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
              {/* Step indicator */}
              <div className="border-b border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 px-5 py-5 sm:px-8 sm:py-6">
                <div className="flex items-center">
                  {steps.map((item, index) => {
                    const isComplete = step > item.id
                    const isActive = step === item.id

                    return (
                      <div key={item.id} className="flex flex-1 items-center last:flex-none">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                              isComplete
                                ? 'bg-green-500 text-white'
                                : isActive
                                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow'
                                  : 'bg-white text-gray-400 ring-1 ring-gray-200'
                            }`}
                          >
                            {isComplete ? <Check className="h-5 w-5" /> : item.id}
                          </span>
                          <span
                            className={`hidden text-sm font-semibold sm:block ${
                              isActive ? 'text-gray-900' : 'text-gray-500'
                            }`}
                          >
                            {item.label}
                          </span>
                        </div>
                        {index < steps.length - 1 ? (
                          <div
                            className={`mx-3 h-0.5 flex-1 rounded-full ${
                              isComplete ? 'bg-green-500' : 'bg-gray-200'
                            }`}
                          />
                        ) : null}
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="px-5 py-8 sm:px-8">
                {/* STEP 1 — Choose meal */}
                {step === 1 ? (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Step 1 — Select your food
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Today is {currentWeekday}. Tap one or more meals available
                        today. The total updates automatically and you will pay it in
                        the next step.
                      </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-orange-100 bg-orange-50/50">
                      <div className="flex items-start gap-3 border-b border-orange-100 bg-white px-5 py-4">
                        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-orange-600">
                          <CalendarDays className="h-5 w-5" />
                        </span>
                        <div>
                          <h3 className="font-bold text-gray-900">
                            Today's meals
                          </h3>
                          <p className="mt-1 text-sm leading-relaxed text-gray-600">
                            {ORDER_CUTOFF_NOTE}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-1 bg-white/70 px-5 py-4 sm:grid-cols-[8rem_1fr] sm:gap-4">
                        <p className="text-sm font-semibold uppercase tracking-wide text-orange-700">
                          {currentWeekday}
                        </p>
                        <p className="font-semibold text-gray-900">
                          {todayMealAvailability.foods}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      {availableMenu.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-5 py-6 text-center">
                          <p className="font-semibold text-gray-900">
                            No meals are available today.
                          </p>
                          <p className="mt-1 text-sm text-gray-600">
                            Please check back on the next ordering day.
                          </p>
                        </div>
                      ) : null}

                      {availableMenu.map((item) => {
                        const selected = formData.meals.includes(item.id)

                        return (
                          <div key={item.id}>
                            <button
                              type="button"
                              onClick={() => handleMealToggle(item.id)}
                              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-all ${
                                selected
                                  ? 'border-orange-500 bg-orange-50 shadow-sm'
                                  : 'border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/40'
                              }`}
                            >
                              <span className="flex flex-col">
                                <span className="font-semibold text-gray-800">
                                  {item.name}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {naira(item.price)}
                                  {item.hasExtras
                                    ? ' · comes with a swallow & protein'
                                    : ''}
                                </span>
                              </span>
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

                            {/* Egusi extras */}
                            {item.id === 'egusi' && selected ? (
                              <div className="mt-3 space-y-5 rounded-2xl border border-orange-100 bg-orange-50/50 p-4 sm:p-5">
                                <div className="space-y-3">
                                  <Label className="text-sm font-semibold text-gray-800">
                                    Choose your swallow{' '}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <div className="grid grid-cols-2 gap-3">
                                    {swallowOptions.map((option) => {
                                      const active = formData.egusiSwallow === option
                                      return (
                                        <button
                                          key={option}
                                          type="button"
                                          onClick={() =>
                                            setFormData((current) => ({
                                              ...current,
                                              egusiSwallow: option,
                                            }))
                                          }
                                          className={`rounded-xl border px-2 py-3 text-sm font-medium transition-all sm:px-4 ${
                                            active
                                              ? 'border-orange-500 bg-white text-orange-700 shadow-sm'
                                              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-200'
                                          }`}
                                        >
                                          {option}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>

                                <div className="space-y-3">
                                  <Label className="text-sm font-semibold text-gray-800">
                                    Choose your protein{' '}
                                    <span className="text-red-500">*</span>
                                  </Label>
                                  <div className="grid grid-cols-3 gap-3">
                                    {proteinOptions.map((option) => {
                                      const active = formData.egusiProtein === option
                                      return (
                                        <button
                                          key={option}
                                          type="button"
                                          onClick={() =>
                                            setFormData((current) => ({
                                              ...current,
                                              egusiProtein: option,
                                            }))
                                          }
                                          className={`rounded-xl border px-2 py-3 text-sm font-medium transition-all sm:px-4 ${
                                            active
                                              ? 'border-orange-500 bg-white text-orange-700 shadow-sm'
                                              : 'border-gray-200 bg-white text-gray-700 hover:border-orange-200'
                                          }`}
                                        >
                                          {option}
                                        </button>
                                      )
                                    })}
                                  </div>
                                </div>
                              </div>
                            ) : null}
                          </div>
                        )
                      })}
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-gray-900 px-6 py-5 text-white">
                      <span className="text-sm font-medium text-gray-300">
                        Total to pay
                      </span>
                      <span className="text-2xl font-bold">{naira(total)}</span>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row-reverse">
                      <Button
                        type="button"
                        onClick={handleNext}
                        disabled={availableMenu.length === 0}
                        className="h-14 w-full rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 sm:w-auto sm:px-10"
                      >
                        <span className="inline-flex items-center gap-2">
                          {availableMenu.length === 0
                            ? 'No meals available today'
                            : 'Continue to payment'}
                          {availableMenu.length > 0 ? (
                            <ArrowRight className="h-5 w-5" />
                          ) : null}
                        </span>
                      </Button>
                    </div>
                  </div>
                ) : null}

                {/* STEP 2 — Make payment */}
                {step === 2 ? (
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Step 2 — Make payment & upload proof
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Transfer the exact total to the account below, then upload a
                        screenshot or photo of your receipt.
                      </p>
                    </div>

                    <div className="rounded-2xl border border-gray-100 bg-gradient-to-br from-gray-50 to-orange-50/40 p-6">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500">
                          Amount to transfer
                        </span>
                        <span className="text-2xl font-bold text-gray-900">
                          {naira(total)}
                        </span>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between rounded-xl bg-white px-4 py-3 ring-1 ring-gray-100">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                              Account Number
                            </p>
                            <p className="text-lg font-bold tracking-wide text-gray-900">
                              {PAYMENT_DETAILS.accountNumber}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={copyAccountNumber}
                            className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-semibold text-orange-700 transition-colors hover:bg-orange-100"
                          >
                            <Copy className="h-4 w-4" />
                            Copy
                          </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-gray-100">
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                              Bank
                            </p>
                            <p className="font-semibold text-gray-900">
                              {PAYMENT_DETAILS.bank}
                            </p>
                          </div>
                          <div className="rounded-xl bg-white px-4 py-3 ring-1 ring-gray-100">
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                              Account Name
                            </p>
                            <p className="font-semibold text-gray-900">
                              {PAYMENT_DETAILS.accountName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold text-gray-800">
                        Upload proof of payment{' '}
                        <span className="text-red-500">*</span>
                      </Label>

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleProofUpload}
                        className="hidden"
                      />

                      {proofImage ? (
                        <div className="overflow-hidden rounded-2xl border border-orange-100">
                          <img
                            src={proofImage}
                            alt="Payment receipt preview"
                            className="max-h-72 w-full bg-gray-50 object-contain"
                          />
                          <div className="flex items-center justify-between gap-3 border-t border-orange-100 bg-orange-50/60 px-4 py-3">
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-green-700">
                              <Check className="h-4 w-4" />
                              Receipt attached
                            </span>
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="text-sm font-semibold text-orange-700 hover:text-orange-800"
                            >
                              Replace
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/40 px-6 py-10 text-center transition-colors hover:border-orange-300 hover:bg-orange-50"
                        >
                          <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                            <Upload className="h-6 w-6" />
                          </span>
                          <span className="font-semibold text-gray-800">
                            Tap to upload your receipt
                          </span>
                          <span className="text-sm text-gray-500">
                            A screenshot or photo of your transfer (image only)
                          </span>
                        </button>
                      )}

                      <div className="rounded-2xl border border-green-200 bg-green-50 p-5">
                        <div className="flex items-start gap-3">
                          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                            <MessageCircle className="h-5 w-5" />
                          </span>
                          <div>
                            <p className="font-bold text-green-900">
                              Important: you must send your receipt on WhatsApp
                            </p>
                            <p className="mt-1 text-sm leading-relaxed text-green-800">
                              Uploading here is not enough — your payment is only
                              confirmed once you send the receipt to{' '}
                              <span className="font-semibold">{WHATSAPP_NUMBER}</span> on
                              WhatsApp. Tap the button below, then attach your receipt in
                              the chat.
                            </p>
                          </div>
                        </div>
                        <a
                          href={WHATSAPP_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-green-600 px-6 text-base font-bold !text-white shadow-md transition-colors hover:bg-green-700"
                        >
                          <MessageCircle className="h-5 w-5" />
                          Send receipt on WhatsApp
                        </a>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
                      <Button
                        type="button"
                        onClick={handleNext}
                        className="h-14 w-full rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 sm:w-auto sm:px-10"
                      >
                        <span className="inline-flex items-center gap-2">
                          Continue to details
                          <ArrowRight className="h-5 w-5" />
                        </span>
                      </Button>
                      <button
                        type="button"
                        onClick={() => goToStep(1)}
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 text-base font-semibold text-gray-700 transition-colors hover:border-gray-300"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    </div>
                  </div>
                ) : null}

                {/* STEP 3 — Complete the form */}
                {step === 3 ? (
                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Step 3 — Complete your details
                      </h2>
                      <p className="mt-2 text-gray-600">
                        Fill in the remaining details exactly as you want them
                        recorded, then submit your signup.
                      </p>
                    </div>

                    {showProfilePrompt ? (
                      <div className="flex items-start justify-between gap-3 rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4">
                        <div className="flex items-start gap-3">
                          <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                          <p className="text-sm text-blue-900">
                            We pre-filled your details from your last signup. Please
                            review everything below and update anything that has
                            changed before submitting.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowProfilePrompt(false)}
                          className="shrink-0 rounded-full p-1 text-blue-500 hover:bg-blue-100"
                          aria-label="Dismiss"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : null}

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
                      <Label htmlFor="fullName" className="text-base font-semibold text-gray-800">
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
                      <Label htmlFor="whatsapp" className="text-base font-semibold text-gray-800">
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
                      <Label htmlFor="agentCode" className="text-base font-semibold text-gray-800">
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
                        contact{' '}
                        <span className="font-semibold text-gray-700">{WHATSAPP_NUMBER}</span>{' '}
                        on WhatsApp for an agent code near you.
                      </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row-reverse sm:items-center sm:justify-between">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="h-14 w-full rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 text-base font-bold text-white shadow-lg transition-all duration-300 hover:scale-[1.01] hover:from-orange-600 hover:via-red-600 hover:to-yellow-600 sm:w-auto sm:px-10"
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
                      <button
                        type="button"
                        onClick={() => goToStep(2)}
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-6 text-base font-semibold text-gray-700 transition-colors hover:border-gray-300"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    </div>
                  </form>
                ) : null}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl bg-gray-900 p-6 text-white shadow-2xl sm:p-8">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  {step === 1 ? (
                    <Utensils className="h-7 w-7" />
                  ) : step === 2 ? (
                    <Banknote className="h-7 w-7" />
                  ) : (
                    <UserRound className="h-7 w-7" />
                  )}
                </div>
                <h3 className="text-2xl font-bold">
                  {step === 1
                    ? 'Step 1 · Pick your meal'
                    : step === 2
                      ? 'Step 2 · Pay & upload'
                      : 'Step 3 · Your details'}
                </h3>
                <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-200">
                  {step === 1 ? (
                    <>
                      <p>Ordering is now open.</p>
                      <p>{ORDER_CUTOFF_NOTE}</p>
                      {availableMenu.length > 0 ? (
                        <p>
                          Today is {currentWeekday}, so the available meals are{' '}
                          {todayMealAvailability.foods.toLowerCase()}.
                        </p>
                      ) : (
                        <p>No meals are scheduled for {currentWeekday}.</p>
                      )}
                      <p>If you pick Egusi, choose Eba or Fufu and a protein (Beef, Chicken or Fish).</p>
                      <p>Your total is calculated for you and shown at the bottom.</p>
                    </>
                  ) : step === 2 ? (
                    <>
                      <p>Transfer the exact total shown to the FCMB account.</p>
                      <p>Upload a clear screenshot or photo of your receipt.</p>
                      <p>Also forward the receipt to {WHATSAPP_NUMBER} on WhatsApp.</p>
                    </>
                  ) : (
                    <>
                      <p>Enter your details exactly as you want them recorded.</p>
                      <p>Confirm your WhatsApp number is active and correct.</p>
                      <p>Have your agent code ready before submitting.</p>
                    </>
                  )}
                </div>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-xl sm:p-8">
                <h3 className="text-xl font-bold text-gray-900">How it works</h3>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center gap-3 rounded-2xl bg-orange-50 px-4 py-3">
                    <Sandwich className="h-5 w-5 text-orange-600" />
                    <span className="font-medium text-gray-700">Choose from today's meals</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-red-50 px-4 py-3">
                    <Banknote className="h-5 w-5 text-red-600" />
                    <span className="font-medium text-gray-700">Pay & upload your receipt</span>
                  </div>
                  <div className="flex items-center gap-3 rounded-2xl bg-green-50 px-4 py-3">
                    <User className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-gray-700">Complete your details</span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl bg-gradient-to-br from-yellow-100 to-orange-100 p-6 shadow-xl sm:p-8">
                <h3 className="text-xl font-bold text-gray-900">Your progress is saved</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">
                  Everything you enter is saved automatically, so you can safely refresh
                  or come back later and pick up right where you left off.
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
