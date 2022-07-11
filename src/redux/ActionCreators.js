import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

//add staff
export const addStaff = (responseStaff) => ({
    type: ActionTypes.ADD_STAFF,
    payload: responseStaff
});
export const postStaff = (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => (dispatch) => {
  const newStaff = {
    name: name, 
    doB: doB, 
    salaryScale: salaryScale, 
    startDate: startDate, 
    departmentId: departmentId, 
    annualLeave: annualLeave, 
    overTime: overTime, 
    image: '/assets/images/alberto.png'
  };
    
  return fetch(baseUrl + 'staffs', {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {"Content-Type": "application/json"},
      credentials: "same-origin"
  }).then(
    response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
      throw error;
    }
  ).then(
    response => response.json()
  ).then(
    responseStaff => dispatch(addStaff(responseStaff))
  ).then(() => dispatch(fetchDepts())
  ).then(() => dispatch(fetchSS())
  ).catch(error =>  { 
    console.log('Add staffs', error.message); 
    alert('Không thể thêm nhân viên\nlỗi: ' + error.message); 
  });
};

//update staff
export const updatedStaff = (responseStaff) => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: responseStaff
});
export const updateStaff = (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => (dispatch) => {
  const newInfoStaff = {
    id: id, 
    name: name, 
    doB: new Date(doB), 
    salaryScale: salaryScale, 
    startDate:new Date(startDate), 
    departmentId: departmentId, 
    annualLeave: annualLeave, 
    overTime: overTime
  };
  
  return fetch(baseUrl + 'staffs', {
    method: "PATCH",
    body: JSON.stringify(newInfoStaff),
    headers: {"Content-Type": "application/json"},
    credentials: "same-origin"
  })
  .then(
    response => {
      if (response.ok) {return response} 
      else {var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {var errmess = new Error(error.message);
      throw errmess;
    }
  ).then(
    response => response.json()
  ).then(
    responseStaff => dispatch(updatedStaff(responseStaff))
  ).then(
    () => dispatch(fetchDepts())
  ).then(() => dispatch(fetchSS())
  ).catch(error =>  {
    console.log('Update staffs', error.message);
    alert('Không thể cập nhật nhân viên\nlỗi: '+error.message);
  });
};

//delete staffs
export const deletedStaff = (responseStaff) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: responseStaff
});
export const deleteStaff = (id) => (dispatch) => {
  return fetch(baseUrl + `staffs/${id}`, {method: "DELETE"})
    .then(
      fetch(baseUrl + 'staffs')
    ).then(
      response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    ).then(
      response => response.json()
    ).then(
      responseStaff => dispatch(deletedStaff(responseStaff))
    ).then(() => dispatch(fetchDepts())
    ).then(() => dispatch(fetchSS())
    ).catch(error =>  {
      console.log('Delete staffs', error.message); 
      alert('Không thể xoá nhân viên\nlỗi: ' + error.message);
    });
};

//fetch staffs
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true));
    return fetch(baseUrl + 'staffs')
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        }
      ).then(
        response => response.json()
      ).then(
        staffs => dispatch(staffsDisplay(staffs))
      ).catch(
        error => dispatch(staffsFailed(error.message))
      );
}

export const staffsLoading = () => ({
  type: ActionTypes.STAFFS_LOADING
});
export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess
});
export const staffsDisplay = (staffs) => ({
  type: ActionTypes.STAFFS_DISPLAY,
  payload: staffs
});

//fetch departments
export const fetchDepts = () => (dispatch) => {
    dispatch(deptsLoading(true));
    return fetch(baseUrl + 'departments')
      .then(
        response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
        },
        error => {
              var errmess = new Error(error.message);
              throw errmess;
        }
      ).then(
        response => response.json()
      ).then(
        departments => dispatch(deptsDisplay(departments))
      ).catch(
        error=>dispatch(deptsFailed(error.message))
      );
}

export const deptsLoading = () => ({
  type: ActionTypes.DEPTS_LOADING
});
export const deptsFailed = (errmess) => ({
  type: ActionTypes.DEPTS_FAILED,
  payload: errmess
});
export const deptsDisplay = (departments) => ({
  type: ActionTypes.DEPTS_DISPLAY,
  payload: departments
});

//fetch staffs salary
export const fetchSS = () => (dispatch) => {
    dispatch(ssLoading(true));
    return fetch(baseUrl + 'staffsSalary')
      .then(
        response => {
          if (response.ok) {
            return response;
          } else {
            var error = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
          }
        },
        error => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      ).then(
        response => response.json()
      ).then(
        staffsSalary => dispatch(ssDisplay(staffsSalary))
      ).catch(
        error=>dispatch(ssFailed(error.message))
      );
}

export const ssLoading = () => ({
  type: ActionTypes.SS_LOADING
});
export const ssFailed = (errmess) => ({
  type: ActionTypes.SS_FAILED,
  payload: errmess
});
export const ssDisplay = (staffsSalary) => ({
  type: ActionTypes.SS_DISPLAY,
  payload: staffsSalary
});