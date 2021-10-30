import React from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import constant from '../../../../helper/constant';
import fonts, { sizes } from '../../../../helper/fonts';

const ErrorTitle = props => {
  const {
    backgroundContainer,
    borderContainer,
    errorSubContainer,
    errorText,
    imageContainer,
    mainCircle,
    imageSize,
  } = styles;

  const validateBoxBackground = () => {
    if (!checkValidation()) {
      return '#27C5C1';
    } else if (props.valueError !== '') {
      return constant.textHeaderErrorColor;
    } else {
      return '#59595C';
    }
  };

  const validationOpacityBackground = () => {
    if (!checkValidation()) {
      return 0.7;
    } else if (props.valueError !== '') {
      return 1.0;
    } else {
      return 0.35;
    }
  };

  const validationOpacityBorder = () => {
    if (!checkValidation()) {
      return 1.0;
    } else if (props.valueError !== '') {
      return 1.0;
    } else {
      return 0.2;
    }
  };

  const textColor = () => {
    if (!checkValidation()) {
      return '#9B9B9F';
    } else if (props.valueError !== '') {
      return constant.textHeaderErrorColor;
    } else {
      return '#9B9B9F';
    }
  };

  const checkValidation = () => {
    return props.isCheck;
  };

  return (
    <View style={errorSubContainer}>
      <View style={mainCircle}>
        <View
          style={[
            backgroundContainer,
            {
              backgroundColor: validateBoxBackground(),
              opacity: validationOpacityBackground(),
            },
          ]}
        />
        <View
          style={[
            borderContainer,
            {
              borderColor: validateBoxBackground(),
              opacity: validationOpacityBorder(),
            },
          ]}
        />
        <View style={imageContainer}>
          <Image
            source={{ uri: 'correct' }}
            resizeMode={'contain'}
            style={imageSize}
          />
        </View>
      </View>

      <Text
        style={[
          errorText,
          {
            color: textColor(),
          },
        ]}>
        {props.title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorSubContainer: {
    flexDirection: 'row',
  },
  backgroundContainer: {
    position: 'absolute',
    left: 1,
    top: 1,
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  borderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: constant.transparent,
    borderWidth: 1,
    borderRadius: 9,
  },
  errorText: {
    fontSize: sizes.h12,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 20,
    marginHorizontal: 8,
  },
  mainCircle: {
    height: 18,
    width: 18,
    borderRadius: 9,
  },
  imageContainer: {
    position: 'absolute',
    width: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSize: {
    width: 9,
    height: 9,
  },
});

export default ErrorTitle;
