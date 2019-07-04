import React, {Component} from 'react'
import logo from '../../assets/images/logo.png'
import './index.less'
import {Link} from 'react-router-dom'
import { Menu, Icon, Button } from 'antd';
import menuList from '../../config/menuConfig';//默认暴露的可以写任意的import名字

const { SubMenu } = Menu;
/* 左侧导航的组件 */

export default class LeftNav extends Component{

    getMenuNodes = (menuList) => {
        return menuList.map(item => {
            /* 
                {
                    title: '首页', // 菜单标题名称
                    key: '/home', // 对应的path
                    icon: 'home', // 图标名称
                    isPublic: true, // 公开的
                }
             */

            if(!item.children){//如果item.children不存在
                return(
                    <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                )

            }else {
                
            }
            
        })
    }
    render(){
        return(
            <div className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt=""/>
                    <h1>Silicon Valley Back-Stage</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                >
                    {/* <Menu.Item key="/home">
                        <Link to='/home'>
                            <Icon type="pie-chart" />
                            <span>Home</span>
                        </Link>
                    </Menu.Item>
                    
                    <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>Products</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/category">
                            <Link to='/category'>
                                <Icon type='mail'/>
                                <span>Category Management</span>
                            </Link> 
                        </Menu.Item>
                        <Menu.Item key="/product">
                            <Link to='/product'>
                                <Icon type='mail'/>
                            <span>Product Management</span>
                            </Link>
                            
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/user">
                        <Link to='/user'>
                            <Icon type="pie-chart" />
                            <span>User Management</span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/role">
                        <Link to='/role'>
                            <Icon type="pie-chart" />
                            <span>Role Management</span>
                        </Link>
                    </Menu.Item> */}
                    {
                        this.getMenuNodes(menuList)
                    }
                </Menu>
            </div>
            
        )
    }
}