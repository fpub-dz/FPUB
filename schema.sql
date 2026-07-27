-- ==========================================================================
-- FPUB — schéma Supabase pour le formulaire de contact
-- À exécuter une seule fois dans : Supabase Dashboard -> SQL Editor -> New query
-- ==========================================================================

create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  full_name    text not null,
  email        text not null,
  project_scope text,
  message      text not null,
  locale       text
);

-- Sécurité : on active la Row Level Security puis on n'autorise
-- QUE l'insertion (INSERT) depuis le rôle public "anon" utilisé par le site.
-- Personne ne peut lire (SELECT), modifier ou supprimer les lignes avec
-- la clé publique — seule la clé "service_role" (jamais exposée au
-- navigateur) ou vous-même depuis le tableau de bord Supabase le pouvez.
alter table public.contact_submissions enable row level security;

drop policy if exists "Allow public insert" on public.contact_submissions;
create policy "Allow public insert"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

-- Pour consulter les messages reçus : Table Editor -> contact_submissions
-- dans le tableau de bord Supabase (vous êtes authentifié en tant
-- qu'administrateur, donc RLS ne vous bloque pas).
