# NexBill · LeaseAegis — One-screen workspace

Updated: 27 October 2026. English UI. Fixed business snapshot: 22 October 2026.

LeaseAegis is embedded in NexBill. Finance has data. LeaseAegis turns it into decisions. Finance does not need more reports. It needs better decisions.

## Open

Open `index.html` in Chrome or Edge, then press Ctrl + F5 after an update. No build or external dependency is required. Use a desktop viewport of 1440×860 or larger; the minimum supported width is 1280px. The page stays fixed in the viewport; long lists and tables scroll inside their own panels.

Keep these five runtime files together: `index.html`, `operating-model.js`, `leaseaegis.css`, `operating-model.css`, `nexbill-shell.css`.

## Navigation

| Group | Menu | Route / interaction |
|---|---|---|
| Overview | Dashboard | `#dashboard` — grouped decisions, six metrics, Top risks / Opportunity / Portfolio & Forecast tabs |
| Intelligence | Business Events | `#events/<caseId>/<stage>` — event list and six stages in one workspace |
| Intelligence | Customer 360 | `#customer/<id>` — signals, risks with actions, category-deduplicated external context |
| Intelligence | Portfolio | `#portfolio/<segment>/<tab>` — data-positioned bubbles; Segment / Performance / Profitability trend |
| Intelligence | Forecast | `#forecast/<scenario>` — base always visible; independently toggle slip and expansion |
| Decisions | Decision Center | `#decisions/pending`, `execution`, `rejected` — register and selected-row detail |
| Decisions | Outcome Review | `#decisions/outcomes` — historical and measured results, expandable evidence |

Event stages: `event`, `signals`, `risk`, `impact`, `options`, `decide`. Use tabs, Back / Next, or Left / Right arrow keys outside form controls. Signal evidence and decision history open in a 420px drawer; Escape or clicking its backdrop closes it. The ⓘ control reveals definitions on hover or keyboard focus.

Portfolio segment slugs: `cloud-data-centers`, `telecom`, `retail`, `healthcare`. Optional detail tab: `segment`, `performance`, `trend`. Forecast combinations: `base`, `slip`, `expansion`, `slip+expansion`; the default is base plus slip. Tabs and selections survive refresh through the URL hash.

Old `signals`, `analysis`, `impact`, `recommendations` and case-specific `decisions` URLs redirect using `location.replace`. `#outcomes` redirects to the Outcomes tab. NexBill still owns Billing, Collections, Contracts, Customers and Portfolio records and execution.

## Five-minute demonstration

1. Dashboard: read the two positioning statements, Value delivered and customer-grouped Decisions needed today. Telecom's shared AR is counted once.
2. Choose Telecom's Decide → for direct review, or Start the walkthrough to begin at Event.
3. Use Next: Signals (open Change events evidence), Risk, Impact and Options. Compare the three actions.
4. In Decide, click Approve as recommended. This only selects A and fills rationale. Click Approve explicitly, then Open in NexBill → Run execution in NexBill.
5. After three simulated tasks finish, return to Decide. Enter `1.5` USD M and evidence, then Record simulated outcome. Payment's score changes from 88 to 55; the Payment event leaves the pending queue while Credit remains.
6. Open Portfolio (Telecom is in Protect and reprice), Forecast (default slip gap −$2.9M), Customer 360 (Telecom risks with their actions), then Outcome Review. Expand a result row to see evidence.

A direct Dashboard → Decide → approve → execute → measure route takes fewer than 12 clicks, excluding typing and optional detailed exploration. Approval is always a separate action from the rationale shortcuts.

## Data rules and limits

- Seven cases and six customers; no live production NexBill, news feed or AI service is connected.
- Healthcare yield is 7.6%. Segment return and expected loss are principal-weighted. Quadrants use an 8.0% return hurdle and 1.0% expected loss appetite; bubble area represents principal. Segment assignment is computed, not hard-coded.
- Forecast gaps sum Q4'26–Q3'27 scenario cash minus base cash: slip −$2.9M; conditional expansion +$2.8M. Base excludes uncontracted demand. Annual revenue buckets are separate from quarterly cash; at-risk revenue is a subset, not an additional amount.
- Three read-only Q3 pilot outcomes initialize value metrics: $0.6M cash, $2.7M confirmed annual renewal value, 38.0 days average warning lead time and 2.0 days average decision cycle. The repricing example has lead time `null` and displays `n/a`.
- Current decision cycle uses `approvedOn` minus event detection. Approvals store `approvedOn: '2026-10-22'`; legacy records without it use the same snapshot. Wall-clock audit timestamps do not determine cycle metrics.
- Different financial measures are never added. Telecom payment, credit and market context share $4.5M AR. Outcomes do not rewrite baseline invoices or contracts.
- Achieved targets resolve events and apply preset post-action scores; below-target outcomes leave risk open. This is a demonstration rule, not model learning.
- Phase 2 external feeds, Phase 3 predictions and Phase 4 learning retain their scope labels. Assumptions contains all global limitations. Advisor offers five preset briefings only.
- `MODEL_KEY` remains `leaseaegis-operating-model-v2`. Existing decisions and history remain readable. Storage is local to the browser; no cross-user or cross-device synchronization.
- Execution is restricted to the relevant NexBill module, guards repeat clicks and can resume persisted task progress after refresh.

## Validation

Run:

    node --check operating-model.js
    node validate-operating-model.cjs

The Chrome-based suite uses an isolated profile at 1440×860. It checks every event/stage, all customers, portfolio detail tabs, forecast combinations, all decision tabs and NexBill modules. Assertions cover page and panel overflow, English UI, no console exceptions, legacy redirects/storage, drawers, hash persistence, non-submitting shortcuts, explicit approval, execution guards, refresh recovery, achieved/below-target results and snapshot-stable metrics.

Current previews: `preview-operating-dashboard.png`, `preview-operating-event.png`, `preview-operating-decisions.png`.

The historical prototypes and their tests remain in `archive/`; they are not the current acceptance suite. The review package directory is an older export and is not automatically regenerated.

中文操作说明：`LeaseAegis_网页交互使用说明_CN.md`。本次要求：`CODEX_TASK_LeaseAegis_v2_OneScreen.md`。
