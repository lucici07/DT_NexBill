# LeaseAegis 网页交互使用说明

更新日期：2026-10-27 · One-screen 版本 · 数据快照：2026-10-22

## 1. 打开和导航

用 Chrome 或 Edge 打开 `index.html`，更新后按 **Ctrl + F5**。请使用桌面浏览器，推荐视口 1440×860 或更大，最小支持宽度 1280px。页面整体固定，较长的事件列表和表格在各自区域内滚动。

顶部 NexBill 导航打开业务记录与执行模块；点击 LeaseAegis 回到智能工作区。两者的左侧菜单会随工作区切换。

LeaseAegis 有七个入口：Dashboard、Business Events、Customer 360、Portfolio、Forecast、Decision Center、Outcome Review。

## 2. Dashboard：今天要决定什么？

- 顶部六项指标分别显示组合本金、逾期应收、近期续约，以及示例已实现价值。点击指标进入对应页面。
- **Decisions needed today** 按客户合并事件。同一笔 Telecom 应收显示一次，并标注 shared exposure。
- 点击行查看推荐动作和 A/B/C 摘要；点击 **Decide →** 直接评审该事件。展开后可以进入该客户的其他事件。
- 右侧切换 **Top risks / Opportunity / Portfolio & Forecast**。
- 首次完整演示可点击 **Start the walkthrough**。

## 3. Business Events：在一个工作区走完六步

左侧搜索事件或客户，按 Severity 筛选。点击事件时保留当前阶段；Resolved 事件排在下方并变灰。

| 阶段 | 操作与目的 |
|---|---|
| Event | 看发生了什么、业务影响、时间点及同客户的其他事件 |
| Signals | 查看八个内部领域；点击卡片打开详细证据抽屉。外部背景标为 Phase 2 |
| Risk | 看主次风险、分数和证据链；点击风险地图切换事件 |
| Impact | 看量化影响、财务口径和 Therefore 建议行动 |
| Options | 比较三个方案的收益和代价；选择方案不会保存或批准 |
| Decide | Finance 明确批准或拒绝；执行完成后在这里记录结果 |

用页内 Tab 或 **Back / Next** 切换。焦点不在输入框或按钮时，可用键盘左右方向键。Tab 位置写入地址，刷新后保留。

**ⓘ**：鼠标悬浮或键盘聚焦查看定义。证据、历史抽屉可按 **Esc** 或点击遮罩关闭。

## 4. 批准、执行、记录结果

1. 在 Decide 核对方案、负责人、目标日期和金额。金额单位为 USD M，`1.5` 表示150万美元。
2. 理由为选填。**Approve as recommended** 只选 A 并填入理由；**Adjust target / Insufficient evidence** 也只填理由，不提交。
3. 明确点击 **Approve** 或 **Reject**。拒绝后可以 Reopen Finance review。
4. 批准后点击 **Open in NexBill →**。
5. 在对应业务模块点击 **Run execution in NexBill**。三个模拟任务依次完成。按钮在运行时禁用；中途刷新后可继续剩余任务。
6. 点击返回 LeaseAegis 的链接。在 Decide 中填写 observed amount 和 evidence，再点击 **Record simulated outcome**。
7. 达标显示 Target、Observed、Attainment 和预设分数变化；未达标仍为 Completed，风险继续开放。
8. **View history** 在抽屉中展示历史。

AI 不执行业务。Finance 决定，NexBill 执行。当前执行和结果都是本地模拟，不修改真实发票、合同或应收余额。

## 5. 其他页面

| 页面 | 如何操作 |
|---|---|
| Customer 360 | 选择客户；左栏看内部信号，中栏看风险及对应行动，右栏看按类别去重的外部背景。每项风险的 Decide → 进入该事件 |
| Portfolio | 点击散点气泡选择分组；右侧切换 Segment / Performance / Profitability trend。象限由加权收益率和损失率计算，非固定分配 |
| Forecast | Base 始终显示；Slip 和 Expansion 可独立开关，三条线可同时显示。默认展示 slip 的 −$2.9M 累计缺口；右侧 Act on the gap 打开相关方案 |
| Decision Center | 切换 Pending / Execution / Outcomes / Rejected；点击行查看右侧详情，Open event workspace → 回到实际决策表单 |
| Outcome Review | 与 Decision Center 的 Outcomes Tab 是同一页面；点击结果行展开证据，历史示例与本次浏览器结果分开标明 |
| Advisor | 仅提供五个预设问题，包括 Retail；没有自由聊天输入 |
| Assumptions | 查看统一的演示假设、阶段范围和数据口径 |

## 6. 五分钟演示路线

1. Dashboard：两句产品定位、Value delivered 和按客户合并的待决策列表。
2. Start the walkthrough：Event → Signals，打开 Change events 抽屉。
3. Risk → Impact → Options，比较行动收益和代价。
4. Decide：Approve as recommended → **Approve** → Open in NexBill → Run execution in NexBill。
5. 返回录入 `1.5` 和证明说明，展示 `88 → 55`。Payment 离开待办，Credit 仍保留。
6. Portfolio 看 Telecom 的 Protect 象限；Forecast 看 −$2.9M 缺口；Customer 360 看三个风险的行动；Outcome Review 看结果。

## 7. 数字和保存范围

- 38.0 days 为历史示例中适用的预警提前期平均值；不适用的 Reprice 记录显示 n/a，不计入平均。
- 决策周期按固定快照日期计算，不会因电脑日期变化而变长。
- 组合收益、收入、现金回收、利润改善是不同指标，不合计成一个总收益。
- Telecom 的 $4.5M 为共享应收，多个事件不代表多笔敞口。扩张机会未签约，不进入 base。
- Phase 2 外部数据、Phase 3 预测、Phase 4 学习均为演示范围；分数下降是预设规则，不代表模型已学习。
- 原有本地保存数据继续可读。保存仍只在同一浏览器中，不跨设备或用户同步。分享网址不会分享你本地的决定。
