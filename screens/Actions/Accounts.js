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
