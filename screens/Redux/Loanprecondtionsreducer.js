const initialState = {
  loanCondtions: [],
};

export default function LoanpreconditionsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_PRECONDITIONS':
      return {
        ...state,
        loanCondtions: action.payload,
      };
    case 'UPDATE_LOAN_CONDITIONS':
      let muteData = state.loanCondtions;
      let index = muteData.findIndex(item => item.id === action.payload.id);
      muteData[index] = action.payload;
      return {
        ...state,
        loanCondtions: Object.assign([], muteData),
      };
    case 'ADD_LOAN_CONDITIONS':
      let muteData1 = state.loanCondtions;
      let newConditionArray = muteData1.unshift(action.payload);
      return {
        ...state,
        loanCondtions: Object.assign([], newConditionArray),
      };
    case 'DELETE_LOAN_CONDITIONS':
      let muteData2 = state.loanCondtions;
      let newConditionArray2 = muteData2.filter(
        item => item.id != action.payload.id,
      );
      return {
        ...state,
        loanCondtions: Object.assign([], newConditionArray2),
      };

    default:
      return state;
  }
}
