// Get references to HTML elements
const yearSpan = document.getElementById("year");
const lastModifiedSpan = document.getElementById("lastModified");
const tempSpan = document.getElementById("temp");
const windSpan = document.getElementById("wind");
const windChillSpan = document.getElementById("windchill");

// Set current year in the footer
yearSpan.textContent = new Date().getFullYear();

// Set last modified date
lastModifiedSpan.textContent = document.lastModified;

// Static temperature and wind speed values (in Celsius and km/h)
const temperatureC = parseFloat(tempSpan.textContent); // e.g., 5 °C
const windSpeedKmh = parseFloat(windSpan.textContent); // e.g., 10 km/h

// Wind chill calculation function (Metric units)
function calculateWindChill(tempC, speedKmh) {
    return (
        13.12 +
        0.6215 * tempC -
        11.37 * Math.pow(speedKmh, 0.16) +
        0.3965 * tempC * Math.pow(speedKmh, 0.16)
    ).toFixed(1); // Rounded to 1 decimal place
}

// Only display wind chill if conditions are met
if (temperatureC <= 10 && windSpeedKmh > 4.8) {
    const chill = calculateWindChill(temperatureC, windSpeedKmh);
    windChillSpan.textContent = `${chill} °C`;
} else {
    windChillSpan.textContent = "N/A";
}
