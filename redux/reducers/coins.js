export const UPDATE_COINS = 'UPDATE_COINS';

export const updateCoins = coins => ({
  type: UPDATE_COINS,
  coins,
});

const initialState = {
  coins: 999999,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_COINS:
      return {
        ...state,
        coins: action.coins,
      };
    default:
      return state;
  }
};
