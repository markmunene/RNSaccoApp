// create a dispatch to save a user

import firestore from '@react-native-firebase/firestore';
export const RegisteredUsers = user => {
  return async dispatch => {
    const users = await firestore().collection('users').get();
    const usersArray = [];
    let i = 0;
    users.forEach(doc => {
      usersArray.push(doc.data());
      usersArray[i]['id'] = doc.id;
      i++;
    });

    dispatch({
      type: 'GET_ALL_USERS',
      payload: usersArray,
    });
  };
};
