const initialState = {
  Users: [],
  isLoading: false,
  AuthUser: [],
  shortUserDetails: [],
  AllusersMinData: [],
};

export default function UsersReducers(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_USERS':
      let {AuthUser} = state;

      // get filtered  user details for the logged in user
      let userDetails = action.payload.filter(user => {
        if (user?.id == AuthUser[0]?.uid) {
          return user;
        }
      });
      let userData = [];

      let user = {
        id: userDetails[0].id,
        Name: userDetails[0].Name,
        Phone: userDetails[0].Phone,
      };
      userData.push(user);
      // reducing the user details to short version
      let shortUserDetails = action.payload.map(user =>
      {
        return {
          id: user.id,
          Name: user.Name + ' ' + user?.FirstName,
          Phone: user.Phone,
          IdNo: user.IdNo,
        };
      })
      return {
        ...state,
        Users: action.payload,
        shortUserDetails: userData,
        AllusersMinData: shortUserDetails,
        isLoading: false,
      };
 
    case 'LOGGED_IN_USER':
      let Action = [];
      Action.push(action.payload);

      return {
        ...state,
        AuthUser: Action,
      };
    case 'ADD_NEW_USER':
      let newUser = state.Users;

      newUser.unshift(action.payload);

      return {
        ...state,
        Users: Object.assign([], newUser),
      };
    
    case 'UPDATE_USER':
      let updateUser = state.Users;
      let userIndex = updateUser.findIndex(
        user => user.id === action.payload.id,
      );
      updateUser[userIndex] = action.payload;
      return {
        ...state,
        Users: Object.assign([], updateUser),
      };
    case 'DELETE_USER':
      let deleteUser = state.Users;
      let userIndex2 = deleteUser.findIndex(
        user => user.id === action.payload.id,
      );
      deleteUser.splice(userIndex2, 1);
      return {
        ...state,
        Users: Object.assign([], deleteUser),
      };
    
    default:
      return state;
  }
}
