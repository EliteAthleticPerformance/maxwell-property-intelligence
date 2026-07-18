// ========================================
// MPI Investment Memorandum Service
// Maxwell Property Intelligence
// ========================================

class InvestmentMemorandumService {

    // ========================================
    // Generate Investment Memorandum
    // ========================================

    generate(report){

    const context =
        this.buildContext(report);

    return {

    reportType:
        "Investment Memorandum",

    version:
        "1.0",

    generatedAt:
        context.metadata.generatedAt,

    reportId:
        context.metadata.reportId,

    sections:{

        metadata:
            this.metadata(context),

        cover:
            this.cover(context),

        executiveSummary:
            this.executiveSummary(context),

        propertyOverview:
            this.propertyOverview(context),

        valuation:
            this.valuation(context),

        operatingPerformance:
            this.operatingPerformance(context),

        market:
            this.market(context),

        risk:
            this.risk(context),

        underwriting:
            this.underwriting(context),

        recommendation:
            this.recommendation(context),

        conclusion:
            this.conclusion(context),

        appendix:
            this.appendix(context)

    }

};

    }

    // ========================================
    // Build Memorandum Context
    // ========================================

    buildContext(report){

        const {

            metadata = {},

            deal,

            analysis,

            narrative

        } = report;

        return Object.freeze({

    metadata:{

        ...metadata,

        generatedAt:
            metadata.generatedAt ?? new Date(),

        reportId:
            metadata.reportId ?? this.generateReportId()

    },

    deal,

    analysis,

    narrative

});

    }

    generateReportId(){

    const today =
        new Date()
            .toISOString()
            .slice(0,10)
            .replaceAll("-", "");

    const random =
        Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0");

    return `MPI-${today}-${random}`;

}

// ========================================
// Memorandum Metadata
// ========================================

metadata(context){

const {

    metadata

} = context;

return {

    reportId:
        metadata.reportId,

    reportType:
        "Investment Memorandum",

    version:
        "1.0",

    generatedAt:
        metadata.generatedAt,

    analyst:
        "MPI AI",

    confidentiality:
        "Confidential",

    methodology:
        "Maxwell Property Intelligence",

    copyright:
        "© Maxwell Property Intelligence"

};

}

  // ========================================
// Cover Page
// ========================================

cover(context){

    const {

        deal,

        analysis

    } = context;

    return {

        title:
            "Investment Memorandum",

        subtitle:
            "Maxwell Property Intelligence",

        property:
            deal.type,

        assetClass:
            deal.assetClass ??
            deal.type,

        location:
            deal.city,

        image:
            deal.image ??
            null,

        purchasePrice:
    deal.price,

recommendation:
    analysis.recommendation.action,

investmentScore:
    analysis.recommendation.score,

confidence:
    analysis.confidence.score,

generatedAt:
    context.metadata.generatedAt,

reportId:
    context.metadata.reportId

};

}

 // ========================================
// Executive Summary
// ========================================

executiveSummary(context){

    const {

        deal,

        analysis

    } = context;

    const {

        valuation,

        confidence,

        recommendation

    } = analysis;

    return {

        property:
            deal.type,

        assetClass:
            deal.assetClass ??
            deal.type,

        location:
            deal.city,

        recommendation:
            recommendation.action,

        investmentScore:
            recommendation.score,

        confidence:
            confidence.score,

        purchasePrice:
            deal.price,

        estimatedValue:
            valuation.estimatedValue,

        modeledEquity:
            valuation.equity,

        projectedCashFlow:
            deal.cashFlow,

        capRate:
            deal.capRate,

        overallRisk:

    recommendation.overallRisk?.label ??

    recommendation.overallRisk?.level ??

    analysis.underwriting?.overallRisk?.label ??

    analysis.underwriting?.overallRisk?.level ??

    "Unknown"

    };

}

 // ========================================
// Property Overview
// ========================================

propertyOverview(context){

    const {

        deal

    } = context;

    return {

        title:
            "Property Overview",

        image:
            deal.image ??
            null,

        property:
            deal.type,

        assetClass:
            deal.assetClass ??
            deal.type,

        location:
            deal.city,

        address:
            deal.address ??
            null,

        purchasePrice:
            deal.price,

        estimatedValue:
            deal.estimatedValue,

        yearBuilt:
            deal.yearBuilt ??
            null,

        buildingSize:
            deal.buildingSize ??
            null,

        lotSize:
            deal.lotSize ??
            null,

        units:
            deal.units ??
            null,

        occupancy:
            deal.occupancy ??
            null,

        bedrooms:
            deal.bedrooms ??
            null,

        bathrooms:
            deal.bathrooms ??
            null

    };

}

// ========================================
// Valuation
// ========================================

valuation(context){

    const {

        deal,

        analysis,

        narrative

    } = context;

    const {

        valuation

    } = analysis;

    return {

        title:
            "Valuation",

        headline:
            narrative.headline,

        narrative:
            narrative.valuationNarrative,

        property:
             deal.type,
        
        location:
             deal.city,

        metrics:{

            purchasePrice:
                valuation.purchasePrice,

            estimatedValue:
                valuation.estimatedValue,

            modeledEquity:
                valuation.equity,

            valueGap:
                valuation.valueGap,

            valuationLabel:
                valuation.label,

            recommendation:
                valuation.recommendation

        }

    };

}

// ========================================
// Operating Performance
// ========================================

operatingPerformance(context){

    const {

        deal,

        narrative

    } = context;

    return {

        title:
            "Operating Performance",

        narrative:
            narrative.operatingPerformanceNarrative ??

            "Operating performance reflects the projected income, occupancy assumptions, and capitalization metrics used in MPI's underwriting analysis.",

        property:
            deal.type,

        location:
            deal.city,

        metrics:{

            projectedCashFlow:
                deal.cashFlow,

            netOperatingIncome:
                deal.noi ??

                null,

            capRate:
                deal.capRate,

            cashOnCashReturn:
                deal.cashOnCash ??

                null,

            occupancy:
                deal.occupancy,

            debtServiceCoverage:
                deal.dscr ??

                null

        }

    };

}

// ========================================
// Market
// ========================================

market(context){

    const {

        deal,

        analysis,

        narrative

    } = context;

    const market =

        analysis.underwriting.market;

    return {

        title:
            "Market",

        narrative:
            narrative.marketNarrative ??

            market.reason ??

            "",

        property:
            deal.type,
        
        location:
            deal.city,

        intelligence:{

            inventoryMonths:
                market.inventoryMonths,

            rentGrowth:
                market.rentGrowth,

            vacancyRate:
                market.vacancyRate,

            appreciation:
                market.appreciation,

            employmentGrowth:
                market.employmentGrowth,

            interestRate:
                market.interestRate

        }

    };

}

// ========================================
// Risk
// ========================================

risk(context){

    const {

        deal,

        analysis,

        narrative

    } = context;

    const {

        underwriting

    } = analysis;

    return {

        title:
            "Risk",

        narrative:
            narrative.riskNarrative,

        property:
            deal.type,

        location:
            deal.city,

        overall:{

            level:
                underwriting.overallRisk.level,

            score:
                underwriting.overallRisk.score,

            label:
                underwriting.overallRisk.label,

            subtitle:
                underwriting.overallRisk.subtitle,

            description:
                underwriting.overallRisk.description,

            summary:
                underwriting.overallRisk.summary

        },

        categories:{

            market:
                underwriting.market,

            vacancy:
                underwriting.vacancy,

            condition:
                underwriting.condition,

            financing:
                underwriting.financing

        }

    };

}

// ========================================
// Underwriting
// ========================================

underwriting(context){

    const {

        deal,

        analysis

    } = context;

    const {

        underwriting

    } = analysis;

    return {

        title:
            "Underwriting",

        summary:
            underwriting.summary ??
            null,

        property:
            deal.type,

        location:
            deal.city,

        cards:[

            {

                title:
                    "Market",

                data:
                    underwriting.market

            },

            {

                title:
                    "Vacancy",

                data:
                    underwriting.vacancy

            },

            {

                title:
                    "Condition",

                data:
                    underwriting.condition

            },

            {

                title:
                    "Financing",

                data:
                    underwriting.financing

            }

        ]

    };

}

// ========================================
// Recommendation
// ========================================

recommendation(context){

    const {

        deal,

        analysis,

        narrative

    } = context;

    const {

        recommendation,

        confidence

    } = analysis;

    return {

        title:
            "Recommended Next Step",

        property:
            deal.type,

        location:
            deal.city,
        
            action:
            recommendation.action,

        investmentScore:
            recommendation.score,

        confidence:
            confidence.score,

        overallRisk:

    recommendation.overallRisk?.label ??

    recommendation.overallRisk?.level ??

    analysis.underwriting?.overallRisk?.label ??

    analysis.underwriting?.overallRisk?.level ??

    "Unknown",

        narrative:
            narrative.recommendationNarrative

    };

}

   // ========================================
// Investment Conclusion
// ========================================

conclusion(context){

    const {

        deal,

        analysis,

        narrative

    } = context;

    const {

        recommendation,

        confidence

    } = analysis;

    return {

        title:
            "Investment Conclusion",

        property:
            deal.type,
        
        location:
            deal.city,
       
            investmentScore:
            recommendation.score,

        confidence:
            confidence.score,

        recommendation:
            recommendation.action,

        narrative:
            narrative.conclusion

    };

}

// ========================================
// Appendix
// ========================================

appendix(context){

    return {

        title:
            "Appendix",

        confidence:
            this.buildConfidenceAppendix(context),

        investmentScore:
            this.buildInvestmentScoreAppendix(context),

        underwriting:
            this.buildUnderwritingAppendix(context),

        market:
            this.buildMarketAppendix(context),

        valuation:
            this.buildValuationAppendix(context),

        assumptions:
            this.buildAssumptionsAppendix(context),

        metadata:
            this.buildMetadataAppendix(context)

    };

}

// ========================================
// Appendix
// AI Confidence
// ========================================

buildConfidenceAppendix(context){

    const {

        analysis

    } = context;

    const {

        confidence

    } = analysis;

    return {

        score:
            confidence.score,

        label:
            confidence.label,

        explanation:
            "Confidence reflects the quality and consistency of the market, valuation, underwriting, and financing analysis used by MPI.",

        inputs:[

            "Market Intelligence",

            "Valuation",

            "Underwriting",

            "Cash Flow",

            "Financing"

        ]

    };

}

// ========================================
// Appendix
// Investment Score
// ========================================

buildInvestmentScoreAppendix(context){

    const {

        analysis

    } = context;

    return {

        score:
            analysis.recommendation.score,

        breakdown:

            analysis.recommendation.scoreBreakdown ??

            []

    };

}

// ========================================
// Appendix
// Underwriting
// ========================================

buildUnderwritingAppendix(context){

    return context.analysis.underwriting;

}

// ========================================
// Appendix
// Market Intelligence
// ========================================

buildMarketAppendix(context){

    return context.analysis.underwriting.market;

}

// ========================================
// Appendix
// Valuation
// ========================================

buildValuationAppendix(context){

    return context.analysis.valuation;

}

// ========================================
// Appendix
// Assumptions
// ========================================

buildAssumptionsAppendix(context){

    const {

        deal

    } = context;

    return {

        purchasePrice:
            deal.price,

        capRate:
            deal.capRate,

        occupancy:
            deal.occupancy,

        cashFlow:
            deal.cashFlow,

        generatedBy:
            "MPI AI",

        methodology:
            "Maxwell Property Intelligence"

    };

}

// ========================================
// Appendix
// Metadata
// ========================================

buildMetadataAppendix(context){

    const {

    metadata

} = context;

return {

    reportId:
        metadata.reportId,

    reportType:
        "Investment Memorandum",

    version:
        "1.0",

    generatedAt:
        metadata.generatedAt,

    analyst:
        "MPI AI",

    methodology:
        "Maxwell Property Intelligence",

    confidentiality:
        "Confidential"

};

}

const investmentMemorandumService =
    new InvestmentMemorandumService();