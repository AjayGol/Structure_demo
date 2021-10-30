import { find } from 'lodash';

export function validatorMobileNo(phoneNo) {
  const mobileNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
  return mobileNumberPattern.test(phoneNo);
}

export function validatorUsername(name) {
  const usernamePattern =
    /^[a-zA-Z0-9-' ']([._-](?![._-])|[a-zA-Z0-9-' ']){1,64}[a-zA-Z0-9-' ']$/;
  return usernamePattern.test(name);
}

export function validatorLength(length) {
  const lengthCasePattern = /(?=^.{8,}$)/;
  return lengthCasePattern.test(length);
}
export function validatorUpperCase(uppercase) {
  const upperCasePattern = /(?=.*[A-Z])/;
  return upperCasePattern.test(uppercase);
}

export function validatorNumber(number) {
  const NumberCasePattern = /(?=.*\d)/;
  return NumberCasePattern.test(number);
}

export function validatorSpecial(special) {
  const SpecialCasePattern = /(?=.*[!@#\$%&\*\?\[\]\(\)<>^\-+,.;:\\{}/~_"'|])/;
  return SpecialCasePattern.test(special);
}

export function shortName(name) {
  let arr = name.split(' ');
  return `${(arr.length > 0 && arr[0].charAt(0).toUpperCase()) || ''}${
    (arr.length > 1 && arr[1].charAt(0).toUpperCase()) || ''
  }`;
}

export function brokerStatus(type, brokers) {
  let value = false;
  try {
    value = find(brokers, { name: type }) === undefined;
  } catch (e) {}

  return value;
}
