import React, { Component,createRef } from 'react';
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

class Product extends Component {
    state = { 
        dataProduct:[],
        setModalAdd:false,
        dataForm:{
            nama:createRef(),
            image:createRef(),
            harga:createRef(),
            stok:createRef(),
            deskripsi:createRef(),
            catProduct:createRef()
        },
        fileImage:null,
        categoryProduct:[]

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

     onDelete=()=>{
         console.log('delete jalan')
     }

     renderProduct=()=>{
         return this.state.dataProduct.map((val,index)=>{
             return (
                 <>
                    <TableRow key={val.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.id}</TableCell>
                        <TableCell>{val.nama}</TableCell>
                        <TableCell>
                            <img src={API_URL_SQL+val.image} alt={val.nama} style={{height:'50px',width:'50px'}}/>
                            </TableCell>
                        <TableCell>{val.harga}</TableCell>
                        <TableCell>{val.stok}</TableCell>
                        <TableCell>{val.deskripsi}</TableCell>
                        <TableCell>{val.categoryproduct_id}</TableCell>
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
                <option value={val.id}>Category : {val.id } </option>
             )
         })
     }


     onAddData=()=>{
         console.log('button jalan')
         this.setState({setModalAdd:true})
     }

     onSave=()=>{
         var{nama,harga,stok,deskripsi,catProduct}=this.state.dataForm
         var nama=nama.current.value
         var harga=harga.current.value
         var stok=stok.current.value
         var deskripsi=deskripsi.current.value
         var image = this.state.fileImage
         var categoryproduct_id = catProduct.current.value
         var data = {nama,harga,stok,deskripsi,image,categoryproduct_id}
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

     toggle = () => this.setState({setModalAdd:false});
    render() { 
        console.log(this.state.categoryProduct)
        return ( 
            <>
                <Modal isOpen={this.state.setModalAdd} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}> Add Product</ModalHeader>
                    <ModalBody>
                        <input type='text' ref={this.state.dataForm.nama} placeholder='Masukan Nama Barang' className="form-control mb-2"/>
                        <input type='file' onChange={this.onInputPhoto} placeholder='Masukan Gambar' style={{marginBottom:'5px'}}  />
                        <input type='text' ref={this.state.dataForm.harga} placeholder='Masukan Harga Barang' className="form-control mb-2"/>
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
                        <div className="btn-add" onClick={this.onAddData}>
                           <p>Add Data</p>
                        </div>
                    <div className="container-data">

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>id</TableCell>
                                        <TableCell>Nama</TableCell>
                                        <TableCell>Gambar</TableCell>
                                        <TableCell>Harga</TableCell>
                                        <TableCell>Stock</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell>Category Product</TableCell>
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