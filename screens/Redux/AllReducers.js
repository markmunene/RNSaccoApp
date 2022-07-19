import {combineReducers} from 'redux';

import LoanpreconditionsReducer from './Loanprecondtionsreducer';
import AccountsReducer from './AccountsReducer';
import UsersReducers from './UsersReducers';
import WithdrawReducer from './WithdrawReducer';
const AllReducers = combineReducers({
  users: UsersReducers,
  policies: LoanpreconditionsReducer,
  accounts: AccountsReducer,
  withdraw: WithdrawReducer,
});

export default AllReducers;
