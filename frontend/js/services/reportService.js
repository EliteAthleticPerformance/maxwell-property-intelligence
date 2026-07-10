// ========================================
// MPI Report Service
// Maxwell Property Intelligence
// ========================================

class ReportService {

    generate(deal){

    const underwriting =
        underwritingService.analyzeDeal(deal);

    const valuation =
        valuationService.analyze(deal);

    const confidence =
        confidenceService.calculate(
            deal,
            underwriting
        );

    const recommendation =
        recommendationService.build(
            deal,
            valuation,
            underwriting,
            confidence
        );

    return {

        deal,

        valuation,

        underwriting,

        confidence,

        recommendation,

        executiveSummary:
            this.buildExecutiveSummary(
                recommendation
            )

    };

}

    buildExecutiveSummary(recommendation){

    return `
        MPI recommends this opportunity as a
        ${recommendation.level}
        investment with an Investment Score of
        ${recommendation.score}/100.
    `;

}

}

const reportService =
    new ReportService();