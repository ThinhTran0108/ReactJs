import React from 'react';
import { CardImg, CardBody, Breadcrumb, BreadcrumbItem,  Button, Row, Col, Label } from 'reactstrap';
import { Link} from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';
import { FadeTransform } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const minNum = (num) => (val) => !val || (val >= num);


function UpdateInfo({staff,updateStaff}) {
    if(staff != null) {
        return(
            <div className="container-fluid">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem>
                            <Link to='/staffs'>Nhân viên</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{staff.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div id="menubar" className='container-fluid'>
                        <div className="floatleft">
                            <h3>Thông tin nhân viên</h3>
                        </div>
                    </div>
                </div>
                <div class="container-fluid">
                    <div className="row">
                        <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                            <CardBody  className="col-12  col-sm-3 ">
                                <CardImg src={staff.image} alt={staff.name}/>
                            </CardBody>
                            <CardBody className="col-12 col-sm-6">       
                                <LocalForm onSubmit = {(value) => updateStaff(staff.id, value.name, value.doB, value.salaryScale, value.startDate, value.departmentId, value.annualLeave, value.overTime)}>
                                    <Row className="form-group">
                                        <Label htmlFor="name" md={2}>Họ tên</Label>
                                        <Col md={10}>
                                            <Control.text
                                                model=".name"
                                                id="name"
                                                name="name"
                                                className="form-control"
                                                validators={{required, minLength: minLength(3),maxLength: maxLength(30)}}
                                                defaultValue={staff.name}
                                            />
                                            <Errors 
                                                model=".name"
                                                className="text-danger"
                                                show="touched"
                                                messages={{
                                                    required: "Vui lòng nhập họ tên. ",
                                                    minLength: "Tối thiểu 3 kí tự! ",
                                                    maxLength: "Tối đa 30 kí tự! "
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="doB" md={2}>Ngày sinh</Label>
                                        <Col md={10}>
                                            <Control.text 
                                                type="date"
                                                model=".doB"
                                                id="doB" name="doB"
                                                className="form-control"
                                                validators={{required}}
                                                defaultValue={(staff.doB).substring(0, 10)}
                                            />
                                            <Errors 
                                                model=".doB"
                                                className="text-danger"
                                                show="touched"
                                                messages={{required: "Vui lòng nhập ngày sinh. "}}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="salaryScale" md={2}>Hệ số lương</Label>
                                        <Col md={10}>
                                            <Control.text 
                                                model=".salaryScale"
                                                id="salaryScale"
                                                name="salaryScale"
                                                className="form-control"
                                                validators={{isNumber, minNum: minNum(1)}}
                                                defaultValue={staff.salaryScale}
                                            />
                                            <Errors 
                                                model=".salaryScale"
                                                className="text-danger"
                                                show="touched"
                                                messages={{
                                                    isNumber: "Phải là số dương! ",
                                                    minNum: "Tối thiểu là 1.0! "
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="startDate" md={2}>Ngày vào công ty</Label>
                                        <Col md={10}>
                                            <Control.text 
                                                type="date"
                                                model=".startDate"
                                                id="startDate" name="startDate"
                                                className="form-control"
                                                validators={{required}}
                                                defaultValue={(staff.startDate).substring(0, 10)}
                                            />
                                            <Errors 
                                                model=".startDate"
                                                className="text-danger"
                                                show="touched"
                                                messages={{required: "Vui lòng nhập ngày vào công ty. "}}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="departmentId" md={2}>Phòng ban</Label>
                                        <Col md={10}>
                                            <Control.select 
                                                model=".departmentId" 
                                                id="departmentId"
                                                name="departmentId"
                                                className="form-control"
                                                defaultValue={staff.departmentId}
                                            >
                                                <option value="Dept01">Sale</option>
                                                <option value="Dept02">HR</option>
                                                <option value="Dept03">Marketing</option>
                                                <option value="Dept04">IT</option>
                                                <option value="Dept05">Finance</option>
                                            </Control.select>
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="annualLeave" md={2}>Số ngày nghỉ còn lại</Label>
                                        <Col md={10}>
                                            <Control.text
                                                model=".annualLeave"
                                                id="annualLeave"
                                                name="annualLeave"
                                                className="form-control"
                                                validators={{isNumber, minNum: minNum(0)}}
                                                defaultValue={staff.annualLeave}
                                            />
                                            <Errors 
                                                model=".annualLeave"
                                                className="text-danger"
                                                show="touched"
                                                messages={{
                                                    isNumber: "Phải là số dương! ",
                                                    minNum: "Tối thiểu là 0! "
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Label htmlFor="overTime" md={2}>Số giờ đã làm thêm</Label>
                                        <Col md={10}>
                                            <Control.text 
                                                model=".overTime"
                                                id="overTime"
                                                name="overTime"
                                                className="form-control"
                                                validators={{isNumber,minNum:minNum(0)}}
                                                defaultValue={staff.overTime}
                                            />
                                            <Errors 
                                                model=".overTime"
                                                className="text-danger"
                                                show="touched"
                                                messages={{
                                                    isNumber: "Phải là số dương! ",
                                                    minNum: "Tối thiểu là 0! "
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className="form-group">
                                        <Col md={{ size: 10, offset: 2 }}>
                                            <Button type="submit" className="btn btn-success btn-lg">Update</Button>
                                        </Col>
                                    </Row>
                                </LocalForm>
                            </CardBody>
                            <CardBody  className="col-12 col-sm-3">
                            <div></div>
                            </CardBody>
                        </FadeTransform>    
                    </div>
                </div>
            </div>
        )
    } else return (<div></div>)
}
export default UpdateInfo
