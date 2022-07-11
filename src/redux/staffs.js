import * as ActionTypes from './ActionTypes';

export const Staffs = (state = {isLoading: true,errMess: null,staffs:[] }, action) => {
    switch (action.type) {
        //add staff
        case ActionTypes.ADD_STAFF:
            return { ...state, staffs: action.payload}
        //update staff
        case ActionTypes.UPDATE_STAFF:
            return {...state, isLoading: false, errMess: null, staffs: action.payload}
        //delete staff
        case ActionTypes.DELETE_STAFF:
            return {...state, isLoading: false, errMess: null, staffs: action.payload}
        //fetch staff
        case ActionTypes.STAFFS_DISPLAY:
            return {...state, isLoading: false, errMess: null, staffs: action.payload};

        case ActionTypes.STAFFS_LOADING:
            return {...state, isLoading: true, errMess: null, staffs: []}

        case ActionTypes.STAFFS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
    
        default:
          return state;
      }
};
