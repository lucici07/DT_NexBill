# Decision Workspace：方案评估与 Finance 决策

当前重点演示路线：Business Risk Feed → Workforce Reduction → Review Impact → Global Telecom Operator → Review Decision。

也可直接打开 index.html#decision/workforce/0。

顶部显示 Workforce Reduction、Global Telecom Operator、$5.2M潜在收入敞口、HIGH续约风险和MEDIUM回款风险。风险等级为案例假设。

中部并排比较Maintain Pricing、Increase Pricing +5%、Retention Package，包含Expected Outcome、Revenue Impact、Renewal Success Probability、Pros和Cons。Option C突出显示为AI推荐，右侧Finance Copilot简述原因、风险和假设。概率为演示假设，合同报价不等于已确认收入。

底部Finance Decision Capture包含Selected Decision、Reason / Comments、Decision Owner、Decision Date：

- **Save Decision**：保存Finance的选择，不生成Nexbill申请；刷新后可继续编辑。
- **Submit Through Nexbill**：使用同一份内容创建待审批申请，不需要重复填写。提交后锁定表单，避免重复申请；可模拟批准、拒绝和生效。

AI Recommendation与Finance Decision并列显示，可以不同。Business Outcome仍在历史区域独立记录，审批不等于业务改善。示例日期为2026-10-01，用户可修改。

原型未连接生产Nexbill，所有操作保存在本地浏览器。新增decision-workspace.js须与其他入口脚本放在同目录。node validate-decision.cjs验证方案显示、选择差异、保存、刷新、单次提交和审批。预览：preview-decision-workspace.png。旧续约测试中针对旧表单的步骤已不适用。

---

以下保留此前版本说明，Decision Workspace以本节为准。

# V3：Business Event → Finance Decision → Nexbill Execution

## 三层体验

1. **Business Risk Feed**：New Business Events 展示事件、潜在收入敞口/增长机会、真实对应的演示客户数量、Priority 和 Suggested Next Step。
2. **Impact Analysis**：What Changed、AI Interpretation、Finance Impact、受影响续约和客户数量。Affected Customer Portfolio 按敞口金额排序；提供收入预测、客户决策和增长机会入口。
3. **Customer 360 + Decision Workspace**：保留事件背景，查看收入、毛利、应收、续约日期、内部和外部信号，再比较行动并提交决定。缺失的历史开票趋势明确显示不可用，不伪造趋势。

## 方案与决策闭环

Industry Investment Slowdown → Global Telecom Operator → Review Decision 展示 Maintain Pricing、Increase Price +5%、Retention Package。每个方案提供 Probability、Pros、Cons、Exposure Impact。概率仅为假设的续约接受率，不是预测结果，各方案概率不要求合计100%。示例AI推荐Retention Package，Finance仍可选择Maintain Pricing。

业务表单提交一次即关联AI推荐、Finance选择、备注、事件及客户。Decision Capture展示Nexbill审批状态，并独立记录Business Outcome。结果可多次追加，需填写观察日期和依据；审批/生效不自动等于改善，不自动修改财务报表。

首页不设客户选择器。影响组合的计数来自实际演示关联数据，未把3个可查看客户虚标成36个；行业放缓样例覆盖3个客户、12项续约、$8M敞口。金额不是预计损失，不同事件不可简单相加。

## 使用与验证

刷新 index.html，点击 Nexbill 标志进入 Business Risk Feed。入口文件新增 v3.js，请与其他脚本放在同一目录。

node validate-v3.cjs 验证方案显示、AI建议与人工选择差异、业务结果记录，以及完整事件流程、审批、刷新保存、账户隔离、移动端布局。所有数据和执行为本地模拟，未连接生产系统。

---

以下保留早期设计说明，当前流程以以上 V3 为准。

# 当前版本：事件优先的 Finance Copilot

首页改为 Business Risk Feed，不再从客户选择开始。此次更新保留 Nexbill 为业务执行平台。

## 用户旅程

1. **Business Risk Feed**：查看 Workforce Reduction、Credit Outlook Downgrade、Industry Investment Slowdown、Expansion Opportunity。卡片显示业务变化、影响金额和受影响客户数量。
2. **Impact Analysis**：查看事件、AI解释、财务影响和关联客户。收入敞口不是预计损失，回款敞口不是坏账，增长机会不计入已确认收入。不同事件可能影响同一客户，不能简单相加。
3. **Customer 360**：从事件进入客户，保留事件背景，并核对当前收入、应收、毛利和发票。不会将外部消息直接改写成业务结果。
4. **Decision Workspace**：比较建议和备选行动。一键继续监控可记录无业务变更的决定；需要行动时，在嵌入的 Nexbill 业务表单提交一次，自动关联事件、AI建议、所选方案及备注。审批和生效仍归属 Nexbill。

## 演示路线

打开 index.html，按 Ctrl+F5 刷新。若浏览器保留旧页面地址，点击左侧 Business Risk Feed 或 Nexbill 标志返回首页。

Industry Investment Slowdown → Review Impact → Global Telecom Operator → Review Decision → Continue monitoring，或选择业务方案并提交模拟申请。随后可以模拟审批和生效。返回首页查看另一事件，可进入另一个受影响账户，独立记录决定。

## 界面原则

首页聚焦“市场发生了什么变化”，不显示客户选择器。每个事件的详细依据和假设按需展开。客户页面作为核对财务事实的中间步骤，决策页面始终保留来源事件。Nexbill 原有报表与业务导航继续可用。

## 文件与验证

入口新增 events.js，需与 index.html、nexbill.css、intelligence.js、workflow.js、compact.js 放在同一目录。

node validate-events.cjs 验证事件首页、多客户跳转、上下文保存、不重复关注、业务申请与审批、财务基线不变、刷新持久化、无效链接和移动端布局。预览图：preview-event-feed.png。

所有事件、客户关联、金额和审批为本地模拟。记录仅保存在当前浏览器。未连接真实舆情、生产 Nexbill 或跨用户共享服务。

---

以下为此前版本的设计/操作记录；入口与用户旅程以本节为准。

# Nexbill AI support — 账户智能助手

打开 `index.html` 即可体验；已打开时按 Ctrl+F5。请将 `index.html`、`nexbill.css`、`intelligence.js`、`workflow.js`、`compact.js` 保留在同一目录，无需安装或服务器。

## 当前交互

主区域模拟 Nexbill，右侧为随账户或分析范围切换的 AI 插件。

- 需要改变业务：在右侧点击“去 Nexbill 处理”，到业务表单提交一次；也可直接从 Nexbill 提交。
- 暂不改变业务：右侧一键继续监控，无需填写决策表单。
- AI 自动关联业务申请、备注、审批和生效状态，持续跟踪外部舆情与内部数据变化。
- 待审批、批准待生效、已生效、已拒绝分别展示。状态同步不会清除未复核的风险提醒。

## 演示

选择 Global Telecom Operator，查看账户证据 → 进入“关注与跟踪”继续监控 → 模拟下一条更新 → 查看风险提醒 → 去 Nexbill 提交续约申请 → 模拟审批和生效 → 回看 AI 自动跟踪。

开票与应收支持筛选、明细和 CSV 导出。收入区区分标准交易和已确认 Change Events。盈利分析支持客户、国家、Tranche及硬件/服务拆分。舆情支持账户关联、证据排除和消息更正；未核验传闻不参与数值推演。Repricing为盈利面板内的次级建议能力。

## 范围

全部账户、财务数字、外部事件和压力情景为模拟。未连接生产 Nexbill、新闻源或后台定时抓取；不会执行真实合同、开票或付款交易。

本例业务申请影响未来续约条款；只有模拟生效后才改变页面显示的有效续约条款，不改写当前季度收入基线或发票。模拟数据更新可另行演示回款和成本变化。

账户记录保存在当前浏览器的 `nexbill-ai-support-loop-v1` 中，不跨设备同步。写回 AI 表示保存账户上下文。示例包含12个账户；未验证生产规模。毛利不包含未提供的税费、融资及共享成本。PN report口径待确认。

## 文件与验证

- `intelligence.js`：财务样例、证据、分析与监控。
- `workflow.js`：简化处理入口、Nexbill模拟申请与状态自动跟踪。
- `node --check intelligence.js` 与 `node --check workflow.js`：语法检查。
- `node validate-workflow.cjs`：使用本地 Windows Chrome 和独立临时 profile，验证一键关注、不重复记录、业务单次提交、直接提交、状态同步、非法状态跳转拦截、风险提醒保留、财务基线不变、账户隔离、持久化、备注转义与移动端布局。
- `preview-simple-tracking.png`：本轮页面预览。
- `使用说明书.md`：中文操作说明。
- `Nexbill_AI设计说明.md`：产品设计与职责划分。

`previous-copilot.html` 及其引用的旧文件保留为上一版。`validate.cjs`、`validate-support.cjs` 对应历史交互，不作为当前入口的验证脚本。

## 资料依据

Intelligence Platform V2提供业务事件、财务理解、风险预测和辅助决策方向；NexBill KUT提供开票状态、Change Events和ARS等业务入口；Finance & Accounting BSR提供财务口径及硬件/服务拆分要求。以上为设计资料，并非真实客户数据或已连接的数据源。


## 最新版：简洁的多事项入口

右侧默认只显示回款跟进、收入变化、盈利改善、续约安排四张事项卡片，每张只显示名称和一个关键指标；并不表示四项均为已确认风险。

点击事项后，显示一条优先建议、一句影响说明和“去 Nexbill 处理”。其他方案、分析依据及历史记录默认折叠，按需展开。继续监控仍为一键操作。

回款、收入、盈利和续约分别进入对应的 Nexbill 页面提交模拟业务申请，各事项可同时存在并独立跟踪状态。非续约申请不会改变续约条款，也不会直接修改收入或应收。持续监控仍以账户为整体。

外部证据默认收起。“与本账户无关”只排除当前账户关联，原消息保留。当前为浏览器本地演示，未实现跨用户同步；共享核验及全平台更正属于后续集成范围。

验证：`node validate-compact.cjs` 覆盖多事项独立申请、页面路由、默认折叠、证据账户范围和移动端。新版预览：`preview-compact-ai.png`。




## English Decision Workspace
See Decision_Workspace_Guide.md. Entry includes decision-english.js. Current validation: node validate-decision-english.cjs. Approved feed and impact layouts are retained; affected-customer links open decisions directly.

