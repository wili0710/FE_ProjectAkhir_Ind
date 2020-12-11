import React, { Component,createRef, useCallback } from 'react';
import './product.css'
import HeaderAdmin from './../../components/header/headerAdmin'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {MdAddShoppingCart} from 'react-icons/md'
import Axios from 'axios'
import { API_URL_SQL } from '../../helpers/apiUrl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import debounce from 'lodash.debounce';

import InputBase from '@material-ui/core/InputBase';
import ReactPaginate from 'react-paginate';


class Product extends Component {

   

    state = { 
        dataProduct:[],
        setModalAdd:false,
        dataForm:{
            nama:createRef(),
            image:createRef(),
            harga:createRef(),
            hargapokok:createRef(),
            stok:createRef(),
            deskripsi:createRef(),
            catProduct:createRef(),
            isOpen:false
        },
        fileImage:null,
        categoryProduct:[],
        searchData:'',
        testSearching:[]
     }

     componentDidMount(){
         Axios.get(`${API_URL_SQL}/product/getallproduct`)
         .then((res)=>{
            console.log(res.data)
            this.setState({dataProduct:res.data})
         }).catch((err)=>{
             console.log(err)
         })

         Axios.get(`${API_URL_SQL}/product/getallcatprod`)
         .then((res)=>{
            console.log(res.data)
            this.setState({categoryProduct:res.data})
         }).catch((err)=>{
             console.log(err)
         })

     }

     onDelete=(id)=>{
         console.log('delete jalan')
         let id2=id
         Axios.post(`${API_URL_SQL}/product/deleteprod`,{
             id:id2
         })
         .then((res)=>{
             console.log(res.data)
             console.log('berhasil delete')
             this.setState({dataProduct:res.data})
            
         }).catch((err)=>{
             console.log(err)
         })      
     }



     renderProduct=()=>{
         return this.state.dataProduct.map((val,index)=>{
             return (
                 <>
                    <TableRow key={val.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.id}</TableCell>      
                        <TableCell>{val.deskripsi}</TableCell>
                        <TableCell>
                            <img src={API_URL_SQL+val.image} alt={val.nama} style={{height:'50px',width:'50px'}}/>
                            </TableCell>
                        <TableCell>{val.harga}</TableCell>
                        <TableCell>{val.stok}</TableCell>
                        <TableCell>{val.namaCategory}</TableCell>
                        <TableCell>{val.categoryproduct_id} </TableCell>
                        <TableCell>Rp.{val.hargapokok}</TableCell>
                        <TableCell>
                            <button onClick={()=>this.onDelete(val.id)}>Delete</button>
                        </TableCell>
                    </TableRow>
                 </>
             )
         })
     }

     onInputPhoto=(e)=>{
         console.log(e.target.files)
         if(e.target.files[0]){
             console.log(e.target.files[0])
             this.setState({fileImage:e.target.files[0]})
         }else {
             console.log('hapus')
             this.setState({fileImage:null})
         }
     }

     renderCatProd=()=>{
         return this.state.categoryProduct.map((val,index)=>{
             return (
                <option value={val.id}>Category : {val.id } {val.nama} </option>
             )
         })
     }


     onAddData=()=>{
         console.log('button jalan')
         this.setState({setModalAdd:true})
     }

     onSave=()=>{
         var{nama,harga,stok,deskripsi,catProduct,hargapokok}=this.state.dataForm
         var nama=nama.current.value
         var harga=harga.current.value
         var stok=stok.current.value
         var hargapokok = hargapokok.current.value
         var deskripsi=deskripsi.current.value
         var image = this.state.fileImage
         var categoryproduct_id = catProduct.current.value
         var data = {nama,harga,stok,deskripsi,image,categoryproduct_id,hargapokok}
         console.log(data , ' ini data 111')
         if(image){
             console.log('masuk ke dalam if image data ada')
             let formData=new FormData()
             let options={
                 headers:{
                     'Content-type':'multipart/form-data'
                 }
             }
             formData.append('image',image)
             formData.append('data',JSON.stringify(data))
             console.log('onsave setelah formdata.append')

             Axios.post(`${API_URL_SQL}/product/addProductimage`,formData,options)
             .then((res)=>{
                console.log(res.data)
                this.setState({dataProduct:res.data})
                this.setState({setModalAdd:false})
             }).catch((err)=>{
                 console.log(err)
             })

         }else {
             alert('pilih foto')
         }
         console.log('selesai upload')
     }


    //  TESTING DEBOUNCE BARU

      onChangeSearch=debounce(function(e){
          console.log(e.target.value,' debounce ')
          if(e.target.value){
              this.setState({searchData:e.target.value})
              this.filterSearch(e.target.value)
          }else if (e.target.value == ''){
              console.log('data kosong')
              Axios.get(`${API_URL_SQL}/product/getallproduct`)
              .then((res)=>{
                 console.log(res.data)
                 this.setState({dataProduct:res.data})
              }).catch((err)=>{
                  console.log(err)
              })
          }
      },1000)

     filterSearch=(input)=>{
         console.log(input, ' ini input')
         var filterdata = this.state.dataProduct.filter((val)=>{
             return val.nama.toLowerCase().includes(input.toLowerCase())
         })
         this.setState({testSearching:filterdata,dataProduct:filterdata})

     }
     



     toggle = () => this.setState({setModalAdd:false});
    render() { 
        console.log(this.state.dataProduct)
        console.log(this.state.testSearching)
        return ( 
            <>
                <Modal isOpen={this.state.setModalAdd} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Add Product</ModalHeader>
                    <ModalBody>
                        <input type='text' ref={this.state.dataForm.nama} placeholder='Masukan Nama Barang' className="form-control mb-2"/>
                        <input type='file' onChange={this.onInputPhoto} placeholder='Masukan Gambar' style={{marginBottom:'5px'}}  />
                        <input type='text' ref={this.state.dataForm.harga} placeholder='Masukan Harga Barang' className="form-control mb-2"/>
                        <input type='text' ref={this.state.dataForm.hargapokok} placeholder='Masukan Harga Pokok Barang' className="form-control mb-2"/>
                        <input type='text' ref={this.state.dataForm.stok} placeholder='Masukan Stock Barang' className="form-control mb-2"/>
                        <input type='text' ref={this.state.dataForm.deskripsi} placeholder='Masukan Deskripsi Barang' className="form-control mb-2"/>
                        <select ref={this.state.dataForm.catProduct} defaultValue={0}>
                            {this.renderCatProd()}
    
                        </select>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSave}>Save</Button>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

            {/* BATAS */}
                <div className="user-container">
                    <HeaderAdmin />
                <div className="user-right">
                    <div className="header-user">
                        <div className="icon-group">
                            <MdAddShoppingCart className="icon-user"/>
                            <p style={{fontWeight:'600'}}>Product</p>
                        </div>
                    </div>
                    <div className="header-bawah">
                        <div className="btn-add" onClick={this.onAddData}>
                           <p>Add Data</p>
                        </div>
                        <div className="searching">
                
                            <input type='text' 
                            defaultValue={this.props.value}
                            onChange = {(e)=>this.onChangeSearch(e)} 
                            // onChange={(e)=>this.search(e.target.value)}

                            onFocus = {()=>this.setState({isOpen:true})} 
                            onBlur ={()=>setTimeout(() => {this.setState()}, 100)}
                             placeholder='Search' style={{marginBottom:'5px'}} 
                             className="input-search" />

                        </div>
                    </div>
                    <div className="container-data">

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>Id Product</TableCell>
                                        <TableCell>Nama</TableCell>
                                        <TableCell>Gambar</TableCell>
                                        <TableCell>Harga</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Nama Category</TableCell>
                                        <TableCell>Category Product</TableCell>
                                        <TableCell>Harga Pokok</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   {/* render disini */}
                                    {/* {this.renderUsers()} */}
                                    {this.renderProduct()}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </div>
            </>
         );
    }
}
 
export default Product;