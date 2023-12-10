function calculateTotal() {
  var hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
  var hoursWorked = parseFloat(document.getElementById('hoursWorked').value);

  if (isNaN(hourlyRate) || isNaN(hoursWorked)) {
    alert('Please enter a valid numeric value');
    return;
  }

  var totalDollars = hourlyRate * hoursWorked;
  var timeInBnopx = totalDollars / hourlyRate;
}