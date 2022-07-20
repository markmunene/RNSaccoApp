import firestore from '@react-native-firebase/firestore';

export const StoreDeposit = (deposit) => {
    
    return async (dispatch) => {
        try {
            await firestore().collection('deposits').add({ ...deposit.data });
            dispatch({type: 'STORE_DEPOSIT', payload: deposit.data});
        } catch (error) {
            console.log(error);
        }
    }
}

export const getAllDeposits = () => {
    return async (dispatch) => {
        try {
            const deposits = await firestore().collection('deposits').get();
            const depositsArray = [];
            deposits.forEach(doc => {
                depositsArray.push({...doc.data(), id: doc.id});
            });
            dispatch({type: 'GET_ALL_DEPOSITS', payload: depositsArray});
        } catch (error) {
            console.log(error);
        }
    }
}