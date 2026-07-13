// ========================================
// MPI Investment Memorandum
// Bootstrap
// ========================================

const report =
    reportService.generate(deal);

const memorandum =
    investmentMemorandumService.generate(report);

const html =
    investmentMemorandumRenderer.render(memorandum);

document.getElementById(
    "memorandumRoot"
).innerHTML = html;


console.log("Investment Memorandum Loaded");