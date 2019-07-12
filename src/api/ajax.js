/*
能发送异步ajax请求的 通用 函数模块
封装axios库
函数返回值是promise对象
1.优化：1)统一处理请求异常
在外层包一个自己创建的promise对象
在请求出错时，不去reject（error），而是显示错误提示，如果写了reject（error）login.jsx就又要用try/catch了
2)异步得到的不是response,而是response.data
在请求成功resolve时，resolve(response.data)
*/ 

import axios from 'axios'
import {message} from 'antd'

export default function ajax(url,data={}/* 指定默认值 */,type='GET'){//形参默认值
    //login.jsx中await后需要的是一个promise，所以这里return一个promise，而promise包裹的是异步调用，其中的axios.get（）本身就是一个promise，也是一个异步调用（The promise object reprensents the eventual completion(or failure)of an asynchronous operation, and its resulting value）
    return new Promise((resolve,reject) => {
        let promise
        //1.  执行异步ajax请求
        if(type==="GET"){//发GET请求
            promise = axios.get(url,{
                params:data
            })
        }else{//发post请求
            promise = axios.post(url,data)
        }
        //2. 如果成功了，调用resolve(value)
        promise.then(response => {
            resolve(response.data)
            //3. 如果失败了，不调用reject（reason），而是提示异常信息
        }).catch(error=>{
            message.error('请求出错了：'+ error.message)
        })
        

        
    })

    
}

// //请求时如下调用：
// ajax('/login',{username:'Tom',password:'123'},'POST').then();
// ajax('/manage/user/add',{username:'Tom',password:'123',phone:'12345678'},'POST').then();
// /* 每个请求每次请求的时候都需要传入相应的参数，而参数部分很多都是相同的（url，‘post’），为了少写代码，需要创建一个模块包含所有的请求接口 */

//如果是查询数据，get，如果更新后台数据，post；如果更新不需要请求参数，用get