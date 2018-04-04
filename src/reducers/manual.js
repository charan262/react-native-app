import { MANUAL, MANUAL_FAILED, MANUAL_IN_PROGRESS } from "../actions/constants";

export function manual(state = [], action) {
  switch (action.type) {
    case MANUAL:
      return action.payload;
    default:
      return state;
  }
}

export function manualFailed(state = false, action) {
  switch (action.type) {
    case MANUAL_FAILED:
      return action.payload;
    default:
      return state;
  }
}

export function manualInProgress(state = false, action) {
  switch (action.type) {
    case MANUAL_IN_PROGRESS:
      return action.payload;
    default:
      return state;
  }
}