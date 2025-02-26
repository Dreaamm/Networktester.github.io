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
    let fileSize = 4.228 * 1024 * 1024; 
    let totalSpeed = 0;
    let testsCompleted = 0;
    let testCount = 5; // Increased test count to 5

    output.innerHTML = "Testing speed...";

    function runTest() {
        let startTime = performance.now();
        let image = new Image();

        image.onload = function () {
            let endTime = performance.now();
            let duration = (endTime - startTime) / 1000; 
            let speedMbps = ((fileSize * 8) / (duration * 1024 * 1024)).toFixed(2); 
            totalSpeed += parseFloat(speedMbps);
            testsCompleted++;

            if (testsCompleted === testCount) {
                let avgSpeed = (totalSpeed / testCount).toFixed(2);
                output.innerHTML = `Average Speed: ${avgSpeed} Mbps`;
            }
        };

        image.onerror = function () {
            output.innerHTML = "Error testing speed. Try again.";
        };

        image.src = "img.jpg?t=" + new Date().getTime() + Math.random();
    }

    // Run all 5 tests at the same time
    for (let i = 0; i < testCount; i++) {
        runTest();
    }
}

