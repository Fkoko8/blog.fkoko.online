# blog.fkoko.online

This repository contains two separate applications:

```text
blog/
├── blogFk/    # public Next.js frontend
└── blog-cms/  # Payload CMS
```

Deploy each directory as a separate Vercel project. The frontend uses `PAYLOAD_URL` to load published posts from Payload and falls back to its local JSON data when the CMS is unavailable.
