import React, { Component,createRef } from 'react';
import './login.css'
import {ArrowBack,CheckCircle} from '@material-ui/icons';
import * as Icon from 'react-bootstrap-icons';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Axios from 'axios'
import {API_URL_SQL} from '../../helpers/apiUrl'
import Courier from './../../assets/Courier.png'
import {Redirect, Link} from 'react-router-dom'
import {LoginThunk} from './../../redux/Actions'
import {connect} from 'react-redux';

const Styles={
    root:{
   
        '& label.Mui-focused': {
            // color: '#74b9ff',
            color:'#0984e3'
            // color:'white,'
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow',
          },
          '& .MuiOutlinedInput-root': {
    
            '& fieldset': {
              borderColor: 'white',
            //   color:'#fd79a8'
                color:'white'
            },
            '&:hover fieldset': {
              borderColor: 'white',
              color:'#74b9ff'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
              border:'3px solid ',
              color:'#74b9ff'
            },
          },
    }
}

class Login extends Component {
    state = {
        email:createRef(),
        password:createRef(),
        showPassword:false
      }

      onLoginClick=()=>{
        //   const {username,password}=this.state
        //     var username1=username.current.value
        //     var password1=password.current.value
            // console.log(username1,password1)
            let email1= this.state.email.current.value
            let password1= this.state.password.current.value
            this.props.LoginThunk(email1,password1)
            // Axios.post(`${API_URL_SQL}/auth/login`,{
            //     email:email1,
            //     password:password1
            // }).then((res)=>{
            //         console.log(res.data)
            // }).catch((err)=>{
            //     console.log('masuk ke error')
            //     console.log(err)
            // })
            console.log(email1,' ini username')
            console.log(password1, ' ini password')
            console.log('button jalan')
        }
         handleChange = (prop) => (event) => {
            // setValues({ ...values, [prop]: event.target.value });
            this.setState({showPassword:true})
          };
        
        //    handleClickShowPassword = () => {
        //     setValues({ ...values, showPassword: !values.showPassword });
        //   };
    render() { 
        console.log(this.state.username)
        const {classes}= this.props
        if(this.props.Auth.isLogin){
            return <Redirect to='/' />
        }

        return ( 
            <>
                <div className="outerdiv">
                        <div className="left-box">
                            <img  src={Courier}   className="img-left"/>
                        </div>
                        <div className="right-box">
                            <div className="div-icon">
                                <ArrowBack style={{fontSize:30, cursor:'pointer'}} className="icon-back"/>
                            </div>
                            <div className="div-opening">
                                <p>Glad to see you!</p>
                            </div>
                            <div className="border-username">
                                <div className="div-username">
                                    <div className="username-input">
                                    <TextField className={classes.root} inputRef={this.state.email} label="Email" fullWidth="true" variant="outlined" size='small' ></TextField>
                                    {
                                        this.state.email.length>4 ?
                                        <CheckCircle/>
                                        :
                                        null
                                    }
                                    </div>
                                </div>
                                <div className="div-password">
                                    <div className="password-input">
                                    <TextField className={classes.root} inputRef={this.state.password} label="password" type="password" fullWidth="true" variant="outlined" size='small' ></TextField>
                                        <CheckCircle style={{color:'#55efc4'}}/>
                                    </div>
                                </div>

                                <div className="remember-password">
                                    <p>Forgot Password ?</p>
                                </div>


                                <div className="btn-login" onClick={this.onLoginClick}>
                                    <p>LOG IN</p>
                                </div>

                            </div>

                        </div>
                </div>
            </>
         );
    }
}
 
const Mapstatetoprops=(state)=>{
    return {
        Auth:state.Auth
    }
}
export default withStyles(Styles)(connect(Mapstatetoprops,{LoginThunk})(Login));