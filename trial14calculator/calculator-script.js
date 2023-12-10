function calculateTotal() {
  var hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
  var hoursWorked = parseFloat(document.getElementById('hoursWorked').value);

  if (isNaN(hourlyRate) || isNaN(hoursWorked)) {
    alert('Please enter valid numeric values.');
    return;
  }

  var totalDollars = hourlyRate * hoursWorked;
  var timeInBnopx = totalDollars / hourlyRate;

  document.getElementById('result').innerHTML = 'Total: $' + totalDollars.toFixed(2) + '<br>' +
    'Equivalent time in Bnopx: ' + timeInBnopx.toFixed(2) + ' hours';
}