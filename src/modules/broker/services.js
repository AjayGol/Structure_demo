import request from '../../services/fetch';
import constant from '../../services/constant';

export const brokerAngelLoginService = uri => request.getWithToken(uri);

export const setAngelTokenService = (uri, data) =>
  request.postWithToken(uri, data);

export const logoutAngelService = () =>
  request.postWithToken(constant.angelLogOut);

export const logoutTwitterService = () =>
  request.postWithToken(constant.twitterLogout);

export const logoutZerodhaService = () =>
  request.postWithToken(constant.zerodhaLogOut);
