import axios from "axios";

import { User } from './types';

axios.defaults.withCredentials = true;

async function signup(email: string, password: string) {
  const url = "http://localhost:8000/users/signup";
  const params : User = {
    email: email,
    password: password,
  };
  let signup = false;

  await axios
    .post(url, params, { withCredentials: true })
    .then((res) => {
      console.log(res);
      alert(
        "Votre inscription avec l'email " +
          res.data.email +
          " a bien été prise en compte ! Veuillez vous connecter"
      );
      signup = true;
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(
          "Une erreur " +
            error.response.status +
            " est survenue : " +
            error.response.data.error.message
        );
      }
    });
  return signup;
}

async function signin(email: string, password: string) {
  const url = "http://localhost:8000/users/signin";
  const params : User = {
    email: email,
    password: password,
  };
  let id = "";

  await axios
    .post(url, params, { withCredentials: true })
    .then((res) => {
      console.log(res);
      id = res.data.id;
      alert("Connexion réussie ! Bienvenue " + res.data.email);
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(
          "Une erreur " +
            error.response.status +
            " est survenue : " +
            error.response.data.error.message
        );
      }
    });
  return id;
}

async function signout() {
  const url = "http://localhost:8000/users/signout";

  await axios
    .post(url, { withCredentials: true })
    .then((res) => {
      console.log(res);
      alert("Déconnexion réussie !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(
          "Une erreur " +
            error.response.status +
            " est survenue : " +
            error.response.data.error.message
        );
      }
    });
  return 0;
}

async function deleteAccount() {
  const url = "http://localhost:8000/users/me";

  await axios
    .delete(url, { withCredentials: true })
    .then((res) => {
      console.log(res);
      alert("Votre compte a été supprimé avec succès !");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error.response.data.error.message);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert(
          "Une erreur " +
            error.response.status +
            " est survenue : " +
            error.response.data.error.message
        );
      }
    });
  return 0;
}

export {
  signup,
  signin,
  signout,
  deleteAccount,
};
