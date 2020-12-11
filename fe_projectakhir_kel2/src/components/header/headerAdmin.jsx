import React, { Component } from 'react';
import './headerAdmin.css'
import { logo, icon, d_user } from '../../assets'
import {FaUserCog,FaMoneyCheckAlt} from 'react-icons/fa'
import {CgArrowRightR} from 'react-icons/cg'
import {MdAddShoppingCart} from 'react-icons/md'
import {GiMilkCarton} from 'react-icons/gi'
import {HiDocumentReport} from 'react-icons/hi'
import {FiLogOut} from 'react-icons/fi'
import {Link,NavLink} from 'react-router-dom'

class HeaderAdmin extends Component {
    state = { 
        isOpen : false,
        profilePic:""
    }

    test(props) {
        console.log(props)
        // document.querySelector("").classlist.toggle('active');
    }

    render() { 
        return ( 
            <div className="container-luar">
                <NavLink to='/' style={{textDecoration:"none"}}>
                    {
                        this.state.isOpen?
                        <div className="logo">
                            <img src={logo} alt="logo" className="colored-lt-primary logoimg"/>
                            workspace
                        </div>
                        :
                        <div className="icon">
                            <img src={icon} alt="logo" className="colored-lt-primary logoimg"/>
                        </div>
                    }
                </NavLink>
                <Link to='/adminpanel/' style={{textDecoration:'none'}}>
                    <div className="container-option" onMouseOver={this.test.bind(this)}>
                            <div className="inside-option">
                                <HiDocumentReport className="icon-size"/>  
                                <p className="option-word">Report</p> 
                                <CgArrowRightR  className="icon-size2"/>
                            </div>
                    </div>
                </Link>
                <Link to='/adminpanel/datauser' style={{textDecoration:'none'}}>
                    <div className="container-option">
                            <div className="inside-option">
                                <FaUserCog className="icon-size"/>  
                                <p className="option-word">Data User</p> 
                                <CgArrowRightR  className="icon-size2"/>
                            </div>
                    </div>
                </Link>
                <Link to="/adminpanel/payment" style={{textDecoration:'none'}}>
                    <div className="container-option">
                            <div className="inside-option">
                                <FaMoneyCheckAlt className="icon-size"/>
                                    <p className="option-word">Payment </p>
                                <CgArrowRightR  className="icon-size2"/>
                            </div>
                    </div>
                </Link>
                <Link to="/adminpanel/product" style={{textDecoration:'none'}}>
                    <div className="container-option">
                        <div className="inside-option">
                            <MdAddShoppingCart className="icon-size"/>
                            <p className="option-word">Product</p>
                            <CgArrowRightR  className="icon-size2"/>
                        </div>
                    </div>
                </Link>

                <Link to="/adminpanel/parcel" style={{textDecoration:'none'}}>
                    <div className="container-option">
                        <div className="inside-option">
                            <GiMilkCarton className="icon-size"/>
                            <p className="option-word">Parcel</p>
                            <CgArrowRightR  className="icon-size2"/>
                        </div>
                    </div>
                </Link>
                
                <Link to="/adminpanel/categoryProduct" style={{textDecoration:'none'}}>
                    <div className="container-option">
                        <div className="inside-option">
                            <MdAddShoppingCart className="icon-size"/>
                            <p className="option-word">Cat Product</p>
                            <CgArrowRightR  className="icon-size2"/>
                        </div>
                    </div>
                </Link>
                <Link to="/adminpanel/categoryParcel" style={{textDecoration:'none'}}>
                    <div className="container-option">
                        <div className="inside-option">
                            <GiMilkCarton className="icon-size"/>
                            <p className="option-word">Cat Parcel</p>
                            <CgArrowRightR  className="icon-size2"/>
                        </div>
                    </div>
                </Link>
            
                {/* <div className="button-logout">
                        <p style={{marginRight:'20px', marginTop:'15px',fontSize:'20px'}}>LOG OUT</p>
                    <FiLogOut className="icon-size"/>
                </div> */}
                
                <div className="imgBx">
                {
                    this.state.profilePic!==""?
                    <img src={this.state.profilePic} />
                    :
                    <img src={d_user} />
                }
                </div>
            </div>
         );
    }
}
 
export default HeaderAdmin;