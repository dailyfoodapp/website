import { Search, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import BlogCard from '@/components/BlogCard'
import FooterSection from '@/components/FooterSection'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  getErrorMessage,
  listPublishedBlogPosts,
  type BlogPost,
} from '@/lib/blog'
import { SITE_URL, useSeo } from '@/lib/seo'

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    setIsLoading(true)
    setError('')

    listPublishedBlogPosts({ signal: controller.signal })
      .then((nextPosts) => {
        if (!controller.signal.aborted) {
          setPosts(nextPosts)
        }
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          const message = getErrorMessage(requestError)

          if (message.includes('status 404')) {
            setPosts([])
          } else {
            setError(message)
          }
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  )

  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    return posts.filter((post) => {
      const categoryMatches =
        selectedCategory === 'All' || post.category === selectedCategory
      const searchMatches =
        !query ||
        [post.title, post.excerpt, post.category, ...post.tags]
          .join(' ')
          .toLowerCase()
          .includes(query)

      return categoryMatches && searchMatches
    })
  }, [posts, searchQuery, selectedCategory])

  const blogJsonLd = useMemo(
    () => ({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'DailyFood Blog',
      url: `${SITE_URL}/blog`,
      description:
        'Food savings, grocery planning, delivery tips, and DailyFood updates for smarter eating.',
      blogPost: posts.slice(0, 12).map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.seoDescription || post.excerpt,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          '@type': 'Organization',
          name: post.authorName,
        },
      })),
    }),
    [posts]
  )

  useSeo({
    title: 'DailyFood Blog | Food Savings, Delivery and Grocery Tips',
    description:
      'Read DailyFood articles about saving money on food, planning groceries, using delivery better, and eating well every day.',
    canonicalPath: '/blog',
    jsonLd: blogJsonLd,
  })

  const featuredPost = filteredPosts[0]
  const remainingPosts = filteredPosts.slice(1)

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PageHeader />

      <section className="bg-gradient-to-r from-orange-500 to-red-500 py-14 text-white md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              DailyFood Blog
            </div>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              Food savings, delivery tips, and grocery planning ideas.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-white/90 md:text-xl">
              Practical articles for spending less on food, planning meals
              better, and getting more value from the DailyFood app.
            </p>
          </div>
        </div>
      </section>

      <main className="container mx-auto max-w-6xl px-4 py-12 md:py-16">
        <section className="mb-10 flex flex-col gap-4 rounded-xl border border-orange-100 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-orange-500" />
            <Input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search articles"
              className="h-12 rounded-lg border-orange-100 bg-orange-50/50 pl-12 text-base focus-visible:ring-orange-300"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-orange-100 hover:text-orange-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {error ? (
          <div className="mb-8 rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm font-medium text-red-800">
            {error}
          </div>
        ) : null}

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-3">
            {['first', 'second', 'third'].map((item) => (
              <div
                key={item}
                className="h-96 animate-pulse rounded-xl bg-white shadow-sm"
              />
            ))}
          </div>
        ) : null}

        {!isLoading && filteredPosts.length === 0 ? (
          <section className="rounded-xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900">
              No articles published yet
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              DailyFood articles will appear here after they are published from
              the admin blog manager.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/">
                <Button className="rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600">
                  Back to home
                </Button>
              </Link>
            </div>
          </section>
        ) : null}

        {!isLoading && featuredPost ? (
          <div className="space-y-8">
            <BlogCard post={featuredPost} featured />

            {remainingPosts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {remainingPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            ) : null}
          </div>
        ) : null}
      </main>

      <FooterSection />
    </div>
  )
}
