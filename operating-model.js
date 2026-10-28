'use strict';
const customers = [
 {id:'telecom',name:'Global Telecom Operator',segment:'Telecom',country:'United States',principal:42,revenue:5.2,ar:4.5,overdue:4.5,days:96,margin:18,priorMargin:22,yield:8.4,loss:1.8,health:38,risk:'High',renewal:60,renewalValue:5.2,contracts:8,driver:'Payments more than 90 days overdue',impact:'$4.5M in delayed receipts may shift cash into the next quarter.',action:'Review collections and credit limit',event:'Credit outlook turned negative',context:'Credit context reinforces the need for a review; payment delays determine the current risk level.',opp:0},
 {id:'retail',name:'Retail Technology Group',segment:'Retail',country:'Germany',principal:28,revenue:3.6,ar:2.4,overdue:1.2,days:62,margin:14,priorMargin:18,yield:7.2,loss:1.4,health:51,risk:'High',renewal:25,renewalValue:3.6,contracts:6,driver:'Late payments and pending renewal',impact:'$1.2M is overdue; a $3.6M renewal needs engagement within 30 days.',action:'Agree a payment and renewal plan',event:'Store network restructuring announced',context:'Validate the customer footprint before agreeing the next lease scope.',opp:0},
 {id:'cloud',name:'Cloud Infrastructure Provider',segment:'Cloud & Data Centers',country:'Germany',principal:36,revenue:4.8,ar:.8,overdue:0,days:0,margin:29,priorMargin:28,yield:10.2,loss:.4,health:91,risk:'Low',renewal:120,renewalValue:4.8,contracts:7,driver:'Payments current; renewal outside 90 days',impact:'A $4M expansion opportunity is uncontracted and excluded from the base forecast.',action:'Validate expansion budget and timing',event:'New cloud capacity announced',context:'Confirm funding and procurement timing before committing resources.',opp:4},
 {id:'datacenter',name:'North America Data Center Operator',segment:'Cloud & Data Centers',country:'United States',principal:32,revenue:4.2,ar:1.2,overdue:.3,days:35,margin:26,priorMargin:25,yield:9.6,loss:.6,health:78,risk:'Medium',renewal:28,renewalValue:4.2,contracts:5,driver:'Renewal approaching; one payment delayed',impact:'$4.2M of annual renewal value needs confirmation within 28 days.',action:'Confirm renewal scope with the account team',event:'New data center facility planned',context:'Keep expansion separate from renewal until additional demand is contracted.',opp:2},
 {id:'europe',name:'European Network Operator',segment:'Telecom',country:'France',principal:24,revenue:3,ar:1.7,overdue:.7,days:48,margin:17,priorMargin:20,yield:8,loss:1.2,health:62,risk:'Medium',renewal:22,renewalValue:3,contracts:5,driver:'Payment delays and contract flex-down request',impact:'$3M of annual renewal value may contract if usage reductions continue.',action:'Review renewal scope and service cost',event:'Industry capital spending slows',context:'Assess the requested reduction against contracted volumes before updating the forecast.',opp:0},
 {id:'healthcare',name:'Healthcare Equipment Leasing',segment:'Healthcare',country:'Singapore',principal:22,revenue:2.7,ar:.9,overdue:0,days:0,margin:24,priorMargin:24,yield:7.6,loss:.3,health:88,risk:'Low',renewal:150,renewalValue:2.7,contracts:4,driver:'Payments current; stable contract scope',impact:'Stable receipts support predictable cash flow; no immediate intervention is needed.',action:'Maintain scheduled account review',event:'Equipment upgrade program under review',context:'Treat potential equipment upgrades as an opportunity until approved.',opp:1}
];
const pages=[['dashboard','Dashboard','▦'],['events','Business Events','◷'],['signals','Signals','≋'],['analysis','Risks & Opportunities','◇'],['impact','Financial Impact','↗'],['recommendations','Recommendations','☷'],['decisions','Decision Center','✓'],['portfolio','Portfolio Optimization','◫'],['forecast','Forecast Intelligence','↗'],['customer','Customer 360','♙'],['outcomes','Outcome Review','✓']];
const totals={principal:sum('principal'),revenue:sum('revenue'),ar:sum('ar'),overdue:sum('overdue')};
const weighted=key=>customers.reduce((s,c)=>s+c.principal*c[key],0)/totals.principal;
const money=n=>'$'+n.toFixed(1)+'M';
const pct=n=>n.toFixed(1)+'%';
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function sum(key,rows=customers){return rows.reduce((s,c)=>s+c[key],0)}
function badge(level){return `<span class="pill ${level}">${level}</span>`}
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
function dollars(n){return Math.abs(n)<1?'$'+Math.round(n*1000).toLocaleString('en-US')+'K':money(n)}
function dateLabel(d){return new Date(d+'T12:00:00Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'})}
function loadModel(){try{const s=JSON.parse(localStorage.getItem(MODEL_KEY)||'{}');return s&&typeof s==='object'&&!Array.isArray(s)?s:{}}catch{return {}}}
function decision(c){const stored=loadModel()[c.id];const base={status:'Recommended',option:0,owner:c.owner,targetDate:c.targetDate,target:c.target,history:[]};if(!stored||!Array.isArray(stored.history))return base;return {...base,...stored,option:Number.isInteger(stored.option)&&c.options[stored.option]?stored.option:0}}
function persist(c,d){const all=loadModel();all[c.id]=d;try{localStorage.setItem(MODEL_KEY,JSON.stringify(all));return true}catch{toast('Unable to save. Your inputs remain available; browser storage may be blocked.');return false}}
function statusLabel(s){return s==='Recommended'?'Pending Review':s==='Outcome Achieved'?'Business Outcome Achieved':s}
function statusBadge(s){return `<span class="pill status-${s.replaceAll(' ','-')}">${statusLabel(s)}</span>`}
const IMPACTS={
 retail:[['Cash Flow Impact','$1.2M delayed','Overdue receipts require a dated payment commitment.'],['Revenue Impact','$3.6M renewal under review','Annual value, not expected loss. Scope must match the restructured store network.'],['Margin Impact','14% vs 18% prior','Review service cost and payment terms together.'],['Working Capital Impact','$1.2M tied up','Same overdue AR — counted once.'],['Credit Exposure','$2.4M open AR','Gross receivables, including $1.2M overdue.'],['Portfolio Yield Impact','7.2% current yield','Baseline annualized yield; no automatic adjustment.']],
 payment:[['Cash Flow Impact','$4.5M delayed','Overdue receipts could move beyond Q4; the collection scenario targets $1.5M recovered.'],['Revenue Impact','No change booked','Payment delay alone does not reduce recognized revenue. $5.2M annual renewal value remains a separate review.'],['Margin Impact','Not quantified','Additional collection effort may raise cost; no incremental cost estimate is available.'],['Working Capital Impact','$4.5M tied up','The same overdue AR is capital tied up, not a second financial loss.'],['Credit Exposure','$4.5M open AR','Gross AR at risk, before collateral or recovery assumptions. $42M financed principal is shown separately, not added.'],['Portfolio Yield Impact','Not estimated','Yield sensitivity requires loss and funding assumptions beyond this event.']],
 modification:[['Cash Flow Impact','Timing unconfirmed','Receipts depend on the effective date and the accepted payment schedule.'],['Revenue Impact','−$300K / year','10% × $3M annual renewal value, if the full requested flex-down is accepted.'],['Margin Impact','−$51K / year','Illustrative: $300K less annual revenue × unchanged 17% margin. Service-cost adjustments may change this.'],['Working Capital Impact','$700K overdue','Existing overdue AR remains a separate collection issue; no incremental capital release is assumed.'],['Credit Exposure','$1.7M open AR','Existing gross AR. Do not add contract principal or annual renewal value to this balance.'],['Portfolio Yield Impact','Not estimated','A recalculation requires revised finance income and financed principal.']],
 renewal:[['Cash Flow Impact','Timing at risk','A one-quarter renewal delay could shift receipts; no payment schedule has been confirmed.'],['Revenue Impact','$4.2M under review','Annual renewal value, not an expected loss. One-quarter timing sensitivity is $1.05M if service stops during a full quarter.'],['Margin Impact','26% current margin','Future margin depends on agreed price and service scope. No change is booked.'],['Working Capital Impact','$300K overdue','Existing receivables remain outstanding during renewal discussions.'],['Credit Exposure','$1.2M open AR','Current gross receivable balance; independent of the future renewal value.'],['Portfolio Yield Impact','9.6% current yield','Account baseline, not a predicted change. Review revised terms before recalculating.']],
 credit:[['Cash Flow Impact','$4.5M under review','Same balance as the Payment Delay event. The credit outlook is not an additional cash shortfall.'],['Revenue Impact','No change booked','New commitments may be reviewed; no revenue reduction is assumed from an outlook change alone.'],['Margin Impact','Not quantified','Any impairment requires a separate supported assessment; none is modeled here.'],['Working Capital Impact','$4.5M tied up','Same overdue AR, shown as working capital rather than incremental exposure.'],['Credit Exposure','$4.5M open AR','Gross AR exposure, not estimated loss. Remaining contract value and collateral are not available for a net credit estimate.'],['Portfolio Yield Impact','Not estimated','No expected-loss modifier has been calibrated for the credit context.']],
 expansion:[['Cash Flow Impact','+$400K in Q4','Conditional scenario: receipts from a contracted November start; not committed cash.'],['Revenue Impact','+$600K in Q4','Assumes a portion of the $4M opportunity is contracted and delivered in Q4. Base forecast remains unchanged.'],['Margin Impact','+$174K in Q4','Illustrative $600K revenue × current 29% margin; assumes unchanged unit economics.'],['Working Capital Impact','+$200K requirement','Scenario revenue less cash receipts: $600K − $400K. Simplified AR bridge, excluding tax and billing timing.'],['Credit Exposure','$800K current AR','All current. Conditional incremental AR of $200K would require credit review; it is not booked.'],['Portfolio Yield Impact','10.2% current yield','Existing account baseline. Expansion yield is not estimated until financing terms are agreed.']],
 market:[['Cash Flow Impact','Not quantified','Service-cost cash effects require a validated cost and payment schedule.'],['Revenue Impact','$5.2M revenue base','No sector-wide decline is applied automatically. This is the annual revenue base for margin analysis.'],['Margin Impact','−$208K / year','(22% − 18%) × $5.2M annual revenue. This annualized sensitivity is not a newly booked expense.'],['Working Capital Impact','$4.5M overdue','Shared balance with Payment Delay. Do not count it again as sector-related exposure.'],['Credit Exposure','$4.5M open AR','Existing receivable exposure is unchanged by this margin analysis.'],['Portfolio Yield Impact','8.4% current yield','Operating margin and portfolio yield differ. No yield change is inferred directly from the 4-point margin gap.']]
};
function historyMarkup(c,d){return `<ol class="decision-history"><li><span class="history-dot"></span><div><strong>Recommendation generated</strong><time>${dateLabel(c.detected)} · Recommendation v1</time><p>${c.rec}</p></div></li>${d.history.map(h=>`<li><span class="history-dot"></span><div><strong>${esc(statusLabel(h.status))}</strong><time>${new Date(h.at).toLocaleString('en-US',{timeZone:'America/New_York'})} ET · ${esc(h.owner)}</time><p>${esc(h.note)}</p>${h.option!==undefined?`<small>Finance option: ${esc(c.options[h.option]?.[0]||'Unknown')} · Target: ${dollars(h.target??c.target)}</small>`:''}</div></li>`).join('')}</ol>`}
const BRIEFS={
 retail:['What should we do about Retail?', 'Retail has $1.2M overdue for 62 days and a $3.6M annual renewal in 25 days.', 'Cash recovery and renewal scope must be considered together; annual renewal value is not expected loss.', 'Agree a dated payment plan and right-size the renewal to the store network.', 'retail'],
 attention:['What requires immediate attention?','Global Telecom has $4.5M more than 90 days overdue. Three portfolio renewals are within 30 days.','Delayed receipts and unconfirmed renewal scope create cash and revenue uncertainty.','Start with collection follow-up, then review near-term renewals.','payment'],
 collection:['Which customers have rising collection risk?','Global Telecom has $4.5M overdue; Retail has $1.2M. Together they represent $5.7M of the $6.7M overdue portfolio.','Receipts may slip beyond the planning period. Overdue AR is not a confirmed loss.','Obtain dated payment commitments and review limits before new commitments.','payment'],
 margin:['What is driving profitability decline?','Global Telecom margin fell from 22% to 18%. Cost and price effects require investigation.','At $5.2M annual revenue, the four-point gap represents $208K annual profit sensitivity.','Review service, funding and collection costs alongside renewal pricing.','market'],
 renewal:['Which renewals may affect future revenue?','Retail, North America Data Center and European Network renew within 30 days.','Their combined annual renewal value is $10.8M. This is revenue under review, not an expected loss.','Confirm scope and dates, prioritizing payment issues and requested flex-downs.','renewal']
};
function openAdvisor(){const key=ui.advisor||'attention',b=BRIEFS[key]||BRIEFS.attention,d=document.getElementById('advisor-panel');d.innerHTML=`<div class="dialog-head"><div><span class="eyebrow">OPTIONAL FINANCE BRIEF</span><h2 id="advisor-title">AI Advisor</h2></div><button class="close" data-advisor-close aria-label="Close Advisor">×</button></div><p>Choose a portfolio briefing.</p><div class="brief-prompts">${Object.entries(BRIEFS).map(([id,v])=>`<button data-brief="${id}">${v[0]}</button>`).join('')}</div><div aria-live="polite"><h3>${b[0]}</h3>${['Observation','Business Impact','Recommended Action'].map((label,i)=>`<div class="brief-section"><h3>${label}</h3><p>${b[i+1]}</p></div>`).join('')}<a href="#events/${b[4]}/options" data-advisor-close>Review the related recommendation →</a></div>`;if(!d.open)d.showModal()}
let toastTimer;
function toast(message){const el=document.getElementById('toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('visible'),5000)}
function transition(next,caseId=currentCase().id){const c=CASES.find(x=>x.id===caseId);if(!c)return false;const d=decision(c),allowed={Approved:'In Progress','In Progress':'Completed',Rejected:'Recommended'};if(allowed[d.status]!==next)return false;if(next!=='Recommended'&&(route().page!=='nexbill'||route().module!==executionModule(c)||currentCase().id!==c.id||route().customerId))return false;if(next==='Completed'&&(d.executionSteps?.length||0)<3)return false;const note=next==='In Progress'?'NexBill demo execution started.':next==='Completed'?'NexBill demo tasks completed; business outcome is not yet measured.':'Finance review reopened; previous decision remains in history.';d.status=next;d.history.push({status:next,at:new Date().toISOString(),owner:d.owner,note,option:d.option,target:d.target});if(!persist(c,d))return false;render();return true}
async function runExecution(){const c=currentCase(),r=route();if(r.page!=='nexbill'||r.customerId||r.module!==executionModule(c)||executionRuns.has(c.id)||!['Approved','In Progress'].includes(decision(c).status))return;executionRuns.add(c.id);try{if(decision(c).status==='Approved'&&!transition('In Progress',c.id))return;render();for(let i=decision(c).executionSteps?.length||0;i<3;i++){await new Promise(resolve=>setTimeout(resolve,700));if(route().page!=='nexbill'||route().module!==r.module||currentCase().id!==c.id||route().customerId)return;const d=decision(c);if(d.status!=='In Progress')return;d.executionSteps??=[];if(d.executionSteps.includes(i))continue;d.executionSteps.push(i);d.history.push({status:'Execution task completed',at:new Date().toISOString(),owner:d.owner,note:EXECUTION_TASKS[r.module][i],option:d.option,target:d.target});if(!persist(c,d))return;render()}transition('Completed',c.id)}finally{executionRuns.delete(c.id);render()}}
function hostLink(module,c=currentCase()){return '#nexbill/'+module+'/'+c.id}
function moduleTitle(module){return {billing:'Billing',collections:'Collections',contracts:'Contracts',customers:'Customers',portfolio:'Portfolio'}[module]||'Billing'}
function executionModule(c){return ['payment','credit','retail'].includes(c.id)?'collections':c.id==='market'?'portfolio':'contracts'}
function renderHostNavigation(r,c){document.getElementById('nexbill-modules').innerHTML=['billing','collections','contracts','customers','portfolio'].map(module=>`<a href="${r.customerId?'#nexbill/'+module+'/@'+r.customerId:hostLink(module,c)}" class="${r.page==='nexbill'&&r.module===module?'active':''}" ${r.page==='nexbill'&&r.module===module?'aria-current="page"':''}>${moduleTitle(module)}</a>`).join('')+`<a class="intelligence-entry ${r.page!=='nexbill'?'active':''}" href="${esc(ui.returnHash||'#dashboard')}"><span>✧</span> LeaseAegis <small>Intelligence Workspace</small></a>`;document.getElementById('notification-count').textContent=CASES.filter(x=>x.next<='2026-10-23'&&!isResolved(x)).length}
function profitabilityPanel(){const margin=customers.reduce((s,c)=>s+c.revenue*c.margin,0)/totals.revenue;return panel('Profitability Trend',`<div class="profitability-layout"><div><span class="eyebrow">NET OPERATING MARGIN</span><strong>${pct(margin)}</strong><p>After funding, service and collection costs.</p><a href="#events/market/impact">Review Telecom margin pressure →</a></div><div>${chart([24.2,24.5,24.1,23.4,22.8,+margin.toFixed(1)],['May','Jun','Jul','Aug','Sep','Oct'])}</div><div class="insight"><strong>Finance focus</strong><br>Telecom and Retail are compressing portfolio margin. Review cost and pricing before adding renewal concessions.</div></div>`,'Portfolio profitability · illustrative history from NexBill financial records')}
function relatedCase(a){return CASES.find(x=>x.customer===a.id)}
function intelligenceLink(a,stage='events'){const c=relatedCase(a);return c?`<a href="${go(stage,c)}">Review in LeaseAegis →</a>`:'<span class="muted">No active intelligence event</span>'}
function hostTable(module,c){let headings,rows;const selected=a=>a.id===c.customer?' class="selected-record"':'';if(module==='billing'){headings=['Customer','Open invoice balance','Overdue balance','Billing follow-up','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}<small>${a.country}</small></td><td>${money(a.ar)}</td><td>${money(a.overdue)}</td><td>${a.days?'Confirm invoice acceptance':'No overdue billing issue'}</td><td>${intelligenceLink(a,'signals')}</td></tr>`)}else if(module==='collections'){headings=['Customer','Open AR','Overdue AR','Oldest overdue','Payment condition','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}</td><td>${money(a.ar)}</td><td>${money(a.overdue)}</td><td>${a.days?plural(a.days,'day'):'Current'}</td><td>${a.days?'Delayed':'Current'}</td><td>${intelligenceLink(a,'analysis')}</td></tr>`)}else if(module==='contracts'){headings=['Customer','Active contracts','Annual contracted revenue','Next renewal','Scope review','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}</td><td>${a.contracts}</td><td>${money(a.revenue)}</td><td>${plural(a.renewal,'day')}</td><td>${a.id==='europe'?'10% flex-down requested':'No approved scope change'}</td><td>${intelligenceLink(a,'recommendations')}</td></tr>`)}else if(module==='customers'){headings=['Customer','Segment','Country','Active contracts','Financed principal','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}</td><td>${a.segment}</td><td>${a.country}</td><td>${a.contracts}</td><td>${money(a.principal)}</td><td>${intelligenceLink(a)}</td></tr>`)}else{headings=['Customer','Financed principal','Annual revenue','Operating margin','Portfolio yield','Intelligence'];rows=customers.map(a=>`<tr${selected(a)}><td>${customerLink(a)}<small>${a.segment}</small></td><td>${money(a.principal)}</td><td>${money(a.revenue)}</td><td>${pct(a.margin)}</td><td>${pct(a.yield)}</td><td>${intelligenceLink(a,'impact')}</td></tr>`)}return `<div class="table-wrap"><table><thead><tr>${headings.map(h=>`<th>${h}</th>`).join('')}</tr></thead><tbody>${rows.join('')}</tbody></table></div>`}
function executionPanel(module,c){if(module!==executionModule(c))return '';const d=decision(c),actionable=['Approved','In Progress','Completed','Outcome Achieved'].includes(d.status),tasks=EXECUTION_TASKS[module];return panel('NexBill execution workspace',`<span class="pill blue">NexBill owns execution</span><h3>${customerLink(account(c))}</h3><p>${c.rec}</p><div class="decision-distinction"><div><span>LeaseAegis recommendation</span><strong>${c.options[0][0]}</strong></div><div><span>Finance-approved action</span><strong>${actionable?c.options[d.option][0]:'Awaiting Finance approval'}</strong></div><div><span>Execution status</span><strong>${statusLabel(d.status)}</strong></div></div><ol class="execution-tasks" aria-live="polite">${tasks.map((task,i)=>`<li class="${d.executionSteps?.includes(i)?'done':''}"><span>${d.executionSteps?.includes(i)?'✓':'○'}</span>${task}</li>`).join('')}</ol><div class="execution-actions">${['Approved','In Progress'].includes(d.status)?`<button class="primary" data-run-execution ${executionRuns.has(c.id)?'disabled':''}>${executionRuns.has(c.id)?'Execution in progress…':'Run execution in NexBill'}</button>`:''}<a class="button" href="${go('decisions',c)}">${['Completed','Outcome Achieved'].includes(d.status)?'Return to LeaseAegis outcome review':'Review Finance decision in LeaseAegis'} →</a></div>`,'Illustrative task progression · no production transaction')}
function showShellDialog(kind){const d=document.getElementById('action-dialog');let title,body;if(kind==='profile'){title='NexBill profile';body='<div class="profile"><span class="avatar">AF</span><div><strong>Alex Finance</strong><p>Finance leadership · Demonstration user</p></div></div><p>Access context: NexBill operations and the LeaseAegis Financial Intelligence Workspace.</p>'}else if(kind==='notifications'){const due=grouped(CASES.filter(c=>c.next<='2026-10-23'&&!isResolved(c))); title='NexBill notifications';body='<p>Upcoming LeaseAegis reviews · as of Oct 22, 2026</p>'+due.map(group=>`<div class="notification-item"><strong>${customerLink(account(group[0]))}</strong><span>${group[0].customer==='telecom'?'$4.5M · shared exposure':dollars(group[0].amount)}</span>${group.map(c=>`<a href="${go('event',c)}">${c.type} →</a>`).join('')}</div>`).join('')}else{title='Workspace settings';body='<div class="stat-row"><span>Workspace</span><strong>LeaseAegis inside NexBill</strong></div><div class="stat-row"><span>Display language</span><strong>English</strong></div><div class="stat-row"><span>Reporting currency</span><strong>USD</strong></div><div class="stat-row"><span>Data snapshot</span><strong>Oct 22, 2026</strong></div><div class="stat-row"><span>Saved decisions</span><strong>This browser only</strong></div>'}d.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${title}</h2><button class="close" data-detail-close aria-label="Close ${title}">×</button></div>${body}`;d.showModal()}

const PAST_DECISIONS=Object.freeze([
 Object.freeze({customer:'europe',type:'Payment Delay',action:'Collect',detected:'2026-08-04',approved:'2026-08-06',completed:'2026-08-29',metric:'Cash collected',target:.5,observed:.6,leadDays:31,note:'Dated commitment agreed before the balance reached 90 days.'}),
 Object.freeze({customer:'healthcare',type:'Upcoming Renewal',action:'Renew',detected:'2026-08-18',approved:'2026-08-19',completed:'2026-09-20',metric:'Annual renewal value confirmed',target:2.7,observed:2.7,leadDays:45,note:'Renewal confirmed 45 days before expiry on unchanged terms.'}),
 Object.freeze({customer:'datacenter',type:'Margin Pressure',action:'Reprice',detected:'2026-09-02',approved:'2026-09-05',completed:'2026-09-30',metric:'Annualized operating profit improvement',target:.08,observed:.06,leadDays:null,note:'Service cost reduced; price change deferred to renewal. Below target.'})
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


function valueMetrics(){const rows=outcomeRows();const avg=key=>{const vals=rows.map(r=>r[key]).filter(Number.isFinite);return vals.length?vals.reduce((a,b)=>a+b,0)/vals.length:null};return {cash:rows.filter(r=>r.metric==='Cash collected').reduce((s,r)=>s+r.observed,0),renewal:rows.filter(r=>r.metric==='Annual renewal value confirmed').reduce((s,r)=>s+r.observed,0),lead:avg('leadDays'),cycle:avg('cycle')}}


const segmentNames=['Cloud & Data Centers','Telecom','Retail','Healthcare'];

function segData(name){const rows=customers.filter(c=>c.segment===name);const principal=sum('principal',rows),revenue=sum('revenue',rows);return {name,rows,principal,revenue,yield:rows.reduce((s,c)=>s+c.principal*c.yield,0)/principal,margin:rows.reduce((s,c)=>s+c.revenue*c.margin,0)/revenue,loss:rows.reduce((s,c)=>s+c.principal*c.loss,0)/principal}}






function matchesStatus(status,filter){return filter==='All statuses'||filter==='In Execution'&&['Approved','In Progress'].includes(status)||filter==='Completed'&&['Completed','Outcome Achieved'].includes(status)||filter==='Pending Review'&&status==='Recommended'||filter==='Rejected'&&status==='Rejected'}

function isOverdue(d){return d.targetDate<'2026-10-22'&&!['Completed','Outcome Achieved','Rejected'].includes(d.status)}

function showAssumptions(){const d=document.getElementById('action-dialog');d.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">Assumptions & demonstration boundaries</h2><button class="close" data-detail-close aria-label="Close assumptions">×</button></div><ul class="assumptions-list"><li>NexBill owns operational records and execution. LeaseAegis provides financial intelligence and decision support.</li><li>Illustrative data. All approvals, execution and outcomes are local simulations.</li><li>Fixed portfolio snapshot: October 22, 2026. NexBill records and task execution are local demonstrations.</li><li>Scores, confidence, asset counts, usage and trends are illustrative, not calibrated predictions.</li><li>Phase 2 external feeds are not connected; context does not alter risk levels before calibration.</li><li>Phase 3 forecasts and scenario ranges are planning illustrations, not validated predictions.</li><li>Phase 4 learning is not active. Meeting a verified demo outcome target applies a predefined post-action score; it does not establish that all exposure is recovered.</li><li>Q3 pilot history is read-only example data, separate from saved current decisions. Warning lead time is averaged only where measured.</li><li>Different financial measures are not added. Shared AR is counted once; uncontracted opportunities remain outside the base forecast.</li><li>Yield is annualized finance income divided by principal. Risk-adjusted yield subtracts a demo loss allowance. Margin is after funding, service and collection cost.</li><li>Decisions remain in this browser only. No live company transactions, payments, news or AI services are connected. The Advisor uses predefined briefings.</li><li>Execution tasks are illustrative checklist steps, not evidence of completed production work. Recorded outcomes do not rewrite source accounting balances.</li></ul>`;d.showModal()}
document.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;if(t.hasAttribute('data-shell-dialog'))showShellDialog(t.dataset.shellDialog);if(t.hasAttribute('data-assumptions'))showAssumptions();if(t.hasAttribute('data-detail-close'))document.getElementById('action-dialog').close();if(t.hasAttribute('data-select-option')&&decision(currentCase()).status==='Recommended'){ui.options??={};ui.options[currentCase().id]=Number(t.dataset.selectOption);render();toast('Option selected for Finance review.')}if(t.hasAttribute('data-status-filter')){ui.decisionFilter=t.dataset.statusFilter;render()}if(t.hasAttribute('data-transition'))transition(t.dataset.transition);if(t.hasAttribute('data-run-execution'))runExecution();if(t.hasAttribute('data-advisor-open'))openAdvisor();if(t.hasAttribute('data-advisor-close'))document.getElementById('advisor-panel').close();if(t.hasAttribute('data-brief')){ui.advisor=t.dataset.brief;openAdvisor()}if(t.hasAttribute('data-segment')){ui.segment=t.dataset.segment;render()}if(t.hasAttribute('data-forecast')){ui.forecast=t.dataset.forecast;render();document.querySelector(`[data-forecast="${ui.forecast}"]`).focus()}if(t.hasAttribute('data-rationale')){const f=document.getElementById('finance-review-form');f.elements.note.value=t.dataset.rationale;if(t.dataset.rationale==='Approve as recommended'){f.elements.option.value='0';f.elements.note.focus()}else f.elements[t.dataset.rationale==='Adjust target'?'target':'note'].focus()}});
document.addEventListener('change',e=>{if(e.target.id==='event-context')location.hash=route().page+'/'+e.target.value;if(e.target.id==='customer-select')location.hash='customer/'+e.target.value;if(e.target.id==='event-severity'){ui.eventFilter=e.target.value;render();document.getElementById('event-severity').focus()}if(e.target.id==='decision-filter'){ui.decisionFilter=e.target.value;render();document.getElementById('decision-filter').focus()}});
document.addEventListener('input',e=>{if(e.target.id==='event-search'){ui.search=e.target.value;render();document.getElementById('event-search').focus()}});
document.addEventListener('submit',e=>{if(e.target.id==='finance-review-form'){e.preventDefault();const c=currentCase(),d=decision(c);if(d.status!=='Recommended')return;const f=new FormData(e.target),owner=f.get('owner').trim(),note=f.get('note').trim(),due=f.get('due'),target=Number(f.get('target')),option=Number(f.get('option')),status=e.submitter?.value;if(!owner||!['Approved','Rejected'].includes(status)||!Number.isInteger(option)||!c.options[option]||!due||due<'2026-10-22'||!Number.isFinite(target)||target<=0||target>c.max){toast('Enter a valid owner, target date and outcome target.');return}Object.assign(d,{owner,note,targetDate:due,target,option,status,...(status==='Approved'?{approvedOn:SNAPSHOT}:{})});d.history.push({status,at:new Date().toISOString(),owner,note:note||'No additional rationale supplied.',option,target});if(persist(c,d)){if(ui.options)delete ui.options[c.id];render();toast(status==='Approved'?'Finance approved. Continue in NexBill for execution.':'Recommendation rejected.')}}if(e.target.id==='outcome-form'){e.preventDefault();const c=currentCase(),d=decision(c);if(d.status!=='Completed'||d.observed!==undefined)return;const f=new FormData(e.target),raw=f.get('observed'),observed=Number(raw),evidence=f.get('evidence').trim();if(raw===''||!Number.isFinite(observed)||observed<0||observed>c.max||!evidence){toast('Enter a valid measured amount and supporting result summary.');return}Object.assign(d,{observed,evidence,verifiedAt:new Date().toISOString(),status:observed>=d.target?'Outcome Achieved':'Completed'});d.history.push({status:observed>=d.target?'Outcome Achieved':'Outcome measured · below target',at:d.verifiedAt,owner:d.owner,note:`${c.metric}: ${dollars(observed)}. ${evidence}`,option:d.option,target:d.target});if(persist(c,d)){render();toast(observed>=d.target?'Outcome target achieved. The post-action assessment is now available.':'Outcome below target — risk remains open.')}}});
window.addEventListener('hashchange',()=>{for(const id of ['action-dialog','advisor-panel','detail-drawer'])document.getElementById(id).close();render();window.scrollTo(0,0);document.getElementById('main').focus({preventScroll:true})});
const SNAPSHOT='2026-10-22', RETURN_HURDLE=8, RISK_APPETITE=1;
const STAGES=[['event','Event'],['signals','Signals'],['risk','Risk'],['impact','Impact'],['options','Options'],['decide','Decide']];
const EXTERNAL_CATEGORIES=['Credit','Industry','Sentiment','Market','Business developments'];
const plural=(n,word)=>`${n} ${word}${Number(n)===1?'':'s'}`;
const slug=s=>s.toLowerCase().replace(/ & /g,'-').replace(/\s+/g,'-');
function info(text){return `<span class="info" tabindex="0" role="note" aria-label="${esc(text)}">ⓘ<span class="tooltip">${esc(text)}</span></span>`}
function tabs(id,items,active){return `<nav class="workspace-tabs" aria-label="${esc(id)}">${items.map(([key,label,href])=>`<a href="${href}" class="${key===active?'selected':''}" ${key===active?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`}
function drawer(title,body){const d=document.getElementById('detail-drawer');d.innerHTML=`<div class="dialog-head"><h2>${esc(title)}</h2><button data-drawer-close aria-label="Close details">×</button></div><div class="drawer-body">${body}</div>`;d.showModal()}
function expandRow(button){const row=document.getElementById(button.dataset.expand);if(row){row.hidden=!row.hidden;button.setAttribute('aria-expanded',String(!row.hidden))}}
function route(){const p=location.hash.slice(1).split('/'),valid=CASES.some(c=>c.id===p[1]);if(p[0]==='nexbill')return {page:'nexbill',module:['billing','collections','contracts','customers','portfolio'].includes(p[1])?p[1]:'billing',id:p[2]?.startsWith('@')?undefined:p[2],customerId:p[2]?.startsWith('@')?p[2].slice(1):undefined};if(p[0]==='events')return {page:'events',id:valid?p[1]:'payment',stage:STAGES.some(s=>s[0]===p[2])?p[2]:'event'};if(p[0]==='customer')return {page:'customer',customerId:customers.some(c=>c.id===p[1])?p[1]:'telecom'};if(p[0]==='decisions')return {page:'decisions',tab:['pending','execution','outcomes','rejected'].includes(p[1])?p[1]:'pending'};if(p[0]==='portfolio')return {page:'portfolio',segment:segmentNames.find(s=>slug(s)===p[1])||segmentNames[0],tab:['segment','performance','trend'].includes(p[2])?p[2]:'segment'};if(p[0]==='forecast')return {page:'forecast',scenarios:p[1]?p[1].split('+').filter(s=>['slip','expansion'].includes(s)):['slip']};return {page:'dashboard',tab:['risks','opportunity','planning'].includes(p[1])?p[1]:'risks'}}
function redirectLegacy(){const p=location.hash.slice(1).split('/'),map={signals:'signals',analysis:'risk',impact:'impact',recommendations:'options'};let target;if(map[p[0]])target=`#events/${CASES.some(c=>c.id===p[1])?p[1]:'payment'}/${map[p[0]]}`;else if(p[0]==='decisions'&&CASES.some(c=>c.id===p[1]))target=`#events/${p[1]}/decide`;else if(p[0]==='outcomes')target='#decisions/outcomes';if(target){location.replace(target);return true}return false}
function go(stage,c=currentCase()){return '#events/'+c.id+'/'+({events:'event',analysis:'risk',recommendations:'options',decisions:'decide'}[stage]||stage)}
function head(title,sub,extra=''){return `<div class="page-head"><div><h1>${title}</h1><p class="subtitle">${sub}</p></div>${extra}</div>`}
function ranked(rows){return [...rows].sort((a,b)=>({High:0,Medium:1,Low:2}[a.severity]-{High:0,Medium:1,Low:2}[b.severity])||b.amount-a.amount||a.next.localeCompare(b.next))}
function grouped(rows){const groups=new Map();for(const c of ranked(rows)){if(!groups.has(c.customer))groups.set(c.customer,[]);groups.get(c.customer).push(c)}return [...groups.values()]}
function shared(c){return c.customer==='telecom'?'<span class="pill">Shared $4.5M · counted once</span>':''}
function metricsStrip(){const v=valueMetrics();return `<div class="metric-strip">${[[money(totals.principal),'Portfolio value','PORTFOLIO','#portfolio'],[money(totals.overdue),'Collection exposure','','#portfolio'],[customers.filter(c=>c.renewal<=30).length,'Renewals ≤30 days','','#forecast'],[money(v.cash),'Cash collected','VALUE DELIVERED · PILOT','#decisions/outcomes'],[money(v.renewal),'Renewal value confirmed','','#decisions/outcomes'],[plural(v.lead.toFixed(1),'day'),'Avg. warning lead time','','#decisions/outcomes']].map(([value,label,group,href],i)=>`<a href="${href}" class="metric ${i===3?'divider':''}"><small>${group||'&nbsp;'}</small><strong>${value}</strong><span>${label}</span></a>`).join('')}</div>`}
function overview(){const groups=grouped(CASES.filter(c=>decision(c).status==='Recommended')),tab=route().tab;return head('Dashboard','What requires my attention today?')+`<section class="narrative"><strong>Finance has data. LeaseAegis turns it into decisions.</strong><span>Finance does not need more reports. It needs better decisions.</span><a class="button" href="#events/payment/event">Start the walkthrough →</a></section>`+metricsStrip()+`<div class="fill-grid dashboard-grid"><section class="panel flex-panel"><h2>Decisions needed today</h2><div class="list-scroll"><table class="today-table"><tbody>${groups.map((group,i)=>{const c=group[0];return `<tr data-pending-cases="${group.map(x=>x.id).join(' ')}"><td><button class="row-toggle" data-expand="today-${i}" aria-expanded="false">${account(c).name}<small>${c.title}</small></button><span class="pill blue">${c.actionType}</span> ${group.length>1?info(group.map(x=>x.type).join('; ')):''}${group.filter(x=>['payment','credit'].includes(x.id)).length>1?'<small>Payment · Credit · Margin context</small>':''}</td><td><strong>${c.customer==='telecom'?'$4.5M':dollars(c.amount)}</strong><small>${c.customer==='telecom'?'shared exposure':c.amountLabel}</small><small>Review by ${dateLabel(c.next)}</small></td><td><a class="button" href="${go('decide',c)}">Decide →</a></td></tr><tr hidden id="today-${i}" class="expanded-row"><td colspan="3"><strong>${c.rec}</strong><p>${c.benefit}</p>${c.options.map((o,j)=>`<p>${'ABC'[j]} · ${o[0]} — ${o[1]}</p>`).join('')}${group.length>1?group.slice(1).map(x=>`<a href="${go('decide',x)}">${x.type} →</a> `).join(''):''}</td></tr>`}).join('')||'<tr><td>No decisions awaiting review.</td></tr>'}</tbody></table></div></section><section class="panel flex-panel">${tabs('Dashboard priorities',[['risks','Top risks','#dashboard/risks'],['opportunity','Opportunity','#dashboard/opportunity'],['planning','Portfolio & Forecast','#dashboard/planning']],tab)}<div class="tab-body">${tab==='risks'?`<div id="top-risks" class="list-scroll">${grouped(CASES.filter(c=>c.category!=='Growth Opportunity'&&!isResolved(c))).slice(0,4).map((g,i)=>`<article class="compact-risk" data-risk-cases="${g.map(c=>c.id).join(' ')}"><span class="rank">${i+1}</span><div>${customerLink(account(g[0]))}<p>${g[0].category} ${badge(g[0].severity)}</p><small>${g.length} related ${g.length===1?'event':'events'}</small></div><a href="${go('risk',g[0])}">${g[0].customer==='telecom'?'$4.5M':dollars(g[0].amount)} →${g[0].customer==='telecom'?'<small>shared exposure</small>':''}</a></article>`).join('')}</div>`:tab==='opportunity'?`<h2>Cloud Infrastructure Provider</h2><div class="hero-number">$4.0M</div><span class="pill">Uncontracted</span><p>Validate budget and procurement timing before committing capacity.</p><a class="button" href="#events/expansion/options">Review opportunity →</a>`:`<a class="mini-chart-link" href="#portfolio"><h3>Portfolio Optimization →</h3>${portfolioPlot(true)}</a><a class="mini-chart-link" href="#forecast"><h3>Forecast Intelligence →</h3>${forecastChart(['slip'],true)}</a>`}</div></section></div>`}
function businessEvents(){const c=currentCase(),stage=route().stage,idx=STAGES.findIndex(s=>s[0]===stage),groups=grouped(CASES.filter(x=>(ui.eventFilter==='All events'||ui.eventFilter===x.severity)&&`${account(x).name} ${x.title} ${x.type}`.toLowerCase().includes(ui.search.toLowerCase())));return head('Business Events','Evidence → impact → options → decision')+`<div class="event-workspace"><aside class="event-list panel"><input id="event-search" type="search" placeholder="Search events or customers" aria-label="Search events" value="${esc(ui.search)}"><select id="event-severity" aria-label="Severity">${['All events','High','Medium','Low'].map(v=>`<option ${v===ui.eventFilter?'selected':''}>${v}</option>`).join('')}</select><div class="list-scroll">${[false,true].map(resolved=>groups.map(group=>{const rows=group.filter(x=>isResolved(x)===resolved);return rows.length?`<div class="event-customer-group"><small>${account(rows[0]).name}</small>${rows.map(x=>`<a class="event-item ${x.id===c.id?'selected':''} ${resolved?'resolved':''}" href="${go(stage,x)}"><span class="severity-dot ${x.severity}"></span><strong>${x.type}</strong><small>${x.id==='payment'?'$4.5M shared AR':x.id==='credit'?'Shared Telecom AR':dollars(x.amount)}</small>${resolved?'<span class="pill">Resolved</span>':statusBadge(decision(x).status)}</a>`).join('')}</div>`:''}).join('')).join('')}</div></aside><section class="event-detail panel"><div class="event-heading"><div><h2>${c.title}</h2>${customerLink(account(c))} ${badge(c.severity)} ${statusBadge(decision(c).status)}</div><div><strong>${dollars(c.amount)}</strong> ${info(c.amountLabel)} ${shared(c)}<small>Review by ${dateLabel(c.next)} · <a href="${hostLink(executionModule(c),c)}">NexBill record ↗</a></small></div></div>${tabs('Event stages',STAGES.map(([s,label],i)=>[s,`${i+1} ${label}`,go(s,c)]),stage)}<div class="stage-body" data-stage="${stage}">${({event:eventStage,signals:signalStage,risk:riskStage,impact:impactStage,options:optionStage,decide:decideStage}[stage])(c)}</div><div class="stage-controls">${idx?`<a class="button" href="${go(STAGES[idx-1][0],c)}">← Back</a>`:'<span></span>'}${idx<5?`<a class="button primary" href="${go(STAGES[idx+1][0],c)}">Next: ${STAGES[idx+1][1]} →</a>`:'<a href="#decisions/pending">Decision register →</a>'}</div></section></div>`}
function eventStage(c){const related=CASES.filter(x=>x.customer===c.customer&&x.id!==c.id);return `<div class="stage-columns"><section><h3>What changed</h3><p>${c.description}</p><h3>Business impact</h3><p>${c.impact}</p><div class="timeline-mini">${[['Detected',dateLabel(c.detected)],['Evidence snapshot',dateLabel(SNAPSHOT)],['Next review',dateLabel(c.next)]].map(([l,v])=>`<div><i></i><small>${l}</small><strong>${v}</strong></div>`).join('')}</div><h3>Recommended next step</h3><p>${c.rec}</p></section><section class="soft-card"><h3>Related events for this customer</h3>${related.map(x=>`<div class="related-event"><a href="${go('event',x)}">${x.type} →</a><p>${x.customer==='telecom'?'Shares the same $4.5M AR; not additive.':x.impact}</p>${statusBadge(decision(x).status)}</div>`).join('')||'<p>No other active event for this customer.</p>'}</section></div>`}
function sparkline(values,labels){const x=i=>12+i*184/Math.max(1,values.length-1),y=v=>40-v/100*28,last=values.length-1;return `<svg class="sparkline" viewBox="0 0 240 64" role="img" aria-label="Risk score trend, 0 to 100. ${esc(labels.map((l,i)=>l+': '+values[i]).join('; '))}" data-y-min="0" data-y-max="100"><polyline points="${values.map((v,i)=>x(i)+','+y(v)).join(' ')}" fill="none" stroke="#3279d9" stroke-width="2"/><circle cx="${x(last)}" cy="${y(values[last])}" r="3" fill="#3279d9"/><text class="spark-value" x="${x(last)+9}" y="${y(values[last])+4}">${values[last]}</text><text x="12" y="59">${labels[0]}</text><text x="196" y="59" text-anchor="end">${labels[last]}</text></svg>`}
function signalStage(c){return `<div class="signal-summary"><strong>Evidence ${c.strength}/100 · ${c.confidence} confidence</strong><div class="sparkline-group"><span>Risk score trend · 0–100</span>${sparkline(isResolved(c)?[...c.history,c.postScore]:c.history,isResolved(c)?['Jun','Jul','Aug','Sep','Oct','Nov']:['Jun','Jul','Aug','Sep','Oct'])}</div></div><div class="signals-layout"><section><h3>Internal signals</h3><div class="domain-grid">${INTERNAL_DOMAINS.map(([key,label])=>`<button class="domain-card ${key==='change'?'core':''}" data-signal="${key}"><strong>${label} ${key==='change'?'<span class="pill blue">Core</span>':''}</strong><span>${c.internal[key]}</span><small>View evidence ↗</small></button>`).join('')}</div></section><section class="external-box"><h3>External signals <span class="pill">Phase 2 feeds</span></h3>${c.external.map((text,i)=>`<div class="external-item"><strong>${EXTERNAL_CATEGORIES[i]}</strong><p>${text}</p></div>`).join('')}</section></div>`}
function riskStage(c){return `<div class="stage-columns risk-layout"><section><h2>${c.category} ${badge(c.severity)}</h2><div class="hero-number" data-current-score="${riskScore(c)}">${isResolved(c)?c.score+' → '+c.postScore:c.score}<small>/ 100</small></div><p>${isResolved(c)?'Improving · preset post-action score':c.trend} · ${c.confidence} confidence</p><p>${c.summary}</p><div class="secondary-risks">${c.secondary.map(([name,level])=>`<span>${name} ${badge(level)}</span>`).join('')}</div><div class="evidence-chain"><div><strong>Evidence</strong><p>${c.driver}</p></div><div><strong>Assessment</strong><p>${c.category}</p></div><div><strong>Consequence</strong><p>${c.impact}</p></div></div>${belowTarget(c)?'<span class="pill High">Below target · risk remains open</span>':''}</section><section><h3>Portfolio risk map</h3><div class="risk-map">${CASES.map(x=>`<a class="risk-cell ${x.id===c.id?'selected':''}" href="${go('risk',x)}"><strong>${x.type}</strong><span>${riskScore(x)} / 100</span><small>${account(x).name}</small></a>`).join('')}</div></section></div>`}
function impactStage(c){const shown=IMPACTS[c.id].filter(x=>!/^(Not quantified|Not estimated|No change booked)$/.test(x[1])),omitted=IMPACTS[c.id].filter(x=>/^(Not quantified|Not estimated)$/.test(x[1])),unchanged=IMPACTS[c.id].filter(x=>x[1]==='No change booked'),label=x=>{const n=x.replace(/ Impact$/i,'').toLowerCase();return n[0].toUpperCase()+n.slice(1)};return `<div class="impact-total"><strong>${dollars(c.amount)}</strong><span>${c.amountLabel}</span>${shared(c)}${c.id==='expansion'?'<span class="pill">Uncontracted · not in base</span>':''}</div><div class="impact-grid compact">${shown.map(([label,value,desc])=>`<article class="soft-card"><h3>${label} ${info(desc)}</h3><strong>${value}</strong><p>${desc}</p></article>`).join('')}</div>${unchanged.length?`<p class="muted">No change booked: ${unchanged.map(x=>label(x[0])).join(', ')} ${info(unchanged.map(x=>x[2]).join(' '))}</p>`:''}${omitted.length?`<p class="muted">Not quantified: ${omitted.map(x=>label(x[0])).join(', ')}</p>`:''}<div class="therefore"><strong>Therefore → ${c.rec}</strong><span>Outcome target ${dollars(c.target)} · ${c.metric}</span></div>`}
function optionStage(c){const d=decision(c),selected=ui.options?.[c.id]??d.option;return `<div class="option-heading"><span class="pill blue">${c.actionType}</span>${info(ACTION_TRIGGERS.map(x=>x.join(': ')).join(' · '))}<span>${c.rec}</span></div><div class="options-grid">${c.options.map((o,i)=>`<article class="option-card ${i===0?'recommended':''} ${i===selected?'chosen':''}"><div class="action-meta">Option ${'ABC'[i]} ${i===0?'<span class="pill blue">Recommended</span>':''}</div><h2>${o[0]}</h2><p>${o[1]}</p><dl><dt>Benefit</dt><dd>${o[2]}</dd><dt>Trade-off</dt><dd>${o[3]}</dd></dl><button data-select-option="${i}" ${d.status!=='Recommended'?'disabled':''}>${i===selected?'Selected':'Choose option '+ 'ABC'[i]}</button></article>`).join('')}</div>`}
function distinction(c,d){return `<div class="decision-distinction"><div><span>Recommendation</span><strong>${c.options[0][0]}</strong></div><div><span>Finance decision</span><strong>${d.status==='Recommended'?'Pending Review':c.options[d.option][0]}</strong></div><div><span>NexBill execution</span><strong>${['In Progress','Completed','Outcome Achieved'].includes(d.status)?d.status==='In Progress'?'In progress':'Completed':'Not started'}</strong></div></div>`}
function taskList(c,d){return `<ol class="execution-tasks">${EXECUTION_TASKS[executionModule(c)].map((v,i)=>`<li class="${d.executionSteps?.includes(i)?'done':''}"><span>${d.executionSteps?.includes(i)?'✓':'○'}</span>${v}</li>`).join('')}</ol>`}
function decideStage(c){const d=decision(c),selected=ui.options?.[c.id]??d.option;return distinction(c,d)+(d.status==='Recommended'?`<form id="finance-review-form"><div class="review-fields"><label>Selected option<select name="option">${c.options.map((o,i)=>`<option value="${i}" ${i===selected?'selected':''}>${'ABC'[i]} · ${o[0]}</option>`).join('')}</select></label><label>Decision owner<input name="owner" maxlength="120" value="${esc(d.owner)}" required></label><label>Target date<input name="due" type="date" min="${SNAPSHOT}" value="${esc(d.targetDate)}" required></label><label>Target · USD M<input name="target" type="number" min="0.001" max="${c.max}" step="0.001" value="${d.target}" required></label></div><div class="decision-second-row"><label>Rationale (optional)<textarea name="note" rows="3" maxlength="2000"></textarea></label><div class="rationale-shortcuts">${['Approve as recommended','Adjust target','Insufficient evidence'].map(x=>`<button type="button" data-rationale="${x}">${x}</button>`).join('')}</div><div class="form-actions"><button type="submit" name="decision" value="Rejected">Reject</button><button class="primary" type="submit" name="decision" value="Approved">Approve</button></div></div></form>`:['Approved','In Progress'].includes(d.status)?`<p>Finance selected: <strong>${c.options[d.option][0]}</strong> · Target ${dollars(d.target)}</p>${taskList(c,d)}<a class="button primary" href="${hostLink(executionModule(c),c)}">Open in NexBill →</a>`:d.status==='Rejected'?`<p>${esc(d.note||'Recommendation rejected.')}</p><button data-transition="Recommended">Reopen Finance review</button>`:d.observed===undefined?`<h3>Outcome measurement</h3><p>Execution completed. Record the measured result against ${dollars(d.target)}.</p><form id="outcome-form"><div class="outcome-fields"><label>${c.metric} · USD M<input name="observed" type="number" min="0" max="${c.max}" step="0.001" required></label><label>Evidence / result summary<input name="evidence" maxlength="1000" required></label><button class="primary" type="submit">Record simulated outcome</button></div></form>`:`<div class="result-metrics">${kpi('Target',dollars(d.target),c.metric)}${kpi('Observed',dollars(d.observed),'Simulated measurement')}${kpi('Attainment',Math.round(d.observed/d.target*100)+'%',d.status==='Outcome Achieved'?'Target achieved':'Below target · risk remains open')}</div><p>${esc(d.evidence||'Legacy result')}</p><h3>${d.status==='Outcome Achieved'?`${c.score} → ${c.postScore} · post-action score`:'Risk score unchanged · '+c.score}</h3>`)+`<button class="history-link" data-history="${c.id}">View history (${d.history.length+1}) →</button>`}
function customer(){const a=customers.find(x=>x.id===route().customerId),cases=CASES.filter(c=>c.customer===a.id),rec=CUSTOMER_SIGNALS[a.id],ext=EXTERNAL_CATEGORIES.map((category,i)=>[category,cases.map(c=>c.external[i]).find(v=>v&&!/^No\b/.test(v))]).filter(x=>x[1]);return head('Customer 360',a.segment+' · '+a.country,`<select id="customer-select" aria-label="Select customer">${customers.map(x=>`<option value="${x.id}" ${x.id===a.id?'selected':''}>${x.name}</option>`).join('')}</select>`)+`<div class="customer-strip"><strong>${a.name}</strong>${a.id==='telecom'?'<span class="pill shared-pill">Shared $4.5M · counted once</span>':''}${[['Open AR',money(a.ar)],['Overdue',money(a.overdue)],['Annual revenue',money(a.revenue)],['Margin',pct(a.margin)],['Renewal in',plural(a.renewal,'day')]].map(([l,v])=>`<span><small>${l}</small><b>${v}</b></span>`).join('')}<a href="#nexbill/customers/@${a.id}">NexBill record ↗</a></div><div class="fill-grid customer-layout"><section class="panel"><h2>Internal signals</h2>${[['AR aging',rec.collection],['Contract behavior',rec.change],['Usage',rec.usage],['Margin & yield',`${rec.profitability}<small class="yield-line">Portfolio yield ${pct(a.yield)}</small>`],['Renewal',plural(a.renewal,'day')]].map(([l,v])=>`<div class="compact-signal"><h3>${l}</h3><p>${v}</p></div>`).join('')}</section><section class="panel flex-panel"><h2>Risks & actions</h2><div class="list-scroll">${cases.filter(c=>c.category!=='Growth Opportunity').map(customerRiskCard).join('')||'<p>No active risk event.</p>'}<h3>Opportunity</h3>${cases.filter(c=>c.category==='Growth Opportunity').map(customerRiskCard).join('')||'<p>No qualified active opportunity.</p>'}</div></section><section class="panel external-box"><h2>External signals <span class="pill">Phase 2</span></h2>${ext.map(([label,text])=>`<div class="external-item" data-external-category="${label}"><h3>${label}</h3><p>${text}</p></div>`).join('')||'<p>No active external signal for this customer.</p>'}</section></div>`}
function customerRiskCard(c){return `<article class="customer-risk"><h3><a href="${go('risk',c)}">${c.category}</a> ${isResolved(c)?'<span class="pill">Resolved</span>':badge(c.severity)}</h3>${c.secondary.map(([l,v])=>`<small>${l} ${v}</small>`).join('')}<p>${c.rec}</p><div><span class="pill blue">${c.actionType}</span> ${statusBadge(decision(c).status)} <a href="${go('decide',c)}">Decide →</a></div></article>`}
function quadrant(s){return s.yield>=RETURN_HURDLE?s.loss<RISK_APPETITE?'Grow':'Protect and reprice':s.loss<RISK_APPETITE?'Improve margin':'Restructure or exit'}
function portfolioPlot(mini=false){const x=v=>65+v/2*490,y=v=>400-(v-6)/5*370;return `<svg class="portfolio-plot ${mini?'mini':''}" viewBox="0 0 620 470" preserveAspectRatio="xMidYMin meet" role="img" aria-label="Return versus expected loss allowance. Return hurdle 8.0 percent; risk appetite 1.0 percent."><rect x="65" y="30" width="245" height="222" fill="#e9f5ef"/><rect x="310" y="30" width="245" height="222" fill="#edf2fc"/><rect x="65" y="252" width="245" height="148" fill="#f5f6ed"/><rect x="310" y="252" width="245" height="148" fill="#fbf0ec"/><path d="M65 30V400H555 M${x(RISK_APPETITE)} 30V400 M65 ${y(RETURN_HURDLE)}H555" fill="none" stroke="#b3c3d8" stroke-dasharray="4 4"/>${[[84,50,'Grow'],[340,50,'Protect and reprice'],[84,382,'Improve margin'],[340,382,'Restructure or exit']].map(([x,y,l])=>`<text x="${x}" y="${y}" class="quadrant-name">${l}</text>`).join('')}${[6,8,10,11].map(v=>`<text x="56" y="${y(v)+4}" text-anchor="end">${v}%</text>`).join('')}${[0,.5,1,1.5,2].map(v=>`<text x="${x(v)}" y="424" text-anchor="middle">${v}%</text>`).join('')}<text x="65" y="15">Return · weighted yield</text><text x="65" y="451">Return hurdle 8.0% · Risk appetite 1.0% loss allowance</text>${segmentNames.map(name=>{const s=segData(name),radius=Math.sqrt(s.principal)*2.6,labelWidth=name.length*6.3,right=x(s.loss)+radius+8,left=right+labelWidth>555,labelX=left?x(s.loss)-radius-8:right,bubble=`<circle cx="${x(s.loss)}" cy="${y(s.yield)}" r="${Math.sqrt(s.principal)*2.6}" fill="${name===route().segment?'#286bc4':'#6a98d4'}" fill-opacity=".8" stroke="${name===route().segment?'#184d8c':'none'}" stroke-width="2"/><text x="${labelX}" y="${y(s.yield)+4}" text-anchor="${left?'end':'start'}" class="bubble-label">${name}</text><title>${name}: ${pct(s.yield)} yield, ${s.loss.toFixed(2)}% loss, ${money(s.principal)} principal. ${quadrant(s)}</title>`;return mini?`<g>${bubble}</g>`:`<a href="#portfolio/${slug(name)}/${route().tab||'segment'}" data-quadrant="${quadrant(s)}">${bubble}</a>`}).join('')}</svg>`}
function portfolio(){const r=route(),s=segData(r.segment);return head('Portfolio Optimization','Analyze → Assess profitability → Weigh risk → Recommend')+`<div class="fill-grid portfolio-layout"><section class="panel flex-panel"><h2>Return × Risk ${info('Bubble area represents financed principal. Return uses principal-weighted yield; risk uses principal-weighted expected loss allowance.')}</h2>${portfolioPlot()}</section><section class="panel flex-panel">${tabs('Portfolio detail',[['segment','Segment',`#portfolio/${slug(s.name)}/segment`],['performance','Performance',`#portfolio/${slug(s.name)}/performance`],['trend','Profitability trend',`#portfolio/${slug(s.name)}/trend`]],r.tab)}<div class="tab-body">${r.tab==='segment'?`<h2>${s.name}</h2><div class="segment-kpis">${kpi('Principal',money(s.principal),'')}${kpi('Yield',pct(s.yield),'')}${kpi('Loss allowance',s.loss.toFixed(2)+'%','')}</div><div class="insight"><strong>${quadrant(s)}</strong><p>Return ${s.yield>=RETURN_HURDLE?'meets':'is below'} the 8.0% hurdle; risk ${s.loss<RISK_APPETITE?'is within':'exceeds'} the 1.0% appetite.</p></div><div class="list-scroll">${s.rows.map(a=>`<article class="compact-signal">${customerLink(a)}<p>${pct(a.margin)} operating margin · ${money(a.revenue)} annual revenue</p>${relatedCase(a)?`<a href="${go('options',relatedCase(a))}">${relatedCase(a).actionType} →</a>`:'Monitor · scheduled review'}</article>`).join('')}</div>`:r.tab==='performance'?`<div class="list-scroll"><table><thead><tr><th>Segment</th><th>Principal</th><th>Revenue</th><th>Yield</th><th>Margin</th><th>Loss</th><th>Risk-adjusted yield</th></tr></thead><tbody>${segmentNames.map(n=>{const x=segData(n);return `<tr><td><a href="#portfolio/${slug(n)}">${n}</a><small>${quadrant(x)}</small></td><td>${money(x.principal)}</td><td>${money(x.revenue)}</td><td>${pct(x.yield)}</td><td>${pct(x.margin)}</td><td>${x.loss.toFixed(2)}%</td><td>${pct(x.yield-x.loss)}</td></tr>`}).join('')}</tbody></table></div>`:profitabilityPanel()}</div></section></div>`}
function forecastChart(keys=['slip'],mini=false){const actual=[5,5.2,5.1,5.3],base=FORECASTS.base.values,range=[.2,.35,.5,.65],labels=["Q4'25","Q1'26","Q2'26","Q3'26","Q4'26","Q1'27","Q2'27","Q3'27"],x=i=>55+i*95,y=v=>365-(v-4)/3.5*355,pts=(arr,start=3)=>arr.map((v,i)=>`${x(i+start)},${y(v)}`).join(' ');return `<svg class="forecast-chart ${mini?'mini':''}" viewBox="0 0 780 420" preserveAspectRatio="xMidYMin meet" role="img" aria-label="Projected cash inflow. Base case${keys.map(k=>'; '+FORECASTS[k].name+' gap '+forecastGap(k).toFixed(1)+' million').join('')}">${[4,5,6,7,7.5].map(v=>`<line x1="55" x2="730" y1="${y(v)}" y2="${y(v)}" stroke="#e4ebf4"/><text x="18" y="${y(v)+4}">${v.toFixed(1)}</text>`).join('')}<text x="55" y="32">Actual · USD M</text><text x="435" y="25">Forecast</text><polygon points="${base.map((v,i)=>`${x(i+4)},${y(v+range[i])}`).concat(base.map((v,i)=>`${x(i+4)},${y(v-range[i])}`).reverse()).join(' ')}" fill="#dceaff"/><line x1="${x(3.5)}" x2="${x(3.5)}" y1="10" y2="370" stroke="#9aafc8" stroke-dasharray="4 4"/><polyline points="${pts(actual,0)}" fill="none" stroke="#243f62" stroke-width="3"/><polyline data-scenario-line="base" points="${pts([actual[3],...base])}" fill="none" stroke="#3279d9" stroke-width="3"/>${keys.map(k=>`<polyline data-scenario-line="${k}" points="${pts([actual[3],...FORECASTS[k].values])}" fill="none" stroke="${k==='slip'?'#d58a36':'#258d79'}" stroke-width="3" stroke-dasharray="6 4"/>`).join('')}${labels.map((l,i)=>`<text x="${x(i)}" y="400" text-anchor="middle">${l}</text>`).join('')}</svg>`}
function forecastGap(k){return FORECASTS[k].values.reduce((a,b)=>a+b,0)-FORECASTS.base.values.reduce((a,b)=>a+b,0)}
function forecast(){const keys=route().scenarios;return head('Forecast Intelligence','Act on the gap before it reaches the books.',`<span class="pill blue">Predictive features · Phase 3</span>${info('Forecasting uses contract schedules, billing and payment assumptions. Scenarios compare timing; annual revenue buckets are separate from quarterly cash receipts.')}`)+`<div class="fill-grid forecast-layout"><section class="panel flex-panel"><h2>Projected cash inflow</h2><div class="scenario-toggles"><span class="scenario-fixed" aria-disabled="true" title="The base case is always shown">Base case · always on</span>${['slip','expansion'].map(k=>`<button data-scenario="${k}" aria-pressed="${keys.includes(k)}" class="${keys.includes(k)?'selected':''}">${FORECASTS[k].name}</button>`).join('')}</div>${forecastChart(keys)}<div class="legend"><span>● Actual</span><span class="base-legend">● Base</span><span class="slip-legend">● Renewals slip</span><span class="upside-legend">● Expansion contracted</span><span>Shaded: base range</span></div><p class="muted">Uncontracted upside is excluded from base. Range is illustrative.</p></section><section class="forecast-side"><div class="panel forecast-kpis">${kpi('Contracted',money(sum('revenue',customers.filter(c=>c.renewal>90))),'Annual revenue · renewal >90 days')}${kpi('Renewal-dependent',money(sum('revenue',customers.filter(c=>c.renewal<=90))),'Annual revenue · renewal ≤90 days')}${kpi('At risk',money(sum('revenue',customers.filter(c=>c.renewal<=90&&c.risk==='High'))),'Subset · not additional exposure')}</div><div class="panel gap-panel"><h2>Gap vs base ${info("Cumulative Q4'26–Q3'27 projected cash less base; separate from annual revenue above.")}</h2>${keys.map(k=>`<article><h3>${FORECASTS[k].name}</h3><strong class="gap-number" data-gap="${k}">${forecastGap(k)<0?'−':'+'}$${Math.abs(forecastGap(k)).toFixed(1)}M</strong>${info(FORECASTS[k].assumption)}<p>${k==='slip'?'Three renewals each start one quarter later.':'Conditional on contracting and timely delivery.'}</p><a href="${go('options',CASES.find(c=>c.id===FORECASTS[k].caseId))}">Act on the gap →</a></article>`).join('')||'<p>Select a scenario to see the gap</p>'}</div></section></div>`}
function outcomeRows(){return [...PAST_DECISIONS.map(d=>({...d,source:'Q3 pilot history',cycle:daysBetween(d.detected,d.approved)})),...CASES.flatMap(c=>{const d=decision(c);return Number.isFinite(d.observed)?[{customer:c.customer,type:c.type,action:c.actionType,metric:c.metric,target:d.target,observed:d.observed,leadDays:Number.isFinite(d.leadDays)?d.leadDays:null,cycle:daysBetween(c.detected,d.approvedOn||SNAPSHOT),note:d.evidence||'Legacy outcome',source:'Current browser',caseId:c.id}]:[]})]}
function valueDelivered(){const v=valueMetrics();return `<div class="outcome-metrics">${[[money(v.cash),'Cash collected'],[money(v.renewal),'Renewal value confirmed'],[v.lead===null?'n/a':plural(v.lead.toFixed(1),'day'),'Avg. warning lead time'],[v.cycle===null?'n/a':plural(v.cycle.toFixed(1),'day'),'Avg. decision cycle']].map(([n,l])=>kpi(l,n,'')).join('')}</div>`}
function outcomes(){return valueDelivered()+`<div class="panel list-scroll"><table><thead><tr><th>Customer / event</th><th>Action</th><th>Target</th><th>Observed</th><th>Attainment</th><th>Lead time</th><th>Cycle</th></tr></thead><tbody>${outcomeRows().map((r,i)=>`<tr><td><button class="row-toggle" data-expand="outcome-${i}" aria-expanded="false">${customers.find(a=>a.id===r.customer).name}<small>${r.type} · ${r.source}</small></button></td><td>${r.action}</td><td>${dollars(r.target)}${info(r.metric)}</td><td>${dollars(r.observed)}</td><td>${Math.round(r.observed/r.target*100)}%</td><td>${Number.isFinite(r.leadDays)?plural(r.leadDays,'day'):'n/a'}</td><td>${Number.isFinite(r.cycle)?plural(r.cycle,'day'):'n/a'}</td></tr><tr hidden id="outcome-${i}" class="expanded-row"><td colspan="7"><p>${esc(r.note)}</p><a href="#customer/${r.customer}">Customer 360 →</a> ${r.caseId?`<a href="${go('decide',CASES.find(c=>c.id===r.caseId))}">Decision →</a>`:''}</td></tr>`).join('')}</tbody></table></div><p class="phase-note">Phase 4 · Learning is not active. Post-action scores follow a preset rule.</p>`}
function decisionCenter(){const tab=route().tab,filter={pending:'Pending Review',execution:'In Execution',outcomes:'Completed',rejected:'Rejected'},rows=CASES.filter(c=>matchesStatus(decision(c).status,filter[tab])),c=rows.find(c=>c.id===ui.registerSelection)||rows[0],d=c&&decision(c);return head(tab==='outcomes'?'Outcome Review':'Decision Center',tab==='outcomes'?'Measured results of Finance decisions.':'Finance decides. NexBill executes.')+tabs('Decision register',Object.keys(filter).map(k=>[k,`${k==='pending'?'Pending':k==='execution'?'Execution':k==='outcomes'?'Outcomes':'Rejected'} (${k==='outcomes'?outcomeRows().length:CASES.filter(c=>matchesStatus(decision(c).status,filter[k])).length})`,'#decisions/'+k]),tab)+(tab==='outcomes'?`<div class="outcomes-body">${outcomes()}</div>`:`<div class="fill-grid register-layout"><section class="panel list-scroll"><table><thead><tr><th>Customer / event</th><th>Action</th><th>Owner</th><th>Target date</th><th>Status</th><th>Result</th></tr></thead><tbody>${rows.map(x=>{const v=decision(x);return `<tr class="${x.id===c?.id?'selected-record':''}"><td><button class="row-toggle" data-register="${x.id}">${account(x).name}<small>${x.type}</small></button></td><td>${x.actionType}</td><td>${esc(v.owner)}</td><td>${dateLabel(v.targetDate)}${isOverdue(v)?'<span class="pill High">Overdue</span>':''}</td><td>${statusBadge(v.status)}</td><td>${Number.isFinite(v.observed)?dollars(v.observed):'—'}</td></tr>`}).join('')}</tbody></table>${!rows.length?'<p>No decisions in this status.</p>':''}</section><section class="panel register-detail">${c?`<h2>${c.type}</h2>${customerLink(account(c))}${distinction(c,d)}<p>Target ${dollars(d.target)} · ${c.metric}</p><p>Owner: ${esc(d.owner)}</p><h3>Recent history</h3><ul>${d.history.slice(-3).map(h=>`<li>${esc(h.status)}<small>${esc(h.note)}</small></li>`).join('')||'<li>Recommendation awaiting Finance review.</li>'}</ul><a class="button primary" href="${go('decide',c)}">Open event workspace →</a>`:'<p>Select a decision to review.</p>'}</section></div>`)}
function hostWorkspace(module,c){const r=route(),a=customers.find(x=>x.id===r.customerId)||account(c),linked=r.customerId?relatedCase(a):c;return head(moduleTitle(module),'NexBill operational records & execution',`<a href="${esc(ui.returnHash||'#customer/'+a.id)}">Return to LeaseAegis →</a>`)+`<div class="fill-grid host-layout"><section class="host-left">${!r.customerId&&module===executionModule(c)?executionPanel(module,c):`<section class="panel"><h2>NexBill record summary</h2><h3>${customerLink(a)}</h3><p>Open AR ${money(a.ar)} · overdue ${money(a.overdue)}</p><p>Annual revenue ${money(a.revenue)} · ${a.contracts} contracts</p><p>${a.driver}</p>${linked?`<a href="${go('signals',linked)}">Open intelligence context →</a>`:'<p>No active intelligence event.</p>'}</section>`}</section><section class="panel flex-panel"><h2>${moduleTitle(module)} records</h2>${hostTable(module,{...c,customer:a.id})}</section></div>`}
function renderWorkspaceNavigation(r,c){const host=r.page==='nexbill',sidebar=document.querySelector('.sidebar'),brand=sidebar.querySelector('.workspace-brand'),nav=document.getElementById('navigation');brand.href=host?hostLink(r.module,c):'#dashboard';brand.innerHTML=host?'<span class="workspace-symbol">N</span><span>NexBill<small>OPERATIONS</small></span>':'<span class="workspace-symbol">✧</span><span>LeaseAegis<small>FINANCIAL INTELLIGENCE</small></span>';sidebar.querySelector('.embedded-label').textContent=host?'Operational records & execution':'A workspace inside NexBill';sidebar.querySelector('.nav-label').textContent=host?'BUSINESS WORKSPACES':'';if(host){nav.innerHTML=['billing','collections','contracts','customers','portfolio'].map(k=>`<a href="${r.customerId?'#nexbill/'+k+'/@'+r.customerId:hostLink(k,c)}" class="${r.module===k?'active':''}">${moduleTitle(k)}</a>`).join('');return}const active=r.page==='decisions'&&r.tab==='outcomes'?'outcomes':r.page;nav.innerHTML=[['OVERVIEW',[['dashboard','Dashboard','#dashboard']]],['INTELLIGENCE',[['events','Business Events',go('event',c)],['customer','Customer 360','#customer/'+(r.customerId||c.customer)],['portfolio','Portfolio','#portfolio'],['forecast','Forecast','#forecast']]],['DECISIONS',[['decisions','Decision Center','#decisions/pending'],['outcomes','Outcome Review','#decisions/outcomes']]]].map(([g,items])=>`<div class="navigation-group"><div class="nav-group-title">${g}</div>${items.map(([k,l,h])=>`<a href="${h}" class="${active===k?'active':''}" ${active===k?'aria-current="page"':''}>${l}</a>`).join('')}</div>`).join('')}
function render(){if(redirectLegacy())return;const r=route(),c=currentCase();if(r.page==='events')ui.event=c.id;if(r.page!=='nexbill')ui.returnHash=location.hash||'#dashboard';renderHostNavigation(r,c);renderWorkspaceNavigation(r,c);document.getElementById('notification-count').textContent=grouped(CASES.filter(c=>c.next<='2026-10-23'&&!isResolved(c))).length;const title=r.page==='nexbill'?moduleTitle(r.module):{dashboard:'Dashboard',events:'Business Events',customer:'Customer 360',portfolio:'Portfolio Optimization',forecast:'Forecast Intelligence',decisions:r.tab==='outcomes'?'Outcome Review':'Decision Center'}[r.page];document.getElementById('crumb').textContent=title;document.getElementById('workspace-crumb').textContent=r.page==='nexbill'?'Operations':'LeaseAegis';const main=document.getElementById('main');main.className='view-'+r.page;main.innerHTML=r.page==='nexbill'?hostWorkspace(r.module,c):({dashboard:overview,events:businessEvents,customer,portfolio,forecast,decisions:decisionCenter}[r.page])();document.title='NexBill | LeaseAegis · '+title}

document.addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;if(t.dataset.expand)expandRow(t);if(t.dataset.register){ui.registerSelection=t.dataset.register;render()}if(t.dataset.signal){const c=currentCase(),domain=INTERNAL_DOMAINS.find(x=>x[0]===t.dataset.signal);drawer(domain[1],`<span class="pill blue">${domain[0]==='change'?'Core behavior signal':'Internal evidence'}</span><h3>${esc(account(c).name)}</h3><code>${domain[2]}</code><p>${c.internal[domain[0]]}</p><p>Snapshot: ${dateLabel(SNAPSHOT)}</p><a href="${hostLink(domain[3],c)}">View NexBill record ↗</a>`)}if(t.dataset.history){const c=CASES.find(x=>x.id===t.dataset.history);drawer('Decision history',historyMarkup(c,decision(c)))}if(t.hasAttribute('data-drawer-close'))document.getElementById('detail-drawer').close();if(t.dataset.scenario){const values=new Set(route().scenarios);values.has(t.dataset.scenario)?values.delete(t.dataset.scenario):values.add(t.dataset.scenario);location.hash='forecast/'+(['slip','expansion'].filter(k=>values.has(k)).join('+')||'base')}});
document.getElementById('detail-drawer').addEventListener('click',e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close()}});
document.addEventListener('keydown',e=>{if(route().page!=='events'||!['ArrowLeft','ArrowRight'].includes(e.key)||e.target.closest?.('input,textarea,select,button,a')||document.querySelector('dialog[open]'))return;const i=STAGES.findIndex(x=>x[0]===route().stage)+(e.key==='ArrowRight'?1:-1);if(i>=0&&i<STAGES.length){e.preventDefault();location.hash=go(STAGES[i][0])}});

document.addEventListener('click',e=>{if(e.target.closest?.('a,button,input,select,textarea'))return;const b=e.target.closest?.('tr')?.querySelector('[data-expand],[data-register]');if(b)b.click()});
render();
