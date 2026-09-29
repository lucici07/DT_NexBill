const {spawn}=require('node:child_process'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),{pathToFileURL}=require('node:url');
const browser=spawn('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=9337',`--user-data-dir=${path.join(process.env.TEMP,'nexbill-workflow-validation')}`,'about:blank'],{windowsHide:true,stdio:'ignore'});
let ws,seq=0;const pending=new Map(),errors=[],sleep=ms=>new Promise(r=>setTimeout(r,ms));
function command(method,params={}){let id=++seq;return new Promise((resolve,reject)=>{pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))})}
async function evaluate(expression){const r=await command('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(JSON.stringify(r.exceptionDetails));return r.result.value}
async function page(name){await evaluate(`location.hash='${name}'`);await sleep(140)}
async function click(selector){await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`);await sleep(100)}
async function change(sel,value){await evaluate(`document.querySelector(${JSON.stringify(sel)}).value=${JSON.stringify(value)};document.querySelector(${JSON.stringify(sel)}).dispatchEvent(new Event('input',{bubbles:true}));document.querySelector(${JSON.stringify(sel)}).dispatchEvent(new Event('change',{bubbles:true}))`)}
async function run(){let tabs;for(let n=0;n<40;n++){try{tabs=await (await fetch('http://127.0.0.1:9337/json')).json();break}catch{await sleep(150)}}if(!tabs)throw Error('Browser endpoint unavailable');ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);await new Promise(r=>ws.onopen=r);ws.onmessage=e=>{let d=JSON.parse(e.data);if(d.method==='Runtime.exceptionThrown')errors.push(d.params.exceptionDetails);if(d.id){let p=pending.get(d.id);pending.delete(d.id);d.error?p.reject(d.error):p.resolve(d.result)}};await command('Runtime.enable');await command('Page.enable');await command('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});await command('Page.navigate',{url:pathToFileURL(path.join(__dirname,'index.html')).href});await sleep(400);await evaluate('localStorage.removeItem(STORAGE)');await command('Page.reload');await sleep(300);

assert.equal(await evaluate('document.querySelectorAll(".issue-card").length'),4);
assert.equal(await evaluate('document.querySelectorAll("#assistant details[open]").length'),0);
assert.ok(await evaluate('document.querySelector("#assistant").innerText.length<600'));
await click('[data-issue="collection"]');assert.equal(await evaluate('ui.issue'),'collection');
await click('[data-flow="host"]');await sleep(200);assert.equal(await evaluate('page()'),'billing');
await evaluate('document.querySelector("[name=choice]").value=currentChoices()[0]');await click('#business-form [type="submit"]');
assert.equal(await evaluate('latestOperation().issue'),'collection');assert.equal(await evaluate('latestOperation().status'),'pending');
await evaluate('ui.open=true;ui.aiTab="monitor";render()');await click('[data-issue="revenue"]');await click('[data-flow="host"]');await sleep(200);
assert.equal(await evaluate('page()'),'revenue');await evaluate('document.querySelector("[name=choice]").value=currentChoices()[0]');await click('#business-form [type="submit"]');
assert.equal(await evaluate('state().operations.length'),2);
await evaluate('ui.issue="collection";location.hash="billing"');await sleep(200);await click('[data-business-status="approved"]');
assert.equal(await evaluate('state().operations[0].status'),'approved');assert.equal(await evaluate('state().operations[1].status'),'pending');
await click('[data-business-status="effective"]');assert.equal(await evaluate('state().operations[0].status'),'effective');assert.ok(await evaluate('effectiveTerms().includes("原方案")'));
await evaluate('ui.open=true;ui.aiTab="monitor";render()');await click('[data-issue="margin"]');await click('[data-flow="host"]');await sleep(200);assert.equal(await evaluate('page()'),'profit');
await evaluate('ui.open=true;ui.aiTab="decision";render()');assert.equal(await evaluate('document.querySelectorAll("#assistant details[open]").length'),0);
await evaluate('ui.aiTab="monitor";assistantRender()');await click('#assistant details summary');await click('[data-compact-evidence="external"]');await click('[data-feedback="exclude"][data-event="E2"]');assert.equal(await evaluate('state().feedback.E2'),'exclude');assert.equal(await evaluate('state(1).feedback.E2'),undefined);
await evaluate('ui.aiTab="monitor";render();document.querySelector("#toast").style.display="none";window.scrollTo(0,0)');let shot=await command('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(__dirname,'preview-compact-ai.png'),Buffer.from(shot.data,'base64'));
await command('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true);await click('[data-issue="collection"]');assert.equal(await evaluate('document.documentElement.scrollWidth<=innerWidth'),true);
assert.deepEqual(errors,[]);console.log('PASS: four compact issues, collapsed evidence, independent business requests, correct routing, non-renewal isolation, evidence scope and mobile layout.');

}
run().catch(e=>{console.error(e);console.error(JSON.stringify(errors));process.exitCode=1}).finally(async()=>{if(ws){try{await command('Browser.close')}catch{}ws.close()}browser.kill()});
