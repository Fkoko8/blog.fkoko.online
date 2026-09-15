import fallbackPosts from '@/data/posts.json'
import type { Post } from '@/lib/types'

type PayloadPost = Omit<Post, 'date' | 'tags'> & {
  date?: string
  publishedAt?: string
  tags?: Array<{ tag?: string }>
}

export async function getPosts(): Promise<Post[]> {
  const fallback = fallbackPosts as Post[]
  const payloadUrl = process.env.PAYLOAD_URL

  if (!payloadUrl) return fallback

  try {
    const response = await fetch(
      `${payloadUrl.replace(/\/$/, '')}/api/posts?where[status][equals]=published&sort=-publishedAt&limit=100`,
      { next: { revalidate: 60 } },
    )

    if (!response.ok) return fallback

    const data = (await response.json()) as { docs?: PayloadPost[] }
    if (!data.docs) return fallback

    return data.docs.map((post) => ({
      ...post,
      date: post.publishedAt || post.date || new Date().toISOString(),
      tags: (post.tags ?? []).map((tag) => tag.tag ?? '').filter(Boolean),
    }))
  } catch {
    return fallback
  }
}