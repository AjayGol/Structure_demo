import React, { useEffect, useState } from 'react';
import NavBar from '../../component/NavBar/NavBar';
import constant from '../../helper/constant';
import PortfoliosDetailCard from '../../component/PortfoliosDetailCard/PortfoliosDetailCard';
import CategoryFilter from './containers/CategoryFilter';
import FilterCategory from '../../component/FilterCategory/FilterCategory';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import fonts, { sizes } from '../../helper/fonts';
import { connect } from 'react-redux';
import {
  manageCreateOrEditPortfolio,
  manageFilterMenu,
  paginationPortfoliosList,
  portfoliosPaginationListUpdate,
  updateWatchlistData,
} from '../../modules/home/actions';
import { categoryType, filterSortType } from '../../modules/home/validator';
import { strLocale } from '../../helper/locale';
import { cloneDeep, filter } from 'lodash';
import EmptyData from '../../component/EmptyData/EmptyData';
import { homeStack } from '../../navigation/navigator';
import { useNavigation } from '@react-navigation/native';
import {
  deletePortfolioToWatchlistAction,
  manageAddWatchlistPopup,
} from '../../modules/watchlist/actions';

const HomeDetailScreen = props => {
  const navigation = useNavigation();

  const [isApiCalling, setIsApiCalling] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [sortType, setSortType] = useState('');
  const [sortTitle, setSortTitle] = useState('Returns');
  const [callAPI, setCallAPI] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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
    apiManage(startIndex !== 0);
  }, [callAPI, props.filtersGroup]);

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

    props
      .paginationPortfoliosList(
        isNextPage,
        startIndex,
        constant.pagination,
        sortType,
        asset_classes,
        trading_frequency,
        performance,
        metric,
      )
      .then(res => {
        setTotalCount(res);
        setIsApiCalling(false);
        setIsRefreshing(false);
      });
  };

  const onEndReached = () => {
    if (!isApiCalling) {
      if (totalCount > props.portfoliosPagination.length) {
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
    navigation.navigate(homeStack.portfolio_detail_screen, {
      portfolioId: portfolio.id,
      isFollowed: isFollowed,
      minFollowAmount: minFollowAmount,
      inWatchlist: inWatchlist,
      data: data,
      index: index,
      from: 'cardScreen',
    });
  };

  const onPressBack = () => {};

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

  const onWatchPopUp = (data, index) => {
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
        props.manageAddWatchlistPopup({
          isShow: true,
          data: {
            id: portfolio.id,
          },
        });
      }
    } catch (e) {}
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

  const renderRow = ({ item, index }) => {
    return (
      <PortfoliosDetailCard
        onPressPortfolio={onPressPortfolio}
        key={index}
        index={index}
        data={item}
        navigation={navigation}
        onWatchPopUp={onWatchPopUp}
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

  return (
    <View style={container}>
      <NavBar
        title={'TRINKERR'}
        rightImage={strLocale('home.notification')}
        rightImage2={strLocale('home.search')}
        onPressBack={onPressBack}
      />
      <View style={listContainer}>
        {renderTitle()}
        {renderFilter()}
        {renderFilterCategory()}

        <View style={listContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="always"
            data={props.portfoliosPagination}
            extraData={props.portfoliosPagination}
            onEndReachedThreshold={0.5}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={renderFooter}
            renderItem={renderRow}
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
});

const mapStateToProps = state => {
  return {
    portfoliosPagination: state.home.portfoliosPagination || [],
    filtersGroup: state.home.filtersGroup || {},
    eventData: state.account.eventData,
  };
};

export default connect(mapStateToProps, {
  manageFilterMenu,
  paginationPortfoliosList,
  portfoliosPaginationListUpdate,
  manageCreateOrEditPortfolio,
  manageAddWatchlistPopup,
  deletePortfolioToWatchlistAction,
  updateWatchlistData,
})(HomeDetailScreen);
