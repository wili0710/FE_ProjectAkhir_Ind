import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAdmin from '../../components/header/headerAdmin';
import { API_URL_SQL } from './../../helpers/apiUrl';
import { FullPageLoading } from '../../components/loading';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {HiDocumentReport} from 'react-icons/hi'

const AdminReport=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()
    const [report,setReport]=useState()
    const [loading,setLoading]=useState(true)
    const [reportProduct,setReportProduct]=useState()
    const [reportParcel,setReportParcel]=useState()

    useEffect(()=>{
        fetchdata()
    },[])
    
    const fetchdata=()=>{
        try {
            // Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${Auth.id}`)
            Axios.get(`${API_URL_SQL}/report/getreportincome`)
            .then((res)=>{
                console.log(res.data)
                setReport(res.data)
                Axios.get(`${API_URL_SQL}/report/getreportproductsales`)
                .then((res)=>{
                    console.log(res.data.ParcelFavorit)
                    setReportProduct(res.data.ItemProductFavorit)
                    setReportParcel(res.data.ParcelFavorit)

                })
                setLoading(false)
            })
        } catch (error) {
            console.log(error)
        }
    }
    const renderTableProduct=()=>{
        console.log(reportProduct)
        if(reportProduct){
            return reportProduct.map((val,index)=>{
                return(
                    <TableRow key={val.products_id}>
                        <TableCell align="center">{val.nama}</TableCell>
                        <TableCell align="center">{val.qty}</TableCell>
                    </TableRow>
                )
            })
        }else{
            return(
                <div>
                    Belum ada penjualan
                </div>
            )
        }
    }
    const renderTableParcel=()=>{
        console.log(reportProduct)
        if(reportParcel){
            return reportParcel.map((val,index)=>{
                return(
                    <TableRow key={val.products_id}>
                        <TableCell align="center">{val.nama}</TableCell>
                        <TableCell align="center">{val.qty}</TableCell>
                    </TableRow>
                )
            })
        }else{
            return(
                <div>
                    Belum ada penjualan
                </div>
            )
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
        <>
            <div className="user-container">
                <HeaderAdmin/>
                <div className="user-right">
                    <div className="header-user">
                        <div className="icon-group">
                            <HiDocumentReport className="icon-size" color="black"/>
                            <p style={{fontWeight:'600'}}>Report</p>
                        </div>
                    </div>
                    <div style={{
                        display:"flex",
                        width:"90%",
                        margin:50,
                        flexWrap:"wrap",
                        justifyContent:"space-around",
                    }}>
                        <div style={{
                            flexBasis:"40%"
                        }}>
                            <h4>Potensi Penjualan</h4>
                            <div style={{
                                backgroundColor:"#158ae6",
                                color:"white",
                                padding:10,
                                borderRadius:5,
                                textAlign:"center"
                            }}>
                                {report.PotensiPenjualan}
                            </div>
                        </div>
                        <div style={{
                            flexBasis:"40%"
                        }}>
                            <h4>Penjualan</h4>
                            <div style={{
                                backgroundColor:"#158ae6",
                                color:"white",
                                padding:10,
                                borderRadius:5,
                                textAlign:"center"
                            }}>
                                {report.Penjualan}
                            </div>
                        </div>
                        <div style={{
                            flexBasis:"40%"
                        }}>
                            <h4>Pendapatan</h4>
                            <div style={{
                                backgroundColor:"#158ae6",
                                color:"white",
                                padding:10,
                                borderRadius:5,
                                textAlign:"center"
                            }}>
                                {report.Pendapatan}
                            </div>
                        </div>
                        <div style={{
                            flexBasis:"40%"
                        }}>
                            <h4>Penjualan Satuan</h4>
                            <div style={{
                                backgroundColor:"#158ae6",
                                color:"white",
                                padding:10,
                                borderRadius:5,
                                textAlign:"center"
                            }}>
                                {report.Penjualan_Satuan}
                            </div>
                        </div>
                        <div style={{
                            flexBasis:"40%"
                        }}>
                            <h4>Pendapatan Satuan</h4>
                            <div style={{
                                backgroundColor:"#158ae6",
                                color:"white",
                                padding:10,
                                borderRadius:5,
                                textAlign:"center"
                            }}>
                                {report.Pendapatan_Satuan}
                            </div>
                        </div>
                        <div style={{
                            flexBasis:"40%"
                        }}>
                            <h4>Penjualan Parcel</h4>
                            <div style={{
                                backgroundColor:"#158ae6",
                                color:"white",
                                padding:10,
                                borderRadius:5,
                                textAlign:"center"
                            }}>
                                {report.Penjualan_Parcel}
                            </div>
                        </div>
                        <div style={{
                            flexBasis:"40%"
                        }}>
                            <h4>Pendapatan Parcel</h4>
                            <div style={{
                                backgroundColor:"#158ae6",
                                color:"white",
                                padding:10,
                                borderRadius:5,
                                textAlign:"center"
                            }}>
                                {report.Pendapatan_Parcel}
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display:"flex"
                    }}>
                        <div style={{
                            flexBasis:"45%",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            margin:10
                        }}>
                            <h4>Product Terjual</h4>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Product</TableCell>
                                            <TableCell align="center">Terjual</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renderTableProduct()}
                                    </TableBody>
                                </Table>
                                {/* <Pagination style={{display:"flex", justifyContent:"center",width:"100%"}}>
                                {renderpaging()}
                                </Pagination> */}
                            </TableContainer>
                        </div>
                        <div style={{
                            flexBasis:"45%",
                            display:"flex",
                            flexDirection:"column",
                            alignItems:"center",
                            margin:10
                        }}>
                            <h4>Parcel Terjual</h4>
                            <TableContainer>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Parcel</TableCell>
                                            <TableCell align="center">Terjual</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renderTableParcel()}
                                    </TableBody>
                                </Table>
                                {/* <Pagination style={{display:"flex", justifyContent:"center",width:"100%"}}>
                                {renderpaging()}
                                </Pagination> */}
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminReport