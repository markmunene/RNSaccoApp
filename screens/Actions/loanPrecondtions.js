import firestore from '@react-native-firebase/firestore';

export const getAllpreconditions = () => {
  return async dispatch => {
    const preconditions = await firestore().collection('loan_policy').get();
    const preconditionsArray = [];
    let i = 0;
    preconditions.forEach(doc => {
      preconditionsArray.push(doc.data());
      preconditionsArray[i]['id'] = doc.id;
      i++;
    });
    dispatch({
      type: 'GET_ALL_PRECONDITIONS',
      payload: preconditionsArray,
    });
  };
};
export const UpdateLoanPreConditions = data => {
  return async dispatch => {
    console.log(data, 'data');
    dispatch({
      type: 'UPDATE_LOAN_CONDITIONS',
      payload: data,
    });
  };
};

export const AddLoanPreConditions = data => {
  return async dispatch => {
    // console.log(data, 'data');
    dispatch({
      type: 'ADD_LOAN_CONDITIONS',
      payload: data,
    });
  };
};
export const DeleteLoanPreConditions = data => {
  return async dispatch => {
    // console.log(data.item, 'data');
    await firestore().collection('loan_policy').doc(data.item?.id).delete().catch(error => { console.log(error); });

    dispatch({
      type: 'DELETE_LOAN_CONDITIONS',
      payload: data.item,
    });
  };
};
