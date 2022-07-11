import React from "react";
import { Card, CardBody,CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Link} from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderDepartment({staffs, departments, isLoading, errMess}) {
    if (isLoading) {
        return(<Loading/>)
    } else if (errMess) {
        return(<h4>{errMess}</h4>)
    } else return(departments.map((x) => {
        return(
        <div className='col-md-4 col-sm-6 col-12 my-2'>
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                <Card kex={x.id} >
                    <Link to = {`/departments/${x.id}`}>
                        <CardBody>
                            <CardTitle>{x.name}</CardTitle>
                            <CardText>Số lượng nhân viên: {staffs.filter((staff) => staff.departmentId === x.id).length}</CardText>
                        </CardBody>
                    </Link>
                </Card>
            </FadeTransform>
        </div>
        )
    }))
}

function Department(props) {
    if (props.departments.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    } else if (props.departments.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.departments.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    } else return (
    <div className="container-fluid">
        <div className='row'>
            <Breadcrumb>
                <BreadcrumbItem><Link to='/home'>Trang chủ</Link></BreadcrumbItem>
                <BreadcrumbItem active>Phòng ban</BreadcrumbItem>
            </Breadcrumb>
            <div id="menubar" className='container-fluid'>
                <div className="floatleft"><h3><i class="fa fa-id-card-o" aria-hidden="true"></i> Danh sách phòng ban</h3>
                </div>
            </div>
            
        </div>
        <div class="container-fluid">
            <div className="row">
                <RenderDepartment 
                    staffs={props.staffs}
                    departments={props.departments} 
                    isLoading={props.deptsLoading} 
                    errMess={props.deptsErrMess}
                />
            </div>
        </div>
    </div>
    )
}   

export default Department;