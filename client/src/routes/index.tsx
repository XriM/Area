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
import { TrelloSignin } from "../helper/services/trello";
import { GithubSignin } from "../helper/services/github";
import { RedditSignin } from "../helper/services/reddit";
import { YoutubeSignin } from "../helper/services/youtube";
import { OutlookSignin } from "../helper/services/outlook";
import { OneDriveSignin } from "../helper/services/onedrive";

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

  TrelloSignin,
  GithubSignin,
  RedditSignin,
  YoutubeSignin,
  OutlookSignin,
  OneDriveSignin
};
