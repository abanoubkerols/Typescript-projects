import { MatchData } from "../matchDate";
import { MatchRes } from "../matchRes";
import { Analyzer } from "./../summary";

export class WinAnalysis implements Analyzer {
  constructor(public team: string) {}

  run(matches: MatchData[]): string {
    let wins = 0;

    for (let match of matches) {
      if (match[1] === "Man United" && match[5] === MatchRes.homeWin) {
        wins++;
      } else if (match[2] === "Man United" && match[5] === MatchRes.awayWin) {
        wins++;
      }
    }

    return `Team ${this.team} won ${wins} games`
  }
}
