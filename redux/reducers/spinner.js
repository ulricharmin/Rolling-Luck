export const UPDATE_SPINNER = 'UPDATE_SPINNER';

export const updateSpinner = spinner => ({
  type: UPDATE_SPINNER,
  spinner,
});

const initialState = {
  spinner: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SPINNER:
      return {
        ...state,
        spinner: action.spinner,
      };
    default:
      return state;
  }
};
