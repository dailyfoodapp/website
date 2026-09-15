export type BlogStatus = 'draft' | 'published'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  authorName: string
  category: string
  tags: string[]
  status: BlogStatus
  coverImageUrl?: string
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
  publishedAt?: string
  updatedAt?: string
  readingTimeMinutes: number
}

export interface BlogPayload {
  title: string
  slug: string
  excerpt: string
  content: string
  authorName: string
  category: string
  tags: string[]
  status: BlogStatus
  coverImageUrl?: string
  seoTitle?: string
  seoDescription?: string
  canonicalUrl?: string
}

export interface BlogRequestOptions {
  signal?: AbortSignal
  token?: string
}

export const BLOG_API_BASE_URL = (
  import.meta.env.VITE_BLOG_API_BASE_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://api.admin.dailyfood.app'
).replace(/\/$/, '')

const PUBLIC_BLOG_PATH = '/api/v1/blogs'
const ADMIN_BLOG_PATH = '/api/v1/admin/blogs'

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value)

const getString = (
  record: Record<string, unknown>,
  keys: string[],
  fallback = '',
) => {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === 'string' && value.trim()) {
      return value.trim()
    }
    if (typeof value === 'number') {
      return String(value)
    }
  }

  return fallback
}

const getOptionalString = (record: Record<string, unknown>, keys: string[]) => {
  const value = getString(record, keys)
  return value || undefined
}

const getNumber = (
  record: Record<string, unknown>,
  keys: string[],
  fallback: number,
) => {
  for (const key of keys) {
    const value = record[key]
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value
    }
    if (typeof value === 'string' && value.trim()) {
      const parsed = Number(value)
      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }

  return fallback
}

const toStringArray = (value: unknown) => {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter((item) => item.length > 0)
  }

  if (typeof value === 'string') {
    return value
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item.length > 0)
  }

  return []
}

export const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const stripHtml = (value: string) =>
  value
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

export const estimateReadingTime = (content: string) => {
  const wordCount = stripHtml(content).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / 220))
}

export const formatBlogDate = (value?: string) => {
  if (!value) {
    return 'Unpublished'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unpublished'
  }

  return new Intl.DateTimeFormat('en-NG', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

export const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong. Please try again.'
}

const buildApiUrl = (
  path: string,
  query?: Record<string, string | undefined>,
) => {
  const queryString = new URLSearchParams()

  Object.entries(query ?? {}).forEach(([key, value]) => {
    if (value) {
      queryString.set(key, value)
    }
  })

  const suffix = queryString.toString() ? `?${queryString.toString()}` : ''

  if (/^https?:\/\//.test(BLOG_API_BASE_URL)) {
    return `${BLOG_API_BASE_URL}${path}${suffix}`
  }

  return `${BLOG_API_BASE_URL}${path}${suffix}`
}

const requestJson = async <T>(
  path: string,
  options: BlogRequestOptions & {
    body?: unknown
    method?: string
    query?: Record<string, string | undefined>
  } = {},
) => {
  const headers: HeadersInit = {
    Accept: 'application/json',
  }

  if (options.body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`
  }

  const response = await fetch(buildApiUrl(path, options.query), {
    method: options.method ?? 'GET',
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    signal: options.signal,
  })

  if (response.status === 204) {
    return undefined as T
  }

  const contentType = response.headers.get('content-type') ?? ''
  const data: unknown = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    const message =
      isRecord(data) && typeof data.message === 'string'
        ? data.message
        : `Request failed with status ${response.status}`
    throw new Error(message)
  }

  return data as T
}

const unwrapList = (data: unknown): unknown[] => {
  if (Array.isArray(data)) {
    return data
  }

  if (!isRecord(data)) {
    return []
  }

  const possibleLists = [data.data, data.blogs, data.posts, data.items]
  const list = possibleLists.find(Array.isArray)

  return list ?? []
}

const unwrapPost = (data: unknown): unknown => {
  if (!isRecord(data)) {
    return data
  }

  return data.data ?? data.blog ?? data.post ?? data.item ?? data
}

export const normalizeBlogPost = (value: unknown): BlogPost => {
  if (!isRecord(value)) {
    return {
      id: '',
      slug: '',
      title: '',
      excerpt: '',
      content: '',
      authorName: 'DailyFood Team',
      category: 'Food Savings',
      tags: [],
      status: 'draft',
      readingTimeMinutes: 1,
    }
  }

  const title = getString(value, ['title', 'name'])
  const content = getString(value, ['content', 'body', 'contentPlainText'])
  const slug = getString(value, ['slug'], slugify(title))
  const excerpt = getString(
    value,
    ['excerpt', 'summary', 'description', 'seoDescription', 'seo_description'],
    stripHtml(content).slice(0, 160),
  )
  const author = value.author
  const authorName =
    getString(value, ['authorName', 'author_name', 'createdBy']) ||
    (isRecord(author)
      ? getString(author, ['name', 'fullName', 'full_name'])
      : '') ||
    'DailyFood Team'
  const statusValue = getString(value, ['status'], 'draft').toLowerCase()
  const status: BlogStatus = statusValue === 'published' ? 'published' : 'draft'
  const publishedAt = getOptionalString(value, [
    'publishedAt',
    'published_at',
    'createdAt',
    'created_at',
  ])

  return {
    id: getString(value, ['id', '_id', 'uuid'], slug),
    slug,
    title,
    excerpt,
    content,
    authorName,
    category: getString(value, ['category'], 'Food Savings'),
    tags: toStringArray(value.tags),
    status,
    coverImageUrl: getOptionalString(value, [
      'coverImageUrl',
      'cover_image_url',
      'image',
      'imageUrl',
    ]),
    seoTitle: getOptionalString(value, ['seoTitle', 'seo_title', 'metaTitle']),
    seoDescription: getOptionalString(value, [
      'seoDescription',
      'seo_description',
      'metaDescription',
    ]),
    canonicalUrl: getOptionalString(value, ['canonicalUrl', 'canonical_url']),
    publishedAt,
    updatedAt: getOptionalString(value, ['updatedAt', 'updated_at']),
    readingTimeMinutes: getNumber(
      value,
      ['readingTimeMinutes', 'reading_time_minutes'],
      estimateReadingTime(content),
    ),
  }
}

export const listPublishedBlogPosts = async (
  options: BlogRequestOptions & {
    category?: string
    search?: string
  } = {},
) => {
  const data = await requestJson<unknown>(PUBLIC_BLOG_PATH, {
    signal: options.signal,
    query: {
      status: 'published',
      category: options.category,
      search: options.search,
    },
  })

  return unwrapList(data)
    .map(normalizeBlogPost)
    .filter((post) => post.title && post.slug)
}

export const getPublishedBlogPost = async (
  slug: string,
  options: BlogRequestOptions = {},
) => {
  const data = await requestJson<unknown>(
    `${PUBLIC_BLOG_PATH}/${encodeURIComponent(slug)}`,
    {
      signal: options.signal,
    },
  )

  const post = normalizeBlogPost(unwrapPost(data))

  if (!post.title || !post.slug) {
    throw new Error('Article not found.')
  }

  return post
}

export const listAdminBlogPosts = async (options: BlogRequestOptions = {}) => {
  const data = await requestJson<unknown>(ADMIN_BLOG_PATH, options)

  return unwrapList(data)
    .map(normalizeBlogPost)
    .filter((post) => post.title && post.slug)
}

export const createAdminBlogPost = async (
  payload: BlogPayload,
  options: BlogRequestOptions = {},
) => {
  const data = await requestJson<unknown>(ADMIN_BLOG_PATH, {
    method: 'POST',
    body: payload,
    token: options.token,
    signal: options.signal,
  })

  return normalizeBlogPost(unwrapPost(data))
}

export const updateAdminBlogPost = async (
  id: string,
  payload: BlogPayload,
  options: BlogRequestOptions = {},
) => {
  const data = await requestJson<unknown>(
    `${ADMIN_BLOG_PATH}/${encodeURIComponent(id)}`,
    {
      method: 'PATCH',
      body: payload,
      token: options.token,
      signal: options.signal,
    },
  )

  return normalizeBlogPost(unwrapPost(data))
}

export const deleteAdminBlogPost = async (
  id: string,
  options: BlogRequestOptions = {},
) => {
  await requestJson<void>(`${ADMIN_BLOG_PATH}/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    token: options.token,
    signal: options.signal,
  })
}
