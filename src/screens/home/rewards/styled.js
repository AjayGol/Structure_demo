import React from 'react';
import styled from 'styled-components/native';
import constant from '../../../helper/constant';

export const MainContainer = styled.View`
  flex: 1;
  background-color: ${constant.darkBackgroundColor};
`;
export const DescriptionContainer = styled.View`
  margin-top: 32px;
  margin-horizontal: 20px;
`;

export const InstructionContainer = styled.View`
  margin-top: 8px;
`;

export const TextBoxContainer = styled.View`
  flex-direction: row;
  margin-top: 25px;
  margin-horizontal: 20px;
`;

export const CopyLinkContainer = styled.View`
  flex: 1;
  margin-horizontal: 20px;
`;

export const CopyLinkBox = styled.TouchableOpacity`
  margin-top: 10px;
  border: 1px;
  justify-content: center;
  align-items: center;
`;

export const CopyTitleContainer = styled.View`
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ImageContainer = styled.View`
  margin-top: 16px;
`;

export const ImageView = styled.Image`
  height: 81px;
  width: 78px;
  margin-right: 9px;
  align-self: center;
  resize-mode: contain;
  align-items: center;
  justify-content: center;
`;
