import fs from "fs";
import { MatchRes } from "../matchRes";

type MatchData = [Date, string, string, number, number, MatchRes, string];

export abstract class CsvReader<T> {
  data: T[] = [];

  constructor(public fileName: string) {}
  abstract mapRow(row: string[]): T;

  read(): void {
    this.data = fs
      .readFileSync(this.fileName, {
        encoding: "utf-8",
      })
      .split("\n")
      .map((row: string): string[] => {
        return row.split(",");
      })
      .map(this.mapRow);
  }

}
