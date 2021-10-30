import React from 'react';
import TitleText from '../../../component/TitleText/TitleText';
import { strLocale } from 'locale';
import fonts, { sizes } from '../../../helper/fonts';
import { useNavigation } from '@react-navigation/native';
import { homeStack } from '../../../navigation/navigator';
import { InviteSubContainer, ShareAppContainer } from '../styled';
import constant from '../../../helper/constant';
import ButtonGlobal from '../../../component/ButtonGlobal/ButtonGlobal';
import { UserEvent } from '../../../helper/fabricHelper/track';

const ShareApp = props => {
  const navigation = useNavigation();

  const onPressLink = () => {
    const userdata = props.data;
    try {
      UserEvent.userTrackScreen('Homescreen_Referral_click', {
        fieldType: 'Referral',
        page: 'Home Screen',
      });
      UserEvent.MoengageTrackScreen(
        ['fieldType', 'page'],
        ['Referral', 'Home Screen'],
        'Homescreen_Referral_click',
      );
    } catch (e) {}

    navigation.navigate(homeStack.rewards_gift, {
      userData: userdata,
    });
  };

  return (
    <ButtonGlobal
      width={constant.buttonWidth - 60}
      testID={'get_started'}
      buttonText={strLocale('Invite your friends & earn')}
      onPress={onPressLink}
      isLoading={props.isLoading}
      backgroundColor={constant.textInputPlaceholderColor}
      textColor={constant.lightWhiteColor}
    />
  );
};

export default ShareApp;
