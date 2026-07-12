// ========================================
// MPI Underwriting Service
// Maxwell Property Intelligence
// ========================================

class UnderwritingService {

    static THRESHOLDS = {

    occupancy: {

        low: 95,

        moderate: 90

    },

    capRate: {

        excellent: 10,

        good: 8

    },

    age: {

        new: 15,

        modern: 30

    }

};


    constructor(marketService){

        this.marketService = marketService;

    }

    analyze(deal){

    const market =
        this.analyzeMarketRisk(deal);

    const vacancy =
        this.analyzeVacancyRisk(deal);

    const condition =
        this.analyzeConditionRisk(deal);

    const financing =
        this.analyzeFinancingRisk(deal);

    const underwriting = {

    market,

    vacancy,

    condition,

    financing

};

const overallRisk =
    this.calculateOverallRisk(underwriting);

underwriting.overallRisk =
    overallRisk;

underwriting.riskCards =
    this.buildRiskCards(
        underwriting
    );

return underwriting;

    }  
    
    buildRiskCards(underwriting){

    return [

        this.createRiskCard(
            "Market Risk",
            underwriting.market,
            "📈"
        ),

        this.createRiskCard(
            "Vacancy Risk",
            underwriting.vacancy,
            "🏢"
        ),

        this.createRiskCard(
            "Property Condition",
            underwriting.condition,
            "🔧"
        ),

        this.createRiskCard(
            "Financing Risk",
            underwriting.financing,
            "🏦"
        )

    ];

}

createRiskCard(
    title,
    risk,
    icon
){

    return {

        title,

        icon,

        level:
            risk.level,

        className:
            this.getRiskClass(
                risk.level
            ),

        badge:
            this.getRiskBadge(
                title,
                risk.level
            ),

        status:
            this.getRiskStatus(
                risk.level
            ),

        description:
            this.getRiskDescription(
                title,
                risk
            ),

        reason:
            risk.reason

    };

}

getRiskClass(level){

    switch(level){

        case "Low":
        case "Minimal":
        case "Excellent":

            return "risk-low";

        case "Moderate":

            return "risk-moderate";

        case "High":

            return "risk-high";

        default:

            return "risk-moderate";

    }

}

getRiskBadge(
    title,
    level
){

    switch(level){

        case "Low":

            switch(title){

                case "Market Risk":
                    return "LOW MARKET RISK";

                case "Vacancy Risk":
                    return "LOW VACANCY RISK";

                case "Property Condition":
                    return "LOW PROPERTY RISK";

                case "Financing Risk":
                    return "LOW FINANCING RISK";

                default:
                    return "LOW RISK";

            }

        case "Minimal":

            return "MINIMAL RISK";

        case "Excellent":

            return "EXCELLENT CONDITION";

        case "Moderate":

            return "MODERATE RISK";

        case "High":

            return "HIGH RISK";

        default:

            return "UNKNOWN";

    }

}

getRiskStatus(level){

    switch(level){

        case "Low":

            return "Very Stable";

        case "Minimal":

            return "Minimal Exposure";

        case "Excellent":

            return "Excellent Condition";

        case "Moderate":

            return "Monitor";

        case "High":

            return "Needs Attention";

        default:

            return "";

    }

}

getRiskDescription(
    title,
    risk
){

    switch(title){

        case "Market Risk":

            return "Current market indicators suggest " +
    risk.level.toLowerCase() +
    " exposure based on inventory, rent growth, appreciation, and vacancy trends.";

        case "Vacancy Risk":

            return "Current occupancy trends indicate " +
                risk.level.toLowerCase() +
                " vacancy exposure.";

        case "Property Condition":

            return "Building age and condition indicate " +
                risk.level.toLowerCase() +
                " maintenance risk.";

        case "Financing Risk":

            return "Current lending assumptions indicate " +
                risk.level.toLowerCase() +
                " financing risk.";

        default:

            return "";

    }

}

calculateOverallRisk(underwriting){

    const scores = [

        underwriting.market.score,

        underwriting.vacancy.score,

        underwriting.condition.score,

        underwriting.financing.score

    ];

    const score =
    scores.reduce(
        (total, value) => total + value,
        0
    ) / scores.length;

let level;
let className;
let label;
let subtitle;
let description;

if(score <= 10){

    level = "Low";
    className = "risk-low";
    label = "🟢 LOW RISK";
    subtitle = "Excellent Risk Profile";
    description =
        "MPI projects limited downside exposure based on current market conditions, property fundamentals, and financing assumptions.";

}
else if(score <= 20){

    level = "Moderate";
    className = "risk-moderate";
    label = "🟡 MODERATE RISK";
    subtitle = "Balanced Risk Profile";
    description =
        "The investment appears fundamentally sound but warrants standard due diligence.";

}
else{

    level = "High";
    className = "risk-high";
    label = "🔴 HIGH RISK";
    subtitle = "Elevated Investment Risk";
    description =
        "MPI identified several underwriting concerns requiring additional review.";

}

return {

    score: Math.round(score),

    level,
    
    className,

    label,

    subtitle,

    description,

    summary:
        this.buildRiskSummary(
            underwriting
        )

};

}

buildRiskSummary(underwriting){

    return [

        {

            icon:"📈",

            title:"Market",

            level:
                underwriting.market.level,

            className:
                this.getRiskClass(
                    underwriting.market.level
                )

        },

        {

            icon:"🏢",

            title:"Vacancy",

            level:
                underwriting.vacancy.level,

            className:
                this.getRiskClass(
                    underwriting.vacancy.level
                )

        },

        {

            icon:"🔧",

            title:"Condition",

            level:
                underwriting.condition.level,

            className:
                this.getRiskClass(
                    underwriting.condition.level
                )

        },

        {

            icon:"🏦",

            title:"Financing",

            level:
                underwriting.financing.level,

            className:
                this.getRiskClass(
                    underwriting.financing.level
                )

        }

    ];

}

analyzeMarketRisk(deal){

        const market =
            this.marketService.loadMarket(deal.city);

        if(!market){

    return {

        level: "Moderate",

        score: 15,

        market: null,

        contributions: [],

        highlights: [],

        reason:
            "Market intelligence is not yet available for this location."

    };

}

const marketScore =
    this.calculateMarketScore(
        market
    );

const score =
    marketScore.score;

const contributions =
    marketScore.contributions;

const level =
    this.determineMarketRiskLevel(
        score
    );

const highlights =
    this.buildMarketHighlights(market);

const reason = `

<strong>MPI Market Outlook</strong><br><br>

${deal.city} continues to demonstrate favorable investment conditions
supported by the following market indicators:

<ul>

${highlights.map(h => `<li>${h}</li>`).join("")}

</ul>

MPI projects stable income potential,
continued appreciation opportunities,
and limited downside exposure based on
current market intelligence.

`;

return {

    level,

    score,

    market,

    contributions,

    highlights,

    reason

};

}

calculateMarketScore(market){

    let score = 0;

    const contributions = [];

    //----------------------------------
    // Inventory
    //----------------------------------

    if(market.inventoryMonths < 3){

        score -= 10;

        contributions.push({

            metric: "Inventory",

            impact: -10,

            value: market.inventoryMonths,

            reason:
                "Low housing inventory supports pricing stability."

        });

    }

    //----------------------------------
    // Rent Growth
    //----------------------------------

    if(market.rentGrowth > 5){

        score -= 8;

        contributions.push({

            metric: "Rent Growth",

            impact: -8,

            value: market.rentGrowth,

            reason:
                "Strong rent growth supports future income potential."

        });

    }

    //----------------------------------
    // Vacancy
    //----------------------------------

    if(market.vacancyRate > 8){

        score += 15;

        contributions.push({

            metric: "Vacancy",

            impact: 15,

            value: market.vacancyRate,

            reason:
                "Elevated vacancy may increase income volatility."

        });

    }

    //----------------------------------
    // Appreciation
    //----------------------------------

    if(market.appreciation > 6){

        score -= 5;

        contributions.push({

            metric: "Appreciation",

            impact: -5,

            value: market.appreciation,

            reason:
                "Strong appreciation supports long-term equity growth."

        });

    }

    //----------------------------------
    // Interest Rates
    //----------------------------------

    if(market.interestRate > 7){

        score += 6;

        contributions.push({

            metric: "Interest Rate",

            impact: 6,

            value: market.interestRate,

            reason:
                "Elevated interest rates may reduce investment spread."

        });

    }

    return {

        score,

        contributions

    };

}

determineMarketRiskLevel(score){

    if(score <= -10)
        return "Low";

    if(score >= 10)
        return "High";

    return "Moderate";

}

buildMarketHighlights(market){

    const highlights = [];

    if(market.inventoryMonths < 3){

        highlights.push(
            `🟢 Inventory: ${market.inventoryMonths} Months (Seller's Market)`
        );

    }
    else{

        highlights.push(
            `🟡 Inventory: ${market.inventoryMonths} Months`
        );

    }

    if(market.rentGrowth >= 5){

        highlights.push(
            `🟢 Rent Growth: +${market.rentGrowth}%`
        );

    }
    else{

        highlights.push(
            `🟡 Rent Growth: ${market.rentGrowth}%`
        );

    }

    if(market.vacancyRate < 5){

        highlights.push(
            `🟢 Vacancy: ${market.vacancyRate}%`
        );

    }
    else{

        highlights.push(
            `🟡 Vacancy: ${market.vacancyRate}%`
        );

    }

    if(market.appreciation >= 6){

        highlights.push(
            `🟢 Appreciation: +${market.appreciation}%`
        );

    }
    else{

        highlights.push(
            `🟡 Appreciation: ${market.appreciation}%`
        );

    }

    if(market.employmentGrowth >= 2){

        highlights.push(
            `🟢 Employment Growth: +${market.employmentGrowth}%`
        );

    }
    else{

        highlights.push(
            `🟡 Employment Growth: ${market.employmentGrowth}%`
        );

    }

    if(market.interestRate <= 7){

        highlights.push(
            `🟢 Interest Rate: ${market.interestRate}%`
        );

    }
    else{

        highlights.push(
            `🟠 Interest Rate: ${market.interestRate}%`
        );

    }

    return highlights;

}

analyzeVacancyRisk(deal){

    if(deal.occupancy === "N/A"){

        return {

            level:"Minimal",

            score:0,

            reason:
                "Revenue depends primarily on business operations."

        };

    }

    const occupancy =
        parseFloat(deal.occupancy);

    const thresholds =
        UnderwritingService.THRESHOLDS.occupancy;

    if(occupancy >= thresholds.low){

        return {

            level:"Low",

            score:5,

            reason:
                "Occupancy supports stable income."

        };

    }

    if(occupancy >= thresholds.moderate){

        return {

            level:"Moderate",

            score:15,

            reason:
                "Occupancy should be monitored."

        };

    }

    return {

        level:"High",

        score:30,

        reason:
            "Occupancy may impact projected cash flow."

    };

}

    analyzeConditionRisk(deal){

    const age =
        new Date().getFullYear() -
        deal.yearBuilt;

    const thresholds =
        UnderwritingService.THRESHOLDS.age;

    if(age <= thresholds.new){

        return {

            level:"Excellent",

            score:5,

            reason:
                "Relatively new construction."

        };

    }

    if(age <= thresholds.modern){

        return {

            level:"Low",

            score:10,

            reason:
                "Typical maintenance expected."

        };

    }

    return {

        level:"Moderate",

        score:20,

        reason:
            "Older property should receive additional inspection."

    };

}

    analyzeFinancingRisk(deal){

    const thresholds =
        UnderwritingService.THRESHOLDS.capRate;

    if(deal.capRate >= thresholds.excellent){

        return {

            level:"Low",

            score:5,

            reason:
                "Cash flow comfortably supports financing."

        };

    }

    if(deal.capRate >= thresholds.good){

        return {

            level:"Moderate",

            score:15,

            reason:
                "Current interest rates reduce investment spread."

        };

    }

    return {

        level:"High",

        score:30,

        reason:
            "Financing assumptions require additional review."

    };

}

}

const underwritingService =
    new UnderwritingService(marketService);

