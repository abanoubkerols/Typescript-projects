import { CsvReader } from "./CsvFileReader";
import { MatchRes } from "../matchRes";
import { dateStringToDate } from "../utils";
type MatchData = [Date, string, string, number, number, MatchRes, string];


export class MatchReader extends CsvReader<MatchData>{
    mapRow(row :string[]) :MatchData {
        return [
            dateStringToDate(row[0]),
            row[1],
            row[2],
            parseInt(row[3]),
            parseInt(row[4]),
            row[5] as MatchRes,
            row[6],
          ];
    }
}

