export function createPlayer(o){
 const a=o.audio,s={queue:[],index:-1,current:null,shuffle:false,repeat:false};
 function fmt(n){return Number.isFinite(n)&&n>=0?Math.floor(n/60)+":"+String(Math.floor(n%60)).padStart(2,"0"):"0:00";}
 function state(){o.onState({playing:!a.paused,shuffle:s.shuffle,repeat:s.repeat});}
 async function play(t,q){
  if(!t)return;
  if(q&&q.length)s.queue=q.slice();else if(!s.queue.some(x=>x.id===t.id))s.queue=[t];
  s.index=s.queue.findIndex(x=>x.id===t.id);if(s.index<0){s.queue.push(t);s.index=s.queue.length-1;}
  s.current=t;o.onTrack(t);o.onQueue(s.queue,s.index);
  if(!t.preview){o.notify("No preview here. Use Open full track to listen on the provider.");state();return;}
  a.src=t.preview;a.load();try{await a.play();}catch(e){o.notify("Tap Play to start this preview.");}state();
 }
 function move(d){if(!s.queue.length){o.notify("Add songs to the queue first.");return;}if(s.shuffle&&d>0&&s.queue.length>1){let i=s.index;while(i===s.index)i=Math.floor(Math.random()*s.queue.length);s.index=i;}else s.index=(s.index+d+s.queue.length)%s.queue.length;play(s.queue[s.index],s.queue);}
 function enqueue(t){if(!t)return;if(!s.queue.some(x=>x.id===t.id))s.queue.push(t);o.onQueue(s.queue,s.index);o.notify("Added to queue");}
 a.addEventListener("play",state);a.addEventListener("pause",state);
 a.addEventListener("timeupdate",()=>o.onTime({current:fmt(a.currentTime),duration:fmt(a.duration||(s.current&&s.current.duration)||30),progress:a.duration?a.currentTime/a.duration*100:0}));
 a.addEventListener("ended",()=>{if(s.repeat){a.currentTime=0;a.play().catch(()=>{});}else move(1);});
 return {play,toggle:()=>{if(!s.current)return o.notify("Choose a track first.");if(!s.current.preview)return o.notify("Use Open full track to listen on the provider.");if(a.paused)a.play().catch(()=>o.notify("This preview could not be played."));else a.pause();},previous:()=>move(-1),next:()=>move(1),enqueue,removeFromQueue:i=>{s.queue.splice(i,1);if(i<s.index)s.index--;else if(i===s.index){a.pause();s.current=null;s.index=-1;}o.onQueue(s.queue,s.index);},clearQueue:()=>{s.queue=[];s.index=-1;a.pause();s.current=null;o.onQueue([], -1);state();},getQueue:()=>s.queue.slice(),seek:n=>{if(a.duration)a.currentTime=Math.max(0,Math.min(100,Number(n)))/100*a.duration;},setVolume:n=>{a.volume=Math.max(0,Math.min(1,Number(n)));},toggleShuffle:()=>{s.shuffle=!s.shuffle;state();return s.shuffle;},toggleRepeat:()=>{s.repeat=!s.repeat;state();return s.repeat;},getCurrent:()=>s.current};
}