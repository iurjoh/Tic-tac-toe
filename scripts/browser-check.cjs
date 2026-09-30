const {chromium}=require('playwright');
const {default:AxeBuilder}=require('@axe-core/playwright');
const assert=require('node:assert/strict'), fs=require('node:fs'), http=require('node:http'), path=require('node:path');
(async()=>{
const root=path.resolve(__dirname,'..'), out=path.join(root,'test-results');
fs.mkdirSync(out,{recursive:true});
const server=http.createServer((req,res)=>{const p=req.url.split('?')[0];const f=path.join(root,p==='/'?'index.html':p);try{res.setHeader('Content-Type',f.endsWith('.css')?'text/css':f.endsWith('.js')?'text/javascript':f.endsWith('.svg')?'image/svg+xml':'text/html');res.end(fs.readFileSync(f))}catch{res.statusCode=404;res.end()}}).listen(8124,'127.0.0.1');
const browser=await chromium.launch({...(process.env.CHROME_PATH ? {executablePath:process.env.CHROME_PATH} : {}),headless:true,args:['--no-sandbox']});
const report={date:'2026-09-30',browser:browser.version(),screens:[],keyboard:[],network:[],axe:[]};
async function keyboardCell(page,index,key='Enter'){
 for(let n=0;n<14;n++){
  if(await page.evaluate(i=>document.activeElement?.dataset.index===String(i),index)){await page.keyboard.press(key);return}
  await page.keyboard.press('Tab');
 }
 throw Error('could not reach cell '+index);
}
async function layout(page,label){
 const data=await page.evaluate(()=>{
 const r=e=>{const b=e.getBoundingClientRect();return {x:b.x,y:b.y,width:b.width,height:b.height,bottom:b.bottom}};
 return {width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,header:r(document.querySelector('header')),board:r(document.querySelector('.board')),status:r(document.querySelector('.status')),restart:r(document.querySelector('[data-restart]')),buttons:[...document.querySelectorAll('[data-cell]')].map(e=>e.getAttribute('aria-label'))};
 });
 assert.ok(data.scrollWidth<=data.width,`${label}: horizontal overflow`);
 assert.ok(data.header.bottom < data.board.y,`${label}: overlap`);
 assert.ok(data.status.bottom <= data.board.y,`${label}: status overlap`);
 assert.ok(data.board.bottom <= data.restart.y,`${label}: restart overlap`);
 report.screens.push({label,...data});
}
for(const [w,h] of [[320,568],[844,390],[390,844],[1440,900],[280,568]]){
 const testContext=await browser.newContext({viewport:{width:w,height:h}}); const page=await testContext.newPage();
 page.on('request',r=>report.network.push(r.url()));
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:8124');await page.locator('[data-cell][aria-disabled="false"]').first().waitFor();
 await keyboardCell(page,0);await keyboardCell(page,4,'Space');
 await page.mouse.move(0,0);await page.evaluate(()=>scrollTo(0,0));
 await layout(page,`${w}x${h}`);
 await page.screenshot({path:`${out}/after-${w}x${h}.png`});
 await page.screenshot({path:`${out}/after-${w}x${h}-full.png`,fullPage:true});
 const a11y=await new AxeBuilder({page}).analyze();
 report.axe.push({size:`${w}x${h}`,violations:a11y.violations,incomplete:a11y.incomplete.map(x=>({id:x.id,impact:x.impact,description:x.description,nodes:x.nodes.map(n=>({html:n.html,target:n.target,summary:n.failureSummary}))}))});
 assert.deepEqual(errors,[]);
 await testContext.close();
}
// Reflow approximation for 200% zoom: half the CSS viewport. This is not real browser zoom.
const zoomPage=await browser.newPage({viewport:{width:640,height:1136}});
await zoomPage.goto('http://127.0.0.1:8124');
await zoomPage.setViewportSize({width:320,height:568});
await zoomPage.locator('[data-cell]').first().waitFor();
await layout(zoomPage,'200% reflow equivalent: 640x1136 physical / 320x568 CSS');
await zoomPage.screenshot({path:`out`.replace('out',out)+'/after-200-percent-reflow.png',fullPage:true});
await zoomPage.close();
// Keyboard-only full match. Do not call focus(), click(), or modify app state.
const context=await browser.newContext({viewport:{width:390,height:844},recordVideo:{dir:out,size:{width:390,height:844}}});
const page=await context.newPage();await page.goto('http://127.0.0.1:8124');await page.locator('[data-cell]').first().waitFor();
for(const [step,index] of [0,3,1,4,2].entries()){
 await keyboardCell(page,index,step%2?'Space':'Enter');
 report.keyboard.push({step:step+1,index,status:await page.locator('[data-status]').textContent(),focus:await page.evaluate(()=>document.activeElement.outerHTML)});
 await page.screenshot({path:`${out}/keyboard-step-${step+1}.png`,fullPage:true});
 await page.waitForTimeout(900); // Deliberate recording dwell so the demonstration is readable.
}
assert.match(await page.locator('[data-status]').textContent(),/X venceu/);
assert.equal(await page.locator('.winner').count(),3);
assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-restart')),true);
const snapshot=await page.locator('[data-board]').innerHTML();
await keyboardCell(page,8);assert.equal(await page.locator('[data-board]').innerHTML(),snapshot);
// Move from cell 9 to restart and activate.
await page.keyboard.press('Tab');await page.keyboard.press('Enter');
await page.waitForFunction(()=>document.querySelectorAll('.x, .circle').length===0);
assert.equal(await page.locator('.x, .circle').count(),0);
assert.equal(await page.evaluate(()=>document.activeElement.dataset.index),'0');
await page.waitForTimeout(900);
report.keyboard.push({action:'restart',status:await page.locator('[data-status]').textContent(),focus:'cell 0'});
await page.keyboard.press('Space');
for(let n=0;n<9;n++)await page.keyboard.press('Tab');
await page.keyboard.press('Enter');assert.equal(await page.locator('dialog').evaluate(e=>e.open),true);
assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-cancel-restart')),true);
await page.screenshot({path:out+'/restart-confirmation.png'});
report.axe.push({size:'restart dialog',violations:(await new AxeBuilder({page}).analyze()).violations});
await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('dialog').open);assert.equal(await page.locator('.x').count(),1);
assert.equal(await page.evaluate(()=>document.activeElement.hasAttribute('data-restart')),true);
await page.keyboard.press('Enter');await page.waitForFunction(()=>document.querySelector('dialog').open);await page.keyboard.press('Tab');await page.keyboard.press('Enter');
await page.waitForFunction(()=>!document.querySelector('dialog').open && document.querySelectorAll('.x, .circle').length===0);
assert.equal(await page.locator('.x').count(),0);
assert.equal(await page.evaluate(()=>document.activeElement.dataset.index),'0');
report.keyboard.push({action:'active restart confirmation, Escape cancellation and confirmed restart',passed:true});
// O win and draw through the UI.
for (const [sequence,expected] of [[[0,3,1,4,8,5],'O venceu!'],[[0,1,2,4,3,5,7,6,8],'Empate!']]) {
 for(const i of sequence)await keyboardCell(page,i);
 assert.equal(await page.locator('[data-result-text]').textContent(),expected);
 report.keyboard.push({action:expected,passed:true});
 await page.keyboard.press('Enter');await page.waitForFunction(()=>document.querySelectorAll('.x, .circle').length===0);
}
report.accessibilityTree=await page.locator('body').ariaSnapshot();
const video=page.video();await context.close();await video.saveAs(out+'/keyboard-complete.webm');
await browser.close();server.close();
report.network=[...new Set(report.network)];assert.ok(report.network.every(u=>u.startsWith('http://127.0.0.1:8124/')));
assert.ok(report.axe.every(x=>!x.violations.length),JSON.stringify(report.axe));
fs.writeFileSync(out+'/browser-results.json',JSON.stringify(report,null,2));
console.log(JSON.stringify({screens:report.screens.map(x=>x.label),keyboard:report.keyboard,network:report.network,axe:report.axe},null,2));
})().catch(e=>{console.error(e);process.exit(1)});
