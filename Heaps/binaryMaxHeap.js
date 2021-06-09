function Node(weight, data) {
  this.weight = weight;
  this.data = data;
}

class MaxHeap {
  constructor() {
    this.allNodes = [];
  }

  add(weight, data) {
    let node = new Node(weight, data);
    this.allNodes.push(node);
    let size = this.allNodes.length;
    let current = size - 1;
    let parentIndex = Math.floor((current - 1) / 2);

    while (parentIndex >= 0) {
      let parentNode = this.allNodes[parentIndex];
      let currentNode = this.allNodes[current];
      if (parentNode.weight < currentNode.weight) {
        [this.allNodes[parentIndex], this.allNodes[current]] = [this.allNodes[current], this.allNodes[parentIndex]]; // swaps
        current = parentIndex;
        parentIndex = Math.floor((current - 1) / 2);
      } else {
        break;
      }
    }
  }

  max() {
    return this.allNodes[0] && this.allNodes[0].data;
  }

  empty() {
    return this.allNodes.length === 0;
  }

  extractMap() {
    let size = this.allNodes.length - 1;
    let max = this.allNodes[0] && this.allNodes[0].data;
    let lastNodeWeight = this.allNodes[size] && this.allNodes[size].weight;
    this.allNodes[0].weight = lastNodeWeight;
    this.allNodes[0].data = this.allNodes[size] && this.allNodes[size].data;
    this.allNodes.pop();

    let currentIndex = 0;
    size--;
    while (true) {
      let left = 2 * currentIndex + 1;
      let right = 2 * currentIndex + 2;
      if (left > size) break;
      if (right > size) right = left;
      let largerIndex = this.allNodes[left].weight >= this.allNodes[right].weight ? left : right;
      if (this.allNodes[currentIndex].weight < this.allNodes[largerIndex].weight) {
        [this.allNodes[currentIndex], this.allNodes[largerIndex]] = [
          this.allNodes[largerIndex],
          this.allNodes[currentIndex]
        ];
        currentIndex = largerIndex;
      } else {
        break;
      }
    }
    return max;
  }

  printHeap() {
    for (let n of this.allNodes) {
      console.log(`${n.data} data with ${n.weight} weight`);
    }
  }
}

module.exports = MaxHeap;
