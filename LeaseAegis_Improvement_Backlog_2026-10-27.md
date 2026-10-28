# LeaseAegis 原型改进清单

**整理日期：** 2026-10-27
**评审对象：** 当前版本，即 `codex-alignment-brief` 分支 `a680d17`（一屏桌面版）
**当前评分：** 约 95 / 100，可以直接用于高管演示。下面的问题都不影响演示主流程。

**优先级说明：**
- **P1**：高管或老板很可能追问；涉及数字可信度或口径，建议下一轮先修。
- **P2**：影响理解；页面能看，但容易被误读。
- **P3**：视觉细节。

---

## 一、需要老板或业务方确认的问题（适合在汇报时提出）

这些问题不是代码能决定的，需要业务口径。

| # | 问题 | 现状 | 需要确认什么 |
|---|---|---|---|
| D1 | Portfolio 四象限的两条门槛 | 回报门槛 8.0%、风险容忍度 1.0% 是演示参数 | 实际的 return hurdle 和 risk appetite 应该定多少 |
| D2 | 机会金额怎么估算 | Cloud 的 $4.0M 是直接写进数据里的数，没有推导过程 | 机会金额的估算方法，例如"新增容量 × 单价 × 预计份额" |
| D3 | 象限名称 "Improve margin" | Healthcare 的营业利润率是 24%，并不低，它低的是收益率 | 沿用 deck 原文，还是改成 "Improve return" |
| D4 | Phase 1 试点范围 | deck 第 24 页写的是 "sponsor the Phase 1 pilot on [portfolio segment]" | 试点选哪个 Segment 或哪些客户 |
| D5 | 价值指标的目标值 | deck 第 17 页仍有占位符：[+__ pts]、[+__ bps]、[__%] | 试点要跟踪哪些基线和目标 |
| D6 | FACT_AI_OUTCOME 的字段 | 原型中还没有这张表，见下文 G3 | 交给 IT 前确认字段清单 |

---

## 二、按页面列出的改进项

### A. Dashboard

| # | 优先级 | 问题 | 建议 |
|---|---|---|---|
| A1 | P1 | 指标条左右两组容易被当成同一口径。左组是 6 个客户的组合合计，右组只是 Q3 试点决策的结果 | 标签改为 `PORTFOLIO · 6 accounts · illustrative` 和 `VALUE DELIVERED · Q3 pilot decisions` |
| A2 | P2 | Opportunity Tab 中的客户名和 "$4.0M" 是硬编码在页面模板里的（`operating-model.js:759`），不读取事件数据 | 改为从 expansion 事件的数据读取，并加上金额拆解（见 B1） |

### B. 机会金额（涉及多个页面）

| # | 优先级 | 问题 | 建议 |
|---|---|---|---|
| B1 | P1 | $4.0M 没有推导过程，被问"怎么来的"时答不上来；这也和 deck 第 10 页 "each risk carries its evidence" 的原则不一致 | 增加 "Opportunity sizing" 拆解，放在 Impact Tab、Dashboard Opportunity Tab 和 Customer 360 中；估算方法待 D2 确认 |
| B2 | P2 | Data Center 有 $2M、Healthcare 有 $1M 的机会值写在数据里，但页面上没有任何显示 | 决定删除这两个值，还是在 Customer 360 中以 "under review" 的形式显示 |

### C. Business Events 事件工作区

| # | 优先级 | 问题 | 建议 |
|---|---|---|---|
| C1 | P1 | Market Event（$208K 利润缺口）的事件头也显示了 "Shared $4.5M · counted once" 标签。原因是代码中只要客户是 Telecom 就一律显示（`shared()` 只判断 `customer==='telecom'`），观众会搞不清 $208K 和 $4.5M 的关系 | 只在 Payment Delay 和 Credit Change 两个事件上显示这个标签；Market Event 改显示 "Annual profit sensitivity" |
| C2 | P2 | 左侧事件列表中的金额没有说明口径，例如只写 "$208K"、"$4.0M" | 加上简短的口径，例如 "$208K profit / yr"、"$4.0M uncontracted"、"$4.2M annual renewal" |
| C3 | P3 | Event Tab 的时间线只有三段横线，没有节点圆点，看起来像空白分隔线 | 加上节点圆点，当前所在的节点高亮 |

### D. Customer 360

| # | 优先级 | 问题 | 建议 |
|---|---|---|---|
| D-1 | P1 | Cloud 页面的机会卡片上没有金额，首页显示 $4.0M，这里却看不到 | 卡片上加 "$4.0M uncontracted" 和金额拆解 |
| D-2 | P2 | 机会卡片上的 "Medium" 意思不清：风险卡片上的 Medium 指严重程度，放在机会上会让人疑惑 | 改为 "Confidence: Medium" |
| D-3 | P2 | 中栏下方空白较多 | 在机会卡片中显示 Q4 情景：+$0.6M 收入、+$174K 利润，并标注 conditional |
| D-4 | P3 | "Renewal 120 days" 在顶部指标条和左栏各出现一次 | 左栏改为显示 Asset 信号，例如 "7,200 assets · added capacity uncontracted" |
| D-5 | P3 | 外部信号中，Credit 和 Sentiment 两类因为没有信号被过滤掉了，看起来像漏掉了 | 加一行灰字："No credit or sentiment change detected" |

### E. Portfolio

| # | 优先级 | 问题 | 建议 |
|---|---|---|---|
| E1 | P1 | Profitability trend 显示的是全组合的利润率，但放在 Segment 卡片的 Tab 里，选中任何 Segment 图都不变，观众会以为是当前 Segment 的趋势 | 方案 A：标题改为 "Portfolio profitability trend · all segments"；方案 B（推荐）：图表跟随选中的 Segment 变化，同时用虚线显示全组合平均作为对比 |
| E2 | P2 | 散点图的横轴没有标题，只在底部小字里提到 loss allowance | 加横轴标题 "Risk · expected loss allowance" |
| E3 | P2 | Finance focus 的文案只提到 Telecom 和 Retail，漏掉了 European Network（利润率也从 20% 降到 17%） | 改为 "Telecom, Retail and European Network…" |
| E4 | P2 | 利润率趋势图的纵轴刻度不是整数（15.1%、18.6%…），字太小，而且纵轴不从 0 开始 | 刻度改为整数，例如 16%、20%、24%、28%，字号不小于 10px |
| E5 | P3 | 散点图中 "Cloud & Data Centers" 的文字压过了 1% 那条竖向分界线 | 名称放在气泡左侧，或者分两行显示 |
| E6 | 备注 | 散点图两条坐标轴都不从 0 开始，气泡间距在视觉上被放大 | 演示时口头说明即可，也可以在 ⓘ 中写明 |
| E7 | 备注 | Healthcare 的收益率从 9.1% 改成了 7.6%，目的是让四个象限各有一个 Segment；5–9 月的利润率历史是写死的，只有 10 月是实时计算的 | 汇报时知悉即可；接入真实数据后自然解决 |

### F. Forecast

| # | 优先级 | 问题 | 建议 |
|---|---|---|---|
| F1 | P1 | 三笔续约的年金额合计 $10.8M，相当于每季度 $2.7M，但续约延迟一季后，图上每季度只少 0.5–0.7M。说明里只有一句 "catch-up billing partly recovers"，没有拆解 | 在 Gap 卡片中加一个缺口拆解，例如"延迟一季的收入 −X、补开票追回 +Y、净影响 −2.9M" |
| F2 | P2 | 右侧 3 个 KPI 是年收入口径，左侧图表是季度现金口径，两者放在一起容易被拿来比较 | KPI 区加小标题 "Annual revenue exposure"，和图表的 "Quarterly cash inflow" 区分开 |
| F3 | P3 | "Cloud expansion contracted" 没有打开时，底部图例里仍然显示 "Expansion contracted" | 图例只显示当前打开的情景 |
| F4 | P3 | 左上角 "Actual · USD M" 的标注和 7.5 的刻度挤在一起 | 把标注移到图表上方，或者移除 7.5 刻度 |
| F5 | 备注 | 纵轴从 4.0 开始，缺口在视觉上被放大 | 口头说明，或在 ⓘ 中写明 |

### G. Decision Center 与 Outcome Review

| # | 优先级 | 问题 | 建议 |
|---|---|---|---|
| G1 | P1 | 结果数据"会回流"这件事，只在 Outcome Review 底部用一行小字提到，高管很容易把它当成一张普通结果报表，看不到 deck 第 7 页 "Decisions and outcomes feed back" 的闭环 | 加一个小区块 "What feeds back (Phase 4)"，用 3–4 行说明：达成率用于推荐排序、预警提前期用于阈值校准、Finance 的实际选择用于检验推荐质量、拒绝理由用于减少无效推荐 |
| G2 | P2 | 历史结果没有"看得见地"参与下一轮推荐，目前只用于 Value delivered 的汇总展示 | 在 Options Tab 的推荐方案旁边加一行 Phase 4 预览，例如 "Based on 1 similar past decision: Collect achieved 120% (European Network, Q3)" |
| G3 | P2 | FACT_AI_OUTCOME 在 deck 第 19 和 23 页都有出现，但原型和文档中都没有字段定义 | 在 README 或交付文档中加入建议字段：`Decision_ID · Event_ID · Customer_ID · Risk_Category · Score_at_Decision · Recommended_Option · Chosen_Option · Decision · Rationale · Metric · Target · Observed · Attainment · Lead_Days · Cycle_Days · Post_Score · Outcome_Date` |
| G4 | 备注 | 结果达标后风险分数下降（88 → 55）是预设规则，不是模型学习；页面上已经标注 | 汇报时如实说明即可 |

---

## 三、原型边界（汇报时主动说明，避免被误解）

这些属于原型本身的范围限制，不是缺陷。

1. 所有客户、金额、分数和趋势都是**演示数据**，没有连接真实的 NexBill 数据。
2. **执行是模拟的**：点击 "Run execution in NexBill" 只会推进本地状态，不会产生真实交易。
3. **外部信号属于 Phase 2**，还没有接入数据源；目前只用来解释风险，不调整风险分数。
4. **Forecast 属于 Phase 3**：情景和区间都是规划示意，不是经过验证的预测。
5. **学习回流属于 Phase 4**：目前没有启用，结果数据只用于价值汇总和预设规则。
6. 决策记录只保存在**当前浏览器**中。换电脑或清除浏览器数据后，会回到初始状态。
7. 页面数据固定在 **2026-10-22** 的快照，打开日期不会改变页面数据。

---

## 四、建议的下一步

1. 先带当前版本和 deck 向老板汇报，重点确认第一部分的 D1–D6。
2. 把老板的反馈和本清单中的 P1 项合并，写成 v4 Codex 指令。
3. P2 和 P3 项可以放在同一轮完成，因为都是局部修改，不涉及结构调整。
4. 版本稳定后，把 `codex-alignment-brief` 合并到 `main`。
