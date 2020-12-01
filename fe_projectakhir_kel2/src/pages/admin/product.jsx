import React, { Component } from 'react';
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

class Product extends Component {
    state = { 
        dataProduct:[]
     }

     componentDidMount(){
         Axios.get(`${API_URL_SQL}/product/getallproduct`)
         .then((res)=>{
            console.log(res.data)
         }).catch((err)=>{
             console.log(err)
         })
     }

     onAddData=()=>{
         console.log('button jalan')
     }
    render() { 
        return ( 
            <>
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
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   {/* render disini */}
                                    {/* {this.renderUsers()} */}
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