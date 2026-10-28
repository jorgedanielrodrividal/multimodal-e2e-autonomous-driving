'use strict';
const results = [
  {name:'TCP-ctrl*',ds:30.47,sr:7.27,latency:83,e:55.97,c:51.51},
  {name:'MILE†',ds:39.80,sr:5.45,latency:44,e:67.59,c:25.23},
  {name:'CIL++',ds:59.53,sr:25.57,latency:5.4,e:204.23,c:18.38},
  {name:'DriveTransformer-L',ds:63.46,sr:35.01,latency:211.7,e:100.64,c:20.78},
  {name:'DriveAdapter',ds:64.22,sr:33.08,latency:931,e:70.22,c:16.01},
  {name:'ETA',ds:69.53,sr:38.64,latency:50,e:184.51,c:28.43},
  {name:'Hydra-NeXt',ds:73.86,sr:50.00,latency:528.3,e:197.76,c:20.68},
  {name:'ADT (ours)',ds:77.90,sr:55.00,latency:19.2,e:192.15,c:25.63}
];
const settings={ds:{max:100,label:'Driving Score',unit:'',note:'Higher is better. Linear scale: 0–100. Paper Table 2.'},sr:{max:100,label:'Success Rate',unit:'%',note:'Higher is better. Linear scale: 0–100%. Paper Table 2.'},latency:{max:1000,label:'Latency',unit:' ms',note:'Lower is better. Linear scale: 0–1,000 ms. Reported latencies from Table 2; sensor configurations differ across methods.'}};
function draw(metric){
 const s=settings[metric];
 document.querySelector('#comparison-chart').innerHTML=results.map(r=>`<div class="chart-row ${r.name.startsWith('ADT')?'ours':''}" aria-label="${r.name}: ${r[metric].toFixed(metric==='latency'?1:2)}${s.unit} ${s.label}"><span>${r.name}</span><div class="track" aria-hidden="true"><span class="bar" style="--width:${r[metric]/s.max*100}%"></span></div><span class="value">${r[metric].toFixed(metric==='latency'?1:2)}</span></div>`).join('');
 document.querySelector('#metric-note').textContent=s.note;
 document.querySelectorAll('[data-metric]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.metric===metric)));
}
document.querySelectorAll('[data-metric]').forEach(b=>b.addEventListener('click',()=>draw(b.dataset.metric)));draw('ds');
document.querySelector('#results-table').innerHTML=results.map(r=>`<tr><th scope="row">${r.name}</th><td>${r.ds.toFixed(2)}</td><td>${r.sr.toFixed(2)}</td><td>${r.e.toFixed(2)}</td><td>${r.c.toFixed(2)}</td><td>${r.latency}</td></tr>`).join('');
const dialog=document.querySelector('#figure-dialog');
document.querySelectorAll('[data-zoom]').forEach(b=>b.addEventListener('click',()=>{const i=document.querySelector('#enlarged-figure');i.src=b.dataset.zoom;i.alt=b.querySelector('img').alt;dialog.showModal();}));
document.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
document.querySelector('#copy-citation').addEventListener('click',async()=>{
 const content=document.querySelector('#bibtex').textContent;
 try{await navigator.clipboard.writeText(content);document.querySelector('#copy-status').textContent='BibTeX copied.';}
 catch{const range=document.createRange();range.selectNodeContents(document.querySelector('#bibtex'));const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);document.querySelector('#copy-status').textContent='Citation selected. Press Ctrl+C (or ⌘C) to copy.';}
});
