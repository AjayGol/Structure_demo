import React, { useEffect, useState, useRef } from 'react';
import {
  MainWrapper,
  SubWrapper,
  ButtonViewWrapper,
  ButtonInnerImage,
  ButtonText,
  TopViewWrapper,
  CenterText,
  BackScreenWrapper,
  InnerImageNavBar,
  InnerRightImageNavBar,
  InnerLeftImageNavBar,
  FullWrapContainer,
  RightWrapContainer,
  LeftWrapContainer,
  RightContainer,
  TextInputNavBar,
  SearchBarContainer,
  LeftContainer,
  MainRightView,
  RightSettingContainer,
  InnerRightSettings,
  InnerRightSettingsTitle,
} from './styled';
import TitleText from '../TitleText/TitleText';
import constant from '../../helper/constant';
import { connect } from 'react-redux';
import SearchBar from '../SearchBar/SearchBar';
import fonts, { sizes } from '../../helper/fonts';

const NavBar = props => {
  const [input, setInput] = useState('');
  const inputRef = useRef();
  const {
    backScreenName,
    onPressClose,
    leftImage,
    rightImage,
    rightSideImage,
    onPressBack,
    rightTitle,
    onPressRight,
    disabled,
    isHide,
    isInput,
    isSearch,
    rightContent,
    settingTitle,
    isBackHide,
    redeemHide,
  } = props;

  const onInputChange = text => {
    setInput(text);
    props.manageInputFunction(text);
  };

  useEffect(() => {
    if (isInput) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isInput]);

  const onPressHide = () => {
    props.onPressRight();
  };

  const onPressFollow = () => {
    const { onPressRedeem } = props;
    if (onPressRedeem) {
      onPressRedeem();
    }
  };

  const renderRightSide = () => {
    return (
      <RightContainer onPress={onPressRight}>
        {rightTitle && (
          <RightWrapContainer onPress={onPressRight}>
            <TitleText
              color={constant.lightWhiteColor}
              fontSize={14}
              text={rightTitle}
              hideText={disabled}
            />
          </RightWrapContainer>
        )}
        {rightImage && (
          <RightWrapContainer onPress={onPressRight}>
            <InnerRightImageNavBar
              source={{
                uri: props.rightImage,
              }}
            />
          </RightWrapContainer>
        )}
        {rightSideImage && (
          <MainRightView>
            {!redeemHide && (
              <ButtonViewWrapper
                backgroundColor={props.backgroundColor}
                onPress={onPressFollow}>
                <ButtonText
                  textColor={props.textColor}
                  fontFamily={fonts.fontInterMedium}>
                  {'Redeem'}
                </ButtonText>
              </ButtonViewWrapper>
            )}
            <RightWrapContainer onPress={onPressRight}>
              <InnerRightImageNavBar source={{ uri: props.rightSideImage }} />
            </RightWrapContainer>
          </MainRightView>
        )}
        {rightContent && (
          <RightSettingContainer onPress={onPressRight}>
            <InnerRightSettings
              source={{
                uri: props.rightContent || '',
              }}
            />
            <InnerRightSettingsTitle>
              <TitleText
                color={constant.lightWhiteColor}
                fontSize={14}
                text={settingTitle}
                hideText={disabled}
              />
            </InnerRightSettingsTitle>
          </RightSettingContainer>
        )}
      </RightContainer>
    );
  };
  const renderLeftSide = () => {
    return (
      <LeftContainer onPress={onPressBack}>
        {leftImage && (
          <LeftWrapContainer onPress={onPressBack}>
            <InnerLeftImageNavBar source={{ uri: props.leftImage }} />
          </LeftWrapContainer>
        )}
      </LeftContainer>
    );
  };

  return (
    <MainWrapper
      height={constant.headerHeight + props.safeAreaInsetsData.top}
      paddingTop={props.safeAreaInsetsData.top}
      backgroundColor={props.backgroundColor}>
      {!isHide && (
        <SubWrapper>
          {!isInput && backScreenName && (
            <TopViewWrapper>
              <CenterText
                manageLeft={(isBackHide && 20) || 52}
                textAlign={props.textAlign}>
                <TitleText
                  color={constant.lightWhiteColor}
                  fontSize={14}
                  text={props.backScreenName}
                />
              </CenterText>
            </TopViewWrapper>
          )}
          {onPressClose && (
            <BackScreenWrapper onPress={onPressClose}>
              <InnerImageNavBar
                source={{
                  uri: 'icon_close',
                }}
              />
            </BackScreenWrapper>
          )}
          {(isInput || backScreenName) && !isBackHide && !isSearch && (
            <BackScreenWrapper onPress={onPressBack}>
              <InnerImageNavBar
                source={{
                  uri: 'arrow_back',
                }}
              />
            </BackScreenWrapper>
          )}
          {isInput && (
            <TextInputNavBar
              onChangeText={text => onInputChange(text)}
              value={input}
              placeholder="search"
              placeholderTextColor={constant.lightWhite}
              ref={inputRef}
            />
          )}
          {isSearch && (
            <SearchBarContainer>
              <SearchBar
                title={'TRINKERR'}
                rightImage={'notification'}
                rightImage2={'search'}
                onPressBack={onPressHide}
                onChangeText={text => props.onChangeText(text)}
                autoFocus={true}
              />
            </SearchBarContainer>
          )}
          {renderLeftSide()}
          <FullWrapContainer />
          {!isSearch && !isInput && renderRightSide()}
        </SubWrapper>
      )}
    </MainWrapper>
  );
};

const mapStateToProps = state => {
  return {
    safeAreaInsetsData: state.account.safeAreaInsetsDefault,
  };
};

export default connect(mapStateToProps, {})(NavBar);
