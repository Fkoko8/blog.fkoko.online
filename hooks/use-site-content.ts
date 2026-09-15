'use client';

import { useEffect, useState } from 'react';
import { contentDefaults } from '@/lib/admin-content';
import type { SiteContent } from '@/lib/site-content';

export function useSiteContent(): SiteContent {
  const [content, setContent] = useState<SiteContent>(contentDefaults);

  useEffect(() => {
    fetch('/api/content')
      .then((response) => (response.ok ? response.json() : null))
      .then((data: SiteContent | null) => {
        if (data) setContent((current) => ({ ...current, ...data }));
      })
      .catch(() => undefined);
  }, []);

  return content;
}
