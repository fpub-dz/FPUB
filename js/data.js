/* ==========================================================================
   FPUB — Work & Services, chargés dynamiquement depuis Supabase (lecture
   publique via RLS "select" sur les tables "projects" et "services").
   ========================================================================== */
(function () {
  const SUPABASE_URL = 'https://lckckfslwvaoyrwtrbhu.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2NrZnNsd3Zhb3lyd3RyYmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNjg0NDQsImV4cCI6MjEwMDY0NDQ0NH0.7-a43mAfeEcbCdj_Ur86wTGTqFhMUrzXi8r7qFoUS_o';

  async function sb(path) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    });
    if (!res.ok) throw new Error(`Supabase read failed (${res.status}) for ${path}`);
    return res.json();
  }

  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
  }

  function statusText(key, fallback) {
    const dict = window.FPUB_TRANSLATIONS || {};
    const parts = key.split('.');
    let v = dict;
    for (const p of parts) v = v && v[p];
    return v || fallback;
  }

  /* ---------------- WORK ---------------- */
  async function renderWork() {
    const el = document.getElementById('work-grid');
    if (!el) return;
    try {
      const rows = await sb('fpub_projects?select=*&is_published=eq.true&order=sort_order.asc');
      if (!rows.length) {
        el.dataset.state = 'empty';
        el.innerHTML = `<p class="data-status">${esc(statusText('work.empty', 'No case studies published yet — add rows to the "fpub_projects" table in Supabase.'))}</p>`;
        return;
      }
      el.dataset.state = 'ready';
      el.innerHTML = rows.map(function (p) {
        const results = [
          [p.result_1_value, p.result_1_label],
          [p.result_2_value, p.result_2_label],
          [p.result_3_value, p.result_3_label],
          [p.result_4_value, p.result_4_label]
        ].filter(function (r) { return r[0] && r[1]; });

        return `
        <article class="glass-card work-card">
          ${p.cover_image_url ? `<div class="work-card-media"><img src="${esc(p.cover_image_url)}" alt="${esc(p.title)}" loading="lazy"></div>` : ''}
          <div class="work-card-body">
            <div class="label-caps text-primary">${esc(p.client)}${p.year ? ' · ' + esc(p.year) : ''}</div>
            <h3 class="work-card-title">${esc(p.title)}</h3>
            ${p.role ? `<div class="text-muted work-card-role">${esc(p.role)}</div>` : ''}
            ${p.summary ? `<p class="work-card-summary">${esc(p.summary)}</p>` : ''}
            ${results.length ? `<div class="work-card-results">${results.map(function (r) {
              return `<div><span class="stat-num" style="font-size:20px;">${esc(r[0])}</span><span class="stat-label">${esc(r[1])}</span></div>`;
            }).join('')}</div>` : ''}
          </div>
        </article>`;
      }).join('');
    } catch (err) {
      console.error('[FPUB work]', err);
      el.dataset.state = 'error';
      el.innerHTML = `<p class="data-status err">${esc(statusText('work.error', 'Could not load case studies. Run supabase/schema.sql in your project, then reload.'))}</p>`;
    }
  }

  /* ---------------- SERVICES ---------------- */
  async function renderServices() {
    const el = document.getElementById('services-groups');
    if (!el) return;
    try {
      const rows = await sb('fpub_services?select=*&is_published=eq.true&order=category_order.asc,sort_order.asc');
      if (!rows.length) {
        el.dataset.state = 'empty';
        el.innerHTML = `<p class="data-status">${esc(statusText('services.empty', 'No services published yet — add rows to the "fpub_services" table in Supabase.'))}</p>`;
        return;
      }
      const groups = [];
      const byCategory = {};
      rows.forEach(function (row) {
        if (!byCategory[row.category]) {
          byCategory[row.category] = { category: row.category, order: row.category_order || 0, items: [] };
          groups.push(byCategory[row.category]);
        }
        byCategory[row.category].items.push(row);
      });
      groups.sort(function (a, b) { return a.order - b.order; });

      el.dataset.state = 'ready';
      el.innerHTML = groups.map(function (g, i) {
        return `
        <div class="service-group">
          <div class="service-group-head">
            <span class="service-group-num">${String(i + 1).padStart(2, '0')}</span>
            <h3 class="label-caps">${esc(g.category)}</h3>
          </div>
          <div class="service-item-grid">
            ${g.items.map(function (item) {
              return `
              <div class="glass-card service-item">
                <div class="service-item-name">${esc(item.name)}</div>
                ${item.description ? `<div class="service-item-desc">${esc(item.description)}</div>` : ''}
              </div>`;
            }).join('')}
          </div>
        </div>`;
      }).join('');
    } catch (err) {
      console.error('[FPUB services]', err);
      el.dataset.state = 'error';
      el.innerHTML = `<p class="data-status err">${esc(statusText('services.error', 'Could not load services. Run supabase/schema.sql in your project, then reload.'))}</p>`;
    }
  }

  /* ---------------- SOCIAL LINKS ---------------- */
  async function renderSocialLinks() {
    const el = document.getElementById('social-links');
    if (!el) return;
    try {
      const rows = await sb('social_links?select=*&is_active=eq.true&order=sort_order.asc');
      if (!rows.length) {
        el.dataset.state = 'empty';
        el.innerHTML = '';
        return;
      }
      el.dataset.state = 'ready';
      el.innerHTML = rows.map(function (row) {
        return `<a href="${esc(row.url)}" target="_blank" rel="noopener" class="channel-btn">${esc(row.platform)}</a>`;
      }).join('');
    } catch (err) {
      console.error('[FPUB social_links]', err);
      el.dataset.state = 'error';
      el.innerHTML = '';
    }
  }

  /* ---------------- SETTINGS (contact info, copyright) ---------------- */
  async function renderSettings() {
    try {
      const rows = await sb('settings?select=email,phone,whatsapp_number,address,working_hours,google_maps_url,copyright&limit=1');
      if (!rows.length) return; // table still empty: keep the placeholder content as-is

      const s = rows[0];

      if (s.email) {
        const link = document.getElementById('contact-email-link');
        const text = document.getElementById('contact-email-text');
        if (link) link.href = 'mailto:' + s.email;
        if (text) text.textContent = s.email;
      }

      const phoneNumber = s.phone || s.whatsapp_number;
      if (phoneNumber) {
        const link = document.getElementById('contact-phone-link');
        const text = document.getElementById('contact-phone-text');
        if (link) link.href = 'tel:' + phoneNumber.replace(/[^\d+]/g, '');
        if (text) text.textContent = phoneNumber;
      }

      if (s.address) {
        const text = document.getElementById('contact-address-text');
        if (text) text.textContent = s.address;
      }

      if (s.working_hours) {
        const text = document.getElementById('contact-hours-text');
        if (text) text.textContent = s.working_hours;
      }

      const addressLink = document.getElementById('contact-address-link');
      if (addressLink) {
        if (s.google_maps_url) {
          addressLink.href = s.google_maps_url;
          addressLink.style.pointerEvents = 'auto';
        } else {
          addressLink.removeAttribute('href');
          addressLink.style.pointerEvents = 'none';
        }
      }

      if (s.copyright) {
        const el = document.getElementById('footer-copyright');
        if (el) {
          el.textContent = s.copyright;
          el.removeAttribute('data-i18n'); // stop the language switcher from overwriting this custom value
        }
      }
    } catch (err) {
      console.error('[FPUB settings]', err);
      // silently keep placeholder content — this section is optional
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderWork();
    renderServices();
    renderSocialLinks();
    renderSettings();
  });

  // Re-render text-only fallback messages when the language changes,
  // without re-fetching (data itself is not translated).
  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTimeout(function () {
          const work = document.getElementById('work-grid');
          const services = document.getElementById('services-groups');
          if (work && work.dataset.state === 'empty') renderWork();
          if (work && work.dataset.state === 'error') renderWork();
          if (services && services.dataset.state === 'empty') renderServices();
          if (services && services.dataset.state === 'error') renderServices();
        }, 0);
      });
    });
  });
})();
