import { create } from "zustand";
import { currentUser } from "../constants/currentUser";
import { UserRoles } from "../constants/enums";
import { User } from "../types";

type UserState = {
  user: User;
  isAdmin: boolean;
};

export const useUserStore = create<UserState>(() => ({
  user: currentUser,
  isAdmin: currentUser.role === UserRoles.ADMIN,
}));
