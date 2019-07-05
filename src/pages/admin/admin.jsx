/* 后台管理的路由组件 */
import React,{Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav'//写index.jsx只需要引入到文件夹就可以了
import './admin.less'
import Header from '../../components/header'
//admin的二级子路由
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'

const { Footer, Sider, Content } = Layout;

export default class Admin extends Component{
    
    render(){
        const user = memoryUtils.user
        //如果内存没有存储user，就是说当前没有登录
        if(!user || !user._id){
            //自动跳转到登录（在render（）中实现自动跳转）
            return <Redirect to='/login' />//Link标签不会只是跳转不是重定向，重定向之后就不会再执行之后的return

            //刷新之后内存中user就消失了，用localStorage可以用来永久存储，sessionStorage关闭浏览器之后信息就消失了
        }
        return(
            <Layout style={{height:'100%'}}>{/* 外面的大括号说明里面是JS代码，里面的大括号说明是JS对象, react会将jsx花括号中的内容转化成js代码*/}
                <Sider>
                    <LeftNav />
                </Sider>
                <Layout>
                    <Header />
                    <Content style={{margin:20,backgroundColor:'#fff'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/home' component={Home}/> 
                            <Route path='/category' component={Category}/> 
                            <Route path='/product' component={Product}/> 
                            <Route path='/role' component={Role}/> 
                            <Route path='/user' component={User}/> 
                            <Route path='/charts/bar' component={Bar}/> 
                            <Route path='/charts/line' component={Line}/> 
                            <Route path='/charts/pie' component={Pie}/>
                            {/* 如果一进入admin没有选择具体的组件或者地址写错，就直接跳转到首页 */}
                            <Redirect to='/home'/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign:'center',color:'#cccccc'}}>Chrome is recommended to get the best experience</Footer>
                </Layout>
            </Layout>
        )
    }
}