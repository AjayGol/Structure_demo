import React from 'react';
import constant from '../../../helper/constant';
import { StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import fonts, { sizes } from '../../../helper/fonts';
import { useNavigation } from '@react-navigation/native';
import { UserEvent } from '../../../helper/fabricHelper/track';

const PortfoliosViewAll = props => {
  const navigation = useNavigation();
  const {
    container,
    descriptionText,
    buttonTitle,
    containerHorizontal,
    imageContainer,
    imageVerticalContainer,
    buttonTitleAbsolute,
  } = styles;
  const { isHorizontal, image, description, title } = props;

  const onMoreView = () => {
    UserEvent.userTrackScreen('portfolio_viewall');
    const { isNavigate, onPressAddNew } = props;
    if (onPressAddNew) {
      props.onPressAddNew();
    } else {
      if (isNavigate) {
        // navigation.navigate(homeStack.home_detail_screen); // this will navigate to Tab2
      } else {
        navigation.navigate('HomeDetail'); // this will navigate to Tab2
      }
    }
  };

  return (
    <TouchableOpacity
      onPress={onMoreView}
      style={[
        container,
        constant.viewShadow,
        isHorizontal && containerHorizontal,
      ]}>
      <Image
        resizeMode="contain"
        style={[imageContainer, isHorizontal && imageVerticalContainer]}
        source={{ uri: image || 'view_all' }}
      />
      <Text
        style={[
          descriptionText,
          isHorizontal && { width: 180, textAlign: 'left', marginLeft: 15 },
        ]}>
        {description ||
          (!isHorizontal && 'Tap to view the remaining portfolio') ||
          'Tap to view the remaining followers'}
      </Text>
      {!isHorizontal && <Text style={buttonTitle}> {title || 'VIEW ALL'}</Text>}
      {isHorizontal && (
        <Text style={buttonTitleAbsolute}> {title || 'VIEW ALL'}</Text>
      )}
    </TouchableOpacity>
  );
};

export default PortfoliosViewAll;

const styles = StyleSheet.create({
  container: {
    width: 212,
    height: 261,
    padding: 12,
    paddingBottom: 15,
    marginRight: 14,
    backgroundColor: 'white',
    borderRadius: 4,
    marginTop: 14,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  containerHorizontal: {
    width: 296,
    height: 170,
    flexDirection: 'row',
  },
  imageContainer: {
    width: 80,
    height: 80,
  },
  imageVerticalContainer: {
    width: 60,
    height: 60,
  },
  descriptionText: {
    fontFamily: fonts.fontRubikRegular,
    fontSize: sizes.h13,
    color: constant.appGrayColor,
    lineHeight: 17,
    marginBottom: 19,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonTitle: {
    color: constant.appBlueColor,
    fontFamily: fonts.fontViga,
    fontSize: sizes.h12,
    lineHeight: 18,
  },
  buttonTitleAbsolute: {
    position: 'absolute',
    right: 18,
    bottom: 15,
    color: constant.appBlueColor,
    fontFamily: fonts.fontViga,
    fontSize: sizes.h12,
    lineHeight: 18,
  },
});
