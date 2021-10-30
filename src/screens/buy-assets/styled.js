import styled from 'styled-components/native';
import React from 'react';
import constant from '../../helper/constant';
import fonts from '../../helper/fonts';

export const ModalView = styled.View`
  padding: 16px;
  flex: 1;
  background-color: #141414;
`;

export const AssetCard = styled.View`
  margin-horizontal: 12px;
  padding: 12px;
  background-color: #272727;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
`;

export const CardLeft = styled.View`
  flex: 1;
  margin-right: 8px;
`;

export const CardRight = styled.View`
  flex: 1;
`;

export const InterText = styled.Text`
  font-family: ${props =>
    props.fontFamily ? props.fontFamily : fonts.fontInterRegular};
  font-size: ${props => (props.size ? props.size : '14')}px;
  color: ${props =>
    props.color ? props.color : constant.normalLightWhiteColor};
  margin-bottom: 4px;
`;

export const ButtonContainer = styled.View`
  padding-horizontal: 9px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 42px;
`;

export const RedButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #f13642;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
`;

export const BlueButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #1890ff;
  height: 36px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-right: 8px;
`;

export const PortfolioBox = styled.TouchableOpacity`
  border-radius: 2px;
  border-width: 1px;
  background-color: #262626;
  border-color: ${constant.primaryPurple};
  padding: 6px 15px;
  flex-direction: row;
  width: 70%;
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const PortfolioContainer = styled.TouchableOpacity`
  margin-left: 8px;
  padding: 18px 0;
`;

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${constant.darkBackgroundColor};
`;

export const SubContainer = styled.View`
  flex: 1;
  padding: 24px 16px 0;
`;

export const HorizontalContainer = styled.View`
  flex-direction: row;
  width: 100%;
  height: 100px;
`;

export const QtyInput = styled.TextInput`
  border-width: 1px;
  border-color: ${constant.primaryPurple};
  background-color: #262626;
  color: ${constant.normalLightWhiteColor};
  font-size: 12px;
  height: 34px;
  border-radius: 2px;
  justify-content: center;
  padding-left: 12px;
`;

export const QuantityText = styled.TextInput`
  border-width: 1px;
  font-size: 12px;
  height: 34px;
  justify-content: center;
  font-family: ${fonts.fontInterRegular};
  border-color: ${constant.primaryPurple};
  color: ${constant.normalLightWhiteColor};
  background-color: #262626;
  align-items: center;
  padding: 0 10px;
`;

export const TotalPriceBox = styled.View`
  border-width: 1px;
  border-color: #434343;
  background-color: #262626;
  height: 34px;
  border-radius: 2px;
  justify-content: center;
  padding-left: 12px;
`;

export const SelectedBox = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${props =>
    props.isSelected ? constant.primaryPurple : '#434343'};
  background-color: #262626;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
`;

export const BuyButton = styled.TouchableOpacity`
  background-color: #1890ff;
  border-radius: 4px;
  margin-horizontal: 20px;
  justify-content: center;
  align-items: center;
  height: 36px;
  margin-bottom: 8px;
`;

export const MainWrapperheader = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${constant.headerBGColor};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
`;

export const BackButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 10%;
  flex: 1;
  justify-content: flex-end;
`;

export const ToggleButtonWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  width: 10%;
  flex: 1;
  margin-right: 12;
  justify-content: flex-end;
`;

export const InnerImageNavBar = styled.Image`
  height: 30px;
  width: 30px;
  resize-mode: contain;
`;

export const ScripData = styled.View`
  flex-direction: column;
  margin-left: 10px;
  flex: 6;
`;
