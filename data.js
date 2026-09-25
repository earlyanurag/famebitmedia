/* FameBit Media — shared sample data + helpers for every page.
   TODO (developer): replace CREATORS, LISTS and CASES with API data. Keep the ids stable:
   shortlists and comparisons are saved in the browser by creator id (localStorage fb_shortlist / fb_compare). */
var COLORS=['#8B5CF6','#EC4899','#F97316','#10B981','#0EA5E9','#6366F1','#14B8A6','#E11D48'];
var CREATORS=[
 {id:1,name:'Meera Nair',handle:'@meera.eats',cat:'Food',city:'Bangalore',f:684000,eng:7.8,trust:91,views:210000},
 {id:2,name:'Dr. Arjun Rao',handle:'@drarjunrao',cat:'Health',city:'Hyderabad',f:1200000,eng:9.4,trust:94,views:420000},
 {id:3,name:'Sana Qureshi',handle:'@sanaskin',cat:'Beauty',city:'Mumbai',f:412000,eng:6.2,trust:88,views:150000},
 {id:4,name:'Kabir Malhotra',handle:'@kabirlifts',cat:'Fitness',city:'Delhi',f:936000,eng:5.1,trust:79,views:260000},
 {id:5,name:'Ritika Jain',handle:'@moneywithritika',cat:'Finance',city:'Mumbai',f:318000,eng:8.9,trust:93,views:120000},
 {id:6,name:'Ananth Iyer',handle:'@techwithananth',cat:'Tech',city:'Chennai',f:1540000,eng:4.6,trust:86,views:510000},
 {id:7,name:'Pooja Bisht',handle:'@poojacooks',cat:'Food',city:'Delhi',f:88000,eng:11.2,trust:95,views:40000},
 {id:8,name:'Dr. Neha Kapoor',handle:'@drnehaderm',cat:'Health',city:'Delhi',f:742000,eng:6.1,trust:90,views:190000},
 {id:9,name:'Isha Menon',handle:'@ishaglow',cat:'Beauty',city:'Bangalore',f:56000,eng:9.8,trust:92,views:22000},
 {id:10,name:'Rohan Das',handle:'@rohanruns',cat:'Fitness',city:'Kolkata',f:212000,eng:7.0,trust:74,views:80000},
 {id:11,name:'Tanvi Shah',handle:'@tanviinvests',cat:'Finance',city:'Ahmedabad',f:1020000,eng:5.5,trust:89,views:300000},
 {id:12,name:'Vikram Sethi',handle:'@vikramtech',cat:'Tech',city:'Pune',f:94000,eng:8.3,trust:91,views:36000},
 {id:13,name:'Aanya Kapoor',handle:'@aanyastyles',cat:'Fashion',city:'Mumbai',f:880000,eng:6.4,trust:87,views:240000},
 {id:14,name:'Rahul Verma',handle:'@rahulcracks',cat:'Comedy',city:'Delhi',f:2100000,eng:7.9,trust:84,views:900000},
 {id:15,name:'Priya Reddy',handle:'@priyaskinlab',cat:'Beauty',city:'Hyderabad',f:265000,eng:8.1,trust:91,views:98000},
 {id:16,name:'Arjun Menon',handle:'@arjunwanders',cat:'Travel',city:'Kochi',f:540000,eng:6.9,trust:88,views:180000},
 {id:17,name:'Nisha Gupta',handle:'@mominnisha',cat:'Parenting',city:'Jaipur',f:190000,eng:9.1,trust:93,views:70000},
 {id:18,name:'Karan Singh',handle:'@karanplays',cat:'Gaming',city:'Chandigarh',f:1300000,eng:5.8,trust:82,views:450000},
 {id:19,name:'Meghna Bora',handle:'@meghnaeats',cat:'Food',city:'Guwahati',f:145000,eng:10.4,trust:94,views:60000},
 {id:20,name:'Lalremruati',handle:'@ruatistyle',cat:'Fashion',city:'Aizawl',f:98000,eng:11.6,trust:92,views:41000},
 {id:21,name:'Tenzin Dorjee',handle:'@tenzintravels',cat:'Travel',city:'Shillong',f:230000,eng:8.7,trust:90,views:88000},
 {id:22,name:'Sneha Iyer',handle:'@snehalifestyle',cat:'Lifestyle',city:'Chennai',f:670000,eng:6.6,trust:89,views:210000},
 {id:23,name:'Aditya Rao',handle:'@adityalaughs',cat:'Comedy',city:'Bangalore',f:1150000,eng:8.4,trust:86,views:520000},
 {id:24,name:'Kavya Nair',handle:'@kavyaglam',cat:'Celebrity',city:'Kochi',f:4800000,eng:4.2,trust:85,views:1600000},
 {id:25,name:'Riya Sen',handle:'@riyasen.fits',cat:'Fashion',city:'Kolkata',f:410000,eng:7.3,trust:88,views:140000},
 {id:26,name:'Imran Khan',handle:'@imranfitlife',cat:'Fitness',city:'Hyderabad',f:350000,eng:7.7,trust:90,views:120000},
 {id:27,name:'Dr. Sameer Joshi',handle:'@drsameerheart',cat:'Health',city:'Pune',f:520000,eng:8.2,trust:95,views:160000},
 {id:28,name:'Ishaan Mehta',handle:'@ishaanactor',cat:'Celebrity',city:'Mumbai',f:6200000,eng:3.8,trust:83,views:2100000}
];
CREATORS.forEach(function(c,i){c.color=COLORS[i%COLORS.length]});
var ALL_CATS=['All','Food','Health','Beauty','Fitness','Fashion','Finance','Tech','Comedy','Travel','Parenting','Gaming','Lifestyle','Celebrity'];
var REGIONS={'Northeast':['Guwahati','Shillong','Aizawl','Imphal','Agartala','Gangtok','Itanagar','Kohima'],'South India':['Bangalore','Chennai','Hyderabad','Kochi','Coimbatore','Mysore','Vizag']};
function creator(id){return CREATORS.find(function(c){return c.id===+id})}

/* Ready-made lists. match(c) picks the sample creators shown for each list. */
var LISTS=[
 {id:'doctors',name:'25 doctor creators',sub:'For health and pharma brands',eng:'9.2%',tint:'var(--mint)',group:'ready',size:25,match:function(c){return c.cat==='Health'}},
 {id:'bangalore-food',name:'30 Bangalore food creators',sub:'For restaurants and QSR',eng:'6.8%',tint:'var(--peach)',group:'ready',size:30,match:function(c){return c.cat==='Food'}},
 {id:'finance',name:'40 finance explainers',sub:'For fintech app installs',eng:'5.1%',tint:'var(--sky)',group:'ready',size:40,match:function(c){return c.cat==='Finance'}},
 {id:'nano-beauty',name:'50 nano beauty creators',sub:'For skincare launches',eng:'7.4%',tint:'var(--lav)',group:'ready',size:50,match:function(c){return c.cat==='Beauty'}},
 {id:'top-bangalore',name:'Top 10 influencers in Bangalore',group:'city',size:10,match:function(c){return c.city==='Bangalore'}},
 {id:'top-delhi',name:'Top 10 influencers in Delhi',group:'city',size:10,match:function(c){return c.city==='Delhi'}},
 {id:'top-northeast',name:'Top 10 influencers in Northeast',group:'city',size:10,match:function(c){return REGIONS['Northeast'].indexOf(c.city)>-1}},
 {id:'top-south',name:'Top 10 influencers in South India',group:'city',size:10,match:function(c){return REGIONS['South India'].indexOf(c.city)>-1}},
 {id:'top-fashion',name:'Top 10 fashion creators',group:'cat',size:10,match:function(c){return c.cat==='Fashion'}},
 {id:'top-skincare',name:'Top 10 skincare creators',group:'cat',size:10,match:function(c){return c.cat==='Beauty'}},
 {id:'top-celeb',name:'Top 10 celeb creators',group:'cat',size:10,match:function(c){return c.cat==='Celebrity'||c.f>=2e6}},
 {id:'top-comedy',name:'Top 10 comedy creators',group:'cat',size:10,match:function(c){return c.cat==='Comedy'}}
];
LISTS.forEach(function(l){l.members=CREATORS.filter(l.match).sort(function(a,b){return b.trust-a.trust})});

/* Case studies (from the FameBit FY26 cred deck) */
var CASES=[
 {id:'hkvitals',brand:'HK Vitals',chan:'Influencer',product:'Multivitamin and magnesium glycinate',stats:[['16M+','Reach / views'],['25','Content pieces'],['₹8L','Total budget'],['₹0.05','Cost per view']],
  obj:'Build awareness for HK Vitals multivitamins and magnesium glycinate among fitness-conscious buyers, and make them a daily must-have.',
  app:'Top-performing fitness creators made one non-collab reel each, with one month of ad rights. Running those reels as ads drove most of the campaign reach.',
  impact:['Stronger brand awareness','Higher engagement through creator-led promotion','More credibility in health and wellness'],svc:['Influencer collaboration and management','Content creation and strategy','Campaign execution and amplification']},
 {id:'fastup',brand:'Fast&Up',chan:'Influencer',product:'Fat-loss range',hl:'Became the best-selling fat-loss product',stats:[['9M+','Reach / views'],['60+','Content pieces'],['₹11L','Total budget'],['₹0.14','Cost per view']],
  obj:'Raise awareness for Fast&Up\'s fat-loss products with fitness-conscious consumers and build buzz in health and wellness.',
  app:'We partnered with fat-loss and fitness creators whose audiences trust them, so the product benefits landed as advice rather than ads.',
  impact:['Stronger awareness among fitness audiences','Higher engagement through creator-led promotion','More credibility in health and wellness'],svc:['Influencer collaboration and management','Content creation and strategy','Campaign execution and amplification']},
 {id:'bebodywise',brand:'BeBodywise',chan:'Influencer',product:'Roll-on and face wash',stats:[['5M+','Reach / views'],['6','Content pieces'],['₹4.31L','Total budget'],['₹0.09','Cost per view']],
  obj:'Drive awareness and sales of the BeBodywise roll-on and face wash with women, and make them part of daily body care.',
  app:'A small set of highly engaged beauty creators showed the products in their own routines, keeping cost per view under ten paise.',
  impact:['Stronger awareness among women','Higher engagement through creator-led promotion','More credibility in the category'],svc:['Influencer collaboration and management','Content creation and strategy','Campaign execution and amplification']},
 {id:'plix',brand:'Plix',chan:'Influencer',product:'Apple cider vinegar (ACV)',stats:[['2M+','Reach / views'],['20+','Content pieces'],['5.3%','Engagement rate']],
  obj:'Build awareness for Plix ACV among fitness-conscious buyers looking for help with fat loss.',
  app:'Fat-loss creators explained the product in their own words, using the trust they had already built with their audience.',
  impact:['Stronger awareness among fitness audiences','Higher engagement through creator-led promotion','More credibility in health and wellness'],svc:['Influencer collaboration and management','Content creation and strategy','Campaign execution and amplification']},
 {id:'waterscience',brand:'Waterscience',chan:'Influencer',product:'Shower and tap filters',stats:[['1.3M+','Reach / views'],['10+','Content pieces'],['7.6%','Engagement rate']],
  obj:'Make Waterscience filters a daily-life essential for Tier 1 and Tier 2 households.',
  app:'Fashion, lifestyle and home-decor creators showed the filters in everyday use, backed by timed deal posts that sent buyers to Amazon and Flipkart.',
  impact:['Stronger brand awareness','Higher engagement through creator-led promotion','More credibility in daily use and care'],svc:['Influencer collaboration and management','Content creation and strategy']},
 {id:'sova',brand:'Sova Health',chan:'UGC',key:'15 days',product:'Gut microbiome test kit',stats:[['5','Quality content'],['₹1.4L','Total budget'],['15 days','Content delivery']],
  obj:'Get people curious about Sova\'s gut microbiome test, a kit that works from a stool sample, and explain why it\'s worth doing.',
  app:'Creators made honest user-generated videos walking through the kit, turning an awkward product into something people wanted to talk about.',
  impact:['Stronger awareness among health-focused audiences','Higher engagement through creator-led content','More credibility for a new category'],svc:['Influencer collaboration and management','Content creation and strategy','Campaign execution and amplification']},
 {id:'zapvi',brand:'Zapvi',chan:'UGC',key:'',product:'Custom mobile covers',stats:[['UGC','Quality creator content']],
  obj:'Boost visibility and interest in Zapvi\'s customisable phone covers across social media.',
  app:'Highly engaged profiles made UGC around the covers, timed and targeted to the audiences most likely to buy.',
  impact:['Higher brand visibility','More traffic and conversions','Stronger brand credibility'],svc:['Content creation','Cost optimisation','Content strategy']},
 {id:'zakkas',brand:'Zakkas',chan:'UGC',key:'',product:'Paper dosa range',stats:[['UGC','Quality creator content']],
  obj:'Boost visibility for Zakkas paper dosa and its different flavours across social media.',
  app:'Engaged food and lifestyle profiles made taste-test UGC, focused on the right timing, product and audience.',
  impact:['Higher brand visibility','More traffic and conversions','Stronger brand credibility'],svc:['Content creation','Cost optimisation','Content strategy']},
 {id:'citykart',brand:'Citykart',chan:'Regional pages',product:'On-ground (BTL) campaign',stats:[['550K+','Reach / views'],['6','Content pieces'],['₹60K','Total budget'],['₹0.11','Cost per view']],
  obj:'Amplify Citykart\'s banners and auto-rickshaw posters in Lucknow and Prayagraj so people noticed the on-ground campaign.',
  app:'Local community pages made content about the activity and told their followers where to spot it.',
  impact:['Stronger local awareness','Higher engagement through city pages'],svc:['Regional page collaboration and management','Content creation and strategy']},
 {id:'netflix',brand:'Netflix',chan:'Talent',product:'Kurukshetra series launch',stats:[['333K+','Reach / views'],['1','Content piece'],['Exclusive','FameBit talent']],
  obj:'Build buzz for Kurukshetra on Netflix and get more viewers to tune in.',
  app:'Our exclusive creator Yash Anand recreated Arjun\'s look from the series in his high-engagement fitness style.',
  impact:['Stronger awareness of the series'],svc:['Talent management','Content creation']},
 {id:'amazon',brand:'Amazon',chan:'Telegram',product:'Valentine\'s Day gifting',stats:[['1.4M+','Impressions'],['60','Posts'],['35','Channels']],
  obj:'Drive Valentine\'s Day sales for an Amazon gifting sub-brand by reaching a large deal-hunting audience at low cost.',
  app:'Timed promotions across 35 deal channels, picked after a detailed channel analysis, sent buyers straight to the Amazon listings.',
  impact:['Higher visibility in deal communities','More traffic and conversions on Amazon','Stronger credibility in e-commerce groups'],svc:['Channel selection and placement','Cost optimisation','Content strategy','Targeted promotions']},
 {id:'myupchar',brand:'Myupchar',chan:'Telegram',product:'Hair oil, Biotin+ and face serum',stats:[['885K+','Impressions'],['11','Posts'],['9','Channels']],
  obj:'Drive sales of Myupchar hair and skin products on Amazon through targeted Telegram marketing.',
  app:'Offer-led posts in engaged deal channels, timed and targeted after channel analysis, maximised clicks to Amazon.',
  impact:['Higher visibility in deal communities','More traffic and conversions on Amazon','Stronger credibility in e-commerce groups'],svc:['Channel selection and placement','Cost optimisation','Content strategy','Targeted promotions']},
 {id:'pilgrim',brand:'Pilgrim',chan:'Telegram',product:'Vitamin C face wash',stats:[['427K+','Impressions'],['7','Posts'],['7','Channels']],
  obj:'Grow sales of Pilgrim\'s Vitamin C face wash on Amazon at an efficient cost.',
  app:'Coupon-led deal posts across seven engaged channels drove clicks to the Amazon listing.',
  impact:['Higher visibility in deal communities','More traffic on Amazon','Stronger credibility in e-commerce groups'],svc:['Channel selection and placement','Cost optimisation','Content strategy','Targeted execution']},
 {id:'fastup-tg',brand:'Fast&Up',chan:'Telegram',product:'Amazon and D2C store',stats:[['423K+','Impressions'],['7','Posts'],['3','Channels']],
  obj:'Grow Fast&Up sales on Amazon and on their own website through targeted Telegram marketing.',
  app:'Strategic promotions in e-commerce deal groups, focused on timing, offers and audience targeting.',
  impact:['Higher visibility in deal communities','More traffic and conversions on Amazon and D2C','Stronger credibility in e-commerce groups'],svc:['Channel selection and placement','Cost optimisation','Content strategy','Targeted promotions']},
 {id:'panchamrit',brand:'Panchamrit',chan:'Telegram',product:'Shilajit, gut health and vegan collagen',stats:[['400K+','Impressions'],['28','Posts'],['7','Channels']],
  obj:'Grow sales of Panchamrit\'s wellness range on Amazon and Flipkart.',
  app:'Deal-group promotions across seven channels, tuned for timing, offers and audience.',
  impact:['Higher visibility in deal communities','More traffic and conversions on Amazon and Flipkart','Stronger credibility in e-commerce groups'],svc:['Channel selection and placement','Cost optimisation','Content strategy','Targeted promotions']}
];
/* Industry of each brand, used by "Read your competitor's case studies" */
var IND={hkvitals:'Health & wellness',fastup:'Health & wellness',plix:'Health & wellness',sova:'Health & wellness',myupchar:'Health & wellness',panchamrit:'Health & wellness','fastup-tg':'Health & wellness',
 bebodywise:'Beauty & personal care',pilgrim:'Beauty & personal care',waterscience:'Home & living',zakkas:'Food & beverage',zapvi:'Fashion & retail',citykart:'Fashion & retail',netflix:'Media & entertainment',amazon:'E-commerce'};
var GRAD={hkvitals:'#6D28D9,#DB2777',fastup:'#EA580C,#F59E0B',bebodywise:'#BE185D,#F472B6',plix:'#059669,#0EA5E9',waterscience:'#0284C7,#22D3EE',sova:'#0F766E,#34D399',zapvi:'#4338CA,#818CF8',zakkas:'#B45309,#FBBF24',
 citykart:'#B45309,#F59E0B',netflix:'#991B1B,#EF4444',amazon:'#0F766E,#14B8A6',myupchar:'#1D4ED8,#60A5FA',pilgrim:'#9D174D,#F9A8D4','fastup-tg':'#C2410C,#FB923C',panchamrit:'#166534,#4ADE80'};
CASES.forEach(function(c){c.ind=IND[c.id]||'Other';c.grad=GRAD[c.id]||'#5B21B6,#7C3AED'});

/* Helpers */
function fmt(n){return n>=1e6?(n/1e6).toFixed(1).replace('.0','')+'M':n>=1e3?Math.round(n/1e3)+'K':n}
function initials(n){return n.replace('Dr. ','').split(' ').map(function(x){return x[0]}).join('').slice(0,2)}
function av(c,cls){return '<i class="av'+(cls?' '+cls:'')+'" style="background:'+c.color+'">'+initials(c.name)+'</i>'}
var PIN='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
function scoreCls(t){return t>=85?'hi':'mid'}
function sizeOf(f){return f<1e4?'nano':f<1e5?'micro':f<5e5?'mid':f<1e6?'macro':'mega'}
function store(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;')}
