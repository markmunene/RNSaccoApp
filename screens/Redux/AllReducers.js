import {combineReducers} from 'redux';

import LoanpreconditionsReducer from './Loanprecondtionsreducer';
import LoanRequestReducer from './LoanRequestReducer';
import AccountsReducer from './AccountsReducer';
import UsersReducers from './UsersReducers';
import WithdrawReducer from './WithdrawReducer';
import DepositReducer from './DepositReducer';
const AllReducers = combineReducers({
  users: UsersReducers,
  policies: LoanpreconditionsReducer,
  accounts: AccountsReducer,
  loanRequests: LoanRequestReducer,
  withdraw: WithdrawReducer,
  deposit: DepositReducer,
});

export default AllReducers;
