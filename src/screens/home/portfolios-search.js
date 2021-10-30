import React, { useEffect, useState } from 'react';
import NavBar from '../../component/NavBar/NavBar';
import constant from '../../helper/constant';
import PortfolioFeedCard from '../../component/PortfolioFeedCard/PortfolioFeedCard';
import CategoryFilter from './containers/CategoryFilter';
import FilterCategory from '../../component/FilterCategory/FilterCategory';
import Modal from 'react-native-modal';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts, { sizes } from '../../helper/fonts';
import { connect } from 'react-redux';
import {
  changeBrokerPopup,
  manageBrokerLoginPopUp,
  manageCreateOrEditPortfolio,
  manageFilterMenu,
  paginationBestPortfoliosList,
  portfoliosPaginationListUpdate,
  updateWatchlistData,
} from '../../modules/home/actions';
import { searchPortFoliosList } from '../../modules/search/actions';
import { categoryType, filterSortType } from '../../modules/home/validator';
import { strLocale } from '../../helper/locale';
import { filter } from 'lodash';
import EmptyData from '../../component/EmptyData/EmptyData';
import { homeStack, profileStack } from '../../navigation/navigator';
import { useNavigation } from '@react-navigation/native';
import {
  addPortfolioToWatchlistAction,
  deletePortfolioToWatchlistAction,
  manageAddWatchlistPopup,
} from '../../modules/watchlist/actions';
import FilterTab from '../../component/FilterTab/FilterTab';
import AppHeader from '../../component/AppHeader/AppHeader';
import AddToWatchlist from '../../component/AddToWatchlist/AddToWatchlist';
import UnfollowPortfolioAlert from '../../component/UnfollowPortfolioAlert/UnfollowPortfolioAlert';
import BrokerSelectionAlert from '../../component/BrokerSelection/BrokerSelection';
import CustomModal from '../Modal/portfolios-modal';
import CustomAlert from '../../component/BrokerSelection/BrokerSelection';
import { UserEvent } from '../../helper/fabricHelper/track';
let opened = false;

const PortfoliosSearchScreen = props => {
  const [brokerAlertData] = useState(constant.customAlert(strLocale).broker);
  const scrollViewRef = React.createRef();
  const navigation = useNavigation();

  const [isApiCalling, setIsApiCalling] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sortType, setSortType] = useState('');
  const [sortTitle, setSortTitle] = useState('Returns');
  const [callAPI, setCallAPI] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchEnable, setSearchEnable] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const [scrollOffset, setScrollOffset] = useState(null);
  const [startModalData, setStartModalData] = useState([]);
  const [portfolioModalId, setPortfolioModalId] = useState(undefined);

  const {
    container,
    subContainer,
    filterContainer,
    titleHeader,
    image,
    fullScreen,
    imageContainer,
    listContainer,
    headerHeaderFooterList,
    buttonTitle,
    totalValueCount,
    countHeaderContainer,
    refreshContainer,
  } = styles;

  useEffect(() => {
    try {
      UserEvent.userTrackScreen('Explore_PF_landing', { Source: 'Home' });
      UserEvent.MoengageTrackScreen(['Source'], ['Home'], 'Explore_PF_landing');
    } catch (e) {}
  }, []);

  useEffect(() => {
    apiManage(startIndex !== 0);
  }, [callAPI, props.filtersGroup]);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // The screen is focused
      setTimeout(() => {
        if (opened) {
          setModalVisible(true);
        }
      }, 500);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  useEffect(() => {}, [props.eventData]);

  const apiManage = (isNextPage = false) => {
    setIsApiCalling(true);

    // filterSortType;
    let improvementArray = filter(
      props.filtersGroup.assets,
      x => x.selected === true,
    );
    let asset_classes = '';
    let trading_frequency = '';
    let performance = '';
    let metric = '';
    for (let i = 0; i < improvementArray.length; i++) {
      if (asset_classes === '') {
        asset_classes = filterSortType()[improvementArray[i].title];
      } else {
        asset_classes =
          asset_classes + ',' + filterSortType()[improvementArray[i].title];
      }
    }
    if (props.filtersGroup.frequency !== '') {
      trading_frequency = filterSortType()[props.filtersGroup.frequency];
    }

    if (props.filtersGroup.performance !== '') {
      performance = filterSortType()[props.filtersGroup.performance];
    }

    if (props.filtersGroup.metric !== '') {
      metric = filterSortType()[props.filtersGroup.metric];
    }

    if (isNextPage) {
      const { userID, name } = props;
      try {
        UserEvent.userTrackScreen('homescreen_screen_view_explore', {
          userid: userID || 0,
          name: name || '',
        });
        UserEvent.MoengageTrackScreen(
          ['userid', 'name'],
          [userID || 0, name || ''],
          'homescreen_screen_view_explore',
        );
      } catch (e) {}
    }
    if (search === '') {
      props
        .paginationBestPortfoliosList(
          isNextPage,
          startIndex,
          constant.pagination,
          sortType,
          asset_classes,
          trading_frequency,
          performance,
          metric,
          '',
          search,
        )
        .then(res => {
          setTotalCount(res);
          setIsApiCalling(false);
          setIsRefreshing(false);
        });
    } else {
      props
        .searchPortFoliosList(
          isNextPage,
          startIndex,
          constant.pagination,
          search,
          asset_classes,
          trading_frequency,
        )
        .then(res => {
          setTotalCount(res);
          setIsApiCalling(false);
          setIsRefreshing(false);
        });
    }
  };

  const clearSearchInterval = () => {
    try {
      clearInterval(global.textSearch);
    } catch (e) {}
  };

  const callAPISearch = text => {
    setSearch(text);
    setStartIndex(0);
    setCallAPI(!callAPI);
  };

  const onEndReached = () => {
    if (!isApiCalling) {
      if (totalCount > props.portfoliosPagination.length) {
        setIsApiCalling(true);
        setStartIndex(startIndex + constant.pagination);
        setCallAPI(!callAPI);
      }
    }
  };

  const onPressPortfolio = (
    portfolio,
    isFollowed,
    minFollowAmount,
    inWatchlist,
    data,
    index,
  ) => {
    opened = false;
    navigation.navigate(homeStack.portfolio_detail_screen, {
      portfolioId: portfolio.id,
      isFollowed: isFollowed,
      minFollowAmount: minFollowAmount,
      inWatchlist: inWatchlist,
      data: data,
      index: index,
      from: 'cardScreen',
      ScreenFrom: 'Explore Portfolios',
    });
    try {
      UserEvent.userTrackScreen('PF_card_click', {
        page: 'Explore Portfolios',
        Portfolio_name: props.selectedPortfolio.portfolio.id,
      });
      UserEvent.MoengageTrackScreen(
        ['page', 'Portfolio_name'],
        ['Explore Portfolios', props.selectedPortfolio.portfolio.id],
        'PF_card_click',
      );
    } catch (e) {}
  };

  const onPressBack = () => {
    opened = false;
    navigation.goBack();
    try {
      UserEvent.userTrackScreen('Global_back_close', {
        Source_Page: 'Explore Portfolio',
      });
      UserEvent.MoengageTrackScreen(
        ['Source page'],
        ['Explore Portfolio'],
        'Global_back_close',
      );
    } catch (e) {}
  };

  const onChangeText = text => {
    clearSearchInterval();
    if (text !== '') {
      try {
        UserEvent.userTrackScreen('Global_search', {
          Source: 'Explore Portfolios',
          Search_String: text,
        });
        UserEvent.MoengageTrackScreen(
          ['Source', 'Search_String'],
          ['Explore Portfolios', text],
          'Global_search',
        );
      } catch (e) {}

      global.textSearch = setInterval(() => {
        props.portfoliosPaginationListUpdate([]);
        callAPISearch(text);
        clearSearchInterval();
      }, 500);
    }
  };

  const onPressSearch = () => {
    if (searchEnable) {
      props.portfoliosPaginationListUpdate([]);
      callAPISearch('');
    }
    setSearchEnable(!searchEnable);
  };

  const onPressCategory = () => {
    props.manageFilterMenu(true);
  };

  const onCategoryChange = value => {
    props.portfoliosPaginationListUpdate([]);
    setSortTitle(value);
    setSortType(categoryType(value));
    setStartIndex(0);
    setCallAPI(!callAPI);
  };

  const onRefresh = () => {
    setStartIndex(0);
    setCallAPI(!callAPI);
  };

  const onPressCreateNew = () => {
    props.manageCreateOrEditPortfolio({
      isShow: true,
      data: '',
    });
  };

  const onWatchPopUp = data => {
    const { portfolio, inWatchlist } = data;
    try {
      if (inWatchlist && inWatchlist.length !== 0) {
        if (inWatchlist[0].id) {
          props.updateWatchlistData(portfolio.id);
          props.deletePortfolioToWatchlistAction(
            inWatchlist[0].id,
            portfolio.id,
          );
        }
      } else {
        try {
          UserEvent.userTrackScreen('Favourite_icon_clicked', {
            Source: 'Explore Portfolio',
            Portfolio_name: portfolio.id,
          });
          UserEvent.MoengageTrackScreen(
            ['Source', 'Portfolio_ID'],
            ['Explore Portfolio', portfolio.id],
            'Favourite_icon_clicked',
          );
        } catch (e) {}

        if (props.watchlist.length !== 0) {
          props.updateWatchlistData(portfolio.id, props.watchlist[0].id);
          props
            .addPortfolioToWatchlistAction(
              props.watchlist[0].id,
              portfolio.id,
              data,
            )
            .then(res => {})
            .catch(() => {
              props.setLoader(false);
            });
        }
      }
    } catch (e) {}
  };

  const onHideBrokerPopUp = (title, value, type) => {
    props.manageBrokerLoginPopUp(false);
    if (title === 'SPECIFY') {
      switch (type) {
        case 0:
          navigation.navigate(profileStack.broker, {
            screenFrom: 'Explore Portfolio',
          });
          break;
        case 1:
          navigation.navigate(profileStack.broker, {
            brokerType: 'kite',
            screenFrom: 'Explore Portfolio',
          });
          break;
      }
    }
  };

  const onHideAddWatchListPopUp = () => {
    props.manageAddWatchlistPopup({
      isShow: false,
      data: '',
    });
  };

  const renderFooter = () => {
    return (
      <View style={headerHeaderFooterList}>
        {isApiCalling === true && (
          <ActivityIndicator size="small" color={constant.codeIndicatorColor} />
        )}
        {isApiCalling === false && totalCount === 0 && (
          <EmptyData index={100} title={'Nothing found'} />
        )}
      </View>
    );
  };

  const onModalPress = (id, data) => {
    try {
      UserEvent.userTrackScreen('PF_card_CTA_click', {
        fieldtype: data.isFollowed ? 'Redeem' : 'Invest',
        page: 'Explore Portfolios',
        Portfolio_name: data.portfolio.name,
        Source: searchEnable ? 'Search' : 'Direct',
      });
      UserEvent.MoengageTrackScreen(
        ['fieldtype', 'page', 'Portfolio_name', 'Source'],
        [
          data.isFollowed ? 'Redeem' : 'Invest',
          'Explore Portfolios',
          data.portfolio.name,
          searchEnable ? 'Search' : 'Direct',
        ],
        'PF_card_CTA_click',
      );
    } catch (e) {}
    UserEvent.userTrackScreen('PF_card_CTA_click', {
      fieldtype: data.isFollowed ? 'Redeem' : 'Invest',
      page: 'Explore Portfolios',
      Portfolio_name: data.portfolio.name,
      Source: searchEnable ? 'Search' : 'Direct',
    });
    UserEvent.MoengageTrackScreen(
      ['fieldtype', 'page', 'Portfolio_name', 'Source'],
      [
        data.isFollowed ? 'Redeem' : 'Invest',
        'Explore Portfolios',
        data.portfolio.name,
        searchEnable ? 'Search' : 'Direct',
      ],
      'PF_card_CTA_click',
    );
    setStartModalData(data);
    setPortfolioModalId(id);
    opened = true;
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const handleOnScroll = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
  };

  const handleScrollTo = p => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  const renderList = ({ item, index }) => {
    return (
      <PortfolioFeedCard
        onPressPortfolio={onPressPortfolio}
        key={index}
        index={index}
        data={item}
        navigation={navigation}
        onWatchPopUp={onWatchPopUp}
        onModalPress={onModalPress}
      />
    );
  };

  const renderTitle = () => {
    return (
      <View style={subContainer}>
        <View style={imageContainer}>
          <Image
            resizeMode="contain"
            style={image}
            source={{ uri: 'dots_three_vertical' }}
          />
        </View>

        <Text
          style={titleHeader}
          numberOfLines={1}
          minimumFontScale={0.3}
          adjustsFontSizeToFit={true}>
          {strLocale('home.Portfolios')}
        </Text>
        <View style={countHeaderContainer}>
          <Text style={totalValueCount}>{totalCount}</Text>
        </View>
        <View style={fullScreen} />
        <TouchableOpacity onPress={onPressCreateNew}>
          <Text style={buttonTitle}> {strLocale('home.CREATE NEW')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFilter = () => {
    return (
      <View style={filterContainer}>
        <CategoryFilter title={sortTitle} onCategoryChange={onCategoryChange} />
        <View style={listContainer} />
        <CategoryFilter
          title={'Filter'}
          icon={'filter'}
          isHideArrow={true}
          pickerHide={true}
          onPressCategory={onPressCategory}
        />
      </View>
    );
  };

  const renderFilterCategory = () => {
    let improvementArray = filter(
      props.filtersGroup.assets,
      x => x.selected === true,
    );

    if (improvementArray.length !== 0 || props.filtersGroup.frequency !== '') {
      return (
        <FilterCategory
          improvementArray={improvementArray}
          filtersGroup={props.filtersGroup}
        />
      );
    }
    return null;
  };

  const renderFilterSroll = () => {
    return (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingVertical: 12, maxHeight: 46 }}>
        <FilterTab text={'Trending'} />
        <FilterTab text={'Trending'} />
        <FilterTab text={'Trending'} />
        <FilterTab text={'Trending'} />
        <FilterTab text={'Trending'} />
        <FilterTab text={'Trending'} />
        <FilterTab text={'Trending'} />
      </ScrollView>
    );
  };

  return (
    <View style={container}>
      <AppHeader
        backScreenName={'Explore Portfolios'}
        rightImage={'icon_search'}
        onPressRight={onPressSearch}
        onPressBack={onPressBack}
        onChangeText={onChangeText}
        isSearch={searchEnable}
      />
      <View style={listContainer}>
        <View style={listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={props.portfoliosPagination}
            extraData={props.portfoliosPagination}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            renderItem={renderList}
            onEndReached={onEndReached}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                tintColor={'red'}
                contentContainerStyle={refreshContainer}
                progressViewOffset={50}
              />
            }
          />
        </View>
      </View>
      {props.addWatchlistPopUp.isShow && (
        <AddToWatchlist
          data={props.addWatchlistPopUp.data}
          onAlertClick={onHideAddWatchListPopUp}
        />
      )}
      {props.unfollowPortfolioPopUp.isShow && <UnfollowPortfolioAlert />}
      {props.brokerLoginPopUp.isShow && (
        <BrokerSelectionAlert
          data={brokerAlertData}
          onAlertClick={onHideBrokerPopUp}
        />
      )}
      <CustomModal
        isModalVisible={isModalVisible}
        closeModal={closeModal}
        openModal={openModal}
        changeIsOpenOnInvest={() => {
          opened = false;
        }}
        handleScrollTo={handleScrollTo}
        scrollOffset={scrollOffset}
        portfolioId={portfolioModalId}
        data={startModalData}
        openType={'Explore Portfolio'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7F4FB',
  },
  subContainer: {
    marginHorizontal: 12,
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 6,
    alignItems: 'center',
  },
  filterContainer: {
    marginLeft: 20,
    marginRight: 16,
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  titleHeader: {
    fontFamily: fonts.fontRubikMedium,
    fontSize: sizes.h10,
    color: constant.appGrayColor,
    marginLeft: 8,
  },
  totalValueCount: {
    color: '#FFFFFF',
    fontFamily: fonts.fontRubikMedium,
    fontSize: sizes.h13,
    lineHeight: 17,
  },
  image: {
    width: 20,
    height: 20,
  },
  fullScreen: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    backgroundColor: '#111111',
  },
  headerHeaderFooterList: {
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: constant.appBlueColor,
    fontFamily: fonts.fontViga,
    fontSize: sizes.h12,
    lineHeight: 18,
  },
  countHeaderContainer: {
    marginLeft: 9,
    padding: 3,
    backgroundColor: '#27C5C1',
    borderRadius: 3,
    minWidth: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  refreshContainer: {
    paddingTop: 10,
  },
  categoryMainContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  scrollableModal: {
    height: '60%',
  },
  scrollableModalContent1: {
    height: 300,
    backgroundColor: '#87BBE0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText1: {
    fontSize: 20,
    color: 'white',
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: '#A9DCD3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollableModalText2: {
    fontSize: 20,
    color: 'white',
  },
});

const mapStateToProps = state => {
  return {
    portfoliosPagination: state.home.portfoliosPagination || [],
    filtersGroup: state.home.filtersGroup || {},
    eventData: state.account.eventData,
    addWatchlistPopUp: state.watchlist.addWatchlistPopUp,
    watchlist: state.watchlist.watchlists,
    unfollowPortfolioPopUp: state.home.unfollowPortfolioPopUp,
    brokerLoginPopUp: state.home.brokerLoginPopUp,
    userID: (state.account.userDetails && state.account.userDetails._id) || 0,
    userDetails: state.account.userDetails || {},
    name: (state.account.userDetails && state.account.userDetails.name) || '',
  };
};

export default connect(mapStateToProps, {
  manageFilterMenu,
  paginationBestPortfoliosList,
  portfoliosPaginationListUpdate,
  manageCreateOrEditPortfolio,
  manageAddWatchlistPopup,
  deletePortfolioToWatchlistAction,
  updateWatchlistData,
  addPortfolioToWatchlistAction,
  manageBrokerLoginPopUp,
  searchPortFoliosList,
})(PortfoliosSearchScreen);
