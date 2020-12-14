import React from 'react'
import './scss/deployparcel.scss'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const mapStatetoProps = (state) => {
    return {
        Parcel:state.Parcel
    };
};

export default connect(mapStatetoProps) (class DeployParcel extends React.Component {

    componentDidUpdate() {
    };

    render() {
        return (
            <section className="deploypage"
                     style={{
                     positon    : "relative",
                     background : "#74B9FF",
                     height     : "100vh",
                     margin     : 0,
                     marginLeft : 65
            }}>
                <section className="subheader">
                    <div className="subborder">
                        <h1 className="title">PARCEL<span>.</span></h1>
                        <section className="navbar">
                            <Link to='/adminpanel/parcel/manage' style={{ textDecoration: 'none' }}>
                                <div className="subnav">Manage Parcel</div>
                            </Link>
                            <Link to='/adminpanel/parcel' style={{ textDecoration: 'none' }}>
                                <div className="subnav">Add Parcel</div>
                            </Link>
                            <div className="subnav active">Deploy Parcel</div>
                        </section>
                    </div>
                </section>
                <div style={{
                     position       : "relative",
                     display        : "flex",
                     flexDirection  : "column",
                     justifyContent : "space-between",
                     alignItems     : "center",
                     padding        : "15% 0px"
                }}>
                    <h1 style={{
                        display         : "flex",
                        flexDirection   : "column",
                        justifyContent  : "center",
                        alignItems      : "center",
                        textAlign       : "center",
                        letterSpacing   : "3px",
                        fontSize        : 20,
                        fontWeight      : 400
                    }}> 
                        PAGE IS UNDER 
                        <span style={{
                              backgroundColor   : "tomato",
                              color             : "white",
                              padding           : "10px 10px",
                              letterSpacing     : "2px",
                              marginTop         : 10,
                              fontSize          : 50
                        }}>
                            {"<MAINTENANCE/>"}
                        </span>
                    </h1>
                    <div style={{
                        position        : "relative",
                        display         : "flex",
                        justifyContent  : "center",
                        alignItems      : "center",
                        flexFlow        : "wrap",
                        height          : "100%"
                    }}>
                        <div style={{
                             color:"#F68E71"
                        }}> 
                        On Development!
                        </div>
                   </div>
                </div>
            </section> 
        );
    };
});