// ========================================
// MPI Confidence Service
// Maxwell Property Intelligence
// ========================================

class ConfidenceService {

    calculate(deal, underwriting){

    let score = 100;

    // Risk Adjustments
    score -= underwriting.market.score * 0.30;
    score -= underwriting.vacancy.score * 0.25;
    score -= underwriting.condition.score * 0.20;
    score -= underwriting.financing.score * 0.15;

    // Investment Bonuses
    if(deal.capRate >= 10) score += 5;
    if(deal.cashFlow >= 5000) score += 5;

    // Clamp Score
    score = Math.max(
        0,
        Math.min(99, Math.round(score))
    );

    // Star Rating
    const starCount =
        score >= 96 ? 5 :
        score >= 90 ? 4 :
        score >= 80 ? 3 :
        score >= 70 ? 2 : 1;

    const stars =
        "★★★★★".substring(0, starCount) +
        "☆☆☆☆☆".substring(0, 5 - starCount);

    // Confidence Label
    const label =
        score >= 96 ? "ELITE CONFIDENCE" :
        score >= 90 ? "VERY HIGH CONFIDENCE" :
        score >= 80 ? "HIGH CONFIDENCE" :
        score >= 70 ? "MODERATE CONFIDENCE" :
                      "SPECULATIVE";

    return {

        score,

        starCount,

        stars,

        label,

        className:
        this.getClassName(score)

    };

}

getClassName(score){

    if(score >= 96){

        return "confidence-elite";

    }

    if(score >= 90){

        return "confidence-high";

    }

    if(score >= 80){

        return "confidence-good";

    }

    if(score >= 70){

        return "confidence-moderate";

    }

    return "confidence-low";

}

}

const confidenceService =
    new ConfidenceService();