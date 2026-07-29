-- À exécuter une fois dans Supabase -> SQL Editor
-- Ajoute les colonnes nécessaires au nouveau formulaire (nom+prénom, téléphone,
-- canal choisi) SANS toucher aux demandes déjà enregistrées.

alter table public.fpub_contact_submissions add column if not exists phone   text;
alter table public.fpub_contact_submissions add column if not exists channel text; -- 'whatsapp' | 'messenger' | 'instagram' | 'email' | 'phone'

NOTIFY pgrst, 'reload schema';
