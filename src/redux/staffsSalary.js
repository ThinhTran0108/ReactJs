import * as ActionTypes from './ActionTypes';

export const StaffsSalary = (state  = { isLoading: true,errMess: null,staffsSalary:[]}, action) => {
    switch (action.type) {
        case ActionTypes.SS_DISPLAY:
        return {...state, isLoading: false, errMess: null, staffsSalary: action.payload};

        case ActionTypes.SS_LOADING:
            return {...state, isLoading: true, errMess: null, staffsSalary: []}

        case ActionTypes.SS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};