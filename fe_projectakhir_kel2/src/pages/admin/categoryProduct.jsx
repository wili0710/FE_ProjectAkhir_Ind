import React, { Component } from 'react';
import HeaderAdmin from './../../components/header/headerAdmin'
import {MdAddShoppingCart} from 'react-icons/md'
import {GiMilkCarton} from 'react-icons/gi'
class CategoryProduct extends Component {
    state = {  }
    render() { 
        return ( 
            <>  
               <div className="user-container">
                   <HeaderAdmin />
                   <div className="user-right">
                   <div className="header-user">
                        <div className="icon-group">
                        <GiMilkCarton className="icon-size"/>
                            <p style={{fontWeight:'600'}}>Category Product</p>
                        </div>
                    </div>
                   </div>

               </div>

            </>
         );
    }
}
 
export default CategoryProduct;