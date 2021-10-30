import styled from 'styled-components/native';
import constant from '../../helper/constant';
import fonts, { sizes } from '../../helper/fonts';

export const MainWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${props => props.backgroundColor || constant.headerBGColor};
  height: ${props => (props.height ? `${props.height}px` : '6%')};
  padding-top: ${props => (props.paddingTop ? props.paddingTop : '0px')};
`;

export const SubWrapper = styled.View`
  flex: 1px;
  flex-direction: row;
`;

export const MainRightView = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const TopViewWrapper = styled.View`
  left: 0px;
  right: 0px;
  bottom: 0px;
  top: 0px;
  position: absolute;
  justify-content: center;
`;

export const CenterText = styled.Text`
  margin-horizontal: ${props => (props.manageLeft ? props.manageLeft : 52)}px;
  text-align: ${props => (props.textAlign ? props.textAlign : 'left')};
`;

export const BackScreenWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
`;

export const RightContainer = styled.View`
  justify-content: center;
`;
export const LeftContainer = styled.View`
  justify-content: center;
`;

export const InnerImageNavBar = styled.Image`
  height: 28px;
  width: 28px;
  resize-mode: contain;
`;

export const InnerRightImageNavBar = styled.Image`
  height: 25px;
  width: 35px;
  resize-mode: contain;
`;
export const InnerLeftImageNavBar = styled.Image`
  height: 20px;
  width: 28px;
  resize-mode: contain;
`;

export const FullWrapContainer = styled.Image`
  flex: 1px;
`;

export const RightWrapContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  right: 18px;
`;

export const LeftWrapContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-right: 14px;
  left: 15px;
`;

export const RightSettingContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  right: 15px;
  background-color: rgba(187, 134, 252, 0.12);
  border-radius: 20px;
`;

export const InnerRightSettings = styled.Image`
  height: 11px;
  width: 11px;
  resize-mode: contain;
  margin-left: 8px;
`;

export const InnerRightSettingsTitle = styled.View`
  margin-horizontal: 10px;
`;

export const TextInputNavBar = styled.TextInput`
  color: ${constant.lightWhite};
  flex: 1;
  margin-left: 25px;
  font-size: 14px;
`;

export const SearchBarContainer = styled.View`
  align-items: center;
  justify-content: center;
  /* right: 25px; */
`;

export const ButtonViewWrapper = styled.TouchableOpacity`
  height: 34px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 45%;
  background: rgba(187, 134, 252, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-right: 27px;
`;

export const ButtonText = styled.Text`
  color: ${constant.primaryPurple};
  font-size: 16px;
  font-family: ${fonts.fontInterRegular};
`;
