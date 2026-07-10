// ========================================
// MPI Recommendation Service
// Maxwell Property Intelligence
// ========================================

class RecommendationService {

     static WEIGHTS = {

        confidence: 40,

        equity: 20,

        cashFlow: 15,

        appreciation: 10,

        capRate: 10,

        risk: 15

    };

    static SCORING = {

    confidence: {
        weight: 40
    },

    equity: {
        weight: 20,
        thresholds: [
            { min: 20, multiplier: 1.00 },
            { min: 10, multiplier: 0.75 },
            { min: 5,  multiplier: 0.50 },
            { min: 0,  multiplier: 0.25 }
        ]
    }

};


    build(
    deal,
    valuation,
    underwriting,
    confidence
){

    const score =
        this.calculateScore(
            deal,
            valuation,
            underwriting,
            confidence
        );

    const recommendation =
        this.getRecommendation(score);

    const memo =
    this.buildMemo(
        deal,
        valuation,
        underwriting,
        confidence,
        recommendation
    );    

    return {

        score,

        ...recommendation,

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

    let score = 0;

    //----------------------------------
    // AI Confidence (40)
    //----------------------------------

    score +=
    confidence.score *
    (W.confidence / 100);

    //----------------------------------
    // Equity Opportunity (20)
    //----------------------------------

    if(valuation.metrics.valueGap >= 20){

        score += W.equity;

    }
    else if(valuation.metrics.valueGap >= 10){

        score += W.equity * .75;

    }
    else if(valuation.metrics.valueGap >= 5){

        score += W.equity * .50;

    }
    else if(valuation.metrics.valueGap >= 0){

        score += W.equity * .25;

    }

    //----------------------------------
    // Cash Flow (15)
    //----------------------------------

    if(deal.cashFlow >= 10000){

        score += W.cashFlow;

    }
    else if(deal.cashFlow >= 5000){

        score += W.cashFlow * .67;

    }
    else{

        score += W.cashFlow * .33;

    }

    //----------------------------------
    // Appreciation (10)
    //----------------------------------

    const market =
        underwriting.market.market;

    if(market){

        if(market.appreciation >= 7){

            score += W.appreciation;

        }
        else if(market.appreciation >= 5){

            score += W.appreciation * .50;

        }

    }

    //----------------------------------
    // Cap Rate (10)
    //----------------------------------

    if(deal.capRate >= 10){

        score += W.capRate;

    }
    else if(deal.capRate >= 8){

        score += W.capRate * .70;

    }
    else{

        score += W.capRate * .40;

    }

    //----------------------------------
    // Overall Risk (15)
    //----------------------------------

    const risk =
        underwriting.overallRisk;

    if(risk.className === "risk-low"){

        score += W.risk;

    }
    else if(risk.className === "risk-moderate"){

        score += W.risk * .53;

    }

    return Math.max(
        0,
        Math.min(
            Math.round(score),
            100
        )
    );

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

        text:`MPI AI assigned a ${confidence.score}% confidence score based on valuation, market trends, comparable sales, and underwriting.`

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

        thesis:
            this.buildThesis(
                deal,
                valuation,
                underwriting,
                confidence,
                recommendation
            ),

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

buildThesis(
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
// Acquisition Strategy
// ========================================

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
        underwriting.overallRisk.className ===
        "risk-low"
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

if(overallRisk.className === "risk-low"){

    reasons.push(
        "Overall investment risk remains below MPI acquisition thresholds."
    );

}
else if(overallRisk.className === "risk-moderate"){

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