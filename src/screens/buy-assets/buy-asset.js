import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  CardLeft,
  CardRight,
  InterText,
  MainContainer,
  HorizontalContainer,
  SubContainer,
  LabelContainer,
  TotalPriceBox,
  SelectedBox,
  MainWrapperheader,
  BackButtonWrapper,
  ToggleButtonWrapper,
  InnerImageNavBar,
  ScripData,
  QuantityText,
} from './styled';
import constant from '../../helper/constant';
import ToggleSwitch from 'rn-toggle-switch';
import fonts, { sizes } from '../../helper/fonts';
import TitleText from '../../component/TitleText/TitleText';
import { useNavigation, useRoute } from '@react-navigation/core';
import {
  postBuyAssetService,
  postZerodhaBuyAssetService,
} from '../../modules/buy-assets/services';
import { connect } from 'react-redux';
import { fillOrdersListAction } from '../../modules/orders/actions';
import ZerodhaAlert from '../../component/ZerodhaAlert/ZerodhaAlert';
import { changeBrokerPopup, getWebTrader } from '../../modules/home/actions';
import { strLocale } from '../../helper/locale';
import BottomBarView from '../../component/BottomBarView/BottomBarView';
import CustomAlert from '../../component/BrokerSelection/BrokerSelection';
import { profileStack } from '../../navigation/navigator';
import { UserEvent } from '../../helper/fabricHelper/track';

const BuyAssetScreen = props => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const { asset, selectedPortfolio } = params;
  const [isBuy, setIsBuy] = useState(true);
  const [qtyPlaced, setQtyPlaced] = useState(1);
  const [variety] = useState('REGULAR');
  const [product] = useState('CNC');
  const [priceType, setPriceType] = useState('Market');
  const [validity] = useState('DAY');
  const [twitterText] = useState(' ');
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [showZerodhaPopUp, setShowZerodhaPopUp] = useState(false);
  const [zerodhaResponse, setZerodhaResponse] = useState({});
  const [zerodhaTradeStatus, setZerodhaTradeStatus] = useState('');
  const [data, setData] = useState({});
  const [btype, setBtype] = useState(null);
  const [alertData] = useState(constant.customAlert(strLocale).broker);
  const [limitPrice, setLimitPrice] = useState(0);

  useEffect(() => {
    setLimitPrice(asset.ltp);
  }, []);

  useEffect(() => {
    try {
      UserEvent.userTrackScreen('Trade_modal_open', {
        Field: qtyPlaced,
        Portfolio_name: params.selectedPortfolio.portfolio.name,
        Stock_name: asset.id,
        Market_Price: asset.ltp,
        Day_Gains: asset.change,
        Source: 'My Investments',
      });
      UserEvent.MoengageTrackScreen(
        [
          'Fields',
          'Portfolio_name',
          'Stock_name',
          'Market_Price',
          'Day_Gains',
          'Source',
        ],
        [
          qtyPlaced,
          params.selectedPortfolio.portfolio.name,
          asset.id,
          asset.ltp,
          asset.change,
          'My Investments',
        ],
        'Trade_modal_open',
      );
    } catch (e) {}

    try {
      if (zerodhaTradeStatus === 'success') {
        props.fillOrdersListAction().then(res => {
          global.isPurchase = true;
          navigation.navigate('Orders');
        });
      }
    } catch (e) {
      navigation.goBack();
    }
  }, [zerodhaTradeStatus]);

  useEffect(() => {
    const { brokerLoginDetails } = props.userDetails;
    const { userId, broker } = brokerLoginDetails || {};
    setData({
      title: strLocale('profile.Account'),
      image_angel: 'angel_broking',
      image_zerodha: 'zerodha',
      imageWidth: 100,
      value: (broker && userId) || 'Not connected',
      name: (broker && broker.name) || null,
    });
    if (broker && broker.name === 'Zerodha') {
      setBtype(1);
    } else if (broker && broker.name === 'Angel Broking') {
      setBtype(0);
    } else {
      setBtype(null);
    }
  }, [props.userDetails]);

  const onPressPlaceOrder = () => {
    const { brokerLoginDetails } = props.userDetails;
    try {
      UserEvent.userTrackScreen('Trade_CTA_clicked', {
        type: isBuy ? 'Buy' : 'Sell',
        stockName: asset.id,
        Portfolio_name: selectedPortfolio.portfolio.id,
        Market_Price: asset.ltp,
        Day_Gains: asset.change,
      });
      UserEvent.MoengageTrackScreen(
        ['type', 'stockName', 'Portfolio_name', 'Market_Price', 'Day_Gains'],
        [
          isBuy ? 'Buy' : 'Sell',
          asset.id,
          selectedPortfolio.portfolio.id,
          asset.ltp,
          asset.change,
        ],
        'Trade_CTA_clicked',
      );
    } catch (e) {}

    if (!(brokerLoginDetails && brokerLoginDetails.broker)) {
    } else {
      const portfolioId = selectedPortfolio.portfolio.id;
      const APIdata = {
        assetId: asset.id,
        qtyPlaced: qtyPlaced,
        exchange: asset.exchanges[0].exchange,
        variety: variety,
        product: product,
        isBuy: isBuy,
        priceType: priceType,
        validity: validity,
        twitterText: twitterText,
        triggerPrice: 0,
        limitPrice: limitPrice,
      };
      if (brokerLoginDetails.broker.name === 'Zerodha') {
        setIsApiLoading(true);
        postZerodhaBuyAssetService(portfolioId, APIdata).then(res => {
          if (res.code === 200) {
            setZerodhaResponse(res);
            setShowZerodhaPopUp(true);
          } else {
            alert(res.result);
          }

          setIsApiLoading(false);
        });
      } else {
        setIsApiLoading(true);
        postBuyAssetService(portfolioId, APIdata).then(res => {
          setTimeout(() => {
            props.fillOrdersListAction().then(() => {
              global.isPurchase = true;
              setIsApiLoading(false);
              navigation.navigate('Orders', {
                orderPlaced: true,
                selectedPortfolio: selectedPortfolio,
              });
            });
          }, 3000);
        });
      }
    }
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressOpenBroker = () => {
    const { brokerLoginDetails } = props.userDetails;
    const { broker } = brokerLoginDetails || {};

    try {
      let type = 'Not connected';
      if (broker) {
        if (broker && broker.name === 'Angel Broking') {
          type = 'Angel';
        } else if (broker && broker.name === 'Zerodha') {
          type = 'Zerodha';
        }
      }
      UserEvent.userTrackScreen('Broker_Connect_click', {
        Field: 'Broker',
        Type: type,
        Source: 'Favourites',
      });
      UserEvent.MoengageTrackScreen(
        ['Fields', 'Type', 'Source'],
        ['Broker', type, 'Favourites'],
        'Broker_Connect_click',
      );
    } catch (e) {}
    props.changeBrokerPopup({
      isShow: true,
      data: 'Favourites',
    });
  };

  const onHideCustomPopUp = (title, value, type) => {
    const { brokerLoginDetails } = props.userDetails;
    const { broker } = brokerLoginDetails || {};

    if (type === 0) {
      if (broker && broker.name === 'Angel Broking') {
      } else {
        navigation.navigate(profileStack.broker, {
          screenFrom: 'Favourites',
        });
      }
    } else if (type === 1) {
      if (broker && broker.name === 'Zerodha') {
      } else {
        navigation.navigate(profileStack.broker, {
          brokerType: 'kite',
          screenFrom: 'Favourites',
        });
      }
    }
    props.changeBrokerPopup({
      isShow: false,
      data: '',
    });
  };

  const manageZerodhaPopUp = condition => {
    setShowZerodhaPopUp(condition);
  };

  const renderZerodhaAlert = () => {
    return (
      <ZerodhaAlert
        res={zerodhaResponse}
        manageZerodhaPopUp={manageZerodhaPopUp}
        setZerodhaTradeStatus={setZerodhaTradeStatus}
      />
    );
  };

  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <MainWrapperheader>
        <BackButtonWrapper onPress={onPressBack}>
          <InnerImageNavBar
            source={{
              uri: 'arrow_back',
            }}
          />
        </BackButtonWrapper>
        <ScripData>
          <TitleText
            text={
              (isBuy ? 'Buy' : 'Sell') +
              ' ' +
              asset.ticker +
              ' x ' +
              qtyPlaced +
              ' ' +
              product
            }
            fontSize={sizes.h13}
            fontFamily={fonts.fontInterBold}
            color={constant.lightWhiteColor}
          />
          <TitleText
            text={asset.exchanges[0].exchange + ' : ' + asset.ltp}
            fontSize={sizes.h14}
            fontFamily={fonts.fontInterRegular}
            color={constant.lightGrayColor}
          />
        </ScripData>
        <ToggleButtonWrapper>
          <ToggleSwitch
            text={{
              on: 'BUY',
              off: 'SELL',
              activeTextColor: constant.skyblue,
              inactiveTextColor: constant.appRedColor,
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            textStyle={{ fontWeight: 'bold', fontSize: 10 }}
            color={{
              indicator: isBuy ? constant.skyblue : constant.appRedColor,
              active: constant.lightShadowWhite,
              inactive: constant.lightShadowWhite,
              activeBorder: constant.lightShadowWhite,
              inactiveBorder: constant.lightShadowWhite,
            }}
            active={true}
            disabled={false}
            width={26}
            radius={10}
            onValueChange={val => {
              setIsBuy(!isBuy);
            }}
          />
        </ToggleButtonWrapper>
      </MainWrapperheader>
      <MainContainer>
        <SubContainer>
          <HorizontalContainer>
            <CardLeft>
              <LabelContainer>
                <InterText size={12} color={constant.textGrayColor}>
                  Qty
                </InterText>
                {/* <InterText size={12}>Lot:1</InterText> */}
              </LabelContainer>
              <QuantityText
                selected={true}
                keyboardType={'number-pad'}
                value={`${qtyPlaced}`}
                onChangeText={quantity => {
                  if (quantity) {
                    if (Number(quantity)) {
                      setQtyPlaced(quantity);
                    } else {
                      setQtyPlaced('');
                      alert('Quantity should be a number');
                    }
                  } else {
                    setQtyPlaced('');
                  }
                }}
              />
            </CardLeft>
            <CardRight>
              <LabelContainer>
                <InterText size={12} color={constant.textGrayColor}>
                  Price
                </InterText>
              </LabelContainer>
              {priceType === 'Limit' ? (
                <QuantityText
                  selected={true}
                  keyboardType={'number-pad'}
                  value={`${limitPrice}`}
                  onChangeText={quantity => {
                    if (quantity) {
                      if (Number(quantity)) {
                        setLimitPrice(quantity);
                      } else {
                        setLimitPrice('');
                        alert('Quantity should be a number');
                      }
                    } else {
                      setLimitPrice('');
                    }
                  }}
                />
              ) : (
                <TotalPriceBox>
                  <InterText>{asset.ltp * qtyPlaced}</InterText>
                </TotalPriceBox>
              )}
            </CardRight>
          </HorizontalContainer>
          <HorizontalContainer>
            <CardLeft>
              <LabelContainer>
                <InterText size={12} color={constant.textGrayColor}>
                  Product
                </InterText>
              </LabelContainer>
              <SelectedBox isSelected={true}>
                <InterText size={13} color={constant.primaryPurple}>
                  Long Term(CNC)
                </InterText>
              </SelectedBox>
            </CardLeft>
            <CardRight />
          </HorizontalContainer>
          <InterText size={12} color={constant.textGrayColor}>
            Type
          </InterText>
          <HorizontalContainer>
            <CardLeft>
              <SelectedBox
                isSelected={priceType === 'Market'}
                onPress={() => setPriceType('Market')}>
                <InterText size={13} color={constant.primaryPurple}>
                  Market
                </InterText>
              </SelectedBox>
            </CardLeft>
            <CardRight>
              <SelectedBox
                isSelected={priceType === 'Limit'}
                onPress={() => setPriceType('Limit')}>
                <InterText size={13}>Limit</InterText>
              </SelectedBox>
            </CardRight>
          </HorizontalContainer>
        </SubContainer>
        <BottomBarView
          isEnable={false}
          onPressBottom={onPressPlaceOrder}
          isLoading={isApiLoading}
          data={data}
          page={'modal'}
          buttonTitle={isBuy ? 'BUY' : 'SELL'}
          buttonStyleNew={{ backgroundColor: '#1890ff' }}
          isImageHide={true}
          OnPressBroker={onPressOpenBroker}
        />
      </MainContainer>
      {showZerodhaPopUp && renderZerodhaAlert()}
      {props.selectPopupBroker && props.selectPopupBroker.isShow && (
        <CustomAlert
          data={alertData}
          onAlertClick={onHideCustomPopUp}
          screenType={props.selectPopupBroker.data || ''}
          type={0}
        />
      )}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    userDetails: state.account.userDetails,
    selectPopupBroker: state.home.selectPopupBroker,
  };
};

export default connect(mapStateToProps, {
  fillOrdersListAction,
  getWebTrader,
  changeBrokerPopup,
})(BuyAssetScreen);
