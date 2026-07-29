/* ==========================================================================
   FPUB — Contact form v2
   Flow: user fills First Name / Last Name / Phone / Email -> clicks "Send"
   -> a channel picker appears (WhatsApp / Messenger / Instagram / Email /
   Call) -> picking one (1) logs the lead in Supabase
   (fpub_contact_submissions) and (2) opens that channel with a
   pre-filled message built from the business's real contact info,
   read live from the "settings" and "social_links" tables.
   ========================================================================== */
(function () {
  const SUPABASE_URL = 'https://lckckfslwvaoyrwtrbhu.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxja2NrZnNsd3Zhb3lyd3RyYmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwNjg0NDQsImV4cCI6MjEwMDY0NDQ0NH0.7-a43mAfeEcbCdj_Ur86wTGTqFhMUrzXi8r7qFoUS_o';

  async function sbGet(path) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
      headers: { 'apikey': SUPABASE_ANON_KEY, 'Authorization': `Bearer ${SUPABASE_ANON_KEY}` }
    });
    if (!res.ok) throw new Error(`Supabase read failed (${res.status}) for ${path}`);
    return res.json();
  }

  async function sbInsert(table, payload) {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}`, {
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

  // Cache the business's own contact destinations (fetched once per page load).
  let businessInfoPromise = null;
  function getBusinessInfo() {
    if (businessInfoPromise) return businessInfoPromise;
    businessInfoPromise = Promise.all([
      sbGet('settings?select=email,phone,whatsapp_number&limit=1').catch(function () { return []; }),
      sbGet('social_links?select=platform,url&is_active=eq.true').catch(function () { return []; })
    ]).then(function (results) {
      const settingsRows = results[0] || [];
      const socialRows = results[1] || [];
      const s = settingsRows[0] || {};

      function findSocial(nameMatch) {
        const row = socialRows.find(function (r) {
          return r.platform && r.platform.toLowerCase().indexOf(nameMatch) !== -1;
        });
        return row ? row.url : null;
      }

      return {
        whatsapp: s.whatsapp_number || null,
        email: s.email || null,
        phone: s.phone || null,
        instagramUrl: findSocial('instagram'),
        facebookUrl: findSocial('facebook'),
        whatsappUrl: findSocial('whatsapp')
      };
    });
    return businessInfoPromise;
  }

  function digitsOnly(str) {
    return (str || '').replace(/[^\d+]/g, '').replace(/^\+/, '');
  }

  function dict() {
    return (window.FPUB_TRANSLATIONS && window.FPUB_TRANSLATIONS.contact) || {};
  }

  function buildMessage(data) {
    const t = dict().messageTemplate ||
      'Hello, my name is {name}. Phone: {phone}. Email: {email}. I would like to know more about your services.';
    return t
      .replace('{name}', data.fullName)
      .replace('{phone}', data.phone)
      .replace('{email}', data.email);
  }

  async function copyToClipboard(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      return false;
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusEl = document.getElementById('cf-status');
    const submitBtn = document.getElementById('cf-submit');
    const channelsPanel = document.getElementById('cf-channels');
    const channelButtons = channelsPanel ? channelsPanel.querySelectorAll('.channel-pick-btn') : [];

    function getFormData() {
      const firstName = form.first_name.value.trim();
      const lastName = form.last_name.value.trim();
      return {
        firstName: firstName,
        lastName: lastName,
        fullName: (firstName + ' ' + lastName).trim(),
        phone: form.phone.value.trim(),
        email: form.email.value.trim()
      };
    }

    function setStatus(text, kind) {
      statusEl.textContent = text || '';
      statusEl.className = 'cf-status' + (kind ? ' ' + kind : '');
    }

    // Step 1: validate + reveal the channel picker (no redirect yet).
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = getFormData();

      if (!data.firstName || !data.lastName || !data.phone || !data.email) {
        setStatus(dict().error || 'Please fill in all required fields.', 'err');
        return;
      }

      setStatus('', '');
      if (channelsPanel) channelsPanel.hidden = false;
      if (submitBtn) submitBtn.style.display = 'none';
      getBusinessInfo(); // warm the cache while the user picks a channel
    });

    // Step 2: user picks a channel -> log lead + open that channel.
    channelButtons.forEach(function (btn) {
      btn.addEventListener('click', async function () {
        const channel = btn.getAttribute('data-channel');
        const data = getFormData();
        const lang = window.FPUB_LANG || 'en';

        channelButtons.forEach(function (b) { b.disabled = true; });
        setStatus(dict().sending || 'Sending...', '');

        try {
          await sbInsert('fpub_contact_submissions', {
            full_name: data.fullName,
            phone: data.phone,
            email: data.email,
            channel: channel,
            locale: lang
          });
        } catch (err) {
          console.error('[FPUB contact form]', err);
          setStatus(dict().error || 'Something went wrong. Please try again in a moment.', 'err');
          channelButtons.forEach(function (b) { b.disabled = false; });
          return;
        }

        const info = await getBusinessInfo();
        const message = buildMessage(data);

        if (channel === 'whatsapp') {
          const number = digitsOnly(info.whatsapp || info.whatsappUrl);
          if (number) {
            window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
          }
          setStatus(dict().success || 'Thanks — redirecting you to WhatsApp.', 'ok');

        } else if (channel === 'email') {
          const to = info.email || '';
          const subject = encodeURIComponent('New inquiry from ' + data.fullName);
          const body = encodeURIComponent(message);
          window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
          setStatus(dict().success || 'Thanks — opening your email app.', 'ok');

        } else if (channel === 'phone') {
          const number = digitsOnly(info.phone || info.whatsapp);
          if (number) window.location.href = `tel:${number}`;
          setStatus(dict().success || 'Thanks — starting the call.', 'ok');

        } else if (channel === 'messenger' || channel === 'instagram') {
          const url = channel === 'messenger' ? info.facebookUrl : info.instagramUrl;
          const copied = await copyToClipboard(message);
          if (url) window.open(url, '_blank', 'noopener');
          setStatus(
            copied
              ? (dict().channelPicker && dict().channelPicker.copied) || 'Message copied — paste it once the chat opens.'
              : (dict().success || 'Thanks — opening the page.'),
            'ok'
          );
        }

        setTimeout(function () {
          channelButtons.forEach(function (b) { b.disabled = false; });
        }, 1500);
      });
    });
  });
})();
