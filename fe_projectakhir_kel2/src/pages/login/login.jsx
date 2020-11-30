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

const Styles={
    root:{
   
        '& label.Mui-focused': {
            color: '#fd79a8',
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
              color:'#fd79a8'
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
              border:'3px solid ',
              color:'#fd79a8'
            },
          },
    }
}

class Login extends Component {
    state = {
        username:createRef(),
        password:createRef(),
        showPassword:false
      }

      onLoginClick=()=>{
        //   const {username,password}=this.state
        //     var username1=username.current.value
        //     var password1=password.current.value
            // console.log(username1,password1)
            let username1= this.state.username.current.value
            let password1= this.state.password.current.value
            console.log(username1,' ini username')
            console.log(password1, ' ini password')
            console.log('button jalan')
            alert(username1)
            alert(password1)
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

        return ( 
            <>
                <div className="outerdiv">
                        <div className="left-box">

                        </div>
                        <div className="right-box">
                            <div className="div-icon">
                                <ArrowBack style={{fontSize:30,color:'gray', cursor:'pointer'}}/>
                            </div>
                            <div className="div-opening">
                                <p>Glad to see you!</p>
                            </div>
                            <div className="div-username">
                                <div className="username-input">
                                <TextField className={classes.root} inputRef={this.state.username} label="Username" fullWidth="true" variant="outlined" size='small' ></TextField>
                                {
                                    this.state.username.length ?
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
            </>
         );
    }
}
 
export default withStyles(Styles) (Login);