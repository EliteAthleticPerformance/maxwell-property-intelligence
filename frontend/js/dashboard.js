// ========================================
// MPI Dashboard Controller
// Maxwell Property Intelligence
// ========================================

const Dashboard = {

    // ------------------------------------
    // Current Selected Period
    // ------------------------------------

    period: "30D",

    // ------------------------------------
// AI Scanner
// ------------------------------------

scannerTypes: [

    "Residential Rentals",
    "Multifamily",
    "Commercial",
    "Tax Liens",
    "Car Washes",
    "Laundromats",
    "Self Storage",
    "Mobile Home Parks",
    "RV Parks",
    "Industrial Warehouses",
    "Storage Units",
    "Ice Machines"

],

scannerIndex: -1,
scannerProperties: 0,
scannerDeals: 0,



// ------------------------------------
// AI Deal Discovery
// ------------------------------------

deals: [


    {
    icon:"🏠",

    image:"../../images/properties/duplex.jpg",

    type:"Duplex",

    city:"Kansas City, MO",

    assetClass:"Residential",

    buildingSize:"2,980 SF",

    yearBuilt:1998,

    units:"2 Units",

    occupancy:"100%",

    // Investment Metrics
    noi:7344,
    pricePerSqFt:83.22,
    cashOnCash:11.8,
    estimatedValue:274000,

    price:248000,

    capRate:8.9,

    cashFlow:612,

    confidence:96,

    statuses:[
        "PRICE DROP",
        "HIGH CONFIDENCE",
        "OFF MARKET"
    ]
},

{
    icon:"🏢",
    image:"../../images/properties/apartment.jpg",

    type:"12-Unit Apartment",

    city:"Independence, MO",

    assetClass:"Multifamily",

    buildingSize:"11,400 SF",

    yearBuilt:1987,

    units:"12 Units",

    occupancy:"92%",

    // Investment Metrics
    noi:51420,
    pricePerSqFt:103.95,
    cashOnCash:12.4,
    estimatedValue:1295000,

    price:1185000,

    capRate:9.6,

    cashFlow:4285,

    confidence:94,

    statuses:[
        "DISTRESSED",
        "OFF MARKET",
        "PRICE DROP"
    ]
},

{
    icon:"🏪",
    image:"../../images/properties/retail.jpg",

    type:"Retail Strip Center",

    city:"Lee's Summit, MO",

    assetClass:"Retail",

    buildingSize:"18,600 SF",

    yearBuilt:2003,

    units:"8 Suites",

    occupancy:"96%",

    // Investment Metrics
    noi:77040,
    pricePerSqFt:98.12,
    cashOnCash:10.9,
    estimatedValue:1965000,

    price:1825000,

    capRate:8.1,

    cashFlow:6420,

    confidence:91,

    statuses:[
        "OWNER FINANCING",
        "PRICE DROP",
        "OFF MARKET"
    ]
},

{
    icon:"🏠",
    image:"../../images/properties/sfr.jpg",

    type:"Single Family Rental",

    city:"Overland Park, KS",

    assetClass:"Residential",

    buildingSize:"2,150 SF",

    yearBuilt:2006,

    units:"1 Home",

    occupancy:"100%",

    // Investment Metrics
    noi:6180,
    pricePerSqFt:153.44,
    cashOnCash:8.6,
    estimatedValue:347500,

    price:329900,

    capRate:7.8,

    cashFlow:515,

    confidence:88,

    statuses:[
        "HIGH CONFIDENCE",
        "PRICE DROP",
        "OFF MARKET"
    ]
},

{
    icon:"🚗",
    image:"../../images/properties/carwash.jpg",

    type:"Car Wash",

    city:"Belton, MO",

    assetClass:"Business",

    buildingSize:"5,900 SF",

    yearBuilt:2018,

    units:"6 Wash Bays",

    occupancy:"N/A",

    // Investment Metrics
    noi:97440,
    pricePerSqFt:165.25,
    cashOnCash:15.2,
    estimatedValue:1095000,

    price:975000,

    capRate:10.4,

    cashFlow:8120,

    confidence:95,

    statuses:[
        "OWNER FINANCING",
        "PRICE DROP",
        "DISTRESSED"
    ]
},

{
    icon:"🧺",
    image:"../../images/properties/laundromat.jpg",

    type:"Laundromat",

    city:"Grandview, MO",

    assetClass:"Business",

    buildingSize:"4,250 SF",

    yearBuilt:1999,

    units:"82 Machines",

    occupancy:"N/A",

    // Investment Metrics
    noi:46500,
    pricePerSqFt:100.00,
    cashOnCash:14.1,
    estimatedValue:469000,

    price:425000,

    capRate:11.3,

    cashFlow:3875,

    confidence:93,

    statuses:[
        "OWNER FINANCING",
        "DISTRESSED",
        "PRICE DROP"
    ]
},

{
    icon:"🏢",
    image:"../../images/properties/storage.jpg",

    type:"Self Storage",

    city:"Blue Springs, MO",

    assetClass:"Commercial",

    buildingSize:"82,000 SF",

    yearBuilt:2004,

    units:"610 Units",

    occupancy:"94%",

    // Investment Metrics
    noi:143040,
    pricePerSqFt:26.22,
    cashOnCash:13.6,
    estimatedValue:2395000,

    price:2150000,

    capRate:8.7,

    cashFlow:11920,

    confidence:97,

    statuses:[
        "OWNER FINANCING",
        "DISTRESSED",
        "PRICE DROP"
    ]
},

{
    icon:"🏕",
    image:"../../images/properties/rvpark.jpg",

    type:"RV Park",

    city:"Branson, MO",

    assetClass:"Hospitality",

    buildingSize:"31 Acres",

    yearBuilt:1995,

    units:"118 Sites",

    occupancy:"89%",

    // Investment Metrics
    noi:283800,
    pricePerSqFt:125484.00,
    cashOnCash:11.8,
    estimatedValue:4250000,

    price:3890000,

    capRate:9.5,

    cashFlow:23650,

    confidence:92,

    statuses:[
        "OFF MARKET",
        "OWNER FINANCING",
        "PRICE DROP"
    ]
},

{
    icon:"🏭",
    image:"../../images/properties/warehouse.jpg",

    type:"Industrial Warehouse",

    city:"Olathe, KS",

    assetClass:"Industrial",

    buildingSize:"48,500 SF",

    yearBuilt:2011,

    units:"1 Building",

    occupancy:"100%",

    // Investment Metrics
    noi:177360,
    pricePerSqFt:59.28,
    cashOnCash:11.2,
    estimatedValue:3125000,

    price:2875000,

    capRate:8.2,

    cashFlow:14780,

    confidence:90,

    statuses:[
        "OFF MARKET",
        "PRICE DROP",
        "HIGH CONFIDENCE"
    ]
},

{
    icon:"🏘",
    image:"../../images/properties/mobilepark.jpg",

    type:"Mobile Home Park",

    city:"Sedalia, MO",

    assetClass:"Residential",

    buildingSize:"27 Acres",

    yearBuilt:1982,

    units:"84 Pads",

    occupancy:"95%",

    // Investment Metrics
    noi:123840,
    pricePerSqFt:55370.37,
    cashOnCash:13.4,
    estimatedValue:1680000,

    price:1495000,

    capRate:10.7,

    cashFlow:10320,

    confidence:96,

    statuses:[
        "DISTRESSED",
        "OWNER FINANCING",
        "HIGH CONFIDENCE"
    ]
},

{
    icon:"❄️",
    image:"../../images/properties/icemachine.jpg",

    type:"Ice Machine Route",

    city:"Kansas City Metro",

    assetClass:"Business",

    buildingSize:"Route-Based",

    yearBuilt:2021,

    units:"18 Machines",

    occupancy:"N/A",

    // Investment Metrics
    noi:54720,
    pricePerSqFt:0,
    cashOnCash:16.5,
    estimatedValue:312000,

    price:268000,

    capRate:14.1,

    cashFlow:4560,

    confidence:89,

    statuses:[
        "HIGH CONFIDENCE",
        "OWNER FINANCING",
        "PRICE DROP"
    ]
},

{
    icon:"📜",
    image:"../../images/properties/taxlien.jpg",

    type:"Tax Lien Portfolio",

    city:"Cass County, MO",

    assetClass:"Investment Portfolio",

    buildingSize:"127 Liens",

    yearBuilt:2026,

    units:"127 Certificates",

    occupancy:"N/A",

    // Investment Metrics
    noi:20880,
    pricePerSqFt:0,
    cashOnCash:19.8,
    estimatedValue:114000,

    price:96500,

    capRate:18.8,

    cashFlow:1740,

    confidence:98,

    statuses:[
        "DISTRESSED",
        "HIGH CONFIDENCE",
        "OFF MARKET"
    ]
}

],
    
    // ------------------------------------
    // Chart Data
    // ------------------------------------

    datasets: {

        "7D": {

            labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],

            data: [2.35,2.37,2.38,2.36,2.42,2.45,2.49]

        },

        "30D": {

            labels: ["Jan","Feb","Mar","Apr","May","Jun"],

            data: [1.8,2.0,2.15,2.28,2.35,2.49]

        },

        "90D": {

            labels: [

                "Jan","Feb","Mar","Apr",

                "May","Jun","Jul","Aug","Sep"

            ],

            data: [

                1.60,1.70,1.82,1.95,

                2.10,2.25,2.35,2.43,2.49

            ]

        },

        "1Y": {

            labels: [

                "Jan","Feb","Mar","Apr",

                "May","Jun","Jul","Aug",

                "Sep","Oct","Nov","Dec"

            ],

            data: [

                1.10,1.20,1.30,1.45,

                1.55,1.72,1.84,2.02,

                2.16,2.28,2.38,2.49

            ]

        },

        "ALL": {

            labels: [

                "2021","2022","2023",

                "2024","2025","2026"

            ],

            data: [

                0.62,0.88,1.25,

                1.72,2.12,2.49

            ]

        }

    },

    kpis: {

    "7D": {
        portfolio: 2499000,
        cashFlow: 18450,
        deals: 49,
        ai: 13
    },

    "30D": {
        portfolio: 2487000,
        cashFlow: 18420,
        deals: 48,
        ai: 12
    },

    "90D": {
        portfolio: 2325000,
        cashFlow: 17600,
        deals: 43,
        ai: 10
    },

    "1Y": {
        portfolio: 1985000,
        cashFlow: 15850,
        deals: 34,
        ai: 8
    },

    "ALL": {
        portfolio: 1245000,
        cashFlow: 11200,
        deals: 18,
        ai: 3
    }

},

trends: {

    "7D": {

        portfolio: 15.8,
        cashFlow: 8.1,
        deals: 3,
        ai: 4

    },

    "30D": {

        portfolio: 12.4,
        cashFlow: 7.2,
        deals: 0,
        ai: 2

    },

    "90D": {

        portfolio: 9.8,
        cashFlow: 5.6,
        deals: -2,
        ai: 1

    },

    "1Y": {

        portfolio: 26.3,
        cashFlow: 18.4,
        deals: 12,
        ai: 9

    },

    "ALL": {

        portfolio: 101.7,
        cashFlow: 54.8,
        deals: 30,
        ai: 22

    }

},



    // ------------------------------------
// Initialize Dashboard
// ------------------------------------

init() {

    console.log("MPI Dashboard Loaded");

    this.attachEvents();

    this.renderDeals();

    this.refreshDashboard(this.period);

    this.startScanner();

    // =====================================
// Deal Drawer Controls
// =====================================

const closeDrawer = () => {

    document
        .getElementById("dealDrawer")
        .classList.remove("open");

    document
        .getElementById("drawerOverlay")
        .classList.remove("show");

};

// Close Button

document
    .getElementById("closeDrawer")
    .addEventListener("click", closeDrawer);

// Click Outside Drawer

document
    .getElementById("drawerOverlay")
    .addEventListener("click", closeDrawer);

// Escape Key

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        closeDrawer();

    }

});

},

    // ------------------------------------
    // Event Listeners
    // ------------------------------------

    attachEvents() {

        const selector = document.getElementById("chartPeriod");

        if (!selector) return;

        selector.addEventListener("change", (e) => {

    this.period = e.target.value;

this.refreshDashboard(this.period);

});

    },

    // ------------------------------------
    // Update Portfolio Chart
    // ------------------------------------

    updateChart(period) {

        if (!window.portfolioChart) return;

        const chartData = this.datasets[period];

        window.portfolioChart.data.labels = chartData.labels;

        window.portfolioChart.data.datasets[0].data = chartData.data;

        window.portfolioChart.update();
    },    

    // ------------------------------------
// Refresh Entire Dashboard
// ------------------------------------

refreshDashboard(period) {

    this.updateChart(period);

    this.updateKPIs(period);

    this.updateTrends(period);

},

// ------------------------------------
// Create Deal Card
// ------------------------------------

createDealCard(deal) {

    return `

    <article
        class="deal-card"
        onclick="Dashboard.openDeal('${deal.type}')">

        <div class="deal-header">

                <h3>

    <span class="deal-icon">

        ${deal.icon}

    </span>

    ${deal.type}

</h3>

                <span class="deal-confidence">

                    ${deal.confidence}% AI

                </span>

            </div>

            <p class="deal-city">

                ${deal.city}

            </p>

            <div class="deal-price">

                $${deal.price.toLocaleString()}

            </div>

            <hr class="deal-divider">

            <div class="deal-stats">

    <div class="deal-stat">

        <span>📈 Cap Rate</span>

        <strong>${deal.capRate}%</strong>

    </div>

    <div class="deal-stat">

        <span>💵 Potential CF</span>

        <strong>$${deal.cashFlow.toLocaleString()}/mo</strong>

    </div>

</div>

 <div class="deal-footer">

        AI Analysis →

    </div>

        </article>

    `;

},

// ------------------------------------
// Render Deals
// ------------------------------------

renderDeals() {

    const container = document.getElementById("dealContainer");

    if (!container) return;

    let html = "";

    this.deals.forEach(deal => {

        html += this.createDealCard(deal);

    });

    container.innerHTML = html;

},

// ========================================
// Get Smart Deal Status
// ========================================

    getDealStatus(deal){

    if(deal.confidence >= 97){

        return "HIGH CONFIDENCE";

    }

    if(deal.capRate >= 12){

        return "DISTRESSED";

    }

    if(deal.cashFlow >= 10000){

        return "OWNER FINANCING";

    }

    return deal.statuses[
        Math.floor(
            Math.random()*deal.statuses.length
        )
    ];

},

// ------------------------------------
// AI Scanner Engine
// ------------------------------------

startScanner() {

    this.updateScanner();
    this.addActivity();

    setInterval(() => {

        this.updateScanner();
        this.addActivity();

    }, 2500);

},

    animateValue(elementId, endValue, prefix = "", suffix = "") {

    const element = document.getElementById(elementId);

    if (!element) return;

    // Stop any previous animation
    if (element.animationTimer) {
        clearInterval(element.animationTimer);
    }

    // Get current displayed value
    let start = parseFloat(
        element.textContent.replace(/[^0-9.-]/g, "")
    ) || 0;

    const duration = 800;
    const stepTime = 16;
    const steps = duration / stepTime;

    const increment = (endValue - start) / steps;

    element.animationTimer = setInterval(() => {

        start += increment;

        if (
            (increment > 0 && start >= endValue) ||
            (increment < 0 && start <= endValue)
        ) {

            start = endValue;

            clearInterval(element.animationTimer);

        }

        element.textContent =
            prefix +
            Math.round(start).toLocaleString() +
            suffix;

    }, stepTime);

},

updateScanner() {

    const title = document.getElementById("scannerTitle");
    const properties = document.getElementById("scannerProperties");
    const deals = document.getElementById("scannerDeals");
    const lastScan = document.getElementById("scannerLastScan");

    if (!title) return;

    // Next asset class

    this.scannerIndex++;

    if (this.scannerIndex >= this.scannerTypes.length) {

        this.scannerIndex = 0;

    }

    title.textContent =
        "Scanning " +
        this.scannerTypes[this.scannerIndex] +
        "...";
    
    const items = document.querySelectorAll(".scanner-item");

items.forEach(item => {

    item.classList.remove("active");

});

if(items[this.scannerIndex]){

    items[this.scannerIndex].classList.add("active");

}    

    // Increase property count

    this.scannerProperties +=
        Math.floor(Math.random() * 180) + 50;

    properties.textContent =
        this.scannerProperties.toLocaleString();

    // Occasionally discover a deal

    if (Math.random() > .65) {

        this.scannerDeals++;

        deals.textContent =
            this.scannerDeals;

        this.pulseCard("aiCard");

    }

    // Update time

    lastScan.textContent =
        new Date().toLocaleTimeString([], {

            hour: "numeric",

            minute: "2-digit",

            second: "2-digit"

        });

        },

        

   // ========================================
// Add Activity Feed Item
// ========================================

addActivity(){

    const container =
        document.getElementById("activityContainer");

    if(!container) return;

    const deal =
        this.deals[
            Math.floor(
                Math.random() *
                this.deals.length
            )
        ];

    const status =
    this.getDealStatus(deal);

    const time =
    new Date().toLocaleTimeString([],{

        hour:"numeric",
        minute:"2-digit"

    }); 

const item =
    document.createElement("div");

item.className = "activity-item";

item.innerHTML =
    this.createTimelineItem(
        deal,
        status,
        time
    );

    container.prepend(item);

    while(container.children.length > 6){

        container.removeChild(
            container.lastChild
        );

    }

},

// ========================================
// Create Discovery Timeline Item
// ========================================

createTimelineItem(deal, badge, time){


    const badgeClass = {

        "DISTRESSED":"distressed",

        "OFF MARKET":"offmarket",

        "OWNER FINANCING":"owner",

        "PRICE DROP":"pricedrop",

        "HIGH CONFIDENCE":"confidence"

    }[badge] || "default";

    return `

<div class="timeline-item"
     onclick="Dashboard.openDeal('${deal.type}')">

    <div class="timeline-left">

        <div class="timeline-top">

            <span class="timeline-dot"></span>

            <span class="timeline-badge ${badgeClass}">

                ${badge}

            </span>

            <span class="timeline-time">

                ${time}

            </span>

        </div>

        <div class="timeline-property">

            <div class="timeline-icon">

                ${deal.icon}

            </div>

            <div class="timeline-info">

                <h3>

                    ${deal.type}

                </h3>

                <p>

                    ${deal.city}

                </p>

            </div>

            <span class="ai-pill">

    ${deal.confidence}% AI

</span>

        </div>

    </div>

    <div class="timeline-right">

        <div class="timeline-stat">

            <label>💰 Price</label>

            <strong>

                $${deal.price.toLocaleString()}

            </strong>

        </div>

        <div class="timeline-stat">

            <label>📈 Cap Rate</label>

            <strong>

                ${deal.capRate}%

            </strong>

        </div>

        <div class="timeline-stat">

            <label>💵 Potential CF</label>

            <strong>

                $${deal.cashFlow.toLocaleString()}/mo

            </strong>

        </div>

    </div>

</div>

`;

},

updateKPIs(period) {

    const data = this.kpis[period];

    if (!data) return;

    const currentAI = Number(
        document.getElementById("aiDeals")
            .textContent.replace(/,/g, "")
    );

    this.animateValue("portfolioValue", data.portfolio, "$");
    this.animateValue("cashFlow", data.cashFlow, "$");
    this.animateValue("activeDeals", data.deals);
    this.animateValue("aiDeals", data.ai);

    if (currentAI !== data.ai) {

        this.pulseCard("aiCard");

    }

},

updateTrends(period) {

    const trends = this.trends[period];

    if (!trends) return;

    this.setTrend("portfolioTrend", trends.portfolio, "%");

    this.setTrend("cashFlowTrend", trends.cashFlow, "%");

    this.setTrend("activeDealsTrend", trends.deals);

    this.setTrend("aiDealsTrend", trends.ai, " New");

},

setTrend(id, value, suffix = "") {

    const el = document.getElementById(id);

    if (!el) return;

    el.classList.remove(
        "trend-up",
        "trend-down",
        "trend-neutral"
    );

    if (value > 0) {

    el.classList.add("trend-up");

    el.innerHTML = `
        <span class="trend-arrow">▲</span>
        ${value}${suffix}
    `;

} else if (value < 0) {

    el.classList.add("trend-down");

    el.innerHTML = `
        <span class="trend-arrow">▼</span>
        ${Math.abs(value)}${suffix}
    `;

} else {

    el.classList.add("trend-neutral");

    el.innerHTML = `
        <span class="trend-arrow">—</span>
    `;

}

/* Animate ALL badges */

el.style.animation = "none";

void el.offsetWidth;

el.style.animation = "badgePop .25s ease";

},



pulseCard(cardId){

    const card = document.getElementById(cardId);

    if(!card) return;

    card.classList.remove("card-ai-pulse");

    void card.offsetWidth;

    card.classList.add("card-ai-pulse");

},

// ========================================
// Open Deal Drawer
// ========================================

openDeal(dealType){

    const deal = this.deals.find(d => d.type === dealType);

    if(!deal) return;

// ========================================
// 1. Header Information
// ========================================

    document.getElementById("drawerIcon").textContent =
    deal.icon;

document.getElementById("drawerProperty").textContent =
    deal.type;

    document.getElementById("drawerCity").textContent =
        deal.city;

// ========================================
// 2. Property Photo
// ========================================

const img =
    document.getElementById("drawerImage");

img.src = deal.image;

img.alt = deal.type;

img.onerror = function(){

    console.error(
        "Unable to load image:",
        deal.image
    );

    this.src =
        "../../images/properties/no-image.jpg";

};        

    document.getElementById("drawerScore").textContent =
        deal.confidence + "%";

// ========================================
// 3. AI Investment Score
// ========================================

const score = deal.confidence;

let stars = "";
let confidenceLabel = "";

if (score >= 96) {

    stars = "★★★★★";
    confidenceLabel = "ELITE CONFIDENCE";

} else if (score >= 90) {

    stars = "★★★★☆";
    confidenceLabel = "VERY HIGH CONFIDENCE";

} else if (score >= 80) {

    stars = "★★★☆☆";
    confidenceLabel = "HIGH CONFIDENCE";

} else if (score >= 70) {

    stars = "★★☆☆☆";
    confidenceLabel = "MODERATE CONFIDENCE";

} else {

    stars = "★☆☆☆☆";
    confidenceLabel = "SPECULATIVE";

}

document.getElementById("drawerStars").textContent = stars;
document.getElementById("drawerConfidenceLabel").textContent = confidenceLabel;


// ========================================
// 4. Recommendation
// ========================================

    const recommendation =
    this.getRecommendation(deal);

    const recommendationIcon =

    recommendation.className === "recommendation-strong-buy"
        ? "🟢"

    : recommendation.className === "recommendation-watch-list"
        ? "🟡"

    : "🔴";
    
const badge =
    document.getElementById(
        "drawerRecommendation"
    );

badge.textContent =
    recommendation.text;

badge.className =
    "drawer-recommendation " +
    recommendation.className;

// ========================================
// 5. Property Details
// ========================================    

document.getElementById("drawerAssetClass").textContent =
    deal.assetClass;

document.getElementById("drawerSize").textContent =
    deal.buildingSize;

document.getElementById("drawerYear").textContent =
    deal.yearBuilt;

document.getElementById("drawerUnits").textContent =
    deal.units;

document.getElementById("drawerOccupancy").textContent =
    deal.occupancy || "N/A"; 
   
document.getElementById("drawerOccupancyMetric").textContent =
    deal.occupancy || "N/A";
    
document.getElementById("drawerEstimatedValue").textContent =
    "$" + deal.estimatedValue.toLocaleString();    

// ========================================
// 6. Financial Snapshot
// ========================================

document.getElementById("drawerPrice").textContent =
   this.formatCurrency(deal.price);

document.getElementById("drawerCapRate").textContent =
    this.formatPercent(deal.capRate);

document.getElementById("drawerCashFlow").textContent =
    this.formatMonthly(deal.cashFlow);

document.getElementById("drawerNOI").textContent =
    deal.noi
        ? "$" + deal.noi.toLocaleString()
        : "N/A";

document.getElementById("drawerPriceSF").textContent =
    deal.pricePerSqFt
        ? "$" + deal.pricePerSqFt.toFixed(2)
        : "N/A";

document.getElementById("drawerCoC").textContent =
    deal.cashOnCash
        ? deal.cashOnCash + "%"
        : "N/A";


        

// ========================================
// 7. AI Equity Opportunity
// ========================================

const valueGap =
    this.calculateValueGap(deal);

const equity =
    deal.estimatedValue - deal.price;

const gap =
    document.getElementById("drawerGap");

gap.innerHTML = `

<div>

    <strong>

        ${equity >= 0 ? "+" : "-"}

        $${Math.abs(equity).toLocaleString()}

    </strong>

    <small>

        (${valueGap >= 0 ? "+" : ""}${valueGap}%)

    </small>

</div>

`;

gap.className = "";

if (valueGap >= 10){

    gap.classList.add("metric-good");

}
else if (valueGap >= 0){

    gap.classList.add("metric-warning");

}
else{

    gap.classList.add("metric-danger");

}

// ========================================
// 8. Dynamic Snapshot Insights
// ========================================

document.getElementById("drawerPriceNote").textContent =
    "Current Asking Price";

const capRateNote =
    document.getElementById("drawerCapRateNote");

if (deal.capRate >= 10){

    capRateNote.textContent =
        "Excellent Return";

}
else if (deal.capRate >= 8){

    capRateNote.textContent =
        "Strong Return";

}
else{

    capRateNote.textContent =
        "Moderate Return";

}

// ----------------------------------------
// Cash Flow
// ----------------------------------------

const cashFlowNote =
    document.getElementById("drawerCashFlowNote");

if (deal.cashFlow >= 10000){

    cashFlowNote.textContent =
        "Exceptional Monthly Income";

}
else if (deal.cashFlow >= 5000){

    cashFlowNote.textContent =
        "Strong Monthly Income";

}
else{

    cashFlowNote.textContent =
        "Positive Monthly Income";

}

// ----------------------------------------
// Occupancy
// ----------------------------------------

const occupancyNote =
    document.getElementById("drawerOccupancyNote");

if (deal.occupancy === "N/A"){

    occupancyNote.textContent =
        "Business Asset";

}
else{

    occupancyNote.textContent =
        "Current Occupancy";

}

// ----------------------------------------
// NOI
// ----------------------------------------

const noiNote =
    document.getElementById("drawerNOINote");

if (deal.noi >= 150000){

    noiNote.textContent =
        "Excellent Annual NOI";

}
else if (deal.noi >= 75000){

    noiNote.textContent =
        "Healthy Annual NOI";

}
else{

    noiNote.textContent =
        "Positive Annual NOI";

}

// ----------------------------------------
// Price / SF
// ----------------------------------------

const priceSFNote =
    document.getElementById("drawerPriceSFNote");

if (deal.pricePerSqFt === 0){

    priceSFNote.textContent =
        "Route / Portfolio Asset";

}
else if (deal.pricePerSqFt < 75){

    priceSFNote.textContent =
        "Excellent Value";

}
else if (deal.pricePerSqFt < 125){

    priceSFNote.textContent =
        "Competitive Pricing";

}
else{

    priceSFNote.textContent =
        "Premium Asset";

}

// ----------------------------------------
// Cash-on-Cash
// ----------------------------------------

const cocNote =
    document.getElementById("drawerCoCNote");

if (deal.cashOnCash >= 15){

    cocNote.textContent =
        "Outstanding Return";

}
else if (deal.cashOnCash >= 10){

    cocNote.textContent =
        "Above Target";

}
else{

    cocNote.textContent =
        "Moderate Return";

}

// ----------------------------------------
// AI Equity Opportunity
// ----------------------------------------

const gapNote =
    document.getElementById("drawerGapNote");

if (valueGap >= 10){

    gapNote.textContent =
        "Excellent Upside";

}
else if (valueGap >= 0){

    gapNote.textContent =
        "Positive Opportunity";

}
else{

    gapNote.textContent =
        "Priced Above AI Estimate";

}


// ========================================
// 9. AI Investment Thesis
// ========================================

let thesis = "";

// Recommendation

if(recommendation.className === "recommendation-strong-buy"){

    thesis +=
        `MPI identifies this ${deal.type.toLowerCase()} as a strong acquisition opportunity. `;

}
else if(recommendation.className === "recommendation-watch-list"){

    thesis +=
        `MPI recommends placing this ${deal.type.toLowerCase()} on the watch list for additional review. `;

}
else{

    thesis +=
        `MPI recommends additional due diligence before pursuing this opportunity. `;

}

// Occupancy

if(deal.occupancy !== "N/A"){

    thesis +=
        `Current occupancy of ${deal.occupancy} demonstrates `;

    const occupancy =
    parseInt(deal.occupancy);
    thesis +=
        occupancy >= 95
            ? "excellent operational stability. "
            : "consistent operational performance. ";

}

// Cash Flow

if(deal.cashFlow >= 10000){

    thesis +=
        `Projected monthly cash flow of $${deal.cashFlow.toLocaleString()} provides exceptional recurring income. `;

}
else if(deal.cashFlow >= 5000){

    thesis +=
        `Projected monthly cash flow of $${deal.cashFlow.toLocaleString()} supports strong recurring income. `;

}
else{

    thesis +=
        `Positive monthly cash flow provides additional upside potential. `;

}

// Value Gap

if(valueGap >= 10){

    thesis +=
        `MPI estimates meaningful upside between the asking price and intrinsic value, creating an attractive equity opportunity.`;

}
else if(valueGap >= 0){

    thesis +=
        `The property appears to be fairly valued with modest appreciation potential.`;

}
else{

    thesis +=
        `The asking price exceeds MPI's current valuation estimate, suggesting additional negotiation may be beneficial.`;

}

document.getElementById("drawerThesis").textContent =
    thesis;


// ========================================
// 10. AI Investment Analysis
// ========================================

const analysis = [];

// ----------------------------------------
// Cap Rate
// ----------------------------------------

if (deal.capRate >= 12) {

    analysis.push(
        "This cap rate ranks among MPI's strongest investment opportunities."
    );

} else if (deal.capRate >= 10) {

    analysis.push(
        "Above-average cap rate provides excellent long-term income potential."
    );

} else if (deal.capRate >= 8) {

    analysis.push(
        "Cap rate supports a balanced combination of income and appreciation."
    );

} else {

    analysis.push(
        "Lower cap rate may indicate a premium location with stronger appreciation potential."
    );

}

// ----------------------------------------
// Cash Flow
// ----------------------------------------

if (deal.cashFlow >= 15000) {

    analysis.push(
        `Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} places this property among MPI's highest income-producing opportunities.`
    );

} else if (deal.cashFlow >= 10000) {

    analysis.push(
        `Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} provides exceptional recurring income.`
    );

} else if (deal.cashFlow >= 5000) {

    analysis.push(
        `Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} offers strong income with long-term upside.`
    );

} else {

    analysis.push(
        `Estimated monthly cash flow of $${deal.cashFlow.toLocaleString()} remains positive while allowing room for value-add improvements.`
    );

}

// ----------------------------------------
// AI Confidence
// ----------------------------------------

if (deal.confidence >= 98) {

    analysis.push(
        `MPI AI assigned a ${deal.confidence}% confidence score after evaluating valuation, market trends, appreciation forecasts, and comparable sales.`
    );

} else if (deal.confidence >= 95) {

    analysis.push(
        `MPI AI assigned a ${deal.confidence}% confidence score, indicating a highly attractive investment opportunity.`
    );

} else if (deal.confidence >= 90) {

    analysis.push(
        `MPI AI assigned a ${deal.confidence}% confidence score, suggesting strong investment fundamentals with moderate risk.`
    );

} else {

    analysis.push(
        `MPI AI assigned a ${deal.confidence}% confidence score and recommends additional due diligence before acquisition.`
    );

}

// ----------------------------------------
// Recommendation
// ----------------------------------------

switch(recommendation.className){

    case "recommendation-strong-buy":

        analysis.push(
            "MPI AI recommends immediate acquisition based on strong investment fundamentals."
        );

        break;

    case "recommendation-watch-list":

        analysis.push(
            "Property shows promising metrics but should be monitored for improved pricing or additional market data."
        );

        break;

    default:

        analysis.push(
            "Current investment risk exceeds MPI's preferred acquisition criteria."
        );

}

document.getElementById("drawerAnalysis").innerHTML = `

<div class="drawer-card analysis-card">

    <div class="analysis-icon">

        📈

    </div>

    <div>

        <strong>Cap Rate</strong>

        <p>

            ${analysis[0]}

        </p>

    </div>

</div>

<div class="drawer-card analysis-card">

    <div class="analysis-icon">

        💰

    </div>

    <div>

        <strong>Cash Flow</strong>

        <p>

            ${analysis[1]}

        </p>

    </div>

</div>

<div class="drawer-card analysis-card">

    <div class="analysis-icon">

        🤖

    </div>

    <div>

        <strong>AI Confidence</strong>

        <p>

            ${analysis[2]}

        </p>

    </div>

</div>

<div class="drawer-card analysis-card">

    <div class="analysis-icon">

    ${recommendationIcon}

</div>

    <div>

        <strong>Recommendation</strong>

        <p>

            ${analysis[3]}

        </p>

    </div>

</div>

`;

// ========================================
// 11. Display Drawer
// ========================================

    document
    .getElementById("drawerOverlay")
    .classList.add("show");

document
    .getElementById("dealDrawer")
    .classList.add("open");

},

// ========================================
// AI Recommendation
// ========================================

getRecommendation(deal){

    const score = deal.confidence;
    const cap = deal.capRate;

    if(score >= 95 && cap >= 8){

        return{

            text:"🟢 STRONG BUY",

            className:"recommendation-strong-buy"

        };

    }

    if(score >= 85){

        return{

            text:"🟡 WATCH LIST",

            className:"recommendation-watch-list"

        };

    }

    return{

        text:"🔴 HIGH RISK",

        className:"recommendation-high-risk"

    };

},

formatCurrency(value) {

    return "$" + Number(value).toLocaleString();

},

formatPercent(value) {

    return value + "%";

},

formatMonthly(value) {

    return "$" + Number(value).toLocaleString() + "/mo";

},

// ========================================
// Calculate AI Value Gap
// ========================================

calculateValueGap(deal){

    if(
        !deal.price ||
        !deal.estimatedValue
    ){
        return 0;
    }

    return Math.round(

        (
            (deal.estimatedValue - deal.price)
            / deal.price
        ) * 100

    );

},

};


// ========================================
// Start Dashboard
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    Dashboard.init();

});

