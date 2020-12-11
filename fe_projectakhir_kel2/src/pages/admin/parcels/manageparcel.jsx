import React from 'react'
import './scss/manageparcel.scss'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { priceFormatter } from '../../../helpers';
import { cat_2, d_parcel } from '../../../assets';

const mapStatetoProps = (state) => {
    return {
        Parcel:state.Parcel
    };
};

export default connect(mapStatetoProps) (class ManageParcel extends React.Component {
    state = {
        index_edit  :   -1,
    };
    
    componentDidMount() {
        console.log(this.props.Parcel)
    }
    componentDidUpdate() {
        console.log(this.props.Parcel)
    }

    render() {
        console.log(this.props.Parcel.Parcel)
        return (
            <>
            <section className="subheader">
                <div className="subborder">
                    <h1 className="title">PARCEL  <span>.</span></h1>
                    <section className="navbar">
                        <div className="subnav active">Manage Parcel</div>
                        <Link to='./' style={{ textDecoration: 'none' }}>
                            <div className="subnav">Add Parcel</div>
                        </Link>
                        <Link to='./parcel/deploy' style={{ textDecoration: 'none' }}>
                            <div className="subnav">Deploy Parcel</div>
                        </Link>
                    </section>
                </div>
            </section>
            <section className="editparcel">
                <div className="subborder">
                    <div className="addingitemBx">
                        {
                            this.state.index_edit!==-1?
                            this.props.Parcel.Parcel[this.state.index_edit].map((val,index)=>{
                                return (
                                    <div key={val.id} className="newparcel">
                                        <div className="subsubborder">
                                            <div className="cardhead">
                                                {
                                                index === (this.props.Parcel.init_Parcel.length-1)?
                                                <>
                                                    <div className="tag"> newest! </div>
                                                    <button disabled={this.state.index_add_cat_product !== -1? true : false} onClick={()=>this.onDeleteTempParcel(index)}>x</button>
                                                </>
                                                    :
                                                <>
                                                    <div/>
                                                    <button disabled={this.state.index_add_cat_product !== -1? true : false} onClick={()=>this.onDeleteTempParcel(index)}>x</button>
                                                </>
                                                }
                                            </div>
                                            <div className="cardname">{val.name}</div>
                                            <div className="cardcategory">{this.props.Parcel.Parcel_Category[val.category-1].nama}</div>
                                            <div className="imgBx">
                                                <img src={val.gambar? val.gambar:d_parcel} alt="Foto Package"/>
                                            </div>
                                            <div className="cardharga">{priceFormatter(val.price)}</div>
                                            <div className="carditem">
                                                <div className="texted">Items Selection</div>
                                                <button className="buttonadded" onClick={()=>this.setState({index_add_cat_product:index})} disabled={this.state.index_add_cat_product!==-1? true : false}>+</button>
                                            </div>
                                        </div>
                                    </div>
                                    )    
                                })
                            :
                            <div className="newparcel">
                                <div className="subsubborder">
                                    <div className="cardhead">
                                        <div className="tag"> Edit Parcel </div>
                                        <button disabled>x</button>           
                                    </div>
                                    <div className="cardname">Nama Parcel</div>
                                    <div className="cardcategory">Category Parcel</div>
                                    <div className="imgBx">
                                        <img src={d_parcel} alt="Foto Package"/>
                                    </div>
                                    <div className="cardharga">Harga Parcel</div>
                                </div>
                            </div>
                        }
                        <div className="additemContent">
                            <h2 className="title">
                                Choose Parcel 
                                <span>
                                    {
                                        this.state.index_edit!== -1?
                                            this.props.Parcel.Parcel[this.state.index_edit].nama
                                            :
                                            <>EDIT</>
                                    }
                                    </span>
                                Items & Quantities
                            </h2>
                            <div className="subcaption"> 
                                Press 
                                <span className="span0">Edit</span>
                                on parcel want to be edited, 
                                <span className="span1">Finish</span>
                                to set finish editing the parcel, and 
                                <span className="span2">Cancel</span>
                                to cancel to cancel parcel edited but beware of losing all changes
                            </div>
                            <div className="renderBx">
                                {
                                this.state.index_edit!==-1?
                                this.props.Parcel.Parcel[this.state.index_edit].item.map((val,index)=>{
                                return (
                                <div className="rendersubBx0" key={val.id}>
                                    <div className="content">
                                        <div className="itemhead">
                                                <div className="id"> SET {index+1}</div>
                                                <button>X</button>
                                            </div>
                                        <div className="category"> 
                                                Any
                                                <br/>
                                                {this.props.Parcel.Product_Category[this.props.Parcel.Product_Category.findIndex(vals=>vals.id===val.category_item)].nama}
                                                <br/>
                                                <span> Qty : {val.qty_item} </span>
                                            </div> 
                                        <div className="imgBx">
                                            <img src={cat_2} alt="illustrasi category"/>
                                        </div>
                                    </div>
                                </div>
                                )}).reverse()
                                    :
                                <div className="rendersubBx0">
                                    <div className="content">
                                        <div className="itemhead">
                                            <div className="id"> SET ? </div>
                                                <button>X</button>
                                            </div>
                                        <div className="category"> 
                                                Any
                                                Item
                                                <span> Qty : ?? </span>
                                            </div> 
                                        <div className="imgBx">
                                            <img src={cat_2} alt="illustrasi category"/>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            <div className="buttonBx">
                                <button className   = "button0" 
                                        // onClick     = {this.onFinishAddItem}
                                        // disabled    = {this.props.Parcel.Parcel[this.state.index_edit].item.length? false:true}
                                >
                                    Finish
                                </button>
                                <button className   = "button1" 
                                        // onClick     = {this.onCancelAddItem}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section style={{positon:"absolute", background:"lightgray", margin:0, height:"100vh"}}>
                <div style={{position:"relative", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", padding:40}}>
                    <h1 style={{textAlign:"center", letterSpacing:"3px", fontWeight:400}}> Manage Parcel <span style={{backgroundColor:"tomato", color:"white", padding:"10px 10px", letterSpacing:"2px"}}>{"<Deployed/>"}</span></h1>
                    <div style={{position:"relative", display:"flex", justifyContent:"center", alignItems:"center", flexFlow:"wrap", margin:"10px 5px", padding:40, height:"100%"}}>
                        {
                            this.props.Parcel.Parcel?
                            this.props.Parcel.Parcel.map((val,index)=>{
                                return(
                                    <div key={index} style={{position:"relative", marginRight:10, background:"white", padding:20}}>
                                        <div style={{border:"1px dashed tomato", display:"flex", padding:20}}>
                                            <div style={{width:150, height:150, marginRight:20}}>
                                                <img src={val.gambar} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                                            </div>
                                            <div>
                                                <div style={{marginRight:5}}>
                                                    kategori parsel :
                                                </div >
                                                <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                    {this.props.Parcel.Parcel_Category[val.categoryparcel_id-1].nama}
                                                </div>
                                                <div style={{marginRight:5}}>
                                                    nama parsel :
                                                </div>
                                                <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                    {val.nama}
                                                </div>
                                            
                                                <div style={{marginRight:5}}>
                                                    harga parsel :
                                                </div>
                                                <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                    {val.harga} 
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {/* {
                                                val.item.map((items, indexes)=>{
                                                    return (
                                                        <>
                                                            <div key={indexes} style={{backgroundColor:"tomato", padding:20, display:"flex", justifyContent:"space-evenly", alignItems:"center"}}>
                                                                <div style={{padding:10, borderRadius:"5px 0 0 5px", backgroundColor:"white", fontWeight:"bold", color:"gray", marginRight:20, width:100, height:100}}> Item {indexes+1}: </div>
                                                                <div style={{width:"100%", color:"white"}}>
                                                                    <div style={{borderBottom:"1px solid white", fontSize:12}}>
                                                                        category product: 
                                                                    </div>
                                                                    <div style={{fontWeight:"bold"}}>
                                                                        {this.props.Parcel.Product_Category[items.category_item-1].nama}
                                                                    </div>                                               
                                                                    <div style={{borderBottom:"1px solid white", fontSize:12, marginTop:5}}>
                                                                        banyak item: 
                                                                    </div>
                                                                    <div style={{fontWeight:"bold"}}>
                                                                        {items.qty_item}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )
                                                })
                                            } */}
                                            <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", width:"100%"}}>
                                                <button style={{backgroundColor:"white", color:"red", width:"100%"}}>Delete</button>
                                                <button style={{backgroundColor:"white", color:"gray", width:"100%"}}>Edit</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                            :
                                <div> {"--> tidak ada parcel yang siap di deploy <--"}</div>
                        }
                    </div>
                </div>
            </section>
            </>
        );
    };
});