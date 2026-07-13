// ========================================
// MPI Executive Narrative Service
// Maxwell Property Intelligence
// ========================================

class ExecutiveNarrativeService {

    generate(
        deal,
        valuation,
        underwriting,
        confidence,
        recommendation
    ){

        const context = {

            deal,

            valuation,

            underwriting,

            confidence,

            recommendation

        };

        return {

            headline:
                this.buildHeadline(context),

            investmentThesis:
                this.buildInvestmentThesis(context),

            valuationNarrative:
                this.buildValuationNarrative(context),

            operatingNarrative:
                this.buildOperatingNarrative(context),

            marketNarrative:
                this.buildMarketNarrative(context),

            riskNarrative:
                this.buildRiskNarrative(context),

            recommendationNarrative:
                this.buildRecommendationNarrative(context),

            conclusion:
                this.buildConclusion(context)

        };

    }


    // ========================================
    // Executive Headline
    // ========================================

    buildHeadline({ deal, valuation, recommendation }){

        const gap =
    valuation.metrics.valueGap;

        if(
            gap >= 15 &&
            recommendation.score >= 85
        ){

            return (
                `${deal.name} presents a compelling acquisition ` +
                `opportunity supported by favorable valuation, ` +
                `strong operating economics, and limited modeled downside.`
            );

        }

        if(
            gap >= 5 &&
            recommendation.score >= 70
        ){

            return (
                `${deal.name} demonstrates attractive investment ` +
                `fundamentals with a favorable valuation profile ` +
                `and identifiable return potential.`
            );

        }

        if(recommendation.score >= 60){

            return (
                `${deal.name} presents a viable investment opportunity, ` +
                `although select underwriting considerations should be ` +
                `validated prior to acquisition.`
            );

        }

        return (
            `${deal.name} presents a mixed investment profile and ` +
            `requires additional underwriting before acquisition ` +
            `should be considered.`
        );

    }


    // ========================================
    // Investment Thesis
    // ========================================

    buildInvestmentThesis({
        deal,
        valuation,
        confidence,
        recommendation
    }){

        const parts = [];

        parts.push(
            `MPI assigns the opportunity an Investment Score of ` +
            `${recommendation.score}/100 with ${confidence.score}% ` +
            `analytical confidence.`
        );

        if(valuation.metrics.valueGap >= 15){

            parts.push(
                `The asset is modeled approximately ` +
                `${valuation.metrics.valueGap}% below estimated market value, ` +
                `creating a meaningful embedded equity position at acquisition.`
            );

        }
        else if(valuation.metrics.valueGap >= 5){

            parts.push(
                `The acquisition price remains favorable relative to ` +
                `MPI's estimated market value, providing a measurable ` +
                `valuation advantage.`
            );

        }
        else if(valuation.metrics.valueGap >= 0){

            parts.push(
                `The acquisition price is generally aligned with ` +
                `MPI's modeled market valuation.`
            );

        }
        else{

            parts.push(
                `The proposed acquisition price exceeds MPI's modeled ` +
                `valuation and may require price renegotiation.`
            );

        }

        if(deal.cashFlow >= 5000){

            parts.push(
                `Projected monthly cash flow of ` +
                `$${deal.cashFlow.toLocaleString()} further strengthens ` +
                `the investment thesis.`
            );

        }

        return parts.join(" ");

    }


    // ========================================
    // Valuation Narrative
    // ========================================

   buildValuationNarrative({
    valuation
}){

    const metrics =
        valuation.metrics;

    const price =
        metrics.purchasePrice
            .toLocaleString();

    const value =
        metrics.aiValue
            .toLocaleString();

    const equity =
        metrics.equity
            .toLocaleString();

    const valueGap =
        metrics.valueGap;

    if(valueGap >= 15){

        return (
            `MPI estimates the asset's market value at $${value} ` +
            `relative to a proposed acquisition price of $${price}. ` +
            `This represents approximately $${equity} in modeled ` +
            `equity creation at acquisition and indicates a significant ` +
            `valuation disconnect in favor of the investor.`
        );

    }

    if(valueGap >= 5){

        return (
            `MPI estimates market value at $${value}, compared with ` +
            `an acquisition price of $${price}. The resulting ` +
            `$${equity} valuation spread provides a favorable basis ` +
            `for acquisition.`
        );

    }

    if(valueGap >= 0){

        return (
            `The proposed acquisition price of $${price} is generally ` +
            `consistent with MPI's estimated market value of $${value}. ` +
            `The investment thesis therefore depends primarily on ` +
            `operating performance and future appreciation.`
        );

    }

    return (
        `The proposed acquisition price of $${price} exceeds MPI's ` +
        `estimated market value of $${value}. Price renegotiation or ` +
        `additional operational upside should be demonstrated before ` +
        `proceeding.`
    );

}


    // ========================================
    // Operating Narrative
    // ========================================

    buildOperatingNarrative({ deal }){

        const parts = [];

        if(deal.cashFlow){

            parts.push(
                `The asset is projected to generate approximately ` +
                `$${deal.cashFlow.toLocaleString()} in monthly cash flow.`
            );

        }

        if(deal.capRate){

            if(deal.capRate >= 10){

                parts.push(
                    `A ${deal.capRate}% capitalization rate indicates ` +
                    `strong income production relative to acquisition cost.`
                );

            }
            else if(deal.capRate >= 7){

                parts.push(
                    `The ${deal.capRate}% capitalization rate reflects ` +
                    `a competitive income yield within typical investment ` +
                    `property underwriting parameters.`
                );

            }
            else{

                parts.push(
                    `The ${deal.capRate}% capitalization rate suggests ` +
                    `that future return performance may depend more heavily ` +
                    `on appreciation or operational improvement.`
                );

            }

        }

        return parts.join(" ");

    }


    // ========================================
    // Market Narrative
    // ========================================

    buildMarketNarrative({
        underwriting
    }){

        const market =
            underwriting.market;

        if(!market){

            return (
                `MPI currently has limited market intelligence available ` +
                `for this location. Additional local market validation ` +
                `is recommended.`
            );

        }

        if(market.level === "Low"){

            return (
                `Current market indicators provide a supportive backdrop ` +
                `for the investment. Supply conditions, rental fundamentals, ` +
                `and appreciation trends collectively indicate limited ` +
                `near-term market pressure.`
            );

        }

        if(market.level === "Moderate"){

            return (
                `Market conditions remain generally balanced. While the ` +
                `market does not present significant structural concerns, ` +
                `MPI recommends continued monitoring of vacancy, rental ` +
                `growth, and financing conditions.`
            );

        }

        return (
            `Market conditions introduce elevated underwriting risk. ` +
            `Current indicators suggest that vacancy, supply, pricing, ` +
            `or financing conditions may place pressure on projected returns.`
        );

    }


    // ========================================
    // Risk Narrative
    // ========================================

    buildRiskNarrative({
        underwriting
    }){

        const risks = [

            underwriting.market,
            underwriting.vacancy,
            underwriting.condition,
            underwriting.financing

        ];

        const highRisks =
            risks.filter(
                risk => risk?.level === "High"
            );

        const moderateRisks =
            risks.filter(
                risk => risk?.level === "Moderate"
            );

        if(highRisks.length === 0 &&
           moderateRisks.length <= 1){

            return (
                `MPI identifies limited downside exposure under the ` +
                `current underwriting assumptions. No major structural ` +
                `risk factors materially impair the investment thesis.`
            );

        }

        if(highRisks.length === 0){

            return (
                `The investment presents a manageable risk profile. ` +
                `Several underwriting variables warrant monitoring, ` +
                `but MPI does not currently identify a material threat ` +
                `to the overall investment thesis.`
            );

        }

        return (
            `MPI identifies elevated risk within one or more underwriting ` +
            `categories. These factors should be independently validated ` +
            `and addressed before capital is committed.`
        );

    }


    // ========================================
    // Recommendation Narrative
    // ========================================

    buildRecommendationNarrative({
        recommendation,
        valuation
    }){

        if(recommendation.score >= 85){

            return (
                `MPI classifies the opportunity as a high-priority ` +
                `acquisition candidate. The combination of valuation ` +
                `advantage, income potential, and modeled risk supports ` +
                `advancing the asset into formal due diligence.`
            );

        }

        if(recommendation.score >= 70){

            return (
                `MPI recommends advancing the opportunity for additional ` +
                `underwriting and due diligence. Current investment ` +
                `fundamentals support continued evaluation.`
            );

        }

        if(recommendation.score >= 55){

            return (
                `MPI recommends a selective review of the opportunity. ` +
                `The investment may be viable, but identified underwriting ` +
                `variables should be resolved before acquisition.`
            );

        }

        if(valuation.metrics.valueGap < 0){

            return (
                `MPI does not currently recommend acquisition at the ` +
                `proposed purchase price. Price renegotiation should be ` +
                `considered before further investment analysis.`
            );

        }

        return (
            `MPI recommends additional underwriting before advancing ` +
            `the opportunity.`
        );

    }


    // ========================================
    // Investment Conclusion
    // ========================================

    buildConclusion({
        recommendation,
        confidence
    }){

        if(
            recommendation.score >= 85 &&
            confidence.score >= 85
        ){

            return (
                `Based on the available data, MPI views the investment ` +
                `as a compelling acquisition opportunity and recommends ` +
                `advancing to due diligence and capital structuring.`
            );

        }

        if(recommendation.score >= 70){

            return (
                `Based on current underwriting, MPI supports continued ` +
                `evaluation of the opportunity subject to standard ` +
                `financial, operational, and property-level due diligence.`
            );

        }

        return (
            `MPI recommends resolving the identified underwriting ` +
            `questions before an acquisition decision is made.`
        );

        }

}

const executiveNarrativeService =
    new ExecutiveNarrativeService();