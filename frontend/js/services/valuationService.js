// ========================================
// MPI Valuation Service
// Maxwell Property Intelligence
// ========================================

class ValuationService {

    analyze(deal){

        const aiValue =
            deal.estimatedValue;

        const purchasePrice =
            deal.price;

        const equity =
            aiValue - purchasePrice;

        const valueGap =
            this.calculateValueGap(
                purchasePrice,
                aiValue
            );

        const valuation = {

    aiValue,

    purchasePrice,

    equity,

    valueGap,

    equityPercent: valueGap,

    isDiscount: purchasePrice < aiValue,

    equitySpread: equity,

    label: this.getLabel(valueGap),

    color: this.getColor(valueGap),

    valuationRecommendation:
        this.getRecommendation(valueGap),

    reason:
        this.getReason(valueGap)

};

return {

    metrics: valuation,

    notes: this.buildSnapshotNotes(
        deal,
        valuation
    ),

    summary: this.buildSummary(
        valuation
    )

};

    }

    // ========================================
// Build Valuation Summary
// ========================================

buildSummary(valuation){

    return `

<strong>MPI Valuation Summary</strong><br><br>

MPI estimates this property's current market value at
<strong>$${valuation.aiValue.toLocaleString()}</strong>.

Based on the current acquisition price of
<strong>$${valuation.purchasePrice.toLocaleString()}</strong>,

MPI projects approximately
<strong>$${valuation.equity.toLocaleString()}</strong>
in unrealized equity.

This represents a
<strong>${valuation.valueGap}% valuation advantage</strong>
relative to the estimated market value.

`;

}

buildSnapshotNotes(deal, valuation){

    return {

        price:
            "Current Asking Price",

        capRate:
            deal.capRate >= 10
                ? "Excellent Return"
                : deal.capRate >= 8
                    ? "Strong Return"
                    : "Moderate Return",

        cashFlow:
            deal.cashFlow >= 10000
                ? "Exceptional Monthly Income"
                : deal.cashFlow >= 5000
                    ? "Strong Monthly Income"
                    : "Positive Monthly Income",

        occupancy:
            deal.occupancy === "N/A"
                ? "Business Asset"
                : "Current Occupancy",

        noi:
            deal.noi >= 150000
                ? "Excellent Annual NOI"
                : deal.noi >= 75000
                    ? "Healthy Annual NOI"
                    : "Positive Annual NOI",

        pricePerSF:
            deal.pricePerSqFt === 0
                ? "Route / Portfolio Asset"
                : deal.pricePerSqFt < 75
                    ? "Excellent Value"
                    : deal.pricePerSqFt < 125
                        ? "Competitive Pricing"
                        : "Premium Asset",

        cashOnCash:
            deal.cashOnCash >= 15
                ? "Outstanding Return"
                : deal.cashOnCash >= 10
                    ? "Above Target"
                    : "Moderate Return",

        equity:
            valuation.valueGap >= 10
                ? "Excellent Upside"
                : valuation.valueGap >= 0
                    ? "Positive Opportunity"
                    : "Priced Above AI Estimate"

    };

}

calculateValueGap(price, value){

    if(price <= 0){

        return 0;

    }

    return Math.round(
        ((value - price) / price) * 100
    );

}

    getLabel(gap){

        if(gap >= 15)
            return "SIGNIFICANTLY UNDERVALUED";

        if(gap >= 5)
            return "UNDERVALUED";

        if(gap >= 0)
            return "FAIR VALUE";

        return "OVERVALUED";

    }

    getColor(gap){

        if(gap >= 15)
            return "metric-good";

        if(gap >= 0)
            return "metric-warning";

        return "metric-danger";

    }

    getRecommendation(gap){

        if(gap >= 15)
            return "Strong Acquisition";

        if(gap >= 5)
            return "Acquire";

        if(gap >= 0)
            return "Fair Value";

        return "Renegotiate Purchase Price";

    }

    getReason(gap){

        if(gap >= 15){

            return "MPI estimates substantial unrealized equity based on current valuation.";

        }

        if(gap >= 5){

            return "Property appears to be trading below estimated market value.";

        }

        if(gap >= 0){

            return "Property appears to be priced near fair market value.";

        }

        return "Purchase price exceeds MPI's current valuation estimate.";

    }

}



const valuationService =
    new ValuationService();