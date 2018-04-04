import axios from 'axios';
import { AUTH, AUTH_FAILED, AUTH_IN_PROGRESS, BASE_URL } from "./constants";

export const authSuccessful = payload => (
  {
    type: AUTH,
    payload,
  }
);

const authFailed = payload => (
  {
    type: AUTH_FAILED,
    payload,
  }
);

const authInProgress = payload => (
  {
    type: AUTH_IN_PROGRESS,
    payload,
  }
);

export const login = (client_id, username, password) => dispatch => {
  dispatch(authFailed(false));
  dispatch(authInProgress(true));

  axios(
    {
      url: `${BASE_URL}/login`,
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain',
      },
      data: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnRfaWQiOiJjbGllbnRfaWQiLCJ1c2VybmFtZSI6InVzZXJuYW1lIiwicGFzc3dvcmQiOiJwYXNzd29yZCJ9.Apw1vCdXsn5pvle-jIsjvf5i-NOW2bGp3BfuPR-gZWc',
    }
  )
    .then(response => response.data)
    .then(data => {
      dispatch(authSuccessful(data));
      dispatch(authInProgress(false));
    })
    .catch((error) => {
      dispatch(authInProgress(false));
      dispatch(authFailed(true));
      dispatch(authSuccessful(''));
      console.error(error);
    });
};

export const logout = () => dispatch => {
  dispatch(authFailed(false));
  dispatch(authInProgress(true));
  dispatch(authSuccessful(''));
  dispatch(authInProgress(false));
};
