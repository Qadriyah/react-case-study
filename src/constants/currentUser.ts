import { UserRoles } from "./enums";

export const currentUser = {
  name: "Alice",
  role: "admin", // or 'contributor'
};

export const isAdmin = currentUser.role === UserRoles.ADMIN;
