// ========================================
// MPI Narrative Service
// Maxwell Property Intelligence
// ========================================

class NarrativeService {

    buildRiskNarrative(underwriting) {

        switch (underwriting.overallRisk.level) {

            case "Low":
                return this.buildLowRiskNarrative(underwriting);

            case "Moderate":
                return this.buildModerateRiskNarrative(underwriting);

            case "High":
                return this.buildHighRiskNarrative(underwriting);

            default:
                return "";
        }

    }

    buildLowRiskNarrative(underwriting) {

    return `
Overall investment risk is considered LOW.

Current underwriting indicates limited downside exposure supported by strong market fundamentals, stable projected cash flow, and conservative financing assumptions.

While normal ownership risks remain, the property's financial profile and local market conditions support a favorable long-term investment outlook.
`;

}

buildModerateRiskNarrative(underwriting) {

    return `
Overall investment risk is considered MODERATE.

The investment demonstrates solid return potential, although several underwriting factors warrant additional attention.

Market conditions remain generally favorable, but investors should account for operational and financing risks that could affect future performance.
`;

}

buildHighRiskNarrative(underwriting) {

    return `
Overall investment risk is considered HIGH.

Underwriting identified multiple factors that may materially impact investment performance, including elevated market uncertainty, financing pressure, or property-specific concerns.

Additional due diligence and revised acquisition assumptions are recommended before proceeding.
`;

}

}