import React, { useCallback, useEffect, useState } from 'react';
import HeaderWili from '../components/header/headerwili';
import { Badge, Button, withStyles } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import numeral from 'numeral';
import ReactImageMagnify from 'react-image-magnify';
import Swal from 'sweetalert2';
import { useDropzone } from 'react-dropzone';
import Axios from 'axios';
import { API_URL_SQL } from '../helpers/apiUrl';
import { Redirect } from 'react-router-dom';

const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 0,
      top: -2,
    //   border: `2px solid ${theme.palette.background.paper}`,
    //   padding: '0 4px',
    },
  }))(Badge);

const ListBelanja=(props)=>{
    console.log(props)
    const Auth=useSelector(state=>state.Auth) 
    const TransaksiList=useSelector(state=>state.TransaksiList)
    const dispatch=useDispatch()
    const [tabopen,settabopen]=useState(parseInt(props.match.params.tabs) || 1)
    const [transaksi_id,settransaksi_id]=useState()
    const [showPembayaran,setShowPembayaran]=useState(false)
    const [image,setImage]=useState()
    const [showItem,setShowItem]=useState()

    useEffect(()=>{
        console.log("jalan")     
        console.log(TransaksiList)  
        renderlist() 
    },[])

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setImage(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    
    const confirmBarangDiterima=(transaksi_id)=>{
        Axios.post(`${API_URL_SQL}/transaksi/confirmbarangsampai`,{users_id:Auth.id,transaksi_id})
        .then((res)=>{
            dispatch({type:"LOADTRANSAKSILIST",payload:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    const clickSendBukti=(transaksi_id,users_id)=>{

        if(!image){
            return Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Bukti transfer belum ada!'
            })
        }
        
        let formData=new FormData()
        let options={
            headers:{
                'Content-type':'multipart/form-data'
            }
        }
        formData.append('bukti',image)
        console.log(formData,image)
        formData.append('data',JSON.stringify({transaksi_id:transaksi_id,users_id:users_id}))

        Axios.post(`${API_URL_SQL}/payment/uploadpaymenttransfer`,formData,options)
        .then((res)=>{
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
                return Swal.fire(
                    'Berhasil!',
                    'Akan segera kami proses!',
                    'success'
                )
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
        setShowPembayaran(!showPembayaran)
    }

    const rendertransaksi=(status)=>{
        console.log("rendertransaksi jalan")
        let hasilfilter=TransaksiList.transaksi.filter((filtering)=>{
            return filtering.status==status
        })
        console.log(hasilfilter)
        return hasilfilter.map((val,index)=>{
            return (
                <div style={{
                    width:"100%",
                    border:"5px solid whitesmoke",
                    display:"flex",
                    flexDirection:"column",
                    padding:10,
                    marginBottom:10,
                    borderRadius:10
                }}>
                    <div style={{
                        display:"flex",
                        // justifyContent:"space-between",
                        borderBottom:"1px solid whitesmoke",
                        paddingBottom:5
                    }}>
                        <div style={{flexBasis:"33.3%"}}> 
                            TID:{val.id} | {moment(val.lastupdate).format('MMMM Do YYYY')}
                        </div>
                        <div style={{flexBasis:"20.3%",textAlign:"left"}}>
                            <div>
                                Total Belanja
                            </div>
                            <div>
                                <span style={{color:"#fa5a1e",fontWeight:"700"}}>Rp {numeral(val.totaltransaksi).format('0,0')}</span>
                            </div>
                        </div>
                        <div style={{flexBasis:"46.4%",textAlign:"right",display:"flex",justifyContent:"flex-end",alignItems:"center"}}>
                            {tabopen==1?
                            <div style={{
                                backgroundColor:"#30a9e1",
                                padding:5,
                                paddingRight:10,
                                paddingLeft:10,
                                height:"fit-content",
                                color:"white",
                                borderRadius:5,
                                cursor:"pointer"
                            }} onClick={()=>{settransaksi_id(val.id);setShowPembayaran(!showPembayaran)}}>
                                Kirim Bukti pembayaran
                            </div>
                            :
                            null
                            }
                            {tabopen==4?
                            <div style={{
                                backgroundColor:"#30a9e1",
                                padding:5,
                                paddingRight:10,
                                paddingLeft:10,
                                height:"fit-content",
                                color:"white",
                                borderRadius:5,
                                cursor:"pointer"
                            }} onClick={()=>confirmBarangDiterima(val.id)}>
                                Konfirmasi Barang Diterima
                            </div>
                            :
                            null

                            }
                        </div>
                    </div>
                    <div style={{
                        display:"flex",
                        // justifyContent:"space-between"
                    }}>
                        <div style={{
                            flexBasis:"33.3%"
                        }}>
                            <div>
                                Nama Penerima : {val.namaPenerima}
                            </div>
                            <div>
                                Nama Pengirim : {val.namaPengirim}
                            </div>
                        </div>
                        <div style={{flexBasis:"20.3%",textAlign:"left"}}>
                            <div>
                                Status
                            </div>
                            <div>
                                {val.status}
                            </div>
                        </div>
                        <div style={{
                            flexBasis:"46.4%",
                            textAlign:"right"
                        }}>
                            <div>
                                Alamat Pengiriman
                            </div>
                            <div style={{whiteSpace:"normal"}}>
                                {val.alamatpengiriman}
                            </div>
                        </div>
                    </div>
                    {showItem==val.id?
                        <div style={{cursor:"pointer", color:"#30a9e1"}} onClick={()=>setShowItem()}>
                            Tutup Detail
                         </div>
                        :
                        <div style={{cursor:"pointer", color:"#30a9e1"}} onClick={()=>setShowItem(val.id)}>
                            Lihat Item Detail
                        </div>
                    }
                    <div style={{
                        display:showItem==val.id?"flex":"none",
                        flexDirection:"column"
                    }}>
                    {renderTransaksiDetail(val.id)}
                    </div>
                </div>
            )
        })

    }

    // Render isi cart di cartPage
    const renderTransaksiDetail=(transaksi_id)=>{
        let filterTransaksiId=TransaksiList.transaksidetailsatuan.filter((filtering)=>{
            return filtering.transaksi_id==transaksi_id
        })
        let arr1= filterTransaksiId.map((val,index)=>{
            return (
                <div style={{
                    display:"flex",
                    // justifyContent:"space-between",
                    // borderBottom:"5px solid #f3f4f5",
                    borderTop:"5px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:100,
                    // backgroundColor:"wheat",
                    height:100,
                    marginTop:20
                }}>
                    <div style={{
                        marginRight:10
                    }}>
                        <img src={API_URL_SQL+val.image} width="50" height="50"/>
                    </div>
                    <div>
                        <h6>{val.nama}</h6>
                        <h6>Jumlah: {val.qty}</h6>
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"flex-end",
                        position:"absolute",
                        right:200
                    }}>
                        <div style={{
                            borderBottom:"1px #f3f4f5 solid",
                            cursor:"default",
                            marginBottom:10
                        }}>
                        </div>
                        <h6>Total</h6>  
                        <span style={{
                            color:"#fa5a1e",
                            fontWeight:"700"
                        }}>
                            Rp {numeral(val.hargatotal).format('0,0')}
                        </span>                        
                    </div>
                </div>
            )
        })

        let filterTransaksiParcelId=TransaksiList.transaksiparcel.filter((filtering)=>{
            return filtering.transaksi_id==transaksi_id
        })
        let arr2= filterTransaksiParcelId.map((val,index)=>{
            let detailparcel=TransaksiList.transaksidetailparcel.filter((filtering)=>{
                return filtering.transaksidetail_id===val.transaksidetail_id
            })
            let renderdetailparcel=detailparcel.map((detail,index)=>{
                return(
                    <div style={{
                        display:"flex"
                    }}>
                        <div>
                            <h6>- {detail.namaproduct} : {detail.qtyproduct/detail.qtyparcel}</h6>
                        </div>
                    </div>
                )
            })
            return (
                <div style={{
                    display:"flex",
                    // justifyContent:"space-between",
                    // borderBottom:"5px solid #f3f4f5",
                    borderTop:"5px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:20,
                    marginBottom:10,
                    marginTop:20,
                }}>
                    <div style={{
                        marginRight:10
                    }}>
                        <img src={val.gambar} width="50" height="50"/>
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column"
                    }}>
                        <h6>{index+1}: {val.nama}</h6>
                        <h6>Isi Parcel</h6>
                        <div style={{
                            marginLeft:10,
                            display:"flex",
                            flexDirection:"column"
                        }}>
                            {renderdetailparcel}
                        </div>
                        <h6>Jumlah Parcel: {val.qty}</h6>
                        <h6>Message Custom:</h6>
                        <div style={{
                            border:"3px #f3f4f5 solid",
                            padding:20,
                            marginTop:10,
                            width:500,
                            // height:"fit-content",
                        }}>
                            <p style={{wordWrap:"break-word"}}>
                                {val.message}
                            </p> 
                        </div>
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"flex-end",
                        position:"absolute",
                        right:200,
                    }}>
                        <h6>Total</h6>
                        <span style={{
                            color:"#fa5a1e",
                            fontWeight:"700"
                        }}>
                            Rp {numeral(val.hargatotal).format('0,0')}
                        </span>
                    </div>
                </div>
            )
        })
        let final=[arr2,arr1]
        return final
    }

    const renderlist=()=>{
        console.log("renderlist jalan")
        console.log(tabopen)
        if(tabopen===1){
            return rendertransaksi("Belum dibayar") 
        }
        if(tabopen===2){
            return rendertransaksi("Menunggu Konfirmasi") 
        }
        if(tabopen===3){
            return rendertransaksi("Pesanan Diproses") 
        }
        if(tabopen===4){
            return rendertransaksi("Pesanan Dikirim") 
        }
        if(tabopen===5){
            return rendertransaksi("Pesanan Selesai") 
        }
        // if(tabopen===6){
        //     return rendertransaksi("Menunggu Komentar") 
        // }
    }

    if(!Auth.isLogin){
        Swal.fire(
            'Sudahkah Login?',
            'Login Terlebih Dahulu',
            'question'
          )
        return <Redirect to='/'/>
    }

    return (
        <div style={{
            display:"flex",
            flexDirection:"column",
            // backgroundColor:"whitesmoke",
            width:"100%",
            alignItems:"center"
        }}>
            <HeaderWili/>
            <div style={{
                display:"flex",
                flexDirection:"column",
                width:"1200px",
                // backgroundColor:"white",
                marginTop:80,
                justifyContent:"center",
                border:"1px solid lightgray",
                borderRadius:5
            }}>
                <div style={{
                    display:"flex",
                    flexDirection:"row",
                    justifyContent:"space-around",
                    padding:10,
                    borderBottom:"5px solid whitesmoke"
                }}>
                    <div style={{
                        borderBottom:tabopen==1?"5px solid #30a9e1":null,
                        paddingBottom:5,
                        cursor:"pointer"
                    }} onClick={()=>settabopen(1)}>
                        <StyledBadge color="error" badgeContent={TransaksiList.belumDibayar.length} max={20}>
                            Belum Dibayar
                        </StyledBadge>
                    </div>
                    <div style={{
                        borderBottom:tabopen==2?"5px solid #30a9e1":null,
                        paddingBottom:5,
                        cursor:"pointer"
                    }} onClick={()=>settabopen(2)}>
                        Menunggu Konfirmasi
                    </div>
                    <div style={{
                        borderBottom:tabopen==3?"5px solid #30a9e1":null,
                        paddingBottom:5,
                        cursor:"pointer"
                    }}  onClick={()=>settabopen(3)}>
                        Pesanan Diproses
                    </div>
                    <div style={{
                        borderBottom:tabopen==4?"5px solid #30a9e1":null,
                        paddingBottom:5,
                        cursor:"pointer"
                    }}  onClick={()=>settabopen(4)}>
                        Pesanan Dikirim
                    </div>
                    <div style={{
                        borderBottom:tabopen==5?"5px solid #30a9e1":null,
                        paddingBottom:5,
                        cursor:"pointer"
                    }}  onClick={()=>settabopen(5)}>
                        Pesanan Selesai
                    </div>
                    {/* <div style={{
                        borderBottom:tabopen==6?"5px solid #30a9e1":null,
                        paddingBottom:5,
                        cursor:"pointer"
                    }}  onClick={()=>settabopen(6)}>
                        Menunggu Komentar
                    </div> */}
                </div>
                <div style={{
                    padding:20
                }}>
                    {renderlist()}
                </div>
            </div>
            {showPembayaran?
                <>
                    <div style={{
                        height:"100%",
                        width:"100%",
                        backgroundColor:"rgba(0, 0, 0, 0.5)",
                        position:"fixed",
                        zIndex:2,
                        top:0
                    }} onClick={()=>setShowPembayaran(!showPembayaran)}>
                    </div>
                    <div style={{
                        backgroundColor:"white",
                        width:"50%",
                        // minHeight:"70%",
                        height:"fit-content",
                        display:"flex",
                        flexDirection:"column",
                        borderRadius:10,
                        position:"fixed",
                        zIndex:3,
                        margin: "auto", /* Will not center vertically and won't work in IE6/7. */
                        left: 0,
                        right: 0,
                        top:0,
                        bottom:0,
                        animation: "rotateY 500ms ease-in-out forwards",
                        transformOrigin: "top center"
                    }}>
                        <div style={{
                            padding:20,
                            display:"flex",
                            flexDirection:"column",
                            // justifyContent:"center",
                            // alignItems:"center",
                            height:"100%",
                            width:"70%"
                        }}>
                            <div style={{padding:5}}>
                                <h4>Pembayaran Dengan Transfer, ID Transaksi {transaksi_id}</h4>
                            </div>
                            <div style={{padding:5}}> 
                                <h6>Silakan transfer ke Rekening</h6>
                                <span>- Bank ABCD No.Rekening: 1310025105 A/n hearttoheart</span>
                            </div>
                            <div style={{padding:5}}>
                                <h6>Upload Bukti Pembayaran :</h6>
                            </div>
                            <div style={{padding:5}}>  
                                <div {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    }
                                </div>

                                {
                                    image?
                                    <ReactImageMagnify {...{
                                        smallImage: {
                                            alt: 'Payment',
                                            // isFluidWidth: true,
                                            width:50,
                                            height:100,
                                            src: URL.createObjectURL(image)
                                        },
                                        largeImage: {
                                            src: URL.createObjectURL(image) ,
                                            width:800,
                                            height: 800
                                        },
                                        enlargedImageContainerDimensions:{
                                            width:"1600%",
                                            height:"300%"
                                        }
                                    }} />
                                    :
                                    null
                                }
                            </div>
                            <div style={{padding:5}}>
                                <Button color="primary" onClick={()=>clickSendBukti(transaksi_id,Auth.id)}>Upload Bukti Pembayaran</Button>
                            </div>
                        </div>
                    </div>
                </>
                :
                null
            }
        </div>
    )
}

export default ListBelanja