import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiUrl'
import Swal from 'sweetalert2';
export const LoginFunc =(obj,cart)=>{
    return {
        type:'LOGIN',
        payload:obj,
        cart:cart
    }
}

export const AddcartAction=(cart)=>{
    return{
        type:'CART',
        cart:cart
    }    
}

export const LogoutFunc=()=>{
    return {
        type:'LOGOUT'
    }
}

export const LoginThunk=(email,password)=>{
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.post(`${API_URL_SQL}/auth/newlogin`,{
                email,
                password
            }).then((res)=>{
                console.log('new keep login berhasil')
                    localStorage.setItem('id',res.data[0].user[0].id)
                    dispatch({type:'LOGIN',payload:res.data[0].user[0],cart:res.data[1]})
            }).catch((err)=>{
                Swal.fire({
                    icon: 'error',
                    title: 'Wrong Password/Email',
                    text: 'Check Kembali Data Anda'                    
                })  
                console.log('masuk ke error')
                console.log(err)
                dispatch({type:'Error',payload:err.message})
            })
    }
}

export const ShowResetPass=(condition)=>{
    return{
        type:"RESETPASS",
        payload:condition
    }
}