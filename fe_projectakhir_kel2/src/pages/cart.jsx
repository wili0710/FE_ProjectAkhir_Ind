import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL_SQL } from '../helpers/apiUrl';
import Logo from './../assets/logo.png'
import {BiCart,BiUser} from 'react-icons/bi'
import { Badge } from '@material-ui/core';
import { FullPageLoading } from '../components/loading';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import './cart.css';
import numeral from 'numeral';
import { Button,Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';




const CartPage=()=>{
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()
    const [loading,setLoading]=useState(true)
    const [showCart,setShowCart]=useState(false)
    const [showMenuUser,setShowMenuUser]=useState(false)
    const [showEdit,setShowEdit]=useState(false)

    const toggleModalEdit=()=>setShowEdit(!showEdit)

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
        console.log(final)
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
                        <h6>Jumlah: {val.qty}</h6>
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
                            <h6><span style={{color:"#158ae6",cursor:"pointer"}}>Edit</span> | 
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
        let arr2= Auth.cart.transaksiparcel.map((val,index)=>{
            let detailparcel=Auth.cart.transaksidetailparcel.filter((filtering)=>{
                return filtering.transaksidetail_id==val.transaksidetail_id
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
                            <h6><span style={{color:"#158ae6",cursor:"pointer"}}>Edit</span> | 
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
        console.log(final)
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
                console.log(res.data)
                dispatch({type:'LOGIN',cart:res.data})
                setLoading(false)
                console.log(Auth.cart)
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
            maxWidth:2000,
            justifyContent:"center",
        }}>
            {/* MODAL Edit*/}
            <Modal isOpen={showEdit} toggle={toggleModalEdit}>
                <ModalHeader toggle={toggleModalEdit}>Modal title</ModalHeader>
                <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={toggleModalEdit}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggleModalEdit}>Cancel</Button>
                </ModalFooter>
            </Modal>
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
                                boxShadow:"#f3f4f5 0px 1px 5px 1px",
                                backgroundColor:"white",
                                display:"flex",
                                flexDirection:"column",
                                animation: "growOut 500ms ease-in-out forwards",
                                transformOrigin: "top center"
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
                                boxShadow:"#f3f4f5 0px 1px 5px 1px",
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
                                boxShadow:"#f3f4f5 0px 1px 5px 1px",
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
                                            Rp {numeral(Auth.cart.transaksi[0].totaltransaksi).format('0,0')}
                                        </span>
                                    </div>
                                </div>
                                <div style={{
                                    // backgroundColor:"wheat",
                                    display:"flex",
                                    justifyContent:"center",
                                    marginTop:20
                                }}>
                                    <Button style={{
                                        width:200
                                    }} color="primary">
                                        <span style={{
                                            fontWeight:500
                                        }}>
                                            Beli ({Auth.cart.transaksiparcel.length+Auth.cart.transaksidetailsatuan.length})
                                        </span>
                                    </Button>
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