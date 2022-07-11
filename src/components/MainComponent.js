import React, {Component} from 'react';
import Home from './HomeComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Salary from './SalaryComponent';
import Department from './DepartmentComponent';

import StaffList from './StaffListComponent';
import StaffInfo from './StaffInfoComponent';
import UpdateInfo from './UpdateComponent';
import DepartmentInfo from './DepartmentInfoComponent';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'

import { connect } from 'react-redux';
import { postStaff, updateStaff, deleteStaff, fetchStaffs, fetchDepts, fetchSS } from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state => {
    return {
      staffs: state.staffs,
      departments: state.departments,
      staffsSalary: state.staffsSalary
    }
}

const mapDispatchToProps = (dispatch) => ({
    postStaff: (name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(postStaff(name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),

    updateStaff: (id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime) => dispatch(updateStaff(id, name, doB, salaryScale, startDate, departmentId, annualLeave, overTime)),

    deleteStaff: (id) =>  dispatch(deleteStaff(id) ),
    fetchStaffs: () => { dispatch(fetchStaffs() )},
    fetchDepts: () => { dispatch(fetchDepts() )},
    fetchSS: () => { dispatch(fetchSS() )}
});

class Main extends Component{
   
    componentDidMount() {
        this.props.fetchStaffs();
        this.props.fetchDepts();
        this.props.fetchSS();
      }
    render(){
        const StaffWithId=({match}) => {
            return(
                <StaffInfo
                    staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
                    isLoading={this.props.staffs.isLoading}
                    errMess={this.props.staffs.errMess}
                    departments={this.props.departments.departments}
                    deleteStaff={this.props.deleteStaff}
                />
            );
        }
        const UpdateStaffWithId=({match}) => {
            return(
                <UpdateInfo
                    staff={this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]}
                    updateStaff={this.props.updateStaff}
                    departments={this.props.departments.departments}
                />
            );
        }
        const DepartmentWithId=({match}) => {
            return(
                <DepartmentInfo
                    staffs={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.deptsId)}
                    isLoading={this.props.staffs.isLoading}
                    errMess={this.props.staffs.errMess}
                    departments={this.props.departments.departments}
                />
            );
        }
        
        return (
        <div>
            <Header/>
            <TransitionGroup>
            <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                <Switch>
                <Route path='/home' component={() =>
                    <Home
                        staffs={this.props.staffs.staffs} 
                        isLoading={this.props.staffs.isLoading}
                        errMess={this.props.staffs.errMess}
                    />
                }/>
                <Route exact path="/staffs" component={() =>
                    <StaffList 
                        staffs={this.props.staffs} 
                        postStaff={this.props.postStaff}
                        deleteStaff={this.props.deleteStaff}
                        staffsLoading={this.props.staffs.isLoading}
                        staffsErrMess={this.props.staffs.errMess}
                        departments={this.props.departments.departments}
                    />}
                />
                <Route exact path="/staffs/:staffId" component={StaffWithId}/>
                <Route exact path="/staffs/update/:staffId" component={UpdateStaffWithId}/>
                <Route exact path="/departments" component={() =>
                    <Department 
                        staffs={this.props.staffs.staffs} 
                        departments={this.props.departments.departments}
                        deptsLoading={this.props.departments.isLoading}
                        deptsErrMess={this.props.departments.errMess}
                    />
                }/>
                <Route exact path="/departments/:deptsId" component={DepartmentWithId}/>
                <Route exact path="/salary" component={ () =>
                    <Salary 
                        staffsSalary={this.props.staffsSalary.staffsSalary}
                        ssLoading={this.props.staffsSalary.isLoading}
                        ssErrMess={this.props.staffsSalary.errMess}
                    />
                }/>
                <Redirect to="/home"/>
                </Switch>
            </CSSTransition>
            </TransitionGroup>
            <Footer/>
        </div>
    )}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));