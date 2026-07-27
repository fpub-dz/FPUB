-- À exécuter une fois dans Supabase -> SQL Editor
-- Autorise la lecture publique (anon) de la table settings existante,
-- sans toucher à ses données ni à sa structure.

alter table public.settings enable row level security;

drop policy if exists "Allow public read settings" on public.settings;
create policy "Allow public read settings"
  on public.settings
  for select
  to anon
  using (true);

NOTIFY pgrst, 'reload schema';

-- ==========================================================================
-- Optionnel : si la table "settings" est encore vide, insérez une première
-- ligne avec vos vraies informations (adaptez les valeurs ci-dessous puis
-- exécutez ce bloc une seule fois) :
-- ==========================================================================
-- insert into public.settings (site_name, email, phone, whatsapp_number, address, working_hours, google_maps_url, copyright)
-- values (
--   'FPUB',
--   'votre-email@exemple.com',
--   '+213xxxxxxxxx',
--   '+213xxxxxxxxx',
--   'Votre adresse, Ville, Pays',
--   'Lun - Ven, 9h - 18h',
--   'https://maps.google.com/?q=...',
--   '© 2026 FPUB Agency. All rights reserved.'
-- );
