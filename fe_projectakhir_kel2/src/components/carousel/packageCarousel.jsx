import React from 'react';
import './packageCarousel.scss';
import { 
    icon,
    d_parcel
} from '../../assets'

export default (props) => {
    // console.log('a')
    // console.log(props)
    return (
        <>
            <div className="cardBx">
                {props.map((val,index)=>{
                    return (
                        <div className="card" key={val.id}>
                            <div className="Bx">
                                <div className="content">
                                    <div className="tag">
                                        Oncoming Event
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
                                <div className="detail">
                                    <div className="upper">
                                        <div className="hargaBx">
                                            <div className="imgBx">
                                                <img src={icon}/>
                                            </div>
                                            <div className="harga">
                                                Rp 200.000,00
                                                {/* val.harga */}
                                            </div>
                                        </div>
                                        <p className="desc">
                                            the right parcel for the right person at the right time
                                            {/* val.desc */}
                                        </p>
                                    </div>
                                    <div className="lower">
                                        <p className="inform">
                                            You can fill your special parcel with any item that match these selected amounts and categories for a same price! 
                                        </p>
                                        <div className="categoryBx">
                                            <div className="label">
                                                div
                                            </div>
                                            <div className="cards">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                    )
                })}
            </div>
        </>
    );
};