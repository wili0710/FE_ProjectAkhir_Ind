import React, { Component } from 'react';
import './addparcel.scss';
import Axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setTempParcel, setReadyParcel } from '../../../redux/Actions';
// import { HeaderAdmin } from '../../components';
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

const mapStatetoProps=(state)=>{
    return {
        Parcel:state.Parcel
    };
};

export default connect(mapStatetoProps,{setTempParcel,setReadyParcel}) (class AddParcel extends Component {
    state = {
        //* Initial Parcel Input Values *// 
        id_category_parcel      : 0,
        harga                   : "",
        nama_parcel             : "",
        url_files               : "",
        upl_files               : null,
    
        //* Initial Temporary Parcel Item *//
        index_add_cat_product   : -1,
        item_category           : 0,
        item_qty                : "",
    
        //* Initial Parcel Ready to Deploy State *//
        ready_topush            : [],
    };
    /* end of State */
    
    componentDidMount() {
        console.log(this.props.Parcel)
    };  
    
    componentDidUpdate() {
        // console.log(this.props.Parcel.ready_Parcel, 'ready')
        
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
        for (let i = 0; i < this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item.length; i++){
            a = arr.filter(val => {
                    return val.id !== this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item[i].category_item
                });
            arr.splice(0,arr.length)
            arr.push(...a)
        };
        // console.log(arr, 'option')
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
            // console.log(e.target.value);
            if(!(e.target.value < 0)) {
                // console.log(e.target.value, " a")
                this.setState({[e.target.name]:e.target.value})
            };
        }else{
            this.setState({[e.target.name]:e.target.value})
        };
    };
    
    onInputUploadFileChange = (e) => {  
        // console.log(e.target.files[0]);
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
        // -- end of declarations --//

        if(nama_parcel==="" || harga==="" || id_category_parcel===0) return alert("kategori, nama, dan harga parcel wajib diisi");
        //* *** *//
        if(this.state.upl_files){
            let options = {
                headers: {
                    'Content-type':'multipart/formdata'
                }
            };
            let formData = new FormData();
            formData.append('image', this.state.upl_files);
            //* *** *//
            Axios.post(`${API_URL_SQL}/parcel/uploadimage`, formData, options)
            .then((result)=>{ 
                let img = result.data;
                //* *** *//
                if(this.props.Parcel.init_Parcel.length){
                    let obj = this.props.Parcel.init_Parcel;
                    const newObj = {
                        category: id_category_parcel,
                        name    : nama_parcel,
                        price   : harga,
                        gambar  : `${API_URL_SQL}${img}`,
                        item    : []
                    };
                    obj.push(newObj)
                    this.props.setTempParcel(obj)
                    // console.log(this.props.Parcel.init_Parcel, "mul upl")
                    this.setState({
                        upl_files           : null,
                        id_category_parcel  : 0,
                        nama_parcel         : "",
                        harga               : "",
                    });
                }else{
                    const obj = {
                        category: id_category_parcel,
                        name    : nama_parcel,
                        price   : harga,
                        gambar  : `${API_URL_SQL}${img}`,
                        item    : []
                    };
                    this.props.setTempParcel([obj])
                    // console.log(this.props.Parcel.init_Parcel, "sil upl")
                    this.setState({
                        // temp_parcel         : [obj],
                        upl_files           : null,
                        id_category_parcel  : 0,
                        nama_parcel         : "",
                        harga               : "",
                    });
                };
            }).catch((error)=>{
                alert("gagal!")
                console.log(error);
            });
        }else{
            if(this.props.Parcel.init_Parcel.length){
                let obj = this.props.Parcel.init_Parcel;
                const newObj = {
                    category: id_category_parcel,
                    name    : nama_parcel,
                    price   : harga,
                    gambar  : url_files,
                    item    : []
                };
                obj.push(newObj)
                this.props.setTempParcel(obj)
                // console.log(this.props.Parcel.init_Parcel, "mul url")
                this.setState({
                    id_category_parcel  : 0,
                    url_files           : "",
                    nama_parcel         : "",
                    harga               : ""
                });
            }else{
                // console.log('masuk')
                const obj = {
                    category: id_category_parcel,
                    name    : nama_parcel,
                    price   : harga,
                    gambar  : url_files,
                    item    : []
                };
                this.props.setTempParcel([obj])
                // console.log(this.props.Parcel.init_Parcel, "sil url")
                this.setState({
                    id_category_parcel  : 0,
                    url_files           : "",
                    nama_parcel         : "",
                    harga               : ""
                });
            };
        };
    };
    /* end of Add New Parcel Funcs */
    
    onDeleteTempParcel = (index) => {
        const temp_parcel = this.props.Parcel.init_Parcel;
        if(this.props.Parcel.init_Parcel[index].gambar && this.props.Parcel.init_Parcel[index].gambar.includes(API_URL_SQL)){
            Axios.post(`${API_URL_SQL}/parcel/deleteimage`,{
                filePath : this.props.Parcel[index].gambar.split(API_URL_SQL)[1]
            }).then(() => {
              temp_parcel.splice(index,1);
              this.props.setTempParcel(temp_parcel);
              this.setState({
                  upl_files:null,
                  url_files:""
                });
            }).catch((error) => {
                console.log(error);
            });
        }else{
            temp_parcel.splice(index,1);
            this.props.setTempParcel(temp_parcel);
            this.setState({
                upl_files:null,
                url_files:""
            });
        };
    };
    
    onSaveItem = () => {
        const temp_parcel = this.props.Parcel.init_Parcel;
        if(isNaN(this.state.item_qty||this.state.item_category)) return alert('quantity dan category harus diisi');
        //* *** *//
        if(this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item.length) {
            const obj = this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item;
            const newObj = {
                category_item   : parseInt(this.state.item_category),
                qty_item        : parseInt(this.state.item_qty)
            };
            obj.push(newObj);
            this.props.setTempParcel(temp_parcel)
            this.setState({
                item_qty        : "",
                item_category   : 0
            });
        }else{
            const obj = {
                category_item   : parseInt(this.state.item_category),
                qty_item        : parseInt(this.state.item_qty)
            };
            temp_parcel[this.state.index_add_cat_product].item.push(obj)
            this.props.setTempParcel(temp_parcel)
            this.setState({
                item_qty        :"",
                item_category   :0
            });
        };
    };
    
    onDeleteAddItem = () => {
        const temp_parcel = this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item;
        console.log(temp_parcel)
        // temp_item.splice(index,1);
        // this.setState({temp_item});
    };
    
    onCancelAddItem = () => {
        this.setState({
            index_add_cat_product   : -1,
            item_category           : 1,
        });
    };

    onFinishAddItem = () => {
        const temp_parcel = this.props.Parcel.init_Parcel;
        if(this.props.Parcel.ready_Parcel.length){
            const ready_parcel = this.props.Parcel.ready_Parcel;
            const newready_parcel = temp_parcel[this.state.index_add_cat_product]
            ready_parcel.push(newready_parcel)
            // console.log(ready_parcel,temp_parcel)
            temp_parcel.splice(this.state.index_add_cat_product, 1);
            this.props.setReadyParcel(ready_parcel,temp_parcel)
            this.setState({
                index_add_cat_product   : -1,
                item_category           : 0,
            });
        }else{
            const ready_parcel = temp_parcel[this.state.index_add_cat_product];
            temp_parcel.splice(this.state.index_add_cat_product, 1);
            // console.log(ready_parcel,temp_parcel)
            this.props.setReadyParcel([ready_parcel],temp_parcel)
            this.setState({
                index_add_cat_product   : -1,
                item_category           : 0
            });
        };
    };
    
    renderTempParcel = (val,index) => {
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
        return (
           <>
                <section className="subheader">
                    <div className="subborder">
                        <h1 className="title">PARCEL  <span>.</span></h1>
                        <section className="navbar">
                            <Link to='./parcel/manage' style={{ textDecoration: 'none' }}>
                                <div className="subnav">Manage Parcel</div>
                            </Link>
                            <div className="subnav active">Add Parcel</div>
                            <Link to='./parcel/deploy' style={{ textDecoration: 'none' }}>
                                <div className="subnav">Deploy Parcel 
                                    {
                                        this.props.Parcel.ready_Parcel.length?
                                        <span style={{
                                                verticalAlign:"top",
                                                background:"red",
                                                color:"white",
                                                fontSize:10,
                                                borderRadius:4,
                                                marginLeft:4,
                                                padding:"3px 7px 4px 7px"
                                        }}>
                                            {this.props.Parcel.ready_Parcel.length}
                                        </span>
                                        :
                                        null
                                    }
                                </div>
                            </Link>
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
                                        {this.renderOption({state:this.props.Parcel.Parcel_Category,text:"pilih kategori parcel"})}
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
                            this.props.Parcel.init_Parcel.length?
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
                            this.props.Parcel.init_Parcel.length?
                            this.props.Parcel.init_Parcel.map((val,index)=>{
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
                                                {this.props.Parcel.init_Parcel[this.state.index_add_cat_product].name}
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
                                                this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item.length?
                                                this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item.map((val,index)=>{
                                                return (
                                                <div className="rendersubBx0" key={val.id}>
                                                    <div className="content">
                                                        <div className="itemhead">
                                                                <div className="id"> SET {index+1}</div>
                                                                <button onClick={this.onDeleteAddItem}>X</button>
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
                                                null
                                                }
                                            </div>
                                            <div className="selectBx">
                                                <select className   = "select0"
                                                        name        = "item_category"
                                                        onChange    = {this.onChangeInput}
                                                        value       = {this.state.item_category}
                                                        disabled    = {this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item.length === this.props.Parcel.Product_Category.length? true:false}
                                                >
                                                    {this.renderOption({state:this.props.Parcel.Product_Category,text:"pilih kategori product"})}
                                                </select>
                                                <input className    = "input0" 
                                                       type         = "number"
                                                       name         = "item_qty"
                                                       value        = {this.state.item_qty}
                                                       onChange     = {this.onChangeInput}
                                                       disabled     = {this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item.length === this.props.Parcel.Product_Category.length? true:false}
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
                                                        disabled    = {this.props.Parcel.init_Parcel[this.state.index_add_cat_product].item.length? false:true}
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
            </>
        );
    };
});