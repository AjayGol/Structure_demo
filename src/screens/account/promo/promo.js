import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import constant from '../../../helper/constant';
import Animated, { Easing, stopClock } from 'react-native-reanimated';
import fonts, { sizes } from '../../../helper/fonts';
import { connect } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { accountStack, homeStack } from '../../../navigation/navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserEvent } from '../../../helper/fabricHelper/track';
import { GradientTextWrapper } from '../../../component/GlobalStyles';
import {
  SafeAreaContainer,
  SubContainer,
  MainContainer,
  HeaderContent,
  ImageWrapper,
  ImageWrapperContainer,
  MainTitle,
  FooterContainer,
  SafeAreaSubContainer,
  CenterTextContainer,
  DescriptionTextContainer,
  CenterImageContainer,
} from './styled';
import TitleText from '../../../component/TitleText/TitleText';
import ButtonGlobal from '../../../component/ButtonGlobal/ButtonGlobal';
import ProgressBar from './container/ProgressBar';
import { strLocale } from 'locale';
import Video from 'react-native-video';
import { manageTutorialVideo } from '../../../modules/home/actions';

const xOffset = new Animated.Value(0);
//loginUser
const PromoScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const [listData] = useState(constant.promoList);
  const [currentVisiblePageNo, setCurrentVisiblePageNo] = useState(0);
  const [widthManage, setWidthManage] = useState(new Animated.Value(0));
  const scrollRef = useRef();
  const [playVideo, setPlayVideo] = useState('');
  const { safeAreaSubContainer, imageStyle, animatedView, video } = styles;

  useEffect(() => {
    global.changeSlider = true;
    global.changeSliderLeft = false;
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setPlayVideo(currentVisiblePageNo);

      Animated.timing(widthManage, {
        toValue: (constant.screenWidth - 46) / 5,
        duration: listData[currentVisiblePageNo].time * 1000,
        easing: Easing.out(Easing.quad),
        useNativeDriver: false,
      }).start(() => {
        if (currentVisiblePageNo < 4) {
          if (global.changeSlider) {
            setWidthManage(new Animated.Value(0));
            setCurrentVisiblePageNo(currentVisiblePageNo + 1);
            onPressNext();
          } else {
            onPressNext(true);
          }
          global.changeSlider = true;
        }
      });
    }, 200);
  }, [currentVisiblePageNo]);

  /** manage alpha animation */
  const transitionAnimation = (index, image = false) => {
    let width = Math.round(constant.screenWidth);
    let halfWidth = Math.round(width / 2);
    let arrIndexFist = [0, halfWidth, width];
    let arrInput;
    let arrOpacity;
    if (index === 0) {
      arrInput = arrIndexFist;
      arrOpacity = [1, 0, 0];
    } else {
      let prev = index - 1;
      arrInput = [
        width * prev,
        width * prev + halfWidth,
        width * prev + width,
        width * index,
        width * index + halfWidth,
        width * index * 2,
      ];
      arrOpacity = [0, 0, 1, 1, 0, 0];
    }

    return {
      opacity: xOffset.interpolate({
        inputRange: arrInput,
        outputRange: arrOpacity,
        useNativeDriver: true,
      }),
    };
  };

  const isLastPage = () => {
    return currentVisiblePageNo !== listData.length - 1;
  };

  const onPressNext = (isBack = false) => {
    if (isLastPage()) {
      UserEvent.userTrackScreen('app_splashscreen1_next');
      UserEvent.userTrackScreen('PromoScreen');

      let value = (currentVisiblePageNo + 1) * constant.screenWidth;
      if (global.changeSliderLeft) {
        global.changeSliderLeft = false;
        value = (currentVisiblePageNo - 1) * constant.screenWidth;
      }

      if (scrollRef.current && scrollRef.current.getNode) {
        const node = scrollRef.current.getNode();
        if (node) {
          node.scrollTo({
            x: value,
            y: 0,
            animated: false,
          });
        }
      }
    }
  };

  const onPressGetStart = () => {
    if (currentVisiblePageNo === 4 || (params && params.loginUser)) {
      props.manageTutorialVideo(true);
    }

    if (params && params.loginUser) {
      navigation.goBack();
      navigation.navigate(homeStack.portfolios_search);
    } else {
      AsyncStorage.setItem('isPromoPage', 'true');
      navigation.navigate(accountStack.sign_up);
    }
    try {
      UserEvent.userTrackScreen('get_started_click', {
        page:
          currentVisiblePageNo === 0
            ? 'Promo_Page'
            : '' || currentVisiblePageNo === 1
            ? 'Trust_page'
            : '' || currentVisiblePageNo === 2
            ? 'Simple_page'
            : '' || currentVisiblePageNo === 3
            ? 'Safe_page'
            : '' || currentVisiblePageNo === 4
            ? 'Free_page'
            : '',
      });
      UserEvent.MoengageTrackScreen(
        ['page'],
        [
          currentVisiblePageNo === 0
            ? 'Promo_Page'
            : '' || currentVisiblePageNo === 1
            ? 'Trust_page'
            : '' || currentVisiblePageNo === 2
            ? 'Simple_page'
            : '' || currentVisiblePageNo === 3
            ? 'Safe_page'
            : '' || currentVisiblePageNo === 4
            ? 'Free_page'
            : '',
        ],
        'get_started_click',
      );
    } catch (e) {}
  };

  const onPressChange = (isLeft: true, index = 0) => {
    try {
      UserEvent.userTrackScreen('get_started_story', {
        type: isLeft ? 'Left' : 'Right',
        page:
          currentVisiblePageNo === 0
            ? 'Promo_Page'
            : '' || currentVisiblePageNo === 1
            ? 'Trust_page'
            : '' || currentVisiblePageNo === 2
            ? 'Simple_page'
            : '' || currentVisiblePageNo === 3
            ? 'Safe_page'
            : '' || currentVisiblePageNo === 4
            ? 'Free_page'
            : '',
      });
      UserEvent.MoengageTrackScreen(
        ['type', 'page'],
        [
          isLeft ? 'Left' : 'Right',
          currentVisiblePageNo === 0
            ? 'Promo_Page'
            : '' || currentVisiblePageNo === 1
            ? 'Trust_page'
            : '' || currentVisiblePageNo === 2
            ? 'Simple_page'
            : '' || currentVisiblePageNo === 3
            ? 'Safe_page'
            : '' || currentVisiblePageNo === 4
            ? 'Free_page'
            : '',
        ],
        'get_started_story',
      );
    } catch (e) {}
    if (isLeft && currentVisiblePageNo !== 0) {
      global.changeSlider = false;
      global.changeSliderLeft = true;
      setWidthManage(new Animated.Value(0));
      setCurrentVisiblePageNo(currentVisiblePageNo - 1);
    } else if (!isLeft && index !== 4) {
      try {
        UserEvent.userTrackScreen('get_started_story', {
          type: 'Right',
          page: 'promo page',
        });
        UserEvent.MoengageTrackScreen(
          ['type', 'page'],
          ['Right', 'Promo_page'],
          'get_started_story',
        );
      } catch (e) {}
      if (currentVisiblePageNo + 1 < 5) {
        global.changeSlider = false;
        console.log(global.changeSlider);
        setWidthManage(new Animated.Value(0));
        setCurrentVisiblePageNo(currentVisiblePageNo + 1);
      }
    }
  };

  const renderHeader = () => {
    return (
      <HeaderContent>
        <ImageWrapperContainer>
          <ImageWrapper source={{ uri: 'icon_t_logo' }} />
        </ImageWrapperContainer>
        <MainTitle>
          <TitleText
            color={constant.lightBlue}
            fontSize={sizes.h14}
            text={strLocale('promo.Welcome to Trinkerr')}
            fontFamily={fonts.fontInterBold}
          />
        </MainTitle>
      </HeaderContent>
    );
  };

  const manageState = index => {
    return playVideo === index;
  };

  const renderCenter = () => {
    return (
      <SafeAreaSubContainer>
        <Animated.ScrollView
          ref={scrollRef}
          bounces={false}
          pagingEnabled={true}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={false}
          scrollEventThrottle={2}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: x =>
                      Animated.block([
                        Animated.set(xOffset, x),
                        Animated.call([x], ([offsetx, event]) => {
                          let pageNo = Math.floor(
                            offsetx / (constant.screenWidth - 5),
                          );
                        }),
                      ]),
                  },
                },
              },
            ],
            {
              useNativeDriver: true,
            },
          )}>
          {listData.map((obj, index) => {
            return (
              <Animated.View
                style={[imageStyle, transitionAnimation(index)]}
                key={index}>
                <CenterTextContainer>
                  <GradientTextWrapper>
                    <TitleText
                      text={obj.text}
                      lineHeight={30}
                      fontSize={sizes.h9}
                      color={constant.lightBlue}
                      fontFamily={fonts.fontInterBold}
                    />
                  </GradientTextWrapper>
                  <DescriptionTextContainer>
                    <TitleText
                      text={obj.description}
                      fontSize={sizes.h13}
                      lineHeight={22}
                      color={'rgba(255, 255, 255, 0.87)'}
                      fontFamily={fonts.fontInterBold}
                    />
                  </DescriptionTextContainer>
                </CenterTextContainer>
                <CenterImageContainer>
                  <Video
                    resizeMode={'contain'}
                    source={{
                      uri: constant.isIOS
                        ? `${listData[currentVisiblePageNo].video}.mp4`
                        : `${listData[currentVisiblePageNo].video}`,
                    }}
                    paused={!manageState(index)}
                    style={video}
                  />
                </CenterImageContainer>
                <TouchableOpacity
                  onPress={() => onPressChange(true)}
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: constant.screenWidth * 0.3,
                  }}
                />
                <TouchableOpacity
                  onPress={() => onPressChange(false)}
                  style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    bottom: 0,
                    width: constant.screenWidth * 0.3,
                  }}
                />
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
      </SafeAreaSubContainer>
    );
  };

  const renderBottom = () => {
    return (
      <FooterContainer>
        <ButtonGlobal
          testID={'btn_get_started'}
          buttonText={
            (params && params.loginUser && 'Explore Portfolios') ||
            'Get Started'
          }
          onPress={onPressGetStart}
        />
      </FooterContainer>
    );
  };

  return (
    <MainContainer>
      <Animated.View
        style={[
          animatedView,
          {
            width: widthManage,
          },
        ]}
        pointerEvents="none"
      />

      <SafeAreaContainer>
        <ProgressBar
          sliderValue={widthManage}
          selectedSlider={currentVisiblePageNo + 1}
          noOfSlider={5}
        />
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
    flex: 1,
    height: '100%',
    width: constant.screenWidth,
  },
  animatedView: {
    backgroundColor: 'red',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0,
  },
  video: {
    height: constant.screenWidth - 40,
    width: (constant.screenWidth - 40) * 0.978,
    marginLeft:
      (constant.screenWidth - (constant.screenWidth - 40) * 0.978) / 2,
    borderRadius: 4,
  },
});

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {
  manageTutorialVideo,
})(PromoScreen);
