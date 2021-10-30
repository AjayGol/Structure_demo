import React from 'react';
import constant from '../../helper/constant';
import fonts, { sizes } from '../../helper/fonts';
import { strLocale } from 'locale';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';

const ButtonCustomComponent = props => {
  const { btnLogin, titleHeader, imageStyle } = styles;
  const { image, imageOtherStyles, isImageHide } = props;

  return (
    <TouchableOpacity
      testID={props.testID}
      onPress={props.onPress}
      disabled={props.isDisable || false}
      style={[
        btnLogin,
        props.otherStyle || {},
        props.isDisable ? { opacity: 0.6 } : { opacity: 1 },
        { height: 40 },
      ]}>
      {!props.isLoading && image && !isImageHide && (
        <Image
          resizeMode="contain"
          style={[imageStyle, imageOtherStyles]}
          source={{ uri: image }}
        />
      )}
      {(props.isLoading && <ActivityIndicator color={'#FFF'} />) || (
        <Text style={[titleHeader, props.textStyle || {}]}>{props.text}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnLogin: {
    width: constant.buttonWidth,
    height: 56,
    borderRadius: 8,
    backgroundColor: constant.primaryPurple,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleHeader: {
    fontFamily: fonts.fontPingFangRegular,
    fontSize: sizes.h11,
    color: constant.buttonFontColor,
  },
  imageStyle: {
    width: 22,
    height: 22,
    marginRight: 9,
    tintColor: constant.buttonFontColor,
  },
});

export default ButtonCustomComponent;
