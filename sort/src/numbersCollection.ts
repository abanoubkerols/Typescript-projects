import { Sorter } from "./sorter";



export class NumbersCollection extends Sorter {
  constructor(public data: number[]) {
    super()
  }
  
 

  compare(lIndex: number, rIndex: number): boolean {
    return this.data[lIndex] > this.data[rIndex];
  }

  swap(lIndex: number, rIndex: number): void {
    const lHand = this.data[lIndex];
    this.data[lIndex] = this.data[rIndex];
    this.data[rIndex] = lHand;
  }

  get length(): number {
    return this.data.length;
  }
}
