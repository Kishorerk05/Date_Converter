function convertDate() {
    const inputDate = document.getElementById("inputDate").value;
    const inputFormat = document.getElementById("inputFormat").value;
    const expectedFormat = document.getElementById("expectedFormat").value;
    const outputElement = document.getElementById("output");
    const errorElement = document.getElementById("error");
  
    outputElement.innerText = "";
    errorElement.innerText = "";
  
    const validFormat = /^(DD|MM|YYYY)([-/](DD|MM|YYYY)){2}$/;
    if (!validFormat.test(inputFormat) || !validFormat.test(expectedFormat)) {
      errorElement.innerText = "Error: Format must be in DD/MM/YYYY, MM/DD/YYYY, etc.";
      return;
    }
  
    const dateParts = inputDate.split(inputFormat.includes("-") ? "-" : "/");
    const formatParts = inputFormat.split(inputFormat.includes("-") ? "-" : "/");
  
    if (dateParts.length !== 3 || formatParts.length !== 3) {
      errorElement.innerText = "Error: Input date or format is incorrect.";
      return;
    }
  
    const dateObj = {};
    formatParts.forEach((part, index) => {
      dateObj[part] = dateParts[index];
    });
  
    const day = parseInt(dateObj['DD'], 10);
    const month = parseInt(dateObj['MM'], 10);
    const year = parseInt(dateObj['YYYY'], 10);
  
    if (
      isNaN(day) || isNaN(month) || isNaN(year) ||
      day < 1 || day > 31 || month < 1 || month > 12 || year < 1000 || year > 9999
    ) {
      errorElement.innerText = "Error: Invalid date values. Please enter a valid date.";
      return;
    }
  
    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (month === 2 && ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0))) {
      monthDays[1] = 29; 
    }
    if (day > monthDays[month - 1]) {
      errorElement.innerText = "Error: Invalid day for the given month.";
      return;
    }
  
    const outputFormatParts = expectedFormat.split(expectedFormat.includes("-") ? "-" : "/");
    const outputDate = outputFormatParts.map(part => dateObj[part] || part).join(expectedFormat.includes("-") ? "-" : "/");
  
    outputElement.innerText = "Converted Date: " + outputDate;
  }
  