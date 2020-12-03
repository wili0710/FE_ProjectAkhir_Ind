import React, { Component } from 'react';
import './dataProduct.css'
import Logo from './../../assets/logo.png'
import { 
    debounce,
    draggableCard
} from '../../helpers'
class dataProduct extends Component {
    state = {  }
    render() { 
        return ( 
            <>
            <div className="outer-dp">
                <div className="header-dp">
                    {/* <h1>oioi anjing</h1> */}
                    <div className="logo-dp">
                        {/* <Logo className="logo-dp-ins"/> */}
                        <img src={Logo} alt="test" className="logo-dp-ins" />
                    </div>
                    <div className="input-content">
                            <input type="text" placeholder="Search Package" /> 
                    </div>
                    <div className="call-number">
                        <div className="div-call">
                            <p>021 0001110</p>
                        </div>

                    </div>
                </div>
                
            </div>
            </>

         );
    }
}
 
export default dataProduct;