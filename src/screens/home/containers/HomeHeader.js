import React from 'react';
import constant from '../../../helper/constant';
import TitleText from '../../../component/TitleText/TitleText';
import { FullContainer } from '../../../component/GlobalStyles';
import {
  HeaderContainer,
  SubContainer,
  ImageContainer,
  HelpContainer,
  HelpSubContainer,
  RightImage,
  HelpTitle,
  NotificationImage,
  InviteSubContainer,
} from '../styled';
import { shortName } from '../../../modules/account/validator';
import fonts, { sizes } from '../../../helper/fonts';
import { connect } from 'react-redux';
import { notification, profileStack } from '../../../navigation/navigator';
import { useNavigation } from '@react-navigation/native';
import { UserEvent } from '../../../helper/fabricHelper/track';

const HomeHeader = props => {
  const navigation = useNavigation();

  const profileScreen = () => {
    try {
      UserEvent.userTrackScreen('homescreen_click_profile', {
        userid: props.userDetails._id,
        name: props.userDetails.name,
      });
      UserEvent.MoengageTrackScreen(
        ['userid', 'name'],
        [props.userDetails._id, props.userDetails.name],
        'homescreen_click_profile',
      );
    } catch (e) {}

    navigation.navigate(profileStack.profile_tab);
  };

  const notificationScreen = () => {
    navigation.navigate(notification.notification_screen);
    try {
      UserEvent.userTrackScreen('Homescreen_Notifications', {
        fieldType: 'Notifications',
        type: 'read',
      });
      UserEvent.MoengageTrackScreen(
        ['fieldType', 'type'],
        ['Notifications', 'read'],
        'Homescreen_Notifications',
      );
    } catch (e) {}
  };

  const onPressHelp = () => {
    try {
      UserEvent.userTrackScreen('homescreen_click_help', {
        userid: props.userDetails._id,
        name: props.userDetails.name,
        mobile: props.userDetails.mobile,
      });
      UserEvent.MoengageTrackScreen(
        ['userid', 'name', 'mobile'],
        [
          props.userDetails._id,
          props.userDetails.name,
          props.userDetails.mobile,
        ],
        'homescreen_click_help',
      );
    } catch (e) {}
  };

  return (
    <HeaderContainer
      height={constant.headerHeight + props.safeAreaInsetsData.top}
      paddingTop={props.safeAreaInsetsData.top}>
      <SubContainer>
        <ImageContainer onPress={profileScreen}>
          <TitleText
            text={shortName(props.userDetails.name || '')}
            fontSize={sizes.h12}
            fontFamily={fonts.fontInterRegular}
            color={constant.buttonFontColor}
          />
        </ImageContainer>
        <FullContainer />
        <InviteSubContainer onPress={notificationScreen}>
          <NotificationImage source={{ uri: 'icon_notification' }} />
        </InviteSubContainer>
        {/* <HelpContainer onPress={onPressHelp}>
          <HelpSubContainer>
            <RightImage source={{ uri: 'icon_help' }} />
            <HelpTitle>
              <TitleText
                text={'Help'}
                fontSize={sizes.h12}
                fontFamily={fonts.fontInterRegular}
                color={constant.buttonFontColor}
              />
            </HelpTitle>
          </HelpSubContainer>
        </HelpContainer> */}
      </SubContainer>
    </HeaderContainer>
  );
};

const mapStateToProps = state => {
  return {
    userDetails: state.account.userDetails,
    safeAreaInsetsData: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(HomeHeader);
