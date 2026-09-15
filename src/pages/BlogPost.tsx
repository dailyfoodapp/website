import { ArrowLeft, Calendar, Clock, Tag, User } from 'lucide-react'
import DOMPurify from 'dompurify'
import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import FooterSection from '@/components/FooterSection'
import PageHeader from '@/components/PageHeader'
import { Button } from '@/components/ui/button'
import {
  formatBlogDate,
  getErrorMessage,
  getPublishedBlogPost,
  type BlogPost,
} from '@/lib/blog'
import { SITE_URL, useSeo } from '@/lib/seo'

export default function BlogPostPage() {
  const { slug } = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    if (!slug) {
      setError('Article not found.')
      setIsLoading(false)
      return () => controller.abort()
    }

    setIsLoading(true)
    setError('')

    getPublishedBlogPost(slug, { signal: controller.signal })
      .then((nextPost) => {
        if (!controller.signal.aborted) {
          setPost(nextPost)
        }
      })
      .catch((requestError: unknown) => {
        if (!controller.signal.aborted) {
          setError(getErrorMessage(requestError))
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      })

    return () => controller.abort()
  }, [slug])

  const articleHtml = useMemo(() => {
    if (!post?.content) {
      return ''
    }

    return DOMPurify.sanitize(post.content, {
      ADD_ATTR: ['target', 'rel'],
    })
  }, [post])

  const articleJsonLd = useMemo(() => {
    if (!post) {
      return undefined
    }

    return {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.seoDescription || post.excerpt,
      image: post.coverImageUrl,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        '@type': 'Organization',
        name: post.authorName,
      },
      publisher: {
        '@type': 'Organization',
        name: 'DailyFood',
        url: SITE_URL,
      },
    }
  }, [post])

  useSeo({
    title: post
      ? post.seoTitle || `${post.title} | DailyFood Blog`
      : 'DailyFood Blog Article',
    description: post
      ? post.seoDescription || post.excerpt
      : 'Read DailyFood articles about food savings, grocery planning, and delivery.',
    canonicalPath: post?.canonicalUrl || `/blog/${slug ?? ''}`,
    type: 'article',
    image: post?.coverImageUrl,
    jsonLd: articleJsonLd,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <PageHeader />

      <main className="container mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <Link
          to="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-bold !text-orange-600 hover:!text-orange-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to blog
        </Link>

        {isLoading ? (
          <div className="space-y-6">
            <div className="h-10 w-2/3 animate-pulse rounded-lg bg-white" />
            <div className="h-72 animate-pulse rounded-xl bg-white" />
            <div className="h-40 animate-pulse rounded-xl bg-white" />
          </div>
        ) : null}

        {!isLoading && error ? (
          <section className="rounded-xl border border-orange-100 bg-white px-6 py-16 text-center shadow-sm">
            <h1 className="text-3xl font-bold text-gray-900">
              Article unavailable
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-gray-600">{error}</p>
            <div className="mt-8 flex justify-center">
              <Link to="/blog">
                <Button className="rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600">
                  View all articles
                </Button>
              </Link>
            </div>
          </section>
        ) : null}

        {!isLoading && post ? (
          <article className="overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm">
            {post.coverImageUrl ? (
              <img
                src={post.coverImageUrl}
                alt=""
                className="h-72 w-full object-cover md:h-96"
              />
            ) : null}

            <div className="mx-auto max-w-5xl px-6 py-8 md:px-10 md:py-12">
              <div className="mb-5 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-orange-50 px-3 py-1 font-semibold text-orange-700">
                  <Tag className="h-3.5 w-3.5" />
                  {post.category}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatBlogDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readingTimeMinutes} min read
                </span>
              </div>

              <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
                {post.title}
              </h1>

              <p className="mt-5 text-xl leading-relaxed text-gray-600">
                {post.excerpt}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3 border-y border-orange-100 py-4 text-sm text-gray-600">
                <span className="inline-flex items-center gap-2 font-semibold text-gray-800">
                  <User className="h-4 w-4 text-orange-500" />
                  {post.authorName}
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div
                className="blog-article-content mt-8"
                dangerouslySetInnerHTML={{ __html: articleHtml }}
              />
            </div>
          </article>
        ) : null}
      </main>

      <FooterSection />
    </div>
  )
}
