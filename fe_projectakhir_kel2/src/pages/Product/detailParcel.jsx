import React, { Component } from 'react';
import './detailParcel.css'
import Header from './../../components/header/header'
import Axios from 'axios'
import { API_URL_SQL } from '../../helpers/apiUrl';
import {BsFillCaretLeftFill} from 'react-icons/bs'
import { Window } from '@progress/kendo-react-dialogs';
 // ES2015 module syntax
 import Parcel1 from './../../assets/parcel1.jpg'
 import { Button, ButtonGroup, DropDownButton, DropDownButtonItem,
    SplitButton, SplitButtonItem, Chip, ChipList, Toolbar, ToolbarItem } from '@progress/kendo-react-buttons';
import Parcel from './../../../src/assets/parcel1.jpg';
class DetailParcel extends Component {
    state = { 
        dataParcelById:[],
        dataParcel:[],
        allDataParcel:[],
        dataMinuman:[],
        dataMakanan:[],
        dataChocolate:[],
        toggleBar:false,
        visible:true,
        MinumanVisible:true
     }

     toggleDialog=()=>{
         this.setState({visible:!this.state.visible})
     }
     toggleDialogMinuman=()=>{
         this.setState({MinumanVisible:!this.state.visible})
     }

     componentDidMount(){
         Axios.get(`${API_URL_SQL}/product/getDataParcelById/${this.props.match.params.id}`)
         .then((res)=>{
            console.log(res.data)
         }).catch((err)=>{
             console.log(err)
         })

         Axios.post(`${API_URL_SQL}/product/getDataProductMinuman`)
         .then((res)=>{
             console.log(res.data,'line 65')
             this.setState({dataMinuman:res.data})
         }).catch((err)=>{
             console.log(err)
         })

         Axios.post(`${API_URL_SQL}/product/getDataProductMakanan`)
         .then((res)=>{
             console.log(res.data,'line75')
             this.setState({dataMakanan:res.data})
         }).catch((err)=>{
             console.log(err)
         })

         Axios.post(`${API_URL_SQL}/product/getDataProductChocolate`)
         .then((res)=>{
             console.log(res.data,'line 83')
             this.setState({dataChocolate:res.data})
         }).catch((err)=>{
             console.log(err)
         })
     }


     AddDataMakanan=(id)=>{
         console.log(id)
         console.log('jalan line 69')
     }
     renderMakanan=()=>{
         return this.state.dataMakanan.map((val,index)=>{
             return (
                 <>
                <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel" />
                            <div className="hover" onClick={()=>this.AddDataMakanan(val.id)}>
                                <a href="javascript:void(0);" className="btn btn-primary btn-sm waves-effect"><i className="zmdi zmdi-shopping-cart" ></i>Add To Cart</a>
                            </div>
                        </div>
                        <div className="product_details">
                            <h5><a href="ec-product-detail.html">{val.nama}</a></h5>
                            <ul className="product_price list-unstyled">
                                <li className="old_price">Stock:{val.stok}</li>
                                <li className="new_price">Rp.{val.harga}</li>
                            </ul>
                        </div>
                </div>

                 </>

             )
         })
     }
    render() { 
        return ( 
            <>
                <div className="outer-detail">
                    <Header/>
                    <div className="div-opt">
                        <BsFillCaretLeftFill className="icon-back"/><p>back to Parcel</p>
                    </div>

                    <div className="parcelname">
                        <h3>Parcel A LEBARAN MONYET</h3>
                    </div>

                    <div className="render-parcel" >
                        {/* <div className="ins-render"> */}
                            <div className="k-button" onClick={this.toggleDialog}>
                                <p>1.Pilih Makanan Yang Kamu Mau</p>
                            </div>
                            {this.state.visible && <div onClose={this.toggleDialog}>
                                <div style={{display:'flex',flexWrap:'wrap'
                                                    }}>
                                    {this.renderMakanan()}
                                </div>
                        </div>
                        }
                    {/* </div> */}
                    </div>
                </div>
            </>
         );
    }
}

export default DetailParcel;