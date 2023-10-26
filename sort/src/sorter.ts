import { NumbersCollection } from "./numbersCollection";

interface Sortable {
  length: number;
  compare(lIndex: number, rIndex: number): boolean;
  swap(lIndex: number, rIndex: number): void;
}

export abstract class Sorter {
  abstract compare(lIndex: number, rIndex: number): boolean;
  abstract swap(lIndex: number, rIndex: number): void;
  abstract length :number

  sort(): void {
    const { length } = this;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        if (this.compare(j, j + 1)) {
          this.swap(j, j + 1);
        }
      }
    }
  }
}
