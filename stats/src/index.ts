import { MatchReader } from './matchReader';

import { Summary } from './summary';


// const matches = fs
//   .readFileSync("football.csv", {
//     encoding: "utf-8",
//   })
//   .split("\n")
//   .map((row: string): string[] => {
//     return row.split(",");
//   });

const matchReader =  MatchReader.fromCsv('football.csv')
matchReader.load()

const summary =  Summary.winsAnalysisWithHtmlReport('man United')
summary.buildAndPrintReport(matchReader.matches)



 
