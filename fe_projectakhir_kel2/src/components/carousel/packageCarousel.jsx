import React from 'react';
import './packageCarousel.scss';
import { priceFormatter } from '../../helpers';
import { IconContext } from 'react-icons';
import { HiStar } from 'react-icons/hi';
import { 
    icon,
    d_parcel
} from '../../assets'

export default (props) => {
    console.log(props.obj)
    return (   
        <div className="cardBx">
            {
            props.obj.map((val)=>{
                return (
                    <div className="card" key={val.id}>
                        <div className="Bx">
                            <div className="content">
                                <div className="tag">
                                    Oncoming Event
                                </div>
                                <div className="imageBx">
                                    {
                                        val.gambar!=="null"?
                                        <img src={val.gambar}/>
                                        :
                                        <img src={d_parcel}/>
                                    }
                                </div>
                                <h2>
                                    {val.nama}
                                </h2>
                                <p>
                                    {props.rest.Parcel_Category[props.rest.Parcel_Category.findIndex(vals=>vals.id===val.categoryparcel_id)].nama} 
                                </p>
                                <IconContext.Provider value={{style:{fontSize:"15px", color:"lightgray"}}}>
                                    <div>
                                        <HiStar/>
                                        <HiStar/>
                                        <HiStar/>
                                        <HiStar/>
                                        <HiStar/>
                                    </div>
                                </IconContext.Provider>
                            </div>
                            <div className="detail">
                                <div className="upper">
                                    <div className="hargaBx">
                                        <div className="imgBx">
                                            <img src={icon}/>
                                        </div>
                                        <div className="harga">
                                            {priceFormatter(val.harga)}
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
                                            item categories:
                                        </div>
                                        <div className="cards">
                                            {
                                                val.item.map((item,index)=>{
                                                    return (
                                                    <div className="cardo" kay={index}>
                                                        <div className="qty">
                                                            {item.qty}
                                                        </div>
                                                        <div className="categories">
                                                            {props.rest.Product_Category[props.rest.Product_Category.findIndex(prod=>prod.id === item.categoryproduct_id)].nama}
                                                        </div>
                                                    </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                    </div>
                )
            })}
        </div>   
    );
};