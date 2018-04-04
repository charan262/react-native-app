import axios from 'axios';
import { BASE_URL, MANUAL, MANUAL_FAILED, MANUAL_IN_PROGRESS } from "./constants";

const manualSuccessful = payload => (
  {
    type: MANUAL,
    payload,
  }
);

const manualFailed = payload => (
  {
    type: MANUAL_FAILED,
    payload,
  }
);

const manualInProgress = payload => (
  {
    type: MANUAL_IN_PROGRESS,
    payload,
  }
);

export const manual = () => dispatch => {
  dispatch(manualFailed(false));
  dispatch(manualInProgress(true));

  axios(
    {
      url: `${BASE_URL}/manual/index.json`,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    }
  )
    .then(response => response.data)
    .then(data => {
      dispatch(manualSuccessful(data));
      dispatch(manualInProgress(false));
    })
    .catch((error) => {
      dispatch(manualInProgress(false));
      dispatch(manualFailed(true));
      dispatch(manualSuccessful([]));
      console.error(error);
    });
};
