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

    this.updateChart(this.period);

    this.updateKPIs(this.period);

    this.updateTrends(this.period);

},

    // ------------------------------------
    // Event Listeners
    // ------------------------------------

    attachEvents() {

        const selector = document.getElementById("chartPeriod");

        if (!selector) return;

        selector.addEventListener("change", (e) => {

    this.period = e.target.value;

    this.updateChart(this.period);

    this.updateKPIs(this.period);

    this.updateTrends(this.period);

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

updateKPIs(period) {

    const data = this.kpis[period];
    
    if (!data) return;

    this.animateValue(
        "portfolioValue",
        data.portfolio,
        "$"
    );

    this.animateValue(
        "cashFlow",
        data.cashFlow,
        "$"
    );

    this.animateValue(
        "activeDeals",
        data.deals
    );

    this.animateValue(
        "aiDeals",
        data.ai
    );

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

    if (value > 0) {

        el.style.color = "var(--success)";
        el.textContent = `▲ ${value}${suffix}`;

    } else if (value < 0) {

        el.style.color = "var(--danger)";
        el.textContent = `▼ ${Math.abs(value)}${suffix}`;

    } else {

        el.style.color = "var(--text-secondary)";
        el.textContent = "—";

    }

}

};


// ========================================
// Start Dashboard
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    Dashboard.init();

});