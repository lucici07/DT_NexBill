# Nexbill Finance Copilot / Business Risk Feed 使用说明书

版本：当前交互原型 · 更新日期：2026-10-02

网站界面为英文。本说明按中文、英文分为两个独立部分，便于阅读和分享。

---

# 中文使用说明

## 1. 这个工具帮助你做什么？

当客户或市场发生变化时，Finance Copilot帮助财务提前识别可能的财务影响、比较行动方案并记录决定。

**业务事件 → AI理解 → 财务影响 → 建议行动 → 财务决定**

AI提供建议，财务人员作出决定，Nexbill负责业务执行。当前网站为交互演示，所有数据、申请和审批均为模拟。

## 2. 打开网站

1. 用 Chrome 或 Edge 打开项目目录中的 `index.html`，保留整个项目文件夹，不要单独移动该文件。
2. 若已打开旧页面，按 **Ctrl + F5** 刷新。
3. 点击左上角 **Nexbill** 标志或左侧 **Business Risk Feed** 返回事件首页。

无需安装。页面先展示事件，不要求先选择客户。当前浏览器地址可能记住上一次所在页面。

## 3. 第一步：查看 Business Risk Feed

这个页面回答：**发生了什么变化，财务为什么需要关注？**

| 页面字段 | 如何理解 |
|---|---|
| Event Name | 业务事件名称 |
| Potential Revenue Exposure | 需要复核的收入或合同范围，不是预计损失 |
| Collection Exposure | 需要关注的应收余额，不是已确认坏账 |
| Potential Growth | 尚待验证的增长机会，不是已确认收入 |
| Affected Customers | 此事件关联的客户数量和范围 |
| Priority | 演示中的关注优先级，不是经过验证的风险评分 |
| Suggested Next Step | 建议先开展的财务行动 |

可体验四个事件：

- **Workforce Reduction**：客户裁员或缩减经营，可能影响续约预算。
- **Credit Outlook Downgrade**：信用展望变化，可能影响回款时间。
- **Industry Investment Slowdown**：行业投资放缓，可能影响续约规模或收入时间。
- **Expansion Opportunity**：客户扩张，可能带来需要验证的新增需求。

选择一个事件，点击 **Review Impact**；增长事件点击 **Review Opportunity**。

## 4. 第二步：查看 Impact Analysis

这个页面回答：**事件会怎样影响财务，应该先处理什么？**

建议依次阅读：

1. **What Changed**：发生了什么；需要时展开证据和假设。
2. **AI Interpretation**：事件与客户业务之间可能存在什么联系。
3. **Finance Impact**：可能影响收入规模、收入时间、回款或利润的具体方式。
4. **Affected Customer Portfolio**：按敞口排序的相关客户。
5. **Recommended Next Steps**：与上述财务影响对应的下一步。

例如，客户预算收紧可能导致续约范围缩减或谈判延迟，因此需要比较续约条件，而不是直接假设收入已经减少。

点击客户旁的 **Review decision** 进入该客户的 Decision Workspace。底部建议按钮也可进入相关决策页；进入后核对当前客户。无需先经过 Customer 360。

不同事件可能关联同一客户，不能把事件金额直接相加为全平台总风险。

## 5. 第三步：在 Decision Workspace 比较方案

这个页面回答：**财务现在应该选择什么行动？**

先确认顶部的事件、当前客户、事件整体敞口与该客户敞口，避免把整个组合金额理解成当前客户金额。

每个方案包含：

| 字段 | 含义 |
|---|---|
| Business Impact | 对合同金额、现金流、资源投入或预测处理的影响 |
| Expected Outcome | 希望通过该行动获得的结果，不是结果保证 |
| Confidence | 演示情景假设，不是经过校准的预测概率 |
| Pros / Cons | 优点与代价 |
| Why preferred / Why less preferred | 推荐理由，以及其他方案适用的条件 |

续约示例提供 **Maintain Pricing**、**Increase Pricing 5%**、**Retention Package**。信用和增长事件分别提供回款、机会验证等相关方案。

推荐方案有醒目标记。财务可以选择其他方案，不必接受AI推荐。点击 **Choose Option A/B/C** 将选择带入下方表单；此操作本身不保存或提交。

页面不再提供独立的 Why This Option、Decision Lifecycle 或 Outcome Tracking 区块。

## 6. 第四步：记录 Finance Decision

填写以下字段：

- **Selected Option**：选择的方案，也可通过下拉框修改。
- **Comments**：选择理由，例如 `Customer requested review before any price change.`
- **Decision Owner**：负责跟进的人。
- **Decision Date**：实际决策日期。页面提供演示默认日期，使用时请核对并修改。

表单中 **AI Recommendation** 和 **Finance Decision** 分开显示，允许两者不同。

| 按钮 | 点击后的结果 |
|---|---|
| Save Decision | 保存财务决定，不创建Nexbill业务申请；可刷新后继续查看、修改 |
| Submit Through Nexbill | 使用同一份表单创建待审批申请，无需先点Save Decision，也无需重复填写 |

提交不等于生效，AI不会自动执行合同或账务变更。未保存的输入不要依赖刷新恢复。

## 7. 第五步：查看提交状态

| 状态 | 含义及后续操作 |
|---|---|
| Saved · Not submitted | 决定已保存，尚未创建业务申请 |
| Submitted · Awaiting approval | 申请已提交，表单锁定以防重复提交 |
| Approved · Awaiting effective date | 已批准，尚未生效 |
| Effective | 模拟申请已生效，原决定只读 |
| Rejected | 申请被拒绝，可以修改后重新提交，或开始新决定 |

为了演示，可以点击 **Simulate Approval** 或 **Simulate Rejection**；批准后可以点击 **Simulate Effective Date**。

如果按钮变灰，先看状态，而不是重复点击。已生效或被拒绝时，可以点击 **Start New Decision** 开始新一轮选择，原决定和申请仍保留，不会被删除。

此按钮不会撤销已生效申请。当前页面不提供完整历史记录浏览器，也不提供业务结果追踪。

## 8. 推荐首次演示路线（约5分钟）

1. 首页选择 **Workforce Reduction → Review Impact**。
2. 查看潜在的续约范围缩减、谈判延迟及服务包成本影响。
3. 选择 **Global Telecom Operator → Review decision**。
4. 比较三个续约方案，留意AI推荐的 Retention Package。
5. 选择 **Maintain Pricing**，填写理由、负责人和日期，演示财务可以与AI作不同选择。
6. 点击 **Save Decision**，确认显示保存但未提交。
7. 点击 **Submit Through Nexbill**，确认申请进入待审批。
8. 模拟批准、生效，再点击 **Start New Decision** 体验重新评估。

演示重点：业务变化尚未完全反映在财务结果中，Finance已能据此提前评估行动。

## 9. 其他 Nexbill 页面什么时候使用？

| 页面 | 用途 |
|---|---|
| Billing & Collection | 核对发票、付款状态、逾期和未结余额，查看明细或导出当前范围 |
| Revenue & Changes | 核对标准交易、已确认变更和收入预测基线；PN report目前为定义待确认的占位入口 |
| Leasing Profitability | 按客户、国家、Tranche核对收入成本和毛利，区分硬件与服务 |
| Contracts & Changes | 核对合同、变更记录和模拟业务申请 |
| Customer 360 | 辅助查看客户财务背景；不是事件到决策的必经步骤 |

这些页面提供业务事实。首次体验建议优先走完事件首页、影响分析和决策工作区。

## 10. 常见问题与演示范围

**页面像卡住了，选项不能点击？**
先看是否已提交或已生效。锁定用于防止重复提交；Effective或Rejected状态下可使用Start New Decision。

**刷新后记录还在吗？**
已保存记录通常保留在同一浏览器、同一路径下。清除浏览器站点数据、换浏览器或改变文件位置可能导致无法读取原记录；不跨用户或设备同步。

**AI推荐会自动改合同或收入吗？**
不会。当前提交、审批、生效全部是本地模拟；演示中的续约报价不会改写当前季度收入基线或现有发票。

**消息、金额和Confidence真实吗？**
均为示例数据。没有连接真实新闻源或生产Nexbill。敞口不等于预计损失，机会不等于已确认收入，Confidence不是已验证的成功概率。

---

# English User Guide

## 1. Purpose

Finance Copilot helps Finance identify business changes, understand their potential financial consequences, compare actions and record a decision before those changes fully appear in financial results.

**Business Event → AI Interpretation → Finance Impact → Recommended Action → Finance Decision**

AI recommends. Finance decides. Nexbill executes. This prototype uses illustrative data and simulated requests and approvals.

## 2. Open the prototype

1. Open `index.html` in Chrome or Edge. Keep the complete project folder together; do not move the HTML file on its own.
2. Press **Ctrl + F5** if the page was already open.
3. Click the **Nexbill** logo or **Business Risk Feed** in the navigation to return home.

No installation is required. Start with an event, not a customer. Your browser may retain the previously visited page address.

## 3. Step 1 — Review the Business Risk Feed

This page answers: **What changed, and why should Finance care?**

| Field | Meaning |
|---|---|
| Event Name | The business change being reviewed |
| Potential Revenue Exposure | Revenue or contract scope requiring review, not an expected loss |
| Collection Exposure | Receivables requiring attention, not confirmed bad debt |
| Potential Growth | An opportunity requiring validation, not recognized revenue |
| Affected Customers | The customer count and scope associated with the event |
| Priority | Illustrative review priority, not a validated risk score |
| Suggested Next Step | The proposed initial Finance action |

The four scenarios are Workforce Reduction, Credit Outlook Downgrade, Industry Investment Slowdown and Expansion Opportunity.

Click **Review Impact**, or **Review Opportunity** for the growth event.

## 4. Step 2 — Read Impact Analysis

This page answers: **What could change financially, and what should we review first?**

Read the existing sections in order:

1. **What Changed:** the event facts; expand evidence and assumptions if needed.
2. **AI Interpretation:** the potential connection to customer operations.
3. **Finance Impact:** the possible effect on revenue size or timing, collection or margin.
4. **Affected Customer Portfolio:** associated customers ranked by exposure.
5. **Recommended Next Steps:** an action connected to the financial consequence.

For example, budget pressure may reduce renewal scope or delay acceptance. This supports reviewing renewal terms; it does not mean revenue has already declined.

Click **Review decision** beside a customer to open its Decision Workspace. The next-step button also opens a relevant decision; check the selected customer after entering. Customer 360 is not a mandatory intermediate step.

Events may overlap. Do not add their exposure amounts into a portfolio risk total.

## 5. Step 3 — Compare options in Decision Workspace

This page answers: **What should Finance do next?**

First confirm the event, selected customer, event-wide exposure and selected-customer exposure. The portfolio amount is not necessarily the current customer's amount.

| Option field | Meaning |
|---|---|
| Business Impact | Implications for contract value, cash timing, resources or forecast treatment |
| Expected Outcome | The intended result, not a guarantee |
| Confidence | An illustrative scenario assumption, not a calibrated probability |
| Pros / Cons | Benefits and tradeoffs |
| Why preferred / Why less preferred | The recommendation rationale and conditions favoring an alternative |

Renewal options include **Maintain Pricing**, **Increase Pricing 5%** and **Retention Package**. Credit and growth events offer collection and opportunity-validation actions instead.

The recommended option is highlighted. Finance may choose any alternative. Clicking **Choose Option A/B/C** fills the selection below; it does not save or submit it.

There are no standalone Why This Option, Decision Lifecycle or Outcome Tracking sections in the current workspace.

## 6. Step 4 — Capture the Finance Decision

Complete:

- **Selected Option:** choose an option or change it in the dropdown.
- **Comments:** explain the choice, for example, `Customer requested review before any price change.`
- **Decision Owner:** the person responsible for follow-up.
- **Decision Date:** verify and update the illustrative default date.

**AI Recommendation** and **Finance Decision** appear separately and may differ.

| Button | Result |
|---|---|
| Save Decision | Saves the Finance decision without creating a Nexbill request; it remains available for review and editing |
| Submit Through Nexbill | Creates an approval request using the same fields; saving first is not required |

Submission is not execution. AI does not automatically change contracts or accounting records. Do not rely on refresh to recover unsaved input.

## 7. Step 5 — Check request status

| Status | Meaning and next action |
|---|---|
| Saved · Not submitted | The decision is recorded; no business request exists |
| Submitted · Awaiting approval | A request exists; the form is locked to prevent duplicate submission |
| Approved · Awaiting effective date | Approved but not yet effective |
| Effective | The simulated request is effective; the original decision is read-only |
| Rejected | Revise and resubmit, or start a new decision |

Use **Simulate Approval** or **Simulate Rejection** to demonstrate processing. After approval, **Simulate Effective Date** becomes available.

Disabled buttons usually indicate a submitted or completed request. For Effective or Rejected requests, click **Start New Decision** to begin another review while preserving previous records.

Starting a new decision does not reverse an effective request. The current page does not provide a full history browser or business-outcome tracking.

## 8. First-time walkthrough — approximately five minutes

1. Select **Workforce Reduction → Review Impact**.
2. Review potential renewal contraction, negotiation delays and service-package cost implications.
3. Select **Global Telecom Operator → Review decision**.
4. Compare the three renewal options and note the recommended Retention Package.
5. Choose **Maintain Pricing** and enter a reason, owner and date to demonstrate an independent Finance decision.
6. Click **Save Decision** and confirm it is not submitted.
7. Click **Submit Through Nexbill** and confirm the request is awaiting approval.
8. Simulate approval and effectiveness, then use **Start New Decision** to demonstrate reassessment.

The story is earlier intervention: Finance can evaluate a response to a business change before it fully appears in recorded results.

## 9. Supporting Nexbill pages

| Page | Purpose |
|---|---|
| Billing & Collection | Check invoices, payment status, overdue balances and open amounts; inspect details or export the selected scope |
| Revenue & Changes | Check standard transactions, confirmed changes and the forecast baseline; PN report is currently a definition-pending placeholder |
| Leasing Profitability | Review revenue, costs and margin by customer, country or Tranche, separating hardware and services |
| Contracts & Changes | Review contracts, change records and simulated business requests |
| Customer 360 | Inspect supporting customer context; optional to the main event-to-decision journey |

For a first demonstration, prioritize Business Risk Feed → Impact Analysis → Decision Workspace.

## 10. Questions and demonstration limits

**The page looks stuck. Why are the options disabled?**
Check the request status. Submitted and effective requests are locked to prevent duplicates. Use Start New Decision when the request is Effective or Rejected.

**Will saved records survive a refresh?**
They normally remain in the same browser at the same location. Clearing site data, changing browsers or moving files may make earlier records unavailable. Records do not synchronize across users or devices.

**Does the recommendation change contracts or revenue automatically?**
No. Requests, approvals and effective states are local simulations. Simulated renewal quotes do not change current-quarter revenue or existing invoices.

**Are the events, amounts and confidence values real?**
No. They are illustrative. The prototype is not connected to live news or production Nexbill. Exposure is not expected loss, growth is not recognized revenue, and confidence percentages are not validated success probabilities.
