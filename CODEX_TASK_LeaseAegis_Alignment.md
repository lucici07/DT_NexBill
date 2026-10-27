# Codex 任务：让 LeaseAegis 原型与最终版 Deck 对齐

## 0. 背景与硬性约束

你要修改的是 NexBill 内嵌的 **LeaseAegis Financial Intelligence Workspace** 原型。

- 当前原型入口：`index.html`。所有逻辑都在 **`operating-model.js`**；样式在 `leaseaegis.css`、`operating-model.css`、`nexbill-shell.css`。
- 产品定位：LeaseAegis 是 NexBill 内嵌的财务智能层和决策工作区。它**不是**独立 AI 平台，**不是**聊天机器人，也**不是** BI 看板。
  - NexBill 负责业务记录和执行。
  - LeaseAegis 负责信号、风险、影响、建议和决策支持。
- Deck 的主流程：Business Events → Intelligence Signals → Risk & Opportunity → Financial Impact → Recommendations → Finance Decision → NexBill Execution → Outcome Review。

**必须遵守：**
1. 纯原生 HTML/CSS/JS，不引入框架、构建步骤或外部 CDN。双击 `index.html` 就能运行。
2. **所有界面文字使用英文**。校验脚本会检查页面中是否出现中文字符。
3. 保持现有代码风格：单文件、模板字符串渲染、`esc()` 转义用户输入、hash 路由。
4. **不要修改 `MODEL_KEY`（`leaseaegis-operating-model-v2`）**，已保存的决策必须仍然可读。
5. 所有数字都是演示数据。不要写"预测准确""AI 已学习"之类的表述；后续阶段的能力要标注 Phase。
6. 不同口径的金额（逾期 AR、年续约额、利润敏感度、机会金额）**不能相加**，这条现有规则继续保持。
7. 旧版 `leaseaegis.js` 里有可复用的 `segData()`、`portfolio()`、`forecast()`、`customer()` 和 `scenarios`，`leaseaegis.css` 里已有 `.quadrant`、`.segments`、`.tabs`、`.forecast-kpis`、`.customer-title` 样式（`index.html` 已经加载了 `leaseaegis.css`）。**请移植到 `operating-model.js`，不要整体引入旧文件。**

---

## 1. P0：必须完成

### P0-1 修复数据矛盾：Retail 是高风险客户却没有事件

`customers` 里 `retail` 的 `risk:'High'`：逾期 $1.2M、62 天，续约还剩 25 天。但 `CASES` 里没有它，NexBill Collections 表里显示 "No active intelligence event"。这直接损害"智能层能主动发现风险"的叙事。

在 `CASES` 中新增一条事件，字段结构与现有 case 完全一致：

```js
{id:'retail',customer:'retail',type:'Payment Delay',title:'Overdue balance ages past 60 days ahead of renewal',severity:'High',detected:'2026-10-20',next:'2026-10-24',
 description:'Retail Technology Group has $1.2M overdue (oldest 62 days) and a $3.6M annual renewal due in 25 days.',
 impact:'$1.2M of receipts is delayed and $3.6M of annual renewal value needs agreed terms within 25 days.',
 category:'Collection Risk',score:79,trend:'Worsening',confidence:'High',
 driver:'62 days overdue while a store network restructuring is announced and the renewal is pending within 25 days.',
 summary:'Agree a dated payment plan before confirming the renewal scope.',strength:85,history:[38,47,58,70,79],historyLabel:'Illustrative collection risk score',
 amount:1.2,amountLabel:'Overdue receivables',rank:2,
 rec:'Agree a payment plan and right-size the renewal',reason:'Overdue receivables and an imminent renewal must be negotiated together; agreeing scope first weakens the cash position.',
 benefit:'Recover overdue cash and renew on a footprint the customer can sustain.',
 owner:'Maya Chen · Collections',targetDate:'2026-10-30',metric:'Cash collected',target:.6,max:1.2,unit:'USD millions',
 options:[['Payment plan with renewal','Link a dated repayment plan to renewal terms.','Secures cash before new commitments.','Requires joint collections and account negotiation.'],
          ['Renew at reduced footprint','Renew only the stores that remain open.','Matches scope to the restructured network.','Lower annual revenue.'],
          ['Renew unchanged, collect later','Renew current scope and follow up on arrears separately.','Avoids renewal friction.','Extends exposure to a stressed customer.']]}
```

同时完成以下几处：
- 按现有结构补齐 `internal`、`external` 数组，内容与 Retail 一致（外部信号包括 "Store network restructuring announced — illustrative context"）。
- 在 `IMPACTS.retail` 中补齐 6 个影响块：Cash $1.2M delayed；Revenue $3.6M renewal under review；Margin 14% vs 18% prior；Working capital $1.2M tied up；Credit exposure $2.4M open AR；Yield 7.2% current。
- `executionModule()` 中让 `retail` 指向 `collections`。
- 校验：NexBill 的每个模块里，Retail 行都应显示 "Review in LeaseAegis →"。

### P0-2 新增三个用例页面（对应 Deck 第 14–16 页）

在 `pages` 中加入以下路由（侧栏结构见 P1-6）：

| 路由 | 页面 | 对应 Deck 页 |
|---|---|---|
| `#portfolio` | **Portfolio Optimization** | 第 14 页 |
| `#forecast` | **Forecast Intelligence** | 第 15 页 |
| `#customer/<customerId>` | **Customer 360** | 第 16 页 |

注意：`route()` 现在把第二段当作 case id 处理。`customer` 路由的第二段是 **customer id**，要单独解析，不能调用 `currentCase()` 去匹配它。

#### (a) Portfolio Optimization
- 顶部：4 个 Segment 卡片（Cloud & Data Centers、Telecom、Retail、Healthcare），显示 principal、yield、账户数、占比。移植旧版 `segData()`。
- 主体：**Return × Risk 四象限**，与 deck 布局一致。左上 Grow，右上 Protect and reprice，左下 Improve margin，右下 Restructure or exit。纵轴标 "Higher return"，横轴标 "Risk →"。
  - 象限归属用明确的演示映射：Cloud & Data Centers → Grow；Telecom → Protect and reprice；Healthcare → Improve margin；Retail → Restructure or exit。卡片上标注 "Segment placement is illustrative"。
  - 点击象限中的 Segment，下方展开该 Segment 的客户列表。每个客户链接到 `#customer/<id>`；如果有关联事件，再显示一个链接到该事件的 Recommendations。
- 左侧或上方：4 步说明（Portfolio analysis → Profitability assessment → Risk-adjusted decisions → Recommendations），与 deck 文案一致。
- 把首页的 **Profitability Trend** 面板（`profitabilityPanel()`）移到这个页面。
- Segment performance 表：Principal、Annual revenue、Yield、Operating margin、Risk-adjusted yield（yield − loss）、Recommended focus。

#### (b) Forecast Intelligence
- 图表：**Projected cash inflow**，单位 USD M，按季度。
  - Actual：Q4'25 5.0 · Q1'26 5.2 · Q2'26 5.1 · Q3'26 5.3（实线、深色）
  - Base case：Q4'26 5.4 · Q1'27 5.6 · Q2'27 5.8 · Q3'27 6.0（实线、蓝色）
  - Scenario range：±0.2 / ±0.35 / ±0.5 / ±0.65（浅蓝色区间带）
  - Actual 和 Forecast 之间画一条竖向虚线分隔。
- 情景切换（`.tabs`）：
  - **Base case**
  - **Three renewals slip**：4.9 / 4.9 / 5.0 / 5.1，橙色虚线。假设说明：Retail、North America Data Center、European Network 三笔续约（$10.8M annual）各晚一个季度开始，从 Q2'27 起通过补开票部分回收。
  - **Cloud expansion contracted**：5.8 / 6.4 / 6.6 / 6.8。标注 "Uncontracted upside — not in base forecast"。
- 曲线图请在现有 `chart()` 基础上扩展，或新写一个 `forecastChart()`，支持区间带和分隔线。**不要引入图表库。**
- Revenue projection 三个 KPI（annual value，标注不是预期损失）：
  - Contracted：renewal > 90 天的客户年收入合计
  - Renewal-dependent：renewal ≤ 90 天
  - At risk：renewal ≤ 90 天且 risk 为 High
  - 这三个数从 `customers` 计算，不要写死。
- 右侧列出 deck 的 5 条说明（Forecasting、Scenario planning、Revenue projection、Cash flow projection、Decision support）。
- 每个情景都要给出一条 "Act on the gap" 推荐，并链接到对应事件的 Recommendations：slip 情景链接 `renewal`，upside 情景链接 `expansion`。
- 页头加 Phase 标签："Predictive features · Phase 3"。

#### (c) Customer 360
- 页头放客户选择下拉框；页面上所有客户名都改为链接到 `#customer/<id>`。具体包括：事件上下文条、Top risks、Decision register、NexBill 表格。NexBill 表格同时保留现有的 "Review in LeaseAegis" 链接。
- 布局按 deck 第 16 页做成三栏：
  - **Internal signals**：AR 账龄、flex-down 次数、usage 趋势、margin、距续约天数
  - **Risk view + Opportunity view**：该客户所有相关 case 的 category 和 severity 都列出来；如果有 `secondary`（见 P1-2），也一起列
  - **External signals**：虚线边框，标注 Phase 2
- 底部的 **Recommended actions** 横条：该客户所有相关 case 的 `rec`，每条显示当前决策状态，并链接到 `#decisions/<caseId>`。
- 共享敞口提示：Telecom 有 payment、credit、market 三个事件，对应同一笔 $4.5M AR，页面上要明确写 "Shared $4.5M exposure — counted once"。
- 提供 "View NexBill customer record ↗" 链接。

### P0-3 首页改为"决策首页"（`overview()`）

新的页面顺序：

1. **叙事横幅**，替换现有 journey-banner：
   - 主标题：`Finance has data. LeaseAegis turns it into decisions.`
   - 副标题：`Finance does not need more reports. It needs better decisions — with evidence, financial impact and a tracked outcome.`
   - 保留按钮 `Start the walkthrough →`（`#events/payment`）。
   - **删除**页头的 `Review business events →` 按钮（与上面重复），也**删除**首页的 `process('',CASES[0])` 流程条。
2. **Decisions needed today**：状态为 `Recommended` 的 case，按 severity、next 日期排序，最多 4 条。每条显示：客户、事件、金额和口径、动作类型标签（P1-3）、`Review by <date>`，以及链接到 `#decisions/<id>` 的按钮。
3. **Value delivered**：替代现在的 Business Decision Summary，数据来源见 P0-4。
4. 两栏：Top risks（加入 Retail；已解决的不出现，见 P1-1）和 Top opportunity（保留）。
5. **Portfolio snapshot**：KPI 从 5 个减到 3 个（Total portfolio value、Collection exposure、Upcoming renewals），旁边放两张入口卡片，分别链接 `#portfolio` 和 `#forecast`。
6. Recommended actions 三张卡保留，加动作类型标签。

### P0-4 预置历史闭环，让首页不再全是 0

新增常量 `PAST_DECISIONS`：Q3 2026 已完成的演示历史，**只读**，不写入 localStorage，不影响现有 6 个 case 的演示流程。至少 3 条，客户使用现有 `customers`：

```js
const PAST_DECISIONS=[
 {customer:'europe',type:'Payment Delay',action:'Collect',detected:'2026-08-04',approved:'2026-08-06',completed:'2026-08-29',metric:'Cash collected',target:.5,observed:.6,leadDays:31,note:'Dated commitment agreed before the balance reached 90 days.'},
 {customer:'healthcare',type:'Upcoming Renewal',action:'Renew',detected:'2026-08-18',approved:'2026-08-19',completed:'2026-09-20',metric:'Annual renewal value confirmed',target:2.7,observed:2.7,leadDays:45,note:'Renewal confirmed 45 days before expiry on unchanged terms.'},
 {customer:'datacenter',type:'Margin Pressure',action:'Reprice',detected:'2026-09-02',approved:'2026-09-05',completed:'2026-09-30',metric:'Annualized operating profit improvement',target:.08,observed:.06,leadDays:0,note:'Service cost reduced; price change deferred to renewal. Below target.'}
];
```

**Value delivered** 区块显示 4 个指标，标注 `Pilot metrics · illustrative`。数据为 `PAST_DECISIONS` 加上当前浏览器里已测量的 live 决策：
- Cash collected（只统计 metric 为 `Cash collected` 的结果）
- Renewal value confirmed
- Average warning lead time（天，对应 deck 第 17 页 "Before delinquency"）
- Average decision cycle（detected → approved 的天数，对应 "Days to minutes"）

页面上要写明：不同口径分开显示，不相加。

---

## 2. P1：应该完成

### P1-1 结果回流：让学习闭环可见
- 每个 case 新增 `postScore`：payment 55、retail 52，其他 case 取 `score − 25`。
- case 的决策状态变为 `Outcome Achieved` 后：
  - Business Events 卡片显示 `Resolved` 标签，并排到列表末尾；
  - Analysis 页显示 `score → postScore`，trend 显示 `Improving · after action`，`history` 末尾追加一个点 `Nov`；
  - 首页 Top risks 和 Decisions needed today 不再显示该 case。
- 状态停在 `Completed` 但低于目标时，不改分数，显示 `Outcome below target — risk remains open`。
- 在 Outcome Review 页面（P1-5）加一行说明：`Phase 4 · Learning from FACT_AI_OUTCOME is not active in this demo. Scores here are updated by rule after a verified outcome.`

### P1-2 一个事件可以带多个风险（对应 Deck 第 13 页 Collection HIGH + Renewal MEDIUM）
- case 新增可选字段 `secondary:[[category,level],...]`。设置：payment → `[['Renewal Risk','Medium']]`；retail → `[['Renewal Risk','High']]`；modification → `[['Profitability Risk','Medium']]`。
- Analysis hero 和 Customer 360 的风险视图同时显示主风险和次要风险。

### P1-3 推荐动作使用 Deck 第 12 页的 7 类动作词汇
- case 新增 `actionType`：payment Collect、retail Restructure、modification Restructure、renewal Renew、credit Escalate、market Reprice、expansion Optimize portfolio。
- Recommendations 页、首页卡片、Decision register 都显示 `actionType` 标签，样式为蓝色 pill。
- Recommendations 页加一个可折叠说明块 "How LeaseAegis chooses an action"，列出 7 类动作和各自的触发条件，文案照抄 deck。

### P1-4 Intelligence Signals 补齐到 Deck 的 8 个内部领域
- 把 case 中的 `internal` 数组改成对象，键为 `billing, collection, revenue, contract, change, asset, profitability, usage`。每一行显示对应的 FACT 表名（`FACT_BILLING` 等，小号等宽字体）。
- **Change events** 一行用加粗强调，并标注 `Core behavior signal`。示例：modification 写 "Flex_Down requested (10%) · 1 event in 3M"；telecom 写 "No change events in 12M"；retail 写 "Store closures → 2 Asset_Remarketing requests in 6M"。
- 合并现在重复的 Payment 和 Collection 两行。Billing 行写具体内容，例如 "2 invoices delayed, 1 rejected"，不要再用通用句子。
- 改完后检查所有引用 `c.internal[i]` 的地方（`signals()`、`analysis()`、`showAnalysis()`），一并更新。
- External intelligence 面板使用虚线边框，并加上 `Phase 2 feeds` 标签，与 deck 第 9 页一致。

### P1-5 新增 Outcome Review 页面（`#outcomes`）
- 表格内容：`PAST_DECISIONS` 加上所有 live 决策中已测量的结果。列为：customer、event、action type、target、observed、attainment、lead time、decision cycle。
- 顶部放 Value delivered 的 4 个指标（与首页同一个函数，避免重复实现）。
- 每行可以进入 Customer 360 或对应决策。

### P1-6 导航调整：消除侧栏与流程条的重复
侧栏改为分组，共 7 项：

- `OVERVIEW`：Dashboard
- `INTELLIGENCE`：Business Events · Customer 360 · Portfolio · Forecast
- `DECISIONS`：Decision Center · Outcome Review

规则：
- Signals、Risks & Opportunities、Financial Impact、Recommendations **从侧栏移除**，只通过事件页面内的 6 步流程条访问。
- 当前路由是这四个页面之一时，侧栏高亮 Business Events。
- `renderWorkspaceNavigation()` 中 NexBill 侧的模块导航保持不变。

### P1-7 执行过程更真实
- NexBill 执行面板中，把 "Simulate NexBill execution start" 和 "Simulate execution completed" 两个按钮合并为一个 **`Run execution in NexBill`**。
- 点击后显示 3 个子任务，每个间隔约 700ms 依次打勾。子任务按 module 不同：
  - collections：`Payment reminder issued` → `Credit limit review opened` → `Customer commitment logged`
  - contracts：`Scope change drafted` → `Account team notified` → `Contract amendment queued`
  - portfolio：`Cost review opened` → `Pricing proposal prepared` → `Renewal terms flagged`
- 状态依次推进 Approved → In Progress → Completed，复用现有 `transition()` 和守卫逻辑，每一步都写入 history。
- 动画进行中禁用按钮；重复点击不能产生重复的状态变更。

### P1-8 减少免责说明
- 顶栏 `INTERACTIVE DEMO` 旁边新增按钮 `Assumptions`，点击打开一个 dialog，集中列出 README 中 "Demonstration boundaries" 的要点（英文）。
- 删除各面板中重复的 `.note` 免责说明，每页最多保留 1 条与当前页面直接相关的说明。保留页脚的全局说明。
- **保留**必要的财务口径说明：共享敞口不重复计算、机会金额未签约。把它们改成短标签放在数字旁边，不再用整段文字。

---

## 3. P2：清理

1. **删除** Analysis 页的 `Open detailed analysis ↗` 按钮和 `showAnalysis()` 弹窗，内容和当前页面重复。
2. **删除** Financial Impact 页的 `Prioritization context` 进度条面板（宽度是写死的 `(5-rank)*24`）。
3. Financial Impact 的 6 个影响块中：
   - 值为 "Not quantified / Not estimated / No change booked" 的块不再单独成块，合并为一行 `Not quantified for this event: Margin, Portfolio yield`；
   - 删除每个块底部的 `Severity…` 和 `Priority P…` 标签（删掉 `impactRating()`）。
4. 风险分数类图表的纵轴固定为 0–100（现在因为 `max*1.18` 会出现 103.8）。给 `chart()` 增加可选的 `{min,max}` 参数。
5. Advisor 面板：**删除自由文本输入框** `#brief-form`，只保留 4 个预设问题按钮，并新增一个 Retail 相关的 brief。
6. Decision Center 顶部 6 张状态卡合并为 4 张：Pending Review · In Execution（Approved + In Progress）· Completed（Completed + Outcome Achieved）· Rejected。筛选逻辑同步调整。
7. Decision register 中，超过 `targetDate`（以 2026-10-22 为基准）且未完成的行显示 `Overdue` 标签。
8. 决策表单中的 Decision rationale 改为非必填，并提供 3 个快捷选项：`Approve as recommended` / `Adjust target` / `Insufficient evidence`。
9. Settings 弹窗删除指向 `.md` 文件的链接。
10. 用 `git mv` 把旧原型移到 `archive/`：`nexbill-legacy.html`、`previous-copilot.html`、`leaseaegis-workspaces.html`、`leaseaegis.js`、`app.js`、`copilot.js`、`workflow.js`、`v3.js`、`intelligence.js`、`decision-*.js`、`english-locale.js`、`compact.js`、`events.js`、`workspaces.js`、`styles.css`、`nexbill.css`，以及除 `validate-operating-model.cjs` 以外的所有 `validate-*.cjs`、`validate.cjs`，还有除 `preview-operating-*.png` 以外的旧截图。
    - **不要移动 `leaseaegis.css`**，`index.html` 还在用它。
    - 移动前先确认所需函数已经移植完成。

---

## 4. 校验（必须通过）

更新 `validate-operating-model.cjs`，然后运行：

```
node --check operating-model.js
node validate-operating-model.cjs
```

校验脚本需要覆盖以下内容：
- 侧栏链接数为 7，并检查分组标题。
- 事件路由循环加入 `retail`。
- 新路由 `portfolio`、`forecast`、`outcomes`，以及 6 个客户的 `customer/<id>`：每页只有一个 `h1`、没有中文字符，在 1440px 和 390px 宽度下都没有横向溢出。
- 删除对 `[data-analysis-detail]` 的点击断言。
- 执行流程改为点击 `Run execution in NexBill` 后等待约 2.5 秒，再断言状态为 Completed。
- payment 达成结果后：Analysis 页显示 postScore，首页 Top risks 不再包含 payment。
- Forecast 切换情景后，图表的 `aria-label` 随之变化。
- Value delivered 在 localStorage 为空时显示非零值（来自 `PAST_DECISIONS`）。
- 旧版本保存的决策数据（`Recommended` / `Outcome Achieved` 状态）仍然能正常显示。

最后更新 `README.md`：页面清单、五分钟演示脚本（见下）、文件清单。如果环境允许，重新生成 `preview-operating-dashboard.png`。

---

## 5. 验收：五分钟高管演示脚本

1. **Dashboard**：第一眼看到两句核心话、"Decisions needed today"，以及非零的 "Value delivered"。
2. 点击 `Start the walkthrough` → Payment Delay 事件 → Signals：8 个内部领域，外部信号标 Phase 2。
3. Risks：Collection HIGH + Renewal MEDIUM。
4. Impact：$4.5M，影响块简洁、不重复。
5. Recommendations：动作类型为 `Collect`，A/B/C 方案对比。
6. Decision Center：一键选择 "Approve as recommended" → `Open approved action in NexBill` → `Run execution in NexBill` 自动完成。
7. 返回后记录结果 $1.5M → 风险分数从 88 降到 55 → 首页 Top risks 更新，Value delivered 增加。
8. 点击侧栏 Portfolio：四象限；点击 Forecast：切换 "Three renewals slip"；点击 Customer 360（Telecom）：三个事件汇总，共享敞口只计算一次。

整个流程不能出现：控制台报错、中文 UI 文字、横向滚动条、风险分数纵轴超过 100、高风险客户没有对应事件。
