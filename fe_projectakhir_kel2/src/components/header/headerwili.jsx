import React, { useState } from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import {BiCart,BiUser} from 'react-icons/bi'
import { Badge } from '@material-ui/core';
import numeral from 'numeral';
import { API_URL_SQL, HOME_URL } from '../../helpers/apiUrl';
import Logo from './../../assets/logo.png'
import Scrollbars from 'react-custom-scrollbars';
import { namaPertama } from '../../helpers/namapertama';

const HeaderWili=()=>{


    const [showCart,setShowCart]=useState(false)
    const [showMenuUser,setShowMenuUser]=useState(false)    
    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()

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

    return(
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
                <Link to="/">
                    <img src={Logo} alt="logo" width="145px" color="black"/>
                </Link>
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
                                window.location.assign(`${HOME_URL}`)
                            }}>
                                <div>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HeaderWili