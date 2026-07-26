/* ==========================================================================
   FPUB — Contact form -> Supabase
   Inserts a row into the "contact_submissions" table via the PostgREST API,
   using the project's public anon key (safe to expose client-side as long
   as Row Level Security only grants INSERT to the anon role — see
   /supabase/schema.sql).
   ========================================================================== */
(function () {
  const SUPABASE_URL = 'https://lckckfslwvaoyrwtrbhu.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2NrZnNsd3Zhb3lyd3RyYmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNjg0NDQsImV4cCI6MjEwMDY0NDQ0NH0.7-a43mAfeEcbCdj_Ur86wTGTqFhMUrzXi8r7qFoUS_o';
  const TABLE = 'contact_submissions';

  async function submitToSupabase(payload) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${TABLE}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify([payload])
    });

    if (!res.ok) {
      let detail = '';
      try { detail = await res.text(); } catch (e) { /* noop */ }
      throw new Error(`Supabase insert failed (${res.status}): ${detail}`);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusEl = document.getElementById('cf-status');
    const submitBtn = document.getElementById('cf-submit');
    const submitLabel = submitBtn ? submitBtn.querySelector('span') : null;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const dict = (window.FPUB_TRANSLATIONS && window.FPUB_TRANSLATIONS.contact) || {};
      const lang = window.FPUB_LANG || 'en';

      const payload = {
        full_name: form.full_name.value.trim(),
        email: form.email.value.trim(),
        project_scope: form.project_scope.value,
        message: form.message.value.trim(),
        locale: lang
      };

      if (!payload.full_name || !payload.email || !payload.message) {
        statusEl.textContent = dict.error || 'Please fill in all required fields.';
        statusEl.className = 'cf-status err';
        return;
      }

      const originalLabel = submitLabel ? submitLabel.textContent : '';
      if (submitBtn) submitBtn.disabled = true;
      if (submitLabel) submitLabel.textContent = dict.sending || 'Sending...';
      statusEl.textContent = '';
      statusEl.className = 'cf-status';

      try {
        await submitToSupabase(payload);
        statusEl.textContent = dict.success || 'Thanks — your inquiry has been sent.';
        statusEl.className = 'cf-status ok';
        form.reset();
      } catch (err) {
        console.error('[FPUB contact form]', err);
        statusEl.textContent = dict.error || 'Something went wrong. Please try again in a moment.';
        statusEl.className = 'cf-status err';
      } finally {
        if (submitBtn) submitBtn.disabled = false;
        if (submitLabel) submitLabel.textContent = originalLabel;
      }
    });
  });
})();
