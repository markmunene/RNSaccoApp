const initialState = {
  deposit: [],
};
export default function DepositReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_DEPOSITS':
      return {
        ...state,
        deposit: action.payload,
      };
    case 'STORE_DEPOSIT':
      let tempDeposit = state.deposit;
      tempDeposit.unshift(action.payload);

      return {
        ...state,
        deposit: Object.assign([], tempDeposit),
      };

    default:
      return state;
  }
}
