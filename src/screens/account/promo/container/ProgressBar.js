import React, { useEffect, useState } from 'react';
import {
  MainContainerWrapper,
  ProgressContainer,
  ProgressLine,
  ProgressLineDisable,
} from './styled';
import Animated from 'react-native-reanimated';

const ProgressBar = props => {
  const [arr, setArr] = useState([]);

  useEffect(() => {
    let arrTemp = [];
    for (let i = 0; i < props.noOfSlider; i++) {
      arrTemp.push(i);
    }
    setArr(arrTemp);
  }, []);

  const { sliderValue } = props;

  return (
    <MainContainerWrapper>
      {props.noOfSlider && !props.isHideDetail && (
        <ProgressContainer>
          {arr.map(i => {
            if (props.selectedSlider - 1 === i) {
              return (
                <ProgressLineDisable key={i}>
                  <Animated.View
                    style={[
                      {
                        width: sliderValue,
                        backgroundColor: '#9e89ff',
                        height: 4,
                      },
                    ]}
                    pointerEvents="none"
                  />
                </ProgressLineDisable>
              );
            } else {
              return (
                <ProgressLine
                  opacity={1.0}
                  key={i}
                  backGroundColor={props.selectedSlider > i && '#9e89ff'}
                />
              );
            }
          })}
        </ProgressContainer>
      )}
    </MainContainerWrapper>
  );
};

export default ProgressBar;
