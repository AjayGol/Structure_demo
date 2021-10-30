import React, { useEffect } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import constant from '../../helper/constant';
import ShareApp from './containers/ShareApp';
import TitleText from '../../component/TitleText/TitleText';
import HomeHeader from './containers/HomeHeader';
import ButtonGlobal from '../../component/ButtonGlobal/ButtonGlobal';
import WatchListInfo from './containers/WatchListInfo';
import fonts, { sizes } from '../../helper/fonts';
import { connect } from 'react-redux';
import { strLocale } from 'locale';
import { useNavigation } from '@react-navigation/native';
import { dateConvert } from '../../modules/home/validator';
import {
  ScrollPaddingBottom,
  MainContainer,
  SimpleContainer,
} from '../../component/GlobalStyles';
import {
  SafeAreaContainer,
  MainImageContainer,
  CenterTitleContainer,
  DescriptionContainer,
  ButtonContainer,
  SubTitleContainer,
  WelcomeContainer,
  CardImageContainer,
  CardsMainContainer,
  RewardsGradientContainer,
} from './styled';
import { accountStack, homeStack } from '../../navigation/navigator';
import { numDifferentiation } from '../../helper/app-helper';
import { UserEvent } from '../../helper/fabricHelper/track';
import ReactMoE from 'react-native-moengage';

const HomeTabScreen = props => {
  const navigation = useNavigation();
  const { descriptionText, valueText } = styles;

  useEffect(() => {
    try {
      UserEvent.userTrackScreen('Homescreen_landing');
      UserEvent.MoengageTrackScreen([], [], 'Homescreen_landing');
    } catch (e) {}
  }, []);

  useEffect(() => {
    // User attribute update
    try {
      if (props.userDetails) {
        ReactMoE.setUserUniqueID(props.userDetails._id || '');
        ReactMoE.setUserFirstName(props.userDetails.name || '');
        ReactMoE.setUserContactNumber(props.userDetails.mobile || '');
      }
    } catch (e) {}
  });

  const getStarted = () => {
    try {
      UserEvent.userTrackScreen('Homescreen_Portfolios_click', {
        fieldType: props.tutorialVideo ? 'Explore Portfolios' : 'Get started',
        page: 'Home Screen',
      });
      UserEvent.MoengageTrackScreen(
        ['fieldType', 'page'],
        [
          props.tutorialVideo ? 'Explore Portfolios' : 'Get started',
          'Home Screen',
        ],
        'Homescreen_Portfolios_click',
      );
    } catch (e) {}

    if (props.tutorialVideo) {
      navigation.navigate(homeStack.portfolios_search);
    } else {
      navigation.navigate(accountStack.promo, {
        loginUser: true,
      });
    }
  };

  const createPortfolio = () => {
    try {
      UserEvent.userTrackScreen('Homescreen_Create_Portfolio_click', {
        fieldType: 'Create Portfolio',
        page: 'Home Screen',
      });
      UserEvent.MoengageTrackScreen(
        ['fieldType', 'page'],
        ['Create Portfolio', 'Home Screen'],
        'Homescreen_Create_Portfolio_click',
      );
    } catch (e) {}

    navigation.navigate(homeStack.create_portfolio);
  };

  const isNewUser = () => {
    const { userDetailsOtherData } = props;

    if (userDetailsOtherData) {
      return !userDetailsOtherData.ifFirstTradeExecuted;
    } else {
      return true;
    }
  };

  const manageDescription = () => {
    const { volumeTraded, userCount, dateSince } = props.analyticData;
    if (!props.tutorialVideo) {
      return (
        <DescriptionContainer>
          <Text
            style={descriptionText}
            numberOfLines={2}
            adjustsFontSizeToFit={true}>
            {strLocale('Join a family of') + ' '}
            <Text style={valueText}>{userCount + '+ '}</Text>
            <Text>{'users who have traded' + ' '}</Text>
            <Text style={valueText}>
              {numDifferentiation(volumeTraded) + ' '}
            </Text>
            <Text>{'volume since' + ' '}</Text>
            <Text style={valueText}>{dateConvert(dateSince) + ' '}</Text>
          </Text>
        </DescriptionContainer>
      );
    } else {
      return (
        <DescriptionContainer>
          <Text
            style={descriptionText}
            numberOfLines={2}
            adjustsFontSizeToFit={true}>
            {"Discover India's best portfolios that have assets worth "}
            <Text style={valueText}>
              {numDifferentiation(volumeTraded) + ' '}
            </Text>
            <Text>{'under management.' + ' '}</Text>
          </Text>
        </DescriptionContainer>
      );
    }
  };

  const renderWelcome = () => {
    return (
      <WelcomeContainer>
        <SimpleContainer>
          <MainImageContainer source={{ uri: 'earn_coin' }} />
          <CenterTitleContainer marginTop={40}>
            <TitleText
              text={
                props.tutorialVideo
                  ? strLocale('Invest Now!')
                  : strLocale('Welcome to Trinkerr')
              }
              fontSize={sizes.h10}
              lineHeight={24}
              fontFamily={fonts.fontInterRegular}
              color={constant.lightWhiteColor}
            />
            {manageDescription()}
          </CenterTitleContainer>

          <ButtonContainer>
            <ButtonGlobal
              width={constant.buttonWidth - 60}
              testID={'get_started'}
              buttonText={
                props.tutorialVideo
                  ? strLocale('Explore Portfolios')
                  : strLocale('Get started')
              }
              onPress={getStarted}
              isLoading={props.isLoading}
            />
          </ButtonContainer>
        </SimpleContainer>
      </WelcomeContainer>
    );
  };

  const renderRewards = () => {
    return (
      <CardsMainContainer>
        <SubTitleContainer>
          <TitleText
            text={strLocale('home.Rewards')}
            fontSize={sizes.h12}
            fontFamily={fonts.fontInterMedium}
            color={constant.lightWhiteColor}
            opacity={'0.87'}
          />
        </SubTitleContainer>
        <RewardsGradientContainer>
          <SimpleContainer>
            <CardImageContainer source={{ uri: 'home_gift' }} />
            <CenterTitleContainer>
              <TitleText
                text={strLocale('Get ₹200')}
                fontSize={sizes.h10}
                lineHeight={24}
                fontFamily={fonts.fontInterSemiBold}
                color={constant.lightWhiteColor}
              />
              <DescriptionContainer>
                <TitleText
                  text={
                    isNewUser()
                      ? 'You get 200 and your friend gets 100 credits for their first investment via Trinkerr.'
                      : 'You get 200 and your friend gets 100 credits for their first investment via Trinkerr.'
                  }
                  fontSize={sizes.h13}
                  lineHeight={24}
                  fontFamily={fonts.fontInterRegular}
                  color={constant.lightWhiteColor}
                  textAlign={'center'}
                  opacity={isNewUser() ? 1.1 : 0}
                />
              </DescriptionContainer>
            </CenterTitleContainer>

            <ButtonContainer marginTop={6}>
              <ShareApp data={props.userDetails} />
            </ButtonContainer>
          </SimpleContainer>
        </RewardsGradientContainer>
      </CardsMainContainer>
    );
  };

  const renderPortfolio = () => {
    return (
      <CardsMainContainer>
        <SubTitleContainer>
          <TitleText
            text={strLocale('home.Create Portfolio')}
            fontSize={sizes.h12}
            fontFamily={fonts.fontInterMedium}
            color={constant.lightWhiteColor}
            opacity={'0.87'}
          />
        </SubTitleContainer>
        <RewardsGradientContainer>
          <SimpleContainer>
            <CardImageContainer source={{ uri: 'portfolio_bag' }} />
            <CenterTitleContainer>
              <TitleText
                text={strLocale('Build Your Own Portfolio')}
                fontSize={sizes.h11}
                lineHeight={24}
                fontFamily={fonts.fontInterSemiBold}
                color={constant.lightWhiteColor}
              />
            </CenterTitleContainer>

            <ButtonContainer>
              <ButtonGlobal
                width={constant.buttonWidth - 60}
                testID={'get_started'}
                buttonText={'Create Portfolio'}
                onPress={createPortfolio}
                isLoading={props.isLoading}
                backgroundColor={constant.textInputPlaceholderColor}
                textColor={constant.lightWhiteColor}
              />
            </ButtonContainer>
          </SimpleContainer>
        </RewardsGradientContainer>
      </CardsMainContainer>
    );
  };

  return (
    <SafeAreaContainer>
      <MainContainer>
        <HomeHeader />
        <ScrollView>
          {renderWelcome()}
          {renderRewards()}
          <WatchListInfo />
          {renderPortfolio()}
          <ScrollPaddingBottom />
        </ScrollView>
      </MainContainer>
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  rewardsGradientContainer: {
    marginTop: 10,
    borderRadius: 4,
  },
  bottomGradientContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: sizes.h13,
    color: constant.normalLightWhiteColor,
    fontFamily: fonts.fontInterRegular,
    lineHeight: 24,
    textAlign: 'center',
  },
  valueText: {
    color: constant.highLightWhiteColor,
    fontFamily: fonts.fontInterBold,
  },
  animatedView: {
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: '#BB86FC',
    marginLeft: constant.screenWidth - 70,
  },
});

const mapStateToProps = state => {
  return {
    userDetails: state.account.userDetails,
    userDetailsOtherData: state.account.userDetailsOtherData,
    isLoading: state.account.isLoading,
    analyticData: state.home.analyticData,
    tutorialVideo: state.home.tutorialVideo,
  };
};

export default connect(mapStateToProps, {})(HomeTabScreen);
