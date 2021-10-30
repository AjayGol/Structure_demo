import React from 'react';
import constant from '../../../helper/constant';
import CategoryFilter from './CategoryFilter';
import { Image, StyleSheet, Text, View } from 'react-native';
import fonts, { sizes } from '../../../helper/fonts';

const CategoryTitle = props => {
  const { container, imageSize, titleStyle, fullScreen } = styles;
  const { image, title } = props;

  const onCategoryChange = value => {
    try {
      props.onCategoryChange(value, props.type);
    } catch (e) {}
  };

  return (
    <View style={container}>
      <Image resizeMode="contain" style={imageSize} source={{ uri: image }} />
      <Text style={titleStyle}>{title}</Text>
      <View style={fullScreen} />
      <CategoryFilter onCategoryChange={onCategoryChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  fullScreen: {
    flex: 1,
  },
  imageSize: {
    width: 20,
    height: 20,
  },
  titleStyle: {
    fontSize: sizes.h10,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikMedium,
    lineHeight: 21,
    marginLeft: 8,
  },
});

export default CategoryTitle;
