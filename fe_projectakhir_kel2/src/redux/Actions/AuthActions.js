import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiUrl'

export const LoginThunk=(email,password)=>{
    return (dispatch)=>{
        dispatch({type:'LOADING'})
        Axios.post(`${API_URL_SQL}/auth/login`,{
                email,
                password
            }).then((res)=>{
                    console.log(res.data)
                    localStorage.setItem('id',res.data.datauser.id)
                    dispatch({type:'LOGIN',payload:res.data.datauser,cart:res.data.cart})
            }).catch((err)=>{
                console.log('masuk ke error')
                console.log(err)
                dispatch({type:'Error',payload:err.response.data.message})
            })
    }
}