import firestore from '@react-native-firebase/firestore';

export const getLoanRequest = () => {
  return async dispatch => {
    const LoanRequest = await firestore().collection('LoanRequests').get();
    const LoanRequestArray = [];
    let i = 0;
    LoanRequest.forEach(doc => {
      LoanRequestArray.push(doc.data());
      LoanRequestArray[i]['id'] = doc.id;
      i++;
    });
    dispatch({
      type: 'GET_ALL_LoanRequest',
      payload: LoanRequestArray,
    });
  };
};

export const createLoanRequest = loanRequest => {
  let temploan = [];

  return async dispatch => {
    await firestore()
      .collection('LoanRequests')
      .add({...loanRequest.LoanDetails})
      .then(doc => {
        // temploan.push({...loanRequest.LoanDetails,id:doc.id});
        dispatch({
          type: 'CREATE_LoanRequest',
          payload: {...loanRequest.LoanDetails, id: doc.id},
        });
      });
  };
};
export const updateLoanRequest = loanRequest => {
  return async dispatch => {
    // console.log(loanRequest.id, 'loanRequesttttttttttttttttttttttttttttttt');
    await firestore().collection('LoanRequests').doc(loanRequest.id).update({
      status: 'approved',
    });
    dispatch({
      type: 'UPDATE_LoanRequest',
      payload: loanRequest,
    });
  };
};
export const getApprovedLoans = () => {
  return async dispatch => {
    // let ApprovedLoans = await firestore().collection('loans');
    // ApprovedLoans = ApprovedLoans.limit(10);
    // ApprovedLoans.onSnapshot(querySnapshot => {
    //   const ApprovedLoansArray = [];
    //   let i = 0;
    //   querySnapshot.forEach(doc => {
    //     ApprovedLoansArray.push(doc.data());
    //     ApprovedLoansArray[i]['id'] = doc.id;
    //     i++;
    //   });
    //   dispatch({
    //     type: 'GET_APPROVED_LOANS',
    //     payload: ApprovedLoansArray,
    //   });
    // });
  };
};
export const addApprovedLoan = loan => {
  return async dispatch => {
    await firestore()
      .collection('loans')
      .add({...loan})
      .then(doc => {
        dispatch({
          type: 'Add_Approved_Loan',
          payload: {...loan, id: doc.id},
        });
      });
  };
};
export const getLoanPayment = () => {
  return async dispatch => {
    const LoanPayment = await firestore().collection('loanPayment').get();
    const LoanPaymentArray = [];
    let i = 0;
    LoanPayment.forEach(doc => {
      LoanPaymentArray.push(doc.data());
      LoanPaymentArray[i]['id'] = doc.id;
      i++;
    });
    dispatch({
      type: 'GET_ALL_LoanPayment',
      payload: LoanPaymentArray,
    });
  };
};
export const addLoanPayment = (loanPayment, loanData) => {
  return async dispatch => {
    // add loan payment to loan collection

    // await firestore()
    //   .collection('loanPayment')
    //   .add({...loanPayment});

    // // update Loan Balance
    // await firestore()
    //   .collection('loans')
    //   .doc(loanData.id)
    //   .update({
    //     ...loanData,
    //   });
    // dispatch redux actions
    dispatch({
      type: 'ADD_LoanPayment',
      payload: loanPayment,
    });
    dispatch({
      type: 'UPDATE_APPROVED_LOAN',
      payload: loanData,
    });
  };
};
export const DeleteLoanRequest = loanRequest => {
  return async dispatch => {
    await firestore()
      .collection('LoanRequests')
      .doc(loanRequest.id)
      .delete()
      .then(() => {
        dispatch({
          type: 'DELETE_LoanRequest',
          payload: loanRequest,
        });
      })
      .catch(error => {
        console.log(error);
      });
  };
};
