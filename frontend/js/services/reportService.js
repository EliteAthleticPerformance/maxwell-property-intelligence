// ========================================
// MPI Report Service
// Maxwell Property Intelligence
// ========================================

class ReportService {

    generate(deal){

        //----------------------------------
        // Valuation
        //----------------------------------

        const valuation =
            valuationService.analyze(
                deal
            );

        //----------------------------------
        // Underwriting
        //----------------------------------

        const underwriting =
            underwritingService.analyze(
                deal
            );

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
        // Executive Narrative
        //----------------------------------

        const narrative =
            executiveNarrativeService.generate(
                deal,
                valuation,
                underwriting,
                confidence,
                recommendation
            );

        //----------------------------------
        // Institutional Investment Report
        //----------------------------------

        return {

    deal: {

        type: deal.type,

        city: deal.city,

        assetClass: deal.assetClass,

        image: deal.image,

        price: deal.price,

        estimatedValue: deal.estimatedValue,

        cashFlow: deal.cashFlow,

        capRate: deal.capRate

    },

    analysis: {

        valuation,

        underwriting,

        confidence,

        recommendation

    },

    narrative

};

    }

}

const reportService =
    new ReportService();