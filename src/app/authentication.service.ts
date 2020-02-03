import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor() {}
  setToken(UserName, token) {
    sessionStorage.setItem("username", UserName);
    sessionStorage.setItem("token", token);
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem("username");
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
}
