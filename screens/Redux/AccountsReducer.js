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
    case 'ADD_NEW_GROUP':
      let tempAccounts = state.groups;
      tempAccounts.unshift(action.payload);

      return {
        ...state,
        groups: Object.assign([], tempAccounts),
      };
    case 'ADD_NEW_Joints':
      let tempAccounts1 = state.joints;
      tempAccounts1.unshift(action.payload);
      return {
        ...state,
        groups: Object.assign([], tempAccounts1),
      };
    default:
      return state;
  }
}
