import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import constant from '../../../helper/constant';
import NavBar from '../../../component/NavBarAccount/NavBarAccount';
import fonts, { sizes } from '../../../helper/fonts';
import TermsAndPrivacyText from './containers/TermsAndPrivacyText';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { terms, privacyPolicy } from '../../../helper/app-helper';

const TermsAndPrivacyScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { container, mainView } = styles;

  const [listData] = useState(
    (params && params.type && params.type === 'privacy' && privacyPolicy()) ||
      terms(),
  );

  const onPressBack = () => {
    navigation.goBack();
  };

  return (
    <View style={container}>
      <NavBar
        backScreenName={
          (params && params.title) || strLocale('account.SIGN UP')
        }
        onPressBack={onPressBack}
      />

      <View style={[constant.shadowView, constant.boxShadow]}>
        <ScrollView style={[mainView]} showsVerticalScrollIndicator={false}>
          <TermsAndPrivacyText dataList={listData} />
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
    paddingHorizontal: 19,
    paddingTop: 38,
  },
  fullContainer: {
    flex: 1,
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
  buttonChange: {
    marginRight: 5,
  },
  descriptionText: {
    fontSize: sizes.h12,
    color: '#4F5153',
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 21,
  },
  phoneNumber: {
    fontSize: sizes.h7,
    color: '#8A8A8A',
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 37,
    maxWidth: constant.screenWidth - 160,
  },
  changeButton: {
    fontSize: sizes.h12,
    color: '#2D8EE7',
  },
  signInButton: {
    marginBottom: 12,
  },
  resendCode: {
    backgroundColor: constant.transparent,
    marginBottom: 5,
    height: 30,
  },
  resendCodeText: {
    color: '#2D8EE7',
  },
  textInputLayout: {
    marginTop: 32,
  },
  bottomContainer: {
    marginTop: 20,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(TermsAndPrivacyScreen);
