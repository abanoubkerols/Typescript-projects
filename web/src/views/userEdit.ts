import { User, UserProps } from "./../models/user";
import { UserForm } from "./userForm";
import { UserShow } from "./userShow";
import { View } from "./view";

export class UserEdit extends View<User, UserProps> {
  regionsMap(): { [key: string]: string } {
    return {
      userShow: ".user-show",
      userForm: ".user-form"
    };
  }

  onRender(): void {
    const userShow = new UserShow(this.regions.userShow, this.model);
    const usrForm = new UserForm(this.regions.userForm, this.model);
    userShow.render();
    usrForm.render();
  }

  template(): string {
    return `
        <div>
            <div class='user-show'></div>
            <div class='user-form'></div>
        </div>
    
    `;
  }
}
