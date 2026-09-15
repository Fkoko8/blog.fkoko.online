import { contentDefaults } from '@/lib/admin-content';

export type SiteContent = Record<string, string>;

export function mergeSiteContent(rows: Array<{ key: string; value: string }> | null | undefined): SiteContent {
  return {
    ...contentDefaults,
    ...Object.fromEntries((rows ?? []).map((row) => [row.key, row.value])),
  };
}
