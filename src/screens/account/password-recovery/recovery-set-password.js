import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, Keyboard } from 'react-native';
import constant from '../../../helper/constant';
import ButtonCustom from '../../../component/ButtonCustom/ButtonCustom';
import NavBar from '../../../component/NavBarAccount/NavBarAccount';
import TitleHeader from '../signup/containers/TitleHeader';
import TextInputCustom from '../../../component/TextInputCustom/TextInputCustom';
import PasswordConfirm from './container/PasswordConfirm';
import fonts, { sizes } from '../../../helper/fonts';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  validatorUpperCase,
  validatorNumber,
  validatorSpecial,
  validatorLength,
} from '../../../modules/account/validator';
import { resetPassword } from '../../../modules/account/actions';
import { sessionTimeOut } from '../../../services/error';
import { accountStack, appTabStack } from '../../../navigation/navigator';

const RecoverySetPasswordScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [mobileNumber] = useState({ value: '', error: '' });

  const {
    container,
    mainView,
    labelTitle,
    titleText,
    noticeContainer,
    noticeText,
    descriptionContainer,
    descriptionText,
    valueText,
    errorContainer,
    signInButton,
    textInputLayout,
    bottomContainer,
  } = styles;

  const [password, setPassword] = useState({ value: '', error: '' });
  const [passwordIsShow, setPasswordIsShow] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState({
    value: '',
    error: '',
  });

  const checkRecoverEnable = () => {
    return false;
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const resetPasswordRecovery = () => {
    const model = {
      password: password.value,
      confirmPassword: password.value,
    };

    const headers = {
      'change-password-token': params.token,
      'Custom-Error-Handling': '',
    };

    props
      .resetPassword(model, headers, params.userData.mobile)
      .then(res => {
        if (res === true) {
          navigation.reset({
            index: 0,
            routes: [{ name: appTabStack.app_tab }],
          });
        } else {
          if (res.code === 401 && res.result === 'Invalid token') {
            sessionTimeOut();
            navigation.navigate(accountStack.recovery_start);
          } else if (res.code === 400) {
          }
        }
      })
      .catch(err => {});
  };

  const onPressRecover = () => {
    if (password.value !== confirmPassword.value && passwordIsShow) {
      setConfirmPassword({
        value: confirmPassword.value,
        error: 'Dose not match the password.',
      });
    } else if (checkValidation()) {
      resetPasswordRecovery();
      Keyboard.dismiss();
    }
  };

  const checkValidation = () => {
    if (password.value === '') {
      setPassword({
        value: '',
        error: strLocale('account.Password is required'),
      });
      return false;
    } else if (!validatorLength(password.value)) {
      setPassword({
        value: password.value,
      });
      return false;
    } else if (!validatorUpperCase(password.value)) {
      setPassword({
        value: password.value,
      });
      return false;
    } else if (!validatorSpecial(password.value)) {
      setPassword({
        value: password.value,
      });
      return false;
    } else if (!validatorNumber(password.value)) {
      setPassword({
        value: password.value,
      });
      return false;
    }
    return true;
  };

  const renderError = () => {
    return (
      <View style={errorContainer}>
        <PasswordConfirm password={password} />
      </View>
    );
  };

  const renderPhoneNumber = () => {
    return (
      <View style={textInputLayout}>
        <View style={{ noticeContainer }}>
          <Text style={noticeText}>
            {strLocale('account.Recovery description')}
          </Text>
        </View>

        <View style={textInputLayout}>
          <TextInputCustom
            title={strLocale('account.USERNAME')}
            placeHolder={params.userData.username}
            validation={mobileNumber}
            disable={false}
            valueStyle={valueText}
            titleStyle={labelTitle}
          />

          <TextInputCustom
            title={strLocale('account.EMAIL')}
            placeHolder={params.userData.email}
            keyboardInputType={'phone-pad'}
            validation={mobileNumber}
            disable={false}
            valueStyle={valueText}
            titleStyle={labelTitle}
          />
        </View>

        <View style={{ descriptionContainer }}>
          <Text style={descriptionText}>
            {strLocale('account.You can leave your old password')}
          </Text>
        </View>
        <TextInputCustom
          title={strLocale('account.NEW PASSWORD')}
          placeHolder={''}
          isSecure={passwordIsShow}
          isEye={true}
          validation={password}
          onEyePress={() => setPasswordIsShow(!passwordIsShow)}
          setValue={(text, isCheck = false) => {
            if (isCheck === false) {
              setPassword({ value: text, error: '' });
            } else {
              checkValidation();
            }
          }}
        />

        {renderError()}

        {passwordIsShow && password.value.length !== 0 ? (
          <TextInputCustom
            title={strLocale('account.PASSWORD CONFIRMATION')}
            placeHolder={''}
            validation={confirmPassword}
            isSecure={true}
            setValue={(text, isCheck = false) => {
              if (isCheck === false) {
                setConfirmPassword({ value: text, error: '' });
              } else {
                if (password.value !== confirmPassword.value) {
                  setConfirmPassword({
                    value: confirmPassword.value,
                    error: strLocale('account.Does not match the password'),
                  });
                }
              }
            }}
          />
        ) : null}
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View>
        <View style={bottomContainer}>
          <ButtonCustom
            onPress={onPressRecover}
            text={
              password.value
                ? strLocale('account.CHANGE PASSWORD')
                : strLocale('account.IT HELPED, THANKS')
            }
            otherStyle={signInButton}
            isDisable={checkRecoverEnable()}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={container}>
      <NavBar
        backScreenName={strLocale('account.SIGN IN')}
        onPressBack={onPressBack}
      />

      <View style={[constant.shadowView, constant.boxShadow]}>
        <ScrollView style={[mainView]} showsVerticalScrollIndicator={false}>
          <TitleHeader
            title={strLocale('account.Account Recovery')}
            mainContain={titleText}
          />
          <View>
            {renderPhoneNumber()}
            {renderBottom()}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F4FB',
  },
  mainView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  titleText: {
    marginTop: 38,
  },
  valueText: {
    color: '#000000',
    opacity: 0.45,
  },
  labelTitle: {
    color: '#59595C',
    opacity: 0.55,
  },
  errorContainer: {
    marginTop: 0,
    marginBottom: 20,
    marginHorizontal: 2,
  },
  phoneNumberContainer: {
    backgroundColor: '#FBFBFB',
    paddingHorizontal: 17,
    height: 56,
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 21,
  },
  noticeContainer: {
    marginTop: 16,
  },
  noticeText: {
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 20,
  },
  descriptionContainer: {
    marginTop: 21,
  },
  descriptionText: {
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 20,
    marginBottom: 20,
  },
  phoneNumber: {
    fontSize: sizes.h7,
    color: '#8A8A8A',
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 37,
    maxWidth: constant.screenWidth - 160,
  },
  signInButton: {
    marginBottom: 12,
  },
  textInputLayout: {
    marginTop: 32,
  },
  bottomContainer: {
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps, {
  resetPassword,
})(RecoverySetPasswordScreen);
