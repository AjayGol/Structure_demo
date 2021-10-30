module.exports = {
  baseUrl: 'http://3.108.244.88:3010/api/',
  // baseUrl: 'http://3.108.89.208:3010/api/',
  // baseUrl: 'http://ishdutt-trinkerr-dev.in.ngrok.io/api/',
  baseUrlTest: 'http://3.108.89.208:3010/api/',
  redeemBaseUrl: 'https://dev.trinkerr.com/payments/api/',
  signUpOTP: 'traders/mobile-verifications',
  signUp: 'v1/web/traders',
  signUpTemp: 'traders',
  signInOTP: 'v1/web/traders/generateOtpForLogin',
  signIn: 'v1/web/traders/logins/password',
  signInTemp: 'traders/logins',
  signInWithPassword: 'v1/web/traders/logins/password',
  signInWithPasswordTemp: 'traders/logins',
  signInOPTVerification: 'v1/web/traders/logins/otp',
  resetPasswordOTP: 'traders/forgotCredentials',
  resetPasswordOTPVerify: 'traders/getLoginInfo',
  resetPassword: 'traders/resetPassword',
  getUserDetail: 'traders/me',
  changePassword: 'traders/me/changePassword',
  phoneChange: 'traders/me/changeNumber',
  portfoliosBestList: 'portfolios/welcome/bestPortfolios',
  portfoliosBestEquityList: 'portfolios/welcome/bestPortfolios/bestEquity?',
  portfoliosPagination: 'portfolios?',
  setToken: 'traders/setDeviceToken',
  removeToken: 'traders/removeDeviceToken',

  //Watchlists
  getWatchlistsData: 'traders/me/watchlists/rn/',
  addWatchlist: 'traders/me/watchlists',
  renameWatchlist: 'traders/me/watchlists/',
  deleteWatchlist: 'traders/me/watchlists/',
  addAssetToWatchlist: 'traders/me/watchlists/{id}/assets',
  addPortfoliosToWatchlist: 'traders/me/watchlists/{id}/portfolios',
  deleteAssetToWatchlist: 'traders/me/watchlists/{id}/assets/',
  deletePortfoliosToWatchlist: 'traders/me/watchlists/{id}/portfolios/',
  searchAssets: 'assets',
  assetDetails: 'assets/',

  portfoliosDetail: 'portfolios/',
  holdingComposition: '/composition',
  follower: '/followers',
  myFollower: 'traders/me/followers?',
  getOrders: 'traders/me/orders',
  searchPortfolio: 'portfolios/search?',
  angelLogin: 'brokers/angel/loginUrl',
  angelLoginNew: 'brokers/angel/credentials',
  angelTokenSet: 'brokers/angel/setToken',
  angelLogOut: 'brokers/angel/logout',
  zerodhaLogOut: 'brokers/kite/logout',
  twitterLogout: 'twitter/logout',
  getInvestment: '/getInitialOrders',
  followPortfolio: '/follow',
  followPortfolioZerodha: '/follow/pending/Zerodha',
  watchlistSearch: 'traders/me/watchlists/items/search?',
  createPortfolio: 'portfolios',
  editPortfolio: 'portfolios/',
  twitterCredentials: 'twitter/credentials',
  twitterSaveCredentials: 'twitter/saveToken',
  myPortfolio: '/portfolios',
  myPortfolioList: 'traders/me/portfolios/rn',

  //UPI
  redeemCoins: 'payout',

  //trader
  getTrader: 'traders/',
  getTraderDetails: 'traders​/{id}​/summary',
  getTraderPortfolios: 'traders/{id}/portfolios',
  getPerformance: 'v1/web/traders/me/performance',

  //notification
  getNotification: 'notifications/unread/statuschanged/rn?',
  getNotificationsTrades: 'notifications/unread/orderplaced/rn?',
  readNotification: 'notifications/readStatusNotification',
  readOrderNotification: 'notifications/readOrderNotification',
  executeNotification: '/executeNotification',
  orderInNotification: '/orders',
  orderInNotificationZeroda: '/orders/pending/Zerodha',
  //home
  analyticsData: 'portfolios/welcome',
};
//http://65.21.61.26:3010/api/
//http://13.126.254.9:3010/api/
//http://13.235.242.65:3010/api/
//http://dev.trinkerr.com:3010/swagger/
//http://3.108.244.88:3010/swagger/

//http://3.108.244.88:3010/api/ = Staging
//http://3.108.89.208:3010/api/ = Production
