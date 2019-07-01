/* 后台管理的路由组件 */
import React,{Component} from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from '../../utils/memoryUtils'

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
            <div>
                Hello {user.username}
            </div>
        )
    }
}