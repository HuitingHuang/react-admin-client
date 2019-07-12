import React, {Component} from 'react'
import {Card,Select,Button,Icon,Table,Input} from 'antd'
/* Product的默认子路由组件 */
const Option = Select.Option

export default class ProductHome extends Component{

    state = {
        products:[],//商品的数组
    }
    /* 初始化table的columns */
    initColumns = () =>{

    }
    componentWillMount(){
        this.initColumns()
    }
    render(){
        //取出状态数据
        const {products} = this.state

        const title = (
            <span>
                <Select value='1' style={{width:150}}>
                    <Option value='1'>按名称搜索</Option>
                    <Option value='2'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:150,margin:'0 15px'}}></Input>
                <Button type='primary'>搜索</Button>
            </span>
        )
        const extra = (
            <Button type='primary'>
                <Icon type='plus'></Icon>
                添加商品
            </Button>
        )
        return(
            <Card title={title} extra={extra}>
                <Table dataSource={products} /* columns={columns} *//>
            </Card>
        )
    }
}