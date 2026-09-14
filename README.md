# blog.fkoko.online
# blog.fkoko.online

## Admin content panel

The admin panel is available at `/admin`. It uses Supabase Auth for one administrator account and stores editable copy in the `site_content` table.

1. Create a Supabase project and add one user in **Authentication > Users**.
2. Run [`supabase/admin-content.sql`](supabase/admin-content.sql) in the Supabase SQL editor.
3. Add these environment variables to local development and the deployment provider:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Open `/admin` and sign in with the Supabase user.

The panel falls back to the existing JSON content until Supabase is configured, so the public site remains available during setup.
