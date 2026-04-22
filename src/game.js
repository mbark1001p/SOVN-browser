"use strict";
/* ── SOVN RUNNER (Flappy-bird style, blue neon) ─────────── */

let _gameRunning = false;
let _gameFrame   = null;

function initGame() {
  const canvas = document.getElementById('gc');
  if (!canvas || _gameRunning) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth  || window.innerWidth;
    canvas.height = canvas.offsetHeight || (window.innerHeight - 90);
  }
  resize();
  window.addEventListener('resize', resize);

  /* state */
  const W = () => canvas.width;
  const H = () => canvas.height;

  const BIRD_R = 14;
  const GAP    = 170;
  const PIPE_W = 38;
  const SPEED  = 2.8;
  const GRAV   = 0.38;
  const JUMP   = -7.2;

  let bird, pipes, score, best, started, dead, raf;

  function reset() {
    bird    = { x: W() * 0.22, y: H() / 2, vy: 0 };
    pipes   = [];
    score   = 0;
    best    = parseInt(localStorage.getItem('sovn_best') || '0');
    started = false;
    dead    = false;
  }

  function spawnPipe() {
    const top = 60 + Math.random() * (H() - GAP - 120);
    pipes.push({ x: W(), top, scored: false });
  }

  function jump() {
    if (dead) { reset(); return; }
    if (!started) started = true;
    bird.vy = JUMP;
  }

  /* controls */
  canvas.addEventListener('click',     jump);
  canvas.addEventListener('touchstart', e => { e.preventDefault(); jump(); }, { passive: false });
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
      const off = document.getElementById('offline');
      if (off && off.classList.contains('on')) { e.preventDefault(); jump(); }
    }
  });

  /* draw helpers */
  const NEON = '#1e90ff';
  const NEON2= '#00bfff';

  function glowRect(x, y, w, h, color) {
    ctx.save();
    ctx.shadowColor = color;
    ctx.shadowBlur  = 16;
    ctx.fillStyle   = color;
    ctx.fillRect(x, y, w, h);
    ctx.restore();
  }

  function drawBird(bx, by) {
    ctx.save();
    ctx.shadowColor = NEON;
    ctx.shadowBlur  = 20;
    /* body */
    ctx.beginPath();
    ctx.arc(bx, by, BIRD_R, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    /* inner glow ring */
    ctx.beginPath();
    ctx.arc(bx, by, BIRD_R - 4, 0, Math.PI * 2);
    ctx.fillStyle = NEON;
    ctx.fill();
    ctx.restore();
  }

  function drawPipe(p) {
    const r = 6;
    /* top pipe */
    roundRect(ctx, p.x, 0, PIPE_W, p.top, r);
    /* bottom pipe */
    roundRect(ctx, p.x, p.top + GAP, PIPE_W, H() - p.top - GAP, r);
  }

  function roundRect(c, x, y, w, h, r) {
    c.save();
    c.shadowColor = NEON2;
    c.shadowBlur  = 12;
    c.fillStyle   = '#0a2540';
    c.strokeStyle = NEON2;
    c.lineWidth   = 2;
    c.beginPath();
    c.roundRect(x, y, w, h, r);
    c.fill();
    c.stroke();
    c.restore();
  }

  function drawBg() {
    ctx.fillStyle = '#0d1b2a';
    ctx.fillRect(0, 0, W(), H());
    /* subtle grid */
    ctx.save();
    ctx.strokeStyle = 'rgba(30,144,255,.06)';
    ctx.lineWidth = 1;
    for (let gx = 0; gx < W(); gx += 40) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H()); ctx.stroke();
    }
    for (let gy = 0; gy < H(); gy += 40) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W(), gy); ctx.stroke();
    }
    ctx.restore();
  }

  function drawHud() {
    ctx.save();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 32px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = NEON;
    ctx.shadowBlur  = 12;
    ctx.fillText(score, W() / 2, 54);
    ctx.restore();
  }

  function drawMsg(msg, sub) {
    ctx.save();
    ctx.fillStyle = 'rgba(13,27,42,.75)';
    ctx.fillRect(W()/2 - 160, H()/2 - 70, 320, sub ? 130 : 90);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px "Segoe UI", sans-serif';
    ctx.textAlign = 'center';
    ctx.shadowColor = NEON;
    ctx.shadowBlur  = 10;
    ctx.fillText(msg, W() / 2, H() / 2 - 30);
    if (sub) {
      ctx.font = '14px "Segoe UI", sans-serif';
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#8ab4d4';
      ctx.fillText(sub, W() / 2, H() / 2);
      ctx.fillStyle = '#fff';
      ctx.fillText(`Best: ${best}`, W() / 2, H() / 2 + 26);
    }
    ctx.font = '13px "Segoe UI", sans-serif';
    ctx.fillStyle = '#8ab4d4';
    ctx.fillText('Click / Space to ' + (dead ? 'retry' : 'start'), W() / 2, H() / 2 + (sub ? 56 : 30));
    ctx.restore();
  }

  let pipeTimer = 0;

  function loop() {
    raf = requestAnimationFrame(loop);

    drawBg();

    if (!started) {
      drawBird(bird.x, bird.y);
      drawMsg('SOVN Runner', null);
      return;
    }

    if (!dead) {
      /* physics */
      bird.vy += GRAV;
      bird.y  += bird.vy;

      /* pipes */
      pipeTimer++;
      if (pipeTimer > 90) { spawnPipe(); pipeTimer = 0; }
      pipes.forEach(p => p.x -= SPEED);
      pipes = pipes.filter(p => p.x + PIPE_W > 0);

      /* score */
      pipes.forEach(p => {
        if (!p.scored && p.x + PIPE_W < bird.x) { p.scored = true; score++; }
      });

      /* collision */
      if (bird.y - BIRD_R < 0 || bird.y + BIRD_R > H()) { die(); }
      pipes.forEach(p => {
        if (bird.x + BIRD_R > p.x && bird.x - BIRD_R < p.x + PIPE_W &&
            (bird.y - BIRD_R < p.top || bird.y + BIRD_R > p.top + GAP)) { die(); }
      });
    }

    /* draw pipes */
    pipes.forEach(drawPipe);
    drawBird(bird.x, bird.y);
    drawHud();

    if (dead) drawMsg('Game Over', `Score: ${score}`);
  }

  function die() {
    dead = true;
    if (score > best) { best = score; localStorage.setItem('sovn_best', best); }
  }

  function start() {
    reset();
    pipeTimer = 60;
    _gameRunning = true;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    _gameRunning = false;
    if (raf) cancelAnimationFrame(raf);
    window.removeEventListener('resize', resize);
  }

  window.stopGame = stop;

  canvas.focus();
  start();
}
