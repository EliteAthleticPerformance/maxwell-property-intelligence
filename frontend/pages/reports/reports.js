const SELECTED_REPORT_KEY =

    "selectedReport";

   
const reportLibraryService =
    new ReportLibraryService();


const searchInput =

    document.getElementById(
        "reportSearch"
    );

searchInput.addEventListener(

    "input",

    refreshReports

);

const RECOMMENDATIONS = {

    ALL: "ALL",

    BUY: "BUY",

    HOLD: "HOLD",

    PASS: "PASS"

};


const recommendationSelect =

    document.getElementById(
        "reportRecommendation"
    );

recommendationSelect.addEventListener(

    "change",

    refreshReports

);

const sortSelect =

    document.getElementById(
        "reportSort"
    );

sortSelect.addEventListener(

    "change",

    refreshReports

);

const reportGrid =
    document.getElementById(
        "reportGrid"
    );

const reportStats =
    document.getElementById(
        "reportStats"
    );

// ========================================
// Render Reports
// ========================================

refreshReports();

function refreshReports(){

    const reports =
        reportLibraryService.getReports();

    renderStatistics();

    const searchResults =

    filterReports(

        reports,

        searchInput.value

    );

const recommendationResults =

    filterRecommendation(

        searchResults,

        recommendationSelect.value

    );

    

const sortedReports =

    sortReports(

        recommendationResults,

        sortSelect.value

    );

    

renderReports(

    sortedReports

);

    
}

// ========================================
// Render Statistics
// ========================================

function renderStatistics(){

    const stats =
        reportLibraryService.statistics();

    reportStats.innerHTML = `

        <div class="kpi-card">

            <div class="kpi-value">

                ${stats.totalReports}

            </div>

            <div class="kpi-label">

                Reports

            </div>

        </div>

        <div class="kpi-card">

            <div class="kpi-value">

                ${stats.averageScore}

            </div>

            <div class="kpi-label">

                Avg Score

            </div>

        </div>

        <div class="kpi-card">

            <div class="kpi-value">

                ${stats.averageConfidence}%

            </div>

            <div class="kpi-label">

                Avg Confidence

            </div>

        </div>

        <div class="kpi-card">

            <div class="kpi-value">

                ${formatCurrency(stats.totalValueAnalyzed)}

            </div>

            <div class="kpi-label">

                Total Value Analyzed

            </div>

        </div>

    `;

}

// ========================================
// Filter Reports
// ========================================

function filterReports(reports, query){

   
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
// Filter Recommendation
// ========================================

function filterRecommendation(
    reports,
    recommendation
){

    if(

        recommendation === RECOMMENDATIONS.ALL

    ){

        return reports;

    }

    return reports.filter(report =>

        report.sections?.cover?.recommendation ===

        recommendation

    );

}


// ========================================
// Sort Reports
// ========================================

function sortReports(reports, sortBy){

    const sorted = [...reports];

    switch(sortBy){

        case "oldest":

            sorted.sort(

                (a,b)=>

                    new Date(

    a.sections?.cover?.generatedAt ?? 0) -

                    new Date(

    b.sections?.cover?.generatedAt ?? 0

)

            );

            break;

        case "score":

            sorted.sort(

                (a,b)=>

                    (b.sections?.cover?.investmentScore ?? 0) -

                    (a.sections?.cover?.investmentScore ?? 0)

            );

            break;

        case "confidence":

            sorted.sort(

                (a,b)=>

                    (b.sections?.cover?.confidence ?? 0) -

                    (a.sections?.cover?.confidence ?? 0)

            );

            break;

        case "property":

            sorted.sort(

                (a,b)=>

                    (a.sections?.cover?.property ?? "")
                        .localeCompare(

                            b.sections?.cover?.property ?? ""

                        )

            );

            break;

        case "recommendation":{

            const order = {

    [RECOMMENDATIONS.BUY]: 3,
    [RECOMMENDATIONS.HOLD]: 2,
    [RECOMMENDATIONS.PASS]: 1

};

            sorted.sort(

                (a,b)=>

                    (order[b.sections?.cover?.recommendation] ?? 0) -

                    (order[a.sections?.cover?.recommendation] ?? 0)

            );

            break;

        }

        case "newest":
        default:

            sorted.sort(

                (a,b)=>

                    new Date(

                b.sections?.cover?.generatedAt ?? 0

            ) -

                    new Date(

                a.sections?.cover?.generatedAt ?? 0

            )

            );

            break;

    }

    return sorted;

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

function formatCurrency(value){

    return new Intl.NumberFormat(

        "en-US",

        {

            style:"currency",

            currency:"USD",

            notation:"compact",

            maximumFractionDigits:1

        }

    ).format(value);

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

    sessionStorage.setItem(

    SELECTED_REPORT_KEY,

    JSON.stringify(report)

);    

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