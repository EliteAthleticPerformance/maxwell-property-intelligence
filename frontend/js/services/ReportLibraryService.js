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

    const reports =
        this.load();

    return {

        totalReports:
            reports.length,

        buy:

            reports.filter(

                report =>

                    report.sections
                        ?.recommendation
                        ?.action === "BUY"

            ).length,

        hold:

            reports.filter(

                report =>

                    report.sections
                        ?.recommendation
                        ?.action === "HOLD"

            ).length,

        pass:

            reports.filter(

                report =>

                    report.sections
                        ?.recommendation
                        ?.action === "PASS"

            ).length

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