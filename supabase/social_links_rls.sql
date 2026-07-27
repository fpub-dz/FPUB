-- À exécuter une fois dans Supabase -> SQL Editor
-- Autorise la lecture publique (anon) de la table social_links existante,
-- sans toucher à ses données ni à sa structure.

alter table public.social_links enable row level security;

drop policy if exists "Allow public read social_links" on public.social_links;
create policy "Allow public read social_links"
  on public.social_links
  for select
  to anon
  using (is_active = true);

NOTIFY pgrst, 'reload schema';
