import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import constant from '../../helper/constant';
import Animated, { Easing } from 'react-native-reanimated';
import { UserEvent } from '../../helper/fabricHelper/track';

const CustomAlert = props => {
  const [selectedCell, setSelectedCell] = useState(-1);

  const {
    container,
    selectedCellContainer,
    selectedCellSubContainer,
    imageSelected,
    fullContainer,
    imageOneSelected,
    lineSeparate,
  } = styles;

  const { right, isIpad, listingData } = props.data;

  const onSelectType = type => {
    setSelectedCell(type);
    props.onAlertClick(right, type, selectedCell);
  };

  return (
    <View style={[container, constant.isIpad && isIpad]}>
      {listingData && (
        <View style={selectedCellContainer}>
          {listingData &&
            listingData.map((obj, i) => {
              return (
                <TouchableOpacity
                  onPress={() => onSelectType(i)}
                  key={i}
                  style={selectedCellSubContainer}>
                  {obj.image && (
                    <Image
                      resizeMode="contain"
                      style={
                        (selectedCell === i && imageOneSelected) ||
                        imageSelected
                      }
                      source={{
                        uri: obj.image,
                      }}
                    />
                  )}
                  <View style={fullContainer} />
                  {i !== listingData.length - 1 && (
                    <View style={lineSeparate} />
                  )}
                </TouchableOpacity>
              );
            })}
        </View>
      )}
    </View>
  );
};

const BrokerSelectionPopUp = props => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        duration: 200,
        toValue: 1,
        easing: Easing.out(Easing.linear),
      }).start();
    }, 5);
  });

  const onAlertClick = (title, typeSelected = false) => {
    hideAlert(title, typeSelected);
  };

  const hideAlert = (title, typeSelected) => {
    const { type } = props.data;
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.out(Easing.linear),
      }).start(() => {
        props.onAlertClick(title, type, typeSelected);
      });
    }, 50);
  };

  const onPressClose = () => {
    if (props.onAlertClick) {
      props.onAlertClick();
    }
  };

  const { closeScreen } = styles;

  return (
    <Animated.View
      style={[
        styles.alertOuter,
        { opacity: fadeAnim },
        !!constant.isiPAD && { alignItems: 'center' },
      ]}>
      <TouchableOpacity onPress={onPressClose} style={closeScreen} />
      <CustomAlert data={props.data} onAlertClick={onAlertClick} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 23,
    elevation: 22,
  },
  alertOuter: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    paddingHorizontal: 11,
    backgroundColor: 'rgba(5,34,61,0.4)',
    justifyContent: 'center',
    zIndex: 111111,
    elevation: 2,
  },
  isIpad: {
    maxWidth: 400,
    width: '100%',
  },
  selectedCellContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderColor: 'rgba(89, 89, 92, 0.07)',
    borderWidth: 1,
    paddingVertical: 5,
    paddingHorizontal: 17,
  },
  selectedCellSubContainer: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageSelected: { width: 93, height: 20, tintColor: constant.linearGrayColor },
  imageOneSelected: {
    width: 93,
    height: 20,
    tintColor: constant.yelloMainColor,
  },
  fullContainer: { flex: 1 },
  lineSeparate: {
    position: 'absolute',
    left: -17,
    right: -17,
    bottom: 0,
    borderColor: 'rgba(89, 89, 92, 0.07)',
    borderWidth: 1,
    height: 1,
  },
  closeScreen: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
});

export default BrokerSelectionPopUp;
