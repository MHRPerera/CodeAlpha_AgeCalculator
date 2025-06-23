// Populate day dropdown with given number of days
function populateDays(daysCount) {
  const daySelect = document.getElementById('day');
  daySelect.innerHTML = '<option value="" disabled selected>Day</option>';
  for (let i = 1; i <= daysCount; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    daySelect.appendChild(option);
  }

}


// Update days when month or year changes
function updateDaysDropdown() {
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
  if (!month || !year || isNaN(month) || isNaN(year)) {
    populateDays(31); // default
    return;
  }
  const daysInMonth = new Date(year, month, 0).getDate();
  populateDays(daysInMonth);
}


// Calculate and display age
function calculateAge() {
  const day = parseInt(document.getElementById('day').value);
  const month = parseInt(document.getElementById('month').value);
  const year = parseInt(document.getElementById('year').value);
  const result = document.getElementById('result');

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    result.innerHTML = "Please select a valid date.";
    return;
  }

  if (month < 1 || month > 12) {
    result.innerHTML = "Please select a valid month (1–12).";
    return;
  }

  const currentYear = new Date().getFullYear();
  if (year < 1900 || year > currentYear) {
    result.innerHTML = `Please enter a valid year (between 1900 and ${currentYear}).`;
    return;
  }

  const daysInMonth = new Date(year, month, 0).getDate();
  if (day < 1 || day > daysInMonth) {
    result.innerHTML = `Please select a valid day (1–${daysInMonth}).`;
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  if (birthDate > today) {
    result.innerHTML = "Date of birth cannot be in the future!";
    return;
  }

  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  if (ageDays < 0) {
    ageMonths--;
    const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    ageDays += prevMonthDays;
  }

  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }



  result.innerHTML = `
    You are <br>
    ${ageYears} year(s), <br>
    ${ageMonths} month(s), <br>
    and ${ageDays} day(s) old.
  `;
}

// Event listeners for dropdown updates
document.getElementById('month').addEventListener('change', updateDaysDropdown);
document.getElementById('year').addEventListener('input', updateDaysDropdown);

// Initial setup: populate with 31 days
window.addEventListener('DOMContentLoaded', () => populateDays(31));
