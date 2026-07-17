// ========================================
// MPI Investment Memorandum
// Bootstrap
// ========================================

const storedDeal =

    sessionStorage.getItem(
        "selectedDeal"
    );

if(storedDeal){

    const deal =
        JSON.parse(storedDeal);

    const report =
        reportService.generate(
            deal
        );

    const memorandum =
        investmentMemorandumService.generate(
            report
        );

    const html =
        investmentMemorandumRenderer.render(
            memorandum
        );

    document.getElementById(
        "memorandumRoot"
    ).innerHTML = html;

}
else{

    document.getElementById(
        "memorandumRoot"
    ).innerHTML = `

        <h1>

            No Investment Memorandum Available

        </h1>

        <p>

            Please export a deal from the MPI Dashboard.

        </p>

    `;

}

console.log(
    "Investment Memorandum Loaded"
);