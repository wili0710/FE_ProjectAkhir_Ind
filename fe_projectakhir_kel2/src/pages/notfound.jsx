import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './../assets/logoblue.png'

const NotFound=()=>(
    <div style={{
        width:"100vw",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"whitesmoke"
    }}>
        <div style={{padding:20}}>
            <img src={Logo} alt="Hearttoheart" width={500}/>
        </div>
        <div style={{
            borderRadius:10,
            width:500,
            display:"flex",
            flexDirection:"column",
            backgroundColor:"white"
        }}>
            <div style={{
                backgroundColor:"#318ae7",
                padding:20,
                borderTopLeftRadius:10,
                borderTopRightRadius:10,
                color:"white"
            }}>
                <h1>Lost Signal</h1>
            </div>
            <div style={{
                padding:20,
                textAlign:"center"
            }}>
                <h3>Halaman tidak ditemukan.</h3>
            </div>
            <div style={{
                padding:20,
                borderTop:"5px solid whitesmoke",
                textAlign:"right"
            }}>
                <Link to="/">
                    <h5>Kembali ke Home</h5>
                </Link>
            </div>

        </div>
    </div>
)


export default NotFound