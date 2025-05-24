document.addEventListener('DOMContentLoaded', () => {
    // Set footer year and last modified date
    document.getElementById('year').textContent = new Date().getFullYear();
    document.getElementById('lastModified').textContent = document.lastModified;

    // Get temperature and wind speed values
    const temp = parseFloat(document.getElementById('temp').textContent);
    const speed = parseFloat(document.getElementById('speed').textContent);
    const chillElem = document.getElementById('chill');

    // Calculate wind chill using formula if conditions met
    function calculateWindChill(t, s) {
        if (t <= 10 && s > 4.8) {
            return Math.round(
                13.12 +
                0.6215 * t -
                11.37 * Math.pow(s, 0.16) +
                0.3965 * t * Math.pow(s, 0.16)
            ) + " °C";
        }
        return "N/A";
    }

    // Update wind chill display
    chillElem.textContent = calculateWindChill(temp, speed);
});
