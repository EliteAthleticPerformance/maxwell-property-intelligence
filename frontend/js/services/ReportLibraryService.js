// ========================================
// MPI Report Library Service
// Maxwell Property Intelligence
// ========================================

class ReportLibraryService {

    static STORAGE_KEY =
    Object.freeze(
        "mpi-report-library"
    );

    constructor(){

        this.storageKey =
            ReportLibraryService.STORAGE_KEY;

    }

    // ========================================
// Load Report Library
// ========================================

    load(){

    return JSON.parse(

        localStorage.getItem(
            this.storageKey
        ) ||

        "[]"

    );

}

// ========================================
// Save Report Library
// ========================================

save(reports){

    localStorage.setItem(

        this.storageKey,

        JSON.stringify(reports)

    );

}

// ========================================
// Save Report
// ========================================

saveReport(report){

    const reports =
        this.load();

    if(!this.exists(report.reportId)){

    reports.push(report);

    reports.sort(

        (a,b)=>

            new Date(b.generatedAt)

            -

            new Date(a.generatedAt)

    );

    this.save(reports);

}

    return report;

}



// ========================================
// Get Reports
// ========================================

getReports(){

    return this.load();

}

// ========================================
// Get Report
// ========================================

getReport(reportId){

    return this.load().find(

        report =>

            report.reportId === reportId

    );

}

// ========================================
// Report Exists
// ========================================

exists(reportId){

    return this.load()

        .some(

            report =>

                report.reportId === reportId

        );

}


// ========================================
// Update Report
// ========================================

updateReport(updatedReport){

    const reports =
        this.load();

    const index =

        reports.findIndex(

            report =>

                report.reportId ===
                updatedReport.reportId

        );

    if(index >= 0){

        reports[index] =
            updatedReport;

        this.save(reports);

        return updatedReport;

    }

}

// ========================================
// Delete Report
// ========================================

deleteReport(reportId){

    const reports =

        this.load()

            .filter(

                report =>

                    report.reportId !== reportId

            );

    this.save(reports);

    return reports;

}

// ========================================
// Library Statistics
// ========================================

statistics(){

    const reports = this.load();

    if(reports.length === 0){

        return {

            totalReports: 0,

            buy: 0,

            hold: 0,

            pass: 0,

            averageScore: 0,

            averageConfidence: 0,

            totalValueAnalyzed: 0

        };

    }

    const totals = reports.reduce((stats, report) => {

        //----------------------------------
        // Recommendation Counts
        //----------------------------------

        const action =
            report.sections
                ?.recommendation
                ?.action;

        if(action === "BUY") stats.buy++;
        else if(action === "HOLD") stats.hold++;
        else if(action === "PASS") stats.pass++;

        //----------------------------------
        // Investment Score
        //----------------------------------

        stats.score +=
            report.sections
                ?.recommendation
                ?.investmentScore ?? 0;

        //----------------------------------
        // AI Confidence
        //----------------------------------

        stats.confidence +=
            report.sections
                ?.recommendation
                ?.confidence ?? 0;

        //----------------------------------
        // Property Value
        //----------------------------------

        stats.value +=
            report.sections
                ?.propertyOverview
                ?.purchasePrice ??

            report.sections
                ?.valuation
                ?.estimatedValue ??

            0;

        return stats;

    },{

        buy:0,
        hold:0,
        pass:0,
        score:0,
        confidence:0,
        value:0

    });

    return {

        totalReports: reports.length,

        buy: totals.buy,

        hold: totals.hold,

        pass: totals.pass,

        averageScore:
            Math.round(
                totals.score / reports.length
            ),

        averageConfidence:
            Math.round(
                totals.confidence / reports.length
            ),

        totalValueAnalyzed:
            totals.value

    };

}

// ========================================
// Clear Library
// ========================================

clear(){

    localStorage.removeItem(

        this.storageKey

    );

}

}