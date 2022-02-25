import { NavbarHome, Body } from "./home/homepage";
import { ShowSignin } from "./home/signin";
import { ShowSignup } from "./home/signup";
import NavbarLogged from "../components/navbar_logged";
import {
  ping,
  signup,
  signin,
  updateUser,
  signout,
  deleteAccount,
  getUsers,
  getUser,
  getServices,
  getService,
  logToService,
  updateTokenService,
  disconnectService,
  getActions,
  getAction,
  getReactions,
  getReaction,
  getAreas,
  getArea,
  createArea,
  updateArea,
  deleteArea
} from "../helper/api";
import { Trello } from "../helper/services/trello";
import { Github } from "../helper/services/github";

export {
  NavbarHome,
  Body,
  ShowSignin,
  ShowSignup,
  NavbarLogged,

  ping,
  signup,
  signin,
  updateUser,
  signout,
  deleteAccount,
  getUsers,
  getUser,
  getServices,
  getService,
  logToService,
  updateTokenService,
  disconnectService,
  getActions,
  getAction,
  getReactions,
  getReaction,
  getAreas,
  getArea,
  createArea,
  updateArea,
  deleteArea,

  Trello,
  Github
};
