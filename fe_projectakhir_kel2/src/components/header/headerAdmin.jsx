import React, { Component } from 'react';
import './headerAdmin.css'
import Logo from './../../assets/logo.png'
import {FaUserCog,FaMoneyCheckAlt} from 'react-icons/fa'
import {CgArrowRightR} from 'react-icons/cg'
import {MdAddShoppingCart} from 'react-icons/md'
import {GiMilkCarton} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import {Link,NavLink} from 'react-router-dom'
class HeaderAdmin extends Component {
    state = {  }
    render() { 
        return ( 
            <>

                <div className="container-luar">
                        <NavLink to='/'>
                            <div className="logo">
                                <img src={Logo} alt="logo" className="colored-lt-primary logoimg"/>
                            </div>
                        </NavLink>

                        <Link to='/user' style={{textDecoration:'none'}}>
                            <div className="container-option">
                                    <div className="inside-option">
                                        <FaUserCog className="icon-size"/>  
                                        <p className="option-word">Data User</p> 
                                        <CgArrowRightR  className="icon-size2"/>
                                    </div>
                            </div>
                        </Link>

                        <Link to="/payment" style={{textDecoration:'none'}}>
                            <div className="container-option">
                                    <div className="inside-option">
                                        <FaMoneyCheckAlt className="icon-size"/>
                                            <p className="option-word">Payment </p>
                                        <CgArrowRightR  className="icon-size2"/>
                                    </div>
                            </div>
                        </Link>

                        <Link to="/product" style={{textDecoration:'none'}}>
                            <div className="container-option">
                                <div className="inside-option">
                                    <MdAddShoppingCart className="icon-size"/>
                                    <p className="option-word">Product</p>
                                    <CgArrowRightR  className="icon-size2"/>
                                </div>
                            </div>
                        </Link>

                        <Link to="/parcel" style={{textDecoration:'none'}}>
                            <div className="container-option">
                                <div className="inside-option">
                                    <GiMilkCarton className="icon-size"/>
                                    <p className="option-word">Parcel</p>
                                    <CgArrowRightR  className="icon-size2"/>
                                </div>
                            </div>
                        </Link>
                    
                    <div className="button-logout">
                            <p style={{marginRight:'20px', marginTop:'15px',fontSize:'20px'}}>LOG OUT</p>
                        <FiLogOut className="icon-size"/>
                    </div>


                </div>
            </>
         );
    }
}
 
export default HeaderAdmin;