import  fs  from 'fs';
import { OutPutTarget } from "../summary";

export class HtmlReport implements OutPutTarget {
  print(report: string): void {
    const html = 
    `<div> 
        <h1> Analysis OutPut</h1>
        <div> ${report}</div> 
     </div`;

     fs.writeFileSync('report.html' , html)
  }
}
