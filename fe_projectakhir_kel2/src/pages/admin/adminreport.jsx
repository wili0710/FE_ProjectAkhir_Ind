import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAdmin from '../../components/header/headerAdmin';
import { API_URL_SQL } from './../../helpers/apiUrl';
import {GoDashboard} from 'react-icons/go'

const AdminReport=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()
    const [report,setReport]=useState()

    useEffect(()=>{
        fetchdata()
    },[])
    
    const fetchdata=()=>{
        try {
            // Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${Auth.id}`)
            Axios.get(`${API_URL_SQL}/report/getreportincome`)
            .then((res)=>{
                // console.log(res.data)
                setReport(res.data)
            })
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <>
            <div className="user-container">
                <HeaderAdmin/>
                <div className="user-right">
                    <div className="header-user">
                        <div className="icon-group">
                            <GoDashboard className="icon-size" color="black"/>
                            <p style={{fontWeight:'600'}}>Report</p>
                        </div>
                    </div>
                    <div style={{
                        display:"flex"
                    }}>
                        aa
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminReport