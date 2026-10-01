const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const browser=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=9337',`--user-data-dir=${path.join(process.env.TEMP,'nexbill-workflow-validation')}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
let ws,seq=0;const pending=new Map(),errors=[],sleep=ms=>new Promise(r=>setTimeout(r,ms));
function command(method,params={}){let id=++seq;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const r=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function page(name){await evaluate(`location.hash='${name}'`);await sleep(140)}
async function click(selector){await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);await sleep(100)}
async function change(sel,value){await evaluate(`document.querySelector(${JSON.stringify(sel)}).value=${JSON.stringify(value)};document.querySelector(${JSON.stringify(sel)}).dispatchEvent(new Event('input',{bubbles:true}));document.querySelector(${JSON.stringify(sel)}).dispatchEvent(new Event('change',{bubbles:true}))`)}
async function run(){let tabs;for(let n=0;n<40;n++){try{tabs=await (await fetch('http://127.0.0.1:9337/json')).json();break}catch{await sleep(150)}}if(!tabs)throw Error('Browser endpoint unavailable');ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);ws.onmessage=e=>{let d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);if(d.id){let p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result)}};await command('Runtime.enable');await command('Page.enable');await command('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await command('Page.navigate',{url:pathToFileURL(path.join(__dirname,'index.html')).href});await sleep(400);await evaluate('localStorage.removeItem(STORAGE)');await command('Page.reload');await sleep(300);


assert.equal(await evaluate('journeyRoute().page'),'events');
assert.equal(await evaluate('document.querySelectorAll(".event-card").length'),4);
assert.equal(await evaluate('!!document.querySelector("#account-select")'),false);
await click('a[href="#impact/slowdown"]');assert.equal(await evaluate('journeyRoute().page'),'impact');
assert.equal(await evaluate('document.querySelectorAll(".event-customer-row").length'),3);
assert.equal(await evaluate('eventTotal(businessEvents.find(e=>e.id==="slowdown"))'),8000000);
await click('a[href="#customer/slowdown/0"]');assert.equal(await evaluate('ui.account'),0);
await click('a[href="#decision/slowdown/0"]');await click('[data-event-watch]');assert.equal(await evaluate('activeDecision().eventId'),'slowdown');
await click('[data-event-watch]');assert.equal(await evaluate('state().decisions.length'),1);
const baseline=await evaluate('JSON.stringify({f:forecast(c()),i:invoices(c())})');
await evaluate('document.querySelector("[name=choice]").value=currentChoices()[0]');await click('#business-form [type=submit]');
assert.equal(await evaluate('latestOperation().status'),'pending');assert.equal(await evaluate('activeDecision().eventId'),'slowdown');
await click('[data-business-status="approved"]');await click('[data-business-status="effective"]');assert.equal(await evaluate('latestOperation().status'),'effective');assert.equal(await evaluate('JSON.stringify({f:forecast(c()),i:invoices(c())})'),baseline);
await page('decision/expansion/4');assert.equal(await evaluate('ui.account'),4);assert.equal(await evaluate('ui.issue'),'growth');await evaluate('document.querySelector("[name=choice]").value=currentChoices()[0]');await click('#business-form [type=submit]');assert.equal(await evaluate('activeDecision().eventId'),'expansion');
await command('Page.reload');await sleep(300);assert.equal(await evaluate('journeyRoute().event.id'),'expansion');assert.equal(await evaluate('latestOperation().status'),'pending');
await page('customer/credit/4');assert.equal(await evaluate('journeyRoute().page'),'invalid');
await page('events');await evaluate('document.querySelector("#toast").style.display="none";window.scrollTo(0,0)');let shot=await command('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(__dirname,'preview-event-feed.png'),Buffer.from(shot.data,'base64'));
await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true);await page('decision/credit/0');assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true);
await page('billing');assert.equal(await evaluate('!!document.querySelector("#account-select")'),true);assert.deepEqual(errors,[]);console.log('PASS: event-first home, multi-customer impact, customer context, deduplicated monitoring, decision capture, approval lifecycle, unchanged financial facts, reload, invalid routes and mobile layout.');

}
run().catch(e=>{console.error(e);console.error(JSON.stringify(errors));process.exitCode=1}).finally(async()=>{if(ws){try{await command('Browser.close')}catch{}ws.close()}browser.kill()});
