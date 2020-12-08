import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL_SQL } from '../helpers/apiUrl';
import Logo from './../assets/logo.png'
import {BiCart,BiUser} from 'react-icons/bi'
import { Badge } from '@material-ui/core';
import { FullPageLoading } from '../components/loading';




const CartPage=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        fetchdata()
    },[])
    
    const fetchdata=()=>{
        try {
            // Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${Auth.id}`)
            Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=1`)
            .then((res)=>{
                // console.log(res.data)
                dispatch({type:'LOGIN',cart:res.data})
                setLoading(false)
            })
            

        } catch (error) {
            console.log(error)
        }
    }
    if(loading){
        return(
            <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                {FullPageLoading(loading,100,'#0095DA')}
            </div>
        )
    }
    return(
        <div style={{
            display:"flex",
            flexDirection:"column",
            width:"100%",
            maxWidth:1440,
            justifyContent:"center",
        }}>
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                backgroundColor:"#158ae6",
                padding:15,
                color:"white"
            }}>
                <div style={{
                    marginLeft:20
                }}>
                    <img src={Logo} alt="logo" width="145px" color="black"/>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    flexBasis:"13%"
                }}>
                    <div>
                        <Badge color="error" badgeContent={Auth.cart.transaksiparcel.length+Auth.cart.transaksidetailsatuan.length}>
                            <BiCart color="white" size="20"/>
                        </Badge>
                    </div>
                    <div style={{
                        borderLeft: '1px solid white',
                        paddingLeft:10 
                    }}>
                        <BiUser color="white" size="20"/> Halo, {Auth.name}
                    </div>
                </div>
            </div>            
            <div>
                aaa
            </div>
        </div>
    )
}

export default CartPage