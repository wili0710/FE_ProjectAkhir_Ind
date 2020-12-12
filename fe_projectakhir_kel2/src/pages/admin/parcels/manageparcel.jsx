import React from 'react'
import './scss/manageparcel.scss'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { priceFormatter, renderOption, API_URL_SQL } from '../../../helpers';
import { cat_2, d_parcel, icon } from '../../../assets';
import { popup } from '../../../components';
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

        // component toggle 
        showPopup               : false
    };
    
    componentDidMount() {
        // console.log(this.props.Parcel)
    }
    componentDidUpdate() {
        // console.log(this.props.Parcel)
    }

    onResetEditParcel = () => {
        if(this.props.Parcel[this.state.index_edit].gambar && this.props.Parcel[this.state.index_edit].gambar.includes(API_URL_SQL)){
            this.setState({
                edit_category_parcel    : this.props.Parcel[this.state.index_edit].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[this.state.index_edit].nama,
                edit_harga_parcel       : this.props.Parcel[this.state.index_edit].harga,
                edit_gambar_parcel_upl  : this.props.Parcel[this.state.index_edit].gambar,
                edit_item_parcel        : this.props.Parcel[this.state.index_edit].item,
            });
        }else{
            this.setState({
                edit_category_parcel    : this.props.Parcel[this.state.index_edit].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[this.state.index_edit].nama,
                edit_harga_parcel       : this.props.Parcel[this.state.index_edit].harga,
                edit_gambar_parcel_url  : this.props.Parcel[this.state.index_edit].gambar,
                edit_item_parcel        : this.props.Parcel[this.state.index_edit].item,
            });
        };
    }

    onEditParcelCLick = index => {
        if(this.props.Parcel[index].gambar && this.props.Parcel[index].gambar.includes(API_URL_SQL)){
            this.setState({
                index_edit              : index,
                edit_category_parcel    : this.props.Parcel[index].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[index].nama,
                edit_harga_parcel       : this.props.Parcel[index].harga,
                edit_gambar_parcel_upl  : this.props.Parcel[index].gambar,
                edit_item_parcel        : this.props.Parcel[index].item,
            });
        }else{
            this.setState({
                index_edit              : index,
                edit_category_parcel    : this.props.Parcel[index].categoryparcel_id,
                edit_nama_parcel        : this.props.Parcel[index].nama,
                edit_harga_parcel       : this.props.Parcel[index].harga,
                edit_gambar_parcel_url  : this.props.Parcel[index].gambar,
                edit_item_parcel        : this.props.Parcel[index].item,
            });
        };
    };

    onChangeInput = (e) =>{
        if(e.target.name === ("edit_harga_parcel")) {
            if(e.target.value > 0) {
                this.setState({[e.target.name]:e.target.value})
            };
        }else{
            this.setState({[e.target.name]:e.target.value})
        };
    };

    onDeleteParcel = (id) => {
        this.props.deleteParcel(id);
    };

    renderParcel(props) {
        console.log(props);
        return (
        <div className="cardBox">
            { props.obj.map((val,index)=>{
                return (
                    <div className="card" key={val.id}>
                        <div className="Bx">
                            <div className="content">
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
            })}
        </div> 
        );
    };

    render() {
        console.log(this.props.Parcel[this.state.index_edit])
        console.log(this.state.index_edit)
        console.log(this.props.AllData)
        return (
            <>
            {
            this.state.showPopup?
            <popup  text='click "x" to hide popup'
                    closePopup={()=>this.setState({showPopup:!this.state.showPopup})}
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
                            <Link to='/parcel/deploy' style={{ textDecoration: 'none' }}>
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
                                                <button className="ganti_gambar" onClick={()=>this.setState({showPopup:!this.state.showPopup})}> ... </button>
                                                <button className="hapus_gambar"> x </button>
                                            </div>
                                            <img src = {this.state.edit_gambar_parcel_upl? this.state.edit_gambar_parcel_upl : this.state.edit_gambar_parcel_url!=="null"? this.state.edit_gambar_parcel_url:d_parcel} 
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
                                    Choose Parcel 
                                    <span>
                                        {
                                            this.state.index_edit >= 0?
                                            this.props.Parcel[this.state.index_edit].nama
                                            :
                                            <> EDIT </>
                                        }
                                    </span>
                                    to Change its Details
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
                                <div className="renderBx_edit">
                                    {
                                    this.state.index_edit >= 0?
                                    this.props.Parcel[this.state.index_edit].item.map((val,index)=>{
                                    return (
                                    <div className="itemBx_edit" key={val.id}>
                                        <div className="content">
                                            <div className="itemhead">
                                                <div className="id"> SET {index+1}</div>
                                                <button>X</button>
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
                                            {renderOption({state:this.props.Product_Category,change:this.props.Parcel[this.state.index_edit],text:"pilih kategori product"})}
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
                                                // onClick     = {this.onSaveItem}
                                                // disabled = {this.state.item_qty && this.state.item_category? false:true}
                                        >
                                            Add
                                        </button>
                                    </div>
                                    <div className="buttonBx_active">
                                        <button className   = "button2" 
                                                onClick     = {this.onCancelAddItem}
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
                                                // onClick     = {this.onCancelAddItem}
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