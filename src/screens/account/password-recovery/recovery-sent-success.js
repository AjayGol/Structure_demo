import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import constant from '../../../helper/constant';
import ButtonCustom from '../../../component/ButtonCustom/ButtonCustom';
import NavBar from '../../../component/NavBarAccount/NavBarAccount';
import TitleHeader from '../signup/containers/TitleHeader';
import IconVector from '../signup/containers/IconVector';
import fonts, { sizes } from '../../../helper/fonts';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { accountStack } from '../../../navigation/navigator';

const RecoverySentSuccessScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const {
    container,
    headerView,
    headerImage,
    headerContainer,
    headerSubContainer,
    scrollViewContainer,
    imageViewBox,
    successfullyContainer,
    mainText,
    circleColor,
    descriptionContainer,
    descriptionText,
    subContainer,
    bottomContainer,
  } = styles;

  const [headerViewHeight] = useState(new Animated.Value(234));
  const [headerIconHeight] = useState(new Animated.Value(102));
  const [imageBottomHeight] = useState(new Animated.Value(40));

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressDone = () => {
    // navigation.navigate(accountStack.recovery_set_password);
    navigation.navigate(accountStack.signup_verification_code, {
      phoneNumber: params.phoneNumber,
      type: 2,
    });
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

  const renderSuccessfully = () => {
    return (
      <View style={subContainer}>
        <View style={imageViewBox}>
          <IconVector
            mainCicle={circleColor}
            subCicle={circleColor}
            image={'correct'}
          />
        </View>

        <View style={successfullyContainer}>
          <Text style={mainText}>{strLocale('account.Successfully sent')}</Text>
        </View>
        <View style={descriptionContainer}>
          <Text style={descriptionText}>
            {strLocale(
              'account.We sent you instructions Check your SMS, please',
            )}
          </Text>
        </View>
      </View>
    );
  };

  const renderBottom = () => {
    return (
      <View>
        <View style={bottomContainer}>
          <ButtonCustom
            onPress={onPressDone}
            text={strLocale('account.DONE')}
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
      {renderHeader()}

      <View style={[constant.shadowView, constant.boxShadow]}>
        <ScrollView
          style={[scrollViewContainer]}
          showsVerticalScrollIndicator={false}>
          <TitleHeader
            title={strLocale('account.Account Recovery')}
            mainContain={headerContainer}
          />
          <View>
            {renderSuccessfully()}
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
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 18,
  },
  imageViewBox: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleColor: {
    backgroundColor: '#27C5C1',
  },
  successfullyContainer: {
    marginTop: 9,
  },
  mainText: {
    fontSize: sizes.h5,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    textAlign: 'center',
    lineHeight: 44,
  },
  descriptionContainer: {
    marginTop: 6,
  },
  descriptionText: {
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    textAlign: 'center',
    lineHeight: 22,
  },
  subContainer: {
    marginTop: 25,
  },
  bottomContainer: {
    marginTop: 20,
  },
  headerContainer: {
    marginTop: 38,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(RecoverySentSuccessScreen);
