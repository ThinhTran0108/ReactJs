import React, {Component} from "react";
import {Button, Modal, ModalHeader, ModalBody, Label, Input, Form, FormGroup, Nav, Navbar, Collapse, NavItem} from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {isNavOpen: true};
        
        this.toggleNav = this.toggleNav.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
      }

    toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen});
    }
    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    handleLogin(event) {
        this.toggleModal();
        event.preventDefault();
        alert("Tên đăng nhập: " + this.username.value + " Mật khẩu: " + this.password.value
            + " Remember me: " + this.remember.checked);
        
    }

    render() {
        return(
            <div className="header container-fluid">
                <div className="clearfix">
                    <img width="30" height="30" src="assets/images/logo.png" alt="applogo"></img>
                    <div className="row floatleft d-inline-block m-3">    
                        <h4 style={{fontSize:"2vw"}}>Staff Management App v2.0</h4>
                    </div>
                    <div className="row floatright d-inline-block m-3">
                        <Button style={{fontSize:"1.25vw"}} className="fa fa-sign-in" onClick={this.toggleModal}> Đăng nhập</Button>
                    </div>
                                
                </div>
                <Navbar dark expand="sm">
                    <button aria-label="Toggle navigation" type="button" className="navbar-toggler" onClick={this.toggleNav}><span class="navbar-toggler-icon"></span>Menu</button>
                    <Collapse isOpen={this.state.isNavOpen}>
                        <Nav>
                            <NavItem>
                                <NavLink className="nav-link"  to='/home'><span className="fa fa-home fa-lg"></span> Trang chủ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/staffs'><span className="fa fa-users fa-lg"></span> Nhân viên</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link"  to='/departments'><span className="fa fa-address-card-o fa-lg"></span> Phòng ban</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="nav-link" to='/salary'><span className="fa fa-money fa-lg"></span> Bảng lương</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>    
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>ĐĂNG NHẬP</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleLogin}>
                                <FormGroup>
                                    <Label htmlFor="username">Tên đăng nhập</Label>
                                    <Input type="text" id="username" name="username"
                                        innerRef={(input) => this.username = input} />
                                </FormGroup>
                                <FormGroup>
                                    <Label htmlFor="password">Mật khẩu</Label>
                                    <Input type="password" id="password" name="password"
                                        innerRef={(input) => this.password = input}  />
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="remember"
                                        innerRef={(input) => this.remember = input}  />
                                        Remember me
                                    </Label>
                                </FormGroup>
                                <Button type="submit" value="submit" color="primary">Đăng nhập</Button>
                            </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
export default Header