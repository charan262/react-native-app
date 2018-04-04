import { AsyncStorage } from "react-native";
import { AUTH, AUTH_FAILED, AUTH_IN_PROGRESS } from "../actions/constants";

export function auth(state = '', action) {
  switch (action.type) {
    case AUTH:
      AsyncStorage.setItem('@GM:JWT', JSON.stringify(action.payload));
      return action.payload;
    default:
      return state;
  }
}

export function authFailed(state = false, action) {
  switch (action.type) {
    case AUTH_FAILED:
      return action.payload;
    default:
      return state;
  }
}

export function authInProgress(state = false, action) {
  switch (action.type) {
    case AUTH_IN_PROGRESS:
      return action.payload;
    default:
      return state;
  }
}