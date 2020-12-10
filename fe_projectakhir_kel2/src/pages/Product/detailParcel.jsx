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
        checklistMinuman:false,
        checklistMakanan:false,
        checklistChocolate:false,
        renderCartMinuman:[],
        renderCartMakanan:[],
        renderCartChocolate:[]
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
            console.log(res.data,' line 62')
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
         Swal.fire({
            icon: 'success',
            title: 'Berhasil Menghapus Product',
            text: 'Berhasil Menambahkan Product'                    
        })
    
          if(total <= this.state.dataParcelByIdMinuman.qty){
             var dataArrMakanan = this.state.dataArrMakanan
            //  console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id = id
            })
            // console.log(a)

            if(dataArrMakanan[a].qty-1==0){
                dataArrMakanan.splice(a,1)             
            }else {
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
            }
            this.setState({dataArrMakanan:dataArrMakanan})

         }

     }
 
     hapusDataMakanan=(id)=>{
        //  console.log(id,'delete id ')
     
         var prodid= this.state.dataParcelByIdMakanan.categoryproduct_id
         var filterprod=this.state.dataArrMakanan.filter((val)=>{
             return val.categoryproduct_id === prodid
         })
         var total =0
         for(var i=0; i<filterprod.length; i++){
             total += filterprod[i].qty
         }
         Swal.fire({
            icon: 'success',
            title: 'Berhasil Menghapus Product',
            text: 'Berhasil Menghapus Product'                    
        })
    
          if(total <= this.state.dataParcelByIdMakanan.qty){
             var dataArrMakanan = this.state.dataArrMakanan
            //  console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id = id
            })
            // console.log(a)

            if(dataArrMakanan[a].qty-1==0){
                dataArrMakanan.splice(a,1)             
            }else {
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
            }
            this.setState({dataArrMakanan:dataArrMakanan})

         }
     }

     hapusDataChocolate=(id)=>{
        //  console.log(id)
         var prodid= this.state.dataParcelByIdChocolate.categoryproduct_id
         var filterprod=this.state.dataArrMakanan.filter((val)=>{
             return val.categoryproduct_id === prodid
         })
         var total =0
         for(var i=0; i<filterprod.length; i++){
             total += filterprod[i].qty
         }
         Swal.fire({
            icon: 'success',
            title: 'Berhasil Menghapus Product',
            text: 'Berhasil Menghapus Product'                    
        })
    
          if(total <= this.state.dataParcelByIdChocolate.qty){
             var dataArrMakanan = this.state.dataArrMakanan
            //  console.log(dataArrMakanan)
            var a = dataArrMakanan.findIndex((val)=>{
                return val.parcel_id = id
            })
            // console.log(a)

            if(dataArrMakanan[a].qty-1==0){
                dataArrMakanan.splice(a,1)             
            }else {
                dataArrMakanan[a].qty=dataArrMakanan[a].qty-1
            }
            this.setState({dataArrMakanan:dataArrMakanan})

         }
     }
     onDeleteProduct=(id)=>{
        var dataCart = this.state.dataArrMakanan
        dataCart.splice(id,1)
        this.setState({dataArrMakanan:dataCart})
    }

     
     
     AddDataMakanan=(id)=>{
        var dataArrMakanan = this.state.dataArrMakanan
        
        var a = dataArrMakanan.findIndex((val)=>{
            return val.parcel_id==id
        })

        var findMakanan=this.state.dataMakanan
        var find = findMakanan.findIndex((val=>{
            return val.id == id
        }))
        Swal.fire({
            icon: 'success',
            title: 'Berhasil Menambahkan Product',
            text: 'Berhasil Menambahkan Product'                    
        })

        
        if(a== -1){
            var arrMakanan2=this.state.dataArrMakanan
             arrMakanan2.push({
                parcel_id:id,
                qty:1,
                categoryproduct_id:this.state.dataParcelByIdMakanan.categoryproduct_id,
                namaProduct:this.state.dataMakanan[find].nama
            })
                
            this.setState({dataArrMakanan:arrMakanan2})
        }else {

            var dataSama = this.state.dataArrMakanan
            dataSama[a]= {...dataSama[a],qty:dataSama[a].qty+1}

            // arrMakanan2[a]={...arrMakanan2[a],qty:arrMakanan2[2].qty+1}
            // addData={...addData,qty:addData.qty+1}
            this.setState({dataArrMakanan:dataSama})
        }
        var totalQtyMakanan =0
        var limitMakanan = this.state.dataParcelByIdMakanan.qty
       var productidmakanan= this.state.dataParcelByIdMakanan.categoryproduct_id // product_id
       console.log(this.state.dataArrMakanan)
       var filterprodmakanan = this.state.dataArrMakanan.filter((val)=>{
           return val.categoryproduct_id === productidmakanan
       })
       for(var i =0; i<filterprodmakanan.length; i++){
           totalQtyMakanan += filterprodmakanan[i].qty
       }
       if(totalQtyMakanan == limitMakanan){
           console.log('checklistmakanan true 266')
           this.setState({checklistMakanan:true,renderCartMakanan:filterprodmakanan})
       }else {
           this.setState({renderCartMakanan:filterprodmakanan})
       }
       console.log(totalQtyMakanan,' total qty minuman 323')

    }

     AddDataMinuman=(id)=>{
        

         var dataArrMakanan = this.state.dataArrMakanan
         console.log(dataArrMakanan,' ini dataArrMakanan')
         var indexMinuman = dataArrMakanan.findIndex((val)=>{ // find index si product minuman

             return val.parcel_id==id
         })
         var findMinuman=this.state.dataMinuman
         var find = findMinuman.findIndex((val=>{
             return val.id == id
         }))
         Swal.fire({
            icon: 'success',
            title: 'Berhasil Menambahkan Product',
            text: 'Berhasil Menambahkan Product'                    
        })
 
         if(indexMinuman== -1){
             var arrMakanan2= this.state.dataArrMakanan
             arrMakanan2.push({
                 parcel_id:id,
                 qty:1,
                 categoryproduct_id:this.state.dataParcelByIdMinuman.categoryproduct_id,
                 namaProduct:this.state.dataMinuman[find].nama
             })
                this.setState({dataArrMakanan:arrMakanan2})
         }else {
             
             var dataSama = this.state.dataArrMakanan
             dataSama[indexMinuman]= {...dataSama[indexMinuman],qty:dataSama[indexMinuman].qty+1}
             this.setState({dataArrMakanan:dataSama})
         }

         var totalQtyMinuman =0
         var limitMinuman = this.state.dataParcelByIdMinuman.qty
        var productidminuman= this.state.dataParcelByIdMinuman.categoryproduct_id // product_id
        console.log(this.state.dataArrMakanan)
        var filterprodminuman = this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === productidminuman
        })
        console.log(filterprodminuman)
        for(var i =0; i<filterprodminuman.length; i++){
            totalQtyMinuman += filterprodminuman[i].qty
        }
        if(totalQtyMinuman == limitMinuman){
            console.log('checklistminuman true 266')
            this.setState({checklistMinuman:true,renderCartMinuman:filterprodminuman})
        }else {
            this.setState({renderCartMinuman:filterprodminuman})
        }
        console.log(totalQtyMinuman,' total qty minuman 323')
         
        // batas ngitung total qtyminuman


     }

     AddDataChocolate=(id)=>{
        

        var dataArrMakanan = this.state.dataArrMakanan // data array chocolate 
        var a = dataArrMakanan.findIndex((val)=>{

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
        if(a== -1){
            var arrMakanan2= this.state.dataArrMakanan
            arrMakanan2.push({
                parcel_id:id,
                qty:1,
                categoryproduct_id:this.state.dataParcelByIdChocolate.categoryproduct_id,
                namaProduct:this.state.dataChocolate[find].nama
            })
                this.setState({dataArrMakanan:arrMakanan2, })

        }else {
            
            var dataSama = this.state.dataArrMakanan
            dataSama[a]= {...dataSama[a],qty:dataSama[a].qty+1}
            this.setState({dataArrMakanan:dataSama})
        }


            var totalQtyChocolate =0
            var limitChocolate = this.state.dataParcelByIdChocolate.qty
        var productidminuman= this.state.dataParcelByIdChocolate.categoryproduct_id // product_id
        console.log(this.state.dataArrMakanan)
        var filterprodchocolate = this.state.dataArrMakanan.filter((val)=>{
            return val.categoryproduct_id === productidminuman
        })
        console.log(filterprodchocolate)
        for(var i =0; i<filterprodchocolate.length; i++){
            totalQtyChocolate += filterprodchocolate[i].qty
        }
        if(totalQtyChocolate == limitChocolate){
            console.log('checklistminuman true 266')
            this.setState({checklistChocolate:true,renderCartChocolate:filterprodchocolate})
        }else {
            this.setState({renderCartChocolate:filterprodchocolate})
        }
        console.log(totalQtyChocolate,' total qty minuman 323')
        
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
        console.log(filterprod, '333')
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
                            <img src={val.image} alt="logo" className="img-parcel" />
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
                            <img src={val.image} alt="logo" className="img-parcel" />
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

     renderCartMinuman=()=>{
        var checkMinuman= this.state.checklistMinuman
        return this.state.renderCartMinuman.map((val,index)=>{
            if(checkMinuman){
                return (
                    <>
                    <tr>
                       <td>{val.namaProduct}</td>
                           <td><FcCheckmark/></td>
                       <td> {val.qty}</td>
                       <td onClick={()=>this.onDeleteProduct(index)}>
                           <AiFillDelete className="delete-icon"/>
                       </td>
                    </tr>
                    </>
                )
            }else {
                return (
                    <>
                    <tr>
                       <td>{val.namaProduct}</td>
                        <td></td>
                       <td> {val.qty}</td>
                       <td onClick={()=>this.onDeleteProduct(index)}>
                           <AiFillDelete className="delete-icon"/>
                       </td>
                    </tr>
                    </>
                )
            }
        })
     }
     
     renderCartMakanan=()=>{
        var checkMakanan= this.state.checklistMakanan
        return this.state.renderCartMakanan.map((val,index)=>{
            console.log(index)
            if(checkMakanan){
                return (
                    <>
                    <tr>
                       <td>{val.namaProduct}</td>
                           <td><FcCheckmark/></td>
                       <td> {val.qty}</td>
                       <td onClick={()=>this.onDeleteProduct(index)}>
                           <AiFillDelete className="delete-icon"/>
                       </td>
                    </tr>
                    </>
                )
            }else {
                return (
                    <>
                    <tr>
                       <td>{val.namaProduct}</td>
                        <td></td>
                       <td> {val.qty}</td>
                       <td onClick={()=>this.onDeleteProduct(index)}>
                           <AiFillDelete className="delete-icon"/>
                       </td>
                    </tr>
                    </>
                )
            }
        })
         
     }

     renderCartChocolate=()=>{
        var checkChocolate= this.state.checklistChocolate
        return this.state.renderCartChocolate.map((val,index)=>{
            console.log(index)
            if(checkChocolate){
                return (
                    <>
                    <tr>
                       <td>{val.namaProduct}</td>
                           <td><FcCheckmark/></td>
                       <td> {val.qty}</td>
                       <td onClick={()=>this.onDeleteProduct(index)}>
                           <AiFillDelete className="delete-icon"/>
                       </td>
                    </tr>
                    </>
                )
            }else {
                return (
                    <>
                    <tr>
                       <td>{val.namaProduct}</td>
                        <td></td>
                       <td> {val.qty}</td>
                       <td onClick={()=>this.onDeleteProduct(index)}>
                           <AiFillDelete className="delete-icon"/>
                       </td>
                    </tr>
                    </>
                )
            }
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

            }else {
                Swal.fire({
                    icon: 'error',
                    title: 'Check Kembali Barang Anda',
                    text: 'Ada Barang Yang Kurang'                    
                })
            }
            
            console.log(arrProduct)
            console.log(qtyProduct[0])
            console.log(qtyProduct[1])
            console.log(qtyProduct[2])
            
            console.log(userid)


       

     }
     
  
    render() { 
            // console.log(this.state.dataArrMakanan)
            // console.log(this.state.dataMakanan)
            console.log(this.state.dataParcelByIdMinuman.qty ,' ini maksimal beli minuman')
            // console.log(this.props.id, 'line 531')
            
            const {classes}= this.props
        return ( 
            <>
                <div className="outer-detail">
                    <div className="header-top d-flex bd-highlight">
                        <div className="div-img p-2 flex-grow-1 bd-highlight">
                            <img src={Logo} alt="Logo" className="logo-header"/>    
                        </div>
                        
                        <div className="icon-user p-2 bd-highlight">
                            <Dropdown style={{marginRight:'10px', marginTop:'-5px'}}>
                                <Dropdown.Toggle variant="danger" id="dropdown-basic">
                                    <BiUser color="white" size="20" style={{cursor:"pointer", marginRight:'5px'}}/> 
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
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
                            Hallo, {this.props.name}</p>
                        
                        </div>
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
                                    <div style={{display:'flex',flexWrap:'wrap'
                                                        }}>
                                        {this.renderMakanan()}
                                    </div>

                            </div>
                            }
                                <div className="k-button" onClick={this.toggleDialogMinuman}>
                                    <p style={{marginLeft:'20px'}}>2.Pilih Minuman Yang Kamu Mau</p>
                                </div>
                                {this.state.MinumanVisible && <div onClose={this.toggleDialogMinuman}>
                                    <div style={{display:'flex',flexWrap:'wrap'
                                                        }}>
                                        {this.renderMinuman()}
                                    </div>
                                </div>
                                }
                                <div className="k-button" onClick={this.toggleDialogChocolate}>
                                    <p style={{marginLeft:'20px'}}>3.Pilih Chocolate Yang Kamu Mau</p>
                                </div>
                                {this.state.ChocolateVisible && <div onClose={this.toggleDialogChocolate}>
                                    <div style={{display:'flex',flexWrap:'wrap'
                                                        }}>
                                        {this.renderChocolate()}
                                    </div>
                                </div>
                                }
                                <div className="k-button" onClick={this.toggleDialogMessage}>
                                    <p style={{marginLeft:'20px'}}>4.Isi Pesan Yang Kamu mau</p>
                                </div>
                                {this.state.messageVisible && <div onClose={this.toggleDialogMessage}>
                                    <div style={{display:'flex',flexWrap:'wrap',flexDirection:'column'
                                                        }}>
                                        <input type='text' className="form-control" onChange={(e)=>this.addMessage(e)} style={{transition:'500ms',width:'350px',marginTop:'10px'}}/>
                                        
                                    </div>
                                </div>
                                }

                                <div style={{marginTop:'50px'}}>
                                    card parcel
                                </div>
                        
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
                                                
                            
                                                {this.renderCartMakanan()}
                                                {this.renderCartMinuman()}
                                                {this.renderCartChocolate()}
                                                
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

export default (connect(MapStatetoprops,{})(DetailParcel))