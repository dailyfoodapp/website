import { useEffect } from 'react'

export const SITE_URL = 'https://dailyfood.app'

interface SeoMeta {
  title: string
  description: string
  canonicalPath: string
  type?: 'website' | 'article'
  image?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
  robots?: string
}

const absoluteUrl = (value: string) => {
  if (/^https?:\/\//.test(value)) {
    return value
  }

  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`
}

const ensureMeta = (selector: string, attributes: Record<string, string>) => {
  let element = document.head.querySelector<HTMLMetaElement>(selector)

  if (!element) {
    element = document.createElement('meta')
    Object.entries(attributes).forEach(([key, value]) => {
      element?.setAttribute(key, value)
    })
    document.head.appendChild(element)
  }

  return element
}

const setNamedMeta = (name: string, content: string) => {
  const element = ensureMeta(`meta[name="${name}"]`, { name })
  element.setAttribute('content', content)
}

const setPropertyMeta = (property: string, content: string) => {
  const element = ensureMeta(`meta[property="${property}"]`, { property })
  element.setAttribute('content', content)
}

const setCanonical = (href: string) => {
  let element = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', href)
}

const setJsonLd = (value?: string) => {
  const id = 'dailyfood-json-ld'
  const existing = document.getElementById(id)

  if (!value) {
    existing?.remove()
    return
  }

  const element = existing ?? document.createElement('script')
  element.id = id
  element.setAttribute('type', 'application/ld+json')
  element.textContent = value

  if (!existing) {
    document.head.appendChild(element)
  }
}

export const useSeo = ({
  title,
  description,
  canonicalPath,
  type = 'website',
  image,
  jsonLd,
  robots = 'index,follow',
}: SeoMeta) => {
  const canonicalUrl = absoluteUrl(canonicalPath)
  const imageUrl = image ? absoluteUrl(image) : undefined
  const jsonLdValue = jsonLd ? JSON.stringify(jsonLd) : undefined

  useEffect(() => {
    document.title = title

    setNamedMeta('description', description)
    setNamedMeta('robots', robots)

    setPropertyMeta('og:site_name', 'DailyFood')
    setPropertyMeta('og:title', title)
    setPropertyMeta('og:description', description)
    setPropertyMeta('og:type', type)
    setPropertyMeta('og:url', canonicalUrl)

    setNamedMeta('twitter:card', imageUrl ? 'summary_large_image' : 'summary')
    setNamedMeta('twitter:title', title)
    setNamedMeta('twitter:description', description)

    if (imageUrl) {
      setPropertyMeta('og:image', imageUrl)
      setNamedMeta('twitter:image', imageUrl)
    }

    setCanonical(canonicalUrl)
    setJsonLd(jsonLdValue)
  }, [canonicalUrl, description, imageUrl, jsonLdValue, robots, title, type])
}

export const toAbsoluteUrl = absoluteUrl
