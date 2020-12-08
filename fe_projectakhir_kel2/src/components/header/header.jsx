import React from 'react';
import './header.scss'
import { logo, d_user } from '../../assets';
import { Link } from 'react-router-dom'
import { useSelector} from 'react-redux'


export default () => {
    const Auth = useSelector(state => state.Auth);
    console.log(Auth)

    const [profilePic,setProfilePic]=('');


    return (
        <header>
            <div className="logoBx">
                <div className="imgBx">
                    <img src={logo}/>
                </div>
                <h8 className="slogan">
                    <span>care</span> know no <span>distance</span>
                </h8>
            </div>
            
            <div className="userBx">
                <Link to='/login'>
                <div className="buttonBx">
                    <div className="buttonBorder" />
                    
                    <button>Sign in</button>
                </div>
                </Link>
                <div className="imgBx">
                    {
                        profilePic?
                        <img src={profilePic} />
                        :
                        <img src={d_user} />
                    }
                </div>
            </div>
        </header>
    );
};