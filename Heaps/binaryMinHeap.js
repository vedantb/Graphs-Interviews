function Node(weight, data) {
    this.weight = weight;
    this.data = data;
}

class MinHeap {
    constructor() {
        this.allNodes = [];
        this.nodePosition = {};
    }

    // Checks where the data exists in heap or not
    containsData(data) {
        return data in this.nodePosition;
    }

    // Add data and its weight to they heap
    add(weight, data) {
        let node = new Node(weight, data);
        this.allNodes.push(node);
        let size = this.allNodes.length;
        let current = size - 1;
        let parentIndex = Math.floor((current - 1) / 2);
        this.nodePosition[node.data] = current;
        while (parentIndex >= 0) {
            let parentNode = this.allNodes[parentIndex];
            let currentNode = this.allNodes[current];
            if (parentNode.weight > currentNode.weight) {
                [this.allNodes[parentIndex], this.allNodes[current]] = [
                    this.allNodes[current],
                    this.allNodes[parentIndex]
                ]; // swaps
                this.updatePositionMap(
                    this.allNodes[parentIndex].data,
                    this.allNodes[current].data,
                    parentIndex,
                    current
                );
                current = parentIndex;
                parentIndex = Math.floor((current - 1) / 2);
            } else {
                break;
            }
        }
    }

    // returns the min without removing the node
    min() {
        return this.allNodes[0].data;
    }

    // checks if the heap is empty or not
    empty() {
        return this.allNodes.length === 0;
    }

    // decreases weight of data to new weight
    decrease(data, newWeight) {
        let position = this.nodePosition[data];
        this.allNodes[position].weight = newWeight;
        let parent = Math.floor((position - 1) / 2);
        while (parent >= 0) {
            if (this.allNodes[parent].weight > this.allNodes[position].weight) {
                [this.allNodes[parent], this.allNodes[position]] = [this.allNodes[position], this.allNodes[parent]];
                this.updatePositionMap(this.allNodes[parent].data, this.allNodes[position].data, parent, position);
                position = parent;
                parent = Math.floor((position - 1) / 2);
            } else {
                break;
            }
        }
    }

    getWeight(data) {
        let position = this.nodePosition[data];
        if (!position) return null;
        else return this.allNodes[position].weight;
    }

    removeMinNode() {
        let size = this.allNodes.length - 1;
        // creating a new node with the minimum element which will eventually bre returned
        let minNode = new Node(this.allNodes[0].weight, this.allNodes[0].data);
        // updating the node at the top with the last nodes weight and data
        let lastNodeWeight = this.allNodes[size].weight;
        this.allNodes[0].weight = lastNodeWeight;
        this.allNodes[0].data = this.allNodes[size].data;

        // update the nodePosition map to indicate the last node is now at position 0 and the minnode no longer exists
        delete this.nodePosition[minNode.data];
        delete this.nodePosition[this.allNodes[0].data];
        this.nodePosition[this.allNodes[0].data] = 0;

        // removing the last node now since we moved it to position 0
        this.allNodes.pop();

        let currentIndex = 0;
        size--;
        while (true) {
            let left = 2 * currentIndex + 1;
            let right = 2 * currentIndex + 2;
            if (left > size) break;
            if (right > size) right = left;
            let smallerIndex = this.allNodes[left].weight <= this.allNodes[right].weight ? left : right;
            if (this.allNodes[currentIndex].weight > this.allNodes[smallerIndex].weight) {
                [this.allNodes[currentIndex], this.allNodes[smallerIndex]] = [
                    this.allNodes[smallerIndex],
                    this.allNodes[currentIndex]
                ];
                this.updatePositionMap(
                    this.allNodes[currentIndex].data,
                    this.allNodes[smallerIndex].data,
                    currentIndex,
                    smallerIndex
                );
                currentIndex = smallerIndex;
            } else {
                break;
            }
        }
        return minNode;
    }

    extractMin() {
        let node = this.removeMinNode();
        return node.data;
    }

    printPositionMap() {
        console.log(this.nodePosition);
    }

    printHeap() {
        for (let n of this.allNodes) {
            console.log(`${n.data} data with ${n.weight} weight`);
        }
    }

    updatePositionMap(data1, data2, pos1, pos2) {
        delete this.nodePosition[data1];
        delete this.nodePosition[data2];
        this.nodePosition[data1] = pos1;
        this.nodePosition[data2] = pos2;
    }
}

module.exports = MinHeap;
