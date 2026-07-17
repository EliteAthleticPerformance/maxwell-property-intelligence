// ========================================
// MPI Investment Memorandum Renderer
// Maxwell Property Intelligence
// ========================================

class InvestmentMemorandumRenderer {

   // ========================================
// MPI Branding
// ========================================

static DOCUMENT = {

    TITLE:
        "Investment Memorandum",

    VERSION:
        "1.0"

};

static BRAND = {

    company:
        "Maxwell Property Intelligence",

    document:
        InvestmentMemorandumRenderer.DOCUMENT.TITLE,

    analyst:
        "MPI AI Investment Engine",

    confidentiality:
        "Confidential",

    version:
        InvestmentMemorandumRenderer.DOCUMENT.VERSION

};


// ========================================
// Memorandum Pages
// ========================================

static PAGE = {

    COVER: 1,

    EXECUTIVE_SUMMARY: 2,

    PROPERTY_OVERVIEW: 3,

    VALUATION: 4,

    OPERATING_PERFORMANCE: 5,

    MARKET: 6,

    RISK: 7,

    UNDERWRITING: 8,

    RECOMMENDATION: 9,

    CONCLUSION: 10,

    APPENDIX: 11

};

     // ========================================
    // Default Assets
    // ========================================

     static DEFAULT_IMAGE =
    "../../images/no-image.png";

    static REPORT_TITLE =
        InvestmentMemorandumRenderer.DOCUMENT.TITLE;

    static REPORT_SUBTITLE =
        "Maxwell Property Intelligence";

    static CURRENCY =
        "USD";

    static LOCALE =
        "en-US";

    render(memorandum){

    this.memorandum = memorandum;

    const { sections } = memorandum;

    return `

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

`;

}

// ========================================
// Render Cover
// ========================================

renderCover(cover){

    return `

<section class="memo-page memo-cover">

    <div class="memo-brand">

        <div class="memo-brand-subtitle">

            ${cover.subtitle}

        </div>

        <h1>

            ${cover.title}

        </h1>

    </div>

    <div class="memo-cover-image">

        <img
            src="${cover.image ?? InvestmentMemorandumRenderer.DEFAULT_IMAGE}"
            alt="${cover.property}">

    </div>

    <div class="memo-cover-property">

        <h2>

            ${cover.property}

        </h2>

        <p>

            ${cover.location}

        </p>

    </div>

    <div class="memo-cover-recommendation">

        ${cover.recommendation}

    </div>

    <div class="memo-cover-score-grid">

        <div class="memo-cover-score">

            <span class="memo-label">

                Investment Score

            </span>

            <span class="memo-value">

                ${cover.investmentScore} / 100

            </span>

        </div>

        <div class="memo-cover-score">

            <span class="memo-label">

                AI Confidence

            </span>

            <span class="memo-value">

                ${cover.confidence}%

            </span>

        </div>

    </div>

    <div class="memo-cover-footer">

        <div>

            Prepared By

        </div>

        <strong>

            ${InvestmentMemorandumRenderer.BRAND.analyst}

        </strong>

        <div>

            Version ${InvestmentMemorandumRenderer.BRAND.version}

        </div>

        <div>

            ${this.date(
    this.memorandum.generatedAt
)}

        </div>

        <div>

            ${InvestmentMemorandumRenderer.BRAND.confidentiality}

        </div>

    </div>

</section>

`;

}

renderHeader(property){

    return `

<header class="memo-header">

    <div>

        ${InvestmentMemorandumRenderer.BRAND.company}

    </div>

    <div>

        ${property}

    </div>

</header>

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

    ${this.renderHeader(summary.property)}

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

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.EXECUTIVE_SUMMARY
)}

</section>

`;

}

// ========================================
// Render Property Overview
// ========================================

renderPropertyOverview(property){

    return `

<section class="memo-page">

    ${this.renderHeader(property.property)}

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

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.PROPERTY_OVERVIEW
)}

</section>

`;

}

// ========================================
// Render Valuation
// ========================================

renderValuation(valuation){

    return `

<section class="memo-page">

    ${this.renderHeader(valuation.property)}

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

            ${this.metric(
    "Purchase Price",
    this.currency(
        valuation.metrics.purchasePrice
    )
)}

${this.metric(
    "Estimated Value",
    this.currency(
        valuation.metrics.estimatedValue
    )
)}

${this.metric(
    "Modeled Equity",
    this.currency(
        valuation.metrics.modeledEquity
    )
)}

${this.metric(
    "Value Gap",
    this.percent(
        valuation.metrics.valueGap
    )
)}

${this.metric(
    "Valuation",
    valuation.metrics.valuationLabel
)}

${this.metric(
    "MPI Recommendation",
    valuation.metrics.recommendation
)}

        </div>

        </section>

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.VALUATION
)}

</section>

`;

}

// ========================================
// Render Operating Performance
// ========================================

renderOperatingPerformance(performance){

    return `

<section class="memo-page">

    ${this.renderHeader(performance.property)}

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

            ${this.metric(
    "Projected Cash Flow",
    `${this.currency(
        performance.metrics.projectedCashFlow
    )}/mo`
)}

${this.metric(
    "Net Operating Income",
    this.currency(
        performance.metrics.netOperatingIncome
    )
)}

${this.metric(
    "Cap Rate",
    this.percent(
        performance.metrics.capRate
    )
)}

${this.metric(
    "Cash-on-Cash Return",
    this.percent(
        performance.metrics.cashOnCashReturn
    )
)}

${this.metric(
    "Occupancy",
    this.percent(
        performance.metrics.occupancy
    )
)}

${this.metric(
    "Debt Service Coverage",
    performance.metrics.debtServiceCoverage
)}

        </div>

        </section>

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.OPERATING_PERFORMANCE
)}

</section>

`;

}

// ========================================
// Render Market
// ========================================

renderMarket(market){

    return `

<section class="memo-page">

    ${this.renderHeader(market.property)}

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

            ${this.metric(
    "Inventory",
    `${market.intelligence.inventoryMonths} Months`
)}

${this.metric(
    "Rent Growth",
    this.percent(
        market.intelligence.rentGrowth
    )
)}

${this.metric(
    "Vacancy Rate",
    this.percent(
        market.intelligence.vacancyRate
    )
)}

${this.metric(
    "Appreciation",
    this.percent(
        market.intelligence.appreciation
    )
)}

${this.metric(
    "Employment Growth",
    this.percent(
        market.intelligence.employmentGrowth
    )
)}

${this.metric(
    "Interest Rate",
    this.percent(
        market.intelligence.interestRate
    )
)}

        </div>

        </section>

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.MARKET
)}

</section>

`;

}

// ========================================
// Render Risk
// ========================================

renderRisk(risk){

    return `

<section class="memo-page">

    ${this.renderHeader(risk.property)}

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

            ${this.metric(
    "Market",
    risk.categories.market?.level
)}

${this.metric(
    "Vacancy",
    risk.categories.vacancy?.level
)}

${this.metric(
    "Condition",
    risk.categories.condition?.level
)}

${this.metric(
    "Financing",
    risk.categories.financing?.level
)}

        </div>

        </section>

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.RISK
)}

</section>

`;

}

// ========================================
// Render Underwriting
// ========================================

renderUnderwriting(underwriting){

    return `

<section class="memo-page">

    ${this.renderHeader(underwriting.property)}

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

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.UNDERWRITING
)}

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

    const level =
        (data.level ?? "").toLowerCase();

    return `

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

    ${this.renderHeader(recommendation.property)}

    <section class="memo-section">

        <div class="memo-callout-header">

            <h2>

                ${recommendation.title}

            </h2>

        </div>

        <div class="memo-callout-action">

            ${recommendation.action}

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

                    ${recommendation.overallRisk?.label ??

  recommendation.overallRisk?.level ??

  recommendation.overallRisk ??

  "—"}

                </span>

            </div>

        </div>

        <div class="memo-callout-body">

            <p>

                ${recommendation.narrative}

            </p>

        </div>

        </section>

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.RECOMMENDATION
)}

</section>

`;

}

// ========================================
// Render Conclusion
// ========================================

renderConclusion(conclusion){

    return `

<section class="memo-page">

    ${this.renderHeader(conclusion.property)}

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

                    ${conclusion.recommendation}

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

    ${this.renderFooter(
    InvestmentMemorandumRenderer.PAGE.CONCLUSION
)}

</section>

`;

}

   
// ========================================
// Render Appendix
// ========================================

renderAppendix(appendix){

    return `

<section class="memo-page">

    ${this.renderHeader("Appendix")}

    <section class="memo-section">

        <div class="memo-section-header">

            <h2>

                ${appendix.title}

            </h2>

        </div>

        ${this.renderConfidenceAppendix(
            appendix.confidence
        )}

        ${this.renderInvestmentScoreAppendix(
            appendix.investmentScore
        )}

        ${this.renderUnderwritingAppendix(
            appendix.underwriting
        )}

        ${this.renderMarketAppendix(
            appendix.market
        )}

        ${this.renderValuationAppendix(
            appendix.valuation
        )}

        ${this.renderAssumptionsAppendix(
            appendix.assumptions
        )}

        ${this.renderMetadataAppendix(
            appendix.metadata
        )}

    </section>

    ${this.renderFooter(
        InvestmentMemorandumRenderer.PAGE.APPENDIX
    )}

</section>

`;

}

// ========================================
// Render Confidence Appendix
// ========================================

renderConfidenceAppendix(confidence){

    return `

<div class="memo-subsection">

    <h3>

        AI Confidence

    </h3>

    <div class="memo-metrics-grid">

        ${this.metric(
            "Confidence Score",
            `${confidence.score}%`
        )}

        ${this.metric(
            "Confidence Level",
            confidence.label
        )}

    </div>

    <p class="memo-narrative">

        ${confidence.explanation}

    </p>

</div>

`;

}

// ========================================
// Render Investment Score Appendix
// ========================================

renderInvestmentScoreAppendix(score){

    return `

<div class="memo-subsection">

    <h3>

        Investment Score

    </h3>

    <div class="memo-metrics-grid">

        ${this.metric(
            "Investment Score",
            `${score.score}/100`
        )}

    </div>

</div>

`;

}

// ========================================
// Render Underwriting Appendix
// ========================================

renderUnderwritingAppendix(underwriting){

    return `

<div class="memo-subsection">

    <h3>

        Underwriting Summary

    </h3>

    <div class="memo-metrics-grid">

        ${this.metric(
            "Overall Risk",
            underwriting.market?.level ?? "—"
        )}

        ${this.metric(
            "Market",
            underwriting.market?.level ?? "—"
        )}

        ${this.metric(
            "Vacancy",
            underwriting.vacancy?.level ?? "—"
        )}

        ${this.metric(
            "Condition",
            underwriting.condition?.level ?? "—"
        )}

        ${this.metric(
            "Financing",
            underwriting.financing?.level ?? "—"
        )}

    </div>

</div>

`;

}

// ========================================
// Render Market Appendix
// ========================================

renderMarketAppendix(market){

    return `

<div class="memo-subsection">

    <h3>

        Market Intelligence

    </h3>

    <div class="memo-metrics-grid">

        ${this.metric(
            "Inventory",
            market.inventoryMonths
        )}

        ${this.metric(
            "Rent Growth",
            this.percent(market.rentGrowth)
        )}

        ${this.metric(
            "Vacancy Rate",
            this.percent(market.vacancyRate)
        )}

        ${this.metric(
            "Interest Rate",
            this.percent(market.interestRate)
        )}

    </div>

</div>

`;

}

// ========================================
// Render Valuation Appendix
// ========================================

renderValuationAppendix(valuation){

    return `

<div class="memo-subsection">

    <h3>

        Valuation Summary

    </h3>

    <div class="memo-metrics-grid">

        ${this.metric(
            "Purchase Price",
            this.currency(
                valuation.purchasePrice
            )
        )}

        ${this.metric(
            "Estimated Value",
            this.currency(
                valuation.estimatedValue
            )
        )}

        ${this.metric(
            "Equity",
            this.currency(
                valuation.equity
            )
        )}

    </div>

</div>

`;

}

// ========================================
// Render Assumptions Appendix
// ========================================

renderAssumptionsAppendix(assumptions){

    return `

<div class="memo-subsection">

    <h3>

        Methodology

    </h3>

    <div class="memo-metrics-grid">

        ${this.metric(
            "Generated By",
            assumptions.generatedBy
        )}

        ${this.metric(
            "Methodology",
            assumptions.methodology
        )}

    </div>

</div>

`;

}

// ========================================
// Render Metadata Appendix
// ========================================

renderMetadataAppendix(metadata){

    return `

<div class="memo-subsection">

    <h3>

        Report Metadata

    </h3>

    <div class="memo-metrics-grid">

        ${this.metric(
            "Report ID",
            metadata?.reportId ?? "—"
        )}

        ${this.metric(
            "Version",
            metadata?.version ?? "—"
        )}

        ${this.metric(
            "Generated",
            this.date(
                metadata?.generatedAt ?? "—"
            )
        )}

    </div>

</div>

`;

}

// ========================================
// Render Metric
// ========================================

metric(label, value){

    return `

<div class="memo-metric">

    <span class="memo-label">

        ${label}

    </span>

    <span class="memo-value">

        ${value ?? "—"}

    </span>

</div>

`;

}

renderFooter(page){

    return `

<footer class="memo-footer">

    <div>

        ${InvestmentMemorandumRenderer.BRAND.analyst}

    </div>

    <div>

        ${InvestmentMemorandumRenderer.BRAND.version}

    </div>

    <div>

        ${this.date(
    this.memorandum.generatedAt
)}

    </div>

    <div>

        Page ${page}

    </div>

</footer>

`;

}

}

const investmentMemorandumRenderer =
    new InvestmentMemorandumRenderer();