import { Sorter } from "./sorter";

export class Node {
  next: Node | null = null;

  constructor(public data: number) {}
}

export class LinkedList extends Sorter {
  head: Node | null = null;
  size: number = 0;

  add(data: number): void {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
      return;
    }

    let tail = this.head;
    while (tail.next) {
      tail = tail.next;
    }

    tail.next = node;
  }

  get length(): number {
    if (!this.head) {
      return 0;
    }

    let length = 1;
    let node = this.head;
    while (node.next) {
      length++;
      node = node.next;
    }

    return length;
  }

  at(index: number): Node {
    if (!this.head) {
      throw new Error("index out of bounds");
    }
    let count = 0;
    let node: Node | null = this.head;
    while (node) {
      if (count === index) {
        return node;
      }
      count++;
      node = node.next;
    }
    throw new Error("index out of bounds");
  }

  compare(lIndex: number, rIndex: number): boolean {
    if (!this.head) {
      throw new Error("List is Empty");
    }
    return this.at(lIndex).data > this.at(rIndex).data;
  }

  swap(lIndex: number, rIndex: number): void {
    const lNode = this.at(lIndex);
    const rNode = this.at(rIndex);

    const lHand = lNode.data;
    lNode.data = rNode.data;
    rNode.data = lHand;
  }

  print(): void {
    if (!this.head) {
      return;
    }

    let node: Node | null = this.head;
    while (node) {
      console.log(node.data);
      node = node.next;
    }
  }
}
