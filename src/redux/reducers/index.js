import {combineReducers} from 'redux';
import auth from './auth';
import stocks from './stocks';
import watchlist from './watchlist';
watchlist
export default combineReducers({
  auth: auth,
  stocks:stocks,
  watchlist:watchlist
});
