import Axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'reactstrap';
import Swal from 'sweetalert2';
import { API_URL_SQL } from '../helpers/apiUrl';
import { AiFillEye,AiFillEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export const ModalResetPassword=()=>{
    const [validateemail,setValidateEmail]=useState(null)
    const [email,setEmail]=useState()
    const [inputOtp,setInputOtp]=useState()
    const [isOtpSent,setIsOtpSent]=useState()
    const [otp,setOtp]=useState()
    const [isOtpDone,setIsOtpDone]=useState(false)
    const [isVerified,setIsverified]=useState(false)
    const [seePassword,setSeePassword]=useState(false)
    const [isPasswordPass, setIsPasswordPass]=useState(false)
    const [password,setPassword]=useState()
    const [disableAll,setDisableAll]=useState(false)


    const resetPassword=async()=>{
        try {
            const finallyreset=await Axios.post(`${API_URL_SQL}/auth/resetpassword`,{email:email,password:password})
            setDisableAll(true)
            Swal.fire(
                'Berhasil!',
                'Silakan login dengan password baru!',
                'success'
              )
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Silakan Coba Lagi'
              })
            console.log(error)
        }
    }

    const passwordCheck=(e)=>{
        console.log(e.target.value)

        let upperCaseLetters = /[A-Z]/g
        let numbers = /[0-9]/g;
        
        
        if (e.target.value.match(upperCaseLetters) && e.target.value.match(numbers) && e.target.value.length>6){
            setPassword(e.target.value)
            console.log("true")
            console.log(isPasswordPass)
            setIsPasswordPass(true)
        }
        else{
            console.log("false")
            setPassword("")
            setIsPasswordPass(false)
        }
    }
    const renderInputPassword=()=>{
        if(disableAll){
            return(
                <>
                    <span>Password :</span> <AiFillEyeInvisible size={20} style={{cursor:"pointer",position:"relative", top:30,left:290}} onClick={()=>setSeePassword(true)}/>
                    <input disabled className='form-control' style={{
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
    const funcvalidateemail=(e)=>{
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(e.target.value)){
            setEmail(e.target.value)
            return setValidateEmail(true)
        }
        return setValidateEmail(false)
    }

    const onsendclick=()=>{
        Axios.post(`${API_URL_SQL}/auth/c_otp`,{email:email,otp:otp})
        .then((res)=>{
            console.log(res)
            if(res.data=="OTP Expired"){
                Swal.fire({
                    icon: 'error',
                    title: 'OTP Expired',
                    text: 'OTP Expired!'                    
                })

            }else if(res.data=="OTP SALAH"){
                Swal.fire({
                    icon: 'error',
                    title: 'OTP Salah',
                    text: 'OTP Salah!'                    
                })

            }else{
                setIsverified(true)
            }
        }).catch((err)=>{
            console.log(err)
        })
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
        Axios.post(`${API_URL_SQL}/auth/resetpassword_otp`,{email:email})
        .then((res)=>{
            console.log(res)
            setInputOtp(true)
            setIsOtpSent(false)
            setOtp("")
            
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    return(
        <div style={{
            backgroundColor:"white",
            width:"30%",
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
                    justifyContent:"space-between",
                    borderBottom:"10px solid whitesmoke"
                }}>
                    <h3>Reset Password</h3>
                </div>
                <div>
                    Masukkan Email:
                    <input disabled={disableAll?true:false} type='email' className="form-control" onChange={(e)=>funcvalidateemail(e)} style={{transition:'500ms'}}/>
                    {validateemail && !inputOtp?
                        <span style={{
                            cursor:isOtpSent?"not-allowed":"pointer",
                            color:"blue"}} 
                            className='my-2' onClick={sentOtp}>
                                Verify dengan OTP 
                        </span>
                        :
                        null
                    }
                    {inputOtp?
                        <>
                            <span style={{fontSize:12}} className='my-2'>OTP Berhasil di kirim ke {email}</span>
                            <input disabled={disableAll?true:false} type="text" className="form-control my-2" onChange={(e)=>changeOtp(e)} placeholder="Masukkan OTP" style={{transition:'500ms'}} />
                            {isOtpDone&&!isVerified?
                                <span style={{
                                    cursor:isOtpSent?"not-allowed":"pointer",
                                    color:"blue"}} 
                                    className='my-2' onClick={onsendclick}>
                                        Confirm OTP
                                </span>
                                :
                                null
                            }
                        </>
                        :
                        null
                    }
                    {isVerified?
                    <>
                        {renderInputPassword()}
                    </>
                    :
                    null
                    }
                </div>
                <div style={{padding:5}}>
                    {disableAll?
                    <Link to="/login">
                        <Button color="primary"> Login </Button>
                    </Link>
                        :
                    <Button disabled={isPasswordPass?false:true} color="primary" onClick={()=>resetPassword()}> Save </Button>
                    }
                </div>
            </div>
        </div>

    )
}


