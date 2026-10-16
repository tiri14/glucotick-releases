/* GlucoTick web analytics. Stable consent key: do not include the release number. */
(function () {
  'use strict';
  const endpoint = 'https://glucotick-stats.xavierimarina14.chatgpt.site/api/collect';
  const consentKey = 'glucotick.analytics.consent';
  const sessionKey = 'glucotick.analytics.session';
  const en = document.documentElement.lang === 'en';
  let consent = '', session = '', sentPage = false;
  try { consent = localStorage.getItem(consentKey) || ''; } catch (_) {}
  function allowed() { return consent === 'yes' && navigator.doNotTrack !== '1' && navigator.globalPrivacyControl !== true; }
  function getSession() {
    if (session) return session;
    try {
      session = sessionStorage.getItem(sessionKey) || crypto.randomUUID();
      sessionStorage.setItem(sessionKey, session);
    } catch (_) { session = crypto.randomUUID(); }
    return session;
  }
  function emit(kind, link) {
    if (!allowed() || typeof crypto.randomUUID !== 'function') return;
    const query = new URLSearchParams(location.search);
    let ref = '';
    try { ref = document.referrer ? new URL(document.referrer).origin : ''; } catch (_) {}
    const safe = value => /^[a-zA-Z0-9._ /-]{1,60}$/.test(value || '') ? value : '';
    const payload = { id: crypto.randomUUID(), session: getSession(), consent: true, kind,
      path: location.pathname, referrer: ref, language: navigator.language,
      source: safe(query.get('utm_source')), medium: safe(query.get('utm_medium')), campaign: safe(query.get('utm_campaign')) };
    if (link) {
      const u = new URL(link.href);
      payload.version = (u.pathname.match(/\/v(\d+\.\d+\.\d+)\//) || [])[1] || '';
      payload.format = /\.exe$/i.test(u.pathname) ? 'exe' : /\.zip$/i.test(u.pathname) ? 'zip' : 'release';
      payload.placement = link.dataset.analyticsPlacement || (link.closest('header') ? 'header' : link.closest('footer') ? 'footer' : 'content');
    }
    // Never block or replace the actual download. No retries inflate click counts.
    try { fetch(endpoint, { method: 'POST', mode: 'cors', credentials: 'omit', keepalive: true,
      headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload) }).catch(() => {}); } catch (_) {}
  }
  function pageview() { if (!sentPage && allowed()) { sentPage = true; emit('pageview'); } }
  function preferences() {
    let panel = document.getElementById('analytics-choice');
    if (panel) { panel.hidden = false; return; }
    panel = document.createElement('aside'); panel.id = 'analytics-choice';
    panel.setAttribute('role', 'region'); panel.setAttribute('aria-label', en ? 'Optional statistics' : 'Estadísticas opcionales');
    panel.className = 'analytics-choice';
    const text = document.createElement('p');
    text.textContent = en ? 'May we measure visits and download clicks? We collect the page, referral domain, campaign, language, browser, system and approximate country when available. No glucose data, credentials or stored IP addresses.' : '¿Nos permites medir visitas y clics de descarga? Recogemos página, web de procedencia, campaña, idioma, navegador, sistema y país aproximado cuando esté disponible. Sin glucosa, credenciales ni direcciones IP almacenadas.';
    panel.append(text);
    const privacy = document.createElement('a');privacy.href = en ? 'privacy.html#web-statistics' : 'privacidad.html#estadisticas-web';privacy.textContent = en ? 'Details' : 'Más información';panel.append(privacy);
    for (const [value, label] of [['no', en ? 'Reject' : 'Rechazar'], ['yes', en ? 'Accept' : 'Aceptar']]) {
      const button = document.createElement('button');button.type = 'button';button.textContent = label;
      button.addEventListener('click', () => {
        consent = value; try { localStorage.setItem(consentKey, value); if (value === 'no') sessionStorage.removeItem(sessionKey); } catch (_) {}
        if (value === 'no') session = '';
        panel.hidden = true;pageview();
      });panel.append(button);
    }
    document.body.append(panel);
  }
  const settings = document.createElement('button');settings.type = 'button';settings.className = 'analytics-settings';settings.textContent = en ? 'Statistics preferences' : 'Preferencias de estadísticas';settings.addEventListener('click', preferences);
  (document.querySelector('footer') || document.body).append(settings);
  document.addEventListener('click', event => {
    const link = event.target.closest && event.target.closest('a[href]');if (!link) return;
    let u;try { u = new URL(link.href); } catch (_) { return; }
    if (u.origin === 'https://github.com' && /^\/tiri14\/glucotick-releases\/releases\/(download\/|latest\/?$)/.test(u.pathname)) emit('download', link);
  });
  if (consent) pageview(); else if (navigator.doNotTrack !== '1' && navigator.globalPrivacyControl !== true) preferences();
}());
