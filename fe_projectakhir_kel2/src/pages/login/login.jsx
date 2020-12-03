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
import GoogleLogin from 'react-google-login';


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
        showPassword:false,
        testemail:'',
        testpassword:''

      }

      onChangeEmail=(e)=>{
          this.setState({testemail:e.target.value})
      }
      onChangePassword=(e)=>{
          this.setState({testpassword:e.target.value})
      }
      
      responseGoogle = (response) => {
        console.log(response);
      }

      onLoginClick=()=>{
       
            // let email1= this.state.email.current.value
            // let password1= this.state.password.current.value
            let email1= this.state.testemail
            let password1=this.state.testpassword
            this.props.LoginThunk(email1,password1)
            console.log(this.state.testemail,'ini test email')
            console.log(this.state.testpassword,'ini test pasword')
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
        console.log(this.state.testemail)
        console.log(this.state.testpassword)
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
                            <Link to='/'>
                                <div className="div-icon">
                                    <ArrowBack style={{fontSize:30, cursor:'pointer'}} className="icon-back"/>
                                </div>
                            </Link>
                            <div className="div-opening">
                                <p>Glad to see you!</p>
                            </div>
                            <div className="border-username">
                                <div className="div-username">
                                    <div className="username-input">
                                    <TextField className={classes.root} 
                                    
                                    // inputRef={this.state.email} 
                                    onChange={this.onChangeEmail}
                                    label="Email" fullWidth="true" 
                                    value={this.state.testemail}
                                    variant="outlined" size='small' ></TextField>
                                    {
                                        this.state.testemail.length>4 ?
                                        <CheckCircle style={{color:'#55efc4'}}/>
                                        :
                                        null
                                    }
                                    </div>
                                </div>
                                <div className="div-password">
                                    <div className="password-input">
                                    <TextField className={classes.root}
                                    //  inputRef={this.state.password} 
                                    onChange={this.onChangePassword}
                                    value={this.state.testpassword}
                                    label="password" type="password" fullWidth="true" variant="outlined" size='small' ></TextField>
                                       {
                                        this.state.testpassword.length>4 ?
                                        <CheckCircle style={{color:'#55efc4'}}/>
                                        :
                                        null
                                    }
                                    </div>
                                </div>

                                <div className="remember-password">
                                    <Link to='/register' style={{textDecoration:
                                    'none'}}>
                                     <p style={{marginRight:'10px'}}>Register </p>
                                    </Link>
                                    <p style={{marginRight:'10px'}}>Forgot Password ? </p>
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