let MaxHeap = require("./binaryMaxHeap");

let heap = new MaxHeap();
heap.add(3, "Vedant");
heap.add(4, "Ravindra");
heap.add(8, "Natarajan");
heap.add(10, "Kuchur");
heap.add(5, "Mridul");
heap.add(6, "Naveen");
heap.printHeap();
console.log(`${heap.max()} is the max weight`);
heap.extractMap();
console.log("After extracting");
heap.printHeap();
console.log(`${heap.max()} is the max weight`);
