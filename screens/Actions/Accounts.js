import firestore from '@react-native-firebase/firestore';
import {fire} from '../../constants/icons';

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
      accountsArray[i]['collection'] = 'groups';
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
      jointsArray[i]['collection'] = 'Joints';
      i++;
    });

    dispatch({
      type: 'GET_ALL_JOINTS',
      payload: jointsArray,
    });
  };
};

export const Delete_Groups = data => {
  // console.log(data);
  return async dispatch => {
    try {
      await firestore()
        .collection(data.collection)
        .doc(data.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        });
      await firestore()
        .collection('deposits')
        .where('groupId', '==', data.id)
        .get()
        .then(async snapshot => {
         
          snapshot.forEach(async doc => {
            if (doc.exists) {
              await firestore().collection('deposits').doc(doc.id).delete();
            }
          });
        });
      dispatch({
        type: `DELETE_${data.collection}`,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
