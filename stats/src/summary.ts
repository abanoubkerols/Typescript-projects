import { WinAnalysis } from "./analyzers/WinAnalysis";
import { MatchData } from "./matchDate";
import { HtmlReport } from "./reportTarget/HtmlREport";

export interface Analyzer{
    run(matches :MatchData[]):string

}

export interface OutPutTarget { 
   print(report :string) :void 
}

export class Summary{
    constructor(public analyzer:Analyzer, public outPutTarget:OutPutTarget){}

    static winsAnalysisWithHtmlReport(team :string):Summary{
        return new Summary(new WinAnalysis(team) , new HtmlReport())
    }

    buildAndPrintReport(matches:MatchData[]):void{
        const output = this.analyzer.run(matches)
        this.outPutTarget.print(output)
    }

}