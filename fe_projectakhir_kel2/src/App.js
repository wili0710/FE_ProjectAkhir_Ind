import './App.css';
import Login from './pages/login/login'
import Home from './pages/home/home'
import Register from './pages/register/register'
// import Admin from './pages/admin/admin'
import {Switch,Route} from 'react-router-dom'
import HeaderAdmin from './../src/components/header/headerAdmin'
import User from './../src/pages/admin/user'
import Payment from './../src/pages/admin/payment'
import Parcel from './../src/pages/admin/parcel'
import Product from './../src/pages/admin/product'

function App() {
  return (
    <>
      <Switch>
      
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path ='/register' component={Register}/>
        <Route exact path='/headerAdmin' component={HeaderAdmin}/>
        <Route exact path ='/user' component={User}/>
        <Route exact path ='/payment' component={Payment}/>
        <Route exact path ='/parcel' component={Parcel}/>
        <Route exact path ='/product' component={Product}/>
      </Switch>
    </>
  );
}

export default App;
