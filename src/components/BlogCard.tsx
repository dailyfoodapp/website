import { Calendar, Clock, FileText, Tag } from 'lucide-react'
import { Link } from 'react-router-dom'

import type { BlogPost } from '@/lib/blog'
import { formatBlogDate } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-xl border border-orange-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl ${
        featured ? 'lg:grid lg:grid-cols-[0.95fr_1.05fr]' : ''
      }`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block !text-inherit !no-underline"
      >
        {post.coverImageUrl ? (
          <img
            src={post.coverImageUrl}
            alt=""
            className={`w-full object-cover ${
              featured ? 'h-72 lg:h-full' : 'h-52'
            }`}
            loading={featured ? 'eager' : 'lazy'}
          />
        ) : (
          <div
            className={`flex w-full items-center justify-center bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 text-orange-500 ${
              featured ? 'h-72 lg:h-full' : 'h-52'
            }`}
            aria-hidden="true"
          >
            <FileText className="h-14 w-14" />
          </div>
        )}
      </Link>

      <div className="flex h-full flex-col p-6 md:p-8">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-gray-500">
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

        <h2
          className={`font-bold leading-tight text-gray-900 transition-colors group-hover:text-orange-600 ${
            featured ? 'text-3xl md:text-4xl' : 'text-2xl'
          }`}
        >
          <Link
            to={`/blog/${post.slug}`}
            className="!text-inherit !no-underline"
          >
            {post.title}
          </Link>
        </h2>

        <p className="mt-4 leading-relaxed text-gray-600">{post.excerpt}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-auto pt-6 text-sm font-bold !text-orange-600 transition-colors hover:!text-orange-700"
        >
          Read article
        </Link>
      </div>
    </article>
  )
}
