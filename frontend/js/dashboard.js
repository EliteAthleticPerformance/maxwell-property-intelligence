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

activityMessages:[

{
    type:"🏠 Duplex",
    city:"Kansas City, MO",
    price:248000,
    cap:"8.9%",
    cash:612,
    confidence:96
},

{
    type:"🏢 12-Unit Apartment",
    city:"Independence, MO",
    price:1185000,
    cap:"9.6%",
    cash:4285,
    confidence:94
},

{
    type:"🏪 Retail Strip Center",
    city:"Lee's Summit, MO",
    price:1825000,
    cap:"8.1%",
    cash:6420,
    confidence:91
},

{
    type:"🏠 Single Family Rental",
    city:"Overland Park, KS",
    price:329900,
    cap:"7.8%",
    cash:515,
    confidence:88
},

{
    type:"🚗 Car Wash",
    city:"Belton, MO",
    price:975000,
    cap:"10.4%",
    cash:8120,
    confidence:95
},

{
    type:"🧺 Laundromat",
    city:"Grandview, MO",
    price:425000,
    cap:"11.3%",
    cash:3875,
    confidence:93
},

{
    type:"🏢 Self Storage",
    city:"Blue Springs, MO",
    price:2150000,
    cap:"8.7%",
    cash:11920,
    confidence:97
},

{
    type:"🏕 RV Park",
    city:"Branson, MO",
    price:3890000,
    cap:"9.5%",
    cash:23650,
    confidence:92
},

{
    type:"🏭 Industrial Warehouse",
    city:"Olathe, KS",
    price:2875000,
    cap:"8.2%",
    cash:14780,
    confidence:90
},

{
    type:"🏘 Mobile Home Park",
    city:"Sedalia, MO",
    price:1495000,
    cap:"10.7%",
    cash:10320,
    confidence:96
},

{
    type:"❄ Ice Machine Route",
    city:"Kansas City Metro",
    price:268000,
    cap:"14.1%",
    cash:4560,
    confidence:89
},

{
    type:"📜 Tax Lien Portfolio",
    city:"Cass County, MO",
    price:96500,
    cap:"18.8%",
    cash:1740,
    confidence:98
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

    this.refreshDashboard(this.period);

this.startScanner();

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

        addActivity(){

    const container =
        document.getElementById("activityContainer");

    if(!container) return;

    const deal =
        this.activityMessages[
            Math.floor(
                Math.random() *
                this.activityMessages.length
            )
        ];

    const item =
        document.createElement("div");

    item.className="activity-item";

    item.innerHTML=`

        <div class="activity-dot"></div>

        <div class="activity-content">

            <div class="activity-time">

                ${new Date().toLocaleTimeString([],{

                    hour:"numeric",
                    minute:"2-digit",
                    second:"2-digit"

                })}

            </div>

            <div class="activity-message">

                <strong>${deal.type}</strong><br>

                ${deal.city}<br><br>

                💰 Price:
                $${deal.price.toLocaleString()}<br>

                📈 Cap Rate:
                ${deal.cap}<br>

                💵 Cash Flow:
                $${deal.cash.toLocaleString()}/mo<br>

                🤖 AI Confidence:
                ${deal.confidence}%

            </div>

        </div>

    `;

    container.prepend(item);

    while(container.children.length>6){

        container.removeChild(container.lastChild);

    }

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



};


// ========================================
// Start Dashboard
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    Dashboard.init();

});