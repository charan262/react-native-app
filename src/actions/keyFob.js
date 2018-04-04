import axios from 'axios';
import { BASE_URL, KEY_FOB, KEY_FOB_FAILED, KEY_FOB_IN_PROGRESS } from "./constants";

const keyFobSuccessful = payload => (
  {
    type: KEY_FOB,
    payload,
  }
);

const keyFobFailed = payload => (
  {
    type: KEY_FOB_FAILED,
    payload,
  }
);

const keyFobInProgress = payload => (
  {
    type: KEY_FOB_IN_PROGRESS,
    payload,
  }
);

const pollForKeyFobResponse = async (dispatch, toggleType) => {
  let value = null;
  try {
    value = await
      axios(
        {
          url: `${BASE_URL}/keyfob?type=${toggleType}`,
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Authorization': 'access_token',
          }
        }
      );
  } catch (error) {
    console.error(error);
  } finally {
    console.log(value.data.status);
    dispatch(keyFobSuccessful(value.data.status));
    if (value != null && value.data != null && value.data.status != null && value.data.status !== "complete") {
      pollForKeyFobResponse(dispatch, toggleType);
    }
  }
};

export const notifyKeyFobPress = toggleType => async dispatch => {
  dispatch(keyFobFailed(false));
  dispatch(keyFobInProgress(true));

  let response = await  axios(
    {
      url: `${BASE_URL}/keyfob`,
      method: 'POST',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'application/json',
        'Authorization': 'access_token',
      },
      data: JSON.stringify({
        type: toggleType
      }),
    }
  );
  await pollForKeyFobResponse(dispatch, toggleType);
  dispatch(keyFobInProgress(false));
  dispatch(keyFobFailed(true));
  dispatch(keyFobSuccessful(''));
};