/* FameBit Media — booking calendar that hands off to Cal ID.
   Shows a month calendar on the page; picking a date opens the Cal ID booking page
   on that day (?date=YYYY-MM-DD&month=YYYY-MM), where the live time slots are.
   Usage: CalPicker(element, {url:'https://cal.id/famebitmedia/product-walkthrough'})

   CalEmbed(element, {calLink:'famebitmedia/product-walkthrough'}) shows the official Cal ID
   inline embed (live slots, booking without leaving the page). If Cal ID can't load
   (blocked script, no network, strict hosting), it falls back to CalPicker. */
(function(){
  var MN=['January','February','March','April','May','June','July','August','September','October','November','December'],DN=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  function pad(n){return (n<10?'0':'')+n}
  function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}

  window.CalPicker=function(root,o){
    var url=o.url,days=o.days||60,closed=o.closedDays||[0]; /* 0 = Sunday */
    var today=new Date();today.setHours(0,0,0,0);
    var last=new Date(today);last.setDate(last.getDate()+days);
    function open(d){return d>today&&d<=last&&closed.indexOf(d.getDay())<0}
    var sel=new Date(today);do{sel.setDate(sel.getDate()+1)}while(!open(sel));
    var view=new Date(sel.getFullYear(),sel.getMonth(),1);

    root.classList.add('calp');
    root.innerHTML='<div class="calp-cal"><div class="calp-mh"><b class="calp-m"></b><div><button type="button" class="calp-prev" aria-label="Previous month">‹</button><button type="button" class="calp-next" aria-label="Next month">›</button></div></div>'+
      '<div class="calp-dow" aria-hidden="true">'+DN.map(function(d){return '<span>'+d+'</span>'}).join('')+'</div><div class="calp-dates" role="grid"></div></div>'+
      '<div class="calp-side"><span class="calp-lab">Selected date</span><b class="calp-day"></b><p class="calp-note">See live 30-minute slots for this day and book in a few clicks.</p>'+
      '<a class="btn btn-p btn-block calp-go" target="_blank" rel="noopener">See times →</a><p class="calp-tz">India time (IST) · Opens our Cal ID booking page</p></div>';
    var q=function(s){return root.querySelector(s)};

    function draw(){
      q('.calp-m').innerHTML=MN[view.getMonth()]+' <span>'+view.getFullYear()+'</span>';
      q('.calp-prev').disabled=view<=new Date(today.getFullYear(),today.getMonth(),1);
      q('.calp-next').disabled=new Date(view.getFullYear(),view.getMonth()+1,1)>last;
      var h='',n=new Date(view.getFullYear(),view.getMonth()+1,0).getDate();
      for(var i=0;i<view.getDay();i++)h+='<span></span>';
      for(var d=1;d<=n;d++){var dt=new Date(view.getFullYear(),view.getMonth(),d),ok=open(dt),on=+dt===+sel;
        h+='<button type="button" data-d="'+d+'"'+(ok?'':' disabled')+' aria-pressed="'+on+'" class="'+(+dt===+today?'today':'')+'" aria-label="'+DN[dt.getDay()]+' '+d+' '+MN[view.getMonth()]+(ok?'':', unavailable')+'">'+d+'</button>'}
      q('.calp-dates').innerHTML=h;
      q('.calp-day').textContent=DN[sel.getDay()]+', '+sel.getDate()+' '+MN[sel.getMonth()];
      q('.calp-go').href=url+'?date='+iso(sel)+'&month='+iso(sel).slice(0,7);
    }
    q('.calp-dates').addEventListener('click',function(e){var b=e.target.closest('button[data-d]');if(!b||b.disabled)return;sel=new Date(view.getFullYear(),view.getMonth(),+b.dataset.d);draw();q('.calp-go').focus({preventScroll:true})});
    q('.calp-prev').onclick=function(){view.setMonth(view.getMonth()-1);draw()};
    q('.calp-next').onclick=function(){view.setMonth(view.getMonth()+1);draw()};
    draw();
  };

  /* Official Cal ID inline embed (snippet from cal.id → Embed → Inline), with a CalPicker fallback. */
  window.CalEmbed=function(root,o){
    var origin='https://cal.id',link=o.calLink,brand=o.brand||'#7C3AED',done=false;
    function fallback(){if(done)return;done=true;root.innerHTML='';root.classList.remove('cal-embed');CalPicker(root,{url:origin+'/'+link,closedDays:o.closedDays})}
    root.classList.add('cal-embed');
    root.innerHTML='<div class="cal-inline" id="'+(root.id||'cal')+'-inline"></div><p class="cal-alt">Calendar not loading? <a href="'+origin+'/'+link+'" target="_blank" rel="noopener">Open the booking page</a></p>';
    var box=root.querySelector('.cal-inline');
    (function (C, A, L) { var p = function (a, ar) { a.q.push(ar); }; var d = C.document; C.Cal = C.Cal || function () { var cal = C.Cal; var ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; var sc = d.createElement("script"); sc.src = A; sc.onerror = fallback; d.head.appendChild(sc); cal.loaded = true; } if (ar[0] === L) { var api = function () { p(api, arguments); }; var namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, origin+"/embed-link/embed.js", "init");
    Cal("init", "default", {origin:origin});
    Cal.ns["default"]("inline", {elementOrSelector:box, config:{layout:"month_view"}, calLink:link});
    Cal.ns["default"]("ui", {cssVarsPerTheme:{light:{"cal-brand":brand},dark:{"cal-brand":"#fafafa"}}, hideEventTypeDetails:false, layout:"month_view"});
    /* If the booking frame never appears (e.g. frames blocked), show the fallback calendar. */
    setTimeout(function(){if(!done&&!box.querySelector('iframe'))fallback()},8000);
  };
})();
