// ========================================
// MPI Confidence Service
// Maxwell Property Intelligence
// ========================================

class ConfidenceService {

    static WEIGHTS = {

        market: 0.30,

        vacancy: 0.25,

        condition: 0.20,

        financing: 0.15

    };

    static BONUSES = {

        strongCapRate: 5,

        strongCashFlow: 5

    };

    static THRESHOLDS = {

        capRate: 10,

        cashFlow: 5000,

        elite: 96,

        veryHigh: 90,

        high: 80,

        moderate: 70

    };

    calculate(
        deal,
        underwriting
    ){

        let score = 100;

        const W =
            ConfidenceService.WEIGHTS;

        const B =
            ConfidenceService.BONUSES;

        const T =
            ConfidenceService.THRESHOLDS;

        //----------------------------------
        // Risk Adjustments
        //----------------------------------

        score -=
            underwriting.market.score *
            W.market;

        score -=
            underwriting.vacancy.score *
            W.vacancy;

        score -=
            underwriting.condition.score *
            W.condition;

        score -=
            underwriting.financing.score *
            W.financing;

        //----------------------------------
        // Investment Bonuses
        //----------------------------------

        if(deal.capRate >= T.capRate){

            score +=
                B.strongCapRate;

        }

        if(deal.cashFlow >= T.cashFlow){

            score +=
                B.strongCashFlow;

        }

        //----------------------------------
        // Clamp Score
        //----------------------------------

        score = Math.max(
            0,
            Math.min(
                99,
                Math.round(score)
            )
        );

        //----------------------------------
        // Star Rating
        //----------------------------------

        const starCount =
            this.getStarCount(score);

        const stars =
            "★★★★★".substring(
                0,
                starCount
            ) +
            "☆☆☆☆☆".substring(
                0,
                5 - starCount
            );

        //----------------------------------
        // Confidence Label
        //----------------------------------

        const label =
            this.getLabel(score);

        //----------------------------------
        // Final Confidence Analysis
        //----------------------------------

        return {

            score,

            starCount,

            stars,

            label,

            className:
                this.getClassName(score)

        };

    }

    // ========================================
    // Star Rating
    // ========================================

    getStarCount(score){

        const T =
            ConfidenceService.THRESHOLDS;

        if(score >= T.elite){
            return 5;
        }

        if(score >= T.veryHigh){
            return 4;
        }

        if(score >= T.high){
            return 3;
        }

        if(score >= T.moderate){
            return 2;
        }

        return 1;

    }

    // ========================================
    // Confidence Label
    // ========================================

    getLabel(score){

        const T =
            ConfidenceService.THRESHOLDS;

        if(score >= T.elite){

            return "ELITE CONFIDENCE";

        }

        if(score >= T.veryHigh){

            return "VERY HIGH CONFIDENCE";

        }

        if(score >= T.high){

            return "HIGH CONFIDENCE";

        }

        if(score >= T.moderate){

            return "MODERATE CONFIDENCE";

        }

        return "SPECULATIVE";

    }

    // ========================================
    // Confidence Class
    // ========================================

    getClassName(score){

        const T =
            ConfidenceService.THRESHOLDS;

        if(score >= T.elite){

            return "confidence-elite";

        }

        if(score >= T.veryHigh){

            return "confidence-high";

        }

        if(score >= T.high){

            return "confidence-good";

        }

        if(score >= T.moderate){

            return "confidence-moderate";

        }

        return "confidence-low";

    }

}

const confidenceService =
    new ConfidenceService();