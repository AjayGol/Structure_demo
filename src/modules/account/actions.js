import {
  SET_SAFE_AREA_INTENT,
  RESET_STORE,
  API_WAITING_TIME,
  START_LOADING,
  SET_USER_DETAIL,
  CUSTOM_POPUP,
  EVENT_DATA,
} from './constant';
import BackgroundTimer from 'react-native-background-timer';
import {
  myPortfoliosList,
  iFollowPortfoliosList,
  myFollowerList,
  paginationBestPortfoliosList,
  getAnalytics,
  getmyPortfoliosList,
} from '../home/actions';
import {
  changeIndexAction,
  changeQuantityAction,
  fillOrdersListAction,
} from '../orders/actions';
import { fillWatchlistsDataAction } from '../watchlist/actions';
import {
  getAllNotifications,
  getTradeNotifications,
} from '../notification/actions';
import { getWebTrader } from '../home/actions';

import constant from '../../helper/constant';
import {
  requestCodeService,
  verifyCodeService,
  signUpService,
  requestCodeSignInService,
  signInWithPasswordService,
  verifyCodeSignInService,
  requestCodeResetPasswordService,
  verifyCodeAccountRecoveryService,
  resetPasswordService,
  userDetailService,
  updateUserInfo,
  userChangePasswordService,
  userChangePhoneService,
  twitterService,
  saveTwitterService,
  redeemCoinService,
  setDeviceTokenService,
  removeDeviceTokenService,
} from './services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { initStateAccount } from './reducer';
import { initStateHome } from '../home/reducer';
import { initStateSearch } from '../search/reducer';
import { initStateBroker } from '../broker/reducer';
import { initStateWatchlist } from '../watchlist/reducer';
import { initStateNotification } from '../notification/reducer';
import { initStateOrders } from '../orders/reducer';
import { initStateBuyAsset } from '../buy-assets/reducer';

export const appDefaultReducer = {
  account: initStateAccount,
  home: initStateHome,
  orders: initStateOrders,
  search: initStateSearch,
  broker: initStateBroker,
  watchlist: initStateWatchlist,
  buyAsset: initStateBuyAsset,
  notification: initStateNotification,
};

/**
 * Request SignUp otp
 */
export const requestCode = phoneNumber => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return requestCodeService(phoneNumber)
      .then(response => {
        dispatch(setLoader(false));
        dispatch(manageValidationTimer(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Request SignIn otp
 */
export const requestSignInCode = (phoneNumber, type) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return requestCodeSignInService(phoneNumber, type)
      .then(response => {
        dispatch(setLoader(false));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Send opt in SignIn
 */
export const requestSignInPassword = (phoneNumber, password) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return signInWithPasswordService(phoneNumber, password)
      .then(response => {
        if (response.code === 200) {
          let user = {
            token: response.headers.get('user-access-token'),
          };
          AsyncStorage.setItem('user', JSON.stringify(user));
          return dispatch(loadAppData(true));
        } else {
          dispatch(setLoader(false));
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Verify SignUp otp
 */
export const checkOTP = (phoneNumber, otp) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return verifyCodeService(phoneNumber, otp)
      .then(response => {
        dispatch(setLoader(false));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Verify SignIn otp
 */
export const checkOTPSignIn = (phoneNumber, otp) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return verifyCodeSignInService(phoneNumber, otp)
      .then(response => {
        if (response.code === 200) {
          let user = {
            token: response.headers.get('user-access-token'),
          };
          AsyncStorage.setItem('user', JSON.stringify(user));
          return dispatch(loadAppData(true));
        } else {
          dispatch(setLoader(false));
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Final SignUp API - Send mobile number and name
 */
export const signUp = (obj, header) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return signUpService(obj, header)
      .then(response => {
        // dispatch(setLoader(false));
        if (response.code === 200) {
          let user = {
            token: response.headers.get('user-access-token'),
          };
          AsyncStorage.setItem('user', JSON.stringify(user));
          return dispatch(loadAppData(true));
        } else {
          dispatch(setLoader(false));
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Final SignUp API - Send mobile number and name
 */
export const requestResetPasswordOTP = phoneNumber => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return requestCodeResetPasswordService(phoneNumber)
      .then(response => {
        dispatch(setLoader(false));
        dispatch(manageValidationTimer(response));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Verify SignIn otp
 */
export const checkOTPAccountRecovery = (phoneNumber, otp) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return verifyCodeAccountRecoveryService(phoneNumber, otp)
      .then(response => {
        dispatch(setLoader(false));
        return Promise.resolve(response);
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Account recovery - Reset Password
 */
export const resetPassword = (obj, header, phone) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return resetPasswordService(obj, header)
      .then(response => {
        if (response.code === 200) {
          return dispatch(requestSignInPassword(phone, obj.password));
        } else {
          dispatch(setLoader(false));
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

export const changePassword = obj => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return userChangePasswordService(obj)
      .then(response => {
        dispatch(setLoader(false));
        if (response.code === 200) {
          return dispatch(loadAppData(true));
        } else {
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

export const changePhoneNumber = (obj, header) => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return userChangePhoneService(obj, header)
      .then(response => {
        dispatch(setLoader(false));
        if (response.code === 200) {
          return dispatch(loadAppData(true));
        } else {
          return Promise.resolve(response);
        }
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Get app data
 */
export const loadAppData = () => {
  return (dispatch, getState) => {
    return Promise.all([dispatch(getUserData()), dispatch(getAnalytics())])
      .then(res => {
        dispatch({
          type: START_LOADING,
          payload: false,
        });
        dispatch(paginationBestPortfoliosList(false, 0, constant.pagination));
        // dispatch(myPortfoliosList());
        dispatch(iFollowPortfoliosList());
        dispatch(myFollowerList());
        dispatch(fillWatchlistsDataAction(0));
        dispatch(fillOrdersListAction());
        dispatch(getAllNotifications(false, 0, 10));
        dispatch(getTradeNotifications(false, 0, 10));
        dispatch(getWebTrader());
        dispatch(getmyPortfoliosList());
        dispatch(changeIndexAction(null));
        dispatch(changeQuantityAction(null));
        return Promise.resolve(true);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const getUserData = (userData = null, isFromInitial = false) => {
  return (dispatch, getState) => {
    return userDetailService()
      .then(response => {
        return dispatch({
          type: SET_USER_DETAIL,
          payload: response.trader || {},
          payloadAll: response || {},
        });
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

export const updateUserProfile = data => {
  return (dispatch, getState) => {
    dispatch(setLoader(true));
    return updateUserInfo(data)
      .then(response => {
        dispatch(setLoader(false));
        // return Promise.resolve(response);
        return dispatch(getUserData());
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Twitter Credentials
 */
export const twitterCredentials = () => {
  return (dispatch, getState) => {
    return twitterService()
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * Save twitter Credentials
 */
export const saveTwitterCredentials = obj => {
  return (dispatch, getState) => {
    return saveTwitterService(obj)
      .then(response => {
        // return Promise.resolve(response);
        return dispatch(getUserData());
      })
      .catch(error => {
        return Promise.reject(error);
      });
  };
};

/**
 * Manage service timer
 */
export const manageValidationTimer = response => {
  return (dispatch, getState) => {
    if (response.result && response.result.delay) {
      //Reset timer if found already.
      if (global.singUpResendTimer) {
        BackgroundTimer.clearInterval(global.singUpResendTimer);
      }

      //Set current time.
      dispatch({
        type: API_WAITING_TIME,
        payload: (response.result && response.result.delay) || 0,
      });

      //Setup background timer.
      global.singUpResendTimer = BackgroundTimer.setInterval(() => {
        if (getState().account.apiWaitingTime <= 1) {
          BackgroundTimer.clearInterval(global.singUpResendTimer);
        }
        return dispatch({
          type: API_WAITING_TIME,
          payload: parseInt(getState().account.apiWaitingTime, 10) - 1,
        });
      }, 1000);
    }
  };
};

/**
 * Update user object
 */
export const setUserUpdate = userObj => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_USER_DETAIL,
      payload: userObj,
    });
  };
};

/**
 * Manage SafeArea
 */
export const setSafeAreaIntent = data => {
  return (dispatch, getState) => {
    if (constant.isIOS) {
      return dispatch({
        type: SET_SAFE_AREA_INTENT,
        payload: data,
      });
    }
  };
};

/**
 * Reset redux store when SignIn
 */
export const resetStoreData = () => {
  return (dispatch, getState) => {
    appDefaultReducer.account.safeAreaInsetsData =
      getState().account.safeAreaInsetsDefault;
    appDefaultReducer.account.safeAreaInsetsDefault =
      getState().account.safeAreaInsetsDefault;
    global.isPurchase = false;
    return dispatch({
      type: RESET_STORE,
      payload: appDefaultReducer,
    });
  };
};

/**
 * User update when SignIn/SingUp
 */
export const setUserDetail = (objUser, allUserDetail) => {
  return (dispatch, getState) => {
    AsyncStorage.setItem('user', JSON.stringify(objUser));

    return dispatch({
      type: SET_USER_DETAIL,
      payload: allUserDetail,
    });
  };
};

/**
 * Button indicator
 */
export const setLoader = value => {
  return (dispatch, getState) => {
    dispatch({
      type: START_LOADING,
      payload: value,
    });
  };
};

/**
 * Reset value server timer
 */
export const resetServerTimer = value => {
  return (dispatch, getState) => {
    dispatch({
      type: API_WAITING_TIME,
      payload: value,
    });
  };
};

/**
 * Custom popup
 */
export const manageCustomPopUp = data => {
  return (dispatch, getState) => {
    return dispatch({
      type: CUSTOM_POPUP,
      payload: data,
    });
  };
};

/**
 * Event data
 */
export const setEventData = userObj => {
  return (dispatch, getState) => {
    dispatch({
      type: EVENT_DATA,
      payload: userObj,
    });
  };
};

/**
 * Redeem Coins
 */
export const redeemCoins = (obj, alertFunc) => {
  return dispatch => {
    dispatch(setLoader(true));
    console.log('hmm');
    return redeemCoinService(obj)
      .then(response => {
        dispatch(setLoader(false));
        console.log(response);
        if (response.code === 200) {
          Promise.resolve(true).then(r =>
            alertFunc(
              'Redeem request received, amount will reflect in your bank ' +
                'account soon',
            ),
          );
        } else {
          Promise.resolve(response).then(r =>
            alertFunc(
              'There was an Error processing your request.' +
                r.result +
                '.Please try again.',
              false,
            ),
          );
        }
      })
      .catch(error => {
        dispatch(setLoader(false));
        return Promise.reject(error);
      });
  };
};

/**
 * Device token set
 */
export const deviceTokenSet = obj => {
  return (dispatch, getState) => {
    return setDeviceTokenService(obj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.resolve(true);
      });
  };
};

/**
 * Device token set
 */
export const deviceTokenRemove = obj => {
  return (dispatch, getState) => {
    return removeDeviceTokenService(obj)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.resolve(true);
      });
  };
};
