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
import {BiPlus,BiMinus} from 'react-icons/bi'
import TextField from '@material-ui/core/TextField';
import { CgInsertBefore } from 'react-icons/cg';
class DetailParcel extends Component {
    state = { 
        dataParcelByIdMakanan:[],
        dataParcelByIdMinuman:[],
        dataParcelByIdChocolate:[],
        dataParcel:[],
        allDataParcel:[],
        dataMinuman:[],
        dataMakanan:[],
        dataChocolate:[],
        toggleBar:false,
        visible:true,
        MinumanVisible:true,
        ChocolateVisible:true,
        messageVisible:true,
        arrMakanan:[],
        arrMinuman:[],
        arrChocolate:[],
        arrMessage:'',
        buttonMakanan:false,
        buttonMinuman:false,
        buttonChocolate:false,
        qtyMakanan:[],
        qtyMinuman:[],
        qtyChocolat:[],
        saveQtyMinuman:0
        

     }
     

     toggleDialog=()=>{
         this.setState({visible:!this.state.visible})
     }
     toggleDialogMinuman=()=>{
         this.setState({MinumanVisible:!this.state.MinumanVisible})
     }
     toggleDialogChocolate=()=>{
         this.setState({ChocolateVisible:!this.state.ChocolateVisible})
     }
     toggleDialogMessage=()=>{
         this.setState({messageVisible:!this.state.messageVisible})
     }

     componentDidMount(){
         Axios.get(`${API_URL_SQL}/product/getDataParcelById/${this.props.match.params.id}`)
         .then((res)=>{
            console.log(res.data,' line 37')
            this.setState({
            dataParcelByIdMakanan:res.data[1],
            dataParcelByIdMinuman:res.data[0],
            dataParcelByIdChocolate:res.data[2]
        })
            
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

   
  
     hapusDataMinuman=(id)=>{
         console.log(id,' line 101')
         if(this.state.arrMinuman.length <= this.state.dataParcelByIdMinuman.qty){
             var b = this.state.arrMinuman
             var a = b.findIndex((val)=>{
                 return val=id
             })
             b.splice(a,1)
             this.setState({buttonMinuman:false,arrMinuman:b})
         }

     }
 
     hapusDataMakanan=(id)=>{
         console.log(id,'delete id ')
         if(this.state.arrMakanan.length <= this.state.dataParcelByIdMakanan.qty){
             var b = this.state.arrMakanan
             console.log(b)
            var a = b.findIndex((val)=>{
                return val = id
            })
            console.log(a)
            b.splice(a,1)
            
             this.setState({buttonMakanan:false,arrMakanan:b})
             
         }
     }

     hapusDataChocolate=(id)=>{
         console.log(id)
         if(this.state.arrChocolate.length <= this.state.dataParcelByIdChocolate.qty){
             var b = this.state.arrChocolate
             var a = b.findIndex((val)=>{
                 return val =id
             })
             b.splice(a,1)
             this.setState({buttonChocolate:false,arrChocolate:b})
         }
     }

     
     AddDataMakanan=(id)=>{
        console.log(id)
        console.log('jalan line 69')
        var b = this.state.qtyMakanan
        var a = b.findIndex((val)=>{
            return val=id
        })
       console.log(a, ' ini a line 148')
       if(a == -1){
           console.log('masuk ke if 150')
           var joined = this.state.arrMakanan.concat(id)
           var addQty = this.state.arrMakanan.concat(id)
           this.setState({arrMakanan:joined, qtyMakanan:addQty})
       }else {
            console.log('nambah qty jadi 2')
       }
        
       //  console.log(joined)
        console.log(this.state.arrMakanan.length)
        }

     AddDataMinuman=(id)=>{
         console.log(id, ' ini id')
         
        //  var b = this.state.arrMinuman
        // if(b.indexOf(id)!== -1){
        //     console.log('data udh ada')
        //     this.setState({saveQtyMinuman:(this.state.saveQtyMinuman+1)})
        //     this.setState({qtyMinuman:this.state.saveQtyMinuman})

        // }else {
        //     console.log('data blm ada')
        //     var addQty = this.state.arrMinuman.concat(1)
        //     var joined= this.state.arrMinuman.concat(id)
        //     this.setState({arrMinuman:joined,qtyMinuman:addQty})
        //     this.setState({saveQtyMinuman:1})

        // }
        // var render=this.state.arrMinuman.filter(function(val){
        //     console.log(val)
        //     return val == val
        // })
        // console.log(render)

        var joined= this.state.arrMinuman.concat(id)
        this.setState({arrMinuman:joined})
 
     }

     AddDataChocolate=(id)=>{
         var joined=this.state.arrChocolate.concat(id)
         this.setState({arrChocolate:joined})
         console.log(id)
     }

     addMessage=(e)=>{
         console.log(e.target.value)
         this.setState({arrMessage:e.target.value})
     }
     renderMakanan=()=>{
         return this.state.dataMakanan.map((val,index)=>{
             return (
                 <>
                <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                                {
                                    this.state.buttonMakanan?
                                    <>
                                    <BiMinus onClick={()=>this.hapusDataMakanan(val.id)}/>  
                                    {/* <BiPlus onClick={()=>this.AddDataMakanan(val.id)}/> */}
                                    </>
                                    :
                                    <>
                                    {
                                        this.state.arrMakanan.length==this.state.dataParcelByIdMakanan.qty ?
                                        null:
                                        <>
                                        <BiPlus onClick={()=>this.AddDataMakanan(val.id)}/>
                                        </>

                                    }
                                        <BiMinus onClick={()=>this.hapusDataMakanan(val.id)}/>      
                                    </>
                                }
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

     renderMinuman=()=>{
         return this.state.dataMinuman.map((val,index)=>{
             return (
                 <>
                    <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                                {
                                    this.state.buttonMinuman?
                                    <>
                                    <BiMinus onClick={()=>this.hapusDataMinuman(val.id)}/>  
                                    {/* <BiPlus onClick={()=>this.AddDataMakanan(val.id)}/> */}
                                    </>
                                    :
                                    <>
                                    {
                                        this.state.arrMinuman.length==this.state.dataParcelByIdMinuman.qty ?
                                        null:
                                        <>
                                        <BiPlus onClick={()=>this.AddDataMinuman(val.id)}/>
                                        </>

                                    }
                                        <BiMinus onClick={()=>this.hapusDataMinuman(val.id)}/>      
                                    </>
                                }
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

     renderChocolate=()=>{
         return this.state.dataChocolate.map((val,index)=>{
             return(
                 <>
                   <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                                {
                                    this.state.buttonMinuman?
                                    <>
                                    <BiMinus onClick={()=>this.hapusDataChocolate(val.id)}/>  
                                    {/* <BiPlus onClick={()=>this.AddDataMakanan(val.id)}/> */}
                                    </>
                                    :
                                    <>
                                    {
                                        this.state.arrChocolate.length==this.state.dataParcelByIdChocolate.qty ?
                                        null:
                                        <>
                                        <BiPlus onClick={()=>this.AddDataChocolate(val.id)}/>
                                        </>

                                    }
                                        <BiMinus onClick={()=>this.hapusDataChocolate(val.id)}/>      
                                    </>
                                }
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

     saveMessage=()=>{
         console.log('button add message jalan')
 

         var minuman = this.state.arrMinuman
         var makanan= this.state.arrMakanan
         var chocolate = this.state.arrChocolate
         var sendtodb = minuman.concat(makanan,chocolate)
         console.log(sendtodb)
         var obj = {
            user_id:"1",
            products_id:"0",
            parcel_id:"1",
            qty:"1",
            productforparcel_id:[8,10,5],
            qtyproductforparcel:[1,2,1],
            message:'Stress anjg'
         }
         console.log(obj)
         Axios.post(`${API_URL_SQL}/transaksi/addtocart`,obj).then((res)=>{
             console.log('nberhasil')
            console.log(res.data)
         }).catch((err)=>{
             console.log(err)
         })

     }
    render() { 
            console.log(this.state.arrMinuman, ' arr minuman')
            // console.log(this.state.arrMakanan, ' arr makanan')
            // console.log(this.state.arrChocolate, ' arr chocolate')
            console.log(this.state.qtyMinuman,' line 335 qty minuman')
            console.log(this.state.saveQtyMinuman,  ' qty minuman')
            
            const {classes}= this.props
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
                            <div className="k-button" onClick={this.toggleDialogMinuman}>
                                <p>2.Pilih Minuman Yang Kamu Mau</p>
                            </div>
                            {this.state.MinumanVisible && <div onClose={this.toggleDialogMinuman}>
                                <div style={{display:'flex',flexWrap:'wrap'
                                                    }}>
                                    {this.renderMinuman()}
                                </div>
                            </div>
                            }
                            <div className="k-button" onClick={this.toggleDialogChocolate}>
                                <p>3.Pilih Chocolate Yang Kamu Mau</p>
                            </div>
                            {this.state.ChocolateVisible && <div onClose={this.toggleDialogChocolate}>
                                <div style={{display:'flex',flexWrap:'wrap'
                                                    }}>
                                    {this.renderChocolate()}
                                </div>
                            </div>
                            }
                            <div className="k-button" onClick={this.toggleDialogMessage}>
                                <p>4.Isi Pesan Yang Kamu mau</p>
                            </div>
                            {this.state.messageVisible && <div onClose={this.toggleDialogMessage}>
                                <div style={{display:'flex',flexWrap:'wrap'
                                                    }}>
                                      <input type='email' className="form-control" onChange={(e)=>this.addMessage(e)} style={{transition:'500ms'}}/>
                                      <div className="button-add" onClick={this.saveMessage}>
                                         <p>Save</p>
                                      </div>
                                </div>
                            </div>
                            }
                    
                    </div>
                </div>
            </>
         );
    }
}

export default DetailParcel;