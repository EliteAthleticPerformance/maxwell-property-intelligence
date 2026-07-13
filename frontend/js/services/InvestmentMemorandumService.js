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

            documentType:
                "Investment Memorandum",

            version:
                "1.0",

            generatedAt:
                new Date(),

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

            metadata,

            deal,

            analysis,

            narrative

        });

    }

// ========================================
// Memorandum Metadata
// ========================================

metadata(context){

    return {

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
            analysis.confidence.score

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
            recommendation.overallRisk

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

operatingPerformance(context)

    // ========================================
    // Market
    // ========================================

    market(context){

        return {};

    }

// ========================================
// Risk
// ========================================

risk(context){

    const {

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

        action:
            recommendation.action,

        investmentScore:
            recommendation.score,

        confidence:
            confidence.score,

        overallRisk:
            recommendation.overallRisk,

        narrative:
            narrative.recommendationNarrative

    };

}

    // ========================================
    // Conclusion
    // ========================================

// ========================================
// Investment Conclusion
// ========================================

conclusion(context){

    const {

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

    const {

        analysis

    } = context;

    const {

        confidence,

        recommendation,

        underwriting

    } = analysis;

    return {

        title:
            "Appendix",

        confidence:{

            score:
                confidence.score,

            label:
                confidence.label ??

                null

        },

        investmentScore:{

            score:
                recommendation.score,

            breakdown:
                recommendation.scoreBreakdown ??

                null

        },

        underwriting:{

            overallRisk:
                underwriting.overallRisk,

            market:
                underwriting.market,

            vacancy:
                underwriting.vacancy,

            condition:
                underwriting.condition,

            financing:
                underwriting.financing

        },

        assumptions:{

            generatedBy:
                "MPI AI",

            methodology:
                "Maxwell Property Intelligence",

            reportVersion:
                "MPI 1.0"

        }

    };

}

const investmentMemorandumService =
    new InvestmentMemorandumService();