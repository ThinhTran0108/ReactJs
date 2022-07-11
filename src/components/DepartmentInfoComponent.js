import React from 'react';
import { Card, CardTitle, CardText, CardImg,CardBody, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link} from "react-router-dom";
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderDeptInfo({staff, isLoading, errMess, departments}) {
    if (isLoading) {
        return(<Loading/>)
    } else if (errMess) { 
        return(<h4>{errMess}</h4>)
    } else {
        return(
            <div className="col-md-2 col-sm-4 col-6 my-2">
                <FadeTransform in transformProps = {{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <Card style={{height:"100%"}} key={staff.id} >
                        <Link to={`/staffs/${staff.id}`}>
                            <CardImg className=" my-3" src={staff.image} alt={staff.name}/>
                            <CardBody className="">
                                <CardTitle>{staff.name}</CardTitle>
                                <CardText><p>Mã ID: {staff.id}</p></CardText>
                                <CardText><p>Phòng ban: {departments.filter((department)=> staff.departmentId === department.id).map((x) => x.name)}</p></CardText>
                            </CardBody>
                        </Link>
                    </Card>
                </FadeTransform>
            </div>
        );
    }
}
function DepartmentInfo(props) {
    const displayStaffDept=props.staffs.map((x) => {
        return(
            <RenderDeptInfo 
                staff={x} 
                isLoading={props.isLoading} 
                errMess={props.errMess} 
                departments={props.departments}
            />
        )
    });
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
    } else return(
        <div className="container-fluid">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Trang chủ</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/departments'>Phòng ban</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
                </Breadcrumb>
                <div id="menubar" className='container-fluid'>
                    <div className="floatleft"><h3><i class="fa fa-address-book-o" aria-hidden="true"></i> Danh sách nhân viên</h3>
                    </div>
                </div>
            </div>
            <div className="row">
                {displayStaffDept}
            </div>
        </div>
    )
}
export default DepartmentInfo
