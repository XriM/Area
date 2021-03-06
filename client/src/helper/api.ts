import axios from "axios";

import { User, UserResponse } from './types';

// set axios params

axios.defaults.withCredentials = true;
const url = "http://localhost:8080";

function getError(error : any) {
  let message : string = "";

  if (error.response) {
    if (error.response.status === 498) {
      message = ": Please signin to access this content."
    }
    alert(
      "An error of type " + error.response.status + " occured " + message
    );
  }
}

// server test

export async function ping() {
  await axios
    .get(url)
    .then((res) => {
      console.log(res);
      alert(
        "Server up."
      );
    })
    .catch((error) => {
      getError(error);
    })
  return;
}

// user management

export async function signup(email: string, password: string, username: string) {
  const params : User = {
    email: email,
    password: password,
    username : username,
  };
  let signup = false;

  await axios
    .post(url + "/users/signup", params)
    .then((res) => {
      console.log(res);
      alert(
        res.data.message
      );
      signup = true;
    })
    .catch((error) => {
      getError(error);
    })
  return signup;
}

export async function signin(email: string, password: string) {
  const params : { email: string, password: string } = {
    email: email,
    password: password,
  };
  let id = "";

  await axios
    .post(url + "/users/login", params)
    .then((res) => {
      console.log(res.data);
      id = res.data.id;
      window.sessionStorage.setItem("username", res.data.user);
      window.sessionStorage.setItem("token", res.data.token);
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return id;
}

export async function google_signin(tokenId: string) {
  const param = {
    id_token: tokenId
  }
  let signedIn: boolean = false;

  await axios
  .post("http://localhost:8080/users/google_login", param)
  .then((res) => {
    console.log(res);
    alert(
      res.data.message
    );
    window.sessionStorage.setItem("username", res.data.user);
    window.sessionStorage.setItem("token", res.data.token);
    signedIn = true;
  })
  .catch((error) => {
    getError(error);
  })
  return signedIn;
}

export async function updateUser(email : string) {
  let new_email = "";
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .patch(url + "/users/" + usernameLogged, email, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      new_email = res.data.email;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return new_email;
}

export async function signout() {
  window.sessionStorage.clear();

  return 0;
}

// get user information

export async function getUsers() {
  let users : Array<string> = [];
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].username;
        users.push(element);
      }
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return users;
}

export async function getUser() {
  let user : UserResponse = { id : "", email : "", password : "", username: "" };
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      user.email = res.data.email;
      user.password = res.data.password;
      user.username = res.data.username;
      user.id = res.data.id;
    })
    .catch((error) => {
      getError(error);
    })
  return user;
}

// services

export async function getServices() {
  let services : Array<string> = [];
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/services", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        services.push(element);
      }
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return services;
}

export async function getService(serviceId : string) {
  let serviceLog : boolean = false;
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/services" + serviceId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      serviceLog = res.data.isLog;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return serviceLog;
}

export async function logToService(token: string, serviceId : string) {
  let serviceLog : string = "";
  let usernameLogged = window.sessionStorage.getItem("username");
  let accessToken = window.sessionStorage.getItem("token");
  const params = {
    token: token,
  };

  await axios
    .post(url + "/users/" + usernameLogged + "/services/" + serviceId, params, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
    .then((res) => {
      console.log(res);
      serviceLog = "Service token successfully loaded";
    })
    .catch((error) => {
      getError(error);
    })
  return serviceLog;
}

export async function updateTokenService(token: string, serviceId : string) {
  let serviceLog : boolean = false;
  let usernameLogged = window.sessionStorage.getItem("username");
  let accessToken = window.sessionStorage.getItem("token");

  await axios
    .patch(url + "/users/" + usernameLogged + "/services" + serviceId, token, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      serviceLog = res.data.isLog;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return serviceLog;
}

export async function disconnectService(serviceId : string) {
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .delete(url + "/users/" + usernameLogged + "/services/" + serviceId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}

// actions

export async function getActions() {
  let actions : Array<string> = [];
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/actions", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        actions.push(element);
      }
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return actions;
}

export async function getAction(actionId : string) {
  let action : any;
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/actions" + actionId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      action = res.data.config;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return action;
}

// reactions

export async function getReactions() {
  let reactions : Array<string> = [];
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/reactions", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        reactions.push(element);
      }
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return reactions;
}

export async function getReaction(reactionId : string) {
  let reaction : any;
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/reactions" + reactionId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      reaction = res.data.config;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return reaction;
}

// areas

export async function getAreas() {
  let areas : { id: string[], name: string[], action: string [], reaction: string [] } = { id : [], name : [], action : [], reaction : [] };
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/areas", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.areas.length; i++) {
        areas.id.push(res.data.areas[i].id);
        areas.name.push(res.data.areas[i].name);
        areas.action.push(res.data.areas[i].action.name);
        areas.reaction.push(res.data.areas[i].reaction.name);
      }
    })
    .catch((error) => {
      getError(error);
    })
  return areas;
}

export async function getArea(areaId : string) {
  let area : { id : string, name : string, action : string, reaction : string } = { id: "", name : "", action : "", reaction : "" };
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .get(url + "/users/" + usernameLogged + "/areas" + areaId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      area.id = res.data.areas.id;
      area.name = res.data.areas.name;
      area.action = res.data.areas.action.name;
      area.reaction = res.data.areas.reaction.name;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return area;
}


export async function createArea(params : any, name : string, device : string, actionId : string, reactionId : string) {
  const config = {
    action_id: actionId,
    reaction_id: reactionId,
    name: name,
    device: device,
    config: params
  }
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .post(url + "/users/" + usernameLogged + "/areas", config, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}

export async function updateArea(params: { id : string, name : string, action : string, reaction : string }, areaId : string) {
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");

  await axios
    .patch(url + "/users/" + usernameLogged + "/areas" + areaId, params, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}

export async function deleteArea(areaId : string) {
  let usernameLogged = window.sessionStorage.getItem("username");
  let token = window.sessionStorage.getItem("token");
  let finalId : number = +areaId;

  await axios
    .delete(url + "/users/" + usernameLogged + "/areas/" + finalId, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then((res) => {
      console.log(res);
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}
