/* FameBit Media — shared behaviour for the inner pages (creators, compare, lists, case studies).
   Needs data.js. Shortlist and compare picks are saved in the browser and shared with the homepage. */
var FB=(function(){
  function $(s,r){return (r||document).querySelector(s)}
  var shortlist=(store('fb_shortlist')||[]).filter(creator);
  var compare=(store('fb_compare')||[]).filter(creator).slice(0,3);
  function save(){store('fb_shortlist',shortlist);store('fb_compare',compare);listeners.forEach(function(f){f()});renderTray()}
  var listeners=[];

  /* Toast */
  function toast(t){var el=$('#toast');if(!el){el=document.createElement('div');el.id='toast';el.className='toast';el.setAttribute('role','status');document.body.appendChild(el)}
    el.textContent=t;el.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){el.classList.remove('show')},2200)}

  /* Enquiry modal (request price / list enquiry).
     TODO (developer): POST to /api/leads with name, phone, brand, budget, what was asked about, page URL, UTM params. Verify phone by OTP. */
  var lastFocus;
  function modal(){var m=$('#modal');if(m)return m;
    m=document.createElement('div');m.className='modal';m.id='modal';m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');m.setAttribute('aria-labelledby','mTitle');
    m.innerHTML='<div class="box"><button class="x" data-close aria-label="Close">✕</button><div id="mForm"><h3 id="mTitle"></h3><p class="lead" id="mLead"></p><div id="mExtra"></div>'+
      '<form id="enqForm" novalidate><div class="field"><label for="eName">Your name</label><input class="input" id="eName" autocomplete="name"></div>'+
      '<div class="field"><label for="ePhone">WhatsApp number</label><input class="input" id="ePhone" inputmode="tel" placeholder="10-digit mobile number" autocomplete="tel"></div>'+
      '<div class="field"><label for="eBrand">Brand name</label><input class="input" id="eBrand" autocomplete="organization"></div>'+
      '<div class="field"><label for="eBudget">Budget for this campaign</label><select class="input" id="eBudget"><option>Under ₹1 lakh</option><option>₹1–5 lakh</option><option>₹5–20 lakh</option><option>₹20 lakh+</option></select></div>'+
      '<p id="eErr" style="color:#B42318;font-size:14px;min-height:20px"></p><button class="btn btn-p btn-block" type="submit" id="eSubmit"></button></form></div>'+
      '<div id="mDone" class="done" hidden><div class="tick">✓</div><h3 style="padding:0">Request sent</h3><p class="mut" style="margin-top:8px">We\'ll WhatsApp you within 24 hours. Want to talk sooner?</p><a class="btn btn-p" style="margin-top:18px" href="book-call.html">Book a free call</a></div></div>';
    document.body.appendChild(m);
    m.addEventListener('click',function(e){if(e.target===m||e.target.closest('[data-close]'))close()});
    $('#enqForm',m).addEventListener('submit',function(e){e.preventDefault();var ph=$('#ePhone').value.replace(/\D/g,'').slice(-10);
      if(!$('#eName').value.trim()||!$('#eBrand').value.trim()){$('#eErr').textContent='Add your name and brand name.';return}
      if(!/^[6-9]\d{9}$/.test(ph)){$('#eErr').textContent='Enter a valid 10-digit Indian mobile number.';return}
      $('#mForm').hidden=true;$('#mDone').hidden=false});
    return m}
  function enquire(title,lead,btn,extraHTML){var m=modal();lastFocus=document.activeElement;
    $('#mTitle').textContent=title;$('#mLead').textContent=lead;$('#eSubmit').textContent=btn||'Request price';$('#mExtra').innerHTML=extraHTML||'';
    $('#mForm').hidden=false;$('#mDone').hidden=true;$('#eErr').textContent='';m.classList.add('open');setTimeout(function(){$('#eName').focus()},50)}
  function close(){var m=$('#modal');if(m)m.classList.remove('open');if(lastFocus)lastFocus.focus()}
  document.addEventListener('keydown',function(e){if(e.key==='Escape')close()});

  /* Creator card (same design as the homepage) */
  function card(c){var inS=shortlist.indexOf(c.id)>-1,inC=compare.indexOf(c.id)>-1;
    return '<article class="card cc'+(inS?' sel':'')+'"><div class="top">'+av(c)+'<div><b>'+c.name+'</b><small>'+c.handle+'</small><br><small class="loc">'+c.cat+' · '+PIN+c.city+'</small></div></div>'+
      '<div class="stats"><div><b>'+fmt(c.f)+'</b><span>Followers</span></div><div><b>'+fmt(c.views)+'</b><span>Avg. views</span></div><div><b><span class="score '+scoreCls(c.trust)+'" style="padding:0 8px">'+c.trust+'</span></b><span>Trust</span></div></div>'+
      '<button class="btn btn-sm" data-price="'+c.id+'" style="border:0;background:var(--soft);color:var(--p)">Request price</button>'+
      '<div class="acts"><button class="btn" data-sl="'+c.id+'" aria-pressed="'+inS+'">'+(inS?'Shortlisted':'Shortlist')+'</button><button class="btn" data-cmp="'+c.id+'" aria-pressed="'+inC+'">'+(inC?'Comparing':'Compare')+'</button></div></article>'}

  function toggleShortlist(id){var i=shortlist.indexOf(id);if(i>-1)shortlist.splice(i,1);else{shortlist.push(id);toast('Added to shortlist')}save()}
  function toggleCompare(id){var j=compare.indexOf(id);if(j>-1)compare.splice(j,1);else{if(compare.length>=3){toast('You can compare up to 3 creators. Remove one first.');return false}compare.push(id);toast(compare.length>=2?'Added. Ready to compare':'Added to compare')}save();return true}

  document.addEventListener('click',function(e){var t=e.target.closest('[data-sl],[data-cmp],[data-price]');if(!t)return;
    if(t.dataset.sl)toggleShortlist(+t.dataset.sl);
    if(t.dataset.cmp)toggleCompare(+t.dataset.cmp);
    if(t.dataset.price){var c=creator(t.dataset.price);enquire('Request price for '+c.name,'Our team will WhatsApp you rates and availability within 24 hours.','Request price')}});

  /* Tray: "2 / 3 selected · Compare now" */
  function renderTray(){var tr=$('#tray');if(!tr)return;var n=compare.length,sN=shortlist.length,show=(n>0||sN>0)&&!document.body.hasAttribute('data-no-tray');
    tr.classList.toggle('show',show);
    $('#trayFaces').innerHTML=compare.map(function(id){return av(creator(id))}).join('');
    $('#trayTxt').innerHTML=(n?'<b>'+n+' / 3</b> selected':'<b>'+sN+'</b> shortlisted')+'<small>'+(n?(sN?sN+' shortlisted · ':'')+(n<2?'add '+(2-n)+' more to compare':'ready to compare'):'we can book them for you')+'</small>';
    var go=$('#trayGo');if(n){go.href='compare.html';go.textContent='Compare now →'}else{go.href='book-call.html';go.textContent='Let us book them →'}}
  function tray(){if($('#tray'))return;var tr=document.createElement('div');tr.className='tray';tr.id='tray';tr.setAttribute('role','region');tr.setAttribute('aria-label','Your selection');
    tr.innerHTML='<div class="faces" id="trayFaces"></div><div class="t" id="trayTxt"></div><button type="button" class="clr" id="trayClear">Clear</button><a class="btn btn-sm btn-p" id="trayGo" href="compare.html">Compare now →</a>';
    document.body.appendChild(tr);$('#trayClear').onclick=function(){compare.length=0;shortlist.length=0;save();toast('Selection cleared')};renderTray()}

  return {$:$,toast:toast,enquire:enquire,card:card,tray:tray,shortlist:shortlist,compare:compare,save:save,toggleCompare:toggleCompare,onChange:function(f){listeners.push(f)}};
})();
