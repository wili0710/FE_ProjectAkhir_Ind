import Axios from 'axios'
import {API_URL_SQL} from '../../helpers'

export const loadCategories = () => {
    return (dispatch) => {
        dispatch({type:'LOADING'});
        try {
            Axios.get(`${API_URL_SQL}/product/getallcatprod`)
            .then((category_products)=>{
                Axios.get(`${API_URL_SQL}/product/getallcatparcel`)
                .then((category_parcel)=>{
                    const data={
                        Product_Category:category_products.data,
                        Parcel_Category:category_parcel.data
                    };
                    dispatch({type:'LOAD',payload:data});
                }).catch((error)=>{
                    dispatch({type:'Error',payload:error.response.data.message})
                });
            }).catch((error)=>{
                dispatch({type:'Error',payload:error.response.data.message})
            });
        } catch (error) {
            console.log(error)
        }
    }
}