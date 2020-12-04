import React, { Component } from 'react';
import './dataProduct.css'
import Logo from './../../assets/logo.png'
import { 
    debounce,
    draggableCard
} from '../../helpers'
import Zoom from 'react-reveal/Zoom';
import {HiOutlinePhone} from  'react-icons/hi'
import Dropdown from 'react-bootstrap/Dropdown';
import classnames from 'classnames';
import {FaRegMoneyBillAlt,FaUser,FaKey,FaLock} from 'react-icons/fa'
import Popup from 'reactjs-popup';
import {AiFillGithub} from 'react-icons/ai'
import {RiReactjsFill} from 'react-icons/ri'
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class dataProduct extends Component {
    state = {
        activeTab:0
      }
      toggle=(tab)=>{
          if(this.state.activeTab !== tab){
              this.setState({activeTab:tab})
          }
      }
    render() { 
        return ( 
            <>
            <div className="outer-dp">
                <div className="header-dp">
                    {/* <h1>oioi anjing</h1> */}
                    <div className="logo-dp">
                        {/* <Logo className="logo-dp-ins"/> */}
                        <img src={Logo} alt="test" className="logo-dp-ins" />
                    </div>
                    <div className="input-content">
                            <input type="text" placeholder="Search Parcel" /> 
                    </div>
                    <div className="call-number">
                        <div className="div-call">
                            <HiOutlinePhone className="phone-ic"/>
                            <p>021 0001110</p>
                        </div>
                    </div>                 
                    <div >
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
                                        <p>Susu</p>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '3' })}
                                        onClick={() => { this.toggle('3'); }}>
                                        <p>Coklat</p>
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '4' })}
                                        onClick={() => { this.toggle('4'); }}>
                                        Softdrink
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '5' })}
                                        onClick={() => { this.toggle('5'); }}>
                                        Beer
                                    </NavLink>
                                </NavItem>
                                <NavItem className="cursor-nav">
                                    <NavLink
                                        className={classnames({ active: this.state.activeTab === '6' })}
                                        onClick={() => { this.toggle('6'); }}>
                                        Flower
                                    </NavLink>
                                </NavItem>
                        </Nav>

                        {
                        this.state.activeTab ==0 ?
                        <>
                        <div className="promo">
                            <h1>promo</h1>
                        </div>
                        </>
                        :
                        <>
                        <TabContent activeTab={this.state.activeTab}>
                            <TabPane  tabId="1" className="tab-row-1 tabpanel">
                                <Row className="tabpanel">
                                    <div className="container-prod">
                                        <Zoom>
                                            <div className="box">
                                                <div className="box-cont">
                                                    <div className="box-left">
                                                        <img src={Logo} alt="logo" style={{height:'150px',width:'100%'}}/>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sint molestias quas. </p>
                                                    </div>
                                                    <div className="box-right">
                                                        <img src={Logo} alt="logo" style={{height:'150px',width:'100%'}}/>
                                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sint molestias quas. </p>
                                                    </div>
                                                </div>
                                                <div className="box-cont">
                                                    <div className="box-left">
                                                        <img src={Logo} alt="logo" style={{height:'150px',width:'100%'}}/>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sint molestias quas. </p>
                                                    </div>
                                                    <div className="box-right">
                                                        <img src={Logo} alt="logo" style={{height:'150px',width:'100%'}}/>
                                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sint molestias quas. </p>
                                                    </div>
                                                </div>
                                                <div className="box-cont">
                                                    <div className="box-left">
                                                        <img src={Logo} alt="logo" style={{height:'150px',width:'100%'}}/>
                                                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sint molestias quas. </p>
                                                    </div>
                                                    <div className="box-right">
                                                        <img src={Logo} alt="logo" style={{height:'150px',width:'100%'}}/>
                                                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus sint molestias quas. </p>
                                                    </div>
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
                                            
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                            <TabPane  tabId="3" className="tab-row-2 tabpanel">
                                <Row className="tabpanel-3">
                                    <div className="container-prod">
                                        <Zoom>
                                            
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                            <TabPane  tabId="4" className="tab-row-2 tabpanel">
                                <Row className="tabpanel-4">
                                    <div className="container-prod">
                                        <Zoom>
                                            
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                            <TabPane  tabId="5" className="tab-row-2 tabpanel">
                                <Row className="tabpanel-5">
                                    <div className="container-prod">
                                        <Zoom>
                                            
                                        </Zoom>  
                                    </div>
                                </Row>
                            </TabPane>
                        </TabContent>
                        </>
                    }
                        
                </div>
                
            </div>
            </>

         );
    }
}
 
export default dataProduct;