import React, { useState } from 'react';
import constant from '../../../helper/constant';
import TitleText from '../../../component/TitleText/TitleText';
import ButtonGlobal from '../../../component/ButtonGlobal/ButtonGlobal';
import fonts, { sizes } from '../../../helper/fonts';
import { strLocale } from 'locale';
import { watchlistStack } from '../../../navigation/navigator';
import { useNavigation } from '@react-navigation/native';
import {
  SafeAreaContainer,
  DescriptionContainer,
  ButtonContainer,
  WatchlistCardTitleContainer,
  WatchListInfoContainer,
  EmptyImageContainer,
  NonEmptyImageContainer,
  WatchListContainer,
  HeartImage,
} from './styled';
import { FullContainer } from '../../../component/GlobalStyles';
import { connect } from 'react-redux';
import { UserEvent } from '../../../helper/fabricHelper/track';

const WatchListInfo = props => {
  const navigation = useNavigation();

  const watchlist = () => {
    try {
      UserEvent.userTrackScreen('Homescreen_favourites_click', {
        fieldType: 'Favourites',
        page: 'Home Screen',
      });
      UserEvent.MoengageTrackScreen(
        ['fieldType', 'page'],
        ['Favourites', 'Home Screen'],
        'Homescreen_favourites_click',
      );
    } catch (e) {}

    navigation.navigate(watchlistStack.watchlist);
  };

  const watchlistCount = () => {
    return props.totalAssetAndPortfoliosInWatchlists;
  };

  const renderWatchlistEmpty = () => {
    return (
      <WatchlistCardTitleContainer>
        <TitleText
          text={strLocale('home.Favorites')}
          fontSize={sizes.h12}
          fontFamily={fonts.fontInterSemiBold}
          color={constant.lightWhiteColor}
          lineHeight={24}
          opacity={'0.87'}
        />
        <WatchListContainer>
          <WatchListInfoContainer>
            <EmptyImageContainer source={{ uri: 'watchlist' }} />
            <DescriptionContainer>
              <TitleText
                text={
                  'Make the most out of Trinkerr by adding your favourite portfolios to watchlist '
                }
                fontSize={sizes.h13}
                lineHeight={20}
                fontFamily={fonts.fontInterRegular}
                color={constant.whiteColor}
                textAlign={'center'}
              />
            </DescriptionContainer>
            <ButtonContainer marginHorizontal={27} marginTop={20}>
              <ButtonGlobal
                width={constant.buttonWidth - 60}
                testID={'get_started'}
                buttonText={strLocale('Get started')}
                onPress={watchlist}
                isLoading={props.isLoading}
                textColor={constant.lightWhiteColor}
              />
            </ButtonContainer>
          </WatchListInfoContainer>
        </WatchListContainer>
      </WatchlistCardTitleContainer>
    );
  };

  const renderWatchListNonEmpty = () => {
    return (
      <WatchlistCardTitleContainer>
        <TitleText
          text={strLocale('home.Favorites')}
          fontSize={sizes.h12}
          fontFamily={fonts.fontInterSemiBold}
          color={constant.lightWhiteColor}
          lineHeight={24}
          opacity={'0.87'}
        />
        <WatchListContainer>
          <WatchListInfoContainer>
            <DescriptionContainer>
              <TitleText
                text={`You have ${watchlistCount()} items in your favorites`}
                fontSize={sizes.h13}
                fontFamily={fonts.fontInterRegular}
                color={constant.whiteColor}
              />
              <ButtonContainer alignItems={'flex-start'} onPress={watchlist}>
                <TitleText
                  text={strLocale('View All')}
                  fontSize={sizes.h12}
                  fontFamily={fonts.fontInterSemiBold}
                  color={constant.lightWhiteColor}
                  lineHeight={24}
                  opacity={'0.87'}
                />
                <FullContainer />
                <NonEmptyImageContainer source={{ uri: 'watchlist' }} />
              </ButtonContainer>
              <HeartImage
                source={{
                  uri: 'icon_heart_filled',
                }}
              />
            </DescriptionContainer>
          </WatchListInfoContainer>
        </WatchListContainer>
      </WatchlistCardTitleContainer>
    );
  };

  return (
    <SafeAreaContainer>
      {watchlistCount() !== 0
        ? renderWatchListNonEmpty()
        : renderWatchlistEmpty()}
    </SafeAreaContainer>
  );
};

const mapStateToProps = state => {
  return {
    portfolioWatchlist: state.watchlist.portfolioWatchlist,
    totalAssetAndPortfoliosInWatchlists:
      (state.account.userDetailsOtherData &&
        state.account.userDetailsOtherData
          .totalAssetAndPortfoliosInWatchlists) ||
      0,
  };
};

export default connect(mapStateToProps, {})(WatchListInfo);
