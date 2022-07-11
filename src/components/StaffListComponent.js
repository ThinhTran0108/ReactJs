import React, { Component } from "react";
import { Card, CardImg, CardTitle,CardBody,CardText, Breadcrumb, BreadcrumbItem,  Button, Modal, ModalHeader, ModalBody, Row, Col, Label, Input, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const minNum = (num) => (val) => !val || (val >= num);

const RenderStaff = ({staff, deleteStaff, isLoading, errMess, departments}) => {
    if (isLoading) {
        return(<Loading/>)
    } else if (errMess) {
        return(<h4>{errMess}</h4>)
    }
    else {
        return(
            <div className="col-md-2 col-sm-4 col-6 my-2">
                <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <Card style={{height:"100%"}} key={staff.id} >
                        <Link to={`/staffs/${staff.id}`}>
                            <CardImg className=" my-3" src={staff.image} alt={staff.name}/>
                            <CardBody className="">
                                <CardTitle>{staff.name}</CardTitle>
                                <CardText><p>Mã ID: {staff.id}</p></CardText>
                                <CardText><p>Phòng ban: {departments.filter((department) => staff.departmentId === department.id).map((x) => x.name)}</p></CardText>
                            </CardBody>
                        </Link>
                        <CardText>
                            <Link to={`/staffs/update/${staff.id}`}>
                                <button className="btn btn-info m-3" ><strong>Update</strong></button>
                            </Link>
                            <button className="btn btn-danger m-3" onClick={() => deleteStaff(staff.id)}><strong>Delete</strong></button>
                        </CardText>
                    </Card>
                </FadeTransform>
            </div>
        )
    }
}
class StaffList extends Component{
    constructor(props){
        super(props);
        this.state={
            isAddModalOpen: false,
            isSortModalOpen: false,
            sortAToZ: true,
            isSearchModalOpen: false,
            nameSearch: "",
        }

        this.toggleAddModal= this.toggleAddModal.bind(this);
        this.toggleSortModal= this.toggleSortModal.bind(this);
        this.toggleSort=this.toggleSort.bind(this)
        this.toggleSearchModal= this.toggleSearchModal.bind(this);
        this.searchName=this.searchName.bind(this); 
    }
    
    //ADD FUNCTION//
    toggleAddModal() {
        this.setState({isAddModalOpen: !this.state.isAddModalOpen})
    }

    //SORT FUNCTION//
    toggleSortModal() {
        this.setState({isSortModalOpen: !this.state.isSortModalOpen});
    };
    toggleSort(kind){
        this.setState({
            sortAToZ:!kind,
            isSortModalOpen: !this.state.isSortModalOpen
        });
    };

    //SEARCH FUNCTION//
    toggleSearchModal() {
        this.setState({isSearchModalOpen: !this.state.isSearchModalOpen});
    };
    searchName(event) {
        event.preventDefault();
        const keyword = event.target.keyword.value;
        this.setState({ nameSearch: keyword});
        this.toggleSearchModal();
    }

    render(){
        const displaystaff = this.props.staffs.staffs
            .sort((a,b) =>
                this.state.sortAToZ ? a.id - b.id : b.id - a.id
            ).filter((x) => {
                if (this.state.nameSearch === "") {
                    return (x)
                } else if (x.name.toLowerCase().includes(this.state.nameSearch.toLowerCase())) {
                    return(x)
                } else {return 0}
            }).map((x) => {
                return(
                    <RenderStaff 
                        staff={x} 
                        isLoading={this.props.staffsLoading} 
                        errMess={this.props.staffsErrMess} 
                        departments={this.props.departments}
                        deleteStaff={this.props.deleteStaff}
                    />
                )
            });
        if (this.props.staffs.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        } else if (this.props.staffs.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.staffs.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        } else return(
            <div className="container-fluid">
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Trang chủ</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Nhân viên</BreadcrumbItem>
                    </Breadcrumb>
                    <div id="menubar" className='container-fluid'>
                        <div className="floatleft">
                            <h3><i class="fa fa-address-book-o" aria-hidden="true"></i> Danh sách nhân viên</h3>
                        </div>
                        <div className="floatright mx-2 sort">
                            <Button outline onClick = {this.toggleSearchModal}>
                                <strong><span class="glyphicon glyphicon-search"></span>{` Search `}</strong>
                            </Button>
                        </div>
                        <div className="floatright mx-2 sort">
                            <strong><i class="fa fa-sort fa-lg" aria-hidden="true"></i>{` Sort`}</strong>
                            <select  id="sort"  onChange = {() => this.toggleSort(this.state.sortAToZ)}>
                                <option>Mã nhân viên tăng dần</option>
                                <option>Mã nhân viên giảm dần</option>
                            </select>
                        </div>
                        <div className="floatright m-1 sort">
                            <Button outline onClick = {this.toggleAddModal}>
                                <span className="fa fa-plus fa-lg"></span> Add
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {displaystaff}
                </div>
                <Modal isOpen={this.state.isSearchModalOpen} toggle={this.toggleSearchModal} >
                    <ModalHeader toggle={this.toggleSearchModal}>
                        <strong>TÌM KIẾM NHÂN VIÊN</strong>
                    </ModalHeader>
                    <ModalBody>
                        <Form onSubmit = {this.searchName}>
                            <FormGroup row>
                                <Label htmlFor="search" md={2}>Họ tên nhân viên</Label>
                                <Col md={10}>
                                    <Input type="text" id="search" name="keyword" placeholder="Họ tên nhân viên"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" className="btn btn-success btn-lg">Bắt đầu tìm</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>

                <Modal isOpen={this.state.isAddModalOpen} toggle={this.toggleAddModal} >
                    <ModalHeader toggle={this.toggleAddModal}>
                        <strong>THÊM NHÂN VIÊN</strong>
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit = {(value) => this.props.postStaff(value.name, value.doB, value.salaryScale, value.startDate, value.departmentId,value.annualLeave, value.overTime)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={2}>Họ tên</Label>
                                <Col md={10}>
                                    <Control.text 
                                        model=".name"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        validators={{required, minLength: minLength(3), maxLength: maxLength(30)}}
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
                                        id="doB"
                                        name="doB"
                                        className="form-control"
                                        validators={{required}}
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
                                        validators={{required, isNumber, minNum: minNum(1)}}
                                    />
                                    <Errors 
                                        model=".salaryScale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Vui lòng nhập hệ số lương. ",
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
                                        id="startDate"
                                        name="startDate"
                                        className="form-control"
                                        validators={{required}}
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
                                        defaultValue="Sale" 
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
                                        validators={{required, isNumber, minNum: minNum(0)}}
                                    />
                                    <Errors 
                                        model=".annualLeave"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Vui lòng nhập số ngày nghỉ còn lại. ",
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
                                        validators={{required, isNumber, minNum: minNum(0)}}
                                    />
                                    <Errors 
                                        model=".overTime"
                                        className="text-danger"
                                        show="touched"
                                        messages={{
                                            required: "Vui lòng nhập số giờ đã làm thêm. ",
                                            isNumber: "Phải là số dương! ",
                                            minNum: "Tối thiểu là 0! "
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{ size: 10, offset: 2 }}>
                                    <Button type="submit" className="btn btn-success btn-lg">Thêm</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}   
export default StaffList