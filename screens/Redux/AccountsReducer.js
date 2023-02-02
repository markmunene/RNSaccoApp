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
        groups:  tempAccounts,
      };
    case 'ADD_NEW_Joints':
      let tempAccounts1 = state.joints;
      tempAccounts1.unshift(action.payload);
      return {
        ...state,
        groups: tempAccounts1,
      };
    case 'DELETE_Joints':
      let tempAccounts2 = state.joints;
      let tempData2 = tempAccounts2.filter(item => {
        if (item.id != action.payload.id) {
          // console.log(item.id, action.payload.id);
          return item;
        }
      });

      // console.log(tempData2, 'temeeeeeeeeeeeeeeeeepData2');
      return {
        ...state,
        joints: Object.assign([], tempData2),
      };
    case 'DELETE_groups':
      let tempAccounts3 = state.groups;
      let tempDat3 = tempAccounts3.filter(item => item.id != action.payload.id);

      let finalData = Object.assign([], tempDat3);
      console.log(finalData, 'finalData');
      return {
        ...state,
        groups: Object.assign([], finalData),
      };
    default:
      return state;
  }
}
