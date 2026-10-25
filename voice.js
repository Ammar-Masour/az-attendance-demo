// User-provided recordings; never autoplay or overlap narration tracks.
document.addEventListener('play',event=>{
  if(!(event.target instanceof HTMLAudioElement))return;
  document.querySelectorAll('audio').forEach(player=>{if(player!==event.target)player.pause();});
},true);
document.addEventListener('click',event=>{
  const button=event.target.closest('[data-stop-audio]');if(!button)return;
  const player=document.getElementById(button.dataset.stopAudio);
  if(player){player.pause();if(Number.isFinite(player.duration))player.currentTime=0;}
});
document.querySelectorAll('audio').forEach(player=>player.addEventListener('error',()=>{
  const note=player.closest('.voice-track').querySelector('.voice-error');note.hidden=false;
}));
