import { User, UserProps } from "../models/user";
import { View } from "./view";

export class UserShow extends View<User , UserProps>{
  template(): string {
    return `
      <div class="user-show">
        <h1>User Show</h1>
        <p>Name: ${this.model.get('name')}</p>
        <p>Age: ${this.model.get('age')}</p>
      </div>
    `;
  }
}