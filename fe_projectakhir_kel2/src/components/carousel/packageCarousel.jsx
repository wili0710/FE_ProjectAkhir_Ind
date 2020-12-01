import React from 'react';
import './packageCarousel.css';
import { 
    icon,
    d_parcel
} from '../../assets'

export default (props) => {
    console.log('a')
    console.log(props)
    return (
        <>
            <div className="cardBx">
                {props.map((val)=>{
                    return (
                        <div className={"card"} key={val.id}>
                            <div className="content">
                                <div className="imgBx">
                                    <img src={icon}/>
                                </div>
                                <div className="imageBx">
                                    <img src={d_parcel}/>
                                </div>
                                <h2>
                                    {val.title} {val.id} 
                                </h2>
                                <p>
                                    {val.copy} {val.id} 
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};