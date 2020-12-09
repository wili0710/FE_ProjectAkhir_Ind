import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL_SQL } from '../helpers/apiUrl';
import Logo from './../assets/logo.png'
import {BiCart,BiUser} from 'react-icons/bi'
import { Badge } from '@material-ui/core';
import { FullPageLoading } from '../components/loading';
import { Link } from 'react-router-dom';
import './cart.css';
import numeral from 'numeral';
import { Button} from 'reactstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import ReactImageMagnify from 'react-image-magnify';




const CartPage=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(true)
    const [showCart,setShowCart]=useState(false)
    const [showMenuUser,setShowMenuUser]=useState(false)
    const [showEdit,setShowEdit]=useState(false)
    const [itemEdit,setItemEdit]=useState()
    const [limitProduct,setLimitProduct]=useState([])
    const [listProduct,setListProduct]=useState([])
    const [loadingEdit,setLoadingEdit]=useState(true)
    const [loadingEdit2,setLoadingEdit2]=useState(true)
    const [open,setOpen]=useState(0)
    const [komposisiParcel,setKomposisiParcel]=useState([])
    const [statusPerCategory,setStatusPerCategory]=useState([])
    const [message,setMessage]=useState()
    const [qtyParcel,setQtyParcel]=useState()
    const [editSatuan,setEditSatuan]=useState()
    const [qtySatuan,setQtySatuan]=useState()

    const toggleModalEdit=()=>setShowEdit(!showEdit)

    useEffect(()=>{
        fetchdata()
    },[])

    useEffect(()=>{
        inStatusPerCategory()
    },[komposisiParcel])

    
    const fetchdata=async()=>{
        try {
            // Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${Auth.id}`)
            await Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                dispatch({type:'CART',cart:res.data})
                setLoading(false)
                
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Pembayaran
    const [showPembayaran,setShowPembayaran]=useState(false)
    const [image,setImage]=useState()

    const clickSendBukti=(transaksi_id,users_id)=>{
        console.log(transaksi_id,users_id)
        let data={transaksi_id,users_id,image}
        let formData=new FormData()
        let options={
            header:{
                'Content-type':'multipart/form-data'
            }
        }
        formData.append('bukti',image)
        console.log(formData,image)
        formData.append('data',JSON.stringify({transaksi_id:transaksi_id,users_id:users_id}))

        Axios.post(`${API_URL_SQL}/payment/uploadpaymenttransfer`,formData,options)
        .then((res)=>{

        }).catch((err)=>{
            console.log(err)
        })
        setShowPembayaran(!showPembayaran)
    }

    // End Pembayaran
    const onClickOpenEditParcel=(dataforedit)=>{
        console.log(dataforedit)
        setQtyParcel(dataforedit[0].qty)
        setMessage(dataforedit[0].message)
        setLoadingEdit(true)
        setLoadingEdit2(true)
        setItemEdit(dataforedit)
        getLimitProduct(dataforedit)

        setLoadingEdit(false)
        setShowEdit(!showEdit)        
    }

    const getLimitProduct=async(dataforedit)=>{
        try {
            const getlimit= await Axios.get(`${API_URL_SQL}/product/getDataParcelById/${dataforedit[0].parcel_id}`)

            const arrlimit=getlimit.data.map((val,index)=>{
                return {
                    categoryproduct_id:val.categoryproduct_id,
                    category:val.namaProduct,
                    limitqty:val.qty
                }
            })
            setLimitProduct(arrlimit)
            getProductList(arrlimit,dataforedit)
            
        } catch (error) {
            console.log(error)
        }
    }
    const inStatusPerCategory=async()=>{

        let saring=limitProduct.map((val,index)=>{
            let komposisi=komposisiParcel.filter((filtering)=>{

                return filtering.category==val.category
            })
            if(komposisi.length==0){
                return [{
                    category:val.category,
                    qty:0
                }]
            }else{
                return komposisi
            }
        })

        let qtypercategory=saring.map((val,index)=>{
            let qty=0
            val.map((value,index)=>{
                qty+=value.qty
            })
            return  {
                category:val[0].category,
                qty:qty
            }
        })
        let letstatusPerCategory=qtypercategory.map((val,index)=>{
            if(val.qty>=limitProduct[index].limitqty){
                return{
                    categoryproduct_id:limitProduct[index].categoryproduct_id,
                    category:val.category,
                    isAtLimit:true,
                    isAtZero:false
                }
            }else if(val.qty==0){
                return{
                    categoryproduct_id:limitProduct[index].categoryproduct_id,
                    category:val.category,
                    isAtLimit:false,
                    isAtZero:true
                }
            }else{
                return{
                    categoryproduct_id:limitProduct[index].categoryproduct_id,
                    category:val.category,
                    isAtLimit:false,
                    isAtZero:false,
                }
            }
        })
        setLoadingEdit2(false)
        setStatusPerCategory(letstatusPerCategory)
    }

    const getProductList=async(arrlimit,dataforedit)=>{
        console.log(dataforedit)
        const komposisiparcelnow=dataforedit[1].map((val,index)=>{
            return {
                products_id:val.products_id,
                category:val.category,
                nama:val.namaproduct,
                qty:val.qtyproduct/val.qtyparcel
            }
        })

        setKomposisiParcel(komposisiparcelnow)
        const arrCategoryId=arrlimit.map((val,index)=>{
            return val.categoryproduct_id
        })

        

        try {
            const gettobe=await Axios.post(`${API_URL_SQL}/product/getAllProductByCategory/`,{categoryproduct_id:arrCategoryId})
            console.log(gettobe.data)
            setListProduct(gettobe.data)
        } catch (error) {
            console.log(error)
        }
    }
    const renderIsiParcel=()=>{
        console.log(statusPerCategory)
        return komposisiParcel.map((val,index)=>{
            let status=statusPerCategory.filter((filtering)=>{
                return filtering.category===val.category
            })

            return(
                <div style={{
                    display:"flex",
                    justifyContent:"space-between"
                }}>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        flex:4
                    }}>
                        <h6>- {val.nama} </h6>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        flex:1
                    }}>
                        <h6>: {val.qty}</h6>
                        <div style={{
                            cursor:"pointer",
                            display:status[0].isAtZero?"none":"inline",
                            fontWeight:"700",
                            fontSize:20,
                        }} onClick={()=>clickMinus(val.nama)}>
                            -
                        </div>
                        <div style={{
                            cursor:"pointer",
                            display:status[0].isAtLimit?"none":"inline",
                            fontWeight:"700",
                            fontSize:20
                        }}onClick={()=>clickPlus(val.nama,val.category,val.products_id)}>
                            +
                        </div>
                    </div>
                </div>
            )
        })
    }

    const clickMinus=(nama)=>{

        let minusInput=komposisiParcel.map((val,index)=>{
            if(val.nama==nama){
                return{...val,qty:val.qty-1}
            }else{
                return {...val}
            }
        })

        let deletezero=minusInput.filter((filtering)=>{
            return filtering.qty>0
        })

        setKomposisiParcel(deletezero)
    }
    const clickPlus=(nama,category,products_id)=>{
        let newkomposisi
        console.log(products_id)
        let plusInput=komposisiParcel.map((val,index)=>{
            if(val.nama==nama){
                return{...val,qty:val.qty+1}
            }else{
                return {...val}
            }
        })
        let isMax=statusPerCategory.filter((filtering)=>{
            return filtering.category===category
        })

        let isInKomposisi=komposisiParcel.filter((filtering)=>{
            return filtering.nama===nama
        })

        if(!isMax[0].isAtLimit&&isInKomposisi.length===0){
            newkomposisi={
                products_id:products_id,
                category:category,
                nama:nama,
                qty:1
            }
            plusInput.push(newkomposisi)
        }
        console.log(plusInput)
        setKomposisiParcel(plusInput)
    }
    const renderProductList=()=>{
        console.log(komposisiParcel)
        if(statusPerCategory){
            return limitProduct.map((val,index)=>{
                let listprod=listProduct.filter((filtering)=>{
                    return filtering.categoryproduct==val.category
                })
    
                let status=statusPerCategory.filter((filtering)=>{
                    return filtering.category==val.category
                })
    
                let maplistprod=listprod.map((val,index)=>{
                    return (
                        <div style={{
                            flexBasis:"20%",
                            display:"flex",
                            flexDirection:"column",
                            // justifyContent:"center",
                            // alignContent:"center",
                            textAlign:"center",
                            padding:10,
                            border:"5px solid #f4f6f8"
                        }}>
                            <div>
                                <img src={val.image} alt={val.nama} width="100" height="100"/>
                                
                            </div>
                            <div>
                                <h6>{val.nama}</h6>
                            </div>
                            <div style={{
                                display:"flex",
                                justifyContent:"space-around",
                                fontWeight:"700",
                                fontSize:20
                            }}>
                                <div style={{
                                    cursor:"pointer",
                                    display:status[0].isAtZero?"none":"inline"
                                }} onClick={()=>clickMinus(val.nama)}>
                                    -
                                </div>
                                <div style={{
                                    cursor:"pointer",
                                    display:status[0].isAtLimit?"none":"inline"
                                }}onClick={()=>clickPlus(val.nama,val.categoryproduct,val.products_id)}>
                                    +
                                </div>
                                
                            </div>
                            
                        </div>
                    )
                })
                return (
                    <div style={{
                        display:"flex",
                        flexDirection:"column"
                    }}>
                        <div style={{
                            display:"flex",
                            justifyContent:"space-between",
                            cursor:"pointer"
                        }} onClick={()=>setOpen(index)}>
                            <h5>Pilihan Produk {val.category} :</h5>
                            <span>Click to open</span>
                        </div>
                        <div style={{
                            display:open===index?"flex":"none",
                            flexWrap:"wrap",                        
                        }}>
                            {maplistprod}
                        </div>
                    </div>
                )
            })
        }else{
            return(
                <div>
                    Loading
                </div>
            )

        }
    }
    const renderCart=()=>{
        let arr1= Auth.cart.transaksidetailsatuan.map((val,index)=>{
            return (
                <div style={{
                    display:"flex",
                    // justifyContent:"space-between",
                    borderBottom:"1px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:10
                }}>
                    <div style={{
                        marginRight:10
                    }}>
                        <img src={val.image} width="50" height="50"/>
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
                        right:30
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
        let arr2= Auth.cart.transaksiparcel.map((val,index)=>{
            return (
                <div style={{
                    display:"flex",
                    // justifyContent:"space-between",
                    borderBottom:"1px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:10
                }}>
                    <div style={{
                        marginRight:10
                    }}>
                        <img src={val.gambar} width="50" height="50"/>
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
                        right:30
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

    const renderCartDetail=()=>{
        let arr1= Auth.cart.transaksidetailsatuan.map((val,index)=>{
            return (
                <div style={{
                    display:"flex",
                    // justifyContent:"space-between",
                    borderBottom:"1px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:10,
                    // backgroundColor:"wheat",
                    height:100
                }}>
                    <div style={{
                        marginRight:10
                    }}>
                        <img src={val.image} width="50" height="50"/>
                    </div>
                    <div>
                        <h6>{val.nama}</h6>
                        {
                            editSatuan===val.transaksidetail_id?
                            <h6>
                                Jumlah: 
                                <input onChange={(e)=>{
                                    if(e.target.value<=0){
                                        setQtySatuan(1)
                                    }else{
                                        setQtySatuan(e.target.value)
                                    }
                                }} type="number" defaultValue={val.qty} value={qtySatuan}
                                style={{marginLeft:20,width:50, border:"lighgray 1px solid",outline:"#f4f6f8"}}/>
                            </h6>
                            :
                            <h6>Jumlah: {val.qty}</h6>

                        }
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"flex-end",
                        position:"absolute",
                        right:30
                    }}>
                        <div style={{
                            borderBottom:"1px #f3f4f5 solid",
                            cursor:"default",
                            marginBottom:10
                        }}>
                            {
                                editSatuan===val.transaksidetail_id?
                                <>
                                    <h6><span style={{color:"#158ae6",cursor:"pointer"}} onClick={()=>{
                                        setEditSatuan();setEditSatuan(!editSatuan);clickSaveSatuan(val.products_id,val.transaksidetail_id)
                                        }}>Save</span>
                                        | 
                                    <span style={{color:"red",cursor:"pointer"}} 
                                    onClick={()=>setEditSatuan()}> Cancel</span></h6>
                                </>
                                :
                                <>
                                    <h6><span style={{color:"#158ae6",cursor:"pointer"}} onClick={()=>{
                                        setItemEdit(val);setQtySatuan(val.qty);setEditSatuan(val.transaksidetail_id)
                                        }}>Edit</span>
                                        | 
                                    <span style={{color:"red",cursor:"pointer"}} 
                                    onClick={()=>onClickRemove(val.transaksi_id,val.transaksidetail_id)}> Remove</span></h6>
                                </>
                            }
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
        let arr2= Auth.cart.transaksiparcel.map((val,index)=>{
            let detailparcel=Auth.cart.transaksidetailparcel.filter((filtering)=>{
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
            let dataforedit=[val,detailparcel]
            return (
                <div style={{
                    display:"flex",
                    // justifyContent:"space-between",
                    borderBottom:"1px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:10
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
                        <h6>{val.nama}</h6>
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
                            width:500
                        }}>
                            <h6>
                                "{val.message}"
                            </h6> 
                        </div>
                    </div>
                    <div style={{
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"flex-end",
                        position:"absolute",
                        right:30,
                    }}>
                        <div style={{
                            borderBottom:"1px #f3f4f5 solid",
                            cursor:"default",
                            marginBottom:10
                        }}> 
                            <h6><span style={{color:"#158ae6",cursor:"pointer"}} onClick={()=>onClickOpenEditParcel(dataforedit)}>Edit</span> | 
                            <span style={{color:"red",cursor:"pointer"}} onClick={()=>onClickRemove(val.transaksi_id,val.transaksidetail_id)}> Remove</span></h6>
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
        let final=[arr2,arr1]
        return final
    }

    const onClickRemove=(transaksi_id,transaksidetail_id)=>{
        try {
            Axios.post(`${API_URL_SQL}/transaksi/removefromcart`,{
                transaksi_id:transaksi_id,
                transaksidetail_id:transaksidetail_id,
                user_id:Auth.id
            })
            .then((res)=>{
                dispatch({type:'LOGIN',cart:res.data})
                setLoading(false)
            })
        } catch (error) {
        }
    }
    const clickSaveSatuan=(products_id,transaksidetail_id)=>{
        let senttobe={
            user_id:`${Auth.id}`,
            products_id:`${products_id}`,
            parcel_id:`0`,
            qty:`${qtySatuan}`,
            transaksidetail_id:`${transaksidetail_id}`
        }
        Axios.post(`${API_URL_SQL}/transaksi/addtocart`,senttobe)
            .then((res)=>{
                console.log(res.data)
                dispatch({type:'CART',cart:res.data})
            }).catch((err)=>{
                console.log(err)
            })
    }
    const onClickSaveParcel=(transaksidetail_id,parcel_id)=>{
        console.log(komposisiParcel)
        let products_id=komposisiParcel.map((val,index)=>{
            return val.products_id
        })
        if(products_id.length!==itemEdit[1].length){
            alert(`Macam produk hanya boleh ${itemEdit[1].length}. Jika ingin beda silakan tambah paket parcel baru`)
        }else{
            let product_qty=komposisiParcel.map((val,index)=>{
                return val.qty
            })
            console.log(products_id)
            let senttobe={
                user_id:`${Auth.id}`,
                products_id:`0`,
                parcel_id:`${parcel_id}`,
                qty:`${qtyParcel}`,
                productforparcel_id:products_id,
                qtyproductforparcel:product_qty,
                message:message,
                transaksidetail_id:`${transaksidetail_id}`
            }
            console.log(senttobe)
            Axios.post(`${API_URL_SQL}/transaksi/addtocart`,senttobe)
            .then((res)=>{
                console.log(res.data)
                dispatch({type:'CART',cart:res.data})
                setShowEdit(!showEdit)
            }).catch((err)=>{
                setShowEdit(!showEdit)
                console.log(err)
            })
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
            maxWidth:2000,
            justifyContent:"center",
        }}>
            {/* MODAL Pembayaran */}
            {
                showPembayaran?
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
                        
                    }}>
                        <div style={{
                            borderBottom:"10px solid #f4f6f8",
                            padding:20
                        }}>
                            <div style={{
                                display:"flex",
                                justifyContent:"space-between"
                            }}>
                                <h3>Pembayaran</h3>
                                <span style={{
                                    color:"#fa5a1e",
                                    fontWeight:"700",
                                    fontSize:20
                                }}>
                                    {Auth.cart.transaksi.length==1?
                                        <>
                                            Total : Rp {numeral(Auth.cart.transaksi[0].totaltransaksi).format('0,0')}
                                        </>
                                        :
                                        null
                                    }
                                </span>
                            </div>
                        </div>
                        <div style={{
                            display:"flex",
                            width:"100%",
                        }}>
                            <div style={{
                                width:"30%",
                                borderRight:"10px solid #f4f6f8",
                                padding:20
                            }}>
                                <div style={{
                                    padding:10
                                }}>
                                    Transfer
                                </div>
                            </div>
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
                                    <h4>Pembayaran Dengan Transfer</h4>
                                </div>
                                <div style={{padding:5}}> 
                                    <h6>Silakan transfer ke Rekening</h6>
                                    <span>- Bank ABCD No.Rekening: 1310025105 A/n hearttoheart</span>
                                </div>
                                <div style={{padding:5}}>
                                    <h6>Upload Bukti Pembayaran :</h6>
                                </div>
                                <div style={{padding:5}}>   
                                    <input onChange={(e)=>setImage(e.target.files[0])} type="file"/>
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
                                    <Button color="primary" onClick={()=>clickSendBukti(Auth.cart.transaksi[0].id,Auth.id)}>Upload Bukti Pembayaran</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                
                
                :
                null
            }
            {/* End Modal Pembayaran */}
            {/* MODAL EDIT */}
            {
                showEdit?
                <>
                    <div style={{
                        height:"100%",
                        width:"100%",
                        backgroundColor:"rgba(0, 0, 0, 0.5)",
                        position:"fixed",
                        zIndex:2,
                        top:0
                    }} onClick={toggleModalEdit}>
                    </div>
                    <div style={{
                        backgroundColor:"white",
                        width:"70%",
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
                        bottom:0
                    }}>
                        <div style={{
                            padding:20,
                            paddingBottom:10,
                            width:"100%",
                            alignSelf:"center",
                            display:"flex",
                            justifyContent:"space-between",
                            borderBottom:"10px solid #f4f6f8"
                        }}>
                            <div style={{
                                display:"flex"
                            }}>
                                <h4>{itemEdit[0].nama}</h4>
                                <div style={{
                                    marginLeft:20
                                }}>
                                    Qty : <input onChange={(e)=>{
                                        if(e.target.value<=0){
                                            setQtyParcel(1)
                                        }else{
                                            setQtyParcel(e.target.value)
                                        }
                                    }} value={qtyParcel} type="number" defaultValue={itemEdit[0].qty} style={{width:50, border:"none",outline:"none"}}/>
                                </div>
                            </div>
                            
                            <div>
                                <Button color="primary" onClick={()=>onClickSaveParcel(itemEdit[0].transaksidetail_id,itemEdit[0].parcel_id)} style={{marginRight:10}}>Save</Button>
                                <Button color="secondary" onClick={toggleModalEdit}>Cancel</Button>
                            </div>
                        </div>
                        <div style={{
                            display:"flex",
                            flexBasis:"100%"
                        }}>
                            <div style={{
                                flexBasis:"70%",
                                padding:10
                            }}>
                                {
                                    loadingEdit?
                                    <Skeleton variant="text" width={"100%"} height={118} />
                                    :
                                    renderProductList()
                                    
                                }
                            </div>
                            <div style={{
                                flexBasis:"30%",
                                height:"fit-content",
                                borderLeft:"10px solid #f4f6f8",
                            }}>
                                <div style={{
                                    display:"flex",
                                    flexDirection:"column",
                                    padding:20,
                                    height:"fit-content"
                                }}>
                                    <div>
                                        Isi Parcel:
                                    </div>
                                    <div>
                                    {
                                        loadingEdit2?
                                        <Skeleton variant="text" width={"100%"} height={118} />
                                        :
                                        renderIsiParcel()
                                    }
                                    </div>
                                    {
                                        loadingEdit?
                                        <Skeleton variant="text" width={"100%"} height={118} />
                                        :
                                        <>
                                            <div>
                                                Message Custom:
                                            </div>
                                            <textarea onChange={(e)=>setMessage(e.target.value)} maxLength={500} type="text" defaultValue={itemEdit[0].message} style={{width:"100%", minHeight:200,maxHeight:400}}/>
                                        </>
                                    }
                                    <div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
                
                
                :
                null
            }
            {/* End Modal Edit */}
            <div style={{
                display:"flex",
                justifyContent:"space-between",
                backgroundColor:"#158ae6",
                padding:15,
                color:"white",
                position:"fixed",
                top:0,
                width:"100%",
                maxWidth:2000,
                zIndex:1}}>
                <div style={{
                    marginLeft:20
                }}>
                    <img src={Logo} alt="logo" width="145px" color="black"/>
                </div>
                <div style={{
                    display:"flex",
                    justifyContent:"space-around",
                    alignItems:"center",
                    flexBasis:"13%"}}>
                    <div style={{
                        position:"relative",}} onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)}>
                        <Badge color="error" badgeContent={Auth.cart.transaksiparcel.length+Auth.cart.transaksidetailsatuan.length}>
                            <BiCart color="white" size="20" style={{cursor:"pointer"}}/>
                        </Badge>
                        <div style={{
                            position:"absolute",
                            display:showCart?"block":"none",
                            right:-100,
                            paddingTop:10,
                            width:350,
                            
                        }}>
                            <div style={{
                                border:'1 solid white',
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                color:"black",
                                padding:10,
                                paddingLeft:20,
                                paddingRight:20,
                                boxShadow:"#f3f4f5 0px 3px 5px 1px",
                                backgroundColor:"white",
                                display:"flex",
                                flexDirection:"column",
                                animation: "growOut 500ms ease-in-out forwards",
                                transformOrigin: "top center",
                                overflowY:"scroll",
                                maxHeight:500
                            }}>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    borderBottom:"#f3f4f5 solid 1px"
                                }}>
                                    <h6>
                                        Keranjang ({Auth.cart.transaksiparcel.length+Auth.cart.transaksidetailsatuan.length})
                                    </h6>
                                    <span>
                                        <Link to="/cart" style={{
                                            color:"#158ae6",
                                            fontWeight:"500",
                                            textDecorationLine:"none"
                                            }}> <h6>Lihat Keranjang</h6></Link>
                                    </span>
                                </div>
                                <div>
                                    {Auth.cart.transaksiparcel.length>0||Auth.cart.transaksidetailsatuan.length>0?
                                    renderCart()
                                    // null
                                    :
                                    <div style={{
                                        display:"flex",
                                        justifyContent:"center",
                                        padding:10
                                    }}>
                                        <span>Masih Kosong</span>    
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        borderLeft: '1px solid white',
                        paddingLeft:10,
                        position:"relative",
                        }}
                        onMouseEnter={()=>setShowMenuUser(true)} onMouseLeave={()=>setShowMenuUser(false)}>
                        <BiUser color="white" size="20" style={{cursor:"pointer"}}/> Halo, {Auth.name}
                        <div style={{
                            position:"absolute",
                            display:showMenuUser?"block":"none",
                            paddingTop:10,
                            width:100,
                        }}>
                            <div style={{
                                border:'1 solid white',
                                borderBottomLeftRadius:10,
                                borderBottomRightRadius:10,
                                color:"black",
                                padding:10,
                                paddingLeft:20,
                                paddingRight:20,
                                boxShadow:"#f3f4f5 0px 3px 5px 1px",
                                backgroundColor:"white",
                                display:"flex",
                                flexDirection:"column",
                                animation: "growOut 300ms ease-in-out forwards",
                                transformOrigin: "top center"
                                // animation: "growDown 300ms ease-in-out"
                            }}>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    borderBottom:"#f3f4f5 solid 1px"
                                }}>
                                    <div>Setting</div>

                                </div>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-between",
                                    borderBottom:"#f3f4f5 solid 1px"
                                }}>
                                    <div>Logout</div>

                                </div>
                                <div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>  

            <div style={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                width:"100%",
                maxWidth:2000,
                marginBottom:20
            }}>
                <div style={{
                    display:"flex",
                    width:"80%",
                    // backgroundColor:"wheat",
                    marginTop:50,
                    justifyContent:"center"
                }}>
                    <div style={{
                        flexBasis:"50%"
                    }}>
                        <div style={{
                            padding:20,
                            position:"relative",
                            borderBottom:"#f3f4f5 solid 10px",
                            paddingBottom:10,
                            marginBottom:10
                        }}>
                        <div style={{
                            borderBottom:"#f3f4f5 solid 10px",
                            paddingBottom:10,
                            marginBottom:10
                        }}>
                            <h6>Keranjang:</h6>
                        </div>
                            {Auth.cart.transaksiparcel.length>0||Auth.cart.transaksidetailsatuan.length>0?
                            renderCartDetail()
                            // null
                            :
                            <div style={{
                                display:"flex",
                                justifyContent:"center",
                                padding:10
                            }}>
                                <span>Masih Kosong</span>    
                            </div>
                            }
                        </div>
                    </div>
                    <div style={{
                        flexBasis:"50%",
                        display:"flex",
                        flexDirection:"column",
                        alignItems:"center",
                        position:"sticky",
                        alignSelf:"flex-start",
                        top:100
                    }}>
                        <div style={{
                            padding:20,
                            width:500
                        }}>
                            <div style={{
                                display:"flex",
                                flexDirection:"column",
                                border:"#f3f4f5 solid 1px",
                                boxShadow:"#f3f4f5 0px 3px 5px 1px",
                                padding:30
                            }}>
                                <div>
                                    <h6>
                                        Ringkasan Belanja
                                    </h6>
                                </div>
                                <div style={{
                                    display:"flex",
                                    justifyContent:"space-between"
                                }}>
                                    <div>
                                        Total Transaksi
                                    </div>
                                    <div>
                                        <span style={{
                                            color:"#fa5a1e",
                                            fontWeight:"700"
                                        }}>
                                            {Auth.cart.transaksi.length==1?
                                        <>
                                            Rp {numeral(Auth.cart.transaksi[0].totaltransaksi).format('0,0')}
                                        </>
                                        :
                                        null
                                    }
                                        </span>
                                    </div>
                                </div>
                                <div style={{
                                    // backgroundColor:"wheat",
                                    display:"flex",
                                    justifyContent:"center",
                                    marginTop:20
                                }}>
                                    {Auth.cart.transaksi.length==1?
                                        <Button style={{
                                            width:200
                                        }} onClick={()=>setShowPembayaran(!showPembayaran)} color="primary">
                                            <span style={{
                                                fontWeight:500
                                            }}>
                                                Bayar ({Auth.cart.transaksiparcel.length+Auth.cart.transaksidetailsatuan.length})
                                            </span>
                                        </Button>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-1' style={{width:'100%',maxWidth:2000, marginLeft:20,borderTop:'1px solid lightgrey',position:"fixed",bottom:0,paddingBottom:10, backgroundColor:"white"}}>
                    <span style={{fontSize:'14px'}}>© 2020, hearttoheart</span>
                </div>
            </div>
        </div>
    )
}

export default CartPage