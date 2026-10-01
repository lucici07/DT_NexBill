# Decision Workspace — English Edition

## Journey

Business Risk Feed → Impact Analysis → Decision Workspace → Nexbill Approval.

The approved feed and impact layouts are preserved. Affected-customer links in Impact Analysis now open the Decision Workspace directly. The workspace retains the event, event-wide exposure, selected-customer exposure, impacted-customer count and next action.

## Evaluate the options

Three options show Description, Business Impact, Expected Outcome, Confidence, Pros and Cons. The recommended option is highlighted. Renewal, collection and growth events have appropriate alternatives; collection and growth reviews do not use renewal pricing choices.

Confidence percentages are explicitly illustrative scenario assumptions, not calibrated predictions. Exposure is not an expected loss. Quoted contract value is not recognized revenue.

The right-side Finance Copilot explains its preference, assumptions and risks addressed. Finance's choice is displayed separately and may differ from the recommendation.

## Record and proceed

Enter Selected Option, Comments, Decision Owner and Decision Date.

- **Save Decision** saves the review without creating a business request.
- **Submit Through Nexbill** creates one approval request using the same fields. Submission does not execute the decision.
- After submission, the form is locked to prevent duplicates. Simulated approval and effective-date steps demonstrate Nexbill execution states.
- The request status remains visible after submission.

The interface, default owner labels, scenario descriptions, statuses and history labels are English. Existing user-entered comments are preserved as written.

## Demonstration and validation

Open `index.html#decision/workforce/0` to review Workforce Reduction for Global Telecom Operator, or enter through Impact Analysis.

Keep `decision-english.js` with the other page scripts. All data and operations are local simulations.

Run `node validate-decision-english.cjs` to check direct routing, English content, event-specific options, separate AI and Finance choices, saving, persistence, single submission, approval states and mobile layout.



## Concise comparison workspace

Business Impact → Decision Options → Finance Decision. The standalone Why This Option? and Decision Lifecycle sections are removed. Each option retains its pros, cons, expected outcome, business impact, confidence and preferred/less-preferred rationale. The Finance form and request status remain functional. No outcome tracking or learning features are shown.

Run node validate-transparency.cjs to check section removal, option rationale and the decision workflow.

## Site-wide English interface

The active website uses English for navigation, business reports, customer labels, assistant panels, evidence dialogs, form labels, accessible labels, notifications, request states and CSV exports. Page layouts and financial calculations are retained.

Keep english-locale.js with the entry scripts. It converts legacy system-owned values from earlier saved prototype records to their English equivalents. It preserves user-entered comments and custom owner names. It does not clear browser storage.

Run node validate-site-english.cjs to audit 14 routes, all 12 accounts, assistant tabs, evidence and references, PN report, CSV contents, watchlist, decision history, lifecycle states and legacy-value migration. Existing archived prototypes are separate from the active index.html entry.
