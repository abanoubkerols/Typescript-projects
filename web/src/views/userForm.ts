import { User , UserProps } from "../models/user";
import { View } from "./view";


 
export class UserForm extends View<User , UserProps> { 
 

  eventMap(): { [key: string]: () => void } {
    return {
      "click:.set-age": this.onSetAgeClick,
      "click:.set-name": this.onSetNameClick, 
      "click:.save-model": this.onSetSaveClick,
    };
  }

  onSetAgeClick = (): void => {
    this.model.setRandomAge();
  };

  onSetNameClick = ():void=>{
    const input = this.parent.querySelector('input')
    const name =  input?.value
    this.model.set({name})
  }

  onSetSaveClick=():void=>{
    this.model.save()
  }

  template(): string {
    return `
         <div>  
            <input placeholder="${this.model.get('name')}"/>
            <button class="set-name" >Change Name</button>
            <button class="set-age">Set Random Age</button>
            <button class="save-model">Save</button>
        </div>`;
  }


}
