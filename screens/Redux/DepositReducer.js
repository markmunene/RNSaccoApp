const initialState = {
  deposit: [],
  depositBalance: [],
};
export default function DepositReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_DEPOSITS':
      return {
        ...state,
        deposit: action.payload,
      };
    case 'getAllDepositBalance':
      return {
        ...state,
        depositBalance: action.payload,
      };
    case 'STORE_DEPOSIT':
      let tempDeposit = state.deposit;
      tempDeposit.unshift(action.payload);

      return {
        ...state,
        deposit: Object.assign([], tempDeposit),
      };
    case 'UpdateDepositBalance':
      let tempDepositBalance = state.depositBalance;

      let tempbalance = Object.assign([], action.payload);
      return {
        ...state,
        depositBalance: Object.assign([], tempbalance),
      };
    default:
      return state;
  }
}
