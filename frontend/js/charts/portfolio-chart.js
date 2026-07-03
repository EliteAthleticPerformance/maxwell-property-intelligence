const ctx = document.getElementById("portfolioChart");

window.portfolioChart = new Chart(ctx, {

    type: "line",

    data: {

        labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun"
        ],

        datasets: [{

            label: "Portfolio Value",

            data: [
                1.8,
                2.0,
                2.15,
                2.28,
                2.35,
                2.49
            ],

            borderColor: "#2563EB",

            backgroundColor: "rgba(37,99,235,.12)",

            borderWidth: 3,

            fill: true,

            tension: 0.35,

            pointRadius: 4,

            pointHoverRadius: 6

        }]

    },

    options: {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: false

            }

        }

    }

});