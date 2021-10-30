import React, { useState, useEffect } from 'react';
import constant from '../../../helper/constant';
import TitleText from '../../../component/TitleText/TitleText';
import ButtonGlobal from '../../../component/ButtonGlobal/ButtonGlobal';
import TextInputCustom from '../../../component/TextInputCustom/GlobalTextInput';
import AppHeader from '../../../component/AppHeader/AppHeader';
import Switch from '../../../component/Switch/Switch';
import fonts, { sizes } from '../../../helper/fonts';
import { strLocale } from 'locale';
import { useNavigation } from '@react-navigation/native';
import {
  ButtonContainer,
  FullContainer,
  LabelContainer,
  MainContainer,
} from '../../../component/GlobalStyles';
import {
  PortfolioContainer,
  DescriptionContainer,
  SubContainer,
} from './styled';
import { connect } from 'react-redux';
import { createPortFolio } from '../../../modules/home/actions';
import { UserEvent } from '../../../helper/fabricHelper/track';

const CreatePortfolioScreen = props => {
  const navigation = useNavigation();

  const [portfolioName, setPortfolioName] = useState({ value: '', error: '' });
  const [isPublic, setIsPublic] = useState(props.isPublic || false);

  useEffect(() => {
    try {
      UserEvent.userTrackScreen('Create_Portfolio_landing', {
        Source: 'Homescreen',
      });
      UserEvent.MoengageTrackScreen(
        ['Source'],
        ['Homescreen'],
        'Create_Portfolio_landing',
      );
    } catch (e) {}
  }, []);

  const onChangeSwitch = value => {
    setIsPublic(!isPublic);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const checkSaveEnable = () => {
    if (portfolioName.value === '') {
      return true;
    }
    return false;
  };

  const onPressSave = () => {
    const model = {
      name: portfolioName.value,
      isPublic: isPublic,
      assetClasses: ['Equity'],
      indicatedTradingFrequency: 2,
      initialInvestment: 0,
    };

    props
      .createPortFolio(model)
      .then(res => {
        try {
          UserEvent.userTrackScreen('Create_Portfolio_Save', {
            fieldtype: 'Save',
            Type: model.isPublic,
            Page: 'Create Portfolio',
            Portfolio_name: model.name,
          });
          UserEvent.MoengageTrackScreen(
            ['fieldtype', 'Type', 'Page', 'Portfolio_name'],
            ['Save', model.isPublic, 'Create Portfolio', model.name],
            'Create_Portfolio_Save',
          );
        } catch (e) {}

        navigation.goBack();
        navigation.navigate('Invest', { isUpdate: true });
      })

      .catch(err => {});
  };

  const renderCreatePortfolio = () => {
    return (
      <PortfolioContainer>
        <LabelContainer>
          <TitleText
            text={strLocale('profile.Portfolio Name')}
            fontSize={sizes.h14}
            color={constant.textInputBorderColor}
            fontFamily={fonts.fontInterRegular}
          />
        </LabelContainer>
        <TextInputCustom
          testID={'name'}
          trackId={'signup_name'}
          validation={portfolioName}
          setValue={(text, isCheck = false) => {
            if (isCheck === false) {
              setPortfolioName({ value: text, error: '' });
            }
          }}
        />
      </PortfolioContainer>
    );
  };

  const renderDescription = () => {
    return (
      <DescriptionContainer>
        <SubContainer>
          <TitleText
            text={strLocale('account.Make Portfolio Public')}
            color={constant.lightWhiteColor}
            opacity={0.87}
            fontFamily={fonts.fontInterRegular}
            fontSize={sizes.h13}
          />
          <FullContainer />
          <Switch value={isPublic} onChange={onChangeSwitch} />
        </SubContainer>
        <TitleText
          text={strLocale(
            'account.By default your portfolio will only be visible to you',
          )}
          color={constant.lightWhiteColor}
          opacity={0.6}
          fontFamily={fonts.fontInterRegular}
          fontSize={sizes.h17}
        />
      </DescriptionContainer>
    );
  };

  const renderBottom = () => {
    return (
      <ButtonContainer>
        <ButtonGlobal
          testID={'btn_continue'}
          buttonText={'Save'}
          onPress={onPressSave}
          isLoading={props.isLoading}
          disabled={checkSaveEnable()}
        />
      </ButtonContainer>
    );
  };

  return (
    <MainContainer behavior={constant.isIOS ? 'padding' : null}>
      <AppHeader
        backgroundColor={constant.darkBackgroundColor}
        backScreenName={'Create new portfolio'}
        onPressBack={onPressBack}
      />
      {renderCreatePortfolio()}
      {renderDescription()}
      {renderBottom()}
    </MainContainer>
  );
};

const mapStateToProps = state => {
  return {
    safeAreaInsetsDefault: state.account.safeAreaInsetsDefault,
    isLoading: state.account.isLoading,
  };
};

export default connect(mapStateToProps, {
  createPortFolio,
})(CreatePortfolioScreen);
