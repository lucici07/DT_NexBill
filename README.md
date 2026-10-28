# NexBill · LeaseAegis Financial Intelligence Workspace

Updated: 27 October 2026. Application language: English. Demonstration snapshot: 22 October 2026.

LeaseAegis is embedded inside NexBill. NexBill owns operational records and execution; LeaseAegis turns business evidence into financial decisions.

Business Events → Intelligence Signals → Risk & Opportunity Analysis → Financial Impact → Recommendations → Business Decisions

## Open

Open index.html in Chrome or Edge; press Ctrl + F5 after updating. No build or installation is needed. Keep these five runtime files together:

- index.html
- operating-model.js
- leaseaegis.css
- operating-model.css
- nexbill-shell.css

## Pages and navigation

| Group | Page | Route |
|---|---|---|
| Overview | Dashboard: decisions needed today, value delivered and priorities | #dashboard |
| Intelligence | Business Events: seven cases, including Retail | #events/payment |
| Intelligence | Customer 360: six customers, associated events and actions | #customer/telecom |
| Intelligence | Portfolio Optimization: four quadrants, segments and profitability | #portfolio |
| Intelligence | Forecast Intelligence: quarterly scenarios and revenue buckets | #forecast |
| Decisions | Decision Center: compare, approve or reject actions | #decisions/payment |
| Decisions | Outcome Review: historical and measured live results | #outcomes |

Signals, Risks & Opportunities, Financial Impact and Recommendations remain accessible through the six-step event flow. They highlight Business Events in the sidebar. NexBill Billing, Collections, Contracts, Customers and Portfolio retain their own operational navigation. Customer names open Customer 360; operational record links retain their NexBill destination.

## Five-minute demonstration

1. Dashboard: read the two positioning statements, Decisions needed today and non-zero Value delivered.
2. Start the walkthrough → Payment Delay → Signals. Review eight internal domains; external feeds are marked Phase 2.
3. Risks: Collection High and secondary Renewal Medium.
4. Financial Impact: review the $4.5M shared overdue AR and quantified consequences.
5. Recommendations: compare three Collect actions and their tradeoffs.
6. Decision Center: Approve as recommended → Open approved action in NexBill → Run execution in NexBill. Three tasks complete automatically. Duplicate clicks are blocked; a refreshed execution can resume.
7. Return to LeaseAegis and record a $1.5M simulated result with evidence. The event becomes Resolved, its score changes from 88 to 55, Top risks updates and measured cash increases.
8. Portfolio: explore the four quadrants. Forecast: switch to Three renewals slip. Customer 360: inspect Telecom's three events and shared exposure. Outcome Review separates historical pilot results from this session's measurements.

## Data and demonstration boundaries

- Seven events cover five of the six illustrative customers. Healthcare has a Customer 360 page without an active event.
- Eight internal domains: billing, collection, revenue, contract, change events, assets, profitability and usage.
- PAST_DECISIONS contains three read-only Q3 pilot examples. It is not stored as live decisions. On a fresh browser, Value delivered shows $0.6M cash collected, $2.7M renewal value, 25.3 days average warning lead time and 2.0 days average decision cycle.
- Historical examples and measured live results use the same metrics function. Cash, renewal value and profit remain separate. Missing live lead-time data is excluded from the average.
- External feeds (Phase 2), forecast scenarios (Phase 3) and learning (Phase 4) are demonstrations, not active production capabilities. The Assumptions dialog collects these limitations.
- Achieved targets mark events Resolved and apply preset post-action scores. Below-target outcomes remain open risks. These rules do not represent model learning.
- Scores and forecast bands are illustrative. Risk charts use a fixed 0–100 scale.
- Telecom events share the same $4.5M AR; do not sum it repeatedly. Expansion is uncontracted upside. Revenue exposure is not expected loss.
- The operational records remain read-only snapshots. Simulated execution and measurements do not rewrite invoices, contracts or balances.
- Decisions retain the localStorage key leaseaegis-operating-model-v2. Existing Recommended and Outcome Achieved records remain compatible. Records do not synchronize across browsers or users.
- Advisor offers five preset briefings, including Retail; it has no free-text chat.

## Validation

Run:

    node --check operating-model.js
    node validate-operating-model.cjs

Validation uses installed Chrome and an isolated browser profile. It covers seven event journeys, all six Customer 360 routes, Portfolio/Forecast/Outcomes, seven grouped sidebar links, all five NexBill modules, Retail record links, English-only UI, 1440px/390px layouts, legacy storage, approval/rejection, one-button execution, duplicate guards, refresh recovery, achieved and below-target outcomes, score updates and financial metric separation.

Preview images: preview-operating-dashboard.png, preview-operating-decisions.png, preview-operating-mobile.png.

## Documentation and archive

- LeaseAegis_网页交互使用说明_CN.md: Chinese interaction guide.
- LeaseAegis_Operating_Model_Guide_CN_EN.md: bilingual walkthrough.
- CODEX_TASK_LeaseAegis_Alignment.md: alignment requirements.
- archive/: previous HTML prototypes, scripts, styles, validation scripts and screenshots moved with git mv. These are historical references; their tests are not the current acceptance suite. The active shared leaseaegis.css remains at the project root.
- Older Nexbill Finance Copilot documents describe historical versions.

## 中文快速入口

打开 index.html，按 Ctrl + F5。LeaseAegis 左侧现在有七个分组入口；事件内部仍按六步流程分析。批准行动后进入 NexBill，点击 Run execution in NexBill；完成后返回记录结果。Portfolio、Forecast、Customer 360 和 Outcome Review 可独立进入。所有业务执行及结果均为本地演示。
