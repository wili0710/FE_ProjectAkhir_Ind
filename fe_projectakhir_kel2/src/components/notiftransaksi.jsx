import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL_SQL } from '../helpers/apiUrl';
import { AiOutlineClose } from 'react-icons/ai'
import { BiTransferAlt } from 'react-icons/bi'
import { Badge } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { IconContext } from 'react-icons/lib';
import './notiftransaksi.css'
import Skeleton from '@material-ui/lab/Skeleton';
import { Link } from 'react-router-dom';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 0,
      top: -10,
    //   border: `2px solid ${theme.palette.background.paper}`,
    //   padding: '0 4px',
    },
  }))(Badge);

export const NotifTransaksi=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const TransaksiList=useSelector(state=>state.TransaksiList)
    const dispatch=useDispatch()

    const [jumlah,setJumlah]=useState(0)
    const [close,setClose]=useState(false)
    const [renderListState,setRenderListState]=useState()
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        ambilDataTransaksiList()
    },[])
    useEffect(()=>{
        onClickOpen()
    },[TransaksiList.transaksi])
    useEffect(()=>{
        onClickOpen()
    },[Auth.id])

    const ambilDataTransaksiList=()=>{
        Axios.post(`${API_URL_SQL}/transaksi/gettransaksilist`,{user_id:Auth.id})
        .then((res)=>{
            console.log(res.data)
            const simpanredux={
                transaksi:res.data.transaksi,
                transaksidetailsatuan:res.data.transaksidetailsatuan,
                transaksiparcel:res.data.transaksiparcel,
                transaksidetailparcel:res.data.transaksidetailparcel
            }
            dispatch({type:"LOADTRANSAKSILIST",payload:simpanredux})
            let selaincomplete=res.data.transaksi.filter((filtering)=>{
                return filtering.status!=="Pesanan Selesai"
            })
            setJumlah(selaincomplete.length)
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onClickOpen=()=>{
        let renderlist=[]
        if(TransaksiList.transaksi==undefined){
            return null
        }
        const belumDibayar=TransaksiList.transaksi.filter((filtering)=>{
            return filtering.status==="Belum dibayar"
        })
        if(belumDibayar.length!==0){
            renderlist.push(
            <div style={{
                borderBottom:"5px solid whitesmoke",
                padding:5
            }}>
                <div> Belum Dibayar : {belumDibayar.length} Transaksi </div>
                <Link to="/listbelanja/1">
                    <div style={{cursor:"pointer"}}>Upload Bukti Pembayaran Disini</div>  
                </Link>
            </div>
            )
        }
        const menungguKonfirmasi=TransaksiList.transaksi.filter((filtering)=>{
            return filtering.status==="Menunggu Konfirmasi"
        })  
        if(menungguKonfirmasi.length!==0){
            renderlist.push(<div style={{borderBottom:"5px solid whitesmoke",padding:5}}> Menunggu Konfirmasi : {menungguKonfirmasi.length} Transaksi </div>)
        }
        const pesananDiproses=TransaksiList.transaksi.filter((filtering)=>{
            return filtering.status==="Pesanan Diproses"
        })
        if(pesananDiproses.length!==0){
            renderlist.push(
            <div style={{
                borderBottom:"5px solid whitesmoke",
                padding:5
            }}>
                <div> Pesanan Diproses : {pesananDiproses.length} Transaksi </div>
            </div>
            )
        }
        const pesananDikirim=TransaksiList.transaksi.filter((filtering)=>{
            return filtering.status==="Pesanan Dikirim"
        })
        if(pesananDikirim.length!==0){
            renderlist.push(
                <div style={{
                    borderBottom:"5px solid whitesmoke",
                    padding:5
                }}>
                    <div> Pesanan Dikirim : {pesananDikirim.length} Transaksi </div>
                    <Link to="/listbelanja/4">
                    <div style={{cursor:"pointer"}}>Konfirmasi Pesanan Sudah Sampai Disini</div>  
                    </Link>
                </div>
            )
        }
        const menungguKomentar1=TransaksiList.transaksidetailparcel.filter((filtering)=>{
            return filtering.komentar===""
        })
        const menungguKomentar2=TransaksiList.transaksidetailsatuan.filter((filtering)=>{
            return filtering.komentar===""
        })
        const menungguKomentar=menungguKomentar1.concat(menungguKomentar2)
        if(menungguKomentar.length!==0){
            renderlist.push(<div style={{borderBottom:"5px solid whitesmoke",padding:5}}> Menunggu Komentar : {menungguKomentar.length} Transaksi </div>)
        }
        const pesananSelesai=TransaksiList.transaksi.filter((filtering)=>{
            return filtering.status==="Pesanan Selesai"
        })
        renderlist.push(<div style={{cursor:"pointer"}}><Link to="/listbelanja"><h6> Semua Transaksi</h6></Link></div>)
        const simpanredux={
            belumDibayar,
            menungguKonfirmasi,
            pesananDiproses,
            pesananDikirim,
            pesananSelesai,
            menungguKomentar
        }
        dispatch({type:"FILTERTRANSAKSI",payload:simpanredux})
        setRenderListState(renderlist)
        setLoading(false)
    }

    const TransaksiLength=()=>{

        console.log(renderListState)
        return renderListState
    }
    
    console.log(TransaksiList)
    if(Auth.isLogin==false || Auth.role=="admin"){
        return null
    }
    return (
        <div style={{
            position:"fixed",
            bottom:50,
            left:50,
            zIndex:5
        }}>
            <div onClick={()=>{onClickOpen();setClose(!close)}} style={{
                backgroundColor:"#30a9e1",
                color:"white",
                // border:"1px solid whitesmoke",
                borderRadius:"50%",
                width:34,
                height:34,
                display:close?"flex":"none",
                justifyContent:"center",
                alignItems:"center",
                margin:5,
                cursor:"pointer"
            }}>
                <IconContext.Provider
                value={{ color: 'white', size: '20px' }}
                >
                {close?
                    <StyledBadge color="error" badgeContent={jumlah} max={20}>
                        <BiTransferAlt/>
                    </StyledBadge>
                    :
                    null
                }
                </IconContext.Provider>
            </div>
            <div style={{
                display:close?"none":"flex",
                flexDirection:"column",
                backgroundColor:"white",
                border:"5px solid whitesmoke",
                padding:20,
                borderRadius:20,
                animation: "growOut 500ms ease-in-out forwards",
                animationDirection:close?"reverse":"normal"
            }}>
                <div style={{display:"flex",flexDirection:"row", justifyContent:"space-between"}}>
                    <h6>Status Transaksi Kamu</h6>
                    <AiOutlineClose style={{cursor:"pointer"}} onClick={()=>setClose(!close)}/>

                </div>
                    {TransaksiLength()}
                    
            </div>
        </div>

    )

}