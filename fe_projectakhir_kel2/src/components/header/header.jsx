import React from 'react';
import './header.scss'
import { logo, d_user } from '../../assets';
import { Link } from 'react-router-dom';
import { useSelector} from 'react-redux';
import { IconContext } from 'react-icons';
import { HiShoppingCart, HiChatAlt, HiBell, HiBriefcase } from 'react-icons/hi';


export default () => {
    const Auth = useSelector(state => state.Auth);
    console.log(Auth)
    const [profilePic,setProfilePic]=('');
    
    return (
        <header>
            <div className="navBx">   
                <div className="nav-products">
                    Our 
                    <Link to="/dataproduct" style={{textDecoration:"none", marginLeft:5}}>
                        <span>Products</span>
                    </Link>
                </div>
            </div>
            <div className="logoBx">
                <div className="imgBx">
                    <img src={logo}/>
                </div>
                <h6 className="slogan">
                    <span>care</span> know no <span>distance</span>
                </h6>
            </div>
            <div className="userBx">
                <div className="usermenuBx">
                    <IconContext.Provider value={{ style: {fontSize:"20px", color:"white", margin:"0 10px"} }}>
                        <div>
                            { Auth.role === "admin"?
                            <Link to='/adminpanel'>
                            <HiBriefcase/>
                            </Link>
                            :
                            <Link to='/cart'>
                                <HiShoppingCart/>
                            </Link>
                            }
                            <HiChatAlt/>
                            <HiBell/>
                            
                        </div>
                    </IconContext.Provider>
                </div>
                <Link to='/useraccount'>
                    <div className="imgBx">
                        {
                            profilePic?
                            <img src={profilePic} alt="profile pic" />
                            :
                            <img src={d_user} alt="default pic"/>
                        }
                    </div>
                </Link>
                {
                    Auth.nama?
                    <div className="username">
                        Hi!
                        <span>{Auth.nama}</span>
                    </div>
                    :
                    <Link to='/login'>
                    <div className="buttonBx">
                        <div className="buttonBorder" />
                        
                        <button>Sign in</button>
                    </div>
                    </Link>
                }
            </div>
        </header>
    );
};