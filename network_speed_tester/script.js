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
    let fileSize = 924 * 1024; // 924KB file
    let output = document.getElementById("output");

    // Reset output every time the button is clicked
    output.innerHTML = "Testing speed...";

    image.onload = function () {
        endTime = new Date().getTime();
        let duration = (endTime - startTime) / 1000; // Time in seconds
        let speedMBps = (fileSize / (duration * 1024 * 1024)).toFixed(2); // Speed in MBps
        output.innerHTML = `Speed: ${speedMBps} MBps`;
    };

    image.onerror = function () {
        output.innerHTML = "Error testing speed. Try again.";
    };

    startTime = new Date().getTime();
    image.src = "img.jpg?t=" + startTime; // Ensure img.jpg exists in the same folder as your HTML file
}
