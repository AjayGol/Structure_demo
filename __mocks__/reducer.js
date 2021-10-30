import { combineReducers } from 'redux';
import AccountReducer from '../src/modules/account/reducer';
import BrokerReducer from '../src/modules/broker/reducer';
import HomeReducer from '../src/modules/home/reducer';
import SearchReducer from '../src/modules/search/reducer';
import WatchlistReducer from '../src/modules/watchlist/reducer';
import OrdersReducer from '../src/modules/watchlist/reducer';
import NotificationReducer from '../src/modules/notification/reducer';
import buyAssetReducer from '../src/modules/buy-assets/reducer';

export default combineReducers({
  account: AccountReducer,
  home: HomeReducer,
  watchlist: WatchlistReducer,
  orders: OrdersReducer,
  search: SearchReducer,
  broker: BrokerReducer,
  buyAsset: buyAssetReducer,
  notification: NotificationReducer,
});
