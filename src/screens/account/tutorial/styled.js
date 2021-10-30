import styled from 'styled-components/native';
import constant from '../../../helper/constant';

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const SubContainer = styled.View`
  flex: 1;
`;
export const ButtonWrapper = styled.TouchableOpacity`
  height: 64px;
  width: 64px;
  border-radius: 32px;
  align-items: center;
  background-color: ${constant.lightBlue};
  justify-content: center;
`;

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${constant.darkBackgroundColor};
`;

export const HeaderContent = styled.View`
  margin-top: 30px;
  align-self: center;
`;

export const ImageWrapper = styled.Image`
  height: 50px;
  width: 200px;
  resize-mode: contain;
  margin-horizontal: 4px;
  margin-top: 4px;
  align-self: center;
  margin-bottom: 4px;
`;
export const ImageHandWrapper = styled.Image`
  height: 50px;
  width: 200px;
  resize-mode: contain;
  margin-horizontal: 4px;
  margin-top: 22px;
  align-self: center;
  margin-bottom: 26px;
`;

export const ImageWrapperContainer = styled.View`
  border-radius: 4px;
  border: 1.5px ${constant.lightBlue};
  height: 20px;
  width: 20px;
`;

export const LogoImageCointainer = styled.Image`
  height: 40px;
  align-self: center;
  width: 40px;
  resize-mode: contain;
  align-self: center;
`;

export const FooterContainer = styled.View`
  align-items: center;
  margin-bottom: 26px;
`;

export const SafeAreaSubContainer = styled.View`
  flex: 1;
`;

export const CenterTextContainer = styled.View`
  margin-bottom: 56px;
  margin-top: 48px;
  margin-horizontal: 20px;
`;
