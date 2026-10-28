# NexBill / LeaseAegis 网页交互使用说明

> 2026-10-27 更新：本版已按 alignment brief 调整。导航分为 OVERVIEW / INTELLIGENCE / DECISIONS，共七项；事件六步流程保留在页内。新增 Retail 风险事件、Customer 360、Portfolio、Forecast、Outcome Review。Decision rationale 为选填。批准后使用 Run execution in NexBill，一次启动三项模拟任务。Value delivered 包含独立标明的三条 Q3 历史示例与已测量结果；达标后按预设规则调整风险分数，未达标仍为开放风险。完整当前演示步骤见 README.md。

编写日期：2026-10-27 · 适用于当前本地交互原型

网页界面为英文，本文保留实际按钮名称，便于对照操作。页面数据快照为2026-10-22，不代表实时数据。

## 1. 打开网页与认识导航

用 Chrome 或 Edge 打开项目中的 `index.html`，保留项目文件在同一文件夹。如果显示旧版界面，按 **Ctrl + F5** 刷新。

| 位置 | 用途 | 操作后的变化 |
|---|---|---|
| 顶部 NexBill 导航 | 进入 Billing、Collections、Contracts、Customers、Portfolio | 左侧切换为 NexBill 业务菜单，当前模块高亮 |
| 顶部 LeaseAegis | 进入财务智能工作区 | 左侧显示 七个分组导航入口 |
| LeaseAegis 页面上方的流程条 | 在事件、信号、风险、财务影响、建议、决策之间切换 | 保留当前事件和客户 |
| Event context 下拉框 | 切换正在分析的事件 | 当前页面改为新事件的内容 |
| 右上角 Advisor | 打开辅助问答侧栏 | 主流程仍保留，关闭侧栏后可继续操作 |

**NexBill 管理业务记录和执行；LeaseAegis 提供分析和建议；Finance 作出决定。**

顶部 NexBill 标志可返回首页。手机屏幕较窄时，顶部模块导航、左侧转为横排的菜单以及六步流程条可左右滑动。

## 2. 第一次使用：按这条路线操作

建议先完整体验一个案例：**Global Telecom Operator 的 Payment Delay**。

### 第一步：从首页找到待关注事项

1. 点击顶部 **LeaseAegis**，再点左侧 **Dashboard**。
2. 查看 Portfolio Value、Collection Exposure、Upcoming Renewals、Top Risks 等信息。
3. 点击 **Start the walkthrough**，进入 Payment Delay 事件。

此时应看到 Global Telecom 有 **$4.5M 应收逾期超过90天**。这个金额是待处理应收，不是已经确认的损失。

### 第二步：查看 Business Events

这个页面回答：**发生了什么，为什么需要关注？**

- 在搜索框输入客户名或事件关键词，筛选事件卡片。
- 使用 **Severity** 筛选严重程度。
- 点击事件名称，将该事件设为当前分析对象。
- 点击卡片的 **Review signals**，或当前事件区域的 **Examine intelligence signals**，进入信号页。

事件卡包含客户、潜在影响、检测日期、下次复核日期和建议行动。搜索仅筛选列表，不自动改变上方已选事件；需要点击具体事件才能切换。

### 第三步：查看 Intelligence Signals

这个页面回答：**哪些信息支持这次判断？**

1. 阅读 **Internal Intelligence**：合同、开票、支付、催收与组合指标。
2. 阅读 **External Intelligence**：信用、行业、市场、舆情和客户业务背景。
3. 查看 **Evidence strength**、变化趋势及 **Signal timeline**。
4. 如需核对业务记录，点击 **View NexBill record**。
5. 在 NexBill 页面点击 **Return to LeaseAegis**，返回当前分析。
6. 点击 **Assess risks and opportunities** 继续。

外部信息为演示背景，不是已接入的实时新闻。证据强度和 Confidence 也不是事件发生概率。

### 第四步：查看 Risk & Opportunity Analysis

这个页面回答：**这些信息意味着什么风险或机会？**

1. 查看风险或机会类型、分数、趋势方向和置信程度。
2. 阅读主要驱动因素和 Business summary。
3. 点击 **Open detailed analysis** 打开详细分析弹窗；点击右上角 **×** 关闭。
4. 点击 **Quantify financial impact** 继续。

右侧风险与机会图中的卡片可以点击。点击另一类分析时，会切换到它对应的事件和客户；继续前请核对上方 Event context。

### 第五步：查看 Financial Impact Assessment

这个页面回答：**会影响多少钱、什么时候，以及哪个财务指标？**

依次查看 Revenue、Cash Flow、Margin、Working Capital、Credit Exposure 和 Portfolio Yield 的影响。

以 Payment Delay 为例：现金流延迟和营运资金占用都可能引用同一笔 $4.5M 应收，不能相加为 $9M 风险。

- `Not estimated` / `Not quantified`：当前演示信息不足，未给出量化估计。
- 年合同价值不等于当期收入，现金延迟也不等于坏账。
- 页面中的目标金额是希望实现的结果，不是承诺收益。

查看影响如何对应到行动后，点击 **Compare recommended actions**。

### 第六步：比较 Recommendations

这个页面回答：**应该采取什么行动，替代方案有什么代价？**

1. 核对推荐原因、Expected benefit、Owner、Target completion 和状态。
2. 比较 Option A / B / C 的 Benefit 与 Trade-off。
3. **Recommended** 标识代表平台建议，不代表 Finance 已批准。
4. 点击 **Choose this option**，所选卡片会显示 **Selected for Finance review**。
5. 点击 **Review and decide** 进入决策中心。

选择方案只是带入待审表单，尚未批准，也没有执行。Finance 可以选择与平台建议不同的方案。

### 第七步：填写 Finance 决定

在 **Business Decision Center** 中，确认当前状态为 **Pending Review**，填写：

| 字段 | 含义 | Payment Delay 演示填写示例 |
|---|---|---|
| Selected action | Finance 最终选择的行动 | A · Collect and review credit |
| Decision owner | 负责推进的人 | Maya Chen · Collections |
| Target completion date | 目标完成日期 | 2026-10-28 |
| Outcome target · USD millions | 希望实现的结果金额 | `1.5`，即150万美元 |
| Decision rationale | 批准、调整或拒绝的理由 | `Confirm payment commitments and review the credit limit.` |

注意输入金额以 **百万美元**为单位：`1.5` 是150万美元，`0.15` 是15万美元，不要输入 `1500000` 来表示150万美元。各事件允许的最大目标不同，按表单校验填写。

- 点击 **Approve selected action**：记录批准，状态变为 Approved。
- 点击 **Reject recommendation**：记录拒绝，状态变为 Rejected。

两种操作都需要填写完整表单，包括理由。批准后，平台建议、Finance 所选行动、NexBill 执行状态会分开显示。

### 第八步：进入 NexBill 模拟执行

1. Approved 状态下点击 **Open approved action in NexBill**。
2. 网页会进入对应的 NexBill 模块，左侧同步切换为业务菜单。
3. 核对带入的客户、推荐方案、Finance 批准方案、负责人和目标日期，无需重复填写。
4. 点击 **Run execution in NexBill**，状态变为 In Progress。
5. 等待三项任务依次完成，状态自动变为 Completed。
6. 点击 **Return to LeaseAegis outcome review**，返回结果评审。

回款与信用案例在 Collections 模块执行，合同相关案例进入 Contracts，利润策略案例进入 Portfolio。执行按钮位于 NexBill 业务区域，不在 LeaseAegis 的批准表单里。

### 第九步：记录结果并检查目标

1. 在 **Outcome measurement** 中输入观察到的模拟结果。
2. 填写 **Evidence / result summary**，说明结果依据。
3. 点击 **Record simulated outcome**。

例如，目标为 `1.5`：

| 观察结果 | 填写依据示例 | 页面结果 |
|---|---|---|
| `1.5` | `Demo receipt confirms $1.5M collected.` | Business Outcome Achieved，目标达成率100% |
| `1.0` | `Demo receipt confirms $1M collected.` | Completed，说明结果未达到目标 |
| `0` | `Review completed; no cash collected yet.` | Completed，记录零回收结果 |

**Completed 表示行动完成，不等于业务目标已达成。**

记录结果后返回 Dashboard，查看 **Value delivered**。其中现金回收单独汇总，不与收入、利润或重复信用敞口变化相加。

## 3. 查看决定、历史与重新评审

| 想做什么 | 操作 |
|---|---|
| 筛选决定 | 点击 Decision Center 顶部状态卡，或在 Decision register 中选择 Status |
| 恢复全部列表 | 在 Status 下拉框选择 All statuses |
| 查看另一事件 | 在 Decision register 对应行点击 Open |
| 查看推荐与决定历史 | 展开 Recommendation & decision history |
| 重新评审被拒绝的建议 | 在 Rejected 状态点击 Reopen Finance review，再填写并提交 |
| 查看正在执行的行动 | 在 In Progress 状态点击 View execution in NexBill |

状态筛选只影响下方 Decision register，不自动切换上方当前事件详情。

当前原型不提供撤销已批准决定、重新编辑已记录结果或一键重置全部演示的入口。已批准后方案按钮变灰是状态控制，不是页面卡住。

## 4. 六种状态快速对照

| 状态 | 含义 | 下一步 |
|---|---|---|
| Pending Review | 等待 Finance 评审 | 填写表单并批准或拒绝 |
| Approved | 已批准，尚未执行 | Open approved action in NexBill |
| Rejected | 已拒绝，不执行 | 如需重评，Reopen Finance review |
| In Progress | NexBill 模拟执行中 | View execution in NexBill |
| Completed | 执行完成，结果未记录或目标未达成 | 若未记录，填写 Outcome measurement |
| Business Outcome Achieved | 已记录结果且达到目标 | 查看结果与历史 |

## 5. 其他入口怎么使用

### NexBill 业务模块

| 入口 | 当前可查看的内容 |
|---|---|
| Billing | 客户开票余额、逾期余额、开票跟进 |
| Collections | 应收、逾期天数、支付状态及已批准的相关行动 |
| Contracts | 合同数量、年收入、续约时间及范围变更 |
| Customers | 客户、行业、国家及融资本金 |
| Portfolio | 组合本金、年收入、经营利润率和收益率 |

记录表中的 **Review in LeaseAegis** 会进入该客户关联的分析。`No active intelligence event` 表示当前演示没有为该客户配置事件，不代表已经证明客户完全无风险。

### Advisor

1. 点击右上角 **Advisor**。
2. 点击五个预设问题之一，包含 Retail 简报。
3. 面板直接显示对应简报。
4. 阅读 **Observation → Business Impact → Recommended Action**。
5. 点击 **Review the related recommendation** 跳转到相关建议，或点 **×** 关闭。

Advisor 是基于当前演示组合的预置简报，不是真正联网的开放式聊天。当前不提供自由文本输入。

### Settings / Profile / Notifications

- **Settings**：查看语言、币种、数据快照、保存范围。当前为说明型配置面板。
- **Profile**：查看演示用户与角色，不是真实身份认证页面。
- **Notifications**：查看基于演示快照的待复核事件；点击通知进入对应事件。

## 6. 常见问题

**为什么左侧菜单会变？**

进入 NexBill 模块时显示业务菜单；进入 LeaseAegis 时显示分析流程菜单。这是当前工作区切换。

**页面打开后不是首页？**

浏览器地址中的 `#...` 可能保留了上次位置。点击顶部 NexBill 标志，或进入 LeaseAegis 后点击 Dashboard。

**按钮变灰、表单不再显示？**

先看当前状态。Approved 之后需要进入 NexBill 执行；Completed 之后需要记录结果。已完成评审的方案不支持直接修改。

**批准按钮为什么没有反应？**

检查必填项、目标日期、金额上下限是否有效；理由现在为选填。表单校验未通过时不会记录决定。

**刷新后记录还在吗？**

已提交的决定、历史与结果通常保留在同一浏览器、同一路径下。未提交的输入和方案选择不保证恢复。换浏览器、移动文件或清理站点数据可能使原记录不可用。

**给老板分享后，他能看到我的决定吗？**

当前记录保存在你的浏览器中，不跨用户或设备同步。分享网页文件或地址不会自动分享你的本地决定历史。

**为什么首页日期与今天不同？**

这是固定演示快照，数据日期为2026-10-22。页面没有接入实时数据，也不会按当天自动更新风险或通知。

**模拟回款后，NexBill 应收余额为什么没变？**

业务记录是只读基线快照，模拟结果用于展示决定是否达成目标，不会改写发票、合同或支付账目。

## 7. 首次给老板演示时的讲解主线

> NexBill 保存并执行业务记录。LeaseAegis 在这些业务记录之上识别变化、评估财务影响、比较行动方案。Finance 决定是否采取行动，再交给 NexBill 执行，最后在 LeaseAegis 查看结果是否达到目标。

演示时沿一个事件走完上述九步即可，不必一开始展示所有菜单。核心区别是：**看见风险 → 判断影响 → 作出决定 → 执行 → 验证结果**。

## 新版补充 / Alignment update

| Entry | 操作 / Interaction |
|---|---|
| Customer 360 | 点击客户名称，或选择客户，查看内部信号、外部背景、关联事件与行动。Select a customer to inspect its signals, events and actions. |
| Portfolio | 点击四象限或分组查看客户，并对比收益与风险。Explore the four quadrants, segments and profitability trend. |
| Forecast | 切换 Base / Three renewals slip / Expansion 情景；预测为 Phase 3 演示。Switch scenarios to compare illustrative quarterly revenue. |
| Outcome Review | 查看三条只读历史示例和已测量结果；不同财务指标分别汇总。Review pilot examples and measured results without mixing financial measures. |
| Assumptions | 查看集中说明：演示数据、阶段范围及本地保存限制。Review demonstration assumptions and storage limits. |

新增 Retail 事件支持 Collection High 与 Renewal High 风险，以及 Collections 执行入口。达标事件标记 Resolved 并按固定规则调整分数；未达标风险继续开放。这不是自动模型学习。

Retail now has an active event with Collection High and Renewal High risk and a Collections execution route. Achieved outcomes resolve the event and apply a preset score change; below-target outcomes leave the risk open. This is a demonstration rule, not automatic model learning.
