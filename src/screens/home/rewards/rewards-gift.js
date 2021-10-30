import React, { useEffect } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import AppHeader from '../../../component/AppHeader/AppHeader';
import TitleText from '../../../component/TitleText/TitleText';
import ButtonGlobal from '../../../component/ButtonGlobal/ButtonGlobal';
import TextInputCustom from '../../../component/TextInputCustom/GlobalTextInput';
import constant from '../../../helper/constant';
import fonts, { sizes } from '../../../helper/fonts';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { strLocale } from 'locale';
import { UserEvent } from '../../../helper/fabricHelper/track';
import {
  LabelContainer,
  ButtonContainer,
  SimpleContainer,
} from '../../../component/GlobalStyles';
import {
  MainContainer,
  DescriptionContainer,
  InstructionContainer,
  TextBoxContainer,
  CopyLinkContainer,
  CopyLinkBox,
  ImageContainer,
  ImageView,
  CopyTitleContainer,
} from './styled';

const RewardsGiftScreen = ({ route, navigation, props }) => {
  const { userData } = route.params;
  const deepLink = userData.deepLink;

  useEffect(() => {
    try {
      UserEvent.userTrackScreen('Referral_landing', {
        Source: 'Homescreen',
        Referral_ID: deepLink,
      });
      UserEvent.MoengageTrackScreen(
        ['Source', 'Referral_ID'],
        ['Homescreen', deepLink],
        'Referral_landing',
      );
    } catch (e) {}
  }, []);

  const onPressBack = () => {
    navigation.goBack();
  };

  const copyLink = () => {

    try {
      UserEvent.userTrackScreen('Referral_share', {
        fieldtype: 'Copy Link',
        Page: 'Referral',
        Referral_ID: deepLink,
      });
      UserEvent.MoengageTrackScreen(
        ['fieldtype', 'Page', 'Referral_ID'],
        ['Copy Link', 'Referral', deepLink],
        'Referral_share',
      );
    } catch (e) {}

    Clipboard.setString(
      `I am on Trinkerr - India's first social trading platform. Find best traders, evaluate their performance and invest in them with single click. Come, join me!\n${deepLink}`,
    );
    showMessage({
      message: 'Share link copied to your clipboard.',
      backgroundColor: '#FFFFFF',
      color: '#606060',
    });
  };

  const onPressShare = async () => {
    UserEvent.userTrackScreen('Referral_share', {
      fieldtype: 'Share with your friends',
      Page: 'Referral',
      Referral_ID: deepLink,
    });
    UserEvent.MoengageTrackScreen(
      ['fieldtype', 'Page', 'Referral_ID'],
      ['Share with your friends', 'Referral', deepLink],
      'Referral_share',
    );
    const shareOptions = {
      url: `${deepLink}`,
    };
    try {
      const ShareResponse = await Share.open(shareOptions);
    } catch (error) {}
  };

  const renderImage = () => {
    return (
      <ImageContainer>
        <ImageView source={{ uri: 'gift' }} />
      </ImageContainer>
    );
  };

  const renderTitle = () => {
    return (
      <DescriptionContainer>
        <TitleText
          text={strLocale('home.Get ₹200 in Trinkerr')}
          fontSize={sizes.h10}
          color={constant.lightWhiteColor}
          fontWeight={fonts.fontInterBold}
          lineHeight={35}
          textAlign={'center'}
        />
        <InstructionContainer>
          <TitleText
            text={
              'You get 200 and your friend gets 100 credits for their first investment via Trinkerr.'
            }
            fontSize={sizes.h13}
            color={constant.textGrayColor}
            fontWeight={fonts.fontInterSemiBold}
            textAlign={'center'}
            lineHeight={20}
            opacity={'0.6'}
          />
        </InstructionContainer>
      </DescriptionContainer>
    );
  };

  const renderTextBox = () => {
    return (
      <TextBoxContainer>
        <LabelContainer>
          <TitleText
            text={strLocale('home.link')}
            fontSize={sizes.h14}
            color={constant.textInputBorderColor}
            fontFamily={fonts.fontInterRegular}
          />
        </LabelContainer>
        <TextInputCustom value={deepLink} editable={false} opacity={'0.87'} />
      </TextBoxContainer>
    );
  };

  const renderCopyLink = () => {
    return (
      <CopyLinkContainer>
        <CopyLinkBox onPress={copyLink}>
          <CopyTitleContainer>
            <TitleText
              text={strLocale('home.Copy Link')}
              fontSize={sizes.h13}
              color={constant.textInputBorderColor}
              fontWeight={fonts.fontInterSemiBold}
              lineHeight={16}
            />
          </CopyTitleContainer>
        </CopyLinkBox>
      </CopyLinkContainer>
    );
  };

  const renderButton = () => {
    return (
      <ButtonContainer>
        <ButtonGlobal
          testID={'btn_share'}
          buttonText={strLocale('home.Share')}
          onPress={onPressShare}
        />
      </ButtonContainer>
    );
  };

  return (
    <MainContainer>
      <AppHeader
        onPressBack={onPressBack}
        isHide={false}
        backScreenName={'Share'}
        textAlign={'center'}
      />
      {renderImage()}
      {renderTitle()}
      {renderTextBox()}
      {renderCopyLink()}
      {renderButton()}
      <SimpleContainer>
        <FlashMessage
          position="bottom"
          style={{
            marginBottom: 92,
            marginHorizontal: 8,
            borderRadius: 6,
          }}
        />
      </SimpleContainer>
    </MainContainer>
  );
};

export default RewardsGiftScreen;
