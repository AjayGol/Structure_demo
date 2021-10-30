import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Text, Keyboard } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import constant from '../../../helper/constant';
import ButtonCustom from '../../../component/ButtonCustom/ButtonCustom';
import TextInputCustom from '../../../component/TextInputCustom/TextInputCustom';
import NavBar from '../../../component/NavBarAccount/NavBarAccount';
import TitleHeader from '../signup/containers/TitleHeader';
import fonts, { sizes } from '../../../helper/fonts';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { validatorMobileNo } from '../../../modules/account/validator';
import { useNavigation } from '@react-navigation/native';
import { accountStack } from '../../../navigation/navigator';
import { requestResetPasswordOTP } from '../../../modules/account/actions';

const RecoveryStartScreen = props => {
  const navigation = useNavigation();

  const [mobileNumber, setMobileNumber] = useState({
    value: '',
    error: '',
    focus: false,
  });

  const [headerViewHeight] = useState(new Animated.Value(234));
  const [headerIconHeight] = useState(new Animated.Value(102));
  const [imageBottomHeight] = useState(new Animated.Value(40));
  const [mainContainAnimation] = useState(new Animated.Value(1));

  const {
    container,
    headerView,
    headerSubContainer,
    headerImage,
    mainContainer,
    titleAccountRecovery,
    textInputContainer,
    instructionText,
    bottomContainer,
  } = styles;

  const performHeaderAnimation = (isOpen = true) => {
    Animated.timing(headerViewHeight, {
      toValue: (!isOpen && 234) || 60,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
    Animated.timing(headerIconHeight, {
      toValue: (!isOpen && 102) || 40,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
    Animated.timing(imageBottomHeight, {
      toValue: (!isOpen && 40) || 5,
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    Keyboard.addListener('keyboardWillShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardWillHide', onKeyboardDidHide);
    Keyboard.addListener('keyboardDidShow', onKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', onKeyboardDidHide);

    return (): void => {
      Keyboard.removeListener('keyboardWillShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardWillHide', onKeyboardDidHide);
      Keyboard.removeListener('keyboardDidShow', onKeyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', onKeyboardDidHide);
    };
  });

  function onKeyboardDidShow(e: KeyboardEvent): void {
    performHeaderAnimation(true);
  }

  function onKeyboardDidHide(): void {
    performHeaderAnimation(false);
  }

  const validation = () => {
    if (mobileNumber.value === '') {
      setMobileNumber({
        value: mobileNumber.value,
        error: strLocale('account.The phone number required'),
      });
    } else if (!validatorMobileNo(mobileNumber.value)) {
      setMobileNumber({
        value: mobileNumber.value,
        error: strLocale('account.The phone number is not correct'),
      });
    }
  };

  const checkGetInstructions = () => {
    return !validatorMobileNo(mobileNumber.value);
  };

  const recoveryVerifyOTP = () => {
    props
      .requestResetPasswordOTP(mobileNumber.value, 'Login')
      .then(res => {
        //404 - Mobile number not found
        switch (res.code) {
          case 404:
            setMobileNumber({
              value: mobileNumber.value,
              error: 'Phone number does not exits',
            });
            break;
          case 200:
            navigation.navigate(accountStack.recovery_sent_success, {
              phoneNumber: mobileNumber.value,
            });
            break;
          default:
            break;
        }
      })
      .catch(err => {});
  };

  const onPressGetInstructions = () => {
    if (mobileNumber.value === '') {
      setMobileNumber({
        value: mobileNumber.value,
      });
    } else {
      recoveryVerifyOTP();
      Keyboard.dismiss();
    }
  };

  const onPressSignIn = () => {
    navigation.navigate(accountStack.sign_up);
  };

  const renderHeader = () => {
    return (
      <View>
        <Animated.View
          style={[headerView, { height: headerViewHeight }]}
          pointerEvents="none">
          <View style={headerSubContainer} />
          <Animated.Image
            source={{ uri: constant.imageHeaderLogo }}
            resizeMode={'contain'}
            style={[
              headerImage,
              {
                height: headerIconHeight,
                marginBottom: imageBottomHeight,
              },
            ]}
          />
        </Animated.View>
      </View>
    );
  };

  const renderTextBox = () => {
    return (
      <View>
        <View>
          <Text style={instructionText}>
            {strLocale('account.Specify your phone number and')}
          </Text>
        </View>
        <View style={textInputContainer}>
          <TextInputCustom
            title={strLocale('account.PHONE NUMBER')}
            isMobileText={'+91'}
            placeHolder={' __________'}
            keyboardInputType={'phone-pad'}
            validation={mobileNumber}
            apiWaitingTime={props.apiWaitingTime}
            setValue={(text, isCheck = false) => {
              if (isCheck === false) {
                setMobileNumber({ value: text, error: '' });
              } else {
                validation();
              }
            }}
          />
        </View>
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View style={bottomContainer}>
        <ButtonCustom
          onPress={onPressGetInstructions}
          text={strLocale('account.GET INSTRUCTIONS')}
          isDisable={checkGetInstructions()}
          isLoading={props.isLoading}
        />
      </View>
    );
  };

  return (
    <View style={container}>
      <NavBar
        backScreenName={strLocale('account.SIGN IN')}
        onPressBack={onPressSignIn}
      />

      {renderHeader()}

      <View style={[constant.shadowView, constant.boxShadow]}>
        <ScrollView style={mainContainer} showsVerticalScrollIndicator={false}>
          <TitleHeader
            title={strLocale('account.Account Recovery')}
            mainContain={titleAccountRecovery}
          />
          <Animated.View style={{ opacity: mainContainAnimation }}>
            {renderTextBox()}
            {renderBottom()}
          </Animated.View>
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
  mainContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  instructionText: {
    marginTop: 16,
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 21,
    paddingHorizontal: 1,
  },
  textInputContainer: {
    marginTop: 32,
  },
  headerView: {
    width: '100%',
    marginTop: -60,
  },
  headerSubContainer: {
    flex: 1,
  },
  headerImage: {
    width: '100%',
  },
  bottomContainer: {
    marginTop: 20,
  },
  titleAccountRecovery: {
    marginTop: 38,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    apiWaitingTime: state.account.apiWaitingTime,
    isLoading: state.account.isLoading,
  };
};

export default connect(mapStateToProps, {
  requestResetPasswordOTP,
})(RecoveryStartScreen);
