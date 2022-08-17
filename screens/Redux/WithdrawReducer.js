const initialState = {
  withdrawRequest: [],
};

export default function WithdrawReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_WITHDRAW_REQUEST':
      let filteredRequest = action.payload.filter(request => {
        if (request.status == 'pending') {
          return request;
        }
      });

      // console.log(filteredRequest, 'filteredRequest');
      return {
        ...state,
        withdrawRequest: filteredRequest,
      };
    case 'STORE_WITHDRAW_REQUEST':
      let tempWithdrawRequest = state.withdrawRequest;
      tempWithdrawRequest.unshift(action.payload);
      return {
        ...state,
        withdrawRequest: Object.assign([], tempWithdrawRequest),
      };
    case 'UPDATE_WITHDRAW_REQUEST':
      let tempWithdraw = state.withdrawRequest;
      let tempResults = tempWithdraw.filter(item => {
        if (item.id != action.payload.id) {
          return item;
        }
      });
      // tempWithdraw.unshift(action.payload);
      return {
        ...state,
        withdrawRequest: Object.assign([], tempResults),
      };
    case 'DELETE_WITHDRAW_REQUEST':
      let tempdeleWithdraw = state.withdrawRequest;
      let tempResultsd = tempdeleWithdraw.filter(item => {
        if (item.id != action.payload.id) {
          return item;
        }
      });
      // tempWithdraw.unshift(action.payload);
      return {
        ...state,
        withdrawRequest: Object.assign([], tempResultsd),
      };
    default:
      return state;
  }
}
