import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import HeaderAdmin from '../../components/header/headerAdmin';
import { API_URL_SQL } from './../../helpers/apiUrl';
import { FullPageLoading } from '../../components/loading';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {HiDocumentReport} from 'react-icons/hi'
import numeral from 'numeral';

const AdminReport=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()
    const [report,setReport]=useState()
    const [loading,setLoading]=useState(true)
    const [reportProduct,setReportProduct]=useState()
    const [reportParcel,setReportParcel]=useState()
    const [reportTransaksi,setReportTransaksi]=useState()
    const [reportTransaksiDetail,setReportTransaksiDetail]=useState()
    const [displayTab,setDisplayTab]=useState(1)

    useEffect(()=>{
        fetchdata()
    },[])
    
    const fetchdata=async()=>{
        try {
            let getReportIncome=await Axios.get(`${API_URL_SQL}/report/getreportincome`)
            setReport(getReportIncome.data)
            let getReportProductSales=await Axios.get(`${API_URL_SQL}/report/getreportproductsales`)
            setReportProduct(getReportProductSales.data.ItemProductFavorit)
            setReportParcel(getReportProductSales.data.ParcelFavorit)

            let getReportTransaksi=await Axios.get(`${API_URL_SQL}/report/getreportTransaksi`)
            setReportTransaksi(getReportTransaksi.data.transaksi)
            setReportTransaksiDetail(getReportTransaksi.data.transaksiDetail)
            console.log(getReportTransaksi)

            setLoading(false)
        } catch (error) {
            console.log("error")
            console.log(error)
        }
    }

    const renderReportTransaksi=()=>{
        return reportTransaksi.map((val,index)=>{
            return(
                <TableRow key={val.products_id}>
                    <TableCell align="center"><span style={{fontSize:18}}>{val.id}</span></TableCell>
                    <TableCell align="center"><span style={{fontSize:18,color:"tomato",fontWeight:"bold"}}>Rp {numeral(val.totaltransaksi-val.totalmodal).format('0,0')}</span></TableCell>
                </TableRow>
            )
        })
    }

    const renderReportTransaksiDetail=()=>{
        return reportTransaksiDetail.map((val,index)=>{
            return(
                <TableRow key={val.products_id}>
                    <TableCell align="center"><span style={{fontSize:18}}>{val.transaksi_id}</span></TableCell>
                    <TableCell align="center"><span style={{fontSize:18}}>{val.nama}</span></TableCell>
                    <TableCell align="center"><span style={{fontSize:18,color:"tomato",fontWeight:"bold"}}>Rp {numeral(val.totaltransaksi-val.totalmodal).format('0,0')}</span></TableCell>
                </TableRow>
            )
        })
    }

    const renderTableProduct=()=>{
        console.log(reportProduct)
        if(reportProduct){
            return reportProduct.map((val,index)=>{
                return(
                    <TableRow key={val.products_id}>
                        <TableCell align="center"><span style={{fontSize:18}}>{val.nama}</span></TableCell>
                        <TableCell align="center"><span style={{fontSize:18}}>{val.qty}</span></TableCell>
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
                        <TableCell align="center"><span style={{fontSize:18}}>{val.nama}</span></TableCell>
                        <TableCell align="center"><span style={{fontSize:18}}>{val.qty}</span></TableCell>
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
                <div style={{marginLeft:100,width:"100%"}}>
                    <div>
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            color:"#318ae7",
                            padding:20,
                            borderBottom:"5px solid whitesmoke"
                            
                        }}>
                            <div>
                                <HiDocumentReport className="icon-user" color={"#318ae7"}/>
                            </div>
                            <div>
                                <span style={{
                                    fontWeight:'bold',
                                    fontSize:20,

                                }}>Report</span>
                            </div>
                        </div>
                        <div style={{
                            display:"flex",
                            alignItems:"center",
                            padding:10,
                            justifyContent:"center",
                            borderBottom:"5px solid whitesmoke",
                            fontSize:18
                        }}>
                            <div style={{
                                borderRight:displayTab===1?"5px solid #f68e71":"5px solid whitesmoke",
                                borderLeft:displayTab===1?"5px solid #f68e71":"5px solid whitesmoke",
                                padding:10,
                                fontWeight:displayTab===1?"bold":"normal",
                                color:displayTab==1?"#318ae7":"black",
                                marginRight:5,
                                cursor:"pointer"
                            }} onClick={()=>setDisplayTab(1)}>
                                Ringkasan Umum
                            </div>
                            <div style={{
                                borderRight:displayTab===2?"5px solid #f68e71":"5px solid whitesmoke",
                                borderLeft:displayTab===2?"5px solid #f68e71":"5px solid whitesmoke",
                                padding:10,
                                fontWeight:displayTab===2?"bold":"normal",
                                color:displayTab==2?"#318ae7":"black",
                                marginRight:5,
                                cursor:"pointer"
                            }} onClick={()=>setDisplayTab(2)}> 
                                Report Transaksi
                            </div>
                            <div style={{
                                borderRight:displayTab===3?"5px solid #f68e71":"5px solid whitesmoke",
                                borderLeft:displayTab===3?"5px solid #f68e71":"5px solid whitesmoke",
                                padding:10,
                                fontWeight:displayTab===3?"bold":"normal",
                                color:displayTab==3?"#318ae7":"black",
                                marginRight:5,
                                cursor:"pointer"
                            }} onClick={()=>setDisplayTab(3)}>
                                Report Transaksi Detail
                            </div>
                        </div>
                    </div>

                    {/* Tab 1 : Ringkasan Umum */}
                    
                    <div style={{
                        justifyContent:"center",
                        display:displayTab===1?"flex":"none"
                    }}>
                        <div style={{
                            display:"flex",
                            flexDirection:"column",
                            padding:10,
                            marginRight:10,
                            borderLeft:"5px solid whitesmoke",
                            borderRight:"5px solid whitesmoke"
                        }}>
                            <div style={{
                                padding:5,
                                borderBottom:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Potensi Penjualan :
                                </span>
                                <div style={{
                                    // backgroundColor:"#158ae6",
                                    color:"tomato",
                                    padding:10,
                                    borderRadius:5,
                                    textAlign:"right",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    Rp {numeral(report.PotensiPenjualan).format('0,0')}
                                </div>
                            </div>
                            <div style={{
                                padding:5,
                                borderBottom:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Penjualan Keseluruhan :
                                </span>
                                <div style={{
                                    // backgroundColor:"#158ae6",
                                    color:"tomato",
                                    padding:10,
                                    borderRadius:5,
                                    textAlign:"right",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    Rp {numeral(report.Penjualan).format('0,0')}
                                </div>
                            </div>
                            <div style={{
                                padding:5,
                                borderBottom:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Pendapatan Bersih Keseluruhan :
                                </span>
                                <div style={{
                                    // backgroundColor:"#158ae6",
                                    color:"tomato",
                                    padding:10,
                                    borderRadius:5,
                                    textAlign:"right",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    Rp {numeral(report.Pendapatan).format('0,0')}
                                </div>
                            </div>
                            <div style={{
                                padding:5,
                                borderBottom:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Penjualan Produk Satuan :
                                </span>
                                <div style={{
                                    // backgroundColor:"#158ae6",
                                    color:"tomato",
                                    padding:10,
                                    borderRadius:5,
                                    textAlign:"right",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    Rp {numeral(report.Penjualan_Satuan).format('0,0')}
                                </div>
                            </div>


                            <div style={{
                                padding:5,
                                borderBottom:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Pendapatan Bersih Produk Satuan :
                                </span>
                                <div style={{
                                    // backgroundColor:"#158ae6",
                                    color:"tomato",
                                    padding:10,
                                    borderRadius:5,
                                    textAlign:"right",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    Rp {numeral(report.Pendapatan_Satuan).format('0,0')}
                                </div>
                            </div>
                            <div style={{
                                padding:5,
                                borderBottom:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Penjualan Produk Parcel :
                                </span>
                                <div style={{
                                    // backgroundColor:"#158ae6",
                                    color:"tomato",
                                    padding:10,
                                    borderRadius:5,
                                    textAlign:"right",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    Rp {numeral(report.Penjualan_Parcel).format('0,0')}
                                </div>
                            </div>
                            <div style={{
                                padding:5,
                                borderBottom:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Pendapatan Bersih Produk Parcel :
                                </span>
                                <div style={{
                                    // backgroundColor:"#158ae6",
                                    color:"tomato",
                                    padding:10,
                                    borderRadius:5,
                                    textAlign:"right",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    Rp {numeral(report.Pendapatan_Parcel).format('0,0')}
                                </div>
                            </div>
                            
                            
                        </div>
                        <div style={{
                            display:"flex"
                        }}>
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                padding:10,
                                marginRight:10,
                                borderLeft:"5px solid whitesmoke",
                                borderRight:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Product Terjual :
                                </span>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><span style={{fontSize:20}}>Product</span></TableCell>
                                                <TableCell align="center"><span style={{fontSize:20}}>Terjual</span></TableCell>
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
                                display:"flex",
                                flexDirection:"column",
                                padding:10,
                                marginRight:10,
                                borderLeft:"5px solid whitesmoke",
                                borderRight:"5px solid whitesmoke"
                            }}>
                                <span style={{
                                    fontSize:20
                                }}>
                                    Parcel Terjual :
                                </span>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center"><span style={{fontSize:20}}>Parcel</span></TableCell>
                                                <TableCell align="center"><span style={{fontSize:20}}>Terjual</span></TableCell>
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
                    {/* Tab 2 : Report Transaksi */}
                    <div style={{
                        justifyContent:"center",
                        display:displayTab===2?"flex":"none",
                        flexDirection:"column",
                        alignItems:"center",
                        marginTop:10
                    }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><span style={{fontSize:20}}>Transaksi ID</span></TableCell>
                                        <TableCell align="center"><span style={{fontSize:20}}>Pendapatan Bersih</span></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderReportTransaksi()}
                                </TableBody>
                            </Table>
                            {/* <Pagination style={{display:"flex", justifyContent:"center",width:"100%"}}>
                            {renderpaging()}
                            </Pagination> */}
                        </TableContainer>
                    </div>

                    {/* Tab 3 : Report Transaksi */}
                    <div style={{
                        justifyContent:"center",
                        display:displayTab===3?"flex":"none",
                        flexDirection:"column",
                        alignItems:"center",
                        marginTop:10
                    }}>
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center"><span style={{fontSize:20}}>Transaksi Detail ID</span></TableCell>
                                        <TableCell align="center"><span style={{fontSize:20}}>Nama Parcel</span></TableCell>
                                        <TableCell align="center"><span style={{fontSize:20}}>Pendapatan</span></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {renderReportTransaksiDetail()}
                                </TableBody>
                            </Table>
                            {/* <Pagination style={{display:"flex", justifyContent:"center",width:"100%"}}>
                            {renderpaging()}
                            </Pagination> */}
                        </TableContainer>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminReport