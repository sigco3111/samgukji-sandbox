# R312 always reachable battle-report close control

Local product presentation change onR311. The old16-record prepared report puts its only Close button at the end of all records, outside the initial viewport. R312 separates scrollable report body from always-visible footer close button. No report entries hidden/deleted, no game policy or effect change. Footer text explicitly names battle report. Native scroll body retains all records.

Actual390x844 local menu->report on prepared121observer save: fixed footer boundsy729.36height39 both at top and after scrolling body to bottom; click closes modal. Top screenshot inspected footer separate from content rather than overlay; bottom screenshot inspected last full record/position button and footer. GameJSON/storage exact on opening, errors0. Not naturalplay or device evidence. Baseline/candidate record data same.120/120groups pass including source guard plus existing report tests. Initial sticky prototype overlapped text and was rejected visually; final separate-body layout replaces it. Existing CSS tail gates expect earlier blocks at file end; inserted new scoped styles before them, no weakening of gates. No deployment/original saves/portrait change.

RecoveryR307full+R308/R311/R312deltas. Morning single full source will replace multipart recovery.
