import React, { Component, createRef } from 'react';
import './parcel.scss';
import Axios from 'axios';
import { connect } from 'react-redux';
import {  } from '../../custom'
import { Courier, test , cat_2} from '../../assets';
import { HeaderAdmin } from '../../components';
import { API_URL_SQL, priceFormatter, draggableCard } from '../../helpers';
import { GiTrojanHorse } from 'react-icons/gi';
import { Redirect } from 'react-router-dom';

class Admin extends Component {
    state = {
        //* Initial Database State *//
        category_products       : [],
        category_parcel         : [],
        
        //* Initial Parcel Input Values *// 
        harga                   : createRef(),
        nama_parcel             : createRef(),
        upl_files               : null,
        upl_files_preview       : null,
        url_files               : "",
        id_category_parcel      : 0,

        //* Initial Temporary Parcel Item *//
        index_add_cat_product   : -1,
        item_category           : 0,
        temp_parcel             : [],
        temp_item               : [],
        item_qty                : createRef(),

        //* Initial Parcel Ready to Deploy State *//
        ready_topush            : [],

        //* test state *//
    };
    /* end of State */

    componentDidMount() {
        Axios.get(`${API_URL_SQL}/product/getallcatprod`)
        .then((res)=>{
            Axios.get(`${API_URL_SQL}/product/getallcatparcel`)
            .then((res2)=>{
                this.setState({
                    category_products:res.data,
                    category_parcel:res2.data
                });
            }).catch((err)=>{
                console.log(err);
            });
        }).catch((err)=>{
            console.log(err);
        });
    };  

    componentDidUpdate() {
        // console.table(this.state.category_products);
        // console.table(this.state.upl_files_preview);
        if(this.state.index_add_cat_product !== (-1)){
            draggableCard(".renderBx","left",1);
        };
    };

    renderOption = (props) => {
        let a;
        let arr = [];
        arr.push(...props)
        for (let i = 0; i < this.state.temp_item.length; i++){
            a = arr.filter(val=>{
                    return val.id !== this.state.temp_item[i].category_item
                });
            arr.splice(0,arr.length)
            arr.push(...a)
        };
        return (
            <> 
                <option className="hide" value={0} disabled selected>Select your option</option>  
                { 
                    arr.map((val)=>{
                        return (
                            <option key={val.id} value={val.id}>
                                {val.nama}
                            </option>
                        )
                    })
                }
            </>
        );
    };
    /* end of Initial Funcs */

    onChangeCategoryInput = (e) =>{
        this.setState({id_category_parcel:e.target.value})
    };

    onInputUploadFileChange = (e) => {  
        if(e.target.files[0]){
            this.setState({
                upl_files_preview:URL.createObjectURL(e.target.files[0]),
                upl_files:e.target.files[0]
            });
        };
    };
   
    onEraseImage = () => {
        
        this.setState({
            // url_files:"",
            // upl_files:null,
            // upl_files_preview:null
        });
    };

    onAddClick = () => {
        const {
            harga,
            url_files,
            nama_parcel,
            id_category_parcel
        } = this.state;
        //*****//
        if(nama_parcel.current.value === "" || harga.current.value === "" || id_category_parcel === 0)
            return alert("kategori, nama, dan harga parcel wajib diisi");
        //*****//
        if(this.state.upl_files){
            let options = {
                headers: {
                    'Content-type':'multipart/formdata'
                }
            };
            let formData = new FormData();
            formData.append('image', this.state.upl_files);
            //*****//
            Axios.post(`${API_URL_SQL}/parcel/uploadimage`, formData, options)
            .then((result)=>{ 
                let img = result.data;
                //*****//
                if(this.state.temp_parcel.length){
                    let obj = this.state.temp_parcel;
                    const newObj = {
                        category: id_category_parcel,
                        name    : nama_parcel.current.value,
                        price   : harga.current.value,
                        gambar  : `${API_URL_SQL}${img}`
                    };
                    obj.push(newObj)
                    this.setState({
                        temp_parcel:obj,
                        upl_files:null
                    });
                    this.state.nama_parcel.current.value="";
                    this.state.harga.current.value = "";
                }else{
                    const obj = {
                        category: id_category_parcel,
                        name    : nama_parcel.current.value,
                        price   : harga.current.value,
                        gambar  : `${API_URL_SQL}${img}`
                    };
                    this.setState({
                        temp_parcel:[obj],
                        upl_files:null
                    });
                    this.state.nama_parcel.current.value="";
                    this.state.harga.current.value = "";
                };
            }).catch((error)=>{
                alert("gagal!")
                console.log(error);
            });
        }else{
            if(this.state.temp_parcel.length){
                let obj = this.state.temp_parcel;
                const newObj = {
                    category: id_category_parcel,
                    name    : nama_parcel.current.value,
                    price   : harga.current.value,
                    gambar  : url_files
                };
                obj.push(newObj)
                this.setState({
                    temp_parcel:obj,
                    url_files:null
                })
                this.state.nama_parcel.current.value="";
                this.state.harga.current.value = "";
            }else{
                const obj = {
                    category: id_category_parcel,
                    name    : nama_parcel.current.value,
                    price   : harga.current.value,
                    gambar  : url_files
                };
                this.setState({
                    temp_parcel:[obj],
                    url_files:null
                })
                this.state.nama_parcel.current.value="";
                this.state.harga.current.value = "";
            };
        };
    };
    /* end of Add New Parcel Funcs */
    
    onDeleteTempParcel = (index) => {
        const {temp_parcel} = this.state;
        if(this.state.temp_parcel[index].gambar && this.state.temp_parcel[index].gambar.includes(API_URL_SQL)){
            Axios.post(`${API_URL_SQL}/parcel/deleteimage`,{
                filePath : this.state.temp_parcel[index].gambar.split(API_URL_SQL)[1]
            }).then(() => {
              temp_parcel.splice(index,1);
              this.setState({temp_parcel, upl_files:null, url_files:null});
            }).catch((error) => {
                console.log(error);
            });
        }else{
            temp_parcel.splice(index,1);
            this.setState({temp_parcel, upl_files:null, url_files:null});
        };
    };
    
    onChangeItemCategoryInput=(e)=>{
        this.setState({item_category:e.target.value})
    };

    onSaveItem = () => {
        if(isNaN(parseInt(this.state.item_qty.current.value)) || this.state.item_category===0) return alert('quantity dan category harus diisi');
        //* *** *//
        if(this.state.temp_item.length) {
            const obj = this.state.temp_item;
            const newObj = {
                category_item : parseInt(this.state.item_category),
                qty_item: parseInt(this.state.item_qty.current.value)
            };
            obj.push(newObj);
            this.setState({
                temp_item:obj,
                item_category:0
            });
        }else{
            const obj = {
                category_item : parseInt(this.state.item_category),
                qty_item: parseInt(this.state.item_qty.current.value)
            };
            this.setState({
                temp_item:[obj],
                item_category:0
            });
        };
    };

    onDeleteAddItem = (index) => {
        const {temp_item}=this.state;
        temp_item.splice(index,1);
        this.setState({temp_item});
    };

    onFinishAddItem = () => {
        if(this.state.ready_topush.length !== 0){
            const obj=this.state.ready_topush;
            console.log(obj)
            const newObj={
                ...this.state.temp_parcel[this.state.index_add_cat_product],
                item  :this.state.temp_item
            }
            obj.push(newObj)
            console.log(obj)
            const {temp_parcel} = this.state;
            temp_parcel.splice(this.state.index_add_cat_product, 1);
            this.setState({
                temp_parcel,
                ready_topush            : obj,
                index_add_cat_product   : -1,
                item_category           : 1,
                temp_item               : [],
            });
        }else{
            const obj =[
                {
                    ...this.state.temp_parcel[this.state.index_add_cat_product],
                    item  :this.state.temp_item
                }
            ];
            const {temp_parcel} = this.state;
            temp_parcel.splice(this.state.index_add_cat_product, 1);
            this.setState({
                temp_parcel,
                ready_topush            : obj,
                index_add_cat_product   : -1,
                item_category           : 1,
                temp_item               : [],
            });
        };
    };

    onSendtoDatabase = (index) =>{
        Axios.post(`${API_URL_SQL}/parcel/addparcel`,{
            name    : this.state.ready_topush[index].name,
            price   : this.state.ready_topush[index].price,
            category: this.state.ready_topush[index].category,
            item    : this.state.ready_topush[index].item,
            gambar  : this.state.url_files
        }).then((result)=>{
            console.log(result)
        }).catch((error)=>{
            console.log(error)
        });
    };

    onCancelAddItem = () => {
        this.setState({
            index_add_cat_product   : -1,
            item_category           : 1,
            temp_item               : []
        });
    };

    renderTempParcel = (val,index) => {
        return (
            <div key={val.id} className="newparcel">
                <div className="subsubborder">
                    <div className="cardhead">
                        {
                        index === (this.state.temp_parcel.length-1)?
                        <>
                            <div className="tag"> newest! </div>
                            <button disabled={this.state.index_add_cat_product!==-1? true : false} onClick={()=>this.onDeleteTempParcel(index)}>x</button>
                        </>
                            :
                        <>
                            <div/>
                            <button disabled={this.state.index_add_cat_product!==-1? true : false} onClick={()=>this.onDeleteTempParcel(index)}>x</button>
                        </>
                        }
                    </div>
                    <div className="cardname">{val.name}</div>
                    <div className="cardcategory">{this.state.category_parcel[val.category-1].nama}</div>
                    <div className="imgBx">
                        <img  src={val.gambar? val.gambar:test} alt="Foto Package"/>
                    </div>
                    <div className="cardharga">{priceFormatter(val.price)}</div>
                    <div className="carditem">
                        <div className="texted">Items Selection</div>
                        <button classname="buttonadded" onClick={()=>this.setState({index_add_cat_product:index})} disabled={this.state.index_add_cat_product!==-1? true : false}>+</button>
                    </div>
                </div>
            </div>
        )
    };

    render() { 
        return (
           <>
                <section className="subheader">
                    <div className="subborder">
                        <h1 className="title">PARCEL  <span>.</span></h1>
                        <section className="navbar">
                            <div className="subnav">Manage Parcel</div>
                            <div className="subnav active">Add Parcel</div>
                            <div className="subnav">Deploy Parcel</div>
                        </section>
                    </div>
                </section>
                <section className="addparcel">
                    <div className="subborder2">
                        <div className="addcard">
                            <div className="rotate90">.ADD.</div>
                            <div className="imgBx">
                                {
                                this.state.url_files || this.state.upl_files_preview?
                                <>
                                    <button className="erase" onClick={this.onEraseImage}> x </button>
                                    <img src={this.state.url_files? this.state.url_files:this.state.upl_files_preview}
                                         alt="Foto Parcel"/>
                                </>
                                    :
                                <img src={Courier} alt="Foto Parcel"/>
                                }
                            </div>
                            <div className="formBx">
                                <div className="categoryBx">
                                    <label>{"Kategori Parcel"}</label>
                                    <select onChange={(e)=>this.onChangeCategoryInput(e)}>
                                        {this.renderOption(this.state.category_parcel)}
                                    </select>    
                                </div>
                                <div className="nameBx">
                                    <label>{"Nama Parcel"}</label>
                                    <input type="text" placeholder="tentukan nama parcel" ref={this.state.nama_parcel}/>    
                                </div>
                                <div className="priceBx">
                                    <label>{"Harga Parcel"}</label>
                                    <input type="number" min={1} placeholder="tentukan harga parcel" ref={this.state.harga}/>
                                </div>
                                <div className="urlBx">
                                    <label>{"Gambar Parcel"}</label>
                                    <div>
                                        <input type="text" placeholder="masukkan link url gambar" value={this.state.url_files} onChange={(e)=>this.setState({url_files:e.target.value})} disabled={ this.state.upl_files === null? false:true}/>
                                        <span> atau </span>
                                        <input type="file" accept=".png,.jpg,.svg,.gif" value={this.state.upl_files} onChange={(e)=>this.onInputUploadFileChange(e)} disabled={ true }/>
                                        <div className="fakeBx" disabled={ true }>
                                            {
                                            this.state.upl_files_preview?
                                            <> ganti gambar </>
                                                :
                                            <> upload gambar </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="rotate270">.NEW.</div>
                        </div>
                    </div>
                    <div className="buttonBx">
                        <button className="addbutton" onClick={this.onAddClick} disabled={this.state.nama_parcel==="" && this.state.harga===""? true:false}>Add This New Parcel</button>
                    </div>
                </section>
                <section className="addedparcel">
                    <div className="subborder3">
                        <h1 className="subtitle">
                            Parcel <span className="space"> </span>
                            {
                            this.state.temp_parcel.length?
                            <span> New! </span>
                                : 
                            null
                            }
                             Added
                        </h1>
                        <p> 
                            New Initial Parcel needed to be added with Item Selections before being able to be deployed and accessed by user.
                            Below is the list of new added parcel that haven't been added with item list selections.
                        </p>
                        <div className="tempcards">
                            { 
                            this.state.temp_parcel.length?
                            this.state.temp_parcel.map((val,index)=>{
                                return (
                                <>
                                    {
                                    index===this.state.index_add_cat_product?    
                                    <div className="addingitemBx">
                                        {this.renderTempParcel(val,index)}
                                        <div className="additemContent">
                                            <h2 className="title">Choose Parcel <span>{this.state.temp_parcel[this.state.index_add_cat_product].nama}</span> Items & Quantities</h2>
                                            <div className="subcaption"> Press 
                                                <span className="span0">Add</span>
                                                to add more item, 
                                                <span className="span1">Finish</span>
                                                to set parcel ready to deploy, or 
                                                <span className="span2">Cancel</span>
                                                to cancel add items and lose all changes
                                            </div>
                                            <div className="renderBx">
                                                {
                                                this.state.temp_item.length?
                                                this.state.temp_item.map((val,index)=>{
                                                return (
                                                <div className="rendersubBx0" key={val.id}>
                                                    <div className="content">
                                                        <div className="itemhead">
                                                                <div className="id"> SET {index+1}</div>
                                                                <button onClick={()=>this.onDeleteAddItem(index)}>X</button>
                                                            </div>
                                                        <div className="category"> 
                                                                Any
                                                                    <br/>
                                                                {this.state.category_products[val.category_item-1].nama}
                                                                    <br/>
                                                                <span> Qty : {val.qty_item} </span>
                                                            </div> 
                                                        <div className="imgBx">
                                                            <img src={cat_2}/>
                                                        </div>
                                                    </div>
                                                </div>
                                                )}).reverse()
                                                    :
                                                null
                                                }
                                            </div>
                                            <div className="selectBx">
                                                <select className="select0" onChange={(e)=>this.onChangeItemCategoryInput(e)} value={this.state.item_category} disabled={this.state.temp_item.length===this.state.category_products.length? true:false}>
                                                    {this.renderOption(this.state.category_products)}
                                                </select>
                                                <input className="input0" type="number" ref={this.state.item_qty}/>
                                                <button className="button0" onClick={this.onSaveItem}>Add</button>
                                            </div>
                                            <div className="buttonBx">
                                                <button className="button0" onClick={this.onFinishAddItem} disabled={this.state.temp_item.length? false:null}>Finish</button>
                                                <button className="button1" onClick={this.onCancelAddItem}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    this.renderTempParcel(val,index)
                                    }
                                </>  
                                )
                            }).reverse()
                                :
                            <div className="maincaption"> --- tidak ada parcel yang <span> baru </span> dibuat ---</div>
                            }
                        </div>
                    </div>
                </section>
                {/* <section>
                    <div style={{margin:"50px 0", padding:40, boxShadow:"2px 2px 5px 2px rgba(0,0,0,0.1)", borderTop:"4px solid gray", borderBottom:"4px solid gray"}}>
                        <h1> Parcel Ready to <span style={{backgroundColor:"tomato", color:"white", padding:"0 10px"}}> Deploy! </span></h1>
                        <div style={{display:"flex", justifyContent:"center", flexFlow:"wrap", margin:"10px 5px", padding:40}}>
                            {
                                this.state.ready_topush.length?
                                    this.state.ready_topush.map((val,index)=>{
                                        return(
                                            <div key={index} style={{marginRight:10}}>
                                                <div style={{border:"2px dashed tomato", display:"flex", padding:20}}>
                                                    <div style={{width:150, height:150, marginRight:20}}>
                                                        <img src={val.gambar} style={{width:"100%", height:"100%", objectFit:"cover"}} />
                                                    </div>
                                                    <div>
                                                        <div style={{marginRight:5}}>
                                                            kategori parsel :
                                                        </div >
                                                        <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                            {val.category}
                                                        </div>
                                                        <div style={{marginRight:5}}>
                                                            nama parsel :
                                                        </div>
                                                        <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                            {val.name}
                                                        </div>
                                                    
                                                        <div style={{marginRight:5}}>
                                                            harga parsel :
                                                        </div>
                                                        <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                                {val.price} 
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    {
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
                                                                                {this.state.category_products[items.category_item-1].name}
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
                                                    }
                                                    <div style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", width:"100%"}}>
                                                        <button style={{backgroundColor:"white", color:"red", width:"100%"}}>Delete</button>
                                                        <button style={{backgroundColor:"white", color:"gray", width:"100%"}}>Edit</button>
                                                    </div>
                                                    <div style={{display:"flex", width:"100%"}}>
                                                        <button style={{backgroundColor:"gray", color:"white", width:"100%"}} onClick={()=>this.onSendtoDatabase(index)}>Deploy</button>
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
                </section> */}
            </>
        );
    };
};
 
export default Admin;