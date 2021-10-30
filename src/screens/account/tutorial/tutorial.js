import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Animated, Easing } from 'react-native';
import constant from '../../../helper/constant';
import fonts from '../../../helper/fonts';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { accountStack } from '../../../navigation/navigator';
import {
  SafeAreaContainer,
  SubContainer,
  MainContainer,
  HeaderContent,
  ImageWrapper,
  ImageHandWrapper,
  ButtonWrapper,
  FooterContainer,
  SafeAreaSubContainer,
  CenterTextContainer,
  LogoImageCointainer,
} from './styled';
import GradientText from '../../../component/GradientText/GradientText';
import ReactMoE, { MoEProperties } from 'react-native-moengage';
import { UserEvent } from '../../../helper/fabricHelper/track';

const TutorialScreen = () => {
  const navigation = useNavigation();
  const [newName, setnewName] = useState(constant.tutorialList[0]);
  const [opacity] = useState(new Animated.Value(1));
  const [displayIcon, setDisplayIcon] = useState(true);
  const [spinValue] = useState(new Animated.Value(0));

  const shuffle = useCallback(() => {
    const index = Math.floor(Math.random() * constant.tutorialList.length);
    setnewName(constant.tutorialList[index]);
  }, []);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  useEffect(() => {
    const intervalID = setInterval(shuffle, 1000);
    return () => clearInterval(intervalID);
  }, [shuffle]);

  const { safeAreaSubContainer, animatedView, imageStyle } = styles;

  const renderHeader = () => {
    return (
      <HeaderContent>
        {displayIcon && <ImageWrapper source={{ uri: 'brandlogo' }} />}
      </HeaderContent>
    );
  };

  const renderCenter = () => {
    return (
      <SafeAreaSubContainer>
        {displayIcon && (
          <CenterTextContainer>
            <ImageHandWrapper source={{ uri: 'hand' }} />
            <GradientText
              color={constant.lightBlue}
              fontSize={24}
              endText={newName}
              textColor={constant.whiteColor}
              text={`${constant.tutorialText}`}
              lineHeight={30}
              textAlign={'center'}
              fontFamily={fonts.fontInterBold}
            />
          </CenterTextContainer>
        )}
      </SafeAreaSubContainer>
    );
  };

  const onButtonClick = () => {
    try {
      UserEvent.userTrackScreen('trinkerr_story_click', {
        Page: 'Splash_screens',
      });
      UserEvent.MoengageTrackScreen(
        ['page'],
        ['Splash_screens'],
        'trinkerr_story_click',
      );
    } catch (e) {}

    setDisplayIcon(false);
    Animated.timing(opacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      redirectToNext();
    }, 800);
  };

  const redirectToNext = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: accountStack.promo }],
    });
  }, [displayIcon]);

  const renderBottom = () => {
    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <FooterContainer>
        <Animated.View
          source={{ uri: 'new_logo' }}
          style={[
            animatedView,
            {
              opacity: opacity,
              transform: [
                {
                  scale: opacity.interpolate({
                    inputRange: [0, 1],
                    outputRange: [25, 1],
                  }),
                },
              ],
            },
          ]}>
          <ButtonWrapper onPress={onButtonClick}>
            {displayIcon && (
              <Animated.Image
                style={[imageStyle, { transform: [{ rotate: spin }] }]}
                source={{ uri: 'round' }}
              />
            )}
            {displayIcon && (
              <LogoImageCointainer source={{ uri: 'new_logo' }} />
            )}
          </ButtonWrapper>
        </Animated.View>
      </FooterContainer>
    );
  };

  return (
    <MainContainer>
      <SafeAreaContainer>
        <SubContainer style={safeAreaSubContainer}>
          {renderHeader()}
          {renderCenter()}
          {renderBottom()}
        </SubContainer>
      </SafeAreaContainer>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  safeAreaSubContainer: {
    flex: 1,
  },
  imageStyle: {
    height: 64,
    alignSelf: 'center',
    width: 64,
    position: 'absolute',
    resizeMode: 'contain',
    tintColor: constant.whiteColor,
  },
  animatedView: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: constant.lightBlue,
  },
  button: {
    height: 64,
    width: 64,
    borderRadius: 32,
    alignItems: 'center',
    backgroundColor: constant.lightBlue,
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(TutorialScreen);
