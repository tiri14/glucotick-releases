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
    const size = new Intl.NumberFormat('es', {maximumFractionDigits: 1}).format(asset.size / 1048576);
    const info = document.getElementById('release-info');
    if (info) info.textContent = `Versión ${version} · ${size} MiB · Windows x64 · Gratis`;
  } catch (_) {
    // The HTML links remain usable without JavaScript or API access.
  } finally {clearTimeout(timeout);}
}
latestRelease();
