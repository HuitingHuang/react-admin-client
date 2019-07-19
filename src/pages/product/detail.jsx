import React, {Component} from 'react'
import {Card, Icon, List, } from 'antd'
/* Product的详情的子路由组件 */

const Item = List.Item

export default class ProductDetail extends Component{
    render(){
        const title =(
            <span>
                <Icon 
                    type='arrow-left' 
                    style={{color:'green',marginRight:15,fontSize:20}} 
                    onClick={() =>this.props.history.goBack()}></Icon>
                <span>商品详情</span>
            </span>
        )
        return(
            <Card title={title} className='product-detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称:</span>
                        <span>联想ThinkPad 翼480</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述:</span>
                        <span>联想ThinkPad 翼480</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格：</span>
                        <span>xxxxxxx</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类：</span>
                        <span>xxxx</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片：</span>
                        <span>
                            <img className='product-img' src="" alt="img"/>
                            <img className='product-img' src="" alt="img"/>
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:'<h1>xxxxxx</h1>'}}>
                            
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}