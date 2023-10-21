import { Draggable } from './../models/dragDropInterface';
import { autoBind } from "../decorators/autoBind";
import { Project } from "../models/project-model";
import { Component  } from "./baseComponent";


      //project Item class
 export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  private project: Project;

  get persons() {
    if (this.project.people === 1) {
      return " 1 Person";
    } else {
      return ` ${this.project.people} Persons`;
    }
  }
  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;

    this.config();
    this.renderContent();
  }

  @autoBind
  dragStartHandler(e: DragEvent): void {
    e.dataTransfer!.setData("text/plain", this.project.id);
    e.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_: DragEvent): void {}

  config(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent =
      this.persons + " assigned";
    this.element.querySelector("p")!.textContent = this.project.desc;
  }
}
