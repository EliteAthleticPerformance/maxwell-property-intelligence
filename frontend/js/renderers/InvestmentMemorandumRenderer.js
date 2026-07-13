// ========================================
// MPI Investment Memorandum Renderer
// Maxwell Property Intelligence
// ========================================

class InvestmentMemorandumRenderer {

    // ========================================
    // Render Memorandum
    // ========================================

     // ========================================
    // Default Assets
    // ========================================

     static DEFAULT_IMAGE =
        "images/no-image.png";

    static REPORT_TITLE =
        "Investment Memorandum";

    static REPORT_SUBTITLE =
        "Maxwell Property Intelligence";

    static CURRENCY =
        "USD";

    static LOCALE =
        "en-US";

    render(memorandum){

    const { sections } = memorandum;

    return `

<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta
    name="viewport"
    content="width=device-width, initial-scale=1.0">

<title>

${InvestmentMemorandumRenderer.REPORT_TITLE}

</title>

<link
    rel="stylesheet"
    href="memorandum.css">

</head>

<body>

${this.renderCover(sections.cover)}

${this.renderExecutiveSummary(
    sections.executiveSummary
)}

${this.renderPropertyOverview(
    sections.propertyOverview
)}

${this.renderValuation(
    sections.valuation
)}

${this.renderOperatingPerformance(
    sections.operatingPerformance
)}

${this.renderMarket(
    sections.market
)}

${this.renderRisk(
    sections.risk
)}

${this.renderUnderwriting(
    sections.underwriting
)}

${this.renderRecommendation(
    sections.recommendation
)}

${this.renderConclusion(
    sections.conclusion
)}

${this.renderAppendix(
    sections.appendix
)}

</body>

</html>

`;

}

// ========================================
// Render Cover Page
// ========================================

renderCover(cover){

    return `

<section class="memo-page memo-cover">

    <div class="memo-cover-header">

        <h1>

            ${cover.title ??
    InvestmentMemorandumRenderer.REPORT_TITLE}

        </h1>

        <h2>

            ${cover.subtitle ??
    InvestmentMemorandumRenderer.REPORT_SUBTITLE}

        </h2>

    </div>

    <div class="memo-cover-image">

        <img
            src="${cover.image ?? InvestmentMemorandumRenderer.DEFAULT_IMAGE}"
            alt="${cover.property}">

    </div>

    <div class="memo-cover-details">

        <div class="memo-detail">

            <span class="memo-label">

                Property

            </span>

            <span class="memo-value">

                ${cover.property}

            </span>

        </div>

        <div class="memo-detail">

            <span class="memo-label">

                Asset Class

            </span>

            <span class="memo-value">

                ${cover.assetClass}

            </span>

        </div>

        <div class="memo-detail">

            <span class="memo-label">

                Location

            </span>

            <span class="memo-value">

                ${cover.location}

            </span>

        </div>

        <div class="memo-detail">

            <span class="memo-label">

                Purchase Price

            </span>

            <span class="memo-value">

                ${this.currency(
                    cover.purchasePrice
                )}

            </span>

        </div>

        <div class="memo-detail">

            <span class="memo-label">

                Recommendation

            </span>

            <span class="memo-value">

                ${cover.recommendation}

            </span>

        </div>

        <div class="memo-detail">

            <span class="memo-label">

                Investment Score

            </span>

            <span class="memo-value">

                ${cover.investmentScore} / 100

            </span>

        </div>

        <div class="memo-detail">

            <span class="memo-label">

                AI Confidence

            </span>

            <span class="memo-value">

                ${cover.confidence}%

            </span>

        </div>

    </div>

</section>

`;

}

// ========================================
// Currency
// ========================================

currency(value){

    if(value == null){

        return "—";

    }

    return new Intl.NumberFormat(

        InvestmentMemorandumRenderer.LOCALE,

        {

            style: "currency",

            currency:
                InvestmentMemorandumRenderer.CURRENCY,

            maximumFractionDigits: 0

        }

    ).format(value);

}

// ========================================
// Percent
// ========================================

percent(value){

    if(value == null){

        return "—";

    }

    const number =
        Number(value);

    return `${number}%`;

}

// ========================================
// Square Feet
// ========================================

squareFeet(value){

    if(value == null){

        return "—";

    }

    return `${Number(value).toLocaleString()} SF`;

}

// ========================================
// Number
// ========================================

number(value){

    if(value == null){

        return "—";

    }

    return Number(value).toLocaleString();

}

// ========================================
// Date
// ========================================

date(value){

    if(!value){

        return "—";

    }

    return new Date(value).toLocaleDateString(

        InvestmentMemorandumRenderer.LOCALE,

        {

            year: "numeric",

            month: "long",

            day: "numeric"

        }

    );

}

    // ========================================
// Render Executive Summary
// ========================================

renderExecutiveSummary(summary){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                Executive Summary

            </h2>

        </div>

        <div class="memo-summary-grid">

            <div class="memo-summary-item">

                <span class="memo-label">

                    Property

                </span>

                <span class="memo-value">

                    ${summary.property}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Asset Class

                </span>

                <span class="memo-value">

                    ${summary.assetClass}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Location

                </span>

                <span class="memo-value">

                    ${summary.location}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Recommendation

                </span>

                <span class="memo-value">

                    ${summary.recommendation}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Investment Score

                </span>

                <span class="memo-value">

                    ${summary.investmentScore} / 100

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    AI Confidence

                </span>

                <span class="memo-value">

                    ${summary.confidence}%

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Purchase Price

                </span>

                <span class="memo-value">

                    ${this.currency(
                        summary.purchasePrice
                    )}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Estimated Value

                </span>

                <span class="memo-value">

                    ${this.currency(
                        summary.estimatedValue
                    )}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Modeled Equity

                </span>

                <span class="memo-value">

                    ${this.currency(
                        summary.modeledEquity
                    )}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Projected Cash Flow

                </span>

                <span class="memo-value">

                    ${this.currency(
                        summary.projectedCashFlow
                    )}/mo

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Cap Rate

                </span>

                <span class="memo-value">

                    ${this.percent(
                        summary.capRate
                    )}

                </span>

            </div>

            <div class="memo-summary-item">

                <span class="memo-label">

                    Overall Risk

                </span>

                <span class="memo-value">

                    ${summary.overallRisk ?? "—"}

                </span>

            </div>

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Property Overview
// ========================================

renderPropertyOverview(property){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${property.title}

            </h2>

        </div>

        <div class="memo-property-layout">

            <div class="memo-property-image">

                <img
                    src="${property.image ?? InvestmentMemorandumRenderer.DEFAULT_IMAGE}"
                    alt="${property.property}">

            </div>

            <div class="memo-property-details">

                <div class="memo-detail">

                    <span class="memo-label">

                        Property

                    </span>

                    <span class="memo-value">

                        ${property.property}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Asset Class

                    </span>

                    <span class="memo-value">

                        ${property.assetClass}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Location

                    </span>

                    <span class="memo-value">

                        ${property.location}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Address

                    </span>

                    <span class="memo-value">

                        ${property.address ?? "—"}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Purchase Price

                    </span>

                    <span class="memo-value">

                        ${this.currency(property.purchasePrice)}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Estimated Value

                    </span>

                    <span class="memo-value">

                        ${this.currency(property.estimatedValue)}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Year Built

                    </span>

                    <span class="memo-value">

                        ${property.yearBuilt ?? "—"}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Building Size

                    </span>

                    <span class="memo-value">

                        ${this.squareFeet(property.buildingSize)}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Lot Size

                    </span>

                    <span class="memo-value">

                        ${property.lotSize ?? "—"}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Units

                    </span>

                    <span class="memo-value">

                        ${property.units ?? "—"}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Occupancy

                    </span>

                    <span class="memo-value">

                        ${this.percent(property.occupancy)}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Bedrooms

                    </span>

                    <span class="memo-value">

                        ${property.bedrooms ?? "—"}

                    </span>

                </div>

                <div class="memo-detail">

                    <span class="memo-label">

                        Bathrooms

                    </span>

                    <span class="memo-value">

                        ${property.bathrooms ?? "—"}

                    </span>

                </div>

            </div>

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Valuation
// ========================================

renderValuation(valuation){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${valuation.title}

            </h2>

        </div>

        <div class="memo-headline">

            ${valuation.headline}

        </div>

        <div class="memo-narrative">

            <p>

                ${valuation.narrative}

            </p>

        </div>

        <div class="memo-metrics-grid">

            <div class="memo-metric">

                <span class="memo-label">

                    Purchase Price

                </span>

                <span class="memo-value">

                    ${this.currency(
                        valuation.metrics.purchasePrice
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Estimated Value

                </span>

                <span class="memo-value">

                    ${this.currency(
                        valuation.metrics.estimatedValue
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Modeled Equity

                </span>

                <span class="memo-value">

                    ${this.currency(
                        valuation.metrics.modeledEquity
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Value Gap

                </span>

                <span class="memo-value">

                    ${this.percent(
                        valuation.metrics.valueGap
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Valuation

                </span>

                <span class="memo-value">

                    ${valuation.metrics.valuationLabel}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    MPI Recommendation

                </span>

                <span class="memo-value">

                    ${valuation.metrics.recommendation}

                </span>

            </div>

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Operating Performance
// ========================================

renderOperatingPerformance(performance){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${performance.title}

            </h2>

        </div>

        <div class="memo-narrative">

            <p>

                ${performance.narrative}

            </p>

        </div>

        <div class="memo-metrics-grid">

            <div class="memo-metric">

                <span class="memo-label">

                    Projected Cash Flow

                </span>

                <span class="memo-value">

                    ${this.currency(
                        performance.metrics.projectedCashFlow
                    )}/mo

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Net Operating Income

                </span>

                <span class="memo-value">

                    ${this.currency(
                        performance.metrics.netOperatingIncome
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Cap Rate

                </span>

                <span class="memo-value">

                    ${this.percent(
                        performance.metrics.capRate
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Cash-on-Cash Return

                </span>

                <span class="memo-value">

                    ${this.percent(
                        performance.metrics.cashOnCashReturn
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Occupancy

                </span>

                <span class="memo-value">

                    ${this.percent(
                        performance.metrics.occupancy
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Debt Service Coverage

                </span>

                <span class="memo-value">

                    ${performance.metrics.debtServiceCoverage ?? "—"}

                </span>

            </div>

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Market
// ========================================

renderMarket(market){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${market.title}

            </h2>

        </div>

        <div class="memo-narrative">

            <p>

                ${market.narrative}

            </p>

        </div>

        <div class="memo-subsection-header">

            <h3>

                Market Intelligence

            </h3>

        </div>

        <div class="memo-metrics-grid">

            <div class="memo-metric">

                <span class="memo-label">

                    Inventory

                </span>

                <span class="memo-value">

                    ${market.intelligence.inventoryMonths ?? "—"} Months

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Rent Growth

                </span>

                <span class="memo-value">

                    ${this.percent(
                        market.intelligence.rentGrowth
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Vacancy Rate

                </span>

                <span class="memo-value">

                    ${this.percent(
                        market.intelligence.vacancyRate
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Appreciation

                </span>

                <span class="memo-value">

                    ${this.percent(
                        market.intelligence.appreciation
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Employment Growth

                </span>

                <span class="memo-value">

                    ${this.percent(
                        market.intelligence.employmentGrowth
                    )}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Interest Rate

                </span>

                <span class="memo-value">

                    ${this.percent(
                        market.intelligence.interestRate
                    )}

                </span>

            </div>

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Risk
// ========================================

renderRisk(risk){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${risk.title}

            </h2>

        </div>

        <div class="memo-narrative">

            <p>

                ${risk.narrative}

            </p>

        </div>

        <div class="memo-risk-summary">

            <div class="memo-risk-level">

                ${risk.overall.label ?? risk.overall.level}

            </div>

            ${risk.overall.subtitle ? `

            <div class="memo-risk-subtitle">

                ${risk.overall.subtitle}

            </div>

            ` : ""}

            ${risk.overall.description ? `

            <div class="memo-risk-description">

                ${risk.overall.description}

            </div>

            ` : ""}

        </div>

        <div class="memo-subsection-header">

            <h3>

                Risk Category Summary

            </h3>

        </div>

        <div class="memo-metrics-grid">

            <div class="memo-metric">

                <span class="memo-label">

                    Market

                </span>

                <span class="memo-value">

                    ${risk.categories.market?.level ?? "—"}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Vacancy

                </span>

                <span class="memo-value">

                    ${risk.categories.vacancy?.level ?? "—"}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Condition

                </span>

                <span class="memo-value">

                    ${risk.categories.condition?.level ?? "—"}

                </span>

            </div>

            <div class="memo-metric">

                <span class="memo-label">

                    Financing

                </span>

                <span class="memo-value">

                    ${risk.categories.financing?.level ?? "—"}

                </span>

            </div>

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Underwriting
// ========================================

renderUnderwriting(underwriting){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${underwriting.title}

            </h2>

        </div>

        ${underwriting.summary ? `

        <div class="memo-narrative">

            <p>

                ${underwriting.summary}

            </p>

        </div>

        ` : ""}

        <div class="memo-underwriting-grid">

            ${underwriting.cards
                .map(card => this.renderUnderwritingCard(card))
                .join("")}

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Underwriting Card
// ========================================

renderUnderwritingCard(card){

    const {

        title,

        data

    } = card;

    return `

    const level =
    (data.level ?? "").toLowerCase();

<div class="memo-underwriting-card">

    <div class="memo-underwriting-header">

        <div class="memo-underwriting-title">

            ${title}

        </div>

        <div class="memo-underwriting-level memo-underwriting-level-${level}">

    ${data.level ?? "—"}

</div>

    </div>

    <div class="memo-underwriting-body">

        ${data.description ? `

        <p>

            ${data.description}

        </p>

        ` : ""}

        ${data.reason ? `

        <div class="memo-underwriting-reason">

            <strong>

                Reason:

            </strong>

            ${data.reason}

        </div>

        ` : ""}

    </div>

</div>

`;

}

// ========================================
// Render Recommendation
// ========================================

renderRecommendation(recommendation){

    return `

<section class="memo-page">

    <section class="memo-section memo-callout">

        <div class="memo-callout-header">

            <h2>

                ${recommendation.title}

            </h2>

        </div>

        <div class="memo-callout-action">

            ${recommendation.recommendedAction}

        </div>

        <div class="memo-callout-score-grid">

            <div class="memo-score">

                <span class="memo-label">

                    Investment Score

                </span>

                <span class="memo-value">

                    ${recommendation.investmentScore} / 100

                </span>

            </div>

            <div class="memo-score">

                <span class="memo-label">

                    AI Confidence

                </span>

                <span class="memo-value">

                    ${recommendation.confidence}%

                </span>

            </div>

            <div class="memo-score">

                <span class="memo-label">

                    Overall Risk

                </span>

                <span class="memo-value">

                    ${recommendation.overallRisk ?? "—"}

                </span>

            </div>

        </div>

        <div class="memo-callout-body">

            <p>

                ${recommendation.narrative}

            </p>

        </div>

    </section>

</section>

`;

}

// ========================================
// Render Conclusion
// ========================================

renderConclusion(conclusion){

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${conclusion.title}

            </h2>

        </div>

        <div class="memo-conclusion-summary">

            <div class="memo-score">

                <span class="memo-label">

                    Investment Score

                </span>

                <span class="memo-value">

                    ${conclusion.investmentScore} / 100

                </span>

            </div>

            <div class="memo-score">

                <span class="memo-label">

                    AI Confidence

                </span>

                <span class="memo-value">

                    ${conclusion.confidence}%

                </span>

            </div>

            <div class="memo-score">

                <span class="memo-label">

                    Recommended Action

                </span>

                <span class="memo-value">

                    ${conclusion.recommendedAction}

                </span>

            </div>

        </div>

        <div class="memo-conclusion-body">

            <p>

                ${conclusion.narrative}

            </p>

        </div>

        <div class="memo-conclusion-footer">

            <p>

                Generated by
                <strong>

                    Maxwell Property Intelligence

                </strong>

            </p>

        </div>

    </section>

</section>

`;

}

    // ========================================
    // Appendix
    // ========================================

// ========================================
// Render Appendix
// ========================================

renderAppendix(appendix){

    const scoreBreakdown =
        appendix.investmentScore.breakdown ?? [];

    return `

<section class="memo-page">

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${appendix.title}

            </h2>

        </div>

        <!-- ================================= -->
        <!-- AI Confidence -->
        <!-- ================================= -->

        <div class="memo-subsection">

            <h3>

                AI Confidence

            </h3>

            <div class="memo-metric">

                <span class="memo-value">

                    ${appendix.confidence.score}%

                </span>

            </div>

        </div>

        <!-- ================================= -->
        <!-- Investment Score Breakdown -->
        <!-- ================================= -->

        <div class="memo-subsection">

            <h3>

                Investment Score Breakdown

            </h3>

            <div class="memo-metrics-grid">

                ${scoreBreakdown.map(item => `

                    <div class="memo-metric">

                        <span class="memo-label">

                            ${item.label}

                        </span>

                        <span class="memo-value">

                            ${item.value}

                        </span>

                    </div>

                `).join("")}

            </div>

        </div>

        <!-- ================================= -->
        <!-- Underwriting Summary -->
        <!-- ================================= -->

        <div class="memo-subsection">

            <h3>

                Underwriting Summary

            </h3>

            <div class="memo-metrics-grid">

                <div class="memo-metric">

                    <span class="memo-label">

                        Overall Risk

                    </span>

                    <span class="memo-value">

                        ${appendix.underwriting.overallRisk.level}

                    </span>

                </div>

                <div class="memo-metric">

                    <span class="memo-label">

                        Market

                    </span>

                    <span class="memo-value">

                        ${appendix.underwriting.market.level}

                    </span>

                </div>

                <div class="memo-metric">

                    <span class="memo-label">

                        Vacancy

                    </span>

                    <span class="memo-value">

                        ${appendix.underwriting.vacancy.level}

                    </span>

                </div>

                <div class="memo-metric">

                    <span class="memo-label">

                        Condition

                    </span>

                    <span class="memo-value">

                        ${appendix.underwriting.condition.level}

                    </span>

                </div>

                <div class="memo-metric">

                    <span class="memo-label">

                        Financing

                    </span>

                    <span class="memo-value">

                        ${appendix.underwriting.financing.level}

                    </span>

                </div>

            </div>

        </div>

        <!-- ================================= -->
        <!-- Methodology -->
        <!-- ================================= -->

        <div class="memo-subsection">

            <h3>

                Methodology

            </h3>

            <div class="memo-metrics-grid">

                <div class="memo-metric">

                    <span class="memo-label">

                        Generated By

                    </span>

                    <span class="memo-value">

                        ${appendix.assumptions.generatedBy}

                    </span>

                </div>

                <div class="memo-metric">

                    <span class="memo-label">

                        Methodology

                    </span>

                    <span class="memo-value">

                        ${appendix.assumptions.methodology}

                    </span>

                </div>

                <div class="memo-metric">

                    <span class="memo-label">

                        Report Version

                    </span>

                    <span class="memo-value">

                        ${appendix.assumptions.reportVersion}

                    </span>

                </div>

            </div>

        </div>

    </section>

</section>

`;

}

}

const investmentMemorandumRenderer =
    new InvestmentMemorandumRenderer();