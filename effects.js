/* FameBit Media — visual effects (plain JS ports of React Bits components)
   GradualBlur: https://reactbits.dev (by Ansh, github.com/ansh-dhanani)
   BorderGlow:  https://reactbits.dev
   Same props as the React versions; styles live in styles.css. */
(function(){
  /* ============ GradualBlur ============ */
  var BLUR_DEFAULTS={position:'bottom',strength:2,height:'6rem',width:null,divCount:5,exponential:false,zIndex:1000,opacity:1,curve:'linear',target:'parent',className:''};
  var CURVES={linear:function(p){return p},bezier:function(p){return p*p*(3-2*p)},'ease-in':function(p){return p*p},'ease-out':function(p){return 1-Math.pow(1-p,2)},'ease-in-out':function(p){return p<.5?2*p*p:1-Math.pow(-2*p+2,2)/2}};
  var DIR={top:'to top',bottom:'to bottom',left:'to left',right:'to right'};

  function GradualBlur(parent,props){
    var c={};for(var k in BLUR_DEFAULTS)c[k]=BLUR_DEFAULTS[k];for(k in props||{})c[k]=props[k];
    var page=c.target==='page',root=document.createElement('div'),inner=document.createElement('div');
    root.className='gradual-blur '+(page?'gradual-blur-page':'gradual-blur-parent')+(c.className?' '+c.className:'');
    root.setAttribute('aria-hidden','true');
    inner.className='gradual-blur-inner';
    var inc=100/c.divCount,curve=CURVES[c.curve]||CURVES.linear,dir=DIR[c.position]||'to bottom';
    for(var i=1;i<=c.divCount;i++){
      var p=curve(i/c.divCount);
      var blur=c.exponential?Math.pow(2,p*4)*.0625*c.strength:.0625*(p*c.divCount+1)*c.strength;
      var r=function(v){return Math.round(v*10)/10},p1=r(inc*i-inc),p2=r(inc*i),p3=r(inc*i+inc),p4=r(inc*i+inc*2);
      var g='transparent '+p1+'%, black '+p2+'%';if(p3<=100)g+=', black '+p3+'%';if(p4<=100)g+=', transparent '+p4+'%';
      var d=document.createElement('div'),m='linear-gradient('+dir+', '+g+')';
      d.style.cssText='position:absolute;inset:0;opacity:'+c.opacity+';-webkit-mask-image:'+m+';mask-image:'+m+';-webkit-backdrop-filter:blur('+blur.toFixed(3)+'rem);backdrop-filter:blur('+blur.toFixed(3)+'rem)';
      inner.appendChild(d);
    }
    root.appendChild(inner);
    var s=root.style;s.position=page?'fixed':'absolute';s.pointerEvents='none';s.zIndex=page?c.zIndex+100:c.zIndex;
    if(c.position==='top'||c.position==='bottom'){s.height=c.height;s.width=c.width||'100%';s[c.position]=0;s.left=0;s.right=0}
    else{s.width=c.width||c.height;s.height='100%';s[c.position]=0;s.top=0;s.bottom=0}
    (page?document.body:parent).appendChild(root);
    return root;
  }

  /* ============ BorderGlow ============ */
  function parseHSL(str){var m=String(str).match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);return m?{h:+m[1],s:+m[2],l:+m[3]}:{h:40,s:80,l:80}}
  var GPOS=['80% 55%','69% 34%','8% 6%','41% 38%','86% 85%','82% 18%','51% 4%'],GKEYS=['one','two','three','four','five','six','seven'],CMAP=[0,1,2,0,1,2,1];
  function isLight(col){var v=String(col).trim().replace('#','');if(!/^[\da-f]{3}([\da-f]{3})?$/i.test(v))return false;if(v.length===3)v=v.replace(/./g,'$&$&');
    return parseInt(v.slice(0,2),16)*.2126+parseInt(v.slice(2,4),16)*.7152+parseInt(v.slice(4,6),16)*.0722>180}
  function ease(x){return 1-Math.pow(1-x,3)}function easeIn(x){return x*x*x}
  function animate(o){var start=o.start||0,end=o.end==null?100:o.end,t0;setTimeout(function(){t0=performance.now();(function tick(){var t=Math.min((performance.now()-t0)/o.duration,1);o.onUpdate(start+(end-start)*(o.ease||ease)(t));if(t<1)requestAnimationFrame(tick);else if(o.onEnd)o.onEnd()})()},o.delay||0)}

  function BorderGlow(card,props){
    var c={edgeSensitivity:30,glowColor:'40 80 80',backgroundColor:'#120F17',borderRadius:28,glowRadius:40,glowIntensity:1,coneSpread:25,animated:false,colors:['#c084fc','#f472b6','#38bdf8'],fillOpacity:.5};
    for(var k in props||{})c[k]=props[k];
    card.classList.add('border-glow-card');if(isLight(c.backgroundColor))card.classList.add('border-glow-card--light');
    var st=card.style,hsl=parseHSL(c.glowColor),base=hsl.h+'deg '+hsl.s+'% '+hsl.l+'%';
    st.setProperty('--card-bg',c.backgroundColor);st.setProperty('--edge-sensitivity',c.edgeSensitivity);st.setProperty('--border-radius',c.borderRadius+'px');
    st.setProperty('--glow-padding',c.glowRadius+'px');st.setProperty('--cone-spread',c.coneSpread);st.setProperty('--fill-opacity',c.fillOpacity);
    [100,60,50,40,30,20,10].forEach(function(o,i){st.setProperty('--glow-color'+(i?'-'+o:''),'hsl('+base+' / '+Math.min(o*c.glowIntensity,100)+'%)')});
    for(var i=0;i<7;i++)st.setProperty('--gradient-'+GKEYS[i],'radial-gradient(at '+GPOS[i]+', '+c.colors[Math.min(CMAP[i],c.colors.length-1)]+' 0px, transparent 50%)');
    st.setProperty('--gradient-base','linear-gradient('+c.colors[0]+' 0 100%)');
    var edge=document.createElement('span');edge.className='edge-light';card.insertBefore(edge,card.firstChild);
    card.addEventListener('pointermove',function(e){
      var r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,cx=r.width/2,cy=r.height/2,dx=x-cx,dy=y-cy;
      var kx=dx?cx/Math.abs(dx):Infinity,ky=dy?cy/Math.abs(dy):Infinity,prox=Math.min(Math.max(1/Math.min(kx,ky),0),1);
      var ang=(dx||dy)?Math.atan2(dy,dx)*180/Math.PI+90:0;if(ang<0)ang+=360;
      st.setProperty('--edge-proximity',(prox*100).toFixed(3));st.setProperty('--cursor-angle',ang.toFixed(3)+'deg');
    });
    function sweep(){var a0=110,a1=465;card.classList.add('sweep-active');st.setProperty('--cursor-angle',a0+'deg');
      animate({duration:500,onUpdate:function(v){st.setProperty('--edge-proximity',v)}});
      animate({ease:easeIn,duration:1500,end:50,onUpdate:function(v){st.setProperty('--cursor-angle',(a1-a0)*(v/100)+a0+'deg')}});
      animate({delay:1500,duration:2250,start:50,end:100,onUpdate:function(v){st.setProperty('--cursor-angle',(a1-a0)*(v/100)+a0+'deg')}});
      animate({ease:easeIn,delay:2500,duration:1500,start:100,end:0,onUpdate:function(v){st.setProperty('--edge-proximity',v)},onEnd:function(){card.classList.remove('sweep-active')}});}
    /* animated:'scroll' plays the intro sweep once, when the card first scrolls into view */
    if(c.animated&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
      if(c.animated==='scroll'&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(en){if(en[0].isIntersecting){io.disconnect();sweep()}},{threshold:.4});io.observe(card)}
      else sweep();
    }
    return card;
  }

  window.GradualBlur=GradualBlur;window.BorderGlow=BorderGlow;

  /* Whole-site soft blur at the bottom edge of the screen. Opt out with <body data-no-page-blur>. */
  function pageBlur(){if(document.body.hasAttribute('data-no-page-blur'))return;
    GradualBlur(null,{target:'page',position:'bottom',height:'4.5rem',strength:1.5,divCount:5,curve:'bezier',exponential:true,opacity:1,className:'page-blur'}).style.zIndex=45} /* below header (50), tray and mobile bar */
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',pageBlur);else pageBlur();
})();
