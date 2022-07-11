import React from "react";

function Footer(props) {
    return(
        <div className="footer">
            <div className="container-fluid">
                    <div className="d-inline-block col-md-4 col-sm-6 col-12 text-center">
                        <h4>Điều hướng</h4>
                        <ul className="list-unstyled ">
                            <li><a href="/home">Trang chủ</a></li>
                            <li><a href="/staffs">Nhân viên</a></li>
                            <li><a href="/departments">Phòng ban</a></li>
                            <li><a href="/salary">Bảng lương</a></li>
                        </ul>
                    </div>
                    <div className="d-inline-block col-md-4 col-sm-6 col-12 text-center">
                        <h4>Địa chỉ</h4>
                        <address>
                          <i className="fa fa-address-card fa-lg"></i>: 123 Hai Bà Trưng, Phường 1, Quận 1, TP.HCM<br />
                          <i className="fa fa-phone fa-lg"></i>: +84 1234 5678<br />
                          <i className="fa fa-fax fa-lg"></i>: +84 8765 4321<br />
                          <i className="fa fa-envelope fa-lg"></i>: <a href="mailto:thinhttfx16057@funix.edu.vn">
                          thinhttfx16057@funix.edu.vn</a>
                        </address>
                    </div>
                    <div className="d-inline-block col-md-4 col-12 text-center">
                        <h4>Liên kết</h4>
                        <ul id="social-link" className="list-unstyled">
                            <li className="d-inline-block"><a className="btn btn-social-icon btn-google" href="http://google.com/+"><i className="fa fa-google-plus"></i></a></li>
                            <li className="d-inline-block"><a className="btn btn-social-icon btn-facebook" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a></li>
                            <li className="d-inline-block"><a className="btn btn-social-icon btn-linkedin" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a></li>
                            <li className="d-inline-block"><a className="btn btn-social-icon btn-twitter" href="http://twitter.com/"><i className="fa fa-twitter"></i></a></li>
                            <li className="d-inline-block"><a className="btn btn-social-icon btn-google" href="http://youtube.com/"><i className="fa fa-youtube"></i></a></li>
                        </ul>             
                        <p><strong>© Copyright 2018 Ristorante Con Fusion</strong></p>
                    </div>
                </div>
                
            
        </div>
        )
}
export default Footer