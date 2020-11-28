import logo from './logo.svg';
import './App.css';
import {Switch,Route} from 'react-router-dom'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Admin from './pages/admin/admin'
import Register from './pages/register/register'
import {connect} from 'react-redux'
// import Axios from 'axios';
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' 
toast.configure()

function App() {


  return (
  <Switch>
    <Route exact path ='/' component={Home}/>
    <Route exact path ='/login' component={Login}/>
    <Route exact path ='/admin' component={Admin}/>
    <Route exact path ='/register' component={Register}/>
  </Switch>
  );
}

export default App;
