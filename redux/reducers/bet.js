export const UPDATE_BET = 'UPDATE_BET';

export const updateBet = bet => ({
  type: UPDATE_BET,
  bet,
});

const initialState = {
  bet: 10,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_BET:
      return {
        ...state,
        bet: action.bet,
      };
    default:
      return state;
  }
};
