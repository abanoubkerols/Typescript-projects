import { dateStringToDate } from "./utils";
import { MatchRes } from "./matchRes";
import { MatchData } from "./matchDate";
import { CsvReader } from "./CsvFileReader";


interface DataReader {
  read(): void;
  data: string[][];
}

export class MatchReader {
  matches: MatchData[] = [];
  constructor(public reader: DataReader) {}

  static fromCsv(filename :string):MatchReader{
    return new MatchReader(new CsvReader(filename))
  }

  load(): void {
    this.reader.read();
    this.matches = this.reader.data.map((row: string[]): MatchData => {
      return [
        dateStringToDate(row[0]),
        row[1],
        row[2],
        parseInt(row[3]),
        parseInt(row[4]),
        row[5] as MatchRes,
        row[6],
      ];
    });
  }
}
