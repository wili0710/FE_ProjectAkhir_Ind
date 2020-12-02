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


function App() {
  
  const Auth=useSelector(state=>state.Auth)
  const dispatch=useDispatch()

  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    var id=localStorage.getItem('id')
    if(id!==null){ 
      Axios.get(`${API_URL_SQL}/auth/keeplogin/${id}`)
      .then((res)=>{
          dispatch({type:'LOGIN',payload:res.data.datauser,cart:res.data.cart})
      }).catch((err)=>{
          alert(err.response.data.message)
      }).finally(()=>{
          setLoading(false)
      })
    }else{
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
    if(1===1){
    // if(Auth.role==="Admin"){
      return(
        <>
          <Route exact path='/adminpanel' component={AdminPayment}/>
          <Route exact path='/adminpanel/datauser' component={AdminPayment}/>
          <Route exact path='/adminpanel/payment' component={AdminPayment}/>
          <Route exact path='/adminpanel/product' component={AdminPayment}/>
          <Route exact path='/adminpanel/parcel' component={AdminPayment}/>
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
        {renderProtectedAdminRoutes()}
        <Route path='*' component={ManageAdmin}/>
      </Switch>
    </>
  );
}

export default App;
