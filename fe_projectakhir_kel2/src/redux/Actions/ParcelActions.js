import Axios from 'axios'
import { compose } from 'redux';
import {API_URL_SQL} from '../../helpers'

const pushitem =(parcel,item)=>{
    try {
    for(let i = 0; i < item.length; i++){
        for(let k=0; k < item[i].length; k++){
            if(parcel[parcel.findIndex((val=>val.id===item[i][k].parcel_id))].item) {
                let items=parcel[parcel.findIndex((val=>val.id===item[i][k].parcel_id))].item;
                items.push(item[i][k])
                parcel[parcel.findIndex((val=>val.id===item[i][k].parcel_id))].item=items;
            }else{
                parcel[parcel.findIndex((val=>val.id===item[i][k].parcel_id))].item=[item[i][k]];
            };
        };
    };
    }catch(error){
        console.log(error)
    }
    return parcel;
};

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
                                Parcel              : pushitem(Parcel.data.allparcel,Parcel.data.item)
                            };
                            dispatch({type:'LOAD',payload:data});
                        }).catch((error)=>{
                            console.log(error);
                            dispatch({type:'Error',payload:"error process D"});
                        })
                    }).catch((error)=>{
                        console.log(error);
                        dispatch({type:'Error',payload:"error process C"});
                    });
                }).catch((error)=>{
                    console.log(error);
                    dispatch({type:'Error',payload:"error process B"});
                });
            }).catch((error)=>{
                console.log(error);
                dispatch({type:'Error',payload:"error process A"});
            });
        } catch (error) {
            console.log(error);
        };
    };
};

export const setTempParcel = arr_TempParcel => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            const data={
                init_Parcel:arr_TempParcel
            };
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
            dispatch({type:'LOAD',payload:data})
        } catch (error) {
            console.log(error)
            dispatch({type:'ERROR',payload:error.message})
        };
    };
};

export const uploadParcel = data => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            const {nama,harga,categoryparcel_id,gambar,item} = data
            Axios.post(`${API_URL_SQL}/parcel/addparcel`, {
                        nama,
                        harga,
                        categoryparcel_id,
                        gambar,
                        item
                    }).then((result)=>{
                        const data = {
                            Parcel : pushitem(result.data.allparcel,result.data.item)
                        };
                        dispatch({type:'LOAD',payload:data});
                    }).catch((error)=>{
                        dispatch({type:'ERROR',payload:error.message})
                    });
        } catch (error) {
            console.log(error);
            dispatch({type:'ERROR',payload:error.message});
        };
    };
};

export const deleteParcel = id => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            Axios.post(`${API_URL_SQL}/parcel/deleteparcel`, {id})
            .then((result)=>{
                const data = {
                    Parcel : pushitem(result.data.allparcel,result.data.item)
                };
                dispatch({type:'LOAD',payload:data});
            }).error((error)=>{
                dispatch({type:'ERROR',payload:"delete parcel error A"});
            });
        } catch (error) {
            dispatch({type:'ERROR',payload:"delete parcel error on main"});
        };
    };
};

export const addtoTransaction = data => {
    return (dispatch) => {
        console.log(data.user_id)
        dispatch({type:'LOADING'});
        try {
            Axios.get(`${API_URL_SQL}/transaksi/getcart?user_id=${data.user_id}`)
            .then((result)=>{
                // console.log(result.data)
                Axios.post(`${API_URL_SQL}/transaksi/addtocart`,data)
                .then((res2)=>{
                    // console.log(res2.data)
                    return res2.data
                }).catch((error)=>{
                    console.log(error)
                })
            }).catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            dispatch({type:'ERROR',payload:"delete parcel error on main"});
        };
    };
};

export const updateParcel = data => {
    return (dispatch) => {
        console.log('jalan nij')
        const {
            id,
            nama,
            harga,
            categoryparcel_id,
            gambar,
            item
        }=data;
        dispatch({type:'LOADING'});
        try {
            Axios.post(`${API_URL_SQL}/parcel/updateparcel`,{
                id,
                nama,
                harga,
                categoryparcel_id,
                gambar,
                item
            }).then((result)=>{
                const data = {
                    Parcel : pushitem(result.data.allparcel,result.data.item)
                };
                dispatch({type:'LOAD',payload:data});
                console.log('udah diload')
            }).catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        };
    };
};