import React from "react";
import "./home.scss";
import Axios from 'axios';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { icon, illustration_1 } from "../../assets";
import { debounce, API_URL_SQL, draggableCard, priceFormatter } from "../../helpers";
import { Header, packageCarousel } from "../../components";
import { loadCategories, addtoTransaction, AddcartAction } from "../../redux/Actions";
// import { FullPageLoading } from '../../components/loading';

const mapStatetoProps = (state) => {
  return {
    Parcel: state.Parcel,
    Auth  : state.Auth
  };
};

export default connect(mapStatetoProps, { loadCategories, addtoTransaction, AddcartAction })(class Home extends React.Component {
  state = {
    inputSearch: "",
    filteredPackage: [],
    product_categories: [],
    isLoading:true
  };

  componentDidMount() {
    this.props.loadCategories();
    // console.log(this.props.Parcel.Product_Category)
    this.setState({product_categories : this.props.Parcel.Product_Category});
    // draggableCard(".cardBx", "left", 2);
  };

  componentDidUpdate() {
    draggableCard(".cardBx", "left", 2);
  }

  onSearchInputChange(e, prop) {
    // console.log(prop.array);
    let newArr = [];
    for (let i = 0; i < prop.array.length; i++) {
      if (prop.array[i].nama.toLowerCase().includes(e.target.value)) {
        newArr.push(prop.array[i]);
      }
    }
    this.setState({ filteredPackage: newArr });
  };

  onChangeInput = (e) => {
    if(this.state.product_categories.findIndex((val) => parseInt(e.target.value) === val.id) !== -1) {
      this.state.product_categories.splice(this.state.product_categories.findIndex((val) => parseInt(e.target.value) === val.id),1);
      this.setState({ product_categories: this.state.product_categories });
    } else {
      this.state.product_categories.push( this.props.Parcel.Product_Category[this.props.Parcel.Product_Category.findIndex((val) => val.id === parseInt(e.target.value))]);
      this.setState({product_categories: this.state.product_categories.sort((a, b) =>a.id > b.id ? 1 : -1)});
    };
  };
  
  addprodtocart = id => {
    console.log(id)
    if(this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===id)]===undefined){
      console.log('oke baru nih '+id)
      let data = {
        user_id     : this.props.Auth.id,
        products_id : id,
        parcel_id   : 0,
        qty         : 1
      }
      Axios.post(`${API_URL_SQL}/transaksi/addtocartproduct`,data)
      .then((result)=>{
        console.log(result.data)
        this.props.AddcartAction(result.data)
      }).catch((error)=>{
        console.log(error)
      })
    }else{
      console.log('udah ada nih item '+id)
      console.log(this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===id)].qty)
      let data = {
        user_id     : this.props.Auth.id,
        products_id : id,
        parcel_id   : 0,
        qty         : 1
      }
      Axios.post(`${API_URL_SQL}/transaksi/addtocartproduct`,data)
      .then((result)=>{
        console.log(result.data)
        this.props.AddcartAction(result.data)
      }).catch((error)=>{
        console.log(error)
      })
    }
  };

  decprodincart = id => {
    if(this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===id)].qty-1===0){
      console.log('kurangin lagi habis loh ini')
      console.log(this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===id)].qty-1)
      try {
        Axios.post(`${API_URL_SQL}/transaksi/removefromcart`,{
            transaksi_id        : this.props.Auth.cart.transaksi[0].id,
            transaksidetail_id  : this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===id)].transaksidetail_id,
            user_id             : this.props.Auth.id
        })
        .then((res)=>{
          console.log(res.data)
          this.props.AddcartAction(res.data);
        }).catch((error)=>{
          console.log(error);
        });
      } catch (error) {
        console.log(error)
      }
    }else{
      console.log('kurangin 1 ya')
      let data = {
        user_id     : this.props.Auth.id,
        products_id : id,
        parcel_id   : 0,
        qty         : this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===id)].qty-1
      };
      Axios.post(`${API_URL_SQL}/transaksi/addtocart`,data)
      .then((res)=>{
        console.log(res.data)
        this.props.AddcartAction(res.data);
      }).catch((error)=>{
        console.log(error)
      });
    };
  };

  render() {
    // console.log("cart", this.props.Auth.cart);
    // console.log(this.state.product_categories);
    return (
      <>
      {
        // this.state.product_categories.length===0?
        // <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
        //   {FullPageLoading(this.state.isLoading,1000,'#0095DA')}
        // </div>
        // :
        <>
        <Header />
        <section className="banner">
          <div className="content">
            <div className="upperContent">
              <div className="textBx">
                <div className="imgBx">
                  <img className="colored-lt-primary" src={icon} />
                </div>
                <h2>
                  <span className="primary">DISTANCE </span>can no longer be
                  the obstacle between you & the one that you{" "}
                  <span className="tertiary"> CARE.</span>
                </h2>
                <h5>
                  We,<span className="primary"> hearttoheart</span>, are here
                  to help you let them know that you care by giving them your
                  personal <span className="tertiary"> hampers </span> for
                  every occasions out there.
                </h5>
              </div>
              <div className="illustrationBx">
                <img src={illustration_1} />
              </div>
            </div>
            <div className="lowerContent">
              <input
                type="text"
                placeholder="Search Package"
                onChange={debounce(
                  (e) =>
                    this.onSearchInputChange(e, {
                      array: this.props.Parcel.Parcel,
                    }),
                  700
                )}
              />
            </div>
          </div>
        </section>
        <section className="packages">
          <div className="bg">
            {this.state.filteredPackage.length?
                packageCarousel({
                  obj: this.state.filteredPackage,
                  rest: this.props.Parcel,
                })
              : packageCarousel({
                  obj: this.props.Parcel.Parcel,
                  rest: this.props.Parcel,
                })}
          </div>
        </section>
        <section className="products">
          <div className="content">
            <p>
              We also provide you with items you need to show the closest one
              for you your love. Single product to help you give them your
              best cook or giving them things their like to let them know that
              you always be there for theme.
              <br />
              Don't worry all you need to do is choose and wait for them to be
              arrived in front of your house!
            </p>
            <div className="productBx">
              <div className="leftBx">
                <div className="hint">Check to hide categories:</div>
                <div className="lists">
                  {this.props.Parcel.Product_Category.map((val) => {
                    return (
                      <div className="cat_list" key={val.id}>
                        <div>{val.nama}</div>
                        <input
                          type    = "checkbox"
                          name    = {val.nama}
                          value   = {val.id}
                          onChange= {this.onChangeInput}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="rightBx">
                {this.state.product_categories.map((val) => {
                  return (
                    <div className="border" key={val.id}>
                      <div className="search">
                        <div className="cat">{val.nama}</div>
                        <input type       = "text"
                               name       = "search"
                               placeholder= "insert product's name you want to search"
                        />
                        <button className="more">See All..</button>
                      </div>
                      <div className="list">
                        <div className="cardlist">
                          {this.props.Parcel.Product.map((item) => {
                            if (item.categoryproduct_id === val.id) {
                              return (
                                <div className="card" key={item.id}>
                                  <div className="imgBx">
                                    <img src={API_URL_SQL+item.image} alt={"gambar"+item.nama} />
                                  </div>
                                  <div className="namaitem">{item.nama}</div>
                                  <div className="hargaitem">
                                    {priceFormatter(item.harga)}
                                  </div>
                                  <div className="additem">
                                  {
                                  this.props.Auth.id?
                                  <>
                                    <button className = "crement"
                                            onClick   = {()=>this.decprodincart(item.id)}
                                            disabled  = {this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===item.id)] === undefined? true:false }
                                    >
                                      -
                                    </button>
                                    <div className="amount">
                                      {
                                      this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===item.id)] === undefined?
                                      0 : this.props.Auth.cart.transaksidetailsatuan[this.props.Auth.cart.transaksidetailsatuan.findIndex(val=>val.products_id===item.id)].qty
                                      }
                                    </div>
                                    <button className="crement"
                                            onClick={()=>this.addprodtocart(item.id)}
                                    >
                                      +
                                    </button>
                                  </>
                                  :
                                  <>
                                    <button className = "crement" disabled> - </button>
                                    <div className="amount"> 0 </div>
                                    <Link to="/login">
                                      <button className="crement"> + </button>
                                    </Link>
                                  </>
                                  }
                                  </div>
                                </div>
                              );
                            }
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        </>
      }
      </>
    );
  };
});
