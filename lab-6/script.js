document.getElementById("solveButton").addEventListener("click", function() {
    const inputArray = document.getElementById("inputArray").value;
    if (inputArray.trim() === "") {
        alert("Please enter an array of numbers.");
        return;
    }
    
    const array = inputArray.split(",").map(num => parseInt(num.trim(), 10));

    // Validate the array
    if (array.some(isNaN)) {
        alert("Please enter valid numbers only.");
        return;
    }

    bubbleSort(array);
    document.getElementById("output").innerText = "Sorted Array: " + array.join(", ");
});

function bubbleSort(arr) {
    let n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

// Update the last modified time dynamically
window.onload = function() {
    var x = document.lastModified;
    document.getElementById('lastModified').textContent = x;
};
