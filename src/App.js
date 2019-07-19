import React,{Component} from 'react';
// import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login.jsx'
import Admin from './pages/admin/admin.jsx'



class App extends Component{
    render(){
      return(
        <BrowserRouter>
            <Switch>{/* 只匹配其中一个 */}
              <Route path='/login' component={Login}></Route>
              <Route path='/' component={Admin}></Route>{/* 项目根路径 */}
            </Switch>
        </BrowserRouter>
        
      )
    }
}

export default App;
