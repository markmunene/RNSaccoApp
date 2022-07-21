
const initialState = {
    loanRequest: [],
    ApprovedLoans: [],
    LoanPayment: [],
}

export default function LoanRequestReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_ALL_LoanRequest':
            return {
                ...state,
                loanRequest: action.payload,
            };
        case 'CREATE_LoanRequest':
            let newLoanRequest = [...state.loanRequest];
            newLoanRequest.unshift(action.payload);
            return {
                ...state,
                loanRequest: Object.assign([], newLoanRequest),
            };
        case 'UPDATE_LoanRequest':
            let updatedLoanRequest = state.loanRequest;
            let index = updatedLoanRequest.findIndex(
                (loanRequest) => loanRequest.id == action.payload.id
            );
            updatedLoanRequest[index] = action.payload;
            // console.log(updatedLoanRequest[index], 'updatedLoanRequest');
            return {
                ...state,
                loanRequest: Object.assign([], updatedLoanRequest),
            }
        case 'GET_APPROVED_LOANS':
            return {
                ...state,
                ApprovedLoans: action.payload,
            }
        case 'Add_Approved_Loan':
            let newApprovedLoans = state.ApprovedLoans;
            newApprovedLoans.unshift(action.payload);
            return {
                ...state,
                ApprovedLoans: Object.assign([], newApprovedLoans),
            }
        case 'UPDATE_APPROVED_LOAN':
            let updatedApprovedLoans = state.ApprovedLoans;
            let index1 = updatedApprovedLoans.findIndex(
                (loan) => loan.id == action.payload.id
            );
            updatedApprovedLoans[index1] = action.payload;

            // console.log(updatedLoanRequest[index], 'updatedLoanRequest');
            return {
                ...state,
                ApprovedLoans: Object.assign([], updatedApprovedLoans),
            }
        case 'GET_ALL_LoanPayment':
            return {
                ...state,
                LoanPayment: action.payload,
            }
        case 'ADD_LoanPayment':
            let newLoanPayment = state.LoanPayment;
            newLoanPayment.unshift(action.payload);
            return {
                ...state,
                LoanPayment: Object.assign([], newLoanPayment),
            }
        default:
            return state;
    }
}
