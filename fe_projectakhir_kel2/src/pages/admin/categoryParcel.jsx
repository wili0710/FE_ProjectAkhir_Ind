import React, { Component } from 'react';
import HeaderAdmin from './../../components/header/headerAdmin'
import {MdAddShoppingCart} from 'react-icons/md'
import {GiMilkCarton} from 'react-icons/gi'
import Axios from 'axios'
import { API_URL_SQL } from '../../helpers/apiUrl';
class CategoryParcel extends Component {
    state = {  
        categoryParcel:[]
    }
    componentDidMount(){
        Axios.get(`${API_URL_SQL}/product/getallcatparcel`)
        .then((res)=>{
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() { 
        return ( 
            <>  
               <div className="user-container">
                   <HeaderAdmin />
                   <div className="user-right">
                   <div className="header-user">
                        <div className="icon-group">
                        <GiMilkCarton className="icon-size"/>
                            <p style={{fontWeight:'600'}}>Category Parcel</p>
                        </div>
                    </div>
                   </div>

               </div>

            </>
         );
    }
}
 
export default CategoryParcel;