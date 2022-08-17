import auth from '@react-native-firebase/auth';

export const LoginAction = AuthUser => {
  return dispatch => {
    dispatch({
      type: 'LOGGED_IN_USER',
      payload: AuthUser,
    });
  };
};
export const HandleAuthPin = AuthUser => {
  return dispatch => {
    dispatch({
      type: 'AuthUser',
      payload: AuthUser,
    });
  };
};
export const Delete_User = user => {
  return async dispatch => {
    await firestore().collection('users').doc(user.item.id).delete();
    dispatch({type: 'DELETE_USER', payload: user.item.id});
  };
};
