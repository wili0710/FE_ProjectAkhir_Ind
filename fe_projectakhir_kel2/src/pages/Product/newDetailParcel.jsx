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
import {BiPlus,BiMinus,BiCart,BiUser} from 'react-icons/bi'
import {FcCheckmark} from 'react-icons/fc'
import TextField from '@material-ui/core/TextField';
import { CgInsertBefore } from 'react-icons/cg';
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';
import {Dropdown} from 'react-bootstrap'
import Logo from './../../assets/logo.png'
import {AiOutlineLogout,AiFillHome,AiFillDelete} from 'react-icons/ai'
import {connect} from 'react-redux';
import {LogoutFunc} from './../../redux/Actions'
import Zoom from 'react-reveal/Zoom';
import HorizontalScroll from 'react-scroll-horizontal'

import { Scrollbars } from 'react-custom-scrollbars';
import { css } from '@emotion/react';

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
        arrMessage:'',
        buttonMakanan:false,
        buttonMinuman:false,
        buttonChocolate:false,
        dataArrMakanan:[],
        checklistMinuman:0,
        checklistMakanan:0,
        checklistChocolate:0,
        renderCartMinuman:[],
        renderCartMakanan:[],
        renderCartChocolate:[],
        renderRandomProduct:[],
        renderRandomParcel:[],
        deleteUndefinedChocolate:false,
        indexCartChocolate:0,
        RandomParcel:false,

        // 

        categoryProduct:[]
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
            console.log(res.data,' line 81')    
            this.setState({
            dataParcelByIdMakanan:res.data[1],
            dataParcelByIdMinuman:res.data[0],
            dataParcelByIdChocolate:res.data[2],
            categoryProduct:res.data
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

         Axios.get(`${API_URL_SQL}/product/getRandomProduct/4`)
         .then((res)=>{
             console.log(res.data.productSatuan)
             console.log(res.data.productParcel)
            this.setState({
                renderRandomProduct:res.data.productSatuan,
                renderRandomParcel:res.data.productParcel
            })
         }).catch((err)=>{
             console.log(err)
         })

         

     }

     findCategoryProduct=this.state.categoryProduct.map((val,index)=>{
         return {
             categoryproduct_id:val.categoryproduct_id,
             category:val.namaProduct,
             limitqty:val.qty
         }
     })

     
     
   
  
     hapusDataMinuman=(id)=>{
         console.log(id,' line 101')
             var dataArrMakanan = this.state.dataArrMakanan
             var dataMinuman = this.state.dataMinuman
             var find = dataMinuman.findIndex((val)=>{
                 return val.id == id
             })

            //  console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                console.log(val.parcel_id ,' parcel id 123')
                console.log(id, '124')
                return val.parcel_id == id
            })
            console.log(a, ' index minuman ')

            if(dataArrMakanan[a].qty-1==0){
                console.log('masuk ke a 132')
                dataArrMakanan.splice(a,1)  
                dataMinuman[find]={...dataMinuman[find],stok:dataMinuman[find].stok+1} 
                // dataMakanan[find]= {...dataMakanan[find], stok:dataMakanan[find].stok+1}
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Menghapus Product',
                    text: 'Cart Minuman Kosong'                    
                })    
                this.setState({dataMinuman:dataMinuman})      
            }else {
                console.log('masuk ke else 135')
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
                dataMinuman[find]={...dataMinuman[find],stok:dataMinuman[find].stok+1} 
                // dataMakanan[find]= {...dataMakanan[find], stok:dataMakanan[find].stok+1}
                // this.setState({checklistMinuman:false})
                // this.setState({renderCartMinuman:dataArrMakanan})
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Menghapus Product',
                    text: 'Berhasil Menghapus Product'                    
                })
            }
            this.setState({dataArrMakanan:dataArrMakanan,dataMinuman:dataMinuman})

        //  }

     }
 
     hapusDataMakanan=(id)=>{
    
         Swal.fire({
            icon: 'success',
            title: 'Berhasil Menghapus Product',
            text: 'Berhasil Menghapus Product'                    
        })
    
        //   if(total <= this.state.dataParcelByIdMakanan.qty){
             var dataArrMakanan = this.state.dataArrMakanan
             var dataMakanan= this.state.dataMakanan
             var find = dataMakanan.findIndex((val)=>{
                 return val.id == id
             })
            //  console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id == id
            })
            // console.log(a)

            if(dataArrMakanan[a].qty-1==0){
                dataArrMakanan.splice(a,1) 
                dataMakanan[find]={...dataMakanan[find],stok:dataMakanan[find].stok+1}
                // console.log(filterprod,' ini filter prod 148')
                // console.log(this.state.renderCartMinuman)   
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Menghapus Product',
                    text: 'Cart Makanan Kosong'                    
                })    
                this.setState({dataMakanan:dataMakanan})     
            }else {
                
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
                dataMakanan[find]={...dataMakanan[find],stok:dataMakanan[find].stok+1}

                // this.setState({renderCartMakanan:dataArrMakanan})
                // this.setState({checklistMakanan:false})
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Menghapus Product',
                    text: 'Berhasil Menghapus Product'                    
                })
            }
            this.setState({dataArrMakanan:dataArrMakanan,dataMakanan:dataMakanan})
        //  }
         
     }

     hapusDataChocolate=(id)=>{
 
             var dataArrMakanan = this.state.dataArrMakanan
             var dataChocolate= this.state.dataChocolate
             var dataCartChocolate= this.state.renderCartChocolate
            console.log(dataCartChocolate,' cart render chocolate')
            var findCartIndex= dataCartChocolate.findIndex((val)=>{
                return val.parcel_id == id
            })
            console.log(findCartIndex,' ini data find cart index 263')

            var find = dataChocolate.findIndex((val)=>{
                return val.id == id
            })
            

            var indexArrMakanan = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id == id
            })
            console.log(find, ' ini index dr datachocolate')
            console.log(id, ' ini id buat compare sama index')
            
                
                if(dataArrMakanan[indexArrMakanan].qty-1==0){
                    dataArrMakanan.splice(indexArrMakanan,1) 
                    dataChocolate[find]={...dataChocolate[find],stok:dataChocolate[find].stok+1}
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Menghapus Product',
                        text: 'Cart Chocolate Kosong'                    
                    })  
                    console.log(dataChocolate)

                    this.setState({dataChocolate:dataChocolate})          
                }else {
                    console.log('masuk ke else')
                    dataArrMakanan[indexArrMakanan].qty=dataArrMakanan[indexArrMakanan].qty-1
                    dataChocolate[find]={...dataChocolate[find],stok:dataChocolate[find].stok+1}
                    console.log(dataChocolate)
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Menghapus Product',
                        text: 'Berhasil Menghapus Product'                    
                    })
                }
                this.setState({dataArrMakanan:dataArrMakanan,dataChocolate:dataChocolate})
          
            

        //  }
     }
     onDeleteProduct=(id,categoryproduct_id)=>{
         console.log(id)
         console.log(categoryproduct_id)
         
        var dataCart = this.state.dataArrMakanan // data yg dicart
        console.log(dataCart, ' ini dataarrmakanan')

        var find= dataCart.findIndex((val)=>{
            return val.parcel_id == id
        })
        console.log(dataCart[find])
        
        

        this.setState({dataArrMakanan:dataCart})

        if(categoryproduct_id == 1){
            // console.log('minuman')
            var dataMinuman=this.state.dataMinuman
            var indexMinuman = dataMinuman.findIndex((val)=>{
                return val.id == id
            })

            dataMinuman[indexMinuman]= {...dataMinuman[indexMinuman],stok:dataMinuman[indexMinuman].stok + dataCart[find].qty}
            dataCart.splice(find,1)
            this.setState({dataMinuman:dataMinuman})

        }else if (categoryproduct_id==2){
            console.log('makanan')
            var dataMakanan= this.state.dataMakanan // data yg di render
            var indexMakanan=dataMakanan.findIndex((val)=>{
                return val.id == id
            })
       
            dataMakanan[indexMakanan]= {...dataMakanan[indexMakanan],stok:dataMakanan[indexMakanan].stok + dataCart[find].qty}

            dataCart.splice(find,1)
            this.setState({dataMakanan:dataMakanan})
        }else if (categoryproduct_id == 3) {
            // console.log('chocolate')
            var dataChocolate = this.state.dataChocolate
            var indexChocolate = dataChocolate.findIndex((val)=>{
                return val.id == id
            })
            dataChocolate[indexChocolate]={...dataChocolate[indexChocolate],stok:dataChocolate[indexChocolate].stok + dataCart[find].qty}
            dataCart.splice(find,1)
            this.setState({dataChocolate:dataChocolate})
        }
    }

     
     
     AddDataMakanan=(id)=>{
         
        var dataArrMakanan = this.state.dataArrMakanan
        var dataMakanan=this.state.dataMakanan 
        var indexDataMakanan = dataArrMakanan.findIndex((val)=>{ // nyari index makanan
            return val.parcel_id==id
        })

        var findMakanan=this.state.dataMakanan
        // console.log(findMakanan)
        // console.log(dataArrMakanan)
        var find = findMakanan.findIndex((val=>{ // nyari index buat nama makaan pas di push
            return val.id == id
        }))
        console.log(find,  ' ini find 343')
    
        
        if(indexDataMakanan== -1){ // kalau data kosong(-1) maka nge push semua data ke arr makanan
            if(this.state.dataMakanan[find].stok -1 == -1){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menambahkan Product',
                    text: 'Stock Habis'                    
                })
        
            }else {
                var arrMakanan2=this.state.dataArrMakanan
                var dataMakanan=this.state.dataMakanan
                 arrMakanan2.push({
                    parcel_id:id,
                    qty:1,
                    categoryproduct_id:this.state.dataParcelByIdMakanan.categoryproduct_id,
                    namaProduct:this.state.dataMakanan[find].nama
                })
                dataMakanan[find]={...dataMakanan[find],stok:dataMakanan[find].stok-1}
                    
                this.setState({dataArrMakanan:arrMakanan2,dataMakanan:dataMakanan})
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Menambahkan Product',
                    text: 'Berhasil Menambahkan Product'                    
                })

            }
        }else { // data udah ada, jadi cuma nambah qty

            if(this.state.dataMakanan[find].stok -1 == -1){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menambahkan Product',
                    text: 'Stock Habis'                    
                })
            }else {
                var dataSama = this.state.dataArrMakanan
                
                console.log(dataSama)
                console.log(dataMakanan)
                dataSama[indexDataMakanan]= {...dataSama[indexDataMakanan],qty:dataSama[indexDataMakanan].qty+1}
                // dataMakanan[find]={...dataMakanan[find],stok:dataMakanan[find].stok-1}
                console.log(dataMakanan)
                // this.setState({dataArrMakanan:dataSama,dataMakanan:dataMakanan})
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Menambahkan Product',
                    text: 'Berhasil Menambahkan Product'                    
                })
            }
        }

        var totalQtyMakanan =0
        var limitMakanan = this.state.dataParcelByIdMakanan.qty
       var productidmakanan= this.state.dataParcelByIdMakanan.categoryproduct_id // product_id
       
       var filterprodmakanan = this.state.dataArrMakanan.filter((val)=>{
           return val.categoryproduct_id === productidmakanan
       })
       

       for(var i =0; i<filterprodmakanan.length; i++){
           totalQtyMakanan += filterprodmakanan[i].qty
       }
       if(totalQtyMakanan == limitMakanan){
           
           this.setState({checklistMakanan:totalQtyMakanan,renderCartMakanan:filterprodmakanan})
       }else {
           this.setState({renderCartMakanan:filterprodmakanan})
       }
       

    }

     AddDataMinuman=(id)=>{
        
        console.log(this.state.dataMinuman, '  minuman 337')
         var dataArrMakanan = this.state.dataArrMakanan
         var dataMinuman = this.state.dataMinuman
         var indexMinuman = dataArrMakanan.findIndex((val)=>{ // find index si product minuman

             return val.parcel_id==id
         })
         
         var find = dataMinuman.findIndex((val=>{
             return val.id == id
         }))

         console.log(this.state.dataMinuman[find].stok, ' stok minuman 349')
      
         console.log(this.state.dataMinuman[find].stok-1)
         if(indexMinuman== -1){
             if(this.state.dataMinuman[find].stok - 1 == -1 ){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menambahkan Product',
                    text: 'Stock Habis'                    
                })
             }else {
                 var arrMakanan2= this.state.dataArrMakanan
                 
                 arrMakanan2.push({
                     parcel_id:id,
                     qty:1,
                     categoryproduct_id:this.state.dataParcelByIdMinuman.categoryproduct_id,
                     namaProduct:this.state.dataMinuman[find].nama
                 })

              
                    dataMinuman[find]= {...dataMinuman[find],stok:dataMinuman[find].stok-1}
                    this.setState({dataArrMakanan:arrMakanan2,dataMinuman:dataMinuman})
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Menambahkan Product',
                        text: 'Berhasil Menambahkan Product'                    
                    })

             }
         }else {
             if(this.state.dataMinuman[find].stok - 1 == -1 ){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menambahkan Product',
                    text: 'Stock Habis'                    
                })
             }else {
                 var dataSama = this.state.dataArrMakanan
                 dataSama[indexMinuman]= {...dataSama[indexMinuman],qty:dataSama[indexMinuman].qty+1}
                 dataMinuman[find]= {...dataMinuman[find],stok:dataMinuman[find].stok-1}
                //  dataMinuman[find]= {...dataMinuman[find],stok:dataMinuman[find].stok-1}
                console.log(dataMinuman)
                 this.setState({dataArrMakanan:dataSama})
                 Swal.fire({
                    icon: 'success',
                    title: 'Berhasil Menambahkan Product',
                    text: 'Berhasil Menambahkan Product'                    
                })

             }
             
         }

         var totalQtyMinuman =0
         var limitMinuman = this.state.dataParcelByIdMinuman.qty
        var productidminuman= this.state.dataParcelByIdMinuman.categoryproduct_id // product_id
        // console.log(this.state.dataArrMakanan)
        var filterprodminuman = this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === productidminuman
        })
        console.log(filterprodminuman)
        for(var i =0; i<filterprodminuman.length; i++){
            totalQtyMinuman += filterprodminuman[i].qty
        }
        if(totalQtyMinuman == limitMinuman){
            // console.log('checklistminuman true 266')
            this.setState({checklistMinuman:true,renderCartMinuman:filterprodminuman})
        }else {
            this.setState({renderCartMinuman:filterprodminuman})
        }
        // console.log(totalQtyMinuman,' total qty minuman 323')
         
        // batas ngitung total qtyminuman


     }

     AddDataChocolate=(id)=>{
        

        var dataArrMakanan = this.state.dataArrMakanan // data array chocolate 
        var indexChocolate = dataArrMakanan.findIndex((val)=>{

            return val.parcel_id==id
        })
        Swal.fire({
            icon: 'success',
            title: 'Berhasil Menambahkan Data',
            text: 'Berhasil Menambahkan Data'                    
        })
        var findChocolate=this.state.dataChocolate
        var find = findChocolate.findIndex((val=>{
            return val.id == id
        }))
        if(indexChocolate== -1){
            if(this.state.dataChocolate[find].stok -1 == -1){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menambahkan Product',
                    text: 'Stock Habis'                    
                })
            }else {

                var arrMakanan2= this.state.dataArrMakanan
                var dataChocolate= this.state.dataChocolate
                arrMakanan2.push({
                    parcel_id:id,
                    qty:1,
                    categoryproduct_id:this.state.dataParcelByIdChocolate.categoryproduct_id,
                    namaProduct:this.state.dataChocolate[find].nama
                })
                dataChocolate[find]={...dataChocolate[find], stok:dataChocolate[find].stok-1}

                    this.setState({dataArrMakanan:arrMakanan2,dataChocolate:dataChocolate })
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil Menambahkan Product',
                        text: 'Berhasil Menambahkan Product'                    
                    })
            }

        }else {
            if(this.state.dataChocolate[find].stok - 1 == -1){
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Menambahkan Product',
                    text: 'Stock Habis'                    
                })
            }else {

                var dataSama = this.state.dataArrMakanan
                dataSama[indexChocolate]= {...dataSama[indexChocolate],qty:dataSama[indexChocolate].qty+1}
                dataChocolate[find]= {...dataChocolate[find],stok:dataChocolate[find].stok-1}
                this.setState({dataArrMakanan:dataSama,dataChocolate:dataChocolate})
            }
            
        }


            var totalQtyChocolate =0
            var limitChocolate = this.state.dataParcelByIdChocolate.qty
        var productidminuman= this.state.dataParcelByIdChocolate.categoryproduct_id // product_id
        console.log(this.state.dataArrMakanan)
        var filterprodchocolate = this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === productidminuman
        })
        // console.log(filterprodchocolate)
        for(var i =0; i<filterprodchocolate.length; i++){
            totalQtyChocolate += filterprodchocolate[i].qty
        }
        if(totalQtyChocolate == limitChocolate){
            // console.log('checklistminuman true 266')
            this.setState({checklistChocolate:true,renderCartChocolate:filterprodchocolate})
        }else {
            this.setState({renderCartChocolate:filterprodchocolate})
        }
        // console.log(totalQtyChocolate,' total qty minuman 323')
        
       // batas ngitung total qtyminuman
        
     }

     addMessage=(e)=>{
         console.log(e.target.value)
         this.setState({arrMessage:e.target.value})
     }
     renderMakanan=()=>{
        var prodid= this.state.dataParcelByIdMakanan.categoryproduct_id // product_id
        var filterprod=this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === prodid
        })
        // console.log(filterprod, '333')
        var total =0
        for(var i=0; i<filterprod.length; i++){
            total += filterprod[i].qty
            // this.setState({checklistMakanan:total})
        }
        // console.log(filterprod,' ini filter prod 302')

         return this.state.dataMakanan.map((val,index)=>{

             return (
                 <>
                <div className=" box-3 card product_item" key={val.id} >
                        <div className="cp_img">
                            <img src={API_URL_SQL+val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                                {
                                    total==this.state.dataParcelByIdMakanan.qty ?
                                    null:
                                    <>
                                    <BiPlus onClick={()=>this.AddDataMakanan(val.id)} className="icondp"/>
                                    </>
                                }
                                {
                                    total==0 ?
                                    null 
                                    :
                                    <BiMinus onClick={()=>this.hapusDataMakanan(val.id)} className="icondp"/>  
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
                            <img src={API_URL_SQL+val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >      
                            {
    
                                total==this.state.dataParcelByIdMinuman.qty ?
                                null:
                                <>
                                <BiPlus onClick={()=>this.AddDataMinuman(val.id)} className="icondp"/>
                                </>

                            }
                            {
                                total==0 ?
                                null 
                                :
                                <BiMinus onClick={()=>this.hapusDataMinuman(val.id)} className="icondp"/>  
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
                            <img src={API_URL_SQL+val.image} alt="logo" className="img-parcel" />
                            <div className="hover"  >
                            {
    
                                total==this.state.dataParcelByIdChocolate.qty ?
                                null:
                                <>
                                <BiPlus onClick={()=>this.AddDataChocolate(val.id)} className="icondp"/>
                                </>

                            }
                            {
                                total==0 ?  
                                null 
                                :
                                <BiMinus onClick={()=>this.hapusDataChocolate(val.id)} className="icondp"/>  
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

    renderDataCartProduct=()=>{
        var limitQtyMakanan= this.state.dataParcelByIdMakanan.qty // product_id
        var checklistMakanan= this.state.checklistMakanan
        // console.log(checklistMakanan)
        // console.log(limitQtyMakanan)
        // console.log(this.state.dataArrMakanan)

        return this.state.dataArrMakanan.map((val,index)=>{
            
            return (
                <>
                <tr>
                   <td>{val.namaProduct}</td>
                    <td></td>
                   <td> {val.qty}</td>
                   <td onClick={()=>this.onDeleteProduct(val.parcel_id,val.categoryproduct_id)}>
                       <AiFillDelete className="delete-icon"/>
                   </td>
                </tr>
                </>
            )
        })
    }

   

     saveMessage=()=>{
         console.log('button add message jalan')
            var limitMinuman = this.state.dataParcelByIdMinuman.qty
            var limitMakanan= this.state.dataParcelByIdMakanan.qty
            var limitChocolate= this.state.dataParcelByIdChocolate.qty
            
            var messagesend=this.state.arrMessage
            var parcelid=this.state.dataParcelByIdChocolate.parcel_id
            var sendToDb = this.state.dataArrMakanan
            var arrProduct= sendToDb.map((val)=>val.parcel_id)
            var qtyProduct = sendToDb.map((val)=>val.qty)
            var userid=this.props.id

           
            console.log(filterprodminuman,' line 519')
            var totalQtyMinuman = 0
            var totalQtyMakanan = 0
            var totalQtyChocolate = 0

            // looping minuman
            var productidminuman= this.state.dataParcelByIdMinuman.categoryproduct_id // product_id
            console.log(this.state.dataArrMakanan)
            var filterprodminuman = this.state.dataArrMakanan.filter((val)=>{
                return val.categoryproduct_id === productidminuman
            })
            for(var i =0; i<filterprodminuman.length; i++){
                totalQtyMinuman += filterprodminuman[i].qty
            }

            // looping makanan
            var productidmakanan= this.state.dataParcelByIdMakanan.categoryproduct_id
            var  filterprodmakanan= this.state.dataArrMakanan.filter((val)=>{
                return val.categoryproduct_id === productidmakanan
            })

            for(var i =0; i<filterprodmakanan.length; i++){
                totalQtyMakanan += filterprodmakanan[i].qty
            }

            // looping chocolate
            var productidchocolate=this.state.dataParcelByIdChocolate.categoryproduct_id
            var filterprodchocolate= this.state.dataArrMakanan.filter((val)=>{
                return val.categoryproduct_id === productidchocolate
            })

            for(var i=0; i<filterprodchocolate.length; i++){
                totalQtyChocolate += filterprodchocolate[i].qty
            }

            console.log(totalQtyMinuman,' total qty minuman')
            console.log(totalQtyChocolate,' total qty chocolate')
            console.log(totalQtyMakanan,' total qty Makanan')


            if(totalQtyMinuman == limitMinuman && totalQtyMakanan == limitMakanan && totalQtyChocolate == limitChocolate){
                console.log('true')
                var obj = {
                    user_id:userid,
                    products_id:"0",
                    parcel_id:parcelid,
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

            }else if(totalQtyMinuman < limitMinuman) {
                Swal.fire({
                    icon: 'error',
                    title: `Ada Barang Yang Kurang`,
                    text: `Anda Harus Memilih ${limitMinuman} Minuman`                   
                })
            }else if (totalQtyMakanan < limitMakanan){
                Swal.fire({
                    icon: 'error',
                    title: `Ada Barang Yang Kurang`,
                    text: `Anda Harus Memilih ${limitMakanan} Makanan`                  
                })
            }else if(totalQtyChocolate <limitChocolate){
                Swal.fire({
                    icon: 'error',
                    title: `Ada Barang Yang Kurang`,
                    text: `Anda Harus Memilih ${limitChocolate} Chocolate`                    
                })
            }
            
            
            console.log(arrProduct)
            console.log(qtyProduct[0])
            console.log(qtyProduct[1])
            console.log(qtyProduct[2])
            
            console.log(userid)


       

     }

     onLogoutClick=()=>{
        localStorage.removeItem('id')
        Swal.fire('Logout Berhasil')
        this.props.LogoutFunc()
        window.location.assign(`http://localhost:3000`)

     }

     productRandomSatuan=(id)=>{
         console.log(id,' product random satuan')
        let productid=id
        let userid= this.props.id

        Axios.post(`${API_URL_SQL}/transaksi/addtocartproduct`,{
            user_id:userid,
            products_id:productid,
            parcel_id:0,
            qty:1
        }).then((res)=>{
            Swal.fire({
                title: 'Sweet!',
                text: 'Berhasil Menambahkan Data',
                imageUrl: `${API_URL_SQL+res.data.image}`,
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: '',
              })
            console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })

         
     }

     productRandomParcel=(id)=>{
         console.log(id,' id parcel random')
        var limitMinuman = this.state.dataParcelByIdMinuman.qty
        var limitMakanan= this.state.dataParcelByIdMakanan.qty
        var limitChocolate= this.state.dataParcelByIdChocolate.qty

        var messagesend=this.state.arrMessage
        var parcelid=this.state.dataParcelByIdChocolate.parcel_id
        var sendToDb = this.state.dataArrMakanan
        var arrProduct= sendToDb.map((val)=>val.parcel_id)
        var qtyProduct = sendToDb.map((val)=>val.qty)
        var userid=this.props.id

        var totalQtyMinuman = 0
        var totalQtyMakanan = 0
        var totalQtyChocolate = 0

        var productidminuman= this.state.dataParcelByIdMinuman.categoryproduct_id // product_id
            console.log(this.state.dataArrMakanan)
            var filterprodminuman = this.state.dataArrMakanan.filter((val)=>{
                return val.categoryproduct_id === productidminuman
            })
            for(var i =0; i<filterprodminuman.length; i++){
                totalQtyMinuman += filterprodminuman[i].qty
            }

            // looping makanan
            var productidmakanan= this.state.dataParcelByIdMakanan.categoryproduct_id
            var  filterprodmakanan= this.state.dataArrMakanan.filter((val)=>{
                return val.categoryproduct_id === productidmakanan
            })

            for(var i =0; i<filterprodmakanan.length; i++){
                totalQtyMakanan += filterprodmakanan[i].qty
            }

            // looping chocolate
            var productidchocolate=this.state.dataParcelByIdChocolate.categoryproduct_id
            var filterprodchocolate= this.state.dataArrMakanan.filter((val)=>{
                return val.categoryproduct_id === productidchocolate
            })

            for(var i=0; i<filterprodchocolate.length; i++){
                totalQtyChocolate += filterprodchocolate[i].qty
            }

            if(totalQtyMinuman == limitMinuman && totalQtyMakanan == limitMakanan && totalQtyChocolate == limitChocolate){
                console.log('true')
                this.setState({RandomParcel:true})
                Swal.fire({
                    icon: 'success',
                    title: `Perfect!!`,
                    text: `Parcel Berhasil Ditambahkan ke Cart`                   
                })
                var obj = {
                    user_id:userid,
                    products_id:"0",
                    parcel_id:parcelid,
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

            }else if(totalQtyMinuman < limitMinuman) {
                Swal.fire({
                    icon: 'error',
                    title: `Ada Barang Yang Kurang, Selesaikan Isi Cart Terlebih Dahulu`,
                    text: `Anda Harus Memilih ${limitMinuman} Minuman`                   
                })
            }else if (totalQtyMakanan < limitMakanan){
                Swal.fire({
                    icon: 'error',
                    title: `Ada Barang Yang Kurang, Selesaikan Isi Cart Terlebih Dahulu`,
                    text: `Anda Harus Memilih ${limitMakanan} Makanan`                  
                })
            }else if(totalQtyChocolate <limitChocolate){
                Swal.fire({
                    icon: 'error',
                    title: `Ada Barang Yang Kurang, Selesaikan Isi Cart Terlebih Dahulu`,
                    text: `Anda Harus Memilih ${limitChocolate} Chocolate`                    
                })
            }

     }


     renderCartRandom=()=>{
        const child   = { width: `30em`, height: `50%`}
         let renderSatuan= this.state.renderRandomProduct.map((val,index)=>{
             return (
                <>
                    <div className="card " style={{width:'18rem'}}>
                        <img className="card-img-top" src={API_URL_SQL+val.image} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{val.nama}</h5>
                            <p className="card-text">{val.deskripsi}</p>
                            <a href="#" className="btn btn-primary" onClick={()=>this.productRandomSatuan(val.id)}> Beli</a>
                        </div>
                    </div>

                </>
             )
         })

         let renderParcel=this.state.renderRandomParcel.map((val,index)=>{
             return (
                 <>
                    <div className="card card-css" style={{width:'18rem'}}>
                        <img className="card-img-top" src={API_URL_SQL+val.image} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{val.nama}</h5>
                            <p className="card-text">{val.deskripsi}</p>
                            {
                                this.state.RandomParcel?
                                <a href={'/detailParcel/'+val.id} className="btn btn-primary" onClick={()=>this.productRandomParcel(val.id)}> Beli</a>
                                :
                                <a href='#' className="btn btn-primary" onClick={()=>this.productRandomParcel(val.id)}> Beli</a>
                            }
                        </div>
                    </div>
                 </>
             )
         })

         let final=[renderParcel,renderSatuan]
         return final

     }
     
  
    render() { 
        // console.log(API_URL_SQL)
    //   console.log(this.state.dataArrMakanan)
        console.log(this.findCategoryProduct)
            console.log(this.state.categoryProduct)
            const {classes}= this.props
            
        return ( 
            <>
                <div className="outer-detail">
                    <div className="header-top d-flex bd-highlight">
                        <div className="div-img p-2 flex-grow-1 bd-highlight">
                            <img src={Logo} alt="Logo" className="logo-header"/>    
                        </div>
                        
                        {
                        this.props.isLogin?
                            <div className="icon-user  ">
                                <Dropdown style={{marginRight:'10px', marginTop:'-5px'}}>
                                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                        <BiUser color="white" size="20" style={{cursor:"pointer", marginRight:'5px'}}/> 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                    <Dropdown.Item href="useraccount">
                                                <BiCart color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                                My Account
                                        </Dropdown.Item>
                                        <Dropdown.Item href="#/action-1" onClick={this.onLogoutClick}>
                                            <AiOutlineLogout color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            Logout
                                            </Dropdown.Item>
                                        <Dropdown.Item href="/cart">
                                                <BiCart color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                                Cart
                                        </Dropdown.Item>
                                        <Dropdown.Item href="/">
                                            <AiFillHome color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                            Home                         
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <p style={{fontSize:'15px', marginTop:'10px',color:'white'}}>
                                Hallo, {this.props.nama}</p>
                            
                            </div>
                    :
                            <div className="icon-user  ">
                                <Dropdown style={{marginRight:'10px', marginTop:'-5px'}}>
                                    <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                        <BiUser color="white" size="20" style={{cursor:"pointer", marginRight:'5px'}}/> 
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                            <Dropdown.Item href="/login" >
                                            <AiOutlineLogout color="#0984e3" size="20" style={{cursor:"pointer", marginRight:'10px'}}/>
                                            Login
                                            </Dropdown.Item>
                                            <Dropdown.Item href="/">
                                            <AiFillHome color="#0984e3" size="20" style={{cursor:"pointer",marginRight:'10px'}}/>
                                            Home                         
                                            </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                             </div>
                    }
                    </div>   



                    {/* END HEADER */}
                    <Link to='/dataproduct'>
                        <div className="div-opt">
                            <BsFillCaretLeftFill className="icon-back"/><p>back to Parcel</p>
                        </div>
                    </Link>

                    <div className="parcelname">
                        <h3>{this.state.dataParcelByIdChocolate.namaParcel}</h3>
                    </div>

                    <div className="body-render">
                        <div className="render-parcel" >

                                <div className="k-button" onClick={this.toggleDialog}>
                                    <p style={{marginLeft:'20px'}}>1.Pilih Makanan Yang Kamu Mau</p>
                                </div>
                                {this.state.visible && <div onClose={this.toggleDialog}>
                                    <Zoom>
                                        <div style={{display:'flex',flexWrap:'wrap'
                                                            }}>
                                            {this.renderMakanan()}
                                        </div>
                                    </Zoom>

                            </div>
                            }
                                <div className="k-button" onClick={this.toggleDialogMinuman}>
                                    <p style={{marginLeft:'20px'}}>2.Pilih Minuman Yang Kamu Mau</p>
                                </div>
                                {this.state.MinumanVisible && <div onClose={this.toggleDialogMinuman}>
                                    <Zoom>
                                        <div style={{display:'flex',flexWrap:'wrap'
                                                            }}>
                                            {this.renderMinuman()}
                                        </div>
                                    </Zoom>
                                </div>
                                }
                                <div className="k-button" onClick={this.toggleDialogChocolate}>
                                    <p style={{marginLeft:'20px'}}>3.Pilih Chocolate Yang Kamu Mau</p>
                                </div>
                                {this.state.ChocolateVisible && <div onClose={this.toggleDialogChocolate}>
                                    <Zoom>
                                        <div style={{display:'flex',flexWrap:'wrap'
                                                            }}>
                                            {this.renderChocolate()}
                                        </div>
                                    </Zoom>
                                </div>
                                }
                                <div className="k-button" onClick={this.toggleDialogMessage}>
                                    <p style={{marginLeft:'20px'}}>4.Isi Pesan Yang Kamu mau</p>
                                </div>
                                {this.state.messageVisible && <div onClose={this.toggleDialogMessage}>
                                    <Zoom>
                                        <div style={{display:'flex',flexWrap:'wrap',flexDirection:'column'
                                                            }}>
                                            <input type='text' className="form-control" onChange={(e)=>this.addMessage(e)} style={{transition:'500ms',width:'350px',marginTop:'10px'}} placeholder='Input Your Message'/>
                                            
                                        </div>
                                    </Zoom>
                                </div>
                                }

                                {/* <Scrollbars autoHeight autoHide  >
                                 */}
                                        <HorizontalScroll>
                                    <div style={{marginTop:'50px'}} className="random-cart">
                                                {this.renderCartRandom()}
                                    </div>
                                        </HorizontalScroll>

                                {/* </Scrollbars> */}
                                
                        
                        </div>
                        
                        

                            <div className="render-kanan">
                                    <div className="header-kanan">
                                        <img src={Logo} alt="Logo" className="logo-header-kanan" />  
                                    </div>
                                    <div className="cart-kanan">
                                        <p style={{fontSize:'25px',fontWeight:'700',color:'tomato'}}>CART</p>
                                    </div>
                                    <div className="message-kanan">
                                        <p style={{fontSize:'15px',fontWeight:'700',color:'tomato'}}>Message:</p>
                                        <p style={{marginTop:'-20px'}}>
                                            {this.state.arrMessage}
                                        </p>
                                    </div>

                                    <div className="cart-details">
                                        <p style={{fontSize:'15px',fontWeight:'700',color:'tomato'}}>Cart Details:</p>
                                    </div>

                                    <div className="render-data-kanan">
                                        <p style={{fontSize:'25px', marginLeft:'50px'}}>{this.state.dataParcelByIdChocolate.namaParcel}</p>
                                        <p>Details Package:</p>
                                        
                                            <table>
                                                <tr>
                                                    <th>Product</th>
                                                    <th></th>
                                                    <th>Qty</th>
                                                    <th>Action</th>
                                                </tr>
                                                
                                                {this.renderDataCartProduct()} 
                                              
                                                
                                            </table>
                                        
                                    </div>
                                        <a href="/cart">
                                            <div className="button-add" onClick={this.saveMessage}>
                                                <p>Beli</p>
                                            </div>
                                        </a>

                            </div>

                    </div>

                </div>
            </>
         );
    }
}

const MapStatetoprops=({Auth,cart})=>{
    return {
        ...Auth
    }
}

export default (connect(MapStatetoprops,{LogoutFunc})(DetailParcel))