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
    case 'STORE_WITHDRAW_REQUEST':
      let tempWithdrawRequest = state.withdrawRequest;
      tempWithdrawRequest.unshift(action.payload);
      return {
        ...state,
        withdrawRequest: Object.assign([], tempWithdrawRequest),
      }
    default:
      return state;
  }

}
