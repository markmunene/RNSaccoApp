const initialState = {
  Users: [],
  isLoading: false,
  AuthUser: [],
  shortUserDetails: [],
};

export default function UsersReducers(state = initialState, action) {
  switch (action.type) {
    case 'GET_ALL_USERS':
      let {AuthUser} = state;

      // get filtered  user details
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
      return {
        ...state,
        Users: action.payload,
        shortUserDetails: userData,
        isLoading: false,
      };
    case 'IS_LOADING':
      return {
        ...state,

        isLoading: true,
      };
    case 'LOGGED_IN_USER':
      let Action = [];
      Action.push(action.payload);

      return {
        ...state,
        AuthUser: Action,
      };

    default:
      return state;
  }
}
