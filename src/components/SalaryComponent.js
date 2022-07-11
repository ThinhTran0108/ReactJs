import React, { useState } from "react";
import { Card, CardText, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { FadeTransform } from 'react-animation-components';

function RenderSalary({staffsSalary, isLoading, errMess}) {
    if (isLoading) {
        return(<Loading/>)
    } else if (errMess) {
        return(<h4>{errMess}</h4>)
    }
    else if (staffsSalary.salary != null) {
        return(
            <div key={staffsSalary.id} className='col-md-4 col-sm-6 col-12'>
                <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                    <Card style={{border:"1px solid black"}}>
                        <CardTitle>{staffsSalary.name}</CardTitle>
                        <CardText>Mã nhân viên: {staffsSalary.id}</CardText>
                        <CardText>Hệ số lương: {staffsSalary.salaryScale}</CardText>
                        <CardText>Số giờ làm thêm: {staffsSalary.overTime}</CardText>
                        <CardText><input type="text" disabled value={`Lương: ${staffsSalary.salary.toLocaleString()} VNĐ`} /></CardText>
                    </Card>
                </FadeTransform>
            </div>
        );
    } else return(<div className="d-none"></div>)
} 

function Salary(props) {
    const [states, changeState] = useState(false);
    const [name,changeName] = useState("");
    const displaysalary =
        props.staffsSalary
        .sort((a,b) =>
            states ? a.salary - b.salary : a.id - b.id
        )
        .filter((x) => {
            if (name === ""){
                return (x)
            } else if (x.name.toLowerCase().includes(name.toLowerCase())) {
                return(x)
            } else {return 0}
        })
        .map((x) => {
            return(
                <RenderSalary
                    staffsSalary={x}
                    isLoading={props.ssLoading} 
                    errMess={props.ssErrMess}
                />
            )
        })
    if (props.staffsSalary.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.staffsSalary.errMess) {
        return(
            <div className="container">
                <div className="row"> 
                    <div className="col-12">
                        <h4>{props.staffsSalary.errMess}</h4>
                    </div>
                </div>
            </div>
        );
    }
    else return(
        <div className="container-fluid">
            <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/home'>Trang chủ</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng lương</BreadcrumbItem>
                </Breadcrumb>
                <div id="menubar" className='container-fluid'>
                    <div className="floatleft"><h3><i class="fa fa-money" aria-hidden="true"></i> Bảng lương nhân viên</h3>
                    </div>
                    
                    <div className="floatright mx-2 sort">
                        <strong><span class="glyphicon glyphicon-search"></span>{` Search `}</strong>
                        <input id="search" type="text" placeholder=" họ tên nhân viên" value={name} onChange = {(e)=> changeName(e.target.value)}/>
                    </div>

                    <div className="floatright mx-2 sort">
                        <strong><i class="fa fa-sort fa-lg" aria-hidden="true"></i>{` Sort`}</strong>
                        <select onChange = {() => {changeState(!states)}}>
                            <option >Mã nhân viên tăng dần</option>
                            <option >Mức lương tăng dần</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="container-fluid">
                <div className="row">
                    {displaysalary}
                </div>
            </div>
        </div>
    );
}


export default Salary