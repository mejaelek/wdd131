// Dynamically set the current year
const currentYearSpan = document.getElementById("currentyear");
if (currentYearSpan) {
    const currentYear = new Date().getFullYear();
    currentYearSpan.textContent = currentYear;
}

// Dynamically set the last modified date
const lastModifiedPara = document.getElementById("lastModified");
if (lastModifiedPara) {
    lastModifiedPara.textContent = `Last modified: ${document.lastModified}`;
}
