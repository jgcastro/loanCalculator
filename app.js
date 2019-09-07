// listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults);
document.getElementById('loan-form').addEventListener('reset', clean);

// calculate results
function calculateResults(e) {
    // ui variables
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    // results
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

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
        showError('Please check your numbers');
    }
    e.preventDefault();
}
// show error
function showError(error) {
    //create a div
    const errorDiv = document.createElement('div');

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);

    // clear error after 3 sec
    setTimeout(clearError, 3000);

    function clearError() {
        document.querySelector('.alert').remove();
    }
}

function clean(e) {
    monthlyPayment.value = "";
    totalPayment.value = "";
    totalInterest.value = "";
    e.preventDefault(e);
}