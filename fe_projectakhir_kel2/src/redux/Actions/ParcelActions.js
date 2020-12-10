import Axios from 'axios'
import {API_URL_SQL} from '../../helpers'

export const loadCategories = () => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            Axios.get(`${API_URL_SQL}/product/getallcatprod`)
            .then((Product_Category)=>{
                Axios.get(`${API_URL_SQL}/product/getallcatparcel`)
                .then((Parcel_Category)=>{
                    Axios.get(`${API_URL_SQL}/product/getallproduct`)
                    .then((Product)=>{
                        Axios.get(`${API_URL_SQL}/parcel/getallparcel`)
                        .then((Parcel)=>{   
                            const data={
                                Product_Category    : Product_Category.data,
                                Parcel_Category     : Parcel_Category.data,
                                Product             : Product.data,
                                Parcel              : Parcel.data
                            };
                            dispatch({type:'LOAD',payload:data});
                        }).catch((error)=>{
                            dispatch({type:'Error',payload:error.response.data.message});
                        })
                    }).catch((error)=>{
                        dispatch({type:'Error',payload:error.response.data.message});
                    });
                }).catch((error)=>{
                    dispatch({type:'Error',payload:error.response.data.message});
                });
            }).catch((error)=>{
                dispatch({type:'Error',payload:error.response.data.message});
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export const setTempParcel = (arr_TempParcel) => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            const data={
                init_Parcel:arr_TempParcel
            }
            // console.log(data)
            dispatch({type:'LOAD',payload:data});
        } catch (error) {
            console.log(error)
            dispatch({type:'ERROR',payload:error.message})
        };
    };
};

export const setReadyParcel = (arr_readyParcel,arr_TempParcel) => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            const data={
                ready_Parcel:arr_readyParcel,
                init_Parcel:arr_TempParcel
            };
            // console.log(data)
            dispatch({type:'LOAD',payload:data})
        } catch (error) {
            console.log(error)
            dispatch({type:'ERROR',payload:error.message})
        };
    };
};

export const uploadParcel = (data) => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            // console.log(data)
            const {nama,harga,categoryparcel_id,gambar,item} = data
            Axios.post(`${API_URL_SQL}/parcel/addparcel`, {
                        nama,
                        harga,
                        categoryparcel_id,
                        gambar,
                        item
                    }).then((result)=>{
                        console.log(result)
                    }).catch((error)=>{
                        dispatch({type:'ERROR',payload:error.response.data.message})
                    });
        } catch (error) {
            console.log(error)
            dispatch({type:'ERROR',payload:error.message})
        };
    };
};

