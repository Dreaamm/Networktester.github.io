document.addEventListener("DOMContentLoaded", function () {
    let startButton = document.getElementById("StartTest");

    if (startButton) {
        startButton.addEventListener("click", testSpeed);
    } else {
        console.error("Button not found! Check your HTML file.");
    }
});

function testSpeed() {
    let startTime, endTime;
    let image = new Image();
    let fileSize = 4.228 * 1024 * 1024; 
    let output = document.getElementById("output");


    output.innerHTML = "Testing speed...";

    image.onload = function () {
        endTime = new Date().getTime();
        let duration = (endTime - startTime) / 1000; 
        let speedMbps = (fileSize / (duration * 1024 * 1024)).toFixed(2); 
        output.innerHTML = `Speed: ${speedMbps} Mbps`;
    };

    image.onerror = function () {
        output.innerHTML = "Error testing speed. Try again.";
    };

    startTime = new Date().getTime();
    image.src = "img.jpg?t=" + startTime; 
}
