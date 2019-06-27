/* 
能根据接口文档定义接口请求函数
包含应用中 所有接口请求函数 的模块
每个函数的返回值都是promise */
import ajax from './ajax'
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