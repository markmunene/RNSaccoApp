const initialState = {
  joints: [],
  groups: [],
};
export default function AccountsReducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_JOINTS':
      // console.log(action.payload, 'action.payload');
      return {
        ...state,
        joints: action.payload,
      };
    case 'GET_ALL_GROUPS':
      //   console.log(action.payload, 'action.payload');
      return {
        ...state,
        groups: action.payload,
      };
    default:
      return state;
  }
}
