document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("StartTest");

    if (startButton) {
        startButton.addEventListener("click", testSpeed);
    } else {
        console.error("Button not found! Check your HTML file.");
    }
});

function testSpeed() {
    let output = document.getElementById("output");
    let fileSize = 4.228 * 1024 * 1024; // 4.228MB file
    let totalSpeed = 0;
    let testsCompleted = 0;

    output.innerHTML = "Testing speed...";

    function runTest() {
        let startTime, endTime;
        let image = new Image();

        image.onload = function () {
            endTime = performance.now();
            let duration = (endTime - startTime) / 1000; // Time in seconds
            let speedMbps = ((fileSize * 8) / (duration * 1024 * 1024)).toFixed(2); // Speed in Mbps
            totalSpeed += parseFloat(speedMbps);
            testsCompleted++;

            if (testsCompleted === 2) {
                let avgSpeed = (totalSpeed / 2).toFixed(2);
                output.innerHTML = `Average Speed: ${avgSpeed} Mbps`;
            } else {
                runTest(); // Run the second test
            }
        };

        image.onerror = function () {
            output.innerHTML = "Error testing speed. Try again.";
        };

        startTime = performance.now();
        image.src = "img.jpg?t=" + new Date().getTime() + Math.random(); // Prevent caching
    }

    runTest(); // Start first test
}


