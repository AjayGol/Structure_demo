import React, { useState } from 'react';
import constant from '../../../helper/constant';
import PickerAlert from '../../../component/Picker/Picker';
import { Image, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import fonts, { sizes } from '../../../helper/fonts';

const CategoryFilter = props => {
  const { container, graphIcon, downIcon, buttonContainer, titleText } = styles;
  const [pickerShow, setPickerShow] = useState(false);
  const { title, isHideArrow, icon, pickerHide } = props;

  const onPressPickers = () => {
    if (!pickerHide) {
      setPickerShow(true);
      setTimeout(() => {
        setPickerShow(false);
      }, 100);
    } else {
      props.onPressCategory();
    }
  };

  const onPickerSelect = name => {
    try {
      props.onCategoryChange(name);
    } catch (e) {}
  };

  return (
    <View style={container} key={100}>
      <TouchableOpacity
        onPress={onPressPickers}
        activeOpacity={0.8}
        style={[buttonContainer, constant.blackShadow]}>
        <Image
          resizeMode="contain"
          style={graphIcon}
          source={{ uri: props.icon || 'icon_bar' }}
        />
        {title && <Text style={titleText}>{title}</Text>}
        {!isHideArrow && (
          <Image
            resizeMode="contain"
            style={downIcon}
            source={{ uri: 'arrow_down' }}
          />
        )}
        {isHideArrow && <View style={{ width: 5, height: 1 }} />}
      </TouchableOpacity>
      {!pickerHide && (
        <PickerAlert
          key={101}
          pickerShow={pickerShow}
          data={['Returns', 'Follower Returns', 'Follower Count', 'AMU']}
          onPickerSelect={onPickerSelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  graphIcon: {
    width: 16,
    height: 16,
  },
  downIcon: {
    width: 14,
    height: 14,
    marginLeft: 7,
  },
  buttonContainer: {
    paddingHorizontal: 10,
    borderRadius: 18,
    height: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  titleText: {
    fontSize: sizes.h11,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    paddingLeft: 8,
  },
});

export default CategoryFilter;
