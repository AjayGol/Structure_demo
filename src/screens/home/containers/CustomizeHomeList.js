import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import constant from '../../../helper/constant';
import fonts, { sizes } from '../../../helper/fonts';
import Animated, { Easing } from 'react-native-reanimated';
import { strLocale } from 'locale';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { customPortfolioListOrder } from '../../../modules/home/validator';

const CustomAlert = props => {
  const [category, setCategory] = useState(props.portfolioCategoryList);

  const {
    container,
    btnContainer,
    btnText,
    btnTextLeft,
    btnContainerLeft,
    btnContainerRight,
    titleText,
    descriptionText,
    buttonContainer,
    cancelButton,
    cancel,
    progressContainer,
    line,
    listTitle,
    imageContainer,
    imageSize,
    titleContainer,
    fullContainer,
  } = styles;

  const onPressCategory = type => {
    const data = cloneDeep(category);
    data[type].visible = !data[type].visible;
    setCategory(data);
  };

  return (
    <View style={[container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={titleText}>
            {strLocale('home.Customize portfolio lists')}
          </Text>
          <Text style={descriptionText}>
            {strLocale(
              'home.Choose featured portfolio groups which you want to see on homepage',
            )}
          </Text>
        </View>
        <View style={buttonContainer} />

        <View style={[progressContainer]}>
          {props.categoryArr &&
            props.categoryArr.map((obj, i) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressCategory(obj)}
                  style={titleContainer}
                  key={i}>
                  <Text style={[listTitle]}>{category[obj].title}</Text>
                  <View style={fullContainer} />
                  <View
                    style={[
                      imageContainer,
                      {
                        backgroundColor:
                          (category[obj].visible && constant.appBlueColor) ||
                          '#FDFDFD',
                      },
                    ]}>
                    <Image
                      source={{ uri: 'correct' }}
                      style={imageSize}
                      resizeMode="contain"
                    />
                  </View>
                  {i !== props.categoryArr.length - 1 && <View style={line} />}
                </TouchableOpacity>
              );
            })}
        </View>

        <View style={buttonContainer}>
          <TouchableOpacity
            style={[btnContainer, btnContainerLeft]}
            onPress={() => props.onAlertClick('CANCEL')}>
            <Text style={btnTextLeft}>{strLocale('CANCEL')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[btnContainer, btnContainerRight]}
            onPress={() => props.onAlertClick('SAVE', category)}>
            <Text style={btnText}>{strLocale('SAVE')}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={cancelButton}>
        <Image resizeMode="contain" style={cancel} source={{ uri: 'cancel' }} />
      </TouchableOpacity>
    </View>
  );
};

const CustomizeHomeList = props => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [categoryArr] = useState(customPortfolioListOrder());
  const { alertOuter } = styles;

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        duration: 200,
        toValue: 1,
        easing: Easing.out(Easing.linear),
      }).start();
    }, 5);
  });

  const onAlertClick = (title, obj) => {
    hideAlert(title, obj);
  };

  const hideAlert = (title, obj) => {
    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 100,
        easing: Easing.out(Easing.linear),
      }).start(() => {
        if (obj) {
          let match = false;
          for (let i = 0; i < categoryArr.length; i++) {
            if (obj[categoryArr[i]].visible) {
              match = true;
              break;
            }
          }
          if (match) {
            props.onAlertClick(title, obj);
          } else {
            props.onAlertClick('CANCEL');
          }
        } else {
          props.onAlertClick(title, obj);
        }
      });
    }, 50);
  };

  return (
    <Animated.View
      style={[
        alertOuter,
        { opacity: fadeAnim },
        !!constant.isiPAD && { alignItems: 'center' },
      ]}>
      <CustomAlert
        data={props.data}
        onAlertClick={onAlertClick}
        portfolioCategoryList={props.portfolioCategoryList}
        categoryArr={categoryArr}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
    paddingTop: 31,
    paddingBottom: 25,
    paddingHorizontal: 23,
    height: constant.screenHeight - 100,
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
  },
  titleText: {
    fontFamily: fonts.fontRubikRegular,
    fontSize: 23,
    color: constant.appGrayColor,
  },
  descriptionText: {
    fontFamily: fonts.fontRubikRegular,
    fontSize: 16,
    marginTop: 12,
    color: constant.appGrayColor,
    lineHeight: 21,
  },
  btnContainer: {
    height: 56,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: constant.appBlueColor,
  },
  btnContainerLeft: {
    backgroundColor: '#FFFFFF',
    marginRight: 5,
  },
  btnContainerRight: {
    marginLeft: 5,
  },
  btnTextLeft: {
    color: constant.appBlueColor,
    fontFamily: fonts.fontViga,
    fontSize: 16,
  },
  btnText: {
    color: '#fff',
    fontFamily: fonts.fontViga,
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  cancelButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 21,
    height: 21,
  },
  cancel: {
    width: 21,
    height: 21,
  },
  progressContainer: {
    width: '100%',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.07)',
  },
  listTitle: {
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 19,
    maxWidth: constant.screenWidth - 150,
  },
  imageContainer: {
    height: 15,
    width: 15,
    borderWidth: 1,
    borderColor: '#CCDCE5',
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSize: {
    position: 'absolute',
    height: 8,
    width: 8,
  },
  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 1,
    backgroundColor: '#F1F1F1',
  },
  titleContainer: {
    paddingHorizontal: 17,
    flexDirection: 'row',
    height: 51,
    alignItems: 'center',
  },
  fullContainer: {
    flex: 1,
  },
});

const mapStateToProps = state => {
  return {
    portfolioCategoryList: state.home.portfolioCategoryList || [],
  };
};

export default connect(mapStateToProps, {})(CustomizeHomeList);
