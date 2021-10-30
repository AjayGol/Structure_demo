import {
  SET_SAFE_AREA_INTENT,
  API_WAITING_TIME,
  START_LOADING,
  SET_USER_DETAIL,
  CUSTOM_POPUP,
  EVENT_DATA,
  SET_USER_OTHER_DETAIL,
} from './constant';

export const initStateAccount = {
  email: process.env.NODE_ENV === 'development' ? 'ketan@gmail.com' : '',
  password: process.env.NODE_ENV === 'development' ? 'test1234' : '',
  userName: '',
  token: '',
  safeAreaInsetsData: { top: 0, bottom: 0, left: 0, right: 0 },
  safeAreaInsetsDataChat: { top: 0, bottom: 0, left: 0, right: 0 },
  safeAreaInsetsDefault: { top: 0, bottom: 0, left: 0, right: 0 },
  apiWaitingTime: 0,
  isLoading: false,
  customPopUp: { isShow: false, data: {} },
  userDetails: {
    id: '',
    name: '',
    username: '',
    mobile: '',
    password: '',
    birthday: '',
    gender: '',
    address: [],
    tradingFrequency: 1,
    brokers: [],
    brokerLoginDetails: {},
    tradingFamiliarity: [],
    traderProgress: {
      traderReturns: 0,
      followerReturns: 0,
      AUM: 0,
      followedPortfolioCount: 0,
      _id: '',
      trader: '',
      id: '',
      twitterUserData: {
        isLoggedIn: false,
      },
    },
    userDetailsOtherData: {
      watchlistsLength: 0,
      ifFirstTradeExecuted: false,
    },
    profileCompletionRatio: {
      profile: 0,
      twitter: 0,
      pan: 0,
      brokers: 0,
      knowledge: 0,
    },
    eventData: false,
  },
};

export default (state = initStateAccount, action) => {
  switch (action.type) {
    case SET_SAFE_AREA_INTENT: {
      return {
        ...state,
        safeAreaInsetsDefault: action.payload,
        safeAreaInsetsData: action.payload,
      };
    }
    case START_LOADING: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case API_WAITING_TIME: {
      return {
        ...state,
        apiWaitingTime: action.payload,
      };
    }
    case SET_USER_DETAIL: {
      return {
        ...state,
        userDetails: action.payload,
        userDetailsOtherData: action.payloadAll,
      };
    }
    case SET_USER_OTHER_DETAIL: {
      return {
        ...state,
        userDetailsOtherData: action.payload,
      };
    }
    case CUSTOM_POPUP: {
      return {
        ...state,
        customPopUp: action.payload,
      };
    }
    case EVENT_DATA: {
      return {
        ...state,
        eventData: action.payload,
      };
    }

    default:
      return state;
  }
};
