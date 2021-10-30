import styled from 'styled-components/native';
import React from 'react';
import constant from '../../helper/constant';
import LinearGradient from 'react-native-linear-gradient';

export const SafeAreaContainer = styled.View`
  flex: 1;
`;

export const WelcomeContainer = styled(LinearGradient).attrs({
  colors: constant.homeCardGradient,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  margin-top: 50px;
  margin-horizontal: 20px;
  border-radius: 4px;
`;

export const RewardsGradientContainer = styled(LinearGradient).attrs({
  colors: constant.rewardsCardGradient,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  margin-top: 10px;
  border-radius: 4px;
  margin-horizontal: 20px;
`;

export const HeaderContainer = styled.View`
  width: ${constant.screenWidth}px;
  height: ${props => (props.height ? `${props.height}px` : '6%')};
  padding-top: ${props => (props.paddingTop ? props.paddingTop : '0px')};
  background-color: #262626;
  flex-direction: row;
`;

export const SubContainer = styled.View`
  flex: 1;
  flex-direction: row;
  margin-horizontal: 20px;
  margin-top: 13px;
  margin-bottom: 13px;
`;

export const ImageContainer = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 40px;
  background-color: #bb86fc;
  height: 38px;
  width: 38px;
`;

export const HelpContainer = styled.View`
  border-radius: 20px;
  background-color: #bb86fc;
`;

export const HelpSubContainer = styled.View`
  margin-horizontal: 4px;
  flex-direction: row;
  margin-top: 4px;
`;

export const RightImage = styled.Image`
  height: 15px;
  width: 15px;
  resize-mode: contain;
  margin-top: 6px;
  margin-horizontal: 9px;
`;

export const NotificationImage = styled.Image`
  height: 24px;
  width: 24px;
  resize-mode: contain;
  margin-top: 5px;
  margin-horizontal: 15px;
`;

export const HelpTitle = styled.View`
  margin-horizontal: 10px;
`;

export const MainImageContainer = styled.Image`
  height: 174px;
  width: ${constant.screenWidth - 40}px;
  resize-mode: contain;
  resize-mode: contain;
  margin-bottom: -50px;
`;

export const CardImageContainer = styled.Image`
  height: 60px;
  width: ${constant.screenWidth - 40}px;
  resize-mode: contain;
  resize-mode: contain;
  margin-top: 20px;
  margin-bottom: -10px;
`;

export const CenterTitleContainer = styled.View`
  margin-top: ${props => (props.marginTop ? props.marginTop : '20')}px;
  align-items: center;
`;

export const DescriptionContainer = styled.View`
  margin-top: 11px;
  margin-horizontal: 16px;
`;

export const ButtonContainer = styled.View`
  margin-top: ${props => (props.marginTop ? props.marginTop : '21')}px;
  align-items: center;
  margin-bottom: 24px;
`;

export const SubTitleContainer = styled.View`
  margin-top: 32px;
  margin-horizontal: 20px;
`;

export const FavoriteWatchListWrapper = styled.View`
  margin-horizontal: 20px;
`;

export const CardsMainContainer = styled.View``;

export const WatchListEmptyContainer = styled.View``;

export const InviteSubContainer = styled.TouchableOpacity``;

export const ShareAppContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  align-items: center;
  background-color: ${constant.lightBlue};
  justify-content: center;
`;
