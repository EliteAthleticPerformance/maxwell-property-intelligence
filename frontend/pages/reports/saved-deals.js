// ========================================
// Saved Deals Page
// Maxwell Property Intelligence
// ========================================

const SavedDealsPage = {

    deals: [],

    filteredDeals: [],

    // ========================================
    // Initialize
    // ========================================

    init(){

        this.loadDeals();

        this.render();

    },

    // ========================================
    // Load Saved Deals
    // ========================================

    loadDeals(){

    this.deals =
        savedDealsService.getDeals();

    this.filteredDeals =
        [...this.deals];

},

    // ========================================
    // Render Page
    // ========================================

    render(){

        const container =
            document.getElementById(
                "savedDealsContainer"
            );

        if(!container) return;

        // ------------------------------------
        // Empty State
        // ------------------------------------

        if(!this.deals.length){

            container.innerHTML = `

<div class="empty-state">

    <h2>⭐</h2>

    <h3>

        No Saved Deals Yet

    </h3>

    <p>

        Deals you save from the AI Deal Finder
        will appear here.

    </p>

</div>

            `;

            return;

        }

        // ------------------------------------
// Render Cards
// ------------------------------------

container.innerHTML =

    this.filteredDeals
        .map(deal =>
            this.createCard(deal)
        )
        .join("");

    },

    // ========================================
    // Create Saved Deal Card
    // ========================================

    createCard(deal){

        const report =
    reportService.generate(deal);

        return `

<article class="saved-card">

    <div class="saved-header">

        <h2>

            ${deal.icon}
            ${deal.type}

        </h2>

        <span>

            ${report.analysis.confidence.score}% AI

        </span>

    </div>

    <p>

        ${deal.city}

    </p>

    <div class="saved-metrics">

        <div>

            <small>

                Investment Score

            </small>

            <strong>

                ${report.analysis.recommendation.score}

            </strong>

        </div>

        <div>

            <small>

                Monthly Cash Flow

            </small>

            <strong>

                $${deal.cashFlow.toLocaleString()}/mo

            </strong>

        </div>

    </div>

    <div class="saved-footer">

        Saved
        ${new Date(deal.savedAt).toLocaleDateString()}

    </div>

    <div class="saved-actions">

    <button

        class="btn-primary"

        onclick="SavedDealsPage.openDeal('${deal.type}')">

        Open

    </button>

    <button

    class="btn-secondary"

    onclick="SavedDealsPage.openReport('${deal.type}')">

    Report

</button>

</div>

</article>

        `;

    },

// ========================================
// Open Saved Deal
// ========================================

openDeal(dealType){

    sessionStorage.setItem(

        "selectedDeal",

        dealType

    );

    window.location.href =

        "../dashboard/dashboard.html";

},

// ========================================
// Open Investment Memorandum
// ========================================

openReport(dealType){

    const deal =

        this.deals.find(
            d => d.type === dealType
        );

    if(!deal){

        return;

    }

    const report =

        reportService.generate(
            deal
        );

    const memorandum =

        investmentMemorandumService.generate(
            report
        );

    reportLibraryService.saveReport(
        memorandum
    );

    sessionStorage.setItem(

        "selectedReport",

        JSON.stringify(
            memorandum
        )

    );

    window.open(

        "../memorandum/memorandum.html",

        "_blank"

    );

}

};

// ========================================
// Start Page
// ========================================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        SavedDealsPage.init();

    }

);