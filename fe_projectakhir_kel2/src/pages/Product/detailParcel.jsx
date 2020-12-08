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
        qtyChocolate:[],
        saveQtyMinuman:0,
        dataArrMakanan:[],
        dataArrMinuman:[],
        

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
         var prodid= this.state.dataParcelByIdMinuman.categoryproduct_id
         var filterprod=this.state.dataArrMakanan.filter((val)=>{
             return val.categoryproduct_id === prodid
         })
         var total =0
         for(var i=0; i<filterprod.length; i++){
             total += filterprod[i].qty
         }
    
          if(total <= this.state.dataParcelByIdMinuman.qty){
             var dataArrMakanan = this.state.dataArrMakanan
             console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id = id
            })
            console.log(a)

            if(dataArrMakanan[a].qty-1==0){
                dataArrMakanan.splice(a,1)             
            }else {
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
            }
            this.setState({dataArrMakanan:dataArrMakanan})

         }

     }
 
     hapusDataMakanan=(id)=>{
         console.log(id,'delete id ')
     
         var prodid= this.state.dataParcelByIdMakanan.categoryproduct_id
         var filterprod=this.state.dataArrMakanan.filter((val)=>{
             return val.categoryproduct_id === prodid
         })
         var total =0
         for(var i=0; i<filterprod.length; i++){
             total += filterprod[i].qty
         }
    
          if(total <= this.state.dataParcelByIdMakanan.qty){
             var dataArrMakanan = this.state.dataArrMakanan
             console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id = id
            })
            console.log(a)

            if(dataArrMakanan[a].qty-1==0){
                dataArrMakanan.splice(a,1)             
            }else {
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
            }
            this.setState({dataArrMakanan:dataArrMakanan})

         }
     }

     hapusDataChocolate=(id)=>{
         console.log(id)
         var prodid= this.state.dataParcelByIdChocolate.categoryproduct_id
         var filterprod=this.state.dataArrMakanan.filter((val)=>{
             return val.categoryproduct_id === prodid
         })
         var total =0
         for(var i=0; i<filterprod.length; i++){
             total += filterprod[i].qty
         }
    
          if(total <= this.state.dataParcelByIdChocolate.qty){
             var dataArrMakanan = this.state.dataArrMakanan
             console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id = id
            })
            console.log(a)

            if(dataArrMakanan[a].qty-1==0){
                dataArrMakanan.splice(a,1)             
            }else {
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
            }
            this.setState({dataArrMakanan:dataArrMakanan})

         }
     }

     
     
     AddDataMakanan=(id)=>{
        console.log(id)
        console.log('jalan line 69')
        var dataArrMakanan = this.state.dataArrMakanan
        console.log(dataArrMakanan,' ini dataArrMakanan')
        var a = dataArrMakanan.findIndex((val)=>{
            console.log(val.parcel_id,'193') // 10
            console.log(id,194) // 9
            return val.parcel_id==id
        })
        var findMakanan=this.state.dataMakanan
        var find = findMakanan.findIndex((val=>{
            return val.id == id
        }))

        console.log(a)
        if(a== -1){
            var arrMakanan2=this.state.dataArrMakanan
             arrMakanan2.push({
                parcel_id:id,
                qty:1,
                categoryproduct_id:this.state.dataParcelByIdMakanan.categoryproduct_id,
                namaProduct:this.state.dataMakanan[find].nama
            })
            
            console.log(arrMakanan2)
            this.setState({dataArrMakanan:arrMakanan2})
        }else {
            console.log(this.state.dataArrMakanan)
            console.log(a, 206)
            var dataSama = this.state.dataArrMakanan
            dataSama[a]= {...dataSama[a],qty:dataSama[a].qty+1}

            // arrMakanan2[a]={...arrMakanan2[a],qty:arrMakanan2[2].qty+1}
            // addData={...addData,qty:addData.qty+1}
            this.setState({dataArrMakanan:dataSama})
        }
        }

     AddDataMinuman=(id)=>{
         console.log(id, ' ini id')

         var dataArrMakanan = this.state.dataArrMakanan
         console.log(dataArrMakanan,' ini dataArrMakanan')
         var a = dataArrMakanan.findIndex((val)=>{
             console.log(val.parcel_id,'193') // 10
             console.log(id,194) // 9
             return val.parcel_id==id
         })
         var findMinuman=this.state.dataMinuman
         var find = findMinuman.findIndex((val=>{
             return val.id == id
         }))
 
         if(a== -1){
             var arrMakanan2= this.state.dataArrMakanan
             arrMakanan2.push({
                 parcel_id:id,
                 qty:1,
                 categoryproduct_id:this.state.dataParcelByIdMinuman.categoryproduct_id,
                 namaProduct:this.state.dataMinuman[find].nama
             })
                this.setState({dataArrMakanan:arrMakanan2})
         }else {
             console.log(this.state.dataArrMakanan)
             var dataSama = this.state.dataArrMakanan
             dataSama[a]= {...dataSama[a],qty:dataSama[a].qty+1}
             this.setState({dataArrMakanan:dataSama})
         }
     }

     AddDataChocolate=(id)=>{
        console.log(id, ' ini id')

        var dataArrMakanan = this.state.dataArrMakanan
        console.log(dataArrMakanan,' ini dataArrMakanan')
        var a = dataArrMakanan.findIndex((val)=>{
            console.log(val.parcel_id,'193') // 10
            console.log(id,194) // 9
            return val.parcel_id==id
        })
        var findChocolate=this.state.dataChocolate
        var find = findChocolate.findIndex((val=>{
            return val.id == id
        }))
        if(a== -1){
            var arrMakanan2= this.state.dataArrMakanan
            arrMakanan2.push({
                parcel_id:id,
                qty:1,
                categoryproduct_id:this.state.dataParcelByIdChocolate.categoryproduct_id,
                namaProduct:this.state.dataChocolate[find].nama
            })
                this.setState({dataArrMakanan:arrMakanan2})

        }else {
            console.log(this.state.dataArrMakanan)
            var dataSama = this.state.dataArrMakanan
            dataSama[a]= {...dataSama[a],qty:dataSama[a].qty+1}
            this.setState({dataArrMakanan:dataSama})
        }
     }

     addMessage=(e)=>{
         console.log(e.target.value)
         this.setState({arrMessage:e.target.value})
     }
     renderMakanan=()=>{
        var prodid= this.state.dataParcelByIdMakanan.categoryproduct_id
        var filterprod=this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === prodid
        })
        var total =0
        for(var i=0; i<filterprod.length; i++){
            total += filterprod[i].qty
        }
        console.log(filterprod,' ini filter prod 302')

         return this.state.dataMakanan.map((val,index)=>{

             return (
                 <>
                <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                             
                                {
    
                                    total==this.state.dataParcelByIdMakanan.qty ?
                                    null:
                                    <>
                                    <BiPlus onClick={()=>this.AddDataMakanan(val.id)}/>
                                    </>
                                
                                }
                                {
                                    total==0 ?
                                    null 
                                    :
                                    <BiMinus onClick={()=>this.hapusDataMakanan(val.id)}/>  
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
        var prodid= this.state.dataParcelByIdMinuman.categoryproduct_id
        var filterprod=this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === prodid
        })
        var total =0
        for(var i=0; i<filterprod.length; i++){
            total += filterprod[i].qty
        }
         return this.state.dataMinuman.map((val,index)=>{
             return (
                 <>
                    <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                             
                            {
    
                                total==this.state.dataParcelByIdMinuman.qty ?
                                null:
                                <>
                                <BiPlus onClick={()=>this.AddDataMinuman(val.id)}/>
                                </>

                            }
                            {
                                total==0 ?
                                null 
                                :
                                <BiMinus onClick={()=>this.hapusDataMinuman(val.id)}/>  
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
        var prodid= this.state.dataParcelByIdChocolate.categoryproduct_id
        var filterprod=this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === prodid
        })
        var total =0
        for(var i=0; i<filterprod.length; i++){
            total += filterprod[i].qty
        }
         return this.state.dataChocolate.map((val,index)=>{
             return(
                 <>
                   <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                            {
    
                                total==this.state.dataParcelByIdChocolate.qty ?
                                null:
                                <>
                                <BiPlus onClick={()=>this.AddDataChocolate(val.id)}/>
                                </>

                            }
                            {
                                total==0 ?
                                null 
                                :
                                <BiMinus onClick={()=>this.hapusDataChocolate(val.id)}/>  
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
            var sendToDb = this.state.dataArrMakanan
            var messagesend=this.state.arrMessage
            var arrProduct= sendToDb.map((val)=>val.parcel_id)
            var qtyProduct = sendToDb.map((val)=>val.qty)
            console.log(arrProduct)
            console.log(qtyProduct)


         var obj = {
            user_id:"1",
            products_id:"0",
            parcel_id:"1",
            qty:"1",
            productforparcel_id:arrProduct,
            qtyproductforparcel:qtyProduct,
            message:messagesend
         }
         console.log(obj)
         Axios.post(`${API_URL_SQL}/transaksi/addtocart`,obj).then((res)=>{
             console.log('nberhasil')
            console.log(res.data)
         }).catch((err)=>{
             console.log(err)
         })

     }
    //  [
    //      {parcelid :10,qty:1},
    //      {parcelid:11,qty:1},
    //  ]
    render() { 
            console.log(this.state.dataArrMakanan)
            console.log(this.state.dataMakanan)
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