-- ==========================================================================
-- FPUB — schéma Supabase complet (contact + services + réalisations)
--
-- Toutes les tables sont préfixées "fpub_" exprès : votre projet Supabase
-- contient déjà d'autres tables (ex. "services", "orders" d'une autre
-- application), donc on évite tout nom générique qui pourrait entrer en
-- conflit ou être lié par une contrainte de clé étrangère existante.
--
-- Idempotent : peut être exécuté plusieurs fois sans erreur.
--
-- À exécuter en une seule fois dans :
--   Supabase Dashboard -> SQL Editor -> New query -> coller tout -> Run
-- ==========================================================================

create extension if not exists pgcrypto;

-- ==========================================================================
-- 1) FORMULAIRE DE CONTACT
-- ==========================================================================
create table if not exists public.fpub_contact_submissions (
  id uuid primary key default gen_random_uuid()
);
alter table public.fpub_contact_submissions add column if not exists created_at    timestamptz not null default now();
alter table public.fpub_contact_submissions add column if not exists full_name     text;
alter table public.fpub_contact_submissions add column if not exists email        text;
alter table public.fpub_contact_submissions add column if not exists project_scope text;
alter table public.fpub_contact_submissions add column if not exists message      text;
alter table public.fpub_contact_submissions add column if not exists locale       text;

alter table public.fpub_contact_submissions enable row level security;

drop policy if exists "Allow public insert" on public.fpub_contact_submissions;
create policy "Allow public insert"
  on public.fpub_contact_submissions
  for insert
  to anon
  with check (true);
-- Pas de politique SELECT pour "anon" : personne ne peut lire les messages
-- avec la clé publique. Consultez-les depuis Table Editor dans le dashboard.


-- ==========================================================================
-- 2) SERVICES ("خدماتنا")
-- ==========================================================================
create table if not exists public.fpub_services (
  id uuid primary key default gen_random_uuid()
);
alter table public.fpub_services add column if not exists category       text;
alter table public.fpub_services add column if not exists category_order int not null default 0;
alter table public.fpub_services add column if not exists name           text;
alter table public.fpub_services add column if not exists description    text;
alter table public.fpub_services add column if not exists icon           text default 'sparkle';
alter table public.fpub_services add column if not exists sort_order     int not null default 0;
alter table public.fpub_services add column if not exists is_published   boolean not null default true;

alter table public.fpub_services enable row level security;

drop policy if exists "Allow public read fpub_services" on public.fpub_services;
create policy "Allow public read fpub_services"
  on public.fpub_services
  for select
  to anon
  using (is_published = true);

truncate table public.fpub_services;
insert into public.fpub_services (category, category_order, name, description, icon, sort_order) values
('Marketing Performance', 1, 'Facebook Ads', 'Targeted scaling via Meta''s advanced algorithms.', 'megaphone', 1),
('Marketing Performance', 1, 'Instagram Ads', 'Visual storytelling that converts followers to buyers.', 'image', 2),
('Marketing Performance', 1, 'Google Search', 'Capture intent at the exact moment of search.', 'search', 3),
('Marketing Performance', 1, 'TikTok Ads', 'Viral-driven creative for the next generation.', 'music', 4),
('Marketing Performance', 1, 'SMM Strategy', 'Full-cycle social community management.', 'users', 5),
('Marketing Performance', 1, 'SEO Mastery', 'Organic authority through technical excellence.', 'trending-up', 6),
('Marketing Performance', 1, 'Email Flows', 'Retention loops and automated lifecycle marketing.', 'mail', 7),
('Marketing Performance', 1, 'Marketing Audit', 'Deep-dive data analysis of current efforts.', 'bar-chart', 8),
('Web & E-commerce', 2, 'High-Conversion Landing Pages', 'Bespoke pages designed for one purpose: turning visitors into loyal customers.', 'layout', 1),
('Web & E-commerce', 2, 'Shopify Plus', 'Enterprise-grade e-commerce storefronts.', 'shopping-bag', 2),
('Web & E-commerce', 2, 'Custom Web Dev', 'Next.js and React powered applications.', 'code', 3),
('Web & E-commerce', 2, 'Speed Optimization', 'Sub-second load times for peak conversion.', 'zap', 4),
('Web & E-commerce', 2, 'Headless Commerce', 'Decoupled systems for total design freedom.', 'layers', 5),
('Creative Production', 3, 'Branding', null, 'gem', 1),
('Creative Production', 3, 'Logo Design', null, 'pen-tool', 2),
('Creative Production', 3, 'Graphic Design', null, 'square', 3),
('Creative Production', 3, 'Video Ads', null, 'video', 4),
('Creative Production', 3, 'Motion Graphics', null, 'film', 5),
('Creative Production', 3, 'Photography', null, 'camera', 6),
('Creative Production', 3, '3D Rendering', null, 'box', 7),
('Creative Production', 3, 'Retouching', null, 'sliders', 8),
('Creative Production', 3, 'Copywriting', null, 'edit-3', 9),
('Creative Production', 3, 'Ad Creatives', null, 'target', 10),
('Creative Production', 3, 'Illustration', null, 'feather', 11),
('Creative Production', 3, 'UI Design', null, 'monitor', 12),
('Digital Innovation', 4, 'AI Automation', 'Deploy custom GPTs and workflow automation to save 100+ hours monthly.', 'cpu', 1),
('Digital Innovation', 4, 'Intelligent Chatbots', '24/7 customer support and lead qualification driven by LLMs.', 'message-circle', 2),
('Digital Innovation', 4, 'CRM Integration', 'Seamless pipelines between marketing data and sales closing.', 'git-merge', 3),
('Digital Innovation', 4, 'Digital Transformation', 'Modernizing legacy systems for the cloud-first era.', 'refresh-cw', 4),
('Digital Innovation', 4, 'Data Dashboards', 'Real-time business intelligence for executive decision making.', 'pie-chart', 5),
('Digital Innovation', 4, 'Custom Integrations', 'Connecting fragmented toolsets into a unified ecosystem.', 'link', 6);


-- ==========================================================================
-- 3) RÉALISATIONS / ÉTUDES DE CAS ("اعمالنا")
-- ==========================================================================
create table if not exists public.fpub_projects (
  id uuid primary key default gen_random_uuid()
);
alter table public.fpub_projects add column if not exists title            text;
alter table public.fpub_projects add column if not exists client           text;
alter table public.fpub_projects add column if not exists year             int;
alter table public.fpub_projects add column if not exists role             text;
alter table public.fpub_projects add column if not exists summary          text;
alter table public.fpub_projects add column if not exists cover_image_url  text;
alter table public.fpub_projects add column if not exists result_1_value   text;
alter table public.fpub_projects add column if not exists result_1_label   text;
alter table public.fpub_projects add column if not exists result_2_value   text;
alter table public.fpub_projects add column if not exists result_2_label   text;
alter table public.fpub_projects add column if not exists result_3_value   text;
alter table public.fpub_projects add column if not exists result_3_label   text;
alter table public.fpub_projects add column if not exists result_4_value   text;
alter table public.fpub_projects add column if not exists result_4_label   text;
alter table public.fpub_projects add column if not exists sort_order       int not null default 0;
alter table public.fpub_projects add column if not exists is_published     boolean not null default true;

alter table public.fpub_projects enable row level security;

drop policy if exists "Allow public read fpub_projects" on public.fpub_projects;
create policy "Allow public read fpub_projects"
  on public.fpub_projects
  for select
  to anon
  using (is_published = true);

truncate table public.fpub_projects;
insert into public.fpub_projects
(title, client, year, role, summary, cover_image_url, result_1_value, result_1_label, result_2_value, result_2_label, result_3_value, result_3_label, result_4_value, result_4_label, sort_order) values
('Evolution of Kinetic Tech', 'Kinetic Dynamics Inc.', 2024, 'Brand Strategy, UI/UX, WebGL Development',
 'How we redefined the digital footprint of a leading Silicon Valley hardware manufacturer through immersive storytelling and high-performance UX.',
 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
 '140%', 'Traffic Increase', '2.4s', 'Avg. Load Time', '85%', 'Engagement', '3X', 'Lead Gen', 1),
('Nova Retail Relaunch', 'Nova Home Goods', 2023, 'E-commerce, Performance Marketing',
 'A full Shopify Plus rebuild paired with a paid media overhaul, turning a legacy storefront into a conversion-first retail engine.',
 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop',
 '3.1X', 'ROAS', '58%', 'Cart Conversion Lift', '1.1s', 'Avg. Load Time', '210%', 'Revenue Growth', 2),
('Atlas AI Support Desk', 'Atlas Logistics', 2024, 'AI Automation, CRM Integration',
 'An LLM-driven support and dispatch assistant that cut response times and freed the operations team from repetitive tickets.',
 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
 '92%', 'Tickets Automated', '4min', 'Avg. Response Time', '120h', 'Saved Monthly', '99.9%', 'Uptime', 3);


-- ==========================================================================
-- 4) Forcer PostgREST à recharger immédiatement son cache de schéma, pour
--    que les nouvelles tables soient utilisables par l'API tout de suite
--    (sans ça, l'API peut mettre du temps à "voir" les tables créées ci-dessus).
-- ==========================================================================
NOTIFY pgrst, 'reload schema';
