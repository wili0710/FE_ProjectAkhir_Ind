import React from 'react'



export default (props) => {
    console.log(props)
    return (
        <div style={{...Styled.background}} className="background">
            <div style={{...Styled.mainBx}} className="mainBx">
                <div className="imgBx">
                    <img src={props.image}/>
                </div>
                <p>{props.message}</p>
            </div>
        </div>
    );
};

const Styled={
    background:{
        position        : "fixed",
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        opacity         : .7,
        backgroundColor : "gray",
        zIndex          : 999
    },
    mainBx:{
        position        : "absolute",
        width           : "300px",
        height          : "300px",
        top             : "50%",
        left            : "50%",
        zIndex          : 1000
    }
};
