import axios from "axios";

import { User, Area, UserResponse } from './types';

// set axios params

axios.defaults.withCredentials = true;
const url = "http://localhost:8000";

var usernameLogged = "";

function getError(error : any) {
  if (error.response) {
    console.log(error.response.data.error.message);
    console.log(error.response.status);
    console.log(error.response.headers);
    alert(
      "An error of type " + error.response.status + " occured : " + error.response.data.error.message
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
  let username = "";

  await axios
    .post(url + "/users/signin", params)
    .then((res) => {
      console.log(res);
      id = res.data.id;
      usernameLogged = res.data.username;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return id;
}

export async function updateUser(email : string) {
  let new_email = "";

  await axios
    .patch(url + "/users/" + usernameLogged, email)
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
  await axios
    .post(url + "/users/" + usernameLogged + "/signout")
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

export async function deleteAccount() {
  await axios
    .delete(url + "/users/" + usernameLogged)
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

// get user information

export async function getUsers() {
  let users : Array<string> = [];

  await axios
    .get(url + "/users")
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

  await axios
    .get(url + "/users/")
    .then((res) => {
      console.log(res);
      user.email = res.data.email;
      user.password = res.data.password;
      user.username = res.data.username;
      user.id = res.data.id;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return user;
}

// services

export async function getServices() {
  let services : Array<string> = [];

  await axios
    .get(url + "/users/" + usernameLogged + "/services")
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

  await axios
    .get(url + "/users/" + usernameLogged + "/services" + serviceId)
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
  let serviceLog : boolean = false;

  await axios
    .post(url + "/users/" + usernameLogged + "/services" + serviceId, token)
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

export async function updateTokenService(token: string, serviceId : string) {
  let serviceLog : boolean = false;

  await axios
    .patch(url + "/users/" + usernameLogged + "/services" + serviceId, token)
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
  await axios
    .delete(url + "/users/" + usernameLogged + "/services/" + serviceId)
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

  await axios
    .get(url + "/users/" + usernameLogged + "/actions")
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

  await axios
    .get(url + "/users/" + usernameLogged + "/actions" + actionId)
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

  await axios
    .get(url + "/users/" + usernameLogged + "/reactions")
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

  await axios
    .get(url + "/users/" + usernameLogged + "/reactions" + reactionId)
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
  let areas : Array<Area> = [];

  await axios
    .get(url + "/users/" + usernameLogged + "/areas")
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        areas.push(element);
      }
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return areas;
}

export async function getArea(areaId : string) {
  let area : Area = { id: "", name : "", actionName : "", actionConfig : {}, reactionName : "", reactionConfig : {} };

  await axios
    .get(url + "/users/" + usernameLogged + "/areas" + areaId)
    .then((res) => {
      console.log(res);
      area.id = res.data.id;
      area.name = res.data.name;
      area.actionName = res.data.actionName;
      area.actionConfig = res.data.actionConfig;
      area.reactionName = res.data.reactionName;
      area.reactionConfig = res.data.reactionConfig;
      alert(
        res.data.message
      );
    })
    .catch((error) => {
      getError(error);
    })
  return area;
}


export async function createArea(params : Area) {
  await axios
    .post(url + "/users/" + usernameLogged + "/areas", params)
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

export async function updateArea(params: Area, areaId : string) {
  await axios
    .patch(url + "/users/" + usernameLogged + "/areas" + areaId, params)
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
  await axios
    .delete(url + "/users/" + usernameLogged + "/areas/" + areaId)
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
