import React, {Component} from 'react'
import './index.less'
import {formateDate} from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import {reqWeather} from '../../api'
import {withRouter} from 'react-router-dom'
import menuList from '../../config/menuConfig'
import {Modal} from 'antd'
import LinkButton from '../link-button'

 class Header extends Component{

    state = {
        currentTime: formateDate(Date.now()), //当前时间的字符串组合
        dayPictureUrl:'',//天气图片url
        weather:'',//天气的文本
    }

    getTime = () => {
        //每隔1s获取当前时间，并更新状态数据currentTime
        this.intervalId = setInterval(() => {//定时器需要销毁
            const currentTime = formateDate(Date.now())
            this.setState({currentTime})
        },1000)
    }
    getWeather = async () => {
        //调用接口请求异步获取数据
        const {dayPictureUrl, weather} = await reqWeather('福州')
        //更新状态
        this.setState({dayPictureUrl,weather})
    }

    getTitle = () =>{
        //得到当前请求路径
        const path = window.location.pathname
        let title
        menuList.forEach(item => {
            if(item.key === path){//如果当前item对象的key与path一样，item的title就是需要显示的title
                title = item.title
            } else if (item.children){
                //在所有的子item中查找匹配的
                const cItem = item.children.find(cItem => cItem.key===path)
                //如果有值才说明有匹配的
                if(cItem) {
                    //取出它的title
                    title = cItem.title
                }
            }
            
        })
        return title
    }

    logout = () =>{
        //显示确认框
        Modal.confirm({
            content: '确定退出吗？',
            onOk:() => {
                //console.log('OK');
                //先删数据再跳转
                storageUtils.removeUser()
                memoryUtils.user = {}

                this.props.history.replace('/login')//需要用箭头函数获取外层的this
            },
            onCancel() {
                console.log('cancel');

            }
        })
    }

    //第一次render之后执行一次，一般在此执行异步操作，发ajax请求/启动定时器
    componentDidMount(){
        // 获取当前的时间
        this.getTime()
        // 获取当前天气
        this.getWeather()
    }
    /* 当前组件卸载之前调用 */
    componentWillUnmount() {
        //清除定时器
        clearInterval(this.intervalId)
    }

    render(){
        const {currentTime, dayPictureUrl,weather} = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()//在这里执行，每次路由跳转，admin重新渲染，header也会重新render，会重新计算
        return(
            <div className="header">
                <div className="header-top">
                    <span>欢迎，{username}</span>
                    {/* <a href='javascript:' onClick={this.logout}>退出</a> */}
                   {/*  不是实质性的跳转，会有warning,创建一个像链接的button */}
                   <LinkButton onClick={this.logout}>退出</LinkButton>
                </div>
                <div className="header-bottom">
                    <div className="header-bottom-left">{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <img src={dayPictureUrl} alt="weather"/>
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Header)