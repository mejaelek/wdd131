document.addEventListener("DOMContentLoaded", () => {
    // Footer Year & Last Modified
    document.getElementById("year").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;

    // Weather Wind Chill Calculation (static values)
    const temp = 10; // Celsius (match HTML)
    const wind = 5;  // km/h (match HTML)

    function calculateWindChill(tempC, windKmh) {
        // Wind chill formula (metric): valid for temp <= 10°C and wind > 4.8 km/h
        return Math.round(
            13.12 + 0.6215 * tempC - 11.37 * Math.pow(windKmh, 0.16) + 0.3965 * tempC * Math.pow(windKmh, 0.16)
        );
    }

    let windChill = "N/A";
    if (temp <= 10 && wind > 4.8) {
        windChill = calculateWindChill(temp, wind) + "°C";
    }
    document.getElementById("windchill").textContent = windChill;
});
