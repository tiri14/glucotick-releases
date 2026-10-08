'use strict';
async function latestRelease() {
  const control = new AbortController();
  const timeout = setTimeout(() => control.abort(), 7000);
  try {
    const response = await fetch('https://api.github.com/repos/tiri14/glucotick-releases/releases/latest', {signal: control.signal, headers: {Accept: 'application/vnd.github+json'}});
    if (!response.ok) return;
    const release = await response.json();
    if (release.draft || release.prerelease || !/^v?\d+\.\d+\.\d+$/.test(release.tag_name || '')) return;
    const version = release.tag_name.replace(/^v/, '');
    const asset = (release.assets || []).find(item => item.name === `GlucoTick-Setup-${version}.exe` && item.state === 'uploaded');
    if (!asset || !Number.isFinite(asset.size) || asset.size <= 0) return;
    const url = new URL(asset.browser_download_url);
    if (url.origin !== 'https://github.com' || url.pathname !== `/tiri14/glucotick-releases/releases/download/${release.tag_name}/${asset.name}` || url.search || url.hash) return;
    document.querySelectorAll('.download').forEach(link => {link.href = url.href;});
    const en = document.documentElement.lang === 'en';
    const size = new Intl.NumberFormat(en ? 'en' : 'es', {maximumFractionDigits: 1}).format(asset.size / 1048576);
    const info = document.getElementById('release-info');
    if (info) info.textContent = en ? `Version ${version} · ${size} MiB · Windows x64 · Free` : `Versión ${version} · ${size} MiB · Windows x64 · Gratis`;
    const schema = document.querySelector('script[type="application/ld+json"]');
    if (schema) {
      const data = JSON.parse(schema.textContent);
      if (data['@type'] === 'SoftwareApplication') {
        data.softwareVersion = version;
        schema.textContent = JSON.stringify(data);
      }
    }
  } catch (_) {
    // The HTML links remain usable without JavaScript or API access.
  } finally {clearTimeout(timeout);}
}
latestRelease();

// Progressive enhancement: every screenshot remains visible without JavaScript.
function enhanceGallery() {
  const root = document.querySelector('.native-gallery');
  if (!root) return;
  const list = root.querySelector('.gallery-tabs');
  const tabs = [...list.querySelectorAll('[role="tab"]')];
  const panels = tabs.map(tab => document.getElementById(tab.getAttribute('aria-controls')));
  if (panels.some(panel => !panel)) return;
  function select(index, focus) {
    tabs.forEach((tab, i) => {
      tab.setAttribute('aria-selected', String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
      panels[i].setAttribute('role', 'tabpanel');
      panels[i].tabIndex = 0;
    });
    if (focus) tabs[index].focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(index, false));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next === undefined) return;
      event.preventDefault();
      select(next, true);
    });
  });
  root.classList.add('gallery-enhanced');
  list.hidden = false;
  select(0, false);
}
enhanceGallery();
