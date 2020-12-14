import React, { Component } from 'react';
// import Header from './../../components/Header'
import './myAccount.css'
import { Header, packageCarousel } from "../../components";
import bgKecil from './../../assets/bayu.JPG'
import smallParcel from './../../assets/d_parcel.png'
import gorillaworkout from './../../assets/gorillaworkout.png'
import {FaRegMoneyBillAlt,FaUser,FaKey,FaLock} from 'react-icons/fa'
import Dropdown from 'react-bootstrap/Dropdown';
// import ReactBootstrapStyle from '@bit/react-bootstrap.react-bootstrap.internal.style-links';
import Zoom from 'react-reveal/Zoom';
import Fade from 'react-reveal/Fade';
import classnames from 'classnames';
import {connect} from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import { GiTrophiesShelf } from 'react-icons/gi';
import {API_URL_SQL} from './../../helpers/apiUrl'
import {Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';
import debounce from 'lodash.debounce';
import Swal from 'sweetalert2';

class MyAccount extends Component {
    state = {
        activeTab:'1',
        isOpenPassword:false,
        newPassword:''

     }
    // var Dropdown = require("react-bootstrap-dropdown");
    toggle=(tab)=>{
        if(this.state.activeTab !== tab) {
            this.setState({activeTab:tab})
        }
    }

    onChangepassword=()=>{
        console.log('ganti password berhasil')
        this.setState({isOpenPassword:true})
    }

    onNewPassword=((e)=>{
        console.log(e.target.value) 
       this.setState({newPassword:e.target.value})
        
    })

    toggleModal = () => this.setState({isOpenPassword:false});

    onSave=()=>{
        let id = this.props.id
        // let newPassword = this.state.newPassword

        let upperCaseLetters = /[A-Z]/g
        let numbers = /[0-9]/g;
        var password=this.state.newPassword
            if(password.match(upperCaseLetters) && password.match(numbers) && password.length >6){
                console.log(password)
                Axios.post(`${API_URL_SQL}/admin/changepassword`,{
                    id,
                    password
                }).then((res)=>{
                    console.log(res.data)
                    this.setState({isOpenPassword:false})
                    Swal.fire({
                        icon: 'success',
                        title: 'Password Anda Berhasil Diubah',
                        text: 'Password Berhasil Disimpan'                    
                    }) 
                }).catch((err)=>{
                    console.log(err)
                })
                
    
            }else if(password.match(upperCaseLetters) && password.match(numbers)){
                
                Swal.fire({
                    icon: 'Error',
                    title: 'Password Salah!',
                    text: 'Password Harus Lebih dari 6 Character'                    
                }) 
            }else if(password.match(upperCaseLetters) && password.length>6){
                
                Swal.fire({
                    icon: 'Error',
                    title: 'Password Salah!',
                    text: 'Password Harus ada Angka'                    
                }) 
            }else if(password.match(numbers) && password.match(password.length>6)){
                
                Swal.fire({
                    icon: 'Error',
                    title: 'Password Salah!',
                    text: 'Password Harus ada Huruf Besar'                    
                }) 
            }else if(password.match(upperCaseLetters)){
                // console.log('masuk else change new password')
                
                Swal.fire({
                    icon: 'Error',
                    title: 'Password Salah!',
                    text: 'Password Harus Ada Angka dan  Lebih dari 6 Character'                    
                }) 
            }else if(password.match(numbers)){
                
                Swal.fire({
                    icon: 'Error',
                    title: 'Password Salah!',
                    text: 'Password Harus  Ada Huruf Capital dan Lebih dari 6 Character'                    
                }) 
            }else if(password.length <6){ Swal.fire({
                icon: 'Error',
                title: 'Password Salah!',
                text: 'Password Harus Ada Huruf Besar Dan Angka'                    
            })  
            }else {
                console.log('masuk ke else')
            }


    }


    render() { 
        console.log(this.props.nama)
        return ( 
            <>
            <Modal isOpen={this.state.isOpenPassword} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}> Ganti Password</ModalHeader>
                <ModalBody>
                    <p>Silahkan Masukan Password Baru anda</p>
                    <input type='password' onChange={this.onNewPassword} placeholder='Masukan Password Baru Anda' style={{marginBottom:'5px'}}  />                                       
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.onSave}>Save</Button>
                    <Button color="primary" onClick={this.toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
            




            // batas render
            <div>
                <Header/>
                <div className="div-luar">
                    <div className="div-dalem-kiri">
                        <div className="box-kiri">
                            <div className="img-kecil">
                                <img src={bgKecil} alt="error cok" width="50px" height="50px" style={{border:'1px solid black'}}/>
                                <p>{this.props.nama}</p>
                            </div>
                            <div className="img-kecil2">
                                <img src={smallParcel} alt="error cok" width="50px" height="50px" />
                                <div className="go-bay">
                                    <div className="gobay-kiri">
                                        <p>Heart to heart Cash</p>
                                        <p>HTH Points</p>
                                    </div>
                                    <div className="gobay-kanan"> 
                                        <p>Rp.1.000.500</p>
                                        <p>999</p>
                                    </div>
                                </div>
                            </div>
                            <div className="img-kecil3">
                            <FaRegMoneyBillAlt className="ikon"/>
                                <div className="go-bay">
                                    <div className="saldo-kiri">
                                        <p>Saldo</p>
                                    </div>
                                    <div className="saldo-kanan"> 
                                        <p>Rp.1.000.500</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                            <Dropdown className="big-dd">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dd-atas">
                                    INBOX
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dd-bawah">
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1" className="dd-inside">Chat</Dropdown.Item>
                                    </Zoom>
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1"  className="dd-inside">Product Discussion</Dropdown.Item>
                                    </Zoom>
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1"  className="dd-inside">review</Dropdown.Item>
                                    </Zoom>
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1"  className="dd-inside">Complain Message</Dropdown.Item>
                                    </Zoom>
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1"  className="dd-inside">Update</Dropdown.Item>
                                    </Zoom>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>

                            <div>
                            <Dropdown className="big-dd">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dd-atas">
                                    Pembelian
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dd-bawah">
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1" className="dd-inside">Waiting Payment</Dropdown.Item>
                                    </Zoom>
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1"  className="dd-inside">List Of Transaction</Dropdown.Item>
                                    </Zoom>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>

                            <div>
                            <Dropdown className="big-dd">
                                <Dropdown.Toggle variant="success" id="dropdown-basic" className="dd-atas">
                                    My Profile
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="dd-bawah">
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1" className="dd-inside">Wishlist</Dropdown.Item>
                                    </Zoom>
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1"  className="dd-inside">Toko Favorit</Dropdown.Item>
                                    </Zoom>
                                    <Zoom clear>
                                        <Dropdown.Item href="#/action-1"  className="dd-inside">Pengaturan</Dropdown.Item>
                                    </Zoom>
                                </Dropdown.Menu>
                            </Dropdown>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="div-dalem-kanan">
                        <div className="logokecil">
                            <FaUser className="logo-dlm"/>
                            <p>Bayu Darmawan</p>
                        </div>
                        <div>
                        <Nav tabs>
                                <NavItem className="cursor-nav">

                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>
                                        Biodata Diri
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}>
                                        Daftar Alamat
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}>
                                        Pembayaran
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '4' })}
                                        onClick={() => { this.toggle('4'); }}>
                                        Rekening Bank
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '5' })}
                                        onClick={() => { this.toggle('5'); }}>
                                        Notification
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '6' })}
                                        onClick={() => { this.toggle('6'); }}>
                                        Keamanan
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>   
                                <TabPane  tabId="1" className="tab-row-1 tabpanel">
                                    <Row className="tabpanel">
                                    <div className="biodata">
                                        <Zoom>

                                        
                                            <div className="div-biodata">
                                                <div className="biodata-kiri">
                                                    <div className="img-biodata">
                                                        <img src={bgKecil} alt="error" width="280px" height="250px"/>
                                                        <div className="btn-pilih"> 
                                                            <p>Change Photo</p>
                                                        </div>
                                                    </div>
                                                    <div className="password-change" onClick={this.onChangepassword}>
                                                        <div className="btn-pass">
                                                            <FaKey className="ikon-1"/>
                                                            <p className="pass-1">Change Your Password</p>
                                                        </div>

                                                    </div>
                                                    <div className="pin-purwa">
                                                        <div className="btn-pin">
                                                        <FaLock className="ikon-1"/>
                                                        <p className="pass-1">Pin Purwa Store</p>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="biodata-kanan">
                                                    <div className="bio-kiri">
                                                        
                                                        <p>Ubah Biodata Diri</p>
                                                        <p>Nama</p>
                                                        <p>Tanggal Lahir</p>
                                                        <p>Jenis Kelamin</p>
                                                        <p>Ubah Kontak</p>
                                                        <div className="d-flex">
                                                            <p>Email</p> &nbsp;
                                                            <p className="ubah"> ubah</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p>Nomor Hp</p>  &nbsp;
                                                            <p className="ubah">ubah</p>
                                                        </div>


                                                    </div>
                                                    <div className="bio-kanan">
                                                      
                                                        <p>{this.props.nama}</p>
                                                        <p>2 Agustus 1996</p>
                                                        <p>Laki-Laki</p>
                                                        <p>Ubah Kontak</p>
                                                        <p>{this.props.email}</p>
                                                        <p>{this.props.nomortelfon}</p>

                                                    </div>
                                                </div>
                                            </div>
                                    </Zoom>  
                                    </div>
                                    </Row>
                                </TabPane>
                                <TabPane tabId="2" className="tab-row-2 tabpanel">
                                <Row >     
                                    <div className="biodata">
                                        <Zoom>
                                            <div className="div-biodata">
                                                <div className="biodata-kiri">
                                                    <div className="img-biodata">
                                                        <img src={bgKecil} alt="error" width="280px" height="250px"/>
                                                        <div className="btn-pilih"> 
                                                            <p>Change Photo</p>
                                                        </div>
                                                    </div>
                                                    <div className="password-change" >
                                                        <div className="btn-pass">
                                                            <FaKey className="ikon-1"/>
                                                            <p className="pass-1">Change Your Password</p>
                                                        </div>

                                                    </div>
                                                    <div className="pin-purwa">
                                                        <div className="btn-pin">
                                                        <FaLock className="ikon-1"/>
                                                        <p className="pass-1">Pin Purwa Store</p>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="biodata-kanan">
                                                    <div className="bio-kiri">
                                                        
                                                        <p>Ubah Biodata Diri</p>
                                                        <p>Nama</p>
                                                        <p>Tanggal Lahir</p>
                                                        <p>Jenis Kelamin</p>
                                                        <p>Ubah Kontak</p>
                                                        <div className="d-flex">
                                                            <p>Email</p> &nbsp;
                                                            <p className="ubah"> ubah</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p>Nomor Hp</p>  &nbsp;
                                                            <p className="ubah">ubah</p>
                                                        </div>


                                                    </div>
                                                    <div className="bio-kanan">
                                                      
                                                        <p>Bayu Darmawan</p>
                                                        <p>2 Agustus 1996</p>
                                                        <p>Laki-Laki</p>
                                                        <p>Ubah Kontak</p>
                                                        <p>darmawanbayu1@gmail.com</p>
                                                        <p>087785192296</p>

                                                    </div>
                                                </div>
                                            </div>
                                    </Zoom>  
                                    </div>
                                        
                                
                                    
                                </Row>
                                </TabPane>
                                <TabPane  tabId="3" className="tab-row-1 tabpanel">
                                    <Row>
                                    <div className="biodata">
                                        <Zoom>
                                            <div className="div-biodata">
                                                <div className="biodata-kiri">
                                                    <div className="img-biodata">
                                                        <img src={bgKecil} alt="error" width="280px" height="250px"/>
                                                        <div className="btn-pilih"> 
                                                            <p>Change Photo</p>
                                                        </div>
                                                    </div>
                                                    <div className="password-change">
                                                        <div className="btn-pass">
                                                            <FaKey className="ikon-1"/>
                                                            <p className="pass-1">Change Your Password</p>
                                                        </div>

                                                    </div>
                                                    <div className="pin-purwa">
                                                        <div className="btn-pin">
                                                        <FaLock className="ikon-1"/>
                                                        <p className="pass-1">Pin Purwa Store</p>
                                                        </div>
                                                    </div>


                                                </div>
                                                <div className="biodata-kanan">
                                                    <div className="bio-kiri">
                                                        
                                                        <p>Ubah Biodata Diri</p>
                                                        <p>Nama</p>
                                                        <p>Tanggal Lahir</p>
                                                        <p>Jenis Kelamin</p>
                                                        <p>Ubah Kontak</p>
                                                        <div className="d-flex">
                                                            <p>Email</p> &nbsp;
                                                            <p className="ubah"> ubah</p>
                                                        </div>
                                                        <div className="d-flex">
                                                            <p>Nomor Hp</p>  &nbsp;
                                                            <p className="ubah">ubah</p>
                                                        </div>


                                                    </div>
                                                    <div className="bio-kanan">
                                                      
                                                        <p>Bayu Darmawan</p>
                                                        <p>2 Agustus 1996</p>
                                                        <p>Laki-Laki</p>
                                                        <p>Ubah Kontak</p>
                                                        <p>darmawanbayu1@gmail.com</p>
                                                        <p>087785192296</p>

                                                    </div>
                                                </div>
                                            </div>
                                    </Zoom>  
                                    </div>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </div>

                    </div>

                </div>
            </div>

            </>
         );
    }
}

const MapStatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}
export default (connect(MapStatetoprops,{})(MyAccount))
