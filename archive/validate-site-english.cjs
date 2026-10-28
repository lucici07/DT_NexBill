const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const browser=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=9337',`--user-data-dir=${path.join(process.env.TEMP,'nexbill-workflow-validation')}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
let ws,seq=0;const pending=new Map(),errors=[],sleep=ms=>new Promise(r=>setTimeout(r,ms));
function command(method,params={}){let id=++seq;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const r=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function page(name){await evaluate(`location.hash='${name}'`);await sleep(140)}
async function click(selector){await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);await sleep(100)}
async function change(sel,value){await evaluate(`document.querySelector(${JSON.stringify(sel)}).value=${JSON.stringify(value)};document.querySelector(${JSON.stringify(sel)}).dispatchEvent(new Event('input',{bubbles:true}));document.querySelector(${JSON.stringify(sel)}).dispatchEvent(new Event('change',{bubbles:true}))`)}
async function run(){let tabs;for(let n=0;n<40;n++){try{tabs=await (await fetch('http://127.0.0.1:9337/json')).json();break}catch{await sleep(150)}}if(!tabs)throw Error('Browser endpoint unavailable');ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);ws.onmessage=e=>{let d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);if(d.id){let p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result)}};await command('Runtime.enable');await command('Page.enable');await command('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await command('Page.navigate',{url:pathToFileURL(path.join(__dirname,'index.html')).href});await sleep(400);await evaluate('localStorage.removeItem(STORAGE)');await command('Page.reload');await sleep(300);




const hasHan=expression=>evaluate('Array.from('+expression+').some(c=>c.charCodeAt(0)>=0x3400&&c.charCodeAt(0)<=0x9fff)');
await evaluate('window.englishAudit=function(){const attrs=[...document.querySelectorAll("[title],[placeholder],[aria-label]")].flatMap(e=>[e.title,e.getAttribute("placeholder")||"",e.getAttribute("aria-label")||""]);const values=[...document.querySelectorAll("input,textarea,select")].map(e=>e.value);const text=document.body.textContent+attrs.join(" ")+values.join(" ");return Array.from(text).filter(c=>c.charCodeAt(0)>=0x3400&&c.charCodeAt(0)<=0x9fff).join("")}');
for(const route of ['events','impact/workforce','impact/credit','impact/slowdown','impact/expansion','customer/workforce/0','decision/workforce/0','decision/credit/0','decision/expansion/4','billing','revenue','profit','contracts','scope']){await page(route);assert.equal(await evaluate('englishAudit()'),'','Non-English text on '+route)}
await page('billing');await evaluate('for(let id=0;id<accounts.length;id++){ui.account=id;for(const tab of ["monitor","profit","decision"]){ui.aiTab=tab;render();if(englishAudit())throw Error("Non-English account "+id+" tab "+tab)}}');
await evaluate('ui.account=0;ui.aiTab="monitor";render()');
for(const id of ['H1','H2','N1','N2','scenario','E1','E2','E3','E4']){await evaluate('showEvidence('+JSON.stringify(id)+')');assert.equal(await evaluate('englishAudit()'),'','Non-English evidence '+id);await click('[data-command="close-dialog"]')}
await page('scope');await click('[data-command="sources"]');assert.equal(await evaluate('englishAudit()'),'');await click('[data-command="close-dialog"]');
await page('revenue');await click('[data-report-tab="pn"]');assert.equal(await evaluate('englishAudit()'),'');
await page('billing');await evaluate('window.csvBlob=null;const realCreate=URL.createObjectURL.bind(URL);URL.createObjectURL=b=>{window.csvBlob=b;return realCreate(b)};exportReport()');assert.equal(await evaluate('(async()=>Array.from(await csvBlob.text()).some(c=>c.charCodeAt(0)>=0x3400&&c.charCodeAt(0)<=0x9fff))()'),false);
await evaluate('ui.aiTab="decision";render();continueMonitoring();simulate();simulate();simulate();simulate();ui.watch=true;render()');assert.equal(await evaluate('englishAudit()'),'');
await evaluate('showDecision(activeDecision().id)');assert.equal(await evaluate('englishAudit()'),'');await click('[data-command="close-dialog"]');
await page('decision/workforce/0');await click('[data-dw-choice]');await evaluate('const f=document.querySelector("#finance-decision-form");f.elements.comments.value="Keep existing terms"');await click('#finance-decision-form [value="submit"]');assert.equal(await evaluate('englishAudit()'),'');await click('[data-business-status="approved"]');await click('[data-business-status="effective"]');assert.equal(await evaluate('englishAudit()'),'');
// Check old stored system values migrate while user-entered text remains untouched.
await evaluate('const saved=state();saved.operations[0].choice=String.fromCharCode(0x7ef4,0x6301,0x7eed,0x7ea6,0x4ef7,0x683c);saved.operations[0].comments=String.fromCharCode(0x7528,0x6237,0x5907,0x6ce8);localStorage.setItem(STORAGE,JSON.stringify(store))');await command('Page.reload');await sleep(300);assert.equal(await evaluate('state().operations[0].choice'),await evaluate('operationChoices[0]'));assert.equal(await evaluate('state().operations[0].comments'),String.fromCharCode(0x7528,0x6237,0x5907,0x6ce8));
await page('billing');await evaluate('ui.open=false;render();document.querySelector("#toast").style.display="none"');let shot=await command('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(__dirname,'preview-english-billing.png'),Buffer.from(shot.data,'base64'));
assert.deepEqual(errors,[]);console.log('PASS: 14 routes, all 12 accounts, all assistant tabs, evidence and reference dialogs, reports, CSV, watchlist, decision history, lifecycle and legacy-value migration; user comments preserved.');

}
run().catch(e=>{console.error(e);console.error(JSON.stringify(errors));process.exitCode=1}).finally(async()=>{if(ws){try{await command('Browser.close')}catch{}ws.close()}browser.kill()});


