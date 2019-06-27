/*
能发送异步ajax请求的函数模块
封装axios库
函数返回值是promise对象
*/ 

import axios from 'axios'

export default function ajax(url,data={}/* 指定默认值 */,type='GET'){
    if(type==="GET"){//发GET请求
        return axios.get(url,{
            params:data
        })
    }else{//发post请求
        return axios.post(url,data)
    }
}

// //请求时如下调用：
// ajax('/login',{username:'Tom',password:'123'},'POST').then();
// ajax('/manage/user/add',{username:'Tom',password:'123',phone:'12345678'},'POST').then();
// /* 每个请求每次请求的时候都需要传入相应的参数，而参数部分很多都是相同的（url，‘post’），为了少写代码，需要创建一个模块包含所有的请求接口 */

