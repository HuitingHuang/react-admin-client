import React, {Component} from 'react'
import {Form,Select,Input } from 'antd'
import PropTypes from 'prop-types'

const Item = Form.Item
const Option = Select.Option
/* 添加分类的form组件 */
class AddForm extends Component{

    static propTypes = {
        setForm: PropTypes.func.isRequired,
        categories: PropTypes.array.isRequired,//一级分类数组
        parentId:PropTypes.string.isRequired//父分类id
    }
    componentWillMount(){
        //将form对象通过setForm（）传递父组件
        this.props.setForm(this.props.form)
    }

    render(){
        const {categories,parentId} = this.props
        const {getFieldDecorator} = this.props.form
        return(
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId',{
                            initialValue:parentId//显示对应value值的option：一级分类
                        })(
                            <Select>
                                <Option value='0' key='0'>一级分类</Option>
                                {
                                    categories.map(c=><Option value={c._id} key={c._id}>{c.name}</Option>)
                                }
                            </Select>
                        )
                    }
                    
                </Item>
                <Item>
                    {
                        getFieldDecorator('categoryName',{
                            initialValue:'',//初始化不需要输入内容
                            rules:[
                                {required:true, message:'分类名称必须输入'}
                            ]
                        })(
                            <Input placeholder='请输入分类名称'/>
                        )
                    }
                    
                </Item>
            </Form>

        )
    }
}

export default Form.create()(AddForm)
//使得AddForm组件得到一个Form对象,获取getFieldDecorator方法，做验证