// ========================================
// MPI Report Service
// Maxwell Property Intelligence
// ========================================

class ReportService {

    generate(deal) {

        //----------------------------------
        // Valuation
        //----------------------------------

        const valuation =
            valuationService.analyze(deal);

        //----------------------------------
        // Underwriting
        //----------------------------------

        const underwriting =
            underwritingService.analyze(deal);

        //----------------------------------
        // AI Confidence
        //----------------------------------

        const confidence =
            confidenceService.calculate(
                deal,
                underwriting
            );

        //----------------------------------
        // Investment Recommendation
        //----------------------------------

        const recommendation =
            recommendationService.build(
                deal,
                valuation,
                underwriting,
                confidence
            );

        //----------------------------------
        // Final Report
        //----------------------------------

        return {

            deal,

            valuation,

            underwriting,

            confidence,

            recommendation

        };

    }

}

const reportService =
    new ReportService();