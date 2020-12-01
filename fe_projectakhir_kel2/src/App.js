import './App.css';
import Login from './pages/login/login'
import Home from './pages/home/home'
import Register from './pages/register/register'
import Admin from './pages/admin/admin'
import {Switch,Route} from 'react-router-dom'
import HeaderAdmin from './../src/components/header/headerAdmin'


function App() {
  return (
    <>
      <Switch>
        <Route exact path ='/' component={Home}/>
        <Route exact path ='/login' component={Login}/>
        <Route exact path ='/admin' component={Admin}/>
        <Route exact path ='/register' component={Register}/>
        <Route exact path='/headerAdmin' component={HeaderAdmin}/>
      </Switch>
    </>
  );
}

export default App;
