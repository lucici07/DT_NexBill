# LeaseAegis One-screen Workspace — 使用说明 / User Guide

Updated / 更新：2026-10-27 · Business snapshot / 数据快照：2026-10-22

## 中文

完整逐步说明见 [网页交互使用说明](LeaseAegis_网页交互使用说明_CN.md)。

1. 打开 `index.html`，按 Ctrl + F5；使用桌面浏览器，推荐 1440×860，最小宽度1280px。
2. Dashboard 按客户合并待办；点击 Decide → 直接决策，或 Start the walkthrough 从事件开始。
3. Business Events 左侧选事件，右侧使用 Event / Signals / Risk / Impact / Options / Decide 六个 Tab。Next / Back 或左右方向键切换，输入时方向键不切换页面。
4. 点击内部信号卡查看证据抽屉；ⓘ 显示口径。Esc 或遮罩关闭抽屉。
5. Decide 填写方案、负责人、日期和目标。三个快捷理由按钮只填文字，不提交；明确点击 Approve 或 Reject。
6. 批准后 Open in NexBill → Run execution in NexBill。三个任务完成后返回 Decide，录入结果和证明。
7. 达标后显示预设分数变化；未达标风险保持开放。Decision Center 查看分类列表；Outcome Review 就是其中的 Outcomes Tab。
8. Portfolio 点击气泡查看按数据计算的象限；Forecast 默认显示 base 与 slip，切换情景可同时显示三条线；Customer 360 将风险和对应行动放在一起。

## English

Open `index.html` in Chrome or Edge and press Ctrl + F5 after an update. Use a desktop viewport of 1440×860 or larger; the minimum supported width is 1280px. Long tables and lists scroll inside their panels.

### Navigation and workflow

- Dashboard groups decisions by customer and shows portfolio and delivered-value metrics. Use Decide → for direct review, or Start the walkthrough to begin with the event.
- Business Events contains six tabs: Event, Signals, Risk, Impact, Options and Decide. The event list stays on the left. Use Next / Back or arrow keys outside form controls. Hash routes preserve the stage after refresh.
- Signal cards open evidence in a side drawer. View history opens decision history in the same drawer. Escape or backdrop click closes it. Hover or focus ⓘ for definitions.
- Customer 360 combines each risk with its recommended action and decision status. External signals are deduplicated by category.
- Portfolio positions segments using weighted yield and loss allowance. Click a bubble and use Segment / Performance / Profitability trend tabs.
- Forecast always shows base. Slip and conditional expansion can be independently enabled. The default base-plus-slip view displays a −$2.9M four-quarter cash gap. Expansion gives +$2.8M, conditional on contracting and delivery.
- Decision Center uses Pending / Execution / Outcomes / Rejected tabs. Select a row to see details; Open event workspace → is the entry to the actual decision form. Outcome Review links to the Outcomes tab, where rows expand to show evidence.

### Approve and measure

1. In Decide, confirm the option, owner, target date and target in USD millions. Rationale is optional.
2. Approve as recommended only selects option A and fills rationale. Adjust target and Insufficient evidence also only fill text. Click Approve or Reject explicitly.
3. After approval, Open in NexBill → Run execution in NexBill. Three simulated tasks complete in sequence. Duplicate runs are guarded; persisted progress can resume after refresh.
4. Return to Decide, enter the observed amount and evidence, then Record simulated outcome.
5. An achieved target resolves the event and applies a preset score; a below-target result leaves risk open. This does not rewrite underlying invoices or contracts.

### Five-minute demonstration

Dashboard → Start the walkthrough → Signals (open Change events) → Risk → Impact → Options → Decide → Approve as recommended → Approve → Open in NexBill → Run execution → return and record 1.5 with evidence. Payment changes from 88 to 55; Credit stays open. Then visit Portfolio, Forecast, Customer 360 and Outcome Review.

### Assumptions and persistence

The three Q3 pilot examples are read-only and separate from saved current decisions. Initial metrics are $0.6M collected cash, $2.7M confirmed renewal value, 38.0 days average warning lead time and 2.0 days average decision cycle. The repricing example has no applicable warning lead time and displays n/a.

Current decision cycles use the fixed 2026-10-22 approval snapshot, including the fallback for older records. Audit timestamps can use the actual clock without affecting cycle metrics.

Shared Telecom AR is counted once. Cash, annual revenue, renewal value and profit are separate measures. Uncontracted growth stays outside base. Phase 2 feeds, Phase 3 forecasts and Phase 4 learning are demonstrations; score changes are rules, not model learning.

The original local storage key remains unchanged. Saved decisions and history stay readable in the same browser, but do not synchronize across people or devices. All approvals, execution and outcomes are local simulations. Assumptions collects these limitations; Advisor provides five preset briefings only.
