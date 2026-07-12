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

const recommendation = {

    score,

    ...this.getRecommendation(
        score
    )

};

    const memo =
    this.buildMemo(
        deal,
        valuation,
        underwriting,
        confidence,
        recommendation
    );    

    return {

        ...recommendation,

        scoreBreakdown,

        confidence:
            confidence.score,

        equity:
            valuation.metrics.equity,

        valueGap:
            valuation.metrics.valueGap,

        overallRisk:
            underwriting.overallRisk,

        memo,

        reasons:
            this.getReasons(
                deal,
                valuation,
                underwriting,
                confidence
            ),

        analysis:
            this.buildAnalysis(
                deal,
                recommendation,
                confidence
            )

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
    // Score Breakdown
    //----------------------------------

    return {

        rawScore:
            Number(
                rawScore.toFixed(1)
            ),

        finalScore,

        contributions

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

    buildAnalysis(
    deal,
    recommendation,
    confidence
){

    const analysis = [];

    // Cap Rate
    if(deal.capRate >= 12){

        analysis.push({
            icon:"📈",
            title:"Cap Rate",
            text:"This cap rate ranks among MPI's strongest investment opportunities."
        });

    }
    else if(deal.capRate >= 10){

        analysis.push({
            icon:"📈",
            title:"Cap Rate",
            text:"Above-average cap rate provides excellent long-term income potential."
        });

    }
    else if(deal.capRate >= 8){

        analysis.push({
            icon:"📈",
            title:"Cap Rate",
            text:"Cap rate supports a balanced combination of income and appreciation."
        });

    }
    else{

        analysis.push({
            icon:"📈",
            title:"Cap Rate",
            text:"Lower cap rate may indicate a premium location with stronger appreciation potential."
        });

    }

    // Cash Flow
    if(deal.cashFlow >= 15000){

        analysis.push({
            icon:"💰",
            title:"Cash Flow",
            text:`Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} places this property among MPI's highest income-producing opportunities.`
        });

    }
    else if(deal.cashFlow >= 10000){

        analysis.push({
            icon:"💰",
            title:"Cash Flow",
            text:`Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} provides exceptional recurring income.`
        });

    }
    else if(deal.cashFlow >= 5000){

        analysis.push({
            icon:"💰",
            title:"Cash Flow",
            text:`Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} offers strong income with long-term upside.`
        });

    }
    else{

        analysis.push({
            icon:"💰",
            title:"Cash Flow",
            text:`Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} remains positive while allowing room for value-add improvements.`
        });

    }

    // AI Confidence
    analysis.push({

        icon:"🤖",

        title:"AI Confidence",

        text:`MPI assigned a ${confidence.score}% confidence score based on current market data, property fundamentals, financing assumptions, and underwriting analysis.`

    });

    // Recommendation
    analysis.push({

        icon:recommendation.icon,

        title:"Recommendation",

        text:
            recommendation.level === "STRONG BUY"
                ? "MPI AI recommends immediate acquisition based on strong investment fundamentals."
                : recommendation.level === "WATCH LIST"
                    ? "Property should be monitored for pricing improvements or additional market data."
                    : "Additional due diligence is recommended before acquisition."

    });

    return analysis;

}

buildMemo(
    deal,
    valuation,
    underwriting,
    confidence,
    recommendation
){

    return{

    executiveSummary:
        this.buildExecutiveSummary(
            deal,
            valuation,
            underwriting,
            confidence,
            recommendation
        ),

    riskNarrative:
        this.buildRiskNarrative(
            underwriting
        ),

    marketNarrative:
    this.buildMarketNarrative(
        deal,
        underwriting
    ),

    // valuationNarrative:
    //     this.buildValuationNarrative(
    //         valuation
    //     ),

    // cashFlowNarrative:
    //     this.buildCashFlowNarrative(
    //         deal
    //     ),

    // recommendationNarrative:
    //     this.buildRecommendationNarrative(
    //         recommendation
    //     ),

    acquisitionStrategy:
        this.buildStrategy(
            recommendation
        ),

    strengths:
        this.buildStrengths(
            deal,
            valuation,
            underwriting,
            confidence
        ),

    concerns:
        this.buildConcerns(
            deal,
            underwriting
        )

};

}

buildExecutiveSummary(
    deal,
    valuation,
    underwriting,
    confidence,
    recommendation
){

    return `

<strong>MPI Executive Investment Summary</strong><br><br>

MPI assigns this opportunity a
<strong>${recommendation.level}</strong>
recommendation with an overall
<strong>${recommendation.score}/100 Investment Score</strong>.

The acquisition is projected to generate approximately
<strong>$${valuation.metrics.equity.toLocaleString()}</strong>
in unrealized equity together with
<strong>$${deal.cashFlow.toLocaleString()}/month</strong>
in recurring cash flow.

Overall investment risk is assessed as
<strong>${underwriting.overallRisk.label.replace(/[🟢🟡🔴]\s*/, "")}</strong>,
while MPI's AI confidence score is
<strong>${confidence.score}%</strong>.

Based on current valuation, market conditions, and underwriting assumptions, MPI believes this opportunity
<strong>${recommendation.level === "STRONG BUY" || recommendation.level === "BUY"
    ? "meets institutional acquisition criteria."
    : recommendation.level === "WATCH LIST"
    ? "should be monitored for improved acquisition terms."
    : "requires additional due diligence before acquisition."}</strong>

`;
}

// ========================================
// Risk Narrative
// ========================================

buildRiskNarrative(
    underwriting
){

    const risk =
        underwriting.overallRisk;

    if(risk.level === "Low"){

        return `

MPI identifies below-average investment risk
based on favorable market fundamentals,
balanced financing assumptions,
and healthy operating performance.

Current underwriting indicates limited downside
exposure while supporting long-term capital
preservation and stable income generation.

`;

    }

    if(risk.level === "Moderate"){

        return `

MPI identifies moderate investment risk.

While the property demonstrates favorable
investment characteristics,
certain underwriting assumptions should
continue to be monitored throughout the
due diligence process.

`;

    }

    return `

MPI identifies elevated investment risk.

Additional underwriting,
property inspection,
and financial verification
are recommended before acquisition.

`;

}

// ========================================
// Market Narrative
// ========================================

buildMarketNarrative(
    deal,
    underwriting
){

    const market =
        underwriting.market.market;

    if(!market){

        return `

MPI was unable to retrieve localized market
intelligence for this opportunity.

Additional market research is recommended
during due diligence.

`;

    }

    const inventory =
        market.inventoryMonths;

    const rentGrowth =
        market.rentGrowth;

    const vacancy =
        market.vacancyRate;

    const appreciation =
        market.appreciation;

    const employment =
        market.employmentGrowth;

    return `

The
<strong>${deal.city}</strong>
market continues to demonstrate favorable
investment characteristics.

Current inventory remains at
<strong>${inventory} months</strong>,
supporting pricing stability and continued
buyer demand.

Annual rent growth of
<strong>${rentGrowth}%</strong>
and projected appreciation of
<strong>${appreciation}%</strong>
suggest healthy long-term income and equity
growth potential.

Vacancy remains at
<strong>${vacancy}%</strong>,
while employment growth of
<strong>${employment}%</strong>
supports continued rental demand.

Overall, MPI considers current market
conditions favorable for long-term real
estate investment.

`;

}


// ========================================
// Acquisition Strategy
// ========================================

buildStrategy(recommendation){

    switch(recommendation.level){

        case "STRONG BUY":

            return {

                title:"Acquire Immediately",

                icon:"🟢",

                className:"strategy-buy",

                description:
                    "MPI recommends immediate acquisition based on exceptional investment fundamentals."

            };

        case "BUY":

            return {

                title:"Proceed With Acquisition",

                icon:"🟢",

                className:"strategy-buy",

                description:
                    "Complete standard due diligence prior to closing."

            };

        case "WATCH LIST":

            return {

                title:"Monitor Opportunity",

                icon:"🟡",

                className:"strategy-watch",

                description:
                    "Monitor pricing and market activity before submitting an offer."

            };

        case "SPECULATIVE":

            return {

                title:"Additional Due Diligence",

                icon:"🟠",

                className:"strategy-speculative",

                description:
                    "Perform additional underwriting before making an acquisition decision."

            };

        default:

            return {

                title:"Do Not Pursue",

                icon:"🔴",

                className:"strategy-pass",

                description:
                    "Current investment fundamentals do not support acquisition."

            };

    }

}

buildStrengths(
    deal,
    valuation,
    underwriting,
    confidence
){

    const strengths = [];

    // Equity

    if(valuation.metrics.equity > 0){

        strengths.push(
            `$${valuation.metrics.equity.toLocaleString()} projected equity opportunity`
        );

    }

    // Cap Rate

    if(deal.capRate >= 8){

        strengths.push(
            `${deal.capRate}% cap rate exceeds MPI acquisition targets`
        );

    }

    // Cash Flow

    if(deal.cashFlow >= 5000){

        strengths.push(
            `$${deal.cashFlow.toLocaleString()}/month projected cash flow`
        );

    }

    // Risk

    if(
    underwriting.overallRisk.level ===
    "Low"
){

    strengths.push(
        "Low overall underwriting risk"
    );

}

    // Market

    if(
        underwriting.market.level ===
        "Low"
    ){

        strengths.push(
            `Favorable ${deal.city} market fundamentals`
        );

    }

    // Occupancy

    if(deal.occupancy !== "N/A"){

        strengths.push(
            `${deal.occupancy} occupancy provides stable income`
        );

    }

    // AI

    if(confidence.score >= 90){

        strengths.push(
            `${confidence.score}% AI confidence score`
        );

    }

    return strengths;

}

buildConcerns(
    deal,
    underwriting
){

    const concerns = [];

    if(deal.yearBuilt < 1995){

        concerns.push(
            `Property built in ${deal.yearBuilt} may require future capital improvements`
        );

    }

    if(
        underwriting.financing.level ===
        "Moderate"
    ){

        concerns.push(
            "Moderate financing risk due to current interest rates"
        );

    }

    if(deal.occupancy !== "N/A"){

        const occupancy =
            parseFloat(deal.occupancy);

        if(occupancy < 95){

            concerns.push(
                `Vacancy should be monitored (${deal.occupancy} occupied)`
            );

        }

    }

    if(
        underwriting.market.level ===
        "Moderate"
    ){

        concerns.push(
            "Market appreciation appears average compared to MPI benchmark markets"
        );

    }

    if(concerns.length === 0){

        concerns.push(
            "No material investment concerns identified during preliminary underwriting"
        );

    }

    return concerns;

}

getReasons(
        deal,
        valuation,
        underwriting,
        confidence
    ){

        const reasons = [];

        if(valuation.metrics.valueGap >= 10){

            reasons.push(
                "Property appears undervalued relative to MPI's estimated market value."
            );

        }

        if(deal.capRate >= 8){

            reasons.push(
                "Cap rate exceeds MPI acquisition targets."
            );

        }

        if(deal.cashFlow >= 5000){

            reasons.push(
                "Projected monthly cash flow supports long-term income generation."
            );

        }

        if(
            underwriting.market.level ===
            "Low"
        ){

            reasons.push(
                "Local market fundamentals remain favorable."
            );

        }

        if(confidence.score >= 95){

    reasons.push(
        "MPI AI has high confidence in this opportunity."
    );

}

const overallRisk =
    underwriting.overallRisk;

if(overallRisk.level === "Low"){

    reasons.push(
        "Overall investment risk remains below MPI acquisition thresholds."
    );

}
else if(overallRisk.level === "Moderate"){

    reasons.push(
        "Overall investment risk appears manageable with routine due diligence."
    );

}

if(reasons.length === 0){

    reasons.push(
        "Additional underwriting is recommended before acquisition."
    );

}

        return reasons;

    }

    getRecommendation(score){

        if(score >= 95){

            return{

                level:"STRONG BUY",

                icon:"🟢",

                className:
                    "recommendation-strong-buy"

            };

        }

        if(score >= 85){

            return{

                level:"BUY",

                icon:"🟢",

                className:
                    "recommendation-buy"

            };

        }

        if(score >= 75){

            return{

                level:"WATCH LIST",

                icon:"🟡",

                className:
                    "recommendation-watch-list"

            };

        }

        if(score >= 65){

            return{

                level:"SPECULATIVE",

                icon:"🟠",

                className:
                    "recommendation-speculative"

            };

        }

        return{

            level:"PASS",

            icon:"🔴",

            className:
                "recommendation-pass"

        };

    }
    

}

const recommendationService =
    new RecommendationService();