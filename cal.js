/* FameBit Media — booking calendar that hands off to Cal ID.
   Shows a month calendar on the page; picking a date opens the Cal ID booking page
   on that day (?date=YYYY-MM-DD&month=YYYY-MM), where the live time slots are.
   Usage: CalPicker(element, {url:'https://cal.id/famebitmedia/product-walkthrough'}) */
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
})();
