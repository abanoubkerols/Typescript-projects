
      //class Component
  export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.templateElement = <HTMLTemplateElement>(
        document.getElementById(templateId)!
      );
      this.hostElement = document.getElementById(hostElementId) as T;

      const importedNode = document.importNode(
        this.templateElement.content,
        true
      );
      this.element = importedNode.firstElementChild as U;
      if (newElementId) {
        this.element.id = newElementId;
      }
      this.attach(insertAtStart);
    }

    private attach(insert: boolean) {
      this.hostElement.insertAdjacentElement(
        insert ? "afterbegin" : "beforeend",
        this.element
      );
    }

    abstract config(): void;
    abstract renderContent(): void;
  }
