import { ANGEL_URL } from './constant';

export const initStateBroker = {
  angelURL: '',
};

export default (state = initStateBroker, action) => {
  switch (action.type) {
    case ANGEL_URL: {
      return {
        ...state,
        angelURL: action.payload,
      };
    }

    default:
      return state;
  }
};
