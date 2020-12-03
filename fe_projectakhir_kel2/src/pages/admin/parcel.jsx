import React, { Component, createRef } from 'react';
import './parcel.scss'
import Axios from 'axios';
import { Courier } from '../../assets';
import { HeaderAdmin } from '../../components';
import { API_URL_SQL } from '../../helpers';

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
        url_files               : null,
        id_category_parcel      : 1,

        //* Initial Temporary Parcel State *//
        index_add_cat_product   : -1,
        item_category           : 1,
        temp_parcel             : [],
        temp_item               : [],
        item_qty                : createRef(),

        //* Initial Parcel Ready to Deploy State *//
        ready_topush            : [],
    };

    componentDidMount() {
        Axios.get(`http://localhost:4000/category_products`)
        .then((res)=>{
            Axios.get(`http://localhost:4000/products`)
            .then((res2)=>{
                this.setState({category_products:res.data,products:res2.data})
            }).catch((err)=>{
                console.log(err)
            });
        }).catch((err)=>{
            console.log(err);
        });
    };  

    componentDidUpdate() {
        console.log(this.state.ready_topush);
        console.log(this.state.temp_parcel);
        // console.log(this.state.index_add_cat_product);
    };

    renderOptCategoryProduct = () => {
        return this.state.category_products.map((val)=>{
            return (
                <option value={val.id}>{val.name}</option>
            );
        });
    };

    onChangeItemCategoryInput=(e)=>{
        this.setState({item_category:e.target.value})
    };

    onAddClick = () => {
        const {
            harga,
            url_files,
            nama_parcel,
            id_category_parcel
        } = this.state;
        if(nama_parcel.current.value==="" || harga.current.value==="") return alert("nama dan harga parcel wajib diisi")
        if(this.state.upl_files !== null){
            //*****//
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
                alert("oke");
                let img = result.data;
                if(this.state.temp_parcel.length){
                    let obj = this.state.temp_parcel;
                    const newObj = {
                        category: id_category_parcel,
                        name    : nama_parcel.current.value,
                        price   : harga.current.value,
                        gambar  : `${API_URL_SQL}${img}`
                    };
                    obj.push(newObj)
                    this.setState({temp_parcel:obj})
                }else{
                    const obj = {
                        category: id_category_parcel,
                        name    : nama_parcel.current.value,
                        price   : harga.current.value,
                        gambar  : `${API_URL_SQL}${img}`
                    };
                    this.setState({temp_parcel:[obj]})
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
                this.setState({temp_parcel:obj})
            }else{
                const obj = {
                    category: id_category_parcel,
                    name    : nama_parcel.current.value,
                    price   : harga.current.value,
                    gambar  : url_files
                };
                this.setState({temp_parcel:[obj]})
            };
        };
    };

    onChangeitem = (e) => {
        let tempArr = [];
        for(let i = 0; i < e.target.value; i++){
            tempArr.push(this.state.category_products);
        };
        console.log(tempArr);
        this.setState({kombi:tempArr,item:e.target.value});
    };

    saveClicked = () => {
        this.setState({isSaved:!(this.state.isSaved)});
    };

    onInputUploadFileChange = (e) => {
        
        if(e.target.files[0]){
            this.setState({
                upl_files:e.target.files[0],
                upl_files_preview:URL.createObjectURL(e.target.files[0])
            })
        }else{
            console.log('Hapus')
            this.setState({
                upl_files:null,
                upl_files_preview:null
            });
        };
    };

    onInputURLFileChange = (e) => {
        if(e.target.value!==""){
            this.setState({url_files:e.target.value})
        }else{
            this.setState({url_files:null})
        };
    };

    onChangeCategoryInput = (e) =>{
        this.setState({id_category_parcel:e.target.value})
    };

    onSaveItem = () => {
        /* protection */
        if(isNaN(parseInt(this.state.item_qty.current.value))) return alert('quantity harus diisi');
        /* end of protection */

        if(this.state.temp_item.length) {
            const obj = this.state.temp_item;
            const newObj = {
                category_item : parseInt(this.state.item_category),
                qty_item: parseInt(this.state.item_qty.current.value)
            };
            obj.push(newObj);
            this.setState({temp_item:obj});
        }else{
            const obj = {
                category_item : parseInt(this.state.item_category),
                qty_item: parseInt(this.state.item_qty.current.value)
            };
            this.setState({temp_item:[obj]});
        };
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


    render() { 
        return (
            <>
                <section className="main">
                    <HeaderAdmin/>
                    <div clasName="parcelcomponent">
                        <h1 className="title"> Parcel Management </h1>
                        <div className="addparcel">
                            <div className="imgBx">
                                {
                                    this.state.url_files || this.state.upl_files?
                                        <img src={this.state.url_files? this.state.url_files:this.state.upl_files_preview} alt="Foto Parcel" style={{width:"100%", height:"100%", objectFit:'cover'}} onChange={this.onInputFileChange}/>
                                    :
                                        <img src={Courier} alt="Foto Parcel" style={{width:"100%", height:"100%", objectFit:'cover'}}/>
                                }
                                <input type = "file" accept=".png,.jpg,.svg" onChange = {this.onInputUploadFileChange} disabled = { this.state.url_files === null? false:true} style = {{marginTop:(200*(-1))}}/>
                            </div>
                            <div style={{marginRight:20}}>
                                <div style={{}}>
                                    <label style={{marginRight:20, marginBottom:(-10), fontWeight:"bold"}}>
                                        {"Kategori Parcel"}
                                    </label>
                                    <select onChange={(e)=>this.onChangeCategoryInput(e)}>
                                        <option value="1">Kado Bayi     </option>    
                                        <option value="2">Hari Perayaan </option>    
                                        <option value="3">Bawaan Jenguk </option>    
                                    </select>    
                                </div>
                                <div>
                                    <label style={{marginRight:20, marginTop:10, marginBottom:(-10), fontWeight:"bold"}}>
                                        {"Nama Parcel"}
                                    </label>
                                    <input type = "text" placeholder = "tentukan nama parcel" ref = {this.state.nama_parcel} style={{width:"100%"}}/>    
                                </div>
                                <div>
                                    <label style={{marginRight:20, marginTop:10, marginBottom:(-10), fontWeight:"bold"}}>
                                        {"Harga Parcel"}
                                    </label>
                                    <input type = "number" placeholder = "tentukan harga parcel" ref = {this.state.harga} style={{width:"100%"}}/>
                                </div>
                                <div>
                                    <label style={{marginRight:20, marginTop:10, marginBottom:(-10), fontWeight:"bold"}}>
                                        {"Gambar Parcel"}
                                    </label>
                                    <input type = "text" placeholder = "masukkan link url gambar"  onChange = {this.onInputURLFileChange} disabled = { this.state.upl_files === null? false:true} style={{width:"100%"}}/>
                                </div>
                            </div>
                        </div>
                        <button onClick={this.onAddClick} style={{marginTop:20, width:1000}}> Add </button>
                
                        <h1 style={{marginTop:20,}}><span style={{color:"tomato"}}>New!</span> Parcel Added</h1> 
                        <div>
                            { 
                                this.state.temp_parcel.length !== 0?
                                    <>  
                                        <div style={{display:"flex"}}>
                                        { 
                                            this.state.temp_parcel.map((val,index)=>{
                                                return (
                                                    <>
                                                        {
                                                            index !== this.state.index_add_cat_product?
                                                                <div key={index} style={{border:"2px tomato dashed", padding:40}}>
                                                                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", margin:"-20px 0 20px 0"}}>
                                                                        {
                                                                            index === (this.state.temp_parcel.length-1)?
                                                                                <>
                                                                                    <div style={{color:"tomato"}}> newest! </div>
                                                                                    <button disabled={this.state.index_add_cat_product!==-1? true : false}>x</button>
                                                                                </>
                                                                            :
                                                                            <>
                                                                                <div></div>
                                                                                <button disabled={this.state.index_add_cat_product!==-1? true : false}>x</button>
                                                                            </>
                                                                        }
                                                                        </div>
                                                                    <div style={{display:"flex"}}>
                                                                        <div style={{marginRight:20}}>
                                                                            <img src={val.gambar} alt="Foto Package" height='250' width='250'/>
                                                                        </div>
                                                                        <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                                                            <div> Category Parcel: {val.category}   </div>
                                                                            <div> Name Parcel    : {val.name}       </div>
                                                                            <div> Harga Parcel   : {val.price}      </div>
                                                                        </div>
                                                                    </div>
                                                                    <button onClick={()=>this.setState({index_add_cat_product:index})} style={{width:"100%", marginTop:10}} disabled={this.state.index_add_cat_product!==-1? true : false}>Add Items</button>
                                                                </div>
                                                            :
                                                                null
                                                        }
                                                    </>
                                                )
                                            })
                                        }
                                        </div>
                                        <div style={{marginTop:20}}>
                                        {
                                            this.state.index_add_cat_product !== -1?
                                                <>
                                                    <div style={{boxShadow:"2px 2px 10px 5px rgba(0,0,0,0.2)", padding:15, display:"flex", flexDirection:"column", alignItems:"center"}}>
                                                        <h1>Add Parcel <span style={{color:"tomato"}}>{this.state.temp_parcel[this.state.index_add_cat_product].name}</span> Items</h1>
                                                        <div style={{border:"2px dashed gray", borderRadius:10, padding:10, marginBottom:20, width:"100%"}}>
                                                            <div style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
                                                                <div> Category Parcel: {this.state.temp_parcel[this.state.index_add_cat_product].category}   </div>
                                                                <div> Name Parcel    : {this.state.temp_parcel[this.state.index_add_cat_product].name}       </div>
                                                                <div> Harga Parcel   : {this.state.temp_parcel[this.state.index_add_cat_product].price}      </div>
                                                            </div>
                                                        </div>
                                                        <div>Press <span style={{color:"tomato"}}>Save</span> to add more item, <span style={{backgroundColor:"tomato", color:"white"}}> Finish </span> to set parcel ready to deploy, or <span style={{color:"red", fontWeight:"bold"}}>Cancel</span> to cancel add items and lose all changes</div>
                                                        <div style={{display:"flex", justifyContent:"space-evenly", width:"100%"}}>
                                                            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly", width:"100%"}}>
                                                        {
                                                            this.state.temp_item.length?
                                                                this.state.temp_item.map((val,index)=>{
                                                                    return (
                                                                        <div style={{display:"flex", justifyContent:"space-evenly", width:"100%", backgroundColor:index%2===1?"wheat":"white", margin:"10px 0"}}>
                                                                            <div style={{display:"flex", justifyContent:"center", alignItems:"center", marginRight:20, width:80, fontWeight:"bold"}}> Item {index+1}</div>
                                                                            <div style={{marginRight:20, width:"100%"}}>
                                                                                <div style={{borderBottom:"1px solid tomato", borderLeft:"1px solid tomato", borderRight:"1px solid tomato", padding:"5px 20px"}}> Category Product: {this.state.category_products[val.category_item-1].name}</div>
                                                                                <div style={{borderLeft:"1px solid tomato", borderRight:"1px solid tomato", padding:"5px 20px"}}> Quantity : {val.qty_item}</div>
                                                                            </div>
                                                                            <div style={{display:"flex", flexDirection:"column", justifyContent:"space-evenly"}}> 
                                                                                <button style={{width:"100%", height:"100%", backgroundColor:"gray", color:"white"}}>Edit</button>
                                                                                <button style={{width:"100%", height:"100%", backgroundColor:"red", color:"white"}}>Hapus</button>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })
                                                            :
                                                                null
                                                        }
                                                            </div>
                                                        </div>
                                                        <div style={{display:"flex", justifyContent:"space-evenly", width:"100%"}}>
                                                            <select onChange={(e)=>this.onChangeItemCategoryInput(e)}>
                                                                {this.renderOptCategoryProduct()}
                                                            </select>
                                                            <input type="number" style={{width:"100%"}} ref={this.state.item_qty}/>
                                                            <button style={{color:"tomato"}} onClick={this.onSaveItem}>Save</button>
                                                        </div>
                                                        <div style={{display:"flex", justifyContent:"space-evenly", width:"100%", marginTop:20}}>
                                                            <button style={{backgroundColor:"tomato", color:"white", width:"100%"}} onClick={this.onFinishAddItem}>Finish</button>
                                                            <button style={{color:"red", fontWeight:"bold", width:"100%"}}>Cancel</button>
                                                        </div>
                                                    </div>
                                                </>
                                            :
                                            null 
                                        }
                                        </div>
                                    </>
                                :
                                    <div> --- tidak ada parcel yang <span style={{color:"tomato"}}> baru </span> dibuat ---</div>
                            }
                        </div>
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
                                                            {/* <div style={{display:"flex"}}> */}
                                                                <div style={{marginRight:5}}>
                                                                    kategori parsel :
                                                                </div >
                                                                <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                                    {val.category}
                                                                </div>
                                                            {/* </div>
                                                            <div style={{display:"flex"}}> */}
                                                                <div style={{marginRight:5}}>
                                                                    nama parsel :
                                                                </div>
                                                                <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                                    {val.name}
                                                                </div>
                                                            {/* </div>
                                                            <div style={{display:"flex"}}> */}
                                                                <div style={{marginRight:5}}>
                                                                    harga parsel :
                                                                </div>
                                                                <div style={{backgroundColor:"tomato", borderRadius:5, padding:"0 10px", width:"100%"}}>
                                                                    {val.price}
                                                                {/* </div> */}
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
                    </div>
                </section>
            </>
        );
    };
};
 
export default Admin;