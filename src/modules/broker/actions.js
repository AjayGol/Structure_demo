import { ANGEL_URL } from './constant';
import {
  brokerAngelLoginService,
  setAngelTokenService,
  logoutAngelService,
  logoutTwitterService,
  logoutZerodhaService,
} from './services';
import { getUserData } from '../account/actions';

export const getBrokerAngelLogin = uri => {
  return (dispatch, getState) => {
    // dispatch(setLoader(true));
    return brokerAngelLoginService(uri)
      .then(response => {
        // dispatch(setLoader(false));
        return Promise.resolve(response);
      })
      .catch(error => {
        // dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

export const requestSetAngel = (uri, data) => {
  return (dispatch, getState) => {
    return setAngelTokenService(uri, data)
      .then(response => {
        return dispatch(getUserData());
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const logoutAngel = (logout = false) => {
  return (dispatch, getState) => {
    return logoutAngelService()
      .then(response => {
        if (!logout) {
          return dispatch(getUserData());
        }
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const logoutZerodha = (logout = false) => {
  return (dispatch, getState) => {
    return logoutZerodhaService()
      .then(response => {
        if (!logout) {
          return dispatch(getUserData());
        }
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const logoutTwitter = (logout = false) => {
  return (dispatch, getState) => {
    return logoutTwitterService()
      .then(response => {
        if (!logout) {
          return dispatch(getUserData());
        }
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};
