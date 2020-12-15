import './App.css';
import React,{useEffect,useState} from 'react';
import Login from './pages/login/login'
import Home from './pages/home/home'
import Register from './pages/register/register'
import ManageAdmin from './pages/admin/adminpayment'
import {Switch,Route} from 'react-router-dom'
import {API_URL_SQL} from './helpers/apiUrl'
import {useDispatch,useSelector} from 'react-redux'
import {FullPageLoading } from './components/loading';
import Axios from 'axios';
import AdminPayment from './pages/admin/adminpayment';
import HeaderAdmin from './../src/components/header/headerAdmin'
import MyAccount from './../src/pages/user/MyAccount'
import User from './../src/pages/admin/user'
import Parcel from './../src/pages/admin/parcel'
import Product from './../src/pages/admin/product'
import CategoryProduct from './../src/pages/admin/categoryProduct'
import CategoryParcel from './../src/pages/admin/categoryParcel'
import DataProduct from './../src/pages/Product/dataProduct'
import DetailParcel from './../src/pages/Product/detailParcel'
import {connect} from 'react-redux';
import CartPage from './pages/cart';
import AdminReport from './pages/admin/adminreport';
import Example from './pages/hapusaja';
import {LoginFunc,AddcartAction} from './redux/Actions'
import notfound from './pages/notfound';
import Test from './components/test'

function App(props) {
  
  const Auth=useSelector(state=>state.Auth)
  const dispatch=useDispatch()

  const [loading,setLoading]=useState(true)

  useEffect(()=>{
  // console.log(Auth.id)
  var id = localStorage.getItem('id')
  // console.log(id)
  if(id){
    Axios.post(`${API_URL_SQL}/auth/newkeeplogin`,{
      id
    }).then((res)=>{

      props.LoginFunc(res.data[0].user[0],res.data[1])
      // props.AddcartAction(res.data[1])

    }).catch((err)=>{
      console.log(err)
    }).finally(()=>{
      setLoading(false)
    })
  }else {
    console.log('masuk ke else')
    setLoading(false)
  }
  },[])

  if(loading){
    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:"100vh", width:"100vw"}}>
            {FullPageLoading(loading,100,'#0095DA')}
        </div>
    )
  }
  const renderProtectedAdminRoutes=()=>{
    // if(1===1){
    if(Auth.role==="admin"){
      return(
        <>
          <Route exact path='/adminpanel' component={AdminReport}/>
          <Route exact path='/adminpanel/datauser' component={User}/>
          <Route exact path='/adminpanel/payment' component={AdminPayment}/>
          <Route exact path='/adminpanel/product' component={Product}/>
          <Route path='/adminpanel/parcel' component={Parcel}/>
          <Route exact path='/adminpanel/headerAdmin' component={HeaderAdmin}/>
          <Route exact path ='/adminpanel/categoryProduct' component={CategoryProduct}/>
          <Route exact path ='/adminpanel/categoryParcel' component={CategoryParcel}/>
       
          {/* <Route exact path='/dataproduct' component={DataProduct}/>
        <Route exact path='/detailParcel/:id' component={DetailParcel}/> */}
        </>
      )
    }
  }

  return (
    <>
      <Switch>
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path ='/register' component={Register}/>
        <Route exact path='/dataproduct' component={DataProduct}/>
        <Route exact path ='/useraccount' component={MyAccount}/>
        <Route exact path='/detailParcel/:id' component={DetailParcel}/>
        <Route exact path ='/cart' component={CartPage}/>
        <Route exact path ='/hapusaja' component={Example}/>
        <Route exact path ='/test' component={Test}/>
        {renderProtectedAdminRoutes()}
        <Route path='*' component={notfound}/>

      </Switch>
    </>
  );
}

const Mapstatetoprops=({Auth})=>{
  return {
      ...Auth
  }
}

export default connect(Mapstatetoprops,{LoginFunc, AddcartAction}) (App);
