import { Eventing } from "./eventing";
import { Attribute } from "./attribute";
import { Model } from "./model";
import { ApiSync } from "./ApiSync";
import { Collection } from "./collection";

export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

const rootUrl = "http://localhost:3000/users";

export class User extends Model<UserProps> {
  static buildUser(attr: UserProps): User {
    return new User(
      new Attribute<UserProps>(attr),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  static buildUserColl(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  setRandomAge() :void{
    const age = Math.round(Math.random() * 100)
    this.set({age })
    
  }
}
