import axios from "axios";

import { User, Area, UserResponse } from './types';

// set axios params

axios.defaults.withCredentials = true;
const url = "http://localhost:8000";

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
        "Your signup has been taken into account " +
          res.data.username +
          ". Please signin now."
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
      alert("Signed in ! Welcome back " + res.data.username);
    })
    .catch((error) => {
      getError(error);
    })
  return id;
}

export async function updateUser(id : string, email : string) {
  let new_email = "";

  await axios
    .patch(url + "/users/me" + id, email)
    .then((res) => {
      console.log(res);
      new_email = res.data.email;
      alert("User " + email + " has been updated with email " + new_email);
    })
    .catch((error) => {
      getError(error);
    })
  return new_email;
}

export async function signout() {
  await axios
    .post(url + "/users/me/signout")
    .then((res) => {
      console.log(res);
      alert("Successfully signed out.");
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}

export async function deleteAccount() {
  await axios
    .delete(url + "/users/me")
    .then((res) => {
      console.log(res);
      alert("Your account has been successfully deleted.");
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
    })
    .catch((error) => {
      getError(error);
    })
  return users;
}

export async function getUser(id : string) {
  let user : UserResponse = { id : "", email : "", password : "", username: "" };

  await axios
    .get(url + "/users/" + id)
    .then((res) => {
      console.log(res);
      user.email = res.data.email;
      alert("User " + res.data.email + " has been found.");
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
    .get(url + "/users/me/services")
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        services.push(element);
      }
    })
    .catch((error) => {
      getError(error);
    })
  return services;
}

export async function getService(serviceId : string) {
  let serviceLog : boolean = false;

  await axios
    .get(url + "/users/me/services" + serviceId)
    .then((res) => {
      console.log(res);
      serviceLog = res.data.isLog;
    })
    .catch((error) => {
      getError(error);
    })
  return serviceLog;
}

export async function logToService(token: string, serviceId : string) {
  let serviceLog : boolean = false;

  await axios
    .post(url + "/users/me/services" + serviceId, token)
    .then((res) => {
      console.log(res);
      serviceLog = res.data.isLog;
      alert("You successfully logged in to " + res.data.name + ".");
    })
    .catch((error) => {
      getError(error);
    })
  return serviceLog;
}

export async function updateTokenService(token: string, serviceId : string) {
  let serviceLog : boolean = false;

  await axios
    .patch(url + "/users/me/services" + serviceId, token)
    .then((res) => {
      console.log(res);
      serviceLog = res.data.isLog;
      alert("You successfully updated your credentials for the service " + res.data.name + ".");
    })
    .catch((error) => {
      getError(error);
    })
  return serviceLog;
}

export async function disconnectService(serviceId : string) {
  await axios
    .delete(url + "/users/me/services/" + serviceId)
    .then((res) => {
      console.log(res);
      alert("Your credentials for this service has been successfully deleted.");
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
    .get(url + "/users/me/actions")
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        actions.push(element);
      }
    })
    .catch((error) => {
      getError(error);
    })
  return actions;
}

export async function getAction(actionId : string) {
  let action : any;

  await axios
    .get(url + "/users/me/actions" + actionId)
    .then((res) => {
      console.log(res);
      action = res.data.config;
      alert("The action " + res.data.name + " has been found.");
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
    .get(url + "/users/me/reactions")
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        reactions.push(element);
      }
    })
    .catch((error) => {
      getError(error);
    })
  return reactions;
}

export async function getReaction(reactionId : string) {
  let reaction : any;

  await axios
    .get(url + "/users/me/reactions" + reactionId)
    .then((res) => {
      console.log(res);
      reaction = res.data.config;
      alert("The reaction " + res.data.name + " has been found.");
    })
    .catch((error) => {
      getError(error);
    })
  return reaction;
}

// areas

export async function getAreas() {
  let areas : Array<string> = [];

  await axios
    .get(url + "/users/me/areas")
    .then((res) => {
      console.log(res);
      for (let i = 0; i < res.data.length; i++) {
        const element = res.data[i].name;
        areas.push(element);
      }
    })
    .catch((error) => {
      getError(error);
    })
  return areas;
}

export async function getArea(areaId : string) {
  let area : Area = { name : "", actionName : "", actionConfig : {}, reactionName : "", reactionConfig : {} };

  await axios
    .get(url + "/users/me/areas" + areaId)
    .then((res) => {
      console.log(res);
      area.name = res.data.name;
      area.actionName = res.data.actionName;
      area.actionConfig = res.data.actionConfig;
      area.reactionName = res.data.reactionName;
      area.reactionConfig = res.data.reactionConfig;
      alert("The area " + res.data.name + " has been found.");
    })
    .catch((error) => {
      getError(error);
    })
  return area;
}


export async function createArea(params : Area) {
  await axios
    .post(url + "/users/me/areas", params)
    .then((res) => {
      console.log(res);
      alert("Area " + params.name + " has been created.");
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}

export async function updateArea(params: Area, areaId : string) {
  await axios
    .patch(url + "/users/me/areas" + areaId, params)
    .then((res) => {
      console.log(res);
      alert("Area " + params.name + " has been updated.");
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}

export async function deleteArea(areaId : string) {
  await axios
    .delete(url + "/users/me/areas/" + areaId)
    .then((res) => {
      console.log(res);
      alert("This Area has been deleted.");
    })
    .catch((error) => {
      getError(error);
    })
  return 0;
}
