import { User, UserProps } from "./models/user";
import { Collection } from "./models/collection";
import { UserList } from "./views/usreList";

const users = new Collection(
  "http://localhost:3000/users",
  (json: UserProps) => {
    return User.buildUser(json);
  }
);

users.on("change", () => {
  const root = document.getElementById("root");
  if (root) {
    new UserList(root, users).render();
  }
});
users.fetch();
