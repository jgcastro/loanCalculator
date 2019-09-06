// listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);

// calculate results
function calculateResults(e) {
    console.log('Calculating...');
    // ui variables
    const amount = getElementById('amount');
    const interest = getElementById('interest');
    const years = getElementById('years');
    // results
    const monthlyPayment = getElementById('monthly-payment');
    const totalPayment = getElementById('total-payment');
    const totalInterest = getElementById('total-interest');

    const principalAmount = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100  / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principalAmount * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principalAmount).toFixed(2);
    } else {
        console.log('Please check your numbers')
    }
    e.preventDefault();
}