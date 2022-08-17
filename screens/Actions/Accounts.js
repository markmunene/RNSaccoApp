import firestore from '@react-native-firebase/firestore';

export const getGroups = () => {
  return async dispatch => {
    const accounts = await firestore()
      .collection('groups')
      .get()
      .catch(err => {
        console.log(err);
      });
    const accountsArray = [];
    let i = 0;
    accounts.forEach(doc => {
      accountsArray.push(doc.data());
      accountsArray[i]['id'] = doc.id;
      i++;
    });

    dispatch({
      type: 'GET_ALL_GROUPS',
      payload: accountsArray,
    });
  };
};

export const Add_newAccount = data => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NEW_GROUP',
      payload: data,
    });
  };
};
export const ADD_NEW_Joints = data => {
  return async dispatch => {
    dispatch({
      type: 'ADD_NEW_Joints',
      payload: data,
    });
  };
};
// export const Delete_Joints = data =>
// {
//   return async dispatch =>
//   {
//     firestore().
//   }
// }
export const getJoints = () => {
  return async dispatch => {
    const joints = await firestore()
      .collection('Joints')
      .get()
      .catch(error => {
        console.log(error);
      });
    const jointsArray = [];
    let i = 0;
    joints.forEach(doc => {
      jointsArray.push(doc.data());
      jointsArray[i]['id'] = doc.id;
      i++;
    });

    dispatch({
      type: 'GET_ALL_JOINTS',
      payload: jointsArray,
    });
  };
};
