# NexBill · LeaseAegis Financial Intelligence Workspace — 使用说明 / User Guide

版本日期 / Version date: 2026-10-22

## 中文

### 1. 打开网站

用 Chrome 或 Edge 打开 `index.html`。如果显示旧界面，按 Ctrl + F5。

顶部是 NexBill 全局导航：Billing、Collections、Contracts、Customers、Portfolio。LeaseAegis 是其中的 Financial Intelligence Workspace，左侧为 Dashboard 和六个连贯工作区。网站界面全部为英文，右上角 Advisor 是可选助手。

NexBill 管理业务记录与执行；LeaseAegis 提供分析、建议和决策支持。在信号页点击 View NexBill record 可查看相关记录，点击 Return to LeaseAegis 可回到同一事件和分析阶段。

### 2. 推荐演示路线

| 步骤 | 操作 | 应理解的业务问题 |
|---|---|---|
| Dashboard | 点击 Start the walkthrough | 今天什么最值得关注？ |
| Business Events | 查看 Payment Delay，再点击 Examine intelligence signals | Global Telecom 的 $4.5M 应收已逾期超过90天 |
| Signals | 查看 Internal Intelligence 和 External Intelligence | 哪些业务记录支持判断？哪些只是待验证的背景？ |
| Risks & Opportunities | 查看 Collection Risk，可点 Open detailed analysis | 为什么需要关注？风险在怎样变化？ |
| Financial Impact | 查看六类财务影响，再继续 | 会影响什么金额、时间或财务结果？ |
| Recommendations | 比较三个行动方案，选择其一 | 现在应该做什么？代价是什么？ |
| Decision Center | 填写负责人、日期、目标和理由，批准或拒绝 | Finance 最终决定是什么？ |

顶部流程导航和页面底部按钮都会保留当前事件。Event context 下拉框可切换事件；不要把不同事件的影响金额相加。

### 3. 事件范围

- Payment Delay：Global Telecom，$4.5M 逾期应收。
- Contract Modification：European Network，申请10% flex-down，$300K 年收入敏感性。
- Upcoming Renewal：North America Data Center，28天内续约，$4.2M 年合同价值。
- Customer Credit Change：Global Telecom 信用背景变化，关联同一笔 $4.5M 应收。
- Customer Expansion Opportunity：Cloud Infrastructure，$4M 未签约机会。
- Market Event：行业压力与 Global Telecom 利润率下降同时出现，$208K 年化利润敏感性。

事件列表支持按客户/事件搜索、按严重程度筛选。六个事件涉及四个客户，首页财务总览覆盖六个演示客户。

### 4. 如何作出并追踪决定

1. 在 Recommendations 比较三种方案。Recommended 是平台建议；Choose this option 只是选择待审方案。
2. 进入 Decision Center，核对 Selected action。
3. 填写 Decision owner、Target completion date、Outcome target 和 Decision rationale。
4. 目标金额单位为 **USD millions**。例如 `1.5` 表示150万美元，`0.15` 表示15万美元。
5. 点击 Approve selected action 或 Reject recommendation。
6. 批准后点击 Open approved action in NexBill。进入对应的 NexBill 业务模块，再点击 Simulate NexBill execution start，进入 In Progress。
7. 在 NexBill 中点击 Simulate execution completed，进入 Completed；点击 Return to LeaseAegis outcome review 返回结果评审。
8. 输入实际模拟结果及证明说明，点击 Record simulated outcome。
9. 结果达到目标时显示 Business Outcome Achieved；未达到时仍显示 Completed，并说明目标未达成。

拒绝后可用 Reopen Finance review 重新评审。之前的决定仍保留在 Recommendation & decision history 中。

记录的结果是最终演示记录；当前页面不提供结果更正流程。尚未提交的表单输入不保证在刷新后保留。

### 5. 状态含义

| 状态 | 含义 |
|---|---|
| Pending Review | 等待 Finance 评审 |
| Approved | Finance 已批准，执行未开始 |
| Rejected | 建议已拒绝，不会继续执行 |
| In Progress | 已开始模拟 NexBill 执行 |
| Completed | 模拟执行完成；结果未测量或目标未达成 |
| Business Outcome Achieved | 已记录结果，且达到本次设定目标 |

顶部状态卡可筛选下方 Decision register；当前事件的评审详情会继续显示。点击其他事件的 Open 可查看其决定和历史。

### 6. 如何阅读金额和评分

- Collection Exposure 是逾期应收，不是已确认损失。
- Credit Exposure 主要展示应收余额；缺少合同剩余价值与担保信息时，不假装给出净损失估计。
- 年续约价值、季度收入变化、现金回收和利润敏感性不是同一种指标。
- Payment Delay、Customer Credit Change 和 Market Event 中的 Global Telecom 应收可能重复出现，它们不是三笔独立敞口。
- 扩张机会没有签约，不自动进入基准收入。
- Risk Score、Opportunity Score、Evidence strength 和 Confidence 均为演示假设，不是经过校准的概率。
- 外部背景尚未接入真实信息源，不直接改变风险等级。

Dashboard 的 Business Decision Summary 只在结果被记录后显示已测量收益。现金回收单独汇总，不与利润、收入或重复的信用敞口变化相加。

### 7. Advisor 与保存

右上角 Advisor 可打开辅助面板，选择示例问题或询问回款、续约、利润问题。回答按 Observation → Impact → Recommendation 展示，并可返回相关建议。

这是基于演示数据的预置简报，不是真实联网 AI。超出范围的问题会说明无法支持。

已提交的决定和结果保存在同一浏览器中，刷新后可恢复。不跨设备或用户同步；清理站点数据可能删除记录。批准、执行和结果全部为本地模拟，不会操作真实 NexBill。业务记录为只读快照，模拟结果不会改写发票、合同或支付余额。

---

## English

### 1. Open

Open `index.html` in Chrome or Edge. Press Ctrl + F5 after an update. NexBill’s global navigation opens Billing, Collections, Contracts, Customers and Portfolio. LeaseAegis is an embedded Financial Intelligence Workspace with Dashboard and six connected stages in the left navigation. Advisor is an optional panel in the top-right corner.

### 2. Follow the connected journey

1. **Dashboard:** select Start the walkthrough.
2. **Business Events:** review Global Telecom’s Payment Delay: $4.5M more than 90 days overdue.
3. **Signals:** distinguish customer records from illustrative external context.
4. **Risks & Opportunities:** review the assessment, trend, evidence confidence and detailed analysis.
5. **Financial Impact:** review cash flow, revenue, margin, working capital, credit exposure and yield consequences.
6. **Recommendations:** compare three actions and select one for Finance review.
7. **Decision Center:** enter an owner, due date, measurable target and rationale; approve or reject.

Use View NexBill record to inspect operational context, then Return to LeaseAegis to resume the same event and analysis stage. NexBill owns execution; the intelligence workspace reflects its status. The process navigation retains the selected event. Use Event context to review another event. Amounts across events may overlap.

### 3. Approve, execute and measure

Approval records the Finance decision; it does not execute the action. After approval:

- Select **Open approved action in NexBill**. In the relevant NexBill operational module, select **Simulate NexBill execution start** to enter In Progress.
- In NexBill, select **Simulate execution completed** to enter Completed, then **Return to LeaseAegis outcome review**.
- Enter an observed amount and evidence, then **Record simulated outcome**.
- An amount at or above the target becomes Business Outcome Achieved. A below-target result remains Completed, with the shortfall clearly identified.

Monetary inputs are in **USD millions**: `1.5` means $1.5M and `0.15` means $150K. An outcome target is a planning objective, not a guaranteed benefit.

Rejected recommendations can be reopened. Previous decisions remain in Recommendation & decision history. Recorded outcomes are final in this demo; an outcome-correction workflow is not provided. Unsaved form inputs may be lost on refresh.

Status cards filter the Decision register. The selected event’s review remains visible above the register. Open a register entry to see its decision and history.

### 4. Interpret the financial measures

Exposure is not an expected loss. Renewal value is not recognized revenue. Uncontracted opportunities are excluded from the base forecast. Cash timing, annual revenue, quarterly profit and credit exposure are different measures.

Global Telecom’s payment, credit and market events reference the same $4.5M AR. Do not count it repeatedly. The Business Decision Summary aggregates measured collection cash separately from other results and overlapping exposure reductions.

Scores, confidence, trends and scenarios are illustrative. External context does not modify risk levels before calibration. No live news or credit feed is connected.

### 5. Advisor and persistence

Advisor returns structured **Observation → Impact → Recommendation** briefings for supported collection, renewal and profitability questions. It is not a live AI service. Unsupported questions receive a scope explanation.

Decisions, history and outcomes persist locally in the same browser. They do not synchronize across users or devices. Clearing browser site data can remove them. No approval, simulated execution or outcome changes production NexBill or accounting records. Operational views remain read-only snapshots, separate from measured demo outcomes.

### 6. Previous versions

`leaseaegis-workspaces.html` retains the previous LeaseAegis prototype. `nexbill-legacy.html` retains the original Finance Copilot. These versions use separate decision storage and their own workflows.
