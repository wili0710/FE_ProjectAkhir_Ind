import React, { Component ,createRef} from 'react';
import HeaderAdmin from './../../components/header/headerAdmin'
import {MdAddShoppingCart} from 'react-icons/md'
import {GiMilkCarton} from 'react-icons/gi'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import './categoryProduct.css'
import { API_URL_SQL } from '../../helpers/apiUrl';
import Axios from 'axios'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import ReactPaginate from 'react-paginate';

class CategoryProduct extends Component {
    state = { 
        categoryProduct:[],
        setModalProduct:false,
        nama:createRef(),
        offset:0,
        perPage:7,
        currentPage:0,
        slice:[]
     }

     componentDidMount(){
         Axios.get(`${API_URL_SQL}/product/getallcatprod`)
         .then((res)=>{
            console.log(res.data)
            this.setState({categoryProduct:res.data})
            this.pagination()
         }).catch((err)=>{
             console.log(err)
         })
     }

     onAddDataProd=()=>{
         console.log('butotn jalan')
         this.setState({setModalProduct:true})
     }
     onDelete=(id)=>{
         console.log('delete data')
        let id2=id
         Axios.post(`${API_URL_SQL}/product/deletecatprod`,{
            id:id2
         })
         .then((res)=>{
             console.log(res.data)
             this.setState({categoryProduct:res.data})
             this.pagination()
         }).catch((err)=>{
             console.log(err)
         })
     }
     onSave=()=>{
         console.log('save button')
         var {nama}=this.state
         var nama = nama.current.value

         Axios.post(`${API_URL_SQL}/product/addCatProd`,{
             nama
         })
         .then((res)=>{
            console.log(res.data)
            this.setState({categoryProduct:res.data})
            this.setState({setModalProduct:false})
         }).catch((err)=>{
             console.log(err)
         })
     }

     renderCategoryProduct=()=>{
         return this.state.categoryProduct.map((val,index)=>{
             return (
                <TableRow key={val.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{val.id}</TableCell>
                <TableCell>{val.nama}</TableCell>
                <TableCell>
                <button onClick={()=>this.onDelete(val.id)}>Delete</button>
                </TableCell>

            </TableRow>
             )
         })
     }

     pagination=()=>{
        var data =this.state.categoryProduct
        let slice = data.slice(this.state.offset, this.state.offset+this.state.perPage)
        console.log(data)
        console.log(slice)
        this.setState({slice:slice})

        const postData =  slice.map((val,index)=>{
            return (
            <TableRow key={val.id}>
                <TableCell>{index+1}</TableCell>
                <TableCell>{val.id}</TableCell>
                <TableCell>{val.nama}</TableCell>
                <TableCell>
                <button onClick={()=>this.onDelete(val.id)}>Delete</button>
                </TableCell>

            </TableRow>

            )
        })
        this.setState({pageCount:Math.ceil(data.length/this.state.perPage),postData})

    }

    handlePageClick=(e)=>{
        const selectedPage= e.selected
        const offset = selectedPage * this.state.perPage
        this.setState({
            currentPage:selectedPage,
            offset:offset
        },()=>{
            this.pagination()
        })
    }

     toggle = () => this.setState({setModalProduct:false});
    render() { 
        return ( 
            <>  
            <Modal isOpen={this.state.setModalProduct} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
                <ModalBody>
                <input type='text' ref={this.state.nama} placeholder='Masukan Nama Category Parcel' className="form-control mb-2"/>
                </ModalBody>
                <ModalFooter>
                <Button color="primary" onClick={this.onSave}>Save</Button>
                        <Button color="primary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            {/* BATAS MODALS */}
               <div className="user-container">
                   <HeaderAdmin />
                   <div className="user-right">
                        <div className="header-user">
                                <div className="icon-group">
                                <GiMilkCarton className="icon-size"/>
                                    <p style={{fontWeight:'600'}}>Category Product</p>
                                </div>
                        </div>    
                   <div className="btn-add" onClick={this.onAddDataProd}>
                           <p>Add Data</p>
                    </div>
                    <div>
                        <ReactPaginate
                        previousLabel={"Prev"}
                        nextLabel={"Next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"page pagination"}
                        activeClassName={"active"}
                        />
                    </div>
                   <div className="container-data">
                   <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>id</TableCell>
                                        <TableCell>Nama</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   {/* render disini */}
                                    {/* {this.renderUsers()} */}
                                    {this.state.postData}
                                    {/* {this.renderCategoryProduct()} */}
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
 
export default CategoryProduct;