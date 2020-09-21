import { combineReducers } from 'redux';

import coins from './coins';
import spinner from './spinner';

export default combineReducers({
  coins,
  spinner
});
