import React, {Component} from 'react'
import {Switch, Route,Redirect} from 'react-router-dom'

import ProductHome from './home'
import ProductAddUpdate from './add-update'
import ProductDetail from './detail'

import './product.less'

/* 二级路由的商品管理 */
export default class Product extends Component{
    render(){
        return(
            <Switch>
                {/* 路由是默认逐层匹配的，如果这里/product不用精准匹配，/product/addupdate和/product/detail就会匹配不到 */}
                <Route exact path='/product' component={ProductHome} />{/* 不能写path='/',因为这里永远代表项目的根路径 */}
                <Route path='/product/addupdate' component={ProductAddUpdate} />
                <Route path='/product/detail' component={ProductDetail} />
                <Redirect to='/product'/>
            </Switch>
        )
    }
}