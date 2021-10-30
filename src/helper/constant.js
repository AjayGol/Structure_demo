import { Dimensions, Platform } from 'react-native';
import DarkThemeColor from './multi-theme/dark-theme-color';
import DefaultThemeColor from './multi-theme/default-theme-color';

const customAlert = strLocale => {
  return {
    logOut: {
      data: [
        {
          title: strLocale('alert.Log out'),
          description: strLocale(
            'alert.Do you want to log out of the Trinkerr app',
          ),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout',
    },
    logOutBroker: {
      data: [
        {
          title: strLocale(
            'alert.Are you sure that you want to logout from Active Broker?',
          ),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout_broker',
    },
    logOutZerodhaBroker: {
      data: [
        {
          title: strLocale(
            'alert.Are you sure that you want to logout from Active Broker?',
          ),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout_broker_zerodha',
    },
    logOutTwitter: {
      data: [
        {
          title: strLocale('alert.Log out from the Twitter'),
          description: strLocale('alert.Do you want to logout'),
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
      type: 'logout_twitter',
    },
    broker: {
      data: [
        {
          title: 'Broker Accounts',
          description: 'Specify your broker account to follow the portfolio',
          image: 'angel_broking',
        },
      ],
      listingData: [
        {
          title: 'Angel Broking',
          image: 'angel_broking',
        },
        {
          title: 'Zerodha',
          image: 'zerodha',
        },
      ],
      left: 'CANCEL',
      right: 'SPECIFY',
      isSingleButton: false,
      type: 'broker',
    },
    linkTwitter: {
      data: [
        { title: 'Your account has not linked with your Twitter account' },
      ],
      listingData: [
        {
          title: 'Link your account with Twitter',
        },
        {
          title: 'Continue without account linking',
        },
      ],
      left: 'CANCEL',
      right: 'CONTINUE',
      isSingleButton: false,
      type: 'twitter_linking',
    },
  };
};

const customAlert2 = strLocale => {
  return {
    logOut: {
      data: [
        {
          title: 'Log out',
          description: 'you want to log out of the Trinkerr app',
        },
      ],
      left: 'CANCEL',
      right: 'LOG OUT',
      isSingleButton: false,
    },
  };
};

module.exports = {
  appName: 'Trinkerr',
  isRelease: true,
  isDevelop: false,
  isLoadShow: true,
  isShowAPI: true,
  apiTesting: false,
  testUser: 'test@gmail.com',

  /** Custom Alert */
  customAlert,
  customAlert2,

  /** App Color */
  appBlueColor: '#2D8EE7',
  appRedColor: '#E72D5F',
  appGrayColor: '#59595C',
  appBackgroundColor: '#E7F4FB',
  appSkyBlueColor: '#27C5C1',
  appBlueNewColor: '#1890FF',
  appLightGray: '#BCBCBF',
  appGrayNew: '#F9F9F9',
  skyblue: '#1890FF',

  /** multiple theme */
  LIGHT: DefaultThemeColor,
  DARK: DarkThemeColor,

  /** screen */
  screen: Dimensions.get('window'),
  screenHeight:
    (Platform.OS === 'ios' && Dimensions.get('window').height) ||
    Dimensions.get('window').height - 24,
  screenWidth: Dimensions.get('window').width,
  fullScreenHeight: Dimensions.get('window').height,
  buttonWidth: Dimensions.get('window').width - 36,

  /** iphone and android condition */
  isIphoneX: Platform.OS === 'ios' && Dimensions.get('window').height === 812,
  isIOS: Platform.OS === 'ios',
  isiPAD:
    Dimensions.get('window').height / Dimensions.get('window').width < 1.6,
  isIpad:
    Dimensions.get('window').width > 400 &&
    Dimensions.get('window').height / Dimensions.get('window').width < 1.6,
  isANDROID: Platform.OS === 'android',

  /** common color */
  backProgressBarColor: '#297AC4',
  transparent: 'transparent',
  lightBlue: '#9E89FF',
  darkBackgroundColor: '#111111',
  darkBlackColor: '#000000',
  buttonFontColor: '#000000',
  lightWhiteColor: '#FFFFFF',
  textInputBorderColor: '#BB86FC',
  textGrayColor: 'rgba(255, 255, 255, 0.6)',
  whiteColor: '#ffffff',
  appBackgroundColorDark: '#E5E5E5',
  textInputPlaceholderColor: 'rgba(255, 255, 255, 0.38)',
  shadowColor: '#164672',
  saltColor: '#27C5C1',
  lightGrayColor: 'rgba(255, 255, 255, 0.6)',
  yelloMainColor: '#387ED1',
  BrokerBorderColor: '#FFF1B8',

  /** Pie and Holding */
  lightGreenColor: '#8CE4D4',
  lightYellowColor: '#BDDC89',
  lightPinkColor: '#DC89B6',
  lightBrinjColar: '#9589DC',
  linearGrayColor: '#333333',
  graphSegmentColors: [
    '#00b8d4',
    '#ffd600',
    '#00c853',
    '#ea80fc',
    '#f9a825',
    '#fff9c4',
    '#80d8ff',
    '#ff6d00',
    '#7e57c2',
    '#00897b',
    '#f57f17',
    '#c8e6c9',
    '#ff1744',
    '#80cbc4',
    '#e0e0e0',
    '#e57373',
    '#ba68c8',
    '#42a5f5',
    '#fff59d',
    '#aed581',
    '#ffcc80',
    '#7986cb',
    '#ffcdd2',
    '#7c4dff',
    '#c2185b',
    '#ff9800',
    '#c62828',
    '#ffee58',
    '#039be5',
    '#f50057',
    '#3f51b5',
    '#2196f3',
    '#b2ebf2',
    '#fdd835',
    '#2e7d32',
    '#ffff00',
    '#fff59d',
    '#4dd0e1',
    '#8bc34a',
    '#fff9c4',
    '#ff80ab',
    '#4db6ac',
    '#ffb74d',
    '#4fc3f7',
    '#b39ddb',
    '#f06292',
    '#1976d2',
    '#fffde7',
    '#ffca28',
    '#5c6bc0',
    '#ab47bc',
    '#ffff8d',
    '#fbc02d',
    '#689f38',
    '#fff176',
    '#29b6f6',
    '#0097a7',
    '#01579b',
    '#ffea00',
    '#ffeb3b',
    '#ffd600',
    '#43a047',
    '#ffb300',
  ],
  highLightWhiteColor: 'rgba(255, 255, 255, 0.97)',
  normalLightWhiteColor: 'rgba(255, 255, 255, 0.87)',
  redeemCardColor: 'rgba(123, 92, 251, 1)',
  lightGreen: 'rgba(115, 209, 61, 1)',
  green: '#4DD865',
  lightText: '#00C4B4',
  /* ordersColors */
  cardGreen: '#D3F261',
  darkBg: '#141414',
  greenBg: '#237804',
  redBg: '#820014',
  orangeBg: '#D46B08',
  /* ordersColors */

  warning: '#FFC600',
  /** Modal Investment */
  modalBackgroundColor: '#141414',
  modalLightColor: '#1F1F1F',
  InputBoxColor: '#262626',
  InputTextColor: 'rgba(255, 255, 255, 0.6)',
  InputBorderColor: 'rgba(255, 255, 255, 0.6)',

  /** HomeTabGradient */
  emptyDataGradient: ['rgba(255, 255, 255, 0.16)', 'rgba(255, 255, 255, 0.16)'],
  emptyBoxGradient: ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.05)'],

  watchlistCardGradient: [
    'rgba(108, 78, 226, 1)',
    'rgba(137, 78, 226, 1)',
    'rgba(179, 78, 226, 1)',
  ],

  rewardsCardGradient: [
    'rgba(255, 255, 255, 0.07)',
    'rgba(255, 255, 255, 0.07)',
  ],
  textGradient: ['rgba(144, 226, 252, 0.85)', 'rgba(166, 56, 234, 0.85)'],

  startGreenGradient: 'rgba(187, 134, 252, 0.1)',
  radiusPinkGradient: 'rgba(177, 77, 186, 0.4)',
  linearBlueGradient: 'rgba(75, 41, 148, 0.7)',
  linearBlackGradient: 'rgba(35, 35, 35, 1)',
  linearDarkBlackGradient: 'rgba(255, 255, 255, 0.07)',
  linerPurplekGradient: 'rgba(187, 134, 252, 0.08)',

  /** promo */
  backgroundGradientStart: '#297AC5',
  backgroundGradientEnd: '#0075B7',
  errorBorderColor: '#DD9EAF',
  borderHighLightsColor: '#68A5DE',
  textBorderColor: '#CCDCE6',
  textBackgroundColor: '#FEF4F7',
  textErrorBackgroundColor: '#FDFDFD',
  textHeaderErrorColor: '#E72D5F',
  textHeaderColor: '#2D8EE7',
  iconPasswordHide: 'icon_hiddeneye',
  iconPasswordShow: 'icon_openeye',

  /** signIn */
  imageHeaderLogo: 'trinkerrlogo',

  /** signUp */
  codeBorderColor: '#CCDCE5',
  codeBorderFill: '#2D8EE7',
  codeBackground: '#FDFDFD',
  codeErrorBackground: 'rgba(231, 45, 95, 0.05)',
  codeBorderErrorFill: '#DD9EAF',
  codeIndicatorColor: '#59595C',

  /** tabBar */
  gradientStartTab: '#2D8EE6',
  gradientEndTab: '#297AC4',

  /** Trends Color */
  upGreen: '#27C5C1',
  downRed: '#E7582D',

  /** Dark theme colors */
  mediumDark: '#1E1E1E',
  lightDark: '#252525',
  lightWhite: 'rgba(255, 255, 255, 0.87)',
  primaryPurple: '#BB86FC',
  lightGrey: 'rgba(255, 255, 255, 0.6)',
  lightShadowWhite: '#434343',

  /** Tab Bar */
  tabBarGradient: [
    'rgba(238, 51, 255, 0.85)',
    'rgba(255, 248, 79, 0.85)',
    'rgba(0, 212, 255, 0.85)',
  ],
  tabSelected: '#BB86FC',
  tabUnSelected: '#FFFFFF',

  /** Profile */
  profileHeaderGradient: [
    'rgba(255, 248, 79, 0.85)',
    'rgba(238, 51, 255, 0.85)',
    'rgba(0, 212, 255, 0.85)',
  ],

  /** Order */
  homeCardGradient: [
    'rgba(187, 134, 252, 0.1)',
    'rgba(177, 77, 186, 0.4)',
    'rgba(75, 41, 148, 0.7)',
    'rgba(35, 35, 35, 1)',
    'rgba(255, 255, 255, 0.07)',
  ],

  promoList: [
    {
      text: 'Bet you wish you could time travel right now!',
      description:
        'Had you invested ₹ 1000 in this portfolio in Jan `21, it would be worth ₹ 2130  now (x% profit).',
      image: 'onboarding_graph',
      video: 'tutorial_1',
      time: 4.33,
    },
    {
      text: 'Real trades and genuine returns',
      description:
        'In a world of fake gurus, find traders you can trust based on their past performance. ',
      video: 'tutorial_2',
      time: 5,
    },
    {
      text: 'Radically simple investing',
      description:
        'Built for everyone, no matter how much experience you have (or don’t have).',
      video: 'tutorial_3',
      time: 5.5,
    },
    {
      text: 'Your stocks and money stay safe with your broker',
      description:
        'All investments made on Trinkerr are executed by your broker and we never hold your assets.',
      video: 'tutorial_4',
      time: 4.31,
    },
    {
      text: 'Did we say it’s all free?!',
      description:
        "That's right... We don't charge even a single paisa for any of our services!",
      video: 'tutorial_5',
      time: 4.91,
    },
  ],

  tutorialList: [' easier', ' social', ' open'],
  tutorialText: 'The app that makes\ninvestment',

  IndianTerritories: [
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
    'Andaman and Nicobar Island',
    'Chandigarh',
    'Dadra and Nagar Haveli and Daman and Diu',
    'Delhi',
    'Ladakh',
    'Lakshadweep',
    'Jammu and Kashmir',
    'Puducherry',
  ],

  monthNames: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  boxShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: -3 },
    shadowOpacity: 0.06,
    shadowRadius: 8.0,
    elevation: 20,
  },
  viewShadow: {
    shadowColor: '#164672',
    shadowOffset: { width: 10, height: -3 },
    shadowOpacity: 0.04,
    shadowRadius: 4.0,
    elevation: 4,
  },
  shadowView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  blackShadow: {
    shadowColor: '#000000',
    shadowOffset: { width: 10, height: -3 },
    shadowOpacity: 0.03,
    shadowRadius: 2.0,
    elevation: 4,
  },
  tabIcon: {
    Today: 'tab_home_new',
    Orders: 'tab_orders',
    Invest: 'tab_invest',
    Watchlists: 'tab_watchlists',
  },
  selectedTabIcon: {
    Today: 'tab_home_selected',
    Orders: 'tab_orders_selected',
    Profile: 'tab_profile_selected',
    Watchlists: 'tab_watchlists_selected',
  },

  pagination: 10,
  paginationBigLoad: 50,
  paginationMyPortfolio: 10,

  headerBGColor: '#262626',
  headerHeight: 60,
  tabBarHeight: 60,
  searchBarHeight: 68,

  customAlertBlur: 'rgba(0, 0, 0, 0.8)',
  customAlertButtonLeft: 'rgba(255, 255, 255, 0.1)',
};

/*
{ fontWeight: '100' }, // Thin
{ fontWeight: '200' }, // Ultra Light
{ fontWeight: '300' }, // Light
{ fontWeight: '400' }, // Regular
{ fontWeight: '500' }, // Medium
{ fontWeight: '600' }, // Semibold
{ fontWeight: '700' }, // Bold
{ fontWeight: '800' }, // Heavy
{ fontWeight: '900' }, // Black
 */
