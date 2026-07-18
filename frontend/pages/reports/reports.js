const SELECTED_REPORT_KEY =

    "selectedReport";

    
const reportLibraryService =
    new ReportLibraryService();

sessionStorage.setItem(

    SELECTED_REPORT_KEY,

    JSON.stringify(report)

);

const searchInput =

    document.getElementById(
        "reportSearch"
    );

searchInput.addEventListener(

    "input",

    refreshReports

);

const reportGrid =
    document.getElementById(
        "reportGrid"
    );

// ========================================
// Render Reports
// ========================================

refreshReports();

function refreshReports(){

    renderReports(

        getFilteredReports(

            searchInput.value.trim()

        )

    );

}

// ========================================
// Filter Reports
// ========================================

function getFilteredReports(query){

    const reports =

        reportLibraryService.getReports();

    if(!query){

        return reports;

    }

    query =

    query

        .trim()

        .toLowerCase();

    return reports.filter(report =>{

        const cover =
            report.sections?.cover;

        if(!cover){

            return false;

        }

        return [

            cover.property,

            cover.location,

            cover.recommendation

        ]

        .filter(Boolean)

        .some(value =>

            value
                .toLowerCase()
                .includes(query)

        );

    });

}

// ========================================
// Render Reports
// ========================================

function renderReports(reports){

    if(reports.length === 0){

        reportGrid.innerHTML = `

            <div class="empty-state">

                No reports found.

            </div>

        `;

        return;

    }

    reportGrid.innerHTML =

        reports
            .map(renderCard)
            .join("");

}

// ========================================
// Render Report Card
// ========================================

function renderCard(report){

    const cover =
        report.sections?.cover;

    if(!cover){
        return "";
    }

    const recommendationClass =

        (cover.recommendation ?? "")

            .toLowerCase()

            .replace(/\s+/g, "-");

    return `

<div class="report-card">

    <div class="report-card-header">

        <h3>${cover.property}</h3>

        <span class="recommendation ${recommendationClass}">
            ${cover.recommendation}
        </span>

    </div>

    <p>${cover.location}</p>

    <div class="report-metrics">

        <div>

            <strong>Investment Score</strong>

            ${cover.investmentScore}

        </div>

        <div>

            <strong>AI Confidence</strong>

            ${cover.confidence}%

        </div>

        <div>

            <strong>Generated</strong>

            ${formatDate(cover.generatedAt)}

        </div>

    </div>

    <div class="report-actions">

        <button onclick="openReport('${cover.reportId}')">

            Open

        </button>

        <button onclick="deleteReport('${cover.reportId}')">

            Delete

        </button>

    </div>

</div>

`;

}

// ========================================
// Format Date
// ========================================

function formatDate(date){

    if(!date){

        return "—";

    }

    const formatted = new Date(date);

    return Number.isNaN(formatted.getTime())

        ? "—"

        : formatted.toLocaleDateString();

}

// ========================================
// Open Report
// ========================================

function openReport(reportId){

    const report =

        reportLibraryService.getReport(
            reportId
        );

    if(!report){

        return;

    }

    

    window.open(

        "../memorandum/memorandum.html",

        "_blank"

    );

}

// ========================================
// Delete Report
// ========================================

function deleteReport(reportId){

    const report =

        reportLibraryService.getReport(
            reportId
        );

    if(!report){

        return;

    }

  const property =

    report.sections?.cover?.property ??

    "this report";

const confirmed =

    confirm(

        `Delete "${property}"?`

    );

if(!confirmed){

    return;

}

    reportLibraryService.deleteReport(
        reportId
    );

    refreshReports();

}