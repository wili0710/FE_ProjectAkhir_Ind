import React, { Component } from 'react';
import HeaderAdmin from './../../components/header/headerAdmin'
import './user.css'
import {CgArrowRightR} from 'react-icons/cg'
import {FaUserCog,FaMoneyCheckAlt} from 'react-icons/fa'
import Axios from 'axios'
import { API_URL, API_URL_SQL } from '../../helpers/apiUrl';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



class User extends Component {
    state = {  
        dataUser:[]
    }

    componentDidMount(){
        Axios.get(`${API_URL_SQL}/admin/getalluser`)
        .then((res)=>{
            console.log(res.data)
            this.setState({dataUser:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    onChangeUser=(id)=>{
        console.log('button jalan ')
        console.log(id, ' ini id change user')
        var id2= id
        Axios.post(`${API_URL_SQL}/auth/changeuser`,{
            id:id2
        })
        .then((res)=>{
            console.log('berhasil update data')
            console.log(res.data)
            this.setState({dataUser:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }
    
    onChangeAdmin=(id)=>{
        console.log(id,' ini id change to admin')
        console.log('button jalan ')
        var id2= id
        Axios.post(`${API_URL_SQL}/auth/changeadmin`,{
            id:id2
        })
        .then((res)=>{
            console.log('berhasil update data')
            console.log(res.data)
            this.setState({dataUser:res.data})
        }).catch((err)=>{
            console.log(err)
        })
    }

    renderUsers=()=>{
        return this.state.dataUser.map((val,index)=>{
            console.log(index+1)
            // console.log(val.nama)
            console.log('render jalan')
            if(val.role==='admin'){
                return (

                    <>
                        <TableRow key={val.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{val.id}</TableCell>
                            <TableCell>{val.nama}</TableCell>
                            <TableCell>{val.email}</TableCell>
                            <TableCell>{val.role}</TableCell>
                            <TableCell>{val.statusver}</TableCell>
                            <TableCell>
                                <button onClick={()=>this.onChangeUser(val.id)}>Change to User</button>
                                <button onClick={()=>this.onDelete(val.id)}>Delete</button>
                            </TableCell>
                        </TableRow>
                    </>
                )
            }else {
                return (
                        <>
                        <TableRow key={val.id}>
                            <TableCell>{index+1}</TableCell>
                            <TableCell>{val.id}</TableCell>
                            <TableCell>{val.nama}</TableCell>
                            <TableCell>{val.email}</TableCell>
                            <TableCell>{val.role}</TableCell>
                            <TableCell>{val.statusver}</TableCell>
                            <TableCell>
                                <button onClick={()=>this.onChangeAdmin(val.id)}>Change to Admin</button>
                                <button onClick={()=>this.onDelete(val.id)}>Delete</button>
                            </TableCell>
                        </TableRow>
                    </>

                )
            }
        })
    }


    render() { 
        console.log(this.state.dataUser)
        return ( 
            <>
            <div className="user-container">
            <HeaderAdmin />
                <div className="user-right">
                    <div className="header-user">
                        <div className="icon-group">
                            <FaUserCog className="icon-user"/>
                            <p style={{fontWeight:'600'}}>User/Admin</p>
                        </div>
                    </div>
                    <div className="container-data">

                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>id</TableCell>
                                        <TableCell>Nama</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Role</TableCell>
                                        <TableCell>Status Verification</TableCell>
                                        <TableCell>Action</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                   {/* render disini */}
                                    {this.renderUsers()}
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
 
export default User;