// ========================================
// MPI Investment Memorandum
// Bootstrap
// ========================================

const storedReport =
    sessionStorage.getItem(
        "selectedReport"
    );

const storedDeal =
    sessionStorage.getItem(
        "selectedDeal"
    );

if(storedReport){

    const memorandum =
        JSON.parse(storedReport);

    document.getElementById(
        "memorandumRoot"
    ).innerHTML =

        investmentMemorandumRenderer.render(
            memorandum
        );

}
else if(storedDeal){

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

    document.getElementById(
        "memorandumRoot"
    ).innerHTML =

        investmentMemorandumRenderer.render(
            memorandum
        );

}
else{

    document.getElementById(
        "memorandumRoot"
    ).innerHTML = `

        <h1>No Investment Memorandum Available</h1>

        <p>Please export a deal from the MPI Dashboard.</p>

    `;

}

console.log(
    "Investment Memorandum Loaded"
);