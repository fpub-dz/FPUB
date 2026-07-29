/* ==========================================================================
   FPUB — Floating action buttons
   1) A round "chat" button (bottom-right, always visible) that opens a small
      menu with direct links to WhatsApp / Messenger / Instagram / Email /
      Phone, built from the same live Supabase data as the contact section
      (no lead form here — this is a direct, one-tap jump into the chat).
   2) A smaller button that smooth-scrolls straight to the contact form.
   ========================================================================== */
(function () {

  const ICONS = {
    whatsapp: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M20.5 3.5A10.9 10.9 0 0012 0 11 11 0 001.6 15.9L0 22l6.3-1.6A11 11 0 1020.5 3.5zM12 20a9 9 0 01-4.6-1.3l-.3-.2-3.3.9.9-3.2-.2-.3A9 9 0 1112 20zm5-6.7c-.3-.1-1.6-.8-1.8-.9-.2-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.5.1-1.5-.7-2.5-1.3-3.5-3-.3-.5.3-.4.7-1.4.1-.2 0-.4 0-.5L9.7 7c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-1 1-1 2.3s1 2.7 1.1 2.9c.1.2 2 3 4.8 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.6-.7 1.9-1.3.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.6-.4z"/></svg>',
    messenger: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2C6.5 2 2 6.1 2 11.5c0 3 1.4 5.7 3.7 7.5V22l3.5-1.9c.9.3 1.9.4 2.8.4 5.5 0 10-4.1 10-9.5S17.5 2 12 2zm1 12.8l-2.6-2.7-4.9 2.7L11 9l2.6 2.7L18.5 9 13 14.8z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
    email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M4 4h16v16H4z"/><path d="M4 6l8 7 8-7"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.5 2.1L8 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.9.3 1.8.5 2.7.6a2 2 0 011.7 2z"/></svg>'
  };

  function digitsOnly(str) {
    return (str || '').replace(/[^\d+]/g, '').replace(/^\+/, '');
  }

  function label(key, fallback) {
    const t = window.FPUB_TRANSLATIONS;
    return (t && t.contact && t.contact.channelPicker && t.contact.channelPicker[key]) || fallback;
  }

  async function buildMenu() {
    const list = document.getElementById('fab-chat-list');
    if (!list) return;

    const getInfo = window.FPUB_getBusinessInfo;
    if (typeof getInfo !== 'function') {
      list.innerHTML = '';
      return;
    }

    try {
      const info = await getInfo();
      const items = [];

      const waNumber = digitsOnly(info.whatsapp || info.whatsappUrl);
      if (waNumber) items.push({ key: 'whatsapp', href: `https://wa.me/${waNumber}`, external: true });
      if (info.facebookUrl) items.push({ key: 'messenger', href: info.facebookUrl, external: true });
      if (info.instagramUrl) items.push({ key: 'instagram', href: info.instagramUrl, external: true });
      if (info.email) items.push({ key: 'email', href: `mailto:${info.email}`, external: false });
      const phoneNumber = digitsOnly(info.phone || info.whatsapp);
      if (phoneNumber) items.push({ key: 'phone', href: `tel:${phoneNumber}`, external: false });

      if (!items.length) {
        list.innerHTML = '';
        return;
      }

      list.innerHTML = items.map(function (item) {
        const text = label(item.key, item.key);
        const attrs = item.external ? ' target="_blank" rel="noopener"' : '';
        return `<a class="fab-menu-item" href="${item.href}"${attrs}>${ICONS[item.key]}<span>${text}</span></a>`;
      }).join('');
    } catch (err) {
      console.error('[FPUB fab menu]', err);
      list.innerHTML = '';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const chatBtn = document.getElementById('fab-chat-btn');
    const chatMenu = document.getElementById('fab-chat-menu');
    const formBtn = document.getElementById('fab-form-btn');
    let menuBuilt = false;

    if (chatBtn && chatMenu) {
      chatBtn.addEventListener('click', function () {
        const isOpen = !chatMenu.hidden;
        if (isOpen) {
          chatMenu.hidden = true;
          chatBtn.setAttribute('aria-expanded', 'false');
        } else {
          chatMenu.hidden = false;
          chatBtn.setAttribute('aria-expanded', 'true');
          if (!menuBuilt) { menuBuilt = true; buildMenu(); }
        }
      });

      document.addEventListener('click', function (e) {
        if (!chatMenu.hidden && !chatMenu.contains(e.target) && e.target !== chatBtn && !chatBtn.contains(e.target)) {
          chatMenu.hidden = true;
          chatBtn.setAttribute('aria-expanded', 'false');
        }
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !chatMenu.hidden) {
          chatMenu.hidden = true;
          chatBtn.setAttribute('aria-expanded', 'false');
          chatBtn.focus();
        }
      });

      // Re-render the menu labels when the language changes.
      document.querySelectorAll('.lang-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
          if (menuBuilt) setTimeout(buildMenu, 0);
        });
      });
    }

    if (formBtn) {
      formBtn.addEventListener('click', function () {
        setTimeout(function () {
          const firstField = document.getElementById('cf-firstname');
          if (firstField) firstField.focus({ preventScroll: true });
        }, 500);
      });
    }
  });
})();
