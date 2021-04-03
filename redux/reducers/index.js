import { combineReducers } from 'redux';

import coins from './coins';
import spinner from './spinner';
import bet from './bet';

export default combineReducers({
  coins,
  spinner,
  bet,
});
