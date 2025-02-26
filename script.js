document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("StartTest");

    if (startButton) {
        startButton.addEventListener("click", testSpeed);
    } else {
        console.error("Button not found! Check your HTML file.");
    }
});

function testSpeed() {
    let fileSize = 4.228 * 1024 * 1024;
    let output = document.getElementById("output");
    let image = new Image();
    
    output.innerHTML = "Testing speed...";

    let startTime = performance.now();

    image.onload = function () {
        let endTime = performance.now();
        let duration = (endTime - startTime) / 1000;
        let speedMbps = ((fileSize * 8) / (duration * 1024 * 1024)).toFixed(2);
        output.innerHTML = `Speed: ${speedMbps} Mbps`;
    };

    image.onerror = function () {
        output.innerHTML = "Error testing speed. Try again.";
    };

    
    image.src = `img.jpg?nocache=${Math.random()}`;
}

