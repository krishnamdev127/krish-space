(() => {
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const canvas=document.getElementById('fx'),ctx=canvas.getContext('2d'),DPR=Math.min(devicePixelRatio||1,2);
let w=innerWidth,h=innerHeight,scrollY=0,targetScroll=0,mouseX=.5,mouseY=.5,t=0,burst=0;
const N=420, pts=[];
function resize(){w=innerWidth;h=innerHeight;canvas.width=w*DPR;canvas.height=h*DPR;canvas.style.width=w+'px';canvas.style.height=h+'px';ctx.setTransform(DPR,0,0,DPR,0,0)}
function make(){pts.length=0;for(let i=0;i<N;i++){const a=Math.random()*Math.PI*2,r=Math.pow(Math.random(),.55),rr=Math.min(w,h)*(.08+.48*r);pts.push({a,r,rr,x:0,y:0,v:(Math.random()-.5)*.18,s:.4+Math.random()*1.5,phase:Math.random()*6.28,life:Math.random()})}}
function draw(){t+=.008;scrollY+=(targetScroll-scrollY)*.075;ctx.clearRect(0,0,w,h);
 const intro=Math.max(0,Math.min(1,scrollY/(innerHeight*1.55))), mind=Math.max(0,Math.min(1,(scrollY-innerHeight*1.65)/(innerHeight*.9))); const dissolve=Math.max(0,Math.min(1,(intro-.42)/.48));
 const cx=w*(.57+(.5-mouseX)*.035),cy=h*(.51+(.5-mouseY)*.03);
 for(let i=0;i<N;i++){let p=pts[i],ang=p.a+t*p.v*(1-intro)+p.phase*.0001,rad=p.rr*(1-intro*.88)+Math.sin(t*2+p.phase)*12*intro;p.x=cx+Math.cos(ang)*rad;p.y=cy+Math.sin(ang)*rad*.72;
   if(intro>.22){const j=i%9===0?i:((i*37)%N),q=pts[j];if(j!==i){const dx=q.x-p.x,dy=q.y-p.y,d=Math.hypot(dx,dy);if(d<105){ctx.strokeStyle='rgba(194,31,50,'+((1-d/105)*.22*intro)+')';ctx.lineWidth=.55;ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke()}}}
   const a=.12+intro*.42+(mind*.3);ctx.fillStyle=i%17===0?'rgba(255,83,99,'+a+')':'rgba(238,234,227,'+(a*.65)+')';ctx.beginPath();ctx.arc(p.x,p.y,(i%17===0?1.8:1)*p.s,0,Math.PI*2);ctx.fill();
 }
 // active mind paths
 if(mind>.05){for(let k=0;k<5;k++){const ang=t*(.35+k*.07)+k*1.25,rx=w*.43,ry=h*.38,x=cx+Math.cos(ang)*rx,y=cy+Math.sin(ang)*ry;ctx.strokeStyle='rgba(255,83,99,.35)';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(x,y);ctx.stroke()}}
 requestAnimationFrame(draw)}
addEventListener('resize',()=>{resize();make()});addEventListener('pointermove',e=>{mouseX=e.clientX/w;mouseY=e.clientY/h});addEventListener('scroll',()=>targetScroll=scrollY,{passive:true});
resize();make();requestAnimationFrame(draw);

const title=document.getElementById('title'),char=document.getElementById('character'),flash=document.getElementById('flash'),status=document.getElementById('status'),boot1=document.getElementById('boot1'),boot2=document.getElementById('boot2'),progress=document.getElementById('progress');
setTimeout(()=>{document.body.classList.remove('lock');boot2.textContent='signal acquired';status.textContent='SYSTEM AWAKE'},1100);
const transitionCopy=document.getElementById('transitionCopy');
const mindPanel=document.getElementById('mindPanel'),panelNo=document.getElementById('panelNo'),panelTitle=document.getElementById('panelTitle'),panelText=document.getElementById('panelText'),panelClose=document.getElementById('panelClose');
const nodeData={history:{no:'NODE / 01',title:'HISTORY',text:'The past is not a timeline here. It is a library of patterns, people, conflicts and ideas that keep resurfacing.'},technology:{no:'NODE / 02',title:'TECHNOLOGY',text:'Things built to extend thought: code, interfaces, systems, experiments and the strange space between human and machine.'},thought:{no:'NODE / 03',title:'THOUGHT',text:'Questions without a finish line. Fragments, philosophy, literature and the ideas that refuse to stay quiet.'}};
document.querySelectorAll('.node-label').forEach(btn=>btn.addEventListener('click',()=>{const d=nodeData[btn.dataset.node];panelNo.textContent=d.no;panelTitle.textContent=d.title;panelText.textContent=d.text;mindPanel.classList.add('open');document.querySelectorAll('.node-label').forEach(x=>x.classList.remove('active'));btn.classList.add('active');status.textContent='SYSTEM / NODE '+btn.dataset.node.toUpperCase()}));
panelClose.addEventListener('click',()=>{mindPanel.classList.remove('open');document.querySelectorAll('.node-label').forEach(x=>x.classList.remove('active'));status.textContent='SYSTEM / LISTENING'}));
function frame(){const y=scrollY,vh=innerHeight,p=Math.max(0,Math.min(1,y/(vh*1.85)));
 const reveal=Math.max(0,Math.min(1,p/.22)),listen=Math.max(0,Math.min(1,(p-.18)/.38)),diss=Math.max(0,Math.min(1,(p-.52)/.38)),exit=Math.max(0,Math.min(1,(p-.78)/.22));
 title.style.transform='translateY('+(-p*34)+'px) scale('+(1-p*.28)+') skewX('+(diss*3)+'deg)';
 title.style.opacity=String(1-p*.82);
 char.classList.toggle('dissolve',diss>.05);
 char.style.transform='translateY('+(-p*72-diss*28)+'px) scale('+(1+p*.07+diss*.12)+') rotate('+(diss*2.5)+'deg)';
 char.style.opacity=String(1-diss);
 char.style.filter='drop-shadow(0 0 '+(60+diss*90)+'px rgba(194,31,50,'+(.08+diss*.2)+'))';
 transitionCopy.style.opacity=String(diss*(1-exit));
 transitionCopy.style.transform='translateY('+(14-diss*14)+'px)';
 if(p>.78){flash.style.opacity=String(Math.max(0,(p-.78)*3.8));status.textContent='SYSTEM / TRANSITION'}
 else if(p>.52)status.textContent='SYSTEM / DISINTEGRATING'
 else if(p>.25)status.textContent='SYSTEM / LISTENING';
 else status.textContent='SYSTEM / AWAKE';
 progress.style.width=(Math.min(1,y/(document.body.scrollHeight-vh))*100)+'%';
 const mp=Math.max(0,Math.min(1,(y-vh*1.9)/(vh*.85)));
 document.querySelectorAll('.node-label').forEach((e,i)=>{e.style.opacity=String(mp*(.55+i*.12));e.style.transform='translateY('+(10-mp*10)+'px)'});
 ['m1','m2','m3'].forEach((id,i)=>{const el=document.getElementById(id);el.style.left=(15+i*34)+'%';el.style.top=(62-i*17)+'%';el.style.opacity=mp});
 requestAnimationFrame(frame)}frame();

if(!reduced){addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>80){const f=flash;f.style.transition='opacity .08s';f.style.opacity='.12';setTimeout(()=>f.style.opacity='0',80)}},{passive:true})}
})();
