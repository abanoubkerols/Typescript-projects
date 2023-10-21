import { Project, ProjectStatus } from './../models/project-model';

    // state Management
type Listener<T> = (items: T[]) => void;

export class State<T> {
  protected listeners: Listener<T>[] = [];

  addListeners(listenersFn: Listener<T>) {
    this.listeners.push(listenersFn); 
  }
}

export class ProjectState extends State<Project> {
  private project: Project[] = [];
  private static instance: ProjectState;
  private constructor() {
    super();
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ProjectState();
    return this.instance;
  }

  addProject(title: string, desc: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      desc,
      numOfPeople,
      ProjectStatus.Active
    );

    this.project.push(newProject);
    this.updateListen();
  }

  moveProject(id: string, newStatus: ProjectStatus) {
    const pro = this.project.find((proId) => proId.id === id);
    if (pro && pro.status !== newStatus) {
      pro.status = newStatus;
      this.updateListen();
    }
  }

  private updateListen() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.project.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();

