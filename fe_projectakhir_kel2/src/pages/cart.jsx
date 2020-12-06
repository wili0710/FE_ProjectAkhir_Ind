import Axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL_SQL } from '../helpers/apiUrl';

const CartPage=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()

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
            })
            

        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            <div>
                aaa
            </div>
        </>
    )
}

export default CartPage