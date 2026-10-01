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

# Nexbill AI support 产品设计说明

## 产品判断

AI应该是Nexbill原有业务工作中的辅助插件，而不是另建一个AI平台。用户在看发票、回款、收入或盈利时，助手自动带入同一账户或分析范围。报表负责给出事实，AI负责解释原因、推演影响、提醒后续变化。

本轮重点不是给旧dashboard增加指标，而是把“做完一次分析”改为“持续维护账户判断”。


## 本轮简化：一次提交，自动跟踪

右侧“关注与跟踪”只提供两个处理入口：

1. **去 Nexbill 处理**：进入原平台业务表单，选择方案并填写一次备注。提交后，AI自动关联申请和后续状态；用户直接从Nexbill提交时也同样生效。
2. **暂不处理，继续监控**：保存当前判断与默认监控设置，不创建业务申请，不要求填写表单。

Nexbill负责业务提交、审批和生效；AI负责解释、关联和持续监控。用户无需为了让AI记住决定而再提交一次。申请状态明确区分“已提交·待审批”“已批准·待生效”“已生效”和“已拒绝”。批准不等于已生效，拒绝也不改变有效条款。

自动记录包含当时AI建议、证据快照、业务选择、原申请备注、申请编号及状态变化。继续监控和人工复核同样保留历史。业务状态同步不代表风险已复核，不能自动消除尚未处理的提醒。

原型中的申请、审批、生效均为本地模拟。本例未来续约条款生效后，不改写当前季度收入或发票。真实平台集成后的状态同步是产品设计目标，本地原型通过模拟操作展示这一行为。

## 核心对象：一个持续更新的账户判断

一份账户判断由五部分组成：

1. 财务基础：历史收入、当前开票/应收、合同及Change Events、硬件与服务成本。
2. 外部证据：客户经营、信用、行业消息；有日期、来源、主体关联与核验状态。
3. 财务解释：未来收入、回款和盈利可能受什么影响，依据和假设是什么。
4. 人工决定：需要调整业务时在Nexbill提交一次，AI自动关联申请和备注；暂不调整时一键继续监控，使用默认监控设置。
5. 后续结果：新证据、内部数据变化、规则命中、复核决定及实际结果反馈。

“决定”不是结束状态，而是后续监控的上下文。AI知道之前决定了什么、新信息改变了哪个前提、为什么需要再次提醒。

## 舆情监控应做到什么

- 覆盖经营事件、信用变化、行业资本开支和需求变化，而不只统计正负情绪。
- 先核对账户主体和来源，避免同名企业、未核验传闻影响财务数字。
- 把消息映射到账户收入基线、AR及合同/服务范围，解释潜在传导路径。
- 对消息更正和补充披露重新评估；过时依据撤出当前判断，旧决定仍保留当时证据。
- 根据已有决定和监控条件提醒复核，避免反复生成无关联建议。
- 同时接收内部结果反馈：回款改善不当作风险恶化，成本压力按阈值判断。

原型把上述闭环做成可点击演示。真实上线仍需采购/接入外部信息、确认账户实体匹配和数据权限；不应把页面显示的模拟来源当作已完成连接。

## 老板提出的六类能力如何落位

| 能力 | 职责 | AI增加的价值 |
|---|---|---|
| PN report | 事实层；具体口径待确认 | 在报表口径明确后解释变化，不自行定义报表 |
| 收入预测 | 标准交易与已确认Change Events分别构建基线 | 引入新的经营信号，提出下行/机会情景及待核实假设 |
| 舆情监控 | 核心AI能力 | 从事件到财务影响，再到既有决定的持续复核 |
| Billing / AR状态 | 基础数据及业务报表 | 结合信用/经营情况识别需要提前跟进的账户 |
| Leasing盈利分析 | 核心AI能力 | 按客户、国家、Tranche解释毛利变化，拆分硬件/服务和成本驱动 |
| Repricing | 次级建议 | 在风险与毛利约束下比较价格、服务范围和合同边界；最终由业务决定 |

## 盈利分析要避免的误区

有收入不等于能够算完整利润。需要确认成本归集、硬件服务拆分、融资与税费、跨国分摊口径。原型演示毛利，明确不包含未提供的成本项。

“解释差异”与左侧表格共用同一筛选范围。国家汇总不直接套用某一个客户的新闻；需要回到具体客户验证。

Repricing不能只回答“涨多少”。应同时考虑服务包含项、维护责任、超量计费、承诺范围和客户可承受性；缺少市场/竞争数据时，不声称已经证明价格更有竞争力。

## 建议的业务验证顺序

1. 用少量重点账户验证“舆情是否真的改变财务决定”，先明确哪些事件值得监控。
2. 对齐客户—合同—Tranche—发票—收入—成本关系，验证基础报表口径。
3. 财务专家复核历史事件与后续结果，检验财务推演和提示是否有用。
4. 明确监控责任人、频率、复核条件以及证据更正流程。
5. 在有足够成本及合同历史后，再扩大Repricing建议范围。

这不是对业务结果的保证；应以减少无关提醒、缩短识别到复核时间、提高决策可追溯性来验证产品价值。

## 推荐给老板看的演示故事

“这是Nexbill的一张正常应收报表。客户收入还稳定，但右侧助手把新的信用与经营消息关联到了这个账户，提示未来压力。财务可以一键继续监控，也可以去Nexbill提交续约申请。AI自动关联业务申请和状态，无需重复填写。随后出现新的信用下调，助手不是再给一张新报表，而是明确指出：它影响了我们刚才那个决定的前提。财务复核后保留历史，监控继续。”

这一条故事同时说明：现有数据怎么用、AI在哪里提供新增判断、决定怎样反馈、舆情监控为什么要持续。

## 资料依据

Intelligence Platform deck提供理解—预测—决策层次及账户案例。KUT提供实际业务流程和Invoice Payment Status Tracking / Change Event Report等入口。Finance & Accounting BSR提供财务口径、会计明细和硬件服务拆分要求。它们是需求与设计资料，不等于已经取得真实客户数据。

本轮新要求优先于旧原型结构：舆情闭环为核心，盈利理解为另一重点，基础报表与次级Repricing围绕它们配合。



## 最新版：简洁的多事项入口

右侧默认只显示回款跟进、收入变化、盈利改善、续约安排四张事项卡片，每张只显示名称和一个关键指标；并不表示四项均为已确认风险。

点击事项后，显示一条优先建议、一句影响说明和“去 Nexbill 处理”。其他方案、分析依据及历史记录默认折叠，按需展开。继续监控仍为一键操作。

回款、收入、盈利和续约分别进入对应的 Nexbill 页面提交模拟业务申请，各事项可同时存在并独立跟踪状态。非续约申请不会改变续约条款，也不会直接修改收入或应收。持续监控仍以账户为整体。

外部证据默认收起。“与本账户无关”只排除当前账户关联，原消息保留。当前为浏览器本地演示，未实现跨用户同步；共享核验及全平台更正属于后续集成范围。



