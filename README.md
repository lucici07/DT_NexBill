# LeaseAegis — Operating Model Prototype

Updated: **22 October 2026**. All application screens are in English.

The current experience follows the finalized LeaseAegis deck:

**Business Events → Intelligence Signals → Risk & Opportunity Analysis → Financial Impact Assessment → Recommendations → Business Decisions**

The Executive Overview answers “What requires my attention today?” and opens the connected workflow. The optional Advisor supports the workflow from a side panel.

## Open the current prototype

Open **index.html** in Chrome or Edge. Press **Ctrl + F5** after an update. No build or installation is needed. Keep these four files together:

- `index.html`
- `leaseaegis.css`
- `operating-model.css`
- `operating-model.js`

Full bilingual walkthrough: **LeaseAegis_Operating_Model_Guide_CN_EN.md**.

## Five-minute demonstration

1. On Dashboard, click **Start the walkthrough**.
2. Review Global Telecom’s **Payment Delay**: $4.5M more than 90 days overdue.
3. **Examine intelligence signals** → review payment, contract and accounting evidence; distinguish illustrative market context from operational evidence.
4. Continue to **Risks & Opportunities**, then **Financial Impact**.
5. **Recommendations** → compare three actions, optionally choose an alternative.
6. **Decision Center** → enter an owner, rationale, completion date and outcome target; approve or reject.
7. After approval, use **Simulate Nexbill execution start**, then **Simulate execution completed**.
8. Record a simulated measured result. A result at or above the target becomes **Outcome Achieved**. Below-target results remain **Completed**, with the outcome recorded explicitly.
9. Return to Dashboard to see the business value summary update.

## Demonstration boundaries

- Six event scenarios connect to a six-customer illustrative portfolio. Event coverage spans four of those customers.
- No real Nexbill execution, external news feed, credit service or live AI service is connected.
- Scores, confidence, trend histories and financial scenarios are illustrative, not calibrated predictions.
- External intelligence provides context; it does not modify the risk score before calibration.
- Exposure, expected cash timing, annual revenue, profit sensitivity and opportunity value are distinct measures. They are not summed into a single risk total.
- Payment Delay and Customer Credit Change share Global Telecom’s $4.5M AR. Its Market Event also refers to the same balance. Do not count it repeatedly.
- The Cloud opportunity is uncontracted. Scenario estimates do not change booked revenue.
- Decisions and history are stored under `leaseaegis-operating-model-v2` in the current browser only. Previous prototypes use separate storage.
- Approved actions do not count as realized value. Results require a recorded amount and evidence after simulated completion.
- The dashboard totals cash collected only for the collection outcome. Different outcome types and overlapping credit-exposure reductions are not added to it.
- No automatic model learning or production integration is represented as operational.

## Validation

`node --check operating-model.js`

`node validate-operating-model.cjs`

The validation uses installed Chrome and an isolated test browser profile. It covers 36 event/workspace routes, end-to-end navigation, option selection, approval/rejection/reopening, transition guards, measured outcomes above and below target, persistence, escaping, filters, context changes, optional Advisor, and desktop/mobile layout.

Preview images: `preview-operating-dashboard.png`, `preview-operating-decisions.png`, `preview-operating-mobile.png`.

## Earlier versions

- **leaseaegis-workspaces.html** — previous six-workspace LeaseAegis prototype, with `leaseaegis.js` and `leaseaegis.css`.
- **nexbill-legacy.html** — original Nexbill Finance Copilot, using its original scripts and stylesheet.
- `Nexbill_Finance_Copilot_User_Guide_CN_EN.md` describes the original Nexbill prototype, not the current operating-model experience.

## 中文快速入口

打开 **index.html**，看到左侧 **Dashboard / Business Events / Signals / Risks & Opportunities / Financial Impact / Recommendations / Decision Center** 即为新版。

建议从首页 **Start the walkthrough** 开始，沿页面流程逐步进入决策中心。批准不等于执行，完成不等于收益实现；模拟执行完成后需单独记录结果。

完整中英文说明见 **LeaseAegis_Operating_Model_Guide_CN_EN.md**。所有操作仅用于本地演示，不会修改真实 Nexbill 数据。
