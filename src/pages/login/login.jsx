import React,{Component} from 'react'
import { Form, Icon, Input, Button,message} from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
import {reqLogin} from '../../api'
import storageUtils from '../../utils/storageUtils'
import memoryUtils from '../../utils/memoryUtils';
import {Redirect} from 'react-router-dom'

const Item = Form.Item;

/* 登录的路由组件 */

class Login extends Component{
    
    handleSubmit = (e) =>{
        e.preventDefault();

        //点击登录的时候对所有的表单字段进行校验(统一校验)，因为用户可能不输然后直接点
        this.props.form.validateFields(async (err,values) =>{
            if(!err){
                
                //console.log('submit ajax request',values)
                //按住ctrl，鼠标hover然后显示函数声明，点击可以跳转在声明它的文件或者alt+<-

                //结构赋值的变量名必须与values对象中的变量名一直，并且也要与接口函数的参数名一致（username and password）
                const {username,password} = values
                //promise方法
                // reqLogin(username,password).then(response =>console.log('成功了',response.data)).catch(error =>{console.log('失败了',error)})

                //async/await改写(捕获错误已在ajax中完成统一版本，不再需要try/catch)
                
                const result = await reqLogin(username,password)
                // console.log('请求成功',response.data)
                
                if(result.status===0){//登录成功
                    //提示登录成功
                    message.success('登录成功')
                    const user = result.data//user信息最好可以变成所有模块都能通用，那就是存到内存中
                    memoryUtils.user = user
                    //保存到local（本地文件）中去，刷新的时候要读取，从入口js文件中读取
                    storageUtils.saveUser(user)

                    //跳转到管理界面
                    //this.props.history常用方法：push(),replace(),goback().goback()是回退，push()和replace()的区别：push（）路由是A 跳到B跳到C，回退是由C->B->A,由栈的方式来管理它们，replace（）是多出来的一个D替换掉C，无法再回退到C,这里登录进去以后就不再需要回退到登录界面了

                    //事件回调函数中实现跳转
                    this.props.history.replace('/')
                }else{//登录失败
                    //提示错误信息
                    message.error(result.message)

                }
            }else{
                console.log('校验失败！')
            }
        })

        // const form = this.props.form
        // const values = form.getFieldsValue()
        // console.log('handlesubmit',values)
    }

    /*
    对密码进行自定义验证
    */ 
    validatePwd = (rule,value,callback) =>{
        console.log('validatePwd()',rule,value)
        if(!value){
            callback('Password must be input')
        }else if(value.length<4){
            callback('Length of password can not be less than 4 ')
        }else if(value.length>12){
            callback('Length of password can not be longer than 12')
        }else if(!(/^[a-zA-Z0-9_]+$/.test(value))){
            callback('Password could include letters in lowercase or uppercase, digits and underline.')
        }else{
            callback()
        }
    }

    render(){
        // 如果用户已经登录，自动跳转到管理界面
        const user = memoryUtils.user
        if(user && user._id){
            return <Redirect to ='/' />
        }
        const form = this.props.form;
        const {getFieldDecorator} = form;
        return(
            <div className="login">
                <header className='login-header'>
                    <img src={logo} alt=""></img>
                    <h1>React project</h1>
                </header>
                <section className='login-content'>
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {/*以下是一段js代码，getFieldDecorator是一个高阶函数，<input>是返回值（函数）的参数 */}
                            {getFieldDecorator('username'/* 标识名称 */, {
                                //声明式验证：直接使用别人定义好的验证规则进行验证
                                rules: [
                                    { required: true, whitespace:true,message: 'Please input your username!' },
                                    { min: 4, message: 'Minimum of length should be 4.'},
                                    { max: 12, message: 'Length should not be longer than 12.'},
                                    { pattern: /^[a-zA-Z0-9_]+$/,message:'Username could include letters in lowercase or uppercase, digits and underline.'}
                                ],
                                initialValue: 'admin'//初始值
                            }/* 验证规则：配置对象：属性名是 */)(
                                <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="Username"
                                />
                            )} 
                        </Item>
                        <Item>  
                            {getFieldDecorator('password', {
                                rules: [{
                                    validator:this.validatePwd//自定义表单验证
                                }],
                            })(
                                <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="Password"
                                />
                            )} 
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}

const WrappedNormalLoginFrom = Form.create()(Login);

export default WrappedNormalLoginFrom;

/*1.前台表单验证
2.表单输入数据
3.点击“登录”时统一校验
*/ 
/*点击“登录时，还需要验证，验证通过了才发生跳转”*/ 

/*
async和await
1.作用？
简化promise对象的使用，不用再使用then()来指定成功/失败的回调函数；以同步编码（没有回调函数了）方式实现异步流程
2.哪里写await？
在返回promise的表达式左侧写await：不想要promise，想要promise异步执行的成功的value数据
3.哪里写async?
await所在函数（最近的）定义的左侧
 */