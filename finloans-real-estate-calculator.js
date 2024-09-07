function calculateRealEstate() {
    // Get input values from the form
    let propertyValue = parseFloat(document.getElementById('propertyValue').value);
    let monthlyIncome = parseFloat(document.getElementById('loanEligibility').value);
    let existingEmi = parseFloat(document.getElementById('existingEmi').value);
    let desiredLoan = parseFloat(document.getElementById('loanAmount').value);
    let interestRate = parseFloat(document.getElementById('interestRate').value) / 100 / 12; // Monthly interest rate
    let loanTenure = parseFloat(document.getElementById('loanTenure').value) * 12; // Loan tenure in months

    // Validate inputs
    if (isNaN(propertyValue) || isNaN(monthlyIncome) || isNaN(existingEmi) || isNaN(desiredLoan) || isNaN(interestRate) || isNaN(loanTenure)) {
        document.getElementById('result').innerHTML = "<p style='color: red;'>Please fill in all fields correctly.</p>";
        return;
    }

    // 1. Calculate Loan Eligibility
    let maxEligibleEmi = (monthlyIncome * 0.5) - existingEmi;
    let eligibleLoanAmount = (maxEligibleEmi * (Math.pow(1 + interestRate, loanTenure) - 1)) / (interestRate * Math.pow(1 + interestRate, loanTenure));

    // 2. Calculate EMI for Desired Loan
    let emi = (desiredLoan * interestRate * Math.pow(1 + interestRate, loanTenure)) / (Math.pow(1 + interestRate, loanTenure) - 1);

    // 3. Calculate Down Payment (Assume 20% of property value as down payment)
    let downPayment = propertyValue * 0.2;

    // 4. Estimate Stamp Duty and Registration Fee (Assume 7% of property value as a general estimate)
    let stampDuty = propertyValue * 0.07;

    // 5. Display results
    document.getElementById('result').innerHTML = `
        <h3>Loan Eligibility:</h3>
        <p>Maximum Eligible Loan Amount: ₹${eligibleLoanAmount.toFixed(2)}</p>

        <h3>EMI Calculation:</h3>
        <p>Estimated EMI for Desired Loan: ₹${emi.toFixed(2)}</p>

        <h3>Down Payment:</h3>
        <p>Estimated Down Payment: ₹${downPayment.toFixed(2)}</p>

        <h3>Stamp Duty and Registration:</h3>
        <p>Estimated Stamp Duty and Fees: ₹${stampDuty.toFixed(2)}</p>
    `;
}

