import React from 'react'
import { connect } from 'react-redux';

const mapStatetoProps = (state) => {
    return {
        Parcel:state.Parcel
    };
};

export default connect(mapStatetoProps) (class ManageParcel extends React.Component {
    render() {
        // console.log(this.props.Parcel)
        return (
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
        );
    };
});