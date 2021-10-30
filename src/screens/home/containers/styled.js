import React from 'react';
import styled from 'styled-components/native';
import constant from '../../../helper/constant';
import LinearGradient from 'react-native-linear-gradient';

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  background-color: ${constant.darkBackgroundColor};
`;

export const WatchlistCardTitleContainer = styled.View`
  margin-top: 32px;
  margin-horizontal: 20px;
`;

export const EmptyImageContainer = styled.Image`
  height: 189px;
  resize-mode: contain;
  margin-top: 10px;
  align-items: center;
`;

export const NonEmptyImageContainer = styled.Image`
  height: 70px;
  width: 107px;
  resize-mode: cover;
  margin-top: -2px;
`;

export const DescriptionContainer = styled.View`
  margin-top: 10px;
  margin-horizontal: 16px;
`;

export const ButtonContainer = styled.TouchableOpacity`
  margin-top: ${props => (props.marginTop ? props.marginTop : '0')}px;
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  flex-direction: row;
  margin-horizontal: ${props =>
    props.marginHorizontal ? props.marginHorizontal : '0'}px;
`;

export const HeartImage = styled.Image`
  height: 23px;
  width: 27px;
  resize-mode: contain;
  margin-top: -15px;
`;

export const WatchListInfoContainer = styled.View`
  margin-bottom: 20px;
`;

export const WatchListContainer = styled(LinearGradient).attrs({
  colors: constant.watchlistCardGradient,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
})`
  margin-top: 10px;
  border-radius: 10px;
`;
