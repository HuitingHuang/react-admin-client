/* 
能根据接口文档定义接口请求函数
包含应用中 所有接口请求函数 的模块
每个函数的返回值都是promise */
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd';
//方法一：统一暴露
// export default {
//     xxx(){

//     },//接口函数
//     yyy(){

//     }
// }//统一暴露

// //方法二：分别暴露
// export function xxx() {

// }

// export function yyy(){

// }

//登录
// export function reqLogin(username,password){
//     return ajax('/login',{username,password},'POST')
// }

export const reqLogin = (username,password) => ajax('/login',{username,password},'POST')

//添加用户
export const reqAddUser = (user) =>ajax('/manage/user/add',user,'POST')//user是包含用户各类信息的对象

//json请求的接口请求函数
export const reqWeather = (city) => {
    return new Promise((resolve,reject) => {
        const url =`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        //发送jsonp请求
        jsonp(url, {}, (err,data)=>{//不用axios因为它没有封装jsonp
            // console.log('jsonp()',err,data)
            // 如果成功了
            if(!err && data.status === 'success'){
                //解构赋值取出需要的数据
                const {dayPictureUrl, weather} = data.results[0].weather_data[0]
                resolve({dayPictureUrl, weather})
            }else{
                message.error('获取天气信息失败！')
            } 
            
        })
    })    
}

//获取一级/二级分类的列表
export const reqCategories = (parentId) => ajax('/manage/category/list',{parentId})

//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax('/manage/category/add',{categoryName,parentId},'POST')

//更新分类(解构参数)
export const reqUpdateCategory = ({categoryId,categoryName}) => ajax('/manage/category/update',{categoryId,categoryName},'POST')

// 获取一个分类
export const reqCategory = (categoryId) => ajax('/manage/category/info',{categoryId})

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax('/manage/product/list',{pageNum,pageSize})

//更新商品的状态（上架/下架）
export const reqUpdateStatus = (productId,status) => ajax('/manage/product/updateStatus',{productId,status},'POST')

// 搜索商品分页列表(根据商品名称/商品描述)
//searchType：搜索的类型，productName/productDesc
export const reqSearchProducts = ({pageNum,pageSize,searchName,searchType}) => ajax('/manage/product/search',{pageNum,pageSize,[searchType]:searchName})//让一个变量名的值作为属性名的时候，需要在变量名外加一个中括号


