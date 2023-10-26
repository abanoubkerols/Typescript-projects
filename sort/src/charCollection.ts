import { Sorter } from "./sorter";

export class CharacterCollection extends Sorter {
  constructor(public data: string) {
    super()
  }

  get length(): number {
    return this.data.length;
  }

  compare(lIndex: number, rIndex: number): boolean {
    return this.data[lIndex].toLowerCase() > this.data[rIndex].toLowerCase();
  }

  swap(lIndex: number, rIndex: number): void {
    const char = this.data.split("");
    const lHand = char[lIndex];
    char[lIndex] = char[rIndex];
    char[rIndex] = lHand;

    this.data  = char.join('')
  }
}
