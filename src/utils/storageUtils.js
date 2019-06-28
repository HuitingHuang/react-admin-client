import { getSequencer } from "jest-config/build/utils";

/* 进行local数据存储管理的工具模块 */
/* 统一暴露 */
const USER_KEY = 'user_key'
export default{
    /* 保存user */
    saveUser(user){
        localStorage.setItem(USER_KEY,JSON.stringify(user))

    },
    /* 读取 user*/
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY)||'{}')// 如果localStorage.getItem()有值，那么就parse它，如果他是空的（返回null），那么就去parse ‘{}’
    },
    /* 删除user */
    removeUser(){
        localStorage.removeItem(USER_KEY)
    }

}