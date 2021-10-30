import React from 'react';
import constant from '../../helper/constant';
import fonts, { sizes } from '../../helper/fonts';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import ButtonCustom from '../ButtonCustom/ButtonCustom';

import { MainWrapper, ButtonText, BrokerNameView, InnerView } from './styled';

const BottomBarView = props => {
  const {
    container,
    subContainer,
    buttonStyle,
    valueText,
    disableText,
    brokerButton,
    container_modal,
    connectedButton,
    upperView,
    topView,
    aimage,
    zimage,
    unconnect,
    arimage,
  } = styles;
  const {
    isEnable,
    isLoading,
    onPressBottom,
    data,
    page,
    OnPressBroker,
    loginLoading,
    brokerType,
    buttonTitle,
    buttonStyleNew,
    isImageHide,
  } = props;

  const onPressButton = () => {
    if (onPressBottom) {
      onPressBottom();
    }
  };
  const renderBroker = () => {
    return (
      <TouchableOpacity style={topView} onPress={OnPressBroker}>
        <ButtonText>
          {brokerType === 0 || brokerType === 1
            ? 'Please Login to broker acct.'
            : 'Broker'}
        </ButtonText>

        <View style={upperView}>
          <InnerView>
            {brokerType == 0 || brokerType == 1 ? (
              <Image
                resizeMode="contain"
                style={zimage}
                source={{
                  uri: brokerType == 0 ? data.image_angel : data.image_zerodha,
                }}
              />
            ) : (
              <Image
                resizeMode="contain"
                style={aimage}
                source={{
                  uri:
                    data.name != null && data.name == 'Zerodha'
                      ? data.image_zerodha
                      : data.image_angel,
                }}
              />
            )}

            <Image
              resizeMode="contain"
              style={arimage}
              source={{ uri: 'bottom_arrow' }}
            />
          </InnerView>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <MainWrapper style={page === 'modal' ? container_modal : container}>
      {page === 'modal' && (
        <View
          style={
            data.value === 'Not connected' && brokerType == null
              ? brokerButton
              : connectedButton
          }>
          {data.value === 'Not connected' && brokerType == null ? (
            <TouchableOpacity style={unconnect} onPress={OnPressBroker}>
              {(props.loginLoading && (
                <ActivityIndicator color={'#000000'} />
              )) || (
                <Text style={disableText}>
                  {'Broker not connected, tap here to continue'}
                </Text>
              )}
            </TouchableOpacity>
          ) : (
            <BrokerNameView>{renderBroker()}</BrokerNameView>
          )}
        </View>
      )}

      <View style={subContainer}>
        <ButtonCustom
          onPress={onPressButton}
          text={buttonTitle || 'Invest'}
          image={'briefcase'}
          otherStyle={[buttonStyle, buttonStyleNew || {}]}
          isLoading={isLoading}
          isDisable={(isEnable === undefined && false) || isEnable}
          isImageHide={isImageHide || false}
        />
      </View>
    </MainWrapper>
  );
};

export default BottomBarView;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_modal: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subContainer: {
    width: constant.screenWidth - 36,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonStyle: {
    height: 40,
    borderRadius: 5,
  },
  valueText: {
    fontSize: sizes.h12,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 21,
    marginTop: 2,
  },
  disableText: {
    fontSize: 13,
    color: constant.appGrayColor,
    fontFamily: fonts.fontRubikRegular,
    lineHeight: 21,
  },
  brokerButton: {
    borderWidth: 1,
    borderColor: constant.BrokerBorderColor,
    backgroundColor: constant.BrokerBorderColor,
    borderRadius: 4,
    width: '91%',
    marginHorizontal: 36,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectedButton: {
    borderWidth: 1,
    borderColor: constant.lightWhiteColor,
    backgroundColor: constant.lightWhiteColor,
    borderRadius: 4,
    width: '91%',
    marginHorizontal: 36,
    marginBottom: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upperView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 14,
  },
  topView: { flexDirection: 'row', flex: 1, height: 40 },
  aimage: { height: 55, width: 93, tintColor: constant.darkBlackColor },
  zimage: { height: 55, width: 93, tintColor: constant.yelloMainColor },
  unconnect: { flex: 1, justifyContent: 'center', height: 40 },
  arimage: {
    height: 55,
    width: 10,
    tintColor: constant.darkBlackColor,
    marginTop: 2,
    marginLeft: 8,
  },
});
