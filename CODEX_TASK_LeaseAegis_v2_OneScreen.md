# Codex 任务 v2：LeaseAegis 满分版，一屏工作区

## 0. 目标与原则

当前版本在 `codex-alignment-brief` 分支，最新提交为 `f2bcd36`，功能已基本齐全。本轮有两个目标：

1. **对齐 Deck 达到满分**：修复所有数据矛盾和细节问题，具体见第 3 节。
2. **桌面端一屏工作区**：每个菜单页面在 **1440×860** 视口内**不出现整页纵向滚动**。原来上下堆叠的多个板块，改用页内交互承载：Tab、主从布局（master–detail）、侧边抽屉、行内展开、悬浮说明。
   - 只有长列表、表格这类组件可以在**组件内部**滚动。
   - 这个尺寸同时覆盖 1920×1080、125% 缩放后的 1536×864 联想笔记本屏幕。

**硬性约束（沿用上一轮）：**
- 纯原生 HTML/CSS/JS，不引入框架或外部依赖，双击 `index.html` 即可运行。
- **界面文字全部用英文**。
- 不改 `MODEL_KEY`，旧的本地决策数据必须仍可读取。
- 不同口径的金额不能相加；共享敞口只计算一次；未签约的机会不进入 base forecast。
- 后续阶段的能力保留 Phase 标注（Phase 2 外部数据、Phase 3 预测、Phase 4 学习）。
- 主要逻辑仍放在 `operating-model.js`。如果文件过大，可以拆成 `operating-model-data.js`（数据）和 `operating-model.js`（逻辑与渲染），由 `index.html` 按顺序加载。

**不再支持手机和窄屏：**
- 删除 `operating-model.css`、`nexbill-shell.css` 中所有针对 1280px 以下宽度的 `@media` 规则（包括 1200 / 1150 / 950 / 760 / 650 这些断点）。
- 给 `body` 设置 `min-width:1280px`。
- 删除 `preview-operating-mobile.png`，README 中也不再提及手机布局。

---

## 1. 全局外壳：压缩纵向空间

| 元素 | 修改 |
|---|---|
| 应用框架 | `body` 高度设为 `100vh`，不允许整页滚动。结构为：顶部 NexBill 导航（48px）、左侧侧栏（220px）、右侧工作区。工作区用 CSS grid 排布，内部高度为 `calc(100vh - 48px - 40px)`。 |
| LeaseAegis 二级顶栏（面包屑、DEMO 标签、日期、Assumptions、Advisor） | 高度压缩到 40px。 |
| 页头 `head()` | 改成单行：左侧放 `h1`（20px）和一句副标题，右侧放页面级控件。高度控制在 56px 以内。删除 `eyebrow`（"Leasing financial intelligence"）。 |
| 页脚 `<footer>` | **删除**。页脚里的两句说明移入 Assumptions 弹窗。 |
| 侧栏 | 保留分组结构，菜单项见下表。缩小间距，确保 7 个菜单项加底部定位语在 860px 高度内放得下。 |
| 侧栏底部 "NexBill manages transactions / LeaseAegis supports your decisions" | 保留。 |

侧栏菜单（共 7 项）：

| 分组 | 菜单项 | 路由 |
|---|---|---|
| OVERVIEW | Dashboard | `#dashboard` |
| INTELLIGENCE | Business Events | `#events/<caseId>/<stage>` |
| INTELLIGENCE | Customer 360 | `#customer/<id>` |
| INTELLIGENCE | Portfolio | `#portfolio[/<segment>]` |
| INTELLIGENCE | Forecast | `#forecast[/<scenario>]` |
| DECISIONS | Decision Center | `#decisions/<tab>` |
| DECISIONS | Outcome Review | `#decisions/outcomes`（是 Decision Center 中的一个 Tab） |

**需要实现的通用交互组件**（写成小函数复用，不要每个页面各写一套）：
- `tabs(id, items, active)`：Tab 状态写进 hash，刷新后保持。
- `drawer(title, body)`：从右侧滑出的详情面板，宽 420px。按 Esc 或点击遮罩关闭，用 `<dialog>` 实现。
- `expandRow`：表格行点击后，在行下方展开详情。
- `info(text)`：一个小的 "ⓘ" 图标，悬浮显示定义和口径说明。用来替代页面上的整段说明文字。

**旧路由兼容：** `#signals/<id>`、`#analysis/<id>`、`#impact/<id>`、`#recommendations/<id>` 要用 `location.replace` 重定向到 `#events/<id>/<stage>`。旧的 `#decisions/<caseId>` 重定向到 `#events/<caseId>/decide`。所有站内链接改用新路由。

---

## 2. 逐页重构（每页都必须在 1440×860 内放下）

### 2.1 Dashboard：一屏回答"今天要决定什么"

布局，从上到下：

1. **叙事条**（高 56px，深海军蓝底）：左侧写 `Finance has data. LeaseAegis turns it into decisions.`，中间用小字写 `Finance does not need more reports. It needs better decisions.`，右侧放按钮 `Start the walkthrough →`。
2. **指标条**：6 个紧凑指标，单行，高 84px，分成两组，中间用竖线隔开。
   - 左组 `PORTFOLIO`：Portfolio value · Collection exposure · Renewals ≤30 days
   - 右组 `VALUE DELIVERED · PILOT`：Cash collected · Renewal value confirmed · Avg. warning lead time
   - 每个指标都可以点击跳转：前两个到 Portfolio，Renewals 到 Forecast，右组三个到 Outcome Review。
3. **主体**，两栏，填满剩余高度：
   - 左栏 60%：**Decisions needed today**。
     - **按客户合并**：Telecom 的 Payment 和 Credit 合并为一行，显示 `$4.5M · shared exposure`，再用小标签列出 2 个相关事件。
     - 每行内容：客户、最紧急事件标题、动作类型标签、金额、`Review by` 日期、按钮 `Decide →`（跳到 `#events/<id>/decide`）。
     - 点击整行可以展开，显示推荐动作、预期收益和 A/B/C 方案的一句话摘要。
     - 最多显示 5 行，超过时列表内部滚动。
   - 右栏 40%：带 Tab 的卡片，Tab 为 `Top risks | Opportunity | Portfolio & Forecast`。
     - Top risks：按客户去重后最多显示 4 条，排名按 severity 和 amount 动态计算为 1、2、3、4，不再用写死的 `rank` 字段。
     - Opportunity：Cloud 的 $4.0M，标注 Uncontracted。
     - Portfolio & Forecast：两张迷你卡片。一张是缩小的四象限缩略图，一张是 forecast 迷你折线（base 加 slip 两条线），点击分别跳到对应页面。
4. **删除**：Recommended actions 区块（和 Decisions needed today 重复）、Portfolio snapshot 区块（指标已进入指标条，入口卡片已进入右栏 Tab）、首页的流程条。

### 2.2 Business Events：一个页面完成"事件 → 决策"六个阶段

这是本轮最大的结构调整。原来 Business Events、Signals、Risks & Opportunities、Financial Impact、Recommendations 五个页面，加上 Decision Center 里的决策表单，**合并为一个事件工作区**：

```
┌ 事件列表（左，300px）──┬ 事件头（金额、客户、状态，一行）────────────────────┐
│ 搜索 + Severity 筛选    │ [1 Event][2 Signals][3 Risk][4 Impact][5 Options][6 Decide] │
│ ● Telecom  Payment $4.5M│─────────────────────────────────────────────────────────│
│ ● Retail   Payment $1.2M│                                                          │
│ ● DataCtr  Renewal $4.2M│          当前阶段的内容（固定高度，不整页滚动）            │
│ ...（列表内部可滚动）   │                                                          │
│                         │                        [← Back]   [Next: Signals →]      │
└─────────────────────────┴──────────────────────────────────────────────────────────┘
```

- **路由**：`#events/<caseId>/<stage>`，stage 取值为 `event | signals | risk | impact | options | decide`。键盘左右方向键可以切换阶段。
- **左侧事件列表**：替代原来的事件卡片网格和每页顶部的 "Event context" 下拉框。
  - 每行显示：severity 色点、客户名、事件类型、金额、决策状态小标签。
  - 已解决（Resolved）的事件沉到列表底部，并置灰。
  - 同一客户的多个事件，在列表里用相同的客户分组线连在一起。
- **事件头**（1 行）：事件标题、客户名（链接到 Customer 360）、severity、金额和口径、`Review by` 日期、决策状态、`NexBill record ↗` 链接。共享敞口时显示 `Shared $4.5M · counted once` 标签。
- **六个阶段的 Tab 内容**：

| Tab | 内容（必须一屏放下） |
|---|---|
| **1 Event** | 左边：事件描述、Business impact、Detected 和 Next review 日期。右边：**Related events for this customer**（同客户的其他事件，注明是否共享同一笔敞口）。原来的 Signal timeline 合并到这里，用 3 个点的横向小时间轴表示。 |
| **2 Signals** | 顶部一条摘要：`Evidence 95/100 · High confidence` 加风险分数迷你折线（0–100）。下面两栏：左栏是 8 个内部领域，排成 **2 列 × 4 行的紧凑卡片**，每张卡片显示领域名和一行数值；Change events 卡片高亮并带 Core 标签；**点击卡片打开右侧抽屉**，显示 FACT 表名、详细说明和 `View NexBill record ↗`。右栏是 5 个外部信号，用虚线框加 `Phase 2 feeds` 标签，每行一句。原来的 Evidence strength 和 Direction of change 两个大面板删除。 |
| **3 Risk** | 左边 60%：主风险卡片，包括类别、分数（已解决时显示 `88 → 55`）、趋势、置信度、次要风险标签，再加一条横向证据链 "Evidence → Assessment → Consequence"。右边 40%：**Portfolio risk map**，所有事件排成 2×4 的小格子，点击切换到对应事件，Tab 保持在 Risk。 |
| **4 Impact** | 顶部大数字显示金额和口径。下面是已量化的影响块，最多 6 个，排成 3×2，每块只显示标题、数值和一句话；详细说明放进 `info()` 悬浮提示。未量化的维度显示为一行灰字 `Not quantified: Margin, Yield`。底部一行写 `Therefore → <rec>`，以及 Outcome target。 |
| **5 Options** | 3 张方案卡横向排列，可以选择。推荐方案带 `Recommended` 标签。动作类型标签旁放 `info()`，悬浮显示 7 类动作及其触发条件，替代原来的折叠表格。 |
| **6 Decide** | 上方三栏状态：Recommendation / Finance decision / NexBill execution。下方按状态显示不同内容：<br>• **Pending**：紧凑决策表单。第一行是方案、负责人、日期、目标值，第二行是理由输入框和三个快捷理由按钮。按钮在最右侧：`Reject`、`Approve`。<br>• **Approved / In Progress**：显示 `Open in NexBill →`，并显示执行子任务进度。<br>• **Completed**：显示结果录入表单。<br>• **Outcome Achieved**：显示 Target、Observed、Attainment 以及分数变化 `88 → 55`。<br>决策历史放在 `View history` 链接里，点击后在抽屉中打开。 |

- Tab 底部固定显示 `← Back` 和 `Next: <stage> →` 两个按钮。
- **快捷理由按钮只负责填入文字，不能直接提交。** "Approve as recommended" 只把方案选为 A 并填入理由，用户仍需点击 `Approve` 才会提交。

### 2.3 Customer 360：一屏看完一个客户

- **页头一行**：客户下拉选择；然后是客户名、Segment、国家；再跟 5 个指标标签：Open AR、Overdue、Annual revenue、Margin、Renewal in N days；最后是 `NexBill record ↗`。共享敞口时显示 `Shared $4.5M · counted once` 标签。删除原来那条单独的蓝色提示框。
- **主体三栏，等高**：
  1. **Internal signals**：5 条，紧凑排列。
  2. **Risks & actions**：每个风险是一张卡片，包括类别、等级、次要风险，**以及该风险对应的推荐动作、动作类型、决策状态和 `Decide →` 按钮**。这样原来底部的 Recommended actions 区块就可以删除。下方是 Opportunity 小节。
  3. **External signals · Phase 2**：**按信号类别去重**，类别为 Credit、Industry、Sentiment、Market、Business developments，每类最多 1 条，最多 5 条。目前 Telecom 页面显示 9 条近似重复的信号，这是必须修复的缺陷。去重的实现方式：给每个 case 的 `external` 数组按固定的类别顺序存储，然后按类别取第一条非 "No …" 的内容。

### 2.4 Portfolio：散点四象限，位置由数据决定

- **修复数据矛盾（必须）**：现在象限归属是写死的，和表格数据冲突（Telecom 的 risk-adjusted yield 比 Healthcare 低，却被放在高回报一侧）。改为根据数据计算：
  - 纵轴 Return：Segment 的加权 yield
  - 横轴 Risk：Segment 的加权 expected loss rate（`loss` 字段）
  - 分界线：`Return hurdle 8.0%` 和 `Risk appetite 1.0% loss allowance`，两个值写成常量，并在图上标出。
  - 把 `customers` 中 `healthcare` 的 `yield` 从 `9.1` 改为 `7.6`。改完后四个 Segment 分别落入四个象限：
    - Cloud & Data Centers：9.9% / 0.49%，Grow
    - Telecom：8.3% / 1.58%，Protect and reprice
    - Healthcare：7.6% / 0.30%，Improve margin
    - Retail：7.2% / 1.40%，Restructure or exit
  - 检查所有引用 healthcare yield 的地方（Customer 360 等）显示是否一致。
- **布局**：
  - 左 58%：散点图，用 SVG 画。气泡大小代表 principal，四个象限有浅色底和象限名。点击气泡选中该 Segment。
  - 右 42%：Tab 卡片，`Segment | Performance | Profitability trend`。
    - Segment Tab：选中 Segment 的 KPI、象限结论和一句理由，以及客户列表（每行显示动作类型，链接到对应事件的 Options Tab）。
    - Performance Tab：原来的 Segment performance 表格。
    - Profitability trend Tab：原来的利润率趋势图加 Finance focus。
- 删除顶部 4 张 Segment 卡片（信息已在气泡悬浮提示和 Segment Tab 中）。原来的 4 步说明压缩为页头副标题：`Analyze → Assess profitability → Weigh risk → Recommend`。
- 路由 `#portfolio/<segmentSlug>` 记住当前选中的 Segment。

### 2.5 Forecast：多条情景线叠加，直接显示缺口

- **布局**：
  - 左 65%：Projected cash inflow 图表。
  - 右 35%：上方是 3 个 KPI（Contracted、Renewal-dependent、At risk）竖向排列；下方是 **Gap vs base** 卡片。
- **图表**：顶部是情景切换开关（多选标签）：`Base case`（始终显示）、`Three renewals slip`、`Cloud expansion contracted`。**默认打开 Base 和 Slip 两条线**，让最有说服力的缺口一进页面就能看到。三条线可以同时叠加显示，区间带始终显示。
- **Gap vs base 卡片**：计算 Q4'26–Q3'27 四个季度累计值与 base 的差额（slip 为 −$2.9M，upside 为 +$2.8M），用数字从数据计算，不要写死。卡片显示假设说明、"Act on the gap" 推荐，以及链接到对应事件 Options Tab 的按钮。只开了 Base 时，显示 `Select a scenario to see the gap`。
- 删除右侧的 Planning decisions 五条说明列表，改为页头标题旁的一个 `info()`。保留 `Predictive features · Phase 3` 标签。
- 路由 `#forecast/<scenario>` 记住开关状态。

### 2.6 Decision Center 与 Outcome Review：一个页面，四个 Tab

- **路由**：`#decisions/<tab>`，tab 取值为 `pending | execution | outcomes | rejected`。Tab 标签上显示数量。
- **主从布局**：
  - 左 62%：当前 Tab 下的决策列表（表格），列为 Customer / event、Action、Owner、Target date（逾期显示 `Overdue`）、Status、Result。
  - 右 38%：**选中行的详情面板**，包括 Recommendation / Decision / Execution 三栏状态、目标、负责人、最近 3 条历史记录，以及按钮 `Open event workspace →`（跳到 `#events/<id>/decide`）。
  - 实际的决策操作统一在 Business Events 的 Decide Tab 中完成，**Decision Center 不再重复放决策表单**。
- **Outcomes Tab**（侧栏 "Outcome Review" 的入口）：
  - 顶部 4 个指标：Cash collected、Renewal value confirmed、Avg. warning lead time、Avg. decision cycle。
  - 下方是结果表格，内容为 `PAST_DECISIONS` 加上当前浏览器中已测量的结果。点击行展开显示 evidence，原来单独的 Result evidence 区块删除。
  - 底部一行写 Phase 4 说明。
  - **删除这个 Tab 里指向自身的 "Review outcomes →" 链接**。

### 2.7 NexBill 模块（Billing / Collections / Contracts / Customers / Portfolio）
- 两栏布局：
  - 左 40%：执行面板，只在该模块是当前事件的执行模块时显示。包括子任务清单和 `Run execution in NexBill` 按钮。
  - 右 60%：记录表格，可在表格内部滚动，当前客户的行高亮。
- 不是执行模块时，左栏显示该客户的 NexBill 记录摘要，以及 `Open intelligence context →` 链接。

### 2.8 Advisor 与弹窗
- Advisor 保留右侧面板形式，只提供预设问题，不变。
- Assumptions 弹窗加入原来页脚的两句说明。

---

## 3. 数据与逻辑修正（满分必需）

1. **平均预警提前期排除不适用的记录**：`PAST_DECISIONS` 中 datacenter 那条（Reprice）的 `leadDays` 改为 `null`，表格中显示 `n/a`。平均值应为 38 天，不再是 25.3 天。
2. **决策周期按演示快照日期计算**：批准时写入 `approvedOn:'2026-10-22'`（快照日期常量 `SNAPSHOT='2026-10-22'`），周期 = `approvedOn − detected`。旧数据没有这个字段时，同样按 `SNAPSHOT` 计算。**不能使用电脑的真实时间**，否则日后演示时会算出几十上百天。
3. **排名动态计算**：Top risks 和 Decisions needed today 的排名按 severity 降序、amount 降序计算，避免出现两个排名 2。
4. **单复数**：增加 `plural(n,'day')` 工具函数，统一处理 "1 day" 和 "2 days"。
5. **同一客户的事件合并显示**：凡是列出事件的地方（Dashboard、通知等），Telecom 的 $4.5M 都只出现一次，并带 shared 标签。
6. **External signals 按类别存储并去重**（见 2.3）。
7. Healthcare 的 yield 改为 7.6，并检查所有派生数值（加权 portfolio yield 等）显示正常。
8. 通知弹窗中的条目，链接改为新路由。

---

## 4. 校验脚本 `validate-operating-model.cjs`（重写相关部分）

- 删除所有 390px 宽度的检查。
- **新增一屏检查**：视口设为 1440×860，依次访问以下路由，断言 `document.scrollingElement.scrollHeight <= innerHeight + 2`（不出现整页滚动），同时断言没有横向溢出：
  - `dashboard`
  - `events/<7 个 case>/<6 个 stage>`
  - `customer/<6 个客户>`
  - `portfolio` 及 4 个 segment
  - `forecast` 及 3 个情景组合
  - `decisions/<4 个 tab>`
  - `nexbill/<5 个模块>/payment`
- 旧路由重定向：`#signals/payment` 应变为 `#events/payment/signals`，其他三个旧路由同样检查。
- 完整闭环：在 Decide Tab 批准 → 跳到 NexBill 运行执行 → 回到 Decide Tab 录入结果 → Risk Tab 显示 `88 → 55` → Dashboard 的 Decisions needed today 不再包含 Telecom 的 Payment 事件（Credit 事件仍在）。
- 快捷理由按钮不会提交表单（点击后状态仍是 Pending）。
- Customer 360（telecom）的外部信号不超过 5 条，且没有重复类别。
- Portfolio 的象限归属由计算得出，四个 Segment 各占一个象限。
- Forecast 默认显示 2 条情景线；Slip 情景的 gap 为 −$2.9M。
- Outcomes Tab：avg. warning lead time 显示 `38.0 days`；decision cycle 不受电脑时钟影响（可以用 mock `Date.now` 设为 2027 年验证结果不变）。
- 保留原有检查：英文界面、没有控制台报错、旧存储兼容、执行防重复。

运行以下两条命令，都必须通过：
```
node --check operating-model.js
node validate-operating-model.cjs
```

最后更新 `README.md`（页面结构、演示脚本），并在 1440×860 下重新生成 `preview-operating-dashboard.png` 和 `preview-operating-decisions.png`，另外新增 `preview-operating-event.png`。

---

## 5. 满分验收清单（逐条自查后再交付）

| 维度 | 满分标准 |
|---|---|
| 产品契合度 | 页面明显是 NexBill 内的模块；首屏就能看到两句核心话；AI 只出现在可选的 Advisor 中；业务结果在首屏可见（Value delivered 指标条）。 |
| 旅程覆盖 | Event、Signals、Risk、Impact、Options、Decide 在一个工作区内连续完成；执行在 NexBill 中完成；结果在 Outcome Review 中查看。 |
| 决策闭环 | Finance 批准、调整或拒绝 → NexBill 执行 → 录入结果 → 风险分数下降、首页更新、Outcome Review 中出现记录。 |
| 用例覆盖 | Collection、Portfolio（由数据决定象限）、Forecast（缺口直接可见）、Customer 360（每个风险附带动作）四个用例都完整，且数据前后一致。 |
| 高管演示 | 每个页面一屏放下，不出现整页滚动；完整闭环不超过 12 次点击；没有前后矛盾的数字。 |
| UX | 一套导航（侧栏）加页内 Tab；说明文字放进 ⓘ 悬浮提示；视觉风格统一。 |

**五分钟演示脚本（README 中也要写入）：**
1. 打开 Dashboard：看到两句核心话、Value delivered，以及合并后的 Decisions needed today。
2. 点击 Telecom 行的 `Decide →`，或点 `Start the walkthrough`，进入事件工作区的 Event Tab。
3. 按 `Next` 依次查看 Signals（点开 Change events 卡片的抽屉）→ Risk → Impact → Options。
4. 在 Decide Tab 点 `Approve as recommended`，再点 `Approve` → `Open in NexBill` → `Run execution in NexBill`。
5. 回到 Decide Tab 录入结果 $1.5M，看到分数 `88 → 55`。
6. 依次点开 Portfolio（Telecom 在 Protect 象限）→ Forecast（默认即可看到 slip 缺口 −$2.9M）→ Customer 360（Telecom 三个风险各自附带动作）→ Outcome Review。
