import React, { Component } from 'react';
import './login.css'
import {ArrowBack,CheckCircle} from '@material-ui/icons';
import * as Icon from 'react-bootstrap-icons';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

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
    state = {  }
    render() { 
        const {classes}= this.props

        return ( 
            <>
                <div className="outerdiv">
                        <div className="left-box">

                        </div>
                        <div className="right-box">
                            <div className="div-icon">
                                <ArrowBack style={{fontSize:30,color:'gray'}}/>
                            </div>
                            <div className="div-opening">
                                <p>Glad to see you!</p>
                            </div>
                            <div className="div-username">
                                <div className="username-input">
                                <TextField className={classes.root} inputRef={this.state.username} label="Username" fullWidth="true" variant="outlined" size='small' ></TextField>
                                    <CheckCircle/>
                                </div>
                            </div>
                            <div className="div-password">
                                <div className="password-input">
                                <TextField className={classes.root} inputRef={this.state.username} label="password" fullWidth="true" variant="outlined" size='small' ></TextField>
                                    <CheckCircle/>
                                </div>
                            </div>

                            <div className="remember-password">
                                <p>Forgot Password?</p>
                            </div>

                            <div className="btn-login">
                                <p>LOG IN</p>
                            </div>

                        </div>
                </div>
            </>
         );
    }
}
 
export default withStyles(Styles) (Login);