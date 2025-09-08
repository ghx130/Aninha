// Corações subindo
function soltarCoracao() {
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = '❤';
  h.style.left = Math.random() * 100 + 'vw';
  h.style.fontSize = (12 + Math.random() * 28) + 'px';
  document.body.appendChild(h);
  setTimeout(() => h.remove(), 6000);
}
setInterval(soltarCoracao, 1200);

// (opcional) tentar dar play na música no primeiro clique/tap
const audio = document.getElementById('musica');
if (audio) {
  const start = () => { audio.play().catch(() => {}); window.removeEventListener('click', start); window.removeEventListener('touchstart', start); };
  window.addEventListener('click', start);
  window.addEventListener('touchstart', start);
}