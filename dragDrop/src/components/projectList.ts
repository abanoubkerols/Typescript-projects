import { ProjectItem } from './projectItem';

import { DragTarget }from '../models/dragDropInterface'
import { autoBind } from "../decorators/autoBind";
import { Project  ,ProjectStatus} from "../models/project-model";
import { Component  } from "./baseComponent";
import { projectState } from '../state/projectStateManagement';



      // project list class
 export class ProjectList
  extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget
{
  assignedProject!: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`);

    this.assignedProject = [];

    this.config();
    this.renderContent();
  }

  @autoBind
  dragOverHandler(e: DragEvent): void {
    if (e.dataTransfer && e.dataTransfer.types[0] === "text/plain") {
      e.preventDefault();
    }
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.add("droppable");
  }
  @autoBind
  dropHandler(e: DragEvent): void {
    const proId = e.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      proId,
      this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @autoBind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;
    listEl.innerHTML = "";
    for (const proItem of this.assignedProject) {
      new ProjectItem(this.element.querySelector("ul")!.id, proItem);
    }
  }

  config() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.addListeners((projects: Project[]) => {
      const releventPro = projects.filter((pro) => {
        if (this.type === "active") {
          return pro.status === ProjectStatus.Active;
        }
        return pro.status === ProjectStatus.Finished;
      });
      this.assignedProject = releventPro;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }
}
