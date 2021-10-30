import request from '../../services/fetch';
import constant from '../../services/constant';

export const requestCodeService = phoneNumber =>
  request.post(constant.signUpOTP, { mobile: phoneNumber });

export const verifyCodeService = (phoneNumber, otp) =>
  request.get(constant.signUpOTP + `?mobile=${phoneNumber}&otp=${otp}`);

export const signUpService = (phoneNumber, header) =>
  request.post(constant.signUp, phoneNumber, header);

export const requestCodeSignInService = (phoneNumber, Type) =>
  request.post(constant.signInOTP, {
    mobile: phoneNumber,
    otpOperationType: Type,
  });

export const signInWithPasswordService = (phoneNumber, password) =>
  request.post(constant.signInWithPassword, {
    login: phoneNumber,
    password: password,
  });

export const verifyCodeSignInService = (phoneNumber, otp) =>
  request.post(
    constant.signInOPTVerification + `?mobile=${phoneNumber}&otp=${otp}`,
  );

export const requestCodeResetPasswordService = phoneNumber =>
  request.post(constant.resetPasswordOTP, {
    mobile: phoneNumber,
  });

export const verifyCodeAccountRecoveryService = (phoneNumber, otp) =>
  request.post(constant.resetPasswordOTPVerify, {
    mobile: phoneNumber,
    otp: otp,
  });

export const resetPasswordService = (phoneNumber, header) =>
  request.post(constant.resetPassword, phoneNumber, header);

export const redeemCoinService = obj =>
  request.postWithTokenRedeem(constant.redeemCoins, obj);

export const userDetailService = (phoneNumber, header) =>
  request.getWithToken(constant.getUserDetail);

export const updateUserInfo = data =>
  request.putWithToken(constant.getUserDetail, data);

export const userChangePasswordService = obj =>
  request.postWithToken(constant.changePassword, obj);

export const userChangePhoneService = (obj, header) =>
  request.putWithToken(constant.phoneChange, obj, header);

export const twitterService = () =>
  request.getWithToken(constant.twitterCredentials);

export const saveTwitterService = obj =>
  request.postWithToken(constant.twitterSaveCredentials, obj);

export const setDeviceTokenService = obj =>
  request.postWithToken(constant.setToken, obj);

export const removeDeviceTokenService = obj =>
  request.postWithToken(constant.removeToken, obj);
