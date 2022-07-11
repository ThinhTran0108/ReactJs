import * as ActionTypes from './ActionTypes';

export const Departments = (state  = { isLoading: true, errMess: null, departments:[] }, action) => {
    switch (action.type) {
        case ActionTypes.DEPTS_DISPLAY:
        return {...state, isLoading: false, errMess: null, departments: action.payload};

        case ActionTypes.DEPTS_LOADING:
            return {...state, isLoading: true, errMess: null, departments: []}

        case ActionTypes.DEPTS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};

        default:
          return state;
      }
};