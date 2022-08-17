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

export const AddnewUser = user => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NEW_USER',
      payload: user.userData,
    });
  };
};
export const UpdateUser = user => {
  return async dispatch => {
    console.log(user);
    dispatch({
      type: 'UPDATE_USER',
      payload: user,
    });
  };
};
export const DeleteUser = user => {
  return async dispatch => {
    await firestore().collection('users').doc(user.id).delete();
    // console.log(user, 'userrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
    dispatch({
      type: 'DELETE_USER',
      payload: user,
    });
  };
};
