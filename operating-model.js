'use strict';
const customers = [
 {id:'telecom',name:'Global Telecom Operator',segment:'Telecom',country:'United States',principal:42,revenue:5.2,ar:4.5,overdue:4.5,days:96,margin:18,priorMargin:22,yield:8.4,loss:1.8,health:38,risk:'High',renewal:60,renewalValue:5.2,contracts:8,driver:'Payments more than 90 days overdue',impact:'$4.5M in delayed receipts may shift cash into the next quarter.',action:'Review collections and credit limit',event:'Credit outlook turned negative',context:'Credit context reinforces the need for a review; payment delays determine the current risk level.',opp:0},
 {id:'retail',name:'Retail Technology Group',segment:'Retail',country:'Germany',principal:28,revenue:3.6,ar:2.4,overdue:1.2,days:62,margin:14,priorMargin:18,yield:7.2,loss:1.4,health:51,risk:'High',renewal:25,renewalValue:3.6,contracts:6,driver:'Late payments and pending renewal',impact:'$1.2M is overdue; a $3.6M renewal needs engagement within 30 days.',action:'Agree a payment and renewal plan',event:'Store network restructuring announced',context:'Validate the customer footprint before agreeing the next lease scope.',opp:0},
 {id:'cloud',name:'Cloud Infrastructure Provider',segment:'Cloud & Data Centers',country:'Germany',principal:36,revenue:4.8,ar:.8,overdue:0,days:0,margin:29,priorMargin:28,yield:10.2,loss:.4,health:91,risk:'Low',renewal:120,renewalValue:4.8,contracts:7,driver:'Payments current; renewal outside 90 days',impact:'A $4M expansion opportunity is uncontracted and excluded from the base forecast.',action:'Validate expansion budget and timing',event:'New cloud capacity announced',context:'Confirm funding and procurement timing before committing resources.',opp:4},
 {id:'datacenter',name:'North America Data Center Operator',segment:'Cloud & Data Centers',country:'United States',principal:32,revenue:4.2,ar:1.2,overdue:.3,days:35,margin:26,priorMargin:25,yield:9.6,loss:.6,health:78,risk:'Medium',renewal:28,renewalValue:4.2,contracts:5,driver:'Renewal approaching; one payment delayed',impact:'$4.2M of annual renewal value needs confirmation within 28 days.',action:'Confirm renewal scope with the account team',event:'New data center facility planned',context:'Keep expansion separate from renewal until additional demand is contracted.',opp:2},
 {id:'europe',name:'European Network Operator',segment:'Telecom',country:'France',principal:24,revenue:3,ar:1.7,overdue:.7,days:48,margin:17,priorMargin:20,yield:8,loss:1.2,health:62,risk:'Medium',renewal:22,renewalValue:3,contracts:5,driver:'Payment delays and contract flex-down request',impact:'$3M of annual renewal value may contract if usage reductions continue.',action:'Review renewal scope and service cost',event:'Industry capital spending slows',context:'Assess the requested reduction against contracted volumes before updating the forecast.',opp:0},
 {id:'healthcare',name:'Healthcare Equipment Leasing',segment:'Healthcare',country:'Singapore',principal:22,revenue:2.7,ar:.9,overdue:0,days:0,margin:24,priorMargin:24,yield:9.1,loss:.3,health:88,risk:'Low',renewal:150,renewalValue:2.7,contracts:4,driver:'Payments current; stable contract scope',impact:'Stable receipts support predictable cash flow; no immediate intervention is needed.',action:'Maintain scheduled account review',event:'Equipment upgrade program under review',context:'Treat potential equipment upgrades as an opportunity until approved.',opp:1}
];
const pages=[['dashboard','Dashboard','▦'],['events','Business Events','◷'],['signals','Signals','≋'],['analysis','Risks & Opportunities','◇'],['impact','Financial Impact','↗'],['recommendations','Recommendations','☷'],['decisions','Decision Center','✓'],['portfolio','Portfolio Optimization','◫'],['forecast','Forecast Intelligence','↗'],['customer','Customer 360','♙'],['outcomes','Outcome Review','✓']];
const totals={principal:sum('principal'),revenue:sum('revenue'),ar:sum('ar'),overdue:sum('overdue')};
const weighted=key=>customers.reduce((s,c)=>s+c.principal*c[key],0)/totals.principal;
const money=n=>'$'+n.toFixed(1)+'M';
const pct=n=>n.toFixed(1)+'%';
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function sum(key,rows=customers){return rows.reduce((s,c)=>s+c[key],0)}
function route(){const p=location.hash.slice(1).split('/');if(p[0]==='nexbill')return {page:'nexbill',module:['billing','collections','contracts','customers','portfolio'].includes(p[1])?p[1]:'billing',id:p[2]?.startsWith('@')?undefined:p[2],customerId:p[2]?.startsWith('@')&&customers.some(a=>a.id===p[2].slice(1))?p[2].slice(1):undefined};if(p[0]==='customer')return {page:'customer',customerId:customers.some(c=>c.id===p[1])?p[1]:'telecom'};return {page:pages.some(x=>x[0]===p[0])?p[0]:'dashboard',id:p[1]}}
function badge(level){return `<span class="pill ${level}">${level}</span>`}
function head(title,sub,extra=''){return `<div class="page-head"><div><div class="eyebrow">Leasing financial intelligence</div><h1>${title}</h1><p class="subtitle">${sub}</p></div>${extra||'<span class="period">Global portfolio · USD</span>'}</div>`}
function kpi(label,value,sub,cls=''){return `<div class="kpi"><div class="kpi-label">${label}</div><div class="kpi-value ${cls}">${value}</div><small>${sub}</small></div>`}
function panel(title,body,sub='',link=''){return `<section class="panel"><div class="panel-head"><div><h2>${title}</h2>${sub?`<p>${sub}</p>`:''}</div>${link}</div>${body}</section>`}
function chart(series,labels,unit='%',second=null,bounds={}){const all=second?series.concat(second):series;const max=bounds.max??Math.max(...all)*1.18,min=bounds.min??Math.max(0,Math.min(...all)*.7);const x=i=>48+i*520/Math.max(1,series.length-1),y=n=>162-(n-min)/(max-min||1)*136,pts=arr=>arr.map((n,i)=>`${x(i)},${y(n)}`).join(' ');return `<svg class="chart" viewBox="0 0 600 195" role="img" aria-label="${esc(labels.map((l,i)=>l+': '+series[i]+unit).join('; '))}" data-y-min="${min}" data-y-max="${max}">${[0,1,2,3,4].map(i=>{const val=max-i*(max-min)/4,yy=y(val);return `<line x1="48" y1="${yy}" x2="570" y2="${yy}" stroke="#edf1f6"/><text x="0" y="${yy+4}">${bounds.max===100?val:val.toFixed(1)}${unit}</text>`}).join('')}<polygon points="48,162 ${pts(series)} 568,162" fill="#edf4ff"/>${second?`<polyline points="${pts(second)}" fill="none" stroke="#9badc4" stroke-dasharray="5 5" stroke-width="2"/>`:''}<polyline points="${pts(series)}" fill="none" stroke="#3678df" stroke-width="2.7"/>${series.map((n,i)=>`<circle cx="${x(i)}" cy="${y(n)}" r="3" fill="white" stroke="#3678df"/><text x="${x(i)}" y="187" text-anchor="middle">${labels[i]}</text>`).join('')}</svg>`}
const CASES=[
 {
  "id": "payment",
  "customer": "telecom",
  "type": "Payment Delay",
  "title": "Overdue balance crosses 90 days",
  "severity": "High",
  "detected": "2026-10-21",
  "next": "2026-10-23",
  "description": "Global Telecom has $4.5M open AR, all more than 90 days overdue. Payment commitments remain unconfirmed.",
  "impact": "Quarter-end receipts may move into the next quarter.",
  "category": "Collection Risk",
  "score": 88,
  "trend": "Worsening",
  "confidence": "High",
  "driver": "96 days overdue and delayed payment status; a renewal is due in 60 days.",
  "summary": "Prioritize cash recovery before negotiating the next renewal.",
  "strength": 95,
  "history": [
   45,
   58,
   67,
   79,
   88
  ],
  "historyLabel": "Illustrative collection risk score",
  "internal": {
   "billing": "2 invoices delayed, 1 rejected",
   "collection": "$4.5M open AR · $4.5M overdue · oldest 96 days · payment delayed",
   "revenue": "$5.2M annual contracted revenue",
   "contract": "8 active contracts · renewal in 60 days · pending",
   "change": "No change events in 12M",
   "asset": "8,400 assets · stable installed base",
   "profitability": "18% operating margin vs 22% prior · after funding, service and collection costs",
   "usage": "Usage down 6% over 3M · illustrative trend"
  },
  "external": [
   "Negative credit outlook — illustrative context",
   "Telecom investment budgets under pressure",
   "No validated sentiment assessment",
   "No customer-specific economic adjustment",
   "Customer restructuring under review"
  ],
  "amount": 4.5,
  "amountLabel": "Delayed receipts",
  "rank": 1,
  "rec": "Increase collection follow-up and review credit limit",
  "reason": "The full open balance is 90+ days overdue. Confirm cash timing before extending further credit.",
  "benefit": "Secure dated commitments and recover overdue cash earlier.",
  "owner": "Maya Chen · Collections",
  "targetDate": "2026-10-28",
  "metric": "Cash collected",
  "target": 1.5,
  "max": 4.5,
  "unit": "USD millions",
  "options": [
   [
    "Collect and review credit",
    "Combine a payment commitment with a credit-limit review.",
    "Targets the oldest balance without assuming a loss.",
    "Requires account-team coordination."
   ],
   [
    "Agree staged repayment",
    "Offer a dated installment plan.",
    "May improve customer acceptance.",
    "Leaves capital tied up for longer."
   ],
   [
    "Monitor for another week",
    "Retain current terms and observe payments.",
    "Avoids immediate commercial friction.",
    "Continued cash uncertainty on $4.5M."
   ]
  ],
  "postScore": 55,
  "actionType": "Collect",
  "secondary": [
   [
    "Renewal Risk",
    "Medium"
   ]
  ]
 },
 {
  "id": "modification",
  "customer": "europe",
  "type": "Contract Modification",
  "title": "Customer requests a 10% flex-down",
  "severity": "Medium",
  "detected": "2026-10-20",
  "next": "2026-10-24",
  "description": "European Network requests a reduction in lease scope before its renewal in 22 days.",
  "impact": "A 10% reduction on $3M annual value implies $0.3M less annual revenue.",
  "category": "Revenue Risk",
  "score": 71,
  "trend": "Worsening",
  "confidence": "Medium",
  "driver": "A pending flex-down affects a $3M annual renewal; final volume is not approved.",
  "summary": "Right-size the contract while protecting revenue and service economics.",
  "strength": 80,
  "history": [
   42,
   48,
   55,
   63,
   71
  ],
  "historyLabel": "Illustrative revenue risk score",
  "internal": {
   "billing": "1 invoice delayed, no rejections",
   "collection": "$1.7M open AR · $0.7M overdue · oldest 48 days",
   "revenue": "$3M annual revenue before requested reduction",
   "contract": "5 active contracts · renewal in 22 days",
   "change": "Flex_Down requested (10%) · 1 event in 3M",
   "asset": "4,800 assets · scope reduction under review",
   "profitability": "17% operating margin vs 20% prior",
   "usage": "Usage down 10% over 3M · illustrative trend"
  },
  "external": [
   "No new validated credit change",
   "Telecom investment slowdown — illustrative context",
   "No validated sentiment assessment",
   "Funding cost held unchanged in this scenario",
   "Customer is reviewing equipment requirements"
  ],
  "amount": 0.3,
  "amountLabel": "Annual revenue sensitivity",
  "rank": 3,
  "rec": "Review scope and negotiate a phased flex-down",
  "reason": "Accepting the full requested reduction would remove $0.3M of annual revenue before service cost is adjusted.",
  "benefit": "Preserve viable revenue while matching service cost to the revised scope.",
  "owner": "Jordan Lee · Commercial Finance",
  "targetDate": "2026-10-29",
  "metric": "Annual revenue retained vs. full flex-down",
  "target": 0.15,
  "max": 0.3,
  "unit": "USD millions",
  "options": [
   [
    "Negotiate phased scope",
    "Phase the requested reduction with a cost review.",
    "Can protect revenue while reducing delivery cost.",
    "Requires negotiation before renewal."
   ],
   [
    "Accept full reduction",
    "Approve the requested 10% scope decrease.",
    "Matches the customer request quickly.",
    "Reduces annual revenue by $0.3M."
   ],
   [
    "Maintain current scope",
    "Keep existing volumes and commercial terms.",
    "Preserves the current offer economics.",
    "May raise renewal friction."
   ]
  ],
  "postScore": 46,
  "actionType": "Restructure",
  "secondary": [
   [
    "Profitability Risk",
    "Medium"
   ]
  ]
 },
 {
  "id": "renewal",
  "customer": "datacenter",
  "type": "Upcoming Renewal",
  "title": "Renewal enters the 30-day engagement window",
  "severity": "Medium",
  "detected": "2026-10-22",
  "next": "2026-10-25",
  "description": "North America Data Center has $4.2M of annual contract value due for renewal in 28 days.",
  "impact": "Unconfirmed scope or timing could interrupt future revenue.",
  "category": "Renewal Risk",
  "score": 67,
  "trend": "Rising",
  "confidence": "High",
  "driver": "Renewal is pending within 30 days; one $0.3M balance is overdue.",
  "summary": "Engage now to confirm scope and reduce timing uncertainty.",
  "strength": 90,
  "history": [
   35,
   39,
   48,
   58,
   67
  ],
  "historyLabel": "Illustrative renewal risk score",
  "internal": {
   "billing": "1 invoice delayed, no rejections",
   "collection": "$1.2M open AR · $0.3M overdue · oldest 35 days",
   "revenue": "$4.2M annual contracted revenue",
   "contract": "5 active contracts · renewal in 28 days · pending",
   "change": "No flex-downs recorded in 6M",
   "asset": "6,400 assets · no approved additions",
   "profitability": "26% operating margin vs 25% prior",
   "usage": "Usage up 5% over 3M · illustrative trend"
  },
  "external": [
   "No new validated credit change",
   "Data center demand is supported by capacity investment",
   "No validated sentiment assessment",
   "No rate change assumed for the renewal",
   "New facility planned; expansion is separate from renewal"
  ],
  "amount": 4.2,
  "amountLabel": "Annual renewal value",
  "rank": 2,
  "rec": "Escalate renewal engagement with the account team",
  "reason": "The renewal window is short and terms remain unconfirmed.",
  "benefit": "Preserve continuity and confirm the contracted revenue outlook.",
  "owner": "Alex Morgan · Account Finance",
  "targetDate": "2026-10-30",
  "metric": "Annual renewal value confirmed",
  "target": 4.2,
  "max": 4.2,
  "unit": "USD millions",
  "options": [
   [
    "Engage on renewal now",
    "Confirm current scope, terms and acceptance dates.",
    "Addresses timing before the renewal deadline.",
    "Requires immediate account-team effort."
   ],
   [
    "Bundle with expansion",
    "Combine the renewal with the proposed new facility.",
    "May increase total commercial value.",
    "Unconfirmed expansion can delay the base renewal."
   ],
   [
    "Wait for customer request",
    "Keep the renewal on routine follow-up.",
    "Limits effort before customer engagement.",
    "Reduces time available for negotiation."
   ]
  ],
  "postScore": 42,
  "actionType": "Renew",
  "secondary": []
 },
 {
  "id": "credit",
  "customer": "telecom",
  "type": "Customer Credit Change",
  "title": "Credit outlook turns negative",
  "severity": "High",
  "detected": "2026-10-19",
  "next": "2026-10-23",
  "description": "An illustrative negative credit outlook adds context to Global Telecom’s existing overdue receivables.",
  "impact": "The same $4.5M AR balance needs a credit review; this is not additional exposure.",
  "category": "Customer Risk",
  "score": 82,
  "trend": "Worsening",
  "confidence": "Medium",
  "driver": "Overdue receivables and margin pressure are present together. Credit context prompts review but does not independently change the score.",
  "summary": "Review customer limits with a full view of existing commitments.",
  "strength": 75,
  "history": [
   60,
   65,
   70,
   77,
   82
  ],
  "historyLabel": "Illustrative customer risk score",
  "internal": {
   "billing": "2 invoices delayed, 1 rejected",
   "collection": "$4.5M open AR · $4.5M overdue · oldest 96 days · payment delayed",
   "revenue": "$5.2M annual contracted revenue",
   "contract": "8 active contracts · renewal in 60 days · pending",
   "change": "No change events in 12M",
   "asset": "8,400 assets · stable installed base",
   "profitability": "18% operating margin vs 22% prior · after funding, service and collection costs",
   "usage": "Usage down 6% over 3M · illustrative trend"
  },
  "external": [
   "Negative outlook — example, not a live provider feed",
   "Telecom investment pressure",
   "No verified sentiment change",
   "No new economic overlay applied",
   "Customer restructuring under review"
  ],
  "amount": 4.5,
  "amountLabel": "AR under credit review",
  "rank": 1,
  "rec": "Review credit exposure before additional commitments",
  "reason": "The credit context reinforces existing overdue payment evidence.",
  "benefit": "Limit incremental exposure while preserving a structured customer dialogue.",
  "owner": "Priya Shah · Credit",
  "targetDate": "2026-10-27",
  "metric": "Overlapping AR exposure reduced",
  "target": 0.5,
  "max": 4.5,
  "unit": "USD millions",
  "options": [
   [
    "Review limits and commitments",
    "Assess current AR and new commitments with the account team.",
    "Aligns future credit with demonstrated payment performance.",
    "May slow new orders during review."
   ],
   [
    "Restrict new commitments",
    "Propose a temporary hold for NexBill approval.",
    "Limits additional exposure quickly.",
    "May disrupt the customer relationship."
   ],
   [
    "Keep limits unchanged",
    "Retain current limits and monitor.",
    "Avoids disruption to new activity.",
    "Does not address existing payment deterioration."
   ]
  ],
  "postScore": 57,
  "actionType": "Escalate",
  "secondary": []
 },
 {
  "id": "expansion",
  "customer": "cloud",
  "type": "Customer Expansion Opportunity",
  "title": "New cloud capacity creates a growth opportunity",
  "severity": "Medium",
  "detected": "2026-10-18",
  "next": "2026-10-26",
  "description": "Cloud Infrastructure announced additional capacity. Potential demand is estimated at $4M, subject to budget and contract validation.",
  "impact": "A conditional Q4 start could add $0.6M revenue; nothing is contracted yet.",
  "category": "Growth Opportunity",
  "score": 76,
  "trend": "Improving",
  "confidence": "Medium",
  "driver": "Current payments and strong margins support engagement; the expansion budget is unconfirmed.",
  "summary": "Qualify the opportunity before committing delivery capacity.",
  "strength": 70,
  "history": [
   40,
   48,
   59,
   68,
   76
  ],
  "historyLabel": "Illustrative opportunity score",
  "internal": {
   "billing": "No invoice delays or rejections",
   "collection": "$0.8M open AR · all current",
   "revenue": "$4.8M annual contracted revenue · expansion excluded",
   "contract": "7 active contracts · renewal in 120 days",
   "change": "No approved expansion amendment",
   "asset": "7,200 assets · additional capacity uncontracted",
   "profitability": "29% operating margin vs 28% prior",
   "usage": "Usage up 12% over 3M · illustrative trend"
  },
  "external": [
   "No validated new credit change",
   "Cloud capacity investment supports demand",
   "No validated sentiment assessment",
   "Procurement timing remains uncertain",
   "Expansion announcement — illustrative company context"
  ],
  "amount": 4,
  "amountLabel": "Uncontracted opportunity",
  "rank": 4,
  "rec": "Validate expansion budget and procurement timing",
  "reason": "Strong account economics support engagement, but the announcement is not an order.",
  "benefit": "Qualify profitable growth without prematurely increasing the forecast.",
  "owner": "Sam Rivera · Growth Finance",
  "targetDate": "2026-11-02",
  "metric": "Incremental Q4 revenue contracted",
  "target": 0.6,
  "max": 4,
  "unit": "USD millions",
  "options": [
   [
    "Validate funding and timing",
    "Confirm budget, decision makers and procurement dates.",
    "Reduces premature commitment risk.",
    "May delay preparing a commercial proposal."
   ],
   [
    "Prepare a scoped proposal",
    "Develop a limited offer for customer discussion.",
    "Starts the commercial conversation earlier.",
    "Requires effort before funding confirmation."
   ],
   [
    "Wait for procurement",
    "Hold activity until a formal customer request.",
    "Minimizes uncommitted effort.",
    "Could lose early engagement advantage."
   ]
  ],
  "postScore": 51,
  "actionType": "Optimize portfolio",
  "secondary": []
 },
 {
  "id": "market",
  "customer": "telecom",
  "type": "Market Event",
  "title": "Sector pressure coincides with lower margins",
  "severity": "Medium",
  "detected": "2026-10-17",
  "next": "2026-10-26",
  "description": "Telecom investment slows while Global Telecom operating margin declines from 22% to 18%.",
  "impact": "At $5.2M annual revenue, a 4-point margin gap equals $208K annual operating profit.",
  "category": "Profitability Risk",
  "score": 73,
  "trend": "Worsening",
  "confidence": "Medium",
  "driver": "Margin has declined after funding, service and collection costs. Market context alone does not establish the cause.",
  "summary": "Review account costs and pricing before adding renewal concessions.",
  "strength": 82,
  "history": [
   44,
   50,
   57,
   65,
   73
  ],
  "historyLabel": "Illustrative profitability risk score",
  "internal": {
   "billing": "2 invoices delayed, 1 rejected",
   "collection": "$4.5M open AR · $4.5M overdue · oldest 96 days · payment delayed",
   "revenue": "$5.2M annual contracted revenue",
   "contract": "8 active contracts · renewal in 60 days · pending",
   "change": "No change events in 12M",
   "asset": "8,400 assets · stable installed base",
   "profitability": "18% operating margin vs 22% prior · after funding, service and collection costs",
   "usage": "Usage down 6% over 3M · illustrative trend"
  },
  "external": [
   "Negative outlook — context shared with credit event",
   "Investment slowdown — illustrative industry context",
   "No validated sentiment assessment",
   "Funding costs require review; no rate forecast used",
   "Customer operating plans under review"
  ],
  "amount": 0.208,
  "amountLabel": "Annual profit sensitivity",
  "rank": 3,
  "rec": "Review service costs and renewal pricing",
  "reason": "The margin gap is material at the current revenue base; concessions could deepen it.",
  "benefit": "Recover margin through viable pricing and cost changes.",
  "owner": "Jordan Lee · Commercial Finance",
  "targetDate": "2026-11-03",
  "metric": "Annualized operating profit improvement",
  "target": 0.104,
  "max": 0.208,
  "unit": "USD millions",
  "options": [
   [
    "Review cost and pricing together",
    "Assess service scope before negotiating renewal terms.",
    "Balances margin recovery with customer retention.",
    "Requires commercial and service input."
   ],
   [
    "Increase price by 5%",
    "Propose a higher renewal price for customer review.",
    "Could improve unit economics if accepted.",
    "Acceptance is uncertain under customer stress."
   ],
   [
    "Keep current economics",
    "Maintain price and service scope.",
    "Limits immediate commercial friction.",
    "Leaves the current margin gap unresolved."
   ]
  ],
  "postScore": 48,
  "actionType": "Reprice",
  "secondary": []
 },
 {
  "id": "retail",
  "customer": "retail",
  "type": "Payment Delay",
  "title": "Overdue balance ages past 60 days ahead of renewal",
  "severity": "High",
  "detected": "2026-10-20",
  "next": "2026-10-24",
  "description": "Retail Technology Group has $1.2M overdue (oldest 62 days) and a $3.6M annual renewal due in 25 days.",
  "impact": "$1.2M of receipts is delayed and $3.6M of annual renewal value needs agreed terms within 25 days.",
  "category": "Collection Risk",
  "score": 79,
  "trend": "Worsening",
  "confidence": "High",
  "driver": "62 days overdue while a store network restructuring is announced and the renewal is pending within 25 days.",
  "summary": "Agree a dated payment plan before confirming the renewal scope.",
  "strength": 85,
  "history": [
   38,
   47,
   58,
   70,
   79
  ],
  "historyLabel": "Illustrative collection risk score",
  "external": [
   "No new validated credit change",
   "Retail demand remains under pressure",
   "No validated sentiment assessment",
   "No additional macro adjustment",
   "Store network restructuring announced — illustrative context"
  ],
  "amount": 1.2,
  "amountLabel": "Overdue receivables",
  "rank": 2,
  "rec": "Agree a payment plan and right-size the renewal",
  "reason": "Overdue receivables and an imminent renewal must be negotiated together; agreeing scope first weakens the cash position.",
  "benefit": "Recover overdue cash and renew on a footprint the customer can sustain.",
  "owner": "Maya Chen · Collections",
  "targetDate": "2026-10-30",
  "metric": "Cash collected",
  "target": 0.6,
  "max": 1.2,
  "unit": "USD millions",
  "options": [
   [
    "Payment plan with renewal",
    "Link a dated repayment plan to renewal terms.",
    "Secures cash before new commitments.",
    "Requires joint collections and account negotiation."
   ],
   [
    "Renew at reduced footprint",
    "Renew only the stores that remain open.",
    "Matches scope to the restructured network.",
    "Lower annual revenue."
   ],
   [
    "Renew unchanged, collect later",
    "Renew current scope and follow up on arrears separately.",
    "Avoids renewal friction.",
    "Extends exposure to a stressed customer."
   ]
  ],
  "internal": {
   "billing": "3 invoices delayed, 1 under acceptance review",
   "collection": "$2.4M open AR · $1.2M overdue · oldest 62 days",
   "revenue": "$3.6M annual contracted revenue",
   "contract": "6 active contracts · renewal in 25 days · pending",
   "change": "Store closures → 2 Asset_Remarketing requests in 6M",
   "asset": "5,600 assets · 2 remarketing requests pending",
   "profitability": "14% operating margin vs 18% prior",
   "usage": "Usage down 9% over 3M · illustrative trend"
  },
  "postScore": 52,
  "actionType": "Restructure",
  "secondary": [
   [
    "Renewal Risk",
    "High"
   ]
  ]
 }
];
const CUSTOMER_SIGNALS={
 "telecom": {
  "billing": "2 invoices delayed, 1 rejected",
  "collection": "$4.5M open AR · $4.5M overdue · oldest 96 days · payment delayed",
  "revenue": "$5.2M annual contracted revenue",
  "contract": "8 active contracts · renewal in 60 days · pending",
  "change": "No change events in 12M",
  "asset": "8,400 assets · stable installed base",
  "profitability": "18% operating margin vs 22% prior · after funding, service and collection costs",
  "usage": "Usage down 6% over 3M · illustrative trend"
 },
 "retail": {
  "billing": "3 invoices delayed, 1 under acceptance review",
  "collection": "$2.4M open AR · $1.2M overdue · oldest 62 days",
  "revenue": "$3.6M annual contracted revenue",
  "contract": "6 active contracts · renewal in 25 days · pending",
  "change": "Store closures → 2 Asset_Remarketing requests in 6M",
  "asset": "5,600 assets · 2 remarketing requests pending",
  "profitability": "14% operating margin vs 18% prior",
  "usage": "Usage down 9% over 3M · illustrative trend"
 },
 "europe": {
  "billing": "1 invoice delayed, no rejections",
  "collection": "$1.7M open AR · $0.7M overdue · oldest 48 days",
  "revenue": "$3M annual revenue before requested reduction",
  "contract": "5 active contracts · renewal in 22 days",
  "change": "Flex_Down requested (10%) · 1 event in 3M",
  "asset": "4,800 assets · scope reduction under review",
  "profitability": "17% operating margin vs 20% prior",
  "usage": "Usage down 10% over 3M · illustrative trend"
 },
 "datacenter": {
  "billing": "1 invoice delayed, no rejections",
  "collection": "$1.2M open AR · $0.3M overdue · oldest 35 days",
  "revenue": "$4.2M annual contracted revenue",
  "contract": "5 active contracts · renewal in 28 days · pending",
  "change": "No flex-downs recorded in 6M",
  "asset": "6,400 assets · no approved additions",
  "profitability": "26% operating margin vs 25% prior",
  "usage": "Usage up 5% over 3M · illustrative trend"
 },
 "cloud": {
  "billing": "No invoice delays or rejections",
  "collection": "$0.8M open AR · all current",
  "revenue": "$4.8M annual contracted revenue · expansion excluded",
  "contract": "7 active contracts · renewal in 120 days",
  "change": "No approved expansion amendment",
  "asset": "7,200 assets · additional capacity uncontracted",
  "profitability": "29% operating margin vs 28% prior",
  "usage": "Usage up 12% over 3M · illustrative trend"
 },
 "healthcare": {
  "billing": "No invoice delays or rejections",
  "collection": "$0.9M open AR · all current",
  "revenue": "$2.7M annual contracted revenue",
  "contract": "4 active contracts · renewal in 150 days",
  "change": "No flex-downs recorded in 12M",
  "asset": "4,400 assets · stable installed base",
  "profitability": "24% operating margin · unchanged",
  "usage": "Usage stable over 3M · illustrative trend"
 }
};
const FLOW=[['events','Business Events','What happened?'],['signals','Intelligence Signals','What does it tell us?'],['analysis','Risks & Opportunities','What could happen?'],['impact','Financial Impact','How much is at stake?'],['recommendations','Recommendations','What should we do?'],['decisions','Business Decisions','What do we decide?']];
const MODEL_KEY='leaseaegis-operating-model-v2';
const ui={event:'payment',eventFilter:'All events',search:'',decisionFilter:'All statuses',advisor:'attention'};
function currentCase(){const r=route();return (r.page==='customer'?CASES.find(c=>c.customer===r.customerId):CASES.find(c=>c.id===r.id))||CASES.find(c=>c.id===ui.event)||CASES[0]}
function account(c){return customers.find(a=>a.id===c.customer)}
function go(stage,c=currentCase()){return '#'+stage+'/'+c.id}
function dollars(n){return Math.abs(n)<1?'$'+Math.round(n*1000).toLocaleString('en-US')+'K':money(n)}
function dateLabel(d){return new Date(d+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})}
function loadModel(){try{const s=JSON.parse(localStorage.getItem(MODEL_KEY)||'{}');return s&&typeof s==='object'&&!Array.isArray(s)?s:{}}catch{return {}}}
function decision(c){const stored=loadModel()[c.id];const base={status:'Recommended',option:0,owner:c.owner,targetDate:c.targetDate,target:c.target,history:[]};if(!stored||!Array.isArray(stored.history))return base;return {...base,...stored,option:Number.isInteger(stored.option)&&c.options[stored.option]?stored.option:0}}
function persist(c,d){const all=loadModel();all[c.id]=d;try{localStorage.setItem(MODEL_KEY,JSON.stringify(all));return true}catch{toast('Unable to save. Your inputs remain available; browser storage may be blocked.');return false}}
function statusLabel(s){return s==='Recommended'?'Pending Review':s==='Outcome Achieved'?'Business Outcome Achieved':s}
function statusBadge(s){return `<span class="pill status-${s.replaceAll(' ','-')}">${statusLabel(s)}</span>`}
function process(stage,c){return `<nav class="process-flow" aria-label="Event to decision workflow">${FLOW.map(([key,label,q],i)=>`<a href="${go(key,c)}" class="${key===stage?'current':''}" ${key===stage?'aria-current="step"':''}><span class="step-number">${i+1}</span><span>${label}<small>${q}</small></span></a>`).join('')}</nav>`}
function context(c){return `<section class="context-strip" aria-label="Selected event"><div><span class="eyebrow">${c.type} · ${c.id.toUpperCase()}</span><strong>${c.title}</strong><small>${customerLink(account(c))} · <a href="${hostLink('customers',c)}">View NexBill customer record ↗</a></small></div><div>${badge(c.severity)}<small>Review ${dateLabel(c.next)}</small></div><label>Event context<select id="event-context">${CASES.map(x=>`<option value="${x.id}" ${x.id===c.id?'selected':''}>${x.type}</option>`).join('')}</select></label></section>`}
function stepHead(title,subtitle,stage,c){return head(title,subtitle,'<span class="period">22 Oct 2026 · Illustrative portfolio</span>')+process(stage,c)+context(c)}
function nextStep(stage,label,c){return `<div class="next-step"><span>Continue with the same event and customer</span><a class="button primary" href="${go(stage,c)}">${label} →</a></div>`}
function eventCard(c){return `<article class="event-card" data-event-case="${c.id}"><div class="action-meta"><span class="eyebrow">${c.type}</span>${isResolved(c)?'<span class="pill Low">Resolved</span>':badge(c.severity)}</div><h2><a href="${go('events',c)}">${c.title}</a></h2><p>${c.description}</p><div class="event-impact"><strong>${dollars(c.amount)}</strong><span>${c.amountLabel}</span></div>${exposureTag(c)}<p class="business-consequence">${c.impact}</p>${belowTarget(c)?'<p class="negative">Outcome below target — risk remains open</p>':''}<p class="event-next"><strong>Next step:</strong> ${c.rec}</p><div class="event-dates"><span>Detected<strong>${dateLabel(c.detected)}</strong></span><span>Next review<strong>${dateLabel(c.next)}</strong></span></div><div class="event-card-foot"><span>${customerLink(account(c))}</span><a href="${go('signals',c)}">Review signals →</a></div></article>`}
function overview(){const pending=CASES.filter(c=>decision(c).status==='Recommended').sort((a,b)=>(a.severity==='High'?0:1)-(b.severity==='High'?0:1)||a.next.localeCompare(b.next)).slice(0,4);const risks=CASES.filter(c=>['payment','retail','renewal','modification'].includes(c.id)&&!isResolved(c)).sort((a,b)=>a.rank-b.rank);return head('LeaseAegis Executive Overview','What requires my attention today?')+`<section class="journey-banner"><div><div class="eyebrow">FINANCE INTELLIGENCE INSIDE NEXBILL</div><h2>Finance has data. LeaseAegis turns it into decisions.</h2><p>Finance does not need more reports. It needs better decisions — with evidence, financial impact and a tracked outcome.</p></div><a class="button" href="#events/payment">Start the walkthrough →</a></section>`+panel('Decisions needed today',`<div class="today-list">${pending.map(c=>`<article data-pending-case="${c.id}"><div>${customerLink(account(c))}<h3>${c.title}</h3><span class="pill blue">${c.actionType}</span> <span class="review-date">Review by ${dateLabel(c.next)}</span></div><div><strong>${dollars(c.amount)}</strong><small>${c.amountLabel}</small></div><a class="button" href="${go('decisions',c)}">Review decision →</a></article>`).join('')||'<p>No recommendations are awaiting review.</p>'}</div>`,'Prioritized by severity and next review date')+valueDelivered()+`<div class="grid equal"><section class="panel" id="top-risks"><div class="panel-head"><h2>Top risks</h2><a href="#events/payment">View events →</a></div>${risks.map(c=>`<div class="risk-item" data-risk-case="${c.id}"><span class="rank">${c.rank}</span><div class="body"><h3><a href="${go('analysis',c)}">${c.category}</a></h3><p>${customerLink(account(c))}</p><p>${c.impact}</p>${belowTarget(c)?'<span class="pill Medium">Outcome below target — risk remains open</span>':''}</div><div class="risk-amount">${dollars(c.amount)}<small>${c.amountLabel}</small></div></div>`).join('')||'<p>No open priority risks in this demonstration.</p>'}</section>${panel('Top opportunity',`<div class="opportunity-highlight"><span class="pill Low">Growth opportunity</span><h3>${customerLink(customers.find(c=>c.id==='cloud'))}</h3><strong>$4.0M</strong><span class="pill">Uncontracted upside</span><p>Validate budget and procurement timing before committing capacity.</p><a href="#impact/expansion">Assess financial impact →</a>${isResolved(CASES.find(c=>c.id==='expansion'))?'<p class="saved">Outcome target achieved · review remaining opportunity.</p>':''}</div>`)}</div>`+panel('Portfolio snapshot',`<div class="snapshot-layout"><div class="kpis snapshot-kpis">${kpi('Total portfolio value',money(totals.principal),'Financed principal')}${kpi('Collection exposure',money(totals.overdue),'Overdue AR · not expected loss')}${kpi('Upcoming renewals',String(customers.filter(c=>c.renewal<=30).length),'Next 30 days')}</div><div class="entry-cards"><a href="#portfolio"><strong>Portfolio Optimization →</strong><span>Compare return, risk and segment focus.</span></a><a href="#forecast"><strong>Forecast Intelligence →</strong><span>Act on the revenue and cash gap.</span></a></div></div>`)+panel('Recommended actions',`<div class="action-list">${[CASES.find(c=>c.id==='payment'),CASES.find(c=>c.id==='retail'),CASES.find(c=>c.id==='market')].map(c=>`<article class="action-card"><div class="action-meta"><span class="pill blue">${c.actionType}</span>${statusBadge(decision(c).status)}</div><h3>${c.rec}</h3><p>${c.reason}</p><a href="${go('recommendations',c)}">Compare actions →</a></article>`).join('')}</div>`)}
function businessEvents(){const c=currentCase();const rows=CASES.filter(x=>(ui.eventFilter==='All events'||x.severity===ui.eventFilter)&&`${x.type} ${x.title} ${account(x).name}`.toLowerCase().includes(ui.search.toLowerCase())).sort((a,b)=>Number(isResolved(a))-Number(isResolved(b)));return stepHead('Business Events','Monitor events that require a Finance decision.','events',c)+`<div class="panel selected-event"><div><span class="eyebrow">SELECTED EVENT ${isResolved(c)?'· RESOLVED':''}</span><h2>${c.title}</h2><p>${c.description}</p><p><strong>Business impact:</strong> ${c.impact}</p></div><a class="button primary" href="${go('signals',c)}">Examine intelligence signals →</a></div><div class="filter-row"><input id="event-search" type="search" aria-label="Search business events" placeholder="Search events or customers" value="${esc(ui.search)}"><label for="event-severity">Severity</label><select id="event-severity">${['All events','High','Medium'].map(v=>`<option ${ui.eventFilter===v?'selected':''}>${v}</option>`).join('')}</select><span class="count">${rows.length} events · ${new Set(rows.map(x=>x.customer)).size} customers</span></div><div class="event-grid">${rows.map(eventCard).join('')||'<p class="empty">No matching events. Change the search or severity.</p>'}</div>`}
function signals(){const c=currentCase();return stepHead('Intelligence Signals','See the evidence behind the decision.','signals',c)+`<div class="grid equal">${panel('Internal Intelligence',`<div class="signal-list">${INTERNAL_DOMAINS.map(([key,label,table,module],i)=>`<div class="signal-row ${key==='change'?'core-signal':''}"><span class="signal-index">${i+1}</span><div><h3>${label} ${key==='change'?'<span class="pill blue">Core behavior signal</span>':''}</h3><p>${key==='change'?'<strong>':''}${c.internal[key]}${key==='change'?'</strong>':''}</p><code>${table}</code><a class="record-link" href="${hostLink(module,c)}">View NexBill record ↗</a></div></div>`).join('')}</div>`,'8 internal domains')}${panel('External Intelligence',`<span class="pill">Phase 2 feeds</span><div class="signal-list external-panel">${['Credit Signals','Industry Trends','Public Sentiment','Market Events','Customer Business Developments'].map((label,i)=>`<div class="signal-row external"><span class="signal-index">◇</span><div><h3>${label}</h3><p>${c.external[i]}</p></div></div>`).join('')}</div>`,'Context before calibrated risk adjustment')}</div><div class="grid equal">${panel('Evidence strength',`<div class="score">${c.strength}<small> / 100</small></div><div class="progress-track"><i style="width:${c.strength}%"></i></div><p>${c.confidence} confidence · ${c.driver}</p>`)}${panel('Direction of change',chart(c.history,['Jun','Jul','Aug','Sep','Oct'],'',null,{min:0,max:100}),c.historyLabel+' · Phase 3 trend illustration')}</div>`+signalTimeline(c)+nextStep('analysis','Assess risks and opportunities',c)}
function analysis(){const c=currentCase(),resolved=isResolved(c),series=resolved?[...c.history,c.postScore]:c.history;return stepHead('Risk & Opportunity Analysis','Translate evidence into the risks and opportunities Finance can act on.','analysis',c)+`<div class="analysis-hero"><div><span class="eyebrow">${resolved?'AFTER VERIFIED DEMO OUTCOME':'ASSESSMENT'}</span><h2>${c.category}</h2><p>${c.summary}</p><div class="legend">${badge(c.severity)}<span>${resolved?'Improving · after action':c.trend}</span><span>${c.confidence} confidence</span></div><div class="secondary-risks">${c.secondary.map(([name,level])=>`<span>${name} ${badge(level)}</span>`).join('')}</div></div><div class="analysis-score" data-current-score="${riskScore(c)}"><strong>${resolved?`${c.score} → ${c.postScore}`:c.score}</strong><span>/ 100<br>${resolved?'Post-action score':'Assessment score'}</span></div></div>${belowTarget(c)?'<div class="insight">Outcome below target — risk remains open</div>':''}<div class="grid equal">${panel('Contributing factors',`<h3>Primary driver</h3><p>${c.driver}</p><div class="insight"><strong>Business explanation</strong><br>${c.summary}</div><p>${c.internal.collection}</p>${exposureTag(c)}`)}${panel('Assessment trend',chart(series,resolved?['Jun','Jul','Aug','Sep','Oct','Nov']:['Jun','Jul','Aug','Sep','Oct'],'',null,{min:0,max:100}),resolved?'Rule-based post-action adjustment · illustrative':'Risk / opportunity score · 0–100')}</div>`+panel('Risk & opportunity map',`<div class="heatmap">${CASES.map(x=>`<a href="${go('analysis',x)}" class="heat-cell ${x.id===c.id?'selected':''} ${x.category==='Growth Opportunity'?'growth':riskScore(x)>=80?'hot':'warm'}"><span>${x.category}</span><strong>${riskScore(x)}<small> / 100</small></strong><span>${account(x).name}</span><span>${isResolved(x)?'Resolved · improving':x.trend}</span></a>`).join('')}</div>`)+nextStep('impact','Quantify financial impact',c)}
const IMPACTS={
 retail:[['Cash Flow Impact','$1.2M delayed','Overdue receipts require a dated payment commitment.'],['Revenue Impact','$3.6M renewal under review','Annual value, not expected loss. Scope must match the restructured store network.'],['Margin Impact','14% vs 18% prior','Review service cost and payment terms together.'],['Working Capital Impact','$1.2M tied up','Same overdue AR — counted once.'],['Credit Exposure','$2.4M open AR','Gross receivables, including $1.2M overdue.'],['Portfolio Yield Impact','7.2% current yield','Baseline annualized yield; no automatic adjustment.']],
 payment:[['Cash Flow Impact','$4.5M delayed','Overdue receipts could move beyond Q4; the collection scenario targets $1.5M recovered.'],['Revenue Impact','No change booked','Payment delay alone does not reduce recognized revenue. $5.2M annual renewal value remains a separate review.'],['Margin Impact','Not quantified','Additional collection effort may raise cost; no incremental cost estimate is available.'],['Working Capital Impact','$4.5M tied up','The same overdue AR is capital tied up, not a second financial loss.'],['Credit Exposure','$4.5M open AR','Gross AR at risk, before collateral or recovery assumptions. $42M financed principal is shown separately, not added.'],['Portfolio Yield Impact','Not estimated','Yield sensitivity requires loss and funding assumptions beyond this event.']],
 modification:[['Cash Flow Impact','Timing unconfirmed','Receipts depend on the effective date and the accepted payment schedule.'],['Revenue Impact','−$300K / year','10% × $3M annual renewal value, if the full requested flex-down is accepted.'],['Margin Impact','−$51K / year','Illustrative: $300K less annual revenue × unchanged 17% margin. Service-cost adjustments may change this.'],['Working Capital Impact','$700K overdue','Existing overdue AR remains a separate collection issue; no incremental capital release is assumed.'],['Credit Exposure','$1.7M open AR','Existing gross AR. Do not add contract principal or annual renewal value to this balance.'],['Portfolio Yield Impact','Not estimated','A recalculation requires revised finance income and financed principal.']],
 renewal:[['Cash Flow Impact','Timing at risk','A one-quarter renewal delay could shift receipts; no payment schedule has been confirmed.'],['Revenue Impact','$4.2M under review','Annual renewal value, not an expected loss. One-quarter timing sensitivity is $1.05M if service stops during a full quarter.'],['Margin Impact','26% current margin','Future margin depends on agreed price and service scope. No change is booked.'],['Working Capital Impact','$300K overdue','Existing receivables remain outstanding during renewal discussions.'],['Credit Exposure','$1.2M open AR','Current gross receivable balance; independent of the future renewal value.'],['Portfolio Yield Impact','9.6% current yield','Account baseline, not a predicted change. Review revised terms before recalculating.']],
 credit:[['Cash Flow Impact','$4.5M under review','Same balance as the Payment Delay event. The credit outlook is not an additional cash shortfall.'],['Revenue Impact','No change booked','New commitments may be reviewed; no revenue reduction is assumed from an outlook change alone.'],['Margin Impact','Not quantified','Any impairment requires a separate supported assessment; none is modeled here.'],['Working Capital Impact','$4.5M tied up','Same overdue AR, shown as working capital rather than incremental exposure.'],['Credit Exposure','$4.5M open AR','Gross AR exposure, not estimated loss. Remaining contract value and collateral are not available for a net credit estimate.'],['Portfolio Yield Impact','Not estimated','No expected-loss modifier has been calibrated for the credit context.']],
 expansion:[['Cash Flow Impact','+$400K in Q4','Conditional scenario: receipts from a contracted November start; not committed cash.'],['Revenue Impact','+$600K in Q4','Assumes a portion of the $4M opportunity is contracted and delivered in Q4. Base forecast remains unchanged.'],['Margin Impact','+$174K in Q4','Illustrative $600K revenue × current 29% margin; assumes unchanged unit economics.'],['Working Capital Impact','+$200K requirement','Scenario revenue less cash receipts: $600K − $400K. Simplified AR bridge, excluding tax and billing timing.'],['Credit Exposure','$800K current AR','All current. Conditional incremental AR of $200K would require credit review; it is not booked.'],['Portfolio Yield Impact','10.2% current yield','Existing account baseline. Expansion yield is not estimated until financing terms are agreed.']],
 market:[['Cash Flow Impact','Not quantified','Service-cost cash effects require a validated cost and payment schedule.'],['Revenue Impact','$5.2M revenue base','No sector-wide decline is applied automatically. This is the annual revenue base for margin analysis.'],['Margin Impact','−$208K / year','(22% − 18%) × $5.2M annual revenue. This annualized sensitivity is not a newly booked expense.'],['Working Capital Impact','$4.5M overdue','Shared balance with Payment Delay. Do not count it again as sector-related exposure.'],['Credit Exposure','$4.5M open AR','Existing receivable exposure is unchanged by this margin analysis.'],['Portfolio Yield Impact','8.4% current yield','Operating margin and portfolio yield differ. No yield change is inferred directly from the 4-point margin gap.']]
};
function financialImpact(){const c=currentCase(),visible=IMPACTS[c.id].filter(x=>!/^(Not quantified|Not estimated|No change booked)$/.test(x[1])),omitted=IMPACTS[c.id].filter(x=>!visible.includes(x));return stepHead('Financial Impact Assessment','So what? Focus on the consequences that support a decision.','impact',c)+`<div class="impact-banner"><div><span class="eyebrow">IMPORTANCE RANK ${c.rank} · ${c.severity.toUpperCase()} PRIORITY</span><h2>${dollars(c.amount)}</h2><p>${c.amountLabel} · ${customerLink(account(c))}</p>${exposureTag(c)}</div><div><h3>Potential business outcome</h3><p>${c.impact}</p><p>${c.benefit}</p></div></div><div class="impact-grid">${visible.map(([label,value,desc])=>`<article class="panel impact-tile"><span class="eyebrow">${label}</span><h2>${value}</h2><p>${desc}</p></article>`).join('')}</div>${omitted.length?`<p class="metric-caption">Not quantified for this event: ${omitted.map(x=>x[0].replace(' Impact','')).join(', ')}.</p>`:''}`+panel('From consequence to action',`<div class="insight"><strong>${c.reason}</strong><br>Therefore: ${c.rec.toLowerCase()}.</div><div class="stat-row"><span>Outcome target · ${c.metric}</span><strong>${dollars(c.target)}</strong></div>`)+nextStep('recommendations','Compare recommended actions',c)}
function recommendations(){const c=currentCase(),d=decision(c),selected=ui.options?.[c.id]??d.option;return stepHead('Recommendations','Compare viable actions before making a Finance decision.','recommendations',c)+`<section class="panel recommendation-summary"><div><span class="pill blue">${c.actionType}</span><h2>${c.rec}</h2><p>${c.reason}</p></div><div class="recommendation-badges">${badge(c.severity)}${statusBadge(d.status)}</div><div class="recommendation-meta"><span>Expected benefit<strong>${c.benefit}</strong></span><span>Owner<strong>${esc(d.owner)}</strong></span><span>Target completion<strong>${dateLabel(d.targetDate)}</strong></span></div></section><div class="options-grid">${c.options.map((o,i)=>`<article class="panel option-card ${i===0?'recommended':''} ${i===selected?'chosen':''}"><div class="action-meta"><span>OPTION ${'ABC'[i]}</span>${i===0?'<span class="pill blue">Recommended</span>':''}</div><h2>${o[0]}</h2><p>${o[1]}</p><dl><dt>Benefit</dt><dd>${o[2]}</dd><dt>Trade-off</dt><dd>${o[3]}</dd></dl><button data-select-option="${i}" ${['Approved','In Progress','Completed','Outcome Achieved'].includes(d.status)?'disabled':''}>${i===selected?'Selected for Finance review':'Choose this option'}</button></article>`).join('')}</div><details class="panel action-explanation"><summary>How LeaseAegis chooses an action</summary><div class="table-wrap"><table><thead><tr><th>Action</th><th>Trigger</th></tr></thead><tbody>${ACTION_TRIGGERS.map(([action,trigger])=>`<tr><td>${action}</td><td>${trigger}</td></tr>`).join('')}</tbody></table></div></details>`+nextStep('decisions','Review and decide',c)}
function historyMarkup(c,d){return `<ol class="decision-history"><li><span class="history-dot"></span><div><strong>Recommendation generated</strong><time>${dateLabel(c.detected)} · Recommendation v1</time><p>${c.rec}</p></div></li>${d.history.map(h=>`<li><span class="history-dot"></span><div><strong>${esc(statusLabel(h.status))}</strong><time>${new Date(h.at).toLocaleString('en-US',{timeZone:'America/New_York'})} ET · ${esc(h.owner)}</time><p>${esc(h.note)}</p>${h.option!==undefined?`<small>Finance option: ${esc(c.options[h.option]?.[0]||'Unknown')} · Target: ${dollars(h.target??c.target)}</small>`:''}</div></li>`).join('')}</ol>`}
function decisionDetail(c){const d=decision(c);const selected=ui.options?.[c.id]??d.option;const canDecide=d.status==='Recommended';return `<section class="panel" id="finance-review"><div class="panel-head"><div><h2>Finance review · ${customerLink(account(c))}</h2><p>${c.type} → ${c.rec}</p></div>${statusBadge(d.status)}</div><div class="decision-distinction"><div><span>Platform recommendation</span><strong>${c.options[0][0]}</strong></div><div><span>Finance decision</span><strong>${d.status==='Recommended'?'Awaiting review':c.options[d.option][0]}</strong></div><div><span>NexBill execution</span><strong>${['In Progress','Completed','Outcome Achieved'].includes(d.status)?d.status==='In Progress'?'Simulated · in progress':'Simulated · completed':'Not started'}</strong></div></div>${canDecide?`<form id="finance-review-form"><div class="review-fields"><label class="form-field">Selected action<select name="option">${c.options.map((o,i)=>`<option value="${i}" ${i===selected?'selected':''}>${'ABC'[i]} · ${o[0]}</option>`).join('')}</select></label><label class="form-field">Decision owner<input name="owner" value="${esc(d.owner)}" maxlength="120" required></label><label class="form-field">Target completion date<input type="date" name="due" value="${esc(d.targetDate)}" min="2026-10-22" required></label><label class="form-field">Outcome target · USD millions<input name="target" type="number" min="0.001" max="${c.max}" step="0.001" value="${d.target??c.target}" required></label></div><div class="rationale-shortcuts"><button type="button" data-rationale="Approve as recommended">Approve as recommended</button><button type="button" data-rationale="Adjust target">Adjust target</button><button type="button" data-rationale="Insufficient evidence">Insufficient evidence</button></div><label class="form-field">Decision rationale (optional)<textarea name="note" rows="2" placeholder="Explain your approval, adjustment or rejection." maxlength="2000"></textarea></label><div class="form-actions"><button name="decision" value="Rejected" type="submit">Reject recommendation</button><button name="decision" value="Approved" type="submit" class="primary">Approve selected action</button></div></form>`:`<div class="review-summary"><p><strong>Owner:</strong> ${esc(d.owner)} · <strong>Target completion:</strong> ${dateLabel(d.targetDate)}</p><p><strong>Outcome target:</strong> ${dollars(d.target??c.target)} · ${c.metric}</p><p>${esc(d.note||'')}</p></div><div class="status-action">${d.status==='Approved'?`<p>Finance approved the action. Continue in NexBill to manage execution.</p><a class="button primary" href="${hostLink(executionModule(c),c)}">Open approved action in NexBill →</a>`:d.status==='In Progress'?`<p>NexBill execution is in progress. LeaseAegis reflects the execution status.</p><a class="button primary" href="${hostLink(executionModule(c),c)}">View execution in NexBill →</a>`:d.status==='Rejected'?'<p>No action will proceed. Review the recommendation before reopening.</p><button data-transition="Recommended">Reopen Finance review</button>':(d.observed===undefined?'<p>Execution is complete. Measure the outcome separately from completion.</p>':'<p>Execution and outcome measurement are complete. Review the result below.</p>')}</div>`}${['Completed','Outcome Achieved'].includes(d.status)?`<div class="outcome-section"><h3>Outcome measurement</h3>${d.observed===undefined?`<form id="outcome-form"><div class="review-fields"><label class="form-field">${c.metric} · USD millions<input name="observed" type="number" min="0" max="${c.max}" step="0.001" required placeholder="Enter observed amount"></label><label class="form-field">Evidence / result summary<input name="evidence" maxlength="1000" required placeholder="e.g. Payment receipt confirmed in the demo"></label></div><button type="submit" class="primary">Record simulated outcome</button></form>`:`<div class="value-summary"><div><strong>${dollars(d.target)}</strong><span>Target</span></div><div><strong>${dollars(d.observed)}</strong><span>Observed · simulated</span></div><div><strong>${Math.round(d.observed/d.target*100)}%</strong><span>Target attainment</span></div></div><p>${esc(d.evidence)}</p>`}</div>`:''}<details class="history-disclosure"><summary>Recommendation & decision history (${d.history.length+1} entries)</summary>${historyMarkup(c,d)}</details></section>`}
function decisionCenter(){const c=currentCase(),all=CASES.map(x=>({c:x,d:decision(x)})),filters=['Pending Review','In Execution','Completed','Rejected'],rows=all.filter(x=>matchesStatus(x.d.status,ui.decisionFilter));return stepHead('Business Decision Center','Finance decides. NexBill executes. Results are measured separately.','decisions',c)+`<div class="status-cards aligned-status-cards">${filters.map(s=>`<button data-status-filter="${s}" class="${s===ui.decisionFilter?'selected':''}"><strong>${all.filter(x=>matchesStatus(x.d.status,s)).length}</strong><span>${s}</span></button>`).join('')}</div>`+decisionDetail(c)+panel('Decision register',`<div class="filter-row"><label for="decision-filter">Status</label><select id="decision-filter">${['All statuses',...filters].map(s=>`<option ${s===ui.decisionFilter?'selected':''}>${s}</option>`).join('')}</select><span class="count">${rows.length} decisions</span></div><div class="table-wrap"><table><thead><tr><th>Event / customer</th><th>Action</th><th>Owner</th><th>Target date</th><th>Status</th><th>Observed result</th><th>Review</th></tr></thead><tbody>${rows.map(({c:x,d})=>`<tr><td>${x.type}<small>${customerLink(account(x))}</small></td><td><span class="pill blue">${x.actionType}</span></td><td>${esc(d.owner)}</td><td>${dateLabel(d.targetDate)} ${isOverdue(d)?'<span class="pill High">Overdue</span>':''}</td><td>${statusBadge(d.status)}</td><td>${Number.isFinite(d.observed)?dollars(d.observed):'Not measured'}<small>${x.metric}</small></td><td><a href="${go('decisions',x)}">Open →</a></td></tr>`).join('')}</tbody></table>${!rows.length?'<p class="empty">No decisions in this status.</p>':''}</div>`,'Dates evaluated against the Oct 22, 2026 snapshot','<a href="#outcomes">Outcome Review →</a>')}
function renderWorkspaceNavigation(r,c){const host=r.page==='nexbill',sidebar=document.querySelector('.sidebar'),brand=sidebar.querySelector('.workspace-brand'),nav=document.getElementById('navigation');brand.href=host?hostLink(r.module,c):'#dashboard';brand.innerHTML=host?'<span class="workspace-symbol">N</span><span>NexBill<small>OPERATIONS</small></span>':'<span class="workspace-symbol">✧</span><span>LeaseAegis<small>FINANCIAL INTELLIGENCE</small></span>';sidebar.querySelector('.embedded-label').textContent=host?'Operational records & execution':'A workspace inside NexBill';sidebar.querySelector('.nav-label').textContent=host?'BUSINESS WORKSPACES':'';nav.setAttribute('aria-label',host?'NexBill operational navigation':'LeaseAegis navigation');if(host){nav.innerHTML=['billing','collections','contracts','customers','portfolio'].map(key=>`<a href="${r.customerId?'#nexbill/'+key+'/@'+r.customerId:hostLink(key,c)}" class="${r.module===key?'active':''}" ${r.module===key?'aria-current="page"':''}>${moduleTitle(key)}</a>`).join('');return}const active=['signals','analysis','impact','recommendations'].includes(r.page)?'events':r.page;nav.innerHTML=[['OVERVIEW',[['dashboard','Dashboard','▦']]],['INTELLIGENCE',[['events','Business Events','◷'],['customer','Customer 360','♙'],['portfolio','Portfolio','◫'],['forecast','Forecast','↗']]],['DECISIONS',[['decisions','Decision Center','✓'],['outcomes','Outcome Review','✓']]]].map(([group,items])=>`<div class="navigation-group"><div class="nav-group-title">${group}</div>${items.map(([key,label,icon])=>`<a href="${key==='customer'?'#customer/'+(r.customerId||c.customer):['events','decisions'].includes(key)?go(key,c):'#'+key}" class="${active===key?'active':''}" ${active===key?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${icon}</span>${label}</a>`).join('')}</div>`).join('')}
function render(){const r=route(),c=currentCase();if(r.page!=='customer'&&!r.customerId)ui.event=c.id;if(r.page!=='nexbill'){ui.lastStage=r.page;ui.returnHash=location.hash||'#dashboard'}renderHostNavigation(r,c);renderWorkspaceNavigation(r,c);const title=r.page==='nexbill'?moduleTitle(r.module):pages.find(p=>p[0]===r.page)[1];document.getElementById('crumb').textContent=title;document.getElementById('workspace-crumb').textContent=r.page==='nexbill'?'Operations':'LeaseAegis';document.getElementById('main').innerHTML=r.page==='nexbill'?hostWorkspace(r.module,c):({dashboard:overview,events:businessEvents,signals,analysis,impact:financialImpact,recommendations,decisions:decisionCenter,portfolio,forecast,customer,outcomes}[r.page])();document.title='NexBill | '+(r.page==='nexbill'?title:'LeaseAegis · '+title)}
const BRIEFS={
 retail:['What should we do about Retail?', 'Retail has $1.2M overdue for 62 days and a $3.6M annual renewal in 25 days.', 'Cash recovery and renewal scope must be considered together; annual renewal value is not expected loss.', 'Agree a dated payment plan and right-size the renewal to the store network.', 'retail'],
 attention:['What requires immediate attention?','Global Telecom has $4.5M more than 90 days overdue. Three portfolio renewals are within 30 days.','Delayed receipts and unconfirmed renewal scope create cash and revenue uncertainty.','Start with collection follow-up, then review near-term renewals.','payment'],
 collection:['Which customers have rising collection risk?','Global Telecom has $4.5M overdue; Retail has $1.2M. Together they represent $5.7M of the $6.7M overdue portfolio.','Receipts may slip beyond the planning period. Overdue AR is not a confirmed loss.','Obtain dated payment commitments and review limits before new commitments.','payment'],
 margin:['What is driving profitability decline?','Global Telecom margin fell from 22% to 18%. Cost and price effects require investigation.','At $5.2M annual revenue, the four-point gap represents $208K annual profit sensitivity.','Review service, funding and collection costs alongside renewal pricing.','market'],
 renewal:['Which renewals may affect future revenue?','Retail, North America Data Center and European Network renew within 30 days.','Their combined annual renewal value is $10.8M. This is revenue under review, not an expected loss.','Confirm scope and dates, prioritizing payment issues and requested flex-downs.','renewal']
};
function openAdvisor(){const key=ui.advisor||'attention',b=BRIEFS[key]||BRIEFS.attention,d=document.getElementById('advisor-panel');d.innerHTML=`<div class="dialog-head"><div><span class="eyebrow">OPTIONAL FINANCE BRIEF</span><h2 id="advisor-title">AI Advisor</h2></div><button class="close" data-advisor-close aria-label="Close Advisor">×</button></div><p>Choose a portfolio briefing.</p><div class="brief-prompts">${Object.entries(BRIEFS).map(([id,v])=>`<button data-brief="${id}">${v[0]}</button>`).join('')}</div><div aria-live="polite"><h3>${b[0]}</h3>${['Observation','Business Impact','Recommended Action'].map((label,i)=>`<div class="brief-section"><h3>${label}</h3><p>${b[i+1]}</p></div>`).join('')}<a href="#recommendations/${b[4]}" data-advisor-close>Review the related recommendation →</a></div>`;if(!d.open)d.showModal()}
let toastTimer;
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),5000)}
function transition(next,caseId=currentCase().id){const c=CASES.find(x=>x.id===caseId);if(!c)return false;const d=decision(c),allowed={Approved:'In Progress','In Progress':'Completed',Rejected:'Recommended'};if(allowed[d.status]!==next)return false;if(next!=='Recommended'&&(route().page!=='nexbill'||route().module!==executionModule(c)||currentCase().id!==c.id||route().customerId))return false;if(next==='Completed'&&(d.executionSteps?.length||0)<3)return false;const note=next==='In Progress'?'NexBill demo execution started.':next==='Completed'?'NexBill demo tasks completed; business outcome is not yet measured.':'Finance review reopened; previous decision remains in history.';d.status=next;d.history.push({status:next,at:new Date().toISOString(),owner:d.owner,note,option:d.option,target:d.target});if(!persist(c,d))return false;render();return true}
async function runExecution(){const c=currentCase(),r=route();if(r.page!=='nexbill'||r.customerId||r.module!==executionModule(c)||executionRuns.has(c.id)||!['Approved','In Progress'].includes(decision(c).status))return;executionRuns.add(c.id);try{if(decision(c).status==='Approved'&&!transition('In Progress',c.id))return;render();for(let i=decision(c).executionSteps?.length||0;i<3;i++){await new Promise(resolve=>setTimeout(resolve,700));if(route().page!=='nexbill'||route().module!==r.module||currentCase().id!==c.id||route().customerId)return;const d=decision(c);if(d.status!=='In Progress')return;d.executionSteps??=[];if(d.executionSteps.includes(i))continue;d.executionSteps.push(i);d.history.push({status:'Execution task completed',at:new Date().toISOString(),owner:d.owner,note:EXECUTION_TASKS[r.module][i],option:d.option,target:d.target});if(!persist(c,d))return;render()}transition('Completed',c.id)}finally{executionRuns.delete(c.id);render()}}
function hostLink(module,c=currentCase()){return '#nexbill/'+module+'/'+c.id}
function moduleTitle(module){return {billing:'Billing',collections:'Collections',contracts:'Contracts',customers:'Customers',portfolio:'Portfolio'}[module]||'Billing'}
function executionModule(c){return ['payment','credit','retail'].includes(c.id)?'collections':c.id==='market'?'portfolio':'contracts'}
function renderHostNavigation(r,c){document.getElementById('nexbill-modules').innerHTML=['billing','collections','contracts','customers','portfolio'].map(module=>`<a href="${r.customerId?'#nexbill/'+module+'/@'+r.customerId:hostLink(module,c)}" class="${r.page==='nexbill'&&r.module===module?'active':''}" ${r.page==='nexbill'&&r.module===module?'aria-current="page"':''}>${moduleTitle(module)}</a>`).join('')+`<a class="intelligence-entry ${r.page!=='nexbill'?'active':''}" href="${esc(ui.returnHash||'#dashboard')}"><span>✧</span> LeaseAegis <small>Intelligence Workspace</small></a>`;document.getElementById('notification-count').textContent=CASES.filter(x=>x.next<='2026-10-23'&&!isResolved(x)).length}
function profitabilityPanel(){const margin=customers.reduce((s,c)=>s+c.revenue*c.margin,0)/totals.revenue;return panel('Profitability Trend',`<div class="profitability-layout"><div><span class="eyebrow">NET OPERATING MARGIN</span><strong>${pct(margin)}</strong><p>After funding, service and collection costs.</p><a href="#impact/market">Review Telecom margin pressure →</a></div><div>${chart([24.2,24.5,24.1,23.4,22.8,+margin.toFixed(1)],['May','Jun','Jul','Aug','Sep','Oct'])}</div><div class="insight"><strong>Finance focus</strong><br>Telecom and Retail are compressing portfolio margin. Review cost and pricing before adding renewal concessions.</div></div>`,'Portfolio profitability · illustrative history from NexBill financial records')}
function signalTimeline(c){return panel('Signal timeline',`<ol class="signal-timeline"><li><span>Event detected</span><strong>${dateLabel(c.detected)}</strong><p>${c.title}</p></li><li><span>Current evidence snapshot</span><strong>Oct 22, 2026</strong><p>Contract, billing and payment context aligned to the same customer.</p></li><li><span>Next review · planned</span><strong>${dateLabel(c.next)}</strong><p>${c.rec}</p></li></ol>`,'Illustrative observations and the next Finance review; not a live monitoring history')}
function relatedCase(a){return CASES.find(x=>x.customer===a.id)}
function intelligenceLink(a,stage='events'){const c=relatedCase(a);return c?`<a href="${go(stage,c)}">Review in LeaseAegis →</a>`:'<span class="muted">No active intelligence event</span>'}
function hostTable(module,c){let headings,rows;const selected=a=>a.id===c.customer?' class="selected-record"':'';if(module==='billing'){headings=['Customer','Open invoice balance','Overdue balance','Billing follow-up','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}<small>${a.country}</small></td><td>${money(a.ar)}</td><td>${money(a.overdue)}</td><td>${a.days?'Confirm invoice acceptance':'No overdue billing issue'}</td><td>${intelligenceLink(a,'signals')}</td></tr>`)}else if(module==='collections'){headings=['Customer','Open AR','Overdue AR','Oldest overdue','Payment condition','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}</td><td>${money(a.ar)}</td><td>${money(a.overdue)}</td><td>${a.days?a.days+' days':'Current'}</td><td>${a.days?'Delayed':'Current'}</td><td>${intelligenceLink(a,'analysis')}</td></tr>`)}else if(module==='contracts'){headings=['Customer','Active contracts','Annual contracted revenue','Next renewal','Scope review','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}</td><td>${a.contracts}</td><td>${money(a.revenue)}</td><td>${a.renewal} days</td><td>${a.id==='europe'?'10% flex-down requested':'No approved scope change'}</td><td>${intelligenceLink(a,'recommendations')}</td></tr>`)}else if(module==='customers'){headings=['Customer','Segment','Country','Active contracts','Financed principal','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}</td><td>${a.segment}</td><td>${a.country}</td><td>${a.contracts}</td><td>${money(a.principal)}</td><td>${intelligenceLink(a)}</td></tr>`)}else{headings=['Customer','Financed principal','Annual revenue','Operating margin','Portfolio yield','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}<small>${a.segment}</small></td><td>${money(a.principal)}</td><td>${money(a.revenue)}</td><td>${pct(a.margin)}</td><td>${pct(a.yield)}</td><td>${intelligenceLink(a,'impact')}</td></tr>`)}return `<div class="table-wrap"><table><thead><tr>${headings.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`}
function executionPanel(module,c){if(module!==executionModule(c))return '';const d=decision(c),actionable=['Approved','In Progress','Completed','Outcome Achieved'].includes(d.status),tasks=EXECUTION_TASKS[module];return panel('NexBill execution workspace',`<span class="pill blue">NexBill owns execution</span><h3>${customerLink(account(c))}</h3><p>${c.rec}</p><div class="decision-distinction"><div><span>LeaseAegis recommendation</span><strong>${c.options[0][0]}</strong></div><div><span>Finance-approved action</span><strong>${actionable?c.options[d.option][0]:'Awaiting Finance approval'}</strong></div><div><span>Execution status</span><strong>${statusLabel(d.status)}</strong></div></div><ol class="execution-tasks" aria-live="polite">${tasks.map((task,i)=>`<li class="${d.executionSteps?.includes(i)?'done':''}"><span>${d.executionSteps?.includes(i)?'✓':'○'}</span>${task}</li>`).join('')}</ol><div class="execution-actions">${['Approved','In Progress'].includes(d.status)?`<button class="primary" data-run-execution ${executionRuns.has(c.id)?'disabled':''}>${executionRuns.has(c.id)?'Execution in progress…':'Run execution in NexBill'}</button>`:''}<a class="button" href="${go('decisions',c)}">${['Completed','Outcome Achieved'].includes(d.status)?'Return to LeaseAegis outcome review':'Review Finance decision in LeaseAegis'} →</a></div>`,'Illustrative task progression · no production transaction')}
function hostWorkspace(module,c){const r=route(),a=customers.find(x=>x.id===r.customerId)||account(c),linked=r.customerId?relatedCase(a):c;return `<div class="page-head"><div><div class="eyebrow">NEXBILL · OPERATIONAL WORKSPACE</div><h1>${moduleTitle(module)}</h1><p class="subtitle">NexBill remains the system of record for operational transactions.</p></div><a class="button" href="${esc(ui.returnHash||'#customer/'+a.id)}">Return to LeaseAegis →</a></div><div class="host-context"><div><span class="pill">NexBill record context</span><strong>${customerLink(a)}</strong><p>${linked?'Linked event: '+linked.title:'No active intelligence event'}</p></div>${linked?`<a href="${go('signals',linked)}">Open intelligence context →</a>`:''}</div>${r.customerId?'':executionPanel(module,c)}${panel(moduleTitle(module)+' records',hostTable(module,{...c,customer:a.id}),'Read-only snapshot · USD · Oct 22, 2026')}`}
function showShellDialog(kind){const d=document.getElementById('action-dialog');let title,body;if(kind==='profile'){title='NexBill profile';body='<div class="profile"><span class="avatar">AF</span><div><strong>Alex Finance</strong><p>Finance leadership · Demonstration user</p></div></div><p>Access context: NexBill operations and the LeaseAegis Financial Intelligence Workspace.</p>'}else if(kind==='notifications'){const due=CASES.filter(c=>c.next<='2026-10-23'&&!isResolved(c));title='NexBill notifications';body='<p>Upcoming LeaseAegis reviews · as of Oct 22, 2026</p>'+due.map(c=>`<div class="notification-item"><strong><a href="${go('events',c)}">${c.title}</a></strong><span>${customerLink(account(c))}</span><small>Review ${dateLabel(c.next)} · ${c.severity} priority</small></div>`).join('')}else{title='Workspace settings';body='<div class="stat-row"><span>Workspace</span><strong>LeaseAegis inside NexBill</strong></div><div class="stat-row"><span>Display language</span><strong>English</strong></div><div class="stat-row"><span>Reporting currency</span><strong>USD</strong></div><div class="stat-row"><span>Data snapshot</span><strong>Oct 22, 2026</strong></div><div class="stat-row"><span>Saved decisions</span><strong>This browser only</strong></div>'}d.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${title}</h2><button class="close" data-detail-close aria-label="Close ${title}">×</button></div>${body}`;d.showModal()}

const PAST_DECISIONS=Object.freeze([
 Object.freeze({customer:'europe',type:'Payment Delay',action:'Collect',detected:'2026-08-04',approved:'2026-08-06',completed:'2026-08-29',metric:'Cash collected',target:.5,observed:.6,leadDays:31,note:'Dated commitment agreed before the balance reached 90 days.'}),
 Object.freeze({customer:'healthcare',type:'Upcoming Renewal',action:'Renew',detected:'2026-08-18',approved:'2026-08-19',completed:'2026-09-20',metric:'Annual renewal value confirmed',target:2.7,observed:2.7,leadDays:45,note:'Renewal confirmed 45 days before expiry on unchanged terms.'}),
 Object.freeze({customer:'datacenter',type:'Margin Pressure',action:'Reprice',detected:'2026-09-02',approved:'2026-09-05',completed:'2026-09-30',metric:'Annualized operating profit improvement',target:.08,observed:.06,leadDays:0,note:'Service cost reduced; price change deferred to renewal. Below target.'})
]);

const INTERNAL_DOMAINS=[['billing','Billing','FACT_BILLING','billing'],['collection','Collection','FACT_COLLECTION','collections'],['revenue','Revenue','FACT_REVENUE','portfolio'],['contract','Contract','FACT_CONTRACT','contracts'],['change','Change events','FACT_CHANGE_EVENT','contracts'],['asset','Asset','FACT_ASSET','customers'],['profitability','Profitability','FACT_PROFITABILITY','portfolio'],['usage','Product usage','FACT_PRODUCT_USAGE','customers']];

const ACTION_TRIGGERS=[['Escalate','Billing exceptions or disputes left unresolved'],['Collect','Overdue balances moving into later aging'],['Renew','Healthy customer approaching renewal'],['Reprice','Margin below target or risk rising'],['Restructure','Customer under stress; contract no longer fits'],['Monitor','Early signal, low exposure so far'],['Optimize portfolio','Segment return out of line with its risk']];

const FORECASTS={base:{name:'Base case',values:[5.4,5.6,5.8,6],assumption:'Contract schedules and payment patterns support the base cash view. Uncontracted demand is excluded.',action:'Confirm pending renewal dates and payment schedules before revising the base plan.',caseId:'renewal'},slip:{name:'Three renewals slip',values:[4.9,4.9,5,5.1],assumption:'Retail, North America Data Center and European Network ($10.8M annual renewal value) each start one quarter later. Catch-up billing partly recovers receipts from Q2 2027. Cash projections are illustrative assumptions, not annual value divided by four.',action:'Engage the three account teams now to confirm scope and protect renewal timing.',caseId:'renewal'},expansion:{name:'Cloud expansion contracted',values:[5.8,6.4,6.6,6.8],assumption:'Conditional scenario: Cloud capacity is contracted and delivered on time. Uncontracted upside — not in base forecast.',action:'Validate Cloud funding, procurement dates and delivery capacity before using the upside in planning.',caseId:'expansion'}};

const EXECUTION_TASKS={collections:['Payment reminder issued','Credit limit review opened','Customer commitment logged'],contracts:['Scope change drafted','Account team notified','Contract amendment queued'],portfolio:['Cost review opened','Pricing proposal prepared','Renewal terms flagged']};

const executionRuns=new Set();

function customerLink(a){return `<a class="customer-link" href="#customer/${esc(a.id)}">${esc(a.name)}</a>`}

function isResolved(c){return decision(c).status==='Outcome Achieved'}

function belowTarget(c){const d=decision(c);return d.status==='Completed'&&Number.isFinite(d.observed)&&d.observed<d.target}

function riskScore(c){return isResolved(c)?c.postScore:c.score}

function exposureTag(c){return c.customer==='telecom'?'<span class="pill">Shared $4.5M AR · counted once</span>':c.id==='expansion'?'<span class="pill">Uncontracted opportunity</span>':''}

function daysBetween(start,end){if(!start||!end)return null;const v=(Date.parse(String(end).slice(0,10))-Date.parse(String(start).slice(0,10)))/86400000;return Number.isFinite(v)&&v>=0?v:null}

function outcomeRows(){return [...PAST_DECISIONS.map(d=>({...d,source:'Q3 pilot history',cycle:daysBetween(d.detected,d.approved)})),...CASES.flatMap(c=>{const d=decision(c);if(!Number.isFinite(d.observed))return [];const approval=d.history.find(h=>h.status==='Approved');return [{customer:c.customer,type:c.type,action:c.actionType,detected:c.detected,approved:approval?.at,metric:c.metric,target:d.target,observed:d.observed,leadDays:Number.isFinite(d.leadDays)?d.leadDays:null,cycle:daysBetween(c.detected,approval?.at),note:d.evidence||'No evidence recorded in the legacy decision.',source:'Current browser',caseId:c.id}]})]}

function valueMetrics(){const rows=outcomeRows();const avg=key=>{const vals=rows.map(r=>r[key]).filter(Number.isFinite);return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null};return {cash:rows.filter(r=>r.metric==='Cash collected').reduce((s,r)=>s+r.observed,0),renewal:rows.filter(r=>r.metric==='Annual renewal value confirmed').reduce((s,r)=>s+r.observed,0),lead:avg('leadDays'),cycle:avg('cycle')}}

function valueDelivered(){const v=valueMetrics();return panel('Value delivered',`<div class="value-summary">${[[dollars(v.cash),'Cash collected'],[dollars(v.renewal),'Renewal value confirmed'],[v.lead===null?'Not measured':v.lead.toFixed(1)+' days','Average warning lead time'],[v.cycle===null?'Not measured':v.cycle.toFixed(1)+' days','Average decision cycle']].map(([value,label])=>`<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</div><p class="metric-caption">Different measures are shown separately, not added. Averages use available observations; live warning lead time is not inferred from overdue balances.</p>`,'Pilot metrics · illustrative','<a href="#outcomes">Review outcomes →</a>')}

const segmentNames=['Cloud & Data Centers','Telecom','Retail','Healthcare'];

function segData(name){const rows=customers.filter(c=>c.segment===name);const principal=sum('principal',rows),revenue=sum('revenue',rows);return {name,rows,principal,revenue,yield:rows.reduce((s,c)=>s+c.principal*c.yield,0)/principal,margin:rows.reduce((s,c)=>s+c.revenue*c.margin,0)/revenue,loss:rows.reduce((s,c)=>s+c.principal*c.loss,0)/principal}}

function portfolio(){const segs=segmentNames.map(segData),selected=ui.segment||'Cloud & Data Centers',rows=customers.filter(a=>a.segment===selected);return head('Portfolio Optimization','Choose where to grow, protect, improve or restructure.')+`<div class="use-case-steps">${['Portfolio analysis','Profitability assessment','Risk-adjusted decisions','Recommendations'].map((v,i)=>`<span><b>${i+1}</b>${v}</span>`).join('')}</div><div class="segments">${segs.map(s=>`<div class="segment"><div class="kpi-label">${s.name}</div><div class="num">${money(s.principal)}</div><p>${pct(s.yield)} yield · ${s.rows.length} accounts</p><div class="bar"><i style="width:${s.principal/totals.principal*100}%"></i></div><p>${Math.round(s.principal/totals.principal*100)}% of financed principal</p></div>`).join('')}</div>`+panel('Return × Risk',`<div class="quadrant-axis">↑ Higher return</div><div class="quadrant">${[['Grow','Cloud & Data Centers','grow'],['Protect and reprice','Telecom','protect'],['Improve margin','Healthcare',''],['Restructure or exit','Retail','exit']].map(([focus,segment,cls])=>`<div class="${cls}"><h3>${focus}</h3><button data-segment="${segment}" aria-pressed="${selected===segment}" class="${selected===segment?'chosen-segment':''}">${segment} →</button></div>`).join('')}</div><div class="quadrant-axis bottom">Risk →</div><span class="pill">Segment placement is illustrative</span><div class="segment-drilldown"><h3>${selected} customers</h3><div class="table-wrap"><table><thead><tr><th>Customer</th><th>Annual revenue</th><th>Operating margin</th><th>Recommended action</th></tr></thead><tbody>${rows.map(a=>`<tr><td>${customerLink(a)}</td><td>${money(a.revenue)}</td><td>${pct(a.margin)}</td><td>${relatedCase(a)?`<a href="${go('recommendations',relatedCase(a))}">${relatedCase(a).actionType} →</a>`:'Scheduled account review'}</td></tr>`).join('')}</tbody></table></div></div>`)+profitabilityPanel()+panel('Segment performance',`<div class="table-wrap"><table><thead><tr><th>Segment</th><th>Principal</th><th>Annual revenue</th><th>Yield</th><th>Operating margin</th><th>Risk-adjusted yield</th><th>Recommended focus</th></tr></thead><tbody>${segs.map(s=>`<tr><td>${s.name}</td><td>${money(s.principal)}</td><td>${money(s.revenue)}</td><td>${pct(s.yield)}</td><td>${pct(s.margin)}</td><td>${pct(s.yield-s.loss)}</td><td>${{'Cloud & Data Centers':'Grow',Telecom:'Protect and reprice',Healthcare:'Improve margin',Retail:'Restructure or exit'}[s.name]}</td></tr>`).join('')}</tbody></table></div>`)}

function forecastChart(key){const selected=FORECASTS[key],actual=[5,5.2,5.1,5.3],base=FORECASTS.base.values,range=[.2,.35,.5,.65],labels=["Q4'25","Q1'26","Q2'26","Q3'26","Q4'26","Q1'27","Q2'27","Q3'27"];const x=i=>55+i*99,y=v=>245-(v-4)/3.5*195,pts=(arr,offset)=>arr.map((v,i)=>`${x(i+offset)},${y(v)}`).join(' '),upper=base.map((v,i)=>`${x(i+4)},${y(v+range[i])}`),lower=base.map((v,i)=>`${x(i+4)},${y(v-range[i])}`).reverse();return `<svg class="forecast-chart" viewBox="0 0 800 290" role="img" aria-label="Projected cash inflow, USD M. ${selected.name}. Actual ${actual.join(', ')}. Forecast ${selected.values.join(', ')}. Base range plus or minus ${range.join(', ')}.">${[4,5,6,7].map(v=>`<line x1="55" x2="750" y1="${y(v)}" y2="${y(v)}" stroke="#e7edf5"/><text x="15" y="${y(v)+4}">${v.toFixed(1)}</text>`).join('')}<text x="55" y="22">Actual</text><text x="450" y="22">Next four quarters →</text><polygon points="${upper.concat(lower).join(' ')}" fill="#dceaff"/><line x1="${x(3.5)}" x2="${x(3.5)}" y1="35" y2="248" stroke="#a4b4cb" stroke-dasharray="5 5"/><polyline points="${pts(actual,0)}" fill="none" stroke="#223c60" stroke-width="3"/><polyline points="${pts([actual[3],...base],3)}" fill="none" stroke="#3279d9" stroke-width="3"/>${key!=='base'?`<polyline points="${pts([actual[3],...selected.values],3)}" fill="none" stroke="${key==='slip'?'#d78a35':'#249786'}" stroke-width="3" stroke-dasharray="7 5"/>`:''}${labels.map((v,i)=>`<text x="${x(i)}" y="275" text-anchor="middle">${v}</text>`).join('')}</svg>`}

function forecast(){const key=ui.forecast||'base',s=FORECASTS[key],contracted=sum('revenue',customers.filter(c=>c.renewal>90)),dependent=sum('revenue',customers.filter(c=>c.renewal<=90)),risk=sum('revenue',customers.filter(c=>c.renewal<=90&&c.risk==='High'));return head('Forecast Intelligence','Act on a cash and revenue gap before it reaches the books.','<span class="pill blue">Predictive features · Phase 3</span>')+`<div class="kpis snapshot-kpis">${kpi('Contracted',money(contracted),'Annual value · renewal >90 days')}${kpi('Renewal-dependent',money(dependent),'Annual value · renewal ≤90 days')}${kpi('At risk',money(risk),'Subset of renewal-dependent · High risk')}</div><p class="metric-caption">Annual values, not expected losses. At risk is a subset, not an additional amount.</p><div class="grid"><section class="panel"><div class="panel-head"><div><h2>Projected cash inflow</h2><p>USD M · quarterly operating receipts</p></div></div><div class="tabs forecast-tabs">${Object.entries(FORECASTS).map(([k,v])=>`<button data-forecast="${k}" class="${key===k?'selected':''}" aria-pressed="${key===k}">${v.name}</button>`).join('')}</div>${forecastChart(key)}<div class="legend"><span><i class="dot" style="background:#223c60"></i>Actual</span><span><i class="dot"></i>Base case</span><span><i class="dot" style="background:#dceaff"></i>Scenario range</span>${key!=='base'?`<span>${s.name}</span>`:''}</div><p>${s.assumption}</p>${key==='expansion'?'<span class="pill">Uncontracted upside — not in base forecast</span>':''}<div class="insight"><strong>Act on the gap</strong><br>${s.action}<br><a href="#recommendations/${s.caseId}">Review recommended action →</a></div></section>${panel('Planning decisions',`<div class="forecast-explanations">${[['Forecasting','From contract schedules, billing and payment patterns'],['Scenario planning','What if three large renewals slip a quarter?'],['Revenue projection','Contracted, renewal-dependent and at-risk revenue'],['Cash flow projection','Expected inflows, adjusted for collection risk'],['Decision support','Act on the gap before it reaches the books']].map(([label,text])=>`<div class="event"><h3>${label}</h3><p>${text}</p></div>`).join('')}</div>`)}</div>`}

function customer(){const a=customers.find(x=>x.id===route().customerId)||customers[0],cases=CASES.filter(c=>c.customer===a.id),rec=CUSTOMER_SIGNALS[a.id];return head('Customer 360','See all customer risks and opportunities together.',`<select id="customer-select" aria-label="Select customer">${customers.map(x=>`<option value="${x.id}" ${a.id===x.id?'selected':''}>${x.name}</option>`).join('')}</select>`)+`<div class="panel customer-title"><span class="customer-icon">▤</span><div><h2>${customerLink(a)}</h2><p>${a.segment} · ${a.country}</p></div><a style="margin-left:auto" href="#nexbill/customers/@${a.id}">View NexBill customer record ↗</a></div>${a.id==='telecom'?'<div class="insight"><strong>Shared $4.5M exposure — counted once</strong><br>Payment, credit and market events refer to the same AR balance.</div>':''}<div class="customer-columns"><section class="panel"><h2>Internal signals</h2><span class="pill">Current portfolio snapshot</span>${[['AR aging',rec.collection],['Contract behavior',rec.change],['Usage trend',rec.usage],['Margin',rec.profitability],['Renewal',a.renewal+' days to renewal']].map(([label,text])=>`<div class="event"><h3>${label}</h3><p>${text}</p></div>`).join('')}</section><section class="panel"><h2>Risk view</h2>${cases.filter(c=>c.category!=='Growth Opportunity').map(c=>`<div class="event"><h3><a href="${go('analysis',c)}">${c.category}</a> ${badge(c.severity)}</h3>${c.secondary.map(([name,level])=>`<p>${name} ${badge(level)}</p>`).join('')}<p>${isResolved(c)?'Resolved · score '+c.postScore:c.summary}</p>${belowTarget(c)?'<span class="pill Medium">Outcome below target — risk remains open</span>':''}</div>`).join('')||'<p>No active risk event in this demo.</p>'}<h2 class="opportunity-view-title">Opportunity view</h2>${cases.filter(c=>c.category==='Growth Opportunity').map(c=>`<div class="event"><h3><a href="${go('analysis',c)}">${c.category}</a> ${badge(c.severity)}</h3><p>${c.summary}</p><span class="pill">${dollars(c.amount)} · uncontracted</span></div>`).join('')||`<p>${a.opp?dollars(a.opp)+' potential demand under review; no active opportunity case.':'No qualified opportunity in this demo.'}</p>`}</section><section class="panel external-panel"><div class="panel-head"><h2>External signals</h2><span class="pill">Phase 2</span></div>${[...new Set(cases.flatMap(c=>c.external))].filter(x=>!x.startsWith('No ')).map(text=>`<div class="event"><p>${text}</p></div>`).join('')||`<p>${a.event}</p><p>${a.context}</p>`}</section></div>`+panel('Recommended actions',cases.map(c=>`<div class="customer-action"><div><span class="pill blue">${c.actionType}</span><h3>${c.rec}</h3></div>${statusBadge(decision(c).status)}<a class="button" href="${go('decisions',c)}">Review decision →</a></div>`).join('')||'<p>Maintain scheduled account review. No active event requires a decision.</p>')}

function outcomes(){const rows=outcomeRows();return head('Outcome Review','Review decisions against measured business results.')+valueDelivered()+panel('Decision outcomes',`<div class="table-wrap"><table><thead><tr><th>Customer / event</th><th>Action type</th><th>Target</th><th>Observed</th><th>Attainment</th><th>Lead time</th><th>Decision cycle</th><th>Review</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${customerLink(customers.find(a=>a.id===r.customer))}<small>${r.type} · ${r.source}</small></td><td><span class="pill blue">${r.action}</span></td><td>${dollars(r.target)}<small>${r.metric}</small></td><td>${dollars(r.observed)}</td><td>${r.target>0?Math.round(r.observed/r.target*100)+'%':'Not available'}<small>${r.observed>=r.target?'Target achieved':'Below target'}</small></td><td>${Number.isFinite(r.leadDays)?r.leadDays+' days':'Not measured'}</td><td>${Number.isFinite(r.cycle)?r.cycle+' days':'Not measured'}</td><td>${r.caseId?`<a href="#decisions/${r.caseId}">Decision →</a>`:'Read-only pilot history'}</td></tr>`).join('')}</tbody></table></div>`)+'<p class="note">Phase 4 · Learning from FACT_AI_OUTCOME is not active in this demo. Scores here are updated by rule after a verified outcome.</p>'+panel('Result evidence',rows.map(r=>`<div class="event"><h3>${customerLink(customers.find(a=>a.id===r.customer))} · ${r.action}</h3><p>${esc(r.note)}</p></div>`).join(''))}

function matchesStatus(status,filter){return filter==='All statuses'||filter==='In Execution'&&['Approved','In Progress'].includes(status)||filter==='Completed'&&['Completed','Outcome Achieved'].includes(status)||filter==='Pending Review'&&status==='Recommended'||filter==='Rejected'&&status==='Rejected'}

function isOverdue(d){return d.targetDate<'2026-10-22'&&!['Completed','Outcome Achieved','Rejected'].includes(d.status)}

function showAssumptions(){const d=document.getElementById('action-dialog');d.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">Assumptions & demonstration boundaries</h2><button class="close" data-detail-close aria-label="Close assumptions">×</button></div><ul class="assumptions-list"><li>Fixed portfolio snapshot: October 22, 2026. NexBill records and task execution are local demonstrations.</li><li>Scores, confidence, asset counts, usage and trends are illustrative, not calibrated predictions.</li><li>Phase 2 external feeds are not connected; context does not alter risk levels before calibration.</li><li>Phase 3 forecasts and scenario ranges are planning illustrations, not validated predictions.</li><li>Phase 4 learning is not active. Meeting a verified demo outcome target applies a predefined post-action score; it does not establish that all exposure is recovered.</li><li>Q3 pilot history is read-only example data, separate from saved current decisions. Warning lead time is averaged only where measured.</li><li>Different financial measures are not added. Shared AR is counted once; uncontracted opportunities remain outside the base forecast.</li><li>Yield is annualized finance income divided by principal. Risk-adjusted yield subtracts a demo loss allowance. Margin is after funding, service and collection cost.</li><li>Decisions remain in this browser only. No live company transactions, payments, news or AI services are connected. The Advisor uses predefined briefings.</li><li>Execution tasks are illustrative checklist steps, not evidence of completed production work. Recorded outcomes do not rewrite source accounting balances.</li></ul>`;d.showModal()}
document.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;if(t.hasAttribute('data-shell-dialog'))showShellDialog(t.dataset.shellDialog);if(t.hasAttribute('data-assumptions'))showAssumptions();if(t.hasAttribute('data-detail-close'))document.getElementById('action-dialog').close();if(t.hasAttribute('data-select-option')&&decision(currentCase()).status==='Recommended'){ui.options??={};ui.options[currentCase().id]=Number(t.dataset.selectOption);render();toast('Option selected for Finance review.')}if(t.hasAttribute('data-status-filter')){ui.decisionFilter=t.dataset.statusFilter;render()}if(t.hasAttribute('data-transition'))transition(t.dataset.transition);if(t.hasAttribute('data-run-execution'))runExecution();if(t.hasAttribute('data-advisor-open'))openAdvisor();if(t.hasAttribute('data-advisor-close'))document.getElementById('advisor-panel').close();if(t.hasAttribute('data-brief')){ui.advisor=t.dataset.brief;openAdvisor()}if(t.hasAttribute('data-segment')){ui.segment=t.dataset.segment;render()}if(t.hasAttribute('data-forecast')){ui.forecast=t.dataset.forecast;render();document.querySelector(`[data-forecast="${ui.forecast}"]`).focus()}if(t.hasAttribute('data-rationale')){const f=document.getElementById('finance-review-form');f.elements.note.value=t.dataset.rationale;if(t.dataset.rationale==='Approve as recommended'){f.elements.option.value='0';f.requestSubmit(f.querySelector('[value="Approved"]'))}else f.elements[t.dataset.rationale==='Adjust target'?'target':'note'].focus()}});
document.addEventListener('change',e=>{if(e.target.id==='event-context')location.hash=route().page+'/'+e.target.value;if(e.target.id==='customer-select')location.hash='customer/'+e.target.value;if(e.target.id==='event-severity'){ui.eventFilter=e.target.value;render();document.getElementById('event-severity').focus()}if(e.target.id==='decision-filter'){ui.decisionFilter=e.target.value;render();document.getElementById('decision-filter').focus()}});
document.addEventListener('input',e=>{if(e.target.id==='event-search'){ui.search=e.target.value;render();document.getElementById('event-search').focus()}});
document.addEventListener('submit',e=>{if(e.target.id==='finance-review-form'){e.preventDefault();const c=currentCase(),d=decision(c);if(d.status!=='Recommended')return;const f=new FormData(e.target),owner=f.get('owner').trim(),note=f.get('note').trim(),due=f.get('due'),target=Number(f.get('target')),option=Number(f.get('option')),status=e.submitter?.value;if(!owner||!['Approved','Rejected'].includes(status)||!Number.isInteger(option)||!c.options[option]||!due||due<'2026-10-22'||!Number.isFinite(target)||target<=0||target>c.max){toast('Enter a valid owner, target date and outcome target.');return}Object.assign(d,{owner,note,targetDate:due,target,option,status});d.history.push({status,at:new Date().toISOString(),owner,note:note||'No additional rationale supplied.',option,target});if(persist(c,d)){if(ui.options)delete ui.options[c.id];render();toast(status==='Approved'?'Finance approved. Continue in NexBill for execution.':'Recommendation rejected.')}}if(e.target.id==='outcome-form'){e.preventDefault();const c=currentCase(),d=decision(c);if(d.status!=='Completed'||d.observed!==undefined)return;const f=new FormData(e.target),raw=f.get('observed'),observed=Number(raw),evidence=f.get('evidence').trim();if(raw===''||!Number.isFinite(observed)||observed<0||observed>c.max||!evidence){toast('Enter a valid measured amount and supporting result summary.');return}Object.assign(d,{observed,evidence,verifiedAt:new Date().toISOString(),status:observed>=d.target?'Outcome Achieved':'Completed'});d.history.push({status:observed>=d.target?'Outcome Achieved':'Outcome measured · below target',at:d.verifiedAt,owner:d.owner,note:`${c.metric}: ${dollars(observed)}. ${evidence}`,option:d.option,target:d.target});if(persist(c,d)){render();toast(observed>=d.target?'Outcome target achieved. The post-action assessment is now available.':'Outcome below target — risk remains open.')}}});
window.addEventListener('hashchange',()=>{for(const id of ['action-dialog','advisor-panel'])document.getElementById(id).close();render();window.scrollTo(0,0);document.getElementById('main').focus({preventScroll:true})});
render();
