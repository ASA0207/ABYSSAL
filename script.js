const bgm=document.querySelector('#bgm'), gate=document.querySelector('#gate'), vol=document.querySelector('#volume'), play=document.querySelector('#playBtn'), toggle=document.querySelector('#musicToggle'), text=document.querySelector('#musicText');
bgm.volume=.22; document.body.classList.add('lock'); let playing=false;
function ui(){play.textContent=playing?'Ⅱ':'▶';toggle.classList.toggle('paused',!playing);text.textContent=playing?'BGM ON':'BGM OFF'}
async function startMusic(){try{await bgm.play();playing=true}catch(e){playing=false}ui()}
function enter(sound=true){gate.classList.add('hide');document.body.classList.remove('lock');if(sound)startMusic();else{bgm.pause();playing=false;ui()}}
document.querySelector('#enterSound').onclick=()=>enter(true);document.querySelector('#enterQuiet').onclick=()=>enter(false);addEventListener('keydown',e=>{if(e.key==='Enter'&&!gate.classList.contains('hide'))enter(true)});
function switchMusic(){if(bgm.paused)startMusic();else{bgm.pause();playing=false;ui()}} play.onclick=switchMusic;toggle.onclick=switchMusic;vol.oninput=e=>bgm.volume=+e.target.value;ui();
const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(x=>obs.observe(x));
const c=document.querySelector('#stars'),x=c.getContext('2d');let stars=[];function resize(){c.width=innerWidth*devicePixelRatio;c.height=innerHeight*devicePixelRatio;x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);stars=Array.from({length:Math.min(170,Math.floor(innerWidth/8))},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.2+.15,a:Math.random()*.55+.08,s:Math.random()*.06+.015}))}function draw(){x.clearRect(0,0,innerWidth,innerHeight);for(const p of stars){p.y-=p.s;if(p.y<0)p.y=innerHeight;x.beginPath();x.fillStyle=`rgba(200,195,255,${p.a})`;x.arc(p.x,p.y,p.r,0,Math.PI*2);x.fill()}requestAnimationFrame(draw)}addEventListener('resize',resize);resize();draw();

// 숨겨진 ASA 감사 메시지: 일반 입력창에서는 반응하지 않음
(()=>{let buffer='',timer;const layer=document.getElementById('thanksEaster'),sparks=document.getElementById('thanksSparks');function close(){layer.classList.remove('show')}function show(){sparks.replaceChildren();for(let j=0;j<115;j++){const el=document.createElement('i'),a=Math.random()*Math.PI*2,d=130+Math.random()*Math.max(innerWidth,innerHeight)*.8;el.style.setProperty('--tx',Math.cos(a)*d+'px');el.style.setProperty('--ty',Math.sin(a)*d+'px');el.style.setProperty('--sz',(3+Math.random()*11)+'px');el.style.setProperty('--col',['#ffffff','#e0b8ff','#ffb4e7','#82dfff','#ffdf82'][j%5]);el.style.setProperty('--dur',(1.2+Math.random()*1.6)+'s');el.style.setProperty('--delay',(Math.random()*.5)+'s');sparks.append(el)}layer.classList.add('show');clearTimeout(timer);timer=setTimeout(close,7000)}addEventListener('keydown',e=>{if(e.key==='Escape'){close();return}if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest('input,textarea,[contenteditable]'))return;if(e.key.length!==1)return;buffer=(buffer+e.key.toLowerCase()).slice(-3);if(buffer==='asa'){buffer='';show()}});layer.addEventListener('click',close)})();

// PREMIUM INTERACTIONS (isolated to keep the entry controls resilient)
(()=>{
 const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const toast=document.querySelector('#toast');let toastTimer;
 function notify(message){toast.textContent=message;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),3500)}
 const progress=document.querySelector('#readingProgress'),top=document.querySelector('#backTop');
 function onScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';top.classList.toggle('show',scrollY>600)}
 addEventListener('scroll',onScroll,{passive:true});onScroll();top.onclick=()=>scrollTo({top:0,behavior:reduce?'instant':'smooth'});
 const halo=document.querySelector('#pointerHalo');if(!reduce&&matchMedia('(pointer:fine)').matches){addEventListener('pointermove',e=>{halo.style.left=e.clientX+'px';halo.style.top=e.clientY+'px'},{passive:true})}else halo.remove();
 const particles=document.querySelector('#gateParticles');if(!reduce)for(let j=0;j<52;j++){let a=document.createElement('i');a.style.setProperty('--x',Math.random()*100+'%');a.style.setProperty('--y',Math.random()*100+'%');a.style.setProperty('--s',(.7+Math.random()*2)+'px');a.style.setProperty('--t',(2+Math.random()*5)+'s');a.style.setProperty('--d',(-Math.random()*6)+'s');particles.append(a)}
 // Intro animation remains independent of music permissions.
 for(const id of ['enterSound','enterQuiet'])document.getElementById(id).addEventListener('click',()=>{gate.classList.add('launching')},{once:true});
 const wishes=['오늘의 행운은 새로운 인연에서 시작돼요. ✦','함께 달리는 밤은 혼자보다 반짝입니다. ✧','가장 좋은 순간은 아직 오지 않았어요. ✦','오늘도 즐거운 게임, 좋은 사람들과 함께! ✧','당신의 다음 이야기가 어비셜에서 시작되길. ✦'];let wishIndex=-1;
 function wish(){wishIndex=(wishIndex+1)%wishes.length;document.querySelector('#wishMessage').textContent=wishes[wishIndex];notify('✦ 별빛 메시지가 도착했어요')}
 document.querySelector('#wishButton').onclick=wish;document.querySelector('#wishSky').onclick=wish;document.querySelector('#wishSky').onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();wish()}};
 document.querySelector('#signalButton').onclick=()=>{notify('✦ ABYSSAL SIGNAL CONNECTED · 좋은 인연을 기다립니다');document.querySelector('.signal-circle').animate([{transform:'scale(1)'},{transform:'scale(1.22)'},{transform:'scale(1)'}],{duration:850,easing:'ease-out'})};
 function secret(){const el=document.querySelector('#secretEnvelope');el.classList.toggle('open');document.querySelector('#secretMessage').textContent=el.classList.contains('open')?'깊은 밤에도 함께 웃을 사람이 있다는 것. 어비셜이 당신을 기다립니다. 💜':'봉투를 눌러 길드가 전하는 메시지를 열어보세요.'}
 document.querySelector('#secretButton').onclick=secret;document.querySelector('#secretEnvelope').onclick=secret;
 const bar=document.querySelector('#audioProgress'),fill=document.querySelector('#audioProgressFill');bgm.addEventListener('timeupdate',()=>{if(bgm.duration)fill.style.width=(bgm.currentTime/bgm.duration*100)+'%'});bar.onclick=e=>{if(bgm.duration){const r=bar.getBoundingClientRect();bgm.currentTime=bgm.duration*Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))}};
})();
