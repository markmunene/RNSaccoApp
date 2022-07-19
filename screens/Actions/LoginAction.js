import auth from '@react-native-firebase/auth';

export const LoginAction = AuthUser => {
  return dispatch => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: AuthUser,
    });
  };
};
