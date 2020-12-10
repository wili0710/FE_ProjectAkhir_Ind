import React, { Component } from 'react';
import './dataProduct.css'
import Zoom from 'react-reveal/Zoom';
import classnames from 'classnames';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Header from './../../components/header/header'
import { Link } from 'react-router-dom'
import { API_URL, API_URL_SQL } from '../../helpers/apiUrl';
import Axios from 'axios'
import {FullPageLoading} from './../../components/loading'
import {connect} from 'react-redux';
import Logo from './../../assets/logo.png'
import { Badge } from '@material-ui/core';
import {BiCart,BiUser} from 'react-icons/bi'
import { red } from '@material-ui/core/colors';
import Swal from 'sweetalert2';
import {Dropdown} from 'react-bootstrap'
import {AiOutlineLogout,AiFillHome} from 'react-icons/ai'

class dataProduct extends Component {
    state = {
        activeTab:"1",
        profilePict:'',
        dataParcel:[],
        allDataParcel:[],
        dataMinuman:[],
        dataMakanan:[],
        dataChocolate:[],
        loadingParcel:true,
        showCart:false,
        showMenuUser:false



      }
      toggle=(tab)=>{
          if(this.state.activeTab !== tab){
              this.setState({activeTab:tab})
          }
      }

    componentDidMount(){
        Axios.get(`${API_URL_SQL}/product/getDataParcel`)
        .then((res)=>{
            // console.log(res.data)
            this.setState({dataParcel:res.data})
            // this.setState({loadingParcel:false})
        }).catch((err)=>{
            console.log(err)
        })
        Axios.post(`${API_URL_SQL}/product/getDataParcelByAll`)
        .then((res)=>{
            // console.log(res.data, ' ini product all')
            this.setState({allDataParcel:res.data})
            this.setState({loadingParcel:false})
        }).catch((err)=>{
            console.log(err)
        })
        console.log("jaln jalan")
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
    onCheckData=(id)=>{
        console.log(id)
    }


    renderParcel=()=>{
        console.log(this.state.loading)
        if(this.state.loading){
            return null
        }else{
            console.log(this.state.allDataParcel)
            return this.state.dataParcel.map((val,index)=>{
              var render=this.state.allDataParcel.filter(function(parcel){
        
                  return parcel.parcel_id == val.id
              })
            //   console.log(render, ' ini render line 76')
                console.log('jalam dalem map ' , val.id)
                return (
                    <div className="box-3 item " key={val.id} onClick={()=>this.onCheckData(val.id)} >
                        <Link to={'/detailParcel/'+val.id}>
                            <div className="box">
                                <img src={val.gambar} alt="logo" className="img-parcel " />      
                                <div className="cover">
                                    <p className="name">{val.nama}</p>
                                    <p className="title">Rp.{val.harga}</p>
                                    <p className="social">Custom Parcel:</p>
                                    <p className="social">{render[0].nama} : {render[0].qty}</p>
                                    <p className="social">{render[1].nama} : {render[1].qty}</p>
                                    <p className="social">{render[2].nama} : {render[2].qty}</p>
                                </div>          
                            </div>
                        </Link>
                        <p className="nama-parcel">{val.nama}</p>
                    </div>
                )
            })
        }
    }

    renderChocolate=()=>{
        return this.state.dataChocolate.map((val,index)=>{
            return (
                <div className=" box-3 card product_item" key={val.index} onClick={()=>this.onCheckDataChocolate(val.id)}>
                <div className="body">
                    <div className="cp_img">
                        <img src={val.image} alt="logo" className="img-parcel"/>
                        <div className="hover">
                            <a href="javascript:void(0);" className="btn btn-primary btn-sm waves-effect"><i className="zmdi zmdi-shopping-cart"></i>Add To Cart</a>
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
            </div>

            )
        })
    }

    renderMakanan=()=>{
        return this.state.dataMakanan.map((val,index)=>{
            return (
                <>
                <div className=" box-3 card product_item" key={val.index} onClick={()=>this.onCheckDataMakanan(val.id)}>
                    <div className="body">
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel"/>
                            <div className="hover">
                                <a href="javascript:void(0);" className="btn btn-primary btn-sm waves-effect"><i className="zmdi zmdi-shopping-cart"></i>Add To Cart</a>
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
                </div>
                </>
            )
        })
    }
   
    renderMinuman=()=>{
        return this.state.dataMinuman.map((val,index)=>{
            return(
                <>
                <div className=" box-3 card product_item" key={val.index} onClick={()=>this.onCheckDataMinuman(val.id)}>
                    <div className="body">
                        <div className="cp_img">
                            <img src={val.image} alt="logo" className="img-parcel"/>
                            <div className="hover">
                                <a href="javascript:void(0);" className="btn btn-primary btn-sm waves-effect"><i className="zmdi zmdi-shopping-cart"></i>Add To Cart</a>
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
                </div>


                </>
            )
        })
    }

    onCheckDataMinuman=(id)=>{
        console.log(id)
        console.log('data')
        let productid=id
        let userid=this.props.id
        console.log(userid)
        
        Axios.post(`${API_URL_SQL}/transaksi/addtocart`,{
            user_id:userid,
            products_id:productid,
            parcel_id:0,
            qty:1
        }).then((res)=>{
            console.log(this.state.dataMinuman.id)
            console.log('data berhasil ditambah')
            Swal.fire({
                icon: 'success',
                title: 'Berhasil Menambahkan Product',
                text: 'Berhasil Menambahkan Product'                    
            })
        }).catch((err)=>{
            console.log(err)
        })

    }

    onCheckDataMakanan=(id)=>{
        console.log(id)
        console.log('data makanan')
        let productid=id
        let userid=this.props.id
        console.log(userid)
        Axios.post(`${API_URL_SQL}/transaksi/addtocart`,{
            user_id:userid,
            products_id:productid,
            parcel_id:0,
            qty:1
        }).then((res)=>{
            console.log(res.data)
            console.log('data berhasil ditambah')
            Axios.post(`${API_URL_SQL}/product/getdataproductbyid`,{
                id:productid
            }).then((res)=>{
                console.log(res.data)
                Swal.fire({
                    title: 'Sweet!',
                    text: 'Berhasil Menambahkan Data',
                    imageUrl: `${API_URL_SQL+res.data.image}`,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: '',
                  })

            }).catch((err)=>{
                console.log(err)
            })
          
        }).catch((err)=>{
            console.log(err)
        })
    }

    onCheckDataChocolate=(id)=>{
        console.log(id)
        let productid=id
        console.log('data chocolate')
        let userid=this.props.id
        console.log(userid)
        Axios.post(`${API_URL_SQL}/transaksi/addtocart`,{
            user_id:userid,
            products_id:productid,
            parcel_id:0,
            qty:1
        }).then((res)=>{
            console.log(res.data)
            console.log('berhasil masuk ke cart')
            Axios.post(`${API_URL_SQL}/product/getdataproductbyid`,{
                id:productid
            }).then((res)=>{
                Swal.fire({
                    title: 'Sweet!',
                    text: 'Berhasil Menambahkan Data',
                    src: `${API_URL_SQL+res.data.image}`,
                    imageWidth: 400,
                    imageHeight: 200,
                    imageAlt: '',
                  })
            }).catch((err)=>{
                console.log(err)
            })
        }).catch((err)=>{
            console.log(err)
        })
    
    }

    onLogoutClick=()=>{
        console.log('logout jalan')
    }

    render() { 
        console.log(this.props.name)
        console.log(this.props.cart)

        if(this.state.loadingParcel){
            return (
                <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
                {FullPageLoading(this.state.loadingParcel,100,'#0095DA')}
            </div>
            )
        }
        return ( 
            <>
            <div className="outer-dp">
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
                        Hallo, {this.props.nama}</p>
                       
                    </div>
                </div>    
               
                <div className="navtab">
                        <Nav tabs>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}>
                                        <p>Parcel</p>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '2' })}
                                        onClick={() => { this.toggle('2'); }}>
                                        <p>Minuman</p>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}>
                                        <p>Makanan</p>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '4' })}
                                        onClick={() => { this.toggle('4'); }}>
                                        Chocolate
                                    </NavLink>
                                </NavItem>

                        </Nav>
                        <TabContent activeTab={this.state.activeTab}>
                            
                            <TabPane  tabId="1" className="tab-row-1 tabpanel">
                                <Row className="tabpanel">
                                    <div className="container-prod">
                                        <Zoom>
                                            <div className="box">
                                                <div style={{
                                                    display:'flex',
                                                    flexWrap:'wrap'
                                                }}>
                                                    {this.renderParcel()}
                                                </div>
                                          
                                          
                                            </div>            
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                            
                            <TabPane  tabId="2" className="tab-row-2 tabpanel">
                                <Row className="tabpanel-2">
                                    <div className="container-prod">
                                        <Zoom>
                                            <div className="box-2">
                                                    <div style={{
                                                         display:'flex',
                                                         flexWrap:'wrap'
                                                    }}>
                                                    {this.renderMinuman()}
                                                   
                                                    </div>
                                            </div>
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                            <TabPane  tabId="3" className="tab-row-2 tabpanel">
                                <Row className="tabpanel-3">
                                    <div className="container-prod">
                                        <Zoom>
                                        <div className="box-2">
                                                    <div style={{
                                                         display:'flex',
                                                         flexWrap:'wrap'
                                                    }}>
                                                    {this.renderMakanan()}
                                                   
                                                    </div>
                                            </div>
                                            
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                            <TabPane  tabId="4" className="tab-row-2 tabpanel">
                                <Row className="tabpanel-4">
                                    <div className="container-prod">
                                        <Zoom>
                                        <div className="box-2">
                                                    <div style={{
                                                         display:'flex',
                                                         flexWrap:'wrap'
                                                    }}>
                                                    {this.renderChocolate()}             
                                                    </div> 
                                            </div>
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                         
                        </TabContent>
                    
 
                        
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
 
export default (connect(MapStatetoprops,{})(dataProduct));