import React, { Component } from 'react';
import './headerAdmin.css'
import Logo from './../../assets/logo.png'
class HeaderAdmin extends Component {
    state = {  }
    render() { 
        return ( 
            <>
                <div className="container-luar">
                    <div className="logo">
                        <img src={Logo} alt="logo" className="colored-lt-primary logoimg"/>
                    </div>
                    
                </div>
            </>
         );
    }
}
 
export default HeaderAdmin;