# NexBill · LeaseAegis Financial Intelligence Workspace

Updated: **22 October 2026**. All application screens are in English.

**LeaseAegis is an embedded Financial Intelligence Workspace inside NexBill.** NexBill owns operational records and execution; LeaseAegis owns intelligence, recommendations and decision support.

The current experience follows the finalized LeaseAegis deck:

**Business Events → Intelligence Signals → Risk & Opportunity Analysis → Financial Impact Assessment → Recommendations → Business Decisions**

The Executive Overview answers “What requires my attention today?” and opens the connected workflow. The optional Advisor supports the workflow from a side panel.

## Open the current prototype

Open **index.html** in Chrome or Edge. Press **Ctrl + F5** after an update. No build or installation is needed. Keep these five files together:

- `index.html`
- `leaseaegis.css`
- `operating-model.css`
- `nexbill-shell.css`
- `operating-model.js`

The global NexBill navigation opens Billing, Collections, Contracts, Customers and Portfolio record views. The LeaseAegis entry returns to the current intelligence stage and event. Settings, Profile and Notifications provide contextual demonstration dialogs.

Full bilingual walkthrough: **LeaseAegis_Operating_Model_Guide_CN_EN.md**.

## Five-minute demonstration

1. On Dashboard, click **Start the walkthrough**.
2. Review Global Telecom’s **Payment Delay**: $4.5M more than 90 days overdue.
3. **Examine intelligence signals** → review payment, contract and accounting evidence; distinguish illustrative market context from operational evidence.
4. Continue to **Risks & Opportunities**, then **Financial Impact**.
5. **Recommendations** → compare three actions, optionally choose an alternative.
6. **Decision Center** → enter an owner, rationale, completion date and outcome target; approve or reject.
7. After approval, click **Open approved action in NexBill**. In the relevant NexBill module, use **Simulate NexBill execution start**, then **Simulate execution completed**. Return to LeaseAegis outcome review.
8. Record a simulated measured result. A result at or above the target becomes **Business Outcome Achieved**. Below-target results remain **Completed**, with the outcome recorded explicitly.
9. Return to Dashboard to see the Business Decision Summary update.

## Demonstration boundaries

- Six event scenarios connect to a six-customer illustrative portfolio. Event coverage spans four of those customers.
- No real NexBill execution, external news feed, credit service or live AI service is connected.
- Scores, confidence, trend histories and financial scenarios are illustrative, not calibrated predictions.
- External intelligence provides context; it does not modify the risk score before calibration.
- Exposure, expected cash timing, annual revenue, profit sensitivity and opportunity value are distinct measures. They are not summed into a single risk total.
- Payment Delay and Customer Credit Change share Global Telecom’s $4.5M AR. Its Market Event also refers to the same balance. Do not count it repeatedly.
- The Cloud opportunity is uncontracted. Scenario estimates do not change booked revenue.
- Decisions and history are stored under `leaseaegis-operating-model-v2` in the current browser only. Previous prototypes use separate storage.
- The operational views are read-only snapshots. Only workflow execution status is simulated in NexBill; measured outcomes do not rewrite invoices or contracts.
- Existing saved decisions remain compatible. The interface displays Pending Review and Business Outcome Achieved for the former Recommended and Outcome Achieved states.
- Approved actions do not count as realized value. Results require a recorded amount and evidence after simulated completion.
- The dashboard totals cash collected only for the collection outcome. Different outcome types and overlapping credit-exposure reductions are not added to it.
- No automatic model learning or production integration is represented as operational.

## Validation

`node --check operating-model.js`

`node validate-operating-model.cjs`

The validation additionally covers all five NexBill modules, record-to-intelligence round trips, host-only execution guards and global utility dialogs.

The validation uses installed Chrome and an isolated test browser profile. It covers 36 event/workspace routes, end-to-end navigation, option selection, approval/rejection/reopening, transition guards, measured outcomes above and below target, persistence, escaping, filters, context changes, optional Advisor, and desktop/mobile layout.

Preview images: `preview-operating-dashboard.png`, `preview-operating-decisions.png`, `preview-operating-mobile.png`.

## Earlier versions

- **leaseaegis-workspaces.html** — previous six-workspace LeaseAegis prototype, with `leaseaegis.js` and `leaseaegis.css`.
- **nexbill-legacy.html** — original NexBill Finance Copilot, using its original scripts and stylesheet.
- `Nexbill_Finance_Copilot_User_Guide_CN_EN.md` describes the original NexBill prototype, not the current operating-model experience.

## 中文快速入口

打开 **index.html**，看到顶部 **NexBill** 业务导航和左侧 **LeaseAegis** 六步工作区 即为新版。

建议从首页 **Start the walkthrough** 开始，沿页面流程逐步进入决策中心。批准后通过 **Open approved action in NexBill** 进入对应业务模块模拟执行，再返回 LeaseAegis 记录结果。完成不等于收益实现。

完整中英文说明见 **LeaseAegis_Operating_Model_Guide_CN_EN.md**。所有操作仅用于本地演示，不会修改真实 NexBill 数据。
