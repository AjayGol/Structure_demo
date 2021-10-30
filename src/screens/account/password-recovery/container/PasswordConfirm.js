import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  validatorLength,
  validatorNumber,
  validatorSpecial,
  validatorUpperCase,
} from '../../../../modules/account/validator';
import { strLocale } from 'locale';
import ErrorTitle from './ErrorTitle';

const PasswordConfirm = props => {
  const { password } = props;

  return (
    <View>
      <ErrorTitle
        isCheck={!validatorLength(password.value)}
        title={strLocale('account.At least 8 characters long')}
        valueError={password.error}
      />

      <ErrorTitle
        isCheck={!validatorUpperCase(password.value)}
        title={strLocale('account.Contains uppercase letters')}
        valueError={password.error}
      />

      <ErrorTitle
        isCheck={!validatorNumber(password.value)}
        title={strLocale('account.Contains a number')}
        valueError={password.error}
      />

      <ErrorTitle
        isCheck={!validatorSpecial(password.value)}
        title={strLocale('account.Contains special characters')}
        valueError={password.error}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default PasswordConfirm;
