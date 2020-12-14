import React from 'react'
import './scss/manageparcel.scss'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { priceFormatter, renderOption, API_URL_SQL } from '../../../helpers';
import { cat_2, d_parcel, icon } from '../../../assets';
import { Popup } from '../../../components';
import { IconContext } from 'react-icons';
import { HiStar } from 'react-icons/hi';
import { deleteParcel } from '../../../redux/Actions'

const mapStatetoProps = (state) => {
    return {
        AllData             : state.Parcel,
        Parcel              : state.Parcel.Parcel,
        Parcel_Category     : state.Parcel.Parcel_Category,
        Product_Category    : state.Parcel.Product_Category
    };
};

export default connect(mapStatetoProps,{deleteParcel}) (class ManageParcel extends React.Component {
    state = {
        index_edit              : -1,

        // edit parcel init state
        edit_category_parcel    : 0,
        edit_nama_parcel        : "",
        edit_harga_parcel       : "",
        edit_gambar_parcel_url  : "",
        edit_gambar_parcel_upl  : null,
        edit_item_parcel        : [],

        // select_category state
        cat_product_edit        : [],
        cat_parcel_edit         : [],
        item_category           : 0,
        item_qty                : "",

        // rest state
        filteredparcel          : [],
        currentpage             : 1,
        itemperpage             : 3,

        // component toggle 
        showPopup               : false,
        temp_gambar_parcel_upl  : null,
        
    };
    
    componentDidMount() {
        // console.log(this.props.Parcel)
    }
    componentDidUpdate() {
        console.log(this.props.Parcel)
        // console.log(this.state.edit_gambar_parcel_url)
    }

    onResetEditParcel = () => {
        if(this.props.Parcel[this.state.index_edit].gambar && this.props.Parcel[this.state.index_edit].gambar.includes(API_URL_SQL)){
            console.log('a')
            console.log(this.props.Parcel[this.state.index_edit].item)
            this.setState({
                edit_category_parcel    : this.props.Parcel[this.state.index_edit].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[this.state.index_edit].nama,
                edit_harga_parcel       : this.props.Parcel[this.state.index_edit].harga,
                edit_gambar_parcel_upl  : this.props.Parcel[this.state.index_edit].gambar,
                edit_item_parcel        : this.props.Parcel[this.state.index_edit].item,
                temp_gambar_parcel_upl  : null
            });
        }else{
            console.log('b')
            console.log(this.props.Parcel[this.state.index_edit].item)
            this.setState({
                edit_category_parcel    : this.props.Parcel[this.state.index_edit].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[this.state.index_edit].nama,
                edit_harga_parcel       : this.props.Parcel[this.state.index_edit].harga,
                edit_gambar_parcel_url  : this.props.Parcel[this.state.index_edit].gambar,
                edit_item_parcel        : this.props.Parcel[this.state.index_edit].item,
                temp_gambar_parcel_upl  : null
            });
        };
    };

    onEditParcelCLick = index => {
        console.log(this.props.Parcel[index].item)
        if(this.props.Parcel[index].gambar && this.props.Parcel[index].gambar.includes(API_URL_SQL)){
            this.setState({
                edit_category_parcel    : this.props.Parcel[index].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[index].nama,
                edit_harga_parcel       : this.props.Parcel[index].harga,
                edit_gambar_parcel_upl  : this.props.Parcel[index].gambar,
                edit_item_parcel        : this.props.Parcel[index].item,
                index_edit              : index,
            });
        }else if(this.props.Parcel[index].gambar==="null"){
            this.setState({
                edit_category_parcel    : this.props.Parcel[index].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[index].nama,
                edit_harga_parcel       : this.props.Parcel[index].harga,
                edit_item_parcel        : this.props.Parcel[index].item,
                index_edit              : index,
            });
        }else{
            this.setState({
                edit_category_parcel    : this.props.Parcel[index].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[index].nama,
                edit_harga_parcel       : this.props.Parcel[index].harga,
                edit_gambar_parcel_url  : this.props.Parcel[index].gambar,
                edit_item_parcel        : this.props.Parcel[index].item,
                index_edit              : index,
            });
        }
    };

    onChangeInput = (e) =>{
        console.log(e.target.name,e.target.value)
        if(e.target.name === ("edit_harga_parcel")) {
            if(e.target.value > 0) {
                this.setState({[e.target.name]:e.target.value})
            };
        }else{
            this.setState({[e.target.name]:e.target.value})
        };
    };

    onInputUploadFileChange = (e) => {  
        if(e.target.files[0]){
            this.setState({
                temp_gambar_parcel_upl: URL.createObjectURL(e.target.files[0])
            });
        };
    };

    onDeletePreview = () => {
        this.setState({temp_gambar_parcel_upl : null});
    };
    
    onCancelEditGambar = () => {
        this.setState({
            edit_gambar_parcel_url:"",
            temp_gambar_parcel_upl:null,
            showPopup:!(this.state.showPopup)
        });
    };

    onSaveGambarClick = () => {
        console.log('a')
        this.setState({
            edit_gambar_parcel_upl:this.state.temp_gambar_parcel_upl,
            showPopup:!(this.state.showPopup)
        });
    };

    onDeleteEditItem = (index) => {
        console.log(this.state.edit_item_parcel)
        const obj = this.state.edit_item_parcel;
        console.log(obj)
        console.log(this.props.Parcel[this.state.index_edit].item)
        obj.splice(index,1)
        console.log(obj)
        console.log(this.props.Parcel[this.state.index_edit].item)
        this.setState({edit_item_parcel:obj})
    };

    onAddItem = () => {
        const obj = this.state.edit_item_parcel;
        if(this.state.edit_item_parcel.length) {
            const newObj = {
                parcel_id            : parseInt(this.props.Parcel[this.state.index_edit].id),
                categoryproduct_id   : parseInt(this.state.item_category),
                qty                  : parseInt(this.state.item_qty)
            };
            obj.push(newObj);
            this.setState({
                edit_item_parcel: obj,
                item_qty        : "",
                item_category   : 0
            });
        }else{
            const newObj = {
                parcel_id            : parseInt(this.props.Parcel[this.state.index_edit].id),
                categoryproduct_id   : parseInt(this.state.item_category),
                qty                  : parseInt(this.state.item_qty)
            };
            obj.push(newObj)
            this.setState({
                edit_item_parcel: obj,
                item_qty        :"",
                item_category   :0
            });
        };
    };

    onDeleteParcel = (id) => {
        this.props.deleteParcel(id);
    };

    renderParcel(props) {
        var begin = ((Number(this.state.currentpage) - 1) * Number(this.state.itemperpage));
        var end = begin + Number(this.state.itemperpage);
        let items = props.obj.slice(begin,end)
        console.log(props)
        return (
        <div className="cardBox">
        { 
            items.map((val,index)=>{
            return (
                <div className="card" key={val.id}>
                    <div className="Bx">
                        <div className="content">
                            <div className="imageBx">
                            {
                                val.gambar!=="null"?
                                <img src={val.gambar} alt="gambar parcel"/>
                                :
                                <img src={d_parcel} alt="gambar parcel"/>
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
                                        <img src={icon} alt="icon app"/>
                                    </div>
                                    <div className="harga">
                                        {priceFormatter(val.harga)}
                                    </div>
                                </div>
                                <p className="desc">
                                    the right parcel for the right person at the right time
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
                                            <div className="cardo">
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
                    <div className="setting">
                        <button className  = "parcel-edit" 
                             disabled   = {this.state.index_edit!==-1? true:false}
                             onClick    = {()=>this.onEditParcelCLick(index)}
                        >
                            edit
                        </button>
                        <button className  = "parcel-delete" 
                             onClick    = {()=>this.onDeleteParcel(val.id)}
                             disabled   = {this.state.index_edit!==-1? true:false}
                             
                        >
                            delete
                        </button>
                    </div>
                </div>
            )
            })
        }
        </div> 
        );
    };

    rendpage() {
        let arr=[]
        for(let i=1;i<=(this.props.Parcel.length/this.state.itemperpage);i++){
            arr.push(
                <button onClick = {()=>this.setState({currentpage:i})}
                        disabled= {this.state.currentpage===i?true:false}
                >
                    {i}
                </button>
            )
        }
        return arr;
    }

    render() {
        // console.log(this.state.edit_gambar_parcel_url)
        // console.log(this.state.edit_gambar_parcel_upl)
        // console.log(this.state.temp_gambar_parcel_upl)
        console.log(this.state.edit_item_parcel)
        
        return (
            <>
            {
            this.state.showPopup?
            <Popup
                title       = 'Ganti Gambar Parcel'
                content     = {
                    <>
                    <div className="container">
                        <div className="previewBx">
                            <div className="imgBx">
                                {
                                this.state.temp_gambar_parcel_upl?
                                    <button className   = "delete_preview"
                                            onClick     = {this.onDeletePreview}
                                    >
                                        x
                                    </button>
                                    :
                                    null
                                }
                                <img src = {
                                    this.state.edit_gambar_parcel_url?
                                    this.state.edit_gambar_parcel_url:
                                    this.state.temp_gambar_parcel_upl?
                                    this.state.temp_gambar_parcel_upl:
                                    this.props.Parcel[this.state.index_edit].gambar? 
                                    this.props.Parcel[this.state.index_edit].gambar:
                                    d_parcel
                                    } 
                                    alt = "Gambar Parcel "
                                />
                            </div>
                        </div>
                        <div className="inputBx">
                            <p>
                                <span>Ganti gambar parcel dengan cara:</span>
                                <br/>
                                1. Memasukkan gambar dalam bentuk text URL kedalam box "URL", atau 
                                <br/>
                                2. Klik 'upload gambar' untuk memasukkan gambar parcel ke dalam database.
                            </p>
                            <input  className   = "edit_gambar_parcel_url"
                                    name        = "edit_gambar_parcel_url"
                                    type        = "text"
                                    value       = {this.state.edit_gambar_parcel_url}
                                    placeholder = "masukkan url gambar"
                                    onChange    = {this.onChangeInput}
                                    disabled    = {this.state.temp_gambar_parcel_upl? true:false}
                            />
                            <span>atau</span>  
                            <div className      = "fakeBx">
                                upload gambar
                                <input  className   = "edit_gambar_upl"
                                        name        = "temp_gambar_parcel_upl"
                                        type        = "file"
                                        onChange    = {this.onInputUploadFileChange}
                                        disabled    = {this.state.edit_gambar_parcel_url? true:false}    
                                />
                            </div> 
                        </div>
                    </div>
                    <div className="actionBtn">
                        <button className   = "act_cancel" 
                                onClick     = {this.onCancelEditGambar}
                        >
                            Cancel
                        </button>
                        <button className   = "act_save"
                                onClick     = {this.onSaveGambarClick}
                                disabled    = {this.state.edit_gambar_parcel_url===""&&this.state.temp_gambar_parcel_upl===null? true:false}
                        > 
                            Save 
                        </button>
                    </div>
                    </>
                }
                closepopup  = {()=>this.setState({showPopup:!this.state.showPopup})}
            />
            :
            null
            }
            <div className="manageparcel">  
                <section className="subheader">
                    <div className="subborder">
                        <h1 className="title">PARCEL<span>.</span></h1>
                        <section className="navbar">
                            <div className="subnav active">Manage Parcel</div>
                            <Link to='/adminpanel/parcel' style={{ textDecoration: 'none' }}>
                                <div className="subnav">Add Parcel</div>
                            </Link>
                            <Link to='/adminpanel/parcel/deploy' style={{ textDecoration: 'none' }}>
                                <div className="subnav">Deploy Parcel</div>
                            </Link>
                        </section>
                    </div>
                </section>
                <section className="editparcel">
                    <div className="subborder">
                        <div className="addingitemBx">
                            { this.state.index_edit >= 0?
                                <div className="parceledit">
                                    <div className="subsubborder">
                                        <input className    = "edit_nama_parcel" 
                                               type         = "text" 
                                               name         = "edit_nama_parcel"
                                               value        = {this.state.edit_nama_parcel}
                                               onChange     = {this.onChangeInput}
                                        />
                                        <select name        = "edit_category_parcel" 
                                                value       = {this.state.edit_category_parcel} 
                                                onChange    = {this.onChangeInput}
                                        >
                                            {renderOption({ state:this.props.Parcel_Category, text:"pilih kategori parcel", index:null })}
                                        </select> 
                                        <div className="imageBx">
                                            <div className="edit_buttonBx">
                                                <button className="ganti_gambar" onClick={()=>this.setState({showPopup:!this.state.showPopup})}> edit </button>
                                            </div>
                                            <img src = {
                                                this.state.edit_gambar_parcel_url?
                                                this.state.edit_gambar_parcel_url:
                                                this.state.edit_gambar_parcel_upl? 
                                                this.state.edit_gambar_parcel_upl:
                                                d_parcel
                                                } 
                                                alt = "Gambar Parcel"
                                            />
                                        </div>
                                        <input className = "edit_harga_parcel"
                                            type         = "text" 
                                            name         = "edit_harga_parcel"
                                            min          = {1}
                                            value        = {this.state.edit_harga_parcel}
                                            onChange     = {this.onChangeInput}
                                        />
                                        <div className="itemBx">
                                            <p>Items Selection</p>
                                            <div className="arrow_icon">{">"}</div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <div className="newparcel">
                                    <div className="subsubborder">
                                        <div className="cardname">Nama Parcel</div>
                                        <div className="cardcategory">Category Parcel</div>
                                        <div className="imgBx">
                                            <img src={d_parcel} alt="Foto Package"/>
                                        </div>
                                        <div className="cardharga">Harga Parcel</div>
                                    </div>
                                </div>
                            }
                            <div className="edititemContent">
                                <h2 className="title">
                                { this.state.index_edit >= 0?
                                    <>
                                    On Edit
                                    <span>
                                       {this.props.Parcel[this.state.index_edit].nama}
                                    </span>
                                    Parcel Detail
                                    </>
                                    :
                                    <>
                                    Click on
                                    <span>
                                      Edit
                                    </span>
                                    Button below Parcel to Change its details
                                    </>
                                }
                                </h2>
                                <div className="subcaption"> 
                                    Press 
                                    <span className="span0">Edit</span>
                                    on parcel want to be edited, 
                                    <span className="span1">Finish</span>
                                    to set finish editing the parcel, and 
                                    <span className="span2">Cancel</span>
                                    to cancel editing a parcel `but beware of losing all changes`
                                </div>
                                <div className="renderBx_edit">
                                    {
                                    this.state.index_edit >= 0?
                                    this.state.edit_item_parcel.map((val,index)=>{
                                    return (
                                    <div className="itemBx_edit" key={val.id}>
                                        <div className="content">
                                            <div className="itemhead">
                                                <div className="id"> SET {index+1}</div>
                                                <button onClick={()=>this.onDeleteEditItem(index)}>X</button>
                                            </div>
                                            <div className="category"> 
                                                Any
                                                <br/>
                                                {this.props.Product_Category[this.props.Product_Category.findIndex(vals=>vals.id===val.categoryproduct_id)].nama}
                                                <br/>
                                                <span> Qty : {val.qty} </span>
                                            </div> 
                                            <div className="imgBx">
                                                <img src={cat_2} alt="illustrasi category"/>
                                            </div>
                                        </div>
                                    </div>
                                    )}).reverse()
                                        :
                                    <p>
                                        Tidak ada parcel yang sedang di edit. Pilih edit parcel untuk mengedit parcel
                                    </p>
                                    }
                                </div>
                                {
                                this.state.index_edit >= 0?
                                <>
                                    <div className="selectBx_active">
                                        <select className   = "select0"
                                                name        = "item_category"
                                                onChange    = {this.onChangeInput}
                                                value       = {this.state.item_category}
                                                disabled    = {this.props.Parcel[this.state.index_edit].item.length === this.props.Product_Category.length? true:false}
                                        >
                                            {renderOption({state:this.props.Product_Category,change:this.state.edit_item_parcel,text:"pilih kategori product"})}
                                        </select>
                                        <input className    = "input0" 
                                               type         = "number"
                                               name         = "item_qty"
                                               value        = {this.state.item_qty}
                                               onChange     = {this.onChangeInput}
                                               disabled     = {this.props.Parcel[this.state.index_edit].item.length === this.props.Product_Category.length? true:false}
                                               min          = {1}
                                               placeholder  = "masukkan angka jumlah item per product"
                                        />
                                        <button className   = "button0"
                                                onClick     = {this.onAddItem}
                                                disabled    = {this.state.item_qty && this.state.item_category? false:true}
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="buttonBx_active">
                                        <button className   = "button2" 
                                                onClick     = {this.onResetEditParcel}
                                        >
                                            Reset
                                        </button>
                                        <button className   = "button0" 
                                                // onClick     = {this.onFinishAddItem}
                                                // disabled    = {this.props.Parcel.Parcel[this.state.index_edit].item.length? false:true}
                                        >
                                            Finish
                                        </button>
                                        <button className   = "button1" 
                                                onClick     = {()=>this.setState({index_edit:-1})}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </>
                                :  
                                <>
                                    <div className="selectBx">
                                        <select className="select0" disabled>
                                            <option>pilih kategori produk</option>
                                        </select>
                                        <input className="input0" placeholder="masukkan angka jumlah item per product"/>
                                        <button className="button0" disabled>Add</button>
                                    </div>
                                    <div className="buttonBx">
                                        <button className="button2" disabled>Reset</button>
                                        <button className="button0" disabled>Finish</button>
                                        <button className="button1" disabled>Cancel</button>
                                    </div>
                                </>
                            }
                            </div>
                        </div>
                    </div>
                </section>
                <section className="parcellist">
                    <div className="subborder">
                        <div style={{display:"flex",justifyContent:"space-between", background:"tomato", padding:10}}>
                            <select>
                                {renderOption({state:this.props.Parcel_Category,text:"pilih kategori parcel"})}
                            </select>
                            <input  type="text"
                                    name="itemperpage"
                                    onChange={this.onChangeInput}

                            />
                            <div>
                                <input type="number"/>
                                -
                                <input type="number"/>
                            </div>
                        </div>
                        <div style={{display:"flex",justifyContent:"space-between", background:"tomato", padding:10}}>
                            <div style={{background:"gray"}}>
                                {this.props.Parcel.length} Parcels | Page {this.state.currentpage} / {Math.floor(this.props.Parcel.length/this.state.itemperpage)}
                            </div>
                            <div style={{display:"flex"}}>
                                {this.rendpage()}
                                <input type     = "number"
                                       name     = "itemperpage"
                                       max      = {this.props.Parcel.length}
                                       min      = {3}
                                       value    = {this.state.itemperpage}
                                       onChange = {this.onChangeInput}
                                /> 
                            </div>
                        </div>
                        {   
                        this.state.filteredparcel.length?
                        this.renderParcel({
                            obj : this.state.filteredparcel,
                            rest: this.props.AllData,
                        })
                        :
                        this.renderParcel({
                            obj : this.props.Parcel,
                            rest: this.props.AllData,
                        })
                        }
                    </div>
                </section>
            </div>
            </>
        );
    };
});