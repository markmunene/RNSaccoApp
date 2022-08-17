import firestore from '@react-native-firebase/firestore';

export const getAllwithdrawRequests = () => {
  return async dispatch => {
    //    from firebase firestore
    await firestore()
      .collection('withdrawRequest')
      .get()
      .then(async snapshot => {
        const withdrawRequest = [];
        let i = 0;
        snapshot.forEach(async doc => {
          const data = doc.data();
          withdrawRequest.push(data);
          withdrawRequest[i]['id'] = doc.id;
          i++;
        });
        dispatch({
          type: 'GET_ALL_WITHDRAW_REQUEST',
          payload: withdrawRequest,
        });
      });
  };
};
export const storeWithdrawRequest = withdrawRequest => {
  return async dispatch => {
    //    from firebase firestore
    await firestore()
      .collection('withdrawRequest')
      .add({...withdrawRequest.data})
      .then(async doc => {
        dispatch({
          type: 'STORE_WITHDRAW_REQUEST',
          payload: {...withdrawRequest.data, id: doc.id},
        });
      });
  };
};

export const UpDate_WithdrawRequest = withdrawRequest => {
  return async dispatch => {
    await firestore()
      .collection('withdrawRequest')
      .doc(withdrawRequest.withdrawData.id)
      .update({...withdrawRequest.withdrawData});
    dispatch({
      type: 'UPDATE_WITHDRAW_REQUEST',
      payload: withdrawRequest.withdrawData,
    });
  };
};
export const Delete_WithdrawRequest = withdrawRequest => {
  return dispatch => {
    firestore()
      .collection('withdrawRequest')
      .doc(withdrawRequest.id)
      .delete()
      .then(() => {
        dispatch({
          type: 'DELETE_WITHDRAW_REQUEST',
          payload: withdrawRequest,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
