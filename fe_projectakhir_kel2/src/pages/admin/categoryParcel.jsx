import React, { Component ,createRef} from 'react';
import HeaderAdmin from './../../components/header/headerAdmin'
import {MdAddShoppingCart} from 'react-icons/md'
import {GiMilkCarton} from 'react-icons/gi'
import Axios from 'axios'
import { API_URL_SQL } from '../../helpers/apiUrl';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
class CategoryParcel extends Component {
    state = {  
        categoryParcel:[],
        setModalParcel:false,
        nama:createRef()
    }
    componentDidMount(){
        Axios.get(`${API_URL_SQL}/product/getallcatparcel`)
        .then((res)=>{
            console.log(res.data)
            this.setState({categoryParcel:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
  
    onAddDataParcel=()=>{
        console.log('button jalan')
        this.setState({setModalParcel:true})
    }

    onDelete=()=>{
        console.log('delete jalan')
    }

    onSave=()=>{
        var {nama}=this.state
        var nama = nama.current.value
        
        Axios.post(`${API_URL_SQL}/product/addCatParcel`,{
            nama
        }).then((res)=>{
            console.log(res.data)
            this.setState({categoryParcel:res.data})
            this.setState({setModalParcel:false})
        }).catch((err)=>{
            console.log(err)
        })
    
    }

    renderCategoryParcel=()=>{
        return this.state.categoryParcel.map((val,index)=>{
            return (
                <>
                    <TableRow key={val.id}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{val.id}</TableCell>
                        <TableCell>{val.nama}</TableCell>
                        <TableCell>
                        <button onClick={()=>this.onDelete(val.id)}>Delete</button>
                        </TableCell>

                    </TableRow>
                </>
            )
        })
    }
    
    toggle = () => this.setState({setModalParcel:false});
    render() { 
        return ( 
            <>  
            <Modal isOpen={this.state.setModalParcel} toggle={this.toggle}>
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
                                 <p style={{fontWeight:'600'}}>Category Parcel</p>
                             </div>
                     </div>    
                <div className="btn-add" onClick={this.onAddDataParcel}>
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
                                     <TableCell>Action</TableCell>
                                 </TableRow>
                             </TableHead>
                             <TableBody>
                                {/* render disini */}
                                 {/* {this.renderUsers()} */}
                                {this.renderCategoryParcel()}
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
 
export default CategoryParcel;