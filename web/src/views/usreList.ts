import { User, UserProps } from "../models/user";
import { CollectionView } from "./collectionView";
import { UserShow } from "./userShow";

export class UserList extends CollectionView<User, UserProps> {
  renderItem(model: User, itemParent: Element): void {
    new UserShow(itemParent, model).render();
  }
}
