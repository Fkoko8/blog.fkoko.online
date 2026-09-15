import 'dotenv/config'

import { getPayload } from 'payload'

import config from '../src/payload.config'
import posts from '../../blogFk/data/posts.json'

type SourcePost = (typeof posts)[number]

const payload = await getPayload({ config })

for (const post of posts as SourcePost[]) {
  const existing = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: post.slug,
      },
    },
    limit: 1,
  })

  const data = {
    title: post.title,
    slug: post.slug,
    category: post.category,
    status: 'published' as const,
    publishedAt: post.date,
    readingTime: post.readingTime,
    author: post.author,
    excerpt: post.excerpt,
    image: post.image,
    tags: post.tags.map((tag) => ({ tag })),
    content: post.content,
    relatedRideId: post.relatedRideId,
  }

  if (existing.docs[0]) {
    await payload.update({
      collection: 'posts',
      id: existing.docs[0].id,
      data,
    })
    console.log(`Updated: ${post.slug}`)
  } else {
    await payload.create({
      collection: 'posts',
      data,
    })
    console.log(`Created: ${post.slug}`)
  }
}

await payload.destroy()
console.log(`Imported ${posts.length} posts.`)
