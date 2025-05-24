// Footer dynamic content
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Wind Chill Calculation
function calculateWindChill(tempF, speedMph) {
    return (
        35.74 +
        0.6215 * tempF -
        35.75 * Math.pow(speedMph, 0.16) +
        0.4275 * tempF * Math.pow(speedMph, 0.16)
    ).toFixed(1);
}

const temp = parseFloat(document.getElementById("temp").textContent);
const wind = parseFloat(document.getElementById("wind").textContent);
const windChillElement = document.getElementById("windchill");

if (temp <= 50 && wind > 3) {
    windChillElement.textContent = `${calculateWindChill(temp, wind)} °F`;
} else {
    windChillElement.textContent = "N/A";
}

// View toggle logic
const directory = document.getElementById("directory");
document.getElementById("gridView").addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
});

document.getElementById("listView").addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
});
