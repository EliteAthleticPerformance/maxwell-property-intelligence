// ========================================
// MPI Recommendation Service
// Maxwell Property Intelligence
// ========================================

class RecommendationService {

     static WEIGHTS = {

    confidence: 40,

    equity: 20,

    cashFlow: 10,

    appreciation: 5,

    capRate: 10,

    risk: 15

};

// ========================================
// Asset Class Scoring Benchmarks
// ========================================

static BENCHMARKS = {

    Residential: {

        cashFlow: {

            excellent: 1000,

            strong: 500,

            positive: 250

        }

    },

    Multifamily: {

        cashFlow: {

            excellent: 5000,

            strong: 3000,

            positive: 1500

        }

    },

    "Mobile Home Park": {

        cashFlow: {

            excellent: 15000,

            strong: 10000,

            positive: 5000

        }

    },

    "Retail Strip Center": {

        cashFlow: {

            excellent: 10000,

            strong: 6000,

            positive: 3000

        }

    },

    "Car Wash": {

        cashFlow: {

            excellent: 15000,

            strong: 7500,

            positive: 4000

        }

    },

    Laundromat: {

        cashFlow: {

            excellent: 7500,

            strong: 4000,

            positive: 2000

        }

    },

    "Self Storage": {

        cashFlow: {

            excellent: 12000,

            strong: 7500,

            positive: 4000

        }

    },

    "RV Park": {

        cashFlow: {

            excellent: 20000,

            strong: 12000,

            positive: 6000

        }

    },

    "Industrial Warehouse": {

        cashFlow: {

            excellent: 15000,

            strong: 10000,

            positive: 5000

        }

    },

    "Ice Machine Route": {

        cashFlow: {

            excellent: 7500,

            strong: 4500,

            positive: 2500

        }

    },

    "Tax Lien Portfolio": {

        cashFlow: {

            excellent: 5000,

            strong: 2500,

            positive: 1000

        }

    },

    Business: {

        cashFlow: {

            excellent: 15000,

            strong: 7500,

            positive: 3000

        }

    },

    "Route / Portfolio": {

        cashFlow: {

            excellent: 7500,

            strong: 4000,

            positive: 2000

        }

    },

    Default: {

        cashFlow: {

            excellent: 10000,

            strong: 5000,

            positive: 1000

        }

    }

};

    build(
    deal,
    valuation,
    underwriting,
    confidence
){

    const scoreBreakdown =
        this.calculateScore(
            deal,
            valuation,
            underwriting,
            confidence
        );

    const score =
        scoreBreakdown.finalScore;

    const recommendation =
        this.getRecommendation(
            score
        );

    return {

        score,

        ...recommendation,

        scoreBreakdown,

        confidence:
            confidence.score,

        equity:
            valuation.metrics.equity,

        valueGap:
            valuation.metrics.valueGap,

        overallRisk:
            underwriting.overallRisk

    };

}

 calculateScore(
    deal,
    valuation,
    underwriting,
    confidence
){

    const W =
        RecommendationService.WEIGHTS;

    //----------------------------------
    // Score Contributions
    //----------------------------------

    const contributions = {

        confidence: 0,

        equity: 0,

        cashFlow: 0,

        appreciation: 0,

        capRate: 0,

        risk: 0

    };

    //----------------------------------
    // AI Confidence (40)
    //----------------------------------

    contributions.confidence =
        confidence.score *
        (W.confidence / 100);

    //----------------------------------
    // Equity Opportunity (20)
    //----------------------------------

    const valueGap =
        valuation.metrics.valueGap;

    if(valueGap >= 20){

        contributions.equity =
            W.equity;

    }
    else if(valueGap >= 10){

        contributions.equity =
            W.equity * .75;

    }
    else if(valueGap >= 5){

        contributions.equity =
            W.equity * .50;

    }
    else if(valueGap >= 0){

        contributions.equity =
            W.equity * .25;

    }

    //----------------------------------
    // Cash Flow (10)
    // Asset-Class Aware
    //----------------------------------

    contributions.cashFlow =
        this.calculateCashFlowScore(
            deal
        );

    //----------------------------------
    // Appreciation (5)
    //----------------------------------

    const market =
        underwriting.market.market;

    if(market){

        if(market.appreciation >= 7){

            contributions.appreciation =
                W.appreciation;

        }
        else if(
            market.appreciation >= 5
        ){

            contributions.appreciation =
                W.appreciation * .50;

        }

    }

    //----------------------------------
    // Cap Rate (10)
    //----------------------------------

    if(deal.capRate >= 10){

        contributions.capRate =
            W.capRate;

    }
    else if(deal.capRate >= 8){

        contributions.capRate =
            W.capRate * .70;

    }
    else{

        contributions.capRate =
            W.capRate * .40;

    }

    //----------------------------------
    // Overall Risk (15)
    //----------------------------------

    const risk =
        underwriting.overallRisk;

    if(risk.level === "Low"){

        contributions.risk =
            W.risk;

    }
    else if(
        risk.level === "Moderate"
    ){

        contributions.risk =
            W.risk * .53;

    }

    //----------------------------------
    // Raw Score
    //----------------------------------

    const rawScore =
        Object.values(
            contributions
        ).reduce(
            (total, value) =>
                total + value,
            0
        );

    //----------------------------------
    // Final Score
    //----------------------------------

    const finalScore =
        Math.max(
            0,
            Math.min(
                Math.round(rawScore),
                100
            )
        );


//----------------------------------
// Explainable Score Details
//----------------------------------

const details =
    this.buildScoreDetails(
        deal,
        valuation,
        underwriting,
        confidence,
        contributions
    );


    //----------------------------------
// Score Breakdown
//----------------------------------

return {

    rawScore:
        Number(
            rawScore.toFixed(1)
        ),

    finalScore,

    contributions,

    details

};

}


// ========================================
// Get Asset Benchmark
// ========================================

getAssetBenchmark(deal){

    const benchmarks =
        RecommendationService.BENCHMARKS;

    //----------------------------------
    // Specific Asset Type
    //----------------------------------

    if(
        deal.type &&
        benchmarks[deal.type]
    ){

        return benchmarks[
            deal.type
        ];

    }

    //----------------------------------
    // General Asset Class
    //----------------------------------

    if(
        deal.assetClass &&
        benchmarks[deal.assetClass]
    ){

        return benchmarks[
            deal.assetClass
        ];

    }

    //----------------------------------
    // Default Benchmark
    //----------------------------------

    return benchmarks.Default;

}

// ========================================
// Get Asset Benchmark Name
// ========================================

getAssetBenchmarkName(deal){

    const benchmarks =
        RecommendationService.BENCHMARKS;

    //----------------------------------
    // Specific Asset Type
    //----------------------------------

    if(
        deal.type &&
        benchmarks[deal.type]
    ){

        return deal.type;

    }

    //----------------------------------
    // General Asset Class
    //----------------------------------

    if(
        deal.assetClass &&
        benchmarks[deal.assetClass]
    ){

        return deal.assetClass;

    }

    //----------------------------------
    // Default Benchmark
    //----------------------------------

    return "Default";

}


// ========================================
// Calculate Cash Flow Score
// ========================================

calculateCashFlowScore(deal){

    const W =
        RecommendationService.WEIGHTS;

    const benchmark =
        this.getAssetBenchmark(
            deal
        );

    const cashFlow =
        Number(deal.cashFlow) || 0;

    //----------------------------------
    // Excellent Cash Flow
    //----------------------------------

    if(
        cashFlow >=
        benchmark.cashFlow.excellent
    ){

        return W.cashFlow;

    }

    //----------------------------------
    // Strong Cash Flow
    //----------------------------------

    if(
        cashFlow >=
        benchmark.cashFlow.strong
    ){

        return W.cashFlow * .75;

    }

    //----------------------------------
    // Positive Cash Flow
    //----------------------------------

    if(
        cashFlow >=
        benchmark.cashFlow.positive
    ){

        return W.cashFlow * .50;

    }

    //----------------------------------
    // Weak Cash Flow
    //----------------------------------

    return W.cashFlow * .25;

}   

// ========================================
// Build Score Details
// AI Explainability
// ========================================

buildScoreDetails(
    deal,
    valuation,
    underwriting,
    confidence,
    contributions
){

    const W =
        RecommendationService.WEIGHTS;

    const valueGap =
        valuation.metrics.valueGap;

    const market =
        underwriting.market.market;

    const risk =
        underwriting.overallRisk;

    const benchmark =
        this.getAssetBenchmark(deal);

    const benchmarkName =
        this.getAssetBenchmarkName(deal);

    const cashFlow =
        Number(deal.cashFlow) || 0;

    //----------------------------------
    // Confidence Rating
    //----------------------------------

    const confidenceRating =
        confidence.score >= 96
            ? "Elite Confidence"
            : confidence.score >= 90
                ? "Very High Confidence"
                : confidence.score >= 80
                    ? "High Confidence"
                    : confidence.score >= 70
                        ? "Moderate Confidence"
                        : "Speculative";

    //----------------------------------
    // Equity Rating
    //----------------------------------

    const equityRating =
        valueGap >= 20
            ? "Exceptional"
            : valueGap >= 10
                ? "Strong"
                : valueGap >= 5
                    ? "Positive"
                    : valueGap >= 0
                        ? "Fair Value"
                        : "Limited";

    //----------------------------------
    // Cash Flow Rating
    //----------------------------------

    const cashFlowRating =
        cashFlow >=
        benchmark.cashFlow.excellent
            ? "Excellent"
            : cashFlow >=
              benchmark.cashFlow.strong
                ? "Strong"
                : cashFlow >=
                  benchmark.cashFlow.positive
                    ? "Positive"
                    : "Weak";

    //----------------------------------
    // Appreciation Rating
    //----------------------------------

    const appreciation =
        market
            ? market.appreciation
            : null;

    const appreciationRating =
        appreciation === null
            ? "Unavailable"
            : appreciation >= 7
                ? "Strong"
                : appreciation >= 5
                    ? "Positive"
                    : "Limited";

    //----------------------------------
    // Cap Rate Rating
    //----------------------------------

    const capRateRating =
        deal.capRate >= 10
            ? "Excellent"
            : deal.capRate >= 8
                ? "Strong"
                : "Moderate";

    //----------------------------------
    // Risk Rating
    //----------------------------------

    const riskRating =
        risk.level
            ? `${risk.level} Risk`
            : "Risk Unavailable";

    //----------------------------------
    // Score Details
    //----------------------------------

    return {

        confidence: {

            label:
                "AI Confidence",

            points:
                contributions.confidence,

            maxPoints:
                W.confidence,

            value:
                confidence.score,

            rating:
                confidenceRating,

            reason:
                `${confidence.score}% AI Confidence contributes ${contributions.confidence} of ${W.confidence} available Investment Score points.`

        },

        equity: {

            label:
                "Equity Opportunity",

            points:
                contributions.equity,

            maxPoints:
                W.equity,

            value:
                valueGap,

            rating:
                equityRating,

            reason:
                `A ${valueGap}% valuation advantage is rated ${equityRating.toLowerCase()} by MPI.`

        },

        cashFlow: {

            label:
                "Cash Flow",

            points:
                contributions.cashFlow,

            maxPoints:
                W.cashFlow,

            value:
                cashFlow,

            rating:
                cashFlowRating,

            benchmark:
                benchmarkName,

            reason:
                `$${cashFlow.toLocaleString()} monthly cash flow meets MPI's ${cashFlowRating} ${benchmarkName} benchmark.`

        },

        appreciation: {

            label:
                "Appreciation",

            points:
                contributions.appreciation,

            maxPoints:
                W.appreciation,

            value:
                appreciation,

            rating:
                appreciationRating,

            reason:
                appreciation === null
                    ? "Market appreciation data is currently unavailable."
                    : `${appreciation}% projected market appreciation is rated ${appreciationRating.toLowerCase()} by MPI.`

        },

        capRate: {

            label:
                "Cap Rate",

            points:
                contributions.capRate,

            maxPoints:
                W.capRate,

            value:
                deal.capRate,

            rating:
                capRateRating,

            reason:
                `A ${deal.capRate}% cap rate indicates a ${capRateRating.toLowerCase()} projected return profile.`

        },

        risk: {

            label:
                "Risk",

            points:
                contributions.risk,

            maxPoints:
                W.risk,

            value:
                risk.level,

            rating:
                riskRating,

            reason:
                risk.level === "Low"
                    ? "Low overall investment risk earns the maximum risk contribution."
                    : risk.level === "Moderate"
                        ? "Moderate overall investment risk receives a partial risk contribution."
                        : "High overall investment risk receives no additional risk contribution."

        }

    };

}

    getRecommendation(score){

    if(score >= 85){

        return {

            level:
                "STRONG ACQUISITION",

            action:
                "Advance to Due Diligence",

            icon:
                "🟢",

            className:
                "recommendation-strong-buy"

        };

    }

    if(score >= 70){

        return {

            level:
                "ACQUISITION CANDIDATE",

            action:
                "Continue Underwriting",

            icon:
                "🟢",

            className:
                "recommendation-buy"

        };

    }

    if(score >= 55){

        return {

            level:
                "SELECTIVE REVIEW",

            action:
                "Resolve Key Risks",

            icon:
                "🟡",

            className:
                "recommendation-watch-list"

        };

    }

    return {

        level:
            "PASS / RENEGOTIATE",

        action:
            "Do Not Advance",

        icon:
            "🔴",

        className:
            "recommendation-pass"

    };

}
    
}

const recommendationService =
    new RecommendationService();