import React, { Component } from 'react';
import './addparcel.scss';
// import { HeaderAdmin } from '../../components';
import Axios from 'axios';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
import { loadCategories } from '../../../redux/Actions'
// import {  } from '../../../custom'
import { 
    Courier,
    cat_2
} from '../../../assets';
import { 
    API_URL_SQL,
    priceFormatter,
    draggableCard
} from '../../../helpers';

const Mapstatetoprops=(state)=>{
    return {
        Parcel:state.Parcel
    };
};

export default connect(Mapstatetoprops,{loadCategories}) (class Admin extends Component {
    state = {
        //* Initial Database State *//
        category_products       : [],
        category_parcel         : [],
        
        //* Initial Parcel Input Values *// 
        id_category_parcel      : 0,
        harga                   : "",
        nama_parcel             : "",
        url_files               : "",
        upl_files               : null,
        upl_files_preview       : null,
    
        //* Initial Temporary Parcel Item *//
        index_add_cat_product   : -1,
        item_category           : 0,
        item_qty                : "",
        temp_item               : [],
        temp_parcel             : [],
    
        //* Initial Parcel Ready to Deploy State *//
        ready_topush            : [],
    
        //* test state *//
    };
    /* end of State */
    
    componentDidMount() {
        console.log(this.props.Parcel)
        this.props.loadCategories();
    };  
    
    componentDidUpdate() {
        console.log(this.props.Parcel)
        if(this.state.index_add_cat_product !== (-1)){
            draggableCard(".renderBx","left",1);
        };
    };
    
    renderOption = (props) => {
        if(props.text !== "pilih kategori product") {
            return (
                <> 
                    <option className="hide" value={0} disabled selected>{props.text}</option>  
                    { 
                        props.state.map((val)=>{
                            return (
                                <option key={val.id} value={val.id}>
                                    {val.id} | {val.nama}
                                </option>
                            )
                        })
                    }
                </>
            );
        };
        let a;
        let arr = [];
        arr.push(...props.state)
        for (let i = 0; i < this.state.temp_item.length; i++){
            a = arr.filter(val => {
                    return val.id !== this.state.temp_item[i].category_item
                });
            arr.splice(0,arr.length)
            arr.push(...a)
        };
        console.log(arr)
        return (
            <> 
                <option className="hide" value={0} disabled selected>{props.text}</option>  
                { 
                    arr.map((val)=>{
                        return (
                            <option key={val.id} value={val.id}>
                                {val.id} | {val.nama}
                            </option>
                        )
                    })
                }
            </>
        );
    };
    /* end of Initial Funcs */
    
    onChangeInput = (e) =>{
        if(e.target.name === ("harga" || "item_qty")) {
            console.log(e.target.value);
            if(!(e.target.value < 0)) {
                // console.log(e.target.value, " a")
                this.setState({[e.target.name]:e.target.value})
            };
        }else{
            this.setState({[e.target.name]:e.target.value})
        };
    };
    
    onInputUploadFileChange = (e) => {  
        console.log(e.target.files[0]);
        if(e.target.files[0]){
            this.setState({
                upl_files:e.target.files[0]
            });
        };
    };
    
    onEraseImage = () => {
        this.setState({
            url_files:"",
            upl_files:null,
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
        if(nama_parcel === "" || harga === "" || id_category_parcel === 0) return alert("kategori, nama, dan harga parcel wajib diisi");
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
                        name    : nama_parcel,
                        price   : harga,
                        gambar  : `${API_URL_SQL}${img}`
                    };
                    obj.push(newObj)
                    this.setState({
                        temp_parcel:obj,
                        upl_files:null,
                        id_category_parcel:0,
                        nama_parcel:"",
                        harga:""
                    });
                }else{
                    const obj = {
                        category: id_category_parcel,
                        name    : nama_parcel,
                        price   : harga,
                        gambar  : `${API_URL_SQL}${img}`
                    };
                    this.setState({
                        temp_parcel:[obj],
                        upl_files:null,
                        id_category_parcel:0,
                        nama_parcel:"",
                        harga:""
                    });
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
                    name    : nama_parcel,
                    price   : harga,
                    gambar  : url_files
                };
                obj.push(newObj)
                this.setState({
                    temp_parcel:obj,
                    url_files:"",
                    id_category_parcel:0,
                    nama_parcel:"",
                    harga:""
                });
            }else{
                const obj = {
                    category: id_category_parcel,
                    name    : nama_parcel,
                    price   : harga,
                    gambar  : url_files
                };
                this.setState({
                    temp_parcel:[obj],
                    url_files:"",
                    id_category_parcel:0,
                    nama_parcel:"",
                    harga:""
                });
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
    
    onSaveItem = () => {
        if(isNaN(this.state.item_qty||this.state.item_category)) return alert('quantity dan category harus diisi');
        //* *** *//
        if(this.state.temp_item.length) {
            console.log('a', this.state.item_category, parseInt(this.state.item_qty))
            const obj = this.state.temp_item;
            const newObj = {
                category_item   : parseInt(this.state.item_category),
                qty_item        : parseInt(this.state.item_qty)
            };
            obj.push(newObj);
            console.log(obj)
            this.setState({
                temp_item       : obj,
                item_qty        : "",
                item_category   : 0
            });
        }else{
            console.log('b', this.state.item_category, parseInt(this.state.item_qty))
            const obj = {
                category_item   : parseInt(this.state.item_category),
                qty_item        : parseInt(this.state.item_qty)
            };
            console.log(obj)
            this.setState({
                temp_item       :[obj],
                item_qty        :"",
                item_category   :0
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
            const newObj={
                ...this.state.temp_parcel[this.state.index_add_cat_product],
                item  :this.state.temp_item
            }
            obj.push(newObj)
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
    
    onUploadParcelInit = () => {
        // if(this.)
        // Axios.post(`${API_URL_SQL}/parcel/initnewparcel`,{
        //     name        : this.state.init_sendtodb[index].name,
        //     item        : this.state.init_sendtodb[index].item,
        //     price       : this.state.init_sendtodb[index].price,
        //     image       : this.state.init_sendtodb[index].image,
        //     category    : this.state.init_sendtodb[index].category,
        // })
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
                        <img src={val.gambar? val.gambar:Courier} alt="Foto Package"/>
                    </div>
                    <div className="cardharga">{priceFormatter(val.price)}</div>
                    <div className="carditem">
                        <div className="texted">Items Selection</div>
                        <button className="buttonadded" onClick={()=>this.setState({index_add_cat_product:index})} disabled={this.state.index_add_cat_product!==-1? true : false}>+</button>
                    </div>
                </div>
            </div>
        )
    };
    
    render() {
        console.log(this.props.Parcel.category_parcel)
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
                                this.state.url_files||this.state.upl_files?
                                <>
                                    <button className="erase" onClick={this.onEraseImage}>x</button> 
                                    <img src={this.state.url_files? this.state.url_files: URL.createObjectURL(this.state.upl_files)} alt="Foto Parcel"/>
                                </>
                                    :
                                <img src={Courier} alt="Gambar Parcel"/>
                                }
                            </div>
                            <div className="formBx">
                                <div className="categoryBx">
                                    <label>{"Kategori Parcel"}</label>
                                    <select name        = "id_category_parcel" 
                                            value       = {this.state.id_category_parcel} 
                                            onChange    = {this.onChangeInput}
                                            >
                                        {this.renderOption({state:this.state.category_parcel,text:"pilih kategori parcel"})}
                                    </select>    
                                </div>
                                <div className = "nameBx">
                                    <label>{"Nama Parcel"}</label>
                                    <input  type        = "text" 
                                            name        = "nama_parcel" 
                                            value       = {this.state.nama_parcel} 
                                            onChange    = {this.onChangeInput}
                                            placeholder = "tentukan nama parcel" 
                                    />    
                                </div>
                                <div className="priceBx">
                                    <label>{"Harga Parcel"}</label>
                                    <input type         = "number" 
                                           name         = "harga"
                                           value        = {this.state.harga} 
                                           onChange     = {this.onChangeInput}
                                           min          = {1}
                                           placeholder  = "tentukan harga parcel" 
                                    />
                                </div>
                                <div className = "urlBx">
                                    <label>{"Gambar Parcel"}</label>
                                    <div>
                                        <input type         = "text"
                                               name         = "url_files"
                                               placeholder  = "masukkan link url gambar"
                                               value        = {this.state.url_files}
                                               onChange     = {this.onChangeInput}
                                               disabled     = {this.state.upl_files? true:false}
                                               />
                                        <span> atau </span>
                                        <input type     = "file" 
                                               accept   = ".png,.jpg,.svg,.gif" 
                                               onChange = {this.onInputUploadFileChange} 
                                               disabled = {this.state.url_files? true:false}
                                        />
                                        <div className  = "fakeBx" 
                                             disabled   = {this.state.url_files? true:false}
                                        >
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
                        <button className   = "addbutton" 
                                onClick     = {this.onAddClick}
                                disabled    = {this.state.nama_parcel===""||this.state.harga===""||this.state.id_category_parcel===""? true:false}
                        >
                            Add This New Parcel
                        </button>
                    </div>
                </section>
                <section className="addedparcel">
                    <div className="subborder3">
                        <h1 className="subtitle">
                            {
                            this.state.temp_parcel.length?
                            <span>New!</span>
                                : 
                            null
                            }
                            Parcel Added
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
                                    index === this.state.index_add_cat_product?    
                                    <div className="addingitemBx">
                                        {this.renderTempParcel(val,index)}
                                        <div className="additemContent">
                                            <h2 className="title">
                                                Choose Parcel 
                                                <span>
                                                {this.state.temp_parcel[this.state.index_add_cat_product].name}
                                                </span>
                                                Items & Quantities
                                            </h2>
                                            <div className="subcaption"> 
                                                Press 
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
                                                            <img src={cat_2} alt="illustrasi category"/>
                                                        </div>
                                                    </div>
                                                </div>
                                                )}).reverse()
                                                    :
                                                null
                                                }
                                            </div>
                                            <div className="selectBx">
                                                <select className   = "select0"
                                                        name        = "item_category"
                                                        onChange    = {this.onChangeInput}
                                                        value       = {this.state.item_category}
                                                        disabled    = {this.state.temp_item.length === this.state.category_products.length? true:false}
                                                >
                                                    {this.renderOption({state:this.state.category_products,text:"pilih kategori product"})}
                                                </select>
                                                <input className    = "input0" 
                                                       type         = "number"
                                                       name         = "item_qty"
                                                       value        = {this.state.item_qty}
                                                       onChange     = {this.onChangeInput}
                                                       disabled     = {this.state.temp_item.length === this.state.category_products.length? true:false}
                                                       min          = {1}
                                                       placeholder  = "masukkan angka jumlah item per product"
                                                />
                                                <button className   = "button0"
                                                        onClick     = {this.onSaveItem}
                                                        disabled    = {this.state.item_qty && this.state.item_category? false:true}
                                                >
                                                    Add
                                                </button>
                                            </div>
                                            <div className="buttonBx">
                                                <button className   = "button0" 
                                                        onClick     = {this.onFinishAddItem}
                                                        disabled    = {this.state.temp_item.length? false:true}
                                                >
                                                    Finish
                                                </button>
                                                <button className   = "button1" 
                                                        onClick     = {this.onCancelAddItem}
                                                >
                                                    Cancel
                                                </button>
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
                            <div className="maincaption"> --- tidak ada parcel yang<span>baru</span>dibuat ---</div>
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
});