import React, { Component, useState,useEffect } from 'react';
import { ButtonLoading, FullPageLoading } from './../../component/loading';
import {Backend_Link} from './../helper/Backend_Link'
import Swal from 'sweetalert2';
import Axios from 'axios';
import './register.css'

const Register=(props)=>{

    const [validateemail,setValidateEmail]=useState(null)
    const [email,setEmail]=useState('')
    const [isverified,setIsverified]=useState(false)
    const [loadingregister,setLoadingregister]=useState(false)
    const [loading,setLoading]=useState(true)
    const [newuser,setNewuser]=useState({})
    const [disable,setDisable]=useState(true)
    const [inputOtp,setInputOtp]=useState(false)
    
    useEffect(()=>{
        setLoading(false)
    },[])
    
    const onsendclick=()=>{

    }
    const funcvalidateemail=(e)=>{
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value)){
            setEmail(e.target.value)
            return setValidateEmail(true)
        }
        return setValidateEmail(false)
    }
    const sentOtp=()=>{
        Axios.post(`${Backend_Link}/auth/s_r_otp`,{email:email})
        .then((res)=>{
            setInputOtp(true)
        }).catch((err)=>{
            console.log(err)
        })

    }
    const rendercekemail=()=>{
        if(loadingregister===true){
            return(
                <div className='d-flex flex-column mt-1'>
                    <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}}/>
                    <span className='my-2'>Contoh : email@parcelita.com</span>
                    <button disabled className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px',fontSize:'20px',backgroundColor:'lightgrey',cursor: 'pointer', color:'white'}}>{ButtonLoading(loadingregister,10,'#0095DA')}</button>
                </div>
            )
        }
        if(validateemail===true){
            if(inputOtp===true){
                return(
                    <div className='d-flex flex-column mt-1'>
                        <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}} disabled/>
                        <span style={{fontSize:12}} className='my-2'>OTP Berhasil di kirim ke {email}</span>
                        <input type="text" className="form-control my-2" placeholder="Masukkan OTP" style={{transition:'500ms'}} />
                        <button onClick={()=>onsendclick()} className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#0095DA",fontSize:'20px',cursor: 'pointer', color:'white'}}>Daftar</button>
                    </div>
                )
            }
            return(
                <div className='d-flex flex-column mt-1'>
                    <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}}/>
                    <span style={{cursor:"pointer",color:"blue"}} className='my-2' onClick={sentOtp}>Verify dengan OTP</span>
                    <button className='p-2' disabled style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#e5e7e9",fontSize:'20px',cursor:'not-allowed'}}>Daftar</button>
                </div>
            )
        }
        if(validateemail===false){
            return(
                <div className='d-flex flex-column mt-1'>
                    <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms',border:'1px solid red',boxShadow:'0 0 2px 2px #FF5567'}}/>
                    <span className='my-2' style={{color:'red'}}>Format Email Salah</span>
                    <button className='p-2' disabled style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#e5e7e9",fontSize:'20px',cursor:'not-allowed'}}>Daftar</button>
                </div>
            )
        }
        return(
            <div className='d-flex flex-column mt-1'>
                <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}}/>
                <span className='my-2'>Contoh : email@parcelita.com</span>
                <button className='p-2' disabled style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#e5e7e9",fontSize:'20px',cursor:'not-allowed'}}>Daftar</button>
            </div>
        )
    }

    if(loading){
        return(
            <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                {FullPageLoading(loading,100,'#0095DA')}
            </div>
        )
    }
    return(
        <div className='d-flex justify-content-center'>
                {email && isverified?
                    <div style={{position:'fixed',zIndex:-1,width:'100vw',height:'100vh'}} className='d-flex justify-content-end align-items-end'>
                        <img src={`${Backend_Link}/frontend/img2png.png`} height='70%'/>
                    </div>
                    :
                    null
                }
            <div className='d-flex align-items-center flex-column' style={{width:'1200px'}}>
                <div className='my-3'>
                    <h1 className="logociptalapak">
                        Parcelita
                    </h1>
                </div>
                {email && isverified?
                        <div className='mx-4' style={{
                            width:'50%', 
                            // backgroundColor:'lightblue'
                            }}>
                            <div className='d-flex flex-column align-items-center mx-5 py-3' style={{backgroundColor:'white',border:'1px solid #E5E7E7',borderRadius:"5px",boxShadow:"0 0 10px 1px #E5E7E7"}}>
                                <h5 className='mt-3'>Mendaftar dengan Email:</h5>
                                <h5>{email}</h5>
                                <a href='/register'><span className='mb-3' style={{fontWeight:'lighter'}}><span style={{color:"#0095DA",fontWeight:'bold',cursor:'pointer'}} onClick={()=>{localStorage.removeItem('tokenregistrasi');setEmail('')}}>Pakai Email lain</span></span></a>
                                <form className='pt-3' style={{width:'80%', borderTop:'2px solid #E5E7E7'}}>
                                    <span>Username :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,username:e.target.value})}/>
                                    <span>Nama :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,nama:e.target.value})}/>
                                    <span>Password :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,password:e.target.value})}/>
                                    <span>Password Konfirmasi :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,passwordkon:e.target.value})}/>
                                    <span>Nomor Handphone :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,nomorhandphone:e.target.value})}/>
                                    <span>Kota :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,city_id:e.target.value})}/>
                                    <span>Alamat Lengkap :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,alamatlengkap:e.target.value})}/>

                                    {disable===true?
                                        <button disabled className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"lightgrey",fontSize:'20px',cursor:'not-allowed', color:'white'}}>Bikin Akun</button>
                                        :
                                        <button onClick={(e)=>{e.preventDefault();console.log(newuser)}} className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#0095DA",fontSize:'20px',cursor: 'pointer', color:'white'}}>Bikin Akun</button>
                                    }

                                </form>
                                <span className='mt-3' style={{fontSize:'14px', fontWeight:'lighter'}}>Dengan mendaftar, saya menyetujui</span>
                                <span className='mb-4' style={{fontSize:'14px', fontWeight:'lighter'}}><span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Syarat dan Ketentuan</span> serta <span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Kebijakan Privasi</span></span>
                            </div>
                        </div>
                        :
                        <div className='d-flex py-5' style={{width:'100%', borderTop:'1px solid #E5E7E7'}}>
                            <div className='d-flex flex-column align-items-center mx-4' style={{width:'50%'}}>
                                <img src={`${Backend_Link}/frontend/img2png.png`} alt="Belanja Online" width='90%' style={{borderRadius:"20px"}}/>
                                <span className='my-4' style={{fontSize:'25px',textAlign:"center"}}>Ingin Mengirimkan Parcel Custom? <br/> Serahkan Pada Kami</span>
                            </div>
                            
                            <div className='mx-4' style={{
                                width:'50%', 
                                // backgroundColor:'lightblue'
                                }}>
                                <div className='d-flex flex-column align-items-center mx-5 py-3' style={{border:'1px solid #E5E7E7',borderRadius:"5px",boxShadow:"0 0 10px 1px #E5E7E7"}}>
                                    <h4 className='mt-3'>Daftar Sekarang</h4>
                                    <span className='mb-3' style={{fontWeight:'lighter'}}>Sudah punya akun? <span style={{color:"#0095DA",fontWeight:'bold',cursor:'pointer'}}>Masuk</span></span>
                                    <form className='pt-3' style={{width:'80%', borderTop:'2px solid #E5E7E7'}}>
                                        <span>Email :</span>
                                        {rendercekemail()}
                                    </form>
                                    <span className='mt-3' style={{fontSize:'14px', fontWeight:'lighter'}}>Dengan mendaftar, saya menyetujui</span>
                                    <span className='mb-4' style={{fontSize:'14px', fontWeight:'lighter'}}><span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Syarat dan Ketentuan</span> serta <span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Kebijakan Privasi</span></span>
                                </div>
                            </div>
                            
                        </div>
                }
                <div className='p-1' style={{width:'1200px',borderTop:'1px solid lightgrey',position:"fixed",bottom:0,paddingBottom:10, backgroundColor:"white"}}>
                    <span style={{fontSize:'14px'}}>© 2020, Parcelita</span>
                </div>
            </div>
        </div>
    )
}
 
export default Register;