import { KEY_FOB, KEY_FOB_FAILED, KEY_FOB_IN_PROGRESS } from "../actions/constants";

export function keyFob(state = '', action) {
  switch (action.type) {
    case KEY_FOB:
      return action.payload;
    default:
      return state;
  }
}

export function keyFobFailed(state = false, action) {
  switch (action.type) {
    case KEY_FOB_FAILED:
      return action.payload;
    default:
      return state;
  }
}

export function keyFobInProgress(state = false, action) {
  switch (action.type) {
    case KEY_FOB_IN_PROGRESS:
      return action.payload;
    default:
      return state;
  }
}