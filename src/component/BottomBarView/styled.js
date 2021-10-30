import styled from 'styled-components/native';
import constant from '../../helper/constant';
import fonts, { sizes } from '../../helper/fonts';
export const MainWrapper = styled.View`
  flex: 1;
`;
export const Title = styled.Text`
  color: ${constant.lightWhite};
  font-size: 16px;
  font-family: ${fonts.fontRubikRegular};
  margin-top: 1px;
  margin-left: 20px;
`;

export const CompositionChartView = styled.View`
  border: 1px;
  background: #FFF1B8;
  border-radius: 3px;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 40px;
  width: 91%
  align-items: center;
`;

export const DataView = styled.View`
  flex: 1;
`;

export const CompositionDataView = styled.View`
  align-items: center;
  flex: 1;
  background-color: ${constant.linearGrayColor};
  padding-horizontal: 10px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  padding-top: 6px;
  padding-bottom: 6px;
`;

export const ButtonText = styled.Text`
  font-size: 13px;
  font-family: ${fonts.fontRubikRegular};
  margin-left: 8px;
  color: ${constant.appGrayColor};
  flex: 1;
  align-self: center;
`;

export const BrokerView = styled.TouchableOpacity`
  align-items: center;
  flex: 1;
  height: 40px;
  flex-direction: row;
`;

export const InnerView = styled.View`
  flex-direction: row;
`;

export const BrokerNameView = styled.View`
  flex-direction: row;
  flex: 1;
`;

export const BrokerDetailView = styled.View`
  flex-direction: column;
  flex: 1;
  margin-left: 20px;
  align-items: flex-end;
  margin-horizontal: 20px;
`;

export const BrokerImage = styled.Image`
  height: 55px;
  width: 93px;
`;

export const DropDownImage = styled.Image`
  height: 60px;
  width: 10px;
  resize-mode: contain;
  tint-color: black;
  margin-left: 8px;
`;
