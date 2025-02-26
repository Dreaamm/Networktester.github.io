document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("StartTest");

    if (startButton) {
        startButton.addEventListener("click", startSpeedTest);
    } else {
        console.error("StartTest button not found! Ensure your HTML includes a button with the ID 'StartTest'.");
    }
});

function startSpeedTest() {
    const outputElement = document.getElementById("output");
    if (!outputElement) {
        console.error("Output element with ID 'output' not found! Ensure your HTML includes a div or span with the ID 'output' to display results.");
        return;
    }

    const fileSizeInBytes = 4.228 * 1e6;
    const numberOfTests = 2;
    let totalSpeed = 0;
    let testsCompleted = 0;

    outputElement.innerHTML = "Testing speed... (Running test 1 of " + numberOfTests + ")";

    function runTest() {
        let startTime, endTime;
        const testImage = new Image();

        testImage.onload = function() {
            endTime = performance.now();
            const durationSeconds = (endTime - startTime) / 1000;
            const speedMbps = calculateSpeedMbps(fileSizeInBytes, durationSeconds);
            totalSpeed += speedMbps;
            testsCompleted++;

            if (testsCompleted < numberOfTests) {
                outputElement.innerHTML = "Testing speed... (Running test " + (testsCompleted + 1) + " of " + numberOfTests + ")";
                runTest();
            } else {
                const averageSpeedMbps = calculateAverageSpeed(totalSpeed, numberOfTests);
                displayTestResults(averageSpeedMbps, outputElement);
            }
        };

        testImage.onerror = function() {
            handleImageLoadError(outputElement);
        };

        startTime = performance.now();
        testImage.src = "img.jpg?cacheBuster=" + Date.now() + "-" + Math.random();
    }

    runTest();
}

function calculateSpeedMbps(fileSizeBytes, durationSeconds) {
    const speedBitsPerSecond = (fileSizeBytes * 8) / durationSeconds;
    const speedMbps = speedBitsPerSecond / 1e6;
    return parseFloat(speedMbps.toFixed(2));
}

function calculateAverageSpeed(totalSpeed, numberOfTests) {
    return parseFloat((totalSpeed / numberOfTests).toFixed(2));
}

function displayTestResults(averageSpeedMbps, outputElement) {
    outputElement.innerHTML = "Average Speed: " + averageSpeedMbps + " Mbps";
}

function handleImageLoadError(outputElement) {
    outputElement.innerHTML = "Error loading test image. Please ensure:";
    outputElement.innerHTML += "<ul>";
    outputElement.innerHTML += "<li>The 'img.jpg' file exists in the same directory or the path is correctly specified.</li>";
    outputElement.innerHTML += "<li>There are no network connectivity issues.</li>";
    outputElement.innerHTML += "<li>CORS is correctly configured on the server if the image is hosted on a different domain.</li>";
    outputElement.innerHTML += "</ul>";
    outputElement.innerHTML += "Please refresh the page and try again.";
}


