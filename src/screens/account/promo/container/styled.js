import styled from 'styled-components/native';
import React from 'react';

export const MainContainerWrapper = styled.View`
  justify-content: center;
  margin-horizontal: 20px;
`;

export const ProgressContainer = styled.View`
  width: 100%;
  margin-top: 24px;
  height: 4px;
  flex-direction: row;
  justify-content: space-between;
`;

export const ProgressLine = styled.View`
  flex: 1;
  background-color: ${props =>
    props.backGroundColor ? props.backGroundColor : '#FFFFFF'};
  opacity: ${props => (props.opacity ? props.opacity : '0.6')};
  margin-left: 2px;
`;

export const ProgressLineDisable = styled.View`
  flex: 1;
  margin-left: 2px;
  width: ${props => props.width || '0'}px;
  background-color: rgba(255, 255, 255, 1);
`;
