# LeaseAegis — Leasing Financial Intelligence

Current prototype: **LeaseAegis**, based on the supplied Leasing Financial Intelligence Platform deck. All application screens are in English.

## Open

Open **index.html** in Chrome or Edge. Press **Ctrl + F5** if the previous Nexbill interface is cached. Keep `index.html`, `leaseaegis.css` and `leaseaegis.js` together. No installation or build is required.

## Suggested walkthrough

1. **Executive Dashboard** — review the $184M financed portfolio, $11.5M open AR and $6.7M overdue exposure.
2. **Risk Command Center** — filter high-risk accounts and open Global Telecom Operator: $4.5M overdue for more than 90 days.
3. **Customer 360** — review payments, contracts, market context and the recommendation. Use **Review Finance decision** to save a review, adjustment or deferral with an owner and comments.
4. **Portfolio Intelligence** — compare segment yield, operating margin and illustrative risk-adjusted yield.
5. **Forecast Intelligence** — compare Base, Growth and Risk cases; check the revenue, receipt/outflow bridge and net cash flow implications.
6. **AI Advisor** — select a suggested question or ask about collections, renewals, profitability or growth. Briefings follow Observation → Business Impact → Recommendation.

## Demonstration boundaries

- Six anonymous illustrative customers; no live Nexbill, news or AI service connection.
- Market context explains the business situation but does not modify the current risk level.
- Health scores, history, loss allowances and forecasts are illustrative. They are not calibrated predictions.
- Portfolio value means financed principal. Open AR is separate; overdue exposure is a subset of AR. Do not add these measures into a single risk total.
- Yield is annualized finance income divided by principal. Operating margin is after funding, service and collection costs. Risk-adjusted yield deducts an illustrative expected-loss allowance.
- Opportunity values are uncontracted and excluded from the base forecast.
- Saved Finance decisions remain in the same browser only. Saving does not create a Nexbill approval request or execute transactions.
- Advisor responses are predefined portfolio briefings selected by question topic. Unsupported questions receive a scope explanation.

## Previous prototype

The previous Finance Copilot entry is preserved as **nexbill-legacy.html** and continues to use the original scripts. Its guide is `Nexbill_Finance_Copilot_User_Guide_CN_EN.md`. That guide describes the legacy version, not the new LeaseAegis interface.

## Validation

`node --check leaseaegis.js`

`node validate-leaseaegis.cjs`

The browser checks require Node with built-in WebSocket support and Chrome installed at the standard Windows location. They use an isolated browser profile and cover six workspaces, customer routes, filters, totals, forecast calculations, decision persistence, Advisor responses, English UI and mobile overflow.

Screenshots: `preview-leaseaegis-desktop.png`, `preview-leaseaegis-mobile.png`.

---

## 中文快速说明

直接打开 `index.html`，看到 **LeaseAegis** 即为新版；如果仍显示旧版，按 Ctrl + F5 刷新。

推荐路线：**Executive Dashboard → Risk Command Center → Global Telecom Operator → Review Finance decision**，然后体验组合分析、三种预测情景与 AI Advisor。

所有页面为英文。金额、趋势、预测和评分为演示数据。保存决定只保存在当前浏览器，不会提交真实审批或执行交易。旧版入口为 `nexbill-legacy.html`，原中英文说明书对应旧版。
