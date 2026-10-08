'use strict';
(() => {
  const controls = document.querySelector('.demo-controls');
  const scenes = [...document.querySelectorAll('.demo-scene')];
  const status = document.getElementById('demo-status');
  if (!controls || scenes.length !== 4 || !status) return;
  const en = document.documentElement.lang === 'en';
  let timer;
  function showAll() {
    clearTimeout(timer);
    scenes.forEach(scene => { scene.hidden = false; });
    status.textContent = en ? 'All four views are visible.' : 'Las cuatro vistas están visibles.';
  }
  function show(index) {
    scenes.forEach((scene, i) => { scene.hidden = i !== index; });
    status.textContent = `${index + 1} / 4 — ${scenes[index].querySelector('h2').textContent}`;
    timer = setTimeout(() => { if (index < scenes.length - 1) show(index + 1); else showAll(); }, 6000);
  }
  document.getElementById('demo-start').addEventListener('click', () => {
    clearTimeout(timer);
    show(0);
  });
  document.getElementById('demo-stop').addEventListener('click', showAll);
  document.addEventListener('visibilitychange', () => { if (document.hidden) showAll(); });
  controls.hidden = false;
})();
