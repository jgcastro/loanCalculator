// listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    // hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});
document.getElementById('loan-form').addEventListener('reset', function(e) {
    clean();
    e.preventDefault(e);
});

// calculate results
function calculateResults() {
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

        // show results
        document.getElementById('results').style.display = 'block';

        // hide loader
        document.getElementById('loading').style.display = 'none';
    } else {
        showError('Please check your numbers');
    }
    
}
// show error
function showError(error) {
    // hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.getElementById('loading').style.display = 'none';
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

function clean() {
    // hide results
    document.getElementById('results').style.display = 'none';
    // show loader
    document.getElementById('loading').style.display = 'none';
    monthlyPayment.value = "";
    totalPayment.value = "";
    totalInterest.value = "";
}