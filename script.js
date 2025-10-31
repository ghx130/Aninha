// Floating hearts
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

// Ensure audio plays on first user interaction when blocked
const audio = document.getElementById('musica');
if (audio) {
  const start = () => { audio.play().catch(() => {}); window.removeEventListener('click', start); window.removeEventListener('touchstart', start); };
  window.addEventListener('click', start);
  window.addEventListener('touchstart', start);
}

// Counter: days/hours/minutes since a start date
function atualizarContadorTempo() {
  // primeira conversa
  const dataInicio = new Date('2025-04-06T00:00:00');
  const agora = new Date();
  const diffMs = agora - dataInicio;
  const dias = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  const restoMs = diffMs % (24 * 60 * 60 * 1000);
  const horas = Math.floor(restoMs / (60 * 60 * 1000));
  const minutos = Math.floor((restoMs % (60 * 60 * 1000)) / (60 * 1000));
  const sd = document.getElementById('dias');
  const sh = document.getElementById('horas');
  const sm = document.getElementById('minutos');
  if (sd) sd.innerText = dias;
  if (sh) sh.innerText = horas;
  if (sm) sm.innerText = minutos;

  // namoro oficial
  const dataNamoro = new Date('2025-09-26T00:00:00');
  const diffMsN = agora - dataNamoro;
  const diasN = Math.floor(diffMsN / (24 * 60 * 60 * 1000));
  const restoMsN = diffMsN % (24 * 60 * 60 * 1000);
  const horasN = Math.floor(restoMsN / (60 * 60 * 1000));
  const minutosN = Math.floor((restoMsN % (60 * 60 * 1000)) / (60 * 1000));
  const sdN = document.getElementById('dias_namoro');
  const shN = document.getElementById('horas_namoro');
  const smN = document.getElementById('minutos_namoro');
  if (sdN) sdN.innerText = diasN >= 0 ? diasN : 0;
  if (shN) shN.innerText = horasN >= 0 ? horasN : 0;
  if (smN) smN.innerText = minutosN >= 0 ? minutosN : 0;
}
document.addEventListener('DOMContentLoaded', atualizarContadorTempo);
setInterval(atualizarContadorTempo, 60 * 1000);

// Surprise button
document.addEventListener('DOMContentLoaded', () => {
  const botao = document.getElementById('botaoSurpresa');
  const msg = document.getElementById('mensagemSurpresa');
  if (!botao || !msg) return;
  botao.addEventListener('click', (ev) => {
    ev.preventDefault();
    const aberto = msg.style.display !== 'block';
    msg.style.display = aberto ? 'block' : 'none';
    msg.setAttribute('aria-hidden', aberto ? 'false' : 'true');
  });
});

// Simple album modal functionality
const ALBUM = (function(){
  let imagens = [];
  let legendas = [];
  let idx = 0;

  function scanGallery() {
    const figs = Array.from(document.querySelectorAll('.grid figure'));
    figs.forEach(f => {
      const img = f.querySelector('img');
      const cap = f.querySelector('figcaption');
      if (img) {
        imagens.push(img.getAttribute('src'));
        legendas.push(cap ? cap.innerText : '');
      }
    });
    // probe additional numbered fotos (1..12)
    for (let i=1;i<=12;i++){
      const p = `Fotos/foto${i}.jpeg`;
      if (!imagens.includes(p)) {
        const test = new Image();
        test.onload = () => { imagens.push(p); legendas.push(''); renderThumbs(); };
        test.onerror = () => {}; test.src = p;
      }
    }
  }

  function openAt(i){ idx = i; updateView(); showModal(); }

  function showModal(){ const m = document.getElementById('albumModal'); if (m) { m.classList.remove('hidden'); m.setAttribute('aria-hidden','false'); }}
  function hideModal(){ const m = document.getElementById('albumModal'); if (m) { m.classList.add('hidden'); m.setAttribute('aria-hidden','true'); }}

  function updateView(){
    const img = document.getElementById('albumImg');
    const cap = document.getElementById('albumCaption');
    const thumbs = document.getElementById('albumThumbs');
    if (!img || !cap || !thumbs) return;
    img.src = imagens[idx] || imagens[0] || '';
    cap.innerText = legendas[idx] || '';
    Array.from(thumbs.children).forEach((t, i)=> t.classList.toggle('active', i===idx));
  }

  function prev(){ idx = (idx -1 + imagens.length) % imagens.length; updateView(); }
  function next(){ idx = (idx +1) % imagens.length; updateView(); }

  function renderThumbs(){
    const thumbs = document.getElementById('albumThumbs');
    if (!thumbs) return;
    thumbs.innerHTML = '';
    imagens.forEach((s, i)=>{
      const t = document.createElement('img'); t.src = s; t.alt = legendas[i] || '';
      if (i===idx) t.classList.add('active');
      t.addEventListener('click', ()=> { idx = i; updateView(); });
      thumbs.appendChild(t);
    });
    updateView();
  }

  function bind(){
    const open = document.getElementById('abrirAlbumLarge');
    const close = document.querySelector('.album-close');
    const prevBtn = document.querySelector('.album-prev');
    const nextBtn = document.querySelector('.album-next');
    if (open) open.addEventListener('click', ()=> openAt(0));
    if (close) close.addEventListener('click', hideModal);
    if (prevBtn) prevBtn.addEventListener('click', prev);
    if (nextBtn) nextBtn.addEventListener('click', next);
    document.addEventListener('keydown', (ev)=>{
      if (document.getElementById('albumModal').classList.contains('hidden')) return;
      if (ev.key==='ArrowLeft') prev();
      if (ev.key==='ArrowRight') next();
      if (ev.key==='Escape') hideModal();
    });
  }

  return { init(){ scanGallery(); bind(); renderThumbs(); } };
})();

document.addEventListener('DOMContentLoaded', ()=> ALBUM.init());
