# Codex 任务 v3：6 处视觉与文案修正

## 背景与约束

基于当前工作区代码，也就是 v2 一屏版（改动尚未提交）修改。

- 只修改下面 6 项，**不要改动页面结构、路由、数据或其他交互**。
- 所有页面在 1440×860 视口下仍然**不能出现整页滚动**。
- 界面文字全部用英文；不要引入任何外部依赖。
- 涉及的文件：`operating-model.js`、`nexbill-shell.css`、`operating-model.css`。

---

## 1. Portfolio 散点图：气泡名称被截断，图表上方空白过大

**现状：**
- 图表函数是 `portfolioPlot()`（`operating-model.js`），SVG 的 `viewBox` 为 `0 0 620 400`。
- CSS 中 `.portfolio-plot{flex:1;max-height:570px}`。
- 由于 SVG 默认 `preserveAspectRatio="xMidYMid meet"`，图形在一个很高的容器里垂直居中，上方留出大块空白。
- 气泡名称（`text.bubble-label`）写在气泡内部、白色字。Healthcare 的气泡太小，名称被裁成 "althca"。

**修改要求：**
- 给 SVG 加上 `preserveAspectRatio="xMidYMin meet"`。同时把 `viewBox` 的高宽比调到与面板接近（例如 `0 0 620 470`，相应放大绘图区高度），让图表占满面板，不留顶部空白。
- 气泡名称**移到气泡外侧**：放在气泡右侧 8px 处，深色字（`#2c4a6e`），11px。如果右侧会超出绘图区，就放到左侧。
- 名称使用完整的 Segment 名：`Cloud & Data Centers`、`Telecom`、`Healthcare`、`Retail`。
- 保留现有的气泡点击选中逻辑；选中的气泡加 2px 深蓝描边。

**验收：** 在 1440×860 下，从面板标题底部到图表最上面一条网格线的距离不超过 40px；4 个名称全部完整显示，互不重叠，也不与象限名重叠。

## 2. Forecast 图表：上方空白过大，"Base case" 按钮看起来像被禁用

**现状：**
- 图表函数 `forecastChart()` 的 `viewBox` 为 `0 0 780 310`，CSS 中 `.forecast-chart{flex:1;max-height:460px}`。和第 1 项一样，图形垂直居中，上方空白。
- 情景开关里的 Base 按钮写成了 `<button disabled class="selected">Base case ✓</button>`，显示为灰色，看起来不可用。

**修改要求：**
- 和第 1 项相同：SVG 加 `preserveAspectRatio="xMidYMin meet"`，`viewBox` 高度调到与面板接近（例如 `0 0 780 420`），绘图区相应拉高。图例和底部说明要紧跟在图表下方。
- Base 按钮去掉 `disabled`，改成一个**不可点击、但视觉上处于选中状态**的标签：
  - 使用 `<span class="scenario-fixed">`，样式与 `.scenario-toggles .selected` 一致（浅蓝底、蓝边框、蓝字），文字写 `Base case · always on`；
  - 加上 `aria-disabled="true"` 和 `title="The base case is always shown"`。

**验收：** 在 1440×860 下，从面板标题到 y 轴顶端刻度的距离不超过 60px；Base 标签的颜色、对比度与其他已选中的情景按钮一致。

## 3. Customer 360："Shared $4.5M · counted once" 不显眼；Margin & yield 文字缺分隔

**现状：**
- `customer()` 中，Telecom 的共享敞口提示是标题条下方一行灰色小字：`<div class="shared-caption">…`。
- Internal signals 中 "Margin & yield" 那一条，文字由 `` `${rec.profitability} Yield ${pct(a.yield)}.` `` 拼接而成，显示为 "…collection costs Yield 8.4%."，中间缺少分隔。

**修改要求：**
- 删除 `.shared-caption` 这一行。改为在 `.customer-strip` 中客户名的右侧放一个标签：`<span class="pill shared-pill">Shared $4.5M · counted once</span>`，样式与事件工作区头部的 shared 标签保持一致。条件和现在相同，仍然只在 `a.id==='telecom'` 时显示。
- Margin & yield 的文字改成两行：
  - 第一行：`rec.profitability` 原文；
  - 第二行：`Portfolio yield ${pct(a.yield)}`，使用 `<small>` 灰色字。

**验收：** Telecom 页面的 shared 标签和客户名在同一行；其他客户不显示这个标签；页面上不再出现 "costs Yield"。

## 4. Outcome Review：面包屑和页面标题不一致

**现状：** 访问 `#decisions/outcomes` 时，面包屑显示 "Outcome Review"（来自 `render()` 中的 `title` 映射），页面 h1 却是 "Decision Center"（来自 `decisionCenter()` 中的 `head('Decision Center', …)`）。

**修改要求：** 在 `decisionCenter()` 中按 tab 决定标题。`tab==='outcomes'` 时：
- h1 改为 `Outcome Review`；
- 副标题改为 `Measured results of Finance decisions.`；
- 其他 Tab 不变，仍然是 `Decision Center` 和 `Finance decides. NexBill executes.`。
- 侧栏的高亮逻辑保持不变：当前已经是 Outcome Review 高亮。

**验收：** 每个路由下，面包屑最后一段和 h1 文字都完全相同。

## 5. Impact Tab："No change booked" 被错误归入 "Not quantified"

**现状：** `impactStage()` 把值为 `Not quantified`、`Not estimated`、`No change booked` 的影响块全部隐藏，然后统一列在一行 `Not quantified: Revenue, Margin, Portfolio Yield`。但 "No change booked" 的意思是"已评估，没有变化"，不是"没有量化"。

**修改要求：** 隐藏的影响块分成两组，各自显示一行：
- 值为 `Not quantified` 或 `Not estimated` 的：`Not quantified: Margin, Portfolio yield`
- 值为 `No change booked` 的：`No change booked: Revenue`，并在后面加一个 `info()`，悬浮内容为该影响块原有的描述（desc）。

没有对应项的那一组，整行不显示。名称统一去掉 " Impact" 后缀，使用首字母大写加小写的形式，例如 `Portfolio yield`。

**验收：** payment 事件显示两行：`No change booked: Revenue ⓘ` 和 `Not quantified: Margin, Portfolio yield`；其他事件按同样规则显示。

## 6. Signals Tab：右上角迷你趋势图的坐标文字看不清

**现状：** `signalStage()` 复用了完整的 `chart()` 函数，再用 CSS（`.signal-summary>div{height:65px;width:230px}`）把它压缩成小图，坐标轴文字被缩到无法阅读。

**修改要求：**
- 新建 `sparkline(values, labels)` 函数，专门画迷你折线：
  - `viewBox` 为 `0 0 240 64`；
  - 不画网格线，不画 y 轴刻度；
  - 一条 2px 蓝色折线，最后一个点用实心圆标出，并在旁边写出数值（11px，深色），例如 `88`；
  - 首尾两个月份标签放在图下方（10px），例如 `Jun` 和 `Oct`；如果事件已解决，结尾月份为 `Nov`。
- 在 sparkline 左侧加小标题 `Risk score trend · 0–100`（10px 灰色字）。
- `signalStage()` 改用 `sparkline()`，不再调用 `chart()`。`chart()` 函数本身保留，其他地方仍在使用。
- 已解决的事件，序列末尾仍然追加 `postScore`，与现在逻辑一致。

**验收：** 在 1440×860 下，sparkline 上所有文字的实际渲染字号不小于 10px；Signals Tab 仍然不出现整页滚动。

---

## 校验与交付

1. 运行以下两条命令，都必须通过：
   ```
   node --check operating-model.js
   node validate-operating-model.cjs
   ```
2. 在 `validate-operating-model.cjs` 中补充断言：
   - `#decisions/outcomes` 页面的 h1 是 `Outcome Review`；
   - `#customer/telecom` 页面的 `.customer-strip` 中包含 `Shared $4.5M`，且页面中没有 `.shared-caption` 元素；
   - `#events/payment/impact` 页面包含 `No change booked: Revenue`；
   - `#forecast` 页面中没有 `button[disabled]`；
   - 1440×860 下所有路由不出现整页滚动（原有断言保留）。
3. 在 1440×860 下重新生成 `preview-operating-dashboard.png`、`preview-operating-event.png`、`preview-operating-decisions.png`。
4. 文件开头的 BOM 和中间第 785 行附近 `document.addEventListener` 前多出的 BOM 字符（U+FEFF）一并删除，文件保存为不带 BOM 的 UTF-8。
