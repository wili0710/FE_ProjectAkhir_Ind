import Axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL_SQL } from '../helpers/apiUrl';
import Logo from './../assets/logo.png'
import {BiCart,BiUser} from 'react-icons/bi'
import { Badge } from '@material-ui/core';
import { FullPageLoading } from '../components/loading';
import { Link, Redirect } from 'react-router-dom';
import './cart.css';
import numeral from 'numeral';
import { Button} from 'reactstrap';
import Skeleton from '@material-ui/lab/Skeleton';
import ReactImageMagnify from 'react-image-magnify';
import { namaPertama } from '../helpers/namapertama';
import Swal from 'sweetalert2';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcApprove } from 'react-icons/fc'
import { AiFillMinusSquare,AiFillPlusSquare } from 'react-icons/ai'
import Dropzone, {useDropzone} from 'react-dropzone'



const MsgAddSatuan = ({ nama }) =>{
    console.log(nama)
    return (
        <div style={{display:"flex", alignContent:"center"}}>
            <div style={{marginRight:5}}>
                <FcApprove size={20} />
            </div>
            <div>
                {nama} berhasil ditambahkan 1
            </div>
        </div>
    )
}
const MsgEditSatuan = ({ nama,qty,indexs }) =>{
    console.log(nama)
    return (
        <div style={{display:"flex", alignContent:"center"}}>
            <div style={{marginRight:5}}>
                <FcApprove size={20} />
            </div>
            <div>
                {nama} berhasil diubah menjadi {qty}
            </div>
        </div>
    )
}
    const MsgEditParcel = ({ nama,indexs }) =>{
        console.log(nama)
            return (
                <div style={{display:"flex", alignContent:"center"}}>
                    <div style={{marginRight:5}}>
                        <FcApprove size={20} />
                    </div>
                    <div>
                        {indexs}: {nama} berhasil diubah
                    </div>
                </div>
            )
        }

const CartPage=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()

    const [loading,setLoading]=useState(true)
    const [loadingEdit,setLoadingEdit]=useState(true)
    const [loadingEdit2,setLoadingEdit2]=useState(true)

    const [showCart,setShowCart]=useState(false)                    // Show Dropdown Caart
    const [showMenuUser,setShowMenuUser]=useState(false)            // Show Dropdown User
    const [showEdit,setShowEdit]=useState(false)
    const [open,setOpen]=useState(0)

    const [itemEdit,setItemEdit]=useState()                         // Item / Transaksi Detail yg ingin di edit, 
    const [komposisiParcel,setKomposisiParcel]=useState([])         // Komposisi parcel saat ini
    const [message,setMessage]=useState()                           // Custom Message
    const [limitProduct,setLimitProduct]=useState([])               // Limit Product per category di Parcel tersebut
    const [listProduct,setListProduct]=useState([])                 // List product dari category yg terpakai
    const [statusPerCategory,setStatusPerCategory]=useState([]) 
    const [isAllLimit,setIsAllLimit]=useState()    // Status per category apakah sudah kena limit, 0 atau belum.
    
    const [qtyParcel,setQtyParcel]=useState()                       // qty Parcelnya
    
    // Untuk edit item satuan, bukan yg parcel
    const [editSatuan,setEditSatuan]=useState()             
    const [qtySatuan,setQtySatuan]=useState()

    const [randomProduct,setRandomProduct]=useState()
    const [overlayProduct,setOverlayProduct]=useState()

    const [indexparceltoas,setindexparceltoas]=useState()
    const [namaparceltoas,setnamaparceltoas]=useState()

    // const [listProduk_ID,setListProduk_ID]=useState()
    // const [listProduk_Qty,setListProduk_Qty]=useState()


    const toggleModalEdit=()=>setShowEdit(!showEdit)

    useEffect(()=>{
        console.log(Auth)
        fetchdata()
    },[])

    useEffect(()=>{
        inStatusPerCategory()
    },[komposisiParcel])

    
    const fetchdata=async()=>{
        try {
            // await Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${Auth.id}`)
            Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${Auth.id}`)
            .then((res)=>{
                console.log(res.data)
                dispatch({type:'CART',cart:res.data})
            }).catch((err)=>{
                console.log(err)
            })
            Axios.get(`${API_URL_SQL}/product/getRandomProduct/4`)
            .then((res)=>{
                setRandomProduct(res.data)
                setLoading(false)
            }).catch((err)=>{
                console.log(err)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        setImage(acceptedFiles[0])
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    // Pembayaran
    const [showPembayaran,setShowPembayaran]=useState(false)        // Show PopUp / Modal Pembayaran
    const [image,setImage]=useState()                               // Set Image

    const clickSendBukti=(transaksi_id,users_id)=>{
        console.log(transaksi_id,users_id)

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
            fetchdata()
        }).catch((err)=>{
            console.log(err)
        })
        setShowPembayaran(!showPembayaran)
    }

    // End Pembayaran, dataforedit diambil dari transaksi detail yg ingin di edit

    // Random Product

    // const notifyAddProductSatuan = () => toast.info("🦄Wow so easy !")
    const notifyAddProductSatuan = (namaproduct) => toast.info(<MsgAddSatuan nama={namaproduct}/>)
    const notifyEditProductSatuan = (namaproduct,qty,indexs) => toast.info(<MsgEditSatuan nama={namaproduct} qty={qty} indexs={indexs}/>)

    const notifyEditProductParcel = (namaproduct,indexs) => toast.info(<MsgEditParcel nama={namaparceltoas} indexs={indexparceltoas}/>)
    

    const addProductSatuan=async(products_id,namaproduct)=>{
        try {
            let addToBE=await Axios.post(`${API_URL_SQL}/transaksi/addtocartproduct`,{
                user_id:Auth.id,
                products_id:products_id,
                parcel_id:0,
                qty:1,
            })
            console.log(addToBE)
            dispatch({type:"CART",cart:addToBE.data})
            notifyAddProductSatuan(namaproduct)
        } catch (error) {
            console.log(error)
        }
    }

    const renderRandomProduct=()=>{
        console.log(randomProduct)
        let render1=randomProduct.productSatuan.map((val,index)=>{
            let unikId=val.id+"satuan"
            return (
                <div style={{
                    paddingRight:10,
                    paddingLeft:10,
                    borderRight:"1px solid whitesmoke",
                    borderLeft:"1px solid whitesmoke",
                    cursor:"pointer",
                    position:"relative",
                    fontSize:14
                }} onMouseEnter={()=>setOverlayProduct(unikId)} onMouseLeave={()=>setOverlayProduct("")}>
                    <div style={{
                        width:"100%",
                        height:"100%",
                        backgroundColor:"rgba(255, 255, 255, 0.5)",
                        position:"absolute",
                        display:overlayProduct==unikId?"flex":"none",
                        justifyContent:"center",
                        alignItems:"center",
                        left:0,
                        animation: "rotateY 500ms ease-in-out forwards",
                        transformOrigin: "top center"
                    }}>
                        <div style={{
                            backgroundColor:"#66b0ff",
                            border:"1px solid whitesmoke",
                            padding:5,
                            width:"50%",
                            borderRadius:5,
                            boxShadow:"0px 0px 15px 1px lighgrey",
                            textAlign:"center",
                            color:"white"
                        }} onClick={()=>addProductSatuan(val.id,val.nama)}>
                            Add
                        </div>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <img src={API_URL_SQL+val.image} alt={val.nama} width={80} height={80}/>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <span style={{
                            textAlign:"center"
                        }}>
                            {val.nama}
                        </span>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"flex-end"
                    }}>
                        <span style={{
                            color:"#fa5a1e",
                            fontWeight:"700"
                        }}>
                            Rp {numeral(val.harga).format('0,0')}
                        </span>
                    </div>
                </div>
            )
        })
        
        let render2=randomProduct.productParcel.map((val,index)=>{
            let link=`/detailparcel/${val.id}`
            let unikId=val.id+"parcel"
            return (
                <div style={{
                    paddingRight:10,
                    paddingLeft:10,
                    borderRight:"1px solid whitesmoke",
                    borderLeft:"1px solid whitesmoke",
                    cursor:"pointer",
                    position:"relative",
                    display:"flex",
                    flexDirection:"column",
                    fontSize:14
                }} onMouseEnter={()=>setOverlayProduct(unikId)} onMouseLeave={()=>setOverlayProduct("")}>
                    <div style={{
                        width:"100%",
                        height:"100%",
                        backgroundColor:"rgba(255, 255, 255, 0.5)",
                        position:"absolute",
                        display:overlayProduct==unikId?"flex":"none",
                        justifyContent:"center",
                        alignItems:"center",
                        left:0,
                        animation: "rotateY 500ms ease-in-out forwards",
                        transformOrigin: "top center"
                    }}>
                        
                            <div style={{
                                backgroundColor:"#66b0ff",
                                border:"1px solid whitesmoke",
                                padding:5,
                                width:"50%",
                                borderRadius:5,
                                boxShadow:"0px 0px 15px 1px lighgrey",
                                textAlign:"center",
                                color:"white"
                            }}>
                                <Link to={link} style={{width:"100%"}}>
                                    <span style={{color:"white",textDecoration:"none"}}>Beli</span>
                                </Link>
                            </div>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <img src={val.gambar} alt={val.nama} width={80} height={80}/>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"center"
                    }}>
                        <span style={{
                            textAlign:"center"
                        }}>
                            {val.nama}
                        </span>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"flex-end"
                    }}>
                        <span style={{
                            color:"#fa5a1e",
                            fontWeight:"700"
                        }}>
                            Rp {numeral(val.harga).format('0,0')}
                        </span>
                    </div>
                </div>
            )
        })
        let final=[render2,render1]
        return final
    }

    //
    const onClickOpenEditParcel=(dataforedit)=>{

        setQtyParcel(dataforedit[0].qty)
        setMessage(dataforedit[0].message)
        setLoadingEdit(true)
        setLoadingEdit2(true)
        setItemEdit(dataforedit)
        getLimitProduct(dataforedit)

        setLoadingEdit(false)
        setShowEdit(!showEdit)        
    }

    // Mengambil limit yg ditentukan di parcel id yg terpakai
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
    
    // Mengambil list product dari kategori yg ada di limit / yang ada di parcel id
    const getProductList=async(arrlimit,dataforedit)=>{

        // dari dataforedit di pindah ke komposisiParcel
        const komposisiparcelnow=dataforedit[1].map((val,index)=>{
            return {
                products_id:val.products_id,
                category:val.category,
                nama:val.namaproduct,
                qty:val.qtyproduct/val.qtyparcel
            }
        })

        setKomposisiParcel(komposisiparcelnow)

        // Mengambil categoryproduct id dari array limit
        const arrCategoryId=arrlimit.map((val,index)=>{
            return val.categoryproduct_id
        })

        

        try {

            // mengambil product dari masing-masing kategori yg digunakan
            const gettobe=await Axios.post(`${API_URL_SQL}/product/getAllProductByCategory/`,{categoryproduct_id:arrCategoryId})
            console.log(gettobe.data)
            setListProduct(gettobe.data)
        } catch (error) {
            console.log(error)
        }
    }

    // Untuk Menentukan Status dari QTY per category apakah limit, 0 atau belum
    const inStatusPerCategory=async()=>{

        // Memilah dari komposisiParcel dijadikan percategory di dalam saring
        let saring=limitProduct.map((val,index)=>{
            let komposisi=komposisiParcel.filter((filtering)=>{

                return filtering.category==val.category
            })

            // Jika ada category yang belum memiliki item sama sekali, maka dibikin qty:0 supaya tidak undefined
            if(komposisi.length==0){
                return [{
                    category:val.category,
                    qty:0
                }]

            // jika ada item di category tersebut, maka langsung di return
            }else{
                return komposisi
            }
        })

        // Menjumlah total qty dari item yg ada di category masing-masing yang terpakai di parcel
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

        // Saatnya ditentukan apakah masing masing kategori sudah kena limit, masih 0 atau belum keduanya.
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


        let isAllLimitFind=letstatusPerCategory.find((filtering)=>{
            return filtering.isAtLimit==false
        })
        if(isAllLimitFind==undefined){
            isAllLimitFind={isAtLimit:true}
        }
        let isAllLimit=isAllLimitFind.isAtLimit
        if(isAllLimit!==false){
            isAllLimit=true
        }
        setIsAllLimit(isAllLimit)

        
    }

    // Render isi parcel di modal edit
    const renderIsiParcel=()=>{
        console.log(statusPerCategory)
        return komposisiParcel.map((val,index)=>{

            // Untuk menentukan status limit, 0 atau belum di + -
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
                        flex:3
                    }}>
                        <h6>- {val.nama} </h6>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        flex:1,

                    }}>
                        <h6>: {val.qty}</h6>
                        <div style={{
                            cursor:"pointer",
                            display:status[0].isAtZero?"none":"inline",
                            fontWeight:"700",
                            fontSize:20,

                        }} onClick={()=>clickMinus(val.nama)}>
                            <AiFillMinusSquare color={"red"} style={{verticalAlign:"0px"}}/>
                        </div>
                        <div style={{
                            cursor:"pointer",
                            display:status[0].isAtLimit?"none":"inline",
                            fontWeight:"700",
                            fontSize:20
                        }}onClick={()=>clickPlus(val.nama,val.category,val.products_id)}>
                            <AiFillPlusSquare color={"#318ae7"} style={{verticalAlign:"0px"}}/>
                        </div>
                    </div>
                </div>
            )
        })
    }

    const clickMinus=(nama)=>{

        let minusInput=komposisiParcel.map((val,index)=>{

            // Jika nama sesuai, maka -1
            if(val.nama==nama){
                return{...val,qty:val.qty-1}
            
            // Jika tidak maka ya udah
            }else{
                return {...val}
            }
        })

        // Menghilangkan yg qty 0
        let deletezero=minusInput.filter((filtering)=>{
            return filtering.qty>0
        })

        setKomposisiParcel(deletezero)
    }
    const clickPlus=(nama,category,products_id)=>{

        let plusInput=komposisiParcel.map((val,index)=>{

            // Jika sesuai maka +1
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

        // Jika belum limit di category produk tersebut dan produk itu tidak ada, maka tambah produk tersebut
        if(!isMax[0].isAtLimit&&isInKomposisi.length===0){
            let newkomposisi={
                products_id:products_id,
                category:category,
                nama:nama,
                qty:1
            }
            plusInput.push(newkomposisi)
        }

        setKomposisiParcel(plusInput)
    }

    // Render product dari kategori yg digunakan
    const renderProductList=()=>{

        if(statusPerCategory){
            return limitProduct.map((val,index)=>{
                let listprod=listProduct.filter((filtering)=>{
                    return filtering.categoryproduct==val.category
                })
    
                let status=statusPerCategory.filter((filtering)=>{
                    return filtering.category==val.category
                })
    
                // Render Product
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
                                <img src={API_URL_SQL+val.image} alt={val.nama} width="100" height="100"/>
                                
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
                                    <AiFillMinusSquare color={"red"}/>
                                </div>
                                <div style={{
                                    cursor:"pointer",
                                    display:status[0].isAtLimit?"none":"inline"
                                }}onClick={()=>clickPlus(val.nama,val.categoryproduct,val.products_id)}>
                                    <AiFillPlusSquare color={"#318ae7"}/>
                                </div>
                                
                            </div>
                            
                        </div>
                    )
                })

                // render row masing masing category
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

    // Render isi cart dropdown
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

    // Render isi cart di cartPage
    const renderCartDetail=()=>{
        let arr1= Auth.cart.transaksidetailsatuan.map((val,index)=>{
            return (
                <div style={{
                    display:"flex",
                    // justifyContent:"space-between",
                    borderBottom:"5px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:100,
                    // backgroundColor:"wheat",
                    height:100
                }}>
                    <div style={{
                        marginRight:10
                    }}>
                        <img src={API_URL_SQL+val.image} width="50" height="50"/>
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
                                    <h6><span style={{color:"#158ae6",cursor:"pointer"}} onClick={(e)=>{
                                        e.preventDefault()
                                        setEditSatuan(!editSatuan)
                                        clickSaveSatuan(val.products_id,val.transaksidetail_id,val.nama,qtySatuan,index)
                                        }}>Save</span>
                                        | 
                                    <span style={{color:"red",cursor:"pointer"}} 
                                    onClick={()=>setEditSatuan()}> Cancel</span></h6>
                                </>
                                :
                                <>
                                    <h6><span style={{color:"#158ae6",cursor:"pointer"}} onClick={()=>{
                                        setItemEdit(val);setQtySatuan(val.qty);setEditSatuan(val.transaksidetail_id)
                                        }}>Edit </span>
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
                    borderBottom:"5px solid #f3f4f5",
                    paddingTop:10,
                    paddingBottom:20,
                    marginBottom:10
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
                        right:30,
                    }}>
                        <div style={{
                            borderBottom:"1px #f3f4f5 solid",
                            cursor:"default",
                            marginBottom:10
                        }}> 
                            <h6><span style={{color:"#158ae6",cursor:"pointer"}} onClick={()=>{setnamaparceltoas(val.nama);setindexparceltoas(index+1);onClickOpenEditParcel(dataforedit)}}>Edit</span> | 
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
    
    const clickSaveSatuan=(products_id,transaksidetail_id,nama,qty,indexs)=>{
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
                notifyEditProductSatuan(nama,qty,indexs)
            }).catch((err)=>{
                console.log(err)
            })
    }
    const onClickSaveParcel=(transaksidetail_id,parcel_id,indexs)=>{
        console.log(komposisiParcel)

        if(!isAllLimit){
            Swal.fire({
                icon: 'error',
                title: 'Sorry',
                text: 'Isi Parcel Belum Penuh!',
                footer: '<a href>Why do I have this issue?</a>'
              })
        }
        else{
            let products_id=komposisiParcel.map((val,index)=>{
                return val.products_id
            })
    
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
                notifyEditProductParcel()
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

    if(!Auth.isLogin){
        return <Redirect to='/' />
    }

    return(
        <div style={{
            display:"flex",
            flexDirection:"column",
            width:"100%",
            maxWidth:2000,
            justifyContent:"center",
        }}>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
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
                        animation: "rotateY 500ms ease-in-out forwards",
                        transformOrigin: "top center"
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
                            {/* <div style={{
                                width:"30%",
                                borderRight:"10px solid #f4f6f8",
                                padding:20
                            }}>
                                <div style={{
                                    padding:10
                                }}>
                                    Transfer
                                </div>
                            </div> */}
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
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {
                                        isDragActive ?
                                            <p>Drop the files here ...</p> :
                                            <p>Drag 'n' drop some files here, or click to select files</p>
                                        }
                                    </div>

                                    {/* <input onChange={(e)=>{console.log(e.target.files);setImage(e.target.files[0])}} type="file"/> */}
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
                        bottom:0,
                        animation: "rotateY 500ms ease-in-out forwards",
                        transformOrigin: "top center"
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
                                    Ganti Qty : <input onChange={(e)=>{
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
                    justifyContent:"flex-end",
                    alignItems:"center",
                    flexBasis:"13%"}}>
                    <div style={{
                        position:"relative",marginRight:10}} onMouseEnter={()=>setShowCart(true)} onMouseLeave={()=>setShowCart(false)}>
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
                                overflowY:"auto",
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
                                    <Scrollbars autoHeight autoHeightMin={Auth.cart.transaksiparcel.length>0||Auth.cart.transaksidetailsatuan.length>0?50:0} 
                                    autoHide autoHeightMax={400}>
                                            
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
                                      
                                    </Scrollbars>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div style={{
                        borderLeft: '1px solid white',
                        paddingLeft:10,
                        marginLeft:10,
                        position:"relative",
                        }}
                        onMouseEnter={()=>setShowMenuUser(true)} onMouseLeave={()=>setShowMenuUser(false)}>
                        <BiUser color="white" size="20" style={{cursor:"pointer"}}/> Halo, {namaPertama(Auth.nama)}
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
                                    borderBottom:"#f3f4f5 solid 1px",
                                    cursor:"pointer"
                                }}onClick={()=>{
                                    localStorage.removeItem("id")
                                    dispatch({type:'LOGOUT'})
                                }}>
                                    <div>Logout</div>
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
                            width:600
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
                                                "Belum ada yang dibeli"
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div style={{
                                    paddingTop:10,
                                    paddingBottom:10,
                                    borderBottom:"5px solid whitesmoke",
                                    borderTop:"5px solid whitesmoke",
                                    marginTop:20
                                    }}>
                                    <div style={{
                                        display:"flex",
                                        justifyContent:"space-between"
                                    }}>
                                        <div>
                                            {
                                                Auth.cart.transaksi.length==1?
                                                    "Tambah juga :"
                                                    :
                                                    "Product :"

                                            }
                                        </div>
                                        <div>
                                            <Link to='/dataproduct'>
                                                <span style={{
                                                    color:"#318ae7",
                                                    fontSize:14,
                                                    cursor:"pointer",
                                                }}>
                                                    Lihat Semua
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                    <Scrollbars autoHeight>
                                        <div style={{
                                            display:"flex",
                                            justifyContent:"space-between",
                                            marginTop:10,
                                            marginBottom:5,
                                            paddingBottom:10
                                        }}>
                                                {renderRandomProduct()}
                                        </div>
                                    </Scrollbars>
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