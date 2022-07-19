const initialState = {
  withdrawRequest: [],
};

export default function WithdrawReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_WITHDRAW_REQUEST':
      return {
        ...state,
        withdrawRequest: action.payload,
      };
    default:
      return state;
  }
}
