import React, {Component} from 'react'
import logo from '../../assets/images/logo.png'
import './index.less'
import {Link,withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';
import menuList from '../../config/menuConfig';//默认暴露的可以写任意的import名字

const { SubMenu } = Menu;
/* 左侧导航的组件 */

class LeftNav extends Component{
    /* 使用map()+递归调用动态生成menu */
    getMenuNodes_map = (menuList) => {
        return menuList.map(item => {
            /* 
                {
                    title: '首页', // 菜单标题名称
                    key: '/home', // 对应的path
                    icon: 'home', // 图标名称
                    isPublic: true, // 公开的
                }
             */

             /*
                <SubMenu
                        key="sub1"
                        title={
                        <span>
                            <Icon type="mail" />
                            <span>Products</span>
                        </span>
                        }
                    >
                        <Menu.Item key="/category"></Menu.Item>
                        <Menu.Item key="/product"></Menu.Item>
                    </SubMenu>
              */
            if(!item.children){//如果item.children不存在
                return(
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                )

            }else {
                return(
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes_map(item.children)}
                    </SubMenu>
                )
                
            }
            
        })
    }

    /* 使用reduce()+递归调用动态生成menu */
    getMenuNodes = (menuList) => {
        const path = this.props.location.pathname
        console.log('path',path)
        return menuList.reduce((pre,item)=>{//pre上一次统计的结果
            //向pre中添加<Menu.Item>或<SubMenu>
            if(!item.children){
                pre.push((
                    <Menu.Item key={item.key}>
                        <Link to={item.key}>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </Link>
                    </Menu.Item>
                ))
            } else {

                //查找一个与当前请求路径匹配的子Item
                const cItem = item.children.find(cItem => cItem.key===path)
                //如果存在，说明当前item的子列表需要打开
                if(cItem){
                    this.openKey = item.key;
                }

                //向pre添加<SubMenu>
                pre.push((
                    <SubMenu
                        key={item.key}
                        title={
                        <span>
                            <Icon type={item.icon} />
                            <span>{item.title}</span>
                        </span>
                        }
                    >
                        {this.getMenuNodes(item.children)}
                    </SubMenu>
                ))
            }
            // console.log('!!!') 会被调用10次
            return pre
        },[])//[]是初始值
    }

    //在第一次render（）之前执行一次
    //为第一个render（）准备数据（必须同步的）
    componentWillMount(){
        this.menuNodes = this.getMenuNodes(menuList)
    }

    render(){
        
        //为实现自动选中菜单项：
        //得到当前请求的路由路径

        //但是本组件不是路由组件，没有history, location和match三个属性
        const path = this.props.location.pathname
        console.log('render path',path)
        //得到需要打开菜单项的key
        const openKey = this.openKey

        return(
            <div className="left-nav">
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt=""/>
                    <h1>Silicon Valley Back-Stage</h1>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    //defaultSelectedKeys={[path]} //更新以后不会改变
                    selectedKeys={[path]}
                    defaultOpenKeys={[openKey]}
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
                        this.menuNodes
                    }
                </Menu>
            </div>
            
        )
    }
}
/*
withRouter 高阶组件：
包装非路由组件，返回一个新的组件
新的组件向非路由组件传递3个属性：history/location/match
 */
export default withRouter(LeftNav)