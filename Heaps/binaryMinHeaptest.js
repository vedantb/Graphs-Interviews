let MinHeap = require("./binaryMinHeap");

let heap = new MinHeap();
heap.add(3, "Vedant");
heap.printPositionMap();
heap.add(4, "Ravindra");
heap.add(8, "Natarajan");
heap.printPositionMap();
heap.add(10, "Kuchur");
heap.add(5, "Sreeharsha");
heap.add(6, "Mridul");
heap.add(2, "Naveen");
heap.printPositionMap();
heap.decrease("Deepak", 1);
heap.printHeap();
heap.printPositionMap();
