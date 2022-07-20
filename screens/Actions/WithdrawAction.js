import firestore from '@react-native-firebase/firestore';

export const getAllwithdrawRequests = () => {
  return async dispatch => {
    //    from firebase firestore
    await firestore()
      .collection('withdrawRequest')
      .get()
      .then(async snapshot => {
        const withdrawRequest = [];
        const i = 0;
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
      .add({ ...withdrawRequest.data });
    dispatch({type: 'STORE_WITHDRAW_REQUEST', payload: withdrawRequest.data});
  }
}
