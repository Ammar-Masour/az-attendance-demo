// User-provided recordings. Follow narration at section level, not word timing.
const players=[...document.querySelectorAll('audio')];
const panel=document.querySelector('.voice-panel');
let currentPlayer=null;
const mini=document.createElement('div');mini.className='voice-mini';mini.hidden=true;
mini.innerHTML='<span id="voice-mini-title"></span><button type="button" class="ghost" id="voice-mini-toggle">إيقاف مؤقت</button><button type="button" class="ghost" id="voice-mini-stop">إنهاء الشرح</button>';
document.body.appendChild(mini);
document.getElementById('voice-mini-toggle').addEventListener('click',()=>{if(currentPlayer){if(currentPlayer.paused)currentPlayer.play().catch(()=>{});else currentPlayer.pause();}});
document.getElementById('voice-mini-stop').addEventListener('click',()=>{if(currentPlayer){currentPlayer.pause();currentPlayer.currentTime=0;}mini.hidden=true;});
const controls=document.createElement('div');
controls.className='voice-follow';
controls.innerHTML='<label><input type="checkbox" id="follow-voice" checked> افتح الشاشة المناسبة مع الشرح</label><label><input type="checkbox" id="continuous-voice"> كمّل الأجزاء بالترتيب تلقائيًا بعد التشغيل</label><p class="muted" id="voice-status" aria-live="polite">اضغط تشغيل على الجزء اللي عايز تسمعه.</p>';
panel.insertBefore(controls,panel.querySelector('.voice-track'));
function partOf(player){return Number(player.querySelector('source').getAttribute('src').match(/\/(\d+)-/)[1]);}
document.addEventListener('play',event=>{
  if(!(event.target instanceof HTMLAudioElement))return;
  const active=event.target;
  currentPlayer=active;mini.hidden=false;
  document.getElementById('voice-mini-title').textContent=active.closest('details').querySelector('summary').textContent;
  document.getElementById('voice-mini-toggle').textContent='إيقاف مؤقت';
  players.forEach(player=>{if(player!==active)player.pause();});
  players.forEach(player=>{if(player!==active)player.closest('details').open=false;});
  active.closest('details').open=true;
  document.getElementById('voice-status').textContent='جاري تشغيل: '+active.closest('details').querySelector('summary').textContent;
  if(document.getElementById('follow-voice').checked){
    document.dispatchEvent(new CustomEvent('az:narration',{detail:{part:partOf(active)}}));
    document.getElementById('app').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }
},true);
document.addEventListener('click',event=>{
  const navigation=event.target.closest('[data-a]');
  if(navigation&&['role','tab','guide','reset'].includes(navigation.dataset.a)){
    players.forEach(player=>player.pause());
    mini.hidden=true;
    document.getElementById('voice-status').textContent='الشرح متوقف أثناء تنقلك. اضغط تشغيل لاستكماله.';
  }
  const button=event.target.closest('[data-stop-audio]');if(!button)return;
  const player=document.getElementById(button.dataset.stopAudio);
  if(player){player.pause();if(Number.isFinite(player.duration))player.currentTime=0;document.getElementById('voice-status').textContent='تم إيقاف الجزء والرجوع للبداية.';}
});
players.forEach(player=>{
  player.addEventListener('pause',()=>{if(currentPlayer===player)document.getElementById('voice-mini-toggle').textContent='استكمال الشرح';});
  player.addEventListener('ended',()=>{
    const next=players[players.indexOf(player)+1];
    if(next&&document.getElementById('continuous-voice').checked){next.currentTime=0;next.play().catch(()=>{document.getElementById('voice-status').textContent='اضغط تشغيل على الجزء التالي للمتابعة.';});}
    else{mini.hidden=true;document.getElementById('voice-status').textContent='انتهى الجزء. تقدر تجرب الخطوات أو تشغّل الجزء التالي.';}
  });
  player.addEventListener('error',()=>{
  const note=player.closest('.voice-track').querySelector('.voice-error');note.hidden=false;
  });
});
