import React, { Component, useState,useEffect } from 'react';
import { ButtonLoading, FullPageLoading } from '../../components/loading';
import {API_URL_SQL} from './../../helpers/apiUrl'
import Swal from 'sweetalert2';
import Axios from 'axios';
import './register.css'
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import {useSelector,useDispatch} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import { ModalResetPassword } from '../../components/modalresetpassword';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Logo from './../../assets/logoblue.png'


const Register=(props)=>{

    const Auth=useSelector(state=>state.Auth) 
    const dispatch=useDispatch()

    const [validateemail,setValidateEmail]=useState(null)
    const [email,setEmail]=useState('')
    const [isverified,setIsverified]=useState(false)
    const [loadingregister,setLoadingregister]=useState(false)
    const [loading,setLoading]=useState(true)
    const [newuser,setNewuser]=useState({})
    const [disable,setDisable]=useState(true)
    const [inputOtp,setInputOtp]=useState(false)
    const [timeoutOption,setTimeoutOption]=useState(false)
    const [isOtpSent,setIsOtpSent]=useState(false)
    const [isOtpDone,setIsOtpDone]=useState(false)
    const [otp,setOtp]=useState('')
    const [seePassword,setSeePassword]=useState(false)
    const [isPasswordPass, setIsPasswordPass]=useState(true)
    const [showResetPassword,setShowResetPassword]=useState(false)
    
    useEffect(()=>{
        if(localStorage.getItem('registrasi')){
            setEmail(localStorage.getItem('registrasi'))
        }
        // if(localStorage.getItem('verified')){
        //     setIsverified(localStorage.getItem('verified'))
        // }
        setLoading(false)
    },[])
    useEffect(()=>{
        console.log(newuser)
        if(newuser.nama===""){
            delete newuser.nama
        }
        if(newuser.password===""){
            delete newuser.password
        }
        if(newuser.nomorhandphone===""){
            delete newuser.nomorhandphone
        }
        if(newuser.alamatlengkap===""){
            delete newuser.alamatlengkap
        }
       
        console.log((Object.entries(newuser)).length)
        if((Object.entries(newuser)).length >=4) {
            return setDisable(false)
        }
        setDisable(true)
    },[newuser])

    const passwordCheck=(e)=>{
        console.log(e.target.value)

        let upperCaseLetters = /[A-Z]/g
        let numbers = /[0-9]/g;
        
        
        if (e.target.value.match(upperCaseLetters) && e.target.value.match(numbers) && e.target.value.length>6){
            setNewuser({...newuser,password:e.target.value})
            console.log("true")
            console.log(isPasswordPass)
            setIsPasswordPass(true)
        }
        else{
            console.log("false")
            setNewuser({...newuser,password:''})
            setIsPasswordPass(false)
        }
    }
    const renderInputPassword=()=>{
        if(seePassword){
            return(
                <>
                    <span>Password : </span> <AiFillEye size={20} style={{color:"#0095DA",cursor:"pointer",position:"relative", top:30,left:290}} onClick={()=>setSeePassword(false)}/>
                    <input className='form-control' style={{
                        transition:'500ms',
                        border:!isPasswordPass?'1px solid red':null,
                        boxShadow:!isPasswordPass?'0 0 2px 2px #FF5567':null
                    }}  type='text' onChange={(e)=>passwordCheck(e)}/>
                    {
                        !isPasswordPass?
                            <span style={{display:"inline-block", margin:5, fontSize:12}}>* Password harus ada angka, minimal 6, huruf besar dan kecil</span>
                            :
                            null
                    }
                </>
            )
        }else{
            return(
                <>
                    <span>Password :</span> <AiFillEyeInvisible size={20} style={{cursor:"pointer",position:"relative", top:30,left:290}} onClick={()=>setSeePassword(true)}/>
                    <input className='form-control' style={{
                        transition:'500ms',
                        border:!isPasswordPass?'1px solid red':null,
                        boxShadow:!isPasswordPass?'0 0 2px 2px #FF5567':null
                    }} type='password' onChange={(e)=>passwordCheck(e)}/>
                    {
                        !isPasswordPass?
                            <span style={{display:"block", margin:5, fontSize:12}}>* Password harus ada angka, minimal 6, huruf besar dan kecil</span>
                            :
                            null
                    }
                </>
            )
        }
    }

    const onsendclick=()=>{
        setLoadingregister(true)
        Axios.post(`${API_URL_SQL}/auth/c_otp`,{email:email,otp:otp})
        .then((res)=>{
            console.log(res)
            if(res.data=="OTP Expired"){
                Swal.fire({
                    icon: 'error',
                    title: 'OTP Expired',
                    text: 'OTP Expired!'                    
                })
                setLoadingregister(false)
            }else if(res.data=="OTP SALAH"){
                Swal.fire({
                    icon: 'error',
                    title: 'OTP Salah',
                    text: 'OTP Salah!'                    
                })
                setLoadingregister(false)
            }else{
                setIsverified(true)
                localStorage.setItem("registrasi",email)
                // localStorage.setItem("verified",true)
                setLoadingregister(false)
            }
        }).catch((err)=>{
            console.log(err)
        })
    }
    const funcvalidateemail=(e)=>{
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value)){
            setEmail(e.target.value)
            return setValidateEmail(true)
        }
        return setValidateEmail(false)
    }
    const changeOtp=(e)=>{
        if (e.target.value){
            console.log(e.target.value)
            setOtp(e.target.value)
            return setIsOtpDone(true)
        }else{
            return setIsOtpDone(false)
        }
    }
    const sentOtp=()=>{
        setIsOtpSent(true)
        Axios.post(`${API_URL_SQL}/auth/s_r_otp`,{email:email})
        .then((res)=>{
            console.log(res)
            if(res.data.isnext===false){
                setIsOtpSent(false)
                Swal.fire({
                    icon: 'error',
                    title: 'Email Sudah Terdaftar',
                    text: 'Email sudah terdaftar. Silakan login'
                  })
            }else{
                setInputOtp(true)
                setIsOtpSent(false)
                setOtp("")
            }
        }).catch((err)=>{
            console.log(err)
        })
    }

    const onClickNewUser=(e)=>{
        e.preventDefault()
        console.log("jalan")
        Axios.post(`${API_URL_SQL}/auth/register`,{email:email,password:newuser.password,nama:newuser.nama,alamat:newuser.alamatlengkap,nomortelfon:newuser.nomorhandphone})
        .then((res)=>{
            console.log(res)
            Swal.fire(
                'Berhasil Terdaftar!',
                'Ingin mengirimkan Parcel Custom? Serahkan pada kami!',
                'success'
            )
            dispatch({type:'LOGIN',payload:res.data,cart:{transaksi:[],transaksiparcel:[],transaksidetailsatuan:[],transaksidetailparcel:[]}})
            localStorage.setItem('id',res.data.id)
            localStorage.removeItem("registrasi")
            localStorage.removeItem("verified")
        }).catch((err)=>{
            console.log(err)
        })
    }
    const timeout=()=>{
        setTimeout(()=>{
            setTimeoutOption(true)
        },7000)
    }
    const rendercekemail=()=>{
        if(loadingregister===true){
            return(
                <div className='d-flex flex-column mt-1' style={{alignItems:"center"}}>
                    {ButtonLoading(loadingregister,10,'#0095DA')}
                </div>
            )
        }
        if(validateemail===true){
            if(inputOtp===true){
                return(
                    <div className='d-flex flex-column mt-1'>
                        <span>Email :</span>
                        <input disabled type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}} defaultValue={email}/>
                        <span style={{fontSize:12}} className='my-2'>OTP Berhasil di kirim ke {email}</span>
                        <input type="text" className="form-control my-2" onChange={(e)=>changeOtp(e)} placeholder="Masukkan OTP" style={{transition:'500ms'}} />
                        {timeout()}
                        {timeoutOption?
                            <div style={{marginBottom:10}}>
                                <span 
                                    className='my-2' onClick={()=>{setInputOtp(false);setTimeoutOption(false);sentOtp()}}
                                    style={{
                                        cursor:"pointer",
                                        color:"blue"
                                }}>
                                    Sent OTP Lagi
                                </span>
                                <span style={{cursor:"default"}}> - </span>
                                <span 
                                    className='my-2' onClick={()=>{setInputOtp(false);setTimeoutOption(false)}}
                                    style={{
                                        cursor:"pointer",
                                        color:"blue"
                                }}>
                                    Ganti Email
                                </span>
                            </div>
                            :
                            <span style={{marginBottom:10,cursor:"default"}}>
                                Mau ganti Email atau Sent OTP lagi ? Tunggu ya
                            </span>  
                        }
                        {isOtpDone?
                            <button onClick={()=>onsendclick()} className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#0095DA",fontSize:'20px',cursor: 'pointer', color:'white'}}>Daftar</button>
                            :
                            <button disabled onClick={()=>onsendclick()} className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#e5e7e9",fontSize:'20px',cursor: 'pointer', color:'white'}}>Daftar</button>
                        }
                    </div>
                )
            }
            return(
                <div className='d-flex flex-column mt-1'>
                    <span>Email :</span>
                    <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}}/>
                    {
                        isOtpSent?
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <span style={{cursor:"not-allowed",color:"blue"}} className='my-2'>Verify dengan OTP</span>
                            <span style={{cursor:"not-allowed",color:"blue"}} className='my-2'>Sudah Ada OTP</span>
                        </div>
                        :
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <span style={{cursor:"pointer",color:"blue"}} className='my-2' onClick={sentOtp}>Verify dengan OTP </span>
                            <span style={{cursor:"pointer",color:"blue"}} className='my-2' onClick={()=>setInputOtp(true)}>Sudah Ada OTP</span>
                        </div>
                    }
                    <button className='p-2' disabled style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#e5e7e9",fontSize:'20px',cursor:'not-allowed'}}>Daftar</button>
                </div>
            )
        }
        if(validateemail===false){
            return(
                <div className='d-flex flex-column mt-1'>
                    <span>Email :</span>
                    <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms',border:'1px solid red',boxShadow:'0 0 2px 2px #FF5567'}}/>
                    <span className='my-2' style={{color:'red'}}>Format Email Salah</span>
                    <button className='p-2' disabled style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#e5e7e9",fontSize:'20px',cursor:'not-allowed'}}>Daftar</button>
                </div>
            )
        }
        return(
            <div className='d-flex flex-column mt-1'>
                <span>Email :</span>
                <input type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}}/>
                <span className='my-2'>Contoh : email@hearttoheart.com</span>
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
    if(Auth.isLogin){
        return <Redirect to='/' />
    }
    return(
        <div className='d-flex justify-content-center'>

            {/* Modal Reset Password */}
            {
                Auth.isResetPass?
                <div style={{
                    height:"100%",
                    width:"100%",
                    backgroundColor:"rgba(0, 0, 0, 0.5)",
                    position:"fixed",
                    zIndex:2,
                    top:0
                }}>
                    {/* <div style={{
                        backgroundColor:"white",
                        width:"fit-content",
                        height:"fit-content",
                        display:"flex",
                        flexDirection:"column",
                        borderRadius:100,
                        position:"fixed",
                        zIndex:5,
                        margin: "auto", 
                        left: 0,
                        right: -550,
                        top:-150,
                        bottom:0,
                        animation: "rotateY 500ms ease-in-out forwards",
                        transformOrigin: "top center",
                        cursor:"pointer"
                    }} onClick={()=>dispatch({type:'RESETPASS',payload:!Auth.isResetPass})}>
                        <AiOutlineCloseCircle size={40}/>
                    </div> */}
                    <ModalResetPassword/>
                </div>
                :
                null
            }
            {/* End Modal Reset password */}
                {email && isverified?
                    <div style={{position:'fixed',zIndex:-1,width:'100vw',height:'100vh'}} className='d-flex justify-content-end align-items-end'>
                        <img src={`${API_URL_SQL}/frontend/img2png.png`} height='70%'/>
                    </div>
                    :
                    null
                }
            <div className='d-flex align-items-center flex-column' style={{width:'1200px'}}>
                <div className='my-3'>
                    <Link to="/">
                        <img src={Logo} width={200}/>
                    </Link>
                </div>
                {email && isverified?
                        <div className='mx-4' style={{
                            width:'50%', 
                            // backgroundColor:'lightblue'
                            }}>
                            <div className='d-flex flex-column align-items-center mx-5 py-3' style={{backgroundColor:'white',border:'1px solid #E5E7E7',borderRadius:"5px",boxShadow:"0 0 10px 1px #E5E7E7"}}>
                                <h5 className='mt-3'>Mendaftar dengan Email:</h5>
                                <h5>{email}</h5>
                                <a href='/register'><span className='mb-3' style={{fontWeight:'lighter'}}><span style={{color:"#0095DA",fontWeight:'bold',cursor:'pointer'}} onClick={()=>{localStorage.removeItem('registrasi');localStorage.removeItem('verified')}}>Pakai Email lain</span></span></a>
                                <form className='pt-3' style={{width:'80%', marginTop:10, borderTop:'2px solid #E5E7E7'}}>
                                    <span>Nama :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,nama:e.target.value})}/>
                                    {renderInputPassword()}
                                    
                                    <span>Nomor Handphone :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,nomorhandphone:e.target.value})}/>
                                    <span>Alamat Lengkap :</span>
                                    <input className='form-control' type='text' onChange={(e)=>setNewuser({...newuser,alamatlengkap:e.target.value})}/>

                                    {disable===true?
                                        <button disabled className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"lightgrey",fontSize:'20px',cursor:'not-allowed', color:'white',marginTop:10}}>Bikin Akun</button>
                                        :
                                        <button onClick={(e)=>onClickNewUser(e)} className='p-2' style={{transition:'1000ms',border:'0px', borderRadius:'5px', backgroundColor:"#0095DA",fontSize:'20px',cursor: 'pointer', color:'white',marginTop:10}}>Bikin Akun</button>
                                    }

                                </form>
                                <span className='mt-3' style={{fontSize:'14px', fontWeight:'lighter'}}>Dengan mendaftar, saya menyetujui</span>
                                <span className='mb-4' style={{fontSize:'14px', fontWeight:'lighter'}}><span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Syarat dan Ketentuan</span> serta <span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Kebijakan Privasi</span></span>
                            </div>
                        </div>
                        :
                        <div className='d-flex py-5' style={{width:'100%', borderTop:'1px solid #E5E7E7'}}>
                            <div className='d-flex flex-column align-items-center mx-4' style={{width:'50%'}}>
                                <img src={`${API_URL_SQL}/frontend/img2png.png`} alt="Belanja Online" width='90%' style={{borderRadius:"20px"}}/>
                                <span className='my-4' style={{fontSize:'25px',textAlign:"center"}}>Ingin Mengirimkan Parcel Custom? <br/> Serahkan Pada Kami!</span>
                            </div>
                            
                            <div className='mx-4' style={{
                                width:'50%', 
                                // backgroundColor:'lightblue'
                                }}>
                                <div className='d-flex flex-column align-items-center mx-5 py-3' style={{border:'1px solid #E5E7E7',borderRadius:"5px",boxShadow:"0 0 10px 1px #E5E7E7"}}>
                                    <h4 className='mt-3'>Daftar Sekarang</h4>
                                    <span className='mb-3' style={{fontWeight:'lighter'}}>Sudah punya akun? <Link to="/login"><span style={{color:"#0095DA",fontWeight:'bold',cursor:'pointer'}}>Masuk</span></Link></span>
                                    <form className='pt-3' style={{width:'80%', borderTop:'2px solid #E5E7E7'}}>
                                        {rendercekemail()}
                                    </form>
                                    <span className='mt-3' style={{fontSize:'14px', fontWeight:'bold', cursor:"pointer",color:"#30a9e1"}} onClick={()=>{dispatch({type:'RESETPASS',payload:!Auth.isResetPass})}}>Reset Password</span>
                                    <span className='mt-3' style={{fontSize:'14px', fontWeight:'lighter'}}>Dengan mendaftar, saya menyetujui</span>
                                    <span className='mb-4' style={{fontSize:'14px', fontWeight:'lighter'}}><span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Syarat dan Ketentuan</span> serta <span style={{color:"#0095DA",fontWeight:'500',cursor:'pointer'}}>Kebijakan Privasi</span></span>
                                </div>
                            </div>
                            
                        </div>
                }
                <div className='p-1' style={{width:'1200px',borderTop:'1px solid lightgrey',position:"fixed",bottom:0,paddingBottom:10, backgroundColor:"white"}}>
                    <span style={{fontSize:'14px'}}>© 2020, hearttoheart</span>
                </div>
            </div>
        </div>
    )
}
 
export default Register;