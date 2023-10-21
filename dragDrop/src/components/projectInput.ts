
import { autoBind } from "../decorators/autoBind";
import { projectState } from "../state/projectStateManagement";
import { validate , Validation } from "../util/validation";
import { Component  } from "./baseComponent";



      // project Input class
export  class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInPutElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInPutElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInPutElement = this.element.querySelector(
        "#title"
      ) as HTMLInputElement;
      this.descInputElement = this.element.querySelector(
        "#description"
      ) as HTMLInputElement;
      this.peopleInPutElement = this.element.querySelector(
        "#people"
      ) as HTMLInputElement;

      this.config();
    }
    renderContent() {}

    private getUserInput(): [string, string, number] | void {
      const enteredTitle = this.titleInPutElement.value;
      const enteredDesc = this.descInputElement.value;
      const enteredPeople = this.peopleInPutElement.value;

      const titleValidate: Validation = {
        value: enteredTitle,
        require: true,
      };
      const descriptionValidation: Validation = {
        value: enteredDesc,
        require: true,
        minLength: 5,
      };
      const peopleValidation: Validation = {
        value: +enteredPeople,
        require: true,
        min: 1,
        max: 5,
      };

      if (
        !validate(titleValidate) ||
        !validate(descriptionValidation) ||
        !validate(peopleValidation)
      ) {
        alert("invalid input , plz try Again");
        return;
      } else {
        return [enteredTitle, enteredDesc, +enteredPeople];
      }
    }

    private clrInputs() {
      this.titleInPutElement.value = "";
      this.descInputElement.value = "";
      this.peopleInPutElement.value = "";
    }

    @autoBind
    private submitHandler(e: Event) {
      e.preventDefault();
      const userInput = this.getUserInput();
      if (Array.isArray(userInput)) {
        const [title, desc, people] = userInput;
        console.log(title, desc, people);
        projectState.addProject(title, desc, people);
        this.clrInputs();
      }
    }

    config() {
      this.element.addEventListener("submit", this.submitHandler);
    }
  }
