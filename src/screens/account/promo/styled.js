import styled from 'styled-components/native';
import React from 'react';
import constant from '../../../helper/constant';

export const SafeAreaContainer = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const SubContainer = styled.View`
  flex: 1;
`;

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${constant.darkBackgroundColor};
`;

export const HeaderContent = styled.View`
  margin-top: 12px;
  margin-horizontal: 20px;
  flex-direction: row;
`;

export const ImageWrapper = styled.Image`
  height: 8px;
  width: 8px;
  resize-mode: contain;
  margin-horizontal: 4px;
  margin-top: 4px;
  margin-bottom: 4px;
`;

export const ImageWrapperContainer = styled.View`
  border-radius: 4px;
  border: 1.5px ${constant.lightBlue};
  height: 20px;
  width: 20px;
`;

export const MainTitle = styled.View`
  flex: 1;
  margin-horizontal: 4px;
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

export const DescriptionTextContainer = styled.View`
  margin-top: 12px;
`;

export const CenterImageContainer = styled.View`
  flex: 1;
`;

export const CenterImage = styled.Image`
  height: ${(constant.screenWidth - 40) * 0.67}px;
  width: ${constant.screenWidth - 40}px;
  resize-mode: contain;
`;
